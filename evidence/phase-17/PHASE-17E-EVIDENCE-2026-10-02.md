# Phase 17E Evidence — Commerce/Payment Security — 2026-10-02

## Scope and accepted heads

This evidence closes `LNG-17-006` against the accepted Phase 11 commerce
contracts and the live Backend/Frontend implementation. The audit was
non-destructive and did not activate a provider or perform a payment.

- Backend `main`: `76fb2732a62da5437ed4390f74ebe0fb507fca46`
- Frontend `main`: `01331d6e4f768c9a5d0079658c60b7fcedddcaa8`
- Workspace accepted pre-17E `main`: `151eeda1a3e418cb19cabbef5b21f72d179b2a11`
- Phase 11 payment migrations `0013`, `0014` and `0015`: unchanged and not executed.

## Adversarial security matrix

| Area | Repository-backed control reviewed | Result |
| --- | --- | --- |
| Signature/authentication | PayOS payment-webhook data is exact-key bounded, sorted and HMAC-SHA256 verified with `timingSafeEqual`; missing configuration fails closed. | PASS |
| Event replay/collision | Event identity, provider reference and attempt settlement are unique; payload collisions are recorded as rejected evidence. | PASS |
| Idempotency/race | User-scoped order/attempt hashes, request-hash replay checks, row locks, `ON CONFLICT`, one-open-attempt-per-order and provider-reference uniqueness were reviewed. | PASS |
| Identity chain | Provider → attempt → order → owner, order reference, amount and currency are rechecked while locked before settlement. | PASS |
| Amount/product tampering | Orders snapshot the active server catalog; attempts copy the immutable order amount; webhook amount/currency must equal the order snapshot. | PASS |
| Entitlement escalation | Only verified settlement fulfillment creates a `PURCHASE` subscription; client return/status claims never grant access; active membership is rechecked under a per-user transaction lock. | PASS |
| Contribution credit | Credit is a server-derived non-monetary projection; redemption binds user/plan/request, locks the user, checks ledger balance and consumed units, and commits subscription plus redemption atomically. | PASS |
| Reconciliation/audit | Sanitized webhook facts, settlement, fulfillment, subscription events and credit redemptions are separate durable facts; raw payloads, signatures and secrets are not persisted or returned. | PASS |
| Frontend boundary | Membership status and success are server-derived; forged return parameters do not grant access; payment links require HTTPS without credentials; payment/private routes remain network-only. | PASS |

The current PayOS payment-webhook signature contract was cross-checked against
the provider documentation: HMAC-SHA256 over alphabetically sorted `data`
fields (`key=value&...`).

## Verification performed

Focused commerce/security regression:

```text
Backend: 9 suites / 48 tests PASS
Frontend membership/payment/cache: 4 files / 19 tests PASS
```

Full gates:

```text
Backend unit: 144 suites / 811 tests PASS
Backend E2E: 17 suites / 73 tests PASS
Backend typecheck: PASS
Backend build: PASS
Backend npm audit --audit-level=high: 0 vulnerabilities
Frontend: 82 files / 341 tests PASS
Frontend typecheck: PASS
Frontend build: PASS
Frontend performance: PASS
Frontend npm audit --audit-level=high: 0 vulnerabilities
Backend and Frontend worktrees: clean; git diff --check: PASS
```

## Findings and disposition

- `H-005` is **CLOSED / PASS_VERIFIED** for the reviewed commerce/payment
  attack surface. No forged, replayed, mismatched, concurrent or client-
  tampered input produced a settlement or entitlement outside the server
  identity chain.
- No code remediation was required: the accepted Phase 11 implementation
  already contains the required controls and the 17E regression matrix
  re-exercised them.
- `M-002` remains a cross-phase residual: the process-local community rate
  limiter and retention/deletion reconciliation are explicitly carried to
  17F. 17E does not silently close those unrelated residuals.

## Safety boundary and next action

No production deployment/restart, production database write or migration,
provider activation, secret mutation, DNS/infrastructure change, force push,
CI bypass, live payment or live AI action was performed.

Next eligible work is `17F` / `LNG-17-008`: privacy, retention, security
reconciliation, residual-risk disposition and the final Phase 17 gate.
Phase 18 remains unstarted and outside this authorization.
