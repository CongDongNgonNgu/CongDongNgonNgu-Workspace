# Phase 01 Remediation Verification

Date: 2026-09-08
Status: accepted after local, remote, and CI verification on 2026-09-08
Scope: LNG-01-008 through LNG-01-013

This record supplements the historical Phase 01 evidence. It does not replace
or rewrite the original HANDOFF, TASKS, commits, or screen history.

## Source of truth

Stitch project: projects/3718538619973058970

The accepted and owner-directed references were retrieved from Stitch and
inspected as rasters before implementation review:

- Header desktop baseline: 96ceae90e4e745df818ecff334c26f8b
- Header mobile baseline: 1bcb9e81edaf46a8bb73375a6b760a98
- Footer desktop canonical: f665beca30584a2483d8c6266686996e
- Footer mobile canonical: db89bcbfcd094af29ae2170d421e9bda
- Mobile action bar canonical: dbc78d828923456ca5786b4f16a58df5
- Home desktop canonical: 607f7aa26af44e8da71ae0e559e4a4f2
- Home mobile canonical: de0617b58b324d0e9df9de0607139d0a

The corresponding Stitch images are preserved in this directory with the
stitch- prefix. Runtime captures are preserved with the runtime- prefix.

## Side-by-side visual reconciliation

The following pairs were viewed side by side at the matching conceptual
viewport. The Stitch images are high-density exports, so the reference width
is scaled to its named viewport for comparison.

| Surface | Stitch reference | Runtime capture | Concrete reconciliation |
| --- | --- | --- | --- |
| Home, 390px | stitch-home-mobile-390-canonical.png | runtime-home-390.png | Preserves the compact message-first mobile rhythm, real community image, restrained sections, navy footer, and three-action bottom bar. Runtime Vietnamese copy is public-facing and the image is loaded locally. |
| Home, 1440px | stitch-home-desktop-1440-canonical.png | runtime-home-1440.png | Preserves the open editorial split hero and quiet canvas. The Stitch desktop placeholder block is replaced by the approved local photograph; the left column stays moderate and top-aligned. |
| Footer, 390px | stitch-footer-mobile-390-canonical.png | runtime-footer-390.png | Preserves navy surface, brand mission, locale selector, share action, and copyright. Runtime adds only real discover/community groups and reserves safe-area space so the fixed action bar never covers the copyright. |
| Footer, 1440px | stitch-footer-desktop-1440-canonical.png | runtime-footer-1440.png | Preserves navy surface, horizontal content rhythm, locale/share controls, and copyright. Future-state rows and empty project-management groups are removed; only real links remain. |
| Header, desktop | stitch-header-desktop-1440-canonical.png | runtime-home-1440.png | Preserves the mark, active discover treatment, More menu, and search affordance. Logged-out auth actions are intentionally omitted because the dependency is not active. |
| Header, mobile | stitch-header-mobile-320-canonical.png | runtime-home-390.png | Preserves the compact brand/search/menu pattern. The runtime keeps controls at touch-safe sizes and uses the Vietnamese wordmark. |
| Mobile action bar | stitch-action-bar-mobile-390-canonical.png | runtime-home-390.png | Matches the canonical three real actions: Trang chu, Tim kiem, and Mo menu. Unavailable community, practice, AI, and profile slots are not shown. |

Side-by-side sheets are preserved for the two required comparison widths:

- comparison-home-390-side-by-side.png
- comparison-home-1440-side-by-side.png
- comparison-footer-390-side-by-side.png
- comparison-footer-1440-side-by-side.png

## Implementation reconciliation

- Header and Footer each expose one public component API. Desktop, mobile,
  drawer, and action-bar renderers are private implementation details.
- All public shell icons come from lucide-react through
  src/components/ui/Icon. IconName is a closed union and IconSize is limited
  to 16, 18, 20, and 24. The default stroke policy is 1.8.
- No public shell text or navigation uses Unicode, ASCII, emoji, or status
  placeholders. Unavailable primary destinations are omitted.
- Be Vietnam Pro is bundled from @fontsource/be-vietnam-pro and imported for
  weights 400, 500, and 600 in src/main.tsx. Weight 700 remains reserved for
  exceptional emphasis. The local hero image is
  public/brand/language-community-hero-v1.jpg.
- src/styles/global.css is import-only and delegates to tokens, reset, base,
  and utilities. Layout and primitive styles are colocated CSS Modules.
