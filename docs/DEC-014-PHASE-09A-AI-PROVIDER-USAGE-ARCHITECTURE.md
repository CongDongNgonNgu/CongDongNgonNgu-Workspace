# DEC-014 — Phase 09A provider-neutral AI usage architecture

## Status

Accepted for Phase 09A implementation on 2026-09-30.

## Context

Phase 09 requires AI-assisted practice, but the authoritative task list does
not select a provider, model vendor, billing account, or production usage
store. The first safe increment must therefore establish a stable backend
boundary without inventing provider credentials or coupling later modes to a
vendor SDK.

## Decision

The Backend owns a provider-neutral AI runtime boundary with:

- adapter and model-capability contracts, including optional streaming
  capability metadata;
- bounded timeout and retry orchestration using one request identity across
  attempts;
- fail-closed disabled/misconfigured provider behavior;
- token usage and estimated cost records that never retain prompt or response
  content;
- policy, entitlement-quota, and rate-limit ports;
- reservation/settlement semantics so concurrent requests reserve budget
  before provider execution and failed attempts release it.

Phase 09A ships only the contracts, deterministic in-memory test/local
implementations, and fail-closed Nest wiring. A concrete provider adapter,
live credential, user-facing AI route, persistent usage schema, and frontend
mode remain later-scope decisions.

## Alternatives considered

### Select a provider and SDK now

Rejected because `TASKS.md` is provider-neutral and no provider selection or
credential authorization exists. Choosing one would expand scope and create a
vendor contract before learner-context and mode contracts are defined.

### Add a usage database table in Phase 09A

Rejected because the current task authorizes a quota/cost interface, not a
durable schema. The repository already requires reviewed migrations and a
production rollout plan for database changes.

### Allow disabled or incomplete providers to fall through

Rejected because the security baseline requires disabled/misconfigured AI
providers to fail safely and observably rather than making an accidental
external call.

## Consequences

- Later provider adapters can implement one contract without changing mode
  callers.
- Membership/entitlement and durable accounting modules can replace the
  policy/ledger ports without changing the runtime contract.
- Local/test verification is deterministic and makes no external network or
  database mutation.
- Live-provider behavior and exact pricing remain unverified until an
  authorized provider is selected and configured in a later scope.
