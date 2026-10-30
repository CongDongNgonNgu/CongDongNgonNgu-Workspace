"""Candidate archive boundaries; no application/native execution."""
import gzip
import hashlib
import importlib.util
import io
import pathlib
import tarfile
import tempfile
import unittest
from unittest import mock

spec = importlib.util.spec_from_file_location('bundle', pathlib.Path(__file__).with_name('bundle.py'))
bundle = importlib.util.module_from_spec(spec)
spec.loader.exec_module(bundle)

class CandidateTests(unittest.TestCase):
    def fixture(self, entries):
        stream = io.BytesIO()
        with tarfile.open(fileobj=stream, mode='w:gz') as archive:
            for name, data, kind in entries:
                member = tarfile.TarInfo(name)
                member.type = kind
                member.mode = 0o400
                member.size = len(data)
                archive.addfile(member, io.BytesIO(data))
        return stream.getvalue()

    def verify(self, data, expected):
        with tempfile.TemporaryDirectory() as directory:
            target = pathlib.Path(directory) / 'candidate.tar.gz'
            target.write_bytes(data)
            return bundle.verify_archive(target, expected)

    def expected(self):
        return {'source/ffmpeg.tar.gz': {'bytes': 3, 'sha256': hashlib.sha256(b'abc').hexdigest()}}

    def test_exact_member_readback(self):
        self.verify(self.fixture([('source/ffmpeg.tar.gz', b'abc', tarfile.REGTYPE)]), self.expected())

    def test_member_mutations_fail(self):
        for name, data, kind in [
            ('../source/ffmpeg.tar.gz', b'abc', tarfile.REGTYPE),
            ('/source/ffmpeg.tar.gz', b'abc', tarfile.REGTYPE),
            ('source/../ffmpeg.tar.gz', b'abc', tarfile.REGTYPE),
            ('source\\ffmpeg.tar.gz', b'abc', tarfile.REGTYPE),
            ('source/ffmpeg.tar.gz', b'abd', tarfile.REGTYPE),
            ('source/ffmpeg.tar.gz', b'abcd', tarfile.REGTYPE),
            ('source/ffmpeg.tar.gz', b'abc', tarfile.SYMTYPE),
            ('source/ffmpeg.tar.gz', b'abc', tarfile.LNKTYPE),
            ('source/ffmpeg.tar.gz', b'abc', tarfile.DIRTYPE),
            ('source/ffmpeg.tar.gz', b'abc', tarfile.FIFOTYPE),
        ]:
            with self.subTest(name=name, kind=kind):
                with self.assertRaises(ValueError):
                    self.verify(self.fixture([(name, data, kind)]), self.expected())

    def test_extras_duplicates_and_missing_fail(self):
        item = ('source/ffmpeg.tar.gz', b'abc', tarfile.REGTYPE)
        for entries in [[], [item, item], [item, ('extra', b'x', tarfile.REGTYPE)]]:
            with self.subTest(entries=len(entries)):
                with self.assertRaises(ValueError):
                    self.verify(self.fixture(entries), self.expected())

    def test_deterministic_archive(self):
        members = {'z/file': b'abc', 'a/file': b'def'}
        with tempfile.TemporaryDirectory() as directory:
            first, second = [pathlib.Path(directory) / name for name in ('a.tar.gz', 'b.tar.gz')]
            manifest = bundle.write_archive(first, members)
            self.assertEqual(manifest, bundle.write_archive(second, members))
            self.assertEqual(first.read_bytes(), second.read_bytes())
            bundle.verify_archive(first, manifest)

    def test_refuses_overwrite_and_invalid_output_names(self):
        with tempfile.TemporaryDirectory() as directory:
            target = pathlib.Path(directory) / 'candidate.tar.gz'
            target.write_bytes(b'owned')
            with self.assertRaises(FileExistsError):
                bundle.write_archive(target, {'safe/file': b'abc'})
            self.assertEqual(target.read_bytes(), b'owned')
            for name in ('../escape', '/absolute', 'a\\b', 'a//b', 'a/./b', 'a/new\nline', 'a/space name'):
                with self.subTest(name=name):
                    with self.assertRaises(ValueError):
                        bundle.write_archive(pathlib.Path(directory) / 'new.tar.gz', {name: b'abc'})

    def test_truncated_archive_fails(self):
        data = self.fixture([('source/ffmpeg.tar.gz', b'abc', tarfile.REGTYPE)])
        with self.assertRaises((ValueError, tarfile.TarError, EOFError)):
            self.verify(data[:20], self.expected())

    def test_material_hash_size_and_regular_file(self):
        with tempfile.TemporaryDirectory() as directory:
            target = pathlib.Path(directory) / 'material'
            target.write_bytes(b'abc')
            self.assertEqual(bundle.read_material(target, hashlib.sha256(b'abc').hexdigest(), 3), b'abc')
            for sha, size in [('0' * 64, 3), (None, 4)]:
                with self.assertRaises(ValueError):
                    bundle.read_material(target, sha, size)
            target.write_bytes(b'')
            with self.assertRaises(ValueError):
                bundle.read_material(target)
            with self.assertRaises(ValueError):
                bundle.read_material(pathlib.Path(directory))

    def test_material_symlink_rejected(self):
        with tempfile.TemporaryDirectory() as directory:
            target = pathlib.Path(directory) / 'material'
            target.write_bytes(b'abc')
            link = pathlib.Path(directory) / 'link'
            link.symlink_to(target)
            with self.assertRaises(ValueError):
                bundle.read_material(link)

    def test_complete_gzip_footer_crc_and_trailing_content(self):
        data = self.fixture([('source/ffmpeg.tar.gz', b'abc', tarfile.REGTYPE)])
        for changed in (data[:-8], data[:-8] + bytes([data[-8] ^ 1]) + data[-7:], data + b'garbage', data + data):
            with self.subTest(length=len(changed)):
                with self.assertRaises(ValueError):
                    self.verify(changed, self.expected())
        raw = gzip.decompress(data)
        padded = bytearray(raw)
        padded[515] = 1
        with self.assertRaises(ValueError):
            self.verify(gzip.compress(padded), self.expected())
        # A second tar after the first archive's terminator is not zero padding.
        with self.assertRaises(ValueError):
            self.verify(gzip.compress(raw + raw), self.expected())
        with self.assertRaises(ValueError):
            self.verify(gzip.compress(raw + b'garbage'), self.expected())

    def test_parent_file_collision_rejected(self):
        with tempfile.TemporaryDirectory() as directory:
            with self.assertRaises(ValueError):
                bundle.write_archive(pathlib.Path(directory) / 'out.tar.gz', {'a': b'x', 'a/file': b'y'})

    def test_expansion_and_compressed_size_caps(self):
        with mock.patch.object(bundle, 'MAX_TOTAL', 1024):
            with self.assertRaises(ValueError):
                self.verify(gzip.compress(b'\0' * 2048), self.expected())
        data = self.fixture([('source/ffmpeg.tar.gz', b'abc', tarfile.REGTYPE)])
        with mock.patch.object(bundle, 'MAX_TOTAL', 16):
            with self.assertRaises(ValueError):
                self.verify(data, self.expected())

    def test_member_count_and_file_size_caps(self):
        with tempfile.TemporaryDirectory() as directory:
            target = pathlib.Path(directory) / 'candidate.tar.gz'
            with mock.patch.object(bundle, 'MAX_MEMBERS', 1):
                with self.assertRaises(ValueError):
                    bundle.write_archive(target, {'a': b'x', 'b': b'y'})
            with mock.patch.object(bundle, 'MAX_FILE', 2):
                with self.assertRaises(ValueError):
                    bundle.write_archive(target, {'a': b'abc'})
                data = self.fixture([('source/ffmpeg.tar.gz', b'abc', tarfile.REGTYPE)])
                with self.assertRaises(ValueError):
                    self.verify(data, self.expected())
            self.assertFalse(target.exists())

if __name__ == '__main__':
    unittest.main()
