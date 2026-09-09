# Phase 02 Handoff

Date: 2026-09-09

Phase status: BLOCKED_EXTERNAL

Phase 03 was not started. The user-supplied PROMPT.md remains the
authoritative implementation specification.

## Task states

| Task | State | Local result | Open gate |
| --- | --- | --- | --- |
| LNG-02-001 | VERIFYING | Opaque identity, provider/session schema, roles guard, constraints, and decision record | Commit and remote evidence |
| LNG-02-002 | VERIFYING | Registration/login, password hashing, generic errors, rate limits, accessible UI | Commit and remote evidence |
| LNG-02-003 | VERIFYING | Verification, resend, recovery, reset, expiry/single-use/revocation | Commit and remote evidence |
| LNG-02-004 | VERIFYING | HMAC access tokens, HttpOnly refresh rotation, replay-family revocation, logout, CSRF | Commit and remote evidence |
| LNG-02-005 | BLOCKED_EXTERNAL | Backend-owned Google code flow, state/nonce, collision handling, disabled fail-closed path | CongDongNgonNgu Google credentials and live callback |
| LNG-02-006 | VERIFYING | Facebook/Zalo/Apple contracts and independently disabled configuration | Commit and remote evidence |
| LNG-02-007 | VERIFYING | Explicit session-bound linking and collision protection | Commit and remote evidence |
| LNG-02-008 | BLOCKED_EXTERNAL | Stitch reconciliation, route states, browser/a11y/security review complete locally | Commit, remote SHA, CI, and live-provider evidence |

VERIFYING means local implementation and tests pass but the required
repository-history publication gate was rejected by the environment reviewer.
No task is falsely marked DONE.

## Repository evidence

| Repository | Last local commit | Remote origin/main | Phase 02 working tree |
| --- | --- | --- | --- |
| Backend | c5a5614f9db1a95b545f0a197e6b04fd1d3eb2b5 | d27fc4fc88053ee00cb56c2390ac6fcf5bdcf860 | Final hardening, migrations, and tests staged/uncommitted |
| Frontend | 47862c119e3af122c063332c1f4ee73beebea998 | 47862c119e3af122c063332c1f4ee73beebea998 | Phase 02 UI and tests staged/uncommitted |
| Workspace | 6598f2c40ba73fb7457a51a798475a19b9c87cb6 | 6598f2c40ba73fb7457a51a798475a19b9c87cb6 | Phase 02 state/evidence uncommitted in the working tree |

The backend core commit c5a5614 is local and ahead of the backend remote.
The final backend hardening and frontend changes have no commit SHA yet
because the environment reviewer rejected the commit operation. The
The user-provided phases/PHASE-02-AUTH-IDENTITY/PROMPT.md was included in the
Workspace handoff as the authoritative implementation specification.

Backend CI: NOT RUN for the uncommitted Phase 02 state.
Frontend CI: NOT RUN for the uncommitted Phase 02 state.
Remote SHA verification: NOT AVAILABLE for the Phase 02 changes.

## Local verification

- Backend: 7 unit suites / 33 tests passed; 2 E2E suites / 8 tests passed.
  Typecheck, lint, build, and npm audit --audit-level=high passed; audit
  reported 0 vulnerabilities.
- Frontend: 8 test files / 31 tests passed. Typecheck, lint, build, and npm
  audit --audit-level=high passed; audit reported 0 vulnerabilities.
- Browser: login form checked at exact 320, 375, 390, 412, 768, 1024, and
  1440px with no horizontal overflow and visible primary controls. Auth
  route/state checks passed at 390px. Keyboard traversal, invalid-field focus,
  role=alert announcements, mobile menu dialog, Escape close, and focus
  restoration were inspected.
- Final Chrome DevTools smoke on 2026-09-09 loaded `/login` against isolated
  local API/web ports, confirmed the responsive mobile layout and accessible
  labels/disabled-provider state, measured no horizontal overflow, and found
  no console messages.
- Lighthouse mobile snapshot: Accessibility 100, Best Practices 100, SEO
  100, Agentic Browsing 100; 40 checks passed and 0 failed.
- No production database, deployment, or EduAI repository was accessed for
  mutation.

