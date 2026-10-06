# Phase 19 — Growth V2 execution plan

Owner authorization: `START_PHASE_19=YES`, 2026-10-06 (Asia/Saigon).
Scope remains the existing README, TASKS, ACCEPTANCE and TEST-PLAN. This plan
normalizes their dependencies; it does not approve any candidate feature build.

## 19A — Post-Launch Evidence Review

Owns LNG-19-001. Inventory existing evidence, separate TEST/UAT and operational
availability from product outcomes, review privacy-safe post-launch aggregates
and feedback, and identify evidenced user problems and candidate relevance.

Acceptance: dated observation window, environment/cohort and seed/test exclusions,
source provenance, metric denominators, qualitative limitations, privacy review,
and an evidence-grounded problem/opportunity assessment. Missing observations
remain UNKNOWN; no usage, demand or corpus maturity is inferred from passing UAT.
Verification: trace every conclusion to the supplied evidence; review for PII,
secrets and re-identification; run Workspace quality gates and normal PR/CI flow.
Current external dependency: the post-launch evidence package is unavailable.
Repository inventory can proceed; LNG-19-001 cannot be marked DONE yet.

## 19B — Evidence-selected V2 candidate discovery

Owns LNG-19-002 through LNG-19-008 **only as selected by the 19A review**.
Preserve the exact individual task requirements: speech/pronunciation,
expert/teacher economy, groups/organizations, PWA/native decision, multilingual
UI, recommendation ML, and knowledge graph/RAG. Each selected candidate gets
its own problem, metric, risk/licensing/privacy review, architecture decision,
implementation/release plan and any bounded experiment evidence.

Dependencies: LNG-19-001 for 002–006; Phase 16 PWA evidence also for 005;
sufficient trustworthy interaction data for 007; mature Phase 08 corpus for 008.
The evidence review does not waive those additional data gates.
Verification: task-specific acceptance and TEST-PLAN; current authoritative
dataset/provider terms before use; proportional prototype tests; PR/CI/evidence.
No candidate is selected in this bootstrap. No prototype, schema, provider or
UI change is justified while the evidence dependency remains unresolved.

## 19C — V2 Portfolio Prioritization

Owns LNG-19-009 after 001 and selected 002–008 discoveries. Record BUILD_NEXT,
EXPERIMENT, DEFER or REJECT with outcome, effort/risk, dependencies and release
metrics. Unselected items may remain DEFERRED with an evidenced rationale.
Verification: all decisions trace to evidence and selected discovery artifacts;
each promoted initiative has its implementation/release criteria; normal CI,
merge, remote verification and branch cleanup complete before phase closeout.

The task's future-phase/epic creation is limited by the current owner instruction:
record Phase 19 portfolio decisions only. Do not create a Phase 20 branch,
implementation or planning mutation without new explicit authorization.

## Lifecycle and protected boundaries

Every eligible subphase follows discovery, baseline, implementation/artifacts,
targeted verification, relevant regression, self/security/privacy review,
permitted runtime acceptance, evidence, commit, push, PR, passing CI, merge,
remote-main/post-merge verification, cleanup and Workspace state update.
Continue automatically within Phase 19 when dependencies permit.

Production mutations, production DB writes/migrations, credentials, provider
selection/activation, paid accounts, real money and security/CI bypass remain
hard stops. Payment stays disabled. The production monitor stays active at
15-minute cadence with GitHub Issue alerts. The demo-data backup waiver does
not authorize persistent real-user data collection or generalize to such data.
