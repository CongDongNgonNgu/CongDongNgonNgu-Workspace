# Deployment & Environment Principles

CongDongNgonNgu environments are independent from EduAI. Never point new code at EduAI production services for convenience.

Secrets belong in environment/secret stores; `.env.example` contains names and safe examples only. Separate runtime and migration database privileges where supported.

Phase 00 establishes baseline CI for build, type/lint where applicable and tests. Later phases add E2E, security and visual gates. Deployment must be reproducible from committed source.

Database changes use reviewed migrations, forward-compatible rollout where feasible, backup/restore planning and an explicit production migration procedure. Destructive changes require a data/rollback plan.

Feature flags may gate risky providers or phased rollout; they must not become permanent architecture substitutes.

Phase 18 cannot complete until build, test, security, responsive, accessibility, UAT, payment, backup and observability gates have evidence.
