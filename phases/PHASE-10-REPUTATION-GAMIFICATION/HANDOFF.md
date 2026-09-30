# Phase 10 Handoff

**Phase status:** READY

Record ledger schema, rule versions/table, reversal policy, abuse controls, timezone/streak decision, Stitch references, SHAs, tests and CI.

On Acceptance: Phase 10 DONE; Phase 11 becomes READY. Phase 15 also still waits on Phase 11.

Phases 05, 06 and 08 satisfy the dependency for the first Phase 10 task.
Phase 10 is READY but was not selected or started during the Phase 08
closeout; the primary next phase remains Phase 09.

## Phase 10A execution

The active decomposition is recorded in `PHASE-10-DECOMPOSITION.md`:
`10A` auditable ledger and contribution rules, `10B` learning XP and
timezone-aware streaks, `10C` badges/levels and anti-farming, `10D` Passport
UI, and `10E` reconciliation/final gate. `10A` is the current subphase for
`LNG-10-001` and `LNG-10-002`; its migration is authorized by the Phase 10
ledger scope, but no TEST or production database is mutated during validation.

## PHASE_10A local acceptance evidence

```text
PHASE_10A_RESULT=VERIFYING
PHASE_10_DECOMPOSITION=10A Ledger + Contribution Rules [LNG-10-001,LNG-10-002]; 10B Learning XP + Streaks [LNG-10-003,LNG-10-004]; 10C Badges + Levels + Anti-Farming [LNG-10-005,LNG-10-006]; 10D Passport/Profile UI [LNG-10-007]; 10E Reconciliation + Final Gate [LNG-10-008]
PHASE_SCOPE=Append-oriented dual-system ledger, derived balances, idempotent event replay, versioned community contribution rules, independent-actor/source eligibility, and append-only compensating reversals.
TASKS_INCLUDED=LNG-10-001,LNG-10-002
TASKS_COMPLETED=LNG-10-001,LNG-10-002 (local implementation, review, and full validation)
BACKEND_BEFORE_SHA=42463097e3884fa9529741c196c33351a958820d
BACKEND_AFTER_SHA=554574f4e1d5032e09d94a53ccc0bb4d1b10dcf0
FRONTEND_BEFORE_SHA=5a258796ae96e6efb77d44dd72e168edcaa6213b
FRONTEND_AFTER_SHA=5a258796ae96e6efb77d44dd72e168edcaa6213b
WORKSPACE_BEFORE_SHA=6e134f137297774c88863083cede853ec53c1fb4
WORKSPACE_AFTER_SHA=PENDING
IMPLEMENTATION=PASS
REVIEW=PASS
RUNTIME=NOT_REQUIRED
ACCEPTANCE=PASS (local acceptance; source-control integration pending)
TESTS=23 focused reputation unit/repository/migration tests PASS; Backend full unit 81 suites/558 tests PASS; Backend E2E 13 suites/59 tests PASS
TYPECHECK=PASS
LINT=PASS
BUILD=PASS
AUDIT=PASS: 0 vulnerabilities (online npm audit)
CI=PENDING
DATABASE_SCHEMA_CHANGE=YES
MIGRATION_CREATED=YES (0012_phase10_reputation_ledger.sql + down migration)
TEST_DB_MUTATED=NO
PRODUCTION_DB_MUTATED=NO
FRONTEND_CHANGED=NO
DEPLOYED=NO
MERGED_TO_MAIN=NO
BLOCKERS=NONE
CURRENT_PHASE=10
CURRENT_SUBPHASE=10A
SUBPHASE_STATUS=VERIFYING
NEXT_RECOMMENDED_SUBPHASE=10B
NEXT_ACTION=PUBLISH_10A_BRANCHES
```

The Backend increment adds a provider-free `ReputationModule`, a versioned
contribution rule engine, an in-memory/Postgres ledger repository, and the
authorized Phase 10A migration. It keeps Learning XP and Community
Reputation independent, rejects self/private/unverified/raw-volume rewards,
converges idempotent retries, derives balances from entries, and preserves
awards through linked compensating reversals. Verified translation/resource
rewards require `MODERATOR` or `ADMIN` actors, matching the existing review
boundary. No migration command or database write was run.