- Feature-oriented directories exist for auth, languages, community, exchange,
  library, ai, and membership. They contain no future-phase UI or routes.
- Home user-facing copy contains no Phase, GLOBAL, demo, placeholder, coming
  soon, or Vietnamese future-state language.

## Responsive runtime matrix

All captures were made against the running frontend with exact CDP device
metrics. Every width had clientWidth equal to scrollWidth, all images complete,
and the Be Vietnam Pro face loaded.

| Width | Main x | Main width | H1 size | H1 line height |
| ---: | ---: | ---: | ---: | ---: |
| 320 | 16 | 288 | 42.4px | 43.672px |
| 375 | 16 | 343 | 48.75px | 50.2125px |
| 390 | 16 | 358 | 50.7px | 52.221px |
| 412 | 16 | 380 | 53.56px | 55.1668px |
| 768 | 24 | 720 | 42.4px | 43.672px |
| 1024 | 24 | 976 | 56.32px | 58.0096px |
| 1440 | 120 | 1200 | 76px | 78.28px |

Runtime captures:

- runtime-home-320.png
- runtime-home-375.png
- runtime-home-390.png
- runtime-home-412.png
- runtime-home-768.png
- runtime-home-1024.png
- runtime-home-1440.png
- runtime-footer-390.png
- runtime-footer-1440.png

## Browser and accessibility gate

Observed in the live 390px page:

- banner, main, navigation, and contentinfo landmarks are present.
- The accessibility tree contains named links, buttons, textbox/combobox
  controls, and headings with H1 -> H2 -> H3 structure. No unnamed interactive
  control was found.
- All visible interactive targets are at least 44px in both dimensions.
- The exact page and body widths are 390px; no horizontal overflow exists.
- Be Vietnam Pro 400, 500, and 600 faces are loaded; all nine locale subset
  faces reported loaded.
- The hero image is complete at 1200 by 800.
- No forbidden project/demo/future copy, placeholder glyph, em dash, or
  placeholder status was found in the rendered text.
- Sixteen SVG nodes were rendered through the shared icon system.
- No JavaScript exception, Log warning/error, or failed network request was
  observed. Vite debug and React DevTools informational messages are
  development-only informational output, not warnings or errors.

## Automated gates

- npm.cmd test -- --run: 5 files, 18 tests passed.
- npm.cmd run typecheck: passed.
- npm.cmd run build: passed; bundled Be Vietnam Pro WOFF and WOFF2 assets are
  present in the production output.
- npm.cmd audit --audit-level=high: 0 vulnerabilities.

## Acceptance state

LNG-01-008 through LNG-01-013 are DONE. Owner remediation acceptance is
complete after the local visual, architecture, icon, typography, wording,
responsive, accessibility, remote SHA, and CI checks recorded above.

- Frontend origin/main is 1c741cac3cfdb98b09f1360ce5936f9caaa95745.
- Frontend CI run 34196014232 completed successfully for that remote commit.
- Workspace origin/main was verified after the reconciliation records were committed and pushed.
- Phase 02 remained blocked until this acceptance and was not started.

## LNG-01-014 final Homepage body reconciliation

**Status:** DONE

The first final Home body was revised after owner feedback: a fixed
Vietnamese-English exchange and a Vietnamese-specific world banner were too
narrow for the global language community. The revised public narrative is
language-agnostic while Vietnamese remains in the initial language catalog
and product vision.

### Final source of truth

FINAL HOMEPAGE DESIGN SOURCE OF TRUTH
Desktop: fb7f5dbb2459493d970c7da39d44a73a
Mobile: eb2aa177b91541b19877a428f23ffc8c
Core/App Shell: ARCHITECTURE REFERENCE ONLY

The earlier final screens 848b421b4b664e6f91a84cbe3caf8cb0 and
8c33c51d5ca5449e802c357bf0057313 are superseded/reference only. Header and
Footer references remain canonical and unchanged.

### Content and visual reconciliation

- Exchange now uses Gặp nhau qua ngôn ngữ., the roles Người học ngôn ngữ
  mới and Người chia sẻ kinh nghiệm, and the caption Mỗi người vừa học,
  vừa góp một điều hữu ích. It remains a clearly gated future direction
  with no implied match, profile, or active language pair.
- The world section now uses Ngôn ngữ của bạn thuộc về thế giới. and the
  general topics Âm thanh & phát âm, Cách nói đời thường, Văn hóa & bối
  cảnh, and Câu chuyện từ cộng đồng.
