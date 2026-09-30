# DEC-016 — Phase 09C conversation and configurable roleplay

## Status

Accepted for Phase 09C implementation on 2026-09-30.

## Context

`LNG-09-003` and `LNG-09-006` need one reusable learner-facing path for
conversation and roleplay. The path must consume the provider-neutral 09A/09B
contracts, keep session context bounded, preserve ownership, expose honest
outage and retry states, and avoid treating learner-controlled roleplay text as
privileged instructions. The initial eight roleplay scenarios must not become
eight duplicated pages.

## Decision

The Backend exposes a versioned `ai.conversation.v1` boundary with:

- one conversation aggregate for `conversation` and `roleplay` modes;
- exact-key, typed roleplay configuration for scenario, context, roles,
  proficiency, objective, tone, response style, goals and safe boundaries;
- normalized learner content with bounded turns, bounded prompt history and
  ownership checks on every session read or mutation;
- explicit `ACTIVE`, `ERROR` and `STOPPED` states, stable retry request IDs,
  provider-disabled/rate-limit error mapping, and feedback with
  `preciseScore: null` rather than fabricated scoring;
- an in-memory repository for this slice. No database schema change or
  migration is authorized until persistence scope is explicitly approved.

Conversation and roleplay values are serialized into the existing 09B
provider-neutral user envelope and marked as untrusted learner data. Provider
credentials remain backend-only and live provider calls remain disabled in
local validation.

The Frontend implements one `ConversationWorkspace` for both routes and all
initial scenarios. It uses the approved Stitch project/design system and
responsive desktop/mobile references, with accessible loading, empty, error,
offline, quota/rate-limit, stop, retry and explanation states. No provider key
or credential is stored in the browser.

## Alternatives considered

### Eight scenario-specific pages

Rejected because it duplicates interaction behavior and makes safety,
ownership, and accessibility fixes drift across scenarios.

### Client-defined system instructions

Rejected because custom context, roles and constraints are learner-controlled
content. The backend validates the shape and passes it only through the
untrusted prompt envelope.

### Live provider calls during this slice

Rejected because no provider, credential, paid account, or runtime cost was
authorized. The disabled-provider path is implemented and verified instead.

### Immediate database persistence

Rejected because the authoritative scope does not authorize a schema change;
the repository boundary keeps later persistence work explicit and reversible.

## Evidence

- Stitch project: `3718538619973058970`
- Desktop reference screen: `e47128db24324885b1f2adc1aecf2ba4`
- Mobile reference screen: `8edba24c3cc345b8ae6644853acd85d1`
- Desktop/mobile screenshots were generated from the existing Phase 09C
  design system `16442026920550574436`.

## Consequences

09D can reuse the same authenticated conversation boundary and frontend
workspace patterns without selecting a provider or widening profile data.
Persistent conversation history and live provider verification remain future
scope and require their own authorization gates.
