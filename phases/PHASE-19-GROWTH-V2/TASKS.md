# Phase 19 Tasks

## Current owner-amended disposition - 2026-10-06

[SCOPE-AMENDMENT.md](SCOPE-AMENDMENT.md) and [DECOMPOSITION.md](DECOMPOSITION.md) supersede post-launch dependencies. Canonical lifecycle follows state/TASK-STATE-SCHEMA.md. DONE means discovery acceptance/integration, not feature deployment or proven demand.

## LNG-19-001 - Post-Launch Evidence Review
**Status:** CANCELLED
**Disposition:** SUPERSEDED_BY_OWNER_PRE_LAUNCH_SCOPE
**Depends on:** Phase 18

Original review required post-launch usage/learning/feedback/moderation/AI/Library/hub/exchange/membership/support observations. These do not exist meaningfully before real-user launch. POST_LAUNCH_PRODUCT_EVIDENCE_UNAVAILABLE=EXPECTED_PRE_LAUNCH, not zero demand or a failed review. No evidence collected and no PASS/DONE claim. Historical inventory/designs retained.

## LNG-19-002 — Pronunciation & Speech Discovery
**Status:** VERIFYING
**Depends on:** accepted pre-launch scope amendment

Evaluate speech recognition/pronunciation providers, language coverage, accent fairness, latency/cost, consent/retention and scoring validity. Research Common Voice/current open dataset terms from authoritative sources before any use. Prototype only in isolated environment; do not market unsupported “accuracy scores”.

## LNG-19-003 — Expert/Teacher Economy Discovery
**Status:** VERIFYING
**Depends on:** accepted pre-launch scope amendment

Assess expert verification, workshop/tutoring marketplace, payouts/commission, disputes/refunds, moderation, tax/legal and scheduling needs. Keep EXPERT role distinct from admin. No payment marketplace build until operational/legal model is approved.

## LNG-19-004 — Groups, Private Communities & Organization Spaces
**Status:** VERIFYING
**Depends on:** accepted pre-launch scope amendment

Determine need for study groups/private communities/schools/organizations as a pre-launch product-value hypothesis. Define membership/privacy/moderation/admin boundaries, content ownership and billing before schema implementation.

## LNG-19-005 — Native Mobile / Wrapper Decision
**Status:** VERIFYING
**Depends on:** Phase 16 PWA evidence, accepted pre-launch scope amendment

Compare PWA gaps vs React Native/native wrapper needs: push notifications, audio/background behavior, app links, stores, offline and OAuth. Produce ADR with cost/benefit and migration plan; do not fork business logic unnecessarily.

## LNG-19-006 — Multilingual Product UI
**Status:** VERIFYING
**Depends on:** accepted pre-launch scope amendment

Design localization infrastructure and prioritized UI locale options; no implementation or proven demand claim separately from learning-language content. Externalize strings, formatting, pluralization/date/time and directionality; never infer UI language solely from learning target.

## LNG-19-007 — Recommendation ML Discovery
**Status:** VERIFYING
**Depends on:** scope amendment for design; trustworthy interaction data before deployed ML

Define clear recommendation problem, offline/online evaluation, privacy/fairness and simple heuristic baseline. Do not deploy ML because it sounds advanced. Compare against Phase 05/07 deterministic relevance/matching.

## LNG-19-008 — Knowledge Graph & RAG V2
**Status:** VERIFYING
**Depends on:** Phase 08 source contracts for design; mature licensed/reviewed corpus before production RAG

Design graph relationships among language, concept, sentence, translation, grammar, topic, contributor, provenance and review confidence. RAG must preserve authorization/provenance/citations and evaluate hallucination/retrieval quality against a baseline.

## LNG-19-009 — V2 Portfolio Prioritization
**Status:** PLANNED
**Depends on:** completed LNG-19-002 through LNG-19-008 pre-launch discoveries

For each candidate record `BUILD_NEXT`, `EXPERIMENT`, `DEFER` or `REJECT`, expected outcome, effort/risk, dependencies and release metrics. Record separate proposed implementation/release scope for future approved work. Do not create/start a new phase/epic until authorized. BUILD_NEXT is owner direction plus technical evidence, not proven demand.

## 19B discovery artifacts
[Discovery index](DISCOVERY-INDEX.md) links all seven assessments; future implementation is not shipped by these task states. 009 stays PLANNED until integration gates pass.
