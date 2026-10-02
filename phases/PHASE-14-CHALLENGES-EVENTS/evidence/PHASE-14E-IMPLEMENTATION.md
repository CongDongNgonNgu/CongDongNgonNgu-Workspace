# Phase 14E Implementation Evidence

**Task:** `LNG-14-006` - Event UI
**Status:** PASS - integrated into remote `main`
**Date:** 2026-10-02

## Scope delivered

- Added project-native event discovery at `/events` with search, state and
  language filters, loading/error/offline/empty states and chronological
  cards.
- Added event detail at `/events/:eventId` with backend facts, public host
  profile lookup, local date/time formatting and explicit IANA timezone.
- Added guest login guidance and protected registration/cancellation states,
  including truthful cancelled, full, waitlist, past and private-event
  handling based on server responses.
- Preserved the Speaking Room authorization boundary: event registration does
  not grant room access or a room role.
- Reused the approved Phase 14 Stitch direction and existing frontend tokens
  and primitives. No new Stitch asset was required.
- Intentionally omitted host/create UI because the available frontend/backend
  capability does not yet cover safe room/host authorization.

## Frontend delivery

- Feature commit: `9eae958c76e6290c184853382a44e01b3bd88b59`
- Pull request: [#16](https://github.com/CongDongNgonNgu/CongDongNgonNgu-Front-End-Web/pull/16)
- Remote `main` merge commit: `f4e05c9ee5713454b41545641a6b27281635fda9`
- Exact-head CI: run `36956896550`, `conclusion=success`
- Post-merge quality CI: run `36957015003`, `conclusion=success`
- Feature branch `phase-14e-event-discovery-ui` was deleted remotely and
  locally; stale refs were pruned.

## API and safety boundary

- Discovery uses `GET /api/v1/events` with server-supported state, language
  and limit filters.
- Detail uses `GET /api/v1/events/:eventId`; optional authentication is
  preserved for private-event access decisions.
- Registration state and mutations use the protected event registration
  endpoints. The UI does not infer attendee counts or remaining seats when
  the API does not provide them, and waitlist messaging is shown only from a
  server response.
- Host display uses the public profile endpoint with a truthful generic
  fallback when profile data is unavailable. Private detail remains fail
  closed through the backend contract.
- No production database, migration, provider, credential, payment or
  deployment operation was performed.

## Verification

- `npm test -- --run`: 72 files / 297 tests passed.
- `npm run lint` passed.
- `npm run typecheck` passed.
- `npm run build` passed; the existing Vite large-chunk warning remained
  non-blocking.
- `npm audit --audit-level=high`: 0 vulnerabilities.
- Local browser QA used only a temporary in-memory fixture and loopback
  services. Discovery card, detail navigation, host/time facts, semantic
  `<time>`, named controls, focus behavior and accessibility tree were
  verified. Responsive CSS breakpoints for 320px/480px/768px/1024px layouts
  were reviewed; no production endpoint or database was used.

## Next action

`14F` / `LNG-14-007` - Recurrence/Timezone & Safety Reconciliation and final
Phase 14 gate.
