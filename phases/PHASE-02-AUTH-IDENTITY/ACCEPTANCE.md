# Phase 02 Acceptance

## Local implementation evidence

- [x] Email/password registration/login, verification, recovery, generic
  errors, password policy, and rate limits are implemented and tested.
- [x] Session expiry, refresh rotation, replay-family revocation, logout,
  logout-all, CSRF, and server authorization primitives are implemented and
  tested.
- [x] Google authorization-code/state/nonce adapter and collision/linking
  behavior are implemented; live verification remains external.
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
- [x] Recovery, verification, provider-disabled, session-expired, and OAuth
  collision/linking states have runtime rasters and side-by-side evidence.
- [x] Responsive checks cover 320, 375, 390, 412, 768, 1024, and 1440px;
  no horizontal overflow was observed.
- [x] Final owner acceptance is intentionally pending. LNG-02-009 is
  `VERIFYING`, not `DONE`.

The remediation is limited to Frontend-Web and Workspace. It does not alter
Backend auth/security, database schema, sessions, OAuth credentials, or
migrations.

## External gates

- [ ] Live Google callback verification — BLOCKED_EXTERNAL: no
  CongDongNgonNgu-owned Google credentials are present.
- [x] Phase 02 remote SHA verification — Backend remains at
  `25ad79cfa5740271fd925dfc4140a3d828ee98cc`; Frontend remediation commit
  `49a7cbcb049f6c1bc3d0d69c353d16d913cd9e82` matches origin/main and its
  Frontend CI run `34340961369` passed; Workspace evidence commit
  `2698f14fdec18e5390fd0329224e39ba2df6b985` matches origin/main before this
  handoff reconciliation follow-up.

Phase 03 is not started. Do not mark Phase 02 DONE until the two external
gates above are resolved and the remote evidence is recorded. LNG-02-009 does
not resolve the Google credential blocker; `PHASE_02=BLOCKED_EXTERNAL` remains
accurate.
