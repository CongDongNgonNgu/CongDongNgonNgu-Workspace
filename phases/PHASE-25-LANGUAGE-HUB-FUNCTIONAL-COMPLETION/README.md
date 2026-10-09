# Phase 25 — Language Hub Functional Completion

**Status:** IN_PROGRESS — explicit owner full Phase25 authorization 2026-10-09
**Roadmap:** `../../docs/V3-ROADMAP.md`

## Objective

Turn the visible Language Hub from a partially placeholder experience into a coherent learning hub where every category either has a real end-to-end user journey or an explicit evidence-backed blocker/re-entry gate.

This phase is the forward V3 home for the product intent that remained in historical Phase23B. Historical Phase23B is inherited by this owner-authorized Phase25 stream and is not executed separately; preserve historical evidence.

## Authorized subphases

### LNG-25-001 — Category inventory & readiness contract
- Audit every Language Hub tab and Overview metric against current source/runtime.
- Classify: READY / IMPLEMENTABLE / DEFERRED_WITH_BLOCKER.
- Freeze canonical category/data/provenance/license/publication contracts.
- Inventory current `Sắp có`, `Chưa khả dụng`, dead routes and empty placeholders.

### LNG-25-002 — Core learning categories
Complete the real journeys for applicable:
- Vocabulary / Từ vựng
- Grammar / Ngữ pháp
- Sentences / Mẫu câu
- Resources / Tài nguyên

Each category must cover real source/provenance/license, eligibility/publication, list/detail or equivalent complete journey, filters where justified, loading/empty/error states and vi/en UI.

### LNG-25-003 — Remaining Language Hub surfaces
Audit/complete:
- Pronunciation / Phát âm under existing audio/speech re-entry gates;
- Community / Hỏi đáp / Luyện tập / Trao đổi links so they route to actual working product journeys rather than duplicate or dead placeholders;
- Overview counts such as learners/contributors/resources only when backed by an approved real aggregate contract. Otherwise replace misleading `Chưa khả dụng` presentation with truthful product copy.

### LNG-25-004 — Runtime/browser acceptance & closeout
- vi/en
- widths 320/375/390/412/768/1024/1440
- direct URL/back-forward
- source/license/provenance
- no fabricated category readiness
- exact-main TEST deployment evidence
- regressions for Phase23 Library/Related Resources and Phase24 localization.

## Acceptance

Phase 25 may close only when:
- no accepted category remains visually `Sắp có` if a complete real path is technically available and authorized;
- every remaining unavailable category has a documented blocker and measurable re-entry gate;
- Overview metrics are real, intentionally omitted, or truthfully described — never fabricated;
- no mock/seed/demo-only record is used to claim product readiness;
- existing public-resource eligibility/provenance/license contracts remain intact;
- production mutation/payment activation remains absent.

## Test plan

Focused category tests, full Frontend/Backend affected regressions, DB/query tests if schema changes are required, browser acceptance at seven widths in vi/en, empty/error/source-invalid cases, route/navigation regression, accessibility bounded checks and TEST fixture cleanup.

## Out of scope

- Friend requests/chat/realtime communication (Phase 26)
- Community interaction redesign/group chat (Phase 27)
- Full-system persona simulation (Phase 28)
- AI-generated lessons or silent corpus generation
- Payment/production activation

## Exit verdict

`GO_BOUNDED_LANGUAGE_HUB` / `DEFER` / `REJECT`
