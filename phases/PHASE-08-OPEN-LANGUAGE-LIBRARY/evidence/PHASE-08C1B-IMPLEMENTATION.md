# Phase 08C1B - Phase 06 Source Health, Fail-Closed Publication, and Review Reconciliation

Date: 2026-09-25
Slice: `LNG-08-005`
Status: `VERIFYING`

## Boundary and heads

This slice continues from the accepted 08C1A Backend review commit
`82e3f66b88232e64ef71dc68d8a1c5f63a115257` on
`phase-08c1a-library-review-backend`. The final 08C1B implementation head is
`cf142b48390d60630cda6773191b69d14cf819a4` on
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
```

Focused source-health/reconciliation tests, reviewer tests, and Corrections
tests pass. Full local Backend verification:

- focused source-health/repository tests: 23 passed;
- full unit suite: 39 suites, 293 tests passed;
- full E2E suite: 13 suites, 58 tests passed;
- migration contract subset: 5 suites, 20 tests passed;
- typecheck, lint, build, and `git diff --check`: passed;
- `npm audit --audit-level=high`: 0 vulnerabilities.

The Frontend exact SHA check remains unchanged at
`a46194853b4da7cfa8d41d6e155f92ab908c4ff4`.

## State and next step

```text
08C1A_RUNTIME=PASS
08C1B_SOURCE_INVALIDATION=IMPLEMENTED_PENDING_EXTERNAL_REVIEW
CURRENT_PHASE=08
PHASE_08=IN_PROGRESS
LNG_08_005=VERIFYING
LNG_08_006=PLANNED
LNG_08_007=PLANNED
LNG_08_008=PLANNED
OWNER_VISUAL_ACCEPTANCE_08C=PENDING_NOT_STARTED
SOURCE_INVALIDATION_08C1B=IMPLEMENTED_PENDING_EXTERNAL_REVIEW
NEXT_SLICE=08C1B_RUNTIME
NEXT_ACTION=STOP_FOR_EXTERNAL_REVIEW
```
