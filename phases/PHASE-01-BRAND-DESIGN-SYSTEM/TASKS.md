# Phase 01 Tasks

## LNG-01-001 — Brand & Design Token Specification
**Status:** DONE
**Depends on:** Phase 00  
**Repositories:** Frontend, Workspace

Requirements:
- Audit supplied logo usage and define safe logo variants needed: horizontal/compact/icon-only/monochrome/dark-surface; do not fabricate a new trademark without owner approval.
- Define semantic color tokens derived from navy/orange/green/cyan and neutral surfaces; document accessible contrast usage.
- Define typography scale, weights, line heights, spacing, radii, shadows, z-index layers, breakpoints, container widths and motion rules.
- Light theme is implemented first; token architecture must not block later dark mode.
- No raw palette proliferation across feature CSS.

## LNG-01-002 — Header & Navigation Design/Implementation
**Status:** DONE
**Depends on:** LNG-01-001

Use Stitch MCP first. Desktop intent includes logo, Khám phá, Ngôn ngữ, Cộng đồng, Trao đổi, Phòng nói, Thư viện, AI, search, Membership, notification and avatar/account. Responsive logic may collapse lower-priority items rather than squeezing. Mobile uses compact brand/search/notification/account patterns; no desktop menu crammed into one row.

Implement keyboard-accessible navigation, active states, menus/drawers, focus handling and logged-out/logged-in variants. Feature links whose phases are not active must be gated or omitted—not dead links.

## LNG-01-003 — Footer Design/Implementation
**Status:** DONE
**Depends on:** LNG-01-001

Use Stitch first. Include brand mission, discover languages, community/resources, membership/help/legal/contact/social areas where actually available. Mobile sections may accordion/collapse if accessible. Footer must not become an SEO link dump.

## LNG-01-004 — Mobile Bottom Navigation
**Status:** DONE
**Depends on:** LNG-01-001, LNG-01-002

Use Stitch first. Baseline targets: Trang chủ, Cộng đồng, Luyện tập, AI, Cá nhân. Confirm safe-area handling, active state, touch targets, keyboard/screen reader labels and interactions with drawers/modals. Do not show unavailable destinations prematurely.

## LNG-01-005 — Core UI Primitives
**Status:** DONE
**Depends on:** LNG-01-001

Implement project-native Button, link, input/textarea, select/combobox, checkbox/radio/switch, tabs, dialog, drawer, dropdown, tooltip, toast, avatar, badge/tag/chip, language indicator, card/list row, skeleton, empty/error state, pagination/search primitives and loading patterns as justified by current stack. Avoid copying visual implementation from EduAI unchanged.

## LNG-01-006 — Responsive Global Shell
**Status:** DONE
**Depends on:** LNG-01-002..005

Create shell/layout composition for public and authenticated pages, including content width, rails, sticky behavior, mobile safe areas and focus restoration. Verify 320/375/390/412/768/1024/1440.

## LNG-01-007 — Visual/A11y Reconciliation
**Status:** DONE
**Depends on:** LNG-01-001..006

Run visual regression and accessibility checks, inspect for excessive cards/bold text/gradients, compare against EduAI to ensure distinct hierarchy and composition, fix overflows/touch/focus issues, push evidence and update handoff.

## Owner remediation opened 2026-09-08

The original LNG-01-001..007 records and their historical evidence remain unchanged. Owner visual acceptance is reopened after direct Stitch raster inspection found placeholder-heavy navigation, oversized typography, missing bundled font verification, competing shell styles, broad global CSS, and developer-facing demo copy. Phase 02 remains blocked until LNG-01-008..013 are accepted.

## LNG-01-008 — Owner Visual Reconciliation & Stitch Baseline
**Status:** DONE
**Depends on:** LNG-01-001..007

Use the accepted Stitch references and the owner feedback as the visual source of truth. Capture matching Stitch and runtime evidence at 390px and 1440px, reconcile the shell direction, and record the differences before implementation acceptance.

Acceptance:
- Accepted Stitch references are visually inspected rather than inferred only from metadata.
- The Home shell reads modern, friendly, human, and multicultural; it is not an enterprise dashboard, LMS, newspaper, or generic SaaS template.
- Historical evidence is preserved and new remediation evidence is appended.

Verification:
- Stitch project `projects/3718538619973058970` inspected.
- Owner feedback and implementation differences recorded in the phase handoff.

## LNG-01-009 — Canonical Navigation & SVG Icon System
**Status:** DONE
**Depends on:** LNG-01-008

Consolidate Header, Footer, and responsive mobile navigation into one canonical public shell API. Replace Unicode/ASCII/emoji placeholder icons with one professional SVG icon family and a shared 16/18/20/24px sizing policy. Omit unavailable destinations from primary navigation and remove visible `Sắp có` rows from the public shell.

Acceptance:
- Exactly one public Header API and one public Footer API remain; responsive renderers are private implementation details.
- Icons are SVG components with consistent stroke, alignment, hover, focus, and disabled treatment.
- No public shell navigation uses placeholder glyphs, emoji, or disabled future-feature badges.

Verification:
- Source scan finds no placeholder navigation glyphs or emoji labels.
- Focus and interaction tests cover the canonical shell actions.

## LNG-01-010 — Bundled Vietnamese Typography & Brand Asset Loading
**Status:** DONE
**Depends on:** LNG-01-008

Bundle and load the selected Vietnamese-capable font locally, verify the loaded face at runtime, and tune the hierarchy so headings are moderate and readable. Use only intentional 400/500/600 weights with 700 reserved for emphasis. Add the approved-real visual asset needed by the Home shell without introducing a new logo or trademark.

