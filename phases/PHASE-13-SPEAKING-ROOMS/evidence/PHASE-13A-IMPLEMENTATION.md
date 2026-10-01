# Phase 13A — Room Domain & Media Provider Foundation

```text
PHASE_13A_RESULT=PASS
PHASE_13_OBJECTIVE=Enable moderated public/private live language practice rooms where users can listen, speak, raise hand and participate safely; voice is ephemeral by default and recording/storage requires separate explicit consent and policy.
PHASE_13_DECOMPOSITION=13A Room Domain & Media Provider Foundation [LNG-13-001,LNG-13-002] -> 13B Join/Leave & Participant Presence [LNG-13-003] -> 13C Speaker Queue & Moderation/Chat [LNG-13-004,LNG-13-005] -> 13D Speaking Room UI [LNG-13-006] -> 13E Consent-Aware Post-Room AI Contract [LNG-13-007] -> 13F Reliability/Safety Reconciliation & Final Gate [LNG-13-008]
PHASE_SCOPE=Server-authoritative speaking-room domain, public/private access boundary, lifecycle/capacity constraints, provider-neutral media session contract, disabled production adapter, bounded API DTOs and migration 0018.
TASKS_INCLUDED=LNG-13-001,LNG-13-002
TASKS_COMPLETED=LNG-13-001,LNG-13-002

BACKEND_BEFORE_SHA=5fdf3230bb28999ecdc362c4e8fff177abc94e6d
BACKEND_FEATURE_HEAD_SHA=b5748cff769a433a4f6f1ada27123821a565c614
BACKEND_AFTER_SHA=60dff2de20b59893daaff7e185bc35083a60e5fb
FRONTEND_BEFORE_SHA=95337855b6a5d49d339ad581e955a074593f907a
FRONTEND_FEATURE_HEAD_SHA=N/A
FRONTEND_AFTER_SHA=95337855b6a5d49d339ad581e955a074593f907a
WORKSPACE_BEFORE_SHA=8c66fae6947eff6a8e3745a30f05bf2d05100bd9
WORKSPACE_FEATURE_HEAD_SHA=97378445e15f8ecd95d059770fa8bc1f3101fa89
WORKSPACE_AFTER_SHA=bf5ad260870c34ce2c7515d59a52438c1c36eefb

IMPLEMENTATION=PASS
REVIEW=PASS
RUNTIME=NOT_REQUIRED
ACCEPTANCE=PASS
AUTHORIZATION=PASS
OWNERSHIP=PASS
IDEMPOTENCY=PASS
CONCURRENCY=NOT_APPLICABLE
PRIVACY_BOUNDARY=PASS
ERROR_SANITIZATION=PASS
SECRET_HANDLING=PASS

TESTS=Focused room service and migration contract tests PASS; full Backend unit suite PASS (114 suites, 713 tests).
BACKEND_TESTS=PASS — room service: 4 tests; room migration contract: 2 tests; full suite: 114 suites / 713 tests.
BACKEND_E2E=N/A — no external media provider or production-like room runtime was enabled in 13A.
FRONTEND_TESTS=N/A — Frontend unchanged.
BROWSER_SMOKE=N/A — visible room UI is 13D scope.
TYPECHECK=PASS — npm.cmd run typecheck
LINT=PASS — tsc-backed lint gate
BUILD=PASS — npm.cmd run build
AUDIT=PASS — npm.cmd audit --omit=dev --audit-level=high; 0 vulnerabilities
CI=PASS — PR #19 exact-head quality run 36854739496; post-merge main run 36854931073

DATABASE_SCHEMA_CHANGE=YES
MIGRATION_CREATED=YES
MIGRATION_NAME=0018_phase13_speaking_rooms.sql
MIGRATION_0012=UNCHANGED
MIGRATION_0013=UNCHANGED
MIGRATION_0014=UNCHANGED
MIGRATION_0015=UNCHANGED
MIGRATION_0016=UNCHANGED
MIGRATION_0017=UNCHANGED
TEST_DB_MUTATED=NO
PRODUCTION_DB_MUTATED=NO
EXTERNAL_PROVIDER_CALLS=0
DEPLOYED=NO

BACKEND_CHANGED=YES
FRONTEND_CHANGED=NO
BACKEND_PR_NUMBER=19
BACKEND_PR_MERGED=YES
BACKEND_POST_MERGE_CI=PASS_RUN_36854931073
FRONTEND_PR_NUMBER=NONE
FRONTEND_PR_MERGED=NOT_APPLICABLE
FRONTEND_POST_MERGE_CI=N/A
WORKSPACE_PR_NUMBERS=50
WORKSPACE_MERGED_TO_MAIN=YES

MERGED_TO_MAIN=YES
BRANCH_CLEANUP=PASS — Backend `phase-13a-room-foundation` and Workspace `phase-13a-evidence` deleted locally/remotely after merge
WORKTREE_CLEAN=YES — Backend main `60dff2de20b59893daaff7e185bc35083a60e5fb`; Workspace main `bf5ad260870c34ce2c7515d59a52438c1c36eefb`
BLOCKERS=NONE
CURRENT_PHASE=13
CURRENT_SUBPHASE=13A
SUBPHASE_STATUS=DONE
NEXT_RECOMMENDED_SUBPHASE=13B
NEXT_ACTION=AUTO_EXECUTE_NEXT_SAME_PHASE_PROMPT
GLOBAL_ORCHESTRATION_AUTHORIZATION=ACTIVE
AUTO_SUBPHASE_CHAINING=AUTHORIZED
NEXT_PROMPT_AUTO_EXECUTION=AUTHORIZED
```

## Accepted implementation facts

- `POST /api/v1/rooms` derives the host from the authenticated session.
- Private-room access uses a one-time raw opaque token returned only at create;
  only its SHA-256 hash is persisted. Private rooms are not in public listing.
- `GET /api/v1/rooms/:roomId` accepts the private token through the bounded
  `X-Room-Access-Token` header and returns the same not-found projection for
  unauthorized access.
- `POST /api/v1/rooms/:roomId/media-session` ignores client-supplied role and
  derives `HOST`, `MODERATOR`, or `LISTENER` server-side. The request UUID is
  combined with room and actor identity for provider idempotency.
- Production wiring uses `DisabledMediaProvider`; the in-memory adapter is
  test-only. No live audio claim is made by this subphase.
- Migration 0018 is additive and down-scoped. Accepted migrations 0012–0017
  are unchanged. No migration was executed against production.
