# Phase 04 Handoff

**Phase status:** IN_PROGRESS

## Phase 04A status

- LNG-04-001: VERIFYING. Backend catalog discovery and canonical slug
  resolution are complete; frontend explorer/routing integration is
  implemented and locally verified.
- LNG-04-002: DONE for the backend contract. Every active language uses the
  same overview response.
- LNG-04-006: VERIFYING. Backend query semantics are complete; frontend
  filter controls and URL integration are implemented and locally verified.
- LNG-04-003: VERIFYING. The reusable Hub header, section shell, filters and
  truthful future-section states are implemented and locally verified.
- LNG-04-004, LNG-04-005 and LNG-04-007 remain PLANNED.
- Phase 04B local implementation and verification are complete; owner visual
  acceptance remains outstanding.

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
are already published at their recorded remote checkpoints. This Phase 04B
frontend and evidence work remains local in its source repositories until its
separate local commits are handed off; no push or deployment was performed in
this task.

Phase 04 remains IN_PROGRESS and is not accepted or DONE because owner visual
acceptance has not occurred. Phase 04C/05 was not started.
