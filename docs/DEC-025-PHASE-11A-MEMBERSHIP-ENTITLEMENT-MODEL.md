# DEC-025 — Phase 11A membership product and entitlement model

## Status

Accepted for local Phase 11A implementation on 2026-09-30.

## Context

Membership access must remain server-authoritative while Free stays useful
without requiring a paid row. Product identity, versioned entitlement
definitions and a user's membership period have different lifecycles and
must not be represented by one mutable tier/status field. Payment attempts,
settlement and provider fulfillment are later Phase 11 boundaries.

## Decision

11A introduces four separate persistence boundaries:

- `membership_products` stores stable product identity and product status;
- `membership_plan_versions` stores immutable-by-reference plan/tier
  definitions and their lifecycle status;
- `membership_entitlement_definitions` stores feature keys, optional limits
  and JSON parameters for a plan version;
- `membership_subscriptions` stores user membership periods, source, status,
  activation timestamps, expiry, cancellation and revocation facts.

The `MembershipAuthorizationService` evaluates current access from these
server facts. It selects one current active subscription, never additively
stacks overlapping active rows, and falls back to a built-in `FREE` version
when no active membership row exists. Unknown or malformed feature keys fail
closed. Retiring a product or plan version prevents future selection but does
not revoke an already active subscription before that subscription's own
period boundary. The API exposes only a safe capability projection; the
frontend may render it but never becomes the access authority.

11A does not model prices, orders, payment attempts, provider references,
settlement, webhook events or fulfillment grants. Those are separate
contracts for later subphases and cannot grant access merely by existing.

## Alternatives considered

### One mutable membership tier column

Rejected because plan-version history, period boundaries, cancellation and
reconciliation would be lost or retroactively changed.

### Client-owned membership flags

Rejected because local state, query parameters and payment-return claims are
not authoritative security facts.

### Additive overlap of active memberships

Rejected for 11A. Current access resolves to one canonical active period;
historical rows remain auditable and later lifecycle policy must define any
replacement or renewal explicitly.

## Consequences

- Migration `0013_phase11_membership_model` is additive and has a scoped down
  migration; `0012_phase10_reputation_ledger` remains unchanged.
- The Free capability response is available even when no paid or membership
  row exists.
- Later policy work can add entitlement definitions without changing the
  authorization boundary; payment/fulfillment work can reference a plan
  version without coupling payment facts to access decisions.
- No TEST or production database is mutated by 11A.
