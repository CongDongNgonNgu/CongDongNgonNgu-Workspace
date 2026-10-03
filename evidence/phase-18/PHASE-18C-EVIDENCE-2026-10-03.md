# Phase 18C Evidence - Clean Automated Regression

**Date:** 2026-10-03

**Task:** LNG-18-003

**Backend tested SHA:** `cdcbc6d3b0c942a417397b78a565a5e6a6939f91`

**Frontend tested SHA:** `01331d6e4f768c9a5d0079658c60b7fcedddcaa8`

**Journey matrix:** `evidence/phase-18/PHASE-18B-JOURNEY-MATRIX.md`

## Clean regression commands

Both repositories ran `npm ci` from the committed lockfiles. No lockfile or
source change was produced by installation.

Backend:

```text
npm run typecheck       PASS
npm run lint            PASS
npm test -- --runInBand PASS - 146 suites, 820 tests
npm run test:e2e        PASS - 17 suites, 73 tests
npm run build           PASS
npm audit --audit-level=high PASS - 0 vulnerabilities
```

Frontend:

```text
npm run typecheck       PASS
npm test                PASS - 82 files, 341 tests
npm run build           PASS
npm run performance:check PASS - 297609 raw / 93962 gzip initial JS;
                                  66321 raw / 10889 gzip initial CSS
npm audit --audit-level=high PASS - 0 vulnerabilities
```

The initial frontend invocation with the backend-only `--runInBand` option
was rejected by Vitest. The repository-native `npm test` command was then
run from the clean install and passed. This is recorded as a corrected
command, not a quarantined test.

## Read-only browser smoke

A local Vite server and a backend `NODE_ENV=test`,
`AUTH_PERSISTENCE=memory` process were started only for local verification.
No PostgreSQL, production endpoint, provider credential or real user data was
used.

- The homepage loaded and its accessibility snapshot exposed a skip link,
  banner/navigation, one H1, main/contentinfo landmarks, named controls,
  Vietnamese copy and image alternative text/decorative handling.
- `GET http://127.0.0.1:3000/api/v1/health` returned the structured success
  payload with `status=ok`, service `congdongngonngu-backend` and
  `environment=test`.
- At emulated `390x844`, `documentWidth=375`, `horizontalOverflow=false`,
  `h1Count=1`, and the main landmark was present.
- At emulated `1440x900`, `documentWidth=1425`,
  `horizontalOverflow=false`, `h1Count=1`, and `mainCount=1`.
- A DevTools mobile viewport screenshot was observed: the compact header,
  Vietnamese hero, two full-width CTA controls, image card and install
  guidance rendered without visible clipping.
- After the local backend was started, Vite assets loaded and
  `/api/v1/auth/providers` returned `304`. The anonymous bootstrap refresh
  returned `403` because no refresh session exists; this is the expected
  unauthenticated security boundary and is not counted as an authenticated
  journey PASS. It remains visible for 18D/J-002.

The first frontend-only page load produced proxy `500` responses because the
backend process was intentionally not running. The page was reloaded with
the local test-only backend and the smoke results above were observed. No
source change was made for either environment condition.

## 18C decision

`LNG-18-003=PASS_WITH_LIVE_UAT_PENDING`.

The exact tested heads, clean install, full unit/E2E, type/lint/build,
security audit, performance budget and read-only browser checks are recorded.
Provider, seeded-persona and approved TEST/UAT functional execution remain
18D work and must not be inferred from this regression evidence.
