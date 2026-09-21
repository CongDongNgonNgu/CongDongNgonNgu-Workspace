# Phase 08A Implementation Evidence

## Scope and status

This evidence covers only `LNG-08-001` and `LNG-08-002`. Workspace state is:

```text
CURRENT_PHASE=08
PHASE_08=IN_PROGRESS
LNG_08_001=VERIFYING
LNG_08_002=VERIFYING
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
   REJECTED` is the reversible invalidation path and every transition writes
   an audit row.
5. Public reads require public visibility, active moderation, verified review,
   non-empty provenance, and active referenced licenses. Internal review notes
   and contributor user IDs are not public fields.
6. Phase 06 references are typed nullable links. Candidate consumption and
   promotion are deliberately deferred; asker acceptance is not verification.
7. Quality scoring is deferred until a scoring policy and authority are
   defined; Phase 08A does not invent a score.

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

The bounded API supports draft creation, provenance attachment, review
transitions, public-safe resource reads, and active license lookup. There are
no search, import, candidate-promotion, or frontend routes in this slice.

## Verification evidence

- Focused library tests: 4 suites, 48 tests passed.
- Full unit tests: 32 suites, 178 tests passed.
- E2E tests: 10 suites, 45 tests passed.
- `npm run typecheck`, `npm run lint`, and `npm run build` passed.
- `npm audit --audit-level=high` passed with 0 vulnerabilities.
- Migration contract tests verify 0001–0008 byte-for-byte checksums.

## Database and release boundary

`MIGRATION_REQUIRED=YES` because 0009 exists. `MIGRATION_APPLIED=NO` and
`TEST_DB_MUTATED=NO`; no migration, deployment, or production mutation was
performed. Frontend remains unchanged on its pinned main SHA. This evidence
stops at external review and fresh owner authorization for any future Neon
TEST application.
