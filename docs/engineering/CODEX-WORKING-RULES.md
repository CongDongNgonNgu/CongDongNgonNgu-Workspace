# Codex Working Rules

These rules make a fresh Codex session deterministic. Do not depend on remembered context from a previous chat or coding session; reconstruct the task from repository state and evidence every time.

## 1. Startup contract
Before editing code, Codex MUST:
1. Read root `AGENTS.md`.
2. Read `state/PROJECT-STATE.md` and `state/DEPENDENCY-GRAPH.md`.
3. Identify the current phase and the next eligible task from that phase's `TASKS.md`.
4. Read that phase's `README.md`, `ACCEPTANCE.md`, `TEST-PLAN.md`, and `UI-STITCH.md` when applicable.
5. Read the target repository's `AGENTS.md` when present. If it is absent, confirm that and continue under the Workspace baseline.
6. Read the domain architecture document required by the task. Frontend tasks MUST read `docs/engineering/FRONTEND-ARCHITECTURE.md`.
7. Inspect real source, tests, configuration, git status, recent relevant changes, and current implementation before deciding what to change.

No task is exempt merely because these references are not repeated in its task paragraph.

## 2. Task selection and dependency discipline
- Do not redo work already marked DONE or already present in source unless verification proves it incomplete.
- Do not start a blocked downstream phase merely because work appears technically possible; follow `state/DEPENDENCY-GRAPH.md` and accepted dependency exceptions in `state/DECISIONS.md`.
- Keep a task within its stated scope. Do not silently broaden a refactor into a redesign, schema change, deployment, provider configuration, or unrelated cleanup.
- When multiple independent tasks are allowed inside one phase, finish and verify each independently before claiming the aggregate phase complete.

## 3. Source-first implementation
- Inspect the current implementation before proposing architecture.
- Prefer established project patterns over introducing a second pattern for the same responsibility.
- Reuse shared primitives only when their semantics actually match; do not force reuse that makes ownership less clear.
- Make the smallest maintainable change that satisfies acceptance.
- Delete dead imports, dead styles, duplicate helpers, and obsolete compatibility code only when safe and within scope.
- Never fabricate secrets, credentials, provider responses, production data, screenshots, CI output, test output, or deployment evidence.

## 4. Architecture conformance gate
Tests passing is necessary but not sufficient.

Before completion, explicitly review whether the change follows the relevant architecture baseline. For frontend work this includes component/style ownership, page responsibility, hook/service/domain separation, shared primitive use, responsive behavior, accessibility, and avoidance of new monoliths.

If a task requires violating the current architecture baseline, record the reason and create/update an accepted decision before normalizing that exception. Do not silently establish a new convention by accident.

## 5. UI and Stitch
For a new user-facing page, global shell surface, or substantial redesign, follow the Stitch MCP policy in root `AGENTS.md` and the current phase's `UI-STITCH.md`.

A refactor whose acceptance explicitly requires no visible behavior/design change should preserve the current approved UI and normally does not require a new Stitch run.

## 6. Verification
Run every applicable repository gate before completion. For the current frontend baseline:

```text
npm run lint
npm run typecheck
npm test -- --run
npm run build
npm audit --audit-level=high
```

Also run task-specific tests and responsive/accessibility/visual checks required by the phase. Never report a gate as passing unless it actually ran successfully in the relevant environment or verified CI.

## 7. Git and CI
For each independent verified task:
- inspect the final diff and exclude unrelated changes;
- use a descriptive Conventional Commit;
- push to the authorized branch;
- verify the remote SHA;
- wait for required CI and fix failures before merge/completion;
- prefer a PR for substantial cross-file refactors or architecture work;
- do not merge a red or still-running required CI result merely to advance phase state.

## 8. Evidence and state
Update phase evidence/HANDOFF only with facts that were actually observed. Keep `state/PROJECT-STATE.md` concise and use it for canonical state, not verbose logs.

A task may be `DONE` only when all applicable acceptance, architecture, verification, git, CI, and evidence gates are satisfied. Otherwise use `VERIFYING` or an appropriate BLOCKED state.

## 9. Conflict handling
Workspace engineering policy is the cross-repository baseline. Target-repository `AGENTS.md` may add stricter local rules. If current documents conflict materially, do not guess which architecture to follow; record the conflict and request/obtain an explicit decision.

## 10. Standing global orchestration authorization

The following standing human-owner authorization is persistent for all
current and future project phases/subphases from Phase 12 onward until the
human owner explicitly revokes or changes it:

```text
GLOBAL_ORCHESTRATION_AUTHORIZATION=ACTIVE
SOURCE_CONTROL_AUTONOMY=AUTHORIZED
BROWSER_RELAY_AUTONOMY=AUTHORIZED
ROUTINE_PUSH_PR_MERGE_PERMISSION_PROMPTS=DISABLED
HARD_HUMAN_STOPS=REQUIRED
```

While this policy is active, Codex may autonomously perform the normal
phase lifecycle inside authoritative Workspace scope: inspect dependencies,
create or stack short-lived branches, implement, test, review, remediate
ordinary defects, commit, push, create/update PRs, observe and rerun CI,
merge only after authoritative gates and branch protection pass, update and
publish Workspace evidence/state, verify remote `main` and post-merge CI,
clean merged branches, synchronize local `main`, and send sanitized
handoffs through the established browser relay. Routine permission prompts
for push, publish, PR, merge, evidence/state sync, remote-main verification,
post-merge CI, branch cleanup, and browser relay are disabled while the
policy remains active.

This authorization is bounded by all of the following:

- The work must be inside the current authoritative phase/subphase scope and
  dependency order.
- Required tests, review, acceptance gates, CI, and branch protection must
  pass; none may be bypassed.
- Local, deterministic fixtures, test adapters, mocks, and approved
  sandbox/test environments are allowed under project policy.
- A migration file may be created when explicitly required by task scope and
  accompanied by the project-required tests/rollback; it must not be
  executed against production automatically.
- Provider abstractions and adapters may be implemented with fake, test, or
  sandbox fixtures, but this does not authorize live delivery or activation.

The following remain hard human stops regardless of this standing
authorization. Stop with `HUMAN_AUTHORIZATION_REQUIRED=<exact action>` for
production deployment or restart; production database writes or migrations;
destructive database, schema, data, infrastructure, or DNS operations;
real-money payment or live provider/merchant activation; paid service
activation, spending, purchasing, external account or credential creation;
secret rotation or production secret/environment mutation; security-policy
weakening; bypassing mandatory tests, CI, or branch protection; force merge,
force push, or shared-history rewriting; and unapproved mutation of
authoritative financial facts.

For each future major phase, read the complete authoritative scope first,
decompose it into meaningful dependency-ordered subphases, and run each
subphase through its complete lifecycle. Relay only a completed subphase or
a genuine hard blocker. After the final subphase, run the phase final gate,
cross-phase regression/security/privacy checks, evidence reconciliation,
merge closeout, branch cleanup, and repository synchronization. Stop before
implementing the next major phase unless starting that phase has been
explicitly authorized. A policy-only update does not start the next
subphase; the current machine-readable project state remains authoritative.

Browser relay may use the existing confirmed Chrome/ChatGPT session to send
sanitized handoffs, wait for the response, retrieve the primary code block
containing the next Codex prompt, and execute it. Do not expose secrets or
unsanitized credentials. Retry relay failures boundedly; report a blocker
only after those retries genuinely fail.
