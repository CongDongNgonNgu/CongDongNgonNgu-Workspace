# Phase 05 Handoff

Phase status: IN_PROGRESS

Phase 05A backend foundation is implemented and locally verified. Phase 05B
frontend Feed and Composer surfaces were accepted by the owner on 2026-09-14
after visual/runtime review. Phase 05C remains separate work; production
deployment and Phase 06 were not started.

## Required status

~~~text
PHASE_05=IN_PROGRESS
LNG_05_001=DONE
LNG_05_002=DONE
LNG_05_003=VERIFYING
LNG_05_004=DONE
LNG_05_005=DONE
LNG_05_006=VERIFYING
LNG_05_007=PLANNED
~~~

## Current Phase 05B owner acceptance reconciliation

The following is the current acceptance state. Earlier `REVIEW` and
`PUSHED=NO` statements in this handoff are historical snapshots and are
superseded by `evidence/phase-05b/OWNER-ACCEPTANCE-2026-09-14.md`.

~~~text
OWNER_VISUAL_ACCEPTANCE=YES
FRONTEND_ACCEPTED_SHA=00727560aa5886f5780a58ba6d46746254c29248
WORKSPACE_ACCEPTED_BASELINE_SHA=bde4eeafe034ce07bc82c7f07c9d2ec2e3b91e59
WORKSPACE_RECONCILIATION_COMMIT=THIS_COMMIT
BACKEND_SHA=85066b6c9e75a7f8a4339d2cc8415a7c627c7494
BACKEND_CHANGED=NO
NEXT_GATE=PHASE_05C
PHASE_05C_STARTED=NO
PHASE_06_STARTED=NO
DEPLOYED=NO
~~~

## Backend contract

- One normalized post model supports DISCUSSION, QUESTION, RESOURCE,
  LEARNING_JOURNAL, CULTURE, PRONUNCIATION_REQUEST,
  CORRECTION_REQUEST, and CHALLENGE.
- Posts carry an active catalog language code, optional CEFR level/topic,
  plain text content, PUBLIC/PRIVATE visibility, moderation state and
  soft-delete timestamps. Content is NFKC-normalized and bounded at 20,000
  Unicode code points; comments are bounded at 5,000.
- Post ownership is derived from the authenticated session. Update/delete and
  comment update/delete are owner/author-only. Public response projections do
  not include email, moderation internals or provider data.
- Comments use depth 0/1 only. A deleted parent remains as a non-content
  placeholder when it has visible replies. Hidden content is omitted.
- HELPFUL is explicit add/remove, not a toggle. Database uniqueness and
  in-memory idempotency keep concurrent duplicate adds at one reaction.
- Saves are viewer-private. Public posts may be saved by any authenticated
  viewer; private posts are only visible/saveable by their owner.
- Share returns a canonical path only for active public posts. Private,
  hidden, deleted or unavailable posts return the same unavailable response.
- Reports accept POST/COMMENT, bounded categories/details, persist a
  moderation-ready open record, and always return submitted=true for valid
  requests without exposing target/report existence or other reports.

## Feed foundation

GET /api/v1/community/posts and saved-post pagination use an opaque
versioned cursor over (created_at DESC, id DESC). The first backend
foundation is deterministic recency plus optional active-language filtering;
it does not claim learner-personalized ranking or engagement optimization.
Sophisticated ranking and UI feed contexts remain planned.

## Abuse and security boundary

The current limiter is deliberately process-local because this phase has no
shared Redis/distributed limiter contract:

- 10 post creates per user per 15 minutes.
- 60 comment creates/edits per user per 15 minutes.
- 120 reaction or save mutations per user per 5/15 minutes respectively.
- 10 reports per user per hour.

This is suitable for local verification only; a shared limiter is required
before horizontally scaled production traffic. Mutations retain the existing
CSRF check for cookie-backed sessions. Query/body allowlists reject identity
spoofing fields, and user content remains plain text for an escaping UI
consumer rather than being treated as trusted HTML.

## Schema and files

Migration files:

