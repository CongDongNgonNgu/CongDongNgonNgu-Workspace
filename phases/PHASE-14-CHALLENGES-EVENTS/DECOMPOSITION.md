# Phase 14 Decomposition — Challenges & Events

## Authoritative objective

Create healthy shared learning rhythms through finite challenges and
community events without manipulative streak pressure. Challenges are
data/config-driven and progress is derived from trusted domain events. Events
are timezone-safe, capacity-safe and connected to the existing Speaking Room
authorization boundary when they use an online room.

## Synchronized start heads

- Backend: `1cebe93343a912ea9e341862d3dd3957b270eab1`
- Frontend: `fe9e5254d888e58fd39232729453d183c143564f`
- Workspace: `36301d6c09ed0b746c4962f897beb9ad77af4877`

## Ordered subphases

```text
14A LNG-14-001 Challenge Model & Progress Rules
  └── 14B LNG-14-002 Challenge Discovery & Participation

Phase 13
  └── 14C LNG-14-003 Event Model & Scheduling
          └── 14D LNG-14-004 Registration & Capacity
                    └── 14E LNG-14-006 Event UI

14C + Phase 12 + 14D
  └── 14D also closes LNG-14-005 Reminder & Attendance Events

14A..14E
  └── 14F LNG-14-007 Recurrence/Timezone & Safety Reconciliation + final gate
```

The event lifecycle is grouped so registration, reminders and attendance are
implemented against one authoritative scheduling model. UI remains isolated
after the API/domain boundaries are stable. Testing, review, runtime, CI,
evidence and cleanup stay inside each subphase and are not separate phases.

## Subphases

### 14A — Challenge model and trusted progress

- **Task IDs:** `LNG-14-001`
- **Dependencies:** Phase 13 and Phase 10 reward hooks
- **Scope:** Add configurable/versioned challenge definitions, eligibility,
  finite goals, activity-event progress, completion and optional reward-event
  projection. Establish server authority, replay identity and additive
  migration boundaries without trusting client progress claims.
- **Done criteria:** Challenge contracts, persistence/static migration checks,
  trusted-event progress, exact/altered replay, expiry/completion,
  authorization, ownership, privacy and sanitized error tests pass; accepted
  migrations `0012`–`0020` are unchanged; no production/test database write
  or reward-provider activation occurs.

### 14B — Challenge discovery and participation

- **Task IDs:** `LNG-14-002`
- **Dependencies:** 14A
- **Scope:** Add authenticated/public-safe challenge discovery, detail,
  join/leave participation and server-projected progress states. Use the
  required Stitch direction, Vietnamese UI, finite-goal copy and responsive
  accessible loading/empty/error/expired states.
- **Done criteria:** API ownership/authorization and idempotency tests pass;
  challenge UI renders only backend facts, has no shame or fake urgency,
  keyboard/a11y behavior is covered, Stitch references are recorded and
  browser verification is clean at applicable viewports.

### 14C — Event model and scheduling

- **Task IDs:** `LNG-14-003`
- **Dependencies:** Phase 13
- **Scope:** Add event title/host/language/level/topic, visibility, venue
  type, canonical UTC and original timezone, capacity, cancellation and
  recurrence-series facts. Validate host capability and private-access
  policy; preserve the Speaking Room server authorization boundary.
- **Done criteria:** Timezone-aware API/domain contracts, host/visibility
  authorization, recurrence validation, bounded DTOs, migration static
  checks and privacy/error tests pass with migration `0021` (or the next
  repository-valid additive migration) and no production execution.

### 14D — Registration, reminders and attendance

- **Task IDs:** `LNG-14-004`, `LNG-14-005`
- **Dependencies:** 14C and Phase 12 notifications
- **Scope:** Implement idempotent registration/cancellation, deterministic
  capacity and justified waitlist behavior under concurrency; schedule
  preference/timezone-aware reminder intents; support host/system attendance
  evidence and safe contribution/learning hooks. Private access and room
  joining remain server-authorized.
- **Done criteria:** Duplicate/altered replay, concurrent last-seat,
  cancellation, waitlist, reminder suppression/rescheduling, past-event,
  attendance-evidence, reward-hook, ownership and room-access tests pass;
  no page-view-only reward is possible.

### 14E — Event discovery and detail UI

- **Task IDs:** `LNG-14-006`
- **Dependencies:** 14C and 14D
- **Scope:** Use Stitch to build project-native calendar/list discovery,
  event cards/detail, host information, register/cancel/full/waitlist/
  cancelled/past states and mobile-localized date/time presentation. Include
  a focused host/create form only where the backend capability exists.
- **Done criteria:** Backend facts remain authoritative; UI has explicit
  loading/empty/error/offline states, semantic date/time and timezone text,
  keyboard/focus/screen-reader coverage, responsive checks at 320–1440px and
  clean browser console/network evidence.

### 14F — Reconciliation and final gate

- **Task IDs:** `LNG-14-007` plus complete Phase 14 reconciliation
- **Dependencies:** 14A–14E
- **Scope:** Reconcile all challenge/event facts, recurrence/DST boundaries,
  duplicate/concurrent registration, cancellation/reminders, private access,
  host abuse/report path, challenge progress replay, responsive/a11y/visual
  evidence, full regressions, audits, exact-head/post-merge CI, Workspace
  consistency, branch cleanup and synchronized clean mains.
- **Done criteria:** Every `LNG-14-*` task is accepted with observed
  evidence; authorization, ownership, idempotency, concurrency, privacy,
  error sanitization and secret handling pass; accepted migrations and
  earlier contracts are preserved; no production mutation/provider
  activation/deployment occurred; Phase 14 final gate and closeout pass.

## Cross-cutting invariants

- Backend remains authoritative for challenge eligibility/progress/completion,
  event ownership/visibility/capacity/registration/attendance/reminders and
  room access.
- Retryable writes have stable logical identities and deterministic exact,
  altered and concurrent replay behavior.
- Client-provided progress, attendance, ownership, role, capacity, payment,
  entitlement, notification and room facts never grant protected state.
- DTOs expose only bounded presentation-safe data; raw provider payloads,
  private moderation facts, credentials, tokens, stack traces and database
  errors never cross the API boundary.
- Migrations `0012`–`0020` remain immutable. Any task-authorized schema work
  is additive, reversible by project convention and never executed in
  production automatically.
- Events using Speaking Rooms call the existing room authorization boundary;
  an event record cannot grant room role or media access by itself.
- No real-money transaction, paid provider, production notification/media/AI
  activation, production deployment or production database mutation is in
  scope.
