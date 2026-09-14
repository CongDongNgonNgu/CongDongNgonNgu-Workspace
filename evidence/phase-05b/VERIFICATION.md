# Phase 05B Verification

This record covers the Phase 05B frontend community feed and authenticated
plain-text composer. It does not close Phase 05 or mark visual acceptance
complete.

## Effective state

~~~text
PHASE_05B_SCOPE=COMMUNITY_FEED_AND_COMPOSER
PHASE_05=IN_PROGRESS
LNG_05_001=DONE
LNG_05_002=VERIFYING
LNG_05_003=VERIFYING
LNG_05_004=VERIFYING
LNG_05_005=VERIFYING
LNG_05_006=VERIFYING
LNG_05_007=PLANNED
FRONTEND_BRANCH=phase-05b-community
FRONTEND_COMMIT=c306feb91e13366180cc6226a345955425b2c236
WORKSPACE_COMMIT=SEE_FINAL_REPORT
BACKEND_CHANGED=NO
BACKEND_SHA=85066b6c9e75a7f8a4339d2cc8415a7c627c7494
PUSHED=NO
DEPLOYED=NO
PHASE_05C_STARTED=NO
PHASE_06_STARTED=NO
~~~

## Implemented contract scope

- Direct frontend route: /community.
- Public or authenticated GET /api/v1/community/posts with optional
  languageCode, bounded limit, and opaque cursor forwarded unchanged.
- Deterministic latest feed, language filter, explicit Xem them pagination,
  unique append behavior, and loading/empty/error/rate-limit states.
- Authenticated POST /api/v1/community/posts using postType, languageCode,
  content, optional cefrLevel/topic, and PUBLIC default visibility.
- Plain-text content rendering with preserved newlines; no HTML injection.
- Authenticated HELPFUL add/remove, save/unsave, and post report actions.
- Public share lookup only renders a validated root-relative canonical path.
- Comment count is displayed without opening an unimplemented comment action.

## Tests and quality gates

~~~text
npm test -- --run = PASS (25 test files, 105 tests)
npm run typecheck = PASS
npm run lint = PASS
npm run build = PASS
npm audit --audit-level=high = PASS (0 vulnerabilities)
~~~

The regression suite includes Unicode length validation, exact request
paths/bodies, opaque cursor forwarding, duplicate-free feed append,
authentication guards, server-confirmed action state, dialog focus trapping
and return focus, responsive-safe route rendering, and an XSS fixture where
<script>alert(1)</script> remains literal text.

## Runtime and responsive evidence

- Direct /community navigation returned HTTP 200.
- Page title: Cộng đồng học ngôn ngữ | CongDongNgonNgu.vn.
- Browser checks were performed at desktop 1440 and mobile 390. Measured
  horizontal overflow was false at 320, 375, 390, 412, 768, 1024, and
  1440 pixels.
- The local backend was not running during the browser pass. Catalog/feed
  requests returned 500, and the frontend displayed generic error states
  without fabricating data. No frontend runtime exception was observed;
  console errors were limited to those expected API resource failures.
- Lighthouse/DevTools results: Accessibility 100, Best Practices 100, SEO
  100, Agentic Browsing 100.
- Browser screenshots were inspected inline. The configured screenshot
  writer rejected repository target paths, so this record claims no
  screenshot file artifact.

## Stitch evidence and visual state

~~~text
STITCH_USED=YES
STITCH_PROJECT=16442026920550574436
STITCH_FEED_DESKTOP=dd54a8ce055d4284870e1822cef33d2f
STITCH_FEED_MOBILE=edb521a9ac77463a896dd047770fb9e3
STITCH_COMPOSER_DESKTOP=b7320fdfb139424e84e11d42f42a4525
STITCH_COMPOSER_MOBILE=93e2741039e446938f56a1341980c77d
VISUAL_FEED_DESKTOP=REVIEW
VISUAL_FEED_MOBILE=REVIEW
VISUAL_COMPOSER_DESKTOP=REVIEW
VISUAL_COMPOSER_MOBILE=REVIEW
~~~

Visual tasks remain REVIEW rather than DONE because data-populated visual
owner acceptance is still pending. This phase intentionally excludes the
detail/comments route, edit/delete flow, comment reports, backend changes,
push, deployment, Phase 05C, and Phase 06.
