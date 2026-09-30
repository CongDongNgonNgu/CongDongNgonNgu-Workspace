# DEC-022 — Phase 10C badges, contributor levels and anti-farming

## Status

Accepted for Phase 10C implementation on 2026-09-30.

## Context

Phase 10C must make the existing community-reputation ledger useful for
healthy progress without introducing a second mutable points store, a new
database projection, privileged role promotion, or opaque punishment. The
authoritative task definition requires finite achievements, transparent
contributor levels, verified-event issuance, moderation reversal hooks and
observable V1 abuse controls.

## Decision

### Contributor levels

Contributor levels are a deterministic projection of the current
`community_reputation` ledger balance. Reversals therefore recompute the
level downward when the current balance crosses a boundary. Negative balances
are displayed at the `NEWCOMER` floor; they never create a privileged role.

The versioned thresholds are:

| Level | Minimum reputation |
| --- | ---: |
| `NEWCOMER` | 0 |
| `HELPER` | 5 |
| `CONTRIBUTOR` | 25 |
| `TRUSTED_CONTRIBUTOR` | 50 |
| `COMMUNITY_STEWARD` | 100 |

The projection exposes no `MODERATOR`, `ADMIN` or `EXPERT` promotion and does
not change authorization.

### Badges

Badges are a finite, inspectable projection of active verified/accepted
community ledger source events. The stable badge identifiers and criteria are:

- `FIRST_TRUSTED_CONTRIBUTION`: one active community contribution;
- `CORRECTION_HELPER`: one active `CORRECTION_ACCEPTED` event;
- `TRANSLATION_KEEPER`: one active `TRANSLATION_VERIFIED` event;
- `RESOURCE_STEWARD`: one active `RESOURCE_VERIFIED` event;
- `REVIEW_GUARDIAN`: one active `REVIEW_VERIFICATION` event.

Badge rule version is `community-gamification-v1`. The projection returns
`LOCKED`, `EARNED` or `REVOKED`. A compensating reversal removes the source
from active evidence and exposes `REVOKED` when the badge was historically
qualified; it never deletes ledger history. Replaying the same source cannot
create a duplicate badge side effect because badges are derived and stable.

### Anti-farming and observability

Rule version is `community-antifarming-v1`. V1 uses only authoritative
server-derived facts:

- existing contribution rule checks reject self-reward and require an
  independent actor, public source and required verified reviewer role;
- the ledger's deterministic source/idempotency identity protects exact
  replay and duplicate source rewards;
- an optional normalized server `sourceFingerprint` rejects the same
  contributor's repeated low-value source and an identical fingerprint paid
  through the same actor for another contributor;
- a reused contributor/actor pair is emitted as a deterministic observation,
  not as an opaque score or automatic punishment.

There are no undocumented daily caps, cooldowns, behavioral scores,
client-supplied trust flags, or process-local time windows. Rejected events
write no reward. Corrections to an already valid reward use the existing
append-only compensating reversal path.

## Consequences

- No Phase 10C migration is created and no TEST or production database is
  mutated.
- Badge and level projections can be reconciled directly from the immutable
  ledger and are safe for the later Passport/profile UI.
- Domain integrations must calculate fingerprints and prior event facts on the
  server; clients cannot claim that an event is safe or verified.
- Broader anomaly review and persistent moderation workflows remain explicit
  future scope; this V1 boundary does not pretend to provide opaque fraud
  scoring.
