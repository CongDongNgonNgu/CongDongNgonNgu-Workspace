# V2 Roadmap Amendment — Phase 23 Language Hub Completion

Owner-approved roadmap maintenance, 2026-10-07 (Asia/Ho_Chi_Minh).

This document is an authoritative amendment to `docs/V2-ROADMAP.md`. It supersedes only the Phase 23 title/scope/dependency details described below. All completed Phase 20 and Phase 21 evidence remains unchanged; Phase 22, Phase 23 and Phase 24 remain unstarted and execution-unauthorized. This amendment does not authorize implementation, database mutation, deployment, telemetry, provider activation or production work.

## Current major-phase order

1. **20 — Scoped Study Group Policy & Authorization Experiment** — DONE / GO.
2. **21 — Provenance-Safe Relational Retrieval Experiment** — DONE / GO.
3. **22 — Bounded Text Study Groups** — eligible, PLANNED, not started, not execution-authorized.
4. **23 — Verified Language Learning Resource Journey** — eligible, PLANNED, not started, not execution-authorized.
   - **23A — Verified Related-Resource Library Journey**
   - **23B — Language Learning Categories Completion**
5. **24 — Member Onboarding & Language Exchange Localization** — PLANNED, not started, not execution-authorized.

Phase 24 is not a technical dependency of Phase 23B. Phase 22 and Phase 23 remain separate product tracks. No major phase is started by this roadmap change.

## Phase 23 umbrella contract

- **PHASE_NUMBER:** 23
- **PHASE_TITLE:** Verified Language Learning Resource Journey
- **OBJECTIVE:** Turn the accepted Library, provenance, license, eligibility and bounded relational-retrieval foundations into verified user-facing resource journeys, then close the visible Language Hub category gaps only where a real production-capable path is actually supported.
- **SOURCE_CANDIDATES:** LNG-19-008 relational slice plus existing Language Hub/Open Language Library capabilities and accepted Phase 21 inheritance.
- **WHY_NOW:** Phase 21 is DONE/GO and Phase 23 is technically eligible. The current Language Hub already exposes Vocabulary, Grammar, Sentences, Pronunciation and Resources categories, but readiness must be driven by real eligible content and complete journeys rather than placeholder/demo content.
- **DEPENDENCIES:** Phase 21 GO and its inheritance boundaries; current Library; completed LNG-19-006 locale foundation. Phase 23A is the resource-journey foundation for 23B Resources. Phase 24 is not a dependency. No dependency on private groups/Phase 22 unless a later explicitly reviewed category contract requires it.
- **OUT_OF_SCOPE:** Generated answers/RAG, embeddings, graph/vector infrastructure, external AI activation, fabricated learning content, automatic corpus ingestion, private/group retrieval, forced pronunciation activation, payment/provider activation and production mutation without separate authorization.
- **PRODUCTION_HARD_STOPS:** Existing common roadmap boundaries remain unchanged. Production deployment/restart, production DB writes or migrations, new persistent-user-data collection, credentials/secrets, paid/provider activation, security weakening and other hard stops require separate owner authorization.
- **STATUS:** PLANNED.

## Phase 23A — Verified Related-Resource Library Journey

23A preserves the original approved Phase 23 purpose and the Phase 21 reuse/inheritance contract. It must not reinterpret Phase 21 as proving general free-text search superiority, unseen-corpus semantic generalization, human linguistic certification or real-user value.

### Objective

Deliver a bounded source-grounded related-resource journey on the existing public Library using real eligible resource paths.

### Required concerns

- deterministic related-resource discovery/navigation;
- PUBLIC/ACTIVE/VERIFIED and ACL eligibility at retrieval and serialization;
- canonical source identity, provenance and license preservation;
- source-health checks and redistribution eligibility;
- relation ownership/review/update lifecycle for persisted assertions;
- stale/deleted/changed-resource and relation invalidation;
- pagination, filters, duplicate/cycle limits and bounded traversal;
- lexical fallback and safe abstention;
- source cards and citation integrity;
- vi/en UI for newly introduced surfaces;
- responsive/accessibility/runtime/regression gates.

Mock/demo/sample-only resources do not prove production readiness.

## Phase 23B — Language Learning Categories Completion

### Objective

Audit the Language Hub end-to-end and complete each visible category where the underlying data, rights, eligibility, API and frontend journey are genuinely ready:

- Vocabulary / Từ vựng
- Grammar / Ngữ pháp
- Sentences / Mẫu câu
- Pronunciation / Phát âm
- Resources / Tài nguyên

The goal is not to manufacture content merely to remove the `Chưa sẵn sàng` label.

### Global readiness rule

A Language Hub category may be marked READY only when this chain is satisfied with actual evidence:

```text
REAL DATA / VERIFIED CONTENT
→ SOURCE + PROVENANCE + LICENSE
→ ELIGIBILITY + MODERATION + PUBLICATION
→ PRODUCTION API / QUERY PATH
→ FRONTEND JOURNEY
→ TESTS / ACCEPTANCE
→ READY
```

A database row, fixture, seed, mock or visually complete card is not sufficient by itself.

### Vocabulary

Audit and, during separately authorized execution, complete as supported:

