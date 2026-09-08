# Phase 01 Runtime Verification

Date: 2026-09-08  
Status: DONE; remote SHAs and CI verified
Scope: CongDongNgonNgu Frontend local Vite runtime at http://127.0.0.1:5173/; no production deployment.

## Automated gates

- npm.cmd test -- --run: 6 test files, 19 tests passed.
- npm.cmd run lint: TypeScript noEmit passed.
- npm.cmd run build: TypeScript check and Vite production build passed.
- git diff --check: passed before the final frontend commit.
- npm.cmd audit --audit-level=high: found 0 vulnerabilities.
- Frontend CI run 34227951930 for origin/main SHA 47862c119e3af122c063332c1f4ee73beebea998 completed successfully; its CI workflow covers npm ci, lint, typecheck, unit tests, build, and high-severity npm audit. Workspace has no .github/workflows directory, so no Workspace CI run applies.

## Browser runtime matrix

Chrome DevTools checked the actual shell at every required width. scrollWidth equals the layout client width at each width, so horizontal overflow is false.

| Width | Client | Scroll | Header | Desktop header | Mobile header | Bottom nav | Dead # links | Gradients |
| ---: | ---: | ---: | ---: | :---: | :---: | ---: | ---: | ---: |
| 320 | 320 | 320 | 57px | hidden | visible | grid, 73px | 0 | 0 |
| 375 | 375 | 375 | 57px | hidden | visible | grid, 73px | 0 | 0 |
| 390 | 390 | 390 | 57px | hidden | visible | grid, 73px | 0 | 0 |
| 412 | 412 | 412 | 57px | hidden | visible | grid, 73px | 0 | 0 |
| 768 | 753 | 753 | 73px | visible | hidden | none | 0 | 0 |
| 1024 | 1009 | 1009 | 73px | visible | hidden | none | 0 | 0 |
| 1440 | 1425 | 1425 | 73px | visible | hidden | none | 0 | 0 |

Mobile header controls have 44px minimum hit areas. Bottom navigation items are 64px, 75px, 78px, or 82px wide depending on viewport and 60px high, with safe-area padding included in the 73px nav.

## Interaction checks

- Desktop Thêm opens an ARIA menu with future items disabled and labelled Sắp có; Escape closes it.
- Search opens a named search region with a compact pill form, announces its submitted status, closes on Escape, and restores focus to its trigger.
- Mobile Mở menu opens the Vietnamese Menu drawer, focuses Đóng menu, and Escape closes it while restoring focus to Mở menu.
- Only Trang chủ has an active route. Future destinations are disabled or plain gated content.
- Loading, empty, error/retry, and future-feature states are present in the shell.

## Lighthouse

- Mobile navigation audit at 390px: Accessibility 100, Best Practices 100, SEO 100, Agentic Browsing 100; 57 passed, 0 failed.
- Desktop navigation audit at 1440px: Accessibility 100, Best Practices 100, SEO 100, Agentic Browsing 100; 57 passed, 0 failed.

## Runtime hygiene

- Console contained only Vite connection debug messages and the standard React DevTools informational message; no errors or warnings.
- 28 observed network requests were local app, dependency, and brand-asset requests; no external font, CDN, API, or production requests.
- Inline desktop/mobile screenshot captures were completed. Persisting screenshot files was blocked by the browser tool workspace-root restriction; no screenshot file is claimed as committed evidence.
- The accepted Stitch references and design rationale are recorded in the Phase 01 HANDOFF. The implemented shell remains distinct from EduAI/Talkpal: open editorial composition, navy/orange/green/cyan semantic tokens, flat surfaces, and no gradient/admin dashboard treatment.
- Backend, EduAI repositories, and production deployment were not touched.

## Remote reconciliation boundary

Frontend origin/main is 47862c119e3af122c063332c1f4ee73beebea998. Workspace origin/main includes the earlier reconciliation commit 01a4a64ec3e35217357d668d176f91feef7def1a; both remote SHAs were verified after the authorized pushes. No production deployment was performed.

## LNG-01-014 Workspace evidence index

This top-level evidence directory is the durable Phase 01 verification index:
it collects the exact final Stitch captures, runtime captures, and comparison
sheets so reviewers can find the release evidence without opening the
phase-specific narrative first. The detailed interpretation remains in
phases/PHASE-01-BRAND-DESIGN-SYSTEM/evidence/REMEDIATION-VERIFICATION.md.

FINAL HOMEPAGE DESIGN SOURCE OF TRUTH
Desktop: fb7f5dbb2459493d970c7da39d44a73a
Mobile: eb2aa177b91541b19877a428f23ffc8c
Core/App Shell: ARCHITECTURE REFERENCE ONLY

The revised Home body is global and language-agnostic. The exchange concept
uses community roles rather than a Vietnamese-English pair, and the world
section speaks about the value of every language rather than a
Vietnamese-specific banner. The earlier Home references remain preserved as
historical/superseded records.

Final artifacts:

- LNG-01-014-STITCH-FINAL-DESKTOP-1440.png
- LNG-01-014-STITCH-FINAL-MOBILE-390.png
- LNG-01-014-STITCH-HTML-RENDER-MOBILE-390.png
- LNG-01-014-RUNTIME-DESKTOP-1440.png
- LNG-01-014-RUNTIME-MOBILE-390.png
- LNG-01-014-COMPARISON-DESKTOP-1440.png
- LNG-01-014-COMPARISON-MOBILE-390.png
- LNG-01-014-RUNTIME-REVISION-DESKTOP-1440.png
- LNG-01-014-RUNTIME-REVISION-MOBILE-390.png
- LNG-01-014-COMPARISON-REVISION-DESKTOP-1440.png
- LNG-01-014-COMPARISON-REVISION-MOBILE-390.png

Final revision verification:

- Required widths 320, 375, 390, 412, 768, 1024, and 1440 have matching
  client and scroll widths; no horizontal overflow, dead hash links, or
  gradients were observed.
- Mobile visible controls passed the 44px target check. Local images and
  bundled Vietnamese font faces completed successfully.
- Lighthouse at 390px mobile and 1440px desktop returned 100 for
  Accessibility, Best Practices, SEO, and Agentic Browsing, with 57 passed
  and 0 failed.
- Latest runtime checks document the bundled local Stitch hero asset, two pill
  CTAs, a full-width rounded 4:3 image, the original body copy, the supplied
  mobile logo mark plus “Cộng đồng ngôn ngữ”, the compact search form, and the
  left animated Vietnamese Menu drawer.
- Latest runtime matrix at 320/375/390/412/768/1024/1440 matched client and
  scroll widths; no overflow, dead hashes, or gradients were observed.
- The drawer computed at 320px wide on a 390px viewport; its opening transform
  started at -320px before the 280ms panel/scrim animation, and its live anchors
  are #languages, #community, and #how-it-works.
- Frontend commit 47862c119e3af122c063332c1f4ee73beebea998 is on origin/main;
  CI run 34227951930 passed every configured quality step.
- Workspace's earlier reconciliation commit 01a4a64ec3e35217357d668d176f91feef7def1a
  remains verified in origin/main; the final documentation reconciliation is
  pushed to origin/main after this update. Phase 01 acceptance is complete;
  Phase 02 remains blocked and was not started.
