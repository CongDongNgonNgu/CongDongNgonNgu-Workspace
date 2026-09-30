# DEC-017 — Phase 09D structured writing and grammar coaching

## Status

Accepted for Phase 09D implementation, validation, and feature-branch
publication on 2026-09-30.

## Context

`LNG-09-004` and `LNG-09-005` require one provider-neutral coaching boundary
for writing correction and grammar practice. Learner writing is untrusted
content, the original submission must remain visible, and malformed provider
output must never be presented as a successful coaching result. The scope
does not authorize persistence, a database migration, provider credentials,
or live AI calls.

## Decision

The Backend exposes stateless writing and grammar coaching endpoints over the
existing 09A/09B runtime and prompt contracts. Requests are normalized with
typed target-language, learner-context, task/focus, explanation-language and
correction-style boundaries. Only the allowlisted learner-context projection
is serialized into the provider-neutral user envelope, and learner writing is
explicitly data rather than an instruction.

Writing responses must validate the `WRITING_CORRECTION` schema containing the
original segment, corrected segment, explanation and optional natural
alternative. Grammar responses must validate the `GRAMMAR_COACHING` schema
containing explanation, examples and focused practice items. Structured output
validation occurs before usage is settled as successful; invalid, timed-out,
quota-rejected, rate-limited, or unavailable-provider requests fail closed.

The Frontend uses one responsive `AiCoachingWorkspace` for writing and grammar
routes. It preserves the original text, labels generated suggestions, renders
the existing accessible diff pattern, keeps practice answers hidden until
requested, and maps provider/quota/invalid-output failures to retryable safe
states. Provider secrets never enter the browser, and no coaching result is
persisted automatically.

## Alternatives considered

### Free-form provider prose

Rejected because correction and practice rendering need deterministic,
validated fields and invalid output must fail closed.

### A second provider-specific execution path

Rejected because 09D must reuse the accepted 09A adapter, timeout/retry,
quota/rate-limit and usage boundaries.

### Immediate coaching persistence

Rejected because the scope is stateless and does not authorize a schema
change; a future Library save must remain a reviewed learner action.

### Live provider verification

Rejected because no provider credential, paid account, or live runtime cost was
authorized. Deterministic tests and the disabled-provider path are used.

## Evidence

- Stitch project: `3718538619973058970`
- Design system: `16442026920550574436`
- Desktop reference: `824e090fa88d4500b7ecb7a6662ce8cb`
- Mobile reference: `eaf04583f82648fda5c8453985f8a9bf`
- Backend published head: `62a48bf49291dd57daa8feb85cbac31694380e0b`
- Frontend published head: `85fb969e43c54c53780376842fcfac36dd5881bc`
- Workspace published head: `e08891a96e85bc6455fb8ef4186252898a3849e7`

## Consequences

09E can consume the same structured-output and usage boundaries without
introducing a second AI path. Reviewed Library persistence, provenance-aware
retrieval, cost reconciliation and live provider configuration remain outside
09D and require their own authoritative scope.
