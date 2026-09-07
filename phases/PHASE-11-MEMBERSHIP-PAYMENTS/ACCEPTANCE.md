# Phase 11 Acceptance

- Central entitlement service controls premium capability; Free works without paid state.
- Pricing matrix documents actual implemented benefits and does not wall off basic community value.
- Contribution redemption is auditable/idempotent and does not corrupt Reputation semantics.
- Payment amount/order identity is server-trusted; webhooks verify signature and full identity chain before fulfillment.
- Duplicate/replayed/mismatched webhooks cannot double-fulfill or fulfill another user/order.
- Provider-disabled state fails closed; secrets/signatures are not logged.
- Membership status/expiry/history are consistent after retries and reconciliation.
- Pricing/checkout UX has no dark patterns and follows Stitch/responsive/a11y requirements.
- Sandbox/live evidence is clearly labeled; commits/tests/CI complete.
