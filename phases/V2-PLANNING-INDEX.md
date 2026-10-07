# V2 Phase Planning Dossiers

Current execution addendum — 2026-10-07: owner START_PHASE_20=YES authorizes
only Phase 20. Its [evidence](PHASE-20-STUDY-GROUP-AUTH-EXPERIMENT/EVIDENCE.md)
supersedes the original creation-time planning-only flags below for that phase.
Phase 20 reviewed verdict is GO; Phase 20 is DONE. Phase 22 is technically
eligible, subject to inherited gates and separate owner authorization.
Phases 21–24 remain PLANNED, unstarted and without execution authorization.

Owner planning authorization recorded on 2026-10-07 (Asia/Ho_Chi_Minh): create durable planning dossiers for all currently planned V2 phases 20 through 24.

This authorization is **planning-only**. It does not start a phase, authorize implementation, mutate application repositories, authorize production actions, or bypass any entry gate in `docs/V2-ROADMAP.md`, `state/DEPENDENCY-GRAPH.md`, `state/TASK-STATE-SCHEMA.md`, root `AGENTS.md`, or `docs/engineering/CODEX-WORKING-RULES.md`.

```text
V2_PHASE_DOSSIERS_AUTHORIZED=YES
V2_PHASE_DOSSIERS_CREATED=20,21,22,23,24
PHASE_EXECUTION_AUTHORIZED=NO
NO_NEW_PHASE_STARTED=YES
APPLICATION_CODE_CHANGE_AUTHORIZED=NO_BY_THIS_RECORD
PRODUCTION_MUTATION_AUTHORIZED=NO_BY_THIS_RECORD
```

## Dossier map

| Phase | Dossier | Planning state | Execution gate |
|---|---|---|---|
| 20 | [Scoped Study Group Policy & Authorization Experiment](PHASE-20-STUDY-GROUP-AUTH-EXPERIMENT/README.md) | DONE | Reviewed GO; verdict PR/main CI and cleanup PASS |
| 21 | [Provenance-Safe Relational Retrieval Experiment](PHASE-21-RELATIONAL-RETRIEVAL-EXPERIMENT/README.md) | PLANNED | Explicit phase authorization plus frozen reviewed benchmark |
| 22 | [Bounded Text Study Groups](PHASE-22-BOUNDED-TEXT-STUDY-GROUPS/README.md) | PLANNED | Phase 20 `GO` plus separate phase authorization |
| 23 | [Verified Related-Resource Library Journey](PHASE-23-RELATED-RESOURCE-LIBRARY/README.md) | PLANNED | Phase 21 `GO` plus separate phase authorization |
| 24 | [Member Onboarding & Language Exchange Localization](PHASE-24-MEMBER-EXCHANGE-LOCALIZATION/README.md) | PLANNED | Separate phase authorization plus approved bounded copy inventory |

## How to use these dossiers

Each dossier contains the standard operational files expected by the Codex startup contract: `README.md`, `TASKS.md`, `ACCEPTANCE.md`, and `TEST-PLAN.md`. User-facing phases also carry `UI-STITCH.md` where UI policy needs to be explicit. Phase-specific planning artifacts capture the authorization matrix, threat model, benchmark, policy contract, relation contract, or copy inventory.

At dossier creation all tasks were intentionally `PLANNED`. Current task states
and observed results are in each authorized phase's task/evidence files. A
planning dossier alone proves no code, fixture, deployment or real-user result.

The authoritative product ordering and cross-phase dependency semantics remain `docs/V2-ROADMAP.md`. These dossiers refine that roadmap; they do not supersede Phase 19 history or completed `LNG-19-006` evidence.
