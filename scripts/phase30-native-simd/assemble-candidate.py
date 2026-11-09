"""Complete runner-local material candidate. No native execution or adoption authority."""
import hashlib
import io
import json
import os
import pathlib
import stat
import sys
import tarfile
import types

HERE = pathlib.Path(__file__).resolve().parent
GUARD_SHA = 'bc23fb66fdb8df3deddc15dfe8f7557506c33e11a909b2be734059513b06d96c'
STATIC_PINS = {
    ".github/workflows/phase30-native-simd.yml": "a31b13798f85a5349f33d6e2ee53c40bd6bd7b72669e7088dcfca43b40fca417",
    "scripts/phase30-minimal-ffmpeg/build.sh": "ffbcec79112bc6f19a6e565feac98fa862cd6a19a6a7579d858585e4ecc00f08",
    "scripts/phase30-minimal-ffmpeg/bundle.py": "4375e9cfab5a4228a575c1b80802f2d4f0716fef3f2bbab81204a63392c4ecc5",
    "scripts/phase30-minimal-ffmpeg/check-source.py": "ac599e837a725cee402ddbe7117b57b64d8e97e4fba162f0959337591d25016a",
    "scripts/phase30-minimal-ffmpeg/link-provenance.sh": "1ee4d1a2d8d290022ff691e7e92e2662c26cb0e31c25fa2f88e12885c58653cc",
    "scripts/phase30-native-simd/aac-command-probe.cjs": "7fe50951a9c6a6d27143046c8ccd27e3571214edb93365160878ac663596f3ed",
    "scripts/phase30-native-simd/aac-fixtures.cjs": "8bbcde836a5fa927eba87672551ec29233a4716b93a265a7f4021ab847cb7311",
    "scripts/phase30-native-simd/archive-candidate.py": "bc23fb66fdb8df3deddc15dfe8f7557506c33e11a909b2be734059513b06d96c",
    "scripts/phase30-native-simd/build.sh": "22522617b5d6eb4d41c4ca29b73f9428621b880b5a103963dd45ce4a45a30521",
    "scripts/phase30-native-simd/check-nasm-source.cjs": "ccf0ca72058e7f0cca1e1fdf0bbef055e64005ffd9ec64a0155c71bf98bf3e60",
    "scripts/phase30-native-simd/collect-dependencies.cjs": "fe199d2d3bc7e3a3f81bfc7fdd4f00f54aae607b8cd5e3f04dff9997574eb325",
    "scripts/phase30-native-simd/prepare-recipe.cjs": "1e7e924063b035ad0821d841aee62a3c43472942f255c787846e215f3b29469d",
    "scripts/phase30-native-simd/prepare-relink.cjs": "3624127ee2983dc20da651dadc555b6355cfc2f0532c70ffa606ce3e457984fe",
    "scripts/phase30-native-simd/retain-evidence.cjs": "16cf337b89ecc6a02ba33d068e53798b7c3fcbc2d9038c2ba5d540da710dc7c3",
    "scripts/phase30-native-simd/run-aac-probe.cjs": "aa7835aca52aec5fba8a1715e0415218594c9bf7105cb7fc3260eead3e16ae73",
    "scripts/phase30-native-simd/run-collector.cjs": "fe6d40caf7e79240271c5124b7ee4eb5717aa691d50be7886e0a68f589a769a9",
    "scripts/phase30-minimal-ffmpeg/fixtures.json": "e37ea5708551a6ac868550a398beb1f54b338d38bca075b22d7bc85369cd2516"
}
MATERIAL_PINS = {
    "runtime-source/manifest.json": "f9ecb6c0c97375ab4e424d052f2211ef3c4dba2cb7e9d983e3ee8fd4fa4ac454",
    "runtime-source/SOURCE-MATERIALS.md": "36beba2db2e770be55228c1ff6c8e72ff03051ff697579e102327eeb4899b2c5",
    "notices/gcc/manifest.json": "0865ac9cb2279a8d6579cccaa302d389e89608e389105d8125f5049883e847f1"
}
OBSERVATIONS = frozenset([
    "aac-cleanup.json",
    "aac-observations.json",
    "collector-cleanup.json",
    "candidate-relink.sh",
    "relink-proof.json",
    "relink-container.log",
    "assembly-dependencies.json",
    "ffmpeg.link-map.txt",
    "ffmpeg.link-trace.txt",
    "ffprobe.link-map.txt",
    "ffprobe.link-trace.txt",
    "relink-binaries.sha256",
    "runtime-input-paths.txt",
    "runtime-inputs.tsv",
    "gcc-runtime-locations.txt",
    "system-package-versions.txt",
    "system-libc-copyright.txt",
    "stage.txt",
    "source-proof.json",
    "recipe-proof.json",
    "candidate-recipe.sh",
    "nasm-configure.log",
    "nasm-build.log",
    "nasm-config.log",
    "nasm-version.txt",
    "nasm.sha256",
    "nasm-LICENSE",
    "container.log",
    "configure.log",
    "build.log",
    "compiler.txt",
    "binutils.txt",
    "builder-libc.txt",
    "builder-os.txt",
    "configure-args.txt",
    "config.h",
    "config_components.h",
    "config.mak",
    "inventory.json",
    "config-delta.txt",
    "object-inventory.txt",
    "source-assembly-inventory.txt",
    "LICENSE.md",
    "COPYING.LGPLv2.1",
    "COPYING.LGPLv3",
    "COPYING.GPLv2",
    "COPYING.GPLv3",
    "ffmpeg.sha256",
    "ffmpeg.dynamic.txt",
    "ffmpeg.versions.txt",
    "ffmpeg.program-headers.txt",
    "ffmpeg.version.txt",
    "ffmpeg.protocols.txt",
    "ffprobe.sha256",
    "ffprobe.dynamic.txt",
    "ffprobe.versions.txt",
    "ffprobe.program-headers.txt",
    "ffprobe.version.txt",
    "ffprobe.protocols.txt",
    "decoders.txt",
    "encoders.txt",
    "filters.txt",
    "bsfs.txt"
])
# Exact host-origin names in published CI42184703828 retention manifest.
HOST_OBSERVATIONS = frozenset((
    'aac-cleanup.json', 'aac-observations.json', 'collector-cleanup.json',
    'candidate-relink.sh', 'relink-proof.json', 'relink-container.log',
    'assembly-dependencies.json', 'source-proof.json', 'recipe-proof.json',
    'candidate-recipe.sh', 'container.log', 'inventory.json', 'config-delta.txt',
))
DERIVED_PINS = {
    'candidate-recipe.sh': '790cd23802bcb831306f602a2104d2696c4a5b7e0008bc007a70674013a92cd7',
    'candidate-relink.sh': '4d5e1de5abbff85b2ff48354fd733dc39900f0ab6891c2678425e4d27100df4d',
}


