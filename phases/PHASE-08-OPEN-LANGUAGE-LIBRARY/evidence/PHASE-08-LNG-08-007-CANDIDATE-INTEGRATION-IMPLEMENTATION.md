# Phase 08 — LNG-08-007 Candidate Integration Implementation

This record covers implementation only. The task remains pending external
review and acceptance; no merge, deployment, or runtime database verification
was performed.

## Authoritative scope

The authoritative task text says to consume provenance-aware Phase 06
candidates, send them through Library review, preserve source post/correction
contributor links subject to visibility/privacy, and never treat asker
acceptance as Library verification. The Workspace decomposition contains no
smaller LNG-08-007 atomic sub-task and no fixed mapping from candidate kind to
a single Library resource type.

The implemented atomic scope is:

> An authenticated reviewer submits a normalized payload for one existing
> Library resource family, and the Backend atomically binds exactly one active
> Phase 06 `PENDING_REVIEW` `CORRECTION_PROPOSAL` or `QA_ANSWER` candidate to
> one new or already matching canonical Library resource. The resource is
> created/reconciled with candidate-derived provenance and a normal
> `DRAFT -> COMMUNITY_REVIEW` `SUBMIT` audit. The Phase 06 candidate remains
> pending; no canonical sentence/translation fact is overwritten and no
> automatic verify, correction application, or Q&A publication occurs.

Because the authoritative documents do not define an automatic kind-to-resource
mapping, the reviewer owns the destination resource type and normalized details.
The endpoint does not infer a type, create a relationship graph, or accept
caller-supplied source identity. Both candidate kinds use the same guarded
integration/reconciliation pipeline. No bulk import, machine-generated
content, notification/search/index work, deployment, or frontend work is in
scope.

## Candidate/source contract

- Source truth is the canonical Phase 06 candidate plus its post, structured
  response, target language, active acceptance, and contributor rows.
- `CORRECTION_PROPOSAL` and `QA_ANSWER` are both supported. Correction data is
  validated as source/corrected text; Q&A data is validated as source/question
  and answer text. Explanations remain candidate data and are not applied to an
  existing canonical resource.
- The candidate UUID is the deterministic integration identity. PostgreSQL
  uses a transaction-scoped advisory lock keyed by
  `PHASE06_LIBRARY_CANDIDATE:<candidateId>`; the in-memory implementation uses
  a candidate-scoped lock for concurrency tests.
- The service obtains the candidate by ID and derives all Phase 06 source
  references, source post/response/acceptance IDs, and original contributor
  ownership from that record. PostgreSQL re-locks and revalidates the complete
  source bundle before any Library write, including current visibility,
  moderation, response kind/content, acceptance identity/time, and candidate
  payload.
- The explicit authenticated actor must be `MODERATOR` or `ADMIN`. There is no
  actor discovery and no role grant.
- The license key and attribution are supplied by the reviewer, but the license
  must already exist, be active, and allow redistribution. No license is
  registered automatically.

## Resource, provenance, and review behavior

- Integration creates one canonical Library resource, one
  `PHASE06_LIBRARY_CANDIDATE` provenance row, and one normal `SUBMIT` review
  audit. It does not create a separate relationship or a second Phase 06
  candidate record.
- The destination is required to be `PUBLIC` but remains hidden from public
  projections while in `COMMUNITY_REVIEW`; publication still requires the
  existing reviewer verification workflow.
- Provenance contains the canonical candidate, post, response, and acceptance
  references plus original contributor, license, attribution, and timestamps.
- An exact retry reconciles to the same resource/provenance/audit. Matching
  pre-existing partial state is completed without duplicate evidence. A
  conflicting payload, source mismatch, multiple claim, or invalid source
  fails closed. Existing `VERIFIED`/`REJECTED` state is never downgraded.
- Candidate integration never updates `community_posts`, correction requests,
  structured responses, acceptances, sentence rows, translation rows, or
  external canonical identities. It does not auto-apply a correction or
  auto-publish a Q&A answer.

