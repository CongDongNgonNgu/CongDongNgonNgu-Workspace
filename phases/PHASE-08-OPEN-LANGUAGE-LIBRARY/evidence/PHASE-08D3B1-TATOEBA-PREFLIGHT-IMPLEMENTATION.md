# Phase 08D3B1 — Tatoeba read-only import preflight

Status: implementation complete; external review required before 08D3B2.
Retrieved/verified: 2026-09-28 (Asia/Saigon).

This slice adds only the read-only actor and license-registry preflight. It
does not create Library resources, write provenance, emit review audits or
events, acquire creation locks, reconcile external identities, run migrations,
download Tatoeba data, call the Tatoeba API, access production, or deploy.

## Boundary and entrypoint

The existing 08D3A command remains an independent dry-run-only CLI:

```text
npm run library:import:tatoeba
CLI_DRY_RUN_ONLY=YES
DATABASE_CONNECTED_FOR_08D3A=NO
```

08D3B1 uses a separate internal entrypoint and never accepts database
credentials as arguments:

```text
npm run library:import:tatoeba:preflight -- --environment TEST --actor-user-id <uuid>
IMPORT_ENTRYPOINT=CLI
PRODUCTION_PREFLIGHT_SUPPORTED=NO
IMPORT_ACTOR_CONTRACT=EXPLICIT_ADMIN_CLI_ACTOR
IMPORT_ACTOR_USER_ID_DISCOVERY=NONE
```

The dedicated environment variables are named but not serialized or logged:

```text
TATOEBA_IMPORT_DATABASE_URL
TATOEBA_IMPORT_EXPECTED_DATABASE_NAME
```

The first is the only database URL accepted. The second is a non-secret exact
database-name expectation used to prove that a TEST connection reached the
intended target; host naming alone is not trusted. Missing values fail closed
before a pool is created.

## Actor contract

The operator must provide one UUID. The CLI validates its UUID shape before
the database boundary and performs no actor discovery. The adapter selects
only the actor ID, status, and role keys from `users` and `user_roles`.

The pure contract requires:

```text
users.id = supplied actor UUID
users.status = ACTIVE
user_roles.role_key includes ADMIN
```

Additional MEMBER or MODERATOR roles are allowed. Verification-pending,
disabled, missing, or non-ADMIN actors fail closed. No session, password,
OAuth, or login-state requirement was added, and no identity row is changed.

Stable actor outcomes include:

```text
TATOEBA_IMPORT_ACTOR_ID_INVALID
TATOEBA_IMPORT_ACTOR_NOT_FOUND
TATOEBA_IMPORT_ACTOR_INACTIVE
TATOEBA_IMPORT_ACTOR_NOT_ADMIN
```

## License registry contract

The mapping is typed and centralized in the preflight contract module. Tatoeba
API strings are not used as foreign keys:

| Tatoeba license | Library registry key |
| --- | --- |
| `CC BY 2.0 FR` | `CC_BY_2_0_FR` |
| `CC0 1.0` | `CC0_1_0` |

The exact expected registry rows are:

```text
CC_BY_2_0_FR
  display_name=CC BY 2.0 France
  canonical_url=https://creativecommons.org/licenses/by/2.0/fr/
  attribution_required=true
  redistribution_allowed=true
  active=true

CC0_1_0
  display_name=CC0 1.0
  canonical_url=https://creativecommons.org/publicdomain/zero/1.0/
  attribution_required=false
  redistribution_allowed=true
  active=true
```

`derivative_constraints` is read only as internal registry data and is not
matched against invented prose. `source_note` is neither required nor
returned. Missing, inactive, non-redistributable/null, attribution-mismatched,
URL-mismatched, or display-name-mismatched rows fail closed. Unrelated license
rows do not affect the result. No license is inserted, upserted, inferred, or
kept in an in-memory fallback.

Stable license outcomes include:

```text
TATOEBA_LICENSE_REGISTRY_MISSING
TATOEBA_LICENSE_REGISTRY_INACTIVE
TATOEBA_LICENSE_REGISTRY_REDISTRIBUTION_UNSAFE
TATOEBA_LICENSE_REGISTRY_ATTRIBUTION_MISMATCH
TATOEBA_LICENSE_REGISTRY_URL_MISMATCH
TATOEBA_LICENSE_REGISTRY_DISPLAY_NAME_MISMATCH
```

## PostgreSQL safety contract

`PostgresTatoebaImportPreflightRepository` is a narrow adapter. Its public
surface exposes only `findImportActor`, `findLicense`, and a read-only
transaction wrapper; it does not implement or receive `upsertLicense` or any
Library write operation.

