# Phase 02 Acceptance

## Local implementation evidence

- [x] Email/password registration/login, verification, recovery, generic
  errors, password policy, and rate limits are implemented and tested.
- [x] Session expiry, refresh rotation, replay-family revocation, logout,
  logout-all, CSRF, and server authorization primitives are implemented and
  tested.
- [x] Google authorization-code/state/nonce adapter, unified continuation
  flow, collision/linking behavior, and live production callback are verified.
- [x] Facebook/Zalo/Apple contracts and independent disabled configuration
  paths fail closed without fake completion.
- [x] Account collisions never merge by email; explicit session-bound linking
  is enforced.
- [x] Auth UI follows the existing Stitch design system, covers recovery and
  error states, and passes responsive/accessibility checks.
- [x] Backend and frontend local tests, typecheck, lint, build, and high-level
  dependency audit pass.

## LNG-02-009 visual remediation

- [x] Canonical Auth inventory and source-of-truth IDs are recorded in
  `UI-STITCH.md` and `evidence/phase-02/LNG-02-009-EVIDENCE.md`.
- [x] Actual Stitch raster exports were retrieved and inspected for Login,
  Register, Recovery, and Auth Recovery States.
- [x] Login and Register have 1440px and 390px runtime rasters with
  side-by-side, overlay, and pixel-difference evidence.
- [x] Owner-requested mobile compact Footer surface is unified to
  `#F2F4F0`; desktop Footer treatment remains unchanged.
- [x] Recovery, verification, provider-disabled, session-expired, and OAuth
  collision/linking states have runtime rasters and side-by-side evidence.
- [x] Responsive checks cover 320, 375, 390, 412, 768, 1024, and 1440px;
  no horizontal overflow was observed.
- [x] Owner visual acceptance was granted on 2026-09-10. LNG-02-009 is
  `DONE`; the accepted Frontend-Web `main` SHA is
  `c5fba7b18fe1865c460e8b4d8aac72249558f0bd`.

The remediation is limited to Frontend-Web and Workspace. It does not alter
Backend auth/security, database schema, sessions, OAuth credentials, or
migrations.

LNG-02-008 reconciliation: implementation, visual UX, publication, CI, and
live Google provider/callback verification are complete. `BLOCKER-02-001` is
resolved; publication, remote SHA, and CI evidence are recorded above. The
owner-rejection and pre-acceptance remediation history remains preserved in the
existing evidence and git history.

## Production rollout acceptance — 2026-09-17

- [x] Backend `main` is `02c3cfa5f4a2d0e7bb4e882a863d17723217ee0c`; Backend CI
  run `35207854499` completed successfully.
- [x] Frontend `main` is `08820da4dc3adf9e2d4e07d70f52f685aeff3f1a`; Frontend CI
  run `35207852817` completed successfully.
- [x] Render reports the Backend deployed at the Backend SHA above.
- [x] Vercel Production reports the Frontend deployed at the Frontend SHA
  above.
- [x] Vercel `/api/v1/auth/providers` returns HTTP 200 with Google enabled.
- [x] Vercel OAuth start returns a Google redirect and uses the exact callback
  URI `https://cong-dong-ngon-ngu-sigma.vercel.app/api/v1/auth/oauth/google/callback`.
- [x] Production `/login` and `/register` render enabled `Tiếp tục với Google`
  controls after provider capabilities load.
- [x] Real Google account selection and consent returned the browser to the
  authenticated production app home.

No direct or manual production database mutation was performed. Phase 02 is
`DONE`; later phases retain their existing states.
