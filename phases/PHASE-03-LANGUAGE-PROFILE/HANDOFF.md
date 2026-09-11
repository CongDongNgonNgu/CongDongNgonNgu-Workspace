# Phase 03 Handoff

**Phase status:** DONE

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
- LNG-03-006: DONE (versioned catalog/profile APIs, authorization and final
  Frontend integration are complete; final acceptance is recorded below).

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

Phase 03B onboarding checkpoint (reconciled 2026-09-11):

- LNG-03-004: DONE. The owner manually reviewed and accepted the Onboarding UX.
- Frontend onboarding commit:
  350c25dc9549cd80801a6eb5ce143e4e341797e6
  (`test(onboarding): cover long labels`) was already pushed to `origin/main`.
  Frontend CI run 14
  (https://github.com/CongDongNgonNgu/CongDongNgonNgu-Front-End-Web/actions/runs/34446948744)
  completed successfully for that SHA.
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

Phase 03C Language Passport checkpoint (reconciled 2026-09-11):

- LNG-03-005: DONE. The owner manually reviewed and accepted the own/public
  Passport UI. Own and public Passport projections, owner-only
  editing, language visibility controls, multilingual/CJK rendering and
  responsive layouts are implemented.
- LNG-03-006: DONE. Frontend `GET /profile`, `PATCH /profile`, catalog
  loading and `GET /profiles/:userId` integration are complete. The PATCH
  payload is Phase 03 data only and never accepts a body `userId`; backend
  ownership, invalid-data and public-privacy enforcement remain covered by
  the profile e2e suite.
- LNG-03-007: DONE. Reconciliation evidence and privacy checks are
  complete. No analytics events were added because this repository has no
  approved analytics foundation; this is explicitly deferred and does not
  block the UI.

Passport Stitch references:

- Own Desktop: `5cc9fb0178c74faab11579982bcbc0e6`
- Own Mobile: `1858b4c2fecf43ec88c4e7a0cab5cad3`
- Public Desktop: `8b0e963342a74a3ba2a7190480a58c60`
- Public Mobile: `e081f1164d7641f08b237c3a21b8dfce`

Passport visual evidence is preserved in `evidence/` as four canonical Stitch
rasters, four Chrome runtime rasters and four Stitch/runtime side-by-side
comparisons. Runtime screenshots were captured at 1440 and 390 using a
deterministic local browser API harness; backend privacy and authorization
behavior was verified separately through the profile e2e suite.

Frontend Passport implementation:

- Routes: `/profile` (own) and `/profiles/:userId` (public).
- Own view exposes the real native/known/learning language relationships,
  declared/assessed proficiency, primary target, goals, skills, interests,
  timezone and availability summary.
- Public view renders only the public DTO projection and has no edit controls,
  private language markers, account email, timezone or schedule details.
- Editor is limited to Phase 03 language, goal, skill, interest, timezone,
  availability and privacy fields; it validates roles, native proficiency,
  primary-target uniqueness and availability ordering.
- A real-browser API-client issue discovered during verification was fixed:
  the default native `fetch` is now bound to `globalThis`, with a regression
  test for the Chrome-only Illegal Invocation failure.

Verification:

- Frontend: 11 Vitest files, 55 tests passed; typecheck, lint, production
  build and `npm audit --omit=dev --audit-level=high` passed with 0 findings.
- Backend: profile unit tests 10/10, profile e2e tests 3/3, typecheck, build
  and high-severity audit passed with 0 findings.
- Browser: public own/public projections inspected at 1440 and 390; no
  horizontal overflow at 320, 375, 390, 412, 768, 1024 or 1440; public DOM
  contained no private-field markers; owner PATCH capture contained no
  `userId`; final console had no errors or warnings.
- Lighthouse snapshot: desktop and mobile both scored 100 accessibility,
  100 best practices, 100 SEO and 100 agentic browsing, with 38/38 audits
  passing after correcting fallback-state heading order.

Final Phase 03 reconciliation (2026-09-11):

- Owner acceptance is recorded for LNG-03-004 Onboarding UX and LNG-03-005
  Language Passport own/public UI.
- Final task state: LNG-03-001=DONE, LNG-03-002=DONE, LNG-03-003=DONE,
  LNG-03-004=DONE, LNG-03-005=DONE, LNG-03-006=DONE, LNG-03-007=DONE.
- Frontend published SHA: `e56aa914fc0d7356ef3301d5148cc01331df159f`.
- Backend published SHA: `e001f5902a91db50b074d61d877f6a95efa9d6e9`.
- Workspace published Phase 03 evidence SHA: `5f94532918b9da61633b9236908c1b3866aa9c13`.
  The final state-only reconciliation is the subsequent Workspace commit.
- Frontend CI run 32
  (https://github.com/CongDongNgonNgu/CongDongNgonNgu-Front-End-Web/actions/runs/34479110525)
  completed successfully for the published Frontend SHA.
- Backend CI run 4
  (https://github.com/CongDongNgonNgu/CongDongNgonNgu-Back-End/actions/runs/34434362573)
  completed successfully for the published Backend SHA.
- All canonical Stitch screen IDs and Phase 03 visual evidence remain
  preserved in `UI-STITCH.md` and `evidence/`.
- `PHASE_03=DONE` and `PHASE_04=READY`. Phase 04 was not started.
- `PHASE_02=BLOCKED_EXTERNAL` remains unchanged because CongDong-owned Google
  OAuth credentials and live verification are still unresolved. No Google
  OAuth work was performed in this reconciliation.
