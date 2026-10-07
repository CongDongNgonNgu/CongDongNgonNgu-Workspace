# Phase 24 Test Plan

**State:** prospective.

## Catalog/static checks
Verify required scoped keys exist in vi/en catalogs, no unsafe raw error fallback is introduced, and out-of-scope learning content is not translated by UI locale machinery.

## Functional
Test locale switch and reload across login/register/recovery where applicable, onboarding/profile language controls, exchange browse and partner detail. Verify session, URL and learning-language selections remain unchanged by UI locale changes.

## A11y/layout
Test keyboard/focus/accessibility labels, validation/error states and long English/Vietnamese copy. Run responsive checks at 320, 375, 390, 412, 768, 1024 and 1440.

## Regression
Run applicable Frontend lint, typecheck, full tests, build, audit and CI plus auth/navigation/exchange targeted suites. Record only actual output and exact SHAs.
