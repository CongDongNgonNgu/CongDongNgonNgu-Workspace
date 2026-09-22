# Phase 08B1 — Library Search & Filtering Implementation Plan

## Scope

Implement only `LNG-08-003`:

- public `GET /library/resources` search/filter contract;
- deterministic cursor pagination and fail-closed public eligibility;
- public `/library` Knowledge Explorer;
- public read-only `/library/:resourceId` detail destination;
- focused backend/frontend tests, responsive/accessibility evidence, and
  Workspace handoff/state updates.

Explicitly excluded: contribution, reviewer queue, Tatoeba/imports, Phase 06
candidate consumption, AI, reputation, moderation UI, deployment, and
applying migration 0010.

## Ordered slices

1. **Contract and source audit** — inspect the real 08A schema/repository,
   language catalog, public projection, route conventions, and pagination
   patterns; define the public result shape, language semantics, cursor
   payload, and index decision.
2. **Backend search** — add failing focused tests, implement bounded validated
   filters and fail-closed eligibility, then add HTTP E2E coverage. Create only
   `0010_library_search.sql` and its down migration if the source audit proves
   additional index support is required; do not apply it.
3. **Frontend contract/data layer** — add typed library API/domain modules and
   URL query-state behavior with focused tests.
4. **Frontend explorer/detail** — implement focused components/hooks/CSS
   Modules using the approved Stitch direction, with loading/error/empty,
   mixed-type previews, cursor load-more, detail/unavailable states, and the
   mobile filter drawer.
5. **Integrated verification** — run backend/frontend focused and full gates,
   browser responsive/a11y checks at 320/375/390/412/768/1024/1440, review the
   diff, record evidence, commit, push, verify remote SHAs/CI, and stop at
   `LNG_08_003=VERIFYING` pending owner visual acceptance.

## Acceptance checkpoints

- Backend unit and HTTP tests prove Unicode-safe Vietnamese/CJK matching,
  validation, stable cursor pagination, public privacy, and license fail-closed
  behavior.
- Frontend tests prove URL-backed filters, back/forward restoration, states,
  pagination, detail navigation, and drawer focus/Escape behavior.
- Browser evidence proves no horizontal overflow, readable results/detail,
  keyboard-complete drawer behavior, clean console, and visual alignment with
  the three Stitch references.

## Initial risks

| Risk | Mitigation |
| --- | --- |
| Existing schema cannot support the required query without an index | Inspect the real query shape/plan before choosing a minimal 0010 migration; keep 0001–0009 frozen. |
| Full-text assumptions fail for Vietnamese/CJK | Preserve Unicode content, use explicit normalization, and choose a strategy that does not depend on English-only tokenization. |
| Public projection leaks internal review/provenance fields | Reuse the existing fail-closed eligibility and explicit compact projection; assert forbidden keys in tests. |
| Dense filters become unusable on mobile | Use the Stitch drawer direction, semantic dialog behavior, focus return, and viewport checks. |

## Stitch references

```text
STITCH_PROJECT=projects/14639103242845084916
STITCH_DESIGN_SYSTEM=assets/14598ca45330472eba73ac1364754513
STITCH_DESKTOP=projects/14639103242845084916/screens/183877b18e1b47028efe449ae7ec7579
STITCH_MOBILE=projects/14639103242845084916/screens/48a22db58c51467494389ad90a0bd0b0
STITCH_DETAIL=projects/14639103242845084916/screens/8063c2063af042e48ff861149a150747
```

Rasterized references inspected locally:

- `PHASE-08B1-STITCH-DESKTOP.png`
- `PHASE-08B1-STITCH-MOBILE.png`
- `PHASE-08B1-STITCH-DETAIL.png`

The generated direction was accepted as an implementation reference for this
slice only; owner visual acceptance remains pending by policy.
