# Phase 18 — UAT, Seed Data & Production Launch

## Current demo release disposition - 2026-10-06

[Monitoring activation and final demo closeout](../../evidence/phase-18/PHASE-18-MONITORING-AND-DEMO-CLOSEOUT-2026-10-06.md) is the current
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
