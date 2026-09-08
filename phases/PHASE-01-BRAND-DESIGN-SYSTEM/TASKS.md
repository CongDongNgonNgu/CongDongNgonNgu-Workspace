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
