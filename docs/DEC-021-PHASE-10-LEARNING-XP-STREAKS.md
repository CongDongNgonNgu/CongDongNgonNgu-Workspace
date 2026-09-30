# DEC-021 — Phase 10B learning XP and timezone-aware streaks

## Status

Accepted for Phase 10B implementation on 2026-09-30.

## Context

Learning XP must reward completed learning work without turning page views,
empty AI requests, failed attempts or repeated submissions into a points
source. Phase 10A already provides an append-only, idempotent
`learning_xp` ledger with compensating reversals. The Phase 10B task does not
authorize another schema migration, so streak and milestone history must be
derived from that immutable ledger.

## Decision

The trusted learning completion contract accepts four bounded source types:

- `PRACTICE_COMPLETED`: 20 XP when at least one unit is completed.
- `LEARNING_SESSION_COMPLETED`: 10 XP when the focused session is at least
  60 seconds.
- `VOCABULARY_MILESTONE`: 10 XP for a valid positive milestone number.
- `QUIZ_MILESTONE`: 15 XP for a completed quiz with a score of at least 60%.

Only `COMPLETED` events with valid UUID source identity, finite historical
completion time and sufficient evidence are eligible. The rule version is
`learning-xp-v1`; the idempotency key is
`learning:<sourceType>:<sourceId>`. Replays converge to the original ledger
entry, while failed, abandoned, future, malformed, empty or insufficient
events write nothing. The service is an internal trusted-domain contract; it
does not expose a public XP-claim endpoint.

Qualifying learning days are derived from positive, unreversed learning
ledger awards after grouping each source identity with its compensating
entries. Repeated awards on one local calendar day count once. Current streak
counts consecutive activity through today or yesterday in the learner's
timezone; longest streak and milestone history are derived from the ordered
ledger without deleting or rewriting history. XP and streak-day idempotency
remain separate concerns.

The profile's validated IANA timezone controls local-day projection. A
missing profile timezone uses the explicit UTC default at the service
boundary; the pure streak calculator rejects timezone-less input. A timezone
change never creates XP, rewrites a ledger timestamp or silently creates a
backfilled event. It may relabel immutable historical instants in the new
local projection, so the policy is exposed as a deterministic projection and
not as a reward action. Later badge/anti-farming work must not treat a
timezone change alone as a qualifying event. Date calculation is independent
of the Node process timezone and uses calendar days across DST boundaries.

## Consequences

- No Phase 10B migration is created and no TEST or production database is
  mutated.
- Phase 10C owns broader behavioral anti-farming and anomaly controls;
  Phase 10B supplies only bounded evidence checks and deterministic replay
  protection.
- The authenticated `GET /api/v1/learning/progress` projection exposes only
  the requesting learner's bounded XP, streak, milestone and recent activity
  summary. It does not expose another user's ledger or private profile data.
