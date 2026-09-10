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
