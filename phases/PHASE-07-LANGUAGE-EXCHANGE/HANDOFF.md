# Phase 07 Handoff

**Phase status:** IN_PROGRESS

## Phase 07A — Buddy Preference & Privacy Foundation

LNG-07-001 is DONE.

### Scope delivered
- Explicit language-exchange opt-in and conservative discoverability/privacy defaults.
- Exchange-specific preferences reuse Phase 03 language/profile/timezone/availability data rather than duplicating canonical profile systems.
- Safe owner/public projection boundaries.
- Authenticated preference API with session identity, validation, CSRF/authorization handling, and IDOR-safe behavior.
- No matching engine, partner ranking, connection lifecycle, block/report implementation, frontend surface, or Stitch work was added in 07A.
- Frontend remained untouched.

### Backend evidence
- Backend SHA: 6afd8ebd816a9340a17fab68dfd73e8ae8341f33
- Backend remote main: verified at the same SHA.
- GitHub Actions CI run: 35185857950 — SUCCESS.
- Unit: 22 suites / 97 tests PASS.
- E2E: 9 suites / 43 tests PASS.
- Typecheck: PASS.
- Lint: PASS.
- Build: PASS.
- npm audit: 0 vulnerabilities.
- git diff --check: PASS.
- Worktree after publication: clean.

### Database evidence
- Migration: 0006_language_exchange_preferences.sql.
- Applied only to the configured Neon TEST database.
- First verified run: 0001-0005 SKIP; 0006 APPLY/DONE.
- Second verified run: 0001-0006 SKIP; database up to date.
- Production database: untouched.
- Deployment: NO.

### Migration checksum reconciliation
Windows CRLF checkout caused raw-file checksum drift against previously recorded LF checksums for migrations 0001-0005.
Diagnostic evidence showed MATCH_LF=true for every previously applied migration.
The migration runner now normalizes CRLF/CR to LF before SHA-256 calculation so checksums are deterministic across Windows/Linux.
No schema_migrations checksum values were manually rewritten.

### Safety / dependencies
- BLOCKER-02-001 is RESOLVED; Phase 02 production Google OAuth evidence is
  recorded in `evidence/phase-02/LNG-02-010-UNIFIED-GOOGLE-OAUTH.md`.
- BLOCKER-05D-001 remains OPEN: Community rate limiting is process-local and is not represented as distributed protection.
- No EduAI repository or production database was touched. Phase 02 production
  deployment evidence was verified read-only; no direct/manual database
  mutation was performed.
- OWNER_VISUAL_ACCEPTANCE_07A=N/A_BACKEND_ONLY.
- Stitch=N/A_BACKEND_ONLY.

## Remaining Phase 07 work

- LNG-07-002 — DONE
- LNG-07-003 — DONE
- LNG-07-004 — PLANNED
- LNG-07-005 — PLANNED
- LNG-07-006 — PLANNED
- LNG-07-007 — PLANNED

Phase 07 remains IN_PROGRESS because LNG-07-004 through LNG-07-007 are still planned. Phase 07B is DONE; owner visual acceptance was received on 2026-09-17.

## Phase 07B — Matching Engine V1 & Partner Discovery

**Status:** DONE — implementation gates pass; OWNER_VISUAL_ACCEPTANCE_07B=YES (2026-09-17).
Only LNG-07-002 and LNG-07-003 are in scope. LNG-07-004 through LNG-07-007 remain planned.

### Reuse boundary

- **KEEP:** Phase 03 language catalog, language relations, CEFR/proficiency, profile goals/interests/timezone/availability, public profile projection, auth/session, and Phase 07A preference/privacy contracts.
- **ADAPT:** Existing header, mobile drawer, footer, and public profile entrypoint; the navigation entry is live at `/exchange`.
- **BUILD_NEW:** Matching Engine V1, authenticated `GET /api/v1/exchange/discovery`, typed discovery DTO/response, Partner Discovery page, filters, reasons, pagination, and regression coverage.
- **DEFER:** Connection requests/lifecycle, messaging, notifications, block/report UI, rooms, reputation/activity, and all 07-004–07-007 work.

### Matching contract

- Reciprocal language evidence is mandatory in both directions: viewer wants a candidate-offered language and candidate wants a viewer-offered language.
- V1 dimensions are normalized to `[0, 1]`: reciprocal language `R = min(1, (forward reciprocal count + backward reciprocal count) / 2)`; preferred-level compatibility `L` is the mean of available directional level matches; timezone/availability `T` is the mean of available timezone and weekly-window evidence; shared goals/interests `S` is the mean of available goal/interest intersections.
- Absent optional evidence is excluded from the denominator, so missing availability does not create a penalty or a schedule claim. Timezone offsets use the deterministic reference `2026-01-15T12:00:00Z` for V1 scoring; weekly windows are compared after conversion to UTC and never returned to discovery clients.
- Default weights are configurable and testable: `R=.50`, `L=.20`, `T=.20`, `S=.10`. Final score is the weighted mean over active dimensions, rounded to four decimals and bounded to `[0, 1]`.
- Ordering is deterministic: normalized score descending, then user ID by code-point order. Pagination defaults to page 1/page size 10; API limits are page 100 and page size 20.
- Reasons are human-readable and generated only from reciprocal languages, compatible level evidence, compatible timezone/availability evidence, and real shared goals/interests. The UI prioritizes those reasons instead of displaying an opaque numeric score.
- Candidates are excluded when self, inactive/unverified, opted out, not discoverable, not ready, invalid/private ineligible, safety-blocked, or lacking reciprocal evidence.

