# Phase 23 Test Plan

**State:** Backend acceptance observed; Frontend/integrated gates pending.

## Backend/projection
Test eligible relation retrieval, filters, pagination, unsupported relation, no-result fallback, source/license status changes, deletion and stale projection/cache invalidation. Re-run Phase 21 leak/quality criteria where applicable.

## Frontend
Test source-card rendering, provenance/license labels, related navigation, filter/empty/error/fallback states, vi/en switching and route/back-forward behavior without changing existing Library semantics.

## Runtime/a11y
Verify keyboard/focus/accessibility and responsive behavior at project baseline widths when applicable.

## Regression
Run focused plus full applicable Backend/Frontend lint/typecheck/test/build/audit/CI gates and existing Library eligibility/provenance regressions. Record only actual results.

## Observed LNG-23-002 gates — 2026-10-07

Backend PR45/main a2640cd CI PASS:941 unit,158 e2e,25 Phase22 SQL and6 Phase23 SQL tests; lint/typecheck/build/high-audit PASS. Exact existing TEST migration0028 and Render dep-db33b07avr4c739l7110 Live SHA PASS. Deployed HTTP13check groups and independent cleanup PASS/CLEANED, registered residualzero. See [Backend evidence](BACKEND-EVIDENCE.md) for exact bounds/limits and earlier failures. Runtime original-author health N/A; applicable Phase06/current-read checks remain focused test evidence. Browser lexical/a11y/responsive and final integrated quality gates are pending, not inferred from API tests.
