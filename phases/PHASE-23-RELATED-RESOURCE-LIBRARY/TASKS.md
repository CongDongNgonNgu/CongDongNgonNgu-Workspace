# Phase 23 Tasks

Current owner authorization starts the bounded Related Resources scope. Phase21 DONE/GO confirmed; the reviewed relation contract is frozen. Backend implementation and deployed acceptance have passed; LNG-23-002 is DONE and LNG-23-003 is DONE. Integration closeout is READY after frontend source/main CI/deployment/browser acceptance and fresh UI residualzero cleanup. Broader category-completion23B remains outside this run.

## LNG-23-001 — Freeze relation projection and eligibility contract
**Status:** DONE
**Depends on:** Phase 21 `GO`; explicit Phase 23 authorization  
**Target repo(s):** Workspace / Backend / Frontend  

Promote only the accepted bounded relation vocabulary/benchmark semantics into an implementation contract, including ownership, invalidation, eligibility and fallback.

## LNG-23-002 — Implement public related-resource projection
**Status:** DONE
**Depends on:** LNG-23-001  
**Target repo(s):** Backend  

Implement bounded eligible related-resource reads with provenance/license/source-health rechecks, pagination, stale/deletion invalidation and lexical fallback/abstention.

## LNG-23-003 — Implement related-resource Library journey
**Status:** DONE
**Depends on:** stable accepted backend contract  
**Target repo(s):** Frontend  

Add accessible responsive source-grounded navigation/cards to existing Library surfaces and localize only new UI in vi/en.

## LNG-23-004 — Integration and closeout
**Status:** READY
**Depends on:** LNG-23-002 and LNG-23-003  
**Target repo(s):** Backend / Frontend / Workspace  

Re-run accepted Phase 21 quality/eligibility criteria after integration plus stale-source, deletion, filter, fallback, route, responsive/a11y and full applicable regression gates.
