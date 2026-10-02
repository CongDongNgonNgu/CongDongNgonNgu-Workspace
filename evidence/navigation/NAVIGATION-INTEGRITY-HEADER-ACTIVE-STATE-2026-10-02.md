# Navigation Integrity and Header Active State Audit

Date: 2026-10-02

Status: `DONE`

## Scope

Independent frontend audit for `CongDongNgonNgu-Front-End-Web`, based on the
post-Phase-14 remote-main baseline. Phase 14 files and status were not changed.

- Frontend baseline: `24c47e0adfb2fe831e666348cde431e21747cf18`
- Frontend final merge: `a337ad394e293ec7f2f2105da273a42a6acb3eba`
- Frontend PR: [#18](https://github.com/CongDongNgonNgu/CongDongNgonNgu-Front-End-Web/pull/18)
- Workspace evidence baseline: `6ca10362c1fb2d2cd6477bdb407f4c14c7f64b2f`

## Routes audited

The application route table contained 36 declarations, including concrete
public/authenticated routes, the `/ai` redirect, and the wildcard fallback.
The navigation matrix covered:

| UI source | Expected route | Desktop/mobile result |
| --- | --- | --- |
| Logo, Trang chủ | `/` | Same route; active state is exact-root only |
| Khám phá | `/` | Same destination on both menus |
| Tìm bạn học | `/exchange` | Same destination on both menus |
| Thêm → Ngôn ngữ | `/languages` | Reaches implemented language page |
| Thêm → Cộng đồng | `/community` | Reaches implemented community page |
| Thêm → Membership | `/membership` | Reaches implemented membership page |
| Thêm → Cách bắt đầu | `/#how-it-works` | Reaches implemented homepage section |
| Search | Header search panel | Opens the existing search panel; not a route |
| Đăng nhập / Đăng ký | `/login`, `/register` | Cross-links remain client-side |
| Homepage CTAs / footer | Existing route or section target | Uses router links; unavailable policy items are non-links |
| Community post/detail/share | `/community/posts/:postId` | Uses client-side router links |

Direct loading, refresh, route changes, Back, and Forward were checked for
the representative public navigation flow Home → Community → Language → Home.

## Defects found and fixed

Twelve grouped navigation defects were confirmed and fixed:

1. `Ngôn ngữ` used a hash instead of `/languages`.
2. `Cách bắt đầu` used a route-relative hash from non-home pages.
3. Desktop `Thêm` had no outside-click dismissal.
4. Desktop `Thêm` lacked robust route-change cleanup.
5. Mobile drawer Home was hard-coded active.
6. Mobile quick Home was always active.
7. Active state was based on stale/exact-only logic and risked root-prefix matches.
8. `Thêm` child destinations had no shared route-aware active state.
9. Homepage internal CTAs bypassed the router.
10. Footer internal destinations used inconsistent/raw links.
11. Community post/detail internal links caused raw navigation/reloads.
12. Unimplemented footer/auth policy targets were dead placeholder links.

The fix centralizes public navigation metadata and route matching for desktop
and mobile, adds accessible dropdown dismissal (toggle, outside pointer,
Escape, selection, and route change), and preserves unavailable destinations as
explicitly disabled rather than silently redirecting them.

## Verification

- Desktop dropdown: open, toggle-close, outside-click close, Escape close with
  trigger focus restored, selection close, and route-change close all passed.
- Mobile active state: `/`, `/community`, `/languages`, and `/#how-it-works`
  matched the current item; drawer closed after navigation and stayed correct
  through Back/Forward.
- Responsive widths checked: 320, 375, 390, 412, 768, 1024, 1440; no
  horizontal overflow was observed.
- Frontend tests: 73 files / 311 tests passed.
- Typecheck, lint, build, and `npm audit --audit-level=high` passed; audit
  reported 0 vulnerabilities.
- GitHub Actions quality run `36962143546` (job `110697928436`) passed all
  required steps.
- Vercel preview for the merged change was Ready.
- Browser runtime navigation passed. Local auth API endpoints returned 500
  because the backend was not running; this was an environment limitation and
  did not prevent route/header verification.
- Final frontend remote-main verification: `a337ad394e293ec7f2f2105da273a42a6acb3eba`
  contains the task head and PR #18 is merged/closed.

## Branch hygiene

Frontend and Workspace work were performed in dedicated worktrees. The
temporary frontend branch is safe to delete after remote-main verification.
Workspace evidence is being merged independently; no Phase-14 status or file
was modified.
