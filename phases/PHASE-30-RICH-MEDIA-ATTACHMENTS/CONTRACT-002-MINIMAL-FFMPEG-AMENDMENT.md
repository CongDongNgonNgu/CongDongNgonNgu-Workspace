# Phase30-002 minimal FFmpeg adoption amendment

Status: PROPOSED, not application/distribution/runtime approval. Independent read-only review approves drafting this bounded Linux-only amendment; implementation and release require the gates below. No frozen numeric media/access/lifecycle limit changes.

## Reason and selected delivery design

The previous broad BtbN distribution remains held for complete transitive source/notice closure. Isolated CI40997259137 proves narrowly scoped internal H264/AAC/MJPEG decoding, stream-copy sanitization, SEI positive control and corrupt-slice rejection for a minimal build from the same exact FFmpeg source commit. It does not prove full worker or Render feasibility.

Select a versioned complete software bundle in the existing project GitHub repository, after source/notice review and verification that tag/release triggers cannot deploy Production. It contains executables plus intact corresponding source, upstream file-level notices and complete build/configuration/toolchain evidence. This is public software distribution, never private attachment media. No new provider/account/token/billing or R2 media/backup namespace is needed. Do not publish executables before review.

Expiring authenticated Actions artifacts are unsuitable as a durable Render build input. A new credential is not authorized. Compiling on Render Free is not selected without fresh toolchain/time/resource evidence.

## Fixed identities and complete bundle boundary

- FFmpeg source commit6dfaba896fddaea098abec8ac84ff67375a7c6f1; intact archive17330151bytes SHA256cd6175d64b7f152469d48ceffa0dcb3bf36bb3bcae42aece46570d48563cdb85.
- Build-only GCC14.3.0-bookworm linux/amd64 image sha256:a689e29bc3adf4663ef9a141d23081252764d1319c63f591a027bd6fd676f4c1 and exact reviewed build.sh/configuration. Preserve compiler/binutils/OS/libc evidence and all source notices; minimal configuration is not by itself license clearance.
- Both executables, fixed source archive, original notices, recipe and generated configurations, source/toolchain evidence and inventory must have a fixed bounded member list, sizes and code-pinned hashes. Archive paths, duplicate names, links, nonregular members and excess decompression must fail before writing generated paths. Bundle digest and durable exact URL remain UNASSIGNED until actually produced and reviewed.
- Observed CI binary hashes are candidate evidence, not approved release pins. Rebuild identity must be verified; timestamps/toolchain drift must not be hidden by accepting a self-reported manifest.
- Linux worker must verify immutable code-pinned binary/source/notice/configuration identities, not accept arbitrary hashes from manifest.json. Missing/changed files fail closed.
- Linux actual banner is9.0.2; replace the old BtbN identity only on the Linux path. Windows diagnostics retain their separate existing identity and do not count as Linux acceptance.
- Current observed ELF dependencies are only libc.so.6/libm.so.6, maximum GLIBC requirement2.35. Add a separate Linux x64/glibc>=2.35 admission check; GNU time's existing independent>=2.34 guard and full source package remain unchanged. Actual Render ABI remains unverified.

## Worker and test integration

Preserve15s whole-job deadline,192MiB worker/native observation budget,32MiB allocation cap,64MiB scratch cap, single processing admission, GNU time lifetime native RSS, cancellation/termination, private proxy reads, domain authorization and default-off flags. A process watchdog is not an OS sandbox.

Replace lavfi/color/libopenh264 fixture generation with hash-bound synthetic MP4 fixtures and the independently reviewed prefix-SEI fixture preparation. Require an actual decoded SEI positive control, unchanged source, zero normalized SEI/private markers and valid thumbnail. Keep optional AAC retention, structural preflight and fatal corrupt-slice decoding assertions.

Actual-child deadline/cancellation tests should loop the known MP4 with bounded real-time decode, prove the child alive before intervention, then prove process-group absence and exact-owned scratch cleanup. A child that already exited cannot prove termination.

## Ordered gates

1. Complete inventory/configuration drift guard and adversarial tests in isolated Workspace CI; independently review and complete normal Workspace lifecycle. This increment publishes text only.
2. Assemble complete candidate bundle in isolated CI; review full corresponding source/notices, toolchain/ELF inventory, archive boundaries and reproducibility. Confirm release/tag triggers and immutable delivery before publication.
3. Implement the reviewed Linux packaging/worker/test changes on Backend dev/TEST only; local/full affected gates, independent source/security review, PR CI, dev CI and exact tree/branch cleanup.
4. Fresh read-only Render TEST configuration/ABI/resource evidence, followed by exact authorized TEST deployment. Verify full worker, repeated lifetime RSS/deadline/cancellation, API baseline/headroom and per-format enablement gates. No app main merge: main now deploys actual Production.
5. Actual private provider round-trip, upload/finalize/read/delete, cross-user/group/canonical-direct-pair revocation and natural retention cleanup. DB/storage residual and leak counts remain NOT_RUN until executed. Only then complete002 and enter003.

Source/API/storage/auth contracts from001 and prior phases remain authoritative. GROUP_CONVERSATION stays HELD_UNSUPPORTED. PHASE_31_IMPLEMENTED=NO; PRODUCTION_DB_MUTATED=NO; PRODUCTION_STORAGE_ACTIVATED=NO; PAYMENT_ACTIVATED=NO.
