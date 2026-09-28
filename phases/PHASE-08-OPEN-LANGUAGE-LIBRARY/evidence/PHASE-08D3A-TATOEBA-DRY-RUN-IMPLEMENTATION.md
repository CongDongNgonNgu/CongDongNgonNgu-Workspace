# Phase 08D3A — Tatoeba dry-run importer foundation

## Boundary

This evidence records the first implementation slice only. It is a bounded,
read-only dry-run foundation. It does not create Library resources, attach
durable provenance, acquire PostgreSQL advisory locks, look up existing
resources, reconcile DRAFT/VERIFIED rows, emit contribution events, run
migrations, or access a database. 08D3B/08D3C remain the implementation and
TEST-database slices for those operations.

```text
PHASE_08D3A_IMPLEMENTATION=PASS
BACKEND_BRANCH=phase-08d3a-tatoeba-dry-run
BACKEND_SHA=a493f133f24d1bbf771da66a8e16bf0ef0e6bb73
BACKEND_CI_RUN=NOT_TRIGGERED
BACKEND_CI_STATUS=NOT_TRIGGERED
WORKSPACE_BASE=41627b0133bce9287e24e56a22d3b560e217261c
```

The Backend branch was pushed and its remote branch SHA was verified to match
the local SHA. The Backend workflow is configured for `main` pushes and pull
requests, not feature-branch pushes, so no CI run exists for this branch.

## Authoritative Tatoeba evidence

Retrieved/checked 2026-09-28 (Asia/Ho_Chi_Minh):

