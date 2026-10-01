# DEC-027 — Phase 11C checkout and payment-attempt foundation

## Status

Accepted for local Phase 11C implementation on 2026-10-01.

## Scope

Phase 11C closes `LNG-11-004`. It establishes the order and payment-attempt
boundary needed by later webhook fulfillment. It does not settle payments,
consume contribution credit, grant or revoke membership, process webhooks,
implement lifecycle automation or build pricing/checkout UI.

## Decision

The Backend keeps these facts separate:

- `membership_plan_prices` is the server-authoritative active price catalog;
- `membership_checkout_orders` snapshots the selected product, plan version,
  price, amount, currency and period at order creation;
- `membership_payment_attempts` records payment-state transitions and the
  provider-neutral checkout reference for one order attempt.

The current-user service accepts only a plan-version/price selection and an
idempotency key. It derives the amount, currency, period, product and price
version from the active catalog. Amounts are validated as positive safe
integer minor units and serialized deterministically. Owner-scoped hashes,
unique constraints, order locking and one-open-attempt rules make retries and
concurrent double clicks converge without duplicating attempts.

The provider boundary is deliberately disabled by default. A configured PayOS
code currently returns a safe unavailable error because no live adapter is
authorized or implemented in 11C. No provider call or real transaction is
made. A checkout URL or client success/return claim is never treated as
settlement.

## Alternatives rejected

### Client-supplied amount or status

Rejected because price, currency, status, expiry and provider facts are
trusted payment data and must be derived or verified on the server.

### Grant entitlement during checkout creation

Rejected because payment initiation is not settlement. Entitlement fulfillment
belongs to the signature-verified webhook/reconciliation boundary in 11D.

### One mutable membership/payment status

Rejected because product snapshots, payment facts, settlement evidence and
membership entitlement facts have different lifecycles and audit needs.

## Consequences

- Migration `0014_phase11_checkout_payment` is additive with a rollback file;
  migrations `0012` and `0013` remain unchanged.
- Payment APIs are protected and owner-scoped; provider references, internal
  hashes, raw payloads and secrets are not returned.
- Later 11D fulfillment can lock and reconcile an attempt without changing the
  11C order snapshot or inventing a provider coupling.
- No TEST or production database was mutated, no provider was activated and
  no real payment occurred.
