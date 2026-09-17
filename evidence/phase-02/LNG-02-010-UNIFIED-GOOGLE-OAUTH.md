# LNG-02-010 — Unified Google OAuth continuation flow

Date: 2026-09-17

Status: LOCAL_VERIFIED; Phase 02 remains `BLOCKED_EXTERNAL` because approved
CongDongNgonNgu Google OAuth credentials and a live callback verification are
still unavailable.

## Published commits

| Repository | Branch | Commit | Remote SHA |
| --- | --- | --- | --- |
| Backend | `phase-07b-matching-discovery` | `02c3cfa5f4a2d0e7bb4e882a863d17723217ee0c` | verified equal |
| Frontend | `phase-07b-matching-discovery` | `08820da4dc3adf9e2d4e07d70f52f685aeff3f1a` | verified equal |

## Behavior delivered

- Existing Google provider subjects resolve to the existing active user and
  issue a session.
- A first-time verified Google identity with an unused email creates an
  `ACTIVE` passwordless user, creates the Google provider account, and issues
  a session.
- A verified Google email already owned by another account raises
  `AUTH_ACCOUNT_COLLISION`; no automatic email-based link is created.
- Repeated Google callbacks reuse the same user/provider records.
- Provider-subject uniqueness, one-time OAuth state, callback validation,
  verified-email checks, session issuance, CSRF/session protections, and
  explicit authenticated linking remain in place.
- Login and register both use the single `Tiếp tục với Google` action. The
  callback maps `AUTH_ACCOUNT_COLLISION` to the explicit sign-in-then-link
  recovery guidance.
- `vercel.json` now proxies `/api/v1/:path*` to the backend before the SPA
  fallback.

## Verification

- Backend targeted OAuth suite: 10 tests passed.
- Backend unit suites: 23 suites / 107 tests passed.
- Backend E2E suites: 9 suites / 43 tests passed.
- Frontend suites: 34 files / 157 tests passed.
- Backend and frontend typecheck, lint, build, and high-severity npm audit
  passed; both audits reported 0 vulnerabilities.
- Local browser runtime checked `/login`, `/register`, and the collision
  callback state at `http://127.0.0.1:5174`.
- No production database was mutated.

## Remote and deployment evidence

- GitHub Actions returned no run for either feature-branch SHA. Both CI
  workflows trigger only on `main` pushes or pull requests targeting `main`.
- Existing public endpoints responded as follows during read-only checks:
  - Vercel `/login`: HTTP 200.
  - Render `/api/v1/health`: HTTP 200.
  - Render `/api/v1/auth/providers`: HTTP 200.
  - Current Vercel `/api/v1/health`: HTTP 404, confirming the current public
    deployment has not yet picked up the feature-branch rewrite.

The remaining gate is to merge/deploy the frontend branch through the normal
Vercel workflow, then run the real Google authorization-code callback with
approved CongDongNgonNgu credentials. No EduAI credentials may be reused.
