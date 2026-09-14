# Phase 05B — Neon TEST Runtime Remediation and Owner Visual Review

Date: 2026-09-14

This is an appended runtime-review record. Historical Phase 05A/05B evidence in
VERIFICATION.md is preserved. Canonical Stitch screens were reused; no Stitch
screens were regenerated.

## Safety and database target

DATABASE_PROVIDER=NEON_POSTGRESQL
DATABASE_TEST_AUTHORIZED=YES
PRODUCTION_DATABASE_TOUCHED=NO
DATABASE_SAFE_METADATA=database neondb; host category *.neon.tech; configuration source .env; credentials intentionally omitted

The owner-authorized current Neon target was used as a TEST database only. No
production database, unrelated database, credential, or secret was changed or
reported.

## Migration and schema remediation

MIGRATION_STATE_BEFORE=0001_identity.sql APPLIED; 0002_language_profile.sql APPLIED; 0003_community.sql PENDING

MIGRATION_0001=APPLIED
MIGRATION_0002=APPLIED
MIGRATION_0003=APPLIED
MIGRATION_COMMAND=npm run db:migrate
MIGRATION_RESULT=first run skipped 0001 and 0002, applied 0003_community.sql; second run skipped all three and reported that database migrations are up to date

Before migration:

- GET /api/v1/health returned 200.
- GET /api/v1/languages returned 200 with an empty catalog.
- GET /api/v1/community/posts?limit=20 returned 500.
- Read-only schema inspection showed languages, schema_migrations, and users,
  but no community tables.

COMMUNITY_500_ROOT_CAUSE=the community_posts relation was missing because 0003_community.sql was pending

After migration, the required Phase 05 community tables were present:

- community_posts
- community_comments
- community_reactions
- community_saved_posts
- community_reports

Required feed/action indexes were also present, including the author, feed,
language-feed, post-reaction, report, and saved-post indexes.

## Language catalog

LANGUAGE_CATALOG_ROOT_CAUSE=the canonical launch-language seed had not been applied; migrations alone left the catalog empty

The existing canonical database/seeds/0002_language_catalog.sql seed file was
executed through the project database driver. No second language system or
frontend fallback data was introduced.

LANGUAGE_CATALOG_COUNT=8
LANGUAGE_CODES=vi,en,zh,ja,ko,fr,de,es

## Authentication and TEST data

AUTH_REVIEW_SESSION=PASS
AUTH_REVIEW_STRATEGY=official register, verify-email, login, and /auth/me flow using the development email provider and Postgres persistence; synthetic disposable TEST identity only; password not recorded
VISUAL_REVIEW_DATA=NEON_TEST_ONLY
TEST_POST_COUNT=5
TEST_DATA_CLEANUP=the limited exact TEST review records were left in the authorized Neon TEST database for continued review; no broad cleanup was run

Four review posts were created through the real Community create contract and
one additional post was created through the actual authenticated Composer UI.
The set covers DISCUSSION, QUESTION, LEARNING_JOURNAL, and CULTURE; Vietnamese,
English, Chinese, and Japanese target languages; CEFR present and absent; topic
present and absent; short and multiline content.

## API and interaction verification

COMMUNITY_API_STATUS=PASS

- Public feed read returned 200 without requiring a viewer token.
- languageCode=en and languageCode=zh filters returned 200 with the expected
  language projection.
- Cursor pagination returned 200 with stable database ordering and no overlap.
- Helpful add/remove returned 201/200 and viewer state toggled correctly.
- Save/unsave returned 201/200; no public save count was exposed.
- Share returned 200 with the backend canonical share path and isShareable=true.
- Report returned 201 with only the generic submitted response.
- Composer publish returned 201 and produced exactly one new post; no duplicate
  card was observed.

The authenticated browser review used the real local Frontend and Backend
runtime against the authorized Neon TEST database. No production fixtures or
frontend fallback records were used.

## Runtime fixes found during review

FRONTEND_RUNTIME_FIXES=refresh now hydrates /auth/me when the backend refresh response contains only token metadata; language filter state now hydrates from and persists to the URL

The refresh fix was reproduced with a focused failing test before implementation.
The URL-filter fix was likewise reproduced with a focused failing test before
implementation. A shared neutral badge contrast defect identified by Lighthouse
was corrected with the smallest CSS change.

