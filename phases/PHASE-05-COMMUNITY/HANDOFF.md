# Phase 05 Handoff

Phase status: IN_PROGRESS

Phase 05A backend foundation is implemented and locally verified. Frontend,
Stitch, production deployment, Phase 05B, and Phase 06 were not started.

## Required status

~~~text
PHASE_05=IN_PROGRESS
LNG_05_001=DONE
LNG_05_002=VERIFYING
LNG_05_003=VERIFYING
LNG_05_004=PLANNED
LNG_05_005=VERIFYING
LNG_05_006=PLANNED
LNG_05_007=PLANNED
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
UNIT_TESTS=58 passed / 11 suites
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

## Repository boundaries

~~~text
FRONTEND_CHANGED=NO
STITCH_USED=NO
DEPLOYED=NO
PHASE_05B_STARTED=NO
PHASE_06_STARTED=NO
BACKEND_SHA=175e8d2c65527f633f2eadb8f63fb17b1d5e32f2
BACKEND_BASELINE_SHA=c8455a23731d8e8d0744818851ec50fa18d46a04
FRONTEND_BASELINE_SHA=2b7992a9b7dd68d688a721690218a4a7b141bdc1
WORKSPACE_BASELINE_SHA=628a765bfbc0b45fe0f2bd41e6305a73b3027467
~~~

Next gate: complete the remaining verification/publication checks, then a
separate approved Phase 05B task may address Stitch-designed UI surfaces.
