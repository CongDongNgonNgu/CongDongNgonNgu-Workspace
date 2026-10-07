# Phase 23 Backend acceptance

LNG-23-002 backend acceptance gates PASS. LNG-23-003 is READY for implementation after this reviewed evidence is integrated into Workspace main. Phase23 remains IN_PROGRESS; frontend/browser/integrated closeout acceptance is not claimed.

## Accepted source and checks

Backend PR45: https://github.com/CongDongNgonNgu/CongDongNgonNgu-Back-End/pull/45. Independently reviewed final candidate `816b57f170f6bf5caacf00e7c83561e83fd66568` passed quality check112772481986/run37615424272. Squash merge revision `a2640cd7d734f088987fb32b89efc5cbf40e954e` passed required main quality check112774581653. Actual main CI logs report158 unit suites/941 tests,21 e2e suites/158 tests, Phase22 PostgreSQL18 proof2 suites/25 tests, Phase23 PostgreSQL18 proof1 suite/6 tests. Lint, typecheck, build and security audit high gate PASS. Audit retains20 inherited moderate development-tree findings; no high/critical finding passed through the gate.

Exact merged local HEAD and origin/main match; candidate/main trees were equal. The exact merged artifact was built successfully. Temporary branch `feature/phase23-related-resources` was deleted remotely and locally after main CI success, and stale references were pruned. Backend working tree is clean. Independent full and focused remediation reviews APPROVE; see BACKEND-REVIEW.md.

## Observed approved TEST migration

On 2026-10-07 the guard positively identified the existing approved TEST neondb/public/PostgreSQL18 database, verified all27 normalized checksummed baseline migrations, and allowed only pending0028. `0028_phase23_library_relations.sql` applied successfully using the established transactional migration runner. A subsequent guard verified28 baselines with no pending migration. Database fingerprint: `afbbdfd482dea1c4fab2ea27b35f2c2223c86c769fda15164d0401fceeeace5d`.

A separate read-only transaction verified normalized checksum `be765ce511a429de2896b6116f550beefb3d004fef8c4ebd273f33a70f4b227a`, the actual `library_resource_relations` table, endpoint CASCADE and reviewer RESTRICT foreign keys, directed triple primary key, no-self-loop/type/status/evidence/snapshot/timestamp/revision checks, and active-anchor plus target indexes. The probe initially used an incorrect table name and failed without writes; correcting it to the migration's actual name yielded PASS. No relation seeds were applied.

## Exact observed Render TEST deployment

Existing approved TEST service `srv-dahnerh594qs73fp3420` was manually deployed through the restored authenticated dashboard, choosing exact commit `a2640cd7d734f088987fb32b89efc5cbf40e954e`. Deployment `dep-db33b07avr4c739l7110` visibly reached **Deploy succeeded|Live**, duration1m04s; Source hyperlink and checkout log attest that exact SHA. Dashboard start time2026-10-07 19:05:20 Asia/Saigon. Auto-deploy remains OFF; provider configuration was not changed. Fixed public TEST health returned success/status ok/service congdongngonngu-backend. The earlier User unavailable browser interruption was resolved by the owner reconnect; no deployment was triggered during that interruption.

## Actual deployed API and cleanup evidence

The independently approved guarded harness built from exact clean merged source executed setup PASS at2026-10-07T12:10:16Z and public deployed HTTP acceptance PASS at2026-10-07T12:11:06Z. It registered89 synthetic TEST resources,2 passwordless synthetic actors (creator MEMBER, separate reviewer MODERATOR), and1 uniquely owned license. Existing canonical Library contribution/provenance/review services and trusted persisted relation review established all five relation types. No Phase21 fixture promotion or login session was used.

Observed PASS: canonical public resource/source/license equality and exact public response keys; all five fixed types; language/type/level filters; default3 plus explicit continuation; max12 and remaining13th target; first64 hidden targets yield an honest empty page with cursor and the next page returns2 eligible targets; malformed/cross-anchor/valid authenticated GCM-bitflip cursors and changed filter/limit contexts return400; honest no-relation empty abstention; hidden/restored/changed target stale assertion suppression; explicit re-review and revoke; unverified or changed-source target exclusion; inactive owned license returns generic anchor404; disabled persisted reviewer suppresses assertions; target deletion cascades references and returns generic404.

