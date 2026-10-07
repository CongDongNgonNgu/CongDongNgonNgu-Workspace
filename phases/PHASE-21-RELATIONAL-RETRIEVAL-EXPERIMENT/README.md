# Phase 21 — Provenance-Safe Relational Retrieval Experiment

**Status:** PLANNED  
**Source candidate:** `LNG-19-008` relational/non-generative slice  
**Authoritative roadmap:** `../../docs/V2-ROADMAP.md`

```text
PHASE_NUMBER=21
PHASE_STARTED=NO
EXECUTION_AUTHORIZED=NO
PLANNING_DOSSIER_ONLY=YES
```

## Objective
Test whether a bounded, reviewed relational layer improves discovery over the current lexical Library baseline while preserving eligibility, provenance, licensing, citations and abstention.

## Scope after explicit authorization
- Freeze reviewed synthetic/licensed resource fixtures, relation vocabulary and labeled query set.
- Compare the current lexical baseline with bounded relational retrieval on the same eligible pool.
- Preserve language/type/level filtering, source cards, citations and abstention.
- Recheck `PUBLIC` / `ACTIVE` / `VERIFIED`, provenance, license, redistribution/source health and ACL at retrieval/response time.
- Validate invalidation after source change/deletion across any experiment projection/cache/citation.

## Out of scope
Generated answers/RAG, embeddings, vector/graph services, external AI/provider activation, new corpus ingestion, private/group retrieval, production indexes and product telemetry.

## Entry gate
Separate owner phase authorization plus reviewer-approved rights/provenance fixtures, bounded relation vocabulary, labeled queries and prospectively accepted thresholds. Dossier creation does not satisfy this gate.

## Exit gate
Reproducible benchmark/security evidence and `GO`, `DEFER`, or `REJECT`. Phase 23 remains ineligible unless Phase 21 exits `GO` and later receives its own authorization.

See [TASKS.md](TASKS.md), [ACCEPTANCE.md](ACCEPTANCE.md), [TEST-PLAN.md](TEST-PLAN.md), and [BENCHMARK-PROTOCOL.md](BENCHMARK-PROTOCOL.md).
