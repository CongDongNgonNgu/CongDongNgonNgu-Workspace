# DEC-030 — Phase 13E consent-aware post-room AI contract

**Status:** Accepted

**Scope:** Phase 13E / `LNG-13-007`

## Decision

Phase 13E ships a contract-only, fail-closed boundary for optional post-room
AI feedback. The production executor is disabled. Joining a room, speaking,
raising a hand, silence, chat participation, or a generic terms acceptance
never grants consent to record, transcribe, store, or process room media.

The only accepted future source shape is a separately authorized,
server-projected, single-participant text artifact. The current phase creates
no recorder, transcript store, post-room job, AI result store, or production
provider call.

## Consent and authority

- Consent is explicit, affirmative, purpose-specific, authenticated and
  server-authoritative for `POST_ROOM_AI_FEEDBACK`.
- A consent record is bound to the actor, room, participant, source artifact,
  policy version, grant time and optional revocation time. One participant
  cannot consent for another participant.
- Missing, foreign, future, revoked, malformed or mismatched consent is
  rejected. Revocation blocks future and queued work; it cannot claim to undo
  an already completed external disclosure.
- The browser is never authority for consent, recipient, source ownership,
  retention, result ownership or provider execution.

## Source, provider and result boundaries

The contract rejects ephemeral audio, room chat treated as a transcript,
private profile data, moderation reports, tokens, credentials and provider
internals. Source text is untrusted user content and is kept in the user
message boundary; system instructions are fixed by the application contract.

The provider interface is provider-neutral. Results are parsed into a bounded
summary, vocabulary suggestions, grammar observations and practice
suggestions DTO. Raw provider payloads, prompts containing room internals,
secrets and stack traces are not exposed.

The logical request identity includes the contract version, actor, room,
participant, source artifact, source digest, purpose, policy, consent identity
and grant time. Any future enabled executor must atomically claim that
identity and replay the same accepted result for an exact retry, while keeping
distinct consent grants distinct. The Phase 13E default executor fails closed
because no task-authorized durable store exists yet.

## Retention and safety

No artifact or AI result is created in this phase, so there is no hidden
retention or deletion path. Any future implementation must document bounded
retention and deletion before enabling storage, preserve cross-user isolation,
and pass the project privacy, authorization, error-sanitization and secret
handling gates. No migration was authorized or created in 13E; migrations
0012–0020 remain unchanged.

## Consequences

The Backend contract and tests can be reviewed independently of a media
provider or AI vendor. A future implementation must add an explicit task,
durable replay/idempotency design, source lifecycle, retention/deletion policy,
consent UI if applicable, and provider sandbox evidence before enabling any
real processing. Frontend and runtime behavior remain unchanged in Phase 13E.
