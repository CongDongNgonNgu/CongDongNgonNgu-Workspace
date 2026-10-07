# Phase 21 Tasks

Owner authorized Phase 21 only on 2026-10-07. Contract preparation has started;
candidate implementation waits for prospective review and freeze integration.

## LNG-21-001 — Freeze benchmark, eligibility and relation contract
**Status:** DONE
**Depends on:** explicit Phase 21 authorization; reviewed fixtures/queries  
**Target repo(s):** Workspace  

Freeze the resource pool, relation vocabulary, relevance labels, eligibility/provenance/license rules and prospective quality thresholds before comparing approaches.

## LNG-21-002 — Run bounded relational retrieval experiment
**Status:** PLANNED  
**Depends on:** LNG-21-001 accepted  
**Target repo(s):** Backend / Workspace only as actually required  

Build only the isolated non-generative relational slice needed to compare against the current lexical baseline. Preserve source-card/citation fallback and abstention; do not activate external AI/vector/graph services.

## LNG-21-003 — Reconcile benchmark and security verdict
**Status:** PLANNED  
**Depends on:** LNG-21-002 observed results  
**Target repo(s):** Workspace  

Record actual metrics/denominators, invalidation results, provenance/eligibility leakage checks and exactly one `GO`, `DEFER`, or `REJECT` verdict.

## Completion rule
No task becomes `DONE` from planning text. Actual benchmark execution, repository gates, observed evidence and accepted verdict are required.
