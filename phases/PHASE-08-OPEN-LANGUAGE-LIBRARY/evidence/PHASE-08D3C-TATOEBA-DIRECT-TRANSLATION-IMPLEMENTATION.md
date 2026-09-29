# Phase 08D3C — Tatoeba direct translation and reconciliation

## Implementation boundary

This slice implements only the documented 08D3C direct translation and
reconciliation unit under `LNG_08_006`. It does not add sentence import logic,
bulk orchestration, dataset download, indirect or multi-hop translation,
machine translation, moderation automation, frontend work, deployment, or
runtime import execution.

```text
PHASE_08D3C_IMPLEMENTATION=PASS
08D3C_SCOPE=direct translation and reconciliation only
IMPLEMENTATION_RESULT=PASS
BACKEND_BRANCH=phase-08d3c-tatoeba-direct-translation
BACKEND_SHA=0506ca4357b91bc8f10247f9f522e5717db854c4
WORKSPACE_BRANCH=phase-08d3c-tatoeba-direct-translation
BASELINE_BACKEND_SHA=656f396c06797b993f625fb49820cebf6ca9fe0c
BASELINE_WORKSPACE_SHA=cac91dd8610d7e637a44154559f71d898d6754b7
```

## Direct identity and relationship semantics

Reciprocal bulk link rows are collapsed only for input deduplication:

```text
INPUT_PAIR_IDENTITY=TATOEBA:PAIR:<minId>:<maxId>
DURABLE_TRANSLATION_IDENTITY=TATOEBA:LINK:DIRECT:<sourceSentenceId>:<targetSentenceId>
TRANSLATION_LOCK_IDENTITY=OPEN_DATASET:TATOEBA:LINK:DIRECT:<sourceSentenceId>:<targetSentenceId>
```

The durable identity is directed. Configured language direction assigns the
source/target roles; numeric sentence-ID ordering is never used as linguistic
direction. Reverse direction is a distinct resource only when explicitly
configured. No transitive closure or implicit reverse resource is created.

Each durable translation carries two role-qualified `OPEN_DATASET` provenance
entries derived from the directed identity:

```text
TATOEBA:LINK:DIRECT:<sourceSentenceId>:<targetSentenceId>:SOURCE
TATOEBA:LINK:DIRECT:<sourceSentenceId>:<targetSentenceId>:TARGET
```

The endpoint URL, license, owner, attribution, snapshot/import metadata, and
endpoint role remain separate for source and target. Exact role-qualified
provenance lookup is the idempotency boundary; transformation history is
metadata only.

## Transaction and lifecycle contract

The implementation acquires a transaction-scoped advisory lock, performs the
exact two-role global lookup, validates the explicit ADMIN actor and existing
license registry rows, and then creates or reconciles the translation in one
PostgreSQL transaction. A new safe resource is inserted as `DRAFT`, receives
both provenance rows and one `SUBMIT` audit, then transitions to
`COMMUNITY_REVIEW`. It never auto-publishes or emits a contribution event.

Safe exact retries return `NOOP` without resource/provenance/audit churn.
Matching DRAFT state may be reconciled and submitted; matching
`COMMUNITY_REVIEW` state is reused. Changed VERIFIED state is invalidated to
`COMMUNITY_REVIEW` before any future reconciliation, and REJECTED state is not
silently reopened. Missing, split, non-TRANSLATION, or conflicting role lookup
is quarantined and rolled back.

```text
DIRECT_TRANSLATION_IDENTITY=PASS
DIRECT_ONLY_SEMANTICS=PASS
INDIRECT_TRANSLATION_INFERENCE=NO
TRANSLATION_RECONCILIATION=PASS
EXACT_RETRY=PASS
MATCHING_TRANSLATION_RECONCILIATION=PASS
CONFLICTING_TRANSLATION_HANDLING=PASS
PARTIAL_STATE_RECOVERY=PASS
CONCURRENT_RETRY=PASS
SENTENCE_REFERENCE_CONTRACT=PASS
PROVENANCE=PASS
PROVENANCE_RETRY_DEDUP=PASS
AUDIT_CONTRACT=PASS
AUDIT_RETRY_DEDUP=PASS
STATE_TRANSITION=PASS
AUTO_PUBLISH=NO
TRANSACTIONAL_INTEGRITY=PASS
FAILURE_ROLLBACK=PASS
```

## Safety boundary

The path reuses the established 08D3B1 TEST target parser and SSL contract,
the explicit CLI actor contract, and required pre-existing
`CC_BY_2_0_FR`/`CC0_1_0` license validation. It does not register licenses,
discover actors, expose database URLs/passwords, connect to production, or
alter the published D3B2 sentence path.

