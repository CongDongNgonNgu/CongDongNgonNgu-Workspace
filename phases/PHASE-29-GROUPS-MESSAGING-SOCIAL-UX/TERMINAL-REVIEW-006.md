# LNG-29-006 staged native terminal evidence provenance

Recorded 2026-10-20 Asia/Saigon. These independently callable stages supplement the final native acceptance; they do not declare LNG-29-006 or Phase29 DONE.

## Prelive tooling approval

Root records that messaging_004_review approved the frozen source 301eb836dfae8400debf32130501f5859ccf4ca9d5c9dea614ec75c3532c93a5 and test 66258ee6b48490cfa6eb5f70206ac65f2d535877e05fd1eda42e4e2f58cf8312 before execution. Author checks ran eight offline tests and two syntax checks, all PASS. The reviewer confirmation and source/offline scope are recorded separately from live execution; no independent live run is claimed here. Fingerprints are in [FIXTURE-TOOLING-006.json](FIXTURE-TOOLING-006.json).

The tool pins the exact OPEN scope006 run, owned room/post/group and owner/connected/member identities. History uses one fixed owned messages query with limit 50, normal own login, a bounded 256KiB response and 15-second deadline. Mutation stages are separate commands. Context privacy requires the owned PUBLIC post and current authorized pair before changing visibility; blocking requires the prior PRIVATE/unavailable context state; removal requires actual group ownership and the active ordinary member. Canonical 404 code/message/envelope/no-data checks remain mandatory. Any failed negative probe halts later probes as NOT_RUN. Authentication memory clears in finally; the coordinator retains the native fixture for observation and separate exact-owned cleanup. The shared helper remains unchanged.

## Root normal API execution and local artifact inspection

Root reports all four commands exited 0. Author messaging_004_fixtures subsequently parsed the four local output files read-only, verified their project/run/stage/PASS/source fingerprints and strict denial counts, scanned credential patterns, and copied them byte for byte into Workspace. This is artifact inspection of root execution, not a second API run or independent browser observation.

| Stage | Preserved artifact | Bounded result |
| --- | --- | --- |
| History read | [History](NATIVE-TERMINAL-006-history-read.json) | 32 distinct ordered own messages at sequences 1-32; the exact native retry occurs once at 32; context message 2e36be9d-2941-4e5f-b1e0-f11cca9fee6c. |
| Context privacy | [Privacy](NATIVE-TERMINAL-006-context-private.json) |Owned post changed to PRIVATE; recipient context is exactly UNAVAILABLE. |
| Block pair | [Block](NATIVE-TERMINAL-006-block-pair.json) |Four strict recipient home/history/context/send 404 denials; zero failed, NOT_RUN, unexpected allows, protected response leaks or unverified denial messages. |
| Remove member | [Removal](NATIVE-TERMINAL-006-remove-member.json) |An Pham removed through normal API; four strict home/member-list/text/send 404 denials with all corresponding failure/leak counters zero. |

All eight negative cases have validated canonical messages, strict failure envelopes and no response data; six are protected reads. Targeted authentication/connection/private-key/disposable-credential scans found zero matches. Original local filenames retain the run ID; Workspace copies retain exact bytes.

## Separate native checkpoint and remaining gates

[Coordinator-reported native checkpoint](NATIVE-TERMINAL-OBSERVATIONS-006.json) explicitly distinguishes root's browser observations from the API files: unavailable context without preview/open action, information dialog closure and cleared conversation view/inbox omission after block, ordinary logout/login actor transition without cached owner group data, and live generic denial/name removal/composer removal after An's membership revocation. This author did not access the browser and does not independently certify those observations or deployment binding. Root owns the final NATIVE-006.json measurements.

At this checkpoint the exact native fixture remained OPEN. No cleanup/residual result, publication/CI/merge/branch cleanup, final phase verdict, formal WCAG, real-user usability or production-readiness claim follows from these records. No new fixture/message/browser mutation was performed during preservation.
