# Phase 21 v1 prospective benchmark contract

Owner authorization: START_PHASE_21=YES, 2026-10-07 Asia/Saigon. Phase 21 only.
No candidate code or evaluation results exist at contract preparation.

## Pool, rights and labels

[fixture-v1.json](fixture-v1.json) contains 14 synthetic resources, 10 explicit
directed links and 14 labeled queries. No corpus or user data is used. These short
original test strings are test fixtures, not certified language instruction.
Each resource receives deterministic UUID, fixed timestamps (index seconds after
2026-10-07T00:00:00Z), ORIGINAL_AUTHOR source identity `phase21:<key>`, explicit
synthetic attribution and a test-only permissive license `PHASE21-TEST` with active
status and redistributionAllowed=true. Source URLs are null; no external citation
is invented. License canonicalUrl is https://example.invalid/phase21-test-license,
a test identifier, not a claim of external licensing approval.

All 14 start PUBLIC/ACTIVE/VERIFIED with nonempty provenance. Actual eligibility
comes from unmodified LibraryService.getPublicResource, refreshing license records
and inspecting applicable PHASE06 source references. Every source must remain
eligible. Non-PHASE06 source health is NOT_APPLICABLE under current policy, not a
claim that an external source was checked. Additional hostile/mutation fixtures
are separate safety cases and never alter the evaluation pool or labels.

Labels are authored from the stated relation meanings and resource content before
candidate execution, then independently reviewed by a separate agent. Record that
review before accepting this contract. AGENT_REVIEW is not human linguistic
certification. q01–q09 test contextual relation discovery, q10–q12 lexical fallback
controls, q13–q14 no supported answer. All expected sets are exhaustive only for
this deliberately small synthetic pool; no real-user representativeness is claimed.

Relevance for q01–q09 means a reviewer-accepted directed assertion of the requested
type, from the specified anchor, whose target passes the supplied filters. It is
not all content that could broadly share a topic: a DIRECT_TRANSLATION assertion
does not also label a SAME_CONCEPT result without an explicit accepted assertion.
For controls/no-edge queries, relevance is the reviewed lexical expected set.
Thus the experiment measures this fixture contract's contextual discovery, not
independent semantic generalization; edges and labels intentionally share curated
ground truth. A later independent corpus/query review remains necessary.

## Vocabulary and ownership

All links are test-curator-owned, reviewed fixture assertions with a reason and
endpoint snapshot fingerprints. They cannot grant authorization. No inferred
transitivity, recursive traversal, contributor graph or numerical confidence.

| Type | Meaning / direction |
|---|---|
| SAME_CONCEPT | Anchor -> another example of the reviewed situation/concept; reverse requires its own explicit edge |
| PREREQUISITE | Later item -> earlier item in this fixture learning sequence; not a universal pedagogical claim |
| FOLLOW_UP | Earlier item -> next item in this fixture learning sequence |
| DIRECT_TRANSLATION | Anchor -> explicit bilingual translation with matching sourceText; never inferred through another translation |
| COLLECTION_MEMBER | Collection -> curated member; collection source alone does not establish membership |

Both endpoints require current public eligibility at retrieval and serialization.
Unknown/self/malformed/unsupported links are rejected; duplicates deduplicate by
target. Cycles cannot cause traversal because only one hop is permitted. A changed
endpoint snapshot, edge removal or changed assertion invalidates prepared results.
Source health, visibility, moderation, review, provenance, license or deletion
changes suppress affected results. Relation metadata is returned only with a valid
public resource. A response must preserve the exact canonical public provenance.

## Baseline and candidate

Backend baseline SHA d56fc2c518a617018d6926bf63b482572268a1ef. Invoke unchanged
LibraryService.searchPublicResources on InMemoryLibraryRepository with q,
language/type/level and limit=3. Current substring matching uses NFKC/lowercase
content/topics; ordering is updatedAt DESC then ID DESC. No tokenization, stemming
or semantic ranker is added. PostgreSQL behavior is inspected and regression-tested
but this experiment runs its existing in-memory implementation, not a live DB.

Candidate: same query/filter/pool plus explicit anchor and relation intent supplied
by the fixture. Validate at most 64 edges; take one-hop valid matches in edge-ID
ascending order, deduplicate target IDs, max 3. No automatic natural-language intent
parser. If no valid edges remain, retain unchanged lexical search/source cards.
Invalid/inaccessible anchor fails closed without a fallback that reveals its data.
The extra structured context is an explicit experimental affordance; quality gain
is contextual discovery gain, not proof of superior free-text search.

q is used by the baseline and lexical fallback only, never as a substring gate on
relational targets. Language/type/level constrain returned targets, not anchors;
cross-language discovery in q02/q06 intentionally starts from an English anchor.

Preparation stores only identifiers/fingerprints, never a trusted public payload.
Serialization rereads public anchor, edges and every target, checks unchanged
snapshots/filters and returns current source cards/canonical provenance. Failures
abstain; no persistent cache, projection, endpoint, module or deployment is added.

## Prospective metrics / hard gates

K=3. For each of 12 nonempty-label queries record returned IDs, relevance hit count,
returned count, labeled count, precision@3=hits/3, recall@3=hits/labeledCount and
reciprocal rank. Aggregate macro recall uses denominator 12; precision@3 slots 36;
micro returned precision uses all actual returned results on all 14 queries.
Record raw counts as well as averages. Empty-query correctness denominator 2.
Controls denominator 3. No percentages without counts/denominators.

GO needs candidate macro recall >=0.80, candidate-minus-baseline macro recall
>=0.20, micro returned precision >=0.90, zero loss of relevant hits on all 3 controls,
2/2 empty-query abstentions and zero safety/provenance/license/citation violations.
These small-sample descriptive metrics have no statistical/generalization claim.
Do not tune config, labels, fixtures or thresholds after observing output.

Safety requires transition/deletion/source/license/provenance tests at retrieval
and serialization, stale prepared references, unknown/malformed/unsupported/duplicate/
cyclic/substituted links, inaccessible anchor/target and filter mismatch. Direct
public detail/list regressions use the existing service. Production cache/projection
and public related endpoint coverage are NOT_APPLICABLE; prepared reference
invalidation is separately tested. Atomic DB transaction/race guarantees beyond the
isolated in-process two-boundary checks are not proven by this experiment.
