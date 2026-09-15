# Phase 05C — Post Detail and Comment Threads

Date: 2026-09-14
Status: implementation slice complete; owner acceptance and live-backend verification remain open

Frontend commit: 39af852
Frontend contract commit: fc631fc
Backend baseline (unchanged): 85066b6c9e75a7f8a4339d2cc8415a7c627c749

## Scope

This slice adds the canonical frontend route /community/posts/:postId and a
desktop/mobile post-detail surface with:

- public post and comment reads with independent loading, empty, retry, error,
  unavailable, and moderated-placeholder states;
- one-level comment replies, explicit pagination, deleted-parent placeholders,
  and plain-text rendering;
- authenticated comment create/edit/delete/report flows;
- owner-only post edit/delete controls with delete confirmation;
- Helpful, Save, Share, and Report actions on the detail surface;
- feed-card links to the canonical detail path.

The backend repository was read-only throughout this slice.

## Design references

- Stitch project: 3718538619973058970
- Design system: assets/16442026920550574436
- Desktop screen: 51fd56d9452c48d198f814f89c6baa36
- Mobile screen: 5c3d5fbc3ac646a183425122e9ae57f5

The implementation follows the existing frontend tokens and component
architecture; no new title field or rich-text/HTML renderer was introduced.

## Contract notes

Frontend calls use the existing CommunityApi methods:

- getPost and listComments use public reads when unauthenticated and the
  protected transport when authenticated;
- comment pages clamp to the backend limit of 20 and use an explicit
  Xem thêm bình luận action;
- comment content is validated by Unicode code points at 5,000 characters;
- comment reports submit the existing category/details shape to the shared
  report endpoint;
- post and comment content render as React text nodes only.

## Verification evidence

- Focused detail suite: 10 tests passed.
- Full frontend suite: 26 files / 122 tests passed.
- npm run typecheck: passed.
- npm run build: passed.
- Canonical route runtime: loaded in Chrome at
  http://127.0.0.1:5173/community/posts/post-1.
- Responsive runtime snapshot: verified at 390px; the unavailable state remains
  readable and keyboard-visible.
- Desktop runtime route: verified at 1440px before the backend call returned its
  expected unavailable/error state.
- Runtime network errors were limited to the intentionally stopped backend
  proxy; no frontend app exception was observed.

Live post, comment, owner-mutation, XSS, and visual acceptance against backend
fixtures still require the backend/runtime environment and owner review.

## Release boundaries

- BACKEND_CHANGED=NO
- PUSHED=NO
- DEPLOYED=NO
- PHASE_05D_STARTED=NO
- PHASE_06_STARTED=NO

## Runtime and owner review evidence

Date: 2026-09-14
Review status: runtime behavior verified; visual and accessibility owner review remain REVIEW.

### Exact runtime baseline

- Frontend: `39af852b637acadc4624846478f453460e90ccdf` (`phase-05c-post-detail`), clean before review and unchanged during review.
- Workspace evidence baseline: `f116f0d42bbba141482842c896e477f4f2830440` (`main`).
- Backend: `85066b6c9e75a7f8a4339d2cc8415a7c627c7494` (`main`), source read-only and clean.
- Database: authorized Neon TEST database only. A read-only query found `0001_identity.sql`, `0002_language_profile.sql`, and `0003_community.sql` already recorded in `schema_migrations`; the migration runner was not invoked and no migration files were changed.
- Real runtime origin: backend `localhost:3000`, frontend `http://localhost:5173`.
- `/health` returns 404 because this backend exposes the namespaced route; `/api/v1/health` returns 200. `/api/v1/languages` and `/api/v1/community/posts` both return 200. No Community 500 occurred.

### Test identities and review data

Two disposable identities were registered, email-verified through the configured local test mail sink, and logged in through the normal auth flow. No production credentials, bypassed guards, source tokens, or passwords are recorded here.

