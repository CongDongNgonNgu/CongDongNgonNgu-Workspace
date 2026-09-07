# Phase 00 — Foundation & EduAI Domain Separation

## Goal
Create independent CongDongNgonNgu frontend/backend baselines by auditing EduAI at source level, reusing only proven technical foundations and removing LMS-specific domain, branding and runtime coupling.

## Entry criteria
- Workspace initialized and Phase 00 is `READY`.
- Access exists to both CongDongNgonNgu implementation repos and EduAI reference repos.

## Outcomes
- Audited `KEEP / ADAPT / REMOVE / BUILD_NEW / DEFER` matrices for frontend and backend.
- Independent frontend/backend bootstrap with no EduAI production runtime dependency.
- Independent environment/config contracts and initial CI/test baseline.
- Architecture notes identifying retained technical patterns and discarded LMS assumptions.

## Non-goals
Do not implement Language Hub, Community, AI Lab, payment membership UX or major product UI. Do not copy production secrets/data.

## Completion gate
All tasks in `TASKS.md` DONE; build/test/CI baseline green; environment separation verified; no accidental EduAI branding/runtime calls; bootstrap commits pushed in both implementation repos; Workspace evidence updated.
