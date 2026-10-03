# Phase 18 Email, Challenge and AI remediation evidence - 2026-10-03

## Scope and safety

This record covers only approved TEST/UAT verification and the bounded Phase 18
remediation for Resend, the Challenge catalog/runtime, and authoritative V1 AI
classification. It does not authorize production or Phase 19 work.

PHASE_18_STATUS=BLOCKED_EXTERNAL
PHASE_18_DONE=NO
PHASE_18_LAUNCH_READY=NO
PHASE_19_STARTED=NO
APPROVED_TEST_UAT_DATABASE=YES
PRODUCTION_DEPLOYED=NO
PRODUCTION_RESTARTED=NO
PRODUCTION_DB_MUTATED=NO
PRODUCTION_MIGRATION_EXECUTED=NO
PRODUCTION_PROVIDER_ACTIVATED=NO
PRODUCTION_SECRET_MUTATION=NO
REAL_MONEY_ACTIONS=0

## Sanitized configuration verification

The approved TEST/UAT runtime was non-production (`NODE_ENV=development` for
the provider call; the auth runner used `NODE_ENV=test`). Configuration was
verified without printing raw values:

EMAIL_PROVIDER=resend
EMAIL_API_URL_HOST=api.resend.com
EMAIL_API_URL_PRESENT=YES
EMAIL_FROM_PRESENT=YES
EMAIL_API_KEY_PRESENT=YES
EMAIL_API_KEY=NOT_RECORDED

The API key was never printed, logged, committed, or included in evidence.

## Resend UAT

The normal provider factory now enables `sendUatTestEmail` only when the
configured provider is Resend and the runtime environment is `development` or
`test`. The production path does not set the UAT capability and remains
fail-closed. No public debug route was added.

Exactly one bounded provider call was made to the provider-supported safe test
recipient `delivered@resend.dev` with subject semantics
`[CongDongNgonNgu UAT] Phase 18 email verification` and a body containing only
a non-sensitive correlation ID.

RESEND_API_CONNECTIVITY=PASS
RESEND_SEND=PASS
RESEND_PROVIDER_MESSAGE_ID_PRESENT=YES
RESEND_PROVIDER_MESSAGE_ID=NOT_RECORDED

## J-002 authentication UAT

Registration and verification used a temporary in-process runner against the
approved TEST/UAT database. The verification token was captured in memory from
the test email provider only; there was no public token endpoint and no token
was logged or written to evidence. This journey intentionally made zero
additional external email calls after the separate Resend transport check.

J_002_UAT=PASS
TOKEN_CAPTURE=IN_MEMORY_ONLY
EXTERNAL_EMAIL_CALLS_DURING_J002=0

Verified sequence and sanitized statuses:

`register=201`, `verify=201`, `login=201`, `/auth/me=200`, `refresh=201`,
`logout=201`, post-logout session=`401`, login-again=`201`, `logout-all=201`,
post-logout-all session=`401`.

EMAIL_TIMEOUT_BOUNDARY=PASS
EMAIL_ERROR_SANITIZATION=PASS
EMAIL_SECRET_BOUNDARY=PASS
EMAIL_PRODUCTION_FAIL_CLOSED=PASS

## Challenge UAT

The Challenge module is backed by the project PostgreSQL repository and its
migrations; it does not require an external provider.

CHALLENGE_EXTERNAL_PROVIDER_REQUIRED=NO
CHALLENGE_CATALOG=PASS
CHALLENGE_DETAIL=PASS
CHALLENGE_SERVER_TIME=PASS
CHALLENGE_JOIN=PASS
CHALLENGE_PROGRESS=PASS
CHALLENGE_IDEMPOTENCY=PASS
CHALLENGE_PROGRESS_PROJECTION=PASS
CHALLENGE_AUTHORIZATION=PASS

The guarded UAT seed created or updated exactly one deterministic active
fixture, `phase18-challenge-progress`, for the seeded admin persona. The seed
is transaction-bound, TEST/UAT-only, idempotent, and uses server time. The
runtime verified discovery/detail, join, trusted progress, exact retry replay
without duplicate award, projection, and rejection of cross-user activity.

