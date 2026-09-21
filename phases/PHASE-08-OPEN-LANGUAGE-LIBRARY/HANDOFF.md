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
- Review states are exactly `DRAFT`, `COMMUNITY_REVIEW`, `VERIFIED`, and
  `REJECTED`. Submission, reviewer verification/rejection, and verified-item
  invalidation are explicit transitions in an append-only audit table. No
  `IMPORTED_UNREVIEWED` state is needed because Phase 08A performs no import.
- Public projection is fail-closed: only public, active, verified resources
  with active licenses and provenance are returned. Review notes and private
  contributor IDs are excluded.
- Quality scoring is intentionally deferred: no scoring policy or authority
  exists in Phase 08A, so no ungrounded score is stored or exposed.

## Compatibility and boundaries

Phase 06 candidate provenance retains source post ID, source response ID,
candidate ID, acceptance ID, and an internal contributor reference. Phase 08A
does not consume or promote candidates and does not treat asker acceptance as
verification.

Migration `0009_open_language_library.sql` and its down migration were added,
but migration 0009 was not applied to Neon TEST, production, or any other
database. No frontend files were changed and nothing was deployed.

## Verification

- Focused library suite: 48 tests passed.
- Full backend unit suite: 178 tests passed.
- Backend e2e suite: 45 tests passed.
- Typecheck/lint/build passed.
- `npm audit --audit-level=high`: 0 vulnerabilities.
- Migration contract tests confirm migrations 0001–0008 remain byte-for-byte
  unchanged.

External review must approve the schema/API boundary and authorize a fresh
Neon TEST migration review before 0009 is applied. Keep Phase 08
`IN_PROGRESS`, Phase 09/10 blocked, and stop at
`NEXT_ACTION=STOP_FOR_EXTERNAL_REVIEW`.
