# Phase 08C2 Implementation Plan

## Slice

`LNG-08-005` — reviewer UI for the accepted 08C1A/08C1B backend contract.

```text
CURRENT_PHASE=08
PHASE_08=IN_PROGRESS
LNG_08_005=VERIFYING
OWNER_VISUAL_ACCEPTANCE_08C=PENDING
BACKEND_CHANGED=NO
TEST_DB_MUTATED=NO
PRODUCTION_DB_MUTATED=NO
DEPLOYED=NO
```

## Immutable boundaries

- Backend remains `86c51f7b08a989db415e7c11361686fdf2379455` on
  `phase-08c1b-library-source-invalidation`.
- Frontend starts from `a46194853b4da7cfa8d41d6e155f92ab908c4ff4`.
- Workspace starts from `cf766bb887d4ebf282bcb97d3b083b39ab3d7231`.
- No Neon TEST connection, database mutation, migration execution, deployment,
  main merge, or Phase 08C3/LNG-08-007 work is in scope.

## Stitch-first design evidence

Existing Stitch project: `14639103242845084916`.

Prompt C was used and the generated screens were inspected before UI work:

| Surface | Stitch screen |
| --- | --- |
| Pending review queue desktop | `14dfde97e554403a89eeba779d484e59` |
| Review detail desktop | `7b27f5fa100741a39aa68a8f1733e02f` |
| Review detail mobile | `0f97c81a5cb44d31b0d48976cec223f6` |
| Invalid-source queue/detail | `dad5c24b21e543f7907b3fa007e83fb7` |
| Verify/reject action state | `4f89b67b6010497391aa193d9c1330b1` |
| Source reconciliation state | `d2f47c020ece487781a2bb505ccffb1c` |

Stitch-only concepts that are not in the accepted backend contract, including
Request Changes and duplicate similarity scoring, are intentionally excluded.

## Implementation sequence

1. Add a responsibility-local `library/review` feature with typed API,
   hooks, queue/detail components, CSS Modules, and focused tests.
2. Add `/library/review` and `/library/review/:resourceId` before the generic
   `/library/:resourceId` route.
3. Gate access through the existing `useAuth()` state and bearer transport:
   loading surface, safe login return path, MEMBER denial, and MODERATOR/ADMIN
   access.
4. Add the quiet reviewer-only entry on `/library`.
5. Consume the pending and invalid-source read models with bounded filters and
   opaque cursor pagination.
6. Render canonical learning content first, followed by eligibility,
   provenance/source health, safe license evidence, contribution event facts,
   append-only audit history, and actions.
7. Implement Verify, Reject, and source reconciliation dialogs using the
   existing review endpoints. Reject requires a note; no Request Changes UI is
   created.
8. Verify keyboard focus, dialog semantics, responsive wrapping, console
   cleanliness, Lighthouse accessibility, and final implementation captures.

## Acceptance guardrails

- Backend remains authoritative for eligibility, conflict handling, self-review
  denial, source health, and public visibility.
- Cursors remain opaque; the UI never decodes or rewrites them.
- Unsafe or invalid source/license states are warnings and disable Verify.
- Reconciliation explains that public reads are already fail-closed and does
  not auto-reverify or mutate provenance.
- Private fields are not rendered: email, auth/session data, tokens,
  `sourceNote`, and contributor IDs from contribution events.
- Owner visual acceptance remains external and pending.
