# Phase 10 Handoff

**Phase status:** IN_PROGRESS

Record ledger schema, rule versions/table, reversal policy, abuse controls, timezone/streak decision, Stitch references, SHAs, tests and CI.

On Acceptance: Phase 10 DONE; Phase 11 becomes READY. Phase 15 also still waits on Phase 11.

Phases 05, 06 and 08 satisfy the dependency for the first Phase 10 task.
Phase 10 is active. Subphases 10A and 10B are closed; the next recommended
subphase is 10C, starting with `LNG-10-005`.

## Phase 10A execution

The active decomposition is recorded in `PHASE-10-DECOMPOSITION.md`:
`10A` auditable ledger and contribution rules, `10B` learning XP and
timezone-aware streaks, `10C` badges/levels and anti-farming, `10D` Passport
UI, and `10E` reconciliation/final gate. `10A` is the current subphase for
`LNG-10-001` and `LNG-10-002`; its migration is authorized by the Phase 10
ledger scope, but no TEST or production database is mutated during validation.

## PHASE_10A final acceptance evidence

```text
PHASE_10A_RESULT=PASS
PHASE_10_DECOMPOSITION=10A Ledger + Contribution Rules [LNG-10-001,LNG-10-002]; 10B Learning XP + Streaks [LNG-10-003,LNG-10-004]; 10C Badges + Levels + Anti-Farming [LNG-10-005,LNG-10-006]; 10D Passport/Profile UI [LNG-10-007]; 10E Reconciliation + Final Gate [LNG-10-008]
PHASE_SCOPE=Append-oriented dual-system ledger, derived balances, idempotent event replay, versioned community contribution rules, independent-actor/source eligibility, and append-only compensating reversals.
TASKS_INCLUDED=LNG-10-001,LNG-10-002
TASKS_COMPLETED=LNG-10-001,LNG-10-002 (implementation, review, full validation, CI, merge, remote-main verification, and branch cleanup)
BACKEND_BEFORE_SHA=42463097e3884fa9529741c196c33351a958820d
BACKEND_AFTER_SHA=438ace0c2141072e0118b1f397f4a78354b1d3d4
BACKEND_FEATURE_HEAD_SHA=554574f4e1d5032e09d94a53ccc0bb4d1b10dcf0
FRONTEND_BEFORE_SHA=5a258796ae96e6efb77d44dd72e168edcaa6213b
FRONTEND_AFTER_SHA=5a258796ae96e6efb77d44dd72e168edcaa6213b
WORKSPACE_BEFORE_SHA=6e134f137297774c88863083cede853ec53c1fb4
WORKSPACE_AFTER_SHA=02e043a88b08d7c144ab48eb1fe81d6e653de0c3
WORKSPACE_FEATURE_HEAD_SHA=b374ceccb61e07c48d95533a56e7378c3a794156
IMPLEMENTATION=PASS
REVIEW=PASS
RUNTIME=NOT_REQUIRED
ACCEPTANCE=PASS (local acceptance and source-control integration verified)
TESTS=23 focused reputation unit/repository/migration tests PASS; Backend full unit 81 suites/558 tests PASS; Backend E2E 13 suites/59 tests PASS
TYPECHECK=PASS
LINT=PASS
BUILD=PASS
AUDIT=PASS: 0 vulnerabilities (online npm audit)
CI=PASS: Backend PR #4 1/1; Backend post-merge CI run #32 PASS on 438ace0; Workspace PR #7 merged with CI NOT_REQUIRED
DATABASE_SCHEMA_CHANGE=YES
MIGRATION_CREATED=YES (0012_phase10_reputation_ledger.sql + down migration)
TEST_DB_MUTATED=NO
PRODUCTION_DB_MUTATED=NO
FRONTEND_CHANGED=NO
DEPLOYED=NO
MERGED_TO_MAIN=YES
BLOCKERS=NONE
CURRENT_PHASE=10
CURRENT_SUBPHASE=10A
SUBPHASE_STATUS=DONE
NEXT_RECOMMENDED_SUBPHASE=10B
NEXT_ACTION=REQUEST_NEXT_PROMPT
```

The Backend increment adds a provider-free `ReputationModule`, a versioned
contribution rule engine, an in-memory/Postgres ledger repository, and the
authorized Phase 10A migration. It keeps Learning XP and Community
Reputation independent, rejects self/private/unverified/raw-volume rewards,
converges idempotent retries, derives balances from entries, and preserves
awards through linked compensating reversals. Verified translation/resource
rewards require `MODERATOR` or `ADMIN` actors, matching the existing review
boundary. Backend and Workspace were merged through PRs, exact remote-main
heads were verified, and merged feature branches were deleted locally and
remotely. No migration command or database write was run.

