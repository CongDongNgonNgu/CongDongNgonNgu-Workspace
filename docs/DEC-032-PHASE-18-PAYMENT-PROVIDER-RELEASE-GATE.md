# DEC-032 — Phase 18 Payment Provider Boundary and Release Gates

**Date:** 2026-10-03
**Status:** Accepted for Phase 18 technical reconciliation

## Decision

The membership domain remains provider-neutral. `MembershipPaymentProvider`
owns capability discovery and checkout creation, while provider-specific
credentials, request signing, HTTP transport and response parsing stay behind
the PayOS adapter. A future adapter such as VNPay can implement the same port
without changing order, payment-attempt, settlement or entitlement lifecycle
records.

The runtime configuration is explicit:

```text
PAYMENT_PROVIDER=disabled|payos
PAYMENT_QR_ENABLED=false|true
PAYOS_API_URL=https://api-merchant.payos.vn
PAYOS_CLIENT_ID=
PAYOS_API_KEY=
PAYOS_CHECKSUM_KEY=
```

The backend projects only non-secret capabilities through the membership
catalog. The frontend consumes that server projection; it does not decide
payment availability from browser-local configuration. Disabled payment or a
disabled QR switch fails closed for new checkout creation and does not imply a
fake QR flow.

The QR switch stops new checkout creation. It does not discard a legitimate,
already-created signed webhook: verified settlement and fulfillment continue
through the provider-neutral reconciliation path, subject to the existing
amount, identity, signature and replay checks.

## PayOS contract evidence

The adapter uses the documented merchant endpoint and headers, signs the
sorted five-field create request with HMAC-SHA256, validates the bounded
checkout response, and uses a bounded timeout. Tests use injected fake
transport only. The official documentation states that PayOS has no separate
sandbox and that testing uses the production API, so this task performs no
live request, payment-link creation, webhook registration or real-money
transaction:

- [PayOS API](https://payos.vn/docs/api/)
- [PayOS signature verification](https://payos.vn/docs/tich-hop-webhook/kiem-tra-du-lieu-voi-signature/)
- [PayOS test environment](https://payos.vn/docs/moi-truong-test/)

The fake lifecycle proves local order → payment attempt → provider checkout
projection → signed webhook → settlement/entitlement → exact webhook replay.

## Release-gate disposition

J-014 is `PASS` for the Phase 18 technical/provider contract. Live PayOS
verification remains `PRODUCTION_RELEASE_GATE` and requires, before enabling
the channel, separately authorized credentials, public HTTPS webhook
registration, monitoring, reconciliation and one explicitly human-authorized
verification transaction.

J-022 is `PASS` for local health/readiness, secret-safe logging/redaction and
correlation behavior. External production monitoring remains a mandatory
production release gate and is not claimed as deployed.

Phase 18 therefore remains `BLOCKED_EXTERNAL`, not done and not launch-ready:
the authoritative 18F deployment/smoke and 18G closeout gates remain unopened,
and Phase 19 is not started.

## Safety and compatibility

No database schema change or migration is required. Legacy generic payment
variables are removed from validated runtime configuration rather than
reinterpreted; their names are only scrubbed from backup child processes to
avoid secret leakage. No provider secret, production data or raw environment
content is stored in evidence.
