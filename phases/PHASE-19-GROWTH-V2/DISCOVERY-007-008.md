# LNG-19-007 / LNG-19-008 pre-launch discovery

Date: 2026-10-06 (Asia/Saigon). Mode: `PRE_LAUNCH_FEATURE_EXPANSION`.
Owner's current amendment permits design without trustworthy interaction data
or a mature corpus. No real users are available; seed/demo/UAT evidence supports
technical feasibility only. This document records hypotheses and proposed
architecture, not user demand, corpus maturity, runtime results or approval to
build. Portfolio comparison in LNG-19-009 determines dispositions; neither
candidate is `BUILD_NEXT` here. No prototype, data collection or production
activation was performed.

## LNG-19-007 - Recommendation ML Discovery

| Required field | Discovery finding |
| --- | --- |
| PROBLEM_OR_PRODUCT_OPPORTUNITY | Hypothesis: learners could benefit from finding suitable reciprocal exchange partners with fewer irrelevant results. Restrict the first comparison to partner discovery; community-feed and Library recommendation are different problems. No observed dissatisfaction or demand is claimed. |
| EXPECTED_PRODUCT_VALUE | More understandable and suitable partner suggestions without sacrificing opt-in, safety or privacy. Value remains unvalidated. |
| EXISTING_CAPABILITY_REUSE | KEEP Phase 07 eligibility/safety projections and deterministic matching; KEEP Phase 05 public active-language recency feed as its own baseline. Do not mislabel the Phase 05 feed as implemented personalized ranking. ADAPT an isolated evaluator if later approved; DEFER trained models and new tracking. |
| TECHNICAL_COMPLEXITY | MEDIUM for a bounded deterministic evaluator; HIGH for trustworthy event pipelines, training, fairness evaluation, model/version lifecycle and rollout. |
| SECURITY_PRIVACY_RISK | HIGH for behavioral profiling or cross-user leakage. Eligibility precedes scoring; block/opt-out/private fields cannot become score features or explanations. Never use private messages, contact details or transcripts for training. |
| EXTERNAL_PROVIDER_DEPENDENCY | None for existing deterministic matching or a future local fixture evaluator. No ML hosting, analytics provider, model package or account is selected. |
| LEGAL_PAYMENT_DEPENDENCY | No payment prerequisite. Future interaction collection/training needs an approved purpose, notice/consent as applicable, retention and deletion policy; external dataset terms must be checked before use. |
| ESTIMATED_IMPLEMENTATION_SCOPE | If portfolio approves: one isolated evaluator with versioned fixtures and comparison report, followed separately by a data-readiness decision. No schema, event collector, production scorer or frontend exposure in this discovery. |
| TESTABILITY | HIGH for deterministic fixtures and privacy/eligibility regression; real-world relevance and causal usefulness are not testable from seed/UAT traffic. |
| PRODUCTION_HARD_STOPS | Production deployment/restart/environment/DB changes, persistent interaction collection, credentials/new provider accounts and any payment activation require separate human authorization. |
| FUTURE_REAL_USER_VALIDATION_METRICS | Define reciprocal connection acceptance as accepted eligible connection requests divided by eligible requests; completion as completed exchanges divided by a defined accepted-start cohort with fully observed follow-up horizon H, keeping cancellations/abandonment in the denominator and classifying incomplete follow-up as censored. Existing rows lack durable acceptance/completion history; this metric requires a future approved source, not current seed rows; safety reports per eligible exposed users. Record cohort, dates/timezone, exposure policy and seed/test exclusions. Values are UNAVAILABLE, not zero. |
| READINESS | LOW for ML implementation/activation; design is ready for portfolio comparison. Deterministic baseline already exists, but owner confirms no real interaction dataset. |

### Baseline and architecture decision

Proposed decision: retain the existing deterministic engine; do not train or
deploy ML before a separate readiness decision. Source `evaluateMatch` rejects
self-matches and requires reciprocal wanted/offered languages visible publicly.
Weights are 0.5 reciprocal language, 0.2 level compatibility, 0.2 timezone/
availability and 0.1 shared goals/interests; unavailable components are omitted
and active weights renormalized. `rankMatches` ties by stable user ID. This is a
compatibility score, not a probability or verified proficiency score. Preserve
the service's eligibility and safety gates around this engine, rather than
calling the scorer on arbitrary private profiles.

Compare any later proposed heuristic/model against this frozen baseline with
the same eligible candidate pool. Use curated, explicitly synthetic cases for
cold start, absent fields, reciprocal-language mismatch, blocked/opted-out users,
stable ties and low-resource languages. Proposed offline measures: ranking
agreement with independent suitability labels (NDCG@k), eligible coverage and
exposure by language/level; labels and thresholds require review before an
experiment. Fixture results cannot prove improved demand, retention or conversion.

