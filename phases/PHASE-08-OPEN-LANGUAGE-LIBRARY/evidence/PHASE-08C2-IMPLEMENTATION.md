# Phase 08C2 Implementation Evidence

## Result and heads

```text
PHASE_08C2_IMPLEMENTATION=PASS
STITCH_STATUS=PASS
STITCH_PROJECT=14639103242845084916
BACKEND_SHA=86c51f7b08a989db415e7c11361686fdf2379455
BACKEND_CHANGED=NO
FRONTEND_BRANCH=phase-08c2-library-reviewer-ui
FRONTEND_SHA=8ffab694cf5e024b24ca5e881405d2c50ba491e5
WORKSPACE_BRANCH=phase-08c2-library-reviewer-ui
WORKSPACE_PARENT=cf766bb887d4ebf282bcb97d3b083b39ab3d7231
MIGRATION_REQUIRED=NO
MIGRATION_RERUN=NO
MIGRATION_0012_CREATED=NO
TEST_DB_MUTATED=NO
PRODUCTION_DB_MUTATED=NO
DEPLOYED=NO
```

The Frontend branch was created from the exact accepted Frontend main. The
Workspace branch was created from the canonical 08C1B review head, not the
incorrect SHA typo supplied in an earlier report. Backend and all migrations
were left untouched.

## Stitch screens

Prompt C was generated and inspected in the existing project before material
implementation:

```text
STITCH_QUEUE_DESKTOP=14dfde97e554403a89eeba779d484e59
STITCH_DETAIL_DESKTOP=7b27f5fa100741a39aa68a8f1733e02f
STITCH_DETAIL_MOBILE=0f97c81a5cb44d31b0d48976cec223f6
STITCH_SOURCE_INVALID=dad5c24b21e543f7907b3fa007e83fb7
STITCH_REVIEW_ACTION=4f89b67b6010497391aa193d9c1330b1
STITCH_RECONCILE_ACTION=d2f47c020ece487781a2bb505ccffb1c
```

The implementation follows the evidence-first visual direction while omitting
unsupported Request Changes and duplicate-similarity concepts.

## Reviewer routes and authorization

Added:

- `/library/review`
- `/library/review/:resourceId`
- `/library/review?view=pending`
- `/library/review?view=source-invalid`

The route uses the existing AuthProvider and `useAuth().api` bearer transport.
Auth loading has a quiet loading state; unauthenticated users are redirected
to `/login` with `location.state.from` preserved; MEMBER users receive an
access-denied surface; only MODERATOR and ADMIN render the reviewer feature.
The `/library` reviewer entry is quiet and visible only to those roles.

## Queue and detail contracts

The pending queue consumes `GET /api/v1/library/reviews` with only the accepted
`q`, `language`, `type`, `cursor`, and `limit` filters. The source-invalid view
consumes `GET /api/v1/library/reviews/source-invalid`, shows the backend's
`publicExposure=false` meaning as `Đang ẩn khỏi thư viện công khai`, maps the
stable source-health reason codes, and preserves cursors opaquely.

Detail consumes `GET /api/v1/library/reviews/:resourceId` and presents learning
content first, then review state/eligibility, provenance and source health,
safe license evidence, contribution event evidence, append-only audit history,
and actions. All current Library resource types are rendered through
type-specific content branches. No raw JSON or private fields are rendered.

The eligibility model consumes `verificationEligibility.eligible` and
`issues`; Verify is disabled for `SOURCE_INVALID`, unsafe/inactive/unknown
licenses, missing provenance, inactive moderation, or other backend-reported
issues. Phase 06 reason labels are rendered from the backend code without
inventing a different cause.

## Actions and error behavior

- Verify and Reject use the canonical `/library/resources/:resourceId/review`
  endpoint. Verify requires confirmation; Reject requires a neutral note and
  focuses the note on validation failure.
- Reconciliation uses
  `/library/reviews/:resourceId/reconcile-source`, explains fail-closed public
  reads and the absence of automatic re-verification, and supports an optional
  reviewer note.
