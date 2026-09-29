# Phase 08 LNG-08-008 Library Reconciliation Implementation Evidence

This record covers implementation only. The task remains pending external
review and acceptance; no merge, deployment, or runtime database verification
was performed.

## Authoritative scope

The authoritative task text asks to reconcile provenance, duplicate imports,
review state, public visibility, search/filter, contribution consent, and
source invalidation. The Workspace documents do not define a new whole-Library
reconciliation endpoint, batch protocol, or precedence rule. The first
documented atomic unit selected for this implementation is therefore:

> Reconcile one exact Tatoeba `OPEN_DATASET` `SENTENCE` source identity in one
> transaction. The operation uses the existing global source-identity lookup,
> deterministic advisory lock, canonical sentence/resource/provenance facts,
> review state, and review-audit history. It can create a missing imported
> resource, complete a safe importer-owned draft, reconcile editable
> `COMMUNITY_REVIEW` source drift, or invalidate changed `VERIFIED` content to
> `COMMUNITY_REVIEW` before a later review. Ambiguous or conflicting state is
> quarantined and rolled back.

Translation identities, Phase 06 candidate integration, community contribution
submission, bulk or cross-resource scans, reviewer UI, public search/filter UI,
notifications, deployment, and production mutation are outside this atomic
unit. Existing 08D3C, 08D3D, and LNG-08-007 contracts remain regression
boundaries and are not reimplemented here.

## Source of truth and identity

- Source of truth is the exact Tatoeba-enriched candidate facts from the
  existing 08D3 contract, joined to the canonical Library resource and its
  `OPEN_DATASET` provenance row.
- Durable source identity is `TATOEBA:SENTENCE:<id>`.
- Lock identity is `OPEN_DATASET:TATOEBA:SENTENCE:<id>`.
- The exact global provenance lookup must resolve zero or one resource. More
  than one resource is a duplicate logical identity and fails closed.
- Canonical resource ID, resource type, source identity, verified content,
  rejected state, attribution, license, and external identity are never
  reassigned or silently overwritten.

## Supported reconciliation classes

The implementation uses the existing importer result vocabulary:

- `CREATED`: no exact source identity exists; create one `SENTENCE` resource
  as `DRAFT`, attach complete provenance, write `SUBMIT`, and transition to
  `COMMUNITY_REVIEW` in the same transaction.
- `NOOP`: exact candidate facts, provenance, current state, and audit history
  already match; retry creates no resource, provenance, audit, or update rows.
- `RECONCILED`: a candidate-owned `DRAFT` or editable `COMMUNITY_REVIEW`
  resource is safely completed or updated under the source lock.
- `INVALIDATED`: changed facts target a coherent `VERIFIED` resource; the
  importer writes only the documented `VERIFIED -> COMMUNITY_REVIEW`
  invalidation audit/state transition and does not rewrite verified content.
- `QUARANTINED:TATOEBA_IMPORT_INTEGRITY_CONFLICT`: duplicate logical resource,
  missing/ambiguous canonical state or provenance join, wrong resource type or
  identity, unknown review state, inconsistent audit ordering, missing submit
  evidence, or hydration conflict.
- `QUARANTINED:TATOEBA_IMPORT_REJECTED_NO_REOPEN`: changed facts target a
  rejected resource; the importer never silently reopens it.
- Existing actor, license, timestamp, target, and candidate validation
  quarantine codes remain in force.

## Automatic repair and conflict rules

```text
RECONCILIATION_IDENTITY_DETERMINISTIC=YES
AUTO_REPAIR_ALLOWED=YES
AUTO_REPAIR_SCOPE=one exact TATOEBA:SENTENCE:<id> identity; missing-resource creation, importer-owned DRAFT completion, safe COMMUNITY_REVIEW fact reconciliation, and VERIFIED invalidation only
AMBIGUOUS_RECONCILIATION_FAIL_CLOSED=PASS
CONFLICT_RECONCILIATION_FAIL_CLOSED=PASS
CANONICAL_RESOURCE_INTEGRITY=PASS
```

No winner is selected for duplicate identity, split provenance, resource/type
mismatch, or audit/history conflict. Editable-state reconciliation is bounded
to the candidate-owned source identity and does not merge unrelated resources.
No auto-approve and no auto-publish path was added.

Audit history is read in deterministic `(created_at, id)` order and checked
against the existing allowed transition contract before an existing resource
can be treated as already reconciled. A missing submit audit, malformed
history, duplicate transition, impossible transition, or current-state/history
mismatch fails closed. Retries do not add duplicate audit history.

