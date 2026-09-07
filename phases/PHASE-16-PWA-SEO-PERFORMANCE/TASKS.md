# Phase 16 Tasks

## LNG-16-001 — PWA Manifest & Install Experience
**Status:** PLANNED  
**Depends on:** Mature core frontend and Phase 01 branding

Create branded manifest with stable scope/id/start URL, correct icon variants/maskable handling, theme/background colors and useful shortcuts only to stable routes. Implement desktop/Android install prompt capture where browser supports it and iOS manual guidance; never falsely promise automated iOS install. Detect installed state and hide redundant install actions.

## LNG-16-002 — Service Worker & Cache Safety
**Depends on:** LNG-16-001

Define versioned cache strategy: hashed static assets cache-first, public images stale-while-revalidate where appropriate, public navigation network-first/offline fallback, authenticated/private/API/payment/commerce/mutation requests network-only unless a separately reviewed safe exception exists. Implement update lifecycle and cache cleanup.

## LNG-16-003 — Public SEO Architecture
**Depends on:** Language Hub, Library and Community public visibility rules

Define canonical metadata for home, language hubs and public Library/resource/community pages; titles/descriptions/hreflang/localization only where actually supported; robots/canonical policy for filters/pagination; sitemap generation; OpenGraph/social metadata. Private/auth/admin pages must not be indexed.

## LNG-16-004 — Structured Data & Content Semantics
**Depends on:** LNG-16-003

Use schema.org structured data only where content truly matches (e.g. BreadcrumbList, WebSite, Article/FAQ only when valid). No fabricated ratings, authors or course schema. Improve headings/landmarks/link text and server/static crawlability according to frontend architecture.

## LNG-16-005 — Accessibility Full Reconciliation
**Depends on:** Mature UI

Audit WCAG 2.2 AA baseline across critical journeys: auth, onboarding, hubs, community, correction, exchange, Library, AI, membership, notifications, rooms/events and admin. Fix keyboard traps, focus order, labels, contrast, motion, live regions, dialogs/drawers, diff semantics, forms and errors. Document exceptions with owner/plan; critical regressions block production.

## LNG-16-006 — Performance Budget & Optimization
**Depends on:** Mature frontend

Measure bundle/routes, LCP/CLS/INP proxies, image/font loading, long tasks and API waterfall. Add route/code splitting, asset optimization, virtualization only where needed, sensible query caching and prefetching without leaking private state. Set CI budgets where stable; do not chase synthetic score by breaking UX.

## LNG-16-007 — Responsive/Visual Regression Matrix
**Depends on:** LNG-16-001..006

Run representative surfaces at 320/375/390/412/768/1024/1440, orientation where relevant, long Vietnamese/non-Latin content and installed-PWA viewport. Maintain Playwright visual baselines for stable critical surfaces with controlled data.

## LNG-16-008 — Production-Like Reconciliation
**Depends on:** LNG-16-001..007

Test HTTPS/service-worker update/offline, install guidance, SEO crawl output, accessibility suite and performance budget on production-like build. Confirm no private/API/payment response enters cache. Commit/push and update handoff.
