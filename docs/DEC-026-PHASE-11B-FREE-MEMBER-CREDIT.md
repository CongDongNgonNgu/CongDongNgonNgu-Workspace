# DEC-026 — Phase 11B Free/member policy and contribution credit

## Status

Accepted for local Phase 11B implementation on 2026-09-30.

## Scope

Phase 11B closes `LNG-11-002` and `LNG-11-003`. It defines the executable
policy boundary on top of the accepted Phase 11A membership authorization
service and adds a safe contribution-credit projection. It does not create a
checkout, payment attempt, provider settlement, webhook, membership grant,
renewal or pricing/account UI.

## Free/member policy

`membership-policy-v1` is the single Backend policy matrix for implemented
capabilities:

| Capability | Free | Active member |
| --- | --- | --- |
| `community.public` | Granted | Inherits Free |
| `library.public` | Granted | Inherits Free |
| `exchange.basic` | Granted | Inherits Free |
| `ai.practice` | 20,000 tokens/day and 20 requests/day | Uses the active server plan entitlement when it is a bounded `tokens_per_day` entitlement; otherwise retains the Free baseline |
| `practice.advanced` | Denied | Requires an active server plan entitlement |

Rooms, paid events, premium resources and analytics are not included because
those product boundaries are not implemented in the current repository.
Unknown capability keys fail closed. The policy projection is derived from
the current authenticated user and the Phase 11A server facts; query
parameters, client tier labels, local storage and client expiration values are
ignored.

Plan-version integrity is preserved because member overrides come only from
the plan version referenced by the active membership period. A retired
historical plan remains valid only through its own accepted time boundary, as
defined by DEC-025.

## Contribution credit

`membership-contribution-credit-v1` defines contribution credit as
`MEMBERSHIP_ELIGIBILITY_CREDIT`: a non-monetary, non-transferable eligibility
projection derived from the current net `community_reputation` ledger balance.
The conversion is versioned as `membership-credit-v1` at 10 net Reputation
points per whole credit unit; the remainder remains in the derived
projection. There is no browser-controlled balance, wallet, payment tender,
discount balance or direct entitlement grant.

The projection has no independent expiration clock. Reversals are the
existing append-only Phase 10 compensating entries, so credit recomputes from
the current net balance and never deletes or rewrites the original history.
Phase 10 contribution eligibility, reviewer separation, anti-farming and
ledger idempotency remain the only sources that can create Reputation facts.

Phase 11B exposes only the owner-safe projection at
`GET /api/v1/membership/contribution-credit`. Redemption is deliberately
`PROJECTION_ONLY` in this subphase: a later membership lifecycle/fulfillment
boundary must add a durable, idempotent redemption fact before any membership
period can be granted. This prevents a threshold or read retry from creating
paid entitlement implicitly and avoids inventing a payment or period contract
before LNG-11-005/006.

## Implementation and safety consequences

- `GET /api/v1/membership/policy` is protected by the current-user access
  guard and returns only the bounded policy projection.
- AI practice requests carry the server policy key and use the same policy
  resolver for quota/rate-limit decisions; provider availability remains a
  separate fail-closed boundary.
- No raw Reputation ledger rows, moderation facts, anti-farming internals,
  provider data or arbitrary user IDs are accepted or returned.
- No new migration is required. Migrations `0012_phase10_reputation_ledger`
  and `0013_phase11_membership_model` remain unchanged.
- No TEST or production database was mutated, no provider was activated and
  no real payment occurred.
