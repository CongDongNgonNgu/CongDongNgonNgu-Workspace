# Phase 21 handoff / Phase 23 technical inheritance

Reviewed [verdict](VERDICT.md): GO for test-only deterministic contextual discovery.
Phase23 is technically eligible, remains PLANNED/unstarted and execution unauthorized.
Phase22 eligibility from Phase20 DONE/GO is unchanged. Phase24 is unstarted.
The owner must separately authorize the next major phase; this handoff starts none.

## Reuse and non-negotiable boundaries

KEEP canonical LibraryService eligibility, licenses, public source-card/provenance
and lexical fallback contracts. ADAPT the test-only one-hop mechanism only inside
a later explicitly authorized implementation. Do not import test fixtures into
runtime or production data. Preserve explicit anchor/intent semantics and the
five reviewed directed relation meanings in [FROZEN-CONTRACT.md](FROZEN-CONTRACT.md),
or independently review any compatible refinement before relying on it.

Relations never authorize access. Both anchor and target must remain PUBLIC/ACTIVE/
VERIFIED with coherent provenance, every license currently active and explicitly
redistributable, valid applicable source health and current ACL. Recheck at retrieval
and serialization, bind resource/source/version identifiers, preserve every canonical
attribution/license and source identity, and suppress stale/deleted/changed results.
Relationship reason/owner/type supplement source cards; they never replace citations.
Keep deterministic filtering, bounded one-hop traversal, duplicate suppression,
cycle-safe behavior, abstention and unchanged lexical fallback when support is absent.

## Separate proof required later

No persisted relationship domain was implemented here. Phase23 must separately
establish authorized relation ownership/review/update lifecycle and valid evidence
for each assertion. Curator strings in a disposable fixture are not production ACL
or assertion-authenticity controls. Validate schema/constraints, transaction/version
boundaries and malicious identifier/source substitution in the actual persisted
domain, with migration/rollback review where applicable.

Test actual HTTP serialization and races, projection/cache invalidation, source and
resource deletion, multi-instance consistency, pagination/filters, limits/cycles/
duplicates, query amplification/N+1 behavior and measured workload costs. A repeated
in-process public read is not atomic SQL/concurrency proof. No production cache or
index existed to test in Phase21; NOT_APPLICABLE must not be promoted to PASS.

Retain the frozen benchmark as a technical regression, then separately review
independent rights-cleared corpus/query labels and relevant human linguistic
ownership before making broader semantic-quality claims. Edges/labels share curated
ground truth and the candidate receives explicit anchor/intent; therefore free-text
search superiority and unseen-corpus generalization are unproven. Real-user value
requires a separately approved measurement with cohort, consent/purpose, seed/test
exclusions and denominators; no telemetry or collection starts from this handoff.

Any later user-facing related-resource journey needs its own authorized API/UI,
vi/en, responsive/accessibility and runtime gates. Production release, migration,
provider/data collection and private/group retrieval remain separately gated.
Generated answers, embeddings and graph/vector infrastructure are not inherited.

## Evidence and reproducibility

Backend main `77f8824d11cc843ee93f681af7b649889edd680d`, PR #43. Four files under
`test/phase21` only; no runtime source/build graph change. Run focused tests with
`npm run test:e2e -- --runInBand --testPathPatterns=phase21` (`npm.cmd` on this Windows
shell). Optional PHASE21_EVIDENCE_OUTPUT exports local raw benchmark evidence;
no Workspace sibling is required by CI. Canonical fixture hash is LF-normalized.

[Evidence](EVIDENCE.md) records 34 focused /872 unit /143 e2e tests, unchanged
fixture/pool, all14 query outputs, 13 labels, controls3/3 and empties2/2, canonical
provenance13/13 and accepted-case zero known leaks. Macro recall9/12 ->12/12,
returned precision10/14 ->13/13; prospective quality bar met. Audit0 high/critical,
20 inherited moderate dev findings. No human linguistic, real-user, production or
atomic SQL certification. Runtime/Render/Vercel deployment NOT_APPLICABLE.

Final integration and cleanup facts are appended to EVIDENCE.md after observation.
Payment remains disabled; production database/data unchanged. STOP after Phase21.
