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

## External gates

- [ ] Live Google callback verification — BLOCKED_EXTERNAL: no
  CongDongNgonNgu-owned Google credentials are present.
- [x] Phase 02 remote SHA verification — Backend, Frontend, and Workspace
  origin/main match their local Phase 02 HEADs. CI was not independently
  verified in this session.

Phase 03 is not started. Do not mark Phase 02 DONE until the two external
gates above are resolved and the remote evidence is recorded.
