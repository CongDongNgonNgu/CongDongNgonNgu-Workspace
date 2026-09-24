# Phase 08C1A Implementation Plan - Reviewer Backend Read Model

Date: 2026-09-24
Slice: `LNG-08-005`
Status: `VERIFYING`

## Scope

Implement the backend foundation for authorized Library review: a bounded
pending queue, a privacy-safe reviewer detail projection, atomic VERIFY and
REJECT actions, deterministic conflicts, and audit/history exposure. Reviewer
UI, Request Changes, source invalidation, imports, Phase 06 candidate
consumption, Phase 10 points, Neon TEST mutation, and deployment remain out of
scope.

## Contract decisions

- Queue: `GET /api/v1/library/reviews`, authenticated `MODERATOR`/`ADMIN`
  only; default state is `COMMUNITY_REVIEW`.
- Queue filters are limited to `language`, `type`, `q`, `cursor`, and bounded
  `limit`. Ordering is deterministic `updated_at ASC, id ASC`, using the
  existing `library_resources_review_idx`.
- Detail: `GET /api/v1/library/reviews/:resourceId`, with canonical content,
  review/moderation/visibility state, provenance revision, safe provenance
  and current license summaries, audit history, and contribution-event
  summary. Email, password/session data, source notes, importer internals,
  and unrelated moderation notes are excluded.
- Actions reuse `POST /api/v1/library/resources/:resourceId/review`.
  `COMMUNITY_REVIEW -> VERIFIED` and `COMMUNITY_REVIEW -> REJECTED` are the
  queue actions. Reject requires a note. Existing INVALIDATE/REOPEN behavior
  remains available through the established lifecycle.
- A creator cannot verify their own resource, even with `MODERATOR` or
  `ADMIN`; the safe domain error is `LIBRARY_SELF_VERIFICATION_DENIED` (403).
- VERIFY locks the resource, current provenance, and applicable license rows
  in the same PostgreSQL transaction as the state update, audit insert, and
  response hydration. PUBLIC verification requires active licenses with
  `redistribution_allowed IS TRUE` and ACTIVE moderation. REJECT does not
  require public-license eligibility.
- First committed concurrent action wins. A stale state/revision boundary
  returns `LIBRARY_REVIEW_CONFLICT` (409). No Request Changes state is added:
  `REQUEST_CHANGES=NOT_IMPLEMENTED_BY_DESIGN`.
- Final response hydration occurs before COMMIT; reviewer transitions perform
  zero response-essential reads after COMMIT.
- No migration is required. The existing 0009 review index covers the bounded
  default queue ordering and all existing migrations 0001-0011 remain frozen.

## Ordered tasks

### Task 1: Reconcile state and define typed contracts

- [x] Mark 08B2A historical state explicitly.
- [x] Set `LNG_08_004=DONE` and `LNG_08_005=VERIFYING` in active Workspace
  state and task tracking.
- [x] Add queue/detail input and output types and DTO boundary validation.

### Task 2: Add reviewer read model

- [x] Add deterministic in-memory and PostgreSQL queue queries.
- [x] Add reviewer detail projection with safe current license status,
  eligibility, audit history, and contribution summary.
- [x] Add reviewer-only controller routes and authorization tests.

### Task 3: Make review actions atomic

- [x] Move decisive VERIFY eligibility checks into the transaction.
- [x] Lock current license rows with `FOR SHARE`.
- [x] Hydrate before COMMIT for VERIFY and REJECT.
- [x] Preserve self-verification, note, existing lifecycle, and conflict
  semantics.

### Task 4: Verify and document

- [x] Add service, repository, and HTTP E2E coverage for queue/detail,
  privacy, filters, authorization, self-verification, eligibility failures,
  rollback, hydration, and concurrent conflict behavior.
- [x] Run focused/full tests, typecheck, lint, build, audit, and diff check.
- [x] Update `PHASE-08C1A-IMPLEMENTATION.md`, commit, push, and verify the
  review branch. Do not merge main or mutate Neon TEST.

## Checkpoints

- After Tasks 1-2: queue/detail contracts compile and reviewer authorization
  tests pass.
- After Task 3: repository transaction tests prove license locking,
  pre-commit hydration, and rollback.
- Before handoff: all backend gates pass; Frontend SHA remains unchanged;
  Workspace state remains `LNG_08_005=VERIFYING`.

## Risks and mitigations

| Risk | Impact | Mitigation |
| --- | --- | --- |
| License policy changes during VERIFY | Publicly unsafe verification | Lock current license rows with `FOR SHARE` inside the transaction. |
| Post-commit hydration failure | Client sees failure after committed state | Hydrate through the transaction client before COMMIT. |
| Stale reviewer action | Conflicting audit facts | Lock resource and check review state plus provenance revision. |
| Reviewer detail leaks private metadata | Privacy breach | Use an explicit projection; never return raw license/user records. |
| Queue query grows into admin search | Unbounded/unsafe contract | Keep only five bounded filters and fixed ordering. |
