# LNG-29-002 execution checkpoint

Recorded2026-10-19 Asia/Saigon. LNG-29-001=DONE; LNG-29-002=VERIFYING; product/Frontend/native gates complete, Workspace publication/terminal relay pending. Scope/order remain [TASKS.md](TASKS.md); Phase29 verdict NOT_REACHED.003-006 unstarted; stop after29/no30.

## Accepted dependency

001 verified publication/terminal continuation are recorded in [LIFECYCLE-001.md](LIFECYCLE-001.md). Reuse [CONTRACT-001.md](CONTRACT-001.md), [selected Stitch references](UI-STITCH.md), [frontend audit](AUDIT-FRONTEND-001.md) and [native audit](NATIVE-AUDIT-001.md). Native account-menu Escape/outside-click closure defect is a002 remediation target.

## Small implementation sequence

1. Inspect existing shell/navigation/account/Community components and tests; retain canonical routes/shared tokens.
2. Add approved Groups/Messages priority, exclusive active states and authenticated/guest desktop/mobile/account/Community entries without exposing private metadata.
3. Fix dropdown outside-click/Escape/route-change dismissal and keyboard/focus behavior; cover meaningful route/direct-URL/back-forward/refresh regressions.
4. Run affected Frontend tests/typecheck/lint/build/performance/audit; independently review/remediate, verify deployed exact-main TEST in VI/EN and required widths, then complete PR/mainCI/Workspace evidence/branch cleanup/terminal relay before003.

## Evidence state at execution start

PRODUCT_IMPLEMENTATION=IN_PROGRESS; TARGETED_TESTS=PARTIAL_PASS_SHARED_OVERLAY; FULL_AFFECTED_GATES=NOT_RUN; INDEPENDENT_REVIEW=PARTIAL_FINDINGS_REMEDIATION; EXACT_MAIN_TEST=NOT_RUN; VI_EN_SEVEN_WIDTHS=NOT_RUN; ACCESSIBILITY=NOT_RUN; PUBLICATION=NOT_RUN. These labels describe this checkpoint and must be superseded by actual002 evidence as work proceeds. No Backend/schema change is pre-authorized by navigation scope alone.

## Shared overlay implementation checkpoint (coordinator-reported)

Shared overlay TDD initially recorded3 failing/1 passing tests, then4 passing tests and typecheck PASS. Independent review returned CHANGES_REQUIRED because navigation links were using native menu semantics. Remediation added a navigation disclosure variant while preserving the legacy default menu;2 regression tests were first red, followed by10 passing tests across Drawer/Dropdown/primitives. Header More/account adaptation is IN_PROGRESS. Full002 gates, complete independent review, native TEST, PR/mainCI/publication and final002 acceptance remain NOT_RUN at this checkpoint. This records coordinator-provided results; this documentation task did not rerun Frontend tests.

## Reviewed Frontend candidate

Frontend PR53 OPEN: https://github.com/CongDongNgonNgu/CongDongNgonNgu-Front-End-Web/pull/53 . Head7f2af8ac5ab89d641345be18477bccdbb969bb4d, reviewed tree9b1cf4634f3850efff6354fd15876a8d52d82989. Whole-source/security/accessibility/architecture independent review APPROVE, no blockers; previous composite-menu semantics blocker remediated using native-link navigation-disclosure variant; legacy safety-menu variant preserved. Independent overlay3files10tests PASS. Root full suite145files807tests PASS (152.37s), typecheck/lint/build/performance PASS, audit0vulnerabilities. Build initialJS533591raw/149259gzip, CSS67077raw/11041gzip within repository budgets. Existing build chunk advisory remains, no failing gate. Product behavior only navigation/overlay/Community task links; no003/004flow or API/schema changes. PR CI/merge/main CI/exact TEST native acceptance/branch cleanup still pending.

Exact-owned002synthetic manifest69cd4c5e-053c-4662-9e5b-9f05f1de69de created by independently reviewed helper, seven platformMEMBER actors. Guard verified TEST TLS/PostgreSQL180006/exact38migrationledger digest7c9dd1152a6f45e4d9109df45da44f3c510635ab4594e2ed98f00fedc19c1428. No group/conversation/connection fixture created yet; no groupowner role asserted before native domain setup. Credentials never stored in evidence. Cleanup pending; do not claim residual0 for002 until queried.

## Initial merge and native remediation

