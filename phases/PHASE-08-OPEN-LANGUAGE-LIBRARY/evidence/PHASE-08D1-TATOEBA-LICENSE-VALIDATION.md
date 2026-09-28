# Phase 08D1 — Tatoeba License and Export Contract Validation

Status: research and contract validation only
Retrieved: 2026-09-28 (Asia/Saigon)
Scope: Tatoeba text sentences and direct translation links only

This evidence records the contract needed before an importer is designed. No
Tatoeba corpus was downloaded, no application code was changed, and no test or
production database was contacted or mutated.

## Decision summary

```text
PHASE_08D1_TATOEBA_LICENSE_VALIDATION=PASS
TEXT_DEFAULT_LICENSE=CC BY 2.0 FR
CC0_TEXT_SUPPORTED=YES
PER_SENTENCE_LICENSE_VARIATION=YES
COMMERCIAL_TEXT_REUSE=CONDITIONAL
DOWNLOAD_EXPOSES_TEXT_LICENSE=PARTIAL
DOWNLOAD_EXPOSES_OWNER=PARTIAL
LINK_FILE_AVAILABLE=YES
AUDIO_IMPORT=OUT_OF_SCOPE
CURRENT_SCHEMA_SUFFICIENT=YES
MIGRATION_REQUIRED=NO
TATOEBA_INITIAL_REVIEW_STATE=COMMUNITY_REVIEW
TATOEBA_ADAPTER_DECISION=NEEDS_REMEDIATION
LNG_08_006=VERIFYING
```

The decision is `NEEDS_REMEDIATION`, not `BLOCKED_EXTERNAL`: current Tatoeba
API facts can complete the bulk-export contract, but the bulk files alone do
not put the full per-sentence license and ownership facts in one authoritative
row. LNG-08-006 must therefore remain in `VERIFYING` until the 08D2 importer
plan defines bounded API enrichment, snapshot consistency, and fail-closed
behavior.

## Authoritative sources

All sources below were current first-party Tatoeba or Creative Commons pages
retrieved on 2026-09-28. No historical/archive page was used as authority for
the decision.

