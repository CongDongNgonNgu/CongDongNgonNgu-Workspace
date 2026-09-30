# Phase 09 decomposition

Status: active planning baseline for the Phase 09 orchestrator.

The decomposition follows the authoritative task dependencies in `TASKS.md`
and the library provenance dependency in `state/DEPENDENCY-GRAPH.md`. It does
not select an AI provider, create credentials, or authorize a database
migration.

## PHASE_09A — Provider & Usage Foundation

- **Task IDs:** `LNG-09-001`
- **Scope:** Provider-neutral adapter and model-capability contracts; bounded
  timeout/retry/streaming contracts; disabled/misconfigured fail-closed
  behavior; token/cost usage accounting; per-user/entitlement quota and
  process-local rate-limit interfaces; privacy-safe usage metadata.
- **Dependencies:** Phase 08, Phase 02 identity contract.
- **Done criteria:** Backend contracts and runtime orchestration are covered
  by focused tests; no provider secret reaches a client; disabled providers
  fail closed; quota/rate-limit/retry/usage behavior is deterministic; no
  schema migration or live provider claim is introduced.

## PHASE_09B — Learner Context & Prompt Contracts

- **Task IDs:** `LNG-09-002`
- **Scope:** Versioned learner-context and mode prompt contracts, safe
  separation between user profile content and system instructions, and
  validated structured-output schemas.
- **Dependencies:** `09A`, Phase 03.
- **Done criteria:** Versioned contracts and boundary validation are tested
  across supported proficiency/context variants.

## PHASE_09C — Conversation & Configurable Roleplay

- **Task IDs:** `LNG-09-003`, `LNG-09-006`
- **Scope:** Conversation workspace and configurable roleplay scenarios,
  bounded session context, stop/retry/error/quota states, goals and feedback.
- **Dependencies:** `09A`, `09B`.
- **Done criteria:** One reusable conversation/roleplay path works across the
  initial scenarios with responsive, accessible Stitch-backed UI.

## PHASE_09D — Structured Writing & Grammar Coaching

- **Task IDs:** `LNG-09-004`, `LNG-09-005`
- **Scope:** Structured writing correction and grammar practice flows using
  validated model output and the approved correction presentation pattern.
- **Dependencies:** `09B`.
- **Done criteria:** Correction, explanation, natural alternative, and
  focused-practice outputs are validated and safely rendered.

## PHASE_09E — Provenance-Aware Learn from Community/Library

- **Task IDs:** `LNG-09-007`
- **Scope:** Authorized public/owned retrieval context, source IDs and
  attribution, generated learning material, and exclusion of private,
  rejected, blocked, or moderation-hidden content.
- **Dependencies:** Phase 08, Phase 05, `09A`, `09B`.
- **Done criteria:** Retrieval authorization/provenance tests pass and every
  generated result preserves the source boundary.

## PHASE_09F — Safety, Cost & Reconciliation

- **Task IDs:** `LNG-09-008`
- **Scope:** Prompt-injection, malformed-output, outage, timeout,
  rate/quota, retry-charge, privacy, cost reconciliation, responsive,
  accessibility, CI, and final phase evidence gates.
- **Dependencies:** `09A` through `09E`.
- **Done criteria:** Full Phase 09 acceptance is reconciled with observed
  evidence and all required commits/CI/runtime gates are complete.

## Current execution

`PHASE_09D` implementation, validation, review, controlled runtime boundary,
and acceptance reconciliation are complete locally for `LNG-09-004` and
`LNG-09-005`. The slice adds provider-neutral structured writing correction,
grammar explanations and focused practice, strict schema validation,
untrusted learner-content boundaries, bounded inputs, original-text
preservation, quota/rate/usage fail-closed integration, and a responsive
Stitch-backed frontend workspace. It uses no database schema change and made
zero live AI provider calls.

The published feature heads are Backend
`62a48bf49291dd57daa8feb85cbac31694380e0b`, Frontend
`85fb969e43c54c53780376842fcfac36dd5881bc`, and Workspace
`e08891a96e85bc6455fb8ef4186252898a3849e7`. Remote SHAs were verified after
the grouped publication authorization; no merge or deployment was attempted.
## 09E completion

`PHASE_09E` / `LNG-09-007` is complete and published on its feature branches.
The implementation consumes
only the authoritative public Library projection, preserves source IDs and
attribution inside a bounded untrusted provider context, validates current
license/provenance eligibility, returns five bounded structured study sections,
and exposes a source-aware Library detail action/result. Backend and Frontend
local heads are `1e5c15635a628d864c7c74847cff25ded779ccdf` and
`ae7ae39fbecc17014c74d0d788b2acd004b0e6e4`. No schema change, migration,
canonical mutation, live provider call, merge or deployment occurred.

The next projection is `PHASE_09F` / `LNG-09-008`; it must not start until the
09E mandatory relay returns the next prompt.

## 09F execution started

`PHASE_09F` / `LNG-09-008` was executed on the scoped
`phase-09f-safety-cost-reconciliation` branches. Phase 09 final readiness was
held until safety, cost, reconciliation, regression, evidence and the
publication gate were reconciled.

The 09F implementation and local acceptance cycle are now complete. The
provider-neutral runtime hardens bounded inputs, structured-output failure,
safe provider/policy error handling, token/cost validation and retry/quota
integrity. A bounded, pure `ai.usage.reconciliation.v1` report detects
duplicate identities and invalid usage facts without mutating or persisting
records. Before publication, Backend and Workspace changes were committed
locally and the final gate was intentionally held. No Phase 09 completion is
claimed here; the publication and final-gate projection follow below.

The grouped 09F Backend and Workspace feature branches are now published and
their remote heads are verified. Frontend had no 09F source changes and
remains at the accepted 09E head. Phase 09 is ready for the final gate only;
it is not marked DONE and no Phase 10 work has started.
