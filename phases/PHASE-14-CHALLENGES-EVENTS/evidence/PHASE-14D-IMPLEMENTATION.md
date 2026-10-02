# Phase 14D Implementation Evidence

**Tasks:** `LNG-14-004` - Registration & Capacity; `LNG-14-005` - Reminder & Attendance Events
**Status:** PASS - integrated into remote `main`
**Date:** 2026-10-02

## Scope delivered

- Added idempotent event registration and cancellation with deterministic
  capacity allocation, waitlist positions and promotion after cancellation.
- Serialized in-memory allocation and used a transaction plus event row lock in
  the Postgres repository so concurrent last-seat requests cannot overbook.
- Added host restrictions and private invitations. Private event detail and
  registration require an active server-side invitation; revocation cancels
  the user's active registration and reminder intents safely.
- Added 24-hour and one-hour reminder intents using the user's timezone with an
  event-timezone fallback, and reconciled them with the existing in-app
  notification preference boundary. No external delivery provider was enabled.
- Added host-marked and Speaking Room presence attendance evidence. Attendance
  is limited to registered users and the event window; opening an event page
  does not create attendance or reward state.
- Added a trusted learning-hook boundary that runs only for newly recorded
  attendance and does not grant automatic XP, rewards or client-controlled
  progress.

## Backend delivery

- Feature commit: `d7971f59ac2650a23a79ee36e55dd424fe068b15`
- Pull request: [#26](https://github.com/CongDongNgonNgu/CongDongNgonNgu-Back-End/pull/26)
- Remote `main` merge commit: `a3a5a96f526d8052b6d6add2b6fec1df70fda761`
- Pre-merge CI: run `36954449445`, `conclusion=success`
- Post-merge CI: run `36954634733`, `conclusion=success`
- Routes delivered:
  - `POST /api/v1/events/:eventId/invitations`
  - `DELETE /api/v1/events/:eventId/invitations/:userId`
  - `GET /api/v1/events/:eventId/registration`
  - `POST /api/v1/events/:eventId/register`
  - `DELETE /api/v1/events/:eventId/register`
  - `POST /api/v1/events/:eventId/reminders/reconcile`
  - `GET /api/v1/events/:eventId/reminders`
  - `POST /api/v1/events/:eventId/attendance`

## Persistence and safety

- Additive migration: `0023_phase14_event_participation.sql` with scoped
  rollback `0023_phase14_event_participation.down.sql`.
- Migration `0023` was statically validated but not executed against any
  production or external database.
- Migrations `0012`-`0022` were unchanged. No deployment, provider
  activation, credential action or real-money operation was performed.
- Registration never grants Speaking Room access or a room role. Existing
  server-side room authorization and participant evidence remain the source of
  truth for room-presence attendance.
- DTOs expose bounded participation/reminder/attendance projections; database
  errors, tokens, provider payloads and private evidence are not returned.

## Verification

- Focused event coverage: 5 suites / 17 tests passed.
- Backend unit suite: 129 suites / 770 tests passed.
- Backend E2E suite: 17 suites / 73 tests passed.
- Typecheck, lint and build passed.
- `npm audit --audit-level=high`: 0 vulnerabilities.
- Migration static checks, replay/concurrency, invitation/revocation,
  reminder suppression/rescheduling, attendance evidence and learning-hook
  tests passed.

## Source-control closeout

- Backend PR #26 gates passed before merge.
- Remote and local `main` were verified at
  `a3a5a96f526d8052b6d6add2b6fec1df70fda761`.
- Post-merge CI passed for that exact merge SHA.
- `phase-14d-event-registration-attendance` was deleted from the remote and
  local backend repositories; stale remote-tracking refs were pruned.

## Next action

`14E` / `LNG-14-006` - Event Discovery and Detail UI.
