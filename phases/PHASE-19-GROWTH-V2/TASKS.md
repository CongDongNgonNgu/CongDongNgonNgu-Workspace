# Phase 19 Tasks

## LNG-19-001 — Post-Launch Evidence Review
**Status:** PLANNED  
**Depends on:** Phase 18

Review privacy-safe product metrics, user feedback, moderation/safety data, AI cost/usefulness, Library growth/verification, active language hubs, exchange completion, membership conversion/churn and support issues. Identify problems/opportunities rather than starting from feature hype.

## LNG-19-002 — Pronunciation & Speech Discovery
**Depends on:** LNG-19-001

Evaluate speech recognition/pronunciation providers, language coverage, accent fairness, latency/cost, consent/retention and scoring validity. Research Common Voice/current open dataset terms from authoritative sources before any use. Prototype only in isolated environment; do not market unsupported “accuracy scores”.

## LNG-19-003 — Expert/Teacher Economy Discovery
**Depends on:** LNG-19-001

Assess expert verification, workshop/tutoring marketplace, payouts/commission, disputes/refunds, moderation, tax/legal and scheduling needs. Keep EXPERT role distinct from admin. No payment marketplace build until operational/legal model is approved.

## LNG-19-004 — Groups, Private Communities & Organization Spaces
**Depends on:** LNG-19-001

Determine need for study groups/private communities/schools/organizations based on usage. Define membership/privacy/moderation/admin boundaries, content ownership and billing before schema implementation.

## LNG-19-005 — Native Mobile / Wrapper Decision
**Depends on:** Phase 16 PWA evidence, LNG-19-001

Compare PWA gaps vs React Native/native wrapper needs: push notifications, audio/background behavior, app links, stores, offline and OAuth. Produce ADR with cost/benefit and migration plan; do not fork business logic unnecessarily.

## LNG-19-006 — Multilingual Product UI
**Depends on:** LNG-19-001

If foreign-user demand supports it, implement localization infrastructure and prioritized UI locales separately from learning-language content. Externalize strings, formatting, pluralization/date/time and directionality; never infer UI language solely from learning target.

## LNG-19-007 — Recommendation ML Discovery
**Depends on:** sufficient trustworthy interaction data

Define clear recommendation problem, offline/online evaluation, privacy/fairness and simple heuristic baseline. Do not deploy ML because it sounds advanced. Compare against Phase 05/07 deterministic relevance/matching.

## LNG-19-008 — Knowledge Graph & RAG V2
**Depends on:** mature Phase 08 corpus

Design graph relationships among language, concept, sentence, translation, grammar, topic, contributor, provenance and review confidence. RAG must preserve authorization/provenance/citations and evaluate hallucination/retrieval quality against a baseline.

## LNG-19-009 — V2 Portfolio Prioritization
**Depends on:** LNG-19-001..008 discovery as selected

For each candidate record `BUILD_NEXT`, `EXPERIMENT`, `DEFER` or `REJECT`, expected outcome, effort/risk, dependencies and release metrics. Create new phases/epics for approved work rather than turning this discovery file into an endless implementation task.
