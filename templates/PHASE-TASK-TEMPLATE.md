# Phase Task Template

Use this template when adding a new task or substantial subtask to a phase. Existing phase tasks inherit root `AGENTS.md` and `docs/engineering/CODEX-WORKING-RULES.md` even if they predate this template.

```md
## LNG-XX-YYY — Task title
**Status:** READY
**Depends on:** <task/phase dependencies>
**Target repo(s):** <Frontend / Backend / Workspace>
**Architecture baseline:** <relevant canonical doc path>
**Architecture conformance required:** YES

### Mandatory preflight
Before implementation:
1. Read `/AGENTS.md` in Workspace.
2. Read `/state/PROJECT-STATE.md` and `/state/DEPENDENCY-GRAPH.md`.
3. Read `/docs/engineering/CODEX-WORKING-RULES.md`.
4. Read this phase's `README.md`, `TASKS.md`, `ACCEPTANCE.md`, `TEST-PLAN.md`, and `UI-STITCH.md` when applicable.
5. Read the target repository's `AGENTS.md`.
6. For frontend work, read `/docs/engineering/FRONTEND-ARCHITECTURE.md`.
7. Inspect the real source, tests, config, neighbouring code, and git state before editing.

### Goal
<What user/product outcome this task must deliver.>

### In scope
- <required change>
- <required change>

### Out of scope
- <explicitly excluded redesign/schema/deployment/etc.>

### Implementation constraints
- Preserve established architecture and existing contracts unless the task explicitly changes them.
- Make the smallest maintainable change.
- Do not introduce a competing architecture when an established project pattern already fits.
- For refactor-only work, preserve UI behavior, accessibility, responsive behavior, routes, API contracts, and storage semantics.
- For substantial new UI/redesign, follow the Stitch MCP policy before implementation.

### Architecture acceptance
The task is NOT complete if any applicable item remains true:
- component-specific CSS is placed in a mixed feature-wide dumping stylesheet;
- a page accumulates unrelated UI, API, persistence, browser-history, validation, and mapping responsibilities;
- complex reusable React behavior is embedded in rendering code instead of a coherent hook/service/module;
- pure domain transforms are unnecessarily coupled to React;
- an existing shared primitive/pattern is duplicated without reason;
- a refactor changes behavior merely to make tests pass;
- a new architecture exception is introduced without an explicit recorded decision.

### Functional acceptance
- <observable acceptance criterion>
- <observable acceptance criterion>

### Verification
Run focused tests plus every applicable repository gate. Frontend baseline:

```text
npm run lint
npm run typecheck
npm test -- --run
npm run build
npm audit --audit-level=high
```

Add phase-specific responsive, accessibility, security, integration, migration, E2E, visual, or deployment checks here.

### Evidence required
Record only observed evidence:
- changed files / relevant commit SHA;
- test and build results;
- CI run and conclusion;
- responsive/a11y/visual evidence when required;
- remote SHA confirmation;
- blocker details if not complete.

### Completion rule
Use `DONE` only after implementation, architecture review, all applicable verification, commit/push, remote verification, CI, and evidence are complete. Otherwise use `VERIFYING` or an appropriate BLOCKED state.
```
