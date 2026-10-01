# Phase 13B - Join/Leave & Participant Presence

```text
PHASE_13B_RESULT=PASS
PHASE_13_OBJECTIVE=Enable moderated public/private live language practice rooms where users can listen, speak, raise hand and participate safely; voice is ephemeral by default and recording/storage requires separate explicit consent and policy.
PHASE_13_DECOMPOSITION=13A Room Domain & Media Provider Foundation [LNG-13-001,LNG-13-002] -> 13B Join/Leave & Participant Presence [LNG-13-003] -> 13C Speaker Queue & Moderation/Chat [LNG-13-004,LNG-13-005] -> 13D Speaking Room UI [LNG-13-006] -> 13E Consent-Aware Post-Room AI Contract [LNG-13-007] -> 13F Reliability/Safety Reconciliation & Final Gate [LNG-13-008]
PHASE_SCOPE=Server-authoritative join, leave and heartbeat presence; authenticated ownership; private-room access validation; reconnect leases; stale-presence reconciliation; deterministic capacity; duplicate-device policy; real participant counts; bounded participant projections; additive migration 0019.
TASKS_INCLUDED=LNG-13-003
TASKS_COMPLETED=LNG-13-003

BACKEND_BEFORE_SHA=60dff2de20b59893daaff7e185bc35083a60e5fb
BACKEND_FEATURE_HEAD_SHA=1fc8d8564b19b44ccdcef94e0618b8875f7a1716
BACKEND_AFTER_SHA=6d5c2f6b115bc65036b900f1a572f2e30a84301e
FRONTEND_BEFORE_SHA=95337855b6a5d49d339ad581e955a074593f907a
FRONTEND_FEATURE_HEAD_SHA=N/A
FRONTEND_AFTER_SHA=95337855b6a5d49d339ad581e955a074593f907a
WORKSPACE_BEFORE_SHA=cc73c2f684f4fdf625593aa5ee4b172904743ce4
WORKSPACE_FEATURE_HEAD_SHA=cd084f13998216f945ef18f33c4a660f1d612d34
WORKSPACE_AFTER_SHA=4d2e2b2b3ac244491b20c3f9fed7b429eb96dd60

IMPLEMENTATION=PASS
REVIEW=PASS
RUNTIME=PASS_SAFE_LOCAL_TEST_ADAPTER
ACCEPTANCE=PASS
AUTHORIZATION=PASS
OWNERSHIP=PASS
IDEMPOTENCY=PASS
CONCURRENCY=PASS
PRIVACY_BOUNDARY=PASS
ERROR_SANITIZATION=PASS
SECRET_HANDLING=PASS

TESTS=Focused participant repository, service, migration and room API tests PASS; full Backend unit and E2E regression PASS.
BACKEND_TESTS=PASS - focused room coverage 14 tests; full unit suite 115 suites / 721 tests.
BACKEND_E2E=PASS - 17 suites / 72 tests.
FRONTEND_TESTS=N/A - Frontend unchanged.
BROWSER_SMOKE=N/A - no visible UI in 13B; UI is 13D scope.
TYPECHECK=PASS - npm.cmd run typecheck
LINT=PASS - npm.cmd run lint
BUILD=PASS - npm.cmd run build
AUDIT=PASS - npm.cmd audit --omit=dev --audit-level=high; 0 vulnerabilities
CI=PASS - exact-head PR #20 run 36857615046; post-merge main run 36857869530

DATABASE_SCHEMA_CHANGE=YES
MIGRATION_CREATED=YES
MIGRATION_NAME=0019_phase13_room_participants.sql
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
RECORDING_OR_TRANSCRIPT_STORAGE=NO

BACKEND_CHANGED=YES
FRONTEND_CHANGED=NO
BACKEND_PR_NUMBER=20
BACKEND_PR_MERGED=YES
BACKEND_POST_MERGE_CI=PASS_RUN_36857869530
FRONTEND_PR_NUMBER=NONE
FRONTEND_PR_MERGED=NOT_APPLICABLE
FRONTEND_POST_MERGE_CI=N/A
WORKSPACE_PR_NUMBERS=52
WORKSPACE_MERGED_TO_MAIN=YES

MERGED_TO_MAIN=YES
BRANCH_CLEANUP=PASS - Workspace phase-13b-evidence deleted locally/remotely after merge
WORKTREE_CLEAN=YES - Backend main 6d5c2f6b115bc65036b900f1a572f2e30a84301e; Frontend main 95337855b6a5d49d339ad581e955a074593f907a; Workspace evidence branch clean.
BLOCKERS=NONE
CURRENT_PHASE=13
CURRENT_SUBPHASE=13B
SUBPHASE_STATUS=DONE
NEXT_RECOMMENDED_SUBPHASE=13C
NEXT_ACTION=AUTO_EXECUTE_NEXT_SAME_PHASE_PROMPT
GLOBAL_ORCHESTRATION_AUTHORIZATION=ACTIVE
AUTO_SUBPHASE_CHAINING=AUTHORIZED
NEXT_PROMPT_AUTO_EXECUTION=AUTHORIZED
```

## Accepted implementation facts

- `POST /api/v1/rooms/:roomId/join`, `POST /leave`, heartbeat and participant
  listing derive the actor from the authenticated access token.
- Private-room join requires the server-validated `X-Room-Access-Token`.
  Client-supplied `userId` or role fields are rejected; host/moderator role is
  derived from persisted room authority and all other participants are
  listeners.
- Join, heartbeat, leave and disconnect have request/action identities backed
  by repository uniqueness and transaction/serialization boundaries. Exact
  replay is stable, concurrent replay does not duplicate presence, and reuse
  across action types is rejected.
- Participant state is `PRESENT`, `DISCONNECTED`, `LEFT` or `REMOVED`.
  Disconnect uses a 30-second threshold and a 90-second reconnect lease;
  stale reconciliation respects the lease before marking a participant left.
- PostgreSQL join locks the room row while checking lifecycle and capacity.
  One active presence per user/device is enforced by an additive partial unique
  index; distinct devices remain explicit and bounded.
- Other participants receive only display name, role, state and joined time.
  Participant ID, last-seen time and reconnect lease are self-only; user IDs,
  emails, device IDs, access tokens, provider payloads and database errors are
  not projected.
- Media issuance now requires an active persisted participant and continues to
  use the disabled production media adapter. No live provider, recording or
  transcript storage is enabled by this subphase.

Migration `0019_phase13_room_participants.sql` is additive, down-scoped and was
not executed against any production database. Accepted migrations `0012`-`0017`
are unchanged.
