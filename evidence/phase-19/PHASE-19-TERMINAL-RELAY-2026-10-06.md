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

## Policy integration and first runtime exercise

[PR #109](https://github.com/CongDongNgonNgu/CongDongNgonNgu-Workspace/pull/109)
merged at `c7e4c6c53a5037c7fe27d0d0eed33f47252e922d`. Feature
`d7ba4ed9037b211d661580d4ffd74b4aadfb668c` remote SHA verified; quality run
37432422989 PASS; post-merge run 37432492448 PASS. Independent read-only policy
review approved with no findings. Local main synchronized, commit ancestry
verified and remote/local `phase-19-terminal-relay-orchestration` deleted/pruned.

Browser relay used the confirmed Chrome CongDongNgonNgu project conversation
“Tiếp tục ngữ cảnh dự án”. The sanitized 19A BLOCKED_EXTERNAL report was sent;
the UI showed it as a user message and the new assistant generation. Its
complete response finished before extraction. The primary code-block Copy
control returned 25,064 characters beginning “CongDongNgonNgu — PHASE 19A
RECOVERY” and ending in section 35's final NEXT_ACTION field. No marker-based
or truncated-response fallback was used. CHATGPT_RESPONSE_COMPLETE=YES;
NEXT_PROMPT_SOURCE=CODE_BLOCK; NEXT_PROMPT_RECEIVED=YES.

Manual semantic validation PASS: same project/Phase 19, no feature selection,
missing evidence preserved, no production SQL/raw export/instrumentation or
activation, no new credentials/provider/account, no privacy/security weakening,
no Phase 20. Safe execution requires source inventory, exact metrics, blank
templates, proposed observation/suppression choices and owner decisions; its
production prohibitions are explicit. NEXT_PROMPT_HARD_STOP_REQUIRED=NO for
these planning artifacts. It cannot authorize later data collection by itself.

Recovery was automatically executed through read-only source inspection and
Workspace documents; no .env or user data accessed. The acquisition plan,
source map, inactive gap design and template are not actual evidence. 19A stays
BLOCKED_EXTERNAL. The recovery result must be relayed again after its own
normal merge/CI/cleanup gates; that second relay is not claimed yet here.

Recovery local validation PASS: 12/12 monitor tests, syntax, 14 added local
links, 46 exact Backend source paths, credential-pattern scan and diff whitespace.
Independent source/metric review identified ledger timestamp, session/login,
exchange-history and abbreviated-reference issues; all corrected and re-reviewed
PASS with no remaining findings. Live learning/challenge producers explicitly
remain NOT_ESTABLISHED. Self/security/privacy review PASS for documents only.
No application test/build or production/data acquisition PASS is claimed.
