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
LNG_08_004=VERIFYING
LNG_08_005=PLANNED
LNG_08_006=PLANNED
LNG_08_007=PLANNED
LNG_08_008=PLANNED
FRONTEND_BRANCH=phase-08b2b-community-contribution-ui
BACKEND_SHA=80df2dd0652c3fba024caf1224917e73b609a1d7
FRONTEND_BASE_SHA=4137f51e392f8aa947768e7dc7a28a29bf64f206
BACKEND_CHANGED=NO
MIGRATION_0011_TEST=APPLIED
MIGRATION_0011_FROZEN=YES
OWNER_VISUAL_ACCEPTANCE_08B2=PENDING
TEST_DB_MUTATED=NO
PRODUCTION_DB_MUTATED=NO
DEPLOYED=NO
NEXT_ACTION=STOP_FOR_EXTERNAL_AND_OWNER_VISUAL_REVIEW
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
`evidence/PHASE-08B2B-IMPLEMENTATION.md` and the companion plan. Frontend
owner visual acceptance is intentionally still pending. Backend, migrations,
Neon TEST data, production, and deployment were not changed in this slice.
