# 004 review journal

Current status: VERIFIED_PENDING_WORKSPACE_LIFECYCLE,2026-10-14; bounded target approved,cleanup residualRows0. Historical2026-10-13 checkpoints below remain chronological evidence,not current status.004 is not DONE before Workspace lifecycle closes.

Fresh reviewer `phase27_group_review_fresh` examined the migration, shared direct/group lease cap, stream authorization, lock order, membership-generation cursor and read consistency against [CONTRACT-004.md](CONTRACT-004.md).

| Finding | Classification | Resolution state |
|---|---|---|
| Fourth trigger function used invalid single-dollar SQL delimiters | Actionable, blocking migration execution | Corrected; canonical migration executed successfully in the isolated SQL suite |
| Context endpoint returned a raw card instead of `{textId, context}` | Actionable API mismatch | Author corrected envelope; endpoint verification pending |
| Hidden texts excluded from privileged users' unread counts | Contract ambiguity, not a behavior defect | Clarified that hidden texts never count as unread, consistent with the parent acceptance plan |

The reviewer found no other actionable issue in that bounded source review. This does not replace SQL concurrency, HTTP, browser or final independent acceptance.

Initial isolated SQL verification: `node phase27-test-sql.cjs --config test/phase27/jest-sql.json --runInBand --runTestsByPath test/phase27/group-collaboration.sql-spec.ts` exited 0, one suite/eight tests passed in 56.198 seconds. The harness applied baseline migrations through 0038 in its owned random schema and verified schema removal. Shared TEST `public` migration and runtime deployment remain pending. Additional backfill/rollback/reference boundary cases and inherited suites remain required.

Root review identified stale read acknowledgements regressing frontend unread/read state. Deferred-response tests now cover both older read positions and equal-position acknowledgements overtaken by a newer sync. Request/revision guards preserve the current projection and reconcile when necessary. Numeric backend unread counts are normalized to bounded decimal strings for presentation.

Fresh frontend reviewer `phase27_group_ui_final_review` found four actionable issues: cached moderator hidden flags, missing hidden history after promotion, equal-position late read acknowledgements, and forbidden pending dialogs surviving role downgrade. Each was reproduced with a failing regression before remediation. Sync now supplies bounded hidden-ID metadata, role transitions make one fresh bounded projection, read acknowledgements respect sync revisions, and pending operations are masked, cleared and rechecked against current permissions. A separate root regression reproduced hidden-reference 404 incorrectly discarding an active group draft; context denial now triggers authoritative group sync before deciding that access is lost. Focused page/hook verification passed 26 tests.

Final bounded backend review: APPROVE. Final frontend source review: no remaining substantive findings. Both are read-only source reviews, not independent execution or native-browser acceptance.

Final local gates: backend 180 unit suites/1120 tests, 23 e2e suites/168 tests, typecheck/lint/build/diff PASS. Frontend 135 files/722 tests, typecheck/build/diff and gzip budget PASS (147530 JavaScript bytes, 11039 CSS bytes). Production audit is zero for both; frontend full audit zero, backend high gate passes with 20 inherited moderate development findings. Existing Vite raw-chunk warning remains.

Expanded SQL passed 12 tests in 96.879 seconds. Inherited Phase22 service proof passed 19 tests and its HTTP suite passed six after updating the intentional response-field additions. Affected Phase26 regression passed 19 tests; two new HTTP cases passed. Final-source hidden-state rechecks passed one SQL case (22.272 seconds) and two HTTP cases (28.438 seconds). Filtered-out tests are skipped, not additional passes. All SQL runs used isolated owned schemas with verified cleanup.

Integration started: backend PR53 at `942fbe8f20eaf165e818455f880cd44ceb5b9dfc`; frontend PR42 at `77902bd281fc605b347c03d189359c3a0fe38548`. Required CI, merge/main verification, shared TEST migration, exact deployment and native acceptance remain pending.

Current integration update: backend PR53 quality CI 38390303503 passed and merged as `bcca2f0e1cbc2d08198c0ca01e2021db7311d438`. Remote main has the exact reviewed tree; main CI 38390944273 passed. Remote/local temporary backend branches were deleted and stale references pruned; backend main is clean and synchronized. Migration0038 was applied transactionally to owner-approved TEST with ledger38 and digest `7c9dd1152a6f45e4d9109df45da44f3c510635ab4594e2ed98f00fedc19c1428`. Render deployment `dep-db71fd59fdbs73enarq0` is building; Live acceptance remains pending. Frontend PR42 quality CI 38390309786 and preview passed; merge waits for backend readiness. See `evidence-004-migration.json` for exact source hash and target guard results.

2026-10-14 continuation: Render exact backend main is Live (1m11s), health200/statusok. Frontend PR42 merged as `d97eb14ca41c360b70e64a9ebcf28507337aac86`; main CI 38391627954 passed and Vercel deployment `BqscCZzWL9SB689LHrz1Gw5N16ku` is Ready/current domain. Its remote/local temporary branches were deleted after exact tree verification and main CI.

