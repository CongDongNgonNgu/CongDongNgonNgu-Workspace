# Phase 10 decomposition

Status: `10B` complete; `10C` is ready. The grouping follows the authoritative task
dependencies in `TASKS.md`; each subphase completes implementation, tests,
review, evidence, publication and merge gates as one lifecycle.

Current lifecycle: `10A=DONE`, `10B=DONE`, `10C=READY`.

## PHASE_10A — Auditable ledger and contribution rules

- **Task IDs:** `LNG-10-001`, `LNG-10-002`
- **Dependencies:** Phases 05, 06 and 08
- **Scope:** Append-only, ledger-backed points entries for the independent
  `learning_xp` and `community_reputation` systems; idempotent replay
  protection; derived balances; versioned contribution rules for accepted
  answers/corrections, verified translations/resources and reviewer
  verification; reversible awards that preserve original history.
- **Done criteria:** Backend contracts, in-memory/Postgres persistence,
  migration rollback contract, rule eligibility and reversal tests pass;
  self/duplicate/raw-volume reward paths are not accepted; no production or
  test database is mutated.

## PHASE_10B — Learning XP and timezone-aware streaks

- **Task IDs:** `LNG-10-003`, `LNG-10-004`
- **Dependencies:** `10A`; Phase 09 for approved AI practice events
- **Scope:** Bounded learning actions, repeat/cooldown caps, streaks,
  milestones and timezone-change policy.
- **Done criteria:** XP and streak behavior is deterministic, timezone-aware,
  non-shaming and regression-tested.

## PHASE_10C — Badges, contributor levels and anti-farming

- **Task IDs:** `LNG-10-005`, `LNG-10-006`
- **Dependencies:** `10A`, `10B`; Community/Corrections/Library data
- **Scope:** Transparent finite achievements, contributor levels, abuse
  controls, moderation reversal hooks and anomaly observability.
- **Done criteria:** Verified-event issuance, reversal behavior, privilege
  separation and representative abuse paths pass review and tests.

## PHASE_10D — Passport and profile progress UI

- **Task IDs:** `LNG-10-007`
- **Dependencies:** `10A` through `10C`
- **Scope:** Stitch-backed responsive Passport/profile surfaces that clearly
  separate language proficiency, Learning XP and Community Reputation.
- **Done criteria:** Desktop/mobile UI, loading/error/empty/reversed states,
  keyboard/a11y and visual evidence pass without casino or shame mechanics.

## PHASE_10E — Reconciliation and Phase 10 final gate

- **Task IDs:** `LNG-10-008`
- **Dependencies:** `10A` through `10D`
- **Scope:** Replay representative events, verify idempotency, reversal,
  aggregates, streaks, abuse controls, responsive/a11y evidence and full
  Phase 10 acceptance/CI/merge closeout.
- **Done criteria:** The complete task set and cross-subphase contracts are
  reconciled, exact-head CI is green, Workspace state is truthful, merged
  branches are cleaned, and no Phase 11 work has started.
