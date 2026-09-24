# Phase 08B2A - Community Contribution Backend Foundation

## Stop state

```text
CURRENT_PHASE=08
PHASE_08=IN_PROGRESS
LNG_08_004=VERIFYING
LNG_08_005=PLANNED
LNG_08_006=PLANNED
LNG_08_007=PLANNED
LNG_08_008=PLANNED
FRONTEND_CHANGED=NO
OWNER_VISUAL_ACCEPTANCE_08B2=PENDING_NOT_STARTED
TEST_DB_MUTATED=NO
PRODUCTION_DB_MUTATED=NO
DEPLOYED=NO
NEXT_SLICE=08B2B
NEXT_ACTION=STOP_FOR_EXTERNAL_REVIEW_BEFORE_MIGRATION_AUTHORIZATION
```

## Baselines and branches

```text
BACKEND_BASELINE=850b0b0a36869effdad4b89063b1cc2a74bfe1e0
FRONTEND_BASELINE=4137f51e392f8aa947768e7dc7a28a29bf64f206
WORKSPACE_BASELINE=3f863780cdfc38bd53d65da85ba630127ccb7f08
BACKEND_BRANCH=phase-08b2a-community-contribution
BACKEND_REVIEW_SHA=816d9962d2af145211aff2694ef9e474535ab3c6
WORKSPACE_BRANCH=phase-08b2a-community-contribution
WORKSPACE_REVIEW_SHA=53569cfb79fbeea2809b7ed78d48f82f9616202
FRONTEND_BRANCH=main
```

## Backend contract

- `GET /api/v1/library/contribution-policy` is public and read-only.
- The initial contribution allowlist is exactly `VOCABULARY`, `SENTENCE`,
  and `TRANSLATION`; it is separate from the general Library resource enum.
- The backend-owned terms version is `library-contribution-v1`.
- Policy licenses include only `active=true` and
  `redistributionAllowed=true`. Disabled, false, and NULL redistribution
  values are excluded. The response projects display name, canonical URL,
  attribution requirement, redistribution permission, and derivative
  constraints only; `sourceNote` and administrative fields are excluded.
- `POST /api/v1/library/resources/:resourceId/submit-contribution` requires
  an authenticated owner, cookie-session CSRF validation, an eligible PUBLIC
  DRAFT, non-empty actor-bound `ORIGINAL_AUTHOR` provenance, currently active
  redistribution-safe licenses, the exact terms version, and actual boolean
  `true` values for `rightsConfirmed` and `reuseConsent`.
- A submission creates the normal `SUBMIT` review audit and transitions only
  `DRAFT -> COMMUNITY_REVIEW`. It cannot verify a resource, and reviewer or
  system source flows remain outside this endpoint.

## Durable event and transaction design

No suitable reusable durable Library event/outbox infrastructure existed.
Phase 06 contribution events are a separate domain contract and exchange
event sinks are non-durable. Migration `0011` therefore adds the bounded
Library-owned `library_contribution_events` table.

Each successful transition writes one
`LIBRARY_CONTRIBUTION_SUBMITTED` version `1` event containing the event ID,
resource ID, contributor user ID, resource type, review audit ID, terms
version, affirmative consent evidence, occurrence time, and creation time.
Sensitive material details are not copied into the event. The unique
`review_audit_id` constraint supplies durable linkage/idempotency protection.
The resource update, review audit, and event insert share one PostgreSQL
transaction. Event/audit failure rolls the transition back. A retry after
the resource has left DRAFT returns a deterministic conflict and does not
create a second event.

Phase 10 points, award status, and processing state are intentionally absent.

## Migration decision

```text
MIGRATION_REQUIRED=YES
MIGRATION_FILE=database/migrations/0011_library_contribution_events.sql
MIGRATION_DOWN_FILE=database/migrations/0011_library_contribution_events.down.sql
MIGRATION_APPLIED=NO
MIGRATIONS_0001_0010=UNCHANGED
0011_UP_SHA256=556c9222004f909cc94738db592a7134a2b6bbd9fe6807d62adbc876b4e52a5a
0011_DOWN_SHA256=436108a9e78fb5e3a5cf3f1a753b10a5cb756f7641f1c9d85f6ac1e80da13697
```

The down migration drops only the 0011-owned table and event type. The
migration runner was not invoked; Neon TEST and production were untouched.

## Verification

Backend verification completed locally:

- focused contribution, PostgreSQL transaction, and migration contract tests:
  40 tests passed after the final policy/E2E assertions;
- full unit suite: 34 suites, 250 tests passed;
- full HTTP E2E suite: 12 suites, 53 tests passed;
- contribution HTTP E2E: 3 tests passed, including auth, CSRF, ownership,
  no self-verification, COMMUNITY_REVIEW-only behavior, retry conflict, and
  no public visibility before verification;
- typecheck, lint script, build, `git diff --check`, and `npm audit
  --audit-level=high` passed.

Frontend source was not changed and remains at the canonical baseline. Stitch
and material contribution UI are deferred to 08B2B after external backend
contract review and migration authorization.

The review branches are intentionally stopped before merge, deployment, or
0011 application.