- language ownership;
- lexical item and meanings/glosses;
- topic/category and learning level where supported;
- related examples/sentences where supported;
- source/provenance/license;
- moderation/publication/eligibility;
- bounded API/query path;
- list/detail journey where appropriate;
- loading, empty and error states;
- responsive/accessibility and relevant tests.

Do not invent unsupported semantic relations to make the category appear complete.

### Grammar

Define a bounded grammar-resource model/journey covering as supported:

- grammar topic and language;
- explanation/content;
- level where supported;
- examples and related sentences/resources;
- source/provenance/license;
- moderation/publication/eligibility;
- list/detail and safe empty states.

Sentence data alone does not authorize inference or publication of grammar lessons. AI-generated grammar content must not be silently introduced as authoritative learning material.

### Sentences

Reuse verified sentence/translation foundations where applicable and use Phase 21 relational retrieval only inside its accepted scope. The journey may include:

- sentence and language;
- direct verified translation where supported;
- relation metadata;
- canonical provenance/source/license;
- eligibility;
- related resources;
- safe fallback and abstention;
- list/detail/filter/navigation behavior.

Preserve canonical provenance through every projection. Do not claim Phase 21 proved superior general free-text search.

### Resources

Resources depend on the verified 23A journey. Expected coverage includes:

- verified resource list/cards;
- source identity, provenance and license;
- eligibility/publication visibility;
- related-resource links;
- internal/external navigation;
- unavailable, stale and deleted-resource handling;
- empty states and detail/navigation behavior where applicable.

Row existence alone must never make a resource user-visible or READY.

### Pronunciation

Pronunciation is a capability audit and must **not** be forced to READY.

Enable it only if all applicable production conditions are evidenced, including:

- legitimate audio asset;
- source/provenance/license;
- valid audio-to-language-resource mapping;
- publication eligibility;
- playback delivery path;
- frontend player and unavailable-audio states;
- responsive/accessibility behavior;
- relevant tests;
- satisfaction of previously defined speech/pronunciation re-entry gates.

If these conditions are not met, the accepted result is explicit deferral:

```text
PRONUNCIATION_STATUS=DEFERRED
PRONUNCIATION_BLOCKER=<specific evidence-backed blocker>
PRONUNCIATION_REENTRY_GATE=<specific measurable condition>
```

The existing LNG-19-002 Speech DEFER gate remains authoritative; ASR availability alone is not pronunciation-scoring proof.

## Phase 23B acceptance boundary

At Phase 23B completion:

- Vocabulary, Grammar, Sentences and Resources must not remain `Chưa sẵn sàng` when their backend capability, valid real data and complete user-facing production path have actually passed the readiness chain.
- Any category that remains gated must have a specific evidence-backed blocker and measurable re-entry gate.
- Pronunciation may remain DEFERRED without failing Phase 23B when its evidence-backed speech/audio gates are not satisfied.
- No category may be promoted by fixture/demo content or by claims broader than the evidence.

## Phase 21 inheritance limits preserved

The following Phase 21 conclusions remain unchanged and must not be broadened by Phase 23A/23B planning:

```text
CONTEXTUAL_DISCOVERY_ONLY=YES
FREE_TEXT_SEARCH_SUPERIORITY_CLAIM=NO
HUMAN_LINGUISTIC_CERTIFICATION=NO
REAL_USER_VALUE_PROVEN=NO
ATOMIC_SQL_CONCURRENCY_PROVEN=NO
CURATED_BENCHMARK_GENERALIZATION_UNPROVEN=YES
GENERATED_ANSWERS_USED=NO
RAG_USED=NO
EXTERNAL_AI_PROVIDER_USED=NO
VECTOR_DATABASE_USED=NO
GRAPH_DATABASE_USED=NO
PRIVATE_GROUP_RETRIEVAL_USED=NO
```

## Execution boundary after this amendment

```text
PHASE_20_STATUS=DONE
PHASE_20_VERDICT=GO
PHASE_21_STATUS=DONE
PHASE_21_VERDICT=GO
PHASE_22_ELIGIBLE=YES
PHASE_22_STARTED=NO
PHASE_22_EXECUTION_AUTHORIZED=NO
PHASE_23_ELIGIBLE=YES
PHASE_23_STARTED=NO
PHASE_23_EXECUTION_AUTHORIZED=NO
PHASE_23_STRUCTURE=23A,23B
PHASE_23A_STATUS=PLANNED
PHASE_23B_STATUS=PLANNED
PHASE_24_STARTED=NO
PHASE_24_EXECUTION_AUTHORIZED=NO
NO_NEW_PHASE_STARTED=YES
NEXT_ACTION=WAIT_FOR_OWNER_TO_AUTHORIZE_NEXT_MAJOR_PHASE
```

This maintenance amendment does not authorize Phase 22, 23 or 24 execution.
## Forward execution resolution — 2026-10-09

Historical amendment preserved. Historical23B category-completion intent SUPERSEDED_BY_PHASE25_FORWARD_EXECUTION after explicit owner authorization and bounded closeout; no separate23B execution/double counting. Current [matrix](../phases/PHASE-25-LANGUAGE-HUB-FUNCTIONAL-COMPLETION/CATEGORY-READINESS.md) defines final status/held gates. Phase25 GO_BOUNDED_LANGUAGE_HUB; STOP, Phases26–29 not authorized/started. Earlier Phase22–24/23B flags are historical snapshots.