## Implementation evidence

```text
BACKEND_BEFORE_SHA=b4b922e86f15d6bd405cbea669d58d1fa18b5554
BACKEND_AFTER_SHA=d352da974bed2f3d1828762a3f486d43dab840e6
BACKEND_BRANCH=phase-08-lng-08-007-candidate-integration
WORKSPACE_BEFORE_SHA=da3d0110bcc720fdacf9c7fffd6acf2eae4df496

LNG_08_007_SCOPE=Reviewer-owned normalized Library resource payload is atomically bound to one active Phase 06 correction or Q&A candidate, with canonical candidate provenance and DRAFT-to-COMMUNITY_REVIEW submission, without canonical fact mutation or automatic verification/publication
IMPLEMENTATION_RESULT=PASS_PENDING_EXTERNAL_REVIEW
CORRECTION_CANDIDATE_IN_SCOPE=YES
QA_CANDIDATE_IN_SCOPE=YES
CANDIDATE_SOURCE_CONTRACT=PASS
CORRECTION_CANDIDATE_CONTRACT=PASS
CORRECTION_AUTO_APPLY=NO
QA_CANDIDATE_CONTRACT=PASS
QA_AUTO_PUBLISH=NO
CANONICAL_RESOURCE_REFERENCE_VALIDATION=PASS
CANONICAL_RESOURCE_MUTATION=NO
CANDIDATE_IDENTITY_DETERMINISTIC=YES
CANDIDATE_RECONCILIATION=PASS
EXACT_RETRY=PASS
MATCHING_CANDIDATE_RECONCILIATION=PASS
CONFLICTING_CANDIDATE_HANDLING=PASS
PARTIAL_STATE_RECOVERY=PASS
CONCURRENT_RETRY=PASS
PROVENANCE=PASS
PROVENANCE_RETRY_DEDUP=PASS
AUDIT_CONTRACT=PASS
AUDIT_RETRY_DEDUP=PASS
CANDIDATE_STATE_CONTRACT=PASS
AUTO_APPROVE=NO
TRANSACTIONAL_INTEGRITY=PASS
FAILURE_ROLLBACK=PASS
ACTOR_CONTRACT_PRESERVED=YES
ACTOR_DISCOVERY=NONE
LICENSE_CONTRACT_PRESERVED=YES
AUTO_REGISTER_LICENSES=NO
DATABASE_TARGET_AUTHORIZATION_PRESERVED=YES
REMOTE_DATABASE_SSL_FAIL_CLOSED=PASS
SECRET_HANDLING=PASS
PRIOR_08D3B2_CONTRACT_PRESERVED=YES
PRIOR_08D3C_CONTRACT_PRESERVED=YES
PRIOR_08D3D_CONTRACT_PRESERVED=YES
LIVE_EXTERNAL_CALLS_DURING_TESTS=0
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
LNG_08_007=VERIFYING
NEXT_ACTION=EXTERNAL_REVIEW_REQUIRED
```

## Verification

```text
FOCUSED_CANDIDATE_TESTS=2 suites / 10 tests PASS
BACKEND_TESTS=65 suites / 449 tests PASS
BACKEND_E2E=13 suites / 59 tests PASS
TYPECHECK=PASS
LINT=PASS
BUILD=PASS
AUDIT=PASS_WITH_2_MODERATE_PRE_EXISTING_MULTER_ADVISORIES
GIT_DIFF_CHECK=PASS
```

The audit command exited successfully. It reported the existing two moderate
`multer` advisories reachable through `@nestjs/platform-express`; no audit fix
or dependency change was made because that is outside LNG-08-007 scope.

No TEST or production database connection was used by implementation tests,
and no live Tatoeba or external AI/service call was made. The next gate is
external review; LNG-08-007 is not accepted and Phase 08 remains in progress.
