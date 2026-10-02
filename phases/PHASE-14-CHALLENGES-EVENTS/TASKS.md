# Phase 14 Tasks

## LNG-14-001 — Challenge Model & Progress Rules
**Status:** DONE — integrated remote
**Depends on:** Phase 13 and Phase 10 for reward hooks

Model challenge type, language/level/topic, start/end/timezone policy, goals, eligible activity events, progress, completion and optional reward event. Rules are versioned/configurable; do not create a custom table/code path for each challenge example. Prevent progress from untrusted client-only claims.

**Evidence:** `evidence/PHASE-14A-IMPLEMENTATION.md`

**Remote:** Backend PR #23 merged to `main`; post-merge CI passed.

## LNG-14-002 — Challenge Discovery & Participation
**Status:** DONE — integrated remote
**Depends on:** LNG-14-001

Use Stitch. Users can discover active/upcoming challenges, join/leave according to rules, see clear finite goals and progress. No shame copy or fake urgency. Completed/expired states remain understandable.

**Evidence:** `evidence/PHASE-14B-IMPLEMENTATION.md`

**Remote:** Backend PR #24 merged to `main` at `65f670873d92c133a6b689b332595348b582d9ed`; frontend PR #15 merged to `main` at `b9787ccae2e2b3ce25f756491a27f3b8add1f6a8`; both post-merge CI quality jobs passed.

## LNG-14-003 — Event Model & Scheduling
**Status:** DONE — integrated remote
**Depends on:** Phase 13

Represent title, host, language/level/topic, start/end timezone-aware timestamps, capacity, visibility, venue type (speaking room/external/physical only when supported), recurrence series and cancellation. Store canonical UTC with original timezone where useful for display/recurrence.

**Evidence:** `evidence/PHASE-14C-IMPLEMENTATION.md`

**Remote:** Backend PR #25 merged to `main` at
`d2f05f59c7da6284b9c9f83d44fe3cf69b3541a3`; post-merge CI run
`36951816691` passed. Additive migration `0022_phase14_events.sql` was
created but not executed.

## LNG-14-004 — Registration & Capacity
**Status:** DONE — integrated remote
**Depends on:** LNG-14-003

Implement register/cancel/waitlist if justified, idempotent capacity allocation, host restrictions and private invite/access rules. Prevent overbooking under concurrency. Connect to room access for online room events without bypassing room authorization.

**Evidence:** `evidence/PHASE-14D-IMPLEMENTATION.md`

**Remote:** Backend PR #26 merged to `main` at
`a3a5a96f526d8052b6d6add2b6fec1df70fda761`; pre-merge and post-merge quality
CI passed. Additive migration `0023_phase14_event_participation.sql` was
created but not executed.

## LNG-14-005 — Reminder & Attendance Events
**Status:** DONE — integrated remote
**Depends on:** LNG-14-003, Phase 12 notifications

Create reminder events based on user timezone/preferences and attendance marking with host/system evidence. Attendance must not be inferred solely from opening an event page. Emit contribution/learning events only where policy supports them.

**Evidence:** `evidence/PHASE-14D-IMPLEMENTATION.md`

**Remote:** Delivered with Backend PR #26; post-merge quality CI passed on
`a3a5a96f526d8052b6d6add2b6fec1df70fda761`.

## LNG-14-006 — Event UI
**Depends on:** LNG-14-003..005

Use Stitch for calendar/list discovery, event card/detail, register state, host info and mobile date/time presentation. Avoid copying generic corporate calendar UI; emphasize language/community context. Handle cancelled/full/waitlisted/past states.

**Status:** DONE - integrated remote

**Evidence:** `evidence/PHASE-14E-IMPLEMENTATION.md`

**Remote:** Frontend PR #16 merged to `main` at
`f4e05c9ee5713454b41545641a6b27281635fda9`; exact-head CI and post-merge
quality CI passed. Branch cleanup completed.

## LNG-14-007 — Recurrence/Timezone & Safety Reconciliation
**Depends on:** LNG-14-001..006

Test recurrence near DST/timezone boundaries, duplicate registration, concurrent last seat, cancellation/reminders, private event access, host abuse/report path and challenge progress replay. Complete responsive/a11y/visual, commits and CI evidence.
