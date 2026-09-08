# Phase 01 Handoff

**Phase status:** VERIFYING

## Resolved external blocker

Stitch authentication was restored on 2026-09-08. The original BLOCKED_EXTERNAL entry remains in state/BLOCKERS.md as historical evidence. Phase 01 implementation and verification are complete locally; final remote reconciliation is VERIFYING because the environment safety reviewer rejected the follow-up push. Phase 00 remains accepted and unchanged; Phase 02 and all later dependency states remain unchanged.

## Design evidence
- Stitch project: `projects/3718538619973058970` (`CongDongNgonNgu.vn - Phase 01 Global Shell`, private).
- Shared design system: `assets/16442026920550574436`, `Global Language Community`, version 2 after `create_design_system` and `update_design_system`; palette, Be Vietnam Pro direction, 4px spacing, 1200px container, 1024/768 breakpoints, state and WCAG intent recorded in the asset.
- Desktop Header: initial session `11604657876481858328`; refined session `6309401753494504160`; accepted screen IDs `cdb336d91b3b4bd5816448093107b24b` (logged-in 1440), `96ceae90e4e745df818ecff334c26f8b` (logged-out 1440), and `3defe8206f0142fb93b95d49101b04ae` (compact 1024). Critical review removed an initial `href="#"`/blank-preview result, kept only the home route active, and moved unavailable destinations into `Thêm`/`Sắp có` treatment.
- Mobile Header: session `2458659214881880956`; completed 320px default, 375px search, 390px drawer, and 412px logged-in variants with 56px height, safe-area intent, 44px targets, focus/close states, and gated future destinations. Representative screen IDs: `1bcb9e81edaf46a8bb73375a6b760a98`, `d836eb575db74ac490d0c87ea5587ff5`, `1f3d2f79a782469083a60c7d2d9fe994`, `621a776cd91e4047b1a87abe60b1bc17`.
- Mobile Bottom Navigation: session `15624688561212941317`; generated 320/375/390/412 variants with exactly Trang chủ, Cộng đồng, Luyện tập, AI, Cá nhân; accepted treatment keeps Trang chủ active and future destinations disabled with `Sắp có`, 44px targets, readable labels, and safe-area padding. Representative screen IDs: `8644841b1cc14c2a9216d15ee89bf2c4`, `0f0bd11fbb4646108545e5ed4f043b85`, `76f0ff883cc0457db8eb40fa57a903eb`.
- Footer: initial session `16345313296061848882`, refined session `15911564864648445369`; accepted desktop 1440, compact 1024, and mobile 390 compositions. Representative initial IDs `e36de0b7b348469c9b12b0622fb33acf`, `0e99038fc40843ec8dd4739d7eb14bde`, `e4077424bed7456f88361eccdf4d085c`; refined IDs `c43fa4d592dd49c48f4aca2666f484ce`, `87191f41cb3e4e4e8130009e28a24586`. Review removed footer `href="#"` links, converted unavailable rows to `Sắp có`, and kept a real labelled Tiếng Việt select.
- Core Shell: initial session `6330227572649504423`, refined session `15942700099850406498`; accepted desktop and mobile references `6e7a721e20cd4212850e51ced41c4efa` and `4dfd003532ac4e1890beec76050bead5`. Review removed generated future-route paths and skeleton gradients, preserved skip-link/landmarks, feedback states, responsive content width, and mobile safe-area padding.
- Stitch review method: generated HTML and metadata were inspected as design references. Raster screenshot inspection was unavailable in this Windows session because the local image viewer sandbox helper returned `apply deny-read ACLs`; generated rationale plus HTML structure were used for refinement, and the implemented frontend is separately verified with tests/build/browser checks below.
Implementation paths and verification are recorded below.

