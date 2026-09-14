# Phase 05C mobile detail comparison

Canonical Stitch screen: `5c3d5fbc3ac646a183425122e9ae57f5`<br>
Viewport: 390<br>
Runtime data: `NEON_TEST_ONLY` against the authorized Neon TEST database

| Canonical Stitch | Populated runtime |
| --- | --- |
| ![Canonical mobile detail](./DETAIL_STITCH_MOBILE.png) | ![Runtime mobile detail](./DETAIL_RUNTIME_MOBILE.png) |

## Concrete review

- Runtime remains readable at 390px and at the wider/narrower matrix widths; no horizontal overflow was observed.
- The runtime global mobile header and bottom navigation remain in place. Stitch specifies a detail-specific back/title/save/share header.
- Stitch presents more compact metadata pills, individually grouped thread cards, an explicit deleted-parent explanatory block, and a visible depth-1 reply relationship. Runtime preserves the data and indentation but uses the existing detail component’s simpler row treatment.
- Runtime owner Edit/Delete controls are visible for USER_A, and the authenticated comment composer is usable. Their placement differs from the canonical mobile detail chrome.
- The full-page runtime capture shows the fixed global navigation in its normal viewport position; during an interactive scroll the action row and composer remain reachable.

Decision: `VISUAL_DETAIL_390=REVIEW`; no frontend fidelity change was made during this evidence pass.

## Final remediation review

Date: 2026-09-14<br>
Frontend remediation: `d674578ae2c3f139b625200fe95d0f6c46bf0f14`<br>
Viewport: 390<br>
Runtime data: `NEON_TEST_ONLY` against the authorized Neon TEST database

| Canonical Stitch | Final populated runtime |
| --- | --- |
| ![Canonical mobile detail](./DETAIL_STITCH_MOBILE.png) | ![Final runtime mobile detail](./DETAIL_RUNTIME_MOBILE_FINAL.jpeg) |

Concrete before → after findings:

- Mobile shell: the global header and bottom action bar are hidden only on the detail route at mobile widths; the route now starts with the canonical 56px back/title/save/share app bar.
- Readability: metadata wraps within the post surface, long Vietnamese and CJK content remain readable, and action controls remain reachable.
- Discussion: the comments surface, composer, individual thread cards, deleted-parent placeholder, and one-level reply indentation remain usable at 390px.
- Rail transition: mobile keeps the canonical principles card while hiding desktop-only context cards; no unsupported learning facts are fabricated.
- Interaction safety: menus and dialogs remain keyboard reachable, modal focus is contained, and closing returns focus to the initiating or surviving logical context.

Decision: `VISUAL_DETAIL_390=PASS`.<br>
`MATERIAL_DIFFERENCES=NONE` for the locked structural comparison. Dynamic names, timestamps, counts, and test content remain intentionally runtime-specific.
