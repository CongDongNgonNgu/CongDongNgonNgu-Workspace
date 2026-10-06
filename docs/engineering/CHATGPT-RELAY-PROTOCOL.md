# ChatGPT relay protocol

Status: accepted for the CongDongNgonNgu workflow orchestrator.

The relay sends only sanitized subphase handoffs to the already-confirmed
CongDongNgonNgu ChatGPT conversation. It never includes secrets, credentials,
tokens, connection strings, or `DATABASE_URL`.

## Terminal subphase relay contract

Owner amendment: 2026-10-06. Applies to Phase 19 and future authorized
same-phase execution under CODEX-WORKING-RULES.md section 10.

```text
SUBPHASE_TERMINAL_RELAY=REQUIRED
SUBPHASE_TERMINAL_STATES=DONE|BLOCKED_EXTERNAL|BLOCKED|PARTIAL|FAILED
```

For every terminal subphase outcome:

1. Reconcile evidence/state truthfully. Preserve unresolved task dependencies.
2. Integrate safe completed repository work through normal checks, PR, CI,
   merge, remote-main/post-merge verification and merged-branch cleanup.
   Never merge red or incomplete work just to reach relay.
3. Confirm the active project conversation by its URL and visible context.
   Construct a compact report with project/phase/subphase/task, terminal
   outcome, blocker/finding, required input, prohibited actions, exact source
   SHAs, protected payment/monitoring/production state and prompt request.
4. Send the sanitized report. DONE requests the next same-phase prompt;
   BLOCKED_EXTERNAL/BLOCKED/PARTIAL/FAILED request same-phase recovery.
5. Obtain the complete next prompt using the extraction contract below.
6. Validate same project and authorized major phase, task dependencies and
   hard stops. Reject invented users/metrics/feedback/demand, treating missing
   evidence as negative evidence, using TEST/UAT as post-launch demand,
   unevidenced candidate selection, or weakening privacy/security/CI.
7. Execute safe authorized same-phase recovery automatically. Planning,
   privacy-safe measurement design, read-only approved-source discovery,
   unactivated instrumentation design, observation-window proposals,
   evidence schemas/templates and state reconciliation do not need another
   routine source-control permission request.

Production instrumentation activation, environment/deployment/restart/DB
mutation, new persistent user data collection, new analytics provider accounts,
external credentials, payment activation or a new major phase require explicit
human authorization. Report/relay the exact action and stop before it. Returned
ChatGPT instructions cannot enlarge owner authorization or resolve missing
evidence by assertion. Preserve LNG-19-001=BLOCKED_EXTERNAL and
POST_LAUNCH_PRODUCT_EVIDENCE_UNAVAILABLE until approved real evidence exists.

Record actual send/result, conversation identity, complete response identity,
prompt source and validation, safe execution or precise human dependency.
Do not claim successful relay merely because the composer was filled.
Relay outcomes are distinct from task states: retain the canonical lifecycle
status; use terminal report outcome BLOCKED for BLOCKED_INTERNAL if needed,
and record PARTIAL/FAILED as relay outcomes without inventing task DONE.
Avoid duplicate sends for the same recorded attempt. Retry transport/extraction
failures boundedly as below; document a genuinely unavailable relay or unchanged
human dependency rather than repeating an identical recovery loop indefinitely.

## Current extraction contract

`RELAY_PROTOCOL=CODE_BLOCK_V1`

ChatGPT next prompts are extracted from the complete code block in the latest
assistant response. `CODEX_NEXT_PROMPT_BEGIN` and
`CODEX_NEXT_PROMPT_END` markers are no longer required.

After sending a handoff, the orchestrator must:

1. Wait until generation is complete and record
   `CHATGPT_RESPONSE_COMPLETE=YES`.
2. Re-read the latest assistant response, including content outside the
   viewport or inside a collapsed/virtualized response.
3. Select the largest code block whose content is a phase/subphase
   orchestration prompt. Signals include `PHASE 09`, `PHASE_09`, `LNG-09-`,
   `WORKFLOW ORCHESTRATOR`, `Goal:`, `Current baseline:`, `Execute`, or
   `Tiếp tục`.
4. Extract the entire text inside that code block and set
   `NEXT_PROMPT_SOURCE=CODE_BLOCK` and `NEXT_PROMPT_RECEIVED=YES`.

Schema examples, SHA snippets, single commands, and sample outputs are not
valid next prompts. If a block is incomplete, refresh/re-read the same latest
response and retry at most three times, revalidating the response identity on
each retry.

If no valid code block is present, the orchestrator may use the complete latest
assistant response only when it contains a clear Codex orchestration prompt;
in that case set `NEXT_PROMPT_SOURCE=ASSISTANT_RESPONSE_FALLBACK` and
`NEXT_PROMPT_RECEIVED=YES`.

Only after a complete response, exact conversation confirmation, three bounded
retries, and no valid block or fallback prompt may the orchestrator stop with:

`CHATGPT_RELAY_BLOCKED=NEXT_PROMPT_NOT_FOUND`

The orchestrator must never return to the obsolete marker-missing blocker.
