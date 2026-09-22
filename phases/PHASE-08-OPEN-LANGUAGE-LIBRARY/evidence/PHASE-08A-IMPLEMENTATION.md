# Phase 08A Implementation Evidence

## Scope and status

This evidence covers only `LNG-08-001` and `LNG-08-002`. Workspace state is:

```text
CURRENT_PHASE=08
PHASE_08=IN_PROGRESS
PHASE_08A=DONE
LNG_08_001=DONE
LNG_08_002=DONE
LNG_08_003..008=PLANNED
PHASE_09=BLOCKED_BY_PHASE_08
PHASE_10=BLOCKED_BY_PHASE_08
```

`PHASE_07=DONE` and `BLOCKER-05D-001=OPEN` are preserved.

## Decisions recorded

1. Licenses are normalized in `library_licenses`; provenance stores only a
   foreign-key license key, never uncontrolled license text.
2. Provenance is one-to-many and additive. Deduplication keys are scoped to a
   resource and source identity, while conflicting duplicate records fail.
3. Shared resource identity and metadata live in `library_resources`; each of
   the ten resource families has a constrained type-specific table.
4. The review lifecycle remains the four-state baseline. `VERIFIED ->
   REJECTED` is the reversible invalidation path and `REJECTED -> DRAFT` is
   the audited `REOPEN` path; every transition writes an audit row.
5. Public reads require public visibility, active moderation, verified review,
   non-empty provenance, and every current referenced license must be active
   with explicit `redistributionAllowed=true`. Unknown/null or false
   redistribution permission fails closed at verification and public-read
   time, including after a registry update. Review notes, reviewer identity,
   moderation state, contributor IDs, import batches, and transformation
   history are excluded from the public projection; safe source/license/
   attribution fields remain.
6. Provenance mutation is allowed for the owner only in `DRAFT`. An authorized
   reviewer may make a bounded correction in `COMMUNITY_REVIEW`, but the
   resource remains in review and must be verified again. Provenance is
   immutable in `VERIFIED` and `REJECTED` until reviewer/admin `REOPEN`.
   `REOPEN` requires an audit note, writes `REOPEN`, clears reviewed metadata,
   and returns to `DRAFT` without public exposure.
7. A normal `MEMBER` may attach only `ORIGINAL_AUTHOR` provenance. Dataset,
   Phase 06 candidate, manual, and Community post source types are
   reviewer/internal-only in 08A. Phase 06 provenance requires matching
   source post, response, candidate, acceptance, and candidate source ID;
   service lookup and a 0009-owned trigger require the canonical candidate to
   remain `PENDING_REVIEW` with an active coherent acceptance. Mismatches,
   invalidated candidates, and Phase 06-only fields on unrelated source types
   fail closed. Asker acceptance never becomes verification.
8. Quality scoring is deferred until a scoring policy and authority are
   defined; Phase 08A does not invent a score.
9. For a member-created `ORIGINAL_AUTHOR` entry, the service binds internal
   `originalContributorUserId` to the authenticated session actor and rejects a
   different caller-supplied contributor ID. Reviewer/admin internal source
   flows remain available only through their authorized path; public DTOs and
   public projections never expose the internal contributor ID.
10. `provenanceRevision` is an internal non-negative revision. Provenance
    mutation and review transition writes carry expected review state and
    revision; stale writes fail with `LIBRARY_REVIEW_CONFLICT` and are not
    retried against unseen provenance. Migration 0009 owns a parent-row-locking
    INSERT/UPDATE guard that permits only `DRAFT`/`COMMUNITY_REVIEW`, rejects
    resource moves and immutable states, and increments the revision
    atomically. Creator+moderator edits remain denied in `COMMUNITY_REVIEW`;
    a different authorized reviewer may correct provenance, after which fresh
    verification is required.

## Backend artifacts

- `database/migrations/0009_open_language_library.sql`
- `database/migrations/0009_open_language_library.down.sql`
- `src/library/library.types.ts`
- `src/library/library.normalization.ts`
- `src/library/library.repository.ts`
- `src/library/postgres-library.repository.ts`
- `src/library/library.service.ts`
- `src/library/library.controller.ts`
- `src/library/library.module.ts`
- `test/library.e2e-spec.ts`
- `src/library/library.service.spec.ts`
- `src/library/postgres-library.repository.spec.ts`
- `src/library/library.migration.spec.ts`

The bounded API supports draft creation, provenance attachment, review
transitions, public-safe resource reads, and active license lookup. There are
no search, import, candidate-promotion, or frontend routes in this slice.

## Verification evidence

- Focused library tests: 4 suites, 68 tests passed, including actor-bound
  provenance, creator-moderator freeze, revision guards, and deterministic
  race tests for stale verify, stale draft mutation, verify-first mutation,
  and fresh review after correction.
- Full unit tests: 32 suites, 199 tests passed.
- E2E tests: 11 suites, 49 tests passed, including the new real HTTP library
  suite using the non-production memory runtime (no Neon dependency).
- `npm run typecheck`, `npm run lint`, and `npm run build` passed.
- `npm audit --audit-level=high` passed with 0 vulnerabilities.
- `git diff --check` passed.
- Migration contract tests freeze canonical normalized checksums for
  migrations 0001-0009 and retain down-migration coverage; migration files
  themselves remained unchanged.

## Post-migration runtime defect remediation

- Migration 0009 had already been applied successfully to the authorized
  Neon TEST database before this remediation; no migration runner or schema
  mutation was used for the fix.