## PHASE_10B final acceptance evidence

```text
PHASE_10B_RESULT=PASS
PHASE_10_DECOMPOSITION=10A Ledger + Contribution Rules [LNG-10-001,LNG-10-002]; 10B Learning XP + Streaks [LNG-10-003,LNG-10-004]; 10C Badges + Levels + Anti-Farming [LNG-10-005,LNG-10-006]; 10D Passport/Profile UI [LNG-10-007]; 10E Reconciliation + Final Gate [LNG-10-008]
PHASE_SCOPE=Trusted bounded learning completion XP, deterministic source-id replay protection, timezone-aware streak projection, milestones, reversals and timezone-change policy derived from the Phase 10A ledger.
TASKS_INCLUDED=LNG-10-003,LNG-10-004
TASKS_COMPLETED=LNG-10-003,LNG-10-004
BACKEND_BEFORE_SHA=438ace0c2141072e0118b1f397f4a78354b1d3d4
BACKEND_FEATURE_HEAD_SHA=dd0f295a81f6d89b20a3efea6a31327ddfe9cf62
BACKEND_AFTER_SHA=24e7aaa66d8801624200e2ced329bfe5c0fb65c2
BACKEND_PR=5
FRONTEND_BEFORE_SHA=5a258796ae96e6efb77d44dd72e168edcaa6213b
FRONTEND_AFTER_SHA=5a258796ae96e6efb77d44dd72e168edcaa6213b
WORKSPACE_BEFORE_SHA=4172a5bb6e67a10cfff5808817124243b94ddc05
WORKSPACE_FEATURE_HEAD_SHA=81a49995a658b317dce335fc7ec0e3eb0b7a632a
WORKSPACE_PR=9
WORKSPACE_AFTER_SHA=bd568267fe4c210ec21861a858bfe9f731babfe3
IMPLEMENTATION=PASS
REVIEW=PASS
RUNTIME=NOT_REQUIRED
ACCEPTANCE=PASS
TESTS=Focused Phase 10B 3 suites / 24 tests PASS; Backend full unit 84 suites / 582 tests PASS; Backend E2E 13 suites / 60 tests PASS
TYPECHECK=PASS
LINT=PASS
BUILD=PASS
AUDIT=PASS: online npm audit found 0 vulnerabilities
CI=PASS: Backend PR #5 1/1; Backend post-merge CI run #34 on 24e7aaa PASS; Workspace PR #9 merged with CI NOT_REQUIRED
STREAK_TIMEZONE_DETERMINISM=PASS
DATABASE_SCHEMA_CHANGE=NO
MIGRATION_CREATED=NO
TEST_DB_MUTATED=NO
PRODUCTION_DB_MUTATED=NO
FRONTEND_CHANGED=NO
DEPLOYED=NO
MERGED_TO_MAIN=YES
BLOCKERS=NONE
CURRENT_PHASE=10
CURRENT_SUBPHASE=10B
SUBPHASE_STATUS=DONE
NEXT_RECOMMENDED_SUBPHASE=10C
NEXT_ACTION=REQUEST_NEXT_PROMPT
```

Phase 10B keeps Learning XP separate from Community Reputation and awards
only trusted completed practice, focused-session, vocabulary-milestone and
passing-quiz events. The backend derives bounded progress, milestones and
current/longest streaks from positive unreversed Phase 10A ledger entries;
failed, abandoned, empty, future, malformed, duplicate and insufficiently
evidenced events write nothing. Explicit IANA timezone projection is
calendar/DST/process-timezone independent, uses UTC only at the service
boundary for a missing profile timezone, and rejects timezone-less input in
the pure calculator. Timezone changes never create, rewrite or backfill XP.
No frontend, migration, TEST database, production database or deployment was
used. Backend PR #5 and exact-head post-merge CI passed; Workspace PR #9
merged at `bd568267fe4c210ec21861a858bfe9f731babfe3`, with its temporary
branch deleted locally and remotely. Phase 10C is the next recommended
subphase; Phase 11 has not started.

## PHASE_10C final acceptance evidence

