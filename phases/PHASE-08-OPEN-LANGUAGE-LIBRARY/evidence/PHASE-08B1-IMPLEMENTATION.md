# Phase 08B1 Implementation Evidence

## Final state

```text
PHASE_08B1_IMPLEMENTATION=PASS
CURRENT_PHASE=08
PHASE_08=IN_PROGRESS
PHASE_08A=DONE
LNG_08_001=DONE
LNG_08_002=DONE
LNG_08_003=VERIFYING
LNG_08_004=PLANNED
LNG_08_005=PLANNED
LNG_08_006=PLANNED
LNG_08_007=PLANNED
LNG_08_008=PLANNED
OWNER_VISUAL_ACCEPTANCE_08B1=PENDING
NEXT_ACTION=STOP_FOR_EXTERNAL_AND_OWNER_REVIEW
```

## Review branches

```text
BACKEND_BRANCH=phase-08b1-library-search
FRONTEND_BRANCH=phase-08b1-library-search
WORKSPACE_BRANCH=phase-08b1-library-search
```

The three branches were created from the pinned clean Phase 08A baselines.
Final commit SHAs are added after the review-branch commits are created.

## Stitch

```text
STITCH_STATUS=PASS
STITCH_PROJECT=projects/14639103242845084916
STITCH_DESIGN_SYSTEM=assets/14598ca45330472eba73ac1364754513
STITCH_DESKTOP=projects/14639103242845084916/screens/183877b18e1b47028efe449ae7ec7579
STITCH_MOBILE=projects/14639103242845084916/screens/48a22db58c51467494389ad90a0bd0b0
STITCH_DETAIL=projects/14639103242845084916/screens/8063c2063af042e48ff861149a150747
```

The desktop Knowledge Explorer, mobile Knowledge Explorer, and public resource
detail direction were generated and inspected before material UI
implementation. Inspected rasters are stored beside this file as
`PHASE-08B1-STITCH-DESKTOP.png`, `PHASE-08B1-STITCH-MOBILE.png`, and
`PHASE-08B1-STITCH-DETAIL.png`.

## Backend

- Added public search at `GET /api/v1/library/resources`; preserved
  `GET /api/v1/library/resources/:resourceId`.
- Implemented keyword, language (primary or secondary), resource type, topic,
  CEFR level, bounded limit, and opaque deterministic cursor filtering.
- Vietnamese diacritics and CJK matching are covered by normalization and
  regression tests; cursor fingerprints prevent cross-filter reuse.
- Public search and detail fail closed on visibility, moderation, review,
  provenance, current-license activity, and redistribution permission.
- Public search projection contains only safe attribution/license cues and
  excludes internal contributor, reviewer, import, transformation, and Phase
  06 metadata.
- Migration support is required for the inspected query shape. Only
  `database/migrations/0010_library_search.sql` and its down migration were
  created; migration 0009 remains frozen and 0010 was not applied.

## Frontend

- Added `/library` Knowledge Explorer and `/library/:resourceId` read-only
  detail routes.
- Added URL-backed keyword, language, type, topic, and CEFR filters; mixed
  resource rows; safe attribution/license cues; load-more; loading/error/empty
  states; and no contribution forms.
- Used responsibility-based feature files and CSS Modules. The mobile drawer
  has a dialog name, focus entry, Escape close, Tab containment, and focus
  return to the trigger.

## Browser and accessibility verification

Local Vite runtime verification used deterministic DevTools response stubs for
three mixed public resources and one public detail resource; backend HTTP E2E
tests cover the actual API contract. Final-code viewport measurements:

| viewport | overflow | mobile toolbar | desktop filter rail | mixed rows |
| ---: | :---: | :---: | :---: | :---: |
| 320 | no | flex | none | 3 |
| 375 | no | flex | none | 3 |
| 390 | no | flex | none | 3 |
| 412 | no | flex | none | 3 |
| 768 | no | none | block | 3 |
| 1024 | no | none | block | 3 |
| 1440 | no | none | block | 3 |

The 412px drawer was opened from the filter trigger: the dialog exposed
`aria-modal=true`, focus entered the close control, Escape removed the dialog,
and focus returned to the trigger. Mixed Vietnamese/CJK/English rows and the
read-only public detail route were visually inspected. Lighthouse snapshot
audits passed at 100 Accessibility, 100 Best Practices, 100 SEO, and 100
Agentic Browsing on both desktop and mobile. The clean final runtime had no
console errors after the deterministic API boundary was installed.

## Tests and safety gates

```text
BACKEND_UNIT=32 suites, 207 tests passed
BACKEND_E2E=11 suites, 50 tests passed
FRONTEND_TESTS=39 files, 178 tests passed
FRONTEND_TYPECHECK=PASS
FRONTEND_BUILD=PASS
AUDIT=PASS (Lighthouse desktop/mobile accessibility 100; no final runtime console errors)
MIGRATION_REQUIRED=YES
MIGRATION_FILE=database/migrations/0010_library_search.sql
MIGRATION_APPLIED=NO
TEST_DB_MUTATED=NO
PRODUCTION_DB_MUTATED=NO
DEPLOYED=NO
```

The implementation is intentionally left at `VERIFYING` pending external and
owner visual review. No merge, deployment, migration application, or
LNG-08-004 work was started.
