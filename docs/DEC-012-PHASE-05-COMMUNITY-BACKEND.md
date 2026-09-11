# DEC-012 — Phase 05A community backend foundation

Status: Accepted for local Phase 05A implementation on 2026-09-11.

## Context

Phase 05 needs a moderation-ready community foundation without coupling the
first release to Phase 06 correction/QA semantics or beginning the frontend
composer/feed work. The existing backend already owns authentication,
identity, the active language catalog, validation and CSRF boundaries.

## Decision

Use one normalized community schema and service contract:

- community_posts stores the eight launch post types, active target language,
  optional CEFR/topic metadata, plain text content, visibility, moderation
  state and soft-delete audit data.
- community_comments stores one top-level level plus one reply level.
  Deleted parents are represented as placeholders when replies remain.
- Reactions use explicit add/remove operations and a composite uniqueness key.
- Saves are private to the authenticated viewer. Share links are canonical
  paths for active public posts only.
- Reports use a generic submitted response and never expose inaccessible
  target or reporter/moderation data.
- Feed pagination uses an opaque cursor over (created_at DESC, id DESC);
  the Phase 05A feed primitive is deterministic recency plus optional
  language filtering, not opaque personalized ranking.
- Rate controls are process-local for this local phase and must be replaced
  with shared infrastructure before horizontal production scaling.

## Consequences

The API and migration are reusable by the later UI and learning-specific
extensions without duplicate post schemas. Public projections remain safe by
default, and moderation/visibility state is not client-controlled. The local
rate limiter and unexecuted migration against a live database remain explicit
verification/deployment gates. Stitch work, Phase 05B and Phase 06 are
separate follow-up scope.