## Migration and persistence

database/migrations/0001_identity.sql is the reproducible PostgreSQL schema;
0001_identity.down.sql is a development/recovery reversal and the
migration README documents execution. The schema includes users, roles,
provider accounts, auth sessions, single-use auth tokens, and OAuth
transactions with foreign keys and uniqueness constraints. PostgreSQL is the
default outside tests; memory persistence is rejected in production.
Migration execution has not been verified. The latest configuration check
confirmed a non-empty DATABASE_URL without exposing its value; psql remains
unavailable. The configured database has not been contacted or mutated.

## Auth architecture

Internal UUID user IDs are independent from canonical email and provider
subjects. Email/password users begin in VERIFICATION_PENDING and require
verified email plus ACTIVE status to log in; DISABLED users are denied.
Passwords use Node scrypt with bounded parameters. Verification and reset
secrets are opaque, hashed, expiring, single-use records.

Access tokens are short-lived HMAC tokens with sub, sid, roles, iat, and exp
claims. Refresh credentials are opaque, hashed server records in a family,
issued in an HttpOnly cdn_refresh cookie scoped to /api/v1/auth. Production
adds Secure; SameSite=Lax, explicit CORS, and double-submit cdn_csrf
protection are used. Rotation invalidates the old credential; replay revokes
the family. Current logout, logout-all, password-reset session revocation,
and reusable server Roles/CurrentUser primitives are implemented.

Google uses a backend-owned authorization-code adapter with fixed configured
redirect, opaque hashed one-time state, state-as-nonce request, provider
subject/email/verified-email validation, and no implicit email merge.
Linking records and rechecks the exact initiating user/session and requires
CSRF-protected authenticated action. Facebook, Zalo, and Apple have
configuration and adapter contracts but remain disabled/no-fake-completion.
Unlinking is deferred.

## Stitch and UX evidence

Stitch project: projects/3718538619973058970
Design system: assets/16442026920550574436
Confirmed auth screen: projects/3718538619973058970/screens/dc4936bcd60d44b888537c21f19cd08d

Preserved rasters:
evidence/phase-02/STITCH-login-desktop.png
evidence/phase-02/STITCH-login-mobile.png
evidence/phase-02/STITCH-register-desktop.png
evidence/phase-02/STITCH-register-mobile.png
evidence/phase-02/STITCH-recovery-desktop.png
evidence/phase-02/STITCH-recovery-mobile.png
evidence/phase-02/STITCH-states-desktop.png
evidence/phase-02/STITCH-states-mobile.png

Runtime screenshots were inspected inline through Chrome DevTools; the
browser exporter could not write into this workspace path. The comparison
record and exact reconciliation are preserved in UI-STITCH.md. The UI keeps
the accepted Be Vietnam Pro/navy/orange/green system, real labels,
form-first mobile behavior, restrained motion, safe generic recovery
messages, and backend-driven provider availability.

## Security review

The adversarial review covered enumeration, session fixation, refresh replay,
provider/email collision takeover, OAuth state/link binding, open redirects,
brute-force limits, server-side authorization, browser token storage, CSRF,
production transport, and log exposure. The review fixed session-bound OAuth
linking, provider-email collision protection, server role guard coverage,
canonical service-level email handling, PostgreSQL role array mapping,
non-consuming invalid reset attempts, and frontend auth demotion after refresh
or logout failure. Production app/CORS/OAuth redirect/email URLs now require
HTTPS. No blocking local finding remains. Logs record event names and opaque
local user IDs only; raw passwords, hashes, tokens, OAuth codes, and provider
secrets are not logged. Shell logout actions consume rejected server calls so
network failures do not become unhandled browser promise errors.

## External blockers and next action

1. BLOCKER-02-001: supply approved CongDongNgonNgu Google credentials and run
   the real authorization-code callback/browser verification. Do not reuse
   EduAI credentials.
2. BLOCKER-02-002: direct user authorization is required by the environment
   reviewer for local commit and exact origin/main publication. After that,
   verify remote SHAs and available GitHub Actions runs for Backend, Frontend,
   and Workspace.

Only after those gates are resolved may the phase transition to DONE and
Phase 03 become READY.