### Privacy and API evidence

- Discovery returns only candidate ID/display name, public exchange-selected language relations/proficiency, selected exchange goals/interests, normalized score, and reasons.
- Discovery never returns email, phone, OAuth/provider identity, session/account internals, exact timezone, exact availability, exact schedule, reputation, activity, city, or private profile data.
- The endpoint is access-token guarded and derives the viewer from the authenticated session; no target-user or spoofable owner field is accepted. Existing public profile preview IDOR/safety checks remain intact.
- No migration was added or modified; migrations 0001–0006 remain untouched. Phase 07B did not mutate a test or production database and did not deploy.

### Stitch and visual evidence

- Stitch project: `projects/3718538619973058970`; shared design system asset: `assets/16442026920550574436`.
- Desktop reference: screen `ec933399f3134afaa6169c05957b0282` (1440px); mobile refinement: screen `4adb9e6d00e9421f93f4db11bcecd9c6` (390px).
- Native implementation uses the existing Be Vietnam Pro/blue-orange design system, a desktop filter rail plus results list, compact mobile filters, safe public-profile links, and loading/empty/no-match/error/auth states. Stitch output was treated as visual direction; illustrative names/counts/activity were not shipped as data.
- Chrome DevTools visual verification covered widths 320, 375, 390, 412, 768, 1024, and 1440 with no horizontal overflow and required landmarks/headings. Lighthouse snapshots reported Accessibility 100 on desktop and mobile. The only observed console response was the existing unauthenticated `/api/v1/auth/refresh` 403 during session bootstrap.

### Code and verification

- Backend branch/SHA: `phase-07b-matching-discovery` / `1efbf1af394e1c702317d901fa4011edf8460dcb`.
- Frontend branch/SHA: `phase-07b-matching-discovery` / `b12d723aafda4412f5461443f341eab816702de8`.
- Backend: unit `23 suites / 105 tests PASS`; e2e `9 suites / 43 tests PASS`; typecheck, lint, build, npm audit (`0 vulnerabilities`), and `git diff --check` PASS.
- Frontend: `33 test files / 154 tests PASS`; typecheck, lint, production build, npm audit (`0 vulnerabilities`), and `git diff --check` PASS.
- Focused regression evidence: matching/service `16 tests PASS`; exchange e2e `3 tests PASS`; frontend Partner Discovery `6 tests PASS`.
- Workspace branch: `phase-07b-matching-discovery`; handoff/state documentation is committed locally.

### Publication gate

Owner visual acceptance was explicitly received on 2026-09-17 after the recorded desktop/mobile review. No deployment has occurred. The publication gate was completed with the exact main and CI evidence below, while preserving the documented privacy boundary and open blockers.

### Final Phase 07B publication evidence

- Phase state remains `PHASE_07=IN_PROGRESS`; `LNG_07_001`, `LNG_07_002`, and `LNG_07_003` are DONE; `LNG_07_004` through `LNG_07_007` remain PLANNED; `OWNER_VISUAL_ACCEPTANCE_07B=YES`.
- Backend `main`: `1efbf1af394e1c702317d901fa4011edf8460dcb`. GitHub Actions CI run [35206109906](https://github.com/CongDongNgonNgu/CongDongNgonNgu-Back-End/actions/runs/35206109906) completed SUCCESS for that exact SHA.
- Frontend `main`: `b12d723aafda4412f5461443f341eab816702de8`. GitHub Actions CI run [35206137388](https://github.com/CongDongNgonNgu/CongDongNgonNgu-Front-End-Web/actions/runs/35206137388) completed SUCCESS for that exact SHA.
- Workspace `main` was fast-forwarded from `cbb522d58fe37c6d6d5de790d854f16ce13cc9a8` to the accepted Phase 07B evidence base `d6677330b1ee32769ec71e9af12d3851e2eb8466` before this final evidence update; the resulting final Workspace SHA is reported with the publication result.
- Phase 07B required no migration; `TEST_DB_MUTATED=NO`, `PRODUCTION_DB_MUTATED=NO`, and `DEPLOYED=NO`.
- Stitch, responsive, and accessibility evidence remains recorded above.
  `BLOCKER-05D-001` remains OPEN for its unrelated distributed-rate-limit
  scope. Phase 02 Google OAuth is DONE and remains separate; no later phase
  state was rolled back.

## Subsequent shared-shell auth regression fix — 2026-09-18

The authenticated desktop/mobile header avatar regression is complete and is
recorded in `evidence/phase-07/FRONTEND-AUTH-HEADER-AVATAR-2026-09-18.md`.
This shared-shell fix preserves Phase 07 domain contracts and state.