Successful HTTP acceptance immediately performed exact ownership-validated scoped cleanup and reached CLEANED. Zero registered residual users/resources/licenses/relations/provenance/review-audits/contribution-events were verified. Cleanup was subsequently re-run independently and remained PASS/CLEANED; no runtime fixture scope remains. Root evidence JSON remains local; no private registry, fixture identifiers, credentials or cursors are committed.

The harness emitted a pg concurrent-client query deprecation warning without test failure; no error was suppressed or gate bypassed. A read-only operational progress probe initially used review_status instead of the actual review_state, failed without writes, and after correction observed89 verified fixtures while sequential setup completed. Neither diagnostic attempt is counted as an acceptance test.

## Limits and remaining work

Original-author runtime fixture source health is NOT_APPLICABLE; applicable Phase06 invalidation and current serialization checks are focused Backend test evidence. Separate current reads do not prove atomic revocation or post-response freshness. Related-only32 provenance capacity omits oversized resources rather than truncating evidence; ordinary Library detail/search behavior remains unchanged. Query accounting43 with language validation/42 without and64 materialized candidate IDs are bounded implementation proofs, not universal latency or payload guarantees.

This is synthetic technical API acceptance. Lexical browser navigation, frontend journey, seven-width vi/en responsive/keyboard/contrast gates and integrated Phase21 quality/limitations belong to003/004. No corpus rights, human linguistic quality, real-user value, generalization or free-text superiority certification is claimed. Phase22 DONE/GO_BOUNDED_TEST is preserved. Category-completion23B and Phase24 remain unstarted/outside authorization. No production mutation or payment activation occurred.

## CI failure and remediation history

The following paragraphs record the state at each earlier failed run. Their pending-CI requirements were subsequently satisfied by the successful final PR and merged-main checks documented above; Frontend/browser/integrated003/004 gates remain pending.

CI remediation: first PR45 quality check112766493909/run37613583471 passed unit/e2e/build and Phase22 PostgreSQL proof, but failed before Phase23 SQL tests because the new Jest JSON configuration contained UTF8 BOM. Root reproduced JSON.parse failure, removed only the BOM, verified JSON parse and actual Jest discovery, and pushed focused commit7a5f2f0. New CI is required; no test gate was disabled or skipped to obtain acceptance.

Runtime harness independently APPROVED for guarded TEST execution after evidence label correction to HONEST_EMPTY_ABSTENTION. Its empty-result check does not test lexical browser navigation. Review found no cross-scope write or cleanup-FK blocker, and explicitly excludes Phase06-health/atomic-race/browser/corpus-rights/user-value certification. No remote fixture operation performed at this milestone.

Second CI check112768109583/run37614082977 reached SQL and failed during0028 setup because both new up/down SQL files also contained BOMs. Two new byte-level executable-SQL regressions were witnessed RED, then PASS after removing only the unapplied0028 BOMs. Focused migration suite4PASS. Commitc946289 publishes this targeted fix; historical migration files/checksums remain untouched. Full fresh CI and actual six SQL cases are still required.

Third CI check112769376545/run37614470405 applied0028 and passed scoped down/reapply, then five cases exposed an existing invalid SQL alias current_role in trusted PostgresIdentityRepository.replaceUserRoles. Root renamed only the alias/references to role_entry, preserving role predicates, transactions, row locks and last-active-admin protection. Focused identity/related61tests and typecheck PASS; independent targeted review APPROVE. Commit e5648ac retains actual persisted role lifecycle in SQL fixtures rather than bypassing it. Fresh full CI/sixSQL cases still required.

Fourth CI check112770792275/run37614907208 executed six SQL cases: five PASS (current review/revoke, snapshots/cascade,32/33capacity,64hidden continuation and up/down), one test expectation failed because PostgreSQL18 reviewer ON DELETE RESTRICT returned23001 instead of expected23503. Official error-code reference: https://www.postgresql.org/docs/18/errcodes-appendix.html. Commit816b57f fixes only the test expectation and strengthens missing-reviewer FK23503 plus reviewer/assertion preservation checks. Independent targeted review APPROVE; typecheck and Jest discovery PASS. Full fresh CI remains required.
