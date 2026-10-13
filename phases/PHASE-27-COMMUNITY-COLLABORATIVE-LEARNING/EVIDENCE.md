# LNG-27-001 evidence and handoff

2026-10-13 Asia/Saigon. Audit/contract only; Backend/Frontend source unchanged. Current remote/local baseline matches all supplied heads; no reset/delta inheritance needed. Actual findings and decisions are [source audit](SOURCE-AUDIT.md) / [contract](CONTRACT.md); later risks/gates [threat model](THREAT-MODEL.md) / [acceptance plan](TEST-PLAN.md).

## Focused observed verification

- Backend: `npm.cmd test -- --runInBand --no-cache --runTestsByPath src/community/community.service.spec.ts src/community/community.contract.spec.ts src/corrections/corrections.service.spec.ts src/corrections/postgres-corrections.repository.spec.ts src/study-groups/study-group.validation.spec.ts src/study-groups/study-group.transaction.spec.ts src/study-groups/study-group.migration.spec.ts` —7 suites/57 tests PASS,24.168s, baseline0f426b5. Repository/transaction tests use mocks/static migration checks; this is not new PostgreSQL runtime/race proof.
- Frontend: `npm.cmd test -- src/features/community/components/StructuredResponseExperience.test.tsx src/features/community/pages/CommunityPostDetailPage.test.tsx src/features/community/pages/CommunityPage.test.tsx src/features/study-groups/pages/StudyGroupPage.test.tsx src/features/study-groups/study-groups.policy.test.ts` —5 files/38 tests PASS,16.09s, baselinecc163d7. Component/unit evidence only, not native browser/localization/accessibility acceptance.
- Workspace: `node --check scripts/production-availability-monitor.mjs`; `node --test scripts/production-availability-monitor.test.mjs` —12/12 PASS. `git diff --check` required again on final staged diff and by CI.
- Initial npm.ps1 launch was blocked by host execution policy; npm.cmd used without changing policy. Read-only sandbox blocked Jest/Vite temporary cache/config writes; authorized escalation ran the same focused tests successfully. These launcher failures are not product failures and were not hidden as initial PASS.
- No new product source/tests/index/schema, dependency, DB access/migration, runtime fixtures, deploy/provider configuration, production/payment/AI/voice/video action. Full unchanged product suites/builds not rerun ceremonially. Phase27 browser/query-cost/SQL acceptance NOT_RUN; screen reader NOT_RUN; real-user value/usability/production traffic unproven.

## Independent review

Fresh reviewer `/root/phase27_independent_review`, read-only independent current-source/product/security/architecture audit, verdict APPROVE after factual documentation remediation. Four documents reviewed: CONTRACT, SOURCE-AUDIT, THREAT-MODEL, TEST-PLAN.24/24 axes covered:

| Axes | Result |
|---|---|
| 1 inventory;2 one primary;3 QUESTION;4 CORRECTION;5 DISCUSSION | PASS: eight types, exact structured variants, collapsed secondary comments |
| 6 bounded nesting;7 structured reply decision;8 votes/acceptance | PASS: depth0/1, option A, distinct entities/self-vote and requester constraints |
| 9 filter data;10 server source;11 pagination/sort;12 enumeration | PASS: real topic/save, no tags, DB queries, keyset ties, no counts/encrypted new-query cursors |
| 13 group reuse;14 no second domain;15 old groups private;16 visibility/join | PASS: private-only selected, request/public candidates deferred, no automatic exposure |
| 17 roles;18 sharing;19 notices;20 block/report/moderation | PASS: exact22 authority, live26 canonical refs; legacy notice/acceptance/source gaps honestly tracked |
| 21 vi/en;22 responsive/accessibility;23 no28;24 exclusions | PASS: EN hold retained, seven widths/future a11y not falsely run, no later phase/provider/production scope |

Required review findings corrected: removed an unsupported damaged-source-string assertion caused by terminal encoding; raw UTF8 labels verified; corrected six comment-primary types wording. No remaining blocking contract defect. Review does not assert inherited acceptance races, unsigned cursors or snapshot notifications fixed. These remain later affected-path acceptance gates. No product implementation demanded/performed in001.

## Integration and continuation

Temporary Workspace branch `docs/phase27-interaction-contract`. Final PR/head/main SHA, PR/main qualityCI, reviewed-tree equality, remote/local deletion and all-repository main sync are recorded in the PR and terminal report after they actually pass, avoiding self-referential hashes.001 must remain VERIFYING until these gates pass. State's DONE projection becomes effective only after that lifecycle; if any gate fails it is not permission to claim DONE.

Full same-phase authorization persists, but current explicit boundary requires STOP after001. Next eligible task002 READY after001 lifecycle;003-006 PLANNED, not started. No terminal browser relay or returned continuation may override this explicit stop. Phase27 overall IN_PROGRESS/verdict NOT_REACHED; Phase28/29 unauthorized/unstarted. No permission request needed for later same-phase work when user resumes. Preserve all closed-phase evidence and known real-private-data/retention/global-block/locale limitations.