Future ML readiness requires consented, provenance-bearing real interactions,
reliable seed/test exclusion, exposure denominators, enough independently
labelled examples for the chosen problem, and approved train/test separation.
Choose minimum data and success thresholds prospectively; no invented sample
size or fake training corpus satisfies this gate. Later online comparison needs
approved user exposure and guardrails; observation alone does not prove causality.

Cost/operations: baseline evaluation uses local compute and no provider spend.
Any ML proposal must budget collection/storage, training, inference, monitoring,
drift and rollback ownership before promotion. Do not estimate money or latency
without a measured workload. Product dependencies are partner discovery quality,
current safety rules and a clearly defined outcome, not paid membership.

Bounded implementation/release plan if selected: approve evaluator scope ->
implement/test locally with synthetic fixtures -> review privacy/fairness and
baseline comparison -> decide whether real-data acquisition is justified ->
obtain collection/production authorization before any exposure. A production
model needs versioned fallback to the deterministic engine, rollback tests,
no eligibility regression and a separate release acceptance plan. No release
or measurable lift is accepted by this document.

## LNG-19-008 - Knowledge Graph & RAG V2

| Required field | Discovery finding |
| --- | --- |
| PROBLEM_OR_PRODUCT_OPPORTUNITY | Hypothesis: learners may need to navigate related concepts and obtain source-grounded learning material across Library resources. Missing evidence does not mean the feature lacks demand. |
| EXPECTED_PRODUCT_VALUE | Clear resource relationships and traceable learning answers; potential reduction of unsupported answers remains an untested hypothesis. |
| EXISTING_CAPABILITY_REUSE | KEEP Phase 08 resource, language/topic/CEFR, review/provenance/license/source-health boundaries; KEEP Phase 09 single-resource learning contract and AI fail-closed runtime. ADAPT bounded relational projection if approved. DEFER separate graph/vector infrastructure. |
| TECHNICAL_COMPLEXITY | MEDIUM for a read-only relational relationship view; HIGH for cross-resource retrieval, ontology curation, invalidation-aware indexes and grounded answer evaluation. |
| SECURITY_PRIVACY_RISK | HIGH: a graph or index can leak private/deleted sources or contributor relationships; retrieved text is untrusted prompt data. Authorization and source health must remain fail closed. |
| EXTERNAL_PROVIDER_DEPENDENCY | None for proposed lexical/relational baseline. Generated RAG answers would use the existing provider boundary only after separate activation approval; no provider, embedding service or vector account is selected. |
| LEGAL_PAYMENT_DEPENDENCY | Preserve every source's license, attribution and transformation constraints. Redistribution permission is not automatically permission to train a model or send data to an external processor. Payment is not required or activated. |
| ESTIMATED_IMPLEMENTATION_SCOPE | If selected: bounded read-only resource relationship projection, local query/gold-set evaluator and citation contract design. Cross-resource generation/index persistence are separate scoped follow-ups, not authorized here. |
| TESTABILITY | HIGH for synthetic fixtures covering retrieval, provenance, invalidation and citation checks; corpus usefulness and linguistic accuracy need qualified reviewers and later approved real-source evaluation. |
| PRODUCTION_HARD_STOPS | Production deployment/DB/index mutation, provider credentials/activation, persistent new user data, new paid/provider accounts and ingestion requiring unapproved permissions remain human stops. |
| FUTURE_REAL_USER_VALIDATION_METRICS | Helpful source-grounded answers divided by explicitly rated answers; verified citation-supported factual claims divided by audited factual claims; resource discovery success divided by consented observed tasks; latency/cost per eligible completed query. Define denominators, reviewer method, cohort/exclusions and collection approval first. Values are UNAVAILABLE. |
| READINESS | MEDIUM for bounded graph/lexical design evaluation; LOW for generated RAG release. Schema exists but no inspected real-user corpus maturity, representative retrieval benchmark or provider activation evidence is available. |

### Baseline and architecture decision

Proposed decision: use existing PostgreSQL resources and explicit relationships
before introducing graph/vector infrastructure. A conceptual graph maps resource
IDs to language, topic and reviewed concept tags; sentence-to-translation edges
preserve direct source relationships, grammar-example edges require curated
evidence, and contributor/provenance/review nodes retain existing integrity
references. Concept nodes and confidence semantics are proposed additions, not
existing schema. Do not infer translations transitively or convert an AI guess
into a verified edge. Review state is categorical; no numerical quality score is
invented. A contributor node exposes only the permitted public attribution,
never an admin/reviewer identity or private account relationship.

