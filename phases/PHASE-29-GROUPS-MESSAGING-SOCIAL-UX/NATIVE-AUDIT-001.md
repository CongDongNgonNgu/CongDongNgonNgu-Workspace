# Phase29 native audit checkpoint (001)

Current result: bounded authenticated/guest audit and28-case API check complete, exact-owned cleanup residual0; design approved; Workspace publication pending. Initial guest and preflight sections below are historical checkpoints superseded where applicable by the authenticated audit/cleanup section. They do not describe current fixture or review state.

## Historical initial guest checkpoint

Date2026-10-19 Asia/Saigon. Source baseline matches owner-supplied remote SHAs (EXECUTION-PLAN.md). TEST guest route observations made with Chrome DevTools and existing Chrome tab through browser relay tools. No fixtures or private user data read or changed.

- Desktop1440: header shows Explore, Study partners, More; neither Groups nor Messages is directly reachable. Account authenticated menu not exercised yet. Source confirms it currently contains Profile/Membership only.
- Mobile390: quick bar is Home/Search/Menu; no direct Groups/Messages destinations. Guest Messages route shows its title, connected-partner explanation, Connections link and login action. No conversation list/identities shown.
- Direct URL /community/groups: guest sees My Study Groups, privacy explanation and login; no group metadata/member directory. /exchange/conversations: guest sees login guidance with return route. Existing Chrome session is also signed out.
- Existing source covers group create/detail/member/invite/roles and messaging send/history/realtime; authenticated native journeys remain NOT_RUN in001 at this checkpoint. They require exact-owned synthetic actors later; source inspection is not deployed PASS.
- Header public navigation/discovery gap confirmed. Existing route ownership and private auth surfaces preserved; no public groups inferred.

Stitch project16818442275268553095 created PRIVATE through MCP before substantial implementation. Target generation/refinement/review in progress. Product source unchanged. Source review independently completed by backend and frontend audit agents; see their separate files.

Current state:001 IN_PROGRESS,002-006 PLANNED, phase verdict NOT_REACHED. No security runtime leak count measured; do not report zero. No runtime fixture created by this run. Provider exact-deployment revision verification, authenticated views, seven-width/VI-EN acceptance and full runtime gates remain pending.

## Historical pre-fixture deployment and safe preflight checkpoint

Vercel overview read2026-10-19: sigma alias Ready deployment28D4VPsZGV6KGQm9XTR3zvawZgDU, source commit link exact b15971778dbf4bd0c836e8f3e25de8d8758682e1. Render overview last-successful commit link exact b3be9e28c6c4596ded3ed35726c57846ec8870da; Live dep-db7eg6o473hc73d3ep60. Only deployment overviews inspected; no environment/secret values read or changed. Provider Production labels remain owner-classified TEST for this authorized phase.

Existing read-only guarded TEST preflight executed: strict TLS verified, PostgreSQL180006, all38 migration filename/checksums match exact unchanged Backend main; ledger digest7c9dd1152a6f45e4d9109df45da44f3c510635ab4594e2ed98f00fedc19c1428. No DB write or fixture creation performed by this preflight. An initial node-e invocation had a shell argument syntax error before execution; corrected stdin script completed successfully. No credential output.

Workspace monitor syntax +12 unit tests and current git diff --check PASS. Product automated gates NOT_RUN (no product changes yet). Fixture helper preparation has independent security review in progress; do not create actors until cleanup crash-recovery finding is remediated and approved.

## Authenticated baseline audit and cleanup

Independent fixture security review APPROVE after committed-but-unmanifested group/conversation crash recovery was added. Helper syntax and15 no-DB tests PASS; guards retain exact TEST target/TLS/ledger/backend identity, normal password authentication and bounded foreign-reference rejection before deletion. No existing credentials extracted or authentication forged. New disposable synthetic credentials were generated for these actors only and never printed/published.

Run339a1f17-e69f-4efb-93a8-eab0ff608204 created7 exact-owned natural actors (platform MEMBER only), established eligible owner/partner connection by normal request/accept, created a private Study Group, accepted three one-use invites, assigned moderator and removed the revoked actor through existing APIs. An unaccepted invitation remained in process memory; its raw bearer was never logged or persisted.

API-AUDIT-001.json records28 fresh protected reads: group/member access allowed only owner/moderator/member; invitation metadata owner only; direct conversation owner/connected partner only. Unexpected allows0; contract mismatches0. This is one-group/one-conversation baseline audit, not final cross-group/cross-conversation acceptance.

Native owner normal login succeeded. Audited list, create dialog/open-close, private group home/discussion, member roles/actions, retained invitation metadata/revoke action and connected-partner picker entry. Observed role-gated owner controls and transfer-before-leave guidance. Group text submitted through normal UI with natural Vietnamese learning content, then persisted after refresh. Direct inbox/thread empty state and partner identity observed; a natural English direct message sent through normal composer and persisted after refresh. No context-sharing/native multi-role final acceptance claim.

Account menu native defect confirmed: only Profile/Membership shortcuts; remains open after Escape and outside heading click.002 remediation required. Baseline conversation mobile has a tall heading/thread area; improve composer ergonomics during004 and verify keyboard/nav clearance. No presence or partner read receipts observed/claimed.

Actual native390px asserted by Chrome DevTools emulation: group home and persisted text; direct thread and persisted message; document scrollWidth=clientWidth=390. English messaging chrome verified by ordinary locale selector; UGC unchanged. Guest audit at390/1440 and authenticated source/browser audit are bounded001 observations, not final seven-width matrix. Chrome extension viewport override did not apply (actual1920); those attempts were discarded as mobile evidence. DevTools used normal form authentication with the newly generated disposable credential; no copied session/cookie/token. Screenshot local-file export was denied by DevTools workspace-root policy; in-memory viewport screenshot was inspected successfully, no saved screenshot PASS claimed.

Audit browser streams released and owner logged out; exact-owned cleanup succeeded under the reviewed guard. FIXTURE-CLEANUP-001.json records21 tables, residualRows0, verified TLS/exact38 ledger and productionMutated=false. Cleanup includes7 users,1 group,1 direct conversation,4 memberships,4 invitations,1 group text,1 direct message, connection/outbox/notifications/rates/profiles/languages/sessions and dependents. Unrelated historical TEST data not selected or modified. No product changes.

Future003/004/006 must rerun their actual affected acceptance after implementation. Phase28 historical NOT_RUN partner-send limitation remains historical; this001 plain-text baseline send is not the final004 native context-share proof.
