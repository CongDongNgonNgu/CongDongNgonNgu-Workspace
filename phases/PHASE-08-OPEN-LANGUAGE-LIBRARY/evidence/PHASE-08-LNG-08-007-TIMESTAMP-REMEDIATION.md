# Phase 08 — LNG-08-007 Timestamp Precision Remediation

This record covers only the timestamp-precision remediation requested after
the controlled TEST runtime failed before any writes. It does not authorize or
record a new runtime verification. No Backend scope expansion, migration,
frontend change, deployment, merge, or database mutation was performed.

## Defect and bounded scope

The runtime defect was reproduced in the `PostgresCorrectionsRepository`
candidate mapping path. PostgreSQL `pg` supplied `accepted_at` as a JavaScript
`Date` containing milliseconds, but `mapCandidate` converted it through
`String(date)` before constructing a new `Date`. That serialization discarded
the sub-second component, so the canonical `2026-09-16T05:49:31.627Z` became
`2026-09-16T05:49:31.000Z` and the existing exact source-coherence check failed
closed.

The remediation is limited to type-aware timestamp mapping for the bounded
Phase 06 candidate/acceptance integration path:

- `Date` values are cloned by epoch milliseconds.
- ISO timestamp strings are parsed without truncation.
- Nullable timestamp fields preserve `null`/`undefined` as `null`.
- Required or invalid/unsupported timestamp values fail closed with the
  existing repository conflict error and do not expose the raw value.
- The existing exact `sameDatabaseDate` millisecond comparison is unchanged;
  no rounding, truncation, or tolerance was introduced.

The same bounded mapping correction covers candidate acceptance/revocation
and source-health acceptance timestamps used by this integration path. The
unrelated Community post/correction/response mappers retaining the old
pattern were not changed because they are outside LNG-08-007's bounded
candidate integration scope.

```text
TIMESTAMP_PRECISION_DEFECT_CONFIRMED=YES
ROOT_CAUSE=PostgresCorrectionsRepository.mapCandidate serialized pg Date values with String(date), truncating non-zero milliseconds before exact canonical timestamp validation
RUNTIME_EXAMPLE_INPUT=2026-09-16T05:49:31.627Z
RUNTIME_EXAMPLE_MAPPED_BEFORE=2026-09-16T05:49:31.000Z
RUNTIME_EXAMPLE_MAPPED_AFTER=2026-09-16T05:49:31.627Z
DATE_OBJECT_MAPPING=PASS
ISO_STRING_MAPPING=PASS
NULL_TIMESTAMP_HANDLING=PASS
INVALID_TIMESTAMP_FAIL_CLOSED=PASS
MILLISECOND_PRECISION_PRESERVED=YES
CANONICAL_TIMESTAMP_VALIDATION_PRESERVED=YES
RELATED_TIMESTAMP_PRECISION_DEFECTS=bounded acceptance accepted_at/revoked_at, structured-interaction accepted_at, source-health acceptance_revoked_at, and candidate created_at/updated_at/invalidated_at mappings; fixed
```

## Regression evidence

The RED run failed specifically on the non-zero-millisecond `Date` mapping and
invalid `Date` rejection assertions. After the fix, the focused regression
suite passed, including direct `PostgresCorrectionsRepository.mapCandidate`
coverage, ISO input, nullable input, invalid input, an exact `.627Z` candidate
source match, and a genuinely different acceptance timestamp that still fails
closed and rolls back.

```text
BACKEND_BEFORE_SHA=d352da974bed2f3d1828762a3f486d43dab840e6
BACKEND_AFTER_SHA=e8ca2ae94670a4bfb9c6b0185a23b80b7c573a34
BACKEND_BRANCH=phase-08-lng-08-007-candidate-integration
WORKSPACE_BEFORE_SHA=362b9f759caeb94e3cbffe1090f8e322a8c58bb3

TIMESTAMP_REGRESSION_TESTS=PASS (2 suites / 10 tests)
FOCUSED_TESTS=PASS (7 suites / 66 tests)
BACKEND_TESTS=PASS (65 suites / 453 tests)
BACKEND_E2E=PASS (13 suites / 59 tests)
TYPECHECK=PASS
LINT=PASS
BUILD=PASS
AUDIT=PASS_WITH_2_MODERATE_PRE_EXISTING_MULTER_ADVISORIES
GIT_DIFF_CHECK=PASS
```

The audit command exited successfully. The two moderate transitive `multer`
advisories through `@nestjs/platform-express` were pre-existing and no
dependency change was made.

## Preserved contracts and isolation

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
ACTOR_CONTRACT_PRESERVED=YES
LICENSE_CONTRACT_PRESERVED=YES
AUTO_REGISTER_LICENSES=NO
DATABASE_TARGET_AUTHORIZATION_PRESERVED=YES
REMOTE_DATABASE_SSL_FAIL_CLOSED=PASS
SECRET_HANDLING=PASS
PRIOR_08D3B2_CONTRACT_PRESERVED=YES
PRIOR_08D3C_CONTRACT_PRESERVED=YES
PRIOR_08D3D_CONTRACT_PRESERVED=YES
LIVE_EXTERNAL_CALLS_DURING_TESTS=0
TEST_DB_MUTATED=NO
PRODUCTION_DB_MUTATED=NO
MIGRATION_REQUIRED=NO
MIGRATION_CREATED=NO
MIGRATIONS_0001_0011=UNCHANGED
FRONTEND_CHANGED=NO
DEPLOYED=NO
MERGED_TO_MAIN=NO
```

All remediation tests used mocks/in-memory execution. The failed runtime's
transactional rollback behavior remains covered; the TEST runtime was not
rerun automatically after this fix, and no stored timestamp was altered.

```text
CURRENT_PHASE=08
PHASE_08=IN_PROGRESS
LNG_08_007=VERIFYING
PHASE_08_LNG_08_007_TIMESTAMP_REMEDIATION=PASS
NEXT_ACTION=EXTERNAL_REVIEW_RETRY
```

LNG-08-007 remains unaccepted pending external review retry and a separately
authorized TEST runtime verification.
