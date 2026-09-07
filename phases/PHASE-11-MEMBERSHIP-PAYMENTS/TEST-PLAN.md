# Phase 11 Test Plan

- Entitlement matrix unit tests: Free/member/expired/unknown feature/limit consumption.
- Contribution redemption: insufficient credit, duplicate retry, concurrent redemption, rule version and reversal policy.
- Payment API: client amount tampering, wrong product/user, duplicate idempotency key, provider disabled, timeout and retry.
- Webhook: valid signature, invalid signature, replay, event collision, order/attempt/provider identity mismatch, unknown order, out-of-order events and concurrent delivery.
- Fulfillment exactly-once behavior and membership expiry/renewal transitions.
- Log/audit sanitization checks.
- E2E pricing→checkout→pending→paid→entitlement and failure/cancel recovery using approved sandbox/test paths.
- Responsive/a11y on 320–1440 including QR/payment panel overflow and focus after provider result.
