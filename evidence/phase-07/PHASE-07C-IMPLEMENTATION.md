# Phase 07C implementation evidence

Date: 2026-09-18
Scope: LNG-07-004 Connection Requests & Relationship Lifecycle; LNG-07-005 Buddy Profile Preview
Branches: `phase-07c-connections-profile` in backend, frontend, and workspace repositories
Publication: not performed
Owner visual acceptance: `PENDING`

## Delivered

- Added authenticated relationship inspection and mutation endpoints for request, accept, decline, cancel, and disconnect.
- Derived the actor from the authenticated session; no mutation accepts an actor id in the request body.
- Added canonical unordered participant-pair storage, idempotent retries, reciprocal-request convergence, actor authorization checks, and an injectable no-op event seam.
- Added the sequential backend migration and down migration at `CongDongNgonNgu-Back-End/database/migrations/0007_language_exchange_connections.sql` and `.down.sql`.
- Added authenticated `/exchange/profile/:userId` preview routing from Partner Discovery.
- Reused the safe exchange projection: public languages, goals, interests, and coarse timezone/availability summaries only. Contact data, OAuth/session data, exact timezone, exact availability, reputation, activity, messaging, and block/report controls are not exposed or implemented in 07C.
- Added loading, error, success, disabled, live-status, and duplicate-click coverage for all four relationship states.
- Used the existing shared UI and responsive design tokens. The header avatar keeps its visual initials while its accessible name is keyboard/screen-reader safe.

## Stitch references

- Project: `projects/3718538619973058970`
- Shared design system: `assets/16442026920550574436`
- Desktop Buddy Profile Preview direction: `4c99d0418dec49f6ac66347cd04d0524`
- Mobile Buddy Profile Preview direction: `a97a8e338fcc491989335bc0109bcee3`

Illustrative identity, counts, reputation/activity, inbox/messaging, and state-tab concepts from the generated screens were treated as visual direction only and were not copied into product data.

## Verification

Backend:

- `npm.cmd run typecheck`: pass
- `npm.cmd run lint`: pass (repository script is the TypeScript check)
- `npm.cmd test -- --runInBand`: 24 suites, 111 tests passed
- `npm.cmd run test:e2e -- --runInBand`: 9 suites, 44 tests passed
- `npm.cmd run build`: pass
- `npm.cmd audit --omit=dev`: 0 vulnerabilities
- `git diff --check`: pass

Frontend:

- `npm.cmd run typecheck`: pass
- `npm.cmd run lint`: pass (repository script is the TypeScript check)
- `npm.cmd test -- --run`: 37 files, 169 tests passed
- `npm.cmd run build`: pass
- `npm.cmd audit --omit=dev`: 0 vulnerabilities
- `git diff --check`: pass

Browser runtime:

- Authenticated Buddy Profile Preview rendered at 1440px and 390px. Inline DevTools captures were supplied for owner review in this session.
- Width checks passed at 320, 375, 390, 412, 768, 1024, and 1440px. At desktop widths the 15px difference between `innerWidth` and `clientWidth` is the browser scrollbar; content `scrollWidth` matched `clientWidth`, so no horizontal content overflow was present.
- Semantic landmarks and headings were present; the first keyboard Tab reached the skip link and the next reached the mobile menu control.
- No console errors or warnings were reported on the authenticated preview route.
- Desktop Lighthouse snapshot: Accessibility 100, Best Practices 100, SEO 100, Agentic Browsing 100; 40 passed, 0 failed.
- Mobile Lighthouse snapshot: Accessibility 100, Best Practices 100, SEO 100, Agentic Browsing 100; 40 passed, 0 failed.

## Database and release boundary

- Migration required: `YES`.
- Migration applied to Neon TEST: `NO`.
- Migration applied to production: `NO`.
- Local browser verification used an in-memory seeded runtime; no database mutation occurred.
- `main` was not changed, pushed, merged, deployed, or published.

## Required next action

Owner reviews the supplied 1440px and 390px captures and replies exactly `OWNER VISUAL ACCEPTANCE: YES`. After that, a fresh explicit authorization is required before applying migration `0007` to Neon TEST. Publication remains blocked until those approvals are complete.
