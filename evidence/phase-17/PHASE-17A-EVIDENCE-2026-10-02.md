# Phase 17A Evidence — Threat Model and Attack-Surface Inventory

**Date:** 2026-10-02

**Task:** LNG-17-001 — PASS

**Subphase:** 17A — PASS (Workspace evidence; Phase 17 remains IN_PROGRESS)

## Baseline

| Repository | Verified main SHA |
| --- | --- |
| Backend | `6859ec5e57e8792ea188fe03bcea9c9f94d3ad54` |
| Frontend | `620f17c5f8b742fe4062e91fa33b9455d2b8a036` |
| Workspace | `bf119373036ef86173fafc69721df627b550c3f6` |

All three repositories were fetched/pruned, fast-forward synchronized to
`origin/main`, and confirmed clean before 17A work.

## Artifacts

- `phases/PHASE-17-SECURITY-HARDENING/DECOMPOSITION.md`
- `phases/PHASE-17-SECURITY-HARDENING/THREAT-MODEL.md`
- `phases/PHASE-17-SECURITY-HARDENING/HANDOFF.md`
- `state/PROJECT-STATE.md` and `state/DEPENDENCY-GRAPH.md` Phase 17 records

## Evidence reviewed

- Real Backend auth/OAuth/session, admin, community, library, AI, membership,
  rooms, events, profile, exchange, notification and challenge boundaries.
- Frontend auth API/client and OAuth redirect/callback surface.
- Phase 09 AI, Phase 11 commerce, Phase 13 rooms, Phase 14 events, Phase 15
  admin/audit and Phase 16 cache/SEO/performance contracts.
- Existing global validation, security headers, CSRF, session rotation,
  provider configuration validation and sanitized exception handling.

## Baseline verification already run

- Backend unit: 140 suites, 801 tests — PASS.
- Backend E2E: 17 suites, 73 tests — PASS.
- Frontend: 82 files, 339 tests — PASS.
- Backend typecheck/build/audit — PASS; audit reports 0 high vulnerabilities.
- Frontend typecheck/build/performance/audit — PASS; audit reports 0 high
  vulnerabilities and the Phase 16 performance budget remains within limits.

## Findings and next action

- H-001 (open, high): public OAuth login/register state lacks browser binding;
  remediate in 17B with a cookie-bound state check and negative regression
  coverage.
- H-002–H-005 and M-001–M-003 are explicit verification gates in the threat
  model, not accepted residual risk.
- No production deployment/restart, production database write/migration,
  provider activation, secret mutation or live provider call was performed.

## Acceptance

17A satisfies LNG-17-001: current attack surfaces, trust boundaries, assets,
prioritized abuse cases, owners, existing controls and verification gates are
documented without secrets or production data. Next eligible work is 17B.
