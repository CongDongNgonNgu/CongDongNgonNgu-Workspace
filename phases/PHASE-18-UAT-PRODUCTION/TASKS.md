# Phase 18 Tasks

## Current demo release disposition - 2026-10-06

The [owner-approved no-payment demo amendment](../../evidence/phase-18/PHASE-18-DEMO-NO-PAYMENT-2026-10-06.md) is the
current Phase 18 release disposition and evidence index. Earlier dated state,
next-action and release-gate snapshots below are historical where superseded.
Payment provider selection/activation is DEFERRED_BY_OWNER_FOR_DEMO; legacy
PayOS/config/webhook/live gates are DEFERRED_PROVIDER_NOT_SELECTED_FOR_DEMO,
not PASS. Payment remains disabled. Backend/CORS smoke and frontend provenance
are verified. Frontend hash navigation fails to scroll; full demo smoke is FAIL
and deployment acceptance remains BLOCKED_DEPLOYMENT_REQUIRED after a source fix.
Monitoring is not waived: MONITORING_ACTIVATION=BLOCKED_EXTERNAL_ACTIVATION_REQUIRED.
FINAL_PHASE18_RECONCILIATION=BLOCKED; PHASE_18_DEMO_RELEASE_READY=NO;
FULL_PAYMENT_LAUNCH_READY=NO; PHASE_18_DONE=NO; PHASE_18_STATUS=BLOCKED_EXTERNAL;
PHASE_18_CLOSEOUT_PROFILE=NOT_CLOSED; PHASE_19_DEPENDENCY_SATISFIED=NO;
PHASE_19_STARTED=NO. Remaining demo gates: FRONTEND_DEPLOYMENT_ACCEPTANCE,
PRODUCTION_SMOKE, MONITORING_ACTIVATION and FINAL_PHASE18_RECONCILIATION.
NEXT_ACTION=HUMAN_AUTHORIZE_FRONTEND_PRODUCTION_DEPLOYMENT.

LNG-18-008 remains open for frontend navigation remediation/deployment
acceptance and repeat smoke. LNG-18-009 remains BLOCKED by applicable demo
gates and owner closeout. Historical task statuses below retain their original
evidence scope, including pending full UAT.

## LNG-18-001 — UAT Dataset & Persona Plan
**Status:** PASS_WITH_LIVE_EXECUTION_PENDING
**Depends on:** Phase 17

Define dedicated UAT personas and deterministic seed fixtures for all required roles/language scenarios. Include Vietnamese learner, foreign Vietnamese learner, English/native exchange pair, contributor/reviewer and moderator/admin. Seed commands must be idempotent and environment-guarded; never run destructive/reset seed against production unintentionally.

## LNG-18-002 — End-to-End Journey Matrix
**Status:** PASS
**Depends on:** LNG-18-001

Create traceable journey IDs covering anonymous discovery, register/verify/login/onboarding, language hub, community post/comment, correction acceptance, Library contribution/review/search, exchange discovery/request, AI practice, XP/reputation, membership/PayOS sandbox, notifications, speaking/event where enabled, moderation/admin. Mark dependencies and expected evidence.

## LNG-18-003 — Full Automated Regression
**Status:** PASS_WITH_LIVE_UAT_PENDING
**Depends on:** LNG-18-002

Run clean backend/frontend install/build/type/lint/test, HTTP/API, Playwright critical journeys, visual matrix and security regression. Resolve flaky tests or clearly quarantine with owner/reason—not repeated retries until green. Capture exact suite/test counts and commit SHAs.

## LNG-18-004 — UAT Functional Execution
**Status:** BLOCKED_EXTERNAL
**Depends on:** LNG-18-001..003

Execute the journey matrix against approved UAT/production-like environment with real services where required. Classify each check `PASS`, `FAIL`, `BLOCKED_EXTERNAL`, `UNSAFE_PRODUCTION_TEST` or `NOT_APPLICABLE` with evidence. Do not count skipped/blocked tests as PASS.

## LNG-18-005 — Payment & Provider Verification
**Status:** PASS_WITH_PRODUCTION_PAYOS_RELEASE_GATE
**Depends on:** Phase 11 and LNG-18-004

Verify PayOS using sandbox or explicitly authorized low-value live transactions; verify OAuth/AI/realtime/media/email providers in intended launch configuration. Record sanitized IDs/status/timestamps; never store keys/tokens. Disabled providers must have documented product behavior.

The current technical gate is reconciled with provider-neutral payment
architecture, a PayOS adapter, offline contract/signature verification and a
deterministic fake payment lifecycle. PayOS has no separate sandbox, so live
provider verification remains a production release gate and was not attempted.

## LNG-18-006 — Backup, Migration & Rollback Drill
**Status:** BACKUP_RESTORE_SUBGATE_RESOLVED
**Depends on:** deployment architecture

Verify database backup creation and restore procedure on safe target, migration status/permissions, application rollback/redeploy path and recovery ownership. Record timestamps and commands without credentials. A backup not test-restored is not `BACKUP VERIFIED`.

The Cloudflare R2 backup/restore sub-gate is verified in
`evidence/phase-18/PHASE-18-R2-BACKUP-RESTORE-2026-10-03.md`. The broader
application rollback/redeploy and recovery-ownership controls remain separate
release-readiness work and are not claimed complete by this TEST/UAT drill.

Update 2026-10-05: the [operational runbook](../../evidence/phase-18/PHASE-18-OPERATIONAL-READINESS.md)
now completes deployment/rollback/restore documentation and assigns recovery
roles. Production backup/restore and application rollback execution remain
separately authorized release actions; no production drill is claimed.

## LNG-18-007 — Observability & Operational Readiness
**Status:** PASS_WITH_PRODUCTION_MONITORING_RELEASE_GATE
**Depends on:** deployed production-like environment

Verify health/readiness endpoints, structured logs/redaction, error tracking/metrics/alerts as available, correlation IDs, payment/realtime/provider failure visibility and basic runbooks. Alerts should be actionable, not noisy.

Local health/readiness, structured logging/redaction and correlation behavior
are verified. External production monitoring/alerting is intentionally not
configured before production and remains a release gate.

Update 2026-10-05: the same operational runbook defines the provider-neutral
monitoring plan, primary/secondary ownership and activation evidence gate.
Documentation is READY; external monitoring remains inactive and required
before production launch.

## LNG-18-008 — Production Deployment & Safe Smoke
**Status:** HUMAN_AUTHORIZATION_REQUIRED
**Depends on:** LNG-18-003..007 PASS or formally approved constraints

Deploy exact tested revisions through normal CI/CD. Verify domain/TLS, frontend assets/API health, anonymous public routes, authenticated safe smoke, no migration errors and no obvious elevated error rate. Avoid destructive production tests and real-user messaging.

## LNG-18-009 — Launch Reconciliation
**Status:** NOT_READY_BLOCKED_BY_18D_18E_18F
**Depends on:** LNG-18-008

Reconcile deployed SHAs with tested SHAs, all completion gates, residual blockers/non-applicable items and owner decisions. Update Workspace/hand-off and mark project launch phase complete only when evidence supports it.

Payment and local operational implementation gates are reconciled, but 18F
production-safe deployment/smoke and 18G closeout remain unopened. Phase 18 is
therefore not marked done or launch-ready.
