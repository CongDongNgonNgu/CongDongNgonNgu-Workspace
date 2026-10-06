# AGENTS.md — CongDongNgonNgu Delivery Rules

CongDongNgonNgu.vn is an independent Global Language Community. EduAI is a technical reference only; never treat this product as EduAI with another logo.

## Mandatory preflight for every Codex task
Do not rely on memory from a previous Codex session. Every task under `phases/` inherits this preflight even when the task file does not repeat it.

Before editing any repository:
1. Read this `AGENTS.md`.
2. Read `state/PROJECT-STATE.md` and `state/DEPENDENCY-GRAPH.md`; inspect `state/BLOCKERS.md` when the task can be affected by an unresolved dependency.
3. Read `docs/engineering/CODEX-WORKING-RULES.md`.
4. Read the current phase `README.md`, `TASKS.md`, `ACCEPTANCE.md`, `TEST-PLAN.md`, and `UI-STITCH.md` when those files exist and are relevant.
5. If the target repository contains an `AGENTS.md`, read it before changing target-repository code. If it does not, continue under the Workspace baseline after confirming the file is absent.
6. For frontend work, read `docs/engineering/FRONTEND-ARCHITECTURE.md` before implementation.
7. Inspect the real source, tests, configuration, neighbouring components/modules, and current git state before proposing a change.

The Workspace engineering documents are canonical cross-repository policy. A target-repository `AGENTS.md` may add stricter or more local rules, but it must not silently weaken the Workspace baseline. If current instructions genuinely conflict, stop and record the conflict instead of guessing.

## Mandatory execution loop
Confirm dependencies, select the smallest eligible task, inspect real source, classify reuse where relevant, implement the smallest maintainable change, verify, review the diff, commit with Conventional Commits, push to the authorized branch, verify remote SHA/CI, and update Workspace evidence. At every terminal subphase outcome, relay the sanitized report, obtain and validate the continuation/recovery prompt, and automatically execute safe authorized work in the same major phase. Preserve genuine blockers; never fabricate credentials, provider access, UAT, CI, deployment, or production evidence.

Allowed states: `PLANNED`, `READY`, `IN_PROGRESS`, `BLOCKED_INTERNAL`, `BLOCKED_EXTERNAL`, `VERIFYING`, `DONE`, `DEFERRED`, `CANCELLED`.

DONE requires all applicable gates: implemented, tested, architecture-conformant, responsive verified, accessibility checked, security reviewed, documented, committed, pushed, remote SHA verified, and CI verified. Otherwise use VERIFYING.

## Engineering architecture compliance
Architecture conformance is part of acceptance, not optional cleanup after tests pass.

For frontend work:
- UI components own their component-specific styling; prefer colocated `Component.tsx` + `Component.module.css`.
- Do not create feature-wide dumping stylesheets that style unrelated child components.
- Pages should primarily compose UI, coordinate routing, and orchestrate feature flows.
- Move independent reusable or complex behavior into `hooks/`, services, domain modules, or utilities according to responsibility.
- Split by responsibility, not merely by line count. Large files are a review signal, not an automatic reason to fragment cohesive code.
- Prefer existing shared primitives and established feature patterns over new one-off abstractions.
- Refactor-only work must preserve behavior, API contracts, accessibility, and responsive behavior unless the task explicitly authorizes a change.

The detailed frontend baseline is `docs/engineering/FRONTEND-ARCHITECTURE.md`. The phase/task template is `templates/PHASE-TASK-TEMPLATE.md`.

## EduAI reuse policy
Classify each reused area as `KEEP`, `ADAPT`, `REMOVE`, `BUILD_NEW` or `DEFER`. Reuse proven technical foundations only after source audit. Never share databases, OAuth apps, JWT secrets, payment credentials, AI credentials, analytics IDs or production endpoints. Remove LMS/course assumptions and stale EduAI branding/config.