- USER_A / post owner: `a31742c2-88a5-418e-ac65-2c829e9eb53e`
- USER_B / commenter: `8446ac93-e64b-4638-aa09-4f6495fc2b6c`
- Canonical review post: `df20c0bb-0ac4-4231-9deb-e4d19613b218`
- Disposable UI-delete post: `73601df6-ae14-4ecd-b82b-39fad9225070` (deleted through the owner UI after confirmation)
- Deleted parent with retained reply: `044e12fd-be53-4474-b85f-d27cabf6072b` / reply `ea09bb2e-2426-424a-95e4-22e6c00f05b8`
- Disposable comment deleted through USER_B UI: `f163f39e-4c94-4f0a-8b2a-90018bdeaa9c`
- Long Vietnamese comment: `9a2751a5-ebc5-43fb-995e-e689df2f5c06`

The canonical post is public, authored by USER_A, Japanese, DISCUSSION, CEFR B1, topic `neon-test-only`, multiline, and contains Vietnamese/CJK text plus literal XSS probes. All data above is `NEON_TEST_ONLY`.

### API contract results

| Contract | Result |
| --- | --- |
| Post detail and comments read | 200 / 200 |
| Create top-level comment and depth-1 reply | 201 / 201 |
| Depth-2 reply attempt | 400, `COMMUNITY_COMMENT_DEPTH_EXCEEDED`; no depth-2 UI path exposed |
| Own comment edit | 200 |
| Unauthorized comment edit/delete | 403, `COMMUNITY_FORBIDDEN` |
| Delete parent with visible reply | 200; detail returns deleted placeholder (`author=null`, `content=null`, `isDeleted=true`) and visible reply |
| Helpful add/remove | 201 / 200; final runtime state visible |
| Save add/remove | 201 / 200; final runtime state visible |
| Share | 200; canonical path `/community/posts/df20c0bb-0ac4-4231-9deb-e4d19613b218` |
| Post and comment reports | 201 / 201; UI exposes generic submission only |
| Own post edit | 200; UI edit retained input and displayed the saved marker |
| Unauthorized post edit/delete | 403 / 403 |
| Disposable post owner delete | 200 through the confirmed UI flow |

### Browser owner/non-owner review

- Direct navigation and browser refresh of the canonical detail route work at the CORS-allowed `localhost` origin.
- Unauthenticated public detail/comments reads also worked; the expected unauthenticated refresh denial was not treated as an application error.
- USER_A sees post edit/delete, current values in the edit dialog, no title field, the authenticated composer, and own comment controls.
- USER_B does not see post edit/delete or USER_A comment edit/delete controls; USER_B can edit and delete only its own disposable comment. Report remains available where appropriate.
- The report dialog contains only category/details and returns generic success. No moderation status, reporter identity, queue position, or duplicate count is exposed.
- Literal `<script>alert(1)</script>` and `<img src=x onerror=alert(1)>` render as text. No script executed, no injected element appeared, and no `dangerouslySetInnerHTML` rendering path was used.

### Screenshots and Stitch comparisons

Canonical assets are preserved unchanged: [desktop Stitch raster](./DETAIL_STITCH_DESKTOP.png), [mobile Stitch raster](./DETAIL_STITCH_MOBILE.png), [desktop Stitch HTML](./DETAIL_STITCH_DESKTOP.html), and [mobile Stitch HTML](./DETAIL_STITCH_MOBILE.html).

- `DETAIL_STITCH_DESKTOP=51fd56d9452c48d198f814f89c6baa36`
- `DETAIL_STITCH_MOBILE=5c3d5fbc3ac646a183425122e9ae57f5`
- `DETAIL_RUNTIME_DESKTOP=[DETAIL_RUNTIME_DESKTOP.png](./DETAIL_RUNTIME_DESKTOP.png)`
- `DETAIL_RUNTIME_MOBILE=[DETAIL_RUNTIME_MOBILE.png](./DETAIL_RUNTIME_MOBILE.png)`
- `DETAIL_SIDE_BY_SIDE_DESKTOP=[DETAIL_SIDE_BY_SIDE_DESKTOP.md](./DETAIL_SIDE_BY_SIDE_DESKTOP.md)`
- `DETAIL_SIDE_BY_SIDE_MOBILE=[DETAIL_SIDE_BY_SIDE_MOBILE.md](./DETAIL_SIDE_BY_SIDE_MOBILE.md)`

The populated runtime is functional at both canonical viewports, but it is not a visual PASS. Material differences are recorded explicitly in the side-by-side artifacts:

1. Desktop comments are rendered as one enclosing card with divider-separated rows; Stitch uses individually bordered comment cards with richer per-thread grouping, metadata, overflow actions, and an inline reply-composer state.
2. Runtime places the post Helpful/Save/Share/Report actions in one bottom action row and owner Edit/Delete beside the generic heading; Stitch places post save/share/overflow controls in the post header and uses a different comment action grouping.
3. The Stitch desktop rail contains four learning-context cards; runtime currently exposes one concise learning-context card.
4. Stitch’s deleted-parent treatment is a dashed explanatory placeholder with explicit continuation copy; runtime communicates the deleted state and keeps the indented reply, but with a simpler placeholder treatment.
5. Stitch’s mobile detail header is a back/title/save/share bar; runtime retains the accepted global mobile header and bottom navigation. The populated runtime remains readable and has no horizontal overflow, but the shell/action placement is structurally different from the detail-specific Stitch reference.

Therefore: `VISUAL_DETAIL_1440=REVIEW` and `VISUAL_DETAIL_390=REVIEW`. No broad redesign or frontend remediation was applied in this preparation pass.

### Responsive and accessibility checks

At 320, 375, 390, 412, 768, 1024, and 1440, `scrollWidth == clientWidth`; no horizontal overflow was observed. The post body, deleted placeholder, comments, reply indentation, and composer remained present. The mobile composer accepted keyboard input without submitting data.

Lighthouse snapshot results: desktop and mobile each scored Accessibility 97, Best Practices 100, SEO 100, Agentic Browsing 100. The single accessibility audit failure is `color-contrast`. Manual dialog checks also found that opening a modal leaves focus on the trigger, Tab moves outside the dialog, and closing restores focus to `body` rather than the trigger. `ACCESSIBILITY=FAIL` for owner acceptance pending remediation.

### Console and network

- Application console errors: 0 during the final authenticated route review; Vite/React informational messages only.
- Unexpected network errors: 0 on the final authenticated route review. Auth refresh 403 observed only on the intentionally unauthenticated `127.0.0.1` origin; the CORS-allowed `localhost` owner session refreshed with 201.
- No failed asset requests, Community 500, unhandled promise rejection, or normal-path comment request failure observed.

### Verification and state boundaries

- Focused detail suite after runtime review: 10 tests passed.
- Existing baseline retained because no frontend source changed: 26 test files / 122 tests passed, typecheck passed, lint passed, build passed, and `npm audit --audit-level=high` passed with 0 vulnerabilities.
- `PHASE_05=IN_PROGRESS`
- `LNG_05_001=DONE`, `LNG_05_002=DONE`, `LNG_05_003=VERIFYING`, `LNG_05_004=DONE`, `LNG_05_005=DONE`, `LNG_05_006=VERIFYING`, `LNG_05_007=PLANNED`
- Backend source changed: NO. Frontend source changed: NO. Push: NO. Deploy: NO. Phase 05D: NOT STARTED. Phase 06: NOT STARTED.

## Detail visual and accessibility remediation

Date: 2026-09-14<br>
Status: remediation complete; owner visual acceptance remains the next gate

### Exact commits and boundaries

- Frontend baseline before remediation: `39af852b637acadc4624846478f453460e90ccdf`
- Frontend remediation commit: `d674578ae2c3f139b625200fe95d0f6c46bf0f14`
- Workspace evidence baseline before this record: `d0ab817575ff4d77390beaf28e27013e9ab79397`
- Workspace evidence commit: final local documentation commit; exact SHA is reported in the handoff below
- Backend: `85066b6c9e75a7f8a4339d2cc8415a7c627c7494`, unchanged and read-only
- Database and all visual review records: `NEON_TEST_ONLY`
- Phase state remains `PHASE_05=IN_PROGRESS`; 003 and 006 remain `VERIFYING`

### Visual remediation

- Desktop 1440 now matches the locked Stitch composition: 880px main canvas, 340px rail, separate post and discussion surfaces, individual comment cards, explicit thread grouping, inline reply composer, and four rail sections.
- Post actions now follow the canonical hierarchy: header Save/Share/overflow, bottom Helpful/discussion context, and owner/non-owner actions inside the contextual menu.
- Deleted parents remain plain-text safe and author/content-free, with a neutral explanatory placeholder and visible retained replies.
- Mobile 390 now uses a detail-local 56px back/title/save/share shell, hides the accepted global shell only on this route, keeps useful content width, and transitions the rail to the principles card.
- No accepted Feed or Composer Stitch screen was regenerated.