Native A/B/C began on those exact deployments. A created a group, B explicitly accepted its manual invitation, C was denied. A/B exchanged multiline Unicode text with current unread state; B retained an offline draft and sent it after network restoration. Identical client-UUID retry produced one displayed text and changed payload returned409. Library sharing rendered a current canonical card. Same-tab opening failed despite a valid current200 projection, so 004 acceptance remains incomplete. Extra shared-cookie A/A2 tab refresh failure is separately documented in `KNOWN-LIMITATIONS-004.md`; it is not counted as a pass.

Opening remediation PR43 candidate `b9a23cfb03538069ef4a7c3c5679285a39aa6df6`: two queue races failed before the generation fix; two geometry regressions failed before retaining measured pending heights. Old offscreen/disposal/owner/identity denials remain covered. Fresh bounded source review APPROVE; full frontend 136files/727tests, typecheck/build/diff and performance budget PASS (147548 JavaScript gzip bytes). Required PR/main CI, exact deployment and native opening verification remain pending. The existing raw-chunk warning remains. Synthetic fixture `6c138be8-f797-4f0a-85f2-f2e3173aa105` recovered from its manifest; cleanup is still pending.

The separate synthetic runtime helper review found plural `renderedIds` were not covered by its exact-fixture body-ID validator. The matcher now includes singular and plural ID fields. Five local ownership assertions pass, covering owned IDs, foreign plural/singular/nested IDs and the permitted fresh client UUID. New child-ID lookup remains restricted to exact fixture-owned groups, selects identifiers only, and stores no invitation/session tokens. No 004 runtime fixture has been created by this preparation.

External cross-model review was not invoked under the owner's automatic continuation instruction. Fresh isolated review above uses the existing agent model. Remaining review gates will record actual evidence and unresolved limitations before acceptance.

## 2026-10-14 final bounded runtime and follow-up review

Later native observations supplied by the root coordinator supersede the earlier opening/session/removal/archive PENDING checkpoints above; see [ACCEPTANCE-004.md](ACCEPTANCE-004.md). PR43 merged as 428bba6cb60c3e9040b7b7be8de370f09feb4638, main CI 38498121890 passed and TEST Vercel Ready. Native Library same-tab opening, Community share/B catch-up/open and exact-owned Community revocation masking passed. Hide and role-transition tests preserved active drafts while removing unavailable content and forbidden pending controls. Exactly owned B session revocation and A's removal of B each purged protected view/draft; A's archive emptied its current-group list and C retained generic denial.

Native Lighthouse92 exposed two ordinary findings: inactive controls referenced absent panels, and a heading span rule overrode Leave-button text contrast2.22:1. Both were reproduced/remediated in the005 frontend follow-up, reviewed candidate 71e7175acbfb7ebe818fd08a695d2fd6130c5118 and merged ff261bf5f8cb686b15e2e0767740aff405fd5cab. Exact-main CI 38500819127 passed, Vercel Ready. Final deployed B snapshot accessibility100 with 40 passing audits/zero failures and measured Leave contrast4.56:1. Existing draft, ACL and role behaviors remained covered. Full frontend 136files/733tests/typecheck/lint/build/performance/audit-zero passed.

Review disposition: APPROVE for the bounded remediated source/runtime target; no remaining actionable product finding recorded here. Final006 independent review still required. Runtime cleanup/residual verification and Workspace integration/branch cleanup remain PENDING, so004 remains VERIFYING. Inherited shared-cookie multi-tab limitation remains bounded/deferred as documented; screen reader NOT_RUN, Library revocation isolated-SQL-only. No final GO or completed fixture cleanup is inferred.

The bounded exact-session revocation helper review approved its fixture ownership guard before the actual five-active-of12-owned-session revocation. Native protected-view/draft purge passed; no unrelated actor session was selected.

## 2026-10-14 verified target, Workspace lifecycle pending

Exact-owned runtime cleanup PASS:7 texts,2 invitations,11 group-rate rows,2 direct-rate rows,4 memberships,2 groups,1 owned Community post,3 profiles,110 sessions,3 role rows and3 synthetic users deleted. ResidualRows=0; manifest CLEANED and temporary runtime controller stop accepted. Existing prior Library fixture and unrelated TEST rows were not mutated. See [cleanup evidence](evidence-004-005-cleanup.json).

Native005 create/join forms passed28 VI/EN/seven-width combinations with no overflow, labeled fields and visible controls. Create-dialog initial Close focus, Escape close and return focus passed in both locales. Form metrics are [evidence-005-forms-native.json](evidence-005-forms-native.json).

004/005 share the pending Workspace closeout PR because004 final native accessibility acceptance required the bounded005 frontend follow-up.005 source clarification proceeded alongside004 final verification; it did not create a second group domain or broaden discovery. Both remain VERIFIED_PENDING_WORKSPACE_LIFECYCLE,006 PLANNED, Phase27 verdict NOT_REACHED. Workspace syntax check,12 monitor tests and diff check PASS; required Workspace PR/main CI, merge verification, temporary branch cleanup and sync are still pending.
