# DEC-015 — Phase 09B learner context and prompt contracts

## Status

Accepted for Phase 09B implementation on 2026-09-30.

## Context

`LNG-09-002` depends on the provider-neutral 09A boundary and the existing
Phase 03 profile model. Later AI modes need a stable target-language,
proficiency and goal contract without copying a profile entity into prompts,
leaking private metadata, or allowing learner text to become privileged
instructions.

## Decision

The Backend exposes pure, versioned contracts:

- `ai.learner-context.v1` projects one explicit active learning target,
  target code/name, declared and assessed proficiency with an explicit source,
  and normalized learning goals. Profile IDs, account data, interests,
  schedule, visibility metadata and raw entities are excluded.
- `ai.prompt.v1` maps the supported modes to a response format, structured
  output kind and capability requirements. The system message contains only
  static contract instructions and validated enum metadata. Learner context
  and user input are serialized as a bounded JSON envelope in the `user`
  message and are explicitly untrusted data.
- `ai.output.v1` validates bounded, exact-key JSON shapes for writing
  corrections, grammar coaching and quiz material before a later mode may
  persist or render them.

Missing optional goals and context are represented explicitly. Missing or
ambiguous targets, malformed profile values, invalid modes, oversized input,
mutated context and malformed model output fail closed with safe contract
errors. The prompt builder returns the existing 09A `AiCompletionInput`
shape and uses a deterministic conservative token estimate without selecting
or calling a provider.

## Alternatives considered

### Serialize the full profile/entity graph

Rejected because it leaks unnecessary identifiers and private profile fields,
creates an unstable provider-facing representation, and widens the prompt
injection surface.

### Put learner context in the system message

Rejected because profile goals, learner input and retrieved/user text are data,
not privileged instructions. Keeping the system message static makes the role
boundary auditable and testable.

### Accept arbitrary JSON from a model and let each mode render it

Rejected because malformed or unexpected fields could reach persistence or
rendering. The versioned exact-key validators establish a fail-closed boundary
for later writing, grammar and quiz modes.

## Consequences

09C and 09D can consume one provider-neutral prompt boundary without
duplicating learner-domain logic. 09E can add provenance-aware context as a
separate allowlisted contract rather than widening this profile projection.
The current slice creates no route, provider credential, database schema,
frontend surface or live-provider evidence; those remain later-scope gates.
