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
review guidance without adding a Request Changes action. Owner visual
acceptance remains pending.
