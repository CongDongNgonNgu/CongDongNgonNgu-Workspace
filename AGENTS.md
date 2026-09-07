# AGENTS.md — CongDongNgonNgu Delivery Rules

CongDongNgonNgu.vn is an independent Global Language Community. EduAI is a technical reference only; never treat this product as EduAI with another logo.

## Mandatory execution loop
Read this file, project state, dependency graph and current phase. Inspect real source, confirm dependencies, implement the smallest maintainable change, verify, review diff, commit with Conventional Commits, push, verify remote/CI, and update Workspace evidence. Stop and record genuine blockers; never fabricate credentials, provider access, UAT or production evidence.

Allowed states: `PLANNED`, `READY`, `IN_PROGRESS`, `BLOCKED_INTERNAL`, `BLOCKED_EXTERNAL`, `VERIFYING`, `DONE`, `DEFERRED`, `CANCELLED`.

DONE requires all applicable gates: implemented, tested, responsive verified, accessibility checked, security reviewed, documented, committed, pushed and CI verified. Otherwise use VERIFYING.

## EduAI reuse policy
Classify each area as `KEEP`, `ADAPT`, `REMOVE`, `BUILD_NEW` or `DEFER`. Reuse proven technical foundations only after source audit. Never share databases, OAuth apps, JWT secrets, payment credentials, AI credentials, analytics IDs or production endpoints. Remove LMS/course assumptions and stale EduAI branding/config.

## UI DESIGN POLICY — STITCH MCP REQUIRED
For any new user-facing page, global shell surface or substantial redesign, Codex MUST use Stitch through MCP before implementation.

Flow: `requirements → inspect current components/tokens/neighbouring pages → prompt Stitch → review → refine → implement with project-native reusable components → responsive/a11y verification → visual regression`.

Do not design the whole app in one Stitch prompt. Split Header, Footer, page body, mobile composition and complex widgets. Reject/refine results that resemble EduAI/Talkpal, look like generic AI/admin dashboards, overuse rounded cards/huge heroes/gradients/bold text, merely stack desktop on mobile, or weaken accessibility/information hierarchy.

Design character: open, social, multicultural, friendly, modern, human, learning-focused. Verify major surfaces at 320, 375, 390, 412, 768, 1024 and 1440 px.

## Product principles
Community value before paywalls; Free remains useful. AI augments people. Human contribution and verified language data are long-term assets. Open data requires provenance/license/attribution. Privacy, safety, moderation and accessibility are product requirements. Avoid addictive ranking and membership dark patterns. Language catalog is extensible. “Vietnamese for the World” is first-class.

## Security
Never commit secrets. Treat auth, account linking, payments, webhooks, uploads, moderation and admin as sensitive. Fail closed on ambiguous provider/identity/payment states. Do not expose private contact details by default. Do not record/retain voice by default without explicit consent.

## Git policy
After each independent verified task: inspect diff, exclude unrelated files, run tests, fix regressions, commit descriptively, push automatically to the authorized branch, verify remote SHA, check CI and update Workspace evidence.

Examples: `feat(language-profile): add multilingual onboarding`, `feat(community): implement correction requests`, `feat(ai): add writing coach workflow`, `fix(auth): harden refresh-token rotation`.