| Source | Current statement used |
| --- | --- |
| [Tatoeba Terms of Use](https://tatoeba.org/en/terms_of_use) — “Terms of Use” | Textual sentences use CC BY 2.0 FR by default; authors must be cited; contributors may specify compatible licenses per sentence; reuse must carry the sentence license; translations generally have derivative-work constraints; Tatoeba is generally not opposed to commercial use, subject to the applicable contributor/license terms. |
| [Tatoeba Downloads](https://tatoeba.org/en/downloads) — “Download sentences - Tatoeba” | Current text exports and their tab-separated fields are documented; the corpus is released under CC BY 2.0 FR with a separate CC0 1.0 sentence set; weekly exports are updated Saturday. |
| [Tatoeba export index](https://downloads.tatoeba.org/exports/) — “Index of /exports/” | The current export tree exposes `sentences`, `sentences_detailed`, `sentences_CC0`, `sentences_base`, `links`, `tags`, and related `.csv`/`.tar.bz2` artifacts. The directory listing retrieved here was dated 2026-09-26. |
| [Using the Tatoeba Corpus for Your Own Projects](https://en.wiki.tatoeba.org/articles/show/using-the-tatoeba-corpus) | Reusers should filter poor or rejected material, understand how sentences were selected, and update their selected corpus as the source changes. |
| [Tatoeba FAQ](https://en.wiki.tatoeba.org/articles/show/faq) | Red/unapproved sentences are excluded from weekly downloadable exports; text attribution should identify Tatoeba, link to Tatoeba, and mention CC BY 2.0 FR. Indirect translations are visually distinguished from direct translations. Audio has broader, heterogeneous licensing. |
| [How to contribute under CC0](https://en.wiki.tatoeba.org/articles/show/cc0-contributions) | CC0 is currently available for original sentences, not translations or audio; a CC0 original may be used as the basis for a derivative with a compatible downstream license. |
| [How to handle sentences with licensing issues](https://en.wiki.tatoeba.org/articles/show/handling-sentences-with-licensing-issues) | A sentence marked with a licensing issue is not translatable and is not exported in Downloads; related translations should also be marked. |
| [Tatoeba API](https://api.tatoeba.org/) and [current OpenAPI contract](https://api.tatoeba.org/openapi.json) | The read-only API exposes sentence `id`, `text`, ISO 639-3-style `lang`, `license`, `owner`, and `is_unapproved`; license values include `CC BY 2.0 FR`, `CC0 1.0`, and `PROBLEM`. It supports direct-translation filtering and returns 404 for a missing/deleted sentence. |
| [CC BY 2.0 France deed](https://creativecommons.org/licenses/by/2.0/fr/) | Sharing and adapting, including commercially, is permitted subject to attribution, a license link, modification indication, and no additional restrictions. |
| [CC0 1.0 deed](https://creativecommons.org/publicdomain/zero/1.0/) | Copying, modifying, distributing, and performing, including commercially, is permitted where the waiver is effective, subject to the deed’s reservations such as privacy, publicity, and trademark rights. |

The Terms of Use page is current but states that its French version prevails;
the English page was used here for an auditable engineering summary.

## Text license model

The default textual license is **CC BY 2.0 FR**. Tatoeba also publishes an
explicit CC0 1.0 subset for eligible original sentences. License is a
per-sentence fact, not a corpus-wide assumption:

```text
TEXT_DEFAULT_LICENSE=CC BY 2.0 FR
CC0_TEXT_SUPPORTED=YES
PER_SENTENCE_LICENSE_VARIATION=YES
```

The current CC0 contribution guidance limits CC0 contribution to original
sentences. Tatoeba does not currently make translations CC0; translations
generally derive rights from the original sentence. A translated sentence must
therefore retain the applicable source/derivative licensing facts. A CC BY
sentence must not be relabeled CC0 merely because it was transformed.

## Commercial text reuse

```text
COMMERCIAL_TEXT_REUSE=CONDITIONAL
```

CongDongNgonNgu may use an eligible Tatoeba text sentence in a commercial or
freemium product when all of the following are true:

1. The actual sentence license is known and compatible. CC BY 2.0 FR allows
   commercial sharing/adaptation when its conditions are met; CC0 1.0 also
   permits commercial reuse where its waiver applies.
2. The imported record carries the applicable license, attribution, source
   link, and any modification/transformation notice. For CC BY, attribution,
   the license link, and an indication of modifications are mandatory.
3. The product does not add restrictions inconsistent with the license.
4. Translation/derivative constraints are respected. The fact that a pair is
   linked in Tatoeba does not erase rights attached to either sentence.
5. Licensing-issue, unapproved/unreliable, deleted, or otherwise unresolved
   records are excluded or quarantined. The importer must not infer safety
   from a missing field.

This is conditional rather than blanket approval because Tatoeba’s Terms place
reuse responsibility on the reuser and explicitly note contributor-specific
constraints, especially for derivatives and audio.

## Safe attribution and provenance strategy

A sentence-specific URL is useful evidence but is not sufficient by itself for
CC BY attribution: the current Tatoeba guidance also calls for identifying the
author, identifying CC BY 2.0 FR, and linking to the license. The conservative
resource contract is:

```text
sourceType=OPEN_DATASET              # current schema value; provider is Tatoeba
sourceId=TATOEBA:SENTENCE:<id>
sourceUrl=https://tatoeba.org/en/sentences/show/<id>
licenseKey=CC_BY_2_0_FR | CC0_1_0   # normalized registry keys in 08D2
attribution=<non-empty safe attribution text>
originalAuthorReference=<Tatoeba username when available>
importBatchId=<bounded importer batch identifier>
transformationNote=<only when text or representation was modified>
```

Recommended CC BY attribution text:

> Source: Tatoeba sentence #`<id>`, by `<username>`; licensed under CC BY 2.0
> FR ([license](https://creativecommons.org/licenses/by/2.0/fr/)). Modified by
> CongDongNgonNgu: `<transformation note>`.

For CC0, attribution is not generally a license condition, but the importer
should still preserve Tatoeba, the sentence ID, source URL, and any known
username for auditability. It must not invent an owner when the source reports
an orphan/null owner.

The product should also expose a site-level notice such as:

> Text sentences identified as sourced from Tatoeba are used under the
> applicable sentence license, including CC BY 2.0 FR where shown. See
> [Tatoeba](https://tatoeba.org), the sentence-level source link, and the
> [CC BY 2.0 FR license](https://creativecommons.org/licenses/by/2.0/fr/).
> Modifications are identified at the affected resource.

For a direct translation resource, preserve both source sentence IDs, both
source URLs, both actual licenses, and both known owners. The singular
`original_author_reference` field can hold one compact reference, but the full
two-party attribution belongs in `attribution` and transformation metadata.

## Current text-only downloads and fields

The current export index exposes both CSV and `tar.bz2` forms. The following
files are the minimum text-only contract; none was downloaded in this task.

| Current file(s) | Fields / use |
| --- | --- |
| `sentences.csv`, `sentences.tar.bz2` | `Sentence id`, `Lang`, `Text`. Basic sentence text. |
| `sentences_detailed.csv`, `sentences_detailed.tar.bz2` | `Sentence id`, `Lang`, `Text`, `Username`, `Date added`, `Date last modified`. Preferred bulk source for text plus owner attribution. |
| `sentences_CC0.csv`, `sentences_CC0.tar.bz2` | `Sentence id`, `Lang`, `Text`, `Date last modified`. Separate CC0 subset; it does not include `Username`. |
| `sentences_base.csv`, `sentences_base.tar.bz2` | `Sentence id`, `Base field`; zero means original, a positive value identifies the sentence from which a translation was made, and `\\N` means unknown. Useful provenance context, not a replacement for direct links. |
| `links.csv`, `links.tar.bz2` | `Sentence id`, `Translation id`. A row represents a direct translation link; the reciprocal row is also present. |
| `tags.csv`, `tags.tar.bz2` | `Sentence id`, `Tag name`. Optional quality/filtering metadata; do not import as user/profile data by default. |
| `users_sentences.csv` | `Username`, `Sentence id`, `Review`, dates. Optional review evidence; not required for the initial adapter. |

The current index also lists `sentences_with_audio.csv` and
`sentences_with_audio.tar.bz2` with sentence ID, audio ID, username, audio
license, and attribution URL. These are explicitly excluded below.

### License exposure

```text
DOWNLOAD_EXPOSES_TEXT_LICENSE=PARTIAL
```

The normal and detailed bulk rows do not contain an inline license column. The
separate `sentences_CC0` export identifies CC0 membership, but requires a
join, and does not by itself expose all possible sentence-license states or
owner data. The current API exposes the authoritative per-sentence license
enum (`CC BY 2.0 FR`, `CC0 1.0`, `PROBLEM`) and should be used as the bounded
enrichment/fail-closed source for the importer contract.

The 08D2 design must choose one explicit strategy and record the source
snapshot/version:

- join the current detailed export to the current CC0 export and reject any
  unresolved or contradictory row, while using API checks for statuses; or
- use the API as the per-row authority, with bounded batching, rate/error
  handling, and a reproducible import snapshot.

It must never classify a row as CC BY merely because a license field is absent.
Known `PROBLEM`/licensing-issue records are never imported. Because the bulk
contract is only partial, this validation does not green-light implementation.

### Owner exposure

```text
DOWNLOAD_EXPOSES_OWNER=PARTIAL
```

`sentences_detailed` exposes `Username`, but the basic and CC0 files do not,
and the API permits a null owner for an orphan sentence. Use the detailed file
and/or API to preserve the username when present. A CC BY row with no usable
author attribution must be held or rejected. For CC0, an owner is not normally
a license condition, but the importer must still preserve a null/unknown fact
without inventing a name; the conservative initial design may quarantine such
rows for review.

## Direct translation semantics

```text
LINK_FILE_AVAILABLE=YES
```

The `links` export is the direct-link relation. If it contains `1<TAB>77`,
sentence 77 is a translation of sentence 1; the reciprocal row is also
present. It must not be expanded transitively. The API independently exposes
`is_direct`, and its translation filters distinguish direct links from
translations of translations.

Recommended mapping into the existing Library resources:

1. Create one `SENTENCE` resource per eligible Tatoeba sentence. Store its
   language, text, source ID, source URL, license, attribution, batch, and
   transformation history.
2. Create a `TRANSLATION` resource only for an explicit direct `links` edge
   whose two sentence records are both eligible and in the configured project
   language direction. Populate `source_text` and `translated_text` from the
   two sentence rows.
3. Collapse reciprocal rows into one deterministic relation identity:
   `TATOEBA:LINK:DIRECT:<minSentenceId>:<maxSentenceId>`. The numeric order is
   only an idempotency key; linguistic source/target direction comes from the
   configured language pair, never from numeric order.
4. Preserve both sentence IDs, source URLs, owners, and licenses on the
   translation resource. The relation ID and both sentence IDs belong in
   provenance/transformation metadata; the existing translation table does not
   make an external Tatoeba link authoritative by itself.

Indirect translation chains, arbitrary same-language pairs, and links to
excluded/deleted/unresolved sentences are not imported as direct translations.

## Licensing issues, unreliable records, and deletion

The importer must fail closed:

- Never import a sentence known to have a Tatoeba licensing issue. Tatoeba’s
  current handling guidance says such a sentence is not exported and is no
  longer translatable.
- Weekly downloadable exports exclude red/unapproved material according to the
  current FAQ, but the API can return unapproved records unless the importer
  explicitly rejects `is_unapproved=true` and applies the relevant filters.
- Do not infer that a downloadable row is reviewed or trustworthy. Re-check
  status when using the API and quarantine contradictory or stale metadata.
- A current API 404 means the sentence is absent/deleted. On a rerun, reconcile
  the existing imported resource through the existing invalidation/review path;
  do not create a replacement resource under a new ID.
- No imported Tatoeba resource may be promoted directly to `VERIFIED`.

## Audio exclusion

```text
AUDIO_IMPORT=OUT_OF_SCOPE
```

Tatoeba audio has a wider and heterogeneous license surface than text. The
current FAQ and audio export fields require per-audio license and attribution
handling, and the Terms call out extra contributor restrictions for audio.
The initial LNG-08-006 adapter is text-only: it must not download, store, or
interpret Tatoeba audio files or audio metadata.

## Existing CongDongNgonNgu schema fit

```text
CURRENT_SCHEMA_SUFFICIENT=YES
MIGRATION_REQUIRED=NO
```

The accepted Backend main schema can preserve the required facts:

- `library_licenses` can register active normalized entries for CC BY 2.0 FR
  and CC0 1.0, with canonical URL, attribution requirement, redistribution
  allowance, derivative constraints, and source note.
- `library_resources` supports `SENTENCE` and `TRANSLATION`, language IDs, and
  review/visibility state.
- `library_resource_provenance` supports source ID, source URL, license key,
  non-empty attribution, original author reference, import batch, and JSON
  transformation history.
- The existing review audit/lifecycle supports `DRAFT`,
  `COMMUNITY_REVIEW`, `VERIFIED`, and `REJECTED`, with no need for automatic
  verification.

The current enum has `OPEN_DATASET`, not a literal `TATOEBA` source type. The
bounded no-migration convention is to use `OPEN_DATASET` with a provider-
qualified `sourceId` (`TATOEBA:SENTENCE:<id>` and
`TATOEBA:LINK:DIRECT:<a>:<b>`), while storing the provider in the source URL,
attribution, and transformation metadata. This preserves provider identity and
prevents collisions without changing the enum. If a future product contract
requires a first-class `TATOEBA` enum or a database-enforced global uniqueness
constraint across resources, that would be a separate schema-remediation
decision; it is not required to preserve the current facts.

The importer still needs a designated system/import actor because
`created_by_user_id` is required and normal member provenance permissions do
not allow arbitrary `OPEN_DATASET` records. The required license registry rows
must also be validated before any import. Neither prerequisite is performed in
this task.

## Review lifecycle and trust

```text
TATOEBA_INITIAL_REVIEW_STATE=COMMUNITY_REVIEW
```

Use `COMMUNITY_REVIEW` only after the import has complete, validated
provenance and is submitted through the existing reviewer gate by the
designated importer actor. If provenance is incomplete or the importer cannot
submit safely, keep the resource in `DRAFT`; never bypass the gate to reach
`VERIFIED`.

```text
TATOEBA_SOURCE_TRUST != VERIFIED
```

Tatoeba membership is a source/provenance fact, not CongDongNgonNgu
verification. Imported material still passes license, provenance, moderation,
and review gates. No automatic quality score is introduced; tags, ratings, and
source status are not a substitute for review.

## Idempotency and reconciliation contract

The provider identity must be stable before implementation:

```text
provider=TATOEBA
sentence identity=TATOEBA:SENTENCE:<Tatoeba sentence ID>
direct relation identity=TATOEBA:LINK:DIRECT:<min ID>:<max ID>
```

Rerunning the same batch with the same source ID must reconcile the existing
resource, not create another durable resource. Reconciliation must detect
changes to text, language, owner, license, link eligibility, or deletion and
route them through the existing review/invalidation behavior. A concurrent
implementation must serialize the lookup/create decision or otherwise enforce
the same uniqueness at the importer boundary because the current provenance
unique key is scoped to one resource, not globally across all resources.

## Data minimization

The initial adapter is text-only and should ingest only:

- Tatoeba sentence ID, language, and text;
- owner username when needed/available for attribution;
- actual sentence license and source-specific attribution;
- stable sentence URL;
- direct translation link IDs;
- import batch and transformation metadata.

Do not ingest audio, comments, wall/contribution data, private data, or user
profiles. Tags are optional and should be added only for a documented filtering
need; they do not establish CongDongNgonNgu quality.

## Language-code mapping

The current Tatoeba API contract uses ISO 639-3-style lowercase language codes.
The project’s supported mappings are:

| Project code | Tatoeba code | Rule |
| --- | --- | --- |
| `vi` | `vie` | Vietnamese |
| `en` | `eng` | English |
| `zh` | `cmn` | Mandarin Chinese only; the project’s broad `zh` code must not silently absorb other Chinese varieties. |
| `ja` | `jpn` | Japanese |
| `ko` | `kor` | Korean |
| `fr` | `fra` | French |
| `de` | `deu` | German |
| `es` | `spa` | Spanish |

The current Tatoeba site exposes Mandarin under `cmn`; this is why `zh` is
explicitly documented as a narrowing to Mandarin, not a universal Chinese
mapping. Other Tatoeba language codes are unsupported unless a separate,
explicit project mapping is approved. Unknown or ambiguous codes must be
rejected, not silently coerced.

## Final recommendation

Commercial text reuse is feasible under the stated conditions, and the
existing storage/lifecycle model is sufficient without a migration. The
remaining work is an implementation contract: select a reproducible bulk/API
license enrichment strategy, reject all unresolved/problem/unapproved/deleted
rows, preserve both sides of direct links, and make reconciliation idempotent.

```text
TATOEBA_ADAPTER_DECISION=NEEDS_REMEDIATION
NEXT_SLICE=08D2
NEXT_ACTION=STOP_FOR_08D2_IMPORTER_IMPLEMENTATION_PLAN
```

## 08D2 design boundaries recorded at closure

The following items are design prerequisites, not importer implementation.

### Lifecycle gate

`TATOEBA_INITIAL_REVIEW_STATE=COMMUNITY_REVIEW` names the state reached only
after the normal review boundary. It does not authorize direct insertion into
that state:

```text
TATOEBA_IMPORT_LIFECYCLE=DRAFT_THEN_SUBMIT_TO_COMMUNITY_REVIEW
```

The importer must create/import as `DRAFT`, attach complete validated
provenance and license facts, and submit through the existing review audit
boundary. If any source, license, owner/attribution, status, or relationship
fact is incomplete, the row remains `DRAFT` or is rejected/quarantined. It
must never create `VERIFIED` directly or bypass review audit.

### API authority and fail-closed checks

The bulk export is discovery/snapshot input. For the bounded initial importer,
the stable Tatoeba v1 sentence API is the authoritative per-sentence
enrichment/check where required. The required facts are `id`, `lang`, `text`,
`license`, `owner`, and `is_unapproved`.

Only `CC BY 2.0 FR` and `CC0 1.0` are accepted. The importer must reject or
fail closed on `PROBLEM`, an unknown license, missing required attribution
facts, `is_unapproved=true`, deleted/API 404, unsupported language, or any
bulk/API material mismatch. A missing license must never default to CC BY.

### Snapshot consistency

Bulk exports and API enrichment may represent different source states. The 08D2
plan must record a snapshot identifier, bulk retrieval timestamp, source
artifact hashes where available, API-check timestamp, and a material mismatch
reason. If text, language, license, owner, or status differs materially between
the bulk row and current API facts, the initial importer must
`SKIP_OR_QUARANTINE`, not silently reconcile during creation.

### Direct links

The `links` export remains the direct-relation input. The plan must verify each
link within bounded scope and must not compute transitive translations. The
identity is:

```text
TATOEBA:LINK:DIRECT:<minId>:<maxId>
```

Numeric ordering is identity only; linguistic direction comes from the
configured source/target language pair.

### Unresolved implementation contracts

No hidden system actor, migration, or concurrency mechanism is chosen in this
closure:

```text
IMPORT_ACTOR_CONTRACT=PENDING_08D2_DESIGN
IMPORT_CONCURRENCY_CONTRACT=PENDING_08D2_DESIGN
TATOEBA_LICENSE_REGISTRY_RUNTIME_CHECK=PENDING
```

08D2 must choose an auditable authorized actor model, such as an explicit
authorized ADMIN supplied to a CLI run or a documented pre-provisioned import
actor. It must also design safe concurrent lookup/reconcile/create for the
provider-qualified external identity because the current schema does not
provide a confirmed global uniqueness constraint across all resources.
Before import, 08D2 must inspect actual runtime/configured license registry
entries for CC BY 2.0 FR and CC0 1.0; schema support alone is not evidence that
the entries exist. No registry entry is inserted here.
