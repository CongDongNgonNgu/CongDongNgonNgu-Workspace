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

- Chrome DevTools MCP could not attach because its shared Chrome profile was
  already locked; the CUA browser helper also failed at the Windows sandbox
  ACL layer. No browser screenshot, Lighthouse score or runtime a11y pass is
  claimed for Phase 04C.
- Backend changed: `NO`.
- Phase 05 started: `NO`.
- Phase 08 storage/content started: `NO`.
- Fake production content: `NO`.
- Deployment: `NO`.
- Owner visual acceptance: `PENDING`.
