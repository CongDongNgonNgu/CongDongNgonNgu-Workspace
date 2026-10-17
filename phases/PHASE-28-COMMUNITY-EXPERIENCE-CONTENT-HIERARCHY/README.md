# Phase 28 — Community Experience & Content Hierarchy

**Status:** DONE / GO_COMMUNITY_UX

## Objective

Refine the Phase27 Community foundation into a clear, lively social-learning experience without weakening its structured post-type semantics, server-backed search, privacy boundaries or language-learning identity.

## Owner-observed problems

- Community search/filter controls have inconsistent sizing and feel like an admin form.
- Post cards expose actions inconsistently without explaining capability semantics.
- Detail pages over-emphasize the generic `Bài viết cộng đồng` heading instead of user content.
- Helpful/comment/save/share controls are visually weak.
- `Nhờ sửa câu` details are confusing: original content, correction proposal, replies and generic discussion compete with each other; synthetic UAT copy can leak into normal-looking UI.
- Some accordions use an unattractive literal arrow/`v` affordance.
- Explore-page CTAs and Community→Language discovery are not consistently routed or visually prominent.
- Sidebar cards, footer/mobile spacing and empty states can be overly text-heavy or create dead visual zones.

## Product direction

Community should feel closer to a modern social product in interaction energy, but remain recognizably CongDongNgonNgu: navy/orange identity, language/proficiency/topic context, learning-help semantics, provenance/safety rules and one clear primary response model per post type.

### Discovery

Keyword search is primary. Language/high-value filters are secondary. Advanced filters may use chips, compact panels or progressive disclosure. Controls must share a coherent rhythm on desktop and stack cleanly on mobile.

### Action capability matrix

Before changing buttons, freeze an explicit matrix by post type and authorization state for `Hữu ích`, comment/reply, save, share, share-with-study-partner and report. Missing actions must be semantic, not accidental.

### Detail hierarchy

Post type becomes a compact badge/eyebrow. Actual user content is primary. Author and language/proficiency/topic metadata remain useful but secondary. Social actions must have clear default/hover/focus/active states and accessible contrast.

### Correction requests

Primary mental model:

`Original text → correction proposals → corrected text + optional explanation → contextual replies/helpful/accepted state`.

A separate general discussion surface may remain only if it adds unique value; if retained it must be secondary and clearly labeled.

## Dependencies/invariants

- Phase27 is DONE and authoritative for structured Community semantics.
- Preserve Phase22 private-group boundaries, Phase23 provenance/public-resource rules, Phase24 localization and Phase26 communication authorization.
- Search remains backend-backed; no privacy-safe query may regress to client-only filtering.
- No fake engagement counts or fake UAT content as accepted product evidence.
- Current Render/Vercel surfaces are TEST/validation.

## Exit verdict

`GO_COMMUNITY_UX` / `REMEDIATE_AND_RETEST` / `REJECT`

## Accepted closeout

LNG-28-001 through005 complete; see [EVIDENCE-005.md](EVIDENCE-005.md), [NATIVE-005.json](NATIVE-005.json), [FIXTURE-CLEANUP-005.json](FIXTURE-CLEANUP-005.json) and [LIFECYCLE-005.md](LIFECYCLE-005.md). Final source FE b159717 / BE b3be9e2; synthetic-only bounded acceptance. NEXT_READY_PHASE=29; STOP. No Phase29 implementation.
