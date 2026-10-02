# Phase 16 Decomposition

## Objective

Harden the mature CongDongNgonNgu frontend for installability,
discoverability, inclusive use, and fast real-world performance without
caching authenticated, private, API, payment, or mutation traffic.

## Dependency order

### 16A - PWA foundation and cache safety

- **Tasks:** LNG-16-001, LNG-16-002
- **Dependencies:** Phase 01 branding; mature frontend; no unresolved Phase 15 dependency
- **Scope:** branded manifest and icons; stable scope/id/start URL; truthful install guidance and installed-state detection; versioned service worker; public-shell/offline strategy; update lifecycle; explicit network-only handling for authenticated, private, API, payment, commerce, and mutation traffic.
- **Done criteria:** manifest/install/cache contracts have focused tests; offline and update behavior is truthful; sensitive responses are never cached; frontend gates pass; branch/main/Workspace evidence gates pass.

### 16B - Public SEO and content semantics

- **Tasks:** LNG-16-003, LNG-16-004
- **Dependencies:** 16A; existing Language Hub, Library, and Community public visibility contracts
- **Scope:** route-aware canonical/title/description/robots/OpenGraph metadata; public/private index policy; sitemap and robots policy; valid BreadcrumbList/WebSite structured data; heading/landmark/link semantics without fabricated ratings, authors, or course facts.
- **Done criteria:** public routes expose intentional metadata and sitemap entries; filtered/private/admin routes are canonicalized or excluded; structured data is valid and factual; focused tests and frontend gates pass.

### 16C - Accessibility reconciliation

- **Tasks:** LNG-16-005
- **Dependencies:** 16A and 16B; mature UI and current shared primitives
- **Scope:** reconcile critical auth, onboarding, hub, community, correction, exchange, Library, AI, membership, notification, room/event, and admin journeys; preserve semantic controls, focus-visible behavior, dialogs/drawers, live regions, errors, motion preferences, long multilingual content, and session-safe states.
- **Done criteria:** no blocker-level keyboard/focus/contrast regression is known; focused accessibility tests and browser tree checks pass; exceptions are documented rather than hidden.

### 16D - Performance budget and optimization

- **Tasks:** LNG-16-006
- **Dependencies:** 16A-16C
- **Scope:** measure current bundle/route behavior; add route-level code splitting where it improves the current monolithic bundle; add a stable build budget and document LCP/CLS/INP proxy measurements without weakening UX or leaking private state.
- **Done criteria:** performance budget is enforced in the build workflow; initial bundle is reduced or the measured exception is documented; functionality and all frontend gates remain green.

### 16E - Responsive and visual regression matrix

- **Tasks:** LNG-16-007
- **Dependencies:** 16A-16D
- **Scope:** controlled responsive checks at 320, 375, 390, 412, 768, 1024, and 1440 px; long Vietnamese/non-Latin content; PWA standalone shell; overflow, touch targets, focus, loading/error/offline/update states; stable visual evidence for representative public and protected surfaces.
- **Done criteria:** required widths and representative journeys pass without horizontal overflow or accessibility regressions; evidence records the controlled runtime and any honest limitation.

### 16F - Production-like reconciliation and Phase 16 final gate

- **Tasks:** LNG-16-008
- **Dependencies:** 16A-16E
- **Scope:** production-like HTTPS/preview build; service-worker update/offline behavior; cache inspection; SEO crawl output; accessibility suite; performance budget; exact-head and post-merge CI; Workspace reconciliation, branch audit, cleanup, and final closeout.
- **Done criteria:** all LNG-16 tasks are PASS; `PHASE_16_TASK_SET_COMPLETE=YES`; `PHASE_16_FINAL_GATE=PASS`; `PHASE_16_FINAL_CLOSEOUT=PASS`; clean synchronized mains; `PHASE_17_STARTED=NO`.

## Cross-phase invariants

- Backend remains authoritative for identity, authorization, membership,
  challenge/event state, attendance, moderation, admin capability, and all
  protected facts.
- The Frontend does not cache authenticated/private/API/payment/mutation
  responses and does not fabricate unsupported metrics or structured data.
- Accepted Phase 10-15 contracts remain unchanged unless a specific Phase 16
  task requires an additive, compatibility-preserving change.
- No production deployment, restart, database write/migration, provider
  activation, credential/secret mutation, real-money action, DNS change,
  destructive action, force push, or CI/branch-protection bypass is in scope.