Final visual references:

- `DETAIL_STITCH_DESKTOP=51fd56d9452c48d198f814f89c6baa36`
- `DETAIL_STITCH_MOBILE=5c3d5fbc3ac646a183425122e9ae57f5`
- `DETAIL_RUNTIME_DESKTOP=[DETAIL_RUNTIME_DESKTOP_FINAL.jpeg](./DETAIL_RUNTIME_DESKTOP_FINAL.jpeg)`
- `DETAIL_RUNTIME_MOBILE=[DETAIL_RUNTIME_MOBILE_FINAL.jpeg](./DETAIL_RUNTIME_MOBILE_FINAL.jpeg)`
- `DETAIL_SIDE_BY_SIDE_DESKTOP=[DETAIL_SIDE_BY_SIDE_DESKTOP.md](./DETAIL_SIDE_BY_SIDE_DESKTOP.md)`
- `DETAIL_SIDE_BY_SIDE_MOBILE=[DETAIL_SIDE_BY_SIDE_MOBILE.md](./DETAIL_SIDE_BY_SIDE_MOBILE.md)`
- `VISUAL_DETAIL_1440=PASS`
- `VISUAL_DETAIL_390=PASS`
- `MATERIAL_DIFFERENCES=NONE`

### Accessibility remediation

- Contrast: replaced failing orange eyebrow and rail-label usage with the local readable orange token and corrected muted author, timestamp, metadata, and placeholder text. Lighthouse contrast findings are cleared.
- Shared Dialog: initial focus enters the first usable control, Tab and Shift+Tab remain contained, focus that starts outside is recovered, Escape follows the existing close policy, descriptions are connected with `aria-describedby`, and detached triggers are never focused during cleanup.
- Focus restoration: edit and report dialogs return to their initiating menu trigger; comment deletion returns to the discussion heading; successful post deletion focuses the surviving unavailable-state heading.
- Keyboard and semantics: native headings, article/comment landmarks, menu buttons, dialog labels, form labels, state labels, deleted-parent note semantics, visible focus, and Helpful/Save state names remain intact.

### Runtime and regression evidence

| Check | Result |
| --- | --- |
| `GET /api/v1/health` | 200 PASS |
| `GET /health` | 404 expected; not a backend defect |
| `GET /api/v1/languages` | 200 PASS |
| `GET /api/v1/community/posts` | 200 PASS |
| Full frontend tests | 26 files / 126 tests PASS |
| Focused detail tests | 13/13 PASS |
| Focused Dialog accessibility tests | 2/2 PASS |
| Typecheck | PASS |
| Lint | PASS |
| Production build | PASS |
| npm audit --audit-level=high | 0 vulnerabilities |
| Lighthouse Accessibility | 100 |
| Lighthouse Best Practices | 100 |
| Lighthouse SEO | 100 |
| Detail console errors | 0 |
| Detail unexpected network errors | 0 |
| Feed 05B regression | PASS at 1440 and 390 |
| Composer 05B regression | PASS at 1440 and 390; dialog focus restored to trigger |

The Lighthouse Agentic Browsing supporting score was 89 in the final mobile
navigation audit because of a non-accessibility cumulative-layout-shift audit
value of 0.181. Required accessibility, best-practices, and SEO gates are
100; no remaining accessibility warning was reported.

Responsive matrix: 320, 375, 390, 412, 768, 1024, and 1440 all had no
horizontal overflow. Detail header, post, rail transition, comments,
replies, deleted placeholder, composer, menus, and dialogs remained present
and usable.

### Final state boundaries

- `COMMENT_THREAD=PASS`
- `REPLY_DEPTH_0_1=PASS`
- `DELETED_PARENT=PASS`
- `POST_OWNER_EDIT_DELETE=PASS`
- `COMMENT_OWNER_EDIT_DELETE=PASS`
- `COMMENT_REPORT=PASS`
- `HELPFUL_DETAIL=PASS`
- `SAVE_DETAIL=PASS`
- `SHARE_DETAIL=PASS`
- `POST_REPORT_DETAIL=PASS`
- `XSS_SAFE_RENDERING=PASS`
- `FRONTEND_CHANGED=YES`
- `BACKEND_CHANGED=NO`
- `PUSHED=NO`
- `DEPLOYED=NO`
- `PHASE_05D_STARTED=NO`
- `PHASE_06_STARTED=NO`