Acceptance:
- The selected font is present in the dependency/build output and loaded by the browser.
- Vietnamese diacritics, line-height, tracking, and responsive wrapping are verified at the required widths.
- Brand assets are traceable to supplied or explicitly generated project assets.

Verification:
- Build output and runtime font checks are recorded in the handoff.

## LNG-01-011 — Colocated Component Style Architecture
**Status:** DONE
**Depends on:** LNG-01-009, LNG-01-010

Refactor the broad global stylesheet into tokens, reset, base, and small utilities. Move component-specific rules into colocated CSS Modules and split broad UI buckets into maintainable component boundaries. Prepare feature directories for `auth`, `languages`, `community`, `exchange`, `library`, `ai`, and `membership` without implementing future-phase functionality.

Acceptance:
- `global.css` contains imports only; component styles are colocated and scoped.
- No enormous catch-all FormControls, Surface, or Overlays stylesheet/file remains.
- No feature scaffolding leaks future routes or placeholder UI into the public shell.

Verification:
- Typecheck, lint, tests, and build pass after the refactor.

## LNG-01-012 — Public Home Shell & Responsive Runtime Verification
**Status:** DONE
**Depends on:** LNG-01-009..011

Refine the public Home page against the reconciled Stitch direction. Remove Phase 01, GLOBAL SHELL, internal demo/status, and fake future-state language from user-facing UI. Verify the canonical shell and Home at 320, 375, 390, 412, 768, 1024, and 1440px, including overflow, safe areas, focus, disabled, and empty/loading/error behavior where applicable.

Acceptance:
- Home contains real public-facing content and no developer/project language.
- Runtime screenshots are captured for all required widths, with matched 390px and 1440px Stitch comparisons retained.
- Navigation, typography, spacing, icons, footer, and mobile action bar remain coherent across breakpoints.

Verification:
- Browser runtime, screenshot, accessibility, and no-dead-link checks are recorded.

## LNG-01-013 — Integrated Gates & Owner Re-acceptance
**Status:** DONE
**Depends on:** LNG-01-012

Run the complete Phase 01 gate set, review the final diff, push independent remediation commits, verify remote SHA and CI, and obtain owner re-acceptance. Phase 02 cannot begin until this task is DONE.

Acceptance:
- Tests, typecheck, lint, build, audit, responsive runtime, visual evidence, and accessibility checks pass or have an explicitly documented owner-approved exception.
- Frontend and Workspace commits are pushed and their remote heads are verified.
- The owner accepts the final canonical shell and Home direction.

Verification:
- Local frontend gates passed: tests (5 files, 18 tests), typecheck, lint, build, and high-severity audit (0 vulnerabilities).
- Frontend origin/main is 1c741cac3cfdb98b09f1360ce5936f9caaa95745; CI run 34196014232 completed successfully.
- Workspace reconciliation records are committed and its origin/main head is verified after push.
- Phase 02 remained blocked until this acceptance and was not started.

## LNG-01-014 — Final Homepage Body Design & Stitch Consolidation
**Status:** DONE
**Depends on:** LNG-01-013

Replace the early four-section Home body with the final human-first product narrative. Create new canonical Stitch desktop and mobile screens, implement the body in the existing frontend architecture, reconcile the final visual evidence, and keep Phase 02 blocked until the final acceptance is complete.

Acceptance:
- Final Stitch desktop and mobile screens visibly cover language discovery, the community loop, truthful Language Exchange direction, supporting AI Practice, the Open Language Library taxonomy, a universal world-through-language perspective, contribution value, and the free-community-first membership teaser.
- Home uses real same-page actions only, preserves the canonical Header/Footer, uses the approved local human-centered asset, and has no fake stats, matches, testimonials, pricing, dead routes, gradients, dashboards, or placeholder glyphs.
- Responsive behavior is verified at 320, 375, 390, 412, 768, 1024, and 1440px with no horizontal overflow and accessible touch/focus targets.
- Final Stitch IDs, runtime comparison evidence, verification results, remote SHAs, and CI status are recorded without deleting historical evidence.

Verification:
- Stitch final desktop: `848b421b4b664e6f91a84cbe3caf8cb0`.
- Stitch final mobile: `8c33c51d5ca5449e802c357bf0057313`.
- Revised Stitch final desktop: `fb7f5dbb2459493d970c7da39d44a73a`.
- Revised Stitch final mobile: `eb2aa177b91541b19877a428f23ffc8c`.
- Owner content correction reconciled: the exchange and world sections are now language-agnostic; Vietnamese remains in the language ecosystem without being used as the public Home banner's sole frame.
- Runtime, Stitch raster, comparison, Lighthouse, and CI evidence are recorded in `evidence/phase-01/RESPONSIVE-VERIFICATION.md` and the Phase 01 remediation evidence record.
- Frontend commit `047597497153f05e2383361b7382c81dc600b2fd` is pushed to origin/main; CI run `34214539105` passed.
- Hero uses the exact local Stitch reference asset `src/assets/language-community-hero-v2.jpg`; the requested CTA pair, full-width 4:3 frame, original body copy, logo treatment, Vietnamese mobile Menu, and search panel were reconciled to the revised reference.
- Frontend revision commit `6cd4af6e78b583e1dde03ec1b530e01836d99b0d` is pushed to origin/main; CI run `34219497670` passed every quality step.
- Final scoped frontend correction commit `47862c119e3af122c063332c1f4ee73beebea998` is pushed to origin/main; CI run `34227951930` passed every quality step.
- Workspace reconciliation commit `01a4a64ec3e35217357d668d176f91feef7def1a` remains verified in origin/main; the final documentation reconciliation is pushed to origin/main after this update. Phase 01 acceptance is complete.
- Phase 02 remains blocked and was not started.
