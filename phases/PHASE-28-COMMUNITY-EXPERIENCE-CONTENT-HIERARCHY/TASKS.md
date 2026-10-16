# Phase 28 Tasks

## LNG-28-001 — Audit, capability freeze & Stitch target
- Audit deployed TEST Community/Explore/detail routes in VI/EN.
- Inventory every supported post type and current action visibility.
- Freeze action capability matrix and primary-response semantics.
- Audit CTA destinations, accordion/icon usage, mobile/footer whitespace and synthetic fixture presentation.
- Use Stitch MCP for desktop/mobile target layouts before substantial UI coding.

## LNG-28-002 — Community discovery and routing
- Redesign search/filter layout with coherent sizing, hierarchy and mobile stacking.
- Preserve server-backed query semantics and URL/query state where currently supported.
- Add clear applied/reset behavior and useful no-result/empty states.
- Fix Explore-page CTA routing.
- Add a visually clear Community→Language catalogue discovery entry point with relevant explanatory copy.

## LNG-28-003 — Feed cards, actions and detail hierarchy
- Apply the frozen action capability matrix across post cards/details.
- Make action controls visually legible with default/hover/focus/active/disabled states.
- Replace dominant generic detail title with compact post-type treatment; prioritize actual content.
- Reduce metadata/sidebar density without hiding necessary learning context.

## LNG-28-004 — Structured Community UX cleanup
- Redesign `CORRECTION_REQUEST` around original→proposal→explanation→contextual reply.
- Verify QUESTION and DISCUSSION remain clear and do not reintroduce competing generic composers.
- Decide from evidence whether correction general discussion stays as secondary/collapsible or is removed from the primary flow.
- Replace literal arrows with canonical chevrons/accordion components.
- Use realistic exact-owned TEST fixtures and clean them after acceptance.

## LNG-28-005 — Integration, review & runtime acceptance
- Run full affected automated gates.
- Validate VI/EN, auth/unauth where applicable, direct URL/back-forward and error/loading/empty states.
- Validate widths 320/375/390/412/768/1024/1440 with no unexpected horizontal overflow.
- Run bounded accessibility/keyboard checks and independent review.
- Remediate ordinary defects, merge, verify exact main/deployment, update Workspace evidence and clean merged branches.

## Stop rule

Close Phase28 fully before Phase29 implementation starts.
