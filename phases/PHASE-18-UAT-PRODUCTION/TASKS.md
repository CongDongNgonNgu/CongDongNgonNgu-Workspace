# Phase 18 Tasks

## LNG-18-001 — UAT Dataset & Persona Plan
**Status:** PLANNED  
**Depends on:** Phase 17

Define dedicated UAT personas and deterministic seed fixtures for all required roles/language scenarios. Include Vietnamese learner, foreign Vietnamese learner, English/native exchange pair, contributor/reviewer and moderator/admin. Seed commands must be idempotent and environment-guarded; never run destructive/reset seed against production unintentionally.

## LNG-18-002 — End-to-End Journey Matrix
**Depends on:** LNG-18-001

Create traceable journey IDs covering anonymous discovery, register/verify/login/onboarding, language hub, community post/comment, correction acceptance, Library contribution/review/search, exchange discovery/request, AI practice, XP/reputation, membership/PayOS sandbox, notifications, speaking/event where enabled, moderation/admin. Mark dependencies and expected evidence.

## LNG-18-003 — Full Automated Regression
**Depends on:** LNG-18-002

Run clean backend/frontend install/build/type/lint/test, HTTP/API, Playwright critical journeys, visual matrix and security regression. Resolve flaky tests or clearly quarantine with owner/reason—not repeated retries until green. Capture exact suite/test counts and commit SHAs.

## LNG-18-004 — UAT Functional Execution
**Depends on:** LNG-18-001..003

Execute the journey matrix against approved UAT/production-like environment with real services where required. Classify each check `PASS`, `FAIL`, `BLOCKED_EXTERNAL`, `UNSAFE_PRODUCTION_TEST` or `NOT_APPLICABLE` with evidence. Do not count skipped/blocked tests as PASS.

## LNG-18-005 — Payment & Provider Verification
**Depends on:** Phase 11 and LNG-18-004

Verify PayOS using sandbox or explicitly authorized low-value live transactions; verify OAuth/AI/realtime/media/email providers in intended launch configuration. Record sanitized IDs/status/timestamps; never store keys/tokens. Disabled providers must have documented product behavior.

## LNG-18-006 — Backup, Migration & Rollback Drill
**Depends on:** deployment architecture

Verify database backup creation and restore procedure on safe target, migration status/permissions, application rollback/redeploy path and recovery ownership. Record timestamps and commands without credentials. A backup not test-restored is not `BACKUP VERIFIED`.

## LNG-18-007 — Observability & Operational Readiness
**Depends on:** deployed production-like environment

Verify health/readiness endpoints, structured logs/redaction, error tracking/metrics/alerts as available, correlation IDs, payment/realtime/provider failure visibility and basic runbooks. Alerts should be actionable, not noisy.

## LNG-18-008 — Production Deployment & Safe Smoke
**Depends on:** LNG-18-003..007 PASS or formally approved constraints

Deploy exact tested revisions through normal CI/CD. Verify domain/TLS, frontend assets/API health, anonymous public routes, authenticated safe smoke, no migration errors and no obvious elevated error rate. Avoid destructive production tests and real-user messaging.

## LNG-18-009 — Launch Reconciliation
**Depends on:** LNG-18-008

Reconcile deployed SHAs with tested SHAs, all completion gates, residual blockers/non-applicable items and owner decisions. Update Workspace/hand-off and mark project launch phase complete only when evidence supports it.
