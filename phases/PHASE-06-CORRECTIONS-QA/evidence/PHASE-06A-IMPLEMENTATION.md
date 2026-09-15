# Phase 06A — Backend/Data Foundation Evidence

Date: 2026-09-15
Scope: Backend/Data Foundation only

## Scope boundary

This evidence covers the normalized Corrections & Q&A data model, migration,
minimum APIs, validation, security, transaction behavior, tests, and authorized
Neon TEST verification. It does not claim completion of 06B, 06C, or 06D.

No Frontend repository files were changed. The existing Community post model
remains canonical; no correction_posts or qa_posts model was introduced.

## Model and safety decisions

- community_posts stores the parent CORRECTION_REQUEST or QUESTION.
- community_correction_requests stores immutable source text, intent, context,
  and timestamps.
- community_structured_responses stores typed correction proposals and Q&A
  answers; generic comments remain separate.
- Acceptance history and one-current-helpful-vote foundations are present for
  later work, but no acceptance/vote behavior is active in 06A.
- Parent type, source immutability, response variant, length, and referential
  constraints are enforced in PostgreSQL.
- Service reads inherit Community visibility, moderation, active-language, and
  active-author rules. Hidden responses are omitted; deleted/inactive authors
  produce placeholders with content withheld.
- Canonical source/response text only converts CRLF/CR to LF. Unicode, case,
  leading/trailing whitespace, and internal whitespace are preserved.
- Mutations derive actor identity from the authenticated session and retain the
  existing cookie-CSRF behavior. SQL values are parameterized.
- A typed future contribution-event contract exists without an outbox,
  reputation calculation, or Library write.

## Verification matrix

~~~
BACKEND_COMMIT=81fa517
UNIT_TESTS=77 PASS / 18 suites
E2E_TESTS=38 PASS / 8 suites
TYPECHECK=PASS
BUILD=PASS
NPM_AUDIT=PASS (0 vulnerabilities)
~~~

Focused coverage includes multilingual/Unicode boundaries, exact text
normalization, parent/type separation, private-parent reads, deleted-response
placeholders, cursor pagination, Postgres transaction commit/rollback,
authenticated actor enforcement, and API response-kind separation.

## Neon TEST evidence

The owner-authorized Neon TEST target was identified using read-only metadata
(neondb, public, *.neon.tech) and the existing Workspace authorization
evidence. Migration 0004 applied after migrations 0001–0003. An immediate
checksum/idempotency rerun skipped all four recorded migrations.

The runtime smoke used synthetic TEST identities through the real Nest
Postgres-backed module graph:

~~~
GET /api/v1/health = 200
POST /api/v1/community/correction-requests = 201
POST /api/v1/community/posts/:postId/structured-responses = 201
GET /api/v1/community/posts/:postId/structured-responses = 200
POST /api/v1/community/questions = 201
POST /api/v1/community/posts/:postId/structured-responses (QA_ANSWER) = 201
GET /api/v1/community/questions/:postId = 200
source preservation after CRLF normalization = PASS
immutable source update inside rolled-back transaction = rejected (23514)
~~~

Exact synthetic TEST records:

~~~
POST_ID=97f6b9bc-30a9-4799-ab27-6dab057cfb8d
RESPONSE_ID=145edcdc-9f29-496f-91ec-d3a5677dbb0c
QUESTION_ID=822a2528-268c-4f3e-88a9-188bc26d0223
ANSWER_ID=cf48e4be-e8f1-45aa-8a15-397051a88884
~~~

No broad cleanup or production connection was used. The exact synthetic TEST
records remain for continued review.

## Status

~~~
PHASE_06A=DONE
PHASE_06=IN_PROGRESS
BLOCKER-05D-001=OPEN and unchanged
FRONTEND=NOT_IN_SCOPE
CI_REMOTE=UNVERIFIED
~~~