## Owner acceptance and Phase 05C reconciliation

Date: 2026-09-15<br>
Owner visual acceptance: `OWNER_VISUAL_ACCEPTANCE_05C=YES`

The owner has manually reviewed and accepted the populated Phase 05C Post
Detail and Comments/Replies result against the locked Stitch references.

### Accepted baselines

- Frontend accepted local SHA: `d674578ae2c3f139b625200fe95d0f6c46bf0f14`
- Workspace accepted evidence SHA before reconciliation: `c10533831425ffea499cca7eeea5521907ffb262`
- Backend published baseline: `85066b6c9e75a7f8a4339d2cc8415a7c627c7494`, unchanged
- Desktop Stitch: `51fd56d9452c48d198f814f89c6baa36`
- Mobile Stitch: `5c3d5fbc3ac646a183425122e9ae57f5`
- Runtime and visual-review data: `NEON_TEST_ONLY`

### Accepted Phase 05C result

- `VISUAL_DETAIL_1440=PASS`
- `VISUAL_DETAIL_390=PASS`
- `MATERIAL_DIFFERENCES=NONE`
- `COMMENT_THREAD=PASS`
- `REPLY_DEPTH_0_1=PASS`
- `DELETED_PARENT=PASS`
- `POST_OWNER_EDIT_DELETE=PASS`
- `COMMENT_OWNER_EDIT_DELETE=PASS`
- `COMMENT_REPORT=PASS`
- `HELPFUL_DETAIL=PASS`
- `SAVE_DETAIL=PASS`
- `SHARE_DETAIL=PASS`
- `POST_REPORT_DETAIL=PASS`
- `XSS_SAFE_RENDERING=PASS`
- `ACCESSIBILITY=PASS`
- `COLOR_CONTRAST=PASS`
- `MODAL_FOCUS_TRAP=PASS`
- `MODAL_FOCUS_RESTORATION=PASS`
- `KEYBOARD_NAVIGATION=PASS`
- `VISIBLE_FOCUS=PASS`
- Lighthouse: Accessibility 100, Best Practices 100, SEO 100
- Responsive matrix: 320, 375, 390, 412, 768, 1024, 1440 all PASS
- Frontend verification: 26 test files / 126 tests PASS; focused detail 13/13 PASS; Dialog/A11y 2/2 PASS; typecheck, lint, build, and audit PASS with 0 vulnerabilities
- Runtime: application console errors 0; unexpected network errors 0
- Accepted 05B regressions: Feed PASS; Composer PASS

Final evidence remains available at:

- [Phase 05C detail evidence](./PHASE-05C-DETAIL-EVIDENCE.md)
- [Final desktop runtime](./DETAIL_RUNTIME_DESKTOP_FINAL.jpeg)
- [Final mobile runtime](./DETAIL_RUNTIME_MOBILE_FINAL.jpeg)
- [Desktop comparison](./DETAIL_SIDE_BY_SIDE_DESKTOP.md)
- [Mobile comparison](./DETAIL_SIDE_BY_SIDE_MOBILE.md)

### State transition

```text
PHASE_05=IN_PROGRESS
LNG_05_001=DONE
LNG_05_002=DONE
LNG_05_003=DONE
LNG_05_004=DONE
LNG_05_005=DONE
LNG_05_006=DONE
LNG_05_007=PLANNED
```

LNG-05-003 is complete because Backend comments, replies, reactions, bounded
depth, deleted-parent handling, owner mutation paths, and runtime integration
are verified. LNG-05-006 is complete because Feed, Post Card, Composer, Post
Detail, Comment Thread, desktop/mobile visual gates, responsive checks, and
accessibility runtime checks are owner-accepted.

The next gate is Phase 05D / LNG-05-007. Phase 05 remains in progress. Phase
06 is not ready, and no Phase 05D implementation is included in this commit.

### Health and database boundaries

- Valid health contract: `GET /api/v1/health => 200`
- `GET /health => 404` is expected for this Backend and is not a defect.
- Neon TEST was not reset, migrated, seeded, or otherwise changed by this
  publication task.
- Backend source and application code in Workspace were not modified.
