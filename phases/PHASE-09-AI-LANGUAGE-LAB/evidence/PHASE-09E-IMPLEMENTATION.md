# Phase 09E implementation evidence

Date: 2026-09-30
Subphase: `PHASE_09E`
Task: `LNG-09-007`
Status: locally complete; feature-branch publication requires explicit authorization.

## Scope reconciled

From permitted public/owned Library content, generate bounded vocabulary,
grammar notes, comprehension questions, a mini quiz and speaking prompts.
Retrieval uses the authoritative public Library projection and preserves source
identity, attribution and license linkage while excluding private, rejected,
draft, community-review, invalidated, quarantined or moderation-hidden content.
Generated material is stateless study assistance and never canonical Library
content.

## Implementation

- Backend added the protected `POST /api/v1/ai/learning/library` path and the
  provider-neutral `AiLearningService`.
- `LEARN_FROM_CONTENT` is validated with exact keys and bounded arrays/text;
  malformed output fails closed.
- `projectAiLearningSource` accepts one bounded public resource, validates
  target-language compatibility, source identity uniqueness, HTTP(S) source
  links, attribution and redistributable license linkage.
- Only allowlisted learner context and a bounded source projection reach the
  Phase 09A runtime. No raw profile/resource objects are serialized.
- No Library mutation, persistence, migration, license auto-registration or
  second retrieval/search path was introduced.
- Frontend adds the Library detail action/result panel with five typed study
  sections, verified-source/AI-generated separation, source links, anonymous,
  loading, quota/offline and retry states, and responsive/a11y-friendly markup.

## Validation observed

- Backend focused 09E + AI contract/runtime tests: 4 suites / 29 tests PASS.
- Backend full unit suite: 75 suites / 525 tests PASS.
- Backend E2E suite: 13 suites / 59 tests PASS.
- Frontend focused 09E + Library tests: 3 files / 12 tests PASS.
- Frontend full suite: 53 files / 236 tests PASS.
- Backend and Frontend typecheck, lint and build: PASS.
- Online `npm audit --omit=dev --audit-level=low`: 0 vulnerabilities in both
  repositories.
- Controlled deterministic service/runtime boundary tests: PASS;
  `LIVE_AI_PROVIDER_CALLS=0`.
- Local Vite browser smoke at the unauthenticated Library detail boundary:
  safe unavailable-resource state rendered, visible navigation/error retry,
  no provider data or secret exposure observed in the accessibility tree.
- Stitch references: desktop
  `b2eba5cedc6c494d9e2d4c06fecd8e02`; mobile
  `41ff35f0019648beac2408cfa8dfba9a`.

## Integrity review

Provider bypass, raw profile/resource leakage, source-role injection, unsafe
URLs, unbounded context, duplicate provenance, canonical mutation, invalid
output-as-success, usage bypass, direct community retrieval and 09F scope
creep were reviewed. No finding remained that required a code change.

## Repository state

- Backend local feature head: `1e5c15635a628d864c7c74847cff25ded779ccd`
- Frontend local feature head: `ae7ae39fbecc17014c74d0d788b2acd004b0e6e4`
- Workspace acceptance baseline before this evidence: `0d09df29a7adba00fb40b7740c1f318f724f0868`
- Database schema change: NO; migration: NO; test DB mutation: NO; production
  DB mutation: NO; deployment: NO; merge to main: NO.
- Publication is intentionally not claimed until the grouped user authorization
  for the three `phase-09e-learn-from-community-library` branches is received.