## Contract and safety reconciliation

```text
PROVENANCE_RECONCILIATION=PASS
PROVENANCE_RETRY_DEDUP=PASS
AUDIT_RECONCILIATION=PASS
AUDIT_RETRY_DEDUP=PASS
STATE_HISTORY_RECONCILIATION=PASS
STATE_HISTORY_RETRY_DEDUP=PASS
STATE_MUTATION_ALLOWED=YES
STATE_CONTRACT=PASS
AUTO_APPROVE=NO
AUTO_PUBLISH=NO
EXACT_RETRY=PASS
ALREADY_RECONCILED=PASS
PARTIAL_STATE_RECOVERY=PASS
RECONCILIATION_RETRY_DEDUP=PASS
CONCURRENCY_PROTECTION=PASS
LOCK_IDENTITY_DETERMINISTIC=YES
TRANSACTIONAL_INTEGRITY=PASS
FAILURE_ROLLBACK=PASS
```

The explicit existing `ADMIN` actor is required. There is no actor discovery,
role grant, license registration, or secret/error leakage. Existing database
target host/database/user authorization and remote SSL fail-closed behavior are
preserved. All values remain parameterized; no raw SQL interpolation was
introduced.

The strict timestamp behavior accepted by LNG-08-007 remains unchanged:
millisecond precision is preserved, timezone-less and invalid timestamps fail
closed, and no process-timezone-dependent parsing was added.

## Implementation and verification evidence

```text
PHASE_08_LNG_08_008_IMPLEMENTATION=PASS
BACKEND_BEFORE_SHA=76b02cd25865530fc626f57474fec1acc0e54e53
BACKEND_AFTER_SHA=7877184d4ce44cd2d43f8eefd58c9f2935adf623
BACKEND_BRANCH=phase-08-lng-08-008-sentence-reconciliation
WORKSPACE_BEFORE_SHA=21dbb05d378553a2070559d5f06544b5fb9d439e
LNG_08_008_TASK_ID=LNG_08_008
LNG_08_008_TASK_STATUS=VERIFYING
IMPLEMENTATION_RESULT=PASS
PRIOR_LNG_08_006_CONTRACT_PRESERVED=YES
PRIOR_LNG_08_007_CONTRACT_PRESERVED=YES
DATABASE_TARGET_AUTHORIZATION_PRESERVED=YES
REMOTE_DATABASE_SSL_FAIL_CLOSED=PASS
SECRET_HANDLING=PASS
ACTOR_CONTRACT_PRESERVED=YES
ACTOR_DISCOVERY=NONE
LICENSE_CONTRACT_PRESERVED=YES
AUTO_REGISTER_LICENSES=NO
INPUT_VALIDATION=PASS
SQL_SAFETY=PASS
ERROR_SANITIZATION=PASS
MILLISECOND_PRECISION_PRESERVED=YES
TIMEZONE_LESS_TIMESTAMP_FAIL_CLOSED=PASS
INVALID_TIMESTAMP_FAIL_CLOSED=PASS
PROCESS_TIMEZONE_INDEPENDENCE=PASS
LIVE_EXTERNAL_CALLS_DURING_TESTS=0
TEST_DB_MUTATED=NO
PRODUCTION_DB_MUTATED=NO
MIGRATION_REQUIRED=NO
MIGRATION_CREATED=NO
MIGRATIONS_0001_0011=UNCHANGED
FOCUSED_TESTS=1 suite / 15 tests PASS
BACKEND_TESTS=65 suites / 471 tests PASS
BACKEND_E2E=13 suites / 59 tests PASS
TYPECHECK=PASS
LINT=PASS
BUILD=PASS
AUDIT=PASS_OFFLINE_0_VULNERABILITIES
GIT_DIFF_CHECK=PASS
FRONTEND_CHANGED=NO
DEPLOYED=NO
MERGED_TO_MAIN=NO
CURRENT_PHASE=08
PHASE_08=IN_PROGRESS
NEXT_ACTION=EXTERNAL_REVIEW_REQUIRED
```

The automated checks used mocked/in-memory boundaries and did not connect to a
TEST or production database, Tatoeba, AI, moderation, or other live service.
The online npm audit endpoint was unavailable in the sandbox; the safe offline
audit completed successfully with zero reported vulnerabilities. No dependency
or migration change was made.

The remaining gate is external review of the bounded sentence reconciliation
contract. This evidence does not accept LNG-08-008 and does not authorize the
next task.
