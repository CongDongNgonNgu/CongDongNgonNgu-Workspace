# Phase 28 Test Plan

## Automated
- Existing Community/Explore/navigation suites.
- New unit/component tests for capability matrix, action states, accordion behavior and route mapping.
- Search/filter API/query regression tests where contracts change.
- Localization/typecheck/lint/build.

## Native TEST browser matrix
Test VI and EN at 320, 375, 390, 412, 768, 1024 and 1440.

Cover:
1. Community landing/search/filter/apply/reset/no-result.
2. Every supported post type in feed and detail.
3. Authorized/unauthorized action states.
4. QUESTION primary answer flow.
5. CORRECTION_REQUEST original/proposal/explanation/replies.
6. DISCUSSION comment/one-level reply.
7. Save/helpful/share/share-to-partner/report where permitted.
8. Explore CTA navigation and Community→Language discovery.
9. Accordion keyboard/click behavior.
10. loading/error/empty/offline-safe states where reproducible.
11. direct URL, refresh, back/forward.

## Accessibility bounded checks
- visible focus;
- keyboard reachability;
- semantic buttons/links;
- `aria-expanded` for accordions;
- contrast of action states;
- no focus trap introduced.

## Fixture discipline
Use deterministic exact-owned TEST fixtures. Prefer natural user-facing copy. Record ownership and clean only owned data; unrelated TEST rows must remain untouched.
