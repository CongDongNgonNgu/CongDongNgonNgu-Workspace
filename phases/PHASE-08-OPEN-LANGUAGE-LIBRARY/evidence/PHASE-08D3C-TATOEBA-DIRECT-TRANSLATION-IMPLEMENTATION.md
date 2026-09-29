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
