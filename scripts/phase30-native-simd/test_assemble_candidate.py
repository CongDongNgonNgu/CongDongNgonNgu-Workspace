"""Full candidate assembly prerequisites; never execute or adopt native binaries."""
import importlib.util
import pathlib
import tempfile
import unittest

HERE = pathlib.Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('simd_assembly', HERE / 'assemble-candidate.py')
assembly = importlib.util.module_from_spec(spec)
spec.loader.exec_module(assembly)


class SimdAssemblyTests(unittest.TestCase):
    def test_missing_required_material_prevents_both_archive_writes(self):
        with tempfile.TemporaryDirectory(prefix='phase30-simd-assembly-') as directory:
            root = pathlib.Path(directory)
            output = root / 'candidate.tar.gz'
            with self.assertRaises((ValueError, FileNotFoundError)):
                assembly.assemble(
                    root / 'build', root / 'ffmpeg-source.tar.gz',
                    root / 'nasm-source.tar.gz', root / 'evidence',
                    HERE.parent.parent, root / 'runtime-source', output)
            self.assertFalse(output.exists())
            self.assertFalse(pathlib.Path(str(output) + '.repeat.tar.gz').exists())


if __name__ == '__main__':
    unittest.main()
