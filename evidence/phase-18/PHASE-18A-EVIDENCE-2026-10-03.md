# Phase 18A Evidence - UAT Dataset, Personas and Guarded Seed

**Date:** 2026-10-03

**Task:** LNG-18-001

**Workspace branch:** `phase-18a-uat-foundation`

**Workspace tested SHA:** `8dd06271f29cd9aeb8890b15a95beffb2efa66b2`

**Backend Phase 18A SHA:** `cdcbc6d3b0c942a417397b78a565a5e6a6939f91`

**Frontend tested SHA:** `01331d6e4f768c9a5d0079658c60b7fcedddcaa8`

## Scope and safety boundary

Phase 18A defines the deterministic UAT persona contract and adds a guarded
backend seed runner. No production deployment, production database write or
migration, provider activation, live payment, secret mutation, or destructive
reset was performed.

The fixture identities use `example.invalid` addresses and are not intended
for delivery. The manifest contains no password. A runtime password is
validated and hashed through the existing scrypt password boundary. The
runner accepts only `TEST` or `UAT`, requires an exact expected host/database
name, an explicit host allowlist and a UAT-only confirmation token, rejects
production/external-product target markers before opening a connection, and
has no reset/delete mode. Fixture writes run in one transaction with
`ON CONFLICT` upserts and rollback on failure.

## Implemented artifacts

- Backend persona manifest and pure CLI target guards:
  `src/cli/uat-seed.ts`.
- Transactional seed runner and injectable pool/hash dependencies:
  `src/cli/uat-seed.runner.ts`.
- RED-to-GREEN contract/runner tests:
  `src/cli/uat-seed.spec.ts` and `src/cli/uat-seed.runner.spec.ts`.
- Compiled command: `npm run uat:seed -- --environment TEST --dry-run`.
- Backend README and migration/seed runbook documentation.

The stable persona keys are: `new-user`, `vietnamese-learner`,
`foreign-vietnamese-learner`, `english-native-buddy`,
`vietnamese-native-buddy`, `contributor`, `reviewer`, `moderator`, and
`admin`. Language and exchange fixtures are limited to the existing `en` and
`vi` catalog entries and respect current role, profile, language and exchange
foreign-key constraints.

## Verification

| Check | Result |
| --- | --- |
| Focused UAT contract/runner tests | PASS - 2 suites, 9 tests |
| Backend unit regression | PASS - 146 suites, 820 tests |
| Backend E2E regression | PASS - 17 suites, 73 tests |
| Backend typecheck/build | PASS |
| Frontend regression | PASS - 82 files, 341 tests |
| Frontend typecheck/build/performance budget | PASS |
| Backend high-severity dependency audit | PASS - 0 vulnerabilities |
| Frontend high-severity dependency audit | PASS - 0 vulnerabilities |
| Compiled UAT dry-run | PASS - 9 stable persona keys; no DB connection |
| Secret-like scan of backend tree | PASS - no credential/key match |

The first attempted frontend command used the backend-only Jest flag
`--runInBand` and Vitest rejected that option. The repository-native `npm
test` command was then run and passed; this is a command correction, not a
product failure.

## External execution status

Live fixture insertion was not attempted. Read-only preflight found:

- `psql`: unavailable
- `docker`: unavailable
- `podman`: unavailable
- local TCP `localhost:5432`: unavailable

Therefore `LNG-18-004` live UAT execution remains
`BLOCKED_EXTERNAL` pending an approved TEST/UAT PostgreSQL endpoint and
runtime-only seed password. No database target was guessed and no production
connection was attempted. This evidence does not claim seeded-row counts or
live UAT journey results.

## Source-control handoff

The Workspace and Backend Phase 18A branches are pushed to origin. Pull
request creation/merge has not been claimed as complete; the GitHub compare
page is prepared for review. Until the PR workflow is submitted and verified,
the temporary branches must not be reported as merged or cleaned up.

## Phase 18A decision

`LNG-18-001=PASS_WITH_LIVE_EXECUTION_PENDING`.

The guarded fixture foundation satisfies the 18A done criteria. The external
database dependency is carried forward to 18D and must remain visible in the
UAT matrix. Continue to 18B/18C locally; do not start Phase 19 and do not
claim Phase 18 launch readiness from this evidence.
