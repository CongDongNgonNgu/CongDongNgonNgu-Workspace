# LNG-25-002 core journey evidence

2026-10-09. Vocabulary, Sentences and Resources bind to the existing canonical Library list/detail/related journey. Approved original-author contributions use the existing rights/license acknowledgement and moderation workflow; public eligibility remains PUBLIC/ACTIVE/VERIFIED with current provenance/license/source checks. No Backend, schema, content import or provider change. Real populated per-language inventory is not established.

## Implementation

Frontend candidate 2c481dee3b37ad59466edb132b27f5a87ed7cd6a; PR31. Audited navigation adapter ignores scaffolding availability metadata only for the three frozen core routes. Language/type/topic and one CEFR level propagate to Library links; legacy multi-level URLs explicitly require a single choice and omit the unsupported filter. Core chrome uses paired existing-provider vi/en catalog keys. Async request ownership and effect cleanup prevent old language responses restoring stale links. The contribution entry opens the established authenticated submission journey, without claiming language-prefill.

Grammar retains NO_APPROVED_GRAMMAR_CONTENT_SOURCE and the frozen source/rights/reviewed-public-record/accepted-journey gate. Remaining categories, old metrics and non-core Hub localization await LNG-25-003; none are represented as completed by this subphase.

## Verification

- Frontend full: 104 files, 477 tests PASS. Final cleanup-focused rerun: 3 files, 19 tests PASS; typecheck PASS. Lint/build/performance PASS; npm audit zero vulnerabilities. Initial JS 425036 raw/126307 gzip bytes; CSS 67251 raw/11039 gzip bytes.
- Backend unchanged: Library 40 unit suites/361 tests PASS; Library 4 integration suites/29 tests and Phase21 2 integration suites/34 tests PASS. Windows npm pipe parsing failed before the combined integration invocation; corrected separate patterns both passed. No DB-connected migration or fixture command ran.
- Runtime harness: 20 checks, vi/en × seven widths (320/375/390/412/768/1024/1440), 14 screenshots, no page errors or external requests. Local synthetic canonical list/detail/source/license and empty sentence mechanics passed. Synthetic fixture lists do not enforce CEFR/topic: results prove URL propagation, not Backend filtering or actual corpus readiness. Backend regression tests provide filter/current-eligibility coverage.
- Harness fixture server closed, browser closed, in-memory residual zero; no database records created. Generated artifacts stay ignored.
- Independent review: APPROVE final bounded candidate. Confirmed cleanup invalidation, canonical routes, paired localization, no fabricated inventory and synthetic evidence limits.

## Integration

PR/main/deployment/cleanup evidence will be recorded after normal CI integration. LNG-25-004 owns final exact-main TEST and complete Hub acceptance. No production or payment action.

PR31 merged to Frontend main 3a600adc4adbc3dd55bf74ad3a66d4fdef09f2c5. PR quality run37881836014 and main run37882015646 SUCCESS. Candidate ancestry verified; local main synced; temporary remote/local branch deleted and references pruned. Workspace contract PR145/main58e074be1abbb1fec4e13f308926fb459b50d203/mainCI37880625990 SUCCESS and branch cleanup complete.