def load_guard():
    # Verify before execution, using the exact bounded bytes read from this fd.
    file = HERE / 'archive-candidate.py'
    before = file.lstat()
    if not stat.S_ISREG(before.st_mode) or not 0 < before.st_size <= 65536:
        raise ValueError('GUARD_TYPE')
    fd = os.open(file, os.O_RDONLY | os.O_NOFOLLOW | os.O_NONBLOCK)
    try:
        opened = os.fstat(fd)
        raw = os.read(fd, 65537)
        after = os.fstat(fd)
        identity = lambda s: (s.st_dev, s.st_ino, s.st_size, s.st_mtime_ns, s.st_ctime_ns)
        if (identity(before) != identity(opened) or identity(opened) != identity(after)
                or identity(file.lstat()) != identity(opened)
                or hashlib.sha256(raw).hexdigest() != GUARD_SHA):
            raise ValueError('GUARD_IDENTITY')
    finally:
        os.close(fd)
    module = types.ModuleType('verified_simd_guard')
    module.__file__ = str(file)
    exec(compile(raw, str(file), 'exec'), module.__dict__)
    return module


def notices(raw, root, names):
    """Read selected original members from an already hash-bound whole source."""
    result = {}
    with tarfile.open(fileobj=io.BytesIO(raw), mode='r|gz') as archive:
        count, total = 0, 0
        for entry in archive:
            count += 1
            total += entry.size
            if count > 20000 or total > 256 * 1024 * 1024:
                raise ValueError('NOTICE_ARCHIVE_BOUND')
            prefix = root + '/'
            name = entry.name[len(prefix):] if entry.name.startswith(prefix) else ''
            if name not in names:
                continue
            if name in result or not entry.isfile() or entry.linkname or not 0 < entry.size <= 131072:
                raise ValueError('NOTICE_MEMBER')
            with archive.extractfile(entry) as content:
                data = content.read(entry.size + 1)
            if len(data) != entry.size:
                raise ValueError('NOTICE_SHORT')
            result[name] = data
    if set(result) != set(names):
        raise ValueError('NOTICE_MISSING')
    return result


