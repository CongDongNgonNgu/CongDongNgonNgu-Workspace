# Phase 18 — UAT, Seed Data & Production Launch

## Current demo release disposition - 2026-10-06

[Controlled Frontend production acceptance](../../evidence/phase-18/PHASE-18-FRONTEND-PRODUCTION-ACCEPTANCE-2026-10-06.md) is the current
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

## Goal
Prove complete user journeys with realistic, safe UAT data and production-like deployment evidence before declaring launch readiness.

## Required personas
Anonymous, New User, Learner, Contributor, Language Buddy, Member, Moderator and Admin. Seed accounts/data must be dedicated to approved UAT environments and never expose real user credentials.

## Representative content
Language profiles, posts/comments, correction/Q&A, Library resources/review, matches/connections, notifications, AI sessions, reputation, membership/payment sandbox evidence, speaking/event data where enabled.

## Production completion gates
`BUILD PASS`, `TEST PASS`, `SECURITY PASS`, `RESPONSIVE PASS`, `ACCESSIBILITY PASS`, `UAT PASS`, `PAYMENT PASS`, `BACKUP VERIFIED`, `OBSERVABILITY READY`.

## Completion gate
Every applicable journey has reproducible evidence or a formally approved non-applicable/blocked classification; deployment/backups/monitoring/payment and rollback readiness are verified; production smoke is safe; commits/CI/deploy evidence complete.
