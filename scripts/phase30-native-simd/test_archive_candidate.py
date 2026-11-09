"""Source-only candidate boundaries; no processors, downloads or application changes."""
import hashlib
import importlib.util
import json
import pathlib
import tempfile
import unittest

HERE = pathlib.Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('simd_archive', HERE / 'archive-candidate.py')
candidate = importlib.util.module_from_spec(spec)
spec.loader.exec_module(candidate)


class SimdArchiveTests(unittest.TestCase):
    def test_pinned_base_helpers_remain_unchanged(self):
        core = candidate.load_base_helpers()
        self.assertEqual(candidate.BASE_HELPER_RAW_SHA256, '4375e9cfab5a4228a575c1b80802f2d4f0716fef3f2bbab81204a63392c4ecc5')
        self.assertEqual((core.MAX_FILE, core.MAX_TOTAL, core.MAX_MEMBERS), (20_000_000, 64 * 1024 * 1024, 64))
        self.assertEqual(core.BINARY_PINS['ffmpeg'], '2af1963c499a3005ad4d6037794b9e4bc383c7a1c0f545267297195d68f9ccee')
        self.assertEqual(candidate.SIMD_BINARY_PINS['ffmpeg'], '031ffb3a5ccd03437daf983c121b9f01d3974ed8e295057faa912925f84db5f3')

    def test_regular_material_hash_size_and_bound(self):
        with tempfile.TemporaryDirectory(prefix='phase30-simd-archive-') as directory:
            file = pathlib.Path(directory) / 'material'
            file.write_bytes(b'abc')
            self.assertEqual(candidate.read_material(file, hashlib.sha256(b'abc').hexdigest(), 3), b'abc')
            for sha, size in [('0' * 64, 3), (None, 4)]:
                with self.assertRaises(ValueError):
                    candidate.read_material(file, sha, size)
            with self.assertRaises(ValueError):
                candidate.read_material(file, maximum=2)
            with self.assertRaises(ValueError):
                candidate.read_material(pathlib.Path(directory))

    def test_capsule_is_lossless_and_closed(self):
        files = {'build/recipe.sh': b'\xef\xbb\xbf#!/bin/sh\n# source only\n'}
        encoded = candidate.encode_capsule('SIMD_BUILD_INPUT_TEXT_ONLY', files, set(files))
        self.assertEqual(candidate.decode_capsule(encoded, 'SIMD_BUILD_INPUT_TEXT_ONLY', set(files)), files)
        for names in [set(), {'build/missing.sh'}]:
            with self.assertRaises(ValueError):
                candidate.decode_capsule(encoded, 'SIMD_BUILD_INPUT_TEXT_ONLY', names)
        with self.assertRaises(ValueError):
            candidate.decode_capsule(encoded, 'SIMD_OBSERVED_TEXT_ONLY', set(files))

    def test_real_reviewed_text_capsule_roundtrip(self):
        receipt = HERE.parents[1] / 'phases/PHASE-30-RICH-MEDIA-ATTACHMENTS/evidence-002/simd-ci42155623305/raw-text.json'
        wrapper = json.loads(receipt.read_bytes())
        files = {record['name']: record['text'].encode('utf-8') for record in wrapper['files']}
        for record in wrapper['files']:
            self.assertEqual(len(files[record['name']]), record['bytes'])
            self.assertEqual(hashlib.sha256(files[record['name']]).hexdigest(), record['sha256'])
        encoded = candidate.encode_capsule('SIMD_OBSERVED_TEXT_ONLY', files, set(files))
        self.assertEqual(candidate.decode_capsule(encoded, 'SIMD_OBSERVED_TEXT_ONLY', set(files)), files)

    def test_two_archives_have_strict_readback_without_material_clearance_claim(self):
        with tempfile.TemporaryDirectory(prefix='phase30-simd-archive-') as directory:
            output = pathlib.Path(directory) / 'candidate.tar.gz'
            proof = candidate.write_verified_candidate(output, {'build/fixture.txt': b'synthetic boundary only\n'})
            self.assertEqual(proof['readback'], 'PASS')
            self.assertEqual(proof['sameInputsTwoArchiveWrites'], 'IDENTICAL')
            self.assertEqual(proof['scope'], 'ARCHIVE_BOUNDARY_ONLY_NOT_MATERIAL_CLEARANCE')
            self.assertEqual(output.read_bytes(), pathlib.Path(str(output) + '.repeat.tar.gz').read_bytes())
            with self.assertRaises(FileExistsError):
                candidate.write_verified_candidate(output, {'build/fixture.txt': b'changed'})

    def test_core_collection_requires_real_pinned_material(self):
        with tempfile.TemporaryDirectory(prefix='phase30-simd-archive-') as directory:
            root = pathlib.Path(directory)
            output = root / 'candidate.tar.gz'
            with self.assertRaises((ValueError, FileNotFoundError)):
                candidate.collect_core_materials(root / 'ffmpeg.tar.gz', root / 'nasm.tar.gz', root)
            self.assertFalse(output.exists())


if __name__ == '__main__':
    unittest.main()