def strict_json(raw):
    def unique(pairs):
        result = {}
        for key, value in pairs:
            if key in result:
                raise ValueError('DUPLICATE_JSON_KEY')
            result[key] = value
        return result
    return json.loads(raw, object_pairs_hook=unique)


def observations(directory, guard):
    directory = pathlib.Path(directory)
    if not stat.S_ISDIR(directory.lstat().st_mode):
        raise ValueError('OBSERVATION_DIRECTORY')
    seen = set()
    for item in directory.iterdir():
        if len(seen) >= 64:
            raise ValueError('OBSERVATION_INVENTORY_BOUND')
        seen.add(item.name)
    if seen != set(OBSERVATIONS) | {'manifest.json'}:
        raise ValueError('OBSERVATION_INVENTORY')
    raw = guard.read_material(directory / 'manifest.json', maximum=65536)
    manifest = strict_json(raw)
    if (type(manifest) is not dict or set(manifest) != {'scope', 'files', 'missing', 'bytes'}
            or manifest['scope'] != 'RESEARCH_TEXT_ONLY_NOT_BINARY_OR_SOURCE_CLOSURE'
            or manifest['missing'] != ['candidate-archive-proof.json']
            or type(manifest['files']) is not dict or set(manifest['files']) != set(OBSERVATIONS)
            or type(manifest['bytes']) is not int):
        raise ValueError('OBSERVATION_MANIFEST')
    files = {}
    for name in sorted(OBSERVATIONS):
        record = manifest['files'][name]
        if (type(record) is not dict or set(record) != {'sourceIndex', 'bytes', 'sha256'}
                or type(record['sourceIndex']) is not int
                or record['sourceIndex'] != (1 if name in HOST_OBSERVATIONS else 0)):
            raise ValueError('OBSERVATION_RECORD')
        data = guard.read_material(directory / name, record['sha256'], record['bytes'], maximum=1048576)
        if name in DERIVED_PINS and guard.digest(data) != DERIVED_PINS[name]:
            raise ValueError('DERIVED_RECIPE_PIN')
        files[name] = data
    if sum(map(len, files.values())) != manifest['bytes']:
        raise ValueError('OBSERVATION_TOTAL')
    # Preserve provenance bytes after checking the original 63-file accounting.
    files['manifest.json'] = raw
    return files


def readback_capsules(output, guard, expected, archive_sha256):
    """Independent inner inventory/byte readback after the baseline outer verifier."""
    raw = guard._read_regular(output, 64 * 1024 * 1024)
    if guard.digest(raw) != archive_sha256:
        raise ValueError('ARCHIVE_READBACK_IDENTITY')
    found = set()
    with tarfile.open(fileobj=io.BytesIO(raw), mode='r:gz') as archive:
        for entry in archive:
            if entry.name not in expected:
                continue
            if entry.name in found or not entry.isfile() or entry.size > 6 * 1024 * 1024:
                raise ValueError('CAPSULE_READBACK')
            scope, files = expected[entry.name]
            with archive.extractfile(entry) as content:
                encoded = content.read(entry.size + 1)
            if guard.decode_capsule(encoded, scope, set(files)) != files:
                raise ValueError('CAPSULE_READBACK')
            found.add(entry.name)
    if found != set(expected):
        raise ValueError('CAPSULE_READBACK_MISSING')


