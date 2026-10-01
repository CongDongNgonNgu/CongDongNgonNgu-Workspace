# Phase 12C Integrated Remote Acceptance Evidence

This evidence records the implementation, validation, remote integration and
safety boundary for `LNG-12-003`. It does not represent Phase 12 completion
and does not authorize 12D or later subphases.

```text
PHASE_12C_RESULT=PASS_INTEGRATED_REMOTE
PHASE_12_DECOMPOSITION=12A,12B,12C,12D,12E,12F
PHASE_SCOPE=Authenticated provider-neutral realtime notification delivery with reconnect/backoff, replay-or-poll fallback, deduplication and multi-tab behavior
TASKS_INCLUDED=LNG-12-003
TASKS_COMPLETED=LNG-12-003
DEPENDENCIES=12A/LNG-12-001, 12B/LNG-12-002

BACKEND_BEFORE_SHA=7890ada40400d7be1db47698b30a7cb6db7f83b3
BACKEND_BRANCH=phase/12c-realtime-delivery
BACKEND_FEATURE_HEAD_SHA=a8e47551e102ba09c2ad5ad1837cbfb9977d33e9
BACKEND_AFTER_SHA=4dece5023325499cbd7dcfa42994a3ed358c6ff5
FRONTEND_BEFORE_SHA=e3ff9dd9bc8731e37f5601c4ceeadda9da9e32c8
FRONTEND_BRANCH=phase/12c-realtime-delivery
FRONTEND_FEATURE_HEAD_SHA=9231e9536453fda82ce85aa196d257b32314d419
FRONTEND_AFTER_SHA=1902b63542a3dd896822070a62e0f8ad42cd9859
WORKSPACE_BEFORE_SHA=8e7f6096775f4bf5b79285f104aa465f4f946bf8
WORKSPACE_BRANCH=phase/12c-realtime-delivery
WORKSPACE_FEATURE_HEAD_SHA=7dee28f510a153c4f3a7c6ed9904e9c2779a57ec
WORKSPACE_AFTER_SHA=21380e0bf664d59dddee097abce218c663bef415

BACKEND_PR_NUMBER=16
BACKEND_PR_MERGED=YES
BACKEND_MERGE_SHA=4dece5023325499cbd7dcfa42994a3ed358c6ff5
BACKEND_EXACT_HEAD_CI=PASS
BACKEND_POST_MERGE_CI=PASS
BACKEND_POST_MERGE_CI_RUN=56
FRONTEND_PR_NUMBER=12
FRONTEND_PR_MERGED=YES
FRONTEND_MERGE_SHA=1902b63542a3dd896822070a62e0f8ad42cd9859
FRONTEND_EXACT_HEAD_CI=PASS
FRONTEND_POST_MERGE_CI=PASS
FRONTEND_POST_MERGE_CI_RUN=59
WORKSPACE_PR_NUMBER=36
WORKSPACE_PR_NUMBERS=36,37,38
WORKSPACE_MERGED_TO_MAIN=YES
WORKSPACE_POST_MERGE_CI=NOT_REQUIRED
WORKSPACE_FINAL_CLOSEOUT_MAIN_SHA=19458de5e47a6d317088d012c40cd98ac4a04972

IMPLEMENTATION=PASS
REVIEW=PASS
RUNTIME=PASS
ACCEPTANCE=PASS
DOMAIN_EVENT_DELIVERY_SEPARATION=PASS
EVENT_IDEMPOTENCY=PASS
EVENT_VERSION_INTEGRITY=PASS
RECIPIENT_AUTHORITY=PASS
OWNERSHIP_AUTHORIZATION=PASS
NOTIFICATION_DEDUPLICATION=PASS
NOTIFICATION_ORDERING=PASS
NOTIFICATION_PRIVACY=PASS
EVENT_DATA_MINIMIZATION=PASS
ERROR_SANITIZATION=PASS
SECRET_HANDLING=PASS
REALTIME_AUTHORIZATION=PASS
REALTIME_RECONNECT=PASS
REALTIME_REPLAY=PASS
REALTIME_RESOURCE_CLEANUP=PASS
REALTIME_CROSS_USER_ISOLATION=PASS
READ_STATE_INTEGRITY=PASS
READ_STATE_OWNERSHIP=PASS
RESPONSIVE=NOT_APPLICABLE
ACCESSIBILITY=NOT_APPLICABLE
KEYBOARD=NOT_APPLICABLE
BROWSER_SMOKE=NOT_APPLICABLE

FOCUSED_TESTS=PASS: Backend realtime 1 suite / 6 tests; Frontend stream client/hook 2 files / 6 tests
BACKEND_TESTS=PASS: 107 unit suites / 692 tests
BACKEND_E2E=PASS: 16 suites / 67 tests
FRONTEND_TESTS=PASS: 59 test files / 260 tests
TYPECHECK=PASS: Backend and Frontend
LINT=PASS: Backend and Frontend
BUILD=PASS: Backend and Frontend
AUDIT=PASS: online npm audit found 0 vulnerabilities in both applications
CI=PASS: Backend PR #16 and main CI #56; Frontend PR #12 and main CI #59

DATABASE_SCHEMA_CHANGE=NO
MIGRATION_CREATED=NO
MIGRATION_NAME=NONE
MIGRATION_0012=UNCHANGED
MIGRATION_0013=UNCHANGED
MIGRATION_0014=UNCHANGED
MIGRATION_0015=UNCHANGED
MIGRATION_0016=UNCHANGED
TEST_DB_MUTATED=NO
PRODUCTION_DB_MUTATED=NO
LIVE_NOTIFICATION_PROVIDER_CALLS=0
DEPLOYED=NO

BACKEND_CHANGED=YES
FRONTEND_CHANGED=YES
BRANCH_CLEANUP=PASS
WORKTREE_CLEAN=YES
BLOCKERS=NONE
CURRENT_PHASE=12
CURRENT_SUBPHASE=12C
SUBPHASE_STATUS=DONE
NEXT_RECOMMENDED_SUBPHASE=12D - Notification Preferences
NEXT_ACTION=REQUEST_NEXT_PROMPT
```

