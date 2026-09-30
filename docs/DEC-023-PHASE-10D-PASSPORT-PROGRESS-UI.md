# DEC-023 — Phase 10D Passport and profile progress UI

## Status

Accepted for Phase 10D implementation on 2026-09-30.

## Context

Phase 10D needs an owner-facing progress surface that makes the three
different concepts in the product legible:

- language proficiency belongs to the Passport identity/profile;
- Learning XP and streaks belong to learning activity;
- Community Reputation, contributor level and finite badges belong to
  healthy contribution.

The Phase 10A–10C backend contracts already provide the authoritative
projections. The UI must not recreate their formulas or expose raw ledger,
moderation, evidence or private audit data.

## Decision

The existing `/profile` Passport page remains the owner surface. It composes
the existing identity and language sections with a component-local progress
panel. Public `/profiles/:userId` pages keep their existing privacy boundary
and do not receive the private progress panel.

The backend exposes an owner-only `GET /api/v1/reputation/progress` endpoint
alongside the existing owner-only `GET /api/v1/learning/progress` endpoint.
The reputation response is a safe projection containing reputation balance,
contributor level, finite badge presentation fields, active contribution
count, and status timestamps. It deliberately omits `ruleVersion`,
`sourceType`, `evidenceSourceIds` and `ledgerSummary`.

The server remains the only authority for XP, reputation, streaks, longest
streak, levels, thresholds, badge state, anti-farming and reversals. The
frontend only labels and renders those facts. Badge criteria are inspectable
through native disclosure controls, and `LOCKED`, `EARNED` and `REVOKED`
states are shown without casino mechanics or shame language.

## UI and verification references

Stitch was used before implementation with the canonical project
`projects/3718538619973058970`, design system asset
`assets/16442026920550574436`, desktop screen
`138fcae914a042d5b10bb25a9f516500`, and mobile screen
`94d8351ae3334d96b2539244d95eb18a`. These references guided hierarchy,
spacing, palette and responsive structure; the implementation uses the
repository's existing components and tokens.

The panel covers initial loading, refresh loading, API failure, unauthorized
session expiry, valid zero/new learner data, empty activity, reversed badges,
max-level state and offline-adjacent retry behavior. It is keyboard usable,
responsive at desktop and 390px mobile widths, and keeps styling local to the
component.

Runtime smoke verification used local test configuration with memory auth and
disabled live providers. Desktop and mobile browser checks passed, including
no horizontal overflow and no browser console warnings/errors. No secret,
token, password, database URL, raw ledger row or provider detail is recorded
in this decision or the Phase 10D handoff.

## Consequences

Phase 10D adds no database schema change or migration and does not mutate a
test or production database. It does not deploy production or call paid/live
providers. Phase 10E must reconcile the three progress boundaries across the
subphases, rerun the complete regression/security/CI gate, and close Phase 10
without starting Phase 11.
