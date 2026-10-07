# LNG-19-006 implementation evidence

## Initial baseline — 2026-10-06

All three repositories fetched/pruned; exact local HEAD=origin/main and clean:

| Repository | Accepted main SHA |
| --- | --- |
| Backend | bec4ea4ac58abcbae0eb01c0c58bf7c0fd55bae5 |
| Frontend | 940e278555b2d33054fb2780d7348ded59ba2c3e |
| Workspace | 6c93478d3b834539e682f814d468b3d83d86bb72 |

Foundation TDD: new test first failed on unresolved provider; implementation
then passed 10 tests and typecheck. Full gates/runtime acceptance remain pending.
No dependency introduced. PowerShell execution policy preserved; use npm.cmd.

Vercel production merge coupling verified by current read-only dashboard;
Frontend source stays on `lng-19-006-multilingual-ui` until explicit merge/deploy
authorization. No deployment or environment setting change performed.

Further runtime/test/review/integration/terminal relay evidence appended as run.

## Technical acceptance — 2026-10-07

Frontend candidate `ed681f034a925c62e91dfed60ca36571f083adc3` contains four scoped
capability commits: foundation `e8aa4bd`, shell `c50c5b4`, Library `c44914b`,
isolated browser acceptance `ed681f0`. No dependency or Backend change.

| Gate | Actual result |
| --- | --- |
| Foundation provider/catalog tests | 16 PASS; default/switch/persistence/invalid/storage denial/fallback/prototype/plain-text interpolation/catalog parity/duplicate AST keys/Intl plural/date/number |
| Shell locale tests | 7 PASS; selectors, mobile/desktop, focus/Escape, search announcements, route/hash/history/filter/auth links/logout |
| Targeted Library regression | 12 files / 69 tests PASS; errors, content/filter independence, browse/detail, AI-panel safe error, existing Library domain contracts |
| Full Frontend tests | 87 files / 383 tests PASS; includes existing navigation, auth/session, CSRF and disabled-payment regressions |
| Lint and typecheck | PASS; both repository scripts use TypeScript noEmit |
| Build / performance budget | PASS; initial JS 320075 bytes / 100601 gzip; CSS 67251 / 11040 gzip |
| Dependency audit | PASS; 0 vulnerabilities in every severity; no package/lock changes |
| Secret scan | PASS; changed tracked/untracked files inspected for private-key/GitHub/AWS/live-payment token signatures; no real credential added |
| Diff check / self review | PASS; bounded source changes, stable machine identifiers, no generated artifacts staged |
| Independent code / security / privacy review | PASS; final review and follow-up PWA semantics/plural fixes reviewed; no unresolved finding |
| Local isolated Chromium | 95 checks PASS; 7 screenshots; 0 external requests; 0 uncaught page errors |
| Responsive / copy stress | vi/en 320/375/390/412/768/1024/1440; browse, filters, detail, empty/error; no horizontal overflow; test-only longer strings all seven widths |
| Accessibility | native named selector with selected value; focus retained; mobile filter/menu Escape; desktop menu keyboard; translated labels and content language; local Library Lighthouse accessibility 100 |
| English copy human review | NOT_PERFORMED; technical catalog completeness passes, no human certification claimed |

Browser evidence is [RUNTIME-REPORT.json](RUNTIME-REPORT.json), with exact candidate
and timestamps, and bounded [LIGHTHOUSE-SUMMARY.json](LIGHTHOUSE-SUMMARY.json).
Screenshots under ignored Frontend `artifacts/ui-locale/` were visually reviewed
for mobile detail and desktop browse. Fixtures are synthetic TEST ONLY, never
product-demand evidence. Deliberate fixture HTTP errors (anonymous refresh 403,
404/403/429/503 scenarios) are expected; they are not production health evidence.
The initial Lighthouse PWA aria-label finding was fixed with a named region and
regression test; the final run has no failed automated accessibility audits.

Runtime covers vi/en loading recovery, browse/search/filter/detail/pagination,
safe rate/unknown/not-found/access errors, default vi, switching both ways,
storage reload/invalid fallback, direct URL, back/forward/hash, independent real
resource content language, keyboard/menu/focus, synthetic authenticated session
with no extra refresh/write on switch, and unchanged disabled QR payment.
Other feature-page bodies, notification feed, Library contribution/reviewer pages,
content translations and real provider-backed AI are outside this bounded scope.