PR53 MERGED, FE mainbbfd7aa6789e1974a203dfe891bfc0142fd071ba, reviewed/main tree9b1cf4634f3850efff6354fd15876a8d52d82989 EQUAL. PR CI39210867876/main CI39211097419 SUCCESS. Initial branch deleted local/remote/pruned. Vercel TEST alias exact-main ReadyBtRy3MAki2dJj5y1PHPmBp6guzti verified in deployment overview; backend remains unchanged exactmain. Preview24Yn26xDjibHMyA6LzPZfebHkg3Y required Vercel login in isolated browser, so no preview bypass or acceptance claimed.

Native normal synthetic login succeeded. AuthEN320/375/390/412 quicklinks44px+ and768/1024 two-row navigation observed; however initial desktop header FAILED: More overlaps locale at1440 (also1025/1100), because flex boxes shrink below child content. See NATIVE-002-INITIAL-FINDING.json. Initial container-box overlap metric was insufficient; actual child rects and inspected screenshot exposed the defect. Result REMEDIATE_AND_RETEST,002 not DONE.

Independent design review approved existing two-row pattern for all authenticated desktop widths (brand/utilities first, full priority navigation second); no IA/domain expansion. Focus-order regression first failed1/7passed, then focused4files29tests PASS after actual DOM utilities-before-navigation. Independent remediation source APPROVE and Header.social8tests PASS. Guest composition unchanged. Full gates rerunning on fix/phase29-002-header-fit; new PR/main/deployment/native acceptance pending.

Remediation candidatec415a078bbe3bd9f25dbf38fd578476a9a0fa301, treee8e5b34d7f57d14be08c48e816ce043b3ee1e3e0, PR54 OPEN. Repeated full suite145files808tests PASS (149.85s), typecheck/lint/build/performance/auditPASS0vulnerabilities. Final initialJS533769raw/149315gzip, CSS67485raw/11093gzip within budgets. Independent remediation source and design APPROVE; independent Header8/8tests PASS. PR CI/main/native revalidation pending.

## Final exact-main navigation acceptance

002=VERIFYING pending Workspace publication/terminal relay. Remediation PR54 MERGED at3bbf7bc545b614d3b5cc1b3fc8b06992e62dd17f, reviewed/main treee8e5b34d7f57d14be08c48e816ce043b3ee1e3e0 EQUAL. PR CI39211776668 and exact-main CI39211975490 SUCCESS. Both FE temporary branches deleted local/remote/pruned after corresponding green mainCI/tree proof; FE clean synchronizedmain. Exact Vercel TEST ReadyBT9cCSMZNMWZomvu2GpELzBtzq6d verified source main3bbf7bc, alias refreshed to new two-row header. Backend unchanged exactmain.

NATIVE-002.json records32 measured width/locale/auth rows: both VI/EN and authenticated/guest at320/375/390/412/768/1024/1440 plus authenticated1025/1100. No horizontal overflow or interactive-child overlap; final1440desktop and320mobile screenshot visually inspected. New social nav items44px+ high (mobile56px); Community task links288x78px at320. Native account Escape/outside closure/focus return, More keyboard arrow/visible3pxfocus, mobileDrawer initialfocus/Tab andShiftTabwrap/Escape/focusreturn/bodylock/routeclose, authlogoutclearingprivateentries PASS bounded. NativeVI/EN Community tasklinks point only canonicalauthorizeddestinations; representative title10.20:1/helper5.11:1 contrast. Nativeclick/back/forward/refresh and invitationquery/hash routes preserved; activeparentexclusions verified. GuestdirectGroup/Messages render signin gates, no private metadata/directory.

Exact-owned cleanup FIXTURE-CLEANUP-002.json:3tables28rows (7users,7userroles,14rotatedauthsessions), residual0; no groups/conversations/messages/connections created or historicalTEST modified in002. Browser loggedout before cleanup, localcredential/sessionprocess exited. Nativebackdropclick/textzoom/axe/screenreader NOT_RUN, backdropunitregressionPASS; no formalWCAG/realuserusability/productionclaim. Domainflows and securitycross-resource matrix remain003/004/006. Initial failed native measurement retained in NATIVE-002-INITIAL-FINDING.json, superseded only by final newrevision measured results. WorkspacePR/mainCI/tree/cleanup and complete terminalrelay stillpending at this checkpoint.