~~~text
database/migrations/0003_community.sql
database/migrations/0003_community.down.sql
~~~

The migration creates posts, comments, reactions, saved posts and reports,
with language/user foreign keys, comment depth/parent checks, moderation
states, soft-delete/audit fields, deterministic feed indexes and
report-target uniqueness. The rollback only removes community objects.

Main backend surface:

~~~text
src/community/community.controller.ts
src/community/community.service.ts
src/community/community.repository.ts
src/community/postgres-community.repository.ts
src/community/community.module.ts
~~~

## Verification

~~~text
UNIT_TESTS=59 passed / 12 suites
E2E_TESTS=24 passed / 6 suites
TYPECHECK=PASS
LINT=PASS
BUILD=PASS
AUDIT=PASS (0 vulnerabilities)
MIGRATION_CHECK=PASS (static contract); execution not run
~~~

Migration execution was intentionally not attempted because no local
PostgreSQL listener was available on localhost:5432; no configured or
production database was touched.

## Phase 05A CI remediation evidence

The published Backend baseline 175e8d2c65527f633f2eadb8f63fb17b1d5e32f2
failed CI run
[34664137218](https://github.com/CongDongNgonNgu/CongDongNgonNgu-Back-End/actions/runs/34664137218)
only in the concurrent Supertest HTTP reaction requests with 'read
ECONNRESET'. Install, lint, typecheck and 58 unit tests had already passed;
the build and audit were skipped by the failed E2E step.

Source review and local Node 24 reproduction found the reaction application
path safe: the Postgres insert is conflict-safe, the migration retains the
(user_id, post_id, reaction_type) uniqueness invariant, the in-memory
repository is idempotent, and the reaction limiter allows 120 requests per
user per five minutes. The failure was therefore classified as a CI HTTP
harness/socket flake on ubuntu-latest, not an application race.

Remediation commit:
85066b6c9e75a7f8a4339d2cc8415a7c627c7494
(test(community): stabilize reaction concurrency coverage). HTTP E2E keeps
authenticated add, duplicate 201, safe response, detail state, removal,
unauthenticated rejection, unavailable-post rejection, save idempotency and
viewer-private save assertions. The eight-way concurrent add race remains
covered deterministically at the service/repository boundary, asserting eight
safe responses, exactly one persisted reaction, helpfulCount=1,
viewerReacted=true, and removal to count zero.

Final local verification used Node 24.18.0:

~~~text
FOCUSED_INTERACTION_REPEAT=5/5
BACKEND_CI_RUN=34668226991
BACKEND_CI=PASS
LIVE_MIGRATION_EXECUTED=NO
RATE_LIMIT_IMPLEMENTATION=PROCESS_LOCAL
HORIZONTAL_PRODUCTION_LIMITER_REQUIRED=YES
~~~

CI run
[34668226991](https://github.com/CongDongNgonNgu/CongDongNgonNgu-Back-End/actions/runs/34668226991)
passed all quality steps: lint, type check, unit tests, E2E tests, build and
security audit.

## Repository boundaries

~~~text
FRONTEND_CHANGED=YES
STITCH_USED=YES
DEPLOYED=NO
PHASE_05B_STARTED=YES
PHASE_06_STARTED=NO
BACKEND_CHANGED=NO
PUBLISH_TARGET=main (publication follows this reconciliation commit)
BACKEND_SHA=85066b6c9e75a7f8a4339d2cc8415a7c627c7494
BACKEND_BASELINE_SHA=c8455a23731d8e8d0744818851ec50fa18d46a04
FRONTEND_BASELINE_SHA=2b7992a9b7dd68d688a721690218a4a7b141bdc1
FRONTEND_BRANCH=phase-05b-community
FRONTEND_LOCAL_COMMIT=00727560aa5886f5780a58ba6d46746254c29248
WORKSPACE_LOCAL_COMMIT=bde4eeafe034ce07bc82c7f07c9d2ec2e3b91e59
WORKSPACE_BASELINE_SHA=628a765bfbc0b45fe0f2bd41e6305a73b3027467
WORKSPACE_EVIDENCE_SHA=2f3c32824a0b5c13cccf03c339bf23414ceb5fac
~~~

Current state before publication: accepted local Frontend and Workspace
commits are clean; the Workspace reconciliation commit is documentation-only.
Do not deploy. Phase 05C/06 remain unstarted.

## Phase 05B frontend evidence

### Effective status

~~~text
PHASE_05B_SCOPE=COMMUNITY_FEED_AND_COMPOSER
PHASE_05=IN_PROGRESS
LNG_05_001=DONE
LNG_05_002=DONE
LNG_05_003=VERIFYING
LNG_05_004=DONE
LNG_05_005=DONE
LNG_05_006=VERIFYING
LNG_05_007=PLANNED
~~~

### Implemented scope

- Added the direct /community route and a deterministic latest feed.
- Added the real language-catalog filter, explicit Xem them pagination,
  opaque cursor forwarding, unique append behavior, and truthful loading,
  empty, error, and rate-limit states.
- Added authenticated plain-text composer fields for post type, target
  language, CEFR level, topic, visibility, and bounded Unicode content.
- Added server-confirmed HELPFUL, save, share, and post-report actions.
- Rendered post content as text with preserved newlines and no HTML injection;
  comments remain count-only in this scope.

### Contract and security evidence

- Feed uses GET /api/v1/community/posts through the existing auth client;
  public requests omit credentials and authenticated requests use the
  existing protected client.
- Composer uses POST /api/v1/community/posts with the exact supported
  fields and PUBLIC default.
- Helpful, save, share, and report paths/bodies are covered by API adapter
  tests; unsupported reaction types and comment UX were not added.
- The XSS regression fixture renders <script>alert(1)</script> as literal
  text, preserves a newline, and contains no script role or HTML injection.
- Canonical share paths are accepted only when root-relative and shareable.

### Verification

~~~text
npm test -- --run = PASS (25 files, 105 tests)
npm run typecheck = PASS
npm run lint = PASS
npm run build = PASS
npm audit --audit-level=high = PASS (0 vulnerabilities)
~~~

Runtime and responsive evidence:

- Direct /community navigation returned HTTP 200 and the page title was
  Cộng đồng học ngôn ngữ | CongDongNgonNgu.vn.
- The local backend was not running during browser verification; API
  resources returned 500, and the UI showed generic error states without
  fabricated feed or catalog data. No frontend runtime exception was seen;
  console noise was limited to those expected API resource failures.
- Chrome DevTools inline review covered desktop 1440 and mobile 390. The
  responsive matrix measured no horizontal overflow at 320, 375, 390, 412,
  768, 1024, and 1440 pixels.
- Lighthouse/DevTools audit: Accessibility 100, Best Practices 100, SEO 100,
  Agentic Browsing 100.
- Screenshot output was inspected inline. The browser screenshot writer
  rejected all repository target paths, so no screenshot file artifact is
  claimed.

### Stitch and visual acceptance

~~~text
STITCH_USED=YES
STITCH_PROJECT=3718538619973058970
STITCH_DESIGN_SYSTEM=16442026920550574436
STITCH_FEED_DESKTOP=dd54a8ce055d4284870e1822cef33d2f
STITCH_FEED_MOBILE=edb521a9ac77463a896dd047770fb9e3
STITCH_COMPOSER_DESKTOP=b7320fdfb139424e84e11d42f42a4525
STITCH_COMPOSER_MOBILE=93e2741039e446938f56a1341980c77d
VISUAL_FEED_DESKTOP=PASS
VISUAL_FEED_MOBILE=PASS
VISUAL_COMPOSER_DESKTOP=PASS
VISUAL_COMPOSER_MOBILE=PASS
OWNER_VISUAL_ACCEPTANCE=YES
~~~

Feed and Composer visual tasks are owner-accepted. No detail/comments route,
edit/delete flow, comment-report flow, Backend change, deployment, Phase 05C,
or Phase 06 work was started.
