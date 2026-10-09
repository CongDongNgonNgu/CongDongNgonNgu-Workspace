# Frozen category readiness contract — Phase25A

2026-10-09 Asia/Saigon. Scope: Language Hub navigation to established canonical journeys or intentional in-page deferral; no new learning content. Historical pre-implementation freeze: reviewed/merged via PR145. Final authoritative classification and runtime evidence: [category matrix](CATEGORY-READINESS.md) / [acceptance](ACCEPTANCE.md); baseline pending/NOT_RUN rows below remain historical.

## Classification and content truth

READY requires final end-to-end gates, not schema/fixtures/screenshots alone. IMPLEMENTABLE below means an approved actual product path exists but Phase25 navigation/acceptance remains pending. No approved populated per-language inventory has been observed; do not claim one. An approved original-author contribution → rights/license acknowledgement → moderation → PUBLIC/ACTIVE/VERIFIED → canonical public read is a real approved content path; empty inventory is a supported truthful outcome. No fixtures establish content readiness.

| Category | Current Hub state | Canonical route/API and model | Approved path / final target |
|---|---|---|---|
| Vocabulary | disabled NOT_IMPLEMENTED, no href | /library?language={code}&type=VOCABULARY → /library/{id}; GET library/resources, detail; typed library vocabulary | IMPLEMENTABLE: approved original-author contributor model; source/license/review on canonical detail; no populated inventory assertion |
| Grammar | disabled NOT_IMPLEMENTED, no href | Library GRAMMAR_ITEM schema/detail exists; community contribution policy excludes grammar | DEFERRED_WITH_BLOCKER: NO_APPROVED_GRAMMAR_CONTENT_SOURCE; gate APPROVED_GRAMMAR_SOURCE_AND_RIGHTS_PLUS_REVIEWED_PUBLIC_RECORDS_AND_ACCEPTED_JOURNEY |
| Sentences | disabled NOT_IMPLEMENTED, no href | /library?language={code}&type=SENTENCE → detail/related DIRECT_TRANSLATION; typed sentence/translation | IMPLEMENTABLE: approved original-author contribution path; no automatic Tatoeba ingestion or inferred translations |
| Pronunciation | disabled NOT_IMPLEMENTED, no href | Library PRONUNCIATION only phonetic/notes; no approved audio/playback | DEFERRED_WITH_BLOCKER: NO_APPROVED_AUDIO_SOURCE_OR_PLAYBACK_PATH; gate APPROVED_AUDIO_RIGHTS_AND_RESOURCE_BINDING_PLUS_PLAYBACK_AND_ACCESSIBILITY_TESTS; scoring also retains LNG19 speech benchmark/provider/consent gate |
| Resources | disabled NOT_IMPLEMENTED, no href | /library?language={code}; canonical public resources/provenance/licenses/relations | IMPLEMENTABLE: inherit Phase23 canonical eligibility/source/license/current-read; no duplicate resource domain |
| Community | disabled NOT_IMPLEMENTED, no href | /community?languageCode={code}; language-filtered public posts/detail | IMPLEMENTABLE: existing moderated community journey, user contributions remain user content; no search/filter redesign |
| Q&A | disabled NOT_IMPLEMENTED, no href | /community/ask/question → current auth gate/question/detail/answers | IMPLEMENTABLE: existing question creation journey; route is not a language-prefilled/question-only feed; no unsupported postType filter |
| Practice | disabled NOT_IMPLEMENTED, no href | existing AI/provider practice is not approved non-AI reviewed exercise inventory | DEFERRED_WITH_BLOCKER: NO_APPROVED_NON_AI_PRACTICE_CONTENT_PATH; gate APPROVED_EXERCISE_SOURCE_AND_RIGHTS_PLUS_REVIEWED_CONTENT_AND_TESTED_NON_AI_PRACTICE_JOURNEY |
| Exchange | disabled NOT_IMPLEMENTED, no href | /exchange → existing auth gate/discovery/profile | IMPLEMENTABLE: Phase24 accepted route; no claim URL applies unsupported language filter; no friend/chat/realtime work |

All currently use /languages/{slug} generic Hub. Placeholder source: Frontend LanguageHubPage SectionNavigation disabled buttons/Sắp có; HubMetrics unavailable values; LanguageResourcePreview false empty inventory; LanguageFutureEntrypoints obsolete capability-disabled cards. Backend language-hub.contract.ts always returns static scaffold capabilities; these are presentation planning metadata, not authorization. Phase25 Frontend navigation adapter will bind only audited canonical routes; all data/auth/eligibility remain server enforced. Backend response/schema need not change; no UI category readiness inferred from arbitrary server hrefs or counts.

## Metric contract

LEARNERS=OMITTED; CONTRIBUTORS=OMITTED; RESOURCES=OMITTED. Existing Overview API values are all NOT_AVAILABLE_YET/null with no aggregate query. Exact learner/contributor definitions, actor exclusion, privacy purpose, efficient eligible query and approved count contract do not exist. Do not derive totals from one page, count profile declarations, count private actors or fabricate zeros. Numeric reentry requires approved definitions, privacy/eligibility/synthetic exclusions, authoritative bounded aggregate queries and regression tests. Hub explanatory copy links to current journeys and explains reviewed-content availability without numbers.

## Filters, localization, responsive and state journeys