## Implemented boundary

Backend exposes an authenticated `GET /notifications/stream` SSE adapter. It
uses the canonical owner-scoped notification repository for bounded replay,
accepts only a validated UUID `Last-Event-ID`, emits a safe notification DTO,
and returns an explicit poll fallback when the cursor is unavailable, the
replay window is exceeded, or a live queue overflows. Replay and live delivery
are deduplicated by notification ID; concurrent tabs receive independent
fanout without consuming one another's replay. Connection limits, keepalive
cleanup, bounded queues and unsubscribe cleanup prevent unbounded resource
growth.

The Frontend adds a provider-neutral stream client and hook. It sends the
access token in the authorization header rather than a query string, validates
the safe notification projection, reconnects with bounded 1s-to-10s backoff,
falls back to the existing notification list poll path, and uses a user-scoped
BroadcastChannel with bounded deduplication for multi-tab behavior. No visible
notification UI was added; that remains owned by 12E.

Domain producers remain channel-neutral and provider-independent. No email,
SMS, push, external provider, payment, or production notification call was
introduced. No migration was created and accepted migrations 0012 through
0016 were unchanged.

## Verification and safety

Focused disconnect/reconnect, missed-event, duplicate, authorization,
fallback, replay, multi-tab and cleanup tests passed. Full Backend unit/E2E,
Frontend tests, typecheck, lint, build and online audit gates passed. CI ran on
the exact accepted heads before merge and on both merged remote `main` heads
after merge. The Frontend build retained only the pre-existing non-blocking
large-chunk warning.

Runtime verification used local/in-memory/test-safe adapters only:

```text
liveNotificationProviderCalls=0
testDbMutated=false
productionDbMutated=false
deployed=false
```

Temporary application and Workspace branches were merged through protected
PRs. Workspace PR #36 merged at `21380e0`; the temporary Workspace branch was
verified as contained in `main`, deleted locally/remotely and pruned.
