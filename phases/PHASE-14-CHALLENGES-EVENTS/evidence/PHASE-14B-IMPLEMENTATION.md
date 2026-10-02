# Phase 14B Implementation Evidence

**Task:** `LNG-14-002` — Challenge Discovery & Participation
**Status:** PASS — integrated into remote `main`
**Date:** 2026-10-02

## Scope delivered

- Public-safe challenge discovery and detail projections hide draft definitions.
- Authenticated join, leave and progress routes use server-owned participation
  state and CSRF validation; join is idempotent.
- Challenge progress and participant counts are projected from trusted backend
  state rather than client claims.
- Frontend route `/challenges` provides discovery, filters, search, detail,
  join/leave, progress, completed/expired/cancelled states, and truthful
  loading, empty and error states.
- Vietnamese finite-goal copy avoids shame language and fake urgency.
- Responsive desktop/mobile layout and keyboard-accessible controls follow the
  Phase 14 Stitch direction.

## Backend delivery

- Feature commit: `0ae80e4d6df1f224e0e5101cda5baf6d1bb99953`
- Pull request: [#24](https://github.com/CongDongNgonNgu/CongDongNgonNgu-Back-End/pull/24)
- Remote `main` merge commit: `65f670873d92c133a6b689b332595348b582d9ed`
- Post-merge CI: run `36949241768`, job `quality=success`
- Routes delivered:
  - `GET /api/v1/challenges`
  - `GET /api/v1/challenges/:id`
  - `GET /api/v1/challenges/:id/progress`
  - `POST /api/v1/challenges/:id/join`
  - `DELETE /api/v1/challenges/:id/join`

## Frontend delivery

- Feature commit: `23852f7ccfbf98adbf991aa864f7fbc782684b53`
- Pull request: [#15](https://github.com/CongDongNgonNgu/CongDongNgonNgu-Front-End-Web/pull/15)
- Remote `main` merge commit: `b9787ccae2e2b3ce25f756491a27f3b8add1f6a8`
- Post-merge CI: run `36949423776`, job `quality=success`
- Route: `/challenges`
- Stitch references used: project `14639103242845084916`, desktop screen
  `070606232650464f80c5e13d30663e88`, mobile screen
  `84a3e0bd57eb415392829fda3dcbe881`.

## Verification

- Backend: 124 suites / 753 tests passed; focused challenge coverage was 6
  suites / 16 tests; typecheck and build passed.
- Frontend: 68 files / 283 tests passed; typecheck and build passed; audit
  reported 0 vulnerabilities at the configured high threshold.
- Browser verification: desktop and mobile Lighthouse accessibility, best
  practices, SEO and agentic categories were each 100.
- Local browser verification exercised the truthful API-unavailable state
  because the backend was not started against external environment services;
  no production service or database was touched.
- No migration was executed or changed by this subphase.

## Source-control closeout

- Backend and frontend PR gates passed before merge.
- Remote default branches were verified at the merge commits above.
- Post-merge CI passed for both repositories.
- `phase-14b-challenge-discovery` was deleted from both remotes and local
  repositories; stale remote-tracking refs were pruned.

## Next action

`14C` / `LNG-14-003` — Event Model & Scheduling.
