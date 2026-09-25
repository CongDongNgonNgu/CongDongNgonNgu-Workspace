# Phase 08C1B - Phase 06 Source Health, Fail-Closed Publication, and Review Reconciliation

Date: 2026-09-25
Slice: `LNG-08-005`
Status: `VERIFYING`

## Boundary and heads

This slice continues from the accepted 08C1A Backend review commit
`82e3f66b88232e64ef71dc68d8a1c5f63a115257` on
`phase-08c1a-library-review-backend`. The final 08C1B implementation head is
`6ef7276461bab7c1781c668e00ec25e7920bd7e1` on
`phase-08c1b-library-source-invalidation`, and the accepted Workspace runtime commit
`989c96825b47da7ae8fee122c717c6842d1540b0` on
`phase-08c1a-library-review-backend`.

Frontend was not changed and remains
`a46194853b4da7cfa8d41d6e155f92ab908c4ff4`.

Neon TEST was not connected to or mutated. Production, deployment, reviewer
UI, Phase 06 candidate consumption, Request Changes, and Phase 10 points are
out of scope.

## Source-health contract

`PHASE06_LIBRARY_CANDIDATE` provenance is evaluated against current Phase 06
rows rather than the attachment snapshot. The reusable evaluator checks:

- candidate is `PENDING_REVIEW` and its candidate/post/response/acceptance
  references match the Library provenance;
- parent post exists, is `ACTIVE`, and is `PUBLIC`;
- structured response exists, belongs to the expected parent, and is
  `ACTIVE`;
- referenced acceptance exists, is not revoked, matches the candidate, and
  remains the current active acceptance for the parent.

Stable safe reason codes are `VALID`, `CANDIDATE_INVALIDATED`,
`CANDIDATE_MISSING`, `ACCEPTANCE_REVOKED_OR_REPLACED`,
`RESPONSE_INACTIVE_OR_MISSING`, `PARENT_INACTIVE_OR_MISSING`,
`PARENT_NOT_PUBLIC`, and `SOURCE_REFERENCE_MISMATCH`.

Non-Phase06 provenance reports `NOT_APPLICABLE` and continues to use the
existing Library license/review/moderation gates.

## Public and reviewer read models

Public detail (`GET /api/v1/library/resources/:resourceId`) and public search
(`GET /api/v1/library/resources`) now fail closed when any current Phase 06
provenance source is invalid, even if the Library resource remains
`VERIFIED`.

Reviewer detail and pending queue projections include safe `sourceHealth`
information. Invalid Phase 06 provenance adds `SOURCE_INVALID` to
`verificationEligibility.issues`; no private moderation notes, email,
authentication data, license `sourceNote`, or unnecessary contributor IDs are
exposed.

The reviewer-only invalid-source queue is:

`GET /api/v1/library/reviews/source-invalid`

It is limited to currently `VERIFIED` resources with at least one invalid
Phase 06 provenance entry, uses deterministic `updated_at ASC, id ASC`
pagination, and reports `publicExposure=false`.

## Reconciliation action

The reviewer-only endpoint is:

`POST /api/v1/library/reviews/:resourceId/reconcile-source`

It requires `MODERATOR` or `ADMIN`, cookie CSRF protection, current
`VERIFIED` state, and a current invalid Phase 06 source. The transaction locks
and rechecks the resource/provenance/source boundary, then atomically applies:

`VERIFIED -> COMMUNITY_REVIEW`

with the normal `INVALIDATE` review audit, authenticated reviewer actor, a
bounded system-generated source reason, optional reviewer note, and response
hydration before `COMMIT`. It does not mutate Phase 06 provenance or create a
system actor/event table.

If a stale queue observation is now healthy, the action returns
`LIBRARY_SOURCE_STILL_VALID` (`409`) with no transition or audit. A replay
after successful reconciliation returns `LIBRARY_REVIEW_CONFLICT` (`409`) and
cannot create a second `INVALIDATE` audit.

## External-review remediation

The reconciliation service now passes only the normalized optional reviewer
note into the repository. PostgreSQL constructs the durable system reason from
the Phase 06 source rows locked and re-evaluated inside the transaction that
commits `VERIFIED -> COMMUNITY_REVIEW`; preflight reasons cannot become audit
facts. Reason codes are deduplicated and ordered canonically, and only the
optional reviewer portion is truncated to keep the UTF-8-safe audit note at or
below 2,000 code points.

