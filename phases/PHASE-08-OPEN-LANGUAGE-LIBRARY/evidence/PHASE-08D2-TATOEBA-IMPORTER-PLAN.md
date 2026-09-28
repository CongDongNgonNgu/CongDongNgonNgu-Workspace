# Phase 08D2 - Tatoeba Importer Implementation Plan

Status: implementation plan only
Retrieved and prepared: 2026-09-28 (Asia/Saigon)
Workspace base: 2f8e9651f1cbae307b89e5e702603322c0b6ef08
Workspace branch: phase-08d2-tatoeba-importer-plan

This document closes the design-remediation items identified by Phase 08D1.
It does not implement an importer, download a Tatoeba corpus, call the
importer at scale, mutate a database, create a migration, modify Backend or
Frontend, or deploy anything.

## Decision summary

~~~
PHASE_08D2_IMPORTER_PLAN=PASS
IMPORT_SUBMIT_PATH_GAP=CONFIRMED
IMPORT_ACTOR_CONTRACT=EXPLICIT_ADMIN_CLI_ACTOR
IMPORT_ENTRYPOINT=CLI
TATOEBA_LICENSE_REGISTRY_RUNTIME_CHECK=MANDATORY_FAIL_CLOSED
INITIAL_IMPORT_ATOMICITY=ONE_POSTGRES_TRANSACTION
IMPORT_CONCURRENCY_CONTRACT=TRANSACTION_SCOPED_ADVISORY_LOCK_PLUS_GLOBAL_LOOKUP_RECONCILE_CREATE
SENTENCE_SOURCE_IDENTITY=TATOEBA:SENTENCE:<id>
UNORDERED_TRANSLATION_IDENTITY_RUN_ORDER_DEFECT=CONFIRMED
INPUT_PAIR_IDENTITY=TATOEBA:PAIR:<minId>:<maxId>
DIRECT_TRANSLATION_IDENTITY=TATOEBA:LINK:DIRECT:<sourceSentenceId>:<targetSentenceId>
TRANSLATION_LOCK_IDENTITY=OPEN_DATASET:TATOEBA:LINK:DIRECT:<sourceId>:<targetId>
TRANSLATION_TWO_PROVENANCE_ENTRIES=YES
AUTO_CREATE_REVERSE_TRANSLATION=NO
IDEMPOTENT_RERUN_NOOP=YES
VERIFIED_UNSAFE_RERUN_ACTION=INVALIDATE_TO_COMMUNITY_REVIEW_BEFORE_RECONCILE
COMMUNITY_CONTRIBUTION_EVENT_EMITTED=NO
AUTO_VERIFY_IMPORTED_RESOURCE=NO
DRY_RUN_ZERO_WRITES=YES
NEW_UNSAFE_CANDIDATE_DURABLE_RESOURCE=NO
NEW_UNSAFE_CANDIDATE_ACTION=QUARANTINE_ZERO_WRITES
PARTIAL_INITIAL_RESOURCE_AFTER_FAILURE=NO
MIGRATION_REQUIRED=NO
08D2_IMPLEMENTATION_DECISION=GO
~~~

GO means the implementation design is bounded and can be implemented
without a schema change. It does not authorize implementation or ingestion.
The importer remains behind the existing 08D1 NEEDS_REMEDIATION gate until
the implementation slices and their runtime checks are completed.

## 1. Accepted boundary and authoritative evidence

The Phase 08D1 evidence remains the authoritative Tatoeba research record:

- [Phase 08D1 Tatoeba license validation](PHASE-08D1-TATOEBA-LICENSE-VALIDATION.md)
- Retrieval date: 2026-09-28 (Asia/Saigon)
- TEXT_DEFAULT_LICENSE=CC BY 2.0 FR
- CC0_TEXT_SUPPORTED=YES
- PER_SENTENCE_LICENSE_VARIATION=YES
- COMMERCIAL_TEXT_REUSE=CONDITIONAL
- DOWNLOAD_EXPOSES_TEXT_LICENSE=PARTIAL
- DOWNLOAD_EXPOSES_OWNER=PARTIAL
- LINK_FILE_AVAILABLE=YES
- CURRENT_SCHEMA_SUFFICIENT=YES
- MIGRATION_REQUIRED=NO

The current first-party Tatoeba sources recorded by 08D1 are:

| Source | Role in this plan |
| --- | --- |
| [Tatoeba Terms of Use](https://tatoeba.org/en/terms_of_use) | Default text license, attribution, contributor-specific terms, derivative and commercial-use conditions. |
| [Tatoeba Downloads](https://tatoeba.org/en/downloads) | Current download names and documented tab-separated fields. |
| [Tatoeba export index](https://downloads.tatoeba.org/exports/) | Current export artifacts used as local snapshot inputs. |
| [Using the Tatoeba Corpus for Your Own Projects](https://en.wiki.tatoeba.org/articles/show/using-the-tatoeba-corpus) | Filtering, source-change, and reuse guidance. |
| [Tatoeba FAQ](https://en.wiki.tatoeba.org/articles/show/faq) | Attribution guidance, unreliable/unapproved export behavior, direct versus indirect translation distinction, and audio licensing warning. |
| [How to contribute under CC0](https://en.wiki.tatoeba.org/articles/show/cc0-contributions) | CC0 eligibility and original-sentence limitation. |
| [How to handle sentences with licensing issues](https://en.wiki.tatoeba.org/articles/show/handling-sentences-with-licensing-issues) | Licensing-issue exclusion and related-translation handling. |
| [Tatoeba API](https://api.tatoeba.org/) and [OpenAPI contract](https://api.tatoeba.org/openapi.json) | Bounded current per-sentence authority for id, language, text, license, owner, and unapproved status. |
| [CC BY 2.0 France deed](https://creativecommons.org/licenses/by/2.0/fr/) | Commercial sharing/adaptation subject to attribution, license link, modification notice, and other deed conditions. |
| [CC0 1.0 deed](https://creativecommons.org/publicdomain/zero/1.0/) | Commercial reuse of eligible CC0 material, subject to deed reservations. |

The 08D2 implementation must bind its API client to the current OpenAPI
contract at implementation time. It must not replace current API facts with
historical export assumptions.

The concurrency design also relies on the existing PostgreSQL
transaction-advisory-lock behavior documented in the
[current PostgreSQL administrative functions documentation](https://www.postgresql.org/docs/current/functions-admin.html),
retrieved 2026-09-28. Transaction-level advisory locks are held until the
transaction ends, which is the required lifetime for the lookup/reconcile/create
critical section.

## 2. Existing Backend collision and required boundary

The accepted Backend main is
86c51f7b08a989db415e7c11361686fdf2379455.

The current library contract cannot be reused unchanged for Tatoeba:

1. LibraryService.transitionReview() rejects SUBMIT for SENTENCE and
   TRANSLATION with LIBRARY_CONTRIBUTION_SUBMIT_REQUIRED.
2. LibraryService.submitContribution() requires every provenance entry to
   be ORIGINAL_AUTHOR and bound to the authenticated creator.
3. The generic contribution repository operation emits
   LIBRARY_CONTRIBUTION_SUBMITTED.
4. Tatoeba must be represented as OPEN_DATASET, not as ORIGINAL_AUTHOR, and
   the importer must not emit a false community contribution event.

Therefore:

~~~
IMPORT_SUBMIT_PATH_GAP=CONFIRMED
~~~

08D3 must add a dedicated internal importer service and repository operation,
not a public HTTP endpoint and not a special case that lies about provenance.
The operation will:

- create or reconcile SENTENCE or TRANSLATION resources as an authorized
  importer actor;
- attach complete OPEN_DATASET provenance and actual license facts;
- create a normal review audit with action SUBMIT;
- transition DRAFT to COMMUNITY_REVIEW;
- emit no library_contribution_events row;
- never create or transition an imported resource to VERIFIED.

The public /library controller remains unchanged in this plan.

Read-only Backend anchors for the implementation review are:

- src/library/library.types.ts for resource/source/review enums and actor
  types;
- src/library/library.service.ts for the contribution-submit collision and
  reviewer transition rules;
- src/library/postgres-library.repository.ts for current transaction
  boundaries, provenance, review-audit, and contribution-event behavior;
- src/library/library.repository.ts for the repository extension boundary;
- src/exchange/exchange-safety.repository.ts and
  src/exchange/postgres-exchange-safety.repository.ts for the existing
  transaction-scoped advisory-lock convention;
- migrations/0009_open_language_library.sql for the current schema contract.

## 3. Import actor contract

The chosen auditable model is:

~~~
IMPORT_ACTOR_CONTRACT=EXPLICIT_ADMIN_CLI_ACTOR
~~~

The CLI operator must supply an existing user ID through a protected argument
or configuration value for every run. The importer must query the current
identity records before any import write and require:

- the user exists;
- user status is ACTIVE;
- the user has the ADMIN role;
- the supplied value is a valid user identifier.

Missing, disabled, verification-pending, non-ADMIN, or unknown actors fail
before creating a resource, audit, provenance row, or batch effect. The
importer must not:

- create a hidden system actor;
- provision an actor in a migration or seed;
- use a hardcoded UUID;
- fall back to an environment default when the actor is absent;
- bypass created_by_user_id or review-audit actor requirements.

The future CLI should expose the actor explicitly, for example:

~~~
npm run library:import:tatoeba -- --actor-user-id <existing-admin-id> ...
~~~

The exact package script and argument parser are 08D3A implementation work.
Secrets and complete environment values must never be logged.

## 4. Import entrypoint and bounded execution

~~~
IMPORT_ENTRYPOINT=CLI
~~~

The initial entrypoint is an operator-run internal CLI, not a public HTTP
endpoint, queue consumer, scheduled job, or client-facing route. It must
support a bounded dry-run and a bounded import mode with explicit inputs:

- local sentences_detailed input;
- local sentences_CC0 input;
- local links input;
- --languages using the project language codes;
- --sentences and --cc0 candidate limits;
- --links link-candidate limit;
- --batch-id or a deterministic batch identifier;
- --dry-run;
- bounded API concurrency, timeout, retry, response-size, and run limits.

The CLI accepts already-provided local artifacts. It does not implement a
corpus downloader in 08D3A and must not fetch an unbounded archive. The
implementation must reject an absent, unknown, negative, or unbounded limit
where a bounded limit is required. Client-side defaults are conservative and
configurable; no Tatoeba server rate limit is invented.

The reader must stream TSV/CSV input and enforce:

- valid UTF-8;
- expected column count and header contract;
- numeric, positive, bounded sentence IDs;
- non-empty language and text;
- maximum text size compatible with the current 20,000-character library
  columns;
- supported language mapping;
- duplicate-ID detection within each input;
- strict handling of malformed, truncated, or ambiguous rows.

The initial adapter does not read or import audio, comments, profiles,
private data, or unnecessary tags.

The expected current text-only schemas are:

| Artifact | Required fields | Use |
| --- | --- | --- |
| sentences_detailed | Sentence id, Lang, Text, Username, Date added, Date last modified | Primary discovery snapshot for text and owner when present. |
| sentences_CC0 | Sentence id, Lang, Text, Date last modified | CC0 membership snapshot; it has no Username field. |
| links | Sentence id, Translation id | Direct relation input; reciprocal rows are expected and collapsed. |
| sentences_base | Sentence id, Base field | Optional later context only; it is not a replacement for links. |

No downloader is part of this contract; the operator supplies these local
artifacts and their retrieval metadata.

## 5. Language mapping

Only these explicit mappings are allowed:

| Project code | Tatoeba code | Rule |
| --- | --- | --- |
| vi | vie | Vietnamese |
| en | eng | English |
| zh | cmn | Mandarin only; do not absorb other Chinese varieties. |
| ja | jpn | Japanese |
| ko | kor | Korean |
| fr | fra | French |
| de | deu | German |
| es | spa | Spanish |

Unknown, unsupported, or ambiguous Tatoeba codes are rejected. No silent
coercion is allowed. A translation candidate is eligible only when its
endpoint languages match the configured source/target project pair.

## 6. Bulk snapshot and API authority

Bulk exports are discovery and snapshot inputs, not the final authority for
current license or moderation status. The stable Tatoeba v1 sentence API is
the bounded current authority for:

~~~
id
lang
text
license
owner
is_unapproved
~~~

The API client must accept only:

- license=CC BY 2.0 FR;
- license=CC0 1.0;
- is_unapproved=false;
- an ID and language matching the candidate;
- an API response that is present, structurally valid, and current for the
  bounded check.

It must fail closed on:

- PROBLEM;
- missing or unknown license;
- missing owner when CC BY attribution needs an owner;
- is_unapproved=true;
- 404/deleted sentence;
- unsupported language;
- malformed or materially incomplete response;
- material bulk/API disagreement.

No missing license defaults to CC BY.

The CC0 join is explicit: a candidate present in the sentences_CC0 snapshot
must have API license CC0 1.0, otherwise it is TATOEBA_CC0_MISMATCH and is
skipped or quarantined. A normal detailed-row candidate whose API license is
CC0 1.0 is accepted only when the selected snapshot strategy explains the
CC0 membership; absence from an incomplete or differently-timed CC0 input
must not infer CC BY 2.0 FR.

Known licensing-issue records, including API PROBLEM results and any current
source signal that identifies a licensing issue, are never imported. Their
related translation candidates are independently rechecked and are also
skipped or quarantined when the source facts cannot be proven safe. The
existing Phase 06 source-health reconciler does not establish Tatoeba
freshness; Tatoeba API status is an importer-specific authority.

### Snapshot-consistency record

Every run and every accepted candidate must retain, in transformation
history and the bounded run report:

- provider TATOEBA;
- input artifact filename;
- SHA-256 for each available artifact;
- artifact retrieval timestamp when supplied by the operator;
- deterministic snapshot identifier;
- API-check timestamp;
- importer version/contract version;
- mismatch reason, if any;
- import batch identifier.

The batch identifier must fit the schema's 120-character limit. A default
shape is:

~~~
TATOEBA:20260928:<sha256-prefix>
~~~

The full artifact facts remain in transformation metadata rather than being
truncated into the batch ID.

If bulk and current API facts materially disagree on any of:

- text;
- language;
- license;
- owner when attribution is required;
- status/unapproved/deleted state;

the initial importer must SKIP_OR_QUARANTINE. It must not silently reconcile
the snapshot to current API data while creating the first resource. The
mismatch reason must be stable and machine-readable.

## 7. License and attribution validation

The normalized runtime license keys must be resolved through the existing
library_licenses registry:

~~~
CC_BY_2_0_FR
CC0_1_0
~~~

Before any accepted row can write, the importer performs a read-only
preflight against the actual current registry:

~~~
TATOEBA_LICENSE_REGISTRY_RUNTIME_CHECK=MANDATORY_FAIL_CLOSED
~~~

The preflight requires both rows to exist and match the expected contract:

| Key | Active | Redistribution | Attribution | Canonical contract |
| --- | --- | --- | --- | --- |
| CC_BY_2_0_FR | true | true | true | CC BY 2.0 France deed URL, display name, and derivative constraints consistent with the source. |
| CC0_1_0 | true | true | false | CC0 1.0 deed URL and display name consistent with the source. |

Missing, inactive, or mismatched registry data aborts the run before import
writes. The importer must not call the existing upsertLicense() path,
silently insert a row, silently repair a row, or assume schema support means
runtime registration exists. 08D3 must verify the repository's exact
canonical URL/display-name conventions before coding the preflight.

### Sentence provenance

For a sentence resource, use:

~~~
sourceType=OPEN_DATASET
sourceId=TATOEBA:SENTENCE:<id>
sourceUrl=https://tatoeba.org/en/sentences/show/<id>
licenseKey=CC_BY_2_0_FR | CC0_1_0
importBatchId=<bounded-batch-id>
~~~

For CC BY, attribution must identify Tatoeba, the sentence, the current
owner/author, the CC BY 2.0 FR license and license link, and any
CongDongNgonNgu modification. A safe template is:

~~~
Source: Tatoeba sentence #<id>, by <username>; licensed under CC BY 2.0 FR
(https://creativecommons.org/licenses/by/2.0/fr/). Modified by
CongDongNgonNgu: <transformation note>.
~~~

The actual implementation must escape and bound the generated text. A null
or missing owner for a CC BY row is not filled with a guess; the row is
quarantined or skipped. For CC0, a null owner is legally compatible with
the license facts, but Tatoeba, sentence ID, source URL, actual license, and
any known owner are still preserved. No username is invented.

For every transformed sentence, transformation_history records the
operation, snapshot/API facts, and a modification note. Text normalization
must be either lossless and documented or treated as a material mismatch;
the importer must not hide a text rewrite.

## 8. Direct translation contract

The links export is the only initial relation input. The importer must not
compute transitive translation closure and must not treat an indirect path as
a direct pair. Reciprocal rows are collapsed before API verification, but the
unordered pair is input deduplication only.

The input pair identity is:

~~~
INPUT_PAIR_IDENTITY=TATOEBA:PAIR:<minId>:<maxId>
~~~

The durable Library translation identity is directional:

~~~
DIRECT_TRANSLATION_IDENTITY=TATOEBA:LINK:DIRECT:<sourceSentenceId>:<targetSentenceId>
~~~

sourceSentenceId corresponds exactly to primaryLanguageCode/sourceText.
targetSentenceId corresponds exactly to secondaryLanguageCode/translatedText.
Numeric ordering is never used to assign linguistic direction.

For each explicitly configured source/target project-language pair, the
verifier must:

1. parse both endpoint IDs;
2. collapse reciprocal rows into one input pair;
3. resolve both endpoint languages before constructing the durable identity;
4. require exactly one endpoint to match the configured source language and
   the other to match the configured target language;
5. exclude same-language, ambiguous, unsupported, or unknown-language pairs;
6. verify both current API records and their licenses/owners/status;
7. assign source_text and translated_text from the configured direction;
8. quarantine any missing, stale, unsupported, or contradictory endpoint;
9. lock and reconcile the directed durable identity before creation.

Reversing the input row order must produce the same directed candidate when
the configured language pair is unchanged. A vi -> en run creates only the
vi -> en resource. It must not implicitly create en -> vi:

~~~
AUTO_CREATE_REVERSE_TRANSLATION=NO
~~~

An explicitly configured en -> vi run evaluates the same unordered input pair
under the reverse directed identity. The reverse resource is distinct and is
not a conflict merely because the opposite direction already exists.

### Two-license storage model

The existing provenance table requires one license key per provenance row.
The importer must not invent a combined license for a two-sentence relation.
Each directional translation resource therefore receives two provenance
entries:

~~~
TRANSLATION_TWO_PROVENANCE_ENTRIES=YES
~~~

The entries derive from the directed relation identity:

- TATOEBA:LINK:DIRECT:<sourceId>:<targetId>:SOURCE
- TATOEBA:LINK:DIRECT:<sourceId>:<targetId>:TARGET

The SOURCE entry stores the actual source sentence URL, license, owner when
known/required, attribution, and transformation metadata including
endpointSentenceId=<sourceId> and endpointRole=SOURCE.

The TARGET entry stores the actual target sentence URL, license, owner when
known/required, attribution, and transformation metadata including
endpointSentenceId=<targetId> and endpointRole=TARGET.

Both entries also retain the directed relation identity, input pair identity,
configured source/target languages, snapshot/API timestamps, and batch.
Neither endpoint license is collapsed into a synthetic combined license.

## 9. Concurrency and idempotency

The current schema has a unique key scoped to
(resource_id, source_type, source_id) and does not provide a confirmed
global unique constraint for provider plus external source ID. A process
mutex is insufficient.

The selected contract is:

~~~
IMPORT_CONCURRENCY_CONTRACT=TRANSACTION_SCOPED_ADVISORY_LOCK_PLUS_GLOBAL_LOOKUP_RECONCILE_CREATE
~~~

For every sentence or directed direct relation:

1. derive the exact durable external identity;
2. begin a PostgreSQL transaction;
3. acquire a transaction-scoped advisory lock derived from that identity;
4. query exact indexable OPEN_DATASET provenance source IDs globally;
5. for a translation, require resource_type=TRANSLATION and both directed
   role-qualified entries on the same resource;
6. lock an existing resource row for update when one is found;
7. re-read current state and facts inside the lock;
8. perform CREATE, NOOP, RECONCILE, INVALIDATE, or quarantine decision;
9. commit or roll back the complete operation.

Sentence lock identity:

~~~
OPEN_DATASET:TATOEBA:SENTENCE:<id>
~~~

The sentence provenance source ID is the provider-qualified value
TATOEBA:SENTENCE:<id>; the OPEN_DATASET prefix above is used only in the
canonical lock namespace.

Direct-link lock identity:

~~~
TRANSLATION_LOCK_IDENTITY=OPEN_DATASET:TATOEBA:LINK:DIRECT:<sourceId>:<targetId>
~~~

The implementation may reuse the project's existing PostgreSQL advisory-lock
pattern, including a stable hash of the exact directed identity, but must
test that the hash input is the exact directed identity and that the lock is
held until commit/rollback. A vi -> en identity and an en -> vi identity may
therefore proceed as separate resources, while concurrent runs for the same
directed identity serialize. It must not rely on a Node process mutex.

The translation global lookup must not depend on transformation_history JSON
as the correctness boundary. After the directed lock is acquired, locate:

- TATOEBA:LINK:DIRECT:<sourceId>:<targetId>:SOURCE
- TATOEBA:LINK:DIRECT:<sourceId>:<targetId>:TARGET

using source_type=OPEN_DATASET and source_id. The required outcomes are:

- neither role exists: create the candidate;
- both roles exist on the same TRANSLATION resource: existing resource;
- only one role exists, or roles resolve to different resources:
  INTEGRITY_CONFLICT, quarantine, and stop that candidate;
- roles exist on a non-TRANSLATION resource: INTEGRITY_CONFLICT, quarantine,
  and stop that candidate.

The importer must not silently repair an ambiguous duplicate identity during
initial implementation.

### Unchanged rerun

When source ID, directed relation identity, text, language, license,
owner/attribution facts, status, relation endpoints, and applicable
snapshot/API contract facts are unchanged:

~~~
IDEMPOTENT_RERUN_NOOP=YES
~~~

The importer must create no new resource, provenance entry, audit, or
contribution event, and must not churn updated_at.

### Changed or unsafe rerun

The reconciliation rules are:

- DRAFT: safe current facts may reconcile under the identity lock; keep
  DRAFT until the normal submit step is complete. A pre-existing importer-
  owned DRAFT is different from a new unsafe candidate; it may be submitted
  only after all facts are valid and the dedicated submit audit completes.
- COMMUNITY_REVIEW: safe facts may reconcile under the identity lock while
  preserving review history; incomplete facts remain quarantined/DRAFT.
- VERIFIED: any material source change, including text, license, owner,
  endpoint, deletion, unapproved status, or unsafe API result, first leaves
  the public state. The importer commits VERIFIED -> COMMUNITY_REVIEW with
  an INVALIDATE audit under the identity lock, before any changed
  content/provenance is written. A second transaction may reconcile safe
  current facts while the resource is non-public. Unsafe facts are not
  written and remain quarantined.
- REJECTED: report and skip; the importer does not auto-reopen a rejected
  resource.

Therefore:

~~~
VERIFIED_UNSAFE_RERUN_ACTION=INVALIDATE_TO_COMMUNITY_REVIEW_BEFORE_RECONCILE
~~~

No automatic re-verification is allowed. The resource must pass the normal
reviewer gate again. The public projection already requires VERIFIED, PUBLIC,
active moderation, and valid redistribution licenses; imported resources
remain hidden until a human reviewer verifies them.

## 10. Atomic transaction design

For a NEW external identity, an incomplete or unsafe license, owner/status,
language, text, provenance, API-evidence, or endpoint fact produces no
durable Library write:

~~~
NEW_UNSAFE_CANDIDATE_DURABLE_RESOURCE=NO
NEW_UNSAFE_CANDIDATE_ACTION=QUARANTINE_ZERO_WRITES
~~~

The candidate exists only in the bounded run report/quarantine result. Do not
create a DRAFT merely to represent a new unsafe row. A pre-existing
importer-owned DRAFT is handled separately by the reconciliation rules.

For a NEW eligible candidate, the importer-specific transaction is:

1. BEGIN;
2. acquire the exact sentence or directed-translation advisory lock;
3. perform global exact identity lookup;
4. validate the explicit ACTIVE ADMIN actor;
5. validate current license registry rows;
6. insert the Library resource and type row as DRAFT, with PUBLIC visibility
   explicitly set so the existing public projection still hides it;
7. insert complete OPEN_DATASET provenance;
8. insert the library_resource_review_audits row with action SUBMIT,
   previous state DRAFT, new state COMMUNITY_REVIEW, and the explicit ADMIN
   actor;
9. transition DRAFT to COMMUNITY_REVIEW;
10. hydrate and COMMIT.

Read-only run-level actor/license preflight may fail before BEGIN, but the
transaction repeats the required validations after the identity lock and
before any insert.

~~~
INITIAL_IMPORT_ATOMICITY=ONE_POSTGRES_TRANSACTION
PARTIAL_INITIAL_RESOURCE_AFTER_FAILURE=NO
~~~

There is no composition of existing createResource(), mergeProvenance(), and
generic submitContribution() calls across separate transactions. Those
generic calls are not the importer contract. Any failure rolls back the
initial resource, detail row, provenance rows, audit, and state change, with
no partial initial resource remaining. Batch processing may use one bounded
transaction per accepted resource or relation; a whole-corpus transaction is
forbidden.

For an already VERIFIED resource with changed facts, the committed
invalidation transaction described above is the safety boundary. The
subsequent safe reconciliation transaction starts only after the public
projection is closed by the new review state.

## 11. Lifecycle and review gates

~~~
TATOEBA_IMPORT_LIFECYCLE=DRAFT_THEN_SUBMIT_TO_COMMUNITY_REVIEW
TATOEBA_INITIAL_REVIEW_STATE=COMMUNITY_REVIEW
TATOEBA_SOURCE_TRUST != VERIFIED
AUTO_VERIFY_IMPORTED_RESOURCE=NO
COMMUNITY_CONTRIBUTION_EVENT_EMITTED=NO
~~~

COMMUNITY_REVIEW is the state reached after the normal review boundary. It
does not mean direct insertion into the queue without an audit. The importer
must create as DRAFT, attach complete validated provenance and license facts,
write the SUBMIT audit, then move to COMMUNITY_REVIEW. If any required fact
for a NEW external identity is incomplete or unsafe, the importer performs
zero durable Library writes and records QUARANTINE_ZERO_WRITES. An existing
importer-owned DRAFT may remain DRAFT while safe reconciliation is performed;
it may not receive a SUBMIT audit or move to COMMUNITY_REVIEW until all facts
are valid and the dedicated submit transaction completes. Nothing reaches
VERIFIED automatically and no reviewer audit is bypassed.

Imported Tatoeba membership is source trust, not CongDongNgonNgu
verification. No automatic quality score, tag, or Tatoeba approval is
treated as a product verification decision.

## 12. Dry run, quarantine, and reporting

~~~
DRY_RUN_ZERO_WRITES=YES
~~~

Dry-run mode performs parsing, bounds checks, CC0 joining, language mapping,
bounded API enrichment, link verification, attribution/license validation,
and - when database configuration is deliberately available - read-only
actor, license-registry, and external-identity checks. It must report:

- candidates discovered and accepted;
- unsupported/malformed/duplicate rows;
- API not found/unavailable/invalid responses;
- license rejected or unknown;
- missing required owner;
- unapproved/deleted/licensing issue;
- bulk/API mismatch by stable reason;
- existing/no-op/reconcile/invalidate counts;
- direct-link candidates, reciprocal collapses, direction conflicts;
- would-create and would-quarantine counts.

Dry run must never insert, update, delete, transition, emit an event, or
create a migration. If the database is not configured for a dry run, report
DB_PREFLIGHT_SKIPPED; do not claim duplicate detection was complete.

No new quarantine table is authorized. The initial implementation writes a
bounded JSON/JSONL run report outside the Library tables, containing stable
reason codes and source IDs without secrets. Unsafe rows never enter public
Library resources.

Stable minimum reason taxonomy:

~~~
TATOEBA_API_NOT_FOUND
TATOEBA_API_UNAVAILABLE
TATOEBA_LICENSE_PROBLEM
TATOEBA_LICENSE_UNKNOWN
TATOEBA_UNAPPROVED
TATOEBA_TEXT_MISMATCH
TATOEBA_LANGUAGE_MISMATCH
TATOEBA_OWNER_REQUIRED
TATOEBA_CC0_MISMATCH
TATOEBA_UNSUPPORTED_LANGUAGE
TATOEBA_MALFORMED_BULK_ROW
TATOEBA_DUPLICATE_BULK_ID
TATOEBA_TRANSLATION_ENDPOINT_MISSING
TATOEBA_TRANSLATION_DIRECTION_CONFLICT
TATOEBA_TRANSLATION_INTEGRITY_CONFLICT
TATOEBA_NEW_UNSAFE_ZERO_WRITE
TATOEBA_LICENSE_REGISTRY_MISMATCH
~~~

## 13. API failure and security contract

The client may retry only bounded timeout, connection, 429, and selected
transient 5xx failures with finite backoff and a finite attempt count. A 404
is a permanent not-found/deleted result. Other 4xx responses follow an
explicit row/run policy and never fall back to bulk-only acceptance. Broad
API unavailability stops or quarantines the bounded run according to the
configured fail-closed policy; it never silently imports from bulk alone.

The implementation must:

- allow only HTTPS Tatoeba API hosts documented by the current contract;
- reject arbitrary operator-supplied fetch URLs and unsafe redirects;
- cap response bytes before JSON parsing;
- validate the JSON shape, types, license enum, ID, language, owner, and
  status fields;
- validate local input paths against the run's allowed input roots;
- avoid shell composition from any dataset value;
- bound row, text, batch, report, and in-memory queue sizes;
- sanitize logs and reports so credentials and environment values never
  appear;
- preserve only the owner username required for attribution, not profiles,
  comments, or private data;
- avoid spreadsheet formula injection if a CSV report is ever added.

## 14. Planned Backend implementation surface

These are implementation targets for 08D3, not changes made by 08D2:

- a Tatoeba importer application service with explicit command/result
  contracts;
- a repository transaction operation for sentence import/reconciliation;
- a repository transaction operation for direct-link
  import/reconciliation;
- a read-only actor authorization/preflight query;
- a read-only license-registry preflight query;
- a global provider-qualified external-identity lookup;
- an advisory-lock helper accepting only canonical identities;
- strict bulk readers, language mapping, API client, mismatch classifier,
  and bounded run reporter;
- a standalone CLI entrypoint wired into the Backend package without a
  public controller.

The service must not call the generic community contribution submit path for
Tatoeba, because that path both enforces ORIGINAL_AUTHOR and emits the wrong
event. It must use the dedicated importer repository operation with the
normal review audit table.

## 15. Test and rollout gates

### 08D3A - contracts, parser, API, and dry run; no DB writes

Implement and test:

- strict TSV/CSV parsing and streaming bounds;
- language mapping and unsupported-code rejection;
- CC0 join and normal-detailed snapshot rules;
- API schema/license/owner/unapproved validation;
- retry, timeout, 429, selected 5xx, 404, PROBLEM, and malformed JSON;
- HTTPS host/redirect/response-size safety;
- snapshot/API mismatch classification;
- direct-link reciprocal collapse for input pairs only;
- deterministic directed translation identity;
- explicit configured language directions and no implicit reverse resource;
- input-order-independent candidate identity;
- dry-run report with an automated zero-write assertion.

08D3A must not implement the advisory database transaction, global durable
lookup, or Library writes.

### 08D3B - atomic sentence import, actor, license, and idempotency

Implement and test:

- explicit ACTIVE ADMIN actor preflight;
- mandatory runtime license registry preflight;
- one-transaction DRAFT/provenance/SUBMIT-audit/COMMUNITY_REVIEW flow;
- no community contribution event;
- no automatic VERIFY;
- sentence advisory lock and global lookup;
- concurrent same-sentence create/reconcile;
- unchanged rerun NOOP with no audit/provenance/update churn;
- rollback with zero partial rows;
- new unsafe candidate zero-write behavior.

### 08D3C - direct translation and reconciliation

Implement and test:

- unordered input-pair deduplication plus directed durable identity;
- directed translation advisory lock and exact role-qualified global lookup;
- two endpoint provenance entries with two actual license keys;
- reciprocal input deduplication and no transitive closure;
- source/target content assignment independent of input row order;
- explicit reverse-direction identity and no implicit reverse creation;
- incomplete role lookup integrity conflict quarantine;
- missing/changed/unapproved/deleted endpoint handling;
- DRAFT/COMMUNITY_REVIEW reconciliation;
- VERIFIED invalidation-before-reconcile;
- REJECTED no-auto-reopen behavior;
- no automatic re-verification.

### 08D3D - TEST database verification and publication

Only after the preceding slices are accepted:

- run the approved bounded Neon TEST gate;
- prove two concurrent same-source runs produce one durable resource;
- prove a rerun is a NOOP;
- prove transaction failure leaves no partial resource/provenance/audit;
- prove new unsafe candidates produce zero durable Library writes;
- prove reciprocal input order cannot change the directed identity;
- prove explicitly configured reverse direction has a distinct identity;
- prove both directions configured do not collide;
- prove unsafe VERIFIED material is hidden before reconciliation;
- prove both translation licenses and attributions are retained;
- run cleanup only for test fixtures;
- publish runtime evidence and perform the normal review/publication gate.

No production access or deployment is part of 08D2.

## 16. Schema and migration decision

~~~
CURRENT_SCHEMA_SUFFICIENT=YES
MIGRATION_REQUIRED=NO
~~~

The current OPEN_DATASET source type, sentence/translation detail rows,
provenance license/source/batch/transformation columns, review states/audits,
and public VERIFIED gate are sufficient for this bounded design. The missing
global uniqueness constraint is handled by the transaction-scoped advisory
lock plus lookup/reconcile/create critical section, with concurrent tests
required before publication.

If implementation later proves that the required identity cannot be enforced
safely with the existing transaction and advisory-lock contract, the work
must stop and return NEEDS_SCHEMA_REMEDIATION. No migration is authorized
by this plan.

## 17. Required final state for 08D2

The implementation plan is accepted as complete only with these boundaries:

~~~
BACKEND_CHANGED=NO
FRONTEND_CHANGED=NO
DATASET_DOWNLOADED=NO
MIGRATION_RERUN=NO
MIGRATION_0012_CREATED=NO
TEST_DB_MUTATED=NO
PRODUCTION_DB_MUTATED=NO
DEPLOYED=NO
UNORDERED_TRANSLATION_IDENTITY_RUN_ORDER_DEFECT=CONFIRMED
INPUT_PAIR_IDENTITY=TATOEBA:PAIR:<minId>:<maxId>
DIRECT_TRANSLATION_IDENTITY=TATOEBA:LINK:DIRECT:<sourceSentenceId>:<targetSentenceId>
TRANSLATION_LOCK_IDENTITY=OPEN_DATASET:TATOEBA:LINK:DIRECT:<sourceId>:<targetId>
TRANSLATION_TWO_PROVENANCE_ENTRIES=YES
AUTO_CREATE_REVERSE_TRANSLATION=NO
NEW_UNSAFE_CANDIDATE_DURABLE_RESOURCE=NO
NEW_UNSAFE_CANDIDATE_ACTION=QUARANTINE_ZERO_WRITES
PARTIAL_INITIAL_RESOURCE_AFTER_FAILURE=NO
CURRENT_PHASE=08
PHASE_08=IN_PROGRESS
LNG_08_006=VERIFYING
LNG_08_007=PLANNED
LNG_08_008=PLANNED
NEXT_ACTION=STOP_FOR_08D3A_IMPLEMENTATION
~~~

08D2 does not mark LNG-08-006 DONE or READY, does not start LNG-08-007,
and does not authorize importer implementation beyond the separately gated
08D3A slice.

## 18. External-review remediation

The external review finding is confirmed:

~~~
08D2_EXTERNAL_REVIEW_REMEDIATION=PASS
UNORDERED_TRANSLATION_IDENTITY_RUN_ORDER_DEFECT=CONFIRMED
~~~

The original unordered durable identity was not deterministic for the
directional Library TRANSLATION model. It is now superseded by:

~~~
INPUT_PAIR_IDENTITY=TATOEBA:PAIR:<minId>:<maxId>
DURABLE_TRANSLATION_IDENTITY=TATOEBA:LINK:DIRECT:<sourceId>:<targetId>
TRANSLATION_LOCK_IDENTITY=OPEN_DATASET:TATOEBA:LINK:DIRECT:<sourceId>:<targetId>
TRANSLATION_TWO_PROVENANCE_ENTRIES=YES
AUTO_CREATE_REVERSE_TRANSLATION=NO
~~~

The input pair identity is used only to collapse reciprocal links. The
directed identity is built after endpoint language resolution and maps exactly
to primaryLanguageCode/sourceText and secondaryLanguageCode/translatedText.
Reverse direction is independently configurable and independently durable.
Exact role-qualified OPEN_DATASET source IDs are the global lookup boundary;
transformation_history is explanatory metadata, not the idempotency key.

The remediation acceptance matrix is:

~~~
TRANSLATION_IDENTITY_INPUT_ORDER_INDEPENDENT=PASS
REVERSE_DIRECTION_DISTINCT_IDENTITY=PASS
BIDIRECTIONAL_CONFIGURATION_COLLISION=NO
NEW_UNSAFE_CANDIDATE_DURABLE_RESOURCE=NO
NEW_UNSAFE_CANDIDATE_ACTION=QUARANTINE_ZERO_WRITES
PARTIAL_INITIAL_RESOURCE_AFTER_FAILURE=NO
~~~

The pre-existing DRAFT exception remains narrow: only an importer-owned
durable DRAFT may be safely reconciled under its identity lock. A NEW
candidate with incomplete/unsafe required facts is report-only quarantine
with zero Library writes. The new directed transaction and integrity tests
remain in 08D3B/08D3C; 08D3A remains parser/API/dry-run only.

## 19. Historical 08D2 baseline retained

The initial 08D2 plan used
TATOEBA:LINK:DIRECT:<minId>:<maxId> as the durable translation identity and
used the same unordered identity for its direct-link lock and role-qualified
provenance IDs. That baseline is retained here as historical context for the
external review finding. It is superseded and must not be implemented.