Non-generative baseline: use `LibraryService.searchPublicResources` lexical
search with language/type/topic/CEFR filters and return authorized source cards.
For learning generation the existing baseline is a user-selected single eligible
resource via `AiLearningService.learn`; this is not already general RAG.
Compare graph-assisted retrieval against lexical retrieval over identical
eligible fixtures before adding embeddings or generated cross-source answers.

Mandatory projection gates: PUBLIC, ACTIVE, VERIFIED, nonempty provenance,
active licenses with explicit redistribution permission and valid applicable
source health, as enforced by `LibraryService`. Recheck at retrieval and response
time; cached graph/index edges cannot grant access. Invalidation, moderation,
license changes and source deletion must remove results and stale citations.
Future private spaces require authenticated per-resource authorization during
every retrieval path; a public index cannot include private material merely
because a contributor or topic is public.

Proposed citation contract: each factual claim references an existing eligible
resource/version and relevant source span, with permitted source URL, attribution,
license and transformation lineage. Validate IDs/eligibility/claim support outside
the model; fabricated citations fail, and insufficient support returns an
explicit unavailable/unsupported answer. Existing learner/source references are
already treated as untrusted data, not privileged instructions. Add adversarial
fixtures for malicious source text, inaccessible IDs, stale sources and invented
citations. Do not fetch arbitrary citation URLs or execute retrieved instructions.

Future isolated evaluation: a reviewer-authored query set with relevance labels,
language/type/level coverage and answerability annotations; compare recall@k,
precision@k and unsupported-claim rate with denominator and abstention coverage.
Require zero known authorization/provenance leaks in the reviewed fixture suite;
semantic quality thresholds need advance reviewer approval. Record dataset
provenance, limitations and license permission. Synthetic fixtures test plumbing,
not mature-corpus coverage or real learner value.

Cost/operations: lexical baseline avoids new infrastructure. A later index/model
proposal must measure rebuild/invalidation costs, latency, token expenditure,
storage, quota behavior, failure handling and owner responsibilities; no cost
ceiling is invented. Dependencies: reviewed lawful corpus, qualified language
reviewers, approved ontology and benchmark, and approved provider/data handling
before generated answers. None blocks this design document.

Bounded implementation/release plan if selected: approve relational/lexical
experiment -> implement isolated fixtures/read-only evaluation -> verify source
health, privacy and citations -> assess corpus readiness -> prepare separate
generation/index and release plan. Production activation remains gated; rollback
must disable graph/generation and restore lexical/source-card behavior without
losing canonical resources or provenance. No ingestion, schema file or runtime
prototype is created here.

## Exact inspected sources

- [Phase 19 tasks](TASKS.md), [acceptance](ACCEPTANCE.md), [test plan](TEST-PLAN.md): original 007/008 discovery requirements; owner amendment changes design sequencing only.
- [Phase 05 handoff](../PHASE-05-COMMUNITY/HANDOFF.md), Feed foundation; [community repository](../../../CongDongNgonNgu-Back-End/src/community/postgres-community.repository.ts), `listPosts`: actual active public language-filtered recency baseline.
- [Matching engine](../../../CongDongNgonNgu-Back-End/src/exchange/matching-engine.ts), `evaluateMatch`, `DEFAULT_MATCHING_WEIGHTS`, `rankMatches`; [exchange service](../../../CongDongNgonNgu-Back-End/src/exchange/exchange.service.ts): deterministic matching and service boundary.
- [Library types](../../../CongDongNgonNgu-Back-End/src/library/library.types.ts), resource/review/source types; [Library search](../../../CongDongNgonNgu-Back-End/src/library/library.search.ts), `libraryResourceMatchesQuery`; [Library repository](../../../CongDongNgonNgu-Back-End/src/library/postgres-library.repository.ts), `searchPublicResources`: existing lexical/filter baseline.
- [Library service](../../../CongDongNgonNgu-Back-End/src/library/library.service.ts), `getPublicResource`, `searchPublicResources`, `projectPublicResource`, `projectPublicSearchResult`: licensing and source-health gates.
- [AI learning service](../../../CongDongNgonNgu-Back-End/src/ai/ai.learning.service.ts), `learn`; [learning contracts](../../../CongDongNgonNgu-Back-End/src/ai/ai.learning.contracts.ts), `buildAiLearningCompletionInput`, `projectAiLearningSource`, `validateAndProjectProvenance`; [learner context](../../../CongDongNgonNgu-Back-End/src/ai/ai.context.ts), `projectLearnerContext`: bounded source/context reuse, not general RAG.
- [Licensing policy](../../docs/04-DATA-LICENSING.md), [data lifecycle](../../docs/08-DATA-LIFECYCLE.md), [working rules](../../docs/engineering/CODEX-WORKING-RULES.md): canonical privacy/provider/release boundaries.

Verification performed: source inspection and document review only. Metrics,
model quality, corpus counts, runtime and production acceptance were not measured.