## Implementation evidence
- LNG-01-001 / DONE: semantic token architecture and logo audit implemented in `src/styles/tokens.css`, `src/styles/global.css`, and documented in `docs/03-DESIGN-SYSTEM.md`.
- LNG-01-002 / DONE: responsive desktop/mobile header, gated navigation, overflow menu, search panel, drawer, focus restoration, and logged-out/logged-in shell variants implemented in `src/components/layout/Header*.tsx` and `src/components/navigation/navigation.ts`.
- LNG-01-003 / DONE: responsive footer with mission, grouped sections, gated future rows, labelled locale select, and mobile disclosure rows implemented in `src/components/layout/Footer.tsx`.
- LNG-01-004 / DONE: fixed mobile navigation with five required labels, only `/` active, disabled future items, readable status text, and safe-area padding implemented in `src/components/layout/MobileBottomNav.tsx`.
- LNG-01-005 / DONE: project-native Button, form controls, combobox, checkbox/radio/switch, tabs, dialog, drawer, dropdown, tooltip, toast, avatar, badge, chip, language indicator, card/list row, skeleton, empty/error, pagination, and search primitives implemented in `src/components/ui/`.
- LNG-01-006 / DONE: `AppShell` composes landmarks, skip link, main content, footer, and mobile navigation; Home foundation includes open editorial content plus loading, empty, error/retry, and future-feature states.
- LNG-01-007 / VERIFYING: responsive browser, keyboard, accessibility, runtime, and visual-direction reconciliation passed locally; reproducible evidence is in evidence/phase-01/RESPONSIVE-VERIFICATION.md. Remote follow-up push remains blocked by the environment safety reviewer.
- Frontend implementation commit ea0fc67 (feat(shell): add Phase 01 global shell) is on authorized origin/main. Verified local follow-up commits are 5b4ce9e (fix(shell): refine header and state tokens) and a94a338 (fix(shell): close menus accessibly) on local branch phase-01-shell; the environment safety reviewer rejected their outbound push, so origin/main remains ea0fc67.
- Current automated verification: npm.cmd test -- --run passes 4 files / 17 tests; npm.cmd run lint and the build TypeScript check pass; npm.cmd run build passes. Frontend CI run 34181754074 for origin/main SHA ea0fc67136039a3739fc0b4d662575187d8507d9 completed successfully; Workspace has no CI workflow. Browser and Lighthouse evidence is recorded in evidence/phase-01/RESPONSIVE-VERIFICATION.md.

### Responsive and accessibility evidence

- CSS targets 320, 375, 390, 412, 768, 1024, and 1440px through mobile gutters, a 768px mobile boundary, 1024px navigation collapse, and a 1200px content cap.
- Runtime assertions cover landmarks, `/`-only active links, drawer open/close and focus restoration, search submission status, overflow menu, authenticated account variant, primitive loading/error/form/dialog semantics, and the not-found boundary.
- Browser screenshot/console/network/a11y verification for LNG-01-007 passed locally; no production deployment was performed. Screenshot-file persistence was blocked by the browser tool workspace-root restriction and is explicitly recorded in the evidence file.


## Known design debt
- Supplied logo assets do not include owner-approved horizontal, monochrome, or dark-surface variants; Phase 01 uses the supplied mark with typed wordmark on light surfaces.
- Authentication, notifications, search results, and all future feature destinations remain intentionally gated until their dependency phases.
- Stitch raster screenshot inspection was unavailable in the Windows session; generated HTML/metadata and local browser/runtime evidence are used instead.

## Completion transition
When Acceptance passes, mark Phase 01 DONE and Phase 02 READY in `state/PROJECT-STATE.md`.

## Final verification record

- Required viewport runtime matrix, horizontal-overflow checks, no-dead-link scan, no-gradient scan, mobile target sizing, keyboard interactions, focus restoration, Lighthouse results, console, network, and screenshot-capture classification are recorded in evidence/phase-01/RESPONSIVE-VERIFICATION.md.
- Final local frontend verification head is a94a338 on phase-01-shell; authorized frontend origin/main is ea0fc67. Workspace local reconciliation history includes 0abbc2b and subsequent metadata-only commits; authorized Workspace origin/main is 864e3e0. The final pushes remain pending because the environment safety reviewer rejected the frontend outbound push.
- Workspace state remains CURRENT_PHASE=01, PHASE_00=DONE, PHASE_01=VERIFYING, and PHASE_02=BLOCKED_BY_PHASE_01. Phase 02 was not started.
