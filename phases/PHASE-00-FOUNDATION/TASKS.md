# Phase 00 Tasks

## LNG-00-001 — Audit EduAI Backend
**Status:** DONE
**Repositories:** EduAI Back-End (read/reference), Workspace  
**Goal:** inspect real source and classify modules/files as `KEEP`, `ADAPT`, `REMOVE`, `BUILD_NEW`, `DEFER`.

Requirements:
- Inventory NestJS modules, Prisma schema/migrations, auth/session/OAuth, notifications/realtime, AI, commerce/PayOS, rewards, admin/moderation/audit, course/certificate/career/mentor and shared infrastructure.
- For each candidate reuse area record source paths, dependencies, security assumptions, environment variables, tests and reason for classification.
- Explicitly identify EduAI-specific database entities/routes/config/seeds that must not survive.
- Note security-hardened payment/auth behavior worth adapting without assuming it can be copied unchanged.

Acceptance/evidence: committed audit matrix in Workspace; no runtime changes in EduAI.

## LNG-00-002 — Audit EduAI Frontend
**Status:** DONE
**Depends on:** LNG-00-001 only for shared terminology, not execution.  
**Repositories:** EduAI Front-End (reference), Workspace

Inspect routes, auth providers/guards, API client, error boundaries, forms, notification/PWA infrastructure, responsive utilities, tests/Playwright/visual config and design-system coupling. Classify reuse with paths/rationale. Identify all EduAI branding/course UI that must not define the new design.

## LNG-00-003 — Bootstrap CongDongNgonNgu Backend
**Status:** DONE
**Depends on:** LNG-00-001  
**Repositories:** CongDongNgonNgu-Back-End

Requirements:
- Establish the chosen technical baseline from audited code, preserving repository history boundaries.
- Remove/disable unsupported LMS domains instead of leaving live dead routes.
- Rename package/app identifiers and safe config names.
- Create independent `.env.example`; never copy real secrets.
- Ensure database/provider URLs cannot silently default to EduAI production.
- Preserve only migrations/schema required by the approved bootstrap; new language schema waits for later phases.
- Build and tests pass.

## LNG-00-004 — Bootstrap CongDongNgonNgu Frontend
**Status:** DONE
**Depends on:** LNG-00-002  
**Repositories:** CongDongNgonNgu-Front-End-Web

Requirements:
- Reuse technical shell/build/testing utilities only as approved.
- Replace package/app metadata and remove EduAI domains, assets, course-specific routes and production API defaults.
- Keep a neutral temporary shell; do not visually rebrand EduAI and call it complete.
- Preserve robust auth/API/test plumbing only where compatible.
- Build/unit baseline passes.

## LNG-00-005 — Environment & Secret Separation
**Status:** DONE
**Depends on:** LNG-00-003, LNG-00-004

Define independent CongDongNgonNgu variables for database, JWT/session, OAuth, AI, payment, email/storage/realtime and frontend API origins. Add fail-closed validation for missing sensitive provider config where appropriate. Confirm no copied credentials, Firebase project IDs, PayOS keys or EduAI production URLs are committed.

## LNG-00-006 — Initial CI & Repository Hygiene
**Status:** DONE
**Depends on:** LNG-00-003, LNG-00-004

Add/verify CI for install, build, type/lint where supported and tests; keep lockfiles deterministic; exclude local logs/artifacts; document branch/deploy assumptions without deploying production.

## LNG-00-007 — Foundation Reconciliation
**Status:** PLANNED  
**Depends on:** LNG-00-001..006

Search both new repos for `EduAI`, old domains, course-specific identifiers and unsafe default endpoints; classify intentional historical references vs leaks. Run full baseline gates, push all commits, update Phase handoff and mark Phase 00 complete only with reproducible evidence.
