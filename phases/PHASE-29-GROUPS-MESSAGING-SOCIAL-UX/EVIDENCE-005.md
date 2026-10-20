# LNG-29-005 group-conversation capability disposition

Recorded 2026-10-20 Asia/Saigon. Status: VERIFYING pending Workspace publication and terminal relay. Dependency 004 is DONE; [LIFECYCLE-004.md](LIFECYCLE-004.md) records publication and actual approved delivery. Phase29 verdict NOT_REACHED; 006 PLANNED. Stop after Phase29; no Phase30+.

## Decision and capability inventory

| Domain/capability | Disposition | Evidence boundary |
|---|---|---|
| Private Study Group text collaboration, membership/invites/roles, history/read/sync/context | SUPPORTED | Existing separate private Study Group domain; 003/004 evidence remains bounded |
| Canonical direct conversation between two authorized connected/contact-permitted actors | SUPPORTED | Existing ordered-pair domain; no Study Group membership grant |
| Independent multi-party group conversation entity/create | UNSUPPORTED / HELD | No safe current schema, route or admission contract |
| Add/remove/leave participants or manage independent group-conversation information | UNSUPPORTED / HELD | No participant lifecycle or authorization contract |
| Independent group-conversation history/read/unread/revocation | UNSUPPORTED / HELD | Existing pair/group semantics cannot be silently reused |

The 005 task completes an audited disposition; it does not claim unsupported independent group chat was implemented or runtime-tested. Preserve existing Study Group discussion and direct messaging. No new product code, schema, API, route, fixture or frontend-only control was introduced.

## Source-contract evidence

Independent source audit by messaging_004_review confirmed exact Frontend main 5b7b41b85604801055b463111f808a504bf579b5 and Backend main b3be9e28c6c4596ded3ed35726c57846ec8870da:

- Backend database/migrations/0032_phase26_direct_messaging.sql:2-39 defines participant_a_id and participant_b_id, an ordered unique pair, pair-specific read positions and sender-pair FK/check. src/messaging/messaging-pair-authorization.ts:8 requires active verified eligible/contact-permitted connected actors and no block. src/messaging/messaging.controller.ts:14 exposes direct open/list/get/history/send/context/read/stream, without participant management.
- Backend database/migrations/0027_phase22_study_groups.sql:2-54 defines the separate group, membership, invitation and text domain. 0038_phase27_group_collaboration.sql:2-21 extends its sequence/context/idempotency/read semantics; lines60-61 retain the stream target XOR. src/study-groups/study-group.store.ts:110-134 checks ACTIVE membership and PRIVATE_INVITE_ONLY. study-group.controller.ts:231-257 and307-318 exposes group-scoped sync/read/context/history/send.
- Frontend src/App.tsx:81-90 preserves separate existing Study Group and direct routes. Messaging types retain a singular partner/current direct API. The shared stream repository's conversationId=groupId adapter is an internal lease interface, not a separate conversation domain or permission grant.
- [CONTRACT-001.md](CONTRACT-001.md), [UI-STITCH.md](UI-STITCH.md) and authoritative TASKS.md preserve the explicit 005 audit/hold path. The independent group-chat Stitch board remains a documentation reference, never a product route.

## Why a bounded backend addition is held

The owner allows evaluating a safely bounded backend addition. This review considered that option; the hold is justified by missing safe contracts, not by asserting backend work was forbidden. A multi-party domain needs participant admission/connection policy, role and add/remove/leave lifecycle, historical visibility after removal, per-participant read state, immediate revocation, notification/stream isolation, persistence/migration and cleanup contracts. Extending the ordered pair or equating a Study Group with a conversation would alter existing authorization boundaries. Those unresolved contracts exceed the approved frozen UX extension. Fail closed and hold the capability rather than invent frontend behavior or weaken authorization.

## Verification and limits

Root ran the affected existing Frontend focus slice: 31 tests across 3 files PASS at current main. An initial read-only Vitest EPERM was an environment execution failure, not a test assertion failure; the authorized escalated run passed. Root also ran existing Backend group-collaboration and static migration-contract tests: 2 suites, 6 tests PASS in 27.028 seconds (group-collaboration.spec.ts and study-group.migration.spec.ts). No database migration or schema mutation was executed. Independent 005 audit is source-contract inspection, not new native/API execution.

Only Workspace documentary gates apply to this change. Additional full Backend build/security suites are NOT_RUN/not required because executable Backend source is unchanged; the focused existing Backend tests passed as recorded above. New product implementation gates, native independent group-chat flows, fixture creation and cleanup are NOT_RUN/not applicable because no executable product or fixture changed. Cross-user, cross-conversation and cross-group runtime isolation remain reserved for 006; leak counts are NOT_RUN, not zero. No real-user usability, formal WCAG or production-readiness claim.

Workspace final review, syntax/monitor tests/diff, commit/PR CI/merge/main CI/exact tree/temporary branch cleanup and terminal relay remain pending. Do not mark 005 DONE before those actual gates complete.

## Independent whole-diff review

Independent reviewer messaging_004_review approved the complete 10-file Workspace documentary diff with no findings. The review checked source-contract provenance, explicit capability hold, current projections and lifecycle truthfulness. It did not execute new native/API flows or measure runtime leaks; source-only review is not runtime PASS.
