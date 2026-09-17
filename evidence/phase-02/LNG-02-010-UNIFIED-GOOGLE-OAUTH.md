# LNG-02-010 — Unified Google OAuth continuation flow

Date: 2026-09-17

Status: `DONE`; production rollout and real Google browser callback verified
on 2026-09-17. Approved CongDongNgonNgu Google credentials were already
configured in Render and were not exposed or changed.

## Published commits

| Repository | Branch | Commit | Remote SHA |
| --- | --- | --- | --- |
| Backend | `main` | `02c3cfa5f4a2d0e7bb4e882a863d17723217ee0c` | verified equal |
| Frontend | `main` | `08820da4dc3adf9e2d4e07d70f52f685aeff3f1a` | verified equal |
| Workspace | `main` | `aa3d5d9a7f11455cfe406fe938583a75a33b8933` | local evidence commit; final follow-up pending |

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
- No direct or manual production database mutation was performed. The one
  production OAuth browser check used the normal application flow.

## Remote and deployment evidence

- GitHub Actions completed successfully for both `main` SHAs: Backend run
  `35207854499`; Frontend run `35207852817`.
- Production deployment evidence:
  - Render live commit: `02c3cfa5f4a2d0e7bb4e882a863d17723217ee0c`.
  - Vercel Production live commit: `08820da4dc3adf9e2d4e07d70f52f685aeff3f1a`.
- Public production checks responded as follows:
  - Vercel `/login`: HTTP 200.
  - Vercel `/register`: HTTP 200.
  - Vercel `/api/v1/auth/providers`: HTTP 200 with Google enabled.
  - Vercel `/api/v1/auth/oauth/google/start`: HTTP 302 to Google.
  - OAuth redirect callback URI: `https://cong-dong-ngon-ngu-sigma.vercel.app/api/v1/auth/oauth/google/callback`.
  - Real Google browser flow: returned to the authenticated production app home.

Phase 02 is now `DONE`; no later phase was rolled back. The remaining open
Workspace blocker is unrelated Phase 05D process-local rate limiting.
