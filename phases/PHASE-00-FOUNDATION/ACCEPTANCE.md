# Phase 00 Acceptance

Phase 00 is accepted only when:
- Backend and frontend audit matrices exist with source paths and `KEEP/ADAPT/REMOVE/BUILD_NEW/DEFER` rationale.
- New repos are independently buildable and testable.
- No new runtime relies on EduAI production database/API/OAuth/payment/AI configuration.
- No real secret or production credential was copied.
- EduAI product branding/course assumptions are removed from active new-app surfaces/routes or explicitly documented as temporary technical debt with no user exposure.
- CI baseline exists or an evidence-backed blocker is recorded.
- Full repo search/reconciliation is completed.
- Each implementation task has commit SHA + push confirmation; CI status recorded when available.

Reject completion if “clone succeeded” is the only evidence, if dead LMS routes remain reachable, or if environment defaults can accidentally target EduAI.
