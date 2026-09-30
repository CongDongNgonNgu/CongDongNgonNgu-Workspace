# Phase 09 Handoff

**Phase status:** IN_PROGRESS

Record provider/model configuration names without secrets, prompt/schema versions, quota/cost policy, retrieval policy, Stitch references, frontend/backend/workspace SHAs, safety/cost/test results and CI.

Distinguish implementation verified with mocks from live provider verification. On Acceptance: Phase 09 DONE.

Phase 08 is DONE and Phase 09 has now started under the orchestrator.
The ordered decomposition is recorded in `PHASE-09-DECOMPOSITION.md`:
`09A` provider/usage foundation, `09B` learner context/prompt contracts,
`09C` conversation/roleplay, `09D` writing/grammar coaching, `09E`
provenance-aware learn-from-content, and `09F` safety/cost/reconciliation.

Current subphase: `PHASE_09B=DONE`.
Current task: `LNG-09-002=DONE`.
The accepted slices remain provider-neutral backend contracts. No provider has
been selected, no credentials are recorded, no live-provider verification is
claimed, and no database migration is authorized by the current scope.

## PHASE_09A sanitized evidence

```text
PHASE_09A_RESULT=PASS
PHASE_09_DECOMPOSITION=09A Provider & Usage Foundation [LNG-09-001]; 09B Learner Context & Prompt Contracts [LNG-09-002]; 09C Conversation & Configurable Roleplay [LNG-09-003,LNG-09-006]; 09D Structured Writing & Grammar Coaching [LNG-09-004,LNG-09-005]; 09E Provenance-Aware Learn from Community/Library [LNG-09-007]; 09F Safety, Cost & Reconciliation [LNG-09-008]
PHASE_SCOPE=Provider-neutral backend contracts and fail-closed runtime foundation for adapters, model capabilities, bounded timeout/retry, token/cost accounting, quota/rate-limit ports, privacy-safe usage records, and deterministic in-memory local/test implementations.
TASKS_INCLUDED=LNG-09-001
TASKS_COMPLETED=LNG-09-001
BACKEND_BEFORE_SHA=8c6558a426b043b27f1d5a966abb402f0b64b406
BACKEND_AFTER_SHA=06eeab6802d15c22a733923e5cb02ba4fa36f79f
FRONTEND_BEFORE_SHA=N/A
FRONTEND_AFTER_SHA=N/A
WORKSPACE_BEFORE_SHA=2ba5cebc493b383ea6faae85366fc57c313775fe
WORKSPACE_AFTER_SHA=37e69a3909337189ee0e789665659d117965ea95
IMPLEMENTATION=PASS
REVIEW=PASS
RUNTIME=NOT_REQUIRED
ACCEPTANCE=PASS
TESTS=68 unit suites / 488 tests; 13 E2E suites / 59 tests
TYPECHECK=PASS
LINT=PASS
BUILD=PASS
AUDIT=PASS: 0 vulnerabilities
CI=NOT_TRIGGERED_FEATURE_BRANCH_LOCAL_VALIDATION_PASS
DATABASE_SCHEMA_CHANGE=NO
MIGRATION_CREATED=NO
TEST_DB_MUTATED=NO
PRODUCTION_DB_MUTATED=NO
DEPLOYED=NO
MERGED_TO_MAIN=NO
BLOCKERS=NONE
CURRENT_PHASE=09
CURRENT_SUBPHASE=09A
SUBPHASE_STATUS=DONE
NEXT_RECOMMENDED_SUBPHASE=09B
NEXT_ACTION=REQUEST_NEXT_PROMPT
```

The 09A implementation and Workspace evidence are committed and pushed on
feature branches. The Backend workflow only runs for pull requests targeting
`main` or pushes to `main`, so this feature-branch push did not create a CI
run. Local unit, E2E, typecheck, lint, build, and audit validation passed.
Phase 09 remains `IN_PROGRESS`; this acceptance applies only to 09A.

## PHASE_09B sanitized evidence

```text
PHASE_09B_RESULT=PASS
PHASE_09_DECOMPOSITION=09A Provider & Usage Foundation [LNG-09-001]; 09B Learner Context & Prompt Contracts [LNG-09-002]; 09C Conversation & Configurable Roleplay [LNG-09-003,LNG-09-006]; 09D Structured Writing & Grammar Coaching [LNG-09-004,LNG-09-005]; 09E Provenance-Aware Learn from Community/Library [LNG-09-007]; 09F Safety, Cost & Reconciliation [LNG-09-008]
PHASE_SCOPE=Versioned learner-context and mode prompt contracts; safe separation of profile/user data from system instructions; bounded deterministic normalization; and strict validated structured-output schemas for writing corrections, grammar coaching and quiz material.
TASKS_INCLUDED=LNG-09-002
TASKS_COMPLETED=LNG-09-002
BACKEND_BEFORE_SHA=06eeab6802d15c22a733923e5cb02ba4fa36f79f
BACKEND_AFTER_SHA=a2b7bbb2c8b2f39f6f9845c85b09d0b6f1d24c06
FRONTEND_BEFORE_SHA=N/A
FRONTEND_AFTER_SHA=N/A
WORKSPACE_BEFORE_SHA=37e69a3909337189ee0e789665659d117965ea95
WORKSPACE_AFTER_SHA=TO_BE_PINNED
IMPLEMENTATION=PASS
REVIEW=PASS
RUNTIME=NOT_REQUIRED
ACCEPTANCE=PASS
LEARNER_CONTEXT_CONTRACT=PASS
DATA_MINIMIZATION=PASS
PROMPT_CONTRACT=PASS
PROMPT_ROLE_SEPARATION=PASS
UNTRUSTED_CONTENT_BOUNDARY=PASS
CONTEXT_BOUNDS=PASS
PROVIDER_NEUTRALITY=PASS
PHASE_09A_COMPATIBILITY=PASS
TESTS=13 focused 09B tests; 69 unit suites / 501 tests; 13 E2E suites / 59 tests
TYPECHECK=PASS
LINT=PASS
BUILD=PASS
AUDIT=PASS: 0 vulnerabilities
CI=NOT_TRIGGERED_FEATURE_BRANCH_LOCAL_VALIDATION_PASS
DATABASE_SCHEMA_CHANGE=NO
MIGRATION_CREATED=NO
TEST_DB_MUTATED=NO
PRODUCTION_DB_MUTATED=NO
LIVE_AI_PROVIDER_CALLS=NO
FRONTEND_CHANGED=NO
DEPLOYED=NO
MERGED_TO_MAIN=NO
BLOCKERS=NONE
CURRENT_PHASE=09
CURRENT_SUBPHASE=09B
SUBPHASE_STATUS=DONE
NEXT_RECOMMENDED_SUBPHASE=09C
NEXT_ACTION=REQUEST_NEXT_PROMPT
```

The 09B contracts and tests are committed on the scoped Backend feature
branch. The Workspace state, decomposition and ADR are committed on the
scoped Workspace feature branch; `WORKSPACE_AFTER_SHA` is pinned to the
substantive acceptance commit below before relay.
