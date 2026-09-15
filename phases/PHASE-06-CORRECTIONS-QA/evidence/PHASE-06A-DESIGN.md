# Phase 06A — Backend/Data Foundation Design

Status: IN_PROGRESS

This note records the Phase 06A contract before schema and implementation work.
It is limited to Backend/data foundation; Frontend and phases 06B–06D remain
out of scope.

## Domain decisions

1. community_posts remains the only parent aggregate. Correction requests
   and questions are real community_posts rows with the existing
   CORRECTION_REQUEST and QUESTION post types. No parallel post/feed,
   identity, language, or generic-comments tables are introduced.
2. community_correction_requests is a one-to-one extension keyed by the
   parent post id. It stores canonical original_text, bounded intent,
   optional context, and timestamps. Target language, CEFR, visibility, and
   moderation are inherited from the parent post rather than copied.
3. A question needs no extension table: the parent QUESTION post content is
   the question. Formal answers are represented in the common structured
   response table.
4. community_structured_responses is the formal-response aggregate. Its
   discriminated kind is CORRECTION_PROPOSAL or QA_ANSWER; correction
   responses store corrected_text, Q&A responses store answer_text, and
   both may store a plain-text explanation. Generic Community comments remain
   discussion and are never promoted automatically.
5. Correction original_text is immutable after creation. No revision model is
   added in 06A. The parent post content is display/context text; when no
   context is supplied it falls back to the source text only because Community
   requires non-empty visible content. The extension remains the only source
   for future diffs.
6. Acceptance is represented by a future-safe acceptance-history table with
   accepted_by_user_id, active/revoked timestamps, and a one-active-acceptance
   constraint per parent. It never uses a verified field and is not exposed or
   mutated by 06A APIs.
7. Structured helpful votes have a separate uniqueness boundary per
   (response_id, user_id), distinct from Community post reactions. 06A adds
   no voting behavior; self-vote and reconciliation rules remain for 06C/06D.
8. No event/outbox platform exists in the current Backend. 06A defines a
   typed contribution-event contract for future Phase 10 hooks but awards no
   points and persists no fabricated events.
9. Library provenance is preserved by the parent post id, correction extension
   id, structured response id, and response author id. No Library content or
   verified state is created in 06A.
10. Parent visibility/moderation is authoritative. Phase 06 reads first
    authorize the Community parent; private, hidden, deleted, inactive-language,
    or inactive-author parents are unavailable through the extension APIs.
    Structured hidden responses are omitted; deleted/inactive-author responses
    become content-free placeholders. Referential rows are retained with
    restrictive foreign keys for audit/provenance.

## Creation and API contract

- POST /api/v1/community/correction-requests creates a
  CORRECTION_REQUEST parent and its extension in one database transaction.
- GET /api/v1/community/correction-requests/:postId returns the authorized
  Community parent plus canonical original text, intent, and context.
- POST /api/v1/community/questions creates a QUESTION parent using the
  existing Community post model; no duplicate question content is stored.
- GET /api/v1/community/questions/:postId returns the authorized parent.
- POST /api/v1/community/posts/:postId/structured-responses creates either
  a correction proposal or formal Q&A answer after validating the parent kind.
- GET /api/v1/community/posts/:postId/structured-responses lists responses
  with versioned Community-style cursor pagination; a single response can be
  fetched at /api/v1/community/structured-responses/:responseId.

All mutations require the existing bearer/session authentication and preserve
the cookie-session CSRF check. Actor ids are derived from the authenticated
session. Structured self-response is rejected in 06A; requesters can still use
generic comments. Response editing/deletion is intentionally not exposed until
the acceptance/moderation policy is implemented, while lifecycle/timestamp
columns remain available for that later work.

## Text and validation policy

The canonical Phase 06 source/response text path normalizes only CRLF/CR to LF.
It preserves Unicode, case, internal whitespace, leading/trailing whitespace,
and meaningful diacritics; it does not apply NFKC or whitespace collapsing.
Whitespace-only values are rejected. Limits are Unicode code points:

- original text, question, corrected text, and answer: 20,000;
- context and explanation: 5,000;
- topic: 80;
- structured-response list page: 50.

Identical canonical original/corrected text is rejected as a no-op. XSS-looking
and SQL-looking values remain plain text; no pre-rendered HTML is stored or
returned.

## Persistence and safety

Migration 0004_corrections_qa.sql follows the existing checksum migration
runner; its down migration removes only Phase 06 objects. Primary/unique keys,
foreign keys, bounded checks, immutable-original trigger, parent/creation and
response lookup indexes, and restrictive deletion behavior are included.

The memory repository shares the existing Community repository instance so
Phase 06 parents remain visible to Community feed/detail/comments. The Postgres
repository performs correction parent + extension insertion in one transaction.
Rate controls reuse the existing process-local Community limiter for new Phase
06 write operations; HORIZONTAL_SCALE_RATE_LIMIT_BLOCKER=YES remains true.

## Deferred by scope

No diff algorithm/UI, frontend composer, response editing UI, vote/helpful UI,
acceptance UI, reputation scoring, Library candidate conversion, moderation
admin, production deployment, or production database access is part of 06A.

## Implementation slices

1. Contract slice: add bounded enums/types, text normalization, DTOs, the
   migration/down migration, repository contracts, and red/green unit tests.
2. Parent slice: add atomic correction/question creation, shared Community
   parent projection, and authenticated controller routes; verify feed/detail
   identity and rollback/uniqueness behavior.
3. Response slice: add structured correction/answer creation and reads with
   parent-kind, privacy, self-response, Unicode, no-op, and XSS coverage.
4. Gate slice: run migration status/apply/rerun against authorized Neon TEST,
   execute focused and full Backend gates, reconcile evidence/HANDOFF, commit,
   publish only after all authorized gates pass.
