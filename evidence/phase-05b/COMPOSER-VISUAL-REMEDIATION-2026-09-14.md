# Phase 05B — Composer Visual Fidelity Remediation

Date: 2026-09-14

This is an appended Phase 05B evidence record. Existing Feed, migration,
language-seed, API, and Phase 05A history is preserved. Canonical Stitch
screens were reused without regeneration.

## Scope and safety

FRONTEND_BASELINE=89ed2da56112764d0c3652425639b77888a45a81
FRONTEND_REMEDIATION_SHA=00727560aa5886f5780a58ba6d46746254c29248
WORKSPACE_BASELINE=d44c9b71354b06d105d059937d7d237e7781e25b
BACKEND_SHA=85066b6c9e75a7f8a4339d2cc8415a7c627c7494
DATABASE_TEST_AUTHORIZED=YES
PRODUCTION_DATABASE_TOUCHED=NO
BACKEND_SOURCE_CHANGED=NO
MIGRATIONS_CHANGED=NO
FEED_SOURCE_CHANGED=NO

The runtime used the existing authenticated session and the owner-authorized
Neon TEST database. No credentials, production data, migrations, or unrelated
records were changed.

## Canonical Stitch references

STITCH_PROJECT=3718538619973058970
COMPOSER_STITCH_DESKTOP=b7320fdfb139424e84e11d42f42a4525
COMPOSER_STITCH_MOBILE=93e2741039e446938f56a1341980c77d

## Remediation applied

- Composer title and desktop/mobile description now match the canonical
  product copy.
- Optional CEFR and topic fields are grouped under the canonical learning
  information section; the section is expanded on desktop and collapsed on
  mobile when opened.
- Visibility uses accessible PUBLIC/PRIVATE radio cards with the backend
  contract values unchanged.
- Publish and Cancel are rendered in a fixed dialog footer, with the mobile
  two-column action ratio and safe-area padding.
- Composer uses a fixed header/footer with one internal scroll region and
  locks page-body scrolling while open.
- No title, media, upload, rich-text, autosave, comment, detail, or other
  unsupported feature was added.

## Runtime captures

Canonical rasters, final runtime captures, and side-by-side comparisons:

- evidence/phase-05b/composer_stitch_desktop.png
- evidence/phase-05b/composer_runtime_desktop.png
- evidence/phase-05b/composer_side_by_side.png
- evidence/phase-05b/composer_stitch_mobile.png
- evidence/phase-05b/composer_runtime_mobile.png
- evidence/phase-05b/composer_mobile_side_by_side.png

Historical pre-remediation captures were preserved as
composer_runtime_desktop_before-remediation.png,
composer_runtime_mobile_before-remediation.png,
composer_side_by_side_before-remediation.png, and
composer_mobile_side_by_side_before-remediation.png.

## Desktop comparison

DESKTOP_RUNTIME_VIEWPORT=1440x900
DESKTOP_DIALOG_GEOMETRY=700px wide; x=370; y=67.5; height=765px
DESKTOP_BODY_SCROLL=clientHeight=574px; scrollHeight=746px; overflow-y=auto
DESKTOP_FOOTER=bottom-fixed within dialog; Publish and Cancel remain reachable
DESKTOP_BODY_SCROLL_LOCK=body overflow hidden
VISUAL_COMPOSER_DESKTOP=PASS
DESKTOP_MATERIAL_DIFFERENCES=NONE

The runtime preserves the canonical field order, title hierarchy, grouped
optional metadata, visibility treatment, fixed footer action placement, and
internal scrolling model. The Feed remains visible behind the modal without
being structurally changed.

## Mobile comparison

MOBILE_RUNTIME_VIEWPORT=390x844
MOBILE_DIALOG_GEOMETRY=full-screen 390px by 844px sheet
MOBILE_HEADER_HEIGHT=76.59px
MOBILE_BODY_SCROLL=clientHeight=698px; scrollHeight=737px; overflow-y=auto
MOBILE_FOOTER=bottom-fixed; 1fr Cancel / 2fr Publish; safe-area padding
MOBILE_BODY_SCROLL_LOCK=body overflow hidden
MOBILE_HORIZONTAL_OVERFLOW=none
VISUAL_COMPOSER_390=PASS
MOBILE_MATERIAL_DIFFERENCES=NONE

The learning-information disclosure is collapsed on initial mobile open,
visibility cards stack without clipping, and both actions remain reachable
inside the viewport.

## Functional and runtime regression

COMPOSER_AUTH_SESSION=PASS
EMPTY_REQUIRED_VALIDATION=PASS
WHITESPACE_ONLY_VALIDATION=PASS
PRIVATE_VISIBILITY_CONTRACT=PASS
PUBLISH_AFTER_REMEDIATION=PASS
PUBLISH_REQUEST=POST /api/v1/community/posts -> 201
FEED_CARDS_BEFORE_PUBLISH=5
FEED_CARDS_AFTER_PUBLISH=6
MATCHING_NEW_TEST_CARD=1
TEST_POSTS_ADDED_BY_THIS_REMEDIATION=1
VISUAL_REVIEW_DATA=NEON_TEST_ONLY

The new post was created through the live Composer path against the real
Backend. It produced one matching Feed card and no duplicate card. The
existing Phase 05B TEST review data remains in place; no broad cleanup ran.

The earlier Phase 05B evidence remains the source for the already-passed
language filter, cursor, Helpful, Save, Share, Report, API, and authentication
checks. The Feed visual locks remain unchanged:

FEED_VISUAL_1440=PASS
FEED_VISUAL_390=PASS

## Responsive and accessibility checks

RESPONSIVE_320=PASS
RESPONSIVE_375=PASS
RESPONSIVE_390=PASS
RESPONSIVE_412=PASS
RESPONSIVE_768=PASS
RESPONSIVE_1024=PASS
RESPONSIVE_1440=PASS

All checked widths had no horizontal overflow. The dialog had one scrollable
content region, no body-scroll leakage, no clipped actions, and no nested
scrollbar introduced by the remediation. Long Vietnamese and CJK content
remained readable in the existing Feed review.

ACCESSIBILITY=PASS
Accessibility tree review confirmed dialog naming, field labels, radio-group
semantics, validation alerts, focus containment while open, focus restoration
after Cancel, visible action targets, and mobile reachability.

LIGHTHOUSE_FEED_SNAPSHOT=Accessibility 100; Best Practices 100; SEO 100; Agentic Browsing 100; 38 passed; 0 failed
LIGHTHOUSE_COMPOSER_OPEN_SNAPSHOT=Accessibility 97; Best Practices 100; SEO 100; Agentic Browsing 100; supporting snapshot only

APPLICATION_CONSOLE_ERRORS=0
UNEXPECTED_NETWORK_ERRORS=0
NETWORK_RUNTIME=real local Frontend -> real local Backend; community feed 200 and publish 201

## Verification and delivery state

TESTS=25 files; 109 tests passed
TYPECHECK=PASS
LINT=PASS
BUILD=PASS
AUDIT=0 vulnerabilities at high threshold

PHASE_05=IN_PROGRESS
LNG_05_001=DONE
LNG_05_002=VERIFYING
LNG_05_003=VERIFYING
LNG_05_004=VERIFYING
LNG_05_005=VERIFYING
LNG_05_006=VERIFYING
LNG_05_007=PLANNED

FRONTEND_CHANGED=YES
WORKSPACE_CHANGED=YES
BACKEND_CHANGED=NO
PUSHED=NO
DEPLOYED=NO
PHASE_05C_STARTED=NO
PHASE_06_STARTED=NO

Owner visual acceptance is not marked DONE.
