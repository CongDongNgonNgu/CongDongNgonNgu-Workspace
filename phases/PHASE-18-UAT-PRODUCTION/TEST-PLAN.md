# Phase 18 Test Plan

Maintain the traceable journey table in
`evidence/phase-18/PHASE-18B-JOURNEY-MATRIX.md` with ID, persona,
preconditions, steps, expected result, environment, automation/manual
classification and evidence reference. The matrix is a plan until 18D
execution; do not count `PENDING_18D`, `BLOCKED_EXTERNAL` or
`UNSAFE_PRODUCTION_TEST` as `PASS`.

Minimum journeys:
- Anonymous: home/language hub/public Library/community/SEO basics.
- New User: register/verify/login/onboarding/profile.
- Learner: hub filters, community, AI basic practice, XP.
- Contributor: correction/answer, Library contribution/review outcome, reputation.
- Language Buddy: opt-in/discovery/request/accept/block/report.
- Member: pricing/checkout/payment result/entitlement/expiry display.
- Moderator: report queue/content action.
- Admin: role-safe management/audit/reconciliation.
- Notification/realtime reconnect and speaking/event if enabled.

Cross-cutting: responsive matrix, keyboard/accessibility, security negative tests, migration/backup restore, deploy health and log/alert verification.