Canonical Library supports language/type/topic/single CEFR, lexical q and bounded cursor pagination. Hub current multi-level selector has no content query; replace it with a single-level optional Library-context filter and explain that filters apply to Library links only. Old multi-level direct URLs retain their URL but must explicitly prompt single selection rather than silently selecting/dropping levels. No CEFR/topics invented. Direct Library URL list/detail uses existing loading/empty/error/retry/current-read/source/license behavior.

Use accepted UiLocaleProvider, storage key, catalogs, locale formatting; add paired hub domain keys only. All changed Hub copy/labels/loading/error/metadata must use vi/en. Canonical language codes, UGC and source/license texts stay intact. Preserve current Hub shell/tokens/CSS ownership; no substantial new page/redesign. Deferred nav anchors lead to labelled explanatory panels, remain keyboard reachable and expose no false data controls. Test seven widths and long copy, page overflow, nav scroll/focus, direct URL/back-forward and locale state.

## Source evidence and inherited limits

Backend src/profile/language-hub.contract.ts:76/99; src/library/library.types.ts:10/24/321; src/library/library.controller.ts:173/181; src/library/library.service.ts:389/413/422/661/770/830; database/migrations/0009_open_language_library.sql; src/community/community.dto.ts:76; src/corrections/corrections.controller.ts:59/72/98; existing src/exchange/exchange.controller.ts. Frontend src/App.tsx:72–86; LibraryExplorerPage/readFilters/useLibrarySearch; LibraryResourceDetailPage/LibraryRelatedResources; CommunityPage languageCode; CommunityQuestionRequestPage auth; PartnerDiscoveryPage auth/local filters. Independent Backend audit 2026-10-09 confirms no additional schema/API needed.

Phase21 HANDOFF/FROZEN-CONTRACT: deterministic reviewed one-hop, no semantic generation, canonical source/licensing/current-read, safe abstention. Phase23 RELATION-CONTRACT/HANDOFF/BACKEND-EVIDENCE: public current eligible resources and verified directed translations; synthetic89 scope cleaned residualzero, no actual corpus claim. Phase24 HANDOFF: existing provider/localization/auth/profile/exchange unchanged. Historical23B inheritance only, not separate execution. Human linguistic review and real-user value remain unproven; screen reader NOT_RUN unless actually run.

## Verification required

001 independent contract review + Workspace gates/CI/merge/cleanup/relay. 002/003 regression-first tests for canonical routes/filter scope/deferred explanation/metrics/vi-en/stale responses; focused and full Frontend tests/typecheck/lint/build/audit/performance; affected Backend Phase21/23 and existing eligibility tests; independent review. 004 exact-mainVercelTEST, actual public Backend read/payment observation, isolated browser fixture mechanics with explicit synthetic limits, Phase23/24 regressions and seven-width/accessibility/navigation gates; no false live authenticated backend claim. Backend deployment NOT_APPLICABLE_BACKEND_UNCHANGED. No DB/schema/migration/write required. No fixture DB residual introduced. No production/payment/provider/corpus operation authorized.

## Explicit baseline locale/responsive inventory (before implementation)

| Category | Hub vi/en baseline | Canonical target vi/en baseline | Current filter/list/detail/empty/error/source state | Phase25 widths baseline |
|---|---|---|---|---|
| Vocabulary | VI hardcoded; EN missing | Library localized through LNG19 | Single language/type/CEFR/topic/q; bounded cursor list/detail; existing loading/empty/error/source/license | All seven NOT_RUN |
| Grammar | VI hardcoded; EN missing | Localized Library schema/detail infrastructure, no approved grammar content path | Deferred; no inventory claim or working lessons | All seven NOT_RUN |
| Sentences | VI hardcoded; EN missing | Localized Library | Same canonical filters/states; explicit DIRECT_TRANSLATION current-reviewed related detail | All seven NOT_RUN |
| Pronunciation | VI hardcoded; EN missing | No approved licensed audio/playback journey | Deferred; text subtype alone not audio readiness | All seven NOT_RUN |
| Resources | VI hardcoded; EN missing | Localized canonical Library and Related Resources | Public search/detail/loading/empty/error/source/license/current-read | All seven NOT_RUN |
| Community | VI hardcoded; EN missing | Existing Community copy predominantly hardcoded Vietnamese; full English not accepted | Public languageCode feed/detail, existing loading/empty/error; UGC is not licensed learning material | All seven NOT_RUN |
| Q&A | VI hardcoded; EN missing | Existing authenticated question/editor/answer copy hardcoded Vietnamese; full English not accepted | Auth redirect/catalog/create/detail/answers; no language-prefill contract | All seven NOT_RUN |
| Practice | VI hardcoded; EN missing | No approved non-AI exercise path | Deferred; provider experiments do not prove reviewed content readiness | All seven NOT_RUN |
| Exchange | VI hardcoded; EN missing | Phase24 accepted localized browse/profile/auth | Auth gate/local filters/pagination/profile; no unsupported URL filter | All seven NOT_RUN |

Prior phase widths/tests are inherited evidence only; Phase25 checks remain NOT_RUN before execution. Localizing Hub links never localizes target Community/Q&A pages. If their canonical English target acceptance is not completed in this scope, final category readiness must retain an explicit EN_TARGET_UI_NOT_ACCEPTED blocker/reentry gate rather than promote fully bilingual READY. Existing working links can still be exposed with truthful boundary copy; this is route integration, not Community interaction redesign.
