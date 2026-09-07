# Phase 00 Handoff

**Phase status:** READY  
**Last updated:** 2026-09-07 - CI baseline verified

## Evidence log
Populate after each task:
- Task ID / status
- Backend/frontend/workspace commit SHA(s)
- Commands and test counts
- CI links/status
- Audit matrix/path
- Environment-separation evidence
- Known limitations

## Evidence log
- LNG-00-001 / DONE
  - Workspace commit: `0546d68fef2e41234e4ee305539978470b1c4f3e`; pushed to `origin/main`; exact remote SHA matched.
  - Audit matrix: `phases/PHASE-00-FOUNDATION/AUDIT-EDUAI-BACKEND.md`.
  - Reference audited: EduAI Back-End commit `1c1ab2f`; source-only audit, no EduAI runtime changes.
  - Verification: module/schema/migration/provider/seed/test inventory; `git diff --cached --check`; credential-like content scan; GitHub Actions API returned no run for this SHA (no CI workflow observed).
  - Known limitation: CongDong implementation repositories were not changed by this audit task; bootstrap remains pending in LNG-00-003/004.

- LNG-00-002 / DONE
  - Workspace commit: `ec45d5b7a9f78e6458bd479c7e030aa7319fac0d`; pushed to `origin/main`; exact remote SHA matched.
  - Audit matrix: `phases/PHASE-00-FOUNDATION/AUDIT-EDUAI-FRONTEND.md`.
  - Reference audited: EduAI Front-End-Web commit `1990128`; source-only audit; pre-existing frontend modifications were preserved.
  - Verification: real route/service/provider/PWA/CI inventory; unit baseline `90 files / 329 tests` passed; build attempted and failed in the dirty reference tree at the recorded `paymentService.pending` type mismatch; GitHub Actions API returned no run for this Workspace SHA.
  - Known limitation: EduAI frontend dirty changes remain untouched; CongDong backend/frontend bootstrap is now eligible in LNG-00-003/004.

- LNG-00-003 / DONE
  - Implementation repository: `CongDongNgonNgu-Back-End`; local commit `59fddfd8bbdf81f42ce32974b8447d7b6d585773`.
  - Scope: independent NestJS 12 CommonJS shell with validated configuration, versioned health endpoint, security headers, request validation, and no LMS/product modules, schema, migrations, or providers.
  - Verification: `npm ci`; `npm run typecheck`; `npm test -- --runInBand` (2 suites / 6 tests); `npm run test:e2e -- --runInBand` (1 suite / 2 tests); `npm run build`; `npm audit --audit-level=high` all passed.
  - Security evidence: local database/public/CORS/Redis configuration is validated and known external-product host markers are rejected; no credentials or production endpoints committed.
  - Remote: user-authorized push to `https://github.com/CongDongNgonNgu/CongDongNgonNgu-Back-End.git` completed on 2026-09-07; `origin/main` exactly matches `59fddfd8bbdf81f42ce32974b8447d7b6d585773`.
  - CI: GitHub Actions API returned `total_count: 0` for the exact remote SHA; no workflow run was available to inspect.
  - Known limitation: no remote CI evidence exists until a workflow is added in LNG-00-006.

- LNG-00-004 / DONE
  - Implementation repository: `CongDongNgonNgu-Front-End-Web`; local commit `1d2f8a53001509da6e9ef2570aa10579ddf52602`.
  - Scope: independent React/Vite shell with only `/` and a catch-all not-found route, versioned API client, neutral responsive styling, favicon/robots/llms metadata, and no EduAI/LMS/auth/provider assets.
  - Verification: `npm ci`; `npm run typecheck`; `npm test -- --run` (2 files / 8 tests); `npm run build`; `npm audit --audit-level=high` all passed.
  - Browser evidence: live DOM/a11y snapshot verified landmarks and h1-to-h2 hierarchy; `/courses` rendered the not-found surface; console had no errors or warnings; network assets returned 200/304; no horizontal overflow at 500, 768, 1024, or 1440px; Lighthouse snapshot scored 100 for accessibility, best practices, SEO, and agentic browsing with zero failed audits.
  - Remote: user-authorized push to `https://github.com/CongDongNgonNgu/CongDongNgonNgu-Front-End-Web.git` completed on 2026-09-07; `origin/main` exactly matches `1d2f8a53001509da6e9ef2570aa10579ddf52602`.
  - CI: GitHub Actions API returned `total_count: 0` for the exact remote SHA; no workflow run was available to inspect.
  - Known limitation: no remote CI evidence exists until a workflow is added in LNG-00-006.