Frontend verification after remediation:

- 25 test files passed.
- 107 tests passed.
- typecheck passed.
- lint passed.
- build passed.
- npm audit --audit-level=high reported 0 vulnerabilities.

## Canonical Stitch references

FEED_STITCH_DESKTOP=dd54a8ce055d4284870e1822cef33d2f
FEED_STITCH_MOBILE=edb521a9ac77463a896dd047770fb9e3
COMPOSER_STITCH_DESKTOP=b7320fdfb139424e84e11d42f42a4525
COMPOSER_STITCH_MOBILE=93e2741039e446938f56a1341980c77d
STITCH_PROJECT=3718538619973058970
STITCH_DESIGN_SYSTEM=16442026920550574436

## Runtime screenshots and comparisons

FEED_RUNTIME_DESKTOP=evidence/phase-05b/feed_runtime_desktop.png
FEED_RUNTIME_MOBILE=evidence/phase-05b/feed_runtime_mobile.png
COMPOSER_RUNTIME_DESKTOP=evidence/phase-05b/composer_runtime_desktop.png
COMPOSER_RUNTIME_MOBILE=evidence/phase-05b/composer_runtime_mobile.png

Side-by-side evidence:

- evidence/phase-05b/feed_side_by_side.png
- evidence/phase-05b/feed_mobile_side_by_side.png
- evidence/phase-05b/composer_side_by_side.png
- evidence/phase-05b/composer_mobile_side_by_side.png

VISUAL_FEED_1440=PASS
VISUAL_FEED_390=PASS
VISUAL_COMPOSER_DESKTOP=REVIEW
VISUAL_COMPOSER_390=REVIEW

MATERIAL_DIFFERENCES=Feed has no material structural mismatch; dynamic TEST account, timestamps, and real content are expected. Composer canonical groups optional learning metadata under a progressive learning-information section and presents visibility/action controls in the sheet; runtime exposes CEFR and topic as separate fields, uses a visibility select, and requires internal modal scrolling to reach Publish/Cancel at the initial viewport. Composer title copy also differs (Chia sẻ bài viết versus Tạo bài viết cộng đồng). These are retained as REVIEW items and were not silently redesigned.

The runtime contains no unsupported title field, media/upload control, fake
autosave, fake activity, fake trending/For You, fake comments, or automatic
infinite scrolling. The feed remains a language-learning community experience.

## Responsive, accessibility, and runtime diagnostics

RESPONSIVE_320=PASS
RESPONSIVE_375=PASS
RESPONSIVE_390=PASS
RESPONSIVE_412=PASS
RESPONSIVE_768=PASS
RESPONSIVE_1024=PASS
RESPONSIVE_1440=PASS

All checked widths had no horizontal overflow. Long Vietnamese and CJK content
wrapped, filters remained usable, and the Composer remained reachable at the
mobile widths. The dialog retained focus on open and restored focus on close;
labels, validation feedback, live status messaging, article semantics, and
viewer-action states were present in the accessibility tree.

APPLICATION_CONSOLE_ERRORS=0
UNEXPECTED_NETWORK_ERRORS=0
ACCESSIBILITY=PASS
LIGHTHOUSE=Accessibility 100; Best Practices 100; SEO 100; Agentic Browsing 100; 38 audits passed and 0 failed

## Phase state and delivery state

PHASE_05=IN_PROGRESS
LNG_05_001=DONE
LNG_05_002=VERIFYING
LNG_05_003=VERIFYING
LNG_05_004=VERIFYING
LNG_05_005=VERIFYING
LNG_05_006=VERIFYING
LNG_05_007=PLANNED

FRONTEND_CHANGED=YES
FRONTEND_SHA=89ed2da56112764d0c3652425639b77888a45a81
BACKEND_CHANGED=NO
BACKEND_SHA=85066b6c9e75a7f8a4339d2cc8415a7c627c7494
WORKSPACE_CHANGED=YES
WORKSPACE_SHA=82ee7a2597143b1a798b7a0d07473071665d30b3 (evidence update remains local/uncommitted; prior Stitch metadata correction preserved)
PUSHED=NO
DEPLOYED=NO
PHASE_05C_STARTED=NO
PHASE_06_STARTED=NO

Owner visual acceptance is not marked DONE.