The invalid-source queue uses bounded internal scanning over the deterministic
`VERIFIED`/Phase06-backed superset. It continues across currently healthy
resources until it has `limit + 1` invalid resources or reaches exhaustion, then
returns a cursor after the last visible invalid resource. This produces pages
from the logical invalid set without empty intermediate pages caused by valid
Phase06 resources, while preserving stable `updated_at ASC, id ASC` order.

## Transaction and race design

VERIFY keeps the existing resource `FOR UPDATE` and provenance revision
boundary. Within that transaction it locks provenance, current license rows,
and all referenced Phase 06 source rows in deterministic order:

1. parent posts;
2. structured responses;
3. acceptances/current active acceptances;
4. library candidates.

The shared evaluator is then applied to the locked rows before the state
update. Source mutation and VERIFY therefore have a coherent ordering: a
source change committed first blocks verification, while a source change that
commits after VERIFY makes public projections fail closed immediately.

VERIFY, REJECT, and source reconciliation hydrate through the transaction
client before commit. `POST_COMMIT_REQUIRED_READS=0`. Audit, eligibility,
source-lock, stale-boundary, and hydration failures roll back the transition.

## Migration and deployment decision

```text
MIGRATION_REQUIRED=NO
MIGRATION_FILE=NONE
MIGRATION_APPLIED=NO
MIGRATION_RERUN=NO
MIGRATIONS_0001_0011=UNCHANGED
MIGRATION_0012_CREATED=NO
TEST_DB_MUTATED=NO
PRODUCTION_DB_MUTATED=NO
DEPLOYED=NO
```

## 08C1B corrected Neon TEST runtime retest

The earlier Neon TEST runtime result remains historical and is not replaced:

```text
PREVIOUS_NEON_RUNTIME=FAIL
CURRENT_RETEST_BACKEND_SHA=86c51f7b08a989db415e7c11361686fdf2379455
```

The authorized retest used only the existing CongDongNgonNgu Neon TEST target.
Safe connection metadata was `database=neondb`, `role=neondb_owner`,
PostgreSQL `18.6`, Neon host, and `sslmode=verify-full`; credentials and the
connection string were not printed. The migration ledger already contained
exactly 0001-0011. No migration runner was executed, the ledger/schema was not
changed, and no production connection or deployment was used.

The retest created only uniquely marked disposable fixtures and removed them
in FK-safe order. Cleanup verified zero remaining marked users, resources,
community posts, or licenses. Canonical data and the frozen migration schema
were unchanged.

Runtime results:

```text
NEON_RUNTIME_RETEST=PASS
TEST_DB_TARGET_VERIFIED=YES
CURSOR_DB_MICROSECONDS_PRESENT=YES
CURSOR_EXACT_MICROSECOND_BOUNDARY=PASS
INVALID_QUEUE_LOGICAL_PAGINATION_POSTGRES=PASS
INVALID_QUEUE_DUPLICATED_R4=NO
INVALID_QUEUE_SKIPPED_R5=NO
INVALID_QUEUE_NO_EMPTY_INTERMEDIATE_POSTGRES=PASS
INVALID_QUEUE_CONCURRENT_RECONCILE=PASS
PUBLIC_SEARCH_CURSOR_POSTGRES=PASS
REVIEW_QUEUE_CURSOR_POSTGRES=PASS
VERIFY_HELD_REAL_SOURCE_LOCKS=YES
COMPETING_MUTATION_BLOCKED_BY_DB_LOCK=YES
VERIFY_ACCEPTANCE_RACE_POSTGRES=PASS
VERIFY_RESPONSE_MODERATION_RACE_POSTGRES=PASS
VERIFY_PARENT_VISIBILITY_RACE_POSTGRES=PASS
VERIFY_PARENT_MODERATION_RACE_POSTGRES=PASS
SOURCE_HEALTH_REASON_MATRIX_POSTGRES=PASS
SOURCE_RECONCILE_AUTH_HTTP=PASS
SOURCE_REVIEW_PRIVACY=PASS
TRANSACTIONAL_AUDIT_REASON_POSTGRES=PASS
FAIL_CLOSED_BEFORE_RECONCILE=PASS
STALE_INVALIDATION_POSTGRES=PASS
SOURCE_RECONCILE_IDEMPOTENCY_POSTGRES=PASS
MULTI_SOURCE_FAIL_CLOSED_POSTGRES=PASS
NON_PHASE06_POSTGRES=PASS
POST_COMMIT_REQUIRED_READS=0
DISPOSABLE_TEST_CLEANUP=PASS
```