```text
PHASE_10C_RESULT=PASS
PHASE_10_DECOMPOSITION=10A Ledger + Contribution Rules [LNG-10-001,LNG-10-002]; 10B Learning XP + Streaks [LNG-10-003,LNG-10-004]; 10C Badges + Levels + Anti-Farming [LNG-10-005,LNG-10-006]; 10D Passport/Profile UI [LNG-10-007]; 10E Reconciliation + Final Gate [LNG-10-008]
PHASE_SCOPE=Transparent finite badges, deterministic community-reputation contributor levels, server-fact-only anti-farming controls, reversal projection and anomaly observability hooks.
TASKS_INCLUDED=LNG-10-005,LNG-10-006
TASKS_COMPLETED=LNG-10-005,LNG-10-006
BACKEND_BEFORE_SHA=24e7aaa66d8801624200e2ced329bfe5c0fb65c2
BACKEND_FEATURE_HEAD_SHA=13efdccb6624401e1b57cdbe504950c8c99a4ae0
BACKEND_AFTER_SHA=8edc67b988c4b854d5443cd97689dca9b82ad44e
BACKEND_PR=6
BACKEND_POST_MERGE_CI=PASS
BACKEND_POST_MERGE_CI_RUN=36
FRONTEND_BEFORE_SHA=5a258796ae96e6efb77d44dd72e168edcaa6213b
FRONTEND_AFTER_SHA=5a258796ae96e6efb77d44dd72e168edcaa6213b
WORKSPACE_BEFORE_SHA=e022314d4609088e33dcf6904deaf5902988e687
WORKSPACE_FEATURE_HEAD_SHA=38ee75bbe00c90c324c87f2f8ea1dfb9c3418e5e
WORKSPACE_PR=11
WORKSPACE_AFTER_SHA=8d002e5185f3bc385da9c98a921d70b7f450608d
IMPLEMENTATION=PASS
REVIEW=PASS
RUNTIME=NOT_REQUIRED
ACCEPTANCE=PASS
TESTS=Focused reputation 11 suites / 58 tests PASS; Backend full unit 87 suites / 593 tests PASS; Backend E2E 13 suites / 60 tests PASS
TYPECHECK=PASS
LINT=PASS (tsc --noEmit alias)
BUILD=PASS
AUDIT=PASS: online npm audit found 0 vulnerabilities
CI=PASS: Backend PR #6 exact head 1/1; Backend post-merge CI run #36 on 8edc67b PASS; Workspace PR #11 merged with CI NOT_REQUIRED
LEVEL_DERIVATION_DETERMINISTIC=PASS
BADGE_REVERSAL_PROJECTION=PASS
ANTI_FARMING_RULE_VERSION=community-antifarming-v1
GAMIFICATION_RULE_VERSION=community-gamification-v1
DATABASE_SCHEMA_CHANGE=NO
MIGRATION_CREATED=NO
TEST_DB_MUTATED=NO
PRODUCTION_DB_MUTATED=NO
FRONTEND_CHANGED=NO
DEPLOYED=NO
MERGED_TO_MAIN=YES
BLOCKERS=NONE
CURRENT_PHASE=10
CURRENT_SUBPHASE=10C
SUBPHASE_STATUS=DONE
NEXT_RECOMMENDED_SUBPHASE=10D
NEXT_ACTION=REQUEST_NEXT_PROMPT
```

Phase 10C adds derived community badges and contributor levels without a
mutable projection or role promotion. Badge state remains `LOCKED`, `EARNED`
or `REVOKED`; reversals preserve ledger history and remove active evidence.
The `community-antifarming-v1` rules use only server-derived facts for
self-reward, repeated fingerprints, coordinated actor reuse and observable
pair reuse; exact replay remains idempotent and rejected events write no
reward. ADR-022 records the finite thresholds and the explicit V1 boundary.
No frontend, migration, TEST database, production database or deployment was
used. Backend PR #6 and exact-head post-merge CI passed; Workspace PR #11
merged at `8d002e5185f3bc385da9c98a921d70b7f450608d`, with its temporary
branch deleted locally and remotely. Phase 10D is ready; Phase 11 has not
started.

## PHASE_10D final acceptance evidence

