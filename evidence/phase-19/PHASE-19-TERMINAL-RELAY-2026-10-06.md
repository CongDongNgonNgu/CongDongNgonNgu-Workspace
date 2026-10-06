# Phase 19 terminal relay correction — 2026-10-06

Owner explicitly requires relay at DONE, BLOCKED_EXTERNAL, BLOCKED, PARTIAL
and FAILED, followed by next/recovery prompt validation and safe same-phase
execution. This supersedes the DONE-only wording; hard human stops remain.

Baseline Workspace local/remote main was clean at
`922bd861afaadeaab4a04f502d56294f11705867`. The configured Chrome project
conversation was confirmed by its CongDongNgonNgu project URL, visible Phase
19 history and this exact owner request. No message has been sent at the time
of this initial record; runtime exercise follows the governance PR merge.

Changed existing AGENTS execution loop, CODEX-WORKING-RULES section 10,
CHATGPT-RELAY-PROTOCOL and current PROJECT-STATE flags. The extraction contract
remains CODE_BLOCK_V1. Terminal outcomes remain distinct from the canonical
task state vocabulary; BLOCKED_INTERNAL may report BLOCKED without changing
its task status. Safe work still requires normal PR/CI/cleanup; blocked or
failed application work is not automatically mergeable.

19A / LNG-19-001 remains BLOCKED_EXTERNAL with
POST_LAUNCH_PRODUCT_EVIDENCE_UNAVAILABLE. No features or new product evidence
are invented. Backend/Frontend, monitoring, payment and production are unchanged.
Phase 19 DONE=NO; Phase 20 STARTED=NO; production mutation NO; real money 0.

Validation required: scoped diff, policy/state consistency across all five
terminal outcomes, local Markdown links, credential-pattern scan, whitespace,
Workspace syntax/12 monitor tests, self-review and normal PR/post-merge CI.
After merge: send current 19A terminal report, obtain the entire response,
validate same project/Phase 19 and hard stops, execute safe recovery or report
the exact unresolved human dependency. Runtime relay is not claimed from
documentation inspection alone; follow-up evidence records observed results.

Observed local gates: Node syntax PASS, 12/12 monitor tests PASS, diff whitespace
PASS, added-line credential-pattern scan PASS and five-outcome policy/state
consistency PASS across all four governance/state documents. Self-review PASS:
no task lifecycle vocabulary expansion, evidence waiver, runtime/dependency
change or production/provider permission added. Application build/typecheck/
lint/runtime gates are N/A for this documentation-only correction.
