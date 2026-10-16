# Phase 36 — Pre-Launch Hardening

**Status:** PLANNED — NOT STARTED

## Objective

Convert the TEST-validated product into a release-ready candidate by hardening security, observability, reliability, performance, accessibility and operational recovery without expanding product scope.

## Planned subphases

### LNG-36-001 — Release baseline & risk register
Freeze exact Backend/Frontend/Workspace/DB migration baselines, inventory known limitations and classify launch blockers versus accepted bounded limitations.

### LNG-36-002 — Observability & safe diagnostics
Review privacy-safe structured logs, correlation/request IDs, frontend runtime error capture, backend error classes, health/latency/failure signals and alert/runbook mapping. Never log passwords, tokens, invitation secrets, private messages or raw private learning content.

### LNG-36-003 — Security/privacy hardening
Authorization regression, session/CSRF/CORS/request validation, rate limiting, enumeration resistance, abuse/report/block boundaries, dependency audit, secret/config review and privacy/data-retention review.

### LNG-36-004 — Performance/reliability hardening
Measure page/API latency, realtime reconnect, query amplification, pagination bounds, slow-network behavior, frontend rendering/bundle hotspots and concurrent communication/community operations.

### LNG-36-005 — Accessibility/device readiness
Keyboard-only critical journeys, focus transitions, automated accessibility audit, bounded screen-reader/manual pass where available, zoom/large text and responsive/device checks.

### LNG-36-006 — Backup/restore, migration & incident rehearsal
Use the approved non-production environment first for migration/rollback/restore, backup verification where supported, degraded-dependency behavior, incident runbook and release/rollback checklist.

### LNG-36-007 — Final release-readiness verdict
Reconcile exact-main evidence and produce `GO_LIMITED_RELEASE`, `REMEDIATE_AND_RETEST`, or `NO_GO`.

## Acceptance

No unresolved critical/high launch-blocking security defect; required observability works without sensitive-data leakage; performance/reliability thresholds are met or explicitly held; recovery/runbooks are executable; accessibility scope is truthfully recorded; synthetic fixtures are cleaned; Phase35 regressions remain green.

## Hard hold

A GO verdict does not itself authorize production deployment, public launch, payment activation, real-user data collection, production migration or destructive infrastructure work.
