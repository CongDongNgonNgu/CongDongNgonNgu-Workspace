# Phase 29 — Pre-Launch Hardening

**Status:** PLANNED — NOT EXECUTION AUTHORIZATION

## Objective

Convert the TEST-validated product into a release-ready candidate by hardening security, observability, reliability, performance, accessibility and operational recovery without expanding product scope.

## Planned subphases

### LNG-29-001 — Release baseline & risk register
- freeze exact Backend/Frontend/Workspace/DB migration baselines;
- inventory known limitations and deferred risks;
- classify launch blockers versus accepted bounded limitations;
- confirm payment/production state separately.

### LNG-29-002 — Observability & safe diagnostics
Review/implement only privacy-safe operational signals:
- structured logs;
- correlation/request IDs;
- frontend runtime error capture;
- backend error classes;
- health/latency/failure signals;
- alert/runbook mapping.

Never log passwords, tokens, invitation secrets, private messages or raw private learning content.

### LNG-29-003 — Security/privacy hardening
- authorization regression across connection/chat/community/groups/library;
- session/CSRF/CORS/request validation;
- rate limiting and enumeration resistance;
- content/report/block abuse boundaries;
- dependency audit;
- secret/config review;
- privacy/data-retention review.

### LNG-29-004 — Performance/reliability hardening
Measure and remediate bounded issues around:
- page/API latency;
- realtime reconnect;
- N+1/query amplification;
- pagination bounds;
- slow network behavior;
- frontend rendering/bundle hotspots;
- concurrent message/group/community operations.

### LNG-29-005 — Accessibility/device readiness
- keyboard-only critical journeys;
- focus transitions;
- automated accessibility audit;
- screen-reader bounded manual pass if available;
- zoom/large text;
- seven responsive widths;
- actual-device/mobile checks where available.

Do not claim formal WCAG certification unless separately performed by an appropriate audit.

### LNG-29-006 — Backup/restore, migration & incident rehearsal
For the approved non-production environment first:
- migration rehearsal;
- rollback/restore procedure;
- backup verification where platform supports it;
- degraded dependency behavior;
- incident response/runbook;
- release/rollback checklist.

No production DB mutation or destructive production rehearsal is authorized by this plan.

### LNG-29-007 — Final release-readiness verdict
Reconcile exact-main CI/runtime/browser/security evidence and produce:
- GO_LIMITED_RELEASE;
- REMEDIATE_AND_RETEST;
- NO_GO.

A GO verdict does not itself authorize production deployment, public launch, payment activation or real-user data collection.

## Acceptance

- no unresolved critical/high launch-blocking security defect;
- required observability works without sensitive-data leakage;
- performance/reliability thresholds defined and met or explicitly held;
- recovery/runbooks are executable;
- accessibility scope truthfully recorded;
- all synthetic TEST fixtures cleaned;
- full-system Phase28 regressions remain green after hardening;
- production/payment actions remain separate owner decisions.

## Out of scope

- new major product features;
- Phase30/public launch implementation;
- monetization/payment activation;
- real-user pilot unless separately authorized;
- production migration/deployment without explicit owner authorization.

## Exit verdict

`GO_LIMITED_RELEASE` / `REMEDIATE_AND_RETEST` / `NO_GO`
