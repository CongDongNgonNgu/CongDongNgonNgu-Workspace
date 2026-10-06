# DEC-032 — Phase 18 Payment Provider Boundary and Release Gates

## Current demo release disposition - 2026-10-06

[Monitoring activation and final demo closeout](../evidence/phase-18/PHASE-18-MONITORING-AND-DEMO-CLOSEOUT-2026-10-06.md) is the current
authoritative release evidence index. All earlier dated gate/status/next-action
snapshots below are historical where superseded; their original test scope is
preserved. Backend main/live bec4ea4 and Frontend main/live 940e278 are unchanged.
NODE_ENV=production; RENDER_AUTO_DEPLOY=OFF. Backend/Frontend deployment
acceptance and bounded demo PRODUCTION_SMOKE are PASS.

MONITORING_PROVIDER=GITHUB_ACTIONS_WORKSPACE; MONITORING_ACTIVE=YES;
MONITORING_ACTIVATION=PASS. Main workflow is enabled at 15-minute cadence;
TEST Issue #106 creation/recovery and live three-target run passed. Alert channel
is GitHub Issue; PROJECT_RELEASE_OWNER primary, APPLICATION_OWNER secondary.
No real-time SLA, human notification latency or automated escalation is claimed.

FINAL_PHASE18_RECONCILIATION=PASS; PHASE_18_DEMO_RELEASE_SCOPE=NO_PAYMENT;
PHASE_18_DEMO_RELEASE_READY=YES; PHASE_18_DONE=YES; PHASE_18_STATUS=DONE;
PHASE_18_TASK_SET_COMPLETE=YES; PHASE_18_FINAL_GATE=PASS_FOR_DEMO_NO_PAYMENT;
PHASE_18_CLOSEOUT_PROFILE=DEMO_NO_PAYMENT; FULL_PAYMENT_LAUNCH_READY=NO.
PHASE_19_DEPENDENCY_SATISFIED=YES; PHASE_19_STARTED=NO.
REMAINING_PHASE_18_DEMO_GATES=NONE.
NEXT_ACTION=WAIT_FOR_EXPLICIT_PHASE_19_AUTHORIZATION.

Payment provider remains unselected and disabled. PAYOS_CONFIG,
WEBHOOK_REGISTRATION and LIVE_PAYOS_VERIFICATION remain
DEFERRED_PROVIDER_NOT_SELECTED_FOR_DEMO, not PASS. Backup remains
WAIVED_FOR_RECREATABLE_DEMO_DATA_ONLY, verification NOT_PERFORMED.
Revisit backup before relying on persistent user/payment data. Frontend log
sanity stays WARN for EXPECTED_ANONYMOUS_REFRESH_403, release blocker NO.
Latest journey matrix: 20 PASS/0 FAIL/0 BLOCKED/2 N/A in original TEST/UAT scope;
production acceptance remains bounded read-only demo smoke. Full live
authenticated/provider execution and recovery-time guarantees are not claimed.

Runtime supports disabled|payos; implementing an adapter does not select
that provider for the release. Generic future provider config/webhook/live
gates remain DEFERRED for this demo; no provider is chosen.

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