- The hero now uses the exact local Stitch reference asset
  `src/assets/language-community-hero-v2.jpg`; the mobile CTA pair uses a
  bright accessible orange pill and navy outline pill, with a rounded
  full-width 4:3 image treatment and the existing caption.
- The mobile shell keeps the menu-left/search-right composition, uses the
  supplied logo mark with the “Cộng đồng ngôn ngữ” wordmark, and provides a
  left-anchored Vietnamese Menu drawer, 320px wide at 390px, rounded, and
  animated from -320px with 280ms panel/scrim motion. All drawer items target
  existing same-page anchors.
- The body keeps the human-first editorial hierarchy, real local hero
  image, bundled Be Vietnam Pro, canonical shell, Lucide SVG icons, and
  same-page actions. No fake stats, testimonials, pricing, dead routes,
  gradients, dashboards, or placeholder glyphs are present.
- Stitch's conceptual Material icon glyphs and placeholder links are
  intentionally implemented with the project icon wrapper and real anchors
  or static language rows.

### Permanent evidence

The Workspace-level evidence index contains:

- ../../../evidence/phase-01/LNG-01-014-STITCH-FINAL-DESKTOP-1440.png
- ../../../evidence/phase-01/LNG-01-014-STITCH-FINAL-MOBILE-390.png
- ../../../evidence/phase-01/LNG-01-014-STITCH-HTML-RENDER-MOBILE-390.png
- ../../../evidence/phase-01/LNG-01-014-RUNTIME-DESKTOP-1440.png
- ../../../evidence/phase-01/LNG-01-014-RUNTIME-MOBILE-390.png
- ../../../evidence/phase-01/LNG-01-014-COMPARISON-DESKTOP-1440.png
- ../../../evidence/phase-01/LNG-01-014-COMPARISON-MOBILE-390.png
- ../../../evidence/phase-01/LNG-01-014-RUNTIME-REVISION-DESKTOP-1440.png
- ../../../evidence/phase-01/LNG-01-014-RUNTIME-REVISION-MOBILE-390.png
- ../../../evidence/phase-01/LNG-01-014-COMPARISON-REVISION-DESKTOP-1440.png
- ../../../evidence/phase-01/LNG-01-014-COMPARISON-REVISION-MOBILE-390.png

The direct Stitch desktop raster is 2560 by 10930. The direct mobile screen
preview is 45 by 512 because the CDN returned a scaled full-page preview;
the source metadata is 780 by 8828. The HTML export render is preserved at
390 by 4414 for a readable mobile comparison and is clearly named as a
render, not a runtime capture.

### Final runtime matrix

| Width | Client | Scroll | Page height | Main section width | Header | Mobile nav |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 320 | 320 | 320 | 7887 | 288 | 57px | 69px |
| 375 | 375 | 375 | 7324 | 343 | 57px | 69px |
| 390 | 390 | 390 | 7237 | 358 | 57px | 69px |
| 412 | 412 | 412 | 7166 | 380 | 57px | 69px |
| 768 | 768 | 768 | 4671 | 720 | 73px | hidden |
| 1024 | 1024 | 1024 | 4393 | 976 | 73px | hidden |
| 1440 | 1440 | 1440 | 4891 | 1200 | 73px | hidden |

Every required width has no horizontal overflow, no dead hash link, no
gradient, and complete local images. The mobile visible interactive controls
all meet the 44px target check. The final 390px DOM contains the revised
headings and topics and no old Vietnamese-English framing.

### Final gates

- Frontend local gates: 6 test files and 19 tests passed; typecheck, lint,
  build, and high-severity audit passed with 0 vulnerabilities.
- Lighthouse navigation at 390px mobile and 1440px desktop: Accessibility,
  Best Practices, SEO, and Agentic Browsing all 100; 57 passed and 0 failed.
 dependency, font, and brand-asset requests observed; no failed request.
- Chrome console: no error or warning messages. Network: 69 local app,
  dependency, font, and brand-asset requests observed; no failed request.
- Frontend origin/main: 47862c119e3af122c063332c1f4ee73beebea998.
  CI run 34227951930 passed quality, install, lint, typecheck, unit tests,
  build, and security audit.
- Workspace's earlier reconciliation commit 01a4a64ec3e35217357d668d176f91feef7def1a
  remains verified in origin/main; the final documentation reconciliation is
  pushed to origin/main after this update. Phase 01 acceptance is complete;
  Phase 02 remains blocked and was not started.
