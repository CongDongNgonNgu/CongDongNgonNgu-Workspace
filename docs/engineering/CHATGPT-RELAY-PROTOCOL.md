# ChatGPT relay protocol

Status: accepted for the CongDongNgonNgu workflow orchestrator.

The relay sends only sanitized subphase handoffs to the already-confirmed
CongDongNgonNgu ChatGPT conversation. It never includes secrets, credentials,
tokens, connection strings, or `DATABASE_URL`.

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
