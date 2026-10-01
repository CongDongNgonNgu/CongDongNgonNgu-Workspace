# DEC-028 — Phase 11D webhook fulfillment and membership lifecycle

## Status

Accepted for local Phase 11D implementation on 2026-10-01.

## Scope

This decision closes `LNG-11-005` and `LNG-11-006`. It extends the accepted
Phase 11C checkout boundary with a provider-verified settlement, a separate
fulfillment record, append-oriented membership lifecycle evidence and a
durable contribution-credit redemption fact. It does not activate PayOS,
perform a real payment or build the Phase 11E UI.

## Payment event and settlement boundary

The Backend accepts only the bounded PayOS webhook shape and verifies the
provider HMAC-SHA256 signature before parsing payment facts. The verified
identity chain remains:

```text
checkout order → payment attempt → verified webhook event
  → settlement fact → fulfillment record → membership subscription event
```

The webhook event stores only a payload hash and a bounded sanitized fact;
raw payloads, checksum keys and provider credentials are never persisted or
returned. An unknown reference, altered replay, order/attempt/provider
mismatch, amount/currency mismatch or unsupported event is rejected and
retained as reconciliation evidence without creating payment or membership
facts.

Settlement is committed before fulfillment. A duplicate event or provider
transaction maps to the existing settlement, while a temporary fulfillment
failure leaves the settlement and `RETRYABLE` fulfillment available for a
safe retry. Database row locks, advisory user locks and unique constraints
provide the concurrency boundary; in-memory queues are test-only support.

## Contribution-credit redemption

`MEMBERSHIP_ELIGIBILITY_CREDIT` remains non-monetary and never debits or
rewrites the append-only Phase 10 Reputation ledger. Under the 11D lifecycle
contract, one whole credit unit grants one calendar month of a selected
server-validated active non-Free membership plan. A redemption is immutable,
owner-scoped and idempotent; redeemed units are subtracted from the current
server projection. Reversing a Reputation award recomputes future available
credit and does not destructively revoke historical membership evidence; any
retroactive reconciliation is an explicit later action.

## Lifecycle semantics

- Activation uses Backend server time and creates an `ACTIVE` subscription.
- Periods are half-open: access is active when `starts_at <= now` and
  `ends_at > now`; the exact `ends_at` boundary is expired.
- A calendar-month/year period clamps end-of-month dates deterministically.
- A purchase or credit redemption does not stack over an active or scheduled
  period. An expired period is marked `EXPIRED` before a new grant and its
  lifecycle fact is retained.
- There is no automatic recurring billing, grace period or user cancellation
  API in this subphase. Renewal and cancellation are therefore explicitly
  unsupported rather than promised by checkout or frontend return claims.

## Persistence and safety

Migration `0015_phase11_webhook_fulfillment_lifecycle` adds webhook evidence,
settlement, fulfillment, subscription-event and credit-redemption tables with
scoped rollback. Migrations `0012`, `0013` and `0014` remain unchanged. The
provider adapter and webhook verifier are disabled/unavailable by default;
tests use deterministic fixtures and a test checksum key. No TEST or
production database was mutated and no live provider call occurred.
