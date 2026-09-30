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
WORKSPACE_AFTER_SHA=PENDING_WORKSPACE_MERGE
IMPLEMENTATION=PASS
REVIEW=PASS
RUNTIME=NOT_REQUIRED
ACCEPTANCE=PASS
TESTS=Focused Phase 10B 3 suites / 24 tests PASS; Backend full unit 84 suites / 582 tests PASS; Backend E2E 13 suites / 60 tests PASS
TYPECHECK=PASS
LINT=PASS
BUILD=PASS
AUDIT=PASS: online npm audit found 0 vulnerabilities
CI=PASS: Backend PR #5 1/1; Backend post-merge CI run #34 on 24e7aaa PASS; Workspace CI NOT_REQUIRED
STREAK_TIMEZONE_DETERMINISM=PASS
DATABASE_SCHEMA_CHANGE=NO
MIGRATION_CREATED=NO
TEST_DB_MUTATED=NO
PRODUCTION_DB_MUTATED=NO
FRONTEND_CHANGED=NO
DEPLOYED=NO
MERGED_TO_MAIN=NO
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
used. Backend PR #5 and exact-head post-merge CI passed; Workspace merge and
branch cleanup remain to be recorded by the closeout update.
