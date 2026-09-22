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
BACKEND_SHA=766a150c862339571ff3a18c3ab7610330baf5bd
FRONTEND_BRANCH=phase-08b1-library-search
FRONTEND_SHA=8d800004ccb639f62a6344279f3d443c6e7cd065
WORKSPACE_BRANCH=phase-08b1-library-search
WORKSPACE_SHA=reported in the final handoff after this evidence commit
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

## External review remediation

The remediation remains limited to LNG-08-003 and is committed on the
existing `phase-08b1-library-search` review branches.

### Backend contract and query changes

- `LibrarySearchRepositoryPage` now returns `nextBoundary` from the original
  ordered page query. PostgreSQL selects `resource.updated_at` with the ID
  before hydration; the service encodes that boundary instead of reading a
  hydrated resource timestamp. In-memory pagination follows the same
  contract.
- Regression coverage simulates a row selected at T1 being hydrated at T2;
  the opaque cursor remains anchored at T1. Equal timestamps use descending
  UUID ID tie-breaking and three one-item pages contain no duplicates.
- In-memory keyword matching now searches topics and type-specific learning
  content only. Language remains an explicit primary-or-secondary filter;
  parity coverage verifies that a language code alone does not satisfy `q`.
- PostgreSQL keyword search uses a parameterized `keyword_matches` CTE with
  `UNION` candidate IDs for topics and each type-specific table, including
  dialogue JSON turns. Wildcard and backslash escaping remains explicit.

### Migration 0010 review contract

`0010_library_search.sql` remains review-only and unapplied. It now includes
the topic trigram index and partial public type/CEFR ordering indexes in
addition to the query-backed language/order and detail trigram indexes. The
down migration drops every 0010-owned index, retains `pg_trgm`, and does not
drop library tables. Static tests freeze the normalized checksums:

```text
0010_library_search.sql=0f5fc8b6e416fbed8e68eb033c2216ede4a1247d96217b9bf1617ebfe2df83f2
0010_library_search.down.sql=dc230f48a075c947584f3e0bdd2aedf2f0a7be20371b4a94ee979c97e54fa0d0
MIGRATIONS_0001_0009=UNCHANGED
MIGRATION_APPLIED=NO
```

### Frontend remediation and implementation captures

- The drawer receives a stable close callback, so URL/filter rerenders do not
  reset focus while it remains open.
- The drawer saves and restores the exact previous `document.body.style.overflow`
  value and uses `hidden` only while open. Escape closes it and returns focus to
  the original trigger.
- Topic input uses apply-on-commit behavior: Enter or blur updates the URL and
  search; typing alone does not request per character.
- Playwright is not present in the Frontend package. DevTools runtime checks
  covered populated, empty, detail, drawer, focus, URL, and no-console-error
  states. Final implementation captures are implementation screenshots, not
  Stitch rasters:

| capture | viewport | path |
| --- | ---: | --- |
| desktop explorer | 1440x900 | `evidence/PHASE-08B1-IMPLEMENTATION-DESKTOP.png` |
| mobile explorer | 390x900 | `evidence/PHASE-08B1-IMPLEMENTATION-MOBILE.png` |
| mobile drawer | 390x900 | `evidence/PHASE-08B1-IMPLEMENTATION-MOBILE-DRAWER.png` |
| public detail | 390x900 | `evidence/PHASE-08B1-IMPLEMENTATION-DETAIL.png` |
| empty state | 390x900 | `evidence/PHASE-08B1-IMPLEMENTATION-EMPTY.png` |

The remediated responsive matrix was rechecked at 320, 375, 390, 412, 768,
1024, and 1440 CSS pixels. `scrollWidth` did not exceed the viewport width;
the 320px result has the expected 15px vertical scrollbar difference between
`clientWidth` and the viewport, but no additional horizontal content. Mobile
drawer focus remained inside the dialog after a language change, body overflow
was hidden while open and restored on Escape, and Lighthouse snapshot audits
returned Accessibility 100 on desktop and mobile (with Best Practices, SEO,
and Agentic Browsing also 100).

### Remediation verification counts

```text
BACKEND_FOCUSED=57 tests passed (library service, PostgreSQL repository, migration contract)
BACKEND_UNIT=32 suites, 215 tests passed
BACKEND_E2E=11 suites, 50 tests passed
FRONTEND_FOCUSED=7 tests passed
FRONTEND_TESTS=39 files, 181 tests passed
BACKEND_TYPECHECK=PASS
BACKEND_BUILD=PASS
FRONTEND_TYPECHECK=PASS
FRONTEND_BUILD=PASS
AUDIT=0 vulnerabilities (Backend and Frontend npm audit); Lighthouse accessibility 100 desktop/mobile
TEST_DB_MUTATED=NO
PRODUCTION_DB_MUTATED=NO
DEPLOYED=NO
CURRENT_PHASE=08
PHASE_08=IN_PROGRESS
LNG_08_003=VERIFYING
OWNER_VISUAL_ACCEPTANCE_08B1=PENDING
NEXT_ACTION=STOP_FOR_EXTERNAL_REVIEW_BEFORE_0010_AUTHORIZATION
```
