# DEC-024 — Phase 10E bounded reputation reconciliation

## Context

`LNG-10-008` closes the reputation and learning-gamification phase by
reconciling representative ledger events with the projections already
accepted in Phase 10A through 10D. The reconciliation must detect replay,
reversal, aggregate, streak, badge, level, anti-farming and Passport drift
without becoming a second mutable source of truth.

## Decision

Backend exposes a pure module-level reconciliation contract
`reputation.reconciliation.v1`. It accepts bounded supplied facts, copies and
orders the input before inspection, and returns a deterministic report. The
report uses bounded issue codes for invalid policy, malformed records,
duplicate or unexpected rewards, ledger/derived-balance drift, reversal
mismatches, streak/badge/level/anti-farming drift, rule-version drift and
Passport projection drift.

The report is diagnostic only:

- `repairStatus` is `NOT_APPLIED`.
- `mutationApplied` is always `false`.
- No database, ledger, projection or external provider is written.
- Record counts and issue counts are bounded; issue references contain only
  sanitized entry/source identifiers.
- Reversal identity, user ownership, source identity and rule versions are
  checked before derived comparisons.

The canonical Phase 10 rule versions remain:

- `learning-xp-v1`
- `community-reputation-v1`
- `community-gamification-v1`
- `community-antifarming-v1`

The accepted Phase 10A migration `0012_phase10_reputation_ledger` is the
schema baseline and is unchanged by 10E. No new migration is created.

## Verification

The reconciliation suite covers clean reports, duplicate/idempotent replay,
reversal mismatch, derived balance drift, reward drift, timezone-aware streak
drift, badge/level/anti-farming/Passport drift, bounds, malformed records,
rule-version drift and non-mutation of caller input. Phase 10 closeout also
reruns the backend unit and E2E suites, typecheck, lint, build and online
security audit; frontend Phase 10D regression and browser evidence remain
valid because 10E changes no frontend source.
