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

Local feature heads are Backend `62a48bf49291dd57daa8feb85cbac31694380e0b`,
Frontend `85fb969e43c54c53780376842fcfac36dd5881bc`, and the Workspace
evidence branch is pending its final local acceptance commit. Publication of
the 09D Backend, Frontend, and final Workspace feature heads requires one
grouped explicit authorization; no merge or deployment was attempted.