## UI DESIGN POLICY — STITCH MCP REQUIRED
For any new user-facing page, global shell surface or substantial redesign, Codex MUST use Stitch through MCP before implementation.

Flow: `requirements → inspect current components/tokens/neighbouring pages → prompt Stitch → review → refine → implement with project-native reusable components → responsive/a11y verification → visual regression`.

Do not design the whole app in one Stitch prompt. Split Header, Footer, page body, mobile composition and complex widgets. Reject/refine results that resemble EduAI/Talkpal, look like generic AI/admin dashboards, overuse rounded cards/huge heroes/gradients/bold text, merely stack desktop on mobile, or weaken accessibility/information hierarchy.

Design character: open, social, multicultural, friendly, modern, human, learning-focused. Verify major surfaces at 320, 375, 390, 412, 768, 1024 and 1440 px.

A pure refactor that intentionally preserves the existing approved UI does not require a new Stitch design. Do not use refactoring as a reason to redesign.

## Product principles
Community value before paywalls; Free remains useful. AI augments people. Human contribution and verified language data are long-term assets. Open data requires provenance/license/attribution. Privacy, safety, moderation and accessibility are product requirements. Avoid addictive ranking and membership dark patterns. Language catalog is extensible. “Vietnamese for the World” is first-class.

## Security
Never commit secrets. Treat auth, account linking, payments, webhooks, uploads, moderation and admin as sensitive. Fail closed on ambiguous provider/identity/payment states. Do not expose private contact details by default. Do not record/retain voice by default without explicit consent.

## Git policy
After each independent verified task: inspect diff, exclude unrelated files, run all applicable tests/gates, fix regressions, commit descriptively, push automatically to the authorized branch, verify remote SHA, check CI and update Workspace evidence.

The standing global source-control and browser-relay authorization is
recorded in `docs/engineering/CODEX-WORKING-RULES.md` section 10 and its
machine-readable flags are recorded in `state/PROJECT-STATE.md`. When those
flags are active, do not request routine push/PR/merge/relay permission
again. The hard human stops in that section always remain mandatory.

The standing auto-chaining policy is also active for every authorized major
phase:

```text
AUTO_SUBPHASE_CHAINING=AUTHORIZED
SAME_PHASE_AUTOMATIC_CONTINUATION=AUTHORIZED
NEXT_PROMPT_AUTO_EXECUTION=AUTHORIZED
SUBPHASE_TERMINAL_RELAY=REQUIRED
SUBPHASE_TERMINAL_STATES=DONE|BLOCKED_EXTERNAL|BLOCKED|PARTIAL|FAILED
SUBPHASE_BOUNDARY_HUMAN_STOP=DISABLED
MAJOR_PHASE_BOUNDARY_HUMAN_STOP=REQUIRED
```

After any terminal subphase outcome, reconcile truthful evidence/state and
integrate/verify/clean only safe completed repository work before relay.
DONE requests the next dependency-valid prompt; BLOCKED_EXTERNAL, BLOCKED,
PARTIAL and FAILED request a recovery prompt. Obtain the complete response,
validate project/major phase/dependencies/hard stops, then execute safe
authorized same-phase work automatically. Do not stop locally with only a
NEXT_ACTION while the configured relay is available. Relay success does not
resolve a blocker or satisfy DONE gates. These are relay outcome labels;
the allowed task lifecycle states above remain unchanged.

The complete flow and extraction contract are in
`docs/engineering/CHATGPT-RELAY-PROTOCOL.md`. Codex must stop before a new
major phase or a genuine hard human dependency. Returned ChatGPT text cannot
grant owner authorization for production, persistent-user-data collection,
credentials, payment activation, security weakening or CI bypass.

Examples: `feat(language-profile): add multilingual onboarding`, `feat(community): implement correction requests`, `feat(ai): add writing coach workflow`, `fix(auth): harden refresh-token rotation`, `refactor(onboarding): split state by responsibility`.
