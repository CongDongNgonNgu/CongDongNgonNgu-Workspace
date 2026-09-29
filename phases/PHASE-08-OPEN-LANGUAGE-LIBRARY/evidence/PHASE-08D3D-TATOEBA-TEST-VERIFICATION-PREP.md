# Phase 08D3D — Tatoeba TEST database verification and publication prep

Date: 2026-09-29 (Asia/Saigon)
Status: implementation/preparation complete; external review required before
the bounded TEST runtime gate.

The authoritative D2 decomposition names this slice `08D3D - TEST database
verification and publication`. It is a sub-slice of the accepted adapter task
`LNG_08_006`; no separate Workspace task ID is invented.

## Exact scope

This preparation preserves the documented D3D scope only:

- run the approved bounded TEST gate;
- prove concurrent same-source execution creates one durable resource;
- prove an unchanged rerun is a NOOP;
- prove transaction failure leaves no partial resource, provenance, or audit;
- prove new unsafe candidates produce zero durable Library writes;
- prove reciprocal input order cannot change directed identity;
- prove explicitly configured reverse direction has a distinct identity;
- prove both directions configured do not collide;
- prove unsafe VERIFIED material is hidden before reconciliation;
- prove both translation licenses and attributions are retained;
- clean up only TEST fixtures;
- publish sanitized runtime evidence and perform the normal review/publication
  gate.

No production publication, public external-service publication, bulk
publication, frontend work, search/index work, notification, deployment, or
unrelated moderation automation is part of this slice.

## Meaning of publication

For D3D, publication means publishing the sanitized TEST verification
evidence and completing the normal review/publication gate for the accepted
implementation. It does not mean publishing TEST fixtures to production or to
an external public service, and it does not authorize a direct resource state
change.

The importer lifecycle remains:

```text
DRAFT -> COMMUNITY_REVIEW --(explicit reviewer VERIFY)--> VERIFIED
```

Tatoeba sentence and translation import ends at `COMMUNITY_REVIEW` and never
auto-verifies or auto-publishes. The existing reviewer gate requires an
explicit MODERATOR/ADMIN reviewer, active moderation, complete provenance, and
current safe licenses; self-verification and invalid transitions fail closed.
D3D preparation does not execute that reviewer transition. The public
projection target is `VERIFIED` only after that normal human review gate. The
later runtime gate must remain TEST-only and separately authorized.

```text
PUBLICATION_MEANING=SANITIZED_TEST_RUNTIME_EVIDENCE_AND_NORMAL_REVIEW_PUBLICATION_GATE
PUBLICATION_TARGET_ENVIRONMENT=TEST
IMPORTER_RUNTIME_STATE=COMMUNITY_REVIEW
TARGET_PUBLICATION_STATE=VERIFIED
AUTO_VERIFY_IMPORTED_RESOURCE=NO
AUTO_PUBLISH=NO
PUBLICATION_STATE_TRANSITION=NOT_APPLICABLE_DURING_PREPARATION
```

## Prerequisite and safety review

The accepted 08D3B2/08D3C evidence already proves the selected TEST sentence
and translation resources, canonical endpoint identities, shared Tatoeba
batch/snapshot/provider, both required licenses, provenance, audit, directed
identity, exact retry, concurrency protection, and `COMMUNITY_REVIEW` state.
The importer path preserves the explicit actor contract and does not discover
an actor or register licenses.

The 08D3B1 target contract remains mandatory: TEST label plus exact host,
database name, and database user; remote SSL remains fail-closed; database
URLs, passwords, and secret query parameters remain outside diagnostics and
evidence.

```text
PUBLICATION_PREREQUISITES=PASS
PUBLICATION_ACTOR_CONTRACT=PASS
ACTOR_DISCOVERY=NONE
SOURCE_STATE_VALIDATION=PASS
RESOURCE_VERIFICATION=PASS
PROVENANCE_VERIFICATION=PASS
LICENSE_VERIFICATION=PASS
CANONICAL_SENTENCE_IDS_PRESERVED=YES
CANONICAL_TRANSLATION_ID_PRESERVED=YES
```

## Implementation boundary

No new D3D application behavior was required. Existing D3B2/D3C transaction,
advisory-lock, reconciliation, review-state, provenance, and fail-closed
primitives already implement the documented D3D proof obligations. No TEST
database connection or write was made while preparing this slice.

```text
BACKEND_SHA=b4b922e86f15d6bd405cbea669d58d1fa18b5554
BACKEND_BRANCH=phase-08d3d-tatoeba-test-verification
WORKSPACE_BEFORE_SHA=fbeef24d1c5a3281ae290226b7f9ebc975f526bb
WORKSPACE_BRANCH=phase-08d3d-tatoeba-test-verification
BACKEND_CODE_CHANGED=NO
TEST_DB_MUTATED=NO
PRODUCTION_DB_MUTATED=NO
LIVE_TATOEBA_CALLS_DURING_TESTS=0
MIGRATION_REQUIRED=NO
MIGRATION_CREATED=NO
MIGRATIONS_0001_0011=UNCHANGED
FRONTEND_CHANGED=NO
DEPLOYED=NO
MERGED_TO_MAIN=NO
```

Publication-specific runtime idempotency, audit/history observations, and
TEST fixture cleanup remain runtime/review gates; they are not claimed as
executed by this preparation.

```text
PUBLICATION_IDEMPOTENCY=NOT_APPLICABLE
PUBLICATION_AUDIT=NOT_APPLICABLE
AUDIT_RETRY_DEDUP=NOT_APPLICABLE
STATE_HISTORY_RETRY_DEDUP=NOT_APPLICABLE
TRANSACTIONAL_INTEGRITY=PASS
FAILURE_ROLLBACK=PASS
```

## Verification evidence

Focused D3B2/D3C/import/review tests passed without live Tatoeba calls or a
database connection:

```text
FOCUSED_TESTS=8 suites / 53 tests PASS
BACKEND_TESTS=63 suites / 439 tests PASS
BACKEND_E2E=13 suites / 58 tests PASS
TYPECHECK=PASS
LINT=PASS
BUILD=PASS
AUDIT=PASS (0 high/critical; 2 known moderate transitive multer advisories)
GIT_DIFF_CHECK=PASS
```

The focused set covers sentence/translation concurrent retry and NOOP paths,
transaction rollback and zero-write quarantine, directed/reverse identity,
endpoint and license/provenance contracts, review-state authorization, and
the no-auto-verify/public projection boundary. Existing accepted TEST runtime
evidence remains the source for prior resource-level observations; this
preparation itself performs no runtime publication.

## State and next gate

The parent mapping remains accepted and Phase 08 remains in progress. D3D is
prepared but not runtime-verified or published:

```text
CURRENT_PHASE=08
PHASE_08=IN_PROGRESS
LNG_08_006=PASS
08D3D=IMPLEMENTATION_PREPARED
TEST_RUNTIME_EXECUTED=NO
NEXT_ACTION=EXTERNAL_REVIEW_REQUIRED
```
