# Phase 11 Tasks

## LNG-11-001 — Membership Product & Entitlement Model
**Status:** PLANNED  
**Depends on:** Phase 10

Model plan/version/status, membership/subscription lifecycle and explicit entitlements (feature key + limits/parameters). Create one authorization service usable by backend and a frontend capability projection. Free defaults must work without a paid row. Plan changes must not retroactively mutate historical transaction truth.

## LNG-11-002 — Free vs Member Product Policy
**Depends on:** LNG-11-001

Write an executable entitlement matrix covering AI quota, advanced practice, analytics, matching, rooms/events/resources only where those features exist. Keep core community/public learning usable on Free. Unknown entitlement defaults fail closed for premium capability without breaking Free basics.

## LNG-11-003 — Contribution-to-Membership Credit
**Depends on:** Phase 10 ledger, LNG-11-001

Design redemption/credit contract: eligible contribution balance or dedicated redeemable credit, conversion rule/version, idempotent redemption, expiration policy if any and audit trail. Do not simply subtract Community Reputation if reputation is meant to be status; create a deliberate redeemable-value model/ledger if needed.

## LNG-11-004 — PayOS Checkout & Payment Attempt Model
**Depends on:** LNG-11-001

Adapt secure patterns from EduAI audit. Create order/payment attempt with server-derived amount/product, provider reference mapping, idempotency and pending/paid/failed/cancelled states. Client cannot choose trusted amount/status. Provider disabled/misconfigured state returns safe actionable error.

## LNG-11-005 — PayOS Webhook, Reconciliation & Fulfillment
**Depends on:** LNG-11-004

Verify provider signature using current official SDK/docs, parse safely, lock/recheck event→attempt→order→membership identity, make webhook idempotent, fulfill entitlements once and create reconciliation evidence for mismatches/unknown events without logging raw sensitive identifiers unnecessarily.

## LNG-11-006 — Membership Lifecycle
**Depends on:** LNG-11-001, LNG-11-005

Implement activation/expiry/renewal model appropriate to one-time recurring-period payments, cancel/auto-renew semantics only if provider/system actually supports them, grace/failed behavior and admin-safe reconciliation. Do not promise automatic recurring billing unless implemented.

## LNG-11-007 — Pricing, Checkout & Membership Account UI
**Depends on:** LNG-11-001..006

Use Stitch. Clearly show Free vs Member benefits, price/period, payment state, contribution-credit option when implemented and membership status/history. Avoid fake countdowns, hidden renewal terms, preselected expensive options or blocked cancellation paths.

## LNG-11-008 — Payment Security Reconciliation
**Depends on:** LNG-11-004..007

Run collision/idempotency/signature/mismatch/replay tests, sandbox or approved live verification with explicit owner authorization for real money, entitlement expiry tests and responsive/a11y checkout states. Record provider state and exact transaction evidence sanitized.
