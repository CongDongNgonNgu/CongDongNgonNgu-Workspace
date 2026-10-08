# Phase 24 source localization coverage

Audit date: 2026-10-08 (Asia/Saigon). This is a bounded source audit, not a claim of final runtime acceptance or overall Phase 24 completion.

## Method and scope

Inspected TypeScript ASTs for JSX text, user-facing attribute literals (title, label, placeholder, aria-label, alt), Vietnamese string literals, and dynamic string expressions across 24 TSX files. Cross-checked literal t() references against catalog property keys: missing static keys = 0. Read canonical option/validation/display/error modules and Backend matching-engine buildReasons contract to distinguish application-generated text from member text. Tests/generated files and unrelated product areas are excluded.

### Accepted journey source (23 files)

- `src/features/auth/AuthBody.tsx`
- `src/features/auth/AuthProvider.tsx`
- `src/features/auth/pages/AuthCallbackPage.tsx`
- `src/features/auth/pages/ForgotPasswordPage.tsx`
- `src/features/auth/pages/LoginPage.tsx`
- `src/features/auth/pages/RegisterPage.tsx`
- `src/features/auth/pages/ResetPasswordPage.tsx`
- `src/features/auth/pages/VerifyEmailPage.tsx`
- `src/features/auth/PasswordField.tsx`
- `src/features/auth/ProviderButtons.tsx`
- `src/features/auth/RecoveryStatusRail.tsx`
- `src/features/onboarding/components/GoalsSkillsStep.tsx`
- `src/features/onboarding/components/LanguageSelectionStep.tsx`
- `src/features/onboarding/components/OnboardingActions.tsx`
- `src/features/onboarding/components/OnboardingContextRail.tsx`
- `src/features/onboarding/components/OnboardingProgress.tsx`
- `src/features/onboarding/components/OnboardingStepHeader.tsx`
- `src/features/onboarding/components/OptionalDetailsStep.tsx`
- `src/features/onboarding/components/ProficiencyStep.tsx`
- `src/features/onboarding/OnboardingPage.tsx`
- `src/features/passport/PassportPages.tsx`
- `src/features/exchange/pages/BuddyProfilePreviewPage.tsx`
- `src/features/exchange/pages/PartnerDiscoveryPage.tsx`

### Supporting source

- Auth: auth-errors.ts and catalogs/auth.ts; machine error codes map to safe locale-reactive catalog keys; unknown errors use generic copy. OAuth provider availability remains unchanged.
- Onboarding: onboarding.constants.ts, onboarding-validation.ts, onboarding.types.ts, onboarding profile/draft/state helpers, language picker/session/history hooks, catalogs/onboarding.ts. Canonical arrays are reused; translated labels do not enter profile payloads.
- Profile: passport.utils.ts and passport.types.ts. Unknown custom goals/skills remain exactly unchanged; day/time labels receive UI locale in both display and editor.
- Exchange: exchange-copy.ts, exchange-reasons.ts, exchange.types.ts, exchange-api.ts and catalogs/exchange.ts. Backend-generated matching reasons are mapped to localized known templates with generic unknown fallback; canonical product goals use shared onboarding labels.
- Shared: UiLocaleProvider.tsx, ui-locale.ts, language-display.ts and catalogs.test.ts. Existing LNG-19-006 provider/storage/fallback retained.

## Remaining literal classification

| Class | Source examples | Disposition |
|---|---|---|
| Intentionally untranslated proper name/metadata | Google mark G/provider Google, CongDongNgonNgu.vn, catalog nativeName, IANA timezone values, CEFR A1..C2 | Preserve stable brand/native metadata and technical identifiers; localized primary labels use existing metadata helper. |
| User-generated content | member displayName, interests, custom/unknown goals and skills, report context | Render verbatim through React; no automated translation or display humanization. |
| Technical/internal | AUTH_ACCOUNT_COLLISION, NATIVE/PUBLIC/PRIVATE, nativeCodes/knownCodes/learningCodes, ANY/WITHIN_3_HOURS/SAME_TIMEZONE, relationship/report API codes, Enter/NFKC, routes/selectors, AuthProvider programmer error | Persist/compare canonical values; never translate internal semantics. |
| Nonlinguistic decoration | check mark, arrow, parentheses, colon, bullet, slash, percent, en dash, middle dot | Keep symbols; decorative marks retain existing aria-hidden semantics. |
| Defects | direct in-scope hard-coded Vietnamese JSX/label/placeholder after remediation | 0 found in accepted source AST cases. Dynamic Backend reason and canonical-goal gaps found in independent review were remediated before this audit. |

## Explicit exclusion

PassportProgressPanel.tsx and passport-progress utilities/types/tests are the previously delivered study/contribution progress surface, outside Phase 24 onboarding/profile-language control scope. It remains rendered below own profile language display and retains its existing Vietnamese copy. Consequently, the zero mixed-language claim applies to accepted Phase 24 surfaces only; it does not assert the entire own-profile page is English-only. Do not hide or redesign this unrelated surface to improve a metric.

## Privacy/legal boundary

Auth consent/community/privacy clauses and onboarding/profile privacy notes are translated conservatively from existing Vietnamese source. Public language visibility remains PUBLIC/PRIVATE; private email/account/provider data is not introduced into public profiles. No legal meaning, consent behavior, provider activation, or security policy is changed. No human legal/linguistic certification is claimed.

## Copy review and verification

VI_COPY_REVIEW=SOURCE_PRESERVATION_AND_INDEPENDENT_AGENT_REVIEW
EN_COPY_REVIEW=AGENT_TRANSLATION_AND_INDEPENDENT_SOURCE_REVIEW
EN_COPY_HUMAN_REVIEW=NO
HUMAN_LINGUISTIC_CERTIFICATION=NO

Focused onboarding/profile tests: 24 pass, including locale-switch preservation, canonical save values, safe errors, custom member text, and actual editor weekday localization. Typecheck passed after own remediation. Strict global catalog semantic validation passed: 4 tests cover paired vi/en keys, nonempty semantic keys, matching placeholders, duplicate detection, and existing number/date/plural formatting. Runtime mixed-language/key exposure/accessibility/responsive evidence belongs to browser acceptance; this source audit does not substitute for those checks.
