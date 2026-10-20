# LNG-29-004 messaging experience execution

Current checkpoint (2026-10-20 Asia/Saigon): LNG-29-004 VERIFYING. Product publication, bounded API/native acceptance and both exact-owned cleanup runs are complete. Workspace publication, CI, merge, branch cleanup and terminal relay remain pending. The earlier execution checkpoints below preserve what was known at their recording time; their pending-native/fixture-live statements are superseded by the final bounded acceptance section. 005-006 remain PLANNED; Phase29 verdict NOT_REACHED; stop after Phase29/no Phase30+.

## Historical execution checkpoints

Recorded 2026-10-20 Asia/Saigon. Status: IN_PROGRESS. Dependency LNG-29-003 is DONE after PR172, successful PR/main CI, exact-tree verification, temporary branch cleanup and complete accepted terminal relay. [LIFECYCLE-003.md](LIFECYCLE-003.md) records the full identities and continuation digest. 005-006 remain PLANNED; Phase29 verdict NOT_REACHED. Stop after Phase29; no Phase30+.

## Accepted starting baseline

- Frontend main: 367e8c473013fa322b5f53b6514a5a0327dc287b; reviewed tree 6072e1f0383997ac29848876623861df82a737e6.
- Backend main: b3be9e28c6c4596ded3ed35726c57846ec8870da; unchanged by 003.
- Workspace main: 6b257589dc0b0c0cd2048934eaab812bc67d491c; reviewed tree 987020bbc7cb0768e083cadcab66fa22366baa35.

These are the accepted 004 starting revisions, not a claim that subsequent implementation has been published. Reconcile legitimate newer remote revisions rather than resetting them.

## Scope and incremental plan

Follow authoritative TASKS.md and the existing Stitch selections/frozen [CONTRACT-001.md](CONTRACT-001.md). Audit current inbox, direct thread, participant identity, real timestamps/unread/read, history, composer and realtime/reconnect/offline/error behavior before changing them. Reuse the project design tokens, shared primitives and component-owned CSS. Preserve canonical direct routes, mobile back navigation, refresh and back/forward behavior.

Implement in small reviewed slices: inbox hierarchy and responsive selection, then direct conversation/composer/status and pair information, then supported language-learning context actions. Use only actual server state. Preserve Phase26 active verified connected/contact and blocking boundaries. Study Group membership and shared references never grant direct-conversation access. Independent multi-party conversations remain held for the explicit 005 disposition; no new route or frontend-only create/manage behavior.

Exercise a normal authorized partner-send path using exact-owned synthetic connected TEST actors, including learning-context sharing, send/persist/refresh and recipient visibility. The Phase28 actual partner-send NOT_RUN limitation must be resolved by observed supported behavior or retained with its precise limitation. Do not bypass connection eligibility. No attachments, media infrastructure, fake presence, typing or partner-read receipts.

## Required gates and truthful evidence

Run meaningful targeted tests, all affected Frontend gates and independent review; remediate findings and rerun affected gates. Complete PR/CI/merge/main CI and exact-main deployed TEST validation, then evidence publication and temporary branch cleanup. Native checks cover representative desktop/mobile and VI/EN states, long Unicode, keyboard/focus, supported history/unread/read/realtime/reconnect and access-loss behavior. Full integration, all required widths/roles and cross-resource isolation acceptance remain 006; do not infer those passes from 003 evidence.

Use reviewed natural exact-owned TEST fixtures only. Preserve normal authentication and backend authority, clean only exact-owned dependent records and verify residual counts. Record unsupported or unexecuted cases as NOT_RUN/held with evidence.

At this initial checkpoint, no 004 implementation, test, API/native acceptance, fixture creation/cleanup, CI, publication or relay outcome is claimed. Prior 003 cleanup results do not establish 004 cleanup.

## Source and tooling checkpoint

Frontend candidate 7061daff052e41244be5b1874d0505597230e9d3 has reviewed tree 9a3cb9ce92346f9edbf3ed0c27446c06a3e9cc5a. Four local commits include the incremental messaging implementation and a mechanical two-space review correction. The author reports 61 tests across 8 files plus typecheck/build PASS. Independent final source review APPROVE reports 63 tests across 7 files PASS. Root lint, performance and dependency audit PASS with zero vulnerabilities. These are local/source gates; no PR, merged main, deployment or native acceptance is claimed. Root full suite session 33304 is still running at this checkpoint and has no PASS claim yet.

