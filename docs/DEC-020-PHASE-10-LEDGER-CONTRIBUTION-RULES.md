# DEC-020 — Phase 10 auditable ledger and contribution rules

## Status

Accepted for Phase 10A implementation on 2026-09-30.

## Context

Phase 10 needs two independent progress systems without making a mutable
counter the source of truth or rewarding raw activity volume. Phases 05, 06
and 08 already expose canonical contribution/acceptance/review evidence, but
their event records are not a points ledger and must remain authoritative for
their own domains.

## Decision

10A adds a dedicated append-oriented `reputation_ledger_entries` table and a
provider-free Backend module. Each entry records the user, system, approved
source type and source ID, signed delta, reason/rule version, idempotency key,
optional reversal link and timestamps. A unique idempotency key makes event
replay converge; conflicting reuse of a key is rejected. Balances are derived
by summing entries and never replace the ledger.

Contribution rewards use a small versioned configuration. Awards require a
canonical source ID and eligible source facts; independent actors are required
for accepted/verified/review events, and private/incomplete/unverified or
self-attributed events fail closed. Reversal appends a compensating entry and
never deletes the original award.

The module has deterministic in-memory and parameterized Postgres
repositories. It does not publish public routes yet; later subphases will add
the authenticated summary/detail API needed by the Passport UI.

## Alternatives considered

### Mutable user totals

Rejected because moderation, deletion and rule changes need attributable
history and safe reversal.

### Reward every reaction or created item

Rejected because raw volume and self/coordinated activity would be trivially
farmable. Only approved source events with independent eligibility facts are
rewardable in V1.

### Couple points directly into Community/Corrections/Library writes

Rejected for 10A. Those domains retain their own atomic event contracts; the
ledger consumes explicit approved event facts so a later integration can be
replayed and reconciled without hidden side effects.

## Consequences

- Rule amounts and reasons are inspectable and versioned.
- Idempotent replay and append-only reversal are testable before event
  consumers are wired.
- The migration is explicitly in Phase 10 scope, but no database is mutated
  by local validation.
- Contributor levels, XP/streak rules, UI and event orchestration remain in
  later subphases.
