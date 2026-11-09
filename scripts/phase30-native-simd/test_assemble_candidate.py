"""Full candidate assembly prerequisites; never execute or adopt native binaries."""
import contextlib
import hashlib
import io
import json
import tarfile
from unittest import mock
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


    @staticmethod
    def archive(root, names, duplicate=None):
        output = io.BytesIO()
        with tarfile.open(fileobj=output, mode='w:gz') as archive:
            for name in list(names) + ([duplicate] if duplicate else []):
                data = ('original ' + name + '\n').encode()
                entry = tarfile.TarInfo(root + '/' + name)
                entry.size = len(data)
                archive.addfile(entry, io.BytesIO(data))
        return output.getvalue()

    def test_original_notice_selection_rejects_missing_duplicate_and_links(self):
        raw = self.archive('upstream', ['LICENSE', 'AUTHORS'])
        self.assertEqual(set(assembly.notices(raw, 'upstream', {'LICENSE', 'AUTHORS'})), {'LICENSE', 'AUTHORS'})
        with self.assertRaises(ValueError):
            assembly.notices(raw, 'upstream', {'MISSING'})
        with self.assertRaises(ValueError):
            assembly.notices(self.archive('upstream', ['LICENSE'], 'LICENSE'), 'upstream', {'LICENSE'})
        output = io.BytesIO()
        with tarfile.open(fileobj=output, mode='w:gz') as archive:
            entry = tarfile.TarInfo('upstream/LICENSE')
            entry.type, entry.linkname = tarfile.SYMTYPE, '/outside'
            archive.addfile(entry)
        with self.assertRaises(ValueError):
            assembly.notices(output.getvalue(), 'upstream', {'LICENSE'})

    def test_duplicate_json_manifest_field_rejected(self):
        with self.assertRaises(ValueError):
            assembly.strict_json(b'{"bytes":1,"bytes":2}')

    def make_observations(self, directory, guard):
        directory.mkdir()
        data = b'current observation\n'
        records = {}
        for name in assembly.OBSERVATIONS:
            (directory / name).write_bytes(data)
            records[name] = {'sourceIndex': 0, 'bytes': len(data), 'sha256': guard.digest(data)}
        manifest = {'scope': 'RESEARCH_TEXT_ONLY_NOT_BINARY_OR_SOURCE_CLOSURE',
                    'files': records, 'missing': ['candidate-archive-proof.json'],
                    'bytes': len(data) * len(records)}
        (directory / 'manifest.json').write_text(json.dumps(manifest), encoding='utf-8')
        return data

    def test_observations_closed_hash_checked_and_dynamic_not_historical_pinned(self):
        guard = assembly.load_guard()
        with tempfile.TemporaryDirectory() as directory, mock.patch.object(assembly, 'DERIVED_PINS', {}):
            root = pathlib.Path(directory) / 'observations'
            original = self.make_observations(root, guard)
            self.assertEqual(set(assembly.observations(root, guard)), set(assembly.OBSERVATIONS))
            changed = root / 'build.log'
            changed.write_bytes(b'altered')
            with self.assertRaises(ValueError):
                assembly.observations(root, guard)
            changed.write_bytes(original)
            extra = root / 'unapproved.txt'
            extra.write_bytes(b'not owned')
            with self.assertRaises(ValueError):
                assembly.observations(root, guard)
            extra.unlink()
            changed.unlink()
            with self.assertRaises(ValueError):
                assembly.observations(root, guard)

    @contextlib.contextmanager
    def synthetic_assembly(self, root):
        # Native/source pin admission is independently covered by the guard tests.
        # Substitute only those four synthetic inputs, retaining actual archive,
        # capsule, runtime-material reads, checks and both disk readbacks here.
        guard = assembly.load_guard()
        base = guard.load_base_helpers()
        repo, runtime, observed = root / 'repo', root / 'runtime', root / 'observations'
        minimal = repo / 'scripts/phase30-minimal-ffmpeg'
        (minimal / 'runtime-source').mkdir(parents=True)
        (minimal / 'notices/gcc').mkdir(parents=True)
        runtime.mkdir()
        members = {'source/ffmpeg.tar.gz': self.archive(base.ROOT, base.NOTICES),
                   'source/nasm.tar.gz': self.archive('nasm-2.16.03', ['LICENSE', 'AUTHORS']),
                   'bin/ffmpeg': b'synthetic executable never executed',
                   'bin/ffprobe': b'synthetic probe never executed'}
        manifest = {'downloads': [], 'local': []}
        for index in range(7):
            name, data = 'part-' + str(index), ('source material ' + str(index)).encode()
            kind = 'downloads' if index < 3 else 'local'
            target = runtime if kind == 'downloads' else minimal / 'runtime-source'
            (target / name).write_bytes(data)
            manifest[kind].append({'file': name, 'member': 'source/runtime/' + name,
                                   'bytes': len(data), 'sha256': guard.digest(data)})
        material = {'runtime-source/manifest.json': json.dumps(manifest).encode(),
                    'runtime-source/SOURCE-MATERIALS.md': b'original materials\n',
                    'notices/gcc/manifest.json': b'{"synthetic":true}\n'}
        for name, data in material.items():
            (minimal / name).write_bytes(data)
        for name in base.GCC_NOTICES:
            data = (HERE.parent / 'phase30-minimal-ffmpeg/notices/gcc' / name).read_bytes()
            (minimal / 'notices/gcc' / name).write_bytes(data)
        (repo / 'recipe.sh').write_bytes(b'fixed recipe\n')
        self.make_observations(observed, guard)
        with contextlib.ExitStack() as stack:
            stack.enter_context(mock.patch.object(assembly, 'load_guard', return_value=guard))
            stack.enter_context(mock.patch.object(guard, 'collect_core_materials', return_value={'files': members}))
            stack.enter_context(mock.patch.object(assembly, 'MATERIAL_PINS', {k: guard.digest(v) for k, v in material.items()}))
            stack.enter_context(mock.patch.object(assembly, 'STATIC_PINS', {'recipe.sh': guard.digest(b'fixed recipe\n')}))
            stack.enter_context(mock.patch.object(assembly, 'DERIVED_PINS', {}))
            yield (root / 'build', root / 'ffmpeg.tar.gz', root / 'nasm.tar.gz', observed,
                   repo, runtime, root / 'candidate.tar.gz')

    def test_complete_synthetic_assembly_has_two_actual_readbacks_and_success_only_proof(self):
        with tempfile.TemporaryDirectory() as directory:
            with self.synthetic_assembly(pathlib.Path(directory)) as args:
                proof_path = pathlib.Path(directory) / 'proof.json'
                assembly.main([str(arg) for arg in args] + [str(proof_path)])
                proof = json.loads(proof_path.read_bytes())
                self.assertEqual(proof['capsuleReadback'], 'PASS')
                self.assertEqual(proof['materialClearance'], 'HOLD_INDEPENDENT_REVIEW')
                self.assertEqual(proof['archiveSha256'], proof['repeatArchiveSha256'])
                self.assertEqual(proof['archiveSha256'], hashlib.sha256(args[-1].read_bytes()).hexdigest())
                self.assertEqual(len(proof['capsuleInventories']['evidence/observations.json']), 63)
                self.assertEqual(len([name for name in proof['members'] if name.startswith('source/runtime/')]), 7)
                self.assertEqual(proof['backendAdoption'], 'NOT_RUN')
                with tarfile.open(args[-1], 'r:gz') as archive:
                    self.assertEqual(set(proof['members']), set(archive.getnames()))
                    self.assertIn('manifest.json', proof['members'])
                with self.assertRaises(FileExistsError):
                    assembly.main([str(arg) for arg in args] + [str(proof_path)])

    def test_missing_seventh_source_and_mutated_recipe_fail_before_any_output_or_proof(self):
        for mutation in ('runtime', 'recipe'):
            with self.subTest(mutation=mutation), tempfile.TemporaryDirectory() as directory:
                with self.synthetic_assembly(pathlib.Path(directory)) as args:
                    if mutation == 'runtime':
                        (args[4] / 'scripts/phase30-minimal-ffmpeg/runtime-source/part-6').unlink()
                    else:
                        (args[4] / 'recipe.sh').write_bytes(b'changed recipe')
                    proof = pathlib.Path(directory) / 'proof.json'
                    with self.assertRaises((ValueError, FileNotFoundError)):
                        assembly.main([str(arg) for arg in args] + [str(proof)])
                    self.assertFalse(args[-1].exists())
                    self.assertFalse(pathlib.Path(str(args[-1]) + '.repeat.tar.gz').exists())
                    self.assertFalse(proof.exists())

    def test_inner_readback_rejects_disk_capsule_substitution(self):
        guard = assembly.load_guard()
        with tempfile.TemporaryDirectory() as directory:
            output = pathlib.Path(directory) / 'candidate.tar.gz'
            actual, expected = {'recipe.sh': b'actual\n'}, {'recipe.sh': b'expected\n'}
            encoded = guard.encode_capsule('SIMD_BUILD_INPUT_TEXT_ONLY', actual, set(actual))
            proof = guard.write_verified_candidate(output, {'capsule.json': encoded, 'other.txt': b'original'})
            with self.assertRaises(ValueError):
                assembly.readback_capsules(output, guard, {'capsule.json': ('SIMD_BUILD_INPUT_TEXT_ONLY', expected)}, proof['archiveSha256'])
            # Valid replacement archive with the same capsule but altered other bytes.
            replaced = pathlib.Path(directory) / 'replacement.tar.gz'
            guard.write_verified_candidate(replaced, {'capsule.json': encoded, 'other.txt': b'corrupted'})
            with self.assertRaisesRegex(ValueError, 'ARCHIVE_READBACK_IDENTITY'):
                assembly.readback_capsules(replaced, guard, {'capsule.json': ('SIMD_BUILD_INPUT_TEXT_ONLY', actual)}, proof['archiveSha256'])


if __name__ == '__main__':
    unittest.main()