The transaction sequence is:

```text
BEGIN READ ONLY
SET LOCAL statement_timeout = 5000
SELECT current_database(), current_user, version()
SELECT actor facts from users/user_roles
SELECT required fields from library_licenses
COMMIT
```

Any failure attempts `ROLLBACK` and releases the client. Queries are
parameterized. The adapter reads no other application table and contains no
INSERT, UPDATE, DELETE, MERGE, TRUNCATE, ALTER, CREATE, or DROP SQL. Pool
connection and idle bounds are finite, and the statement bound is transaction
local.

```text
DB_TRANSACTION_MODE=READ_ONLY
PREFLIGHT_DATABASE_READS=YES
PREFLIGHT_DATABASE_WRITES=0
```

The safe result contains only TEST environment, actor `userId`/active/admin
booleans, and per-required-license presence/contract booleans. It does not
contain email, normalized email, password hashes, provider identities,
sessions, tokens, source notes, database URLs, or raw PostgreSQL options.
Unexpected adapter failures become the stable
`TATOEBA_IMPORT_PREFLIGHT_DB_UNAVAILABLE` outcome without exposing the raw
connection error.

## CLI fail-closed boundary

Only the exact `TEST` value is accepted. `PRODUCTION`, `prod`, `production`,
unknown values, and missing environment values fail before database access.
Missing or malformed actor UUIDs fail before database access. A URL with an
unsupported scheme is rejected before a pool is created. The preflight CLI is
read-only by construction; it has no write mode and no dataset/API inputs.

## Tests and verification

Focused 08D3B1 tests cover:

- missing, inactive, pending, disabled, member-only, moderator-only, active
  ADMIN, and multi-role ADMIN actors;
- missing, inactive, false/null redistribution, attribution, URL, display
  name, exact, and unrelated-license registry states;
- exact normalized key and Creative Commons URL contracts;
- UUID/environment/credential boundary validation;
- privacy-safe result projection and sanitized database failures;
- static no-mutation SQL surface;
- read-only transaction ordering, target mismatch, rollback, parameterized
  actor/license reads, and client release.

```text
FOCUSED_PREFLIGHT_TESTS=4 suites / 32 tests PASS
BACKEND_TESTS=53 suites / 372 tests PASS
BACKEND_E2E=13 suites / 58 tests PASS
TYPECHECK=PASS
LINT=PASS
BUILD=PASS
AUDIT=PASS (0 vulnerabilities)
GIT_DIFF_CHECK=PASS
```

The existing Tatoeba dry-run tests remain included in the full Backend run.
The no-argument dry-run CLI still fails with
`TATOEBA_IMPORT_WRITE_MODE_NOT_IMPLEMENTED`; it does not instantiate the
preflight pool. No automated live Tatoeba API call ran.

## Optional TEST runtime

No external TEST preflight was run. The operator did not provide an explicit
actor UUID or the dedicated authorized TEST database/target inputs. The
implementation result and runtime result remain separate:

```text
PHASE_08D3B1_IMPLEMENTATION=PASS
TEST_RUNTIME_PREFLIGHT=BLOCKED_INPUT
ACTOR_RUNTIME_PREFLIGHT=NOT_RUN
CC_BY_RUNTIME_PREFLIGHT=NOT_RUN
CC0_RUNTIME_PREFLIGHT=NOT_RUN
TEST_DB_MUTATED=NO
PRODUCTION_DB_MUTATED=NO
```

No database URL was printed, copied into evidence, or used as a fallback from
ordinary application configuration. No test target was contacted.

## State and boundary

```text
BACKEND_BRANCH=phase-08d3b1-tatoeba-readonly-preflight
BACKEND_SHA=26b1cebad44e6f9d1851edae2259f5f85852b570
FRONTEND_CHANGED=NO
DATASET_DOWNLOADED=NO
MIGRATION_REQUIRED=NO
MIGRATION_RERUN=NO
MIGRATION_0012_CREATED=NO
MIGRATIONS_0001_0011=UNCHANGED
DEPLOYED=NO
CURRENT_PHASE=08
PHASE_08=IN_PROGRESS
LNG_08_006=VERIFYING
LNG_08_007=PLANNED
LNG_08_008=PLANNED
NEXT_SLICE=08D3B2
NEXT_ACTION=STOP_FOR_EXTERNAL_REVIEW_BEFORE_08D3B2
```

08D3B2 remains out of scope. It must separately review the first resource
write transaction, advisory creation lock, idempotency/reconciliation,
provenance writes, SUBMIT audit, and DRAFT-to-COMMUNITY_REVIEW transition.
