# Phase 08C1B — Phase 06 Source Health and Review Reconciliation

Status: VERIFYING

## Boundary

- Backend only; Frontend remains at `a46194853b4da7cfa8d41d6e155f92ab908c4ff4`.
- Continue from the accepted 08C1A Backend SHA `82e3f66b88232e64ef71dc68d8a1c5f63a115257`.
- Neon TEST, production, deployment, reviewer UI, candidate consumption, and Phase 10 remain out of scope.

## Implementation slices

1. Establish a reusable Phase 06 source-health evaluator over the existing candidate/post/response/acceptance truth.
2. Re-check current Phase 06 source health for public detail/search and reviewer projections.
3. Add reviewer-only invalid-source discovery with bounded cursor pagination.
4. Add transactional VERIFY source locking/revalidation and dedicated VERIFIED → COMMUNITY_REVIEW / INVALIDATE reconciliation.
5. Add atomicity, race, stale-observation, idempotency, privacy, authorization, and non-Phase06 regression tests.
6. Run Backend focused/full gates, preserve frozen migrations, and record evidence.

## Contract decisions

- Source validity is observed from Phase 06’s existing candidate relationship; Library does not mutate candidates, responses, acceptances, or parent posts.
- One invalid Phase 06 provenance entry fails public exposure and verification.
- `LIBRARY_SOURCE_STILL_VALID` is a deterministic 409 when a stale invalid-source observation is reconciled after recovery.
- Reconciliation writes a normal `INVALIDATE` review audit as the authenticated reviewer; it does not create a system actor or invalidation event table.
- Request Changes, candidate ingestion, source workers, Phase 10 points, and UI remain deferred.

## Migration decision

Expected `MIGRATION_REQUIRED=NO`: existing Phase 06 references, 0009 provenance/review-audit objects, and the frozen review ordering index are sufficient. Migration files 0001–0011 remain unchanged and no migration is applied.
