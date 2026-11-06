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