```text
PHASE_10D_RESULT=PASS
PHASE_10_DECOMPOSITION=10A Ledger + Contribution Rules [LNG-10-001,LNG-10-002]; 10B Learning XP + Streaks [LNG-10-003,LNG-10-004]; 10C Badges + Levels + Anti-Farming [LNG-10-005,LNG-10-006]; 10D Passport/Profile UI [LNG-10-007]; 10E Reconciliation + Final Gate [LNG-10-008]
PHASE_SCOPE=Stitch-backed owner-only Passport/progress surface separating language proficiency, Learning XP and Community Reputation with privacy-safe server projections.
TASKS_INCLUDED=LNG-10-007
TASKS_COMPLETED=LNG-10-007
BACKEND_BEFORE_SHA=8edc67b988c4b854d5443cd97689dca9b82ad44e
BACKEND_FEATURE_HEAD_SHA=3a023a82d30c6d83ef966485c2eb7471a335d3ea
BACKEND_AFTER_SHA=1a75ed7279a0a76f9539c855512a03979a8cac69
BACKEND_PR=7
BACKEND_POST_MERGE_CI=PASS
BACKEND_POST_MERGE_CI_RUN=38
FRONTEND_BEFORE_SHA=5a258796ae96e6efb77d44dd72e168edcaa6213b
FRONTEND_FEATURE_HEAD_SHA=e21d512e9c70616f23209d7178196fc1e1a64a0b
FRONTEND_AFTER_SHA=6358552f23318f5dfd436ef8bd0b1b2cb4e034c7
FRONTEND_PR=9
FRONTEND_POST_MERGE_CI=PASS
FRONTEND_POST_MERGE_CI_RUN=53
WORKSPACE_BEFORE_SHA=7f20a9cc1f4df0aaf1c62538e854d30326d817ac
WORKSPACE_FEATURE_HEAD_SHA=8f0bbaeb59888927bb9c7a23eee95ef973a0470e
WORKSPACE_PR=13
WORKSPACE_AFTER_SHA=4fa51acffab4174f808a20d4e6567c12e520ca56
WORKSPACE_POST_MERGE_CI=NOT_REQUIRED
IMPLEMENTATION=PASS
REVIEW=PASS
RUNTIME=PASS
ACCEPTANCE=PASS
TESTS=Backend focused controller 1 suite/1 test; backend full unit 88 suites/594 tests; backend E2E 13 suites/60 tests; frontend focused 3 files/17 tests; frontend full regression 54 files/242 tests; browser smoke desktop + mobile 390px PASS
TYPECHECK=PASS
LINT=PASS
BUILD=PASS
AUDIT=PASS: online npm audit --audit-level=high found 0 vulnerabilities in backend and frontend
CI=PASS: backend PR #7 1/1 + post-merge run #38 on 1a75ed7; frontend PR #9 3/3 + post-merge run #53 on 6358552; Workspace PR #13 merged with CI NOT_REQUIRED
DATABASE_SCHEMA_CHANGE=NO
MIGRATION_CREATED=NO
TEST_DB_MUTATED=NO
PRODUCTION_DB_MUTATED=NO
FRONTEND_CHANGED=YES
DEPLOYED=NO
MERGED_TO_MAIN=YES
BLOCKERS=NONE
CURRENT_PHASE=10
CURRENT_SUBPHASE=10D
SUBPHASE_STATUS=DONE
NEXT_RECOMMENDED_SUBPHASE=10E
NEXT_ACTION=REQUEST_NEXT_PROMPT
```

Phase 10D preserves the identity-first Passport while making Learning XP
and Community Reputation visibly separate, server-authoritative projections.
Public profile privacy, finite badge criteria, reversal-neutral language,
responsive/a11y states and retry behavior were verified. No raw ledger or
private moderation/evidence data is exposed. No schema change, migration,
TEST database mutation, production database mutation or deployment occurred.
Phase 10E is the next authorized subphase; Phase 11 has not started.

## PHASE_10E final acceptance evidence

