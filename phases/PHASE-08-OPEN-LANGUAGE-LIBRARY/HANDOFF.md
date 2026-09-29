# Phase 08 Handoff

**Phase status:** IN_PROGRESS
**Slice status:** PHASE_08A=DONE

## Phase 08B1 opening state (historical)

```text
CURRENT_PHASE=08
PHASE_08=IN_PROGRESS
PHASE_08A=DONE
LNG_08_001=DONE
LNG_08_002=DONE
LNG_08_003=IN_PROGRESS
LNG_08_004=PLANNED
LNG_08_005=PLANNED
LNG_08_006=PLANNED
LNG_08_007=PLANNED
LNG_08_008=PLANNED
PHASE_09=BLOCKED_BY_PHASE_08
PHASE_10=BLOCKED_BY_PHASE_08
OWNER_VISUAL_ACCEPTANCE_08B1=PENDING
BACKEND_BRANCH=phase-08b1-library-search
FRONTEND_BRANCH=phase-08b1-library-search
WORKSPACE_BRANCH=phase-08b1-library-search
```

The Phase 08B1 implementation branches start from the pinned clean Phase 08A
baselines. Stitch design references are recorded in the Phase 08B1 evidence
once the dedicated project screens are generated and inspected.

Phase 08A implements only `LNG-08-001` (provenance and license model) and
`LNG-08-002` (core resource schema and review lifecycle). The phase is not
complete: search, contribution UX, reviewer UI, importer work, Phase 06
candidate consumption, reputation, moderation UI, and deployment remain
planned.

## Implemented foundation

- `library_licenses` is a normalized registry with stable keys, canonical
  URLs, attribution and redistribution flags, derivative constraints, active
  state, and internal source-note metadata.
- `library_resources` owns the canonical ID, resource family, language/level,
  topics, creator boundary, visibility/moderation state, review state, and
  review timestamps.
- Ten resource families use type-specific tables: vocabulary, sentence,
  translation, grammar item, dialogue, idiom, slang, cultural note,
  pronunciation, and learning collection.
- `library_resource_provenance` stores additive source records with typed
  source post/response/candidate/acceptance references for future Phase 06
  integration. The uniqueness scope is resource + source type + source ID;
  conflicting duplicate attribution is rejected rather than overwritten.
- Member `ORIGINAL_AUTHOR` provenance is bound internally to the authenticated
  actor's user ID; a caller-supplied different contributor ID is rejected.
  Reviewer/admin source flows remain explicitly authorized, while the internal
  contributor ID is omitted from public projection.
- Review states are exactly `DRAFT`, `COMMUNITY_REVIEW`, `VERIFIED`, and
  `REJECTED`. Submission, reviewer verification/rejection, verified-item
  invalidation, and reviewer-only `REOPEN` are explicit transitions in an
  append-only audit table. Provenance is creator-editable only in `DRAFT`,
  reviewer-correctable while remaining in `COMMUNITY_REVIEW`, and immutable
  after verification or rejection until `REOPEN` returns the resource to
  `DRAFT`. `REOPEN` requires a reviewer, an audit note, and clears review
  metadata; it never makes content public automatically. No
  `IMPORTED_UNREVIEWED` state is needed because Phase 08A performs no import.
- `library_resources.provenance_revision` is an internal non-negative revision
  used with expected review state for provenance mutations and every review
  transition. Migration 0009 also adds a parent-row-locking provenance trigger
  that rejects mutation in `VERIFIED`/`REJECTED`, prevents resource moves, and
  increments the revision atomically. Stale mutations and reviews return a
  deterministic review conflict; reviewers must reload after a provenance
  correction. The creator remains frozen during `COMMUNITY_REVIEW` even when
  holding a moderator/admin role.
- Public projection is fail-closed: only public, active, verified resources
  with non-empty provenance whose every current registry license is both
  `active=true` and explicitly `redistributionAllowed=true` are returned.
  License registry changes are re-evaluated at verification and public-read
  time. Review notes, reviewer identity, moderation state, contributor IDs,
  import batches, and transformation history are excluded from the public
  projection; only safe source/license/attribution fields remain.
- Quality scoring is intentionally deferred: no scoring policy or authority
  exists in Phase 08A, so no ungrounded score is stored or exposed.

## Compatibility and boundaries

Phase 06 candidate provenance retains source post ID, source response ID,
candidate ID, acceptance ID, and an internal contributor reference. A normal
`MEMBER` may attach only `ORIGINAL_AUTHOR`; system/reviewer-owned source types
remain restricted in 08A. Phase 06 attachment requires the complete coherent
candidate/post/response/acceptance bundle, an active pending canonical
candidate, and matching source IDs. A 0009-owned database trigger and service
validation reject mismatches, unrelated Phase 06-only fields, and invalidated
candidates. Phase 08A does not consume or promote candidates and does not
treat asker acceptance as verification.

Migration `0009_open_language_library.sql` and its down migration contain the
review `REOPEN` action, Phase 06 source-coherence trigger, REOPEN-note
constraint, provenance revision column/check, and provenance mutation
state/revision guard. Migration 0009 was applied successfully to the
authorized Neon TEST database under separate explicit authorization; its
second migration-run check previously reported all migrations up to date, and
the migration runner was not rerun during the runtime retest. The current
runner-normalized 0009 checksum is
`bf178d001a863ac6b1e3ad1c679eef616af699ae5c00646ce26ec779823f9e32`, and
migrations 0001-0008 remained unchanged. Production was untouched, no
frontend files were changed, and nothing was deployed.

## Verification

- Focused library suite: 68 tests passed, including actor binding, creator-
  moderator freeze, revision conflicts, and deterministic provenance/review
  race coverage.
- Full backend unit suite: 199 tests passed.
- Backend e2e suite: 49 tests passed, including the new four-test library HTTP
  suite on the supported memory test runtime. Coverage includes session-bound
  actors, CSRF, source authority, owner/IDOR boundaries, submit/review/self-
  verification, public draft/rejected/safe-license behavior, privacy, and
  invalid mutation fields.
- Typecheck/lint/build passed.
- `npm audit --audit-level=high`: 0 vulnerabilities.
- Migration contract tests freeze canonical normalized checksums for
  migrations 0001-0009 and retain down-migration coverage; the migration files
  themselves remained unchanged.

The earlier implementation-review snapshot required external review and fresh
Neon TEST migration authorization; that historical gate is superseded by the
authorized runtime retest and final publication evidence below. Phase 08
remains `IN_PROGRESS`, Phase 09/10 remain blocked, and no 08B implementation
has started.

## Final Phase 08A publication evidence

```text
PHASE_08A=DONE
CURRENT_PHASE=08
PHASE_08=IN_PROGRESS
LNG_08_001=DONE
LNG_08_002=DONE
LNG_08_003=PLANNED
LNG_08_004=PLANNED
LNG_08_005=PLANNED
LNG_08_006=PLANNED
LNG_08_007=PLANNED
LNG_08_008=PLANNED
PHASE_09=BLOCKED_BY_PHASE_08
PHASE_10=BLOCKED_BY_PHASE_08
BLOCKER-05D-001=OPEN
NEXT_SLICE=08B
NEXT_ACTION=STOP
```

- Backend main was published at `ef66c1c1ef259aee93fbb9dc8281de88f8fbfccd`.
  Exact Backend CI run `35680146545` completed successfully with Lint, Type
  check, Unit tests, End-to-end tests, Build, and Security audit all passing.
- The prior exact-SHA CI failure `35679027827` was solely the migration
  checksum test hashing platform-dependent CRLF bytes. The remediation keeps
  migration files unchanged and makes `library.migration.spec.ts` use the
  same CRLF/CR-to-LF normalization as `database/migrate.cjs`. Canonical 0009
  checksum remains the value recorded above.
- Neon TEST 0009 application and the real PostgreSQL runtime retest passed;
  no migration was rerun during the retest. The review lifecycle, provenance
  revision, database provenance guard, race reconciliation, creator-moderator
  freeze, member actor binding, Phase06 coherence/invalidation/revocation,
  license fail-closed behavior, REOPEN, public privacy, and disposable TEST
  cleanup all passed.
- Final local regression evidence: 203 unit tests passed, 45 focused library
  tests passed, 49 full E2E tests passed, and 4 library HTTP E2E tests passed;
  typecheck, lint, build, `npm audit` (0 vulnerabilities), and diff-check
  passed.
- Frontend remained unchanged at `3b8d5adeca6735d7b41c055a99e0040d8f36d35`.
  Production was untouched, deployment was `NO`, and 08B remains planned only.

## Phase 08B1 implementation handoff — LNG-08-003

```text
CURRENT_PHASE=08
PHASE_08=IN_PROGRESS
PHASE_08A=DONE
LNG_08_001=DONE
LNG_08_002=DONE
LNG_08_003=DONE
LNG_08_004=PLANNED
LNG_08_005=PLANNED
LNG_08_006=PLANNED
LNG_08_007=PLANNED
LNG_08_008=PLANNED
OWNER_VISUAL_ACCEPTANCE_08B1=YES
MIGRATION_APPLIED=YES (NEON_TEST_ONLY; PRE-EXISTING AUTHORIZED APPLICATION)
TEST_DB_MUTATED=NO
PRODUCTION_DB_MUTATED=NO
DEPLOYED=NO
NEXT_ACTION=STOP
```

Phase 08B1 adds the public search contract `GET /api/v1/library/resources`
with `q`, `language`, `type`, `topic`, `level`, opaque cursor, and bounded
limit parameters. Search and detail share the fail-closed public gate:
`PUBLIC`, active moderation, `VERIFIED`, non-empty provenance, and every
current license active with `redistributionAllowed=true`. The in-memory and
Postgres repositories use Unicode-preserving matching and deterministic
`updated_at DESC, id DESC` cursor ordering. Current-license changes are
rechecked during projection, and search results omit internal creator,
reviewer, moderation, import, transformation, and Phase 06 metadata.

The frontend adds responsibility-based Library API/hooks/components/pages with
CSS Modules, URL-backed filters, mixed resource rows, attribution/license
cues, loading/error/empty states, opaque-cursor load-more, read-only detail,
and a keyboard-managed mobile filter drawer. No contribution form was added.

Stitch references and inspected rasters are recorded in
`evidence/PHASE-08B1-IMPLEMENTATION-PLAN.md` and
`evidence/PHASE-08B1-STITCH-*.png`. Final verification details, exact test
counts, browser viewport metrics, accessibility results, and migration status
are recorded in `evidence/PHASE-08B1-IMPLEMENTATION.md`.

External review remediation is recorded in the same evidence file. It fixes
the ordered-query cursor boundary/hydration race, aligns in-memory keyword
semantics with PostgreSQL, and changes keyword candidates to a materialized,
parameterized relation joined to the public query. Its `UNION ALL` branches
are deduplicated inside the candidate relation so the frozen 0010 trigram
indexes are planner-usable. The authorized 0010 application remains frozen on
Neon TEST; no 0011 was created. The mobile drawer now has stable focus across
filter changes and exact body overflow restoration; topic edits apply on Enter
or blur. Final implementation captures are stored beside the Stitch
references with their 1440x900 and 390x900 viewport dimensions. Owner visual
acceptance was granted and the slice is now published as
`LNG_08_003=DONE`.

## Phase 08B1 final publication evidence

```text
OWNER_VISUAL_ACCEPTANCE_08B1=YES
BACKEND_MAIN_SHA=850b0b0a36869effdad4b89063b1cc2a74bfe1e0
BACKEND_CI_RUN=35945221151
BACKEND_CI=SUCCESS
FRONTEND_MAIN_SHA=4137f51e392f8aa947768e7dc7a28a29bf64f206
FRONTEND_CI_RUN=35945346637
FRONTEND_CI=SUCCESS
WORKSPACE_REVIEW_BASE_SHA=b1082522d49ed48b8bd9fe087ddf7d150cdddec2
WORKSPACE_MAIN_SHA=3f863780cdfc38bd53d65da85ba630127ccb7f08
CURRENT_PHASE=08
PHASE_08=IN_PROGRESS
LNG_08_003=DONE
LNG_08_004=PLANNED
MIGRATION_0010_TEST=APPLIED
MIGRATION_0010_FROZEN=YES
MIGRATION_0010_CHECKSUM_MATCH=YES
MIGRATION_RERUN=NO
MIGRATION_0011_REQUIRED=NO
PRODUCTION_DB_MUTATED=NO
DEPLOYED=NO
NEXT_SLICE=08B2
NEXT_TASK=LNG_08_004
NEXT_ACTION=STOP
```

The published slice includes the public Knowledge Explorer `/library` and
resource detail `/library/:resourceId`, multilingual keyword search,
primary/secondary language and type/topic/CEFR filters, deterministic cursor
pagination, URL-backed state, accessible mobile filtering, responsive
320/375/390/412/768/1024/1440 coverage, and Accessibility 100. Public gates,
privacy, dynamic license fail-closed behavior, DB-backed HTTP search,
validation 4xx, and materialized keyword/trigram planner evidence remain
recorded in the implementation evidence.

## Phase 08B2A implementation handoff - LNG-08-004 foundation

```text
PHASE_08B2A_IMPLEMENTATION=PASS
CURRENT_PHASE=08
PHASE_08=IN_PROGRESS
LNG_08_001=DONE
LNG_08_002=DONE
LNG_08_003=DONE
LNG_08_004=VERIFYING
LNG_08_005=PLANNED
LNG_08_006=PLANNED
LNG_08_007=PLANNED
LNG_08_008=PLANNED
BACKEND_BRANCH=phase-08b2a-community-contribution
BACKEND_BASE_SHA=816d9962d2af145211aff2694ef9e474535ab3c6
BACKEND_SHA=80df2dd0652c3fba024caf1224917e73b609a1d7
FRONTEND_CHANGED=NO
FRONTEND_SHA=4137f51e392f8aa947768e7dc7a28a29bf64f206
WORKSPACE_BRANCH=phase-08b2a-community-contribution
WORKSPACE_REVIEW_HEAD_BEFORE_REMEDIATION=32a5f2cb782a78e147fec35bb9fa407726c4e3e2
WORKSPACE_INTERMEDIATE_IMPLEMENTATION_SHA=53569cfb79fbeea2809b7ed78d48f82f9616202 (historical foundation commit; not the current review head)
WORKSPACE_REMEDIATION_COMMIT_SHA=6e56adfc5e9882e936f764c51410e27e869b5b5a
MIGRATION_REQUIRED=YES
MIGRATION_FILE=database/migrations/0011_library_contribution_events.sql
MIGRATION_APPLIED=YES (NEON_TEST_ONLY; 0011 authorized in the runtime gate)
TEST_DB_MUTATED=YES (0011 schema only; disposable verification rows cleaned)
PRODUCTION_DB_MUTATED=NO
DEPLOYED=NO
OWNER_VISUAL_ACCEPTANCE_08B2=PENDING_NOT_STARTED
NEXT_SLICE=08B2B
NEXT_ACTION=STOP_FOR_FRONTEND_STITCH_IMPLEMENTATION_GATE
```

The 08B2A backend foundation adds a public fail-closed contribution-policy
contract, owner-bound consent validation, PUBLIC DRAFT to COMMUNITY_REVIEW
submission, and a bounded durable contribution event written atomically with
the normal review audit. The external review remediation closes the generic
review bypass for VOCABULARY, SENTENCE, and TRANSLATION, moves provenance and
license eligibility checks plus `FOR SHARE` license locks inside the submission
transaction, requires ACTIVE moderation state, and hydrates the response before
commit. The authorized runtime gate applied only migration 0011 to Neon TEST
and verified the real PostgreSQL contribution path; it did not award Phase 10
points, change Frontend source, use Stitch, merge, deploy, or touch
production. Full local and Neon TEST evidence is recorded in
`evidence/PHASE-08B2A-IMPLEMENTATION.md`.

## Phase 08B2B frontend implementation handoff — LNG-08-004

```text
CURRENT_PHASE=08
PHASE_08=IN_PROGRESS
LNG_08_001=DONE
LNG_08_002=DONE
LNG_08_003=DONE
LNG_08_004=DONE
LNG_08_005=PLANNED
LNG_08_006=PLANNED
LNG_08_007=PLANNED
LNG_08_008=PLANNED
FRONTEND_BRANCH=phase-08b2b-community-contribution-ui
BACKEND_SHA=80df2dd0652c3fba024caf1224917e73b609a1d7
BACKEND_MAIN_SHA=80df2dd0652c3fba024caf1224917e73b609a1d7
BACKEND_CI_RUN=35976930338
BACKEND_CI=SUCCESS
FRONTEND_BASE_SHA=4137f51e392f8aa947768e7dc7a28a29bf64f206
BACKEND_CHANGED=NO
MIGRATION_0011_TEST=APPLIED
MIGRATION_0011_FROZEN=YES
MIGRATION_0011_CHECKSUM_MATCH=YES
MIGRATION_RERUN=NO
MIGRATION_0012_CREATED=NO
FRONTEND_SHA=a46194853b4da7cfa8d41d6e155f92ab908c4ff4
FRONTEND_MAIN_SHA=a46194853b4da7cfa8d41d6e155f92ab908c4ff4
FRONTEND_CI_RUN=35977132211
FRONTEND_CI=SUCCESS
OWNER_VISUAL_ACCEPTANCE_08B2=YES
TEST_DB_MUTATED=NO
PRODUCTION_DB_MUTATED=NO
DEPLOYED=NO
NEXT_SLICE=08C
NEXT_TASK=LNG_08_005
NEXT_SCOPE=Review & Verification Workflow
NEXT_ACTION=STOP
```

