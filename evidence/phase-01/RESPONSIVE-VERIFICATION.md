# Phase 01 Runtime Verification

Date: 2026-09-08  
Status: VERIFYING pending authorized remote reconciliation  
Scope: CongDongNgonNgu Frontend local Vite runtime at http://127.0.0.1:5173/; no production deployment.

## Automated gates

- npm.cmd test -- --run: 4 test files, 17 tests passed.
- npm.cmd run lint: TypeScript noEmit passed.
- npm.cmd run build: TypeScript check and Vite production build passed.
- git diff --check: passed before the final frontend follow-up commit.
- npm.cmd audit --audit-level=high: found 0 vulnerabilities.
- Frontend CI run 34181754074 for origin/main SHA ea0fc67136039a3739fc0b4d662575187d8507d9 completed successfully; its CI workflow covers npm ci, lint, typecheck, unit tests, build, and high-severity npm audit. Workspace has no .github/workflows directory, so no Workspace CI run applies.

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
- Search opens a named search region, submits an announced Sắp có status, closes on Escape, and restores focus to its trigger.
- Mobile Mở menu opens a modal drawer, focuses Đóng menu, and Escape closes it while restoring focus to Mở menu.
- Only Trang chủ has an active route. Future destinations are disabled or plain gated content.
- Loading, empty, error/retry, and future-feature states are present in the shell.

## Lighthouse

- Mobile navigation audit at 412px: Accessibility 100, Best Practices 100, SEO 100, Agentic Browsing 100; 57 passed, 0 failed.
- Desktop navigation audit at 1440px: Accessibility 100, Best Practices 100, SEO 100, Agentic Browsing 100; 57 passed, 0 failed.

## Runtime hygiene

- Console contained only Vite connection debug messages and the standard React DevTools informational message; no errors or warnings.
- 28 observed network requests were local app, dependency, and brand-asset requests; no external font, CDN, API, or production requests.
- Inline desktop/mobile screenshot captures were completed. Persisting screenshot files was blocked by the browser tool workspace-root restriction; no screenshot file is claimed as committed evidence.
- The accepted Stitch references and design rationale are recorded in the Phase 01 HANDOFF. The implemented shell remains distinct from EduAI/Talkpal: open editorial composition, navy/orange/green/cyan semantic tokens, flat surfaces, and no gradient/admin dashboard treatment.
- Backend, EduAI repositories, and production deployment were not touched.

## Remote reconciliation boundary

Frontend local final branch is phase-01-shell at a94a338. Authorized frontend origin/main remains ea0fc67. Workspace local reconciliation history includes 0abbc2b and subsequent metadata-only commits; authorized Workspace origin/main remains 864e3e0. The environment safety reviewer rejected the frontend follow-up outbound push and no further remote push retry was issued.
