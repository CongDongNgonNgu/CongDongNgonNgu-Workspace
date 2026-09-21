# Phase 08 Handoff

**Phase status:** IN_PROGRESS

Phase 08A implements only `LNG-08-001` (provenance and license model) and
`LNG-08-002` (core resource schema and review lifecycle). The phase is not
complete: search, contribution UX, reviewer UI, importer work, Phase 06
candidate consumption, reputation, moderation UI, and deployment remain
planned.

## Implemented foundation

- `library_licenses` is a normalized registry with stable keys, canonical
  URLs, attribution and redistribution flags, derivative constraints, active
  state, and internal source-note metadata.
- `library_resources` owns the canonical ID, resource family, language/level,
  topics, creator boundary, visibility/moderation state, review state, and
  review timestamps.
- Ten resource families use type-specific tables: vocabulary, sentence,
  translation, grammar item, dialogue, idiom, slang, cultural note,
  pronunciation, and learning collection.
- `library_resource_provenance` stores additive source records with typed
  source post/response/candidate/acceptance references for future Phase 06
  integration. The uniqueness scope is resource + source type + source ID;
  conflicting duplicate attribution is rejected rather than overwritten.
- Member `ORIGINAL_AUTHOR` provenance is bound internally to the authenticated
  actor's user ID; a caller-supplied different contributor ID is rejected.
  Reviewer/admin source flows remain explicitly authorized, while the internal
  contributor ID is omitted from public projection.
- Review states are exactly `DRAFT`, `COMMUNITY_REVIEW`, `VERIFIED`, and
  `REJECTED`. Submission, reviewer verification/rejection, verified-item
  invalidation, and reviewer-only `REOPEN` are explicit transitions in an
  append-only audit table. Provenance is creator-editable only in `DRAFT`,
  reviewer-correctable while remaining in `COMMUNITY_REVIEW`, and immutable
  after verification or rejection until `REOPEN` returns the resource to
  `DRAFT`. `REOPEN` requires a reviewer, an audit note, and clears review
  metadata; it never makes content public automatically. No
  `IMPORTED_UNREVIEWED` state is needed because Phase 08A performs no import.
- `library_resources.provenance_revision` is an internal non-negative revision
  used with expected review state for provenance mutations and every review
  transition. Migration 0009 also adds a parent-row-locking provenance trigger
  that rejects mutation in `VERIFIED`/`REJECTED`, prevents resource moves, and
  increments the revision atomically. Stale mutations and reviews return a
  deterministic review conflict; reviewers must reload after a provenance
  correction. The creator remains frozen during `COMMUNITY_REVIEW` even when
  holding a moderator/admin role.
- Public projection is fail-closed: only public, active, verified resources
  with non-empty provenance whose every current registry license is both
  `active=true` and explicitly `redistributionAllowed=true` are returned.
  License registry changes are re-evaluated at verification and public-read
  time. Review notes, reviewer identity, moderation state, contributor IDs,
  import batches, and transformation history are excluded from the public
  projection; only safe source/license/attribution fields remain.
- Quality scoring is intentionally deferred: no scoring policy or authority
  exists in Phase 08A, so no ungrounded score is stored or exposed.

## Compatibility and boundaries

Phase 06 candidate provenance retains source post ID, source response ID,
candidate ID, acceptance ID, and an internal contributor reference. A normal
`MEMBER` may attach only `ORIGINAL_AUTHOR`; system/reviewer-owned source types
remain restricted in 08A. Phase 06 attachment requires the complete coherent
candidate/post/response/acceptance bundle, an active pending canonical
candidate, and matching source IDs. A 0009-owned database trigger and service
validation reject mismatches, unrelated Phase 06-only fields, and invalidated
candidates. Phase 08A does not consume or promote candidates and does not
treat asker acceptance as verification.

Migration `0009_open_language_library.sql` and its down migration contain the
review `REOPEN` action, Phase 06 source-coherence trigger, REOPEN-note
constraint, provenance revision column/check, and provenance mutation
state/revision guard. Migration 0009 was not applied to Neon TEST, production,
or any other database. No frontend files were changed and nothing was
deployed.

## Verification

- Focused library suite: 68 tests passed, including actor binding, creator-
  moderator freeze, revision conflicts, and deterministic provenance/review
  race coverage.
- Full backend unit suite: 199 tests passed.
- Backend e2e suite: 49 tests passed, including the new four-test library HTTP
  suite on the supported memory test runtime. Coverage includes session-bound
  actors, CSRF, source authority, owner/IDOR boundaries, submit/review/self-
  verification, public draft/rejected/safe-license behavior, privacy, and
  invalid mutation fields.
- Typecheck/lint/build passed.
- `npm audit --audit-level=high`: 0 vulnerabilities.
- Migration contract tests confirm migrations 0001–0008 remain byte-for-byte
  unchanged.

External review must approve the schema/API boundary and authorize a fresh
Neon TEST migration review before 0009 is applied. Keep Phase 08
`IN_PROGRESS`, Phase 09/10 blocked, and stop at
`NEXT_ACTION=STOP_FOR_EXTERNAL_REVIEW`.
