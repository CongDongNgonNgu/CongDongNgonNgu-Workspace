# Phase 08A — Open Language Library Foundation Plan

## Scope

Implement only `LNG-08-001` (provenance and license model) and
`LNG-08-002` (shared resource schema and review lifecycle). Search/filter,
community contribution UX, reviewer UI, external imports, Phase 06 candidate
consumption, AI, reputation, moderation dashboard, deployment, and database
application are out of scope.

## Baseline

The backend, frontend, and workspace started from the pinned clean `main`
commits in the goal objective. Backend and Workspace work on the temporary
branch `phase-08a-library-foundation`; the frontend remains unchanged on
`main`.

## Architecture decisions

1. Use one shared `library_resources` row for identity, language/level/topic,
   ownership, visibility, moderation, and current review state.
2. Use a discriminated resource type enum and separate type-specific tables
   for the ten Phase 08 families. This keeps required fields constrained
   without a giant nullable content table.
3. Keep license records normalized in `library_licenses`. Provenance rows
   reference a license key by foreign key; resources cannot silently use
   uncontrolled license text.
4. Store every origin in `library_resource_provenance`. The uniqueness scope
   is `(resource_id, source_type, source_id)`, so merging equivalent content
   never replaces distinct origins or attribution. Phase 06 source post,
   response, candidate, and acceptance references remain typed nullable links.
5. Keep the review lifecycle to `DRAFT`, `COMMUNITY_REVIEW`, `VERIFIED`, and
   `REJECTED`. `VERIFIED → REJECTED` is the explicit invalidation path and is
   recorded in an append-only review audit table. No `IMPORTED_UNREVIEWED`
   state is needed because 08A performs no imports.
6. Public projection is fail-closed: only public, active, verified resources
   are projected, and internal review notes/private contributor IDs are not
   included.
7. Mutating service calls receive an actor derived by the authenticated
   controller. Reviewer transitions additionally require `MODERATOR` or
   `ADMIN`; the service repeats the self-verification and role checks so the
   domain boundary is not controller-only.

## Ordered slices

### Slice 1 — Contract and schema

- Add library types, discriminated inputs, bounded Unicode-safe normalization,
  lifecycle transition rules, public projection, and provenance merge helper.
- Add migration `0009_open_language_library.sql` and matching down migration.
- Add migration contract tests, including checks that migrations `0001`–`0008`
  remain unchanged.

### Slice 2 — Domain persistence behavior

- Add the repository contract, deterministic in-memory repository, and service
  for license lookup, draft creation, provenance attachment/merge, review
  transitions, invalidation, and public-safe projection.
- Add focused tests for all ten resource families, required fields, license
  validation, multiple sources, dedup preservation, lifecycle authorization,
  privacy, and Vietnamese/CJK text.

### Slice 3 — Bounded backend wiring

- Add the Postgres repository, module registration, DTOs, and narrow routes for
  draft creation, provenance attachment, review transition, license lookup,
  and public resource projection.
- Keep APIs limited to the foundation contract; do not add search/import or
  candidate-promotion routes.

### Slice 4 — Evidence and reconciliation

- Run focused/full backend verification, typecheck, lint, build, audit, and
  diff checks where the environment permits.
- Update Phase 08 state, stale handoff status, and evidence with observed
  results, migration boundary, compatibility decisions, and final SHAs.
- Leave Phase 08 `IN_PROGRESS`, keep Phase 09/10 blocked, and stop for
  external review without applying migration 0009 or deploying.

## Checkpoints

- After Slice 1: migration contract and pure lifecycle tests pass.
- After Slice 2: all in-memory domain tests and backend typecheck pass.
- After Slice 3: backend unit/e2e/build/audit gates are run and the final diff
  is security/review checked.

## Risks and mitigations

| Risk | Mitigation |
| --- | --- |
| License terms are not yet authoritative for an external dataset | Store only registry metadata and require an active referenced license; add no importer or legal assumption. |
| Deduplication loses source attribution | Keep provenance rows additive and reject conflicting duplicate source keys rather than overwrite. |
| Self-verification or private notes leak through APIs | Enforce reviewer roles and actor checks in the service; centralize public projection and test it. |
| Phase 06 candidate schema is duplicated or mismatched | Preserve typed candidate/source references and keep consumption/promote logic out of 08A. |

## External gates

`MIGRATION_REQUIRED=YES` if 0009 is created. It must not be applied to Neon
TEST or production in this phase. Final state remains
`NEXT_ACTION=STOP_FOR_EXTERNAL_REVIEW`.
