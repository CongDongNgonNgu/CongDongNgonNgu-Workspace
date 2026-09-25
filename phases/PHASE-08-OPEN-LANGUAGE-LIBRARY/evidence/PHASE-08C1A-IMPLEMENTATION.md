# Phase 08C1A Implementation - Reviewer Backend Read Model

Date: 2026-09-24
Slice: `LNG-08-005`
Status: `VERIFYING`

## Boundary

08C1A implements the backend reviewer queue/read model and atomic review
actions only. Reviewer UI, Stitch, Request Changes, source invalidation,
imports, Phase 06 candidate consumption, Phase 10 points, Neon TEST mutation,
production changes, and deployment are out of scope.

Frontend remains unchanged at
`a46194853b4da7cfa8d41d6e155f92ab908c4ff4`.

Backend review branch: `phase-08c1a-library-review-backend`
Backend implementation commit: `82e3f66b88232e64ef71dc68d8a1c5f63a115257`

## Queue contract

`GET /api/v1/library/reviews` requires an authenticated `MODERATOR` or
`ADMIN`. Unauthenticated callers receive `401`; members receive
`LIBRARY_REVIEW_FORBIDDEN` with `403`.

The queue is fixed to `COMMUNITY_REVIEW` and accepts only the bounded filters
`language`, `type`, `q`, `cursor`, and `limit`. Language matching covers the
primary or secondary language. Keyword matching follows the existing Library
content/topic search semantics. Ordering is deterministic oldest-first:
`updated_at ASC, id ASC`. The existing 0009
`library_resources_review_idx (review_state, updated_at ASC, id ASC)` is
adequate, so no migration was created.

The cursor is opaque and binds to the queue filter fingerprint. Malformed or
filter-mismatched cursors fail with `LIBRARY_INVALID_CURSOR`.

Queue items contain resource identity/type/languages/CEFR/topics, a bounded
content preview, review timestamp, provenance revision, safe provenance and
current license summaries, and current verification eligibility.

## Detail and privacy

`GET /api/v1/library/reviews/:resourceId` uses the same reviewer authorization
boundary and returns canonical content, language/CEFR/topic metadata,
visibility, moderation/review state, provenance revision, safe current
provenance/license state, review audit history, and a safe contribution-event
summary where present.

The projection omits email, password, refresh/session data, contributor user
IDs from contribution-event summaries, license `sourceNote`, importer
internals, transformation history, and unrelated moderation metadata. Public
attribution and source references remain available to reviewers.

Each license reports `exists`, `active`, `redistributionAllowed`, and
`eligibleForPublicVerification`. PUBLIC verification is eligible only when
provenance is non-empty, moderation is ACTIVE, and every current license
exists, is active, and explicitly allows redistribution. PRIVATE resources
still require current active licenses, but do not require redistribution for
the verification gate.

## Actions and lifecycle

Reviewer actions reuse `POST /api/v1/library/resources/:resourceId/review`.
The queue actions are:

- `COMMUNITY_REVIEW -> VERIFIED` with optional note;
- `COMMUNITY_REVIEW -> REJECTED` with a required note.

The creator cannot verify their own resource even when holding MODERATOR or
ADMIN: `LIBRARY_SELF_VERIFICATION_DENIED` (`403`). Existing INVALIDATE and
REOPEN lifecycle behavior remains intact. Request Changes is deliberately not
implemented:

`REQUEST_CHANGES=NOT_IMPLEMENTED_BY_DESIGN`

The service returns `LIBRARY_REVIEW_CONFLICT` (`409`) when a terminal review
action is replayed after the item has left the queue. At the repository
boundary, the locked review-state/provenance revision predicate makes the
first committed concurrent action win and rejects a stale second action
without a second audit.

After VERIFY or REJECT, the resource is absent from the default pending queue.
Existing public gates continue to require PUBLIC visibility, ACTIVE
moderation, VERIFIED state, non-empty provenance, and current redistribution-
safe licenses.

## Atomicity and locking

Postgres review transitions now execute in one transaction:

1. `BEGIN` and `SELECT ... FOR UPDATE` the resource;
2. check the expected review state and provenance revision;
3. for VERIFY, read current provenance with `FOR SHARE`, lock all referenced
   current license rows with `FOR SHARE`, and fail closed for missing,
   inactive, non-redistribution-safe licenses or non-ACTIVE moderation;
4. update the review state and write the review audit;
5. hydrate the final resource through the same transaction client;
6. `COMMIT` only after hydration succeeds.

REJECT follows the same state/audit/hydration/commit boundary and requires a
normalized note. Audit, eligibility, conflict, or hydration failure rolls
back the resource state and audit. No response-essential database read occurs
after COMMIT (`POST_COMMIT_REQUIRED_READS=0`).

## Migration and deployment decision

```text
MIGRATION_REQUIRED=NO
MIGRATION_FILE=NONE
MIGRATION_APPLIED=NO (no migration work in 08C1A)
MIGRATIONS_0001_0011=UNCHANGED
MIGRATION_0012_CREATED=NO
TEST_DB_MUTATED=NO
PRODUCTION_DB_MUTATED=NO
DEPLOYED=NO
```

The existing 0009 reviewer queue index is sufficient. Migration 0011 remains
frozen and applied only in the previously authorized Neon TEST runtime; this
slice did not connect to or mutate Neon TEST.

## Verification

