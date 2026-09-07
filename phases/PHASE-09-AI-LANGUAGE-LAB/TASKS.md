# Phase 09 Tasks

## LNG-09-001 — AI Provider & Usage Architecture
**Status:** PLANNED  
**Depends on:** Phase 08 and Phase 02 identity

Define provider adapter(s), model capability config, timeout/retry strategy, streaming if justified, token/cost accounting, per-user/entitlement quota interface, rate limits and provider-disabled behavior. Do not leak provider keys to frontend. Store minimum necessary prompt/session metadata with privacy-safe logs.

## LNG-09-002 — Learner Context & Prompt Contracts
**Depends on:** LNG-09-001, Phase 03

Build versioned prompt contracts using target language, proficiency, goals and requested mode. Prevent user profile content from becoming hidden system instruction. Define output schemas where structured corrections/quiz material are required; validate model output before persistence/rendering.

## LNG-09-003 — AI Conversation Mode
**Depends on:** LNG-09-001, LNG-09-002

Use Stitch for conversation workspace. AI adapts vocabulary/complexity to learner level, can explain on request and maintains bounded session context. Provide stop/retry/error/rate-limit states. Do not falsely claim human/native review.

## LNG-09-004 — Writing Coach
**Depends on:** LNG-09-002

Input user writing and return structured correction, explanation, natural alternative and level-aware notes. Reuse accessible diff presentation from Phase 06 where appropriate. Make generated nature visible; saving to Library requires review, not automatic verification.

## LNG-09-005 — Grammar Coach
**Depends on:** LNG-09-002

Explain errors and generate focused follow-up practice rather than only returning answers. Support target-language explanations and optional Vietnamese explanation where product/localization permits. Validate generated exercise structure and answer reveal flow.

## LNG-09-006 — Roleplay Mode
**Depends on:** LNG-09-002, LNG-09-003

Implement configurable scenarios rather than eight hard-coded pages. Each scenario defines context, roles, learner level, goals and safe boundaries. Provide session goal/progress and post-session feedback without fake precise scoring.

## LNG-09-007 — Learn from Community/Library
**Depends on:** Phase 08, Phase 05

From permitted public/owned content, generate vocabulary, grammar notes, questions, mini quiz and speaking prompts. Retrieval/context must preserve source IDs/attribution and exclude private/rejected/moderation-hidden items. Display links back to source where appropriate.

## LNG-09-008 — AI Safety, Cost & Reconciliation
**Depends on:** LNG-09-001..007

Test prompt injection boundaries around retrieved content, output parsing failure, provider outage, timeout, rate/quota exhaustion, duplicate/retry charges, private-content leakage and cost accounting. Complete responsive/a11y/visual, commit/CI and handoff evidence.
