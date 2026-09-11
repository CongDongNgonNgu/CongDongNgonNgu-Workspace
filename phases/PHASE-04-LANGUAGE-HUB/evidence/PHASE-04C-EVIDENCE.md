# Phase 04C Evidence — Truthful Preview and Gated Hub Entrypoints

**Scope:** LNG-04-004, LNG-04-005 and LNG-04-007.
**Status:** VERIFYING pending owner visual acceptance.
**Phase:** `PHASE_04=IN_PROGRESS`.

## Frontend implementation

- `LanguageResourcePreview` is a reusable, capability-driven surface for
  vocabulary, grammar, sentences, pronunciation and resources.
- Production use passes no resource records, so the default surface is an
  explicit empty state. Preview records are accepted only when their section is
  `AVAILABLE`, navigable and backed by a safe internal href.
- `LanguageFutureEntrypoints` exposes Community, Questions, Practice and
  Exchange as non-focusable disabled surfaces until the overview capability is
  `AVAILABLE`, navigable and has a safe internal href.
- Both surfaces are integrated into the existing reusable Hub page. No dead
  routes, fake production content, storage tables or Backend code were added.
- Frontend commits: resource preview `3de9134`; future entrypoints and final
  reconciliation regressions `2b7992a`.
- These are clean local commits; no remote publication or deployment was
  performed.

## Focused Stitch deltas

Stitch project: `projects/3718538619973058970`

- Resource desktop: `496ed8528f1842eaaaa3ffb3f68d2ec8`
- Resource mobile: `5a4c1a74a522439ea7b37c832d43c3b9`
- Future entrypoints desktop: `e3a1e25045bd43eeb585c8f05a2f5dcb`
- Future entrypoints mobile: `3e1b396dbbc54018b3430e2a93b6945a`

The resource desktop, future-entrypoint desktop and future-entrypoint mobile
PNG downloads are persisted beside this file. The resource mobile Stitch
download currently returns an HTML payload despite the confirmed screen ID and
`MOBILE` metadata, so no misleading PNG was retained for it.

## Deterministic verification

- Frontend focused Phase 04C suites: 3 files, 10 tests passed.
- Hub reconciliation suite: 11 tests passed, including all eight launch
  languages: Vietnamese, English, Chinese, Japanese, Korean, French, German
  and Spanish.
- Full frontend suite: 17 files, 83 tests passed.
- Frontend lint/typecheck, production build and `npm audit --audit-level=high`
  passed at the current implementation checkpoint.
- Tests cover capability truthfulness, safe-link gating, long/non-Latin labels,
  empty/error states, URL level/topic filters, canonical per-language hrefs,
  disabled future sections and absence of fabricated zero counts.
- CSS keeps the new grids at one column below the accepted tablet breakpoint and
  uses `min-width: 0` / `overflow-wrap:anywhere` for long labels. Required
  viewport behavior remains covered by the existing responsive contract and is
  pending owner visual acceptance for the new surfaces.

## Runtime and release boundary

- The previous shared-profile lock was isolated by launching a disposable
  Chrome profile with a unique user-data directory and a direct CDP session.
  No personal Chrome profile was reused and no unrelated browser process was
  terminated.
- Runtime browser verification completed against the local Frontend and
  Backend processes. No application code was changed.

## Phase 04C runtime verification

Runtime result: `RUNTIME_BROWSER=PASS`.

- `/languages` rendered all 8 launch-language links; all 8 canonical language
  routes rendered and refreshed successfully. `/languages/chinese` was used as
  the representative non-Latin route.
- The CEFR/topic interaction was verified through the UI. The final state was
  `?level=B2&topic=travel`, the `B2` control remained pressed, the topic value
  was `travel`, and the filter URL reflected both values.
- The resource surface rendered its truthful empty state with zero resource
  links. No resource fixture or fabricated count was present.
- Community, Questions, Practice and Exchange rendered as four disabled,
  not-ready surfaces with zero links. Clicking a disabled entrypoint did not
  change the URL. The Hub section navigation retained one Overview link and
  nine disabled future-section controls.
- Hub metrics remained `Chua kha dung` after Unicode normalization, with no
  zero-count placeholders. No known development-fixture strings were found.
- Twelve same-origin application routes were checked for HTTP failures:
  `DEAD_LINKS=0`.
- Smoke navigation and refresh passed for `/`, `/login`, `/register`,
  `/onboarding`, `/profile`, `/languages` and `/languages/english`. The
  protected `/onboarding` and `/profile` routes correctly resolved to the
  unauthenticated `/login` gate.

Responsive runtime matrix:

| Width | Result | Horizontal overflow | Resource empty | Future disabled |
| ---: | :--- | :--- | :--- | ---: |
| 320 | PASS | No | Yes | 4 |
| 375 | PASS | No | Yes | 4 |
| 390 | PASS | No | Yes | 4 |
| 412 | PASS | No | Yes | 4 |
| 768 | PASS | No | Yes | 4 |
| 1024 | PASS | No | Yes | 4 |
| 1440 | PASS | No | Yes | 4 |

Console and network boundary:

- `CONSOLE_ERRORS=0` application console errors, `0` uncaught exceptions and
  `0` failed loads.
- The browser recorded 34 expected network log entries for unauthenticated
  `POST /api/v1/auth/refresh` responses with status `403`; these are the
  existing auth-bootstrap baseline and were not caused by Phase 04C.

Visual evidence:

- `VISUAL_1440=PASS`: no material runtime mismatch was observed in the Hub,
  resource empty state or future-entrypoint surfaces against the accepted
  Stitch references. The runtime captures and side-by-side comparisons are
  persisted in this evidence directory.
- `VISUAL_390=PASS`: the mobile Hub shell and stacked disabled future cards
  remained within the viewport with no material mismatch observed.
- The focused mobile resource Stitch download remains unavailable as recorded
  above; no fabricated comparison image was created for it.
- Owner visual acceptance remains `PENDING`; task states remain
  `LNG-04-004=VERIFYING`, `LNG-04-005=VERIFYING`,
  `LNG-04-007=VERIFYING`, and `PHASE_04=IN_PROGRESS`.

Runtime artifacts include `runtime-phase04c-browser-report.json`,
`runtime-phase04c-filter-verification.json`, desktop/mobile Hub captures,
resource and future-entrypoint captures, the verified filter capture, and
Phase 04C side-by-side comparisons. The accepted Phase 04B evidence files
were not overwritten.
- Backend changed: `NO`.
- Phase 05 started: `NO`.
- Phase 08 storage/content started: `NO`.
- Fake production content: `NO`.
- Deployment: `NO`.
- Owner visual acceptance: `PENDING`.
