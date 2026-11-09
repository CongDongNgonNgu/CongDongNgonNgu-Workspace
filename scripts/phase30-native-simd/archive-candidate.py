"""Fail-closed, source-only candidate archive material guards.

No executable is built, published, selected or adopted by this module.
The accepted baseline bundle helper is loaded byte-for-byte and hash checked.
"""
import base64
import hashlib
import types
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
    'ffprobe': '36e837d351e47d525dd6438f0141c2c7dc4bc7d49e27e3836acff137a601b9b3',
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
    # Execute these verified bytes, never reopen the path or accept cached pyc.
    raw = read_material(BASE_HELPER, BASE_HELPER_RAW_SHA256, maximum=65536)
    module = types.ModuleType('pinned_ffmpeg_bundle')
    module.__file__ = str(BASE_HELPER)
    exec(compile(raw, str(BASE_HELPER), 'exec'), module.__dict__)
    return module


def _parents(file):
    # Fresh owned offline inputs/outputs require no concurrent directory writers.
    # Before/after checks detect observed changes; these are not atomic dirfd walks.
    result = []
    for parent in reversed(file.parents):
        info = parent.lstat()
        if not stat.S_ISDIR(info.st_mode):
            raise ValueError('MATERIAL_PARENT')
        result.append((str(parent), info.st_dev, info.st_ino))
    return result


def _identity(info):
    return (info.st_dev, info.st_ino, info.st_size, info.st_mtime_ns, info.st_ctime_ns)


def _read_regular(file, maximum):
    if type(maximum) is not int or not 0 < maximum <= 64 * 1024 * 1024:
        raise ValueError('MATERIAL_LIMIT')
    p = pathlib.Path(os.path.abspath(file))
    parents = _parents(p)
    before = p.lstat()
    if not stat.S_ISREG(before.st_mode) or not 0 < before.st_size <= maximum:
        raise ValueError('MATERIAL_TYPE_OR_SIZE')
    fd = os.open(p, os.O_RDONLY | getattr(os, 'O_NOFOLLOW', 0) |
                 getattr(os, 'O_NONBLOCK', 0))
    try:
        opened = os.fstat(fd)
        if not stat.S_ISREG(opened.st_mode) or _identity(opened) != _identity(before):
            raise ValueError('MATERIAL_IDENTITY')
        chunks, remaining = [], opened.st_size
        while remaining:
            data = os.read(fd, min(remaining, 1024 * 1024))
            if not data:
                raise ValueError('MATERIAL_SHORT_READ')
            chunks.append(data)
            remaining -= len(data)
        if os.read(fd, 1):
            raise ValueError('MATERIAL_GROWTH')
        after, named = os.fstat(fd), p.lstat()
        if (not stat.S_ISREG(named.st_mode) or _identity(after) != _identity(opened)
                or _identity(named) != _identity(opened) or _parents(p) != parents):
            raise ValueError('MATERIAL_CHANGED')
        return b''.join(chunks)
    finally:
        os.close(fd)


def read_material(file, sha=None, exact_size=None, maximum=MAX_MATERIAL):
    if type(maximum) is not int or not 0 < maximum <= MAX_MATERIAL:
        raise ValueError('MATERIAL_LIMIT')
    if sha is not None and (not isinstance(sha, str) or not re.fullmatch(r'[0-9a-f]{64}', sha)):
        raise ValueError('MATERIAL_HASH_PIN')
    if exact_size is not None and (type(exact_size) is not int or not 0 < exact_size <= maximum):
        raise ValueError('MATERIAL_SIZE_PIN')
    data = _read_regular(file, maximum)
    if exact_size is not None and len(data) != exact_size:
        raise ValueError('MATERIAL_SIZE')
    if sha is not None and digest(data) != sha:
        raise ValueError('MATERIAL_HASH')
    return data


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
        try:
            text = data.decode('utf-8', errors='strict')
        except UnicodeError as error:
            raise ValueError('CAPSULE_UTF8') from error
        if re.search(r'[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]', text):
            raise ValueError('CAPSULE_CONTROL')
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
                obj['scope'] != scope or type(obj['files']) is not list
                or not 0 < len(obj['files']) <= 64):
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
    """Boundary proof only. Preserve failed/partial files for separate owned cleanup."""
    helper = load_base_helpers()
    if not isinstance(members, dict) or not members:
        raise ValueError('ARCHIVE_MEMBERS')
    target = pathlib.Path(os.path.abspath(output))
    repeat = pathlib.Path(str(target) + '.repeat.tar.gz')
    parents = _parents(target)
    if target.exists() or target.is_symlink() or repeat.exists() or repeat.is_symlink():
        raise FileExistsError('ARCHIVE_DESTINATION_EXISTS')
    # Exclusive writer failures never authorize deletion of either pathname.
    manifest = helper.write_archive(target, members)
    if _parents(target) != parents:
        raise ValueError('ARCHIVE_PARENT_CHANGED')
    helper.verify_archive(target, manifest)
    second = helper.write_archive(repeat, members)
    if _parents(repeat) != parents:
        raise ValueError('ARCHIVE_PARENT_CHANGED')
    helper.verify_archive(repeat, second)
    first_bytes = _read_regular(target, helper.MAX_TOTAL)
    second_bytes = _read_regular(repeat, helper.MAX_TOTAL)
    if manifest != second or first_bytes != second_bytes:
        raise ValueError('ARCHIVE_NONDETERMINISM')
    return {'scope': 'ARCHIVE_BOUNDARY_ONLY_NOT_MATERIAL_CLEARANCE',
            'readback': 'PASS', 'sameInputsTwoArchiveWrites': 'IDENTICAL',
            'archiveSha256': digest(first_bytes), 'archiveBytes': len(first_bytes),
            'nativePublication': 'NOT_RUN', 'backendAdoption': 'NOT_RUN',
            'renderAcceptance': 'NOT_RUN', 'licenseClearance': 'HOLD'}


def collect_core_materials(ffmpeg_source, nasm_source, build):
    """Four exact inputs only; no complete source/toolchain/license assembly claim."""
    files = {
        'source/ffmpeg.tar.gz': read_material(ffmpeg_source, *SOURCE_PINS['ffmpeg']),
        'source/nasm.tar.gz': read_material(nasm_source, *SOURCE_PINS['nasm']),
    }
    for binary, pin in SIMD_BINARY_PINS.items():
        files['bin/' + binary] = read_material(pathlib.Path(build) / binary, pin)
    return {'scope': 'CORE_FOUR_INPUTS_ONLY_NOT_MATERIAL_CLOSURE',
            'files': files, 'licenseClearance': 'HOLD'}
