# Phase 07C implementation evidence

Date: 2026-09-18
Scope: LNG-07-004 Connection Requests & Relationship Lifecycle; LNG-07-005 Buddy Profile Preview
Branches: `phase-07c-connections-profile` in backend, frontend, and workspace repositories
Publication: final Phase 07C publication evidence
Owner visual acceptance: `YES`

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
- `npm.cmd test -- --runInBand`: 25 suites, 114 tests passed
- `npm.cmd run test:e2e -- --runInBand`: 9 suites, 44 tests passed
- `npm.cmd run build`: pass
- `npm.cmd audit --omit=dev`: 0 vulnerabilities
- `git diff --check`: pass
- Exact-SHA Backend CI run `35326438140`: SUCCESS for `a71cf48ea34e4aac6a9d751c2034b3fbc6254248`.
- Exact-SHA Frontend CI run `35326486949`: SUCCESS for `b44e6e875cca5b0597363cfe3283c67067fab899`.
- Real Neon TEST crossing verification: two valid disposable participants issued opposite requests concurrently; two operations completed safely, one canonical row ended `CONNECTED`, both viewpoints read `CONNECTED`, retries remained idempotent, and scoped cleanup passed.

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
- Migration applied to Neon TEST: `YES` (`0001-0006 SKIP`, `0007 APPLY/DONE`).
- Immediate second migration run: `0001-0007 SKIP`, database up to date.
- Migration applied to production: `NO`.
- Disposable TEST users/relationship rows were removed by exact UUID scope after concurrency verification.
- Backend and Frontend `main` were fast-forwarded without merge commits; no deployment occurred.

## External review remediation

- Connection requests now require the authenticated requester to be active/verified, opted in, stored-preference valid, and ready with offered and wanted languages. Requester discoverability remains optional; target eligibility still enforces discoverability, privacy, and safety rules.
- The crossing-request E2E now disconnects the prior relationship before concurrent opposite-direction requests, verifies both viewpoints converge to `CONNECTED`, checks the canonical repository record, and retries idempotently.
- A recording event sink test covers requested, connected, declined, cancelled, and disconnected transitions and proves duplicate retries do not publish duplicate transition events. Phase 12 delivery remains unimplemented.
- Migration `0007` adds the participant-B/status index while preserving the canonical pair, requester index, foreign keys, checks, unique constraint, and unchanged down migration.
- `POSTGRES_23505_STATIC_REVIEW=PASS` via a focused repository retry test. `POSTGRES_REAL_CONCURRENCY_TEST=PASS` against Neon TEST.
- Frontend source and tests are unchanged for this remediation.

## Final Phase 07C publication evidence

- `OWNER_VISUAL_ACCEPTANCE_07C=YES`.
- Backend main: `a71cf48ea34e4aac6a9d751c2034b3fbc6254248`; CI run `35326438140` SUCCESS.
- Frontend main: `b44e6e875cca5b0597363cfe3283c67067fab899`; CI run `35326486949` SUCCESS.
- Workspace final publication evidence commit: `THIS_COMMIT` (the resulting commit is fast-forwarded to Workspace main after commit).
- `PHASE_07=IN_PROGRESS`; `LNG_07_001` through `LNG_07_005` are DONE; `LNG_07_006` and `LNG_07_007` remain PLANNED; `PHASE_07C=DONE`.
- Stitch references and the 320/375/390/412/768/1024/1440 responsive and accessibility evidence remain recorded above.
- `MIGRATION_0007_TEST=PASS`, `POSTGRES_REAL_CONCURRENCY_TEST=PASS`, `PRODUCTION_DB_MUTATED=NO`, `DEPLOYED=NO`.