The real PostgreSQL cursor regression used non-zero microseconds and decoded
the invalid-source continuation boundary from the opaque v2 cursor. The
interleaved logical pages were exactly R2/R4 followed by R5, with no duplicate
R4, skipped R5, or empty intermediate page. Public search and the normal
COMMUNITY_REVIEW queue also traversed distinct sub-millisecond boundaries once
each in their existing sort directions.

The transaction-aware VERIFY harness paused the actual reviewed repository
after all parent, response, acceptance, and candidate `FOR SHARE` locks were
held. Each legitimate Phase 06 mutation remained pending on a PostgreSQL row
lock until VERIFY committed; the post-mutation public projection then failed
closed. Source-health priority matched canonical Phase 06 semantics:
candidate invalidation dominates downstream acceptance/response causes, while
pending candidates report parent visibility or moderation reasons. HTTP checks
used bearer authorization, conditional explicit-cookie CSRF, and exact-key
privacy assertions for both reviewer projections.

Post-retest local verification passed: focused 12 suites/106 tests, full unit
41 suites/304 tests, full E2E 13 suites/58 tests, migration contracts 4
suites/15 tests, typecheck, lint, build, `git diff --check`, and
`npm audit --audit-level=high` with 0 vulnerabilities. Backend remains clean at
`86c51f7b08a989db415e7c11361686fdf2379455`; Frontend remains unchanged at
`a46194853b4da7cfa8d41d6e155f92ab908c4ff4`.

```text
08C1A_RUNTIME=PASS
SOURCE_INVALIDATION_08C1B=RUNTIME_PASS
CURRENT_PHASE=08
PHASE_08=IN_PROGRESS
LNG_08_005=VERIFYING
OWNER_VISUAL_ACCEPTANCE_08C=PENDING_NOT_STARTED
MIGRATION_REQUIRED=NO
MIGRATION_RERUN=NO
MIGRATION_0012_CREATED=NO
MIGRATIONS_0001_0011=UNCHANGED
MIGRATION_0011_CHECKSUM_MATCH=YES
MIGRATION_0011_UP_SHA256=556c9222004f909cc94738db592a7134a2b6bbd9fe6807d62adbc876b4e52a5a
MIGRATION_0011_DOWN_SHA256=436108a9e78fb5e3a5cf3f1a753b10a5cb756f7641f1c9d85f6ac1e80da13697
TEST_DB_MUTATED=NO (disposable fixtures cleaned; schema/ledger unchanged)
PRODUCTION_DB_MUTATED=NO
DEPLOYED=NO
NEXT_SLICE=08C2
NEXT_ACTION=STOP_FOR_REVIEWER_STITCH_UI_GATE
```

The existing Phase 06 source references and the frozen 0009 review ordering
index are sufficient. No schema or cache was added.

## Verification evidence

```text
SOURCE_HEALTH_MODEL=PASS
PUBLIC_SOURCE_INVALID_FAIL_CLOSED=PASS
PUBLIC_SEARCH_SOURCE_INVALID_FAIL_CLOSED=PASS
FAIL_CLOSED_BEFORE_RECONCILE=PASS
REVIEW_SOURCE_HEALTH=PASS
VERIFY_SOURCE_TRANSACTIONAL=PASS
SOURCE_VERIFY_RACE=PASS (deterministic transaction-order tests)
INVALID_SOURCE_QUEUE=PASS
SOURCE_RECONCILE_ACTION=PASS
STALE_INVALIDATION_DENIED=PASS
SOURCE_RECONCILE_IDEMPOTENCY=PASS
MULTI_SOURCE_FAIL_CLOSED=PASS
NON_PHASE06_REGRESSION=PASS
NO_AUTO_REVERIFY=YES
PHASE06_CANDIDATE_CONSUMPTION=NO
POST_COMMIT_REQUIRED_READS=0
HYDRATION_FAILURE_ROLLBACK=PASS
TRANSACTIONAL_AUDIT_REASON=PASS
STALE_PREFLIGHT_REASON_PERSISTED=NO
AUDIT_REASON_ORDER_DETERMINISTIC=PASS
AUDIT_NOTE_LENGTH_SAFE=PASS
INVALID_QUEUE_LOGICAL_PAGINATION=PASS
INVALID_QUEUE_EMPTY_INTERMEDIATE_PAGE=NO
INVALID_QUEUE_NO_DUPLICATES=PASS
INVALID_QUEUE_NO_SKIPS=PASS
```

Focused source-health/reconciliation tests, reviewer tests, and Corrections
tests pass. Full local Backend verification:

- focused source-health/repository tests: 5 suites, 27 tests passed;
- full unit suite: 40 suites, 297 tests passed;
- full E2E suite: 13 suites, 58 tests passed;
- migration contract subset: 5 suites, 20 tests passed;
- typecheck, lint, build, and `git diff --check`: passed;
- `npm audit --audit-level=high`: 0 vulnerabilities.

The Frontend exact SHA check remains unchanged at
`a46194853b4da7cfa8d41d6e155f92ab908c4ff4`.

## State and next step

```text
08C1A_RUNTIME=PASS
08C1B_SOURCE_INVALIDATION=IMPLEMENTED_PENDING_EXTERNAL_REVIEW_REMEDIATION
CURRENT_PHASE=08
PHASE_08=IN_PROGRESS
LNG_08_005=VERIFYING
LNG_08_006=PLANNED
LNG_08_007=PLANNED
LNG_08_008=PLANNED
OWNER_VISUAL_ACCEPTANCE_08C=PENDING_NOT_STARTED
SOURCE_INVALIDATION_08C1B=IMPLEMENTED_PENDING_EXTERNAL_REVIEW_REMEDIATION
NEXT_SLICE=08C1B_RUNTIME
NEXT_ACTION=STOP_FOR_EXTERNAL_REVIEW_BEFORE_NEON_RUNTIME
```

## 08C1B runtime failure classification and static remediation

The previous Neon TEST runtime result remains historical and is not
overwritten:

```text
PREVIOUS_NEON_RUNTIME=FAIL
PREVIOUS_BACKEND_SHA=6ef7276461bab7c1781c668e00ec25e7920bd7e1
```

This remediation was static-only. Neon TEST was not connected, no database
rows were changed, and no migration runner was executed.

The confirmed code defect was cursor precision. Library pagination had
serialized PostgreSQL `timestamptz` boundaries through JavaScript `Date`,
losing microseconds and allowing an invalid-source row such as R4 to reappear
after a cursor request. Backend commit
`86c51f7b08a989db415e7c11361686fdf2379455` changes the opaque cursor to
version 2 with canonical decimal `updatedAtMicros` strings. PostgreSQL
projects the exact ordered-row boundary with
`(EXTRACT(EPOCH FROM resource.updated_at) * 1000000)::bigint::text`, compares
the raw indexed timestamp column against an epoch-microsecond parameter, and
preserves `updated_at`/`id` ordering. Public search, the COMMUNITY_REVIEW
queue, and the invalid-source queue use the same contract. The invalid-source
scan retains exact boundaries aligned with hydrated items, so its continuation
cursor is the last visible invalid row rather than a millisecond-truncated
hydrated timestamp.

Focused regressions cover cursor versioning/validation, exact microsecond
boundaries, public search, reviewer queue, and the interleaved logical
invalid-source sequence R1 valid, R2 invalid, R3 valid, R4 invalid, R5
invalid. The expected pages are R2/R4 followed by R5 with no duplicate or
skip. Existing source-transaction tests continue to prove resource,
provenance, license, parent, response, acceptance, and candidate locks are
acquired before the state mutation and that `COMMIT` is the final transaction
operation. No source-locking semantics were changed in this remediation.

The canonical source-health priority remains candidate state first, then
reference coherence, parent moderation, parent visibility, response state,
and acceptance state. Therefore an acceptance revoke or response moderation
that canonically invalidates the candidate may report
`CANDIDATE_INVALIDATED`; a still-pending candidate with a private parent
reports `PARENT_NOT_PUBLIC`, and a non-active parent reports
`PARENT_INACTIVE_OR_MISSING`.

The auth runtime expectation is documented rather than changed: Library
routes require `Authorization: Bearer <access token>`; no bearer is 401, a
MEMBER bearer is 403, and MODERATOR/ADMIN bearer access is authorized subject
to domain rules. CSRF is checked only when an explicit refresh cookie is
present, in which case a missing or invalid header is `AUTH_CSRF_INVALID`.
The reviewer E2E coverage now asserts this exact model.

Reviewer privacy is checked recursively by exact forbidden field names rather
than broad `userId` substring matching. The forbidden set is email,
password/passwordHash, access/refresh tokens, undocumented session fields,
license `sourceNote`, contribution-event `contributorUserId`, and unsafe
`originalContributorUserId`. Safe resource/source IDs and review-audit
`actorUserId` remain permitted reviewer evidence.

### 08C1B Runtime Failure Classification