[Independent tooling review](API-REVIEW-004.md) approved the exact seven [fingerprints](FIXTURE-TOOLING-004.json): inherited strict guards, exact-owned Community context fixtures, canonical denied-message proof, 51-case API plan and finally-cleanup wrapper. Independent 30 current offline tests and three syntax checks PASS; author separately reports 37 tests including historical 003 compatibility coverage. No independent live API execution is claimed.

Root API wrapper session 99815 is running with exact-owned run 2edcf2ae-ee37-4db2-8988-594873608719. No API acceptance or cleanup PASS is available at this checkpoint. Preserve actual result and cleanup artifacts when the run finishes; do not reuse prior 003 cleanup as evidence for this run. Backend source/schema remain unchanged.

## Completed bounded API and local gates

Root API run 2edcf2ae-ee37-4db2-8988-594873608719 completed 51/51 PASS with zero failures, audit-case NOT_RUN, unexpected allows, contract mismatches, unauthorized protected responses and unverified denial messages. Wrapper session 99815 exited 0. [Independent artifact review](API-REVIEW-004.md) confirms 27 expected denials, including 13 protected-read denials, and exact matching CLEANED manifest: 76 selected rows across 20 tables, every residual zero. All seven reviewed tooling fingerprints still match. See [API audit](API-AUDIT-004.json) and [cleanup](FIXTURE-CLEANUP-004-API.json). Realtime/pagination and cross-conversation/cross-group isolation remain explicitly NOT_RUN in this bounded API audit.

Root full Frontend suite session 33304 exited 0: 146 files, 827 tests PASS, duration 161.05 seconds. The final nonsemantic two-space formatting correction occurred after the initial suite started; final build, typecheck, performance and source-range review passed afterward. Preserve this timing distinction rather than claiming a second full-suite run on the mechanical correction. Frontend PR56 is OPEN at candidate 7061daff052e41244be5b1874d0505597230e9d3; CI39355480991 is still in progress at this checkpoint. No merge/main CI/exact deployment result is claimed yet.

Root created a fresh native fixture bd1ec7e2-4109-4ac2-9086-a436d4497b3a with seven exact-owned synthetic actors, a Study Group, an authorized direct pair and an original public DISCUSSION learning post through normal APIs. It remains live pending exact-main Frontend/native validation. No native PASS or cleanup result is claimed for that fixture; API fixture cleanup above is a separate run.

## Frontend publication and native checkpoint

Frontend PR56 merged to main 5b7b41b85604801055b463111f808a504bf579b5. The reviewed/main tree is 9a3cb9ce92346f9edbf3ed0c27446c06a3e9cc5a with exact equality. PR CI39355480991 and main CI39355638185 completed SUCCESS. The feature branch was deleted remotely and locally and stale refs pruned. Root verified Vercel TEST deployment EVNk2ibqLYfQBj4NRcutCQmXkvk5 Ready at exact main 5b7b41b85604801055b463111f808a504bf579b5 with sigma/main aliases through the browser. These observed publication facts supersede the prior pending-PR checkpoint.

Root native validation is IN_PROGRESS on the separate live fixture bd1ec7e2-4109-4ac2-9086-a436d4497b3a. Normal owner and connected-partner logins exercised actual inbox timestamps, first-message empty guidance, a three-line Vietnamese Unicode message and recipient inbox unread count of 1. Opening the thread marked it read; the recipient replied through the native keyboard composer. The Send target measured 44px with a 3px focus outline and was hit-tested above the fixed navigation. The owner's thread received the reply without navigation; both messages persisted after refresh. These are bounded observed flows, not a complete realtime/reconnect acceptance claim.

Conversation information showed only the two actual participants. Root checked dialog Shift+Tab wrap, Escape dismissal and focus return with a 3px outline. No fabricated presence, typing or partner read receipts are inferred.

The normal Community flow on the exact-owned public DISCUSSION post opened Share with partner, selected Minh Vu, entered a note and sent successfully. Open conversation navigated to the canonical pair route. The recipient saw the actual learning-context preview/category/language, which persisted after refresh. Native Open content used the context resolver to navigate to the canonical owned post; back navigation and refresh returned to the thread. This actual authorized partner-send path resolves the specific Phase28 native partner-send NOT_RUN limitation for these synthetic connected TEST actors. It does not establish real-user usability or broader production readiness. Negative private/unsupported/revoked-context and blocked-access cases remain separate bounded API evidence.