```text
PHASE_10E_RESULT=PASS
PHASE_10_DECOMPOSITION=10A Ledger + Contribution Rules [LNG-10-001,LNG-10-002]; 10B Learning XP + Streaks [LNG-10-003,LNG-10-004]; 10C Badges + Levels + Anti-Farming [LNG-10-005,LNG-10-006]; 10D Passport/Profile UI [LNG-10-007]; 10E Reconciliation + Final Gate [LNG-10-008]
PHASE_SCOPE=Bounded deterministic reconciliation of ledger replay/idempotency, reversals, derived XP/reputation balances, rewards, timezone-aware streaks, badges, levels, anti-farming decisions and owner Passport projections.
TASKS_INCLUDED=LNG-10-008
TASKS_COMPLETED=LNG-10-008
BACKEND_BEFORE_SHA=1a75ed7279a0a76f9539c855512a03979a8cac69
BACKEND_FEATURE_HEAD_SHA=7e1d252b03eab7e6a3200bd8f43efe696489e9bf
BACKEND_AFTER_SHA=bc62bc0ac4e98df4abc7079236f573e9db7c2ed3
BACKEND_PR=8
BACKEND_POST_MERGE_CI=PASS
BACKEND_POST_MERGE_CI_RUN=40
FRONTEND_BEFORE_SHA=6358552f23318f5dfd436ef8bd0b1b2cb4e034c7
FRONTEND_AFTER_SHA=6358552f23318f5dfd436ef8bd0b1b2cb4e034c7
FRONTEND_CHANGED=NO
WORKSPACE_BEFORE_SHA=2f1b9a5f9b221922f6ec3abd91dec8a751d9f087
WORKSPACE_AFTER_SHA=RECORDED_IN_FINAL_STATE_SYNC
IMPLEMENTATION=PASS
REVIEW=PASS
RUNTIME=NOT_REQUIRED
ACCEPTANCE=PASS
TESTS=Focused reconciliation 6 tests PASS; Backend full unit 89 suites/600 tests PASS; Backend E2E 13 suites/60 tests PASS; Frontend Phase 10D regression 54 files/242 tests PASS; browser desktop/mobile evidence PASS
TYPECHECK=PASS
LINT=PASS
BUILD=PASS
AUDIT=PASS: online npm audit --audit-level=high found 0 vulnerabilities in backend and frontend
CI=PASS: Backend PR #8 exact head 1/1; backend post-merge CI run #40 on bc62bc0 PASS; Workspace CI NOT_REQUIRED
RECONCILIATION_NON_DESTRUCTIVE=PASS
RECONCILIATION_SAFE_REPAIR_BOUNDARY=PASS
RECONCILIATION_IDEMPOTENCY=PASS
RULE_VERSION_RECONCILIATION=PASS
STREAK_RECONCILIATION=PASS
BADGE_RECONCILIATION=PASS
LEVEL_RECONCILIATION=PASS
ANTI_FARMING_RECONCILIATION=PASS
PASSPORT_PROJECTION_RECONCILIATION=PASS
RECONCILIATION_AUTHORIZATION=PASS
RECONCILIATION_PRIVACY=PASS
ERROR_SANITIZATION=PASS
SECRET_HANDLING=PASS
ANOMALY_OBSERVABILITY=PASS
DATABASE_SCHEMA_CHANGE=NO
MIGRATION_CREATED=NO
MIGRATION_0012=UNCHANGED
TEST_DB_MUTATED=NO
PRODUCTION_DB_MUTATED=NO
DEPLOYED=NO
MERGED_TO_MAIN=YES
BLOCKERS=NONE
CURRENT_PHASE=10
CURRENT_SUBPHASE=10E
SUBPHASE_STATUS=DONE
NEXT_RECOMMENDED_SUBPHASE=NONE
NEXT_ACTION=PHASE_10_FINAL_CLOSEOUT
```

The 10E implementation is a diagnostic-only reconciliation module and test
suite. It never repairs or persists data, keeps issue output bounded and
sanitized, preserves the Phase 10A migration baseline, and reuses the
canonical XP/reputation/streak/badge/level/anti-farming/Passport calculators.
Backend PR #8 and exact-head post-merge CI passed; the remote and local
`phase-10e-reconciliation` branches were deleted after merge. Frontend source
did not change in 10E, so the accepted 10D responsive/a11y/browser evidence
remains the Phase 10 UI evidence. Workspace final SHA is recorded in the
subsequent state-sync closeout.

## PHASE 10 final gate and closeout

```text
PHASE_10_FINAL_CLOSEOUT=PASS
PHASE_10_RESULT=PASS
PHASE_10_TASK_SET_COMPLETE=YES
PHASE_10_FINAL_GATE=PASS
PHASE_10_CROSS_SUBPHASE_INTEGRITY=PASS
PHASE_10_FULL_REGRESSION=PASS
PHASE_10_SECURITY_PRIVACY=PASS
PHASE_10_DB_MIGRATION_CLOSURE=PASS
PHASE_10_EXACT_HEAD_CI=PASS
PHASE_10_WORKSPACE_CONSISTENCY=PASS_PENDING_FINAL_STATE_SYNC
PHASE_10_MERGE_READINESS=PASS
PHASE_10_DEPLOYED=NO
PHASE_10_PRODUCTION_DB_MUTATED=NO
PHASE_10_TEST_DB_MUTATED=NO
PHASE_10_DATABASE_SCHEMA_CHANGE=YES (authorized 0012 in 10A; unchanged in 10E)
PHASE_10_MIGRATION_CREATED=YES (0012 in 10A; none in 10E)
NEXT_PHASE=11
NEXT_TASK_ID=LNG-11-001
NEXT_TASK_NAME=Membership Product & Entitlement Model
NEXT_TASK_STATUS=READY
NEXT_ACTION=READY_FOR_NEXT_PHASE_AUTHORIZATION
```

Phase 10 is fully accepted and no Phase 11 work has started. The remaining
Workspace state-sync PR only replaces the temporary evidence placeholders
with verified Workspace main SHAs.
