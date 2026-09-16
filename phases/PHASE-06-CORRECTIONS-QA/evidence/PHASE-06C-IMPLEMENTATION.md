# Phase 06C — Structured Responses, Diff, Helpful & Acceptance

Date: 2026-09-16
Status: VERIFYING / local implementation complete; authenticated runtime blocked
Data boundary: Neon TEST only

This record covers the local 06C implementation slice. It does not close
LNG-06-003 or LNG-06-004, does not start 06D, and does not replace the prior
06A/06B evidence.

## Exact local revisions

~~~text
BACKEND_BASELINE=81fa51780ef43193eaf50cd41b517d1b917c71b5
BACKEND_BRANCH=phase-06c-interactions
BACKEND_SHA=6a326a79adf80b7ddc6e1cbb077171a6bc22ce78
FRONTEND_BASELINE=c85c9415c359a42919db0e29534177aa1ccc576b
FRONTEND_BRANCH=phase-06c-diff-ui
FRONTEND_SHA=598ba64f586d11e38ef0631039221eb07263dcc7
WORKSPACE_BASELINE=10d687e419a9bc1a0231d90bb6d45244425da93a
WORKSPACE_BRANCH=phase-06c-evidence
SCHEMA_CHANGE_REQUIRED=NO
MIGRATION_CHANGED=NO
BACKEND_CHANGED=YES
FRONTEND_CHANGED=YES
PUSHED=NO
DEPLOYED=NO
PHASE_06D_STARTED=NO
~~~

The Backend change is additive application behavior over the existing 0004
corrections/QA schema. No migration was created, modified, applied, or reset
by this slice.

## Implemented contract

Backend routes added:

~~~text
PUT    /api/v1/community/structured-responses/:responseId/helpful
DELETE /api/v1/community/structured-responses/:responseId/helpful
PUT    /api/v1/community/posts/:postId/accepted-response
DELETE /api/v1/community/posts/:postId/accepted-response
~~~

The response projection now carries server-authoritative `helpfulCount`,
`viewerHelpful`, `isAccepted`, `acceptedAt`, `canVote`, and `canAccept`.
Helpful writes are idempotent and reject self-votes. Acceptance is limited to
the parent requester, validates parent/kind ownership, supports change and
revoke, and uses the repository transaction/parent lock to keep one active
acceptance. No reputation, reviewer, Library, vote, or Phase 06D behavior was
activated.

Frontend additions:

- correction and QA structured-response list/card/editor experience on the
  existing Community detail route;
- semantic `<del>`/`<ins>` diff with non-color cues and narrow-screen layout;
- `Intl.Segmenter` word tokenization with a bounded LCS fallback for long text;
- Unicode code-point counts, CRLF-to-LF normalization only at submit, and no
  silent trim of submitted correction text;
- auth gate, loading/error/empty states, Helpful server refresh, requester
  acceptance/revocation, and self-vote action hiding.

No `dangerouslySetInnerHTML` or rendered HTML diff payload is used.

## Stitch references

~~~text
STITCH_PROJECT=3718538619973058970
CORRECTION_STITCH_DESKTOP=6b1d27c554874ba28b0445321ea5ff73
CORRECTION_STITCH_MOBILE=5dd468a98e9f4e78abfa0dd2876d963c
QUESTION_STITCH_DESKTOP=00b56f19add842ffa17fb28e796b709c
QUESTION_STITCH_MOBILE=1f3d9d68d2b84f809e46db969570443d
~~~

The references were generated in the existing Stitch project with its existing
design system. They were not regenerated during implementation.

## Automated verification

~~~text
BACKEND_UNIT=81 PASS / 18 suites
BACKEND_E2E=39 PASS / 8 suites
BACKEND_TYPECHECK=PASS
BACKEND_LINT=PASS (tsc --noEmit)
BACKEND_BUILD=PASS
BACKEND_AUDIT=0 vulnerabilities
FRONTEND_TESTS=147 PASS / 32 files
FRONTEND_TYPECHECK=PASS
FRONTEND_LINT=PASS (tsc --noEmit)
FRONTEND_BUILD=PASS
FRONTEND_AUDIT=0 vulnerabilities
DIFF_ONE_WORD=PASS
DIFF_SENTENCE_REWRITE=PASS
DIFF_DELETION_ONLY=PASS
DIFF_ADDITION_ONLY=PASS
DIFF_LONG_PARAGRAPH=PASS
DIFF_CJK=PASS
XSS_SAFE_DIFF=PASS
DIFF_COLOR_INDEPENDENT=PASS
~~~

