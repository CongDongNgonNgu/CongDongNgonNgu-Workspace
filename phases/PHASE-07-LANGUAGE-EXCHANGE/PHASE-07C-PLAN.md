# Phase 07C Implementation Plan

## Scope

Implement only:

- LNG-07-004 — connection requests and relationship lifecycle.
- LNG-07-005 — authenticated Buddy Profile Preview reachable from Partner Discovery.

Messaging, notifications, rooms, reputation, block/report mutations, and unrelated profile redesign remain out of scope.

## Design decisions

1. Persist one canonical unordered participant pair per relationship. The row stores the requester while pending and transitions to `CONNECTED` when a reciprocal pending request arrives.
2. `NONE -> OUTGOING_PENDING -> CONNECTED` and `NONE -> INCOMING_PENDING`; pending rows support accept, decline, and cancel. Connected rows support disconnect. Decline, cancel, and disconnect remove the active row and return `NONE`.
3. Relationship mutation methods are atomic at the repository boundary. The database enforces pair uniqueness; the in-memory adapter serializes mutations for deterministic tests.
4. Actor identity is derived from the authenticated session. Mutation endpoints have no actor/user id body parameter.
5. Buddy preview reuses the exchange public projection and adds a relationship state/action model. It excludes contact data, provider/session data, exact timezone, exact availability, and unsupported reputation/activity claims.
6. The event publisher is an injectable no-op seam for later notification work; Phase 07C does not deliver notifications.
7. A new sequential backend migration `0007` will be added if required. It will be statically verified only and will not be applied to Neon TEST or production in this task.

## Work slices

### A. Contract and persistence

- Define relationship response/state and mutation contracts.
- Add the `0007` schema with canonical pair uniqueness and status/requester constraints.
- Add in-memory and PostgreSQL repository adapters.
- Add focused repository/service tests for idempotency, reciprocal convergence, authorization, and race-safe uniqueness.

### B. Backend integration

- Add authenticated controller endpoints for request, accept, decline, cancel, disconnect, and relationship inspection.
- Wire the repository and event seam through `ExchangeModule`.
- Include relationship state in the safe buddy projection.
- Remove exact timezone exposure from the exchange projection and update regression tests.
- Run backend unit, e2e, type, lint, build, audit, and migration diff checks.

### C. Frontend preview

- Extend the exchange API/types with the preview and lifecycle actions.
- Add a responsive `/exchange/profile/:userId` page using existing shared UI primitives.
- Expose the page from Partner Discovery and keep `/profiles/:userId` as the generic public passport route.
- Cover all four relationship states, loading/error/success behavior, duplicate-click prevention, and safe-field projection.
- Run frontend unit/component, type, lint, build, audit, Playwright, and browser runtime checks.

### D. Evidence and handoff

- Verify 320/375/390/412/768/1024/1440 widths, keyboard/focus, semantic landmarks, status announcements, and no overflow.
- Record Stitch references for the desktop and mobile Buddy Profile Preview directions.
- Update Phase 07C handoff/evidence without publishing to `main`.
- Stop with owner visual acceptance pending; no deployment.

## Exit criteria

- Backend and frontend changes are on `phase-07c-connections-profile` only.
- Required tests and static checks pass, with any environment-limited checks explicitly reported.
- Migration is not applied unless a fresh explicit owner authorization is received.
- Screenshots and responsive/accessibility evidence are prepared for owner review.
- `OWNER_VISUAL_ACCEPTANCE=PENDING` remains the final gate.