- `LIBRARY_SELF_VERIFICATION_DENIED` keeps the reviewer on the same detail,
  shows a safe Vietnamese message, and offers an explicit detail reload;
  `LIBRARY_REVIEW_CONFLICT` closes the dialog, performs one safe detail
  refresh, and offers the same reload path if that refresh fails. Mutations
  are never auto-retried.
- `LIBRARY_SOURCE_STILL_VALID` refreshes the detail without claiming a fake
  transition. Request Changes is explicitly not implemented by design.

## Accessibility and responsive evidence

The reviewer surfaces use semantic headings/landmarks, labelled filters,
visible focus, accessible dialogs with focus restoration, live status regions,
note validation, disabled ineligible actions, and safe wrapping for long IDs,
URLs, and audit notes.

Browser fixture verification found no horizontal overflow at all requested
viewports:

```text
RESPONSIVE_320=PASS
RESPONSIVE_375=PASS
RESPONSIVE_390=PASS
RESPONSIVE_412=PASS
RESPONSIVE_768=PASS
RESPONSIVE_1024=PASS
RESPONSIVE_1440=PASS
```

Lighthouse snapshot checks on the reviewer queue desktop, reviewer detail
desktop, and reviewer detail mobile each returned Accessibility 100 in the
accepted browser evidence. The remediation reran live detail, attribution,
guidance-copy, and keyboard-focus checks with a corrected disposable fixture;
no Backend or Neon runtime was used.

## Final implementation captures

Captured from the implementation, not Stitch rasters:

```text
IMPLEMENTATION_QUEUE_DESKTOP=phases/PHASE-08-OPEN-LANGUAGE-LIBRARY/evidence/PHASE-08C2-REVIEW-QUEUE-DESKTOP.png (1440x900)
IMPLEMENTATION_DETAIL_DESKTOP=phases/PHASE-08-OPEN-LANGUAGE-LIBRARY/evidence/PHASE-08C2-REVIEW-DETAIL-DESKTOP.png (1440x900)
IMPLEMENTATION_DETAIL_MOBILE=phases/PHASE-08-OPEN-LANGUAGE-LIBRARY/evidence/PHASE-08C2-REVIEW-DETAIL-MOBILE.png (390x900)
IMPLEMENTATION_SOURCE_INVALID=phases/PHASE-08-OPEN-LANGUAGE-LIBRARY/evidence/PHASE-08C2-SOURCE-INVALID.png (1440x900)
IMPLEMENTATION_REJECT=phases/PHASE-08-OPEN-LANGUAGE-LIBRARY/evidence/PHASE-08C2-REJECT-ACTION.png (1440x900)
IMPLEMENTATION_RECONCILE=phases/PHASE-08-OPEN-LANGUAGE-LIBRARY/evidence/PHASE-08C2-RECONCILE-ACTION.png (1440x900)
```

## Verification

```text
FOCUSED_REVIEW_TESTS=PASS (4 files, 19 tests)
FRONTEND_TESTS=PASS (46 files, 218 tests)
TYPECHECK=PASS
LINT=PASS
BUILD=PASS
AUDIT=PASS (0 vulnerabilities at --audit-level=high)
GIT_DIFF_CHECK=PASS
LIGHTHOUSE_QUEUE_DESKTOP=100
LIGHTHOUSE_DETAIL_DESKTOP=100
LIGHTHOUSE_DETAIL_MOBILE=100
```

The browser verification used controlled local fixtures for reviewer role,
queue/detail projections, Verify/Reject dialogs, and source reconciliation.
Backend integration smoke is `BLOCKED` for this UI slice because the accepted
Backend was not started locally and Neon TEST was explicitly out of scope; no
runtime result is fabricated.

The earlier accepted backend evidence remains authoritative:

```text
08C1A_RUNTIME=PASS
08C1B_RUNTIME_RETEST=PASS
08C1B_TARGET_PRECHECK_RECONCILIATION=PASS
```

The final state for this slice remains:

