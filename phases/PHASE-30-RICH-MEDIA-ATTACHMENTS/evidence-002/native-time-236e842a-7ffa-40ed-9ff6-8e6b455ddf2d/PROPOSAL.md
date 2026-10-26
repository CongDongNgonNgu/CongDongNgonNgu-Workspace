# Local checksum-pinned GNU time for TEST native processing

2026-10-26. CONCRETE_ARTIFACT_VERIFIED; PROPOSED_NOT_FROZEN. No Backend edit, package installation, maintainer script, Linux binary execution, provider action or deployment was performed by this investigation. Windows cannot establish actual Linux/Render execution or resource feasibility.

## Selected official artifact and authentication

Select Debian bookworm `time`1.9-0.2 amd64, an unmodified separate-process GNU time executable. Official package metadata declares only `libc6 (>=2.34)` as a dependency. Downloaded `.deb` is50776bytes, SHA256 `10257c6fe888e6578550b1f20705d282dd630b76f8df0c006aec3031fefe5e23`.

Authenticated chain executed: official Debian HTTPS public keys, fingerprint comparison with the FTP master keys page, isolated task keyring, GPGV exit0 on Debian bookworm12.15 Release with all three supplied signatures valid; Release SHA256 and byte counts matched downloaded Packages.gz and Sources.gz; exact package/source stanzas matched every downloaded artifact. The archive keys are task-local and were not installed into any user/system trust store. This uses official HTTPS key distribution and pinned published fingerprints, not an assertion of independently established Web-of-Trust identity. A first Windows-path GPG import failed; corrected relative task-local paths imported public keys. Earlier incomplete-key verification failures were not treated as PASS. Final machine-readable signature output is retained.

Release SHA256 `abcf5882746e0f68171f41adbb4ac01b74b49d62d203379befb9265804311a4f`; Packages.gz `6777ea16514725f9427f48c240d92e0a6b8496138e37a1491d8597e66774e309`; Sources.gz `c5a2379970764ac50e167f75909655c552602c1a4d7018c0907b3e30d8dc9de4`. This is a pinned observed bookworm snapshot, not a claim to the newest operating system/package release.

Only the `.deb` ar header and its exact three members were parsed. Tar members were listed; exact known regular members were read through stdout into generated filenames. No archive-controlled paths were written, no symlinks extracted and no maintainer scripts run. The time control archive contains only control/md5sums. Extracted `./usr/bin/time` is27384bytes, SHA256 `efc0d1112e36ec76c14bf7508e287935cf1631d9d0d91fb532802d07aef51cea`.

ELF header/dynamic/version inspection: ELF64 little-endian EM_X86_64, ET_DYN, interpreter `/lib64/ld-linux-x86-64.so.2`, only DT_NEEDED `libc.so.6`, required symbol versions GLIBC_2.2.5/2.3.4/2.4/2.34. This supports a concrete ABI candidate for Linux x64 glibc>=2.34; it does not prove the currently deployed host ABI or actual execution.

## Source and notices retained

Authenticated exact corresponding upstream source `time_1.9.orig.tar.gz`:596779bytes, SHA256 `fbacf0c81e62429df3e33bda4cee38756604f18e01d977338e23306a3e3b521e`.

Authenticated Debian source packaging `time_1.9-0.2.debian.tar.xz`:14748bytes, SHA256 `42a9d951055290c5186a1b83808744bd07bf8675f24e99998e46a31825781480`; `.dsc`:1703bytes, SHA256 `32edee09df14a7e61fe0d02be477e7f2efd3df3f601dff6ecc51f18b99fd0f24`. Packaging includes debian/rules and patches; upstream includes build/configure sources and INSTALL. Original archives remain intact.

Retain Debian copyright, upstream GPLv3-or-later text from authenticated source COPYING, GPLv2 text from authenticated bookworm base-files common-licenses (GNU direct text returned403), README/INSTALL and source/build provenance. Debian packaging is GPLv2-or-later; preserve both license texts and notices. Distribution pack must carry the complete source `.orig`, `.debian` and `.dsc` with the binary, rather than only internet links. No assertion of legal clearance for an unrelated combined work or production distribution is made. This utility runs as an unmodified separate process; no linking into application code is proposed.

## Proposed integration boundary for independent review

1. Extend the existing explicit build-time TEST processor package only. Require exact .deb/source hashes, size and known regular member before writing fixed `dist/attachments/processors/bin/time`; executable mode0500, source/notices read-only. Never apt/dpkg install, execute maintainer scripts, activate billing or download at startup/request time.
2. Manifest must require the exact time binary SHA/bytes, Debian package/source identities, corresponding source and notices. Verify the complete manifest and binary before use; an unsupported/missing/mismatched capability fails video closed. Never `/usr/bin/time`, shell builtin, PATH search or another provider fallback. The existing native constructor should use the verified local processor directory only.
3. On actual Linux x64, verify `process.report.getReport().header.glibcVersionRuntime` is a valid glibc version at least2.34; unknown/musl/non-x64/older ABI is HOLD. The existing host libc and ELF loader must successfully load the exact binary; do not package a new libc or assume Render documentation proves deployed state.
4. Perform a bounded synthetic process self-test on Linux CI and exact Render revision: approved local time version; a tiny deterministic Node child with scrubbed environment and no user data; actual positive `%M` metric in an exact-owned fresh file; strict metric parser and normal frozen deadline/resource/scratch constraints; cleanup and independently verify those exact files. No invented progress, memory peak or persistence. Test missing/corrupt binary/manifest, unsupported ABI, malformed/missing/zero metric, timeout/child failure and actual descendant closure. Do not weaken15s/192MiB observed limits or claim an OS memory sandbox.
5. Preserve source/public API/domain authorization, all attachment capability flagsfalse, current upload/processing singletons, GNU time completed-peak requirement and separate process-group closure. The utility fixes a missing executable dependency; it does not establish video/resource acceptance. After independent implementation review, actual CI/main and TEST deployment gates still precede format enablement.

## Evidence handling

OWNERSHIP.json records this exact new task-owned directory. MANIFEST.json, downloads.json, selected-members.json, deb-members.json, Release/signatures/keys/status, authenticated package/source stanzas, intact artifacts and ELF-INSPECTION.json supply observed provenance. Large Packages.gz/Sources.gz and task GPG working files are research scratch; do not indiscriminately stage the entire directory. A compact committed evidence selection can retain hashes/stanzas/signature proof and repeatable official URLs while full downloaded artifacts remain exact-owned local input for reviewed build packaging. No application storage/DB fixture residual or deployed PASS follows from these files.

Primary sources: https://packages.debian.org/bookworm/time ; https://deb.debian.org/debian/dists/bookworm/Release ; https://ftp-master.debian.org/keys.html ; https://sources.debian.org/src/time/1.9-0.2/ ; https://www.gnu.org/software/time/manual/html_node/Memory-Resources.html .
