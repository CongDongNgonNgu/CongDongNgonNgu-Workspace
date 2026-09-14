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
