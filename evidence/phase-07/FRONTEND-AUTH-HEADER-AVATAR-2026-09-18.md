# Frontend Authenticated Header Avatar Regression

Date: 2026-09-18

Status: `DONE`

## Scope

The authenticated header now uses the single `AuthProvider.user.displayName`
source already used by the Language Passport. `RoutedApp` passes that value
through `AppShell` and `Header`; DesktopHeader and MobileHeader receive the
same resolved name. A generic `Thành viên` fallback is used only when the
display name is unexpectedly absent.

Both header avatars derive their initials from the resolved name, and their
account control labels include the actual user name. The hard-coded
`Người học`/`NH` header values were removed. No backend contract, auth/session
behavior, route, database, or production data was changed.

## Verification

- Regression tests cover AuthProvider user `Tan Trieu` rendering `TT` in both
  desktop and mobile header avatars and using the real name in accessibility
  labels.
- A generic missing-name fallback is covered.
- Frontend tests: 35 files / 159 tests passed.
- Typecheck, lint, build, and `npm audit --audit-level=high` passed; audit
  reported 0 vulnerabilities.
- Frontend `main` and `origin/main`: `66a3af2148d8b3bd83e095685d1e7a4ab7bca616`.
- GitHub Actions quality run
  `35298249896` completed successfully for that exact SHA.
- Vercel showed the exact SHA as Ready in Production. The custom-domain HTML
  served a new hashed bundle containing the `userDisplayName` flow and
  `Tài khoản của` account label; the legacy `NH, Tài khoản` label was absent.
- The existing authenticated browser session expired during a reload, so no
  authenticated production screenshot is claimed as evidence.
- No production database mutation was performed.

## Branch hygiene

The merged `fix/auth-user-header-avatar` branch was deleted locally and from
the Frontend remote after `main` and CI verification.