```text
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
```

The dedicated internal CLI consumes one bounded, already-enriched translation
candidate. Automated tests use synthetic candidates and do not call Tatoeba.

## Verification

```text
FOCUSED_TESTS=19 suites / 113 tests PASS
BACKEND_TESTS=63 suites / 431 tests PASS
BACKEND_E2E=13 suites / 58 tests PASS
TYPECHECK=PASS
LINT=PASS
BUILD=PASS
AUDIT=PASS (no high/critical findings; 2 moderate transitive multer advisories reported)
GIT_DIFF_CHECK=PASS
```

No `db:migrate` command ran. No TEST or production database was accessed or
mutated during implementation verification. This evidence records
implementation only; external review and separately authorized runtime
verification remain required.

```text
CURRENT_PHASE=08
PHASE_08=IN_PROGRESS
LNG_08_006=PASS
LNG_08_007=PLANNED
LNG_08_008=PLANNED
NEXT_ACTION=EXTERNAL_REVIEW_REQUIRED
```

## Sentence reference contract remediation

The external review identified one blocking gap in the original implementation:
translation endpoint IDs and text were validated, but the write path did not
prove that either `TATOEBA:SENTENCE:<id>` resolved to an existing canonical
`SENTENCE` resource. The original implementation record above is retained as
history; this section records the remediation.

The translation transaction now resolves both endpoint identities through the
existing `OPEN_DATASET` provenance mapping before creating or reconciling a
translation. The lookup locks the resolved resource rows in deterministic
sentence-ID order, requires exactly one mapping per endpoint, enforces
`resource_type=SENTENCE`, checks the canonical language and exact text, and
checks the stored source URL, license key, attribution, owner, import batch,
and snapshot identity. Missing, ambiguous, non-sentence, mismatched, or
shared-resource endpoint mappings quarantine and roll back before any
translation, provenance, audit, or state write. 08D3C still never creates
sentence resources; that remains owned by 08D3B2.

```text
PHASE_08D3C_SENTENCE_REFERENCE_REMEDIATION=PASS
BACKEND_REMEDIATION_SHA=b4b922e86f15d6bd405cbea669d58d1fa18b5554
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
TRANSACTIONAL_INTEGRITY=PASS
FAILURE_ROLLBACK=PASS
LIVE_TATOEBA_CALLS_DURING_TESTS=0
MIGRATION_REQUIRED=NO
MIGRATION_CREATED=NO
MIGRATIONS_0001_0011=UNCHANGED
```

Focused Tatoeba coverage is 18 suites / 118 tests PASS; the affected
translation repository is 17 tests PASS. Full Backend verification is 63
suites / 439 tests PASS, 13 e2e suites / 58 tests PASS, typecheck PASS, lint
PASS, build PASS, audit PASS at the high-severity threshold (two existing
moderate transitive multer advisories), and `git diff --check` PASS. No
database, live Tatoeba endpoint, migration, or frontend was accessed or
modified.

This remediation is not 08D3C acceptance. The branch remains gated for an
external-review retry:

```text
CURRENT_PHASE=08
PHASE_08=IN_PROGRESS
LNG_08_006=PASS
PHASE_08D3C_EXTERNAL_REVIEW=RETRY_REQUIRED
NEXT_ACTION=EXTERNAL_REVIEW_RETRY
```

## External-review retry result

An independent review of the complete remediation passed on the exact
Backend SHA `b4b922e86f15d6bd405cbea669d58d1fa18b5554`. The reviewer confirmed
that canonical source and target sentence lookup is required on both create
and reconciliation paths, each endpoint must be exactly one existing
`SENTENCE` resource with matching source identity and sentence/provenance
facts, and all invalid endpoint cases fail closed before translation-side
writes. No sentence resource creation was added to 08D3C.

```text
PHASE_08D3C_EXTERNAL_REVIEW_RETRY=PASS
BACKEND_REVIEWED_SHA=b4b922e86f15d6bd405cbea669d58d1fa18b5554
SCOPE_CONTAINMENT=PASS
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
Frontend change was performed by this review. Runtime translation verification
remains separate and authorized only by a later task.

## TEST runtime verification — blocked input

The explicit TEST target, actor, and required license preflight passed. A
rollback-only endpoint query confirmed the previously verified canonical
sentence mapping but found no second suitable pre-existing Tatoeba sentence
resource. The translation path was not invoked; no sentence, translation,
provenance, audit, or state rows were written.

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

No second sentence was created in this task, and 08D3B2 was not invoked.
