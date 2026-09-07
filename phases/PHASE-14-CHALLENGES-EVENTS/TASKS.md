# Phase 14 Tasks

## LNG-14-001 — Challenge Model & Progress Rules
**Status:** PLANNED  
**Depends on:** Phase 13 and Phase 10 for reward hooks

Model challenge type, language/level/topic, start/end/timezone policy, goals, eligible activity events, progress, completion and optional reward event. Rules are versioned/configurable; do not create a custom table/code path for each challenge example. Prevent progress from untrusted client-only claims.

## LNG-14-002 — Challenge Discovery & Participation
**Depends on:** LNG-14-001

Use Stitch. Users can discover active/upcoming challenges, join/leave according to rules, see clear finite goals and progress. No shame copy or fake urgency. Completed/expired states remain understandable.

## LNG-14-003 — Event Model & Scheduling
**Depends on:** Phase 13

Represent title, host, language/level/topic, start/end timezone-aware timestamps, capacity, visibility, venue type (speaking room/external/physical only when supported), recurrence series and cancellation. Store canonical UTC with original timezone where useful for display/recurrence.

## LNG-14-004 — Registration & Capacity
**Depends on:** LNG-14-003

Implement register/cancel/waitlist if justified, idempotent capacity allocation, host restrictions and private invite/access rules. Prevent overbooking under concurrency. Connect to room access for online room events without bypassing room authorization.

## LNG-14-005 — Reminder & Attendance Events
**Depends on:** LNG-14-003, Phase 12 notifications

Create reminder events based on user timezone/preferences and attendance marking with host/system evidence. Attendance must not be inferred solely from opening an event page. Emit contribution/learning events only where policy supports them.

## LNG-14-006 — Event UI
**Depends on:** LNG-14-003..005

Use Stitch for calendar/list discovery, event card/detail, register state, host info and mobile date/time presentation. Avoid copying generic corporate calendar UI; emphasize language/community context. Handle cancelled/full/waitlisted/past states.

## LNG-14-007 — Recurrence/Timezone & Safety Reconciliation
**Depends on:** LNG-14-001..006

Test recurrence near DST/timezone boundaries, duplicate registration, concurrent last seat, cancellation/reminders, private event access, host abuse/report path and challenge progress replay. Complete responsive/a11y/visual, commits and CI evidence.