```text
CURRENT_PHASE=08
PHASE_08=IN_PROGRESS
LNG_08_005=VERIFYING
OWNER_VISUAL_ACCEPTANCE_08C=PENDING
LNG_08_006=PLANNED
LNG_08_007=PLANNED
LNG_08_008=PLANNED
NEXT_ACTION=STOP_FOR_EXTERNAL_AND_OWNER_VISUAL_REVIEW
```

## Phase 08C2 external review remediation

The Frontend review branch received a focused remediation before owner visual
acceptance. Backend SHA `86c51f7b08a989db415e7c11361686fdf2379455` and all
migrations remain unchanged; Neon TEST was not used by this UI remediation.

```text
FRONTEND_REMEDIATION_COMMIT=8ffab694cf5e024b24ca5e881405d2c50ba491e5
REVIEW_CONFLICT_REFRESH=PASS
REVIEW_CONFLICT_MUTATION_RETRY=NO
REVIEW_CONFLICT_REFRESH_TEST=PASS
SELF_VERIFICATION_ERROR=PASS
SELF_VERIFICATION_RELOAD_AVAILABLE=PASS
VERIFY_DIALOG_FOCUS_RESTORE=PASS
REJECT_DIALOG_FOCUS_RESTORE=PASS
RECONCILE_DIALOG_FOCUS_RESTORE=PASS
ACTION_DIALOG_FOCUS_TESTS=PASS
LICENSE_ATTRIBUTION_REQUIRED_UI=PASS
LICENSE_EVIDENCE=PASS
REVIEW_TYPES_BACKEND_ALIGNED=PASS
REQUEST_CHANGES_UI=NOT_IMPLEMENTED_BY_DESIGN
SOURCE_STILL_VALID_HANDLING=PASS
NO_AUTO_REVERIFY=YES
PRIVATE_FIELD_RENDERING=NONE
FOCUSED_REVIEW_TESTS=PASS (4 files, 19 tests)
FRONTEND_TESTS=PASS (46 files, 218 tests)
TYPECHECK=PASS
LINT=PASS
BUILD=PASS
AUDIT=PASS (0 vulnerabilities at --audit-level=high)
GIT_DIFF_CHECK=PASS
BACKEND_INTEGRATION_SMOKE=BLOCKED (accepted Backend not started locally; Neon TEST out of scope)
RESPONSIVE_320=PASS
RESPONSIVE_375=PASS
RESPONSIVE_390=PASS
RESPONSIVE_412=PASS
RESPONSIVE_768=PASS
RESPONSIVE_1024=PASS
RESPONSIVE_1440=PASS
ACCESSIBILITY=100 (existing Lighthouse queue/detail evidence retained; browser focus and live detail checks rerun)
CURRENT_PHASE=08
PHASE_08=IN_PROGRESS
LNG_08_005=VERIFYING
OWNER_VISUAL_ACCEPTANCE_08C=PENDING
TEST_DB_MUTATED=NO
PRODUCTION_DB_MUTATED=NO
DEPLOYED=NO
NEXT_ACTION=STOP_FOR_EXTERNAL_AND_OWNER_VISUAL_REVIEW
```

Conflict handling now refreshes reviewer detail once after the backend returns
`LIBRARY_REVIEW_CONFLICT`; if the GET refresh fails, the conflict notice stays
visible with an explicit `Tải lại chi tiết` action. Self-verification never
retries the mutation and keeps the same detail with the same reload path.
Verify, Reject, and Reconcile use separate trigger refs, so Cancel and Escape
restore focus to the action that opened the dialog. Reviewer license evidence
now renders `attributionRequired` as Có, Không, or Chưa xác định, and the
Frontend type accepts the Backend's nullable reviewer-license contract.
The internal Request Changes lifecycle note was removed; no Request Changes
action was added. Affected implementation captures were regenerated for
reviewer detail desktop/mobile, Reject, Reconcile, and source-invalid states;
the live browser capture confirmed the updated attribution row and reviewer
guidance copy. The accepted responsive/Lighthouse evidence remains the visual
quality baseline because the remediation did not redesign the layout.
