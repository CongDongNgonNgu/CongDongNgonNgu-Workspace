# Phase 08 — LNG-08-007 Strict Timestamp Validation Remediation

This record covers only the strict timestamp parsing blocker from the failed
external-review retry. The previous Backend fix preserved milliseconds but
accepted timezone-less strings through JavaScript `Date` parsing. This
remediation adds offset-aware validation only within the existing Phase 06
candidate/acceptance mapper path.

No TEST candidate integration was run. No TEST or production database was
mutated. No migration, frontend change, deployment, or merge was performed.

## Remediation

The mapper now accepts JavaScript `Date` values after validating their epoch
value, or strict offset-aware ISO timestamp strings with `Z` or a numeric
offset. It validates calendar dates, clock ranges, and numeric offset ranges
before constructing a `Date`. Locale strings, ambiguous numeric dates,
timezone-less strings, malformed offsets, impossible dates/times, unsupported
types, and invalid `Date` objects fail closed with the existing sanitized
repository conflict error. Nullable `null`/`undefined` values remain `null`.

Explicit offsets normalize to the canonical UTC instant without changing the
represented milliseconds. The existing exact `sameDatabaseDate` comparison is
unchanged; no truncation, rounding, tolerance, or comparison bypass was added.
Unrelated Community/source-health mapper code was not refactored.

```text
PHASE_08_LNG_08_007_STRICT_TIMESTAMP_REMEDIATION=PASS
BACKEND_BEFORE_SHA=e8ca2ae94670a4bfb9c6b0185a23b80b7c573a34
BACKEND_AFTER_SHA=76b02cd25865530fc626f57474fec1acc0e54e53
BACKEND_BRANCH=phase-08-lng-08-007-candidate-integration
WORKSPACE_BEFORE_SHA=8d640b082c978fd18f1ead47324c39056091a131

TIMEZONE_LESS_ACCEPTANCE_DEFECT_CONFIRMED=YES
DATE_OBJECT_MAPPING=PASS
ISO_STRING_MAPPING=PASS
OFFSET_AWARE_STRING_MAPPING=PASS
MILLISECOND_PRECISION_PRESERVED=YES
TIMEZONE_LESS_TIMESTAMP_FAIL_CLOSED=PASS
LOCALE_TIMESTAMP_FAIL_CLOSED=PASS
MALFORMED_OFFSET_FAIL_CLOSED=PASS
INVALID_TIMESTAMP_FAIL_CLOSED=PASS
NULL_TIMESTAMP_HANDLING=PASS
EXPLICIT_OFFSET_NORMALIZATION=PASS
PROCESS_TIMEZONE_INDEPENDENCE=PASS
CANONICAL_TIMESTAMP_VALIDATION_PRESERVED=YES
MATCHING_ACCEPTED_AT=PASS
MISMATCHED_ACCEPTED_AT_FAIL_CLOSED=PASS
TIMEZONE_LESS_ACCEPTED_AT_FAIL_CLOSED=PASS
RELATED_TIMESTAMP_FIX_SCOPE=PASS
RELATED_TIMESTAMP_PRECISION_DEFECTS=NONE within LNG-08-007 candidate/acceptance mapping; unrelated Community/source-health mappers remain outside scope
```

## Preserved contracts and verification

```text
PHASE_06_CANDIDATE_SOURCE_CONTRACT=PASS
REVIEWER_AUTHENTICATION=PASS
REVIEWER_AUTHORIZATION=PASS
ACTOR_DISCOVERY=NONE
CORRECTION_CANDIDATE_CONTRACT=PASS
CORRECTION_AUTO_APPLY=NO
QA_CANDIDATE_CONTRACT=PASS
QA_AUTO_PUBLISH=NO
CANONICAL_RESOURCE_REFERENCE_VALIDATION=PASS
CANONICAL_RESOURCE_MUTATION=NO
NORMALIZATION_CONTRACT=PASS
CANDIDATE_IDENTITY_DETERMINISTIC=YES
CANDIDATE_RECONCILIATION=PASS
PROVENANCE=PASS
PROVENANCE_RETRY_DEDUP=PASS
AUDIT_CONTRACT=PASS
AUDIT_RETRY_DEDUP=PASS
DRAFT_TO_COMMUNITY_REVIEW=PASS
CANDIDATE_STATE_CONTRACT=PASS
AUTO_APPROVE=NO
TRANSACTIONAL_INTEGRITY=PASS
FAILURE_ROLLBACK=PASS
FAILED_TIMESTAMP_VALIDATION_WRITES=0
DATABASE_TARGET_AUTHORIZATION_PRESERVED=YES
REMOTE_DATABASE_SSL_FAIL_CLOSED=PASS
SECRET_HANDLING=PASS
TEST_DB_MUTATED=NO
PRODUCTION_DB_MUTATED=NO
MIGRATION_REQUIRED=NO
MIGRATION_CREATED=NO
MIGRATIONS_0001_0011=UNCHANGED
LIVE_EXTERNAL_CALLS_DURING_TESTS=0
```

```text
STRICT_TIMESTAMP_TESTS=PASS (1 suite / 20 tests)
TIMESTAMP_REGRESSION_TESTS=PASS (1 suite / 20 tests)
FOCUSED_TESTS=PASS (10 suites / 97 tests)
BACKEND_TESTS=PASS (65 suites / 466 tests)
BACKEND_E2E=PASS (13 suites / 59 tests)
TYPECHECK=PASS
LINT=PASS
BUILD=PASS
AUDIT=PASS_WITH_2_MODERATE_PRE_EXISTING_MULTER_ADVISORIES
GIT_DIFF_CHECK=PASS
FRONTEND_CHANGED=NO
DEPLOYED=NO
MERGED_TO_MAIN=NO
```

The strict tests include the `.627Z` `Date` and string cases, explicit
`+07:00` normalization, timezone-less milliseconds/seconds, locale and
ambiguous forms, invalid month/day/time, malformed/out-of-range offsets,
invalid `Date`/unsupported types, nullable `null`, and deterministic parsing
under `UTC` and `America/New_York`. The two moderate transitive `multer`
advisories remain unrelated and non-blocking.

```text
CURRENT_PHASE=08
PHASE_08=IN_PROGRESS
LNG_08_007=VERIFYING
NEXT_ACTION=EXTERNAL_REVIEW_RETRY
```

LNG-08-007 remains unaccepted pending external review retry and a separately
authorized TEST runtime verification.
