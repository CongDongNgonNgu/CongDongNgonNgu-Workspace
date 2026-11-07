"""Fail-closed, source-only candidate archive material guards.

No executable is built, published, selected or adopted by this module.
The accepted baseline bundle helper is loaded byte-for-byte and hash checked.
"""
import base64
import hashlib
import importlib.util
import json
import os
import pathlib
import re
import stat

HERE = pathlib.Path(__file__).resolve().parent
BASE_HELPER = HERE.parent / 'phase30-minimal-ffmpeg' / 'bundle.py'
BASE_HELPER_RAW_SHA256 = '4375e9cfab5a4228a575c1b80802f2d4f0716fef3f2bbab81204a63392c4ecc5'
SIMD_BINARY_PINS = {
    'ffmpeg': '031ffb3a5ccd03437daf983c121b9f01d3974ed8e295057faa912925f84db5f3',
}
SOURCE_PINS = {
    'ffmpeg': ('cd6175d64b7f152469d48ceffa0dcb3bf36bb3bcae42aece46570d48563cdb85', 17330151),
    'nasm': ('5bc940dd8a4245686976a8f7e96ba9340a0915f2d5b88356874890e207bdb581', 1688160),
}
CAPSULE_SCOPES = frozenset(('SIMD_BUILD_INPUT_TEXT_ONLY', 'SIMD_OBSERVED_TEXT_ONLY'))
CAPSULE_LIMIT = 4 * 1024 * 1024
MAX_MATERIAL = 20_000_000


def digest(data):
    return hashlib.sha256(data).hexdigest()


def load_base_helpers():
    raw = BASE_HELPER.read_bytes()
    if digest(raw) != BASE_HELPER_RAW_SHA256:
        raise ValueError('BASE_HELPER_CHANGED')
    spec = importlib.util.spec_from_file_location('pinned_ffmpeg_bundle', BASE_HELPER)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def read_material(file, sha=None, exact_size=None, maximum=MAX_MATERIAL):
    """Bounded regular-file read. No symlinks/FIFOs; compare opened identity."""
    if (not isinstance(maximum, int) or isinstance(maximum, bool) or
            maximum < 1 or maximum > MAX_MATERIAL):
        raise ValueError('MATERIAL_LIMIT')
    if sha is not None and (not isinstance(sha, str) or
                            not re.fullmatch(r'[0-9a-f]{64}', sha)):
        raise ValueError('MATERIAL_HASH_PIN')
    if exact_size is not None and (not isinstance(exact_size, int) or
                                   isinstance(exact_size, bool) or
                                   exact_size < 1 or exact_size > maximum):
        raise ValueError('MATERIAL_SIZE_PIN')
    p = pathlib.Path(file)
    before = p.lstat()
    if not stat.S_ISREG(before.st_mode) or not 0 < before.st_size <= maximum:
        raise ValueError('MATERIAL_TYPE_OR_SIZE')
    fd = os.open(p, os.O_RDONLY | getattr(os, 'O_NOFOLLOW', 0) |
                 getattr(os, 'O_NONBLOCK', 0))
    try:
        opened = os.fstat(fd)
        if (not stat.S_ISREG(opened.st_mode) or
                (opened.st_dev, opened.st_ino, opened.st_size) !=
                (before.st_dev, before.st_ino, before.st_size)):
            raise ValueError('MATERIAL_IDENTITY')
        chunks = []
        remaining = opened.st_size
        while remaining:
            data = os.read(fd, min(remaining, 1024 * 1024))
            if not data:
                raise ValueError('MATERIAL_SHORT_READ')
            chunks.append(data)
            remaining -= len(data)
        if os.read(fd, 1):
            raise ValueError('MATERIAL_GROWTH')
        after = os.fstat(fd)
        if ((after.st_dev, after.st_ino, after.st_size,
             after.st_mtime_ns, after.st_ctime_ns) !=
            (opened.st_dev, opened.st_ino, opened.st_size,
             opened.st_mtime_ns, opened.st_ctime_ns)):
            raise ValueError('MATERIAL_CHANGED')
        data = b''.join(chunks)
        if exact_size is not None and len(data) != exact_size:
            raise ValueError('MATERIAL_SIZE')
        if sha is not None and digest(data) != sha:
            raise ValueError('MATERIAL_HASH')
        return data
    finally:
        os.close(fd)


def _closed_names(files, names):
    if (not isinstance(files, dict) or not isinstance(names, set) or
            not files or set(files) != names or len(names) > 64):
        raise ValueError('CAPSULE_MEMBERS')
    helper = load_base_helpers()
    total = 0
    for name, data in files.items():
        if not helper.safe_name(name) or not isinstance(data, bytes) or not data:
            raise ValueError('CAPSULE_ITEM')
        total += len(data)
        if total > CAPSULE_LIMIT:
            raise ValueError('CAPSULE_LIMIT')
        if any('/'.join(name.split('/')[:i]) in names
               for i in range(1, len(name.split('/')))):
            raise ValueError('CAPSULE_PARENT')
    return total