Seven-width VI/EN measurements, reconnect/offline behavior and native access-loss checks are still running. No completed native verdict or cleanup result is claimed. The native fixture remains live; the earlier API fixture cleanup does not certify it. Workspace publication, CI, merge, cleanup and terminal relay also remain pending for 004.

## Bounded history and offline recovery observations

The independently reviewed history helper and its six passing offline tests are recorded in [API-REVIEW-004.md](API-REVIEW-004.md) and the tooling registry. On native fixture bd1ec7e2-4109-4ac2-9086-a436d4497b3a, root completed 28 normal API messages at sequences 4-31, bringing the then-current total to 31. The default page contained 30 messages and an older cursor. No DB backdating, insertion or rate-limit bypass was used.

Root reloaded the partner thread and observed 30 messages, then clicked the native Vietnamese load-older control. The thread showed 31 unique message bodies with the oldest first, and the older-history button disappeared. This is bounded native pagination proof; the earlier API audit's pagination NOT_RUN and the full 006 integration scope remain distinct.

During offline emulation, root observed the actual draft survive a generic network error and automatic online recovery. A stale Retry click is not counted as a retry PASS; an actual failed offline send remains NOT_RUN. After history preparation completed, the owner sent the recovered draft through the native composer. No fabricated queued-send or durable draft guarantee is inferred.

Root's final English seven-width measurement set contains three measured message elements per frame and zero recorded horizontal overflow. This checkpoint does not claim exhaustive VI/EN state coverage or full 006 acceptance. The final native artifact, independent artifact review and exact-owned native cleanup are still pending. LNG-29-004 remains IN_PROGRESS; no DONE, Workspace publication or cleanup PASS is claimed here.

## Final bounded native acceptance and cleanup

Root [NATIVE-004.json](NATIVE-004.json) records PASS_BOUNDED_NATIVE on exact Frontend main 5b7b41b85604801055b463111f808a504bf579b5, reviewed tree 9a3cb9ce92346f9edbf3ed0c27446c06a3e9cc5a and Vercel TEST deployment EVNk2ibqLYfQBj4NRcutCQmXkvk5. The recorded VI/EN thread measurements contain 14 loaded frames across all seven required widths with no recorded horizontal overflow. The mobile Send focus/hit-test and bounded dialog focus/layout observations remain explicit; initial below-fold composer rectangles are not claimed as fixed-position visibility or hardware keyboard proof.

The native context-share, real unread/read, live message appearance, Unicode persistence, offline draft recovery, pagination and route flows above are recorded as actual bounded observations. After sequence 32, the hidden/inactive recipient's authoritative state was lastReadSequence 31 and unreadCount 1. This is retained truthfully; visible message arrival does not imply automatic read or a partner receipt. A real failed offline send, protocol-specific SSE network trace and independent child native run remain NOT_RUN.

Root performed the normal owned block transition while both participant information dialogs were open. Four protected API reads returned strict generic 404 denials with zero unauthorized protected responses and zero unverified denial messages. Both VI/EN native clients removed the dialog, private participant identity, history and composer, showed unavailable feedback and omitted the pair from the inbox. Root clicked owner logout, navigated both native clients blank and reset emulation before guarded cleanup.

[Native cleanup](FIXTURE-CLEANUP-004-NATIVE.json) for run bd1ec7e2-4109-4ac2-9086-a436d4497b3a selected 161 exact-owned rows across 21 tables. Independent artifact review verified exact equality with the local CLEANED manifest and every per-table/total residual zero. The separate API run remains 76 rows across 20 tables/residual zero. All nine current tooling fingerprints match, both final native JSON artifacts parse, and the targeted secret scan is clean. The reviewer inspected evidence/manifests and performed no second live native/API execution.

Full 006 integration surface/state/contrast coverage and cross-group/cross-conversation isolation remain NOT_RUN/reserved for 006. No formal WCAG, hardware/software-keyboard, real-user usability or production-readiness claim is made. LNG-29-004 remains VERIFYING until its Workspace publication/CI/exact-tree/main-CI/branch-cleanup/terminal-relay lifecycle completes.
