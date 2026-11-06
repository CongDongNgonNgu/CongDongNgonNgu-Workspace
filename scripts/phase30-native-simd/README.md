# Phase30 same-source assembly research: source guard only

This slice implements only the first prerequisite in [reviewed experiment boundary](../../phases/PHASE-30-RICH-MEDIA-ATTACHMENTS/CONTRACT-002-NATIVE-SIMD-CANDIDATE.md). No source extraction, compilation, candidate binary, dependency/pin update, deployment or format activation occurs. Existing minimal FFmpeg recipe and application flags remain unchanged.002 remains blocked/remediate after actual Render video timeout;003 is not eligible.

Run dependency-free adversarial guards with Node:

~~~sh
node --test scripts/phase30-native-simd/check-nasm-source.test.cjs
node scripts/phase30-native-simd/check-nasm-source.cjs /exact/owned/nasm-2.16.03.tar.gz
~~~

The CLI accepts only the pinned official release archive:1688160bytes/SHA256 5bc940dd8a4245686976a8f7e96ba9340a0915f2d5b88356874890e207bdb581. Trust basis and original source/notices are recorded in the candidate document; no upstream signature is claimed. Do not use it as a generic archive extractor or media validator. Exported tar/gzip functions are test seams; operational callers must use the pinned CLI/inspectFile interface.

Inspection bounds compressed input before parsing, limits decompression to16MiB, admits one complete gzip member, independently verifies CRC/ISIZE, and checks a closed GNU tar layout. Tar limits:1300members,1500000bytes per file,13000000file bytes total; no links/special/PAX/long-name entries, traversal, unsupported header/prefix, duplicate/parent collisions, bad checksum/numeric sizes, nonzero padding or trailing payload. Exact pinned input additionally requires1218members/1190regular files/12673767file bytes/13639680tar bytes and four critical member hashes. File reads allocate only the exact source size plus one byte, reject nonregular/symlink input and compare opened-file identity. All source bytes remain untouched. No filesystem extraction occurs.

These are byte/allocation bounds for an offline tool, not kernel I/O cancellation guarantees or app runtime acceptance. Future build invocations must retain an external process deadline and fresh owned offline sandbox. Existing bundle/Backend guards continue rejecting changed unreviewed binaries. Complete assembler/assembly incorporation license closure, candidate recipe/inventory/ELF/source retention, actual Linux builds and Render resource gates remain unimplemented prerequisites.

Implementation uses documented Node zlib maxOutputLength/info and consumed input bytes: [Options](https://nodejs.org/api/zlib.html#class-options), [bytesWritten](https://nodejs.org/api/zlib.html#zlibbyteswritten). Tests exercise synthetic raw tar/gzip variants beyond the immutable outer identity pin, so malformed framing cannot pass merely because its checksum differs. Symlink/FIFO regression tests run on supported Linux CI; Windows skips are reported. No new npm dependency.

## Separate build experiment (not executed at preparation)

The research workflow uses the same immutable GCC image and existing 2CPU/4GiB/pids128/network-none/nonroot/read-only/capability-drop boundaries with one25minute whole-job deadline. Host recipe derivation checks the frozen Git blob hash and substitutes exactly one fixed assembly option; its output is mounted read-only. NASM configure/build have120/180second limits, then unchanged FFmpeg configure/build have120/900second limits. Original archives remain available in-job only. Named bounded UTF-8 text evidence is retained for two days after closed preparation succeeds; no binary/archive/default delivery is uploaded. Complete configuration delta and original assembly-source/object hashes await actual review. CI build success is research feasibility only, never processor/license closure or Render acceptance. Existing recipe and Backend pins are unchanged.

## Dependency and relink material slice (execution pending)

The next research workflow derives the pinned existing relink recipe with only two observed candidate hash assertions and a stricter C/NASM/YASM recompile denial. Originals and derived recipe remain read-only; existing bounded relink must reproduce original bytes. A separate read-only pinned Node container collects the48closed assembly targets' generated dependency text and only config.asm, config_components.asm and swscale uops_macros.gen.asm. Dependency paths are retained as data, never followed. Limits are64KiB per dependency,128KiB per generated file,512KiB aggregate and1MiB build log; the generated-file ceiling accounts for the known75,690-byte component configuration. These offline evidence bounds do not change media budgets. Actual sizes/mappings, Linux tests and relink remain CI gates. Collector timeout is an external process deadline, not kernel I/O cancellation proof. Full archive/toolchain/license retention and independently verified binary/bundle adoption remain separate.

Collector lifecycle must use a unique run/attempt name and fixed task labels, inspect the container identity/state, and perform bounded exact-ID removal plus a successful absence query even after timeout/error. Source bytes are accepted only after verified cleanup; uncertainty remains UNVERIFIED and fails CI. This is Docker daemon observation in an isolated research runner, not a claim that kernel I/O or previously transferred bytes can be recalled. No global container prune is permitted.
