# Phase 04B Evidence — Language Explorer and Reusable Language Hub

**Scope:** LNG-04-001, LNG-04-003 and LNG-04-006 frontend integration only.
**Status:** Owner visual acceptance recorded on 2026-09-11; the four canonical Stitch screens are accepted.

**Accepted local commits:** Frontend `f6a25e3`; Workspace `af35970`.
**Accepted Stitch screens:** Explorer desktop `16eed279b09344c88df139ccd06a030c`, Explorer mobile `09d3292facec40b2b5335a1c7b73b95d`, Hub desktop `f802e197c3324641bf883db02b78f7a3`, Hub mobile `755f76f3dac040f191c3d6c9e98ac304`.

## Design references

Stitch project: `projects/3718538619973058970`

Stitch design system: `assets/16442026920550574436`

Canonical generated screens:

- Explorer desktop 1440: `16eed279b09344c88df139ccd06a030c`
- Explorer mobile 390: `09d3292facec40b2b5335a1c7b73b95d`
- Hub desktop 1440: `f802e197c3324641bf883db02b78f7a3`
- Hub mobile 390: `755f76f3dac040f191c3d6c9e98ac304`

Persisted Stitch PNGs:

- `phases/PHASE-04-LANGUAGE-HUB/evidence/stitch-explorer-desktop-1440.png`
- `phases/PHASE-04-LANGUAGE-HUB/evidence/stitch-explorer-mobile-390.png`
- `phases/PHASE-04-LANGUAGE-HUB/evidence/stitch-hub-desktop-1440.png`
- `phases/PHASE-04-LANGUAGE-HUB/evidence/stitch-hub-mobile-390.png`

Persisted runtime rasters:

- `phases/PHASE-04-LANGUAGE-HUB/evidence/runtime-explorer-desktop-1440.png`
- `phases/PHASE-04-LANGUAGE-HUB/evidence/runtime-explorer-mobile-390.png`
- `phases/PHASE-04-LANGUAGE-HUB/evidence/runtime-hub-desktop-1440.png`
- `phases/PHASE-04-LANGUAGE-HUB/evidence/runtime-hub-mobile-390.png`

Persisted side-by-side comparisons:

- `phases/PHASE-04-LANGUAGE-HUB/evidence/comparison-explorer-desktop-1440-side-by-side.png`
- `phases/PHASE-04-LANGUAGE-HUB/evidence/comparison-explorer-mobile-390-side-by-side.png`
- `phases/PHASE-04-LANGUAGE-HUB/evidence/comparison-hub-desktop-1440-side-by-side.png`
- `phases/PHASE-04-LANGUAGE-HUB/evidence/comparison-hub-mobile-390-side-by-side.png`

## Implemented frontend behavior

- `/languages` is a data-driven Explorer backed by `GET /api/v1/languages`; search is submitted to the backend and supports the existing Unicode/English/native/CJK/Korean contract.
- `/languages/:slug` is one reusable Hub component for every catalog language; no per-language page tree or hardcoded route list was added.
- Hub identity, section availability, SEO metadata, metrics and filter options come from the backend contract.
- `Overview` is the only navigable section. Future sections are visible disabled controls with a coming-soon label and no dead href.
- `NOT_AVAILABLE_YET` metrics render as `Chưa khả dụng`; zero values are never fabricated.
- `level` and `topic` filters are normalized into shareable URL query state. Level toggles use browser history; direct refresh and back/forward restore the filter state.
- Loading, API error, unknown/inactive/malformed slug, zero-result search and empty overview states are explicit.
- Existing AppShell header/footer/tokens/icons and CSS Modules were preserved. No nested `<main>` landmarks were introduced.

## Real backend/runtime checks

The unchanged backend was run in its supported `NODE_ENV=test` and `AUTH_PERSISTENCE=memory` mode to expose the seeded catalog without changing backend code or database data.

- `GET /api/v1/languages` returned HTTP 200 with 8 launch languages.
- `GET /api/v1/languages?search=%E6%97%A5%E6%9C%AC%E8%AA%9E` returned HTTP 200 with the Japanese result.
- `GET /api/v1/languages/english` returned HTTP 200.
- `GET /api/v1/languages/english/overview?level=B2&topic=travel` returned HTTP 200.
- Selecting A1 produced `GET /api/v1/languages/english/overview?level=A1%2CB2&topic=travel`; browser back restored B2 and forward restored A1,B2.
- `/languages/not-a-language` received the backend 404 contract and rendered the recovery state linking back to `/languages`.
- No backend files or data were changed.

## Responsive and visual verification

Exact runtime viewport checks passed without page-level horizontal overflow:

| Viewport | Result |
| --- | --- |
| 320 | PASS |
| 375 | PASS |
| 390 | PASS |
| 412 | PASS |
| 768 | PASS |
| 1024 | PASS |
| 1440 | PASS |

The Hub section navigation remains horizontally contained and intentionally scrollable on narrow screens; it does not widen the document viewport. Exact 1440 desktop and 390 mobile runtime renders were inspected against the canonical Stitch screens. The implementation preserves the existing project light footer and global shell, uses compact backend-driven language rows/cards instead of giant course cards, keeps future Hub sections visibly disabled, and stacks the Hub side rail on mobile.

Runtime screenshots were inspected inline through Chrome DevTools and the exact 1440/390 captures plus labeled Stitch-vs-runtime comparisons are persisted above.

## Automated verification

- Frontend unit/component suite: 15 files, 67 tests passed.
- Typecheck: passed.
- Lint: passed.
- Production build: passed.
- `npm audit --audit-level=high`: 0 vulnerabilities.
- Lighthouse/Chrome snapshot audit at the final renders: Explorer desktop, Explorer mobile, Hub desktop and Hub mobile each scored 100/100/100/100 with 0 failed audits. A separate Explorer desktop navigation audit scored Best Practices 96 only because the existing unauthenticated AuthProvider refresh logs a 403; the page-specific snapshot audit is clean.
- Browser console had no page-specific runtime errors. The only observed error was the existing unauthenticated `POST /api/v1/auth/refresh` 403 from the global AuthProvider bootstrap.

## Phase boundary

- LNG-04-001: DONE
- LNG-04-002: DONE
- LNG-04-003: DONE
- LNG-04-004: PLANNED
- LNG-04-005: PLANNED
- LNG-04-006: DONE
- LNG-04-007: PLANNED
- `PHASE_04=IN_PROGRESS`
- Phase 04C/05 was not started.
- Owner visual acceptance was recorded; deployment was not performed. The accepted commits are authorized for normal fast-forward publication. Phase 04C/05 was not started.
