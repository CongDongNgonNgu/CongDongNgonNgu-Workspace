"""Runner-local source candidate only. Never upload native files or adopt this manifest at runtime."""
import gzip
import hashlib
import io
import json
import pathlib
import re
import sys
import tarfile
import zlib

MAX_FILE = 20_000_000
MAX_TOTAL = 64 * 1024 * 1024
MAX_MEMBERS = 64
ROOT = 'FFmpeg-6dfaba896fddaea098abec8ac84ff67375a7c6f1'
SOURCE_SHA = 'cd6175d64b7f152469d48ceffa0dcb3bf36bb3bcae42aece46570d48563cdb85'
BINARY_PINS = {
    'ffmpeg': '2af1963c499a3005ad4d6037794b9e4bc383c7a1c0f545267297195d68f9ccee',
    'ffprobe': '64c3340d0325afa37fff5015bfacf162095103dc2cbd319d799d70cc9633d24e',
}
EVIDENCE = ('config_components.h', 'config.h', 'config.mak', 'ffmpeg.dynamic.txt', 'ffprobe.dynamic.txt', 'ffmpeg.versions.txt', 'ffprobe.versions.txt', 'configure-args.txt', 'compiler.txt', 'binutils.txt', 'builder-libc.txt', 'builder-os.txt')
RUNTIME = ('ffmpeg.link-map.txt', 'ffmpeg.link-trace.txt', 'ffprobe.link-map.txt', 'ffprobe.link-trace.txt', 'relink-binaries.sha256', 'runtime-input-paths.txt', 'runtime-inputs.tsv', 'gcc-runtime-locations.txt', 'system-package-versions.txt', 'system-libc-copyright.txt')
GCC_NOTICES = {'COPYING.RUNTIME': '9d6b43ce4d8de0c878bf16b54d8e7a10d9bd42b75178153e3af6a815bdc90f74', 'COPYING3': '8ceb4b9ee5adedde47b31e975c1d90c73ad27b6b165a1dcd80c7c545eb65b903'}
NOTICES = ('LICENSE.md', 'COPYING.GPLv2', 'COPYING.GPLv3', 'COPYING.LGPLv2.1', 'COPYING.LGPLv3', 'CREDITS')


def digest(data):
    return hashlib.sha256(data).hexdigest()


def safe_name(name):
    return (isinstance(name, str) and bool(name) and len(name) < 100 and
            bool(re.fullmatch(r'[A-Za-z0-9._/-]+', name)) and not name.startswith('/') and
            all(part not in ('', '.', '..') for part in name.split('/')))


def read_material(file, sha=None, exact_size=None):
    file = pathlib.Path(file)
    info = file.lstat()
    if file.is_symlink() or not file.is_file() or not 0 < info.st_size <= MAX_FILE:
        raise ValueError('CANDIDATE_FILE')
    if exact_size is not None and info.st_size != exact_size:
        raise ValueError('CANDIDATE_SIZE')
    data = file.read_bytes()
    if len(data) != info.st_size or (sha is not None and digest(data) != sha):
        raise ValueError('CANDIDATE_HASH')
    return data


def write_archive(target, members):
    if not 0 < len(members) <= MAX_MEMBERS:
        raise ValueError('CANDIDATE_MEMBERS')
    total = 0
    for name in members:
        if any('/'.join(name.split('/')[:i]) in members for i in range(1, len(name.split('/')))):
            raise ValueError('CANDIDATE_PARENT_COLLISION')
    for name, data in members.items():
        if not safe_name(name) or not isinstance(data, bytes) or not 0 < len(data) <= MAX_FILE:
            raise ValueError('CANDIDATE_MEMBER')
        total += len(data)
    if total > MAX_TOTAL:
        raise ValueError('CANDIDATE_EXPANDED')
    manifest = {}
    with pathlib.Path(target).open('xb') as raw:
        with gzip.GzipFile(filename='', mode='wb', fileobj=raw, mtime=0, compresslevel=9) as compressed:
            with tarfile.open(fileobj=compressed, mode='w', format=tarfile.USTAR_FORMAT) as archive:
                for name, data in sorted(members.items()):
                    member = tarfile.TarInfo(name)
                    member.size = len(data)
                    member.mode = 0o500 if name.startswith('bin/') else 0o400
                    archive.addfile(member, io.BytesIO(data))
                    manifest[name] = {'bytes': len(data), 'sha256': digest(data), 'mode': member.mode}
    if pathlib.Path(target).stat().st_size > MAX_TOTAL:
        raise ValueError('CANDIDATE_COMPRESSED')
    return manifest


