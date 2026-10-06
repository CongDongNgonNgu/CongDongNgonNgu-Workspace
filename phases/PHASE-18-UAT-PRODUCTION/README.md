# Phase 18 — UAT, Seed Data & Production Launch

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
