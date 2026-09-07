# Phase 16 — PWA, SEO, Accessibility & Performance

## Goal
Harden the mature product for installability, discoverability, inclusive use and fast real-world performance without unsafe caching of authenticated/private/API/payment data.

## Scope
PWA manifest/install/update/offline behavior; safe service-worker cache strategy; public SEO/canonical metadata/sitemap; structured data where valid; accessibility reconciliation; Core Web Vitals/performance budgets; responsive and visual regression matrix.

## Performance targets
Aim for healthy Core Web Vitals such as LCP < 2.5s and CLS < 0.1 under agreed test conditions; document environment/device/network rather than treating lab numbers as universal truth. INP should remain in a healthy range.

## Completion gate
PWA/SEO/cache/accessibility/performance strategy is implemented and production-like tested; private surfaces are not cached unsafely; required viewports and major journeys pass; commits/CI/evidence complete.
