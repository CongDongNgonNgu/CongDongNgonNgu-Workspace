# Phase 23 bounded production relation contract

2026-10-07 (Asia/Saigon). Independently approved contract freeze for LNG-23-001; historical preparation milestone, subsequently integrated through PR135/main CI. The contract remains unchanged. Actual implementation/acceptance mapping is [handoff](HANDOFF.md), [Backend evidence](BACKEND-EVIDENCE.md), [Frontend evidence](FRONTEND-EVIDENCE.md) and [verdict](VERDICT.md); preparation-time statements are not runtime proof.

## Owner scope and inheritance

The current owner START_PHASE_23=YES authorizes the original Related-Resource Library journey and LNG-23-001 through004, including TEST integration and normal PR/CI/merge/cleanup. It supersedes historical unauthorized flags for this bounded scope only. The broader category-completion 23B roadmap amendment remains PLANNED, outside this run; no category is promoted. Phase24 remains unauthorized/unstarted. Phase20/21/22 historical closeouts remain unchanged. Payment stays disabled. Production writes are prohibited.

KEEP canonical Library eligibility, public provenance/license mapping, lexical explorer and route/locale foundations. ADAPT Phase21's reviewed one-hop mechanism. BUILD_NEW production assertion persistence, public read and bounded UI. DEFER broader category readiness and user-value measurement.

## Vocabulary and ownership

Every assertion is explicitly directed; reverse assertions require separate review. No transitive inference, runtime arbitrary relationship inference, confidence ranking, generative text or private/group data.

| Stable type | Meaning | Applicable shape |
|---|---|---|
| SAME_CONCEPT | Reviewed example of the same situation/concept | Explicit reviewed anchor -> target |
| PREREQUISITE | Earlier item in the reviewed learning sequence | Later -> earlier; no universal pedagogy claim |
| FOLLOW_UP | Next item in the reviewed learning sequence | Earlier -> later |
| DIRECT_TRANSLATION | Explicit direct bilingual translation | VOCABULARY/SENTENCE/TRANSLATION anchor -> TRANSLATION target; sourceText exactly matches canonical anchor term/text/sourceText, respectively; target primary language equals anchor primary language and target secondary language is present/distinct; no inferred chained translation |
| COLLECTION_MEMBER | Reviewed membership | LEARNING_COLLECTION anchor -> reviewed member |

All five use reviewed first-party metadata, not benchmark fixtures or inferred similarity. An ACTIVE MODERATOR/ADMIN from current trusted identity is the review authority; caller-supplied role strings cannot grant authority. Store reviewer UUID, reviewedAt, bounded evidence reference and endpoint snapshot fingerprints. Mutations use a trusted internal service/repository path, not a new public administration API. Review-backed assertions may be revoked or replaced through that path; revision and reviewed evidence changes invalidate prepared references. Losing review authority or reviewer ACTIVE status suppresses the assertion. Canonical source citations remain separate from relation evidence.

No Phase21 benchmark rows/edges are imported into runtime or production. Existing library_collection_members are not automatically promoted to reviewed assertions. Reviewed COLLECTION_MEMBER links are the sole authority for this new surface; existing collection storage retains its existing purpose.

## Persistence and bounds

Use the existing PostgreSQL/memory repository pattern with additive migration0028 and a scoped down migration. library_resource_relations stores anchor/target resource UUIDs, accepted type, reviewed evidence/reviewer/revision, status and endpoint fingerprints. Endpoint FKs cascade only assertion deletion when a resource is hard-deleted. Reviewer FK must preserve or fail closed on missing reviewer. Unique(anchor,target,type), self-link check, type/status/evidence/fingerprint/review checks and anchor/target ordering indexes are required.

No cache, vector/graph database, embeddings or AI provider is added to retrieval. Direct SQL assertions are never seeded merely to fill UI space. Batch target hydration avoids N+1 target reads. License/source-health work must remain explicitly bounded and use deliberate batching where appropriate; query claims require observed evidence.

Default3 and maximum12 returned resources. Scan at most64 candidate target identities per request; continue with an opaque query-bound cursor even if that scan produces zero visible targets. Order target UUID ascending, then stable accepted type ordering. Deduplicate by target across types, choosing the first current-valid accepted assertion deterministically. No counts or relation IDs for ineligible targets; continuation is authenticated-encrypted (AES-256-GCM, random nonce, domain-separated key derived from existing JWT access secret) and bound to anchor, normalized filters and bounds. Its last-scanned keyset boundary is never exposed as plaintext/base64-decoded identifiers or counts. Key rotation or failed authentication returns400; no server-side cursor cache. No recursion; cycles therefore cannot expand results. Filters apply to targets, not the anchor: optional relation type, language, resource type and CEFR level. Pagination must make progress, reject malformed/mismatched cursors and never overrun bounds. Normalize only accepted five relation keys, LIBRARY_RESOURCE_TYPES, active language codes and COMMUNITY_CEFR_LEVELS. limit must be an integer1–12 (default3); reject unsupported enum values, inactive languages, malformed/oversized cursors and unknown query fields using existing boundary validation.

