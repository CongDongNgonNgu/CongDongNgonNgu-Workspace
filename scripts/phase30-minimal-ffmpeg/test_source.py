import importlib.util
import io
import pathlib
import tarfile
import tempfile
import unittest

spec = importlib.util.spec_from_file_location('source_check', pathlib.Path(__file__).with_name('check-source.py'))
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)
ROOT = 'FFmpeg-6dfaba896fddaea098abec8ac84ff67375a7c6f1/'

class SourceArchiveTests(unittest.TestCase):
    def check_members(self, members):
        with tempfile.TemporaryDirectory() as temporary:
            archive = pathlib.Path(temporary) / 'source.tar.gz'
            with tarfile.open(archive, 'w:gz') as output:
                for name, kind in members:
                    entry = tarfile.TarInfo(name)
                    entry.type = kind
                    entry.size = 1 if kind == tarfile.REGTYPE else 0
                    if kind == tarfile.SYMTYPE:
                        entry.linkname = '/outside'
                    output.addfile(entry, io.BytesIO(b'x') if entry.size else None)
            return module.check_archive(archive)

    def test_accepts_owned_regular_source(self):
        self.assertEqual(self.check_members([(ROOT + 'configure', tarfile.REGTYPE)])['files'], 1)

    def test_rejects_traversal(self):
        with self.assertRaises(ValueError):
            self.check_members([(ROOT + '../outside', tarfile.REGTYPE)])

    def test_rejects_absolute_paths(self):
        with self.assertRaises(ValueError):
            self.check_members([('/outside', tarfile.REGTYPE)])

    def test_rejects_symlinks(self):
        with self.assertRaises(ValueError):
            self.check_members([(ROOT + 'link', tarfile.SYMTYPE)])

    def test_rejects_foreign_root(self):
        with self.assertRaises(ValueError):
            self.check_members([('foreign/configure', tarfile.REGTYPE)])

    def test_rejects_duplicate_paths(self):
        with self.assertRaises(ValueError):
            self.check_members([(ROOT + 'configure', tarfile.REGTYPE)] * 2)

    def test_rejects_backslash_paths(self):
        with self.assertRaises(ValueError):
            self.check_members([(ROOT + 'sub\\outside', tarfile.REGTYPE)])

if __name__ == '__main__':
    unittest.main()