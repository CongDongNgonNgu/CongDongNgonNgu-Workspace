# Phase 16 Evidence — PWA, SEO, Accessibility, Performance, Responsive, Reconciliation

**Date:** 2026-10-02 (Asia/Saigon)
**Status:** PASS
**Production deployment:** NO
**Production database mutation or migration:** NO
**Provider activation or secret mutation:** NO

## Source heads and lifecycle

- Backend `main`: `6859ec5e57e8792ea188fe03bcea9c9f94d3ad54` (unchanged by Phase 16).
- Frontend `main`: `620f17c5f8b742fe4062e91fa33b9455d2b8a036`.
- Frontend Phase 16 merges: PR #20 (PWA), PR #21 (SEO/structured data), PR #22 (accessibility), PR #23 (performance).
- Each frontend temporary branch was pushed, checked, merged, deleted remotely, deleted locally, and pruned.

## 16A — PWA foundation and cache safety

- Frontend PR #20 merged as `3f962c22567918884f49fa1351c3e178dc42695b`.
- Manifest, install/update surface, offline fallback, and versioned service worker are present.
- Service-worker policy is network-only for non-GET requests and private/API/authenticated/payment/mutation prefixes; only same-origin public shell/static assets are eligible for cache storage.
- Focused PWA tests: 4 files, 15 passed; AppShell/App regression: 15 passed.
- Typecheck and production build passed.

## 16B — Public SEO and structured semantics

- Frontend PR #21 merged as `9d8ef894751bbd93cdd5b2b32b824bf739b1bba0`.
- Public routes receive intentional title, description, canonical, robots, Open Graph, and factual JSON-LD metadata.
- Query/private/admin/mutation routes are excluded or noindexed; `robots.txt` and `sitemap.xml` contain only approved public routes.
- Focused SEO tests: 3 files, 7 passed; route regressions: 6 files, 42 passed.
- Real-browser checks confirmed query-route `noindex,follow` with clean canonical and private-route `noindex,nofollow` without canonical/JSON-LD.

## 16C — Accessibility reconciliation

- Frontend PR #22 merged as `57a0b140219a015ed5966405f33335e8bceb2f49`.
- Removed nested page-level `<main>` landmarks so `AppShell` owns the single document main landmark; preserved existing classes, labels, roles, loading/error semantics, and section landmarks.
- Real-browser audit: one `main#main-content`, zero images missing `alt`, zero unlabeled icon-only buttons, zero console errors/warnings.
- Full frontend suite after the follow-on performance change remained green: 82 files, 339 tests.

## 16D — Performance budget and optimization

- Frontend PR #23 merged as `620f17c5f8b742fe4062e91fa33b9455d2b8a036`.
- Secondary routes now load through route-level `React.lazy` boundaries; the public home and not-found shell remain eager.
- Initial production bundle measurement:

| Asset | Baseline gzip | Phase 16D gzip | Budget |
| --- | ---: | ---: | ---: |
| Initial JavaScript | 226,460 bytes | 93,962 bytes | 200,000 bytes |
| Initial CSS | 50,850 bytes | 10,889 bytes | 55,000 bytes |

- `npm run performance:check` passed locally and is enforced after build in CI.
- Full frontend suite: 82 files, 339 passed; typecheck, build, audit (`0 vulnerabilities`) passed.
- PR and post-merge CI `quality` checks passed.

## 16E — Responsive and visual matrix

Controlled environment: Chrome connected browser, local production preview, viewport height 900 px, route `/`, with live accessibility-tree and screenshot inspection at the narrowest and widest samples.

| Width | Client/scroll width | Horizontal overflow | Main landmarks | Missing image alt | Console issues |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 320 | 305 / 305 | 0 | 1 | 0 | 0 |
| 375 | 360 / 360 | 0 | 1 | 0 | 0 |
| 390 | 375 / 375 | 0 | 1 | 0 | 0 |
| 412 | 397 / 397 | 0 | 1 | 0 | 0 |
| 768 | 753 / 753 | 0 | 1 | 0 | 0 |
| 1024 | 1009 / 1009 | 0 | 1 | 0 | 0 |
| 1440 | 1425 / 1425 | 0 | 1 | 0 | 0 |

The 320 px and 1440 px screenshots were inspected live: mobile navigation/hero/install surface remained readable, and desktop navigation/hero remained composed without clipping. No persistent binary screenshot artifact was written; the controlled dimensions and DOM/runtime measurements above are the durable evidence record.

## 16F — Production-like reconciliation

- Frontend local production build, performance budget, full tests, typecheck, browser runtime, and dependency audit passed.
- Backend `main` remained unchanged and passed lint/typecheck, 140/140 unit suites (801 tests), 17/17 e2e suites (73 tests), build, and `npm audit --audit-level=high` (`0 vulnerabilities`).
- Local preview verified the eager home route and lazy `/languages` route with correct titles/canonical/robots behavior, one main landmark, zero missing image alt, and zero console errors/warnings.
- No production deployment, restart, database write/migration, payment/provider action, secret mutation, DNS change, force push, or CI bypass was performed.
- Phase 17 was not started; it remains gated on Phase 16 final closeout and new authorization.

## Honest limitations

- Browser evidence used a local production preview over HTTP; no production deployment was performed.
- Screenshot samples were inspected live rather than committed as binary artifacts.
- Service-worker/cache safety was validated by focused source/tests and preview behavior; no production Cache Storage was mutated.
