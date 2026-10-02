# Phase 15 — Admin & Moderation

## Goal
Provide role-safe administration and moderation for the real CongDongNgonNgu domains after those domains exist. Do not build a generic empty dashboard first.

## Roles
`USER`, `CONTRIBUTOR`, `EXPERT`, `MODERATOR`, `ADMIN`. Privileged roles are granted explicitly; reputation alone never auto-promotes a user.

## Admin coverage
Users, language catalog, community posts/comments/reports, corrections, Library resources/review/import batches, AI usage/config status, membership/payments/reconciliation, reputation reversals, speaking/events where implemented, feature flags where justified and audit logs.

## Completion gate
Role/permission matrix, moderation queues/actions, admin domain pages and immutable-enough audit evidence are tested including last-admin/self-escalation protections as applicable; Stitch-designed admin UI remains distinct but coherent; commits/CI complete.

## Final Phase 15 closure

Phase 15 is closed after the frontend merge, domain-surface reconciliation
and final negative matrix. Phase 16 remains unopened.

```text
CURRENT_PHASE=15
CURRENT_SUBPHASE=15G
PHASE_15=DONE
PHASE_15A=DONE_INTEGRATED_REMOTE
PHASE_15B=DONE_INTEGRATED_REMOTE
PHASE_15C=DONE_INTEGRATED_REMOTE
PHASE_15D=DONE_INTEGRATED_REMOTE
PHASE_15E=DONE_INTEGRATED_REMOTE
PHASE_15F=DONE_DOCUMENTED_LIMITS
PHASE_15G=DONE_RECONCILED
LNG_15_001=PASS
LNG_15_002=PASS
LNG_15_003=PASS
LNG_15_004=PASS
LNG_15_005=PASS
LNG_15_006=PASS_WITH_UNSUPPORTED_SURFACES_DOCUMENTED
LNG_15_007=PASS
PHASE_15_BACKEND_MAIN_SHA=6859ec5e57e8792ea188fe03bcea9c9f94d3ad54
PHASE_15_FRONTEND_MAIN_SHA=9304cdfe75a6bd7471a00fe593ebbf43a1e142f2
PHASE_15_WORKSPACE_EVIDENCE=PASS
PHASE_15_WORKSPACE_MAIN_SHA=86154e054b5e50a87f1d76eee83418220cb38dba
PHASE_15_PRODUCTION_DEPLOYED=NO
PHASE_15_PRODUCTION_DB_MUTATED=NO
PHASE_15_PROVIDER_ACTIVATED=NO
PHASE_15_SECRET_MUTATION=NO
PHASE_16_STARTED=NO
NEXT_ACTION=PHASE_16_PENDING
```
