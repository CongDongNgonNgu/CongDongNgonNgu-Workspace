# DEC-019 - Phase 09F safety, cost and non-destructive reconciliation

Status: accepted for Phase 09F / LNG-09-008, 2026-09-30.

## Context

Phase 09 already has one provider-neutral runtime for conversation, roleplay,
writing, grammar and Library learning. The final safety slice must verify that
untrusted content cannot become privileged instructions, malformed provider
output cannot become a successful result, and usage/cost facts remain bounded,
privacy-safe and auditable without inventing a billing or persistence system.

## Decision

- Runtime errors are normalized to stable safe codes and generic messages;
  provider identifiers, provider messages, stack details and policy internals
  never cross the runtime boundary.
- Known pricing is represented as non-negative finite USD per million tokens
  and deterministic six-decimal USD estimates. Missing pricing remains explicit
  `null` (unknown); invalid pricing or token values fail closed with
  `AI_COST_UNAVAILABLE`.
- A pure `ai.usage.reconciliation.v1` helper audits bounded usage records for
  duplicate request identities, invalid attempts/tokens/costs, non-success
  charges, missing error codes and invalid timestamps. It returns issue codes
  without returning record payloads, mutating records, repairing facts or
  persisting anything.
- Retry attempts continue to use one request identity, one quota reservation
  and one terminal usage record. Reconciliation identifies any duplicate
  terminal records rather than silently rewriting them.
- No provider, credential, billing/payment behavior, database schema, migration,
  frontend secret, production write or live AI call is introduced by 09F.

## Consequences

The existing 09A-09E execution path remains the only AI path and can be tested
with deterministic adapters. Unknown pricing is visible to callers and can be
resolved by a future approved pricing policy; it is never silently represented
as zero. Any repair or financial correction remains a reviewed future action,
because this phase has no authorized durable usage store or destructive repair
boundary.
