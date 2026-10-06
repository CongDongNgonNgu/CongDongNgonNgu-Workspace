# Deployment & Environment Principles

## Current demo release disposition - 2026-10-06

[Monitoring activation and final demo closeout](../evidence/phase-18/PHASE-18-MONITORING-AND-DEMO-CLOSEOUT-2026-10-06.md) is the current
authoritative release evidence index. All earlier dated gate/status/next-action
snapshots below are historical where superseded; their original test scope is
preserved. Backend main/live bec4ea4 and Frontend main/live 940e278 are unchanged.
NODE_ENV=production; RENDER_AUTO_DEPLOY=OFF. Backend/Frontend deployment
acceptance and bounded demo PRODUCTION_SMOKE are PASS.

MONITORING_PROVIDER=GITHUB_ACTIONS_WORKSPACE; MONITORING_ACTIVE=YES;
MONITORING_ACTIVATION=PASS. Main workflow is enabled at 15-minute cadence;
TEST Issue #106 creation/recovery and live three-target run passed. Alert channel
is GitHub Issue; PROJECT_RELEASE_OWNER primary, APPLICATION_OWNER secondary.
No real-time SLA, human notification latency or automated escalation is claimed.

FINAL_PHASE18_RECONCILIATION=PASS; PHASE_18_DEMO_RELEASE_SCOPE=NO_PAYMENT;
PHASE_18_DEMO_RELEASE_READY=YES; PHASE_18_DONE=YES; PHASE_18_STATUS=DONE;
PHASE_18_TASK_SET_COMPLETE=YES; PHASE_18_FINAL_GATE=PASS_FOR_DEMO_NO_PAYMENT;
PHASE_18_CLOSEOUT_PROFILE=DEMO_NO_PAYMENT; FULL_PAYMENT_LAUNCH_READY=NO.
PHASE_19_DEPENDENCY_SATISFIED=YES; PHASE_19_STARTED=NO.
REMAINING_PHASE_18_DEMO_GATES=NONE.
NEXT_ACTION=WAIT_FOR_EXPLICIT_PHASE_19_AUTHORIZATION.

Payment provider remains unselected and disabled. PAYOS_CONFIG,
WEBHOOK_REGISTRATION and LIVE_PAYOS_VERIFICATION remain
DEFERRED_PROVIDER_NOT_SELECTED_FOR_DEMO, not PASS. Backup remains
WAIVED_FOR_RECREATABLE_DEMO_DATA_ONLY, verification NOT_PERFORMED.
Revisit backup before relying on persistent user/payment data. Frontend log
sanity stays WARN for EXPECTED_ANONYMOUS_REFRESH_403, release blocker NO.
Latest journey matrix: 20 PASS/0 FAIL/0 BLOCKED/2 N/A in original TEST/UAT scope;
production acceptance remains bounded read-only demo smoke. Full live
authenticated/provider execution and recovery-time guarantees are not claimed.

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