| Previous runtime item | Classification | Static remediation status |
| --- | --- | --- |
| `VERIFY_ACCEPTANCE_RACE_POSTGRES` | `RUNTIME_HARNESS_DEFECT` | Existing lock-order tests pass; `NEEDS_RUNTIME_RETEST` with transaction-aware coordination. |
| `VERIFY_RESPONSE_MODERATION_RACE_POSTGRES` | `RUNTIME_HARNESS_DEFECT` | Existing lock-order tests pass; `NEEDS_RUNTIME_RETEST` with transaction-aware coordination. |
| `VERIFY_PARENT_RACE_POSTGRES` | `RUNTIME_HARNESS_DEFECT` | Existing lock-order tests pass; `NEEDS_RUNTIME_RETEST` with transaction-aware coordination. |
| `INVALID_QUEUE_LOGICAL_PAGINATION_POSTGRES` | `CODE_DEFECT` | Fixed by exact microsecond cursor boundaries; static regression passes; Neon retest required. |
| `INVALID_QUEUE_NO_EMPTY_INTERMEDIATE_PAGE` | `CODE_DEFECT` | Covered by the logical scan regression; Neon retest required. |
| `INVALID_QUEUE_CONCURRENT_RECONCILE` | `CODE_DEFECT` | Same cursor-boundary defect path is covered; Neon retest required. |
| `SOURCE_HEALTH_REASON_MATRIX_POSTGRES` | `GATE_EXPECTATION_DEFECT` | Candidate invalidation is the canonical dominant reason; evaluator unit matrix passes. |
| `SOURCE_RECONCILE_AUTH_HTTP` | `GATE_EXPECTATION_DEFECT` | The prior cookie-only expectation was outside the bearer-auth contract; corrected HTTP coverage passes. |
| `SOURCE_REVIEW_PRIVACY` | `GATE_EXPECTATION_DEFECT` | The prior substring check rejected safe IDs; exact-key recursive projection checks pass. |

Static verification after remediation:

```text
CURSOR_ROOT_CAUSE_MICROSECOND_PRECISION=CONFIRMED
LIBRARY_CURSOR_EXACT_PRECISION=PASS
MICROSECOND_CURSOR_DUPLICATE=NO
MICROSECOND_CURSOR_SKIP=NO
PUBLIC_SEARCH_CURSOR_REGRESSION=PASS
REVIEW_QUEUE_CURSOR_REGRESSION=PASS
INVALID_QUEUE_LOGICAL_PAGINATION=PASS
INVALID_QUEUE_NO_EMPTY_INTERMEDIATE_PAGE=PASS
INVALID_QUEUE_NO_DUPLICATES=PASS
INVALID_QUEUE_NO_SKIPS=PASS
RACE_STATIC_INVARIANT=PASS
RUNTIME_RACE_RETEST_REQUIRED=YES
SOURCE_REASON_PRIORITY_DOCUMENTED=PASS
SOURCE_RECONCILE_AUTH_STATIC=PASS
AUTH_RUNTIME_GATE_CORRECTED=YES
SOURCE_REVIEW_PRIVACY_STATIC=PASS
```

Backend static gates passed after commit
`86c51f7b08a989db415e7c11361686fdf2379455`: 41 unit suites / 304
tests, 13 E2E suites / 58 tests, typecheck, lint, build, migration contract
tests, `git diff --check`, and `npm audit --audit-level=high` with zero
vulnerabilities. Frontend remains unchanged at
`a46194853b4da7cfa8d41d6e155f92ab908c4ff4`.

```text
CURRENT_PHASE=08
PHASE_08=IN_PROGRESS
LNG_08_005=VERIFYING
SOURCE_INVALIDATION_08C1B=PENDING
OWNER_VISUAL_ACCEPTANCE_08C=PENDING_NOT_STARTED
TEST_DB_MUTATED=NO
PRODUCTION_DB_MUTATED=NO
DEPLOYED=NO
NEXT_ACTION=STOP_FOR_EXTERNAL_REVIEW_BEFORE_NEON_RUNTIME_RETEST
```

## Current stop state after corrected runtime retest

```text
CURRENT_PHASE=08
PHASE_08=IN_PROGRESS
LNG_08_005=VERIFYING
SOURCE_INVALIDATION_08C1B=RUNTIME_PASS
OWNER_VISUAL_ACCEPTANCE_08C=PENDING_NOT_STARTED
TEST_DB_MUTATED=NO (disposable fixtures created and cleaned; schema/ledger unchanged)
PRODUCTION_DB_MUTATED=NO
DEPLOYED=NO
NEXT_SLICE=08C2
NEXT_ACTION=STOP_FOR_REVIEWER_STITCH_UI_GATE
```