Reproduce from Frontend root with an already approved local Playwright/Chromium
installation: build using `VITE_API_BASE_URL=/api/v1`, then run
`node scripts/verify-ui-locale-runtime.mjs`. Optional tooling path is supplied by
`UI_LOCALE_PLAYWRIGHT_MODULE`; no runtime application dependency is introduced.
The fixture server binds only loopback, serves local dist and synthetic endpoints,
has no upstream, blocks service workers/external requests in the harness, and
never contacts production or a database. Tests use browser storage only.

## Source / production boundary

Frontend [PR #27](https://github.com/CongDongNgonNgu/CongDongNgonNgu-Front-End-Web/pull/27)
is open, unmerged, exact candidate above. GitHub
[quality CI run 37559132027](https://github.com/CongDongNgonNgu/CongDongNgonNgu-Front-End-Web/actions/runs/37559132027)
PASS, plus Vercel Preview Comments PASS and Vercel success status at deployment
`CCjtGjuaDEYUkbeMMAEVkp59C4U3`. Preview deployment success is metadata only;
journey runtime acceptance is LOCAL_SYNTHETIC_TEST_ONLY, not a production or
live-preview product runtime claim.

Required owner action: `MERGE_FRONTEND_PR_CAUSING_VERCEL_PRODUCTION_DEPLOYMENT`,
specifically Frontend PR #27 at `ed681f034a925c62e91dfed60ca36571f083adc3`.
Main tracking in Vercel project `cong-dong-ngon-ngu` creates a Production
Deployment and assigns its production domain on merge. Expected consequence is
the bounded vi/en shell/Library capability on `cong-dong-ngon-ngu-sigma.vercel.app`.
Default/fallback stays vi. Rollback candidate is Frontend
`940e278555b2d33054fb2780d7348ded59ba2c3e`; an authorized redeploy of that revision
would restore the previous bundle, while browser locale storage may remain and
be ignored by the old bundle. Rollback is not automatically authorized.

Backend SHA `bec4ea4ac58abcbae0eb01c0c58bf7c0fd55bae5`, production env, database,
migrations, credentials, payment-disabled behavior, providers, monitoring and
Phase 19 discovery history are unchanged. No production DB query/write,
production deployment/restart/env mutation, telemetry, persistent user-profile
locale, provider activation or real-money action occurred. No Phase 20.

Integration remains VERIFYING, user-approved initiative readiness is
READY_FOR_PRODUCTION_AUTHORIZATION; 006A/B/C/D technical acceptance is PASS.
Do not claim production release DONE. Retain the unmerged Frontend branch.

## Terminal relay / automatic safe continuation — 2026-10-07

Configured Chrome relay initially lost its connection to the existing tab after
the resumed session. A fresh tab of the **same active project conversation**
restored the relay; no report was claimed delivered until its actual posted
message appeared in the conversation. Source conversation:
[CongDongNgonNgu active chat](https://chatgpt.com/g/g-p-6a9c0b8b6a1881919d83df217325f15a-congdongngonngu/c/6aba3598-23a0-83ec-a088-ee4a7f3d1ea2).

| Report | Terminal status and observed returned prompt | Validation / safe execution |
| --- | --- | --- |
| 006A | PARTIAL, technical PASS, integration VERIFYING; returned `LNG-19-006 / 006B FINALIZATION` | Same project/authorized initiative; Phase 19 discovery stays closed, Phase 20 absent. Reviewed shell completeness/current gates and reconciled evidence; no repeated implementation |
| 006B | PARTIAL, technical PASS, PR #27 unmerged; returned `LNG-19-006 / 006C FINALIZATION` | Same project/initiative; reviewed current Library browse/search/detail/loading/errors/content/filter/route independence evidence; no new production or scope |
| 006C | PARTIAL, technical PASS; returned `LNG-19-006 / 006D SAFE CLOSEOUT` | Same project/initiative; accepted current same-candidate 383 tests/95 runtime checks/CI/review and executed Workspace-only final evidence/PR lifecycle |

All three complete prompts were read from the rendered conversation and validated
before dependent safe continuation. They explicitly keep Frontend PR #27 open
and preserve the owner production merge gate, with no provider/payment/data/env
mutation, Phase 20 or invented demand. ChatGPT responses are workflow guidance,
never new owner production authorization. Final 006D terminal handoff is to relay
the merged Workspace result and exact hard stop; no production action may follow
without a new explicit human decision.
