# Phase 22 Tasks

Owner START_PHASE_22=YES authorized the complete lifecycle on 2026-10-07. Phase20 DONE/GO gate is verified. LNG-22-001 is DONE after PR130 reviewed freeze integration and PR/main quality CI; LNG-22-002 is DONE after PR44, real SQL proof, PR/main CI and branch cleanup. LNG-22-003 is DONE after reviewed Stitch, native browser acceptance, PR28/main CI and branch cleanup; LNG-22-004 is VERIFYING with technical acceptance passed after deployed browser acceptance and exact fixture cleanup; final Workspace integration is the remaining repository gate.

## LNG-22-001 — Freeze implementation contracts
**Status:** DONE
**Depends on:** Phase 20 `GO`; explicit Phase 22 authorization  
**Target repo(s):** Workspace / Backend / Frontend  

Translate the accepted Phase 20 policy into bounded schema/API/UI contracts, quotas, pagination, retention/deletion and moderation invariants without broadening scope.

## LNG-22-002 — Implement group lifecycle and authorization backend
**Status:** DONE
**Depends on:** LNG-22-001  
**Target repo(s):** Backend  

Implement bounded group, membership, invitation, text discussion, ownership transfer, removal and moderation/report behavior with immediate authorization enforcement.

## LNG-22-003 — Implement accessible vi/en group journey
**Status:** DONE
**Depends on:** stable accepted backend contract; UI policy  
**Target repo(s):** Frontend  

Implement the approved responsive group surfaces using existing architecture and locale infrastructure. Use Stitch according to [UI-STITCH.md](UI-STITCH.md) before substantial new visual implementation.

## LNG-22-004 — Integration, security and closeout
**Status:** VERIFYING
**Depends on:** LNG-22-002 and LNG-22-003  
**Target repo(s):** Backend / Frontend / Workspace  

Run lifecycle, negative role/cross-group, race/replay/idempotency, responsive/a11y and regression gates; reconcile evidence and release hold/acceptance truthfully.