def assemble(build, ffmpeg_source, nasm_source, evidence, repo, runtime_source, output):
    guard = load_guard()
    base = guard.load_base_helpers()
    repo, runtime_source = pathlib.Path(repo), pathlib.Path(runtime_source)
    minimal = repo / 'scripts/phase30-minimal-ffmpeg'
    members = guard.collect_core_materials(ffmpeg_source, nasm_source, build)['files']
    for source, root, names, prefix in (
            ('ffmpeg', base.ROOT, base.NOTICES, 'notices/ffmpeg/'),
            ('nasm', 'nasm-2.16.03', ('LICENSE', 'AUTHORS'), 'notices/nasm/')):
        for name, data in notices(members['source/' + source + '.tar.gz'], root, names).items():
            members[prefix + name] = data
    pinned = {name: guard.read_material(minimal / name, pin)
              for name, pin in MATERIAL_PINS.items()}
    runtime = json.loads(pinned['runtime-source/manifest.json'])
    for kind, directory in [('downloads', runtime_source), ('local', minimal / 'runtime-source')]:
        for record in runtime[kind]:
            name = record['member']
            if not base.safe_name(name) or name in members:
                raise ValueError('RUNTIME_COLLISION')
            members[name] = guard.read_material(directory / record['file'], record['sha256'], record['bytes'])
    members['build/runtime-source-manifest.json'] = pinned['runtime-source/manifest.json']
    members['build/gcc-notice-source.json'] = pinned['notices/gcc/manifest.json']
    members['SOURCE-MATERIALS.md'] = pinned['runtime-source/SOURCE-MATERIALS.md']
    for name, pin in base.GCC_NOTICES.items():
        members['notices/gcc/' + name] = guard.read_material(minimal / 'notices/gcc' / name, pin)
    static = {name: guard.read_material(repo / name, pin, maximum=1048576)
              for name, pin in STATIC_PINS.items()}
    # Packaging tool has recorded raw provenance, not a self-referential trust pin.
    static['scripts/phase30-native-simd/assemble-candidate.py'] = guard.read_material(HERE / 'assemble-candidate.py', maximum=65536)
    dynamic = observations(evidence, guard)
    capsules = {
        'build/native-build-inputs.json': ('SIMD_BUILD_INPUT_TEXT_ONLY', static),
        'evidence/observations.json': ('SIMD_OBSERVED_TEXT_ONLY', dynamic),
    }
    for name, (scope, files) in capsules.items():
        members[name] = guard.encode_capsule(scope, files, set(files))
    members['BUILDING.md'] = b'''INTERNAL SIMD SOURCE/MATERIAL CANDIDATE; independent material review pending.
This software is based in part on the work of the Independent JPEG Group.
Whole original FFmpeg and NASM sources retain all original file-level notices.
NASM is build-only; the candidate pair is pinned separately from the classic baseline.
Capsules preserve exact build scripts/workflow and current generated/dependency/runtime observations.
Decode capsules as data; no automatic extraction or execution is authorized.
Source archive/configure and original swscale Makefile generator provide generated assembly origins.
Conservative material coverage includes all 48 compiled assembly targets and their original includes.
19 C/x86 basename collisions prevent an exact linked-target selection claim.
Recorded packaging-tool bytes describe this assembly; they are not a self-pinned native recipe.
Two identical archive writes are a reproducibility boundary check, not independent compiler builds.
No license clearance, native publication, Backend adoption, worker security, Render resource or format activation acceptance is granted.
'''
    inventory = {name: {'bytes': len(data), 'sha256': guard.digest(data)} for name, data in sorted(members.items())}
    members['manifest.json'] = (json.dumps({'scope': 'INTERNAL_SIMD_MATERIAL_CANDIDATE_ONLY', 'members': inventory}, sort_keys=True) + '\n').encode()
    # All required inputs, source identities and closed inventories precede any output.
    proof = guard.write_verified_candidate(output, members)
    readback_capsules(output, guard, capsules, proof['archiveSha256'])
    readback_capsules(str(output) + '.repeat.tar.gz', guard, capsules, proof['archiveSha256'])
    proof.update({'scope': 'INTERNAL_SIMD_MATERIAL_CANDIDATE_ONLY',
                  'capsuleReadback': 'PASS',
                  'members': {name: {'bytes': len(data), 'sha256': guard.digest(data)} for name, data in sorted(members.items())},
                  'repeatArchiveSha256': proof['archiveSha256'],
                  'capsuleInventories': {name: {inner: {'bytes': len(data), 'sha256': guard.digest(data)}
                                                for inner, data in sorted(files.items())}
                                         for name, (_, files) in capsules.items()},
                  'materialClearance': 'HOLD_INDEPENDENT_REVIEW',
                  'workerAcceptance': 'NOT_RUN', 'resourceAcceptance': 'NOT_RUN'})
    return proof


def main(args):
    if len(args) != 8:
        raise ValueError('ASSEMBLY_ARGUMENTS')
    proof_path = pathlib.Path(os.path.abspath(args[7]))
    guard = load_guard()
    parents = guard._parents(proof_path)
    if proof_path.exists() or proof_path.is_symlink():
        raise FileExistsError('PROOF_EXISTS')
    proof = assemble(*args[:7])
    raw = (json.dumps(proof, sort_keys=True) + '\n').encode('ascii')
    if len(raw) > 65536:
        raise ValueError('PROOF_LIMIT')
    if guard._parents(proof_path) != parents:
        raise ValueError('PROOF_PARENT_CHANGED')
    with open(proof_path, 'xb') as output:
        output.write(raw)
    if guard._parents(proof_path) != parents:
        raise ValueError('PROOF_PARENT_CHANGED')


if __name__ == '__main__':
    try:
        main(sys.argv[1:])
    except Exception:
        print('SIMD_CANDIDATE_ASSEMBLY_HOLD', file=sys.stderr)
        sys.exit(1)
