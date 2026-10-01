# Phase 12B Local Acceptance Evidence

This evidence records the local implementation and acceptance boundary for
`LNG-12-002`. It does not represent remote publication, pull-request merge,
deployment, or Phase 12 completion.

```text
PHASE_12B_RESULT=PASS_LOCAL_AWAITING_PUBLISH
PHASE_12_DECOMPOSITION=12A,12B,12C,12D,12E,12F
PHASE_SCOPE=Backend notification persistence/API/read state plus Workspace evidence
TASKS_INCLUDED=LNG-12-002
TASKS_COMPLETED=LNG-12-002

BACKEND_BEFORE_SHA=26aa94c8089060b0ab6db6979a8996f4bd5af49e
BACKEND_BRANCH=phase-12b-notification-api-read-state
BACKEND_LOCAL_ACCEPTED_SHA=dda6edeae5d50de6a52cafbd4067f8abaae14a80
FRONTEND_BEFORE_SHA=e3ff9dd9bc8731e37f5601c4ceeadda9da9e32c8
FRONTEND_BRANCH=N/A
FRONTEND_LOCAL_ACCEPTED_SHA=N/A
WORKSPACE_BEFORE_SHA=6de18528fb8f4a38452536c3f473d166e0fa4feb
WORKSPACE_BRANCH=phase-12b-notification-api-read-state
WORKSPACE_LOCAL_ACCEPTED_SHA=RECORDED_AFTER_EVIDENCE_COMMIT
WORKSPACE_FEATURE_HEAD_SHA=RECORDED_AFTER_PIN_COMMIT

BACKEND_PR_NUMBER=NOT_CREATED
BACKEND_MERGED_TO_MAIN=NO
BACKEND_MERGE_SHA=NOT_INTEGRATED
BACKEND_POST_MERGE_CI=NOT_RUN
BACKEND_POST_MERGE_CI_RUN=NOT_RUN
WORKSPACE_PR_NUMBER=NOT_CREATED
WORKSPACE_MERGED_TO_MAIN=NO
WORKSPACE_MERGE_SHA=NOT_INTEGRATED
WORKSPACE_POST_MERGE_CI=NOT_RUN
FRONTEND_REMOTE_MAIN_SHA=e3ff9dd9bc8731e37f5601c4ceeadda9da9e32c8

IMPLEMENTATION=PASS
REVIEW=PASS
RUNTIME=PASS
LOCAL_ACCEPTANCE=PASS
DOMAIN_EVENT_DELIVERY_SEPARATION=PASS
EVENT_IDEMPOTENCY=PASS
EVENT_VERSION_INTEGRITY=PASS
RECIPIENT_AUTHORITY=PASS
OWNERSHIP_AUTHORIZATION=PASS
NOTIFICATION_DEDUPLICATION=PASS
NOTIFICATION_ORDERING=NOT_APPLICABLE
NOTIFICATION_PRIVACY=PASS
EVENT_DATA_MINIMIZATION=PASS
ERROR_SANITIZATION=PASS
SECRET_HANDLING=PASS
READ_STATE_IDEMPOTENCY=PASS
UNREAD_COUNT_RECONCILIATION=PASS
OWNER_SCOPED_PAGINATION=PASS
HISTORY_PRESERVATION=PASS

FOCUSED_TESTS=PASS: 4 suites / 19 tests
BACKEND_UNIT_TESTS=PASS: 106 suites / 685 tests
BACKEND_E2E_TESTS=PASS: 16 suites / 66 tests
FRONTEND_TESTS=N/A: Frontend source unchanged
TYPECHECK=PASS
LINT=PASS
BUILD=PASS
AUDIT=PASS: online npm audit --audit-level=high found 0 vulnerabilities

LIVE_NOTIFICATION_PROVIDER_CALLS=0
TEST_DB_MUTATED=NO
PRODUCTION_DB_MUTATED=NO
DATABASE_SCHEMA_CHANGE=YES
MIGRATION_CREATED=YES
MIGRATION_NAME=0016_phase12_notifications_read_state
MIGRATION_0012=UNCHANGED
MIGRATION_0012_SHA256=63592e5eec27ecaad90b15cc7fa97f5b033b805bdd915a17c5ff684454b223af
MIGRATION_0013=UNCHANGED
MIGRATION_0013_SHA256=2eff43ce342a774de181ebcedcfc3fa9f681f2ed79ddd72548d5bd5214baea35
MIGRATION_0014=UNCHANGED
MIGRATION_0014_SHA256=0e50203da777bce20a855303a3becfde013868dcd4280ce3b21b74f07ed44463
MIGRATION_0015=UNCHANGED
MIGRATION_0015_SHA256=6d3fd8687540b9bac299b7c80a2fc73ca7c6a9d7c3f58944bcbb7911a81b9ccc
PRODUCTION_MIGRATION_EXECUTED=NO
ARCHIVE_DELETE_POLICY=NOT_SELECTED_HISTORY_PRESERVED

BACKEND_CHANGED=YES
FRONTEND_CHANGED=NO
WORKSPACE_CHANGED=YES
PUSHED_REMOTE=NO
PR_CREATED=NO
MERGED_TO_MAIN=NO
DEPLOYED=NO
BRANCH_CLEANUP=NOT_APPLICABLE
WORKTREE_CLEAN=YES
BLOCKERS=HUMAN_AUTHORIZATION_REQUIRED=PUBLISH_AND_INTEGRATE_PHASE_12B
CURRENT_PHASE=12
CURRENT_SUBPHASE=12B
SUBPHASE_STATUS=LOCALLY_ACCEPTED_AWAITING_PUBLISH
NEXT_RECOMMENDED_SUBPHASE=12C
NEXT_ACTION=HUMAN_AUTHORIZATION_REQUIRED
```

## Implemented boundary

The Backend persists canonical notifications separately from owner-scoped
read state. The notification repository supports replay-safe deduplication,
owner-scoped pagination, unread counts, and idempotent mark-one/mark-many read
operations. The SQL migration is `0016_phase12_notifications_read_state` with
a separate `notification_read_states` table and composite owner foreign-key
boundary.

The API exposes authenticated owner-scoped reads, unread count, and read-state
mutations. Cookie-authenticated mutations require CSRF validation. DTO bounds,
cursor ownership/status binding, UUID limits, sanitized errors, and a
privacy-safe public projection prevent cross-owner access and sensitive
identity leakage. No public notification-creation endpoint was added; the
publish seam remains internal for the later event-integration subphase.

Archive/delete was not selected, so notification history is preserved.

## Verification

Focused notification tests passed with 4 suites and 19 tests. The full
Backend unit suite passed with 106 suites and 685 tests; E2E passed with 16
suites and 66 tests. Typecheck, lint, build, and online high-severity npm
audit all passed. Postgres repository and migration tests use deterministic
fixtures; the E2E harness uses an in-memory repository override. No TEST or
production database was mutated.

## Safety boundary

No live notification provider call, production deployment, production
migration, production database mutation, secret activation, or real-money
operation occurred. Phase 12C remains pending until the authorized remote
integration relay completes and a later orchestration prompt starts it.