| Source | Current statement used |
| --- | --- |
| [Using the Tatoeba Corpus for Your Own Projects](https://en.wiki.tatoeba.org/articles/show/using-the-tatoeba-corpus) | Textual sentences use default CC BY 2.0 FR; attribution is required; audio terms differ; users should filter/review quality and update because corrections continue; downloads are updated weekly. |
| [Tatoeba FAQ](https://en.wiki.tatoeba.org/articles/show/faq) | Text attribution should identify Tatoeba with a link and CC BY 2.0 FR; red sentences are unapproved/unreliable and are excluded from weekly downloadable exports; audio has a wider, heterogeneous license range. |
| [How to contribute under CC0](https://en.wiki.tatoeba.org/articles/show/cc0-contributions) | Contributions default to CC BY 2.0; eligible original sentences may use CC0 1.0; CC0 is not available for translations, which are derivative work; a CC BY original cannot yield a CC0 derivative. |
| [Tatoeba API OpenAPI document](https://api.tatoeba.org/openapi.json) | Stable `/v1` API is read-only; `GET /v1/sentences/{id}` returns `{data: ...}` with `id`, `text`, `lang`, `license`, `owner`, and `is_unapproved`; 404 represents a missing/deleted sentence; documented license states include CC BY 2.0 FR, CC0 1.0, and PROBLEM. |
| [Current Tatoeba export index](https://downloads.tatoeba.org/exports/) | Current export artifacts include `sentences_detailed.csv`, `sentences_CC0.csv`, and `links.csv`; the index also exposes large archive variants, which were not downloaded. |
| [Tatoeba Downloads page](https://tatoeba.org/en/downloads) | First-party downloads UI is the schema authority. Direct retrieval returned HTTP 429 in this session; the current export index and current first-party search result were used for file availability, while schema fields remain recorded below. |
| [Tatoeba Terms of Use](https://tatoeba.org/en/terms_of_use) | The current page is linked by the current corpus guide. Direct retrieval returned HTTP 429 in this session, so no new legal conclusion is based only on that failed fetch. The accepted 08D1 evidence remains the project’s current license decision. |
| [Terms of Use v1 archive](https://en.wiki.tatoeba.org/articles/show/terms-of-use-v1) | **Historical/archive only.** It describes the older CC BY attribution, author/source URL, modification, and license-notice model; it is retained as corroborating history, not as a replacement for current-source validation. |

The Creative Commons references carried by the current Tatoeba sources are
[CC BY 2.0 France](https://creativecommons.org/licenses/by/2.0/fr/) and
[CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/).

## License and reuse contract

```text
TEXT_DEFAULT_LICENSE=CC BY 2.0 FR
CC0_TEXT_SUPPORTED=YES
PER_SENTENCE_LICENSE_VARIATION=YES
COMMERCIAL_TEXT_REUSE=CONDITIONAL
```

Conditional reuse means the textual sentence must be reused under the
applicable current sentence license, with the required attribution and
license notice. CC BY text requires author attribution and a CC BY 2.0 FR
notice/link; changes must be indicated when changes are actually made. CC0 is
accepted only when both the CC0 snapshot membership and the current API
license say CC0 1.0. No missing license defaults to CC BY.

The 08D3A implementation preserves exact bulk text. Therefore its attribution
builder does not emit a false modification notice. A future transformation
must supply an explicit transformation note before it can be attributed.

```text
DOWNLOAD_EXPOSES_TEXT_LICENSE=PARTIAL
DOWNLOAD_EXPOSES_OWNER=PARTIAL
API_LICENSE_ALLOWLIST=CC BY 2.0 FR | CC0 1.0
```

The detailed export exposes `Username`, but not a complete license fact. The
CC0 export is a membership/snapshot signal and does not make every sentence
CC BY when absent. The v1 API supplies the current license and owner facts.
For CC BY, a missing current owner is rejected. For CC0, a null owner is
preserved and never invented. A supplied bulk username that disagrees with
the API owner, including API null, is quarantined.

## Current export readers

The implementation reads local, tab-delimited `.csv` artifacts as streams.
It does not download or decompress any corpus. Exact current fields used:

| File | Required tab-separated fields | Use |
| --- | --- | --- |
| `sentences_detailed.csv` | `Sentence id`, `Lang`, `Text`, `Username`, `Date added`, `Date last modified` | Sentence discovery, exact text/language, partial owner evidence. |
| `sentences_CC0.csv` | `Sentence id`, `Lang`, `Text`, `Date last modified` | Mandatory CC0 snapshot membership and text/language consistency check. |
| `links.csv` | `Sentence id`, `Translation id` | Direct relation input only. |

The reader accepts a documented exact header when present, but never
blindly skips the first row. It preserves text bytes/code points apart from
the export delimiter and CRLF delimiter handling; it does not trim, collapse,
normalize, lowercase, or rewrite punctuation. UTF-8 decoding is fatal, with
malformed rows reported as `TATOEBA_MALFORMED_BULK_ROW` and malformed byte
streams rejected as `TATOEBA_INVALID_UTF8`. Line length, row count, CC0 scan,
report rows, API response bytes, API timeout, retry count, and concurrency are
bounded.

Artifacts are hashed with streaming SHA-256. The report records filename,
size, hash, retrieval timestamp, deterministic snapshot ID, and API-check
timestamps. A malformed CC0 snapshot makes selected candidates unsafe rather
than allowing an inferred license.

## API enrichment and fail-closed taxonomy

The CLI uses a dedicated read-only client for the allowlisted
`https://api.tatoeba.org/v1/sentences/{id}?showtrans=none` endpoint. It rejects
non-HTTPS/arbitrary hosts, credentials, unexpected query parameters, and
redirects. Timeout, response-byte, concurrency, retry, and `Retry-After`
handling are bounded. Tests inject transport, clock, and sleep; no automated
live Tatoeba sentence calls ran.

Accepted API license values are exactly `CC BY 2.0 FR` and `CC0 1.0`.
`PROBLEM`, unknown/null/missing license, missing owner facts, unapproved
sentences, 404/deleted sentences, unsupported language, malformed responses,
and API/bulk material disagreement are quarantined. Comparisons are exact for
text and mapped language. CC0 rules are:

```text
CC0 snapshot contains ID + API says CC0 1.0  => eligible to continue
CC0 snapshot contains ID + API is not CC0   => TATOEBA_CC0_MISMATCH
CC0 snapshot lacks ID + API says CC0         => TATOEBA_CC0_MISMATCH
CC0 snapshot lacks ID + API says CC BY       => may continue; absence never infers BY
```

Known unreliable/unapproved/red records are never imported. The current FAQ
says red records are excluded from weekly exports; the API `is_unapproved`
fact is still checked and unapproved API results fail closed. A deleted/API
404 record is quarantined. Licensing-issue `PROBLEM` records are never
accepted even if encountered through another input.

## Language and identity contract

Only these mappings are supported; unknown codes are rejected without
fallback:

```text
vie -> vi
eng -> en
cmn -> zh   (Mandarin only; no generic Chinese fallback)
jpn -> ja
kor -> ko
fra -> fr
deu -> de
spa -> es
```

```text
SENTENCE_SOURCE_IDENTITY=TATOEBA:SENTENCE:<id>
INPUT_PAIR_IDENTITY=TATOEBA:PAIR:<minId>:<maxId>
DIRECT_TRANSLATION_IDENTITY=TATOEBA:LINK:DIRECT:<sourceSentenceId>:<targetSentenceId>
TRANSLATION_TWO_PROVENANCE_PREVIEWS=YES
AUTO_CREATE_REVERSE_TRANSLATION=NO
```

Sentence IDs remain validated decimal strings, avoiding lossy JavaScript
numeric conversion. `links.csv` is direct relation input only. Reciprocal
rows are collapsed under `INPUT_PAIR_IDENTITY`; endpoint language resolution
then produces the configured directed candidate. Numeric ordering is never
used to choose linguistic direction.

For a configured `vi -> en`, `100` (vi) and `200` (en) produce only
`TATOEBA:LINK:DIRECT:100:200`. Explicit `en -> vi` produces the distinct
`TATOEBA:LINK:DIRECT:200:100`. Both directions can coexist without an
identity collision. Each translation candidate contains SOURCE and TARGET
provenance previews with the endpoint’s actual source URL, license, owner,
attribution, and endpoint ID; no combined license is invented.

## Dry-run and zero-write boundary

The package exposes `npm run library:import:tatoeba`, compiled to a standalone
CLI that imports no Nest `AppModule`, no PostgreSQL pool, no Library repository,
and no migration runner. The CLI requires `--dry-run`; a missing flag exits
nonzero with `TATOEBA_IMPORT_WRITE_MODE_NOT_IMPLEMENTED` before opening input
files or making an API request. There is no hidden write mode.

```text
IMPORT_ENTRYPOINT=CLI
CLI_DRY_RUN_ONLY=YES
DB_PREFLIGHT=SKIPPED_08D3A
DATABASE_CONNECTED=NO
DATABASE_READS=0
DATABASE_WRITES=0
LIBRARY_WRITE_PORT_PRESENT=NO
DATASET_DOWNLOADER_IMPLEMENTED=NO
DATASET_DOWNLOADED=NO
AUTOMATED_LIVE_TATOEBA_CALLS=0
```

The dry-run report is bounded JSON or JSONL. It contains snapshot/configuration
metadata, discovered/parsed/eligible counts, API/license/mismatch outcomes,
reciprocal collapse, missing endpoints, directed candidates, two provenance
previews, and report-only quarantine details. It contains no existing-resource,
NOOP, reconcile, invalidate, or durable-write counts.

Unsafe new candidates produce no durable resource at all:

```text
NEW_UNSAFE_CANDIDATE_DURABLE_RESOURCE=NO
NEW_UNSAFE_CANDIDATE_ACTION=QUARANTINE_ZERO_WRITES
DRY_RUN_ZERO_WRITES=YES
```

## Review/lifecycle boundary

08D3A constructs pure candidate/previews only. It does not choose an actor,
perform license-registry runtime lookup, acquire advisory locks, or submit a
review audit. The later implementation must preserve:

```text
TATOEBA_IMPORT_LIFECYCLE=DRAFT_THEN_SUBMIT_TO_COMMUNITY_REVIEW
AUTO_VERIFY_IMPORTED_RESOURCE=NO
COMMUNITY_CONTRIBUTION_EVENT_EMITTED=NO
IMPORT_ACTOR_CONTRACT=PENDING_08D2_DESIGN
IMPORT_CONCURRENCY_CONTRACT=PENDING_08D2_DESIGN
TATOEBA_LICENSE_REGISTRY_RUNTIME_CHECK=PENDING
```

`COMMUNITY_REVIEW` means the result after a complete DRAFT creation,
provenance/license attachment, and normal SUBMIT review boundary. It does not
authorize direct insertion into `COMMUNITY_REVIEW`, direct VERIFIED creation,
or review-audit bypass. Those choices remain 08D3B/08D3C work.

## Verification

Synthetic/local fixtures only; no Tatoeba corpus row was downloaded.

```text
FOCUSED_TESTS=8 suites / 25 tests PASS
BACKEND_TESTS=49 suites / 329 tests PASS
BACKEND_E2E=13 suites / 58 tests PASS (test in-memory persistence path)
TYPECHECK=PASS
LINT=PASS
BUILD=PASS
AUDIT=PASS (0 vulnerabilities)
GIT_DIFF_CHECK=PASS
```

The focused tests cover all eight mappings, CC BY and CC0, exact text and
language checks, malformed UTF-8, duplicate rows, unsupported language,
unapproved/PROBLEM/404 API outcomes, missing/mismatched owner, CC0 mismatch,
reciprocal links, reverse direction, bidirectional configuration, attribution,
bounded retries/response size/host allowlist, JSONL reporting, CLI dry-run
requirement, and static absence of a database/write dependency.

```text
TRANSLATION_IDENTITY_INPUT_ORDER_INDEPENDENT=PASS
REVERSE_DIRECTION_DISTINCT_IDENTITY=PASS
BIDIRECTIONAL_CONFIGURATION_COLLISION=NO
MIGRATION_REQUIRED=NO
MIGRATION_RERUN=NO
MIGRATION_0012_CREATED=NO
MIGRATIONS_0001_0011=UNCHANGED
BACKEND_CHANGED=YES (08D3A implementation branch only)
FRONTEND_CHANGED=NO
TEST_DB_MUTATED=NO
PRODUCTION_DB_MUTATED=NO
DEPLOYED=NO
```

No `db:migrate` command was run. The no-argument compiled CLI smoke exited
with the required write-mode guard. The implementation has not been merged to
Backend `main`; this Workspace branch is for external review only, and 08D3B
has not started.

## Decision

```text
TATOEBA_SOURCE_TRUST != VERIFIED
PHASE_08D3A_IMPLEMENTATION=PASS
LNG_08_006=VERIFYING
NEXT_SLICE=08D3B
NEXT_ACTION=STOP_FOR_EXTERNAL_REVIEW_BEFORE_08D3B
```

The dry-run foundation is accepted for external review only. It is not an
importer publication, does not mark LNG-08-006 DONE or READY, and does not
authorize database writes.

## External review remediation before 08D3B

The external review identified four classes of D3A contract defects: the
bulk/API CC BY owner snapshot asymmetry, fabricated snapshot retrieval time,
unsafe local-path exposure, and unbounded/redundant report DTOs. The existing
Backend branch was remediated without adding database access, a write port, a
migration, a downloader, or any Tatoeba corpus data.

### Owner and snapshot consistency

CC BY 2.0 FR now requires bulk `Username` and API `owner` to both be present
and exactly equal. A missing/known asymmetry is `TATOEBA_OWNER_MISMATCH`; both
missing is `TATOEBA_OWNER_REQUIRED`. CC0 does not require an owner: null/null,
null/known, and known/null are allowed, while two known unequal owners fail
closed as `TATOEBA_OWNER_MISMATCH`. No bulk owner is filled from the API.

```text
CC_BY_OWNER_SNAPSHOT_CONSISTENCY=PASS
CC0_OWNER_RULE=PASS
OWNER_ASYMMETRY_TESTS=PASS
```

`runStartedAt` is generated once by the importer clock. `snapshotRetrievedAt`
is operator-supplied through `--snapshot-retrieved-at` only when it is a strict
offset-aware ISO-8601 timestamp; when absent it is `null`. It is never inferred
from CLI time, filesystem mtime, or the current clock. Snapshot identity still
uses only artifact kind, safe basename, size, and SHA-256.

```text
SNAPSHOT_RETRIEVAL_TIME_FABRICATED=NO
SNAPSHOT_TIMESTAMP_SEMANTICS=PASS
SNAPSHOT_ID_RUN_TIME_INDEPENDENT=PASS
SNAPSHOT_CLOCK_TESTS=PASS
```

### Safe report contract

Serialized snapshot artifacts contain only `kind`, `fileName`, `sizeBytes`,
and `sha256`. Reader rows no longer carry paths in the candidate contract;
malformed-row diagnostics use artifact kind and line number. Quarantine
details are sanitized before serialization. Sentence candidates reference
`snapshotId` instead of repeating the complete snapshot/artifact structure.

```text
REPORT_ABSOLUTE_LOCAL_PATHS=NONE
QUARANTINE_LOCAL_PATHS=NONE
CANDIDATE_FULL_SNAPSHOT_DUPLICATION=NO
```

The report uses conservative project-owned budgets, not Tatoeba provider
limits: 4,000,000 UTF-8 bytes maximum; at most 256 sentence samples, 256
translation samples, and 256 quarantine samples; and at most 1,000,000 sample
bytes per family. JSON and JSONL output are preflight-estimated before full
serialization and fail closed if the DTO exceeds the budget. Truncation is
deterministic and exposes flags plus omitted counts. Aggregate processing
counts remain full-run counts.

```text
DRY_RUN_REPORT_BOUNDED=YES
REPORT_TRUNCATION_EXPLICIT=YES
REPORT_MEMORY_BOUND=PASS
TRUNCATED_REPORT_COUNTS_ACCURATE=PASS
```

Exact sentence text, the stable v1 API endpoint/allowlist, bounded retries,
response-size limits, CC0 snapshot agreement, fail-closed API mismatch rules,
directed identities, reciprocal input collapse, and zero-database architecture
remain unchanged. No automated live Tatoeba call was made.

```text
EXACT_TEXT_PRESERVED=PASS
CC0_SNAPSHOT_CONTRACT=PASS
TRANSLATION_IDENTITY_INPUT_ORDER_INDEPENDENT=PASS
REVERSE_DIRECTION_DISTINCT_IDENTITY=PASS
BIDIRECTIONAL_CONFIGURATION_COLLISION=NO
AUTO_CREATE_REVERSE_TRANSLATION=NO
CLI_DRY_RUN_ONLY=YES
CLI_REQUIRES_DRY_RUN=PASS
DATABASE_CONNECTED=NO
DATABASE_READS=0
DATABASE_WRITES=0
DB_PREFLIGHT=SKIPPED_08D3A
LIBRARY_WRITE_PORT_PRESENT=NO
AUTOMATED_LIVE_TATOEBA_CALLS=0
```

### Remediation verification

```text
PHASE_08D3A_EXTERNAL_REVIEW_REMEDIATION=PASS
BACKEND_BRANCH=phase-08d3a-tatoeba-dry-run
BACKEND_SHA=a851e18d5827103982cbda9e3f04ba9cefbc9e28
FOCUSED_TESTS=8 suites / 34 tests PASS
BACKEND_TESTS=49 suites / 338 tests PASS
BACKEND_E2E=13 suites / 58 tests PASS
TYPECHECK=PASS
LINT=PASS
BUILD=PASS
AUDIT=PASS (0 vulnerabilities)
GIT_DIFF_CHECK=PASS
MIGRATION_REQUIRED=NO
MIGRATION_RERUN=NO
MIGRATION_0012_CREATED=NO
MIGRATIONS_0001_0011=UNCHANGED
BACKEND_CHANGED=YES
FRONTEND_CHANGED=NO
DATASET_DOWNLOADED=NO
TEST_DB_MUTATED=NO
PRODUCTION_DB_MUTATED=NO
DEPLOYED=NO
CURRENT_PHASE=08
PHASE_08=IN_PROGRESS
LNG_08_006=VERIFYING
```

No `db:migrate` command ran. E2E retained the existing in-memory test
persistence path. The compiled CLI no-argument smoke exits with
`TATOEBA_IMPORT_WRITE_MODE_NOT_IMPLEMENTED`. 08D3B remains blocked pending
final external review.

```text
NEXT_SLICE=08D3B
NEXT_ACTION=STOP_FOR_FINAL_EXTERNAL_REVIEW_BEFORE_08D3B
```

## Final external-review remediation: Library text eligibility

Retrieved 2026-09-28. This append-only remediation aligns every future D3B
sentence and translation candidate with the frozen migration 0009 Library
contract before any write path exists. The importer now has one explicit
`TATOEBA_LIBRARY_TEXT_MAX_CHARS=20000` content limit, separate from the
100,000-character parser line-memory bound. Eligibility counts Unicode code
points (matching PostgreSQL `char_length` for valid UTF-8 text), rejects
space-only/blank values without changing the original string, and rejects
either an over-limit bulk or API representation before exact comparison.

`TATOEBA_TEXT_TOO_LONG` is a typed fail-closed reason and an aggregate
`textTooLong` report count. `TATOEBA_EMPTY_TEXT` remains a deterministic
quarantine reason. Candidate text is copied exactly from the bulk row only
after bulk and API text both pass the intrinsic Library gate and compare
exactly. Translation candidates can only be built from that eligible sentence
map, so a rejected endpoint cannot supply `sourceText` or `translatedText`.

Synthetic coverage includes exactly 20,000 characters, 20,001 characters,
20,000 supplementary-plane emoji code points, preserved leading/trailing
spaces, empty/space-only input, API-side over-limit input, and a link whose
endpoint was quarantined before translation construction.

```text
PHASE_08D3A_FINAL_EXTERNAL_REVIEW_REMEDIATION=PASS
BACKEND_BRANCH=phase-08d3a-tatoeba-dry-run
BACKEND_SHA=7971aed552d88c887c60494b280b339a78edb0bb
TATOEBA_LIBRARY_TEXT_MAX_CHARS=20000
TEXT_BOUNDARY_TESTS=PASS
OVER_20000_TEXT_QUARANTINED=PASS
BLANK_TEXT_QUARANTINED=PASS
UNICODE_TEXT_LENGTH_COMPATIBILITY=PASS
TRANSLATION_TEXT_SCHEMA_COMPATIBLE=PASS
EXACT_TEXT_PRESERVED=PASS
CC_BY_OWNER_SNAPSHOT_CONSISTENCY=PASS
CC0_OWNER_RULE=PASS
SNAPSHOT_RETRIEVAL_TIME_FABRICATED=NO
SNAPSHOT_ID_RUN_TIME_INDEPENDENT=PASS
REPORT_ABSOLUTE_LOCAL_PATHS=NONE
QUARANTINE_LOCAL_PATHS=NONE
CANDIDATE_FULL_SNAPSHOT_DUPLICATION=NO
DRY_RUN_REPORT_BOUNDED=YES
REPORT_TRUNCATION_EXPLICIT=YES
REPORT_MEMORY_BOUND=PASS
TRUNCATED_REPORT_COUNTS_ACCURATE=PASS
DATABASE_CONNECTED=NO
DATABASE_READS=0
DATABASE_WRITES=0
DB_PREFLIGHT=SKIPPED_08D3A
LIBRARY_WRITE_PORT_PRESENT=NO
AUTOMATED_LIVE_TATOEBA_CALLS=0
CC0_SNAPSHOT_CONTRACT=PASS
TRANSLATION_IDENTITY_INPUT_ORDER_INDEPENDENT=PASS
REVERSE_DIRECTION_DISTINCT_IDENTITY=PASS
BIDIRECTIONAL_CONFIGURATION_COLLISION=NO
AUTO_CREATE_REVERSE_TRANSLATION=NO
CLI_DRY_RUN_ONLY=YES
CLI_REQUIRES_DRY_RUN=PASS
FOCUSED_TESTS=8 suites / 36 tests PASS
BACKEND_TESTS=49 suites / 340 tests PASS
BACKEND_E2E=13 suites / 58 tests PASS
TYPECHECK=PASS
LINT=PASS
BUILD=PASS
AUDIT=PASS (0 vulnerabilities)
GIT_DIFF_CHECK=PASS
MIGRATION_REQUIRED=NO
MIGRATION_RERUN=NO
MIGRATION_0012_CREATED=NO
MIGRATIONS_0001_0011=UNCHANGED
BACKEND_CHANGED=YES
FRONTEND_CHANGED=NO
DATASET_DOWNLOADED=NO
TEST_DB_MUTATED=NO
PRODUCTION_DB_MUTATED=NO
DEPLOYED=NO
CURRENT_PHASE=08
PHASE_08=IN_PROGRESS
LNG_08_006=VERIFYING
```

No `db:migrate` command ran, no Tatoeba dataset was downloaded, and no live
Tatoeba API call was made by automation. D3B remains out of scope.

```text
NEXT_ACTION=STOP_FOR_08D3A_PUBLICATION_REVIEW
```
