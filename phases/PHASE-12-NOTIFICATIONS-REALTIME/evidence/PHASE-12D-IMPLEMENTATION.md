# Phase 12D Integrated Remote Acceptance Evidence

This evidence records the implementation, validation, remote integration and
safety boundary for `LNG-12-004`. It does not represent Phase 12 completion;
desktop/mobile notification UI remains owned by 12E and event integration and
the final reliability gate remain owned by 12F.

```text
PHASE_12D_RESULT=PASS_INTEGRATED_REMOTE
PHASE_12_DECOMPOSITION=12A,12B,12C,12D,12E,12F
PHASE_SCOPE=Server-side category/channel notification preferences with conservative defaults, optional-noise suppression and mandatory security/account/payment notice protection
TASKS_INCLUDED=LNG-12-004
TASKS_COMPLETED=LNG-12-004
DEPENDENCIES=12A/LNG-12-001

BACKEND_BEFORE_SHA=4dece5023325499cbd7dcfa42994a3ed358c6ff5
BACKEND_BRANCH=phase/12d-notification-preferences
BACKEND_FEATURE_HEAD_SHA=ffc841b43d7088f36ec6bf551e69d491a82644a4
BACKEND_AFTER_SHA=eaf121d095f9dda7785bdf27411ea30233ad2a7a
FRONTEND_BEFORE_SHA=1902b63542a3dd896822070a62e0f8ad42cd9859
FRONTEND_BRANCH=N/A
FRONTEND_FEATURE_HEAD_SHA=N/A
FRONTEND_AFTER_SHA=1902b63542a3dd896822070a62e0f8ad42cd9859
WORKSPACE_BEFORE_SHA=a62045160756abe179bcc75a74836b37e3ffe314
WORKSPACE_BRANCH=phase/12d-notification-preferences
WORKSPACE_FEATURE_HEAD_SHA=PENDING_WORKSPACE_COMMIT
WORKSPACE_AFTER_SHA=PENDING_WORKSPACE_MERGE

BACKEND_PR_NUMBER=17
BACKEND_PR_MERGED=YES
BACKEND_MERGE_SHA=eaf121d095f9dda7785bdf27411ea30233ad2a7a
BACKEND_EXACT_HEAD_CI=PASS_RUN_36832529646
BACKEND_POST_MERGE_CI=PASS_RUN_58
FRONTEND_PR_NUMBER=NONE
FRONTEND_PR_MERGED=NOT_APPLICABLE
FRONTEND_POST_MERGE_CI=N/A_SOURCE_UNCHANGED
WORKSPACE_PR_NUMBER=PENDING_WORKSPACE_PR
WORKSPACE_MERGED_TO_MAIN=PENDING_WORKSPACE_MERGE
WORKSPACE_POST_MERGE_CI=NOT_REQUIRED

IMPLEMENTATION=PASS
REVIEW=PASS
RUNTIME=PASS
ACCEPTANCE=PASS
DOMAIN_EVENT_DELIVERY_SEPARATION=PASS_PRESERVED
EVENT_IDEMPOTENCY=PASS_PRESERVED
EVENT_VERSION_INTEGRITY=PASS_PRESERVED
RECIPIENT_AUTHORITY=PASS
OWNERSHIP_AUTHORIZATION=PASS
NOTIFICATION_DEDUPLICATION=PASS_PRESERVED
NOTIFICATION_ORDERING=NOT_APPLICABLE
NOTIFICATION_PRIVACY=PASS
EVENT_DATA_MINIMIZATION=PASS
ERROR_SANITIZATION=PASS
SECRET_HANDLING=PASS
REALTIME_AUTHORIZATION=PASS_PRESERVED
REALTIME_RECONNECT=PASS_PRESERVED
REALTIME_REPLAY=PASS_PRESERVED
REALTIME_RESOURCE_CLEANUP=PASS_PRESERVED
REALTIME_CROSS_USER_ISOLATION=PASS_PRESERVED
READ_STATE_INTEGRITY=PASS_PRESERVED
READ_STATE_OWNERSHIP=PASS_PRESERVED
RESPONSIVE=NOT_APPLICABLE_BACKEND_ONLY
ACCESSIBILITY=NOT_APPLICABLE_BACKEND_ONLY
KEYBOARD=NOT_APPLICABLE_BACKEND_ONLY
BROWSER_SMOKE=NOT_APPLICABLE_BACKEND_ONLY

FOCUSED_TESTS=PASS: 3 unit suites / 8 tests plus notification E2E preference coverage
BACKEND_TESTS=PASS: 110 unit suites / 700 tests
BACKEND_E2E=PASS: 16 suites / 68 tests
FRONTEND_TESTS=N/A: Frontend source unchanged
TYPECHECK=PASS
LINT=PASS
BUILD=PASS
AUDIT=PASS: online npm audit found 0 vulnerabilities
CI=PASS: exact-head PR CI run 36832529646; merged main CI run 58

DATABASE_SCHEMA_CHANGE=YES
MIGRATION_CREATED=YES
MIGRATION_NAME=0017_phase12_notification_preferences
MIGRATION_0012=UNCHANGED
MIGRATION_0013=UNCHANGED
MIGRATION_0014=UNCHANGED
MIGRATION_0015=UNCHANGED
MIGRATION_0016=UNCHANGED
PRODUCTION_MIGRATION_EXECUTED=NO
TEST_DB_MUTATED=NO
PRODUCTION_DB_MUTATED=NO
LIVE_NOTIFICATION_PROVIDER_CALLS=0
DEPLOYED=NO

BACKEND_CHANGED=YES
FRONTEND_CHANGED=NO
WORKSPACE_CHANGED=YES
BRANCH_CLEANUP=BACKEND_PASS_WORKSPACE_PENDING
WORKTREE_CLEAN=YES
BLOCKERS=NONE
CURRENT_PHASE=12
CURRENT_SUBPHASE=12D
SUBPHASE_STATUS=INTEGRATED_REMOTE_MAIN
NEXT_RECOMMENDED_SUBPHASE=12E - Desktop Notification UI and Mobile Notification Center
NEXT_ACTION=AUTO_EXECUTE_NEXT_SAME_PHASE_PROMPT
```