- LNG-00-005 / DONE
  - Backend implementation commit: `27d42d64fb9055daa015be414bfa2fcfd2ecafb7`; pushed to `https://github.com/CongDongNgonNgu/CongDongNgonNgu-Back-End.git`; exact `origin/main` SHA verified.
  - Frontend implementation commit: `71b17fa49dc35abdc153b4b14050a8521cbf2e6d`; pushed to `https://github.com/CongDongNgonNgu/CongDongNgonNgu-Front-End-Web.git`; exact `origin/main` SHA verified.
  - Environment contract: independent backend variables cover database, JWT/session, OAuth, AI, email, storage, realtime, payment, and Redis; frontend keeps browser-visible `VITE_API_BASE_URL` only. All optional providers default to `disabled`.
  - Fail-closed evidence: configured backend providers require their endpoint and sensitive credentials; provider URLs reject credentials/query/fragments and blocked external-product hosts; frontend absolute API origins reject blocked external-product hosts.
  - Verification: backend `npm run typecheck`, `npm run lint`, unit (2 suites / 10 tests), e2e (1 suite / 2 tests), build, and `npm audit --audit-level=high` passed; frontend `npm run typecheck`, `npm run lint`, unit (2 files / 9 tests), build, and high-severity audit passed.
  - CI: GitHub Actions API returned `total_count: 0` for both exact implementation SHAs; no workflow run was available to inspect. CI baseline is next in LNG-00-006.
  - Security evidence: no credentials, provider keys, Firebase project IDs, payment-provider keys, or external-product production URLs were committed; denylist references are intentional regression-test/validator controls.

- LNG-00-006 / DONE
  - Backend CI commit: `d27fc4fc88053ee00cb56c2390ac6fcf5bdcf860`; pushed to `https://github.com/CongDongNgonNgu/CongDongNgonNgu-Back-End.git`; exact `origin/main` SHA verified.
  - Frontend CI commit: `0f6d7f844e3782471ac7cdef4f9d9aaeaca99501`; pushed to `https://github.com/CongDongNgonNgu/CongDongNgonNgu-Front-End-Web.git`; exact `origin/main` SHA verified.
  - Backend CI: run `https://github.com/CongDongNgonNgu/CongDongNgonNgu-Back-End/actions/runs/34099112719` completed with `success`; install, lint, typecheck, unit tests, e2e tests, build, and high-severity audit steps all passed.
  - Frontend CI: run `https://github.com/CongDongNgonNgu/CongDongNgonNgu-Front-End-Web/actions/runs/34099243677` completed with `success`; install, lint, typecheck, unit tests, build, and high-severity audit steps all passed.
  - Repository hygiene: both `.gitignore` files exclude `node_modules`, `dist`, coverage, `.env` variants, and local logs; clean `npm ci` passed in both repositories.
  - Deployment boundary: no deployment workflow or production configuration was added; README files document that deployment requires a separate approved task.

## Blockers
- BLOCKER-00-001 is resolved in `state/BLOCKERS.md`; both authorized bootstrap remotes and exact SHAs are verified.

## Completion record
Do not mark this section COMPLETE until `ACCEPTANCE.md` passes. On completion update `state/PROJECT-STATE.md`: Phase 00 DONE, Phase 01 READY.