## Safe runtime boundary

The exact Backend branch started successfully with its existing local
configuration, and the exact Frontend branch started successfully against the
local Backend proxy. Read-only checks used loopback and the existing Neon TEST
parent records only:

~~~text
GET /api/v1/health=200
GET /api/v1/languages=200
GET /api/v1/community/posts=200
GET correction parent 0bd5ac94-32d5-42e4-8374-113549606ef7=200
GET question parent beba68c9-e720-466f-960f-802ac5e71814=200
GET correction structured responses for existing parent=200, items=0
GET question structured responses for existing parent=200, items=0
~~~

Browser navigation to an ask route correctly reached the login gate. A real
browser registration created a disposable pending-verification TEST identity
and navigated to the supported email-verification screen. The local Backend
uses the documented memory email provider, so there is no supported inbox or
verification link available in this environment. No token interception,
auth-guard patch, token hardcoding, owner credential reuse, or fake session was
used. The pending identity was not used to create Phase 06C response records.

Therefore the following remain explicitly unverified/blocking:

~~~text
AUTH_VERIFICATION=BLOCKED_EXTERNAL
CORRECTION_RUNTIME_JOURNEY=BLOCKED
QUESTION_RUNTIME_JOURNEY=BLOCKED
HELPFUL_RUNTIME=BLOCKED
ACCEPTANCE_RUNTIME=BLOCKED
SELF_VOTE_RUNTIME=BLOCKED
SCREENSHOT_CAPTURE_METHOD=NOT_RUN_AUTHENTICATED_RUNTIME_BLOCKED
CORRECTION_RUNTIME_DESKTOP=NOT_CAPTURED
CORRECTION_RUNTIME_MOBILE=NOT_CAPTURED
QUESTION_RUNTIME_DESKTOP=NOT_CAPTURED
QUESTION_RUNTIME_MOBILE=NOT_CAPTURED
CORRECTION_SIDE_BY_SIDE_DESKTOP=NOT_CREATED
CORRECTION_SIDE_BY_SIDE_MOBILE=NOT_CREATED
QUESTION_SIDE_BY_SIDE_DESKTOP=NOT_CREATED
QUESTION_SIDE_BY_SIDE_MOBILE=NOT_CREATED
VISUAL_CORRECTION_1440=REVIEW
VISUAL_CORRECTION_390=REVIEW
VISUAL_QUESTION_1440=REVIEW
VISUAL_QUESTION_390=REVIEW
MATERIAL_DIFFERENCES=NOT_REVIEWED_WITH_POPULATED_RUNTIME
RESPONSIVE_320=NOT_RUN_POPULATED_RUNTIME
RESPONSIVE_375=NOT_RUN_POPULATED_RUNTIME
RESPONSIVE_390=NOT_RUN_POPULATED_RUNTIME
RESPONSIVE_412=NOT_RUN_POPULATED_RUNTIME
RESPONSIVE_768=NOT_RUN_POPULATED_RUNTIME
RESPONSIVE_1024=NOT_RUN_POPULATED_RUNTIME
RESPONSIVE_1440=NOT_RUN_POPULATED_RUNTIME
ACCESSIBILITY=AUTOMATED_COMPONENT_COVERAGE_ONLY
APPLICATION_CONSOLE_ERRORS=NOT_CAPTURED
UNEXPECTED_NETWORK_ERRORS=NOT_CAPTURED
LIGHTHOUSE=NOT_RUN
~~~

See `state/BLOCKERS.md` entry `BLOCKER-06C-001`. Resume with an existing
verified disposable TEST identity or a supported verification inbox/link, then
complete authenticated creation, Helpful/acceptance journeys, screenshots,
responsive/a11y runtime checks, and owner visual acceptance before changing
these values or closing 06C.

## State

~~~text
CURRENT_PHASE=06
PHASE_06=IN_PROGRESS
LNG_06_001=DONE
LNG_06_002=DONE
LNG_06_003=VERIFYING
LNG_06_004=VERIFYING
LNG_06_005=PLANNED
LNG_06_006=PLANNED
LNG_06_007=PLANNED
NEON_TEST_ONLY=YES
PRODUCTION_DATABASE_TOUCHED=NO
~~~
