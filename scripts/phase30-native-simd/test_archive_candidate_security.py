"""Security regressions for offline source guard boundaries; no native execution."""
import importlib.util
import os
import pathlib
import tempfile
import unittest
from unittest import mock

HERE = pathlib.Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('archive_security', HERE / 'archive-candidate.py')
candidate = importlib.util.module_from_spec(spec)
spec.loader.exec_module(candidate)

class ArchiveSecurityTests(unittest.TestCase):
    def test_verified_helper_bytes_are_executed_without_reopening_loader(self):
        raw = candidate.BASE_HELPER.read_bytes()
        with mock.patch.object(candidate, 'read_material', return_value=raw) as reader:
            with mock.patch.object(importlib.util, 'spec_from_file_location', side_effect=AssertionError('SECOND_OPEN_OR_PYC')):
                helper = candidate.load_base_helpers()
        reader.assert_called_once()
        self.assertEqual(helper.MAX_TOTAL, 64 * 1024 * 1024)

    def test_failed_exclusive_write_preserves_concurrent_creator(self):
        with tempfile.TemporaryDirectory(prefix='phase30-archive-race-') as directory:
            target = pathlib.Path(directory) / 'candidate.tar.gz'
            helper = candidate.load_base_helpers()
            def conflicting_writer(output, members):
                output.write_bytes(b'OTHER_CREATOR')
                raise FileExistsError('exclusive writer lost race')
            with mock.patch.object(candidate, 'load_base_helpers', return_value=helper):
                with mock.patch.object(helper, 'write_archive', side_effect=conflicting_writer):
                    with self.assertRaises(FileExistsError):
                        candidate.write_verified_candidate(target, {'evidence/x': b'x'})
            self.assertEqual(target.read_bytes(), b'OTHER_CREATOR')

    @unittest.skipUnless(os.name == 'posix', 'requires POSIX symlinks')
    def test_parent_symlink_is_denied_for_material_and_output(self):
        with tempfile.TemporaryDirectory(prefix='phase30-archive-parent-') as directory:
            root = pathlib.Path(directory)
            real = root / 'real'
            real.mkdir()
            (real / 'input').write_bytes(b'original')
            alias = root / 'alias'
            alias.symlink_to(real, target_is_directory=True)
            with self.assertRaises(ValueError):
                candidate.read_material(alias / 'input')
            with self.assertRaises(ValueError):
                candidate.write_verified_candidate(alias / 'candidate.tar.gz', {'x': b'x'})

    def test_text_scope_rejects_binary_and_control_bytes(self):
        for data in [b'\x00ELF', b'\xff\xfe', b'bad\x1bcontrol']:
            with self.subTest(data=data):
                with self.assertRaises(ValueError):
                    candidate.encode_capsule('SIMD_OBSERVED_TEXT_ONLY', {'evidence/x': data}, {'evidence/x'})

    def test_record_count_is_checked_before_base64_decode(self):
        import json
        records = [{'name': 'x', 'size': 1, 'sha256': '0' * 64, 'base64': 'eA=='}] * 65
        encoded = json.dumps({'scope': 'SIMD_OBSERVED_TEXT_ONLY', 'files': records}).encode()
        with mock.patch.object(candidate.base64, 'b64decode', side_effect=AssertionError('DECODE_BEFORE_BOUND')):
            with self.assertRaises(ValueError):
                candidate.decode_capsule(encoded, 'SIMD_OBSERVED_TEXT_ONLY', {'x'})

    def test_both_candidate_executables_have_exact_pins(self):
        self.assertEqual(candidate.SIMD_BINARY_PINS.get('ffprobe'), '36e837d351e47d525dd6438f0141c2c7dc4bc7d49e27e3836acff137a601b9b3')

    def test_archive_readback_uses_total_bound_instead_of_individual_material_bound(self):
        with tempfile.TemporaryDirectory(prefix='phase30-archive-total-') as directory:
            data = os.urandom(11_000_000)
            proof = candidate.write_verified_candidate(pathlib.Path(directory) / 'candidate.tar.gz', {'source/a': data, 'source/b': data})
            self.assertGreater(proof['archiveBytes'], 20_000_000)
            self.assertEqual(proof['readback'], 'PASS')

if __name__ == '__main__':
    unittest.main()