Focused reviewer repository tests cover stable queue SQL/order, resource and
license locks, eligibility failures, audit failure rollback, hydration failure
rollback, and stale review conflicts. Focused service tests cover reviewer
authorization, queue filters/cursors, safe detail privacy, missing
provenance/current license/moderation gates, self-verification, reject notes,
queue disappearance, and public rejection behavior. HTTP E2E covers 401/403
authorization, moderator/admin access, actor-bound self-verification denial,
safe queue/detail responses, filters/pagination, verify, reject, public
visibility, and deterministic replay conflict.

Final local verification:

- focused reviewer repository/service tests: 16 passed;
- full Backend unit suite: 36 suites, 273 tests passed;
- full Backend E2E suite: 13 suites, 57 tests passed;
- typecheck, lint, and build passed;
- `npm audit --audit-level=high`: 0 vulnerabilities;
- `git diff --check` passed.

The Backend review branch was pushed at the commit recorded above. No Neon
TEST or production runtime was used by this slice.

## Deferred work

`SOURCE_INVALIDATION_08C1B=PENDING`. Dynamic invalidation from moderated or
deleted sources, reviewer UI, and any distinct Request Changes lifecycle are
future bounded slices. `LNG-08-005` remains `VERIFYING` pending external
review.

## Authorized Neon TEST reviewer runtime gate

This section records the separately authorized real PostgreSQL runtime gate
against the existing CongDongNgonNgu Neon TEST target. The reviewed Backend
implementation remained unchanged at
`82e3f66b88232e64ef71dc68d8a1c5f63a115257`; no migration runner was invoked.

Safe database identity metadata:

```text
TEST_DB_TARGET_VERIFIED=YES
DATABASE_SAFE_METADATA=database neondb; schema public; role neondb_owner; host category *.neon.tech
POSTGRES_VERSION=PostgreSQL 18.6 (6569466)
SSL_URL_MODE=verify-full
SSL_SERVER_REPORTED=false
MIGRATION_LEDGER=0001-0011 present; count=11
```

The server-reported session SSL flag was `false` while the configured URL
declared `sslmode=verify-full`; no secret or connection URL was recorded.

The frozen reviewer index was present as
`library_resources_review_idx (review_state, updated_at ASC, id ASC)`. The
normal tiny-corpus plan used a sequential scan; with `enable_seqscan=off`,
PostgreSQL selected an Index Only Scan using that index.

The real HTTP/application gate passed with isolated disposable actors,
resources, provenance, licenses, review audits, and contribution events. The
fixtures were removed in FK-safe order after the run; final matching counts
were users=0, resources=0, provenance=0, audits=0, events=0, licenses=0.

```text
REVIEW_QUEUE_INDEX_USABLE=PASS
REVIEW_QUEUE_POSTGRES=PASS
REVIEW_QUEUE_PAGINATION_POSTGRES=PASS
REVIEW_AUTH_HTTP=PASS
REVIEW_DETAIL_PRIVACY=PASS
VERIFY_POSTGRES=PASS
VERIFY_PUBLIC_VISIBILITY_POSTGRES=PASS
REJECT_POSTGRES=PASS
REJECT_PUBLIC_VISIBILITY_POSTGRES=PASS
SELF_VERIFICATION_POSTGRES=PASS
VERIFY_FAIL_CLOSED_POSTGRES=PASS
VERIFY_LICENSE_LOCK_REAL=PASS
VERIFY_PROVENANCE_RACE_POSTGRES=PASS
CONCURRENT_REVIEW_POSTGRES=PASS
STALE_QUEUE_ELIGIBILITY_FAIL_CLOSED=PASS
QUEUE_CONCURRENT_TRANSITION=PASS
REVIEW_VALIDATION_4XX=PASS
POST_COMMIT_REQUIRED_READS=0
DISPOSABLE_TEST_CLEANUP=PASS
```

The gate verified queue language/type/query filters, stable cursor
pagination, malformed and filter-mismatched cursors, unauthenticated and
MEMBER denial, MODERATOR/ADMIN access, cookie-CSRF enforcement, safe detail
privacy, atomic VERIFY/REJECT and public gates, self-verification denial,
zero-provenance and unsafe-license failures, ACTIVE moderation enforcement,
the actual repository license-row lock, resource/provenance race handling,
first-writer-wins reviewer conflict, stale queue eligibility, concurrent
queue transition behavior, and safe HTTP 4xx validation.

Runtime-only database mutation was limited to disposable verification rows
and was fully cleaned up; schema and migration state were not changed:

```text
TEST_DB_MUTATED=YES (disposable rows only; cleanup PASS)
MIGRATION_REQUIRED=NO
MIGRATION_RERUN=NO
MIGRATION_0012_CREATED=NO
MIGRATIONS_0001_0011=UNCHANGED
PRODUCTION_DB_MUTATED=NO
DEPLOYED=NO
```

Local regression after the runtime gate remained green: focused reviewer
tests 16/16, Library tests 142/142, full unit 273/273, full E2E 57/57,
typecheck, lint, build, migration contract tests 9/9, audit with 0 high or
critical vulnerabilities, and `git diff --check` all passed. Frontend stayed
unchanged at `a46194853b4da7cfa8d41d6e155f92ab908c4ff4`.

```text
CURRENT_PHASE=08
PHASE_08=IN_PROGRESS
LNG_08_005=VERIFYING
SOURCE_INVALIDATION_08C1B=PENDING
OWNER_VISUAL_ACCEPTANCE_08C=PENDING_NOT_STARTED
NEXT_SLICE=08C1B
NEXT_ACTION=STOP_FOR_SOURCE_INVALIDATION_IMPLEMENTATION_GATE
```
