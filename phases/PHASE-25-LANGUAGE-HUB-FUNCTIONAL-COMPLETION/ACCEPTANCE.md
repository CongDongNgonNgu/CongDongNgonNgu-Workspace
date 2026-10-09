# LNG-25-004 final acceptance

2026-10-09, TEST only. Final exact Frontend main58ea2686fb0e805eb483d9f53e10e94d139b9420; normal PR31/32/33, mainCI37884551574 PASS, all merged frontend branches cleaned. Provider UI independently shows exact main Ready dpl_E2fNWYJmH1Ex5g597nyuYJ5Zo3jx on established TEST origin. SHA in harness is metadata, not deployment proof. Backend remains a2640cd7d734f088987fb32b89efc5cbf40e954e. No application edits after this deployment.

## Passed gates

| Gate | Result / evidence boundary |
|---|---|
| Hub final browser | PASS260 checks,14 screenshots, vi/en ×320/375/390/412/768/1024/1440 |
| Actual public Hub |14 paired width/locale layouts,10semantic category links,140 per-link keyboard focus-visible/outline/full-horizontal-visibility assertions; no page overflow |
| Actual navigation | Deferred heading focus/repeated activation; locale switch/reload; Community languageCode feed, Q&A auth route-state handoff, Exchange auth gate; back/forward;6canonical Library200GET/filter URLs. No live authenticated submission |
| Actual metrics/payment | No fake numeric Hub cards/unexplained coming-soon states; public catalog available=false/qr=false/provider=null |
| Separate synthetic Library/Hub |14width/locale list/detail/source/license/empty layouts, Hub loading/error/retry and404/403 fail-closed detail/ineligible-list mechanics. Original fixture records explicitly synthetic; not corpus or Backend query proof |
| Bounded accessibility |14 main-region axe runs,0violations. Incomplete contrast cases retained/reviewed: decorative aria-hidden arrows; clipped scroll-nav text computed ratio≥4.5 with alpha handling. No unresolved incomplete cases. Keyboard full-link visibility/heading focus passed. Screen-reader NOT_RUN; no native/pixel certification |
| Mobile regression | Isolated168checks/14screenshots PASS includes all140navfocus cases; pageErrors/external0 |
| Phase24 member regression | Deployed assets/synthetic API adapter584checks/28screenshots PASS; external/pageErrors0. Auth/session/profile/filters/UGC/locale/failure behavior mechanics only, no live-auth Backend proof |
| Actual public regression |113checks PASS, public auth surfaces/locale/disabled payment, no account submission or private user reads |
| Frontend tests | Focused23 tests; full104files/481tests PASS |
| Frontend gates | Typecheck/lint/build/performance PASS; npm audit0. InitialJS431219raw/127889gzip; CSS67251raw/11039gzip bytes |
| Backend unchanged source | Library40unit suites361tests PASS; Library4integration suites29 +Phase21 2integration suites34 PASS (63focusedintegration). Previously run during002 at exact unchanged BackendSHA, reused; not full Backend suite |
| Workspace | Monitor syntax/test12PASS, both new acceptance script syntax PASS, diff-check PASS; final PR/mainCI/cleanup recorded in closeout PR |
| Fixture cleanup | Contexts/browser/in-memory fixture servers closed in finally, residual0; no DB fixture/write/migration |
| Source/licensing/moderation | Canonical approved original-author model unchanged; current eligibility/provenance/license/publication policies retained. No populated per-language inventory asserted |

## Resolved failures and independent review

Final deployed320 keyboard check reproduced last category partly clipped even after4seconds settling. Narrow focus scroll repair, regression168PASS, independent approval, PR33 normal CI/mainCI/deployment/cleanup completed. Earlier same-anchor focus defect had RED unit regression and location.key fix before PR32. Wrong Vietnamese test selector caused by shell encoding was corrected using explicitUTF8 before passing; every link is asserted.

Final harness first assumed404/403 yielded missing-empty: existing hook intentionally yields generic localized Resource unavailable; expected error corrected against source. Second harness assumption used English Retry rather than actual shared Try again; corrected against catalog. Reports now mark FAIL explicitly on future exceptions. No product error hidden or selector widened to ignore failure.

Inherited member harness total-request assertion raced a background notification refresh (1235 versus1234). Workspace reproducible wrapper records original sourceSHA256/substitution counts, settles before comparisons and excludes only notification traffic from the no-new-domain-request assertion. Auth/profile/language/exchange/login requests remain counted; route/state/value/focus assertions unchanged. Fresh reviewer approved this bounded adaptation. Final584PASS supersedes failed471partial run. No production/user request was submitted: synthetic API intercepts never forward auth writes upstream.

Fresh independent final review is recorded in FINAL-REVIEW.md. Content/locale deferrals remain explicit per CATEGORY-READINESS.md; acceptance does not grant later-phase execution, populated inventory, live-auth certification, human linguistic review or real-user value.

## Placeholder and regression audit

Accepted render graph searched directly: no Sắp có, Chưa khả dụng, NOT_IMPLEMENTED/NOT_AVAILABLE_YET or disabled category controls remain. Normal topic input placeholder is a form hint; legacy unrendered prototypes are excluded explicitly. Grammar/pronunciation/practice intentional opening explanations remain, Community/Q&A target-English warning retained. Unexplained placeholders0, tested dead Hub routes0. Test-covered current-source/eligibility/direct-translation and deterministic one-hop abstention contracts retain Phase21/23 scope; no semantic/inventory/private-data generalization.

No Backend schema/migrations/deploy: N/A_UNCHANGED. No audio/provider/AI lesson/corpus ingestion, DB/financial/production mutation or payment activation. Human authorization needed for this completed scope NONE; STOP and wait for owner Phase26 authorization.