## Implemented boundary

The Backend exposes authenticated owner-scoped `GET /notifications/preferences`
and CSRF-protected `PATCH /notifications/preferences` endpoints. The response
is a stable category-by-channel matrix for the accepted notification
categories and `IN_APP`, `SSE`, `EMAIL`, and `PUSH` channels. It omits the
owner identifier and does not expose persistence details.

Defaults keep canonical in-app and realtime delivery enabled while email and
push remain disabled until a future channel adapter is explicitly introduced.
Users can suppress optional category/channel noise. Security, membership and
system categories remain locked on the canonical in-app surface; the service
also forces accepted `SECURITY_NOTICE`, `MEMBERSHIP_STATE`, and `PAYMENT_STATE`
types to remain in-app enabled. Preference evaluation is exposed as a
provider-neutral service seam for the later 12F event integration boundary.

The additive `0017_phase12_notification_preferences` migration stores only
owner-scoped overrides with a composite primary key, enum checks, timestamps,
and a scoped rollback. Accepted migrations 0012 through 0016 were unchanged.
No producer wiring, realtime publish behavior, visible UI, email/push adapter,
or external provider call was introduced in 12D.

## Verification and safety

Focused preference policy, owner isolation, mandatory protection, migration,
and Postgres transaction tests passed. The notification E2E suite passed with
authentication, default matrix, update, owner isolation and mandatory-disable
coverage. Full Backend unit/E2E, typecheck, lint, build and online npm audit
gates passed. Exact-head PR CI and merged-main CI both passed.

Runtime verification used local/in-memory deterministic repositories and test
adapters only:

```text
liveNotificationProviderCalls=0
testDbMutated=false
productionMigrationExecuted=false
productionDbMutated=false
deployed=false
```

Backend PR #17 merged at `eaf121d`; temporary Backend branch
`phase/12d-notification-preferences` was verified contained in `main`, deleted
locally and remotely, and stale refs were pruned. Workspace evidence/state
publication is the remaining closeout step for this evidence record.
