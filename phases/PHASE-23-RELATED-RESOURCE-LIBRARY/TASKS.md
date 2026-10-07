# Phase 23 Tasks

All tasks are `PLANNED`; Phase 21 `GO` and separate Phase 23 authorization are mandatory.

## LNG-23-001 — Freeze relation projection and eligibility contract
**Status:** PLANNED  
**Depends on:** Phase 21 `GO`; explicit Phase 23 authorization  
**Target repo(s):** Workspace / Backend / Frontend  

Promote only the accepted bounded relation vocabulary/benchmark semantics into an implementation contract, including ownership, invalidation, eligibility and fallback.

## LNG-23-002 — Implement public related-resource projection
**Status:** PLANNED  
**Depends on:** LNG-23-001  
**Target repo(s):** Backend  

Implement bounded eligible related-resource reads with provenance/license/source-health rechecks, pagination, stale/deletion invalidation and lexical fallback/abstention.

## LNG-23-003 — Implement related-resource Library journey
**Status:** PLANNED  
**Depends on:** stable accepted backend contract  
**Target repo(s):** Frontend  

Add accessible responsive source-grounded navigation/cards to existing Library surfaces and localize only new UI in vi/en.

## LNG-23-004 — Integration and closeout
**Status:** PLANNED  
**Depends on:** LNG-23-002 and LNG-23-003  
**Target repo(s):** Backend / Frontend / Workspace  

Re-run accepted Phase 21 quality/eligibility criteria after integration plus stale-source, deletion, filter, fallback, route, responsive/a11y and full applicable regression gates.
