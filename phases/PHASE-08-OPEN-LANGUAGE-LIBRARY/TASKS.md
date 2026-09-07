# Phase 08 Tasks

## LNG-08-001 — Provenance & License Model
**Status:** PLANNED  
**Depends on:** Phase 05 and docs/04-DATA-LICENSING.md

Define reusable provenance: source type/ID/URL, license reference, attribution, original contributor, import batch/transformation metadata, review status, quality score and audit timestamps. Preserve multiple sources if dedup merges equivalent resources. Create a license registry/config rather than free-text license chaos.

## LNG-08-002 — Core Resource Schema & Review Lifecycle
**Depends on:** LNG-08-001

Model resource families with shared language/level/topic/provenance metadata and type-specific fields. Baseline states: draft, community_review, verified, rejected; add imported_unreviewed only with documented rationale. Verification permissions are explicit and reversible/auditable.

## LNG-08-003 — Library Search & Filtering
**Depends on:** LNG-08-002

Backend supports language, type, keyword, topic, level and review-state filtering (public exposes only allowed states). Use scalable pagination/indexing for expected corpus size. Frontend uses Stitch for knowledge explorer, filters, result types, attribution and empty/loading/error states.

## LNG-08-004 — Community Contribution Flow
**Depends on:** LNG-08-002

Allow users to contribute sentence, translation, vocabulary/definition/usage note and other approved types. Submission UX must show reuse/licensing/attribution expectations before publish. Contributions enter review, not verified state. Emit contribution events for Phase 10.

## LNG-08-005 — Review & Verification Workflow
**Depends on:** LNG-08-002, LNG-08-004

Create reviewer queue, approve/reject/request-change if needed, evidence/notes and conflict handling. Prevent submitter from unilaterally verifying their own item unless explicit role/policy later permits with separate audit. Moderated/deleted sources can invalidate/promote review state appropriately.

## LNG-08-006 — Tatoeba Adapter
**Depends on:** LNG-08-001, LNG-08-002

Before code, re-check current Tatoeba download/license/attribution requirements from authoritative source. If compatible, implement bounded importer preserving source IDs, languages, sentence/translation relationships, attribution/license and import batch; validate encoding and deduplicate idempotently. If current terms are incompatible/unclear, mark BLOCKED_EXTERNAL and do not ingest.

## LNG-08-007 — Correction/Q&A Candidate Integration
**Depends on:** Phase 06, LNG-08-005

Consume provenance-aware candidates from Phase 06 and send them through review. Preserve source post/correction contributor links subject to visibility/privacy policy. Never treat accepted-by-asker as verified automatically.

## LNG-08-008 — Library Reconciliation
**Depends on:** LNG-08-001..007 as applicable

Test provenance preservation, duplicate imports, review permissions, public visibility, search/filter, contribution consent and source invalidation. Complete responsive/a11y/visual tests, commits/CI and handoff.
