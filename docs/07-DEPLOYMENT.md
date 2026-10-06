# Deployment & Environment Principles

## Current demo release disposition - 2026-10-06

[Controlled Frontend production acceptance](../evidence/phase-18/PHASE-18-FRONTEND-PRODUCTION-ACCEPTANCE-2026-10-06.md) is the current
release evidence index. The owner's NO_PAYMENT demo scope remains unchanged:
payment gates are DEFERRED_PROVIDER_NOT_SELECTED_FOR_DEMO, not PASS. Payment
remains disabled. Frontend PR #26 is merged and main/live is
`940e278555b2d33054fb2780d7348ded59ba2c3e`; Vercel production is Ready.
FRONTEND_RUNTIME_ACCEPTANCE=PASS; FRONTEND_DEPLOYMENT_ACCEPTANCE=PASS;
PRODUCTION_SMOKE=PASS for the bounded anonymous/read-only demo scope.
Earlier defect, local-branch retention, next-action and dated gate snapshots
below are historical where superseded. Full authenticated UAT is not relabeled.
MONITORING_ACTIVATION=BLOCKED_EXTERNAL_ACTIVATION_REQUIRED; monitoring is not waived.
FINAL_PHASE18_RECONCILIATION=BLOCKED; PHASE_18_DEMO_RELEASE_READY=NO;
FULL_PAYMENT_LAUNCH_READY=NO; PHASE_18_DONE=NO; PHASE_18_STATUS=BLOCKED_EXTERNAL;
PHASE_18_CLOSEOUT_PROFILE=NOT_CLOSED; PHASE_19_DEPENDENCY_SATISFIED=NO;
PHASE_19_STARTED=NO. Remaining demo gates: MONITORING_ACTIVATION and
FINAL_PHASE18_RECONCILIATION. NEXT_ACTION=HUMAN_AUTHORIZE_MONITORING_ACTIVATION.

CongDongNgonNgu environments are independent from EduAI. Never point new code at EduAI production services for convenience.

Secrets belong in environment/secret stores; `.env.example` contains names and safe examples only. Separate runtime and migration database privileges where supported.

Phase 00 establishes baseline CI for build, type/lint where applicable and tests. Later phases add E2E, security and visual gates. Deployment must be reproducible from committed source.

Database changes use reviewed migrations, forward-compatible rollout where feasible, backup/restore planning and an explicit production migration procedure. Destructive changes require a data/rollback plan.

Feature flags may gate risky providers or phased rollout; they must not become permanent architecture substitutes.

Phase 18 cannot complete until build, test, security, responsive, accessibility, UAT, payment, backup and observability gates have evidence.

## Production operations

The authoritative deployment, rollback, revision ledger, restore, monitoring
and production go/no-go procedure is
[Phase 18 operational readiness](../evidence/phase-18/PHASE-18-OPERATIONAL-READINESS.md).
Runbook readiness does not authorize execution. Production backup, restore,
deployment, restart, rollback, secret/provider changes and monitoring activation
remain separate human authorization boundaries. Internal provider IDs are
optional when repository plus hostname identify the target unambiguously;
actual account wiring and revisions must be verified before release execution.