def verify_archive(target, expected):
    file = pathlib.Path(target)
    if file.is_symlink() or not file.is_file() or not 0 < file.stat().st_size <= MAX_TOTAL:
        raise ValueError('CANDIDATE_ARCHIVE')
    # Validate complete gzip CRC/footer and cap expansion before parsing any tar headers.
    decoder = zlib.decompressobj(16 + zlib.MAX_WBITS)
    try:
        raw = decoder.decompress(file.read_bytes(), MAX_TOTAL + 1)
    except zlib.error:
        raise ValueError('CANDIDATE_GZIP') from None
    if len(raw) > MAX_TOTAL or not decoder.eof or decoder.unused_data or decoder.unconsumed_tail:
        raise ValueError('CANDIDATE_GZIP_BOUNDARY')
    seen, total, end = set(), 0, 0
    for name in expected:
        if any('/'.join(name.split('/')[:i]) in expected for i in range(1, len(name.split('/')))):
            raise ValueError('CANDIDATE_PARENT_COLLISION')
    with tarfile.open(fileobj=io.BytesIO(raw), mode='r:') as archive:
        for member in archive:
            name = member.name
            if member.offset != end or member.offset_data - member.offset != 512:
                raise ValueError('CANDIDATE_TAR_HEADER')
            end = member.offset_data + ((member.size + 511) // 512) * 512
            if any(raw[member.offset_data + member.size:end]):
                raise ValueError('CANDIDATE_TAR_DATA_PADDING')
            if (not safe_name(name) or name not in expected or name in seen or
                    len(seen) >= MAX_MEMBERS or member.type != tarfile.REGTYPE or member.linkname or
                    not 0 < member.size <= MAX_FILE or member.pax_headers or
                    member.uid != 0 or member.gid != 0 or member.mtime != 0):
                raise ValueError('CANDIDATE_READBACK_MEMBER')
            pin = expected[name]
            if member.size != pin['bytes'] or member.mode != pin.get('mode', 0o400):
                raise ValueError('CANDIDATE_READBACK_SIZE')
            total += member.size
            if total > MAX_TOTAL:
                raise ValueError('CANDIDATE_READBACK_EXPANDED')
            with archive.extractfile(member) as content:
                hashed = hashlib.sha256()
                length = 0
                while chunk := content.read(1024 * 1024):
                    length += len(chunk)
                    if length > pin['bytes']:
                        raise ValueError('CANDIDATE_READBACK_LIMIT')
                    hashed.update(chunk)
            if length != pin['bytes'] or hashed.hexdigest() != pin['sha256']:
                raise ValueError('CANDIDATE_READBACK_HASH')
            seen.add(name)
    if len(raw) - end < 1024 or any(raw[end:]):
        raise ValueError('CANDIDATE_TAR_TERMINATION')
    if seen != set(expected):
        raise ValueError('CANDIDATE_READBACK_MISSING')


def assemble(build, source, evidence, output):
    here = pathlib.Path(__file__).resolve().parent
    repo = here.parents[1]
    members = {'source/ffmpeg.tar.gz': read_material(source, SOURCE_SHA, 17330151)}
    for name, pin in BINARY_PINS.items():
        members['bin/' + name] = read_material(pathlib.Path(build) / name, pin)
    # The intact source archive is hash-bound before any selected notice is read.
    with tarfile.open(source, 'r:gz') as archive:
        for name in NOTICES:
            entry = archive.getmember(ROOT + '/' + name)
            if not entry.isfile() or entry.linkname or not 0 < entry.size <= 131072:
                raise ValueError('CANDIDATE_NOTICE')
            with archive.extractfile(entry) as content:
                members['notices/' + name] = content.read(entry.size + 1)
    recorded = repo / 'phases/PHASE-30-RICH-MEDIA-ATTACHMENTS/evidence-002/minimal-ffmpeg-ci40997259137/MANIFEST.json'
    pins = json.loads(recorded.read_text())['files']
    if len(pins) != len(EVIDENCE) or sorted(pin['file'] for pin in pins) != sorted(EVIDENCE):
        raise ValueError('CANDIDATE_EVIDENCE_INVENTORY')
    for pin in pins:
        name = pin['file']
        if not safe_name(name) or '/' in name:
            raise ValueError('CANDIDATE_EVIDENCE_NAME')
        members['evidence/' + name] = read_material(pathlib.Path(evidence) / name, pin['sha256'], pin['bytes'])
    for name in RUNTIME:
        members['evidence/' + name] = read_material(pathlib.Path(evidence) / name)
    for name, pin in GCC_NOTICES.items():
        members['notices/gcc/' + name] = read_material(here / 'notices/gcc' / name, pin)
    members['build/link-provenance.sh'] = read_material(here / 'link-provenance.sh')
    members['build/gcc-notice-source.json'] = read_material(here / 'notices/gcc/manifest.json')
    members['build/build.sh'] = read_material(here / 'build.sh', 'ffbcec79112bc6f19a6e565feac98fa862cd6a19a6a7579d858585e4ecc00f08')
    members['build/workflow.yml'] = read_material(repo / '.github/workflows/phase30-minimal-ffmpeg.yml')
    members['build/check-source.py'] = read_material(here / 'check-source.py')
    members['build/bundle.py'] = read_material(here / 'bundle.py')
    members['BUILDING.md'] = b'''INTERNAL CI CANDIDATE ONLY: NOT A RELEASE OR LICENSE CLEARANCE.
FFmpeg source is intact and unmodified; all original file-level notices remain in source/ffmpeg.tar.gz.
Top-level upstream notices are repeated unmodified in notices/; retain every source notice on distribution.
This software is based in part on the work of the Independent JPEG Group. No source changes were made.
FFmpeg source commit: 6dfaba896fddaea098abec8ac84ff67375a7c6f1.
Build-only image: gcc@sha256:a689e29bc3adf4663ef9a141d23081252764d1319c63f591a027bd6fd676f4c1.
The full exact build command and bounded mounts/resources are in build/workflow.yml; compilation recipe is build/build.sh.
To reproduce compilation use those reviewed nonroot/no-network Docker constraints, with source/ffmpeg.tar.gz mounted at /source.tar.gz,
build/build.sh available as /experiment/build.sh, fresh writable /build and /evidence directories; run bash /experiment/build.sh.
Generated configure arguments/configuration, compiler/binutils, OS/libc and ELF evidence accompany the source.
CLI executables dynamically require system libc.so.6/libm.so.6 and observed GLIBC through2.35; no Render compatibility is claimed.
GCC14.3.0 runtime exception and GPLv3 license texts are retained unchanged under notices/gcc; source identity is build/gcc-notice-source.json.
Actual compiler runtime/startup input paths/hashes, package versions, original system-libc copyright and full relink traces/maps are in evidence/.
Relink diagnostics must leave the preserved original pair byte-identical. Shared system libraries and object/archive inputs are identified, not separately copied here.
To reproduce diagnostics, additionally mount the candidate GCC notices at /experiment/notices/gcc and use recorded read-only original pair/source plus writable objects/evidence mounts.
These materials support engineering classification; no source/notice clearance is inferred without independent review of actual results.
GNU time is a separately reviewed executable/distribution, not part of this candidate.
No native publication, app adoption, security/resource acceptance or attachment activation is authorized by this archive.
'''
    items = {name: {'bytes': len(data), 'sha256': digest(data)} for name, data in sorted(members.items())}
    members['manifest.json'] = (json.dumps({'scope': 'INTERNAL_CI_CANDIDATE_ONLY_NOT_RUNTIME_AUTHORITY', 'members': items}, sort_keys=True, indent=2) + '\n').encode()
    expected = write_archive(output, members)
    verify_archive(output, expected)
    repeat = pathlib.Path(str(output) + '.repeat.tar.gz')
    if write_archive(repeat, members) != expected:
        raise ValueError('CANDIDATE_REPEAT_MANIFEST')
    verify_archive(repeat, expected)
    first, second = pathlib.Path(output).read_bytes(), repeat.read_bytes()
    if first != second:
        raise ValueError('CANDIDATE_REPEAT_BYTES')
    return {'scope': 'INTERNAL_CI_CANDIDATE_ONLY', 'archiveBytes': len(first), 'archiveSha256': digest(first),
            'members': expected, 'readback': 'PASS', 'sameInputsTwoArchiveWrites': 'IDENTICAL',
            'independentBuildBinaryHashes': 'MATCH_CI40997259137_AND_CI41005997634',
            'nativePublication': 'NOT_RUN', 'backendAdoption': 'NOT_RUN', 'renderAcceptance': 'NOT_RUN', 'licenseClearance': 'HOLD'}


if __name__ == '__main__':
    if len(sys.argv) != 5:
        raise ValueError('CANDIDATE_ARGUMENTS')
    print(json.dumps(assemble(*sys.argv[1:]), sort_keys=True))