08B2B adds the authenticated `/library/contribute` route and a quiet Library
Explorer entry. It consumes the frozen Backend policy contract, renders only
policy-approved types and contribution-safe licenses, requires explicit public
attribution and two unchecked consents, and submits through the three-stage
create → ORIGINAL_AUTHOR provenance → contribution-submit sequence. Remote
stage retries retain the same resource ID and freeze the attempt snapshot;
success remains `COMMUNITY_REVIEW` only and does not link to public detail.

Stitch references, final implementation captures, responsive widths,
Lighthouse accessibility, tests, and failure-state behavior are recorded in
`evidence/PHASE-08B2B-IMPLEMENTATION.md` and the companion plan. Owner visual
acceptance was granted externally. The external review remediation also
corrects topic-step validation/focus, focuses the real success landmark,
targets the first license radio for license errors, and suppresses generic
retry after a permanent license-policy change without creating a duplicate
draft. Backend, migrations, Neon TEST data, production, and deployment were
not changed in the Frontend slice.

## Phase 08B2 final publication closure

Backend main was fast-forwarded from the canonical main baseline to
`80df2dd0652c3fba024caf1224917e73b609a1d7` and passed exact-SHA CI run
`35976930338` (lint, typecheck, unit tests, E2E, build, and security audit).
Frontend main was then fast-forwarded to
`a46194853b4da7cfa8d41d6e155f92ab908c4ff4` and passed exact-SHA CI run
`35977132211` (tests, typecheck, lint, build, and security audit).

The published 08B2 evidence includes the policy API, approved contribution
types, terms version, PUBLIC DRAFT to COMMUNITY_REVIEW lifecycle, generic
review bypass closure, actor-bound ORIGINAL_AUTHOR provenance, fail-closed
license and moderation gates, explicit rights/reuse consent, durable v1
contribution event, atomicity, idempotency, Neon TEST runtime verification,
license locking, provenance race protection, HTTP DB-backed success, DB
constraints, contribution UI, retry behavior, stale-terms re-consent,
permanent license-policy failure handling, focus remediation, responsive
coverage, and Lighthouse Accessibility 100.

Migration 0011 remains applied on Neon TEST and frozen with matching checksums;
it was not rerun, migration 0012 was not created, production was untouched,
and no deployment occurred. Phase 08 remains in progress, LNG-08-004 is DONE,
and the next planned slice is 08C / LNG-08-005, Review & Verification Workflow.

## Phase 08C1A reviewer backend implementation handoff - LNG-08-005

```text
CURRENT_PHASE=08
PHASE_08=IN_PROGRESS
LNG_08_001=DONE
LNG_08_002=DONE
LNG_08_003=DONE
LNG_08_004=DONE
LNG_08_005=VERIFYING
LNG_08_006=PLANNED
LNG_08_007=PLANNED
LNG_08_008=PLANNED
BACKEND_BRANCH=phase-08c1a-library-review-backend
FRONTEND_CHANGED=NO
FRONTEND_SHA=a46194853b4da7cfa8d41d6e155f92ab908c4ff4
REQUEST_CHANGES=NOT_IMPLEMENTED_BY_DESIGN
MIGRATION_REQUIRED=NO
MIGRATION_FILE=NONE
MIGRATION_APPLIED=NO
MIGRATION_0012_CREATED=NO
SOURCE_INVALIDATION_08C1B=PENDING
OWNER_VISUAL_ACCEPTANCE_08C=PENDING_NOT_STARTED
TEST_DB_MUTATED=NO
PRODUCTION_DB_MUTATED=NO
DEPLOYED=NO
NEXT_SLICE=08C1B
NEXT_ACTION=STOP_FOR_EXTERNAL_REVIEW
```

08C1A adds the reviewer-only `GET /api/v1/library/reviews` queue with fixed
`COMMUNITY_REVIEW` scope, bounded language/type/keyword/cursor/limit filters,
opaque filter-bound pagination, and deterministic `updated_at ASC, id ASC`
ordering. `GET /api/v1/library/reviews/:resourceId` exposes a reviewer-safe
detail projection with canonical content, audit history, safe current license
eligibility, attribution/source references, and contribution-event summary;
email, authentication/session data, license `sourceNote`, contributor user
IDs in event summaries, importer internals, and unrelated moderation metadata
are excluded.

The existing review endpoint remains the action surface. VERIFY and REJECT
are reviewer-only; REJECT requires a note; creator self-verification remains
denied even for MODERATOR/ADMIN. The existing INVALIDATE/REOPEN lifecycle is
preserved, while Request Changes is intentionally not introduced.

Postgres VERIFY and REJECT transitions now lock the resource boundary and
hydrate the final resource through the same transaction before COMMIT. VERIFY
rechecks current provenance, ACTIVE moderation, and current license rows with
`FOR SHARE`; audit insertion, eligibility failure, hydration failure, and stale
review boundaries roll back as one unit. The first committed concurrent action
wins and a stale terminal action returns `LIBRARY_REVIEW_CONFLICT`.

No migration was required: the existing 0009 review-state/order index covers
the queue query, and migrations 0001-0011 remain unchanged. Neon TEST was not
connected to or mutated, production was untouched, no deployment occurred,
and Frontend source remained unchanged. Dynamic source invalidation is
explicitly deferred to 08C1B. Full evidence is in
`evidence/PHASE-08C1A-IMPLEMENTATION.md`.

## Phase 08C1B Phase 06 source health and reconciliation - LNG-08-005

```text
CURRENT_PHASE=08
PHASE_08=IN_PROGRESS
LNG_08_001=DONE
LNG_08_002=DONE
LNG_08_003=DONE
LNG_08_004=DONE
LNG_08_005=VERIFYING
LNG_08_006=PLANNED
LNG_08_007=PLANNED
LNG_08_008=PLANNED
BACKEND_BRANCH=phase-08c1b-library-source-invalidation
BACKEND_BASE_SHA=82e3f66b88232e64ef71dc68d8a1c5f63a115257
BACKEND_SHA=6ef7276461bab7c1781c668e00ec25e7920bd7e1
FRONTEND_CHANGED=NO
FRONTEND_SHA=a46194853b4da7cfa8d41d6e155f92ab908c4ff4
WORKSPACE_BRANCH=phase-08c1b-library-source-invalidation
WORKSPACE_BASE_SHA=989c96825b47da7ae8fee122c717c6842d1540b0
08C1A_RUNTIME=PASS
SOURCE_INVALIDATION_08C1B=IMPLEMENTED_PENDING_EXTERNAL_REVIEW_REMEDIATION
TRANSACTIONAL_AUDIT_REASON=PASS
INVALID_QUEUE_LOGICAL_PAGINATION=PASS
INVALID_QUEUE_EMPTY_INTERMEDIATE_PAGE=NO
INVALID_QUEUE_NO_DUPLICATES=PASS
INVALID_QUEUE_NO_SKIPS=PASS
MIGRATION_REQUIRED=NO
MIGRATION_FILE=NONE
MIGRATION_APPLIED=NO
MIGRATION_RERUN=NO
MIGRATIONS_0001_0011=UNCHANGED
MIGRATION_0012_CREATED=NO
TEST_DB_MUTATED=NO
PRODUCTION_DB_MUTATED=NO
DEPLOYED=NO
OWNER_VISUAL_ACCEPTANCE_08C=PENDING_NOT_STARTED
NEXT_SLICE=08C1B_RUNTIME
NEXT_ACTION=STOP_FOR_EXTERNAL_REVIEW_BEFORE_NEON_RUNTIME
```

08C1B adds a shared current Phase 06 source-health evaluator. It observes the
existing candidate, parent post, structured response, and current acceptance
semantics without mutating Phase 06 data. One invalid Phase 06 provenance entry
fails public detail and search closed immediately, even while the Library
resource remains `VERIFIED`; non-Phase06 provenance continues to use the
existing Library gates.

Reviewer projections now include safe source-health reason codes and
`SOURCE_INVALID` verification eligibility. The bounded reviewer-only
`GET /api/v1/library/reviews/source-invalid` queue discovers currently
`VERIFIED` resources whose current Phase 06 source is invalid. The dedicated
CSRF-protected `POST /api/v1/library/reviews/:resourceId/reconcile-source`
action transactionally rechecks the source and atomically writes
`VERIFIED -> COMMUNITY_REVIEW` with a normal reviewer `INVALIDATE` audit.
`LIBRARY_SOURCE_STILL_VALID` rejects stale invalidation observations; replay
after success returns `LIBRARY_REVIEW_CONFLICT` without a second audit.

VERIFY now locks and rechecks the resource, provenance, current license rows,
and referenced Phase 06 source rows inside the same PostgreSQL transaction
before allowing verification. Source-lock ordering is parent, response,
acceptance, candidate. VERIFY, REJECT, and reconciliation hydrate before
commit (`POST_COMMIT_REQUIRED_READS=0`); audit, source, conflict, and hydration
failures roll back atomically. No invalidation event table, worker, scheduler,
candidate consumption, Request Changes state, Phase 10 points, Frontend, Neon
TEST, production, or deployment was added.

Implementation and focused/full verification details are recorded in
`evidence/PHASE-08C1B-IMPLEMENTATION.md` and the companion plan. 08C1A
runtime remains `PASS`; 08C1B source invalidation is implemented and pending
external review. `LNG_08_005` remains `VERIFYING`.

## Phase 08C1B static runtime-failure remediation

The previous 08C1B Neon TEST runtime result remains recorded as
`PREVIOUS_NEON_RUNTIME=FAIL`; this remediation did not connect to Neon, run
migrations, mutate test data, deploy, or change Frontend. Backend review head
`6ef7276461bab7c1781c668e00ec25e7920bd7e1` was remediated and pushed as
`86c51f7b08a989db415e7c11361686fdf2379455` on
`phase-08c1b-library-source-invalidation`.

The confirmed defect was loss of PostgreSQL `timestamptz` microseconds in the
opaque `updated_at + id` cursor. Cursor version 2 now carries exact decimal
epoch microseconds, PostgreSQL compares the raw timestamp column against the
exact parameter boundary, and public search, reviewer queue, and invalid-source
queue share the same precision-safe contract. Invalid-source scan pages retain
ordered-row boundaries aligned with hydrated items. Static R1/R2/R3/R4/R5
coverage proves the logical pages are R2/R4 then R5 without duplicates/skips.

The source-lock implementation was not weakened: existing deterministic tests
still prove locks are acquired before VERIFY mutation and held until the final
pre-COMMIT hydration. Prior VERIFY/source race failures are classified as
runtime-harness defects requiring a transaction-aware Neon retest. The source
reason matrix failure is a gate-expectation defect because canonical candidate
invalidation dominates downstream acceptance/response causes. The auth failure
is a gate-expectation defect because Library mutations are bearer-authenticated;
cookie CSRF is conditional on an explicitly present refresh cookie. The privacy
failure is a gate-expectation defect caused by broad `userId` matching; exact
forbidden-key recursive checks now cover both reviewer projections.

Static remediation gates passed: 41 unit suites / 304 tests, 13 E2E suites /
58 tests, typecheck, lint, build, migration contracts, `git diff --check`, and
high-severity npm audit with zero vulnerabilities. Migrations 0001-0011 remain
unchanged; no 0012 exists or was applied. `LNG_08_005` remains `VERIFYING`,
`SOURCE_INVALIDATION_08C1B=PENDING`, and the next action is external review
before Neon runtime retest.

## Phase 08C1B corrected Neon TEST runtime retest

The previous runtime failure remains historical as
`PREVIOUS_NEON_RUNTIME=FAIL`. The corrected retest ran against only the
authorized existing Neon TEST database at Backend SHA
`86c51f7b08a989db415e7c11361686fdf2379455`; Frontend stayed unchanged at
`a46194853b4da7cfa8d41d6e155f92ab908c4ff4`. Safe metadata was recorded as
`neondb` / `neondb_owner` / PostgreSQL `18.6` / Neon with `sslmode=verify-full`.
No migration runner ran, no migration ledger or schema changed, production was
untouched, and no deployment occurred.

The runtime retest passed the exact PostgreSQL microsecond cursor contract:
v2 cursors preserved the R4 boundary, invalid-source pages returned R2/R4 then
R5, and public/reviewer pagination traversed sub-millisecond rows without
duplicates or skips. It also passed logical invalid-source pagination across
valid rows, concurrent reconciliation, public fail-closed reads, stale
invalidation denial, reconciliation idempotency, multi-source fail-closed
behavior, and non-Phase06 regression.

The transaction-aware VERIFY-first harness held the actual parent, response,
acceptance, and candidate source locks and observed the legitimate acceptance,
response-moderation, parent-visibility, and parent-moderation mutations waiting
on PostgreSQL row locks until VERIFY committed. Public reads then failed closed
after each source mutation. Source-health reason priority matched canonical
Phase 06 behavior, bearer authorization and explicit-cookie CSRF behavior were
verified, and exact forbidden-key privacy checks passed for invalid-source
queue and reviewer detail.

All uniquely marked disposable runtime fixtures were deleted and zero marked
users/resources/posts/licenses remained. Local post-runtime verification also
passed: focused 12 suites/106 tests, full unit 41 suites/304 tests, full E2E 13
suites/58 tests, migration contracts 4 suites/15 tests, typecheck, lint, build,
`git diff --check`, and high-severity npm audit with 0 vulnerabilities.

```text
NEON_RUNTIME_RETEST=PASS
TEST_DB_TARGET_VERIFIED=YES
VERIFY_HELD_REAL_SOURCE_LOCKS=YES
COMPETING_MUTATION_BLOCKED_BY_DB_LOCK=YES
TRANSACTIONAL_AUDIT_REASON_POSTGRES=PASS
SOURCE_RECONCILE_AUTH_HTTP=PASS
SOURCE_REVIEW_PRIVACY=PASS
POST_COMMIT_REQUIRED_READS=0
DISPOSABLE_TEST_CLEANUP=PASS
MIGRATION_REQUIRED=NO
MIGRATION_RERUN=NO
MIGRATION_0012_CREATED=NO
MIGRATIONS_0001_0011=UNCHANGED
MIGRATION_0011_CHECKSUM_MATCH=YES
MIGRATION_0011_UP_SHA256=556c9222004f909cc94738db592a7134a2b6bbd9fe6807d62adbc876b4e52a5a
MIGRATION_0011_DOWN_SHA256=436108a9e78fb5e3a5cf3f1a753b10a5cb756f7641f1c9d85f6ac1e80da13697
CURRENT_PHASE=08
PHASE_08=IN_PROGRESS
LNG_08_005=VERIFYING
SOURCE_INVALIDATION_08C1B=RUNTIME_PASS
OWNER_VISUAL_ACCEPTANCE_08C=PENDING_NOT_STARTED
NEXT_SLICE=08C2
NEXT_ACTION=STOP_FOR_REVIEWER_STITCH_UI_GATE
```

## 08C1B Neon TEST target precheck reconciliation

The later invocation reporting `TEST_DB_TARGET_VERIFIED=NO` was stopped before
feature runtime execution because the supplied Workspace review SHA did not
match the live review branch. This remains an environment/repository precheck
failure, not a code regression. The earlier corrected runtime PASS remains
canonical and is not overwritten.

```text
LATEST_FAILED_INVOCATION_CLASSIFICATION=ENVIRONMENT_PRECHECK_FAILURE
PRECHECK_FAILURE_REASON=WORKSPACE_REVIEW_HEAD_MISMATCH_BEFORE_DB_TARGET_CHECK
LATER_INVOCATION_PRECHECK=FAILED_BEFORE_RUNTIME
PREVIOUS_NEON_RUNTIME=FAIL
CORRECTED_NEON_RUNTIME_RETEST=PASS
TARGET_PRECHECK_RECONCILIATION=PASS
DATABASE_ENV_PRESENT=YES
TEST_DB_TARGET_VERIFIED=YES
DATABASE_NAME=neondb
DATABASE_ROLE=neondb_owner
POSTGRES_VERSION=PostgreSQL 18.6
NEON_TARGET=YES
SSL_VERIFIED=YES (client sslmode=verify-full; Neon backend pg_stat_ssl reported false on the proxy-side session)
MIGRATION_LEDGER_0001_0011=PASS
MIGRATION_LEDGER_READ_ONLY=YES
DATABASE_WRITES=0
MIGRATION_RERUN=NO
MIGRATION_0012_CREATED=NO
```

The exact Backend, Frontend, Workspace review, and main-baseline heads were
verified clean. The configured `.env` path resolved `DATABASE_URL` to the
authorized Neon TEST target; credentials and connection strings were not
printed. A read-only ledger query confirmed exactly migrations 0001-0011.
No fixtures, source mutations, reconciliation, migration commands, or other
database writes occurred. No second feature runtime retest is required solely
because the later invocation failed before target verification.

## Phase 08C2 reviewer UI implementation handoff