The initial post-seed runtime attempt exposed a repository mapping defect:
PostgreSQL returned the enum array as brace text such as
`{PRACTICE_COMPLETED}`, while the mapper spread that text as characters. The
minimal fix parses PostgreSQL array text into activity values. No schema change
or migration was created.

## Authoritative AI V1 classification

Repository evidence confirms a provider-neutral AI boundary with fail-closed
adapters. No provider-specific live adapter is implemented, and the current
V1 launch configuration intentionally disables AI. Existing fail-closed tests
verify truthful unavailable behavior, no fabricated output, no provider call,
and sanitized errors.

AI_PROVIDER_SPECIFIC_ADAPTER_IMPLEMENTED=NO
AI_PROVIDER_LIVE_CONFIGURATION_REQUIRED_FOR_V1=NO
AI_V1_LAUNCH_CONFIGURATION=DISABLED
AI_PROVIDER_BLOCKER=NONE_FOR_V1; live provider adapter and credential verification are future scope
J_010_STATUS=NOT_APPLICABLE
J_011_STATUS=NOT_APPLICABLE

J-010 and J-011 are therefore not external blockers for the authoritative V1
scope. They remain covered by the launch-safe disabled behavior contract.

## Verification and source-control record

BACKEND_FEATURE_HEAD_SHA=0cea826e4034719b24830b1bb57d467f38c835de
BACKEND_PR_NUMBER=38
BACKEND_PR_HEAD_SHA=0cea826e4034719b24830b1bb57d467f38c835de
BACKEND_PR_CI=PASS
BACKEND_MAIN_SHA_BEFORE_MERGE=4f5a9c2872e16e1c2be4236b3a51d707d067ca36
BACKEND_MERGE_SHA=1c342243d3281fe4d8c4e2425d2d85d8eed7f555
BACKEND_MAIN_SHA=1c342243d3281fe4d8c4e2425d2d85d8eed7f555
BACKEND_POST_MERGE_CI=PASS
BACKEND_CI_RUN=100

FOCUSED_TESTS=22 suites / 118 tests PASS
BACKEND_UNIT=148 suites / 838 tests PASS
BACKEND_E2E=17 suites / 73 tests PASS
TYPECHECK=PASS
LINT=PASS
BUILD=PASS
AUDIT_HIGH=0 vulnerabilities
GIT_DIFF_CHECK=PASS
FRONTEND_CHANGED=NO

## Current journey and blocker reconciliation

J_017_STATUS=PASS
JOURNEY_MATRIX_TOTAL=22
JOURNEY_MATRIX_PASS=18
JOURNEY_MATRIX_FAIL=0
JOURNEY_MATRIX_BLOCKED_EXTERNAL=2
JOURNEY_MATRIX_NOT_APPLICABLE=2
ZERO_EXECUTABLE_JOURNEY_FAILURES=YES

The two remaining blocked journey rows are J-014 (PayOS sandbox/payment
strategy) and J-022 (external monitoring/release-gate disposition). Phase-level
external blockers also remain for the Cloudflare R2 backup/restore drill and
the production hard-stop human authorization. No PayOS, R2, monitoring, live
AI, production email, production database, migration, deployment, or DNS
action was performed.

## Current R2 reconciliation - 2026-10-03

The preceding paragraph is the historical pre-R2 state. The bounded R2
backup/restore drill subsequently passed against approved TEST/UAT and an
isolated disposable PostgreSQL target. See
`PHASE-18-R2-BACKUP-RESTORE-2026-10-03.md`.

```text
R2_STORAGE=VERIFIED
UAT_BACKUP_RESTORE=PASS
BACKUP_TARGET_BLOCKER=RESOLVED
EXTERNAL_MONITORING=UNRESOLVED
PHASE_18_STATUS=BLOCKED_EXTERNAL
PHASE_18_DONE=NO
PHASE_18_LAUNCH_READY=NO
PHASE_19_STARTED=NO
```

Historical J-002 inbox, J-010/J-011 AI, Challenge-catalog, and J-017
`EVENT_REGISTRATION_CONFLICT` / `SQLSTATE_42P18` records remain preserved in
the earlier Phase 18 evidence. They are historical references, not current
active states.
