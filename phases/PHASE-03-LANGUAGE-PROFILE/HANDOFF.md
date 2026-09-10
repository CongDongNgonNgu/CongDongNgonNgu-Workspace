# Phase 03 Handoff

**Phase status:** IN_PROGRESS

Record task status, schema/migration references, seed command/evidence, frontend/backend/workspace SHAs, API/E2E/visual/a11y results and CI.

Document any proficiency-model limitation or privacy decision in `state/DECISIONS.md` if it affects later matching/community behavior.

On Acceptance: Phase 03 DONE; Phase 04 READY.

Startup evidence (2026-09-10): Backend main and origin/main were both at
25ad79c with the Phase 02 auth/session foundation committed. The approved
dependency exception is recorded as DEC-008; Phase 02 remains
BLOCKED_EXTERNAL for live Google OAuth verification.
Frontend is read-only for Phase 03A.

Backend Phase 03A checkpoint:

- LNG-03-001: DONE (backend foundation: data-driven catalog, eight-language
  idempotent seed, inactive-language protection).
- LNG-03-002: DONE (backend foundation: normalized multilingual relations,
  declared proficiency, nullable future assessed proficiency and primary
  target constraint).
- LNG-03-003: DONE (backend foundation: structured goals, skills, interests,
  IANA timezone and bounded non-overlapping local availability).
- LNG-03-006: VERIFYING (versioned catalog/profile APIs and authorization
  implemented; final Frontend integration and Phase 03 acceptance remain).

Backend schema and seed references:
database/migrations/0002_language_profile.sql
database/migrations/0002_language_profile.down.sql
database/seeds/0002_language_catalog.sql

Seed command:
psql $env:DATABASE_URL -v ON_ERROR_STOP=1 -f database/migrations/0001_identity.sql
psql $env:DATABASE_URL -v ON_ERROR_STOP=1 -f database/migrations/0002_language_profile.sql
psql $env:DATABASE_URL -v ON_ERROR_STOP=1 -f database/seeds/0002_language_catalog.sql

Backend API checkpoint:
GET /api/v1/languages
GET /api/v1/profile
PATCH /api/v1/profile
GET /api/v1/profiles/:userId

Local evidence: 10 focused profile unit tests, 3 focused profile e2e tests,
43 total backend unit tests, 11 total backend e2e tests, typecheck, lint,
build, high-severity npm audit, and static migration/seed verification passed.
The static check confirmed the Phase 03 tables, constraints, rollback
artifacts and eight idempotent seed codes. Local PostgreSQL/psql is
unavailable, so the SQL migration has not been executed against a database in
this environment.

Remote evidence: Backend commits bd5197c and ddc3484 are pushed to
origin/main; local and remote main both resolve to
ddc348465cc0026d9703a26138bcbef27d6a489f. Backend CI run
3 (https://github.com/CongDongNgonNgu/CongDongNgonNgu-Back-End/actions/runs/34433350293)
completed successfully for that SHA.

Phase 03B onboarding checkpoint:

- LNG-03-004: VERIFYING. The owner has not delegated visual acceptance, so
  automation must not mark this task DONE.
- Frontend local commit:
  350c25dc9549cd80801a6eb5ce143e4e341797e6
  (feat(onboarding): add profile setup flow). Remote publication and CI
  verification remain pending.
- Canonical Stitch project:
  3718538619973058970
- Canonical Desktop screen:
  5e5e5c47b7984678ae1ee6bc68c2d554
  title: Thiết lập ngôn ngữ - CongDongNgonNgu.vn (1440px)
- Canonical Mobile screen:
  50a329a48dc8402a822009afe318b7a1
  title: Thiết lập ngôn ngữ - CongDongNgonNgu.vn (Mobile 390px)

Visual evidence:

- Stitch Desktop: evidence/onboarding-stitch-desktop-1440-canonical.png
- Runtime Desktop (1440 viewport):
  evidence/onboarding-runtime-desktop-1440.jpg
- Desktop side-by-side:
  evidence/onboarding-side-by-side-desktop-1440.png
- Stitch Mobile: evidence/onboarding-stitch-mobile-390-canonical.png
- Runtime Mobile (390 viewport):
  evidence/onboarding-runtime-mobile-390.jpg
- Mobile side-by-side:
  evidence/onboarding-side-by-side-mobile-390.png

Frontend verification:

- Vitest: 10 files, 51 tests passed.
- Typecheck and lint passed.
- Production build passed.
- npm audit --omit=dev: 0 vulnerabilities.
- Chrome runtime flow covered authenticated catalog/profile loading, native
  and known language multi-select, CJK search, learning target selection,
  level validation, goals/skills, optional skip, completion navigation and
  browser Back restoration.
- Responsive runtime widths 320, 375, 390, 412, 768, 1024 and 1440 had no
  horizontal overflow.
- Lighthouse snapshot: Desktop 100/100/100/100 (41/41); Mobile
  100/100/100/100 (38/38). Console contained no messages in the final
  desktop run.
