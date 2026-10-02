# Phase 17C Evidence — Web/Input/Upload and Secrets/Configuration Security

**Date:** 2026-10-02

**Tasks:** LNG-17-003, LNG-17-007 — PASS

**Subphase:** 17C — PASS (Backend main and Workspace evidence; Phase 17 remains IN_PROGRESS)

## Verified heads and change lineage

| Item | Evidence |
| --- | --- |
| Backend 17C implementation commit | `ba207fa000a390aba2baa41c60ae066ab982cc13` |
| Backend PR | #34 — merged with `CI / quality` 1/1 passed |
| Backend merge/main SHA | `76fb2732a62da5437ed4390f74ebe0fb507fca46` |
| Frontend reviewed main SHA | `620f17c5f8b742fe4062e91fa33b9455d2b8a036` |
| Workspace evidence baseline | `fddb7360cfcb1474c3bce76a593424cee436e03b` |

The Backend feature commit was verified as an ancestor of remote `main`, then
the remote and local temporary branches were deleted after merge. Frontend
remained clean on `main`; Workspace evidence is recorded on the dedicated
17C evidence branch and will be merged before the 17D relay.

## M-001 remediation and provider boundary

The reviewed OAuth adapter performed token and profile `fetch` calls without an
explicit deadline. Backend PR #34 adds a 10-second abort deadline for both
requests, bounds the OAuth JSON response read by the same deadline, and keeps
transport/provider failures normalized as `AUTH_OAUTH_FAILED`. The configured
email provider received the same abort-boundary treatment because it is the
only other runtime backend `fetch` provider in the reviewed source.

Executable evidence:

- `src/auth/oauth/oauth.adapters.spec.ts`: a hanging provider request is
  aborted and becomes an OAuth failure.
- `src/auth/email/email.provider.spec.ts`: a hanging configured email request
  is aborted and becomes an `EmailDeliveryError`.
- Existing OAuth service/configuration tests remain green.

M-001 is closed on Backend main at
`76fb2732a62da5437ed4390f74ebe0fb507fca46`.

## Web, input, upload and outbound review

- Nest global validation uses transform, whitelist and
  `forbidNonWhitelisted`; application responses set `nosniff`, `DENY`, strict
  referrer policy, restrictive CSP and production HSTS. CORS uses configured
  explicit origins and credentials; existing cookie mutation paths retain
  double-submit CSRF checks.
- No runtime multipart upload controller, `FileInterceptor` or `UploadedFile`
  route exists in the reviewed source. Upload scanning/quarantine is therefore
  not claimed as an active route. Test-only Tatoeba import code already
  enforces canonical `api.tatoeba.org` HTTPS URLs, redirect rejection,
  bounded request/response behavior, preflight checks and zero-write safety.
- Frontend source contains no raw HTML injection sink or markdown renderer.
  API bases reject protocol-relative URLs, credentials, query/fragment parts
  and blocked external-product hosts. User-facing external library links are
  scheme-checked; payment checkout links require HTTPS and no credentials;
  OAuth starts are server-relative or validated API URLs. The service worker
  keeps API, auth, payment, mutation and private routes network-only.
- Repository query review found parameterized values and fixed server-side
  clause selection; no user-controlled SQL identifier interpolation was found.

H-003's 17C input/upload/config portion has no confirmed exploitable finding;
content/markdown and AI-output coverage remains explicitly owned by 17D.

## Secrets, dependency and configuration review

- `.env` is ignored in both repositories and only `.env.example` is tracked.
  Suppressed-value credential-marker scans over both repositories and tracked
  `.env` history returned no exposed credential marker.
- Production environment validation rejects non-HTTPS public/provider URLs,
  blocked external-product hosts, placeholder or too-short JWT/provider
  secrets, memory persistence and incomplete configured-provider state. Provider
  capability routes remain disabled/fail-closed unless configuration is
  explicitly supplied; no provider was activated.
- Backend and Frontend `npm audit --audit-level=high` each reported
  `0 vulnerabilities`.

M-003 is closed by the source/config/history/dependency evidence above.

## Required gates

- Focused Backend provider/config/import runs: 9 suites / 58 tests across the
  final 17C runs — PASS.
- Focused Frontend security runs: 5 files / 26 tests — PASS.
- Full Backend unit: 144 suites / 811 tests — PASS.
- Backend E2E: 17 suites / 73 tests — PASS.
- Full Frontend regression: 82 files / 339 tests — PASS.
- Backend and Frontend typecheck/build, Backend lint and both high-severity
  dependency audits — PASS.
- `git diff --check` — PASS.
- Remote Backend PR CI: `CI / quality` 1/1 — PASS.

## Scope and residual gates

- H-002 ownership matrices, H-003 content/markdown completion, H-004 AI
  boundary checks and H-005 commerce checks remain future 17D–17E gates.
- No production deployment/restart, production database write or migration,
  provider activation, secret mutation, force push, CI bypass or live
  payment/AI action was performed.
- Phase 18 is not started. The next eligible subphase is 17D.

## Acceptance

17C satisfies LNG-17-003 and LNG-17-007: actual web/input/upload and
secrets/dependency/configuration surfaces were audited, verified defects were
fixed with regression coverage, required local and remote gates passed, M-001
and M-003 are closed, and remaining security gates are explicitly carried
forward. Phase 17 remains in progress; Phase 18 is not started.
