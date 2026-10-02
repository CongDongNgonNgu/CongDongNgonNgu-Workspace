# Phase 14C Implementation Evidence

**Task:** `LNG-14-003` - Event Model & Scheduling
**Status:** PASS - integrated into remote `main`
**Date:** 2026-10-02

## Scope delivered

- Added a timezone-aware Event domain with title, authenticated host,
  language, level, topic, visibility, venue type, capacity, cancellation and
  recurrence-series facts.
- Stored event instants as canonical UTC values while preserving the original
  IANA timezone for display and recurrence semantics.
- Added bounded recurrence validation with interval, count/until and weekly
  weekday rules; derived upcoming/live/ended/cancelled state from server time.
- Added public-safe event list/detail projections and protected create/cancel
  operations with bounded DTOs and structured domain errors.
- Preserved the Speaking Room authorization boundary: only the current room
  host can bind a room event, cancelled/ended rooms are rejected, and private
  rooms require private events. Event APIs do not grant room or media access.
- Modeled external and physical venue values, but creation remains rejected
  until a supported provider/capability exists; no provider was activated.

## Backend delivery

- Feature commit: `62cb83294313bf22574c8f147c12cf562a3ee01c`
- Pull request: [#25](https://github.com/CongDongNgonNgu/CongDongNgonNgu-Back-End/pull/25)
- Remote `main` merge commit: `d2f05f59c7da6284b9c9f83d44fe3cf69b3541a3`
- Post-merge CI: run `36951816691`, `conclusion=success`
- Routes delivered:
  - `GET /api/v1/events`
  - `GET /api/v1/events/:eventId`
  - `POST /api/v1/events`
  - `POST /api/v1/events/:eventId/cancel`

## Persistence and safety

- Additive migration: `0022_phase14_events.sql` with scoped rollback
  `0022_phase14_events.down.sql`.
- Migration `0022` was created and statically validated but not executed.
- Migrations `0012`-`0021` were unchanged; no production or test database was
  mutated.
- Recurrence-series and event creation use a transaction; cancellation uses a
  locked, state-safe update path.
- Host identity comes from the authenticated active session, never from a
  client-supplied host field. Private event detail is fail-closed for
  anonymous or unauthorized viewers.

## Verification

- Focused Event coverage: 3 suites / 10 tests passed.
- Backend unit suite: 127 suites / 763 tests passed.
- Backend E2E suite: 17 suites / 73 tests passed.
- Typecheck, lint and build passed.
- `npm audit --audit-level=high`: 0 vulnerabilities.
- `git diff --check` and migration/privacy static checks passed.
- No production deployment, provider activation, credential action or
  real-money operation was performed.

## Source-control closeout

- Backend PR #25 gates passed before merge.
- Remote `main` was verified at `d2f05f59c7da6284b9c9f83d44fe3cf69b3541a3`.
- Post-merge CI passed for that exact merge SHA.
- `phase-14c-event-model-scheduling` was deleted from the remote and local
  backend repositories; stale remote-tracking refs were pruned.

## Next action

`14D` / `LNG-14-004` and `LNG-14-005` - Registration & Capacity plus Reminder
& Attendance Events.
