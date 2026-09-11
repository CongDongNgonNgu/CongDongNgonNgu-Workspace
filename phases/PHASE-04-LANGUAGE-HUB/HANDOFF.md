# Phase 04 Handoff

**Phase status:** IN_PROGRESS

## Phase 04A status

- LNG-04-001: DONE. Backend catalog discovery, canonical slug resolution
  and frontend explorer/routing integration are complete and verified.
- LNG-04-002: DONE for the backend contract. Every active language uses the
  same overview response.
- LNG-04-006: DONE. Backend query semantics and frontend filter controls
  with URL integration are complete and verified.
- LNG-04-003: DONE. The reusable Hub header, section shell, filters and
  truthful future-section states are complete and verified.
- LNG-04-004, LNG-04-005 and LNG-04-007 remain PLANNED.
- Phase 04B owner visual acceptance was recorded for the four canonical
  Stitch screens; Phase 04 remains IN_PROGRESS.

## Backend contracts

Published Slice 1 baseline:

- GET /api/v1/languages
- GET /api/v1/languages/:slug
- Active-language discovery/search is bounded, Unicode-normalized,
  case-insensitive and deterministic.
- Valid active slugs resolve to canonical catalog data. Unknown, inactive and
  malformed slugs return LANGUAGE_NOT_FOUND, LANGUAGE_INACTIVE and
  LANGUAGE_INVALID_SLUG respectively.

Slice 2 overview:

- GET /api/v1/languages/:slug/overview
- The response contains active language identity, SEO metadata, typed metric
  states, section capability/status metadata and filter metadata.
- learnerCount, contributorCount and resourceCount are
  NOT_AVAILABLE_YET with null values until real data exists. No invented
  counts, resource records or Phase 05/08 tables were added.
- Overview is AVAILABLE and navigable. Vocabulary, Grammar, Sentences,
  Pronunciation, Resources, Community, Questions, Practice and Exchange are
  NOT_IMPLEMENTED, non-navigable and have null href values.

Slice 3 filter semantics:

- Optional level query values accept repeated or comma-separated A1, A2, B1,
  B2, C1 and C2 values. Values are normalized, deduplicated and returned in
  stable A1-to-C2 order.
- Blank level selection is not required. Blank topics are treated as absent.
- Topics are Unicode-normalized, trimmed, lowercased and converted to stable
  hyphenated values. Unknown but syntactically valid topics are echoed with
  NOT_AVAILABLE_YET because no resource data exists.
- Invalid levels and malformed topics return HTTP 400 with
  LANGUAGE_INVALID_LEVEL and LANGUAGE_INVALID_TOPIC.

## Verification evidence

Backend local commits:

- Slice 1 baseline: c7c23fd6700337b9c0ec02accc80b74dd8d20d0a
- Slice 2 overview: 5c95655
- Slice 3 filters: c8455a2
- Backend remote HEAD before these local slices: 3f0144b8270ad314e4e9553201d4ca03bdad589b

At the completed Slice 3 checkpoint:

- Unit: 9 suites, 51 tests passed.
- E2E: 4 suites, 17 tests passed.
- Typecheck passed.
- Lint passed.
- Build passed.
- npm audit --audit-level=high: 0 vulnerabilities.
- Frontend changed: NO.
- Deployment: NO.
- Google OAuth changed: NO.

Phase 04A backend Slice 1–3 commits and the prior Workspace evidence update
are already published at their recorded remote checkpoints. Owner-accepted
Phase 04B commits are Frontend `f6a25e3` and Workspace `af35970`; the
Workspace reconciliation/evidence commit is local and contains no application
code. Backend remains unchanged; no deployment or Phase 04C/05 work is included.

Phase 04 remains IN_PROGRESS. Owner visual acceptance for Phase 04B is recorded;
LNG-04-004, LNG-04-005 and LNG-04-007 remain PLANNED. Phase 04C/05 was not started.
