# Phase 22 Test Plan

**State:** prospective.

## Backend
Lifecycle integration tests for group creation, one-use invitation, join, member text, leave/removal, ownership transfer and moderation/report flows. Re-run Phase 20 authorization matrix as regression. Add cross-group IDOR, replay/race, duplicate request, stale authorization, pagination/quota and deletion/removal cases.

## Frontend
Route/state tests for list/detail/invite/join/discussion/moderation surfaces. Verify locale switching, keyboard navigation, accessible names/focus/error states and responsive behavior at the project baseline widths 320, 375, 390, 412, 768, 1024 and 1440 when applicable.

## Integration
Exercise contract mismatches and revoked/removed-member behavior end to end in approved TEST/UAT only. Verify no author-private post is surfaced as group content.

## Gates
Run focused tests plus all applicable lint/typecheck/test/build/audit/CI gates in each changed repository. Record only actual evidence.

## Executed gates

Backend focused20 transaction/service tests, real PostgreSQL18 service/HTTP25, Phase20/private47, full unit153 suites890 before two additional isolation regressions (current merged main full CI PASS), e2e20 suites143; type/lint/build PASS. Frontend focused25, full94 files408 tests, type/lint/build PASS and audit0. Backend audit high/critical0,20 inherited moderate development dependencies, runtime audit0. Workspace12 monitor tests plus syntax/diff/link checks. Local native116 and deployed native117 browser checks PASS across four synthetic roles, both locales and seven required widths. No browser network mocking or credential injection; actual UI sign-in and approved TEST persistence. Exact fixture cleanup four actors/four groups residual0. Numeric contrast/screen-reader and scale/latency benchmarks NOT_RUN. Final Workspace PR/main CI remains the integration gate.
