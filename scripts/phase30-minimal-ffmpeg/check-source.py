"""Inspect a pinned source archive; never extract or execute it here."""
import hashlib
import json
import pathlib
import sys
import tarfile

ROOT = 'FFmpeg-6dfaba896fddaea098abec8ac84ff67375a7c6f1'
MAX_ARCHIVE = 20_000_000
MAX_MEMBERS = 25_000
MAX_FILE = 10_000_000
MAX_EXPANDED = 256_000_000
CONFIGURE_SHA = '5b281b249ad5ad859030b4da0a24ec105b5abff7b3d87a65b302df8bf5fd9833'


def check_archive(path):
    if pathlib.Path(path).stat().st_size > MAX_ARCHIVE:
        raise ValueError('SOURCE_ARCHIVE_LIMIT')
    files = expanded = 0
    seen = {}
    with tarfile.open(path, 'r:gz') as archive:
        for member in archive:
            if len(seen) >= MAX_MEMBERS:
                raise ValueError('SOURCE_MEMBER_LIMIT')
            name = member.name.rstrip('/')
            parts = name.split('/')
            if (parts[0] != ROOT or chr(92) in name or
                    any(part in ('', '.', '..') for part in parts) or
                    (len(parts) == 1 and not member.isdir())):
                raise ValueError('SOURCE_PATH')
            if member.type not in (tarfile.REGTYPE, tarfile.AREGTYPE, tarfile.DIRTYPE) or member.linkname:
                raise ValueError('SOURCE_ENTRY_TYPE')
            if name in seen:
                raise ValueError('SOURCE_DUPLICATE')
            if member.size < 0 or member.size > MAX_FILE:
                raise ValueError('SOURCE_FILE_LIMIT')
            if member.isdir() and member.size:
                raise ValueError('SOURCE_DIRECTORY_DATA')
            if any(seen.get('/'.join(parts[:i])) == 'file' for i in range(1, len(parts))):
                raise ValueError('SOURCE_PARENT_FILE')
            if member.isfile() and any(key.startswith(name + '/') for key in seen):
                raise ValueError('SOURCE_PARENT_COLLISION')
            seen[name] = 'directory' if member.isdir() else 'file'
            expanded += member.size
            files += int(member.isfile())
            if expanded > MAX_EXPANDED:
                raise ValueError('SOURCE_EXPANDED_LIMIT')
    if files < 1:
        raise ValueError('SOURCE_EMPTY')
    return {'files': files, 'members': len(seen), 'expandedBytes': expanded}


if __name__ == '__main__':
    if len(sys.argv) != 2:
        raise ValueError('SOURCE_ARGUMENTS')
    result = check_archive(sys.argv[1])
    with tarfile.open(sys.argv[1], 'r:gz') as archive:
        member = archive.getmember(ROOT + '/configure')
        if not member.isfile() or member.size > 1_000_000:
            raise ValueError('SOURCE_CONFIGURE_TYPE')
        with archive.extractfile(member) as source:
            if hashlib.sha256(source.read()).hexdigest() != CONFIGURE_SHA:
                raise ValueError('SOURCE_CONFIGURE_HASH')
    print(json.dumps(result, sort_keys=True))