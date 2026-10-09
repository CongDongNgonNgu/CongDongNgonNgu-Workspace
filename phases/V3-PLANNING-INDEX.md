# V3 Planning Index

**Status:** PLANNED ONLY — NOT EXECUTION AUTHORIZATION  
**Recorded:** 2026-10-09 (Asia/Ho_Chi_Minh)  
**Predecessor:** Phase 24 DONE / GO_BOUNDED_LOCALIZATION

This index turns `docs/V3-ROADMAP.md` into concrete phase dossiers. It does not authorize implementation. Each major phase still requires explicit owner authorization before execution.

## Planned phases

| Order | Phase | Dossier | Purpose |
|---|---|---|---|
| 1 | 25 | [Language Hub Functional Completion](PHASE-25-LANGUAGE-HUB-FUNCTIONAL-COMPLETION/README.md) | Remove visible dead ends and complete real learning-category journeys or explicit evidence-backed blockers |
| 2 | 26 | [Member Connection & Communication](PHASE-26-MEMBER-CONNECTION-COMMUNICATION/README.md) | Find partner → connect → chat 1:1 → share learning context → ask for help |
| 3 | 27 | [Community & Collaborative Learning Completion](PHASE-27-COMMUNITY-COLLABORATIVE-LEARNING/README.md) | Search/filter Community, simplify discussion/answer UX, structured-answer replies, group collaboration/realtime |
| 4 | 28 | [Codex Full-System User Simulation](PHASE-28-CODEX-FULL-SYSTEM-SIMULATION/README.md) | Multi-account, multi-persona, vi/en, responsive, realtime, failure/reconnect end-to-end validation |
| 5 | 29 | [Pre-Launch Hardening](PHASE-29-PRE-LAUNCH-HARDENING/README.md) | Security, observability, performance, accessibility, recovery and operational readiness |

## Dependency order

`25 -> 26 -> 27 -> 28 -> 29`

This order is intentional: full-system simulation belongs after the user-facing communication and collaboration loops exist.

## Historical Phase23B handling

The historical Phase23B category-completion scope remains **PLANNED_UNSTARTED**. Phase 25 is the forward V3 execution home for that product intent if and only if Phase 25 is later authorized. Do not execute both scopes independently or double-count completion.

## Common boundaries

- Payment remains disabled unless separately authorized.
- No production DB mutation, production migration, DNS/infrastructure change, production secret change or real-money action is authorized by this planning record.
- No real-user-value claim may be inferred from synthetic/Codex testing.
- Phase 22 private-group authorization and Phase 23 public-resource eligibility/provenance/license contracts must not be weakened.
- Phase 24 localization architecture must be reused, not reimplemented.
- No Phase 30 or later roadmap is authorized here.