This append-only section records the reviewer UI slice. It does not close
`LNG_08_005`; owner visual acceptance remains external and pending.

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
CURRENT_PHASE=08
PHASE_08=IN_PROGRESS
LNG_08_005=VERIFYING
OWNER_VISUAL_ACCEPTANCE_08C=PENDING
NEXT_ACTION=STOP_FOR_EXTERNAL_AND_OWNER_VISUAL_REVIEW
```

The existing Stitch project was used with Prompt C before implementation. The
six inspected screens are recorded in
`evidence/PHASE-08C2-IMPLEMENTATION-PLAN.md`. Unsupported Request Changes and
duplicate-similarity UI were intentionally omitted because neither exists in
the accepted backend contract.

Frontend adds `/library/review` and `/library/review/:resourceId` inside the
Library feature, with pending and source-invalid views, opaque cursor filters,
MODERATOR/ADMIN role gating, safe login return paths, reviewer-only Library
entry, content-first detail, source-health/license/provenance evidence,
contribution event/audit history, Verify/Reject actions, and source
reconciliation. All transport uses the existing `useAuth().api` bearer path;
no token store or cookie-only auth was added. Backend remains authoritative for
eligibility, conflicts, self-verification, source health, and public exposure.

The implementation captures are stored at the six `PHASE-08C2-*.png` paths in
the evidence directory. The accepted browser verification passed the
320/375/390/412/768/1024/1440 responsive matrix, and Lighthouse Accessibility
returned 100 for queue desktop, detail desktop, and detail mobile. The
remediation reran live detail, attribution, guidance-copy, and keyboard-focus
checks with a corrected disposable fixture; no Backend or Neon runtime was
used.

Frontend verification passed 4 focused reviewer test files / 19 tests and the
full 46-file / 218-test suite, typecheck, lint, build, high-severity npm audit
(0 vulnerabilities), and diff-check. Backend integration smoke is recorded as
`BLOCKED` because this UI slice did not start a local backend and explicitly
did not connect to Neon TEST; no backend runtime result is implied.

Accepted backend/runtime evidence remains unchanged:

```text
08C1A_RUNTIME=PASS
08C1B_RUNTIME_RETEST=PASS
08C1B_TARGET_PRECHECK_RECONCILIATION=PASS
```

## Phase 08C2 external review remediation

Before owner visual acceptance, the reviewer UI received a focused remediation
on `phase-08c2-library-reviewer-ui`. The Frontend commit is
`8ffab694cf5e024b24ca5e881405d2c50ba491e5`; Backend remains frozen at
`86c51f7b08a989db415e7c11361686fdf2379455`, with no Neon TEST or migration
activity in this remediation.

```text
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
RESPONSIVE_MATRIX=PASS (320/375/390/412/768/1024/1440)
ACCESSIBILITY=100 (existing Lighthouse queue/detail evidence; browser focus/detail checks rerun)
CURRENT_PHASE=08
PHASE_08=IN_PROGRESS
LNG_08_005=VERIFYING
OWNER_VISUAL_ACCEPTANCE_08C=PENDING
TEST_DB_MUTATED=NO
PRODUCTION_DB_MUTATED=NO
DEPLOYED=NO
NEXT_ACTION=STOP_FOR_EXTERNAL_AND_OWNER_VISUAL_REVIEW
```

The conflict path closes the mutation dialog, never repeats Verify/Reject/
Reconcile, refreshes the detail once, and exposes `Tải lại chi tiết` if the
refresh fails. Self-verification remains a safe same-detail error with an
explicit reload path. Separate Verify, Reject, and Reconcile trigger refs now
restore keyboard focus to the correct opener on Cancel and Escape. License
evidence includes nullable `attributionRequired` using Có/Không/Chưa xác định,
and the internal Request Changes lifecycle copy was replaced with neutral
review guidance without adding a Request Changes action. Affected implementation
captures were regenerated for detail desktop/mobile, Reject, Reconcile, and
source-invalid states. Owner visual acceptance remains pending.

## Phase 08C2 external review remediation #2

`EXTERNAL_REVIEW_REMEDIATION_2=PASS` is recorded on the existing reviewer UI
branch. This remediation preserves the mounted detail during same-resource
background GET refreshes while retaining the action/conflict/source-still-valid
notice and intentional status focus. Initial load failure remains ErrorState;
background refresh failure preserves stale detail and provides `Tải lại chi
tiết`; changing the route resource ID clears the old detail before the new
Skeleton/load cycle.

```text
FRONTEND_REMEDIATION_2_COMMIT=cfe5576
PAGE_BACKGROUND_REFRESH_TEST=PASS
PAGE_CONFLICT_REFRESH_TEST=PASS
PAGE_SOURCE_STILL_VALID_REFRESH_TEST=PASS
PAGE_REFRESH_FAILURE_TEST=PASS
RESOURCE_ID_CHANGE_RESETS_DETAIL=PASS
ACTION_NOTICE_SURVIVES_REFRESH=PASS
VERIFY_SUCCESS_FOCUS=PASS
REJECT_SUCCESS_FOCUS=PASS
RECONCILE_SUCCESS_FOCUS=PASS
REVIEW_CONFLICT_NOTICE_SURVIVES_REFRESH=PASS
REVIEW_CONFLICT_MUTATION_RETRY=NO
SOURCE_STILL_VALID_NOTICE_SURVIVES_REFRESH=PASS
BACKGROUND_REFRESH_PRESERVES_DETAIL=PASS
BACKGROUND_REFRESH_FAILURE_PRESERVES_DETAIL=PASS
BACKGROUND_REFRESH_RETRY_AVAILABLE=PASS
INITIAL_LOAD_SKELETON=PASS
INITIAL_LOAD_FAILURE=PASS
FOCUSED_REVIEW_TESTS=PASS (5 files, 26 tests)
FRONTEND_TESTS=PASS (47 files, 225 tests)
TYPECHECK=PASS
LINT=PASS
BUILD=PASS
AUDIT=PASS (0 vulnerabilities at --audit-level=high)
GIT_DIFF_CHECK=PASS
ACCESSIBILITY=100
BACKEND_INTEGRATION_SMOKE=BLOCKED (accepted Backend not started locally; Neon TEST out of scope)
MIGRATION_REQUIRED=NO
MIGRATION_RERUN=NO
MIGRATION_0012_CREATED=NO
TEST_DB_MUTATED=NO
PRODUCTION_DB_MUTATED=NO
DEPLOYED=NO
CURRENT_PHASE=08
PHASE_08=IN_PROGRESS
LNG_08_005=VERIFYING
OWNER_VISUAL_ACCEPTANCE_08C=PENDING
NEXT_ACTION=STOP_FOR_FINAL_EXTERNAL_AND_OWNER_VISUAL_REVIEW
```

Previous remediation history and the accepted Backend/runtime evidence remain
unchanged. No Frontend visual redesign, Backend change, Neon access, migration,
deployment, or owner acceptance occurred in this remediation.

## Phase 08C owner visual acceptance

The owner explicitly accepted the Phase 08C reviewer experience on
`2026-09-28`. This acceptance covers the pending reviewer queue, reviewer
detail desktop, reviewer detail mobile, source-invalid view, Reject action
dialog, and source reconciliation dialog. The canonical Stitch references
and implementation screenshot evidence remain preserved in the Phase 08C2
evidence directory.

```text
OWNER_VISUAL_ACCEPTANCE_08C=YES
OWNER_VISUAL_ACCEPTANCE_DATE=2026-09-28
ACCEPTED_FRONTEND_SHA=cfe55763318ac47ac8bc6047aa747c0f353bafcb
ACCEPTED_BACKEND_SHA=86c51f7b08a989db415e7c11361686fdf2379455
ACCEPTED_VISUALS=pending reviewer queue; reviewer detail desktop; reviewer detail mobile; source-invalid view; Reject action dialog; source reconciliation dialog
STITCH_EVIDENCE_PRESERVED=YES
IMPLEMENTATION_SCREENSHOT_EVIDENCE_PRESERVED=YES
LNG_08_005=VERIFYING
```

## Phase 08C final publication closure

Owner visual acceptance was explicitly granted before publication. The accepted
reviewer experience covers the pending queue, reviewer detail on desktop and
mobile, source-invalid view, Reject action dialog, and source reconciliation
dialog. The accepted Stitch IDs and implementation screenshot evidence remain
preserved above and in the Phase 08C2 evidence directory.

08C1A delivered the reviewer queue/detail read model and atomic VERIFY/REJECT
actions, with real Neon TEST runtime PASS. 08C1B delivered dynamic Phase 06
source health, public fail-closed reads, invalid-source discovery and
reconciliation, microsecond-safe pagination, and transaction-aware source
races, with corrected runtime PASS. 08C2 delivered the reviewer UI, Verify /
Reject actions, source reconciliation UI, responsive coverage from 320 through
1440, Accessibility 100, and owner visual acceptance.

```text
PHASE_08C_PUBLICATION=PASS
OWNER_VISUAL_ACCEPTANCE_08C=YES
BACKEND_MAIN_SHA=86c51f7b08a989db415e7c11361686fdf2379455
BACKEND_CI_RUN=36369515389
BACKEND_CI_STATUS=SUCCESS
FRONTEND_MAIN_SHA=cfe55763318ac47ac8bc6047aa747c0f353bafcb
FRONTEND_CI_RUN=36369685714
FRONTEND_CI_STATUS=SUCCESS
SOURCE_INVALIDATION_08C1B=RUNTIME_PASS
REQUEST_CHANGES=NOT_IMPLEMENTED_BY_DESIGN
BACKEND_INTEGRATION_SMOKE=BLOCKED
```

`BACKEND_INTEGRATION_SMOKE=BLOCKED` remains accurate because the accepted
Backend itself passed the real Neon TEST runtime gates and the accepted
Frontend contract/test coverage passed; no unperformed local integrated smoke
is claimed. This does not block closure.

```text
MIGRATION_REQUIRED=NO
MIGRATION_RERUN=NO
MIGRATION_0012_CREATED=NO
TEST_DB_MUTATED=NO
PRODUCTION_DB_MUTATED=NO
DEPLOYED=NO
CURRENT_PHASE=08
PHASE_08=IN_PROGRESS
LNG_08_001=DONE
LNG_08_002=DONE
LNG_08_003=DONE
LNG_08_004=DONE
LNG_08_005=DONE
LNG_08_006=PLANNED
LNG_08_007=PLANNED
LNG_08_008=PLANNED
NEXT_TASK=LNG_08_006
NEXT_ACTION=STOP_FOR_TATOEBA_LICENSE_VALIDATION_PLAN
```

## Phase 08D1 — Tatoeba license/export validation handoff

The research-only validation is recorded in
`evidence/PHASE-08D1-TATOEBA-LICENSE-VALIDATION.md`. Current authoritative
Tatoeba terms and export/API documentation support conditional commercial text
reuse, but bulk downloads expose per-sentence license and owner facts only
partially. The API must be part of the bounded, fail-closed 08D2 importer plan.
No corpus was downloaded and no application or database was changed.

```text
PHASE_08D1_TATOEBA_LICENSE_VALIDATION=PASS
TATOEBA_ADAPTER_DECISION=NEEDS_REMEDIATION
BACKEND_MAIN_SHA=86c51f7b08a989db415e7c11361686fdf2379455
FRONTEND_MAIN_SHA=cfe55763318ac47ac8bc6047aa747c0f353bafcb
WORKSPACE_MAIN_SHA=4d027b30e00b43bf1dbbc0d8ba6aa6e54f6cff7c
BACKEND_CHANGED=NO
FRONTEND_CHANGED=NO
DATASET_DOWNLOADED=NO
TEST_DB_MUTATED=NO
PRODUCTION_DB_MUTATED=NO
DEPLOYED=NO
CURRENT_PHASE=08
PHASE_08=IN_PROGRESS
LNG_08_006=VERIFYING
LNG_08_007=PLANNED
LNG_08_008=PLANNED
NEXT_ACTION=STOP_FOR_08D2_IMPORTER_IMPLEMENTATION_PLAN
```

`LNG_08_006` is intentionally not marked `DONE` or `READY`. The existing
schema is sufficient without a migration when Tatoeba is represented through
the `OPEN_DATASET` source type and provider-qualified source IDs. The next
bounded task is the 08D2 importer implementation plan; it must not start
ingestion until the license/status enrichment and idempotency contract is
accepted.

## Phase 08D1 closure reconciliation

The current Workspace task/state files now agree with the accepted validation:
the research gate passed, while importer design remediation remains. This is
not an external legal blockage and does not authorize importer implementation.

```text
PHASE_08D1_TATOEBA_LICENSE_VALIDATION=PASS
TATOEBA_ADAPTER_DECISION=NEEDS_REMEDIATION
LNG_08_006=VERIFYING
TATOEBA_IMPORT_LIFECYCLE=DRAFT_THEN_SUBMIT_TO_COMMUNITY_REVIEW
IMPORT_ACTOR_CONTRACT=PENDING_08D2_DESIGN
IMPORT_CONCURRENCY_CONTRACT=PENDING_08D2_DESIGN
TATOEBA_LICENSE_REGISTRY_RUNTIME_CHECK=PENDING
NEXT_SLICE=08D2
NEXT_ACTION=STOP_FOR_08D2_IMPORTER_IMPLEMENTATION_PLAN
```

The bulk export is discovery/snapshot input. The stable Tatoeba v1 sentence
API is the authoritative bounded enrichment/check for `id`, `lang`, `text`,
`license`, `owner`, and `is_unapproved`. Only `CC BY 2.0 FR` and `CC0 1.0`
are accepted; `PROBLEM`, unknown or missing license, missing required
attribution, unapproved, deleted/API 404, unsupported language, and material
bulk/API disagreement fail closed. No missing license defaults to CC BY.

The 08D2 plan must record snapshot ID, bulk retrieval time, artifact hashes
where available, API-check time, and mismatch reason. Material disagreement on
text, language, license, owner, or status must `SKIP_OR_QUARANTINE`, not be
silently reconciled during initial creation. Direct links remain bounded
`links` input only; no transitive translations may be computed, and
`TATOEBA:LINK:DIRECT:<minId>:<maxId>` is identity only while linguistic
direction comes from the configured language pair.

`COMMUNITY_REVIEW` is a post-submit lifecycle state, not an import insertion
state: create as `DRAFT`, attach complete validated provenance/license, then
submit through the existing review audit boundary. Incomplete rows remain
`DRAFT` or are rejected/quarantined. No hidden actor, concurrency strategy, or
runtime license registry entry is assumed or created in this closure.

## Phase 08D2 - Tatoeba importer implementation-plan closure

The implementation-only plan is recorded in
evidence/PHASE-08D2-TATOEBA-IMPORTER-PLAN.md. This closure resolves the 08D1
design remediation without implementing or running an importer. The plan
confirms the existing schema is sufficient when the importer uses
OPEN_DATASET, provider-qualified identities, a transaction-scoped advisory
lock, and a dedicated internal importer repository operation.

~~~
PHASE_08D2_IMPORTER_PLAN=PASS
IMPORT_SUBMIT_PATH_GAP=CONFIRMED
IMPORT_ACTOR_CONTRACT=EXPLICIT_ADMIN_CLI_ACTOR
IMPORT_ENTRYPOINT=CLI
TATOEBA_LICENSE_REGISTRY_RUNTIME_CHECK=MANDATORY_FAIL_CLOSED
INITIAL_IMPORT_ATOMICITY=ONE_POSTGRES_TRANSACTION
IMPORT_CONCURRENCY_CONTRACT=TRANSACTION_SCOPED_ADVISORY_LOCK_PLUS_GLOBAL_LOOKUP_RECONCILE_CREATE
SENTENCE_SOURCE_IDENTITY=TATOEBA:SENTENCE:<id>
DIRECT_TRANSLATION_IDENTITY=TATOEBA:LINK:DIRECT:<minId>:<maxId>
TRANSLATION_TWO_PROVENANCE_ENTRIES=YES
IDEMPOTENT_RERUN_NOOP=YES
VERIFIED_UNSAFE_RERUN_ACTION=INVALIDATE_TO_COMMUNITY_REVIEW_BEFORE_RECONCILE
COMMUNITY_CONTRIBUTION_EVENT_EMITTED=NO
AUTO_VERIFY_IMPORTED_RESOURCE=NO
DRY_RUN_ZERO_WRITES=YES
MIGRATION_REQUIRED=NO
08D2_IMPLEMENTATION_DECISION=GO
~~~

The importer lifecycle is explicitly:

~~~
TATOEBA_IMPORT_LIFECYCLE=DRAFT_THEN_SUBMIT_TO_COMMUNITY_REVIEW
~~~

COMMUNITY_REVIEW is the post-submit state, not a direct insertion state.
Every accepted resource is created as DRAFT, receives complete validated
provenance and runtime-validated license facts, and crosses the normal review
audit boundary with an explicit SUBMIT audit. Incomplete facts remain DRAFT
or are rejected/quarantined. Tatoeba content is never auto-verified and does
not emit a community contribution event.

The chosen actor contract is an explicit existing ACTIVE ADMIN user supplied
to the protected CLI run. No hidden actor, actor provisioning, hardcoded ID,
or fallback is allowed. The run must fail before writes when actor or license
registry preflight fails.

The bulk export is a discovery/snapshot input. The bounded stable Tatoeba v1
sentence API is authoritative for id, lang, text, license, owner, and
is_unapproved. Only CC BY 2.0 FR and CC0 1.0 are accepted. Missing or
unknown license never defaults to CC BY. Bulk/API disagreement on text,
language, license, required owner, or status is SKIP_OR_QUARANTINE, with
snapshot ID, retrieval time, artifact hashes, API-check time, and mismatch
reason retained.

Direct translation input remains the links export only. Reciprocal rows are
collapsed; transitive translations are not computed. The required identity
TATOEBA:LINK:DIRECT:<minId>:<maxId> is numeric ordering for identity only.
Configured source/target languages determine linguistic direction. Two
role-qualified provenance entries preserve both endpoint licenses and
attributions without inventing a combined license.

~~~
IMPORT_CONCURRENCY_CONTRACT=TRANSACTION_SCOPED_ADVISORY_LOCK_PLUS_GLOBAL_LOOKUP_RECONCILE_CREATE
TATOEBA_LICENSE_REGISTRY_RUNTIME_CHECK=MANDATORY_FAIL_CLOSED
NEXT_SLICE=08D3
NEXT_ACTION=STOP_FOR_EXTERNAL_REVIEW_BEFORE_08D3A
~~~

This plan does not alter TASKS or PROJECT-STATE: LNG_08_006 remains
VERIFYING, LNG_08_007 and LNG_08_008 remain PLANNED, and Phase 08 remains
IN_PROGRESS.

## Phase 08D2 external-review remediation

The external review identified a real directionality defect in the original
unordered translation identity. The active planning contract is corrected
below; the original baseline remains preserved in the evidence file as
historical, superseded context.

~~~
08D2_EXTERNAL_REVIEW_REMEDIATION=PASS
UNORDERED_TRANSLATION_IDENTITY_RUN_ORDER_DEFECT=CONFIRMED
INPUT_PAIR_IDENTITY=TATOEBA:PAIR:<minId>:<maxId>
DIRECT_TRANSLATION_IDENTITY=TATOEBA:LINK:DIRECT:<sourceSentenceId>:<targetSentenceId>
TRANSLATION_LOCK_IDENTITY=OPEN_DATASET:TATOEBA:LINK:DIRECT:<sourceId>:<targetId>
TRANSLATION_TWO_PROVENANCE_ENTRIES=YES
AUTO_CREATE_REVERSE_TRANSLATION=NO
TRANSLATION_IDENTITY_INPUT_ORDER_INDEPENDENT=PASS
REVERSE_DIRECTION_DISTINCT_IDENTITY=PASS
BIDIRECTIONAL_CONFIGURATION_COLLISION=NO
NEW_UNSAFE_CANDIDATE_DURABLE_RESOURCE=NO
NEW_UNSAFE_CANDIDATE_ACTION=QUARANTINE_ZERO_WRITES
INITIAL_IMPORT_ATOMICITY=ONE_POSTGRES_TRANSACTION
PARTIAL_INITIAL_RESOURCE_AFTER_FAILURE=NO
SENTENCE_SOURCE_IDENTITY=TATOEBA:SENTENCE:<id>
IDEMPOTENT_RERUN_NOOP=YES
AUTO_VERIFY_IMPORTED_RESOURCE=NO
COMMUNITY_CONTRIBUTION_EVENT_EMITTED=NO
MIGRATION_REQUIRED=NO
08D2_IMPLEMENTATION_DECISION=GO
BACKEND_CHANGED=NO
FRONTEND_CHANGED=NO
DATASET_DOWNLOADED=NO
TEST_DB_MUTATED=NO
PRODUCTION_DB_MUTATED=NO
DEPLOYED=NO
CURRENT_PHASE=08
PHASE_08=IN_PROGRESS
LNG_08_006=VERIFYING
NEXT_SLICE=08D3A
NEXT_ACTION=STOP_FOR_08D3A_IMPLEMENTATION
~~~

Reciprocal link rows are collapsed only under the unordered input-pair
identity. Endpoint language resolution then creates the directed durable
identity and directional Library content. Exact role-qualified
OPEN_DATASET provenance IDs are the global lookup boundary; no lookup may
depend on transformation-history JSON. A new unsafe candidate produces zero
durable Library writes. Only a pre-existing importer-owned DRAFT may remain
DRAFT for safe reconciliation; it cannot submit until all facts are valid.

Direction is immutable per durable resource: if an existing resource no longer
matches its directed source/target identity, invalidate or quarantine it before
material mutation. Never rewrite one direction into its reverse; the reverse
requires an explicitly configured separate identity and resource.

## Phase 08D2 publication evidence

The plan branch was pushed from the exact Workspace main base. GitHub reported
no workflow runs for this Workspace branch; no CI result is claimed.

~~~
WORKSPACE_PLAN_BRANCH=phase-08d2-tatoeba-importer-plan
WORKSPACE_PLAN_BASE=2f8e9651f1cbae307b89e5e702603322c0b6ef08
WORKSPACE_PLAN_COMMIT=be81642af242b74778d7afbe47efd568435258c9
WORKSPACE_CI=NOT_CONFIGURED
WORKSPACE_CONFORMANCE=PASS
BACKEND_CHANGED=NO
FRONTEND_CHANGED=NO
DATASET_DOWNLOADED=NO
TEST_DB_MUTATED=NO
PRODUCTION_DB_MUTATED=NO
DEPLOYED=NO
~~~

## Phase 08D3A — Tatoeba dry-run implementation foundation

The bounded read-only implementation is recorded in
`evidence/PHASE-08D3A-TATOEBA-DRY-RUN-IMPLEMENTATION.md`. The Backend branch
adds strict streaming readers for the current Tatoeba detailed/CC0/link
exports, exact UTF-8/text handling, snapshot hashes, v1 sentence API
enrichment, CC0/API fail-closed validation, attribution previews, direct-link
reciprocal collapse, deterministic directed translation identities, bounded
JSON/JSONL dry-run reporting, and a standalone CLI that requires `--dry-run`.
It has no Nest/Postgres/Library repository dependency and creates no durable
Library resource.

~~~
PHASE_08D3A_IMPLEMENTATION=PASS
BACKEND_BRANCH=phase-08d3a-tatoeba-dry-run
BACKEND_SHA=a493f133f24d1bbf771da66a8e16bf0ef0e6bb73
BACKEND_CI_RUN=NOT_TRIGGERED
BACKEND_CI_STATUS=NOT_TRIGGERED
IMPORT_ENTRYPOINT=CLI
CLI_DRY_RUN_ONLY=YES
CLI_REQUIRES_DRY_RUN=PASS
DATABASE_CONNECTED=NO
DATABASE_READS=0
DATABASE_WRITES=0
DB_PREFLIGHT=SKIPPED_08D3A
LIBRARY_WRITE_PORT_PRESENT=NO
AUTOMATED_LIVE_TATOEBA_CALLS=0
DATASET_DOWNLOADER_IMPLEMENTED=NO
DATASET_DOWNLOADED=NO
SYNTHETIC_FIXTURES_ONLY=YES
DRY_RUN_ZERO_WRITES=YES
MIGRATION_REQUIRED=NO
MIGRATION_RERUN=NO
MIGRATION_0012_CREATED=NO
MIGRATIONS_0001_0011=UNCHANGED
BACKEND_CHANGED=YES
FRONTEND_CHANGED=NO
TEST_DB_MUTATED=NO
PRODUCTION_DB_MUTATED=NO
DEPLOYED=NO
CURRENT_PHASE=08
PHASE_08=IN_PROGRESS
LNG_08_006=VERIFYING
LNG_08_007=PLANNED
LNG_08_008=PLANNED
~~~

The implementation preserves the 08D2 lifecycle boundary:

~~~
TATOEBA_IMPORT_LIFECYCLE=DRAFT_THEN_SUBMIT_TO_COMMUNITY_REVIEW
AUTO_VERIFY_IMPORTED_RESOURCE=NO
COMMUNITY_CONTRIBUTION_EVENT_EMITTED=NO
IMPORT_ACTOR_CONTRACT=PENDING_08D2_DESIGN
IMPORT_CONCURRENCY_CONTRACT=PENDING_08D2_DESIGN
TATOEBA_LICENSE_REGISTRY_RUNTIME_CHECK=PENDING
~~~

`COMMUNITY_REVIEW` remains a post-submit state, not direct import insertion.
08D3A quarantines unsafe new candidates with zero durable writes. It does not
implement the actor, registry, advisory-lock, global-lookup, transaction, or
TEST-database contracts reserved for later slices.

Local verification passed: focused Tatoeba/CLI tests 8 suites / 25 tests;
Backend unit tests 49 suites / 329 tests; Backend e2e 13 suites / 58 tests;
typecheck, lint, build, high-severity audit (0 vulnerabilities), and diff
check. The e2e suite used the existing test in-memory persistence path; no
database connection or mutation was made. The compiled CLI no-argument smoke
failed closed with `TATOEBA_IMPORT_WRITE_MODE_NOT_IMPLEMENTED`.

This does not change `TASKS.md` or `state/PROJECT-STATE.md`: `LNG_08_006`
remains `VERIFYING`, `LNG_08_007` and `LNG_08_008` remain `PLANNED`, and Phase
08 remains `IN_PROGRESS`. No importer implementation beyond 08D3A and no
08D3B work may begin until external review is complete.

~~~
NEXT_SLICE=08D3B
NEXT_ACTION=STOP_FOR_EXTERNAL_REVIEW_BEFORE_08D3B
~~~

## Phase 08D3A external-review remediation before 08D3B

Append-only closure evidence for the external review is recorded in
`evidence/PHASE-08D3A-TATOEBA-DRY-RUN-IMPLEMENTATION.md`. The remediation
hardens CC BY owner snapshot consistency, documents the CC0 null-owner rule,
separates importer run time from trusted snapshot retrieval metadata, removes
local paths from serialized report/diagnostic DTOs, replaces candidate-wide
snapshot duplication with `snapshotId`, and bounds JSON/JSONL samples and
serialized bytes with explicit truncation flags and omitted counts. It does
not add DB access, a Library write port, migrations, dataset data, or 08D3B.

~~~
PHASE_08D3A_EXTERNAL_REVIEW_REMEDIATION=PASS
BACKEND_BRANCH=phase-08d3a-tatoeba-dry-run
BACKEND_SHA=a851e18d5827103982cbda9e3f04ba9cefbc9e28
WORKSPACE_BRANCH=phase-08d3a-tatoeba-dry-run
WORKSPACE_BASE=41627b0133bce9287e24e56a22d3b560e217261c
CC_BY_OWNER_SNAPSHOT_CONSISTENCY=PASS
CC0_OWNER_RULE=PASS
OWNER_ASYMMETRY_TESTS=PASS
SNAPSHOT_RETRIEVAL_TIME_FABRICATED=NO
SNAPSHOT_TIMESTAMP_SEMANTICS=PASS
SNAPSHOT_ID_RUN_TIME_INDEPENDENT=PASS
SNAPSHOT_CLOCK_TESTS=PASS
REPORT_ABSOLUTE_LOCAL_PATHS=NONE
QUARANTINE_LOCAL_PATHS=NONE
CANDIDATE_FULL_SNAPSHOT_DUPLICATION=NO
DRY_RUN_REPORT_BOUNDED=YES
REPORT_TRUNCATION_EXPLICIT=YES
REPORT_MEMORY_BOUND=PASS
TRUNCATED_REPORT_COUNTS_ACCURATE=PASS
EXACT_TEXT_PRESERVED=PASS
DATABASE_CONNECTED=NO
DATABASE_READS=0
DATABASE_WRITES=0
DB_PREFLIGHT=SKIPPED_08D3A
LIBRARY_WRITE_PORT_PRESENT=NO
AUTOMATED_LIVE_TATOEBA_CALLS=0
CC0_SNAPSHOT_CONTRACT=PASS
TRANSLATION_IDENTITY_INPUT_ORDER_INDEPENDENT=PASS
REVERSE_DIRECTION_DISTINCT_IDENTITY=PASS
BIDIRECTIONAL_CONFIGURATION_COLLISION=NO
AUTO_CREATE_REVERSE_TRANSLATION=NO
CLI_DRY_RUN_ONLY=YES
CLI_REQUIRES_DRY_RUN=PASS
FOCUSED_TESTS=8 suites / 34 tests PASS
BACKEND_TESTS=49 suites / 338 tests PASS
BACKEND_E2E=13 suites / 58 tests PASS
TYPECHECK=PASS
LINT=PASS
BUILD=PASS
AUDIT=PASS (0 vulnerabilities)
GIT_DIFF_CHECK=PASS
MIGRATION_REQUIRED=NO
MIGRATION_RERUN=NO
MIGRATION_0012_CREATED=NO
MIGRATIONS_0001_0011=UNCHANGED
BACKEND_CHANGED=YES
FRONTEND_CHANGED=NO
DATASET_DOWNLOADED=NO
TEST_DB_MUTATED=NO
PRODUCTION_DB_MUTATED=NO
DEPLOYED=NO
CURRENT_PHASE=08
PHASE_08=IN_PROGRESS
LNG_08_006=VERIFYING
~~~

The normal lifecycle remains:

~~~
TATOEBA_IMPORT_LIFECYCLE=DRAFT_THEN_SUBMIT_TO_COMMUNITY_REVIEW
AUTO_VERIFY_IMPORTED_RESOURCE=NO
COMMUNITY_CONTRIBUTION_EVENT_EMITTED=NO
IMPORT_ACTOR_CONTRACT=PENDING_08D2_DESIGN
IMPORT_CONCURRENCY_CONTRACT=PENDING_08D2_DESIGN
TATOEBA_LICENSE_REGISTRY_RUNTIME_CHECK=PENDING
~~~

`COMMUNITY_REVIEW` is still reached only after complete DRAFT provenance and
license attachment plus the normal submit audit boundary. D3A remains
report-only and quarantines unsafe new candidates with zero durable writes.

The Backend remediation branch was pushed and its remote SHA verified. Backend
`main` remains `86c51f7b08a989db415e7c11361686fdf2379455`; Frontend remains
untouched at `cfe55763318ac47ac8bc6047aa747c0f353bafcb`. Workspace `main`
remains `41627b0133bce9287e24e56a22d3b560e217261c`; this review branch is not
merged to `main`.

~~~
NEXT_SLICE=08D3B
NEXT_ACTION=STOP_FOR_FINAL_EXTERNAL_REVIEW_BEFORE_08D3B
~~~

## Phase 08D3A final external-review remediation: Library text eligibility

Append-only closure for the final D3A review. The Backend dry-run importer now
uses the frozen Library 0009 sentence/translation text contract before any
future D3B write: Unicode code-point length, maximum 20,000 characters, and
non-blank text. It preserves exact Tatoeba text and fails closed with
`TATOEBA_TEXT_TOO_LONG` or `TATOEBA_EMPTY_TEXT`; no normalization, trimming,
collapse, or truncation is performed. Translation candidates are constructed
only from sentence candidates that pass this gate.

~~~
PHASE_08D3A_FINAL_EXTERNAL_REVIEW_REMEDIATION=PASS
BACKEND_BRANCH=phase-08d3a-tatoeba-dry-run
BACKEND_SHA=7971aed552d88c887c60494b280b339a78edb0bb
TATOEBA_LIBRARY_TEXT_MAX_CHARS=20000
TEXT_BOUNDARY_TESTS=PASS
OVER_20000_TEXT_QUARANTINED=PASS
BLANK_TEXT_QUARANTINED=PASS
UNICODE_TEXT_LENGTH_COMPATIBILITY=PASS
TRANSLATION_TEXT_SCHEMA_COMPATIBLE=PASS
EXACT_TEXT_PRESERVED=PASS
CC_BY_OWNER_SNAPSHOT_CONSISTENCY=PASS
CC0_OWNER_RULE=PASS
SNAPSHOT_RETRIEVAL_TIME_FABRICATED=NO
SNAPSHOT_ID_RUN_TIME_INDEPENDENT=PASS
REPORT_ABSOLUTE_LOCAL_PATHS=NONE
QUARANTINE_LOCAL_PATHS=NONE
CANDIDATE_FULL_SNAPSHOT_DUPLICATION=NO
DRY_RUN_REPORT_BOUNDED=YES
REPORT_TRUNCATION_EXPLICIT=YES
DATABASE_CONNECTED=NO
DATABASE_READS=0
DATABASE_WRITES=0
DB_PREFLIGHT=SKIPPED_08D3A
LIBRARY_WRITE_PORT_PRESENT=NO
AUTOMATED_LIVE_TATOEBA_CALLS=0
CC0_SNAPSHOT_CONTRACT=PASS
TRANSLATION_IDENTITY_INPUT_ORDER_INDEPENDENT=PASS
REVERSE_DIRECTION_DISTINCT_IDENTITY=PASS
BIDIRECTIONAL_CONFIGURATION_COLLISION=NO
AUTO_CREATE_REVERSE_TRANSLATION=NO
CLI_DRY_RUN_ONLY=YES
CLI_REQUIRES_DRY_RUN=PASS
FOCUSED_TESTS=8 suites / 36 tests PASS
BACKEND_TESTS=49 suites / 340 tests PASS
BACKEND_E2E=13 suites / 58 tests PASS
TYPECHECK=PASS
LINT=PASS
BUILD=PASS
AUDIT=PASS (0 vulnerabilities)
GIT_DIFF_CHECK=PASS
MIGRATION_REQUIRED=NO
MIGRATION_RERUN=NO
MIGRATION_0012_CREATED=NO
MIGRATIONS_0001_0011=UNCHANGED
BACKEND_CHANGED=YES
FRONTEND_CHANGED=NO
DATASET_DOWNLOADED=NO
TEST_DB_MUTATED=NO
PRODUCTION_DB_MUTATED=NO
DEPLOYED=NO
CURRENT_PHASE=08
PHASE_08=IN_PROGRESS
LNG_08_006=VERIFYING
~~~

No `db:migrate` command ran and no dataset or live Tatoeba API data was
accessed. The existing D3A zero-database boundary remains intact. This does
not start D3B and does not change the task state.

~~~
NEXT_ACTION=STOP_FOR_08D3A_PUBLICATION_REVIEW
~~~

## Phase 08D3A publication closure

The accepted Tatoeba dry-run importer foundation is now published. Backend
main was fast-forwarded from `86c51f7b08a989db415e7c11361686fdf2379455` to the
accepted implementation SHA, with no code edits during publication. Exact-SHA
Backend CI completed successfully before this Workspace closure.

~~~
PHASE_08D3A_PUBLICATION=PASS
PHASE_08D3A=PUBLISHED
BACKEND_MAIN_SHA=7971aed552d88c887c60494b280b339a78edb0bb
BACKEND_CI_RUN=36392558493
BACKEND_CI_STATUS=SUCCESS
IMPORT_ENTRYPOINT=CLI
CLI_DRY_RUN_ONLY=YES
CLI_REQUIRES_DRY_RUN=PASS
DATASET_DOWNLOADER_IMPLEMENTED=NO
SYNTHETIC_FIXTURES_ONLY=YES
AUTOMATED_LIVE_TATOEBA_CALLS=0
DATABASE_CONNECTED=NO
DATABASE_READS=0
DATABASE_WRITES=0
DB_PREFLIGHT=SKIPPED_08D3A
LIBRARY_WRITE_PORT_PRESENT=NO
SENTENCE_SOURCE_IDENTITY=TATOEBA:SENTENCE:<id>
INPUT_PAIR_IDENTITY=TATOEBA:PAIR:<minId>:<maxId>
DIRECT_TRANSLATION_IDENTITY=TATOEBA:LINK:DIRECT:<sourceSentenceId>:<targetSentenceId>
AUTO_CREATE_REVERSE_TRANSLATION=NO
CC_BY_OWNER_SNAPSHOT_CONSISTENCY=PASS
CC0_OWNER_RULE=PASS
SNAPSHOT_RETRIEVAL_TIME_FABRICATED=NO
SNAPSHOT_ID_RUN_TIME_INDEPENDENT=PASS
REPORT_ABSOLUTE_LOCAL_PATHS=NONE
QUARANTINE_LOCAL_PATHS=NONE
CANDIDATE_FULL_SNAPSHOT_DUPLICATION=NO
DRY_RUN_REPORT_BOUNDED=YES
REPORT_TRUNCATION_EXPLICIT=YES
TATOEBA_LIBRARY_TEXT_MAX_CHARS=20000
TEXT_BOUNDARY_TESTS=PASS
OVER_20000_TEXT_QUARANTINED=PASS
BLANK_TEXT_QUARANTINED=PASS
UNICODE_TEXT_LENGTH_COMPATIBILITY=PASS
TRANSLATION_TEXT_SCHEMA_COMPATIBLE=PASS
EXACT_TEXT_PRESERVED=PASS
FOCUSED_TESTS=8 suites / 36 tests PASS
BACKEND_TESTS=49 suites / 340 tests PASS
BACKEND_E2E=13 suites / 58 tests PASS
TYPECHECK=PASS
LINT=PASS
BUILD=PASS
AUDIT=PASS (0 vulnerabilities)
GIT_DIFF_CHECK=PASS
MIGRATION_REQUIRED=NO
MIGRATION_RERUN=NO
MIGRATION_0012_CREATED=NO
MIGRATIONS_0001_0011=UNCHANGED
TEST_DB_MUTATED=NO
PRODUCTION_DB_MUTATED=NO
FRONTEND_CHANGED=NO
DEPLOYED=NO
CURRENT_PHASE=08
PHASE_08=IN_PROGRESS
LNG_08_006=VERIFYING
LNG_08_007=PLANNED
LNG_08_008=PLANNED
NEXT_SLICE=08D3B
NEXT_ACTION=STOP_FOR_08D3B1_IMPLEMENTATION_PROMPT
~~~

This publication does not begin 08D3B1 or 08D3B2. Their read-only actor and
license-registry preflight, then DB-aware transaction/idempotency work, remain
separately gated. No database, migration, dataset, live Tatoeba API,
Frontend, or deployment operation was used for publication.

## Phase 08D3B1 — Tatoeba read-only import preflight

08D3B1 adds the first DB-aware Tatoeba slice, but remains strictly read-only.
The existing 08D3A dry-run command is unchanged and remains dry-run-only. The
new standalone CLI requires exact `--environment TEST` and an explicit
`--actor-user-id <uuid>`; it does not accept a database URL argument or infer
an actor. It uses the dedicated `TATOEBA_IMPORT_DATABASE_URL` environment
variable and requires an exact `TATOEBA_IMPORT_EXPECTED_DATABASE_NAME` target
check before actor/license reads. Production preflight is unsupported.

The actor contract is an explicit ACTIVE ADMIN. Missing, inactive,
verification-pending, disabled, member-only, moderator-only, and malformed
actors fail closed; additional roles do not invalidate an ADMIN. The safe
projection contains only user ID, active, and admin booleans. No email,
password, provider, session, or token data is selected or emitted.

The typed license mapping and exact registry contracts are:

~~~
CC BY 2.0 FR -> CC_BY_2_0_FR
CC0 1.0     -> CC0_1_0
CC_BY_2_0_FR: CC BY 2.0 France, https://creativecommons.org/licenses/by/2.0/fr/, attribution=true, redistribution=true, active=true
CC0_1_0: CC0 1.0, https://creativecommons.org/publicdomain/zero/1.0/, attribution=false, redistribution=true, active=true
~~~

The dedicated adapter exposes only actor/license reads in an explicit
`BEGIN READ ONLY` transaction with bounded `SET LOCAL statement_timeout`,
target identification, parameterized SELECTs, COMMIT, and rollback on error.
It has no registry upsert or Library write surface. Missing or unsafe registry
rows fail closed, and no license is auto-registered.

~~~
PHASE_08D3B1_IMPLEMENTATION=PASS
IMPORT_ACTOR_CONTRACT=EXPLICIT_ADMIN_CLI_ACTOR
IMPORT_ACTOR_USER_ID_DISCOVERY=NONE
DB_TRANSACTION_MODE=READ_ONLY
PREFLIGHT_DATABASE_READS=YES
PREFLIGHT_DATABASE_WRITES=0
PRODUCTION_PREFLIGHT_SUPPORTED=NO
AUTO_REGISTER_LICENSES=NO
PREFLIGHT_PRIVACY=PASS
DB_ERROR_SANITIZATION=PASS
CLI_PREFLIGHT=PASS
CLI_DRY_RUN_ONLY=YES
DATABASE_CONNECTED_FOR_08D3A=NO
AUTOMATED_LIVE_TATOEBA_CALLS=0
~~~

Verification passed: focused preflight tests 4 suites / 32 tests; Backend unit
tests 53 suites / 372 tests; Backend e2e 13 suites / 58 tests; typecheck,
lint, build, high-severity audit (0 vulnerabilities), and diff check. The
accepted Backend branch is
`phase-08d3b1-tatoeba-readonly-preflight` at
`26b1cebad44e6f9d1851edae2259f5f85852b570`.

No authorized TEST runtime was attempted because no explicit actor UUID and no
dedicated TEST URL/target inputs were supplied:

~~~
TEST_RUNTIME_PREFLIGHT=BLOCKED_INPUT
ACTOR_RUNTIME_PREFLIGHT=NOT_RUN
CC_BY_RUNTIME_PREFLIGHT=NOT_RUN
CC0_RUNTIME_PREFLIGHT=NOT_RUN
TEST_DB_MUTATED=NO
PRODUCTION_DB_MUTATED=NO
~~~

The Workspace state remains unchanged: `CURRENT_PHASE=08`,
`PHASE_08=IN_PROGRESS`, `LNG_08_006=VERIFYING`, `LNG_08_007=PLANNED`, and
`LNG_08_008=PLANNED`. No sentence/translation resource, provenance row,
review audit, migration, dataset, production connection, or deployment was
created. `NEXT_SLICE=08D3B2` and
`NEXT_ACTION=STOP_FOR_EXTERNAL_REVIEW_BEFORE_08D3B2`.

## Phase 08D3B1 external review remediation — TEST target identity

The 08D3B1 target-identity review is closed as an implementation pass. The
previous database-name-only proof defect is confirmed and is no longer the
accepted target contract. The CLI now requires an exact normalized URL host,
an explicit expected database name, and an explicit expected database user in
addition to the exact `TEST` environment flag. It parses the dedicated
`TATOEBA_IMPORT_DATABASE_URL` with the URL API before creating a Pool and
never infers the expected database user from URL credentials.

```text
08D3B1_EXTERNAL_REVIEW_REMEDIATION=PASS
DATABASE_NAME_ONLY_TARGET_PROOF_DEFECT=CONFIRMED
DATABASE_HOST_TARGET_CHECK=MANDATORY
DATABASE_NAME_TARGET_CHECK=MANDATORY
DATABASE_USER_TARGET_CHECK=MANDATORY
TEST_LABEL_ONLY_AUTHORIZATION=NO
REMOTE_DATABASE_SSL_FAIL_CLOSED=PASS
DATABASE_URL_SECRET_LEAK=NO
```

Target verification order is fixed: parse CLI and validate actor UUID;
require and parse the dedicated URL; require and compare expected host;
require expected database name/user; create the Pool; begin `READ ONLY`, set
the bounded local statement timeout, select `current_database()`,
`current_user`, and `version()`; compare database name/user; only then read
actor and license facts. Any target mismatch rolls back before actor/license
queries. Remote targets require explicit encrypted `sslmode=require`,
`verify-ca`, or `verify-full`; insecure, ambiguous, or absent remote SSL mode
fails closed. No hostname is included in the normal PASS JSON, and no URL,
password, raw pg options, or raw connection error is emitted.

```text
PRE_NETWORK_TARGET_TESTS=PASS
CONNECTED_TARGET_TESTS=PASS
SAME_DB_NAME_CROSS_ENV_PROTECTION=PASS
DB_TRANSACTION_MODE=READ_ONLY
PREFLIGHT_DATABASE_READS=YES
PREFLIGHT_DATABASE_WRITES=0
IMPORT_ACTOR_CONTRACT=EXPLICIT_ADMIN_CLI_ACTOR
IMPORT_ACTOR_USER_ID_DISCOVERY=NONE
AUTO_REGISTER_LICENSES=NO
BACKEND_SHA=4fbb7f2cddaeb8baf7d6ab90d82e02565e0ce59d
```

Verification on the hardened branch: focused preflight 5 suites / 40 tests
PASS; Backend 54 suites / 380 tests PASS; Backend e2e 13 suites / 58 tests
PASS; typecheck PASS; lint PASS; build PASS; audit PASS (0 vulnerabilities);
git diff --check PASS. No authorized TEST runtime was attempted because the
dedicated URL, expected host/name/user, and explicit actor UUID were not
available as a complete approved input set:

```text
TEST_RUNTIME_PREFLIGHT=BLOCKED_INPUT
ACTOR_RUNTIME_PREFLIGHT=NOT_RUN
CC_BY_RUNTIME_PREFLIGHT=NOT_RUN
CC0_RUNTIME_PREFLIGHT=NOT_RUN
TEST_DB_MUTATED=NO
PRODUCTION_DB_MUTATED=NO
```

The existing 08D3A dry-run CLI remains DB-free and dry-run-only. No migration,
license registry mutation, resource/provenance/review write, production
access, deployment, dataset download, or live Tatoeba API call occurred.
`CURRENT_PHASE=08`, `PHASE_08=IN_PROGRESS`, `LNG_08_006=VERIFYING`,
`LNG_08_007=PLANNED`, and `LNG_08_008=PLANNED` remain unchanged.

```text
NEXT_ACTION=STOP_FOR_FINAL_EXTERNAL_REVIEW_BEFORE_08D3B2
```

## Phase 08D3B1 secret-leak remediation

The final external review blocker was remediated on the existing
`phase-08d3b1-tatoeba-readonly-preflight` branch. The defect was raw
reflection of an unsupported CLI argument, allowing a supplied database URL
to reach stderr. Typed preflight errors, CLI output, and the dedicated
PostgreSQL adapter now fail closed with sanitized diagnostics; raw URLs,
passwords, query secrets, connection options, and raw driver errors are not
returned or logged.

```text
PHASE_08D3B1_SECRET_LEAK_REMEDIATION=PASS
DATABASE_URL_SECRET_LEAK=NO
DATABASE_PASSWORD_LEAK=NO
RAW_CONNECTION_STRING_LOGGING=NO
RAW_DB_ERROR_EXPOSURE=NO
SANITIZED_DIAGNOSTICS=PASS
INVALID_URL_LEAK_TEST=PASS
TARGET_MISMATCH_LEAK_TEST=PASS
CONNECTION_FAILURE_LEAK_TEST=PASS
SSL_FAILURE_LEAK_TEST=PASS
AUTH_FAILURE_LEAK_TEST=PASS
UNEXPECTED_DB_ERROR_LEAK_TEST=PASS
CLI_OUTPUT_LEAK_TEST=PASS
BACKEND_SHA=ebc22ce82479cbb191a95ea5a10370846fad8ab3
```

Verification: focused security/preflight tests 6 suites / 49 tests PASS;
Backend tests 55 suites / 389 tests PASS; Backend e2e 13 suites / 58 tests
PASS; typecheck PASS; lint PASS; build PASS; audit PASS (0 vulnerabilities);
git diff --check PASS. The target authorization, same-database-name
cross-environment protection, remote SSL fail-closed rule, explicit admin
actor contract, and read-only transaction remain PASS with
`PREFLIGHT_DATABASE_WRITES=0`. `AUTO_REGISTER_LICENSES=NO` and
`IMPORT_ACTOR_USER_ID_DISCOVERY=NONE` remain unchanged.

Runtime remains intentionally blocked because the complete approved TEST-only
input set was not supplied: dedicated `TATOEBA_IMPORT_DATABASE_URL`, expected
database host, expected database name, expected database user, and explicit
actor UUID. No runtime preflight, database access, mutation, migration,
production connection, deployment, dataset download, or live Tatoeba API call
occurred.

```text
TEST_RUNTIME_PREFLIGHT=BLOCKED_INPUT
ACTOR_RUNTIME_PREFLIGHT=NOT_RUN
CC_BY_RUNTIME_PREFLIGHT=NOT_RUN
CC0_RUNTIME_PREFLIGHT=NOT_RUN
CURRENT_PHASE=08
PHASE_08=IN_PROGRESS
LNG_08_006=VERIFYING
08D3B2_AUTHORIZED=NO
NEXT_ACTION=FINAL_EXTERNAL_REVIEW_RETRY
```

## Phase 08D3B1 TEST admin actor preparation

The owner-approved TEST database was rechecked using the existing Backend
`DATABASE_URL` without recording its value. Parsed target identity matched the
connected `current_database()` and `current_user`; the remote connection used
`sslmode=verify-full`.

```text
ENVIRONMENT=TEST
DATABASE_CONNECTION=PASS
DATABASE_HOST=ep-crimson-grass-azmsfir8-pooler.c-3.ap-southeast-1.aws.neon.tech
DATABASE_NAME=neondb
DATABASE_USER=neondb_owner
DATABASE_TARGET_AUTHORIZATION=PASS
DATABASE_NAME_TARGET_CHECK=PASS
DATABASE_USER_TARGET_CHECK=PASS
REMOTE_DATABASE_SSL_FAIL_CLOSED=PASS
```

No valid active ADMIN actor existed. Exactly one TEST-only application actor
was created transactionally as one `users` row plus one `user_roles` row, with
no password or OAuth identity. Verification found exactly one active ADMIN and
exactly one matching TEST identifier; no unrelated rows were modified:

```text
EXISTING_VALID_ADMIN_FOUND=NO
TEST_ADMIN_CREATED=YES
TEST_ADMIN_ACTOR_ID=f9520245-4388-4078-88ff-6f2411f08d55
TEST_ADMIN_ACTOR_ROLE=ADMIN
TEST_ADMIN_ACTOR_STATUS=ACTIVE
TEST_ADMIN_ACTOR_CONTRACT=PASS
TEST_ADMIN_ROWS_CREATED=2
ACTIVE_ADMIN_COUNT=1
TEST_EMAIL_COUNT=1
UNRELATED_DB_ROWS_MODIFIED=NO
TEST_DB_MUTATED=YES_EXPECTED_ACTOR_ONLY
```

The required license keys were read only and are both absent. No license
registration/update, migration, Tatoeba network call, import, resource write,
or 08D3B2 work occurred:

```text
CC_BY_LICENSE_PRESENT=NO
CC0_LICENSE_PRESENT=NO
AUTO_REGISTER_LICENSES=NO
DATABASE_URL_SECRET_LEAK=NO
DATABASE_PASSWORD_LEAK=NO
MIGRATION_REQUIRED=NO
MIGRATION_CREATED=NO
AUTOMATED_LIVE_TATOEBA_CALLS=0
CURRENT_PHASE=08
PHASE_08=IN_PROGRESS
LNG_08_006=VERIFYING
08D3B2_AUTHORIZED=NO
NEXT_ACTION=REMEDIATION_REQUIRED
```

## Phase 08D3B1 TEST license preparation

The owner-approved TEST target was revalidated on 2026-09-28 before a
strictly bounded data-preparation transaction. Host, database name, database
user, and connected PostgreSQL identity matched; encrypted remote transport
was `sslmode=verify-full`. The connection URL and all credentials remain
excluded from this handoff.

```text
ENVIRONMENT=TEST
DATABASE_CONNECTION=PASS
DATABASE_TARGET_AUTHORIZATION=PASS
DATABASE_HOST_TARGET_CHECK=PASS
DATABASE_NAME_TARGET_CHECK=PASS
DATABASE_USER_TARGET_CHECK=PASS
REMOTE_DATABASE_SSL_FAIL_CLOSED=PASS
```

Both required license keys were absent before the write. Exactly the two
missing primary registry rows were created and then verified against the
canonical Phase 08D3B1 contract; no existing row was updated and no unrelated
database row was modified.

```text
CC_BY_EXISTED_BEFORE=NO
CC0_EXISTED_BEFORE=NO
CC_BY_LICENSE_CREATED=YES
CC0_LICENSE_CREATED=YES
CC_BY_LICENSE_PRESENT=YES
CC0_LICENSE_PRESENT=YES
CC_BY_LICENSE_CONTRACT=PASS
CC0_LICENSE_CONTRACT=PASS
LICENSE_PRIMARY_ROWS_CREATED=2
UNRELATED_DB_ROWS_MODIFIED=NO
AUTO_REGISTER_LICENSES=NO
```

The TEST admin actor was read back unchanged:

```text
TEST_ADMIN_ACTOR_ID=f9520245-4388-4078-88ff-6f2411f08d55
TEST_ADMIN_ACTOR_UNCHANGED=YES
TEST_ADMIN_ACTOR_CONTRACT=PASS
DATABASE_URL_SECRET_LEAK=NO
DATABASE_PASSWORD_LEAK=NO
RAW_CONNECTION_STRING_LOGGING=NO
RAW_DB_ERROR_EXPOSURE=NO
```

This was TEST data preparation only. No importer execution, Tatoeba network
call, resource/provenance/review write, migration, deployment, or production
access occurred. Backend code and Frontend remain unchanged. The next action
is to retry the separate 08D3B1 read-only runtime preflight; 08D3B2 remains
unauthorized.

```text
BACKEND_CODE_CHANGED=NO
FRONTEND_CHANGED=NO
MIGRATION_REQUIRED=NO
MIGRATION_CREATED=NO
MIGRATIONS_0001_0011=UNCHANGED
PRODUCTION_DB_MUTATED=NO
DEPLOYED=NO
CURRENT_PHASE=08
PHASE_08=IN_PROGRESS
LNG_08_006=VERIFYING
08D3B2_AUTHORIZED=NO
NEXT_ACTION=RETRY_08D3B1_TEST_RUNTIME_PREFLIGHT
```

## Phase 08D3B1 TEST runtime preflight retry

The real Phase 08D3B1 preflight passed on 2026-09-28 against the
owner-approved TEST database. The existing Backend `DATABASE_URL` was passed
to the process as the dedicated preflight URL without recording its value.
Parsed host, database name, database user, and connected PostgreSQL identity
matched exactly; remote transport remained encrypted.

```text
PHASE_08D3B1_TEST_RUNTIME_PREFLIGHT_RETRY=PASS
ENVIRONMENT=TEST
DATABASE_TARGET_AUTHORIZATION=PASS
DATABASE_HOST_TARGET_CHECK=PASS
DATABASE_NAME_TARGET_CHECK=PASS
DATABASE_USER_TARGET_CHECK=PASS
TEST_LABEL_ONLY_AUTHORIZATION=NO
DB_CONNECTION_RESULT=PASS
REMOTE_DATABASE_SSL_FAIL_CLOSED=PASS
```

The explicit CLI actor was verified as the active ADMIN actor. Required
license rows `CC_BY_2_0_FR` and `CC0_1_0` were read and matched their exact
contracts. No actor discovery, license registration, or repair occurred.

```text
ACTOR_RUNTIME_PREFLIGHT=PASS
ACTOR_USER_ID_SOURCE=EXPLICIT_CLI
TEST_ADMIN_ACTOR_ID=f9520245-4388-4078-88ff-6f2411f08d55
TEST_ADMIN_ACTOR_ROLE=ADMIN
TEST_ADMIN_ACTOR_STATUS=ACTIVE
IMPORT_ACTOR_USER_ID_DISCOVERY=NONE
CC_BY_RUNTIME_PREFLIGHT=PASS
CC0_RUNTIME_PREFLIGHT=PASS
REQUIRED_LICENSE_CC_BY_KEY=CC_BY_2_0_FR
REQUIRED_LICENSE_CC0_KEY=CC0_1_0
AUTO_REGISTER_LICENSES=NO
```

The transaction was READ ONLY: reads occurred, writes were zero, and the
TEST database was not mutated by this runtime preflight. No URL, password,
raw connection string, or raw database error was emitted; no Tatoeba network
call or import was performed.

```text
DB_TRANSACTION_MODE=READ_ONLY
PREFLIGHT_DATABASE_READS=YES
PREFLIGHT_DATABASE_WRITES=0
DATABASE_URL_SECRET_LEAK=NO
DATABASE_PASSWORD_LEAK=NO
RAW_CONNECTION_STRING_LOGGING=NO
RAW_DB_ERROR_EXPOSURE=NO
AUTOMATED_LIVE_TATOEBA_CALLS=0
TEST_DB_MUTATED=NO
PRODUCTION_DB_MUTATED=NO
```

Focused preflight/security verification passed 6 suites / 49 tests. Backend
code, Frontend, migrations, production, deployment, and the 08D3A dry-run
boundary remain unchanged. `LNG_08_006` is now `PASS`; 08D3B2 remains
unauthorized.

```text
FOCUSED_TESTS=6 suites / 49 tests PASS
BACKEND_CODE_CHANGED=NO
FRONTEND_CHANGED=NO
MIGRATION_REQUIRED=NO
MIGRATION_0012_CREATED=NO
MIGRATIONS_0001_0011=UNCHANGED
DEPLOYED=NO
CURRENT_PHASE=08
PHASE_08=IN_PROGRESS
LNG_08_006=PASS
08D3B2_AUTHORIZED=NO
NEXT_ACTION=READY_FOR_08D3B2_AUTHORIZATION
```

## Phase 08D3B2 sentence import implementation

The first atomic D3B implementation unit is complete on the dedicated
Backend branch. It is limited to Tatoeba sentence resources; direct
translation resources and relation reconciliation remain a later D3C scope.

```text
PHASE_08D3B2_IMPLEMENTATION=PASS
PHASE_08D3B2_SCOPE=atomic sentence import only: explicit ACTIVE ADMIN actor and required-license revalidation; sentence advisory lock; exact global OPEN_DATASET source-identity lookup; one-transaction SENTENCE resource creation/reconciliation; complete provenance; SUBMIT audit; DRAFT -> COMMUNITY_REVIEW; idempotent NOOP; concurrent create/reconcile; rollback and quarantine safety
BACKEND_BRANCH=phase-08d3b2-tatoeba-sentence-import
BACKEND_SHA=656f396c06797b993f625fb49820cebf6ca9fe0c
```

The dedicated CLI accepts one bounded, already-enriched candidate and keeps
the existing `library:import:tatoeba` command dry-run-only and database-free.
The durable sentence identity is `TATOEBA:SENTENCE:<id>` and its transaction
lock is `OPEN_DATASET:TATOEBA:SENTENCE:<id>`. New unsafe candidates are
quarantined with zero durable Library writes. New safe candidates are created
as `DRAFT`, receive complete provenance and a `SUBMIT` audit, then transition
to `COMMUNITY_REVIEW` in one PostgreSQL transaction. Unchanged reruns are
`NOOP`; changed `VERIFIED` content is invalidated before reconciliation; a
`REJECTED` resource is not silently reopened.

The 08D3B1 safety contracts remain enforced: explicit active ADMIN actor,
TEST-only target authorization by host/database/user, fail-closed remote SSL,
sanitized database errors, no URL/password exposure, mandatory existing
`CC_BY_2_0_FR` and `CC0_1_0` registry rows, and no automatic license
registration. No real D3B2 import was executed, no Tatoeba network call was
made, and no database was mutated during implementation verification.

```text
ACTOR_CONTRACT_PRESERVED=YES
DATABASE_TARGET_AUTHORIZATION_PRESERVED=YES
REMOTE_DATABASE_SSL_FAIL_CLOSED=PASS
SECRET_HANDLING=PASS
LICENSE_CONTRACT_PRESERVED=YES
AUTO_REGISTER_LICENSES=NO
LIVE_TATOEBA_CALLS_DURING_TESTS=0
TEST_DB_MUTATED=NO
PRODUCTION_DB_MUTATED=NO
MIGRATION_REQUIRED=NO
MIGRATION_CREATED=NO
MIGRATIONS_0001_0011=UNCHANGED
FRONTEND_CHANGED=NO
DEPLOYED=NO
```

Verification passed:

```text
FOCUSED_TESTS=16 suites / 99 tests PASS
BACKEND_TESTS=59 suites / 412 tests PASS
BACKEND_E2E=13 suites / 58 tests PASS
TYPECHECK=PASS
LINT=PASS
BUILD=PASS
AUDIT=PASS (0 vulnerabilities)
GIT_DIFF_CHECK=PASS
```

```text
CURRENT_PHASE=08
PHASE_08=IN_PROGRESS
LNG_08_006=PASS
LNG_08_007=PLANNED
LNG_08_008=PLANNED
NEXT_ACTION=EXTERNAL_REVIEW_REQUIRED
```

The implementation branch remains unmerged pending external review. This
closure does not authorize runtime import execution or the later translation
slice.

## Phase 08D3B2 controlled TEST runtime verification

One bounded static sentence candidate was executed against the explicitly
approved TEST database after the D3B2 external review passed. No Tatoeba API
call or dataset download was used.

```text
PHASE_08D3B2_TEST_RUNTIME_VERIFICATION=PASS
ENVIRONMENT=TEST
DATABASE_TARGET_AUTHORIZATION=PASS
DATABASE_HOST_TARGET_CHECK=PASS
DATABASE_NAME_TARGET_CHECK=PASS
DATABASE_USER_TARGET_CHECK=PASS
REMOTE_DATABASE_SSL_FAIL_CLOSED=PASS
ACTOR_RUNTIME_PREFLIGHT=PASS
TEST_ADMIN_ACTOR_ID=f9520245-4388-4078-88ff-6f2411f08d55
CC_BY_RUNTIME_PREFLIGHT=PASS
CC0_RUNTIME_PREFLIGHT=PASS
DATABASE_URL_SECRET_LEAK=NO
DATABASE_PASSWORD_LEAK=NO
RAW_CONNECTION_STRING_LOGGING=NO
RAW_DB_ERROR_EXPOSURE=NO
RUNTIME_FIXTURE_SOURCE=TATOEBA:SENTENCE:9999999999999999999999999999999999999999
LIVE_TATOEBA_CALLS=0
```

The first run returned `CREATED` and created canonical resource
`2909ae60-def7-44f8-aa7e-07c7ba22d8c3` in `COMMUNITY_REVIEW`. The exact retry
returned `NOOP` for the same resource. Read-only TEST verification confirmed
one source-linked sentence resource, one provenance row, one exact `SUBMIT`
audit, no contribution event, and zero duplicate source/provenance/audit
records.

```text
FIRST_IMPORT=PASS
SENTENCE_RESOURCE_CONTRACT=PASS
PROVENANCE=PASS
SUBMIT_AUDIT=PASS
COMMUNITY_REVIEW_TRANSITION=PASS
AUTO_PUBLISH=NO
EXACT_RETRY=PASS
IDEMPOTENT_RUNTIME_RETRY=PASS
CANONICAL_SENTENCE_DUPLICATES=0
PROVENANCE_DUPLICATES=0
AUDIT_DUPLICATES=0
ADVISORY_LOCK_RUNTIME=PASS
RECONCILIATION_RUNTIME=PASS
TEST_DB_MUTATED=YES
AUTHORIZED_TEST_ROWS_CREATED=4
AUTHORIZED_TEST_ROWS_UPDATED=1
UNRELATED_DB_ROWS_MODIFIED=NO
PRODUCTION_DB_MUTATED=NO
BACKEND_CODE_CHANGED=NO
FRONTEND_CHANGED=NO
MIGRATION_REQUIRED=NO
MIGRATION_CREATED=NO
MIGRATIONS_0001_0011=UNCHANGED
DEPLOYED=NO
CURRENT_PHASE=08
PHASE_08=IN_PROGRESS
LNG_08_006=PASS
08D3B2_AUTHORIZED=NO
RUNTIME_FINDINGS=NONE
NEXT_ACTION=READY_FOR_08D3B2_ACCEPTANCE
```

## Phase 08D3B2 acceptance closeout

The implementation, external review, and controlled approved-TEST runtime
evidence satisfy the documented atomic sentence-import acceptance gates.
`LNG-08-006` is the authoritative parent Workspace task for the Tatoeba
adapter; 08D3B2 remains a completed sub-slice rather than a new task ID.

```text
PHASE_08D3B2_ACCEPTANCE=PASS
08D3B2_TASK_ID=LNG_08_006
08D3B2_TASK_STATUS=PASS
IMPLEMENTATION_EVIDENCE=PASS
EXTERNAL_REVIEW_EVIDENCE=PASS
TEST_RUNTIME_EVIDENCE=PASS
BACKEND_SHA=656f396c06797b993f625fb49820cebf6ca9fe0c
ACTOR_CONTRACT=PASS
LICENSE_CONTRACT=PASS
ADVISORY_LOCK=PASS
IDEMPOTENT_IMPORT=PASS
PROVENANCE=PASS
SUBMIT_AUDIT=PASS
COMMUNITY_REVIEW_TRANSITION=PASS
AUTO_PUBLISH=NO
CANONICAL_SENTENCE_DUPLICATES=0
PROVENANCE_DUPLICATES=0
AUDIT_DUPLICATES=0
PRODUCTION_DB_MUTATED=NO
MIGRATION_REQUIRED=NO
MIGRATIONS_0001_0011=UNCHANGED
BACKEND_CODE_CHANGED=NO
FRONTEND_CHANGED=NO
DEPLOYED=NO
MERGED_TO_MAIN=NO
CURRENT_PHASE=08
PHASE_08=IN_PROGRESS
LNG_08_006=PASS
```

The next documented 08D3 sub-slice is direct translation and reconciliation.
It remains planned and is not started by this closeout.

```text
NEXT_08D3_TASK_ID=08D3C
NEXT_08D3_TASK_NAME=direct translation and reconciliation
NEXT_08D3_TASK_STATUS=PLANNED
NEXT_ACTION=READY_FOR_NEXT_08D3_TASK
```

## Phase 08D3C direct translation and reconciliation implementation

The first atomic 08D3C implementation unit is complete on the dedicated
feature branches. Scope is limited to direct Tatoeba translation candidate
validation, directed identity, reciprocal input collapse, endpoint-role
provenance, transaction-scoped advisory locking, exact global role lookup,
idempotent translation creation/reconciliation, review audit/state handling,
and a bounded internal translation-import CLI. Sentence import remains owned by
08D3B2; no indirect or multi-hop translation is inferred.

```text
PHASE_08D3C_IMPLEMENTATION=PASS
08D3C_SCOPE=direct translation and reconciliation only
IMPLEMENTATION_RESULT=PASS
BACKEND_BRANCH=phase-08d3c-tatoeba-direct-translation
BACKEND_SHA=0506ca4357b91bc8f10247f9f522e5717db854c4
WORKSPACE_BRANCH=phase-08d3c-tatoeba-direct-translation
DIRECT_TRANSLATION_IDENTITY=TATOEBA:LINK:DIRECT:<sourceSentenceId>:<targetSentenceId>
INPUT_PAIR_IDENTITY=TATOEBA:PAIR:<minId>:<maxId>
TRANSLATION_LOCK_IDENTITY=OPEN_DATASET:TATOEBA:LINK:DIRECT:<sourceSentenceId>:<targetSentenceId>
TRANSLATION_TWO_PROVENANCE_ENTRIES=YES
AUTO_CREATE_REVERSE_TRANSLATION=NO
```

The write path validates the explicit ADMIN actor and existing required
licenses, locks the directed identity, checks both role-qualified provenance
rows, and keeps creation/reconciliation, provenance, SUBMIT audit, and
`DRAFT -> COMMUNITY_REVIEW` transition in one PostgreSQL transaction. Exact
retries are `NOOP`; conflicting or partial role state quarantines and rolls
back; changed VERIFIED content is invalidated before later reconciliation;
REJECTED content is not auto-reopened; auto-publish and contribution events are
not emitted.

```text
ACTOR_CONTRACT_PRESERVED=YES
LICENSE_CONTRACT_PRESERVED=YES
AUTO_REGISTER_LICENSES=NO
DATABASE_TARGET_AUTHORIZATION_PRESERVED=YES
REMOTE_DATABASE_SSL_FAIL_CLOSED=PASS
SECRET_HANDLING=PASS
INDIRECT_TRANSLATION_INFERENCE=NO
TEST_DB_MUTATED=NO
PRODUCTION_DB_MUTATED=NO
MIGRATION_REQUIRED=NO
MIGRATION_CREATED=NO
MIGRATIONS_0001_0011=UNCHANGED
FRONTEND_CHANGED=NO
DEPLOYED=NO
MERGED_TO_MAIN=NO
LIVE_TATOEBA_CALLS_DURING_TESTS=0
```

Verification on the Backend branch passed 19 Tatoeba-focused suites / 113
tests, 63 full unit suites / 431 tests, 13 e2e suites / 58 tests, typecheck,
lint, build, high-severity audit, and `git diff --check`. The audit reported
no high/critical findings and two moderate transitive `multer` advisories.
No migration command, database runtime, dataset, or live Tatoeba call was
used. The complete evidence is in
`evidence/PHASE-08D3C-TATOEBA-DIRECT-TRANSLATION-IMPLEMENTATION.md`.

```text
CURRENT_PHASE=08
PHASE_08=IN_PROGRESS
LNG_08_006=PASS
LNG_08_007=PLANNED
LNG_08_008=PLANNED
NEXT_ACTION=EXTERNAL_REVIEW_REQUIRED
```

## Phase 08D3C sentence reference contract remediation

The first 08D3C external review found that a translation endpoint identity was
not resolved to an existing canonical `SENTENCE` resource before translation
writes. The remediation is limited to that contract. Backend commit
`b4b922e86f15d6bd405cbea669d58d1fa18b5554` now performs a deterministic,
role-aware lookup of both `TATOEBA:SENTENCE:<id>` provenance identities,
locks endpoint resources in stable ID order, requires exactly one existing
`SENTENCE` mapping per endpoint, and validates resource type, language, exact
text, source URL, license, attribution, owner, import batch, and snapshot
facts. Missing, ambiguous, non-sentence, unrelated, or shared endpoint
mappings fail closed and roll back before translation-side writes. No sentence
resource is created by 08D3C.

```text
PHASE_08D3C_SENTENCE_REFERENCE_REMEDIATION=PASS
BACKEND_SHA=b4b922e86f15d6bd405cbea669d58d1fa18b5554
SOURCE_SENTENCE_CANONICAL_LOOKUP=PASS
TARGET_SENTENCE_CANONICAL_LOOKUP=PASS
SENTENCE_REFERENCE_CONTRACT=PASS
RESOURCE_TYPE_ENFORCEMENT=PASS
EXTERNAL_IDENTITY_MAPPING=PASS
AMBIGUOUS_MAPPING_FAIL_CLOSED=PASS
08D3C_CREATES_SENTENCE_RESOURCES=NO
SOURCE_MISSING_FAIL_CLOSED=PASS
TARGET_MISSING_FAIL_CLOSED=PASS
BOTH_MISSING_FAIL_CLOSED=PASS
NON_SENTENCE_ENDPOINT_FAIL_CLOSED=PASS
UNRELATED_CANONICAL_RESOURCE_FAIL_CLOSED=PASS
FAILED_ENDPOINT_TRANSLATION_WRITES=0
FAILED_ENDPOINT_PROVENANCE_WRITES=0
FAILED_ENDPOINT_AUDIT_WRITES=0
TRANSLATION_RECONCILIATION=PASS
EXACT_RETRY=PASS
CONCURRENT_RETRY=PASS
PROVENANCE=PASS
PROVENANCE_RETRY_DEDUP=PASS
AUDIT_CONTRACT=PASS
AUDIT_RETRY_DEDUP=PASS
STATE_TRANSITION=PASS
AUTO_PUBLISH=NO
TRANSACTIONAL_INTEGRITY=PASS
FAILURE_ROLLBACK=PASS
ACTOR_CONTRACT_PRESERVED=YES
LICENSE_CONTRACT_PRESERVED=YES
AUTO_REGISTER_LICENSES=NO
DATABASE_TARGET_AUTHORIZATION_PRESERVED=YES
REMOTE_DATABASE_SSL_FAIL_CLOSED=PASS
SECRET_HANDLING=PASS
LIVE_TATOEBA_CALLS_DURING_TESTS=0
TEST_DB_MUTATED=NO
PRODUCTION_DB_MUTATED=NO
MIGRATION_REQUIRED=NO
MIGRATION_CREATED=NO
MIGRATIONS_0001_0011=UNCHANGED
FRONTEND_CHANGED=NO
DEPLOYED=NO
MERGED_TO_MAIN=NO
CURRENT_PHASE=08
PHASE_08=IN_PROGRESS
LNG_08_006=PASS
PHASE_08D3C_EXTERNAL_REVIEW=RETRY_REQUIRED
NEXT_ACTION=EXTERNAL_REVIEW_RETRY
```

Verification: 18 Tatoeba suites / 118 tests PASS, 63 Backend suites / 439
tests PASS, 13 e2e suites / 58 tests PASS, typecheck/lint/build PASS, and
`git diff --check` PASS. No DB runtime, migration, live Tatoeba call, or
Frontend change was performed. 08D3C remains pending external-review retry;
runtime verification has not started.

## Phase 08D3C external-review retry

The independent external-review retry passed on Backend
`b4b922e86f15d6bd405cbea669d58d1fa18b5554`. Both direct translation endpoints
are resolved through existing `OPEN_DATASET` provenance to exactly one
canonical `SENTENCE` resource before translation reconciliation. Missing,
ambiguous, non-sentence, unrelated, mismatched, and shared-resource endpoint
cases fail closed with zero translation, provenance, or audit writes. The
08D3C path creates no sentence resources and preserves the reviewed direct
identity, lock, reconciliation, provenance, audit, review-state, actor,
license, target-safety, and secret-handling contracts.

```text
PHASE_08D3C_EXTERNAL_REVIEW_RETRY=PASS
BACKEND_REVIEWED_SHA=b4b922e86f15d6bd405cbea669d58d1fa18b5554
SOURCE_SENTENCE_CANONICAL_LOOKUP=PASS
TARGET_SENTENCE_CANONICAL_LOOKUP=PASS
SENTENCE_REFERENCE_CONTRACT=PASS
RESOURCE_TYPE_ENFORCEMENT=PASS
EXTERNAL_IDENTITY_MAPPING=PASS
AMBIGUOUS_MAPPING_FAIL_CLOSED=PASS
08D3C_CREATES_SENTENCE_RESOURCES=NO
SOURCE_MISSING_FAIL_CLOSED=PASS
TARGET_MISSING_FAIL_CLOSED=PASS
BOTH_MISSING_FAIL_CLOSED=PASS
NON_SENTENCE_ENDPOINT_FAIL_CLOSED=PASS
UNRELATED_CANONICAL_RESOURCE_FAIL_CLOSED=PASS
FAILED_ENDPOINT_TRANSLATION_WRITES=0
FAILED_ENDPOINT_PROVENANCE_WRITES=0
FAILED_ENDPOINT_AUDIT_WRITES=0
DIRECT_TRANSLATION_IDENTITY=PASS
DIRECT_ONLY_SEMANTICS=PASS
INDIRECT_TRANSLATION_INFERENCE=NO
REVERSED_RELATION_HANDLING=PASS
SELF_REFERENCE_HANDLING=PASS
TRANSLATION_RECONCILIATION=PASS
EXACT_RETRY=PASS
MATCHING_TRANSLATION_RECONCILIATION=PASS
CONFLICTING_TRANSLATION_HANDLING=PASS
PARTIAL_STATE_RECOVERY=PASS
CONCURRENT_RETRY=PASS
CONCURRENCY_PROTECTION=PASS
LOCK_IDENTITY_DETERMINISTIC=YES
PROVENANCE=PASS
PROVENANCE_RETRY_DEDUP=PASS
AUDIT_CONTRACT=PASS
AUDIT_RETRY_DEDUP=PASS
STATE_TRANSITION=PASS
AUTO_PUBLISH=NO
TRANSACTIONAL_INTEGRITY=PASS
FAILURE_ROLLBACK=PASS
ACTOR_CONTRACT_PRESERVED=YES
LICENSE_CONTRACT_PRESERVED=YES
AUTO_REGISTER_LICENSES=NO
DATABASE_TARGET_AUTHORIZATION_PRESERVED=YES
REMOTE_DATABASE_SSL_FAIL_CLOSED=PASS
SECRET_HANDLING=PASS
SQL_SAFETY=PASS
INPUT_VALIDATION=PASS
ERROR_SANITIZATION=PASS
LIVE_TATOEBA_CALLS_DURING_TESTS=0
TEST_DB_MUTATED=NO
PRODUCTION_DB_MUTATED=NO
MIGRATION_REQUIRED=NO
MIGRATION_CREATED=NO
MIGRATIONS_0001_0011=UNCHANGED
FOCUSED_TESTS=18 suites / 118 tests PASS; repository 17 tests PASS
BACKEND_TESTS=63 suites / 439 tests PASS
BACKEND_E2E=13 suites / 58 tests PASS
TYPECHECK=PASS
LINT=PASS
BUILD=PASS
AUDIT=PASS (no high/critical findings; 2 moderate transitive multer advisories)
GIT_DIFF_CHECK=PASS
FRONTEND_CHANGED=NO
DEPLOYED=NO
MERGED_TO_MAIN=NO
CURRENT_PHASE=08
PHASE_08=IN_PROGRESS
REVIEW_FINDINGS=NONE
NEXT_ACTION=READY_FOR_08D3C_RUNTIME_VERIFICATION
```

No database, live Tatoeba endpoint, migration, deployment, merge, or
Frontend change was performed. Runtime translation verification remains a
separate authorized task.

## Phase 08D3C TEST runtime verification — blocked input

The approved TEST target preflight passed with the explicit actor and both
required license contracts. A rollback-only read query found the previously
verified canonical sentence mapping, but no second suitable existing canonical
Tatoeba `SENTENCE` resource. The direct-translation operation was therefore
not invoked. No sentence, translation, provenance, audit, or state rows were
written, and no implementation or Backend commit was created.

```text
PHASE_08D3C_TEST_RUNTIME_VERIFICATION=BLOCKED_INPUT
ENVIRONMENT=TEST
DATABASE_TARGET_AUTHORIZATION=PASS
REMOTE_DATABASE_SSL_FAIL_CLOSED=PASS
ACTOR_RUNTIME_PREFLIGHT=PASS
CC_BY_RUNTIME_PREFLIGHT=PASS
CC0_RUNTIME_PREFLIGHT=PASS
SOURCE_TATOEBA_SENTENCE_ID=TATOEBA:SENTENCE:9999999999999999999999999999999999999999
SOURCE_CANONICAL_SENTENCE_ID=2909ae60-def7-44f8-aa7e-07c7ba22d8c3
TARGET_TATOEBA_SENTENCE_ID=NONE
TARGET_CANONICAL_SENTENCE_ID=NONE
SOURCE_SENTENCE_CANONICAL_LOOKUP=PASS
TARGET_SENTENCE_CANONICAL_LOOKUP=NOT_RUN
RESOURCE_TYPE_ENFORCEMENT=PASS
EXTERNAL_IDENTITY_MAPPING=PASS
DIRECT_ONLY_SEMANTICS=PASS
INDIRECT_TRANSLATION_INFERENCE=NO
LIVE_TATOEBA_CALLS=0
FIRST_TRANSLATION=NOT_RUN
CANONICAL_TRANSLATION_ID=NONE
TRANSLATION_RESOURCE_CONTRACT=NOT_RUN
PROVENANCE=NOT_RUN
AUDIT_CONTRACT=NOT_RUN
STATE_TRANSITION=NOT_RUN
AUTO_PUBLISH=NO
08D3C_SENTENCE_ROWS_CREATED=0
EXACT_RETRY=NOT_RUN
IDEMPOTENT_RUNTIME_RETRY=NOT_RUN
RECONCILIATION_RUNTIME=NOT_RUN
TRANSLATION_DUPLICATES=0
PROVENANCE_DUPLICATES=0
AUDIT_DUPLICATES=0
CONCURRENCY_PROTECTION_RUNTIME=NOT_RUN
LOCK_IDENTITY_DETERMINISTIC=YES
SOURCE_MISSING_FAIL_CLOSED=PASS
TARGET_MISSING_FAIL_CLOSED=PASS
TEST_DB_MUTATED=NO
AUTHORIZED_TEST_ROWS_CREATED=0
AUTHORIZED_TEST_ROWS_UPDATED=0
UNRELATED_DB_ROWS_MODIFIED=NO
PRODUCTION_DB_MUTATED=NO
BACKEND_CODE_CHANGED=NO
FRONTEND_CHANGED=NO
MIGRATION_REQUIRED=NO
MIGRATION_CREATED=NO
MIGRATIONS_0001_0011=UNCHANGED
FOCUSED_TESTS=18 suites / 118 tests PASS; repository 17 tests PASS; contract/link 8 tests PASS
GIT_DIFF_CHECK=PASS
DEPLOYED=NO
MERGED_TO_MAIN=NO
CURRENT_PHASE=08
PHASE_08=IN_PROGRESS
RUNTIME_FINDINGS=SECOND_CANONICAL_TEST_SENTENCE_REQUIRED
RUNTIME_BLOCKER=SECOND_CANONICAL_TEST_SENTENCE_REQUIRED
NEXT_ACTION=PREPARE_SECOND_TEST_SENTENCE
```

08D3C did not create the missing sentence and did not invoke 08D3B2.

## Phase 08D3C second canonical TEST sentence prerequisite

The approved TEST preflight passed, and exactly one additional synthetic
English canonical sentence was prepared through the accepted 08D3B2 sentence
import CLI. The existing Vietnamese fixture was read and remained unchanged.
The first sentence import created the second endpoint in
`COMMUNITY_REVIEW`; the exact retry returned `NOOP` with the same canonical
resource. No translation CLI or translation write was invoked.

```text
PHASE_08D3C_SECOND_TEST_SENTENCE_PREP=PASS
BACKEND_SHA=b4b922e86f15d6bd405cbea669d58d1fa18b5554
ENVIRONMENT=TEST
DATABASE_TARGET_AUTHORIZATION=PASS
REMOTE_DATABASE_SSL_FAIL_CLOSED=PASS
ACTOR_RUNTIME_PREFLIGHT=PASS
CC_BY_RUNTIME_PREFLIGHT=PASS
CC0_RUNTIME_PREFLIGHT=PASS
FIRST_TATOEBA_SENTENCE_ID=TATOEBA:SENTENCE:9999999999999999999999999999999999999999
FIRST_CANONICAL_SENTENCE_ID=2909ae60-def7-44f8-aa7e-07c7ba22d8c3
FIRST_TEST_SENTENCE_LANGUAGE=vi
FIRST_TEST_SENTENCE_UNCHANGED=YES
SECOND_TATOEBA_SENTENCE_ID=TATOEBA:SENTENCE:9999999999999999999999999999999999999998
SECOND_CANONICAL_SENTENCE_ID=b90ecd7c-6458-445d-83c9-c122d6166c20
SECOND_TEST_SENTENCE_LANGUAGE=en
DIRECT_TRANSLATION_LANGUAGE_PAIR_VALID=YES
LIVE_TATOEBA_CALLS=0
SECOND_SENTENCE_FIRST_IMPORT=PASS
SENTENCE_RESOURCE_CONTRACT=PASS
PROVENANCE=PASS
SUBMIT_AUDIT=PASS
COMMUNITY_REVIEW_TRANSITION=PASS
AUTO_PUBLISH=NO
SECOND_SENTENCE_EXACT_RETRY=PASS
SECOND_SENTENCE_IDEMPOTENT_RETRY=PASS
CANONICAL_SENTENCE_DUPLICATES=0
PROVENANCE_DUPLICATES=0
AUDIT_DUPLICATES=0
TRANSLATION_ROWS_CREATED=0
TRANSLATION_ROWS_UPDATED=0
TEST_DB_MUTATED=YES
AUTHORIZED_TEST_ROWS_CREATED=4
AUTHORIZED_TEST_ROWS_UPDATED=1
UNRELATED_DB_ROWS_MODIFIED=NO
PRODUCTION_DB_MUTATED=NO
DATABASE_URL_SECRET_LEAK=NO
DATABASE_PASSWORD_LEAK=NO
RAW_CONNECTION_STRING_LOGGING=NO
RAW_DB_ERROR_EXPOSURE=NO
BACKEND_CODE_CHANGED=NO
FRONTEND_CHANGED=NO
MIGRATION_REQUIRED=NO
MIGRATION_CREATED=NO
MIGRATIONS_0001_0011=UNCHANGED
FOCUSED_08D3B2_TESTS=1 suite / 10 tests PASS
FOCUSED_08D3C_TESTS=1 suite / 17 tests PASS
GIT_DIFF_CHECK=PASS
DEPLOYED=NO
MERGED_TO_MAIN=NO
CURRENT_PHASE=08
PHASE_08=IN_PROGRESS
RUNTIME_BLOCKER=NONE
NEXT_ACTION=RETRY_08D3C_TEST_RUNTIME_VERIFICATION
```

08D3C remains not accepted; this section only prepares its second existing
sentence endpoint.

## Phase 08D3C TEST runtime verification retry - blocked input

The approved TEST target, actor, and license preflight passed. A rollback-only
read resolved both approved canonical SENTENCE endpoints with the expected
external identities, UUIDs, languages, and resource type. No translation
operation was invoked.

The reviewed translation candidate contract requires both endpoint provenance
records to carry the same `importBatch` and `snapshotId`, while canonical
endpoint facts must match exactly. The existing endpoints do not satisfy that
shared-snapshot requirement: the Vietnamese endpoint is from the accepted
08D3B2 runtime batch/snapshot, while the English prerequisite endpoint is from
the later 08D3C prerequisite batch/snapshot. Modifying either sentence or
creating another sentence is outside this retry, so the translation write was
correctly stopped before any translation-side mutation.

```text
PHASE_08D3C_TEST_RUNTIME_VERIFICATION_RETRY=BLOCKED_INPUT
BACKEND_SHA=b4b922e86f15d6bd405cbea669d58d1fa18b5554
WORKSPACE_BEFORE_SHA=b4e4d0c987197f504dacb4f5d09ab178b47c5bd5
ENVIRONMENT=TEST
DATABASE_TARGET_AUTHORIZATION=PASS
DATABASE_HOST_TARGET_CHECK=PASS
DATABASE_NAME_TARGET_CHECK=PASS
DATABASE_USER_TARGET_CHECK=PASS
TEST_LABEL_ONLY_AUTHORIZATION=NO
REMOTE_DATABASE_SSL_FAIL_CLOSED=PASS
ACTOR_RUNTIME_PREFLIGHT=PASS
TEST_ADMIN_ACTOR_ID=f9520245-4388-4078-88ff-6f2411f08d55
CC_BY_RUNTIME_PREFLIGHT=PASS
CC0_RUNTIME_PREFLIGHT=PASS
DATABASE_URL_SECRET_LEAK=NO
DATABASE_PASSWORD_LEAK=NO
RAW_CONNECTION_STRING_LOGGING=NO
RAW_DB_ERROR_EXPOSURE=NO
SOURCE_TATOEBA_SENTENCE_ID=TATOEBA:SENTENCE:9999999999999999999999999999999999999999
SOURCE_CANONICAL_SENTENCE_ID=2909ae60-def7-44f8-aa7e-07c7ba22d8c3
SOURCE_LANGUAGE=vi
TARGET_TATOEBA_SENTENCE_ID=TATOEBA:SENTENCE:9999999999999999999999999999999999999998
TARGET_CANONICAL_SENTENCE_ID=b90ecd7c-6458-445d-83c9-c122d6166c20
TARGET_LANGUAGE=en
SOURCE_SENTENCE_CANONICAL_LOOKUP=PASS
TARGET_SENTENCE_CANONICAL_LOOKUP=PASS
RESOURCE_TYPE_ENFORCEMENT=PASS
EXTERNAL_IDENTITY_MAPPING=PASS
DIRECT_ONLY_SEMANTICS=PASS
INDIRECT_TRANSLATION_INFERENCE=NO
LIVE_TATOEBA_CALLS=0
SOURCE_IMPORT_BATCH=tatoeba-08d3b2-runtime
TARGET_IMPORT_BATCH=tatoeba-08d3c-runtime-prerequisite
SHARED_IMPORT_BATCH=NO
SOURCE_SNAPSHOT_ID=TATOEBA-SNAPSHOT-08D3B2-RUNTIME
TARGET_SNAPSHOT_ID=TATOEBA-SNAPSHOT-08D3C-TEST-SECOND-001
SHARED_SNAPSHOT_ID=NO
FIRST_TRANSLATION=NOT_RUN
CANONICAL_TRANSLATION_ID=NONE
TRANSLATION_RESOURCE_CONTRACT=NOT_RUN
PROVENANCE=NOT_RUN
AUDIT_CONTRACT=NOT_RUN
STATE_TRANSITION=NOT_RUN
AUTO_PUBLISH=NO
SOURCE_SENTENCE_UNCHANGED=YES
TARGET_SENTENCE_UNCHANGED=YES
08D3C_SENTENCE_ROWS_CREATED=0
EXACT_RETRY=NOT_RUN
IDEMPOTENT_RUNTIME_RETRY=NOT_RUN
RECONCILIATION_RUNTIME=NOT_RUN
CANONICAL_TRANSLATION_ID_AFTER_RETRY=NONE
TRANSLATION_DUPLICATES=0
PROVENANCE_DUPLICATES=0
AUDIT_DUPLICATES=0
CONCURRENCY_PROTECTION_RUNTIME=NOT_RUN
LOCK_IDENTITY_DETERMINISTIC=YES
SOURCE_MISSING_FAIL_CLOSED=PASS
TARGET_MISSING_FAIL_CLOSED=PASS
TEST_DB_MUTATED=NO
AUTHORIZED_TEST_ROWS_CREATED=0
AUTHORIZED_TEST_ROWS_UPDATED=0
UNRELATED_DB_ROWS_MODIFIED=NO
PRODUCTION_DB_MUTATED=NO
BACKEND_CODE_CHANGED=NO
FRONTEND_CHANGED=NO
MIGRATION_REQUIRED=NO
MIGRATION_CREATED=NO
MIGRATIONS_0001_0011=UNCHANGED
FOCUSED_TESTS=5 suites / 36 tests PASS
GIT_DIFF_CHECK=PASS
DEPLOYED=NO
MERGED_TO_MAIN=NO
CURRENT_PHASE=08
PHASE_08=IN_PROGRESS
RUNTIME_FINDINGS=CANONICAL_ENDPOINT_IMPORT_BATCH_AND_SNAPSHOT_MISMATCH
RUNTIME_BLOCKER=CANONICAL_ENDPOINT_IMPORT_BATCH_AND_SNAPSHOT_MISMATCH
NEXT_ACTION=BLOCKED_INPUT
```

No Backend or Frontend source changed, no database write occurred, and no
live Tatoeba call was made. A compatible pair of existing canonical TEST
sentence provenance snapshots is required before this runtime verification
can proceed.

## Phase 08D3C matching batch/snapshot TEST pair prerequisite

The 08D3C contract was rechecked before preparation. Both endpoint provenance
records must share the exact import batch and snapshot, and the provider must
remain TATOEBA through the provider-qualified source identity. The original
vi/en pair failed because its import batch and snapshot identities did not
match; both provider identities were TATOEBA.

The existing Vietnamese endpoint was safely reused. Exactly one new synthetic
English TEST sentence was created through the accepted 08D3B2 sentence-import
path using the Vietnamese endpoint's existing batch and snapshot. Its exact
retry returned `NOOP` with the same canonical UUID. No translation CLI or
translation write was invoked; the previous incompatible English fixture was
not modified.

```text
PHASE_08D3C_MATCHING_ENDPOINT_PREP=PASS
BACKEND_SHA=b4b922e86f15d6bd405cbea669d58d1fa18b5554
WORKSPACE_BEFORE_SHA=5f817e5e567da3128795a3dd3f15b43be977d468
ENVIRONMENT=TEST
BATCH_MATCH_REQUIRED=YES
SNAPSHOT_MATCH_REQUIRED=YES
SOURCE_PROVIDER_MATCH_REQUIRED=YES
ORIGINAL_SOURCE_IMPORT_BATCH_ID=tatoeba-08d3b2-runtime
ORIGINAL_SOURCE_SNAPSHOT_ID=TATOEBA-SNAPSHOT-08D3B2-RUNTIME
ORIGINAL_SOURCE_PROVIDER=TATOEBA
ORIGINAL_TARGET_IMPORT_BATCH_ID=tatoeba-08d3c-runtime-prerequisite
ORIGINAL_TARGET_SNAPSHOT_ID=TATOEBA-SNAPSHOT-08D3C-TEST-SECOND-001
ORIGINAL_TARGET_PROVIDER=TATOEBA
ORIGINAL_PAIR_COMPATIBILITY=FAIL
ORIGINAL_PAIR_MISMATCH_REASON=IMPORT_BATCH_MISMATCH_AND_SNAPSHOT_MISMATCH
COMPATIBLE_PAIR_SOURCE=REUSED
COMPATIBLE_PAIR_TARGET=NEW_FIXTURE
SOURCE_TATOEBA_SENTENCE_ID=TATOEBA:SENTENCE:9999999999999999999999999999999999999999
SOURCE_CANONICAL_SENTENCE_ID=2909ae60-def7-44f8-aa7e-07c7ba22d8c3
SOURCE_LANGUAGE=vi
TARGET_TATOEBA_SENTENCE_ID=TATOEBA:SENTENCE:9999999999999999999999999999999999999997
TARGET_CANONICAL_SENTENCE_ID=0cd78981-c1d6-4f24-982a-cc6703ca7046
TARGET_LANGUAGE=en
SHARED_IMPORT_BATCH_ID=tatoeba-08d3b2-runtime
SHARED_SNAPSHOT_ID=TATOEBA-SNAPSHOT-08D3B2-RUNTIME
SOURCE_PROVIDER=TATOEBA
SOURCE_SENTENCE_CANONICAL_LOOKUP=PASS
TARGET_SENTENCE_CANONICAL_LOOKUP=PASS
IMPORT_BATCH_COMPATIBILITY=PASS
SNAPSHOT_COMPATIBILITY=PASS
SOURCE_PROVIDER_COMPATIBILITY=PASS
DIRECT_TRANSLATION_LANGUAGE_PAIR_VALID=YES
LIVE_TATOEBA_CALLS=0
NEW_SENTENCE_FIXTURES_CREATED=1
SECOND_SENTENCE_FIRST_IMPORT=PASS
SECOND_SENTENCE_EXACT_RETRY=PASS
CANONICAL_SENTENCE_DUPLICATES=0
PROVENANCE_DUPLICATES=0
AUDIT_DUPLICATES=0
TRANSLATION_ROWS_CREATED=0
TRANSLATION_ROWS_UPDATED=0
TEST_DB_MUTATED=YES
AUTHORIZED_TEST_ROWS_CREATED=4
AUTHORIZED_TEST_ROWS_UPDATED=1
UNRELATED_DB_ROWS_MODIFIED=NO
PRODUCTION_DB_MUTATED=NO
DATABASE_URL_SECRET_LEAK=NO
DATABASE_PASSWORD_LEAK=NO
RAW_CONNECTION_STRING_LOGGING=NO
RAW_DB_ERROR_EXPOSURE=NO
BACKEND_CODE_CHANGED=NO
FRONTEND_CHANGED=NO
MIGRATION_REQUIRED=NO
MIGRATION_CREATED=NO
MIGRATIONS_0001_0011=UNCHANGED
FOCUSED_08D3B2_TESTS=4 suites / 23 tests PASS
FOCUSED_08D3C_TESTS=5 suites / 31 tests PASS
BATCH_SNAPSHOT_TESTS=1 suite / 4 tests PASS
GIT_DIFF_CHECK=PASS
DEPLOYED=NO
MERGED_TO_MAIN=NO
CURRENT_PHASE=08
PHASE_08=IN_PROGRESS
RUNTIME_BLOCKER=NONE
NEXT_ACTION=RETRY_08D3C_TEST_RUNTIME_VERIFICATION
```

The prior incompatible English sentence remains intact. This preparation
created no translation data and is not 08D3C acceptance.

## Phase 08D3C controlled TEST runtime verification retry

The approved compatible TEST endpoints were used exactly as selected. The
08D3B1 target, actor, license, SSL, and secret-sanitization gates passed before
the translation-side transaction. No source code changed and no live Tatoeba
call occurred.

```text
PHASE_08D3C_TEST_RUNTIME_VERIFICATION_RETRY=PASS
BACKEND_SHA=b4b922e86f15d6bd405cbea669d58d1fa18b5554
WORKSPACE_BEFORE_SHA=6e4a371061ef2e0e368cc05c133a47e4584aeb38
ENVIRONMENT=TEST
DATABASE_TARGET_AUTHORIZATION=PASS
DATABASE_HOST_TARGET_CHECK=PASS
DATABASE_NAME_TARGET_CHECK=PASS
DATABASE_USER_TARGET_CHECK=PASS
TEST_LABEL_ONLY_AUTHORIZATION=NO
REMOTE_DATABASE_SSL_FAIL_CLOSED=PASS
ACTOR_RUNTIME_PREFLIGHT=PASS
TEST_ADMIN_ACTOR_ID=f9520245-4388-4078-88ff-6f2411f08d55
CC_BY_RUNTIME_PREFLIGHT=PASS
CC0_RUNTIME_PREFLIGHT=PASS
DATABASE_URL_SECRET_LEAK=NO
DATABASE_PASSWORD_LEAK=NO
RAW_CONNECTION_STRING_LOGGING=NO
RAW_DB_ERROR_EXPOSURE=NO
SOURCE_TATOEBA_SENTENCE_ID=TATOEBA:SENTENCE:9999999999999999999999999999999999999999
SOURCE_CANONICAL_SENTENCE_ID=2909ae60-def7-44f8-aa7e-07c7ba22d8c3
SOURCE_LANGUAGE=vi
TARGET_TATOEBA_SENTENCE_ID=TATOEBA:SENTENCE:9999999999999999999999999999999999999997
TARGET_CANONICAL_SENTENCE_ID=0cd78981-c1d6-4f24-982a-cc6703ca7046
TARGET_LANGUAGE=en
SOURCE_SENTENCE_CANONICAL_LOOKUP=PASS
TARGET_SENTENCE_CANONICAL_LOOKUP=PASS
RESOURCE_TYPE_ENFORCEMENT=PASS
EXTERNAL_IDENTITY_MAPPING=PASS
SOURCE_IMPORT_BATCH_ID=tatoeba-08d3b2-runtime
TARGET_IMPORT_BATCH_ID=tatoeba-08d3b2-runtime
SOURCE_SNAPSHOT_ID=TATOEBA-SNAPSHOT-08D3B2-RUNTIME
TARGET_SNAPSHOT_ID=TATOEBA-SNAPSHOT-08D3B2-RUNTIME
SOURCE_PROVIDER=TATOEBA
TARGET_PROVIDER=TATOEBA
IMPORT_BATCH_COMPATIBILITY=PASS
SNAPSHOT_COMPATIBILITY=PASS
SOURCE_PROVIDER_COMPATIBILITY=PASS
DIRECT_ONLY_SEMANTICS=PASS
INDIRECT_TRANSLATION_INFERENCE=NO
LIVE_TATOEBA_CALLS=0
FIRST_TRANSLATION=PASS
CANONICAL_TRANSLATION_ID=e726c590-3161-46cd-aa90-698b6eab8df9
TRANSLATION_RESOURCE_CONTRACT=PASS
PROVENANCE=PASS
AUDIT_CONTRACT=PASS
STATE_TRANSITION=PASS
AUTO_PUBLISH=NO
SOURCE_SENTENCE_UNCHANGED=YES
TARGET_SENTENCE_UNCHANGED=YES
08D3C_SENTENCE_ROWS_CREATED=0
08D3C_SENTENCE_ROWS_UPDATED=0
EXACT_RETRY=PASS
IDEMPOTENT_RUNTIME_RETRY=PASS
RECONCILIATION_RUNTIME=PASS
CANONICAL_TRANSLATION_ID_AFTER_RETRY=e726c590-3161-46cd-aa90-698b6eab8df9
TRANSLATION_DUPLICATES=0
PROVENANCE_DUPLICATES=0
AUDIT_DUPLICATES=0
CONCURRENCY_PROTECTION_RUNTIME=PASS
LOCK_IDENTITY_DETERMINISTIC=YES
SOURCE_MISSING_FAIL_CLOSED=PASS
TARGET_MISSING_FAIL_CLOSED=PASS
BATCH_MISMATCH_FAIL_CLOSED=PASS
SNAPSHOT_MISMATCH_FAIL_CLOSED=PASS
PROVIDER_MISMATCH_FAIL_CLOSED=PASS
TEST_DB_MUTATED=YES
AUTHORIZED_TEST_ROWS_CREATED=5
AUTHORIZED_TEST_ROWS_UPDATED=1
UNRELATED_DB_ROWS_MODIFIED=NO
PRODUCTION_DB_MUTATED=NO
BACKEND_CODE_CHANGED=NO
FRONTEND_CHANGED=NO
MIGRATION_REQUIRED=NO
MIGRATION_CREATED=NO
MIGRATIONS_0001_0011=UNCHANGED
FOCUSED_TESTS=5 suites / 31 tests PASS
BATCH_SNAPSHOT_TESTS=1 suite / 4 tests PASS
GIT_DIFF_CHECK=PASS
DEPLOYED=NO
MERGED_TO_MAIN=NO
CURRENT_PHASE=08
PHASE_08=IN_PROGRESS
RUNTIME_FINDINGS=NONE
RUNTIME_BLOCKER=NONE
NEXT_ACTION=READY_FOR_08D3C_ACCEPTANCE
```

The first execution created the canonical translation resource and the exact
retry reconciled to it with no duplicate translation, provenance, or audit
rows. The resulting resource remains in `COMMUNITY_REVIEW`; auto-publish was
not performed. The two existing sentence resources remained unchanged and no
sentence rows were created or updated by 08D3C. This is runtime verification
evidence only; 08D3C acceptance remains a separate gate.

## Phase 08D3C acceptance closeout

The authoritative Workspace task mapping is the parent adapter task
`LNG_08_006`; 08D3C is a completed direct-translation sub-slice and does not
receive an invented task ID. The implementation, sentence-reference
remediation, external-review retry, and controlled TEST runtime evidence now
satisfy the documented 08D3C acceptance criteria. No Backend source, Frontend
source, or database was changed during this closeout.

```text
PHASE_08D3C_ACCEPTANCE=PASS
BACKEND_SHA=b4b922e86f15d6bd405cbea669d58d1fa18b5554
WORKSPACE_BEFORE_SHA=627223488d87f7b3ce5c040831e036697f258c02
08D3C_TASK_ID=LNG_08_006
08D3C_TASK_STATUS=PASS
IMPLEMENTATION_EVIDENCE=PASS
REMEDIATION_EVIDENCE=PASS
EXTERNAL_REVIEW_EVIDENCE=PASS
TEST_RUNTIME_EVIDENCE=PASS
SENTENCE_REFERENCE_CONTRACT=PASS
DIRECT_ONLY_SEMANTICS=PASS
INDIRECT_TRANSLATION_INFERENCE=NO
IMPORT_BATCH_COMPATIBILITY=PASS
SNAPSHOT_COMPATIBILITY=PASS
SOURCE_PROVIDER_COMPATIBILITY=PASS
TRANSLATION_RECONCILIATION=PASS
IDEMPOTENT_RUNTIME_RETRY=PASS
CANONICAL_TRANSLATION_ID=e726c590-3161-46cd-aa90-698b6eab8df9
CANONICAL_TRANSLATION_ID_STABLE=YES
TRANSLATION_DUPLICATES=0
PROVENANCE_DUPLICATES=0
AUDIT_DUPLICATES=0
CONCURRENCY_PROTECTION=PASS
PROVENANCE=PASS
AUDIT_CONTRACT=PASS
STATE_TRANSITION=PASS
AUTO_PUBLISH=NO
SOURCE_SENTENCE_UNCHANGED=YES
TARGET_SENTENCE_UNCHANGED=YES
08D3C_SENTENCE_ROWS_CREATED=0
FAIL_CLOSED_CONTRACT=PASS
PRODUCTION_DB_MUTATED=NO
MIGRATION_REQUIRED=NO
MIGRATIONS_0001_0011=UNCHANGED
BACKEND_CODE_CHANGED=NO
FRONTEND_CHANGED=NO
DEPLOYED=NO
MERGED_TO_MAIN=NO
CURRENT_PHASE=08
PHASE_08=IN_PROGRESS
LNG_08_006=PASS
NEXT_08D3_TASK_ID=08D3D
NEXT_08D3_TASK_NAME=TEST database verification and publication
NEXT_08D3_TASK_STATUS=PLANNED
NEXT_ACTION=READY_FOR_NEXT_08D3_TASK
```

Runtime evidence remains sanitized and records no database URL, password,
secret query parameters, or unnecessary personal data. The next task is
documented only as ready/planned; it was not started by this closeout.