## Public API and serialization

GET /api/v1/library/resources/:resourceId/related follows existing UUIDv4 routing and success/error envelopes. Invalid/ineligible anchor returns the same generic404 as public detail. Unsupported/malformed filters/cursors return400 without protected metadata. No general graph query/traversal parameters or public assertion mutations.

Data shape: {items:[{resource:<canonical public resource>,relation:{type:<accepted key>}}],nextCursor:<opaque string|null>}. No reviewer IDs, internal evidence, relation IDs, version hashes or private source metadata are exposed. Fixed vi/en relation labels explain the type without fabricating free-form explanations. Full canonical public resource data preserves existing attribution/source/license rendering.

Every anchor and target must independently pass authoritative current Library rules: visibility PUBLIC, moderationState ACTIVE, reviewState VERIFIED, nonempty provenance, all referenced licenses registered/ACTIVE with redistributionAllowed exactlytrue, and applicable PHASE06_LIBRARY_CANDIDATE health coherent/current. Existing non-PHASE06 source health remains NOT_APPLICABLE; no external health verification claim is added.

Selection stores identifiers and fingerprints, not trusted public payloads. At response serialization reread anchor, assertions, current review authority and target resources; reapply eligibility/filters and compare complete canonical endpoint snapshots (details, language/type/level/topics, source identity/URL/attribution, license data, resource timestamp/provenance revision as applicable). Changed/removed assertions, source changes or target revisions suppress prepared results. Canonical citations come only from Library projection, never assertion metadata. No stale target title/text/source/language/license/count/identifier is returned.

The guarantee is current eligibility re-evaluation at selection and the final response projection. Repeated reads alone do not prove atomic SQL revocation, distributed concurrency or post-response browser freshness. Those limitations must be disclosed; any stronger claim requires separate transaction/race evidence. Client discards stale requests and clears prior related payloads on refresh/anchor/filter change, uses no persistent cache, refreshes on return/navigation where applicable and handles changed/unavailable targets through existing detail behavior.

## Invalidation and fallback

Live reads reevaluate target inactive/private/unverified/deleted, invalid license/provenance/applicable source health, removed/revoked relation, invalid reviewer and changed anchor/target/source snapshot. No cache invalidation subsystem is claimed. Hard-deleted endpoints remove assertions through FKs. Changes requiring new valid assertion evidence require explicit re-review, never silent fingerprint refresh.

Zero valid related results returns honest empty items. Existing lexical Library remains unchanged and accessible through an explicit explorer/search link; lexical results are not labeled as relations. Invalid/inaccessible anchor never falls back using its protected text. This is the owner-permitted honest-empty product refinement of Phase21's test-only lexical fallback, preserving abstention and the separate lexical discovery path.

## Verification and limits

Require all owner-requested focused/full Backend/Frontend gates, independent architecture/security review, actual HTTP/stale/negative/SQL migration tests, query-bound pagination/dedupe/cycle checks, vi/en and seven widths, keyboard/contrast where tooling permits, exact-main CI/provider evidence, approved TEST target guard, synthetic runtime acceptance and exact fixture cleanup. Do not label unrun gates PASS. Preserve Phase21 curated-edge/label coupling, extra anchor context, no corpus generalization, no human linguistic certification and no real-user value proof. No free-text superiority claim, generated answers/RAG, embeddings, external AI retrieval, graph/vector database or private-group retrieval.

## Explicit implementation capacity refinement — 2026-10-07

To enforce the frozen bounded provenance/license/source-health work requirement, related reads impose32 provenance entries per resource. Resources above this capacity are omitted whole before batch hydration (memory parity before cloning); no provenance/license is truncated or partly checked. An oversized anchor may be unavailable on the related endpoint while remaining public through ordinary canonical detail/search. This is a lower-recall safe-abstention limitation, not a change to canonical eligibility or a universal byte-payload bound. Independent architecture/security review accepted the explicit32/33 boundary and parity coverage. Vocabulary, directionality, ownership, eligibility and confidentiality remain frozen.
