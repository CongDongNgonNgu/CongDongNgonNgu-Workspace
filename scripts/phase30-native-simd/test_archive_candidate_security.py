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

    def test_oversized_text_is_rejected_before_decode_allocation(self):
        class DecodeForbidden(bytes):
            def decode(self, *args, **kwargs):
                raise AssertionError('DECODE_BEFORE_BYTE_BOUND')
        data = DecodeForbidden(b'a' * (candidate.CAPSULE_LIMIT + 1))
        with self.assertRaises(ValueError):
            candidate.encode_capsule('SIMD_OBSERVED_TEXT_ONLY', {'x': data}, {'x'})

    @unittest.skipUnless(os.name == 'posix', 'requires POSIX symlink/FIFO support')
    def test_leaf_symlink_and_fifo_substitution_are_denied(self):
        with tempfile.TemporaryDirectory(prefix='phase30-material-type-') as directory:
            root = pathlib.Path(directory)
            file, other = root / 'input', root / 'other'
            other.write_bytes(b'original')
            file.symlink_to(other)
            with self.assertRaises(ValueError):
                candidate.read_material(file)
            file.unlink()
            file.write_bytes(b'original')
            original_open = os.open
            def replace_with_fifo(name, flags):
                self.assertTrue(flags & os.O_NONBLOCK)
                self.assertTrue(flags & os.O_NOFOLLOW)
                file.unlink()
                os.mkfifo(file)
                return original_open(name, flags)
            with mock.patch.object(candidate.os, 'open', side_effect=replace_with_fifo):
                with self.assertRaises(ValueError):
                    candidate.read_material(file)

    def test_material_growth_during_read_is_denied(self):
        with tempfile.TemporaryDirectory(prefix='phase30-material-growth-') as directory:
            file = pathlib.Path(directory) / 'input'
            file.write_bytes(b'original')
            original_read, changed = os.read, False
            def grow(fd, maximum):
                nonlocal changed
                data = original_read(fd, maximum)
                if not changed:
                    changed = True
                    with file.open('ab') as output:
                        output.write(b'x')
                return data
            with mock.patch.object(candidate.os, 'read', side_effect=grow):
                with self.assertRaises(ValueError):
                    candidate.read_material(file)

    def test_material_path_replacement_during_read_is_denied(self):
        with tempfile.TemporaryDirectory(prefix='phase30-material-replacement-') as directory:
            file, replacement = pathlib.Path(directory) / 'input', pathlib.Path(directory) / 'replacement'
            file.write_bytes(b'original')
            replacement.write_bytes(b'original')
            original_read, changed = os.read, False
            def swap(fd, maximum):
                nonlocal changed
                data = original_read(fd, maximum)
                if not changed:
                    changed = True
                    replacement.replace(file)
                return data
            with mock.patch.object(candidate.os, 'read', side_effect=swap):
                with self.assertRaises(ValueError):
                    candidate.read_material(file)

    def test_helper_read_is_bounded_before_hash_or_execution(self):
        with tempfile.TemporaryDirectory(prefix='phase30-helper-bound-') as directory:
            file = pathlib.Path(directory) / 'helper.py'
            file.write_bytes(b'a' * 65537)
            with mock.patch.object(candidate, 'BASE_HELPER', file):
                with self.assertRaisesRegex(ValueError, 'MATERIAL_TYPE_OR_SIZE'):
                    candidate.load_base_helpers()

    def test_core_collection_checks_both_binary_inputs_and_stays_incomplete(self):
        calls = []
        def read(file, sha, *args):
            calls.append((pathlib.Path(file).name, sha))
            return b'synthetic-call-observation-only'
        with mock.patch.object(candidate, 'read_material', side_effect=read):
            result = candidate.collect_core_materials('/owned/ffmpeg.tar.gz', '/owned/nasm.tar.gz', '/owned/build')
        self.assertEqual(result['scope'], 'CORE_FOUR_INPUTS_ONLY_NOT_MATERIAL_CLOSURE')
        self.assertEqual(result['licenseClearance'], 'HOLD')
        self.assertEqual(len(result['files']), 4)
        self.assertIn(('ffmpeg', '031ffb3a5ccd03437daf983c121b9f01d3974ed8e295057faa912925f84db5f3'), calls)
        self.assertIn(('ffprobe', '36e837d351e47d525dd6438f0141c2c7dc4bc7d49e27e3836acff137a601b9b3'), calls)

if __name__ == '__main__':
    unittest.main()
