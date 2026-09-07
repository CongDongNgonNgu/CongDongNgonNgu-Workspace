# Phase 10 Tasks

## LNG-10-001 — Auditable Points Ledger
**Status:** PLANNED  
**Depends on:** Phases 05, 06 and 08

Create append-oriented ledger entries with user, system (`learning_xp` or `community_reputation`), event/source type, source ID, delta, reason/rule version, idempotency key, reversal link and timestamps. Aggregate balances are derived/cacheable, not the sole truth. Prevent duplicate event replay.

## LNG-10-002 — Contribution Rule Engine V1
**Depends on:** LNG-10-001

Define configurable/versioned rules for useful answer, accepted correction, verified translation/resource, review/verification and other approved events. Avoid rewarding raw volume alone. Ensure moderation/delete/reversal can revoke prior reward without deleting history.

## LNG-10-003 — Learning XP Rules
**Depends on:** LNG-10-001, Phase 09 where AI practice contributes

Define bounded XP for genuine learning actions (practice completion, selected learning sessions, vocabulary/quiz milestones) with anti-repeat limits. Do not award large XP merely for opening pages or sending empty AI messages.

## LNG-10-004 — Streaks & Milestones
**Depends on:** LNG-10-003

Implement timezone-aware learning streak calculation and milestone history. Streak loss must not use shame/dark patterns. Changing timezone must not enable trivial streak manipulation; document policy.

## LNG-10-005 — Badges & Contributor Levels
**Depends on:** LNG-10-002..004

Define transparent, finite achievement criteria and contributor levels. Badges must come from verified system events. Never auto-promote to MODERATOR/ADMIN/EXPERT solely from reputation.

## LNG-10-006 — Anti-Farming & Abuse Controls
**Depends on:** LNG-10-002, Community/Correction/Library data

Block self-vote/self-accept reward loops where inappropriate, repeated low-value spam, duplicate contribution rewards and coordinated obvious abuse patterns feasible at V1. Provide moderation reversal tools/hooks and anomaly observability without opaque punishment.

## LNG-10-007 — Reputation/XP UI
**Depends on:** LNG-10-001..005

Use Stitch. Integrate into Language Passport/profile with clear separation between learning level/proficiency, Learning XP and Community Reputation. Show ledger/history summaries where useful, explanations for earned badges and no casino visuals/confetti overload.

## LNG-10-008 — Reconciliation
**Depends on:** LNG-10-001..007

Replay representative domain events, verify idempotency/reversal/aggregates, timezone streaks and abuse paths. Run responsive/a11y/visual tests, commit/push and document rule versions.