- Neon TEST runtime verification stopped on a real PostgreSQL typing defect
  in `PostgresLibraryRepository.transitionReview`: the
  `reviewed_by_user_id` CASE expression passed a text parameter to a UUID
  column.
- Backend review commit `8b391c8` fixes the repository SQL with explicit UUID,
  timestamptz, and bigint casts, and adds explicit UUID/time casts to the
  review-audit INSERT without changing review semantics.
- Repository regressions cover the SQL contract, VERIFIED/REJECTED reviewed
  metadata, REOPEN/DRAFT clearing, revision conflicts, and transaction
  rollback. The focused repository/service/migration run passed 45 tests;
  the full unit run passed 203 tests; library HTTP E2E passed 4 tests; full
  E2E passed 49 tests; typecheck, lint, build, npm audit, and diff check
  passed.
- Migration 0009 and migrations 0001-0008 remain unchanged. Full Neon TEST
  runtime re-verification is recorded below.

## Neon TEST runtime retest

- Migration 0009 remained applied from the prior authorized run; no migration
  runner, down migration, schema edit, or migration ledger edit was executed.
  The runner-normalized SHA-256 for 0009 matched the applied ledger value:
  `bf178d001a863ac6b1e3ad1c679eef616af699ae5c00646ce26ec779823f9e32`.
  Migrations 0001-0008 also matched their ledger checksums.
- The corrected review SQL passed the real PostgreSQL smoke lifecycle:
  `DRAFT -> COMMUNITY_REVIEW -> VERIFIED -> REJECTED -> DRAFT`; reviewer UUID
  and timestamps persisted, VERIFY/INVALIDATE/REOPEN audits were written, and
  REOPEN cleared reviewed metadata.
- Real provenance revisions were `0 -> 1 -> 2`; duplicate mutation rejected
  atomically with revision and rows unchanged.
- Database-level VERIFIED and REJECTED provenance guards rejected direct
  inserts without changing rows or revisions.
- Real PostgreSQL provenance/VERIFY, VERIFY/provenance, SUBMIT/provenance,
  and provenance/SUBMIT races passed with stale conflicts and fresh retries.
- Creator+moderator freeze, different-reviewer correction, member-bound
  ORIGINAL_AUTHOR provenance, contributor spoof denial, Phase06 coherent and
  mismatch/invalidation/revocation checks, license fail-closed checks, REOPEN,
  and public privacy checks all passed.
- Disposable TEST users, resources, provenance, audits, licenses, and Phase06
  rows were cleaned up. Production was untouched and deployment remained NO.

## Database and release boundary

`MIGRATION_REQUIRED=YES` because 0009 exists. `MIGRATION_APPLIED=YES` on the
authorized Neon TEST target before this repository-only remediation;
`MIGRATION_RERUN=NO`; `TEST_DB_SCHEMA_MUTATED=NO` for this fix and disposable
runtime rows were created and cleaned up. No rollback, new migration,
deployment, or production mutation was performed. Frontend remains unchanged
on its pinned main SHA. This evidence records the completed Neon TEST runtime
publication gate.

## Final Phase 08A publication

- `PHASE_08A=DONE`; `CURRENT_PHASE=08`; `PHASE_08=IN_PROGRESS`;
  `LNG_08_001=DONE`; `LNG_08_002=DONE`; `LNG_08_003..008=PLANNED`.
  `PHASE_09=BLOCKED_BY_PHASE_08`, `PHASE_10=BLOCKED_BY_PHASE_08`, and
  `BLOCKER-05D-001=OPEN` remain unchanged.
- Backend main was published at
  `ef66c1c1ef259aee93fbb9dc8281de88f8fbfccd`. Exact CI run `35680146545`
  completed with overall `SUCCESS`; Lint, Type check, Unit tests, End-to-end
  tests, Build, and Security audit all passed.
- Historical exact-SHA CI run `35679027827` failed solely because the
  migration immutability test hashed platform-dependent CRLF working-tree
  bytes. The bounded Backend remediation changes only
  `src/library/library.migration.spec.ts` to read UTF-8 text and apply the
  same CRLF/CR-to-LF normalization as `database/migrate.cjs`; no migration
  file changed.
- Migration 0009 remains applied to the authorized Neon TEST database. The
  second migration run had previously reported up to date; no migration was
  rerun during the runtime retest. The normalized 0009 checksum matches the
  applied ledger: `bf178d001a863ac6b1e3ad1c679eef616af699ae5c00646ce26ec779823f9e32`.
- Real PostgreSQL review lifecycle, provenance revision, database provenance
  guard, race reconciliation, creator-moderator freeze, member
  `ORIGINAL_AUTHOR` actor binding, Phase06 coherence/invalidation/revocation,
  license fail-closed behavior, REOPEN, public privacy, and disposable TEST
  cleanup all passed. The reviewed-by UUID runtime defect was fixed and
  revalidated on real PostgreSQL.
- Final local regression evidence: 203 unit tests passed, 45 focused library
  tests passed, 49 full E2E tests passed, and 4 library HTTP E2E tests passed;
  typecheck, lint, build, `npm audit` (0 vulnerabilities), and diff-check
  passed.
- Frontend remained unchanged at
  `3b8d5adeca6735d7b41c055a99e0040d8f36d35`. Production was untouched,
  deployment was `NO`, and `NEXT_SLICE=08B` remains planned only; no 08B
  implementation started.
