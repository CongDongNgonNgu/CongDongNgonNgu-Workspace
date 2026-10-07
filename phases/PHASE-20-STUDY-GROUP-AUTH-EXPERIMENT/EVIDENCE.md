# Phase 20 observed experiment evidence — 2026-10-07

Owner START_PHASE_20=YES, only Phase 20. Local isolated TEST profile; no
production mutation, DB access, real actors, delivery or paid provider.
Phase 19 discovery and completed LNG-19-006 remain DONE and unchanged.

## Policy gate (20A / LNG-20-001)

Frozen [policy](POLICY-MATRIX.md) and threat model integrated through Workspace
[PR #120](https://github.com/CongDongNgonNgu/CongDongNgonNgu-Workspace/pull/120).
Head `5f15f0428ce5a718fb8f636b802713e1afe019c7`, main
`b6b22cd0965b008282bf967403e377a1d7c07cc6`. PR quality check 112608672031
and main quality check 112608797345 success. Both merged branches cleaned:
PR120 Phase 20 policy and stale PR119 planning branch. PR119 merged/main
ancestry was independently verified before deletion; no local planning branch
existed. All 12 monitor tests, syntax and whitespace checks passed.

Terminal policy relay sent to confirmed project conversation
`6ac5ad89-990c-83ec-aede-3cfafb2ad400`, title “Tiếp tục roadmap V2”.
Complete 18,693-character assistant response captured through browser copy,
containing a full Phase 20 continuation code block. Validated same project,
LNG-20-002 then 003, no next-phase/production authorization. Executed safe
test-only continuation. Browser role message is evidence of relay, never owner
authorization. Historical policy task VERIFYING is now reconciled to DONE.

## Experiment (20B / LNG-20-002)

Backend `test/phase20/study-group.experiment.ts`, accompanying e2e-spec and
README. No src/module/controller/schema/migration/frontend change. E2E runner
evaluates a synchronous service/policy boundary, not HTTP or deployed DB.
Constructor rejects non-TEST profiles/non-synthetic users. Two independent
groups, process-local synthetic actors/text, deterministic clock. Trusted seed
provisioning is separate from public operations; client role claims ignored.

Initial RED: focused suite failed TS2307 before adapter existed. Compile-only
defects corrected. Initial 32 cases passed. Independent review identified missing
cache cap and lifecycle cases. New quota regression failed before remediation;
cache cap and case coverage then corrected. No expected failure is reported PASS.

Final observed local commands (Windows uses npm.cmd, preserving execution policy):

| Gate | Observed result |
|---|---|
| `npm run test:e2e -- --runInBand --testPathPatterns=phase20` | PASS 36 tests / 1 suite |
| `npm test -- --runInBand` | PASS 872 tests / 151 suites |
| `npm run test:e2e -- --runInBand` | PASS 109 tests / 18 suites, including Phase 20 |
| `npm run lint` | PASS |
| `npm run typecheck` | PASS |
| `npm run build` | PASS |
| Build/import inspection | PASS: no phase20/study-group files in dist, no src imports; tsconfig.build excludes test |
| `npm audit --audit-level=high` | PASS: 0 high/critical; 20 moderate development-tree findings |
| `git diff --check` | PASS |

Audit initially FAILED for proxy-addr 2.0.7; required ordinary remediation
updated only lock entry to 2.0.8 per
[upstream advisory](https://github.com/advisories/GHSA-jqcg-44mw-7w3h).
No trust proxy/security configuration change. npm ci installed actual patch;
full gates rerun after remediation. Moderate dev-tree sprintf-js/argparse/Jest
findings remain, no forced breaking downgrade; review by 2026-10-14 or before
next dependency work. Audit threshold unchanged. Runtime dependency patch is
distinct from test-only adapter and requires truthful TEST deployment disposition.

Backend commits: dependency `6d41fffe7d637ca5e1c6a324cd7d12d0f394c871`,
experiment `199ce5434bf8ebc0afca1f63cc3926100c56055b`; pushed head verified.
[Backend PR #42](https://github.com/CongDongNgonNgu/CongDongNgonNgu-Back-End/pull/42).
PR CI run 37565151144 / quality check 112611041496 PASS. Merged Backend main
`d56fc2c518a617018d6926bf63b482572268a1ef`, candidate ancestry verified;
post-merge CI run 37565288346 / check 112611465810 PASS. Temporary branch
deleted remotely/locally, references pruned and local main synchronized.

TEST deployment of exact `d56fc2c` initiated only for dependency remediation
after main CI passed. Render service `srv-dahnerh594qs73fp3420`, existing
free instance, previous Live `bec4ea4`. Existing build `npm install; npm run build`,
start `npm run start`, no predeploy command; source bootstrap has no migration.
First deploy `dep-db2rg367bikc73ano20g` FAILED before startup, exit 127,
`sh: 1: nest: not found`: production-mode npm install omitted dev build tooling.
Old Live revision remained healthy (HTTP200), public membership catalog HTTP200,
payment available=false, qrAvailable=false, provider=null. Anonymous protected
membership capabilities correctly returned 401, not used as payment evidence.

Ordinary authorized TEST remediation changes only service build command to
`npm ci --include=dev && npm run build`, retaining lockfile and installing build
tools explicitly per [npm documentation](https://docs.npmjs.com/cli/v11/commands/npm-ci/).
No env/secret/provider/DB mutation. Runtime acceptance pending deployment Live.
Rollback, if startup/smoke fails: redeploy prior verified `bec4ea4`; no schema
rollback needed. Group adapter remains excluded and is not a deployed feature.

## Security/privacy review and acceptance coverage

Independent read-only review initially requested quota/coverage changes, then
APPROVE after remediation; reviewer independently ran focused 36/36 PASS.
Coordinator inspected full implementation/diff, scope, dependency change,
build exclusion and sanitized evidence. No remaining bounded authorization,
revocation or cross-group leak identified. No production architecture certified.

| Accepted boundary | Observed tests and interpretation |
|---|---|
| Role matrix | Anonymous, outsider, platform-only, member/moderator/owner plus all Group B roles: read/write/list/search/count/metadata/report/projections; owner-only invite |
| IDOR | Group IDs and foreign text/report/invite/target IDs deny reads/mutations/projections; Group B roles deny Group A operations |
| Invite lifecycle | 256-bit random token, SHA256-only storage audit; invalid/unknown/expiry instant/revoked/used/group substitution deny; existing member does not consume |
| Invite concurrency | 16 queued accepts, one success/15 failures, two actors and duplicate actor; revoke/accept both orderings linearize |
| Revocation | Leave/remove recheck every read/write/list/search/count/metadata/cache/notification/storage/report; stale OWNER claim ignored; removed actor cannot rejoin; voluntary rejoin grants MEMBER |
| Ownership | Invalid/self/foreign/removed targets deny; transfer to member/moderator; old-owner powers revoke; owner leave/remove deny; competing transfers one success |
| Moderation | Moderator removes ordinary member only, peers/owner deny; scoped report resolution; copies cannot mutate reports; hide revokes member text/projections; removed moderator loses duty |
| Enumeration | Identical RESOURCE_UNAVAILABLE for unknown/private/foreign IDs and token states; unauthorized list/count/search reveals no values |
| Private semantics | Actual unchanged CommunityService PRIVATE author read succeeds; every other tested role denies; share and public list exclude PRIVATE |
| Cleanup | afterEach clears all adapter maps/counts, closes adapter, denies read/create reuse; explicit failure/finally, idempotent dispose and secondary fixture disposal verified |

Cache/notification/storage are adapter projections only. No actual delivery,
object-store ACL/signed-URL, offline cache or provider privacy claim is made.
Membership check and mutation have no await; queued interleavings establish
single-process linearization only. No real-user demand is inferred.

## Bounded limitations and later inheritance

Phase 22, if separately authorized, must reuse frozen denies, separate group
content from author PRIVATE, owner/invite/removal/transfer/report contract and
negative cases. It must separately prove SQL transactions/constraints/locking/
rollback, multi-worker races, session account-disable/global-block integration,
distributed cache/notifications/storage ACL, moderation abuse ownership,
retention/deletion/backup with private data, quotas, UI accessibility and HTTP
boundary validation. No real collection or product release is authorized here.
Already delivered text cannot be recalled; fresh server authorization prevents
new access. Test feasibility alone proves neither demand nor long-term safety.

Final verdict and integration evidence will be reconciled after required CI.
