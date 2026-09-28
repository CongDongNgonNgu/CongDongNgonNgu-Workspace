# Phase 08D3B2 — Tatoeba Sentence Import Implementation

Date: 2026-09-28

## Result

```text
PHASE_08D3B2_IMPLEMENTATION=PASS
PHASE_08D3B2_SCOPE=atomic sentence import only: explicit ACTIVE ADMIN actor and required-license revalidation; sentence advisory lock; exact global OPEN_DATASET source-identity lookup; one-transaction SENTENCE resource creation/reconciliation; complete provenance; SUBMIT audit; DRAFT -> COMMUNITY_REVIEW; idempotent NOOP; concurrent create/reconcile; rollback and quarantine safety
BACKEND_BRANCH=phase-08d3b2-tatoeba-sentence-import
BACKEND_SHA=656f396c06797b993f625fb49820cebf6ca9fe0c
```

This slice implements the first atomic D3B unit documented by the accepted
08D2 plan: sentence resources only. Direct translation resources, directed
translation identities, reciprocal-link handling, and translation
reconciliation remain outside this slice and belong to the later D3C work.

## Import contract

The write-capable entrypoint is separate from the existing 08D3A dry-run
entrypoint:

```text
npm run library:import:tatoeba:sentence -- --environment TEST --actor-user-id <uuid> --candidate-file <bounded JSON object>
```

The ordinary `library:import:tatoeba` command remains dry-run-only and
database-free. The sentence command accepts one bounded, already-enriched
candidate and does not call the Tatoeba API or download a corpus.

The durable sentence identity is:

```text
SENTENCE_SOURCE_IDENTITY=TATOEBA:SENTENCE:<id>
SENTENCE_LOCK_IDENTITY=OPEN_DATASET:TATOEBA:SENTENCE:<id>
```

After the transaction-scoped advisory lock, the repository performs the
global exact `OPEN_DATASET` provenance lookup using the source identity. It
does not use `transformation_history` JSON as the correctness boundary.

For a new eligible sentence, one PostgreSQL transaction creates the resource
as `DRAFT`, writes exact sentence text and complete provenance, writes the
`SUBMIT` review audit, transitions to `COMMUNITY_REVIEW`, hydrates the result,
and commits. Any failure rolls back the transaction; no partial initial
resource remains. Imported content is never created as `VERIFIED`, and no
community contribution event is emitted.

Safe rerun behavior is explicit: unchanged durable facts produce `NOOP`
without new resource/provenance/audit churn; an importer-owned pre-existing
`DRAFT` may be submitted after full validation; safe `COMMUNITY_REVIEW`
changes reconcile under the identity lock; changed `VERIFIED` content is
invalidated to `COMMUNITY_REVIEW` before later reconciliation; `REJECTED`
content is not silently reopened. Unsafe new candidates are report-only
quarantines with zero Library writes.

## Preserved safety contracts

```text
ACTOR_CONTRACT_PRESERVED=YES
DATABASE_TARGET_AUTHORIZATION_PRESERVED=YES
REMOTE_DATABASE_SSL_FAIL_CLOSED=PASS
SECRET_HANDLING=PASS
LICENSE_CONTRACT_PRESERVED=YES
AUTO_REGISTER_LICENSES=NO
```

The actor is explicit and must be an active ADMIN. Actor discovery is not
available. The target remains TEST-only and is authorized by the exact parsed
host, database name, and database user; the environment label alone is not
sufficient. The writer rechecks target identity before pool creation and
inside the read-only target-identification transaction. Remote SSL settings
remain fail-closed, and raw database URLs, passwords, connection strings, and
underlying database errors are not emitted.

Both required registry keys are revalidated in the import transaction:

```text
REQUIRED_LICENSE_CC_BY_KEY=CC_BY_2_0_FR
REQUIRED_LICENSE_CC0_KEY=CC0_1_0
```

Missing or unsafe license rows fail closed. No license is inserted or repaired
by the importer.

## Database and scope boundary

The implementation uses one transaction for the sentence write path and
`READ ONLY` target/contract checks for preflight. No real D3B2 runtime import
was executed during this implementation slice, so the TEST database was not
mutated by verification.

```text
INITIAL_IMPORT_ATOMICITY=ONE_POSTGRES_TRANSACTION
PREFLIGHT_DATABASE_WRITES=0
TEST_DB_MUTATED=NO
PRODUCTION_DB_MUTATED=NO
LIVE_TATOEBA_CALLS_DURING_TESTS=0
DATASET_DOWNLOADED=NO
```

No migration was required or created. Migrations `0001`–`0011` are unchanged.
Frontend, production, and deployment were not touched.

```text
MIGRATION_REQUIRED=NO
MIGRATION_CREATED=NO
MIGRATIONS_0001_0011=UNCHANGED
FRONTEND_CHANGED=NO
DEPLOYED=NO
```

## Verification

All automated verification used synthetic candidates and test doubles for the
database/external boundaries; no live Tatoeba call was made.

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

The implementation branch is pushed and intentionally remains unmerged for
external review. The next implementation boundary is translation/relation
work; this evidence does not authorize runtime import execution or D3C.

```text
CURRENT_PHASE=08
PHASE_08=IN_PROGRESS
LNG_08_006=PASS
LNG_08_007=PLANNED
LNG_08_008=PLANNED
NEXT_ACTION=EXTERNAL_REVIEW_REQUIRED
```