def encode_capsule(scope, files, names):
    if scope not in CAPSULE_SCOPES:
        raise ValueError('CAPSULE_SCOPE')
    _closed_names(files, names)
    body = {'scope': scope, 'files': [
        {'name': name, 'size': len(files[name]), 'sha256': digest(files[name]),
         'base64': base64.b64encode(files[name]).decode('ascii')}
        for name in sorted(names)
    ]}
    return (json.dumps(body, separators=(',', ':'), sort_keys=True) + '\n').encode('ascii')


def decode_capsule(encoded, scope, names):
    if scope not in CAPSULE_SCOPES or not isinstance(names, set):
        raise ValueError('CAPSULE_SCOPE')
    if not isinstance(encoded, bytes) or len(encoded) > 6 * 1024 * 1024:
        raise ValueError('CAPSULE_BYTES')
    try:
        obj = json.loads(encoded)
        if (type(obj) is not dict or set(obj) != {'scope', 'files'} or
                obj['scope'] != scope or type(obj['files']) is not list):
            raise ValueError('CAPSULE_SCHEMA')
        files = {}
        for record in obj['files']:
            if type(record) is not dict or set(record) != {'name', 'size', 'sha256', 'base64'}:
                raise ValueError('CAPSULE_SCHEMA')
            name, size, pin = record['name'], record['size'], record['sha256']
            if (not isinstance(name, str) or name in files or
                    type(size) is not int or not 0 < size <= CAPSULE_LIMIT or
                    not isinstance(pin, str) or not re.fullmatch(r'[0-9a-f]{64}', pin)):
                raise ValueError('CAPSULE_SCHEMA')
            data = base64.b64decode(record['base64'], validate=True)
            if len(data) != size or digest(data) != pin:
                raise ValueError('CAPSULE_INTEGRITY')
            files[name] = data
        _closed_names(files, names)
        if encode_capsule(scope, files, names) != encoded:
            raise ValueError('CAPSULE_CANONICAL')
        return files
    except (TypeError, KeyError, UnicodeError, json.JSONDecodeError, base64.binascii.Error) as e:
        raise ValueError('CAPSULE_REJECTED') from e


def write_verified_candidate(output, members):
    """Two byte-identical internal archives, with full pinned-helper readback."""
    helper = load_base_helpers()
    if not isinstance(members, dict) or not members:
        raise ValueError('ARCHIVE_MEMBERS')
    target = pathlib.Path(output)
    repeat = pathlib.Path(str(target) + '.repeat.tar.gz')
    if target.exists() or target.is_symlink() or repeat.exists() or repeat.is_symlink():
        raise FileExistsError('ARCHIVE_DESTINATION_EXISTS')
    try:
        manifest = helper.write_archive(target, members)
        helper.verify_archive(target, manifest)
        second = helper.write_archive(repeat, members)
        helper.verify_archive(repeat, second)
        first_bytes = read_material(target, maximum=MAX_MATERIAL)
        second_bytes = read_material(repeat, maximum=MAX_MATERIAL)
        if manifest != second or first_bytes != second_bytes:
            raise ValueError('ARCHIVE_NONDETERMINISM')
        return {'scope': 'ARCHIVE_BOUNDARY_ONLY_NOT_MATERIAL_CLEARANCE',
                'readback': 'PASS', 'sameInputsTwoArchiveWrites': 'IDENTICAL',
                'archiveSha256': digest(first_bytes), 'archiveBytes': len(first_bytes),
                'nativePublication': 'NOT_RUN', 'backendAdoption': 'NOT_RUN',
                'renderAcceptance': 'NOT_RUN', 'licenseClearance': 'HOLD'}
    except Exception:
        # Remove only files created by this call, never pre-existing destinations.
        for p in (target, repeat):
            if p.is_file() and not p.is_symlink():
                p.unlink()
        raise


def assemble(root, ffmpeg_source, nasm_source, build, evidence, runtime_source, output):
    """Explicitly refuse incomplete material closure; no implicit trust/approval."""
    root = pathlib.Path(root)
    if not root.is_dir() or root.is_symlink():
        raise ValueError('ASSEMBLY_ROOT')
    read_material(ffmpeg_source, *SOURCE_PINS['ffmpeg'])
    read_material(nasm_source, *SOURCE_PINS['nasm'])
    for binary, pin in SIMD_BINARY_PINS.items():
        read_material(pathlib.Path(build) / binary, pin)
    # The full assembly/source/toolchain/license manifest is not yet reviewed.
    # Fail closed even with both real source archives and candidate executables.
    raise ValueError('ASSEMBLY_MATERIAL_CLOSURE_NOT_REVIEWED')
