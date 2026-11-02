"""Required source closure must fail closed on missing or mutated materials."""
import importlib.util
import pathlib
import tempfile
import unittest
from unittest import mock
import hashlib
spec = importlib.util.spec_from_file_location('bundle', pathlib.Path(__file__).with_name('bundle.py'))
bundle = importlib.util.module_from_spec(spec)
spec.loader.exec_module(bundle)
class RuntimeSourceTests(unittest.TestCase):
    def test_cross_set_collision_cannot_overwrite_existing_material(self):
        existing={'source/ffmpeg.tar.gz':b'original'}
        with self.assertRaises(ValueError):
            bundle.merge_members(existing, {'source/ffmpeg.tar.gz':b'changed'})
        self.assertEqual(existing, {'source/ffmpeg.tar.gz':b'original'})
        bundle.merge_members(existing, {'source/gcc/x':b'added'})
        self.assertEqual(existing['source/gcc/x'], b'added')

    def test_required_materials_are_checked_before_candidate_assembly(self):
        with tempfile.TemporaryDirectory() as directory:
            root=pathlib.Path(directory)
            good=b'bounded synthetic source'
            pin={'file':'fixture.tar.xz','member':'source/glibc/fixture.tar.xz','bytes':len(good),'sha256':hashlib.sha256(good).hexdigest()}
            with self.assertRaises(FileNotFoundError):
                bundle.read_runtime_materials(root, [pin])
            (root/pin['file']).write_bytes(good)
            self.assertEqual(bundle.read_runtime_materials(root,[pin]), {pin['member']:good})
            for bad in [good+b'x', b'x'*len(good)]:
                (root/pin['file']).write_bytes(bad)
                with self.assertRaises(ValueError):
                    bundle.read_runtime_materials(root,[pin])
    def test_rejects_unsafe_names_duplicate_members_and_symlinks(self):
        with tempfile.TemporaryDirectory() as directory:
            root=pathlib.Path(directory)
            data=b'a'
            pin={'file':'x','member':'source/gcc/x','bytes':1,'sha256':hashlib.sha256(data).hexdigest()}
            (root/'x').write_bytes(data)
            for field,value in [('file','../x'),('file','sub/x'),('member','../x'),('member','/x')]:
                with self.assertRaises(ValueError):
                    bundle.read_runtime_materials(root,[{**pin,field:value}])
            with self.assertRaises(ValueError):
                bundle.read_runtime_materials(root,[pin,pin])
            with mock.patch.object(pathlib.Path,'is_symlink',return_value=True):
                with self.assertRaises(ValueError):
                    bundle.read_runtime_materials(root,[pin])
if __name__ == '__main__':
    unittest.main()
