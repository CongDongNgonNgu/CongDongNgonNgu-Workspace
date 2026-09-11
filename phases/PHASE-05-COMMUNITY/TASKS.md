# Phase 05 Tasks

## LNG-05-001 — Community Data Model
**Status:** DONE (Phase 05A backend)
**Depends on:** Phase 04

Model posts, comments/replies, reactions, tags, saved posts and reports with author, target language, optional CEFR/topic metadata, post type, moderation state, timestamps and soft-delete/audit strategy. Avoid coupling corrections/QA deeply before Phase 06; expose extension points.

## LNG-05-002 — Post CRUD & Composer
**Status:** VERIFYING (backend complete; composer remains Phase 05B)
**Depends on:** LNG-05-001

Backend: validated create/read/update/delete with ownership/admin hooks, content length/media rules and stable pagination. Frontend: use Stitch for composer and creation flows; choose post type, language, optional level/topic and content. Draft/retry states must not double-submit. Sanitize/render user content safely.

## LNG-05-003 — Comments, Replies & Reactions
**Status:** VERIFYING (backend complete)
**Depends on:** LNG-05-001, LNG-05-002

Implement bounded threading strategy, author permissions, reaction idempotency/toggle behavior and deleted-parent presentation. Prevent reaction/comment spam with rate controls. Ensure counts reconcile after deletion/moderation.

## LNG-05-004 — Feed V1
**Status:** PLANNED (deterministic backend primitive only)
**Depends on:** LNG-05-002, LNG-05-003, Phase 03 profile

Feed signals: learner languages, post language, usefulness and recency. Document deterministic baseline; do not optimize for compulsive engagement. Support following/global/language contexts only if justified by real scope. Pagination must not duplicate/drop items under normal use.

## LNG-05-005 — Save, Share & Report
**Status:** VERIFYING (backend complete)
**Depends on:** LNG-05-002

Saved posts remain private. Share uses safe canonical links without leaking private content. Report captures category/reason and creates moderation-ready state; users cannot use report API to inspect other reports.

## LNG-05-006 — Community UI Surfaces
**Status:** PLANNED
**Depends on:** LNG-05-002..005

Use Stitch for feed, post card/list presentation, detail, comment thread and contextual right rail/filters. Mobile should prioritize readable content and composer access rather than stacking three desktop columns. Include empty/loading/error/moderated/deleted states.

## LNG-05-007 — Abuse, Authorization & Reconciliation
**Status:** PLANNED (backend negative-path coverage started)
**Depends on:** LNG-05-001..006

Test ID tampering, blocked/deleted users if available, ownership, spam/rate boundaries, XSS rendering, duplicate reactions, pagination and report privacy. Run responsive/a11y/visual gates, push commits and update handoff.
