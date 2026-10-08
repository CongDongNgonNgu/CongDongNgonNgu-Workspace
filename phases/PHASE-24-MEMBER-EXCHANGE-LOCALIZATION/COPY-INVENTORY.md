# Phase 24 copy inventory and localization contract

**State:** FROZEN_SOURCE_CONTRACT; bounded implementation/technical acceptance PASS; lifecycle relay pending.

Owner START_PHASE_24=YES authorizes LNG-24-001–004 only. Baseline remote main fetched/pruned on 2026-10-08: Frontend 103f876596c6a2e8c408f2f716ab552a7843872d, Backend a2640cd7d734f088987fb32b89efc5cbf40e954e, Workspace d33a5e8d49e659b33fa7d748f74b8bf581b25496. All clean, only main branches. LNG-19-006 DONE evidence read.

[Exact source inventory](SOURCE-COPY-INVENTORY.md) captures 682 source text candidates across 29 files before implementation; candidates include canonical values and editorial strings, not a claimed translation coverage percentage.

| Domain | Actual source surfaces | Review ownership | Boundary |
|---|---|---|---|
| Auth | Login/Register/ForgotPassword/ResetPassword/VerifyEmail/AuthCallback; AuthBody, PasswordField, ProviderButtons, RecoveryStatusRail, auth-errors | implementation agent/source review, coordinator acceptance | Existing provider capability only; consent checkbox and disabled legal destinations retained |
| Onboarding/profile | five steps; eight step/context/action components; validation/session hooks; PassportPages and language label utilities | implementation agent/source review, coordinator acceptance | canonical languageCode, role, CEFR, visibility, goals/skills, primary-target flag; no new step/target field |
| Exchange | PartnerDiscoveryPage browse/filter/cards/meta; BuddyProfilePreviewPage detail/status/safety/report dialogs | implementation agent/source review, coordinator acceptance | Current deterministic browse/actions only; UGC unchanged; known Backend-generated matching templates localized by bounded allowlist, unknown safe fallback |

## Terminology freeze

| Concept | vi | en |
|---|---|---|
| sign in | Đăng nhập | Sign in |
| register | Đăng ký | Register / Create account (existing action context) |
| verification | Xác minh email | Email verification |
| recovery | Khôi phục mật khẩu | Password recovery |
| reset password | Đặt lại mật khẩu | Reset password |
| native language | Ngôn ngữ bản ngữ (existing profile vocabulary) | Native language |
| learning language | Ngôn ngữ đang học | Learning language |
| primary target | Mục tiêu chính | Primary target |
| language exchange | Trao đổi ngôn ngữ | Language exchange |
| proficiency | Trình độ | Proficiency |
| self-reported proficiency | Trình độ tự khai báo | Self-reported proficiency |
| A1 / A2 | Sơ cấp / Cơ bản | Beginner / Elementary |
| B1 / B2 | Trung cấp / Trên trung cấp | Intermediate / Upper intermediate |
| C1 / C2 | Cao cấp / Thành thạo | Advanced / Proficient |
| native level | Bản ngữ | Native |
| profile / member | Hồ sơ / Thành viên | Profile / Member |
| offered / wanted | Có thể hỗ trợ / Muốn luyện | Can support / Wants to practice |

Canonical codes retain current API/domain values; display names derive from existing englishName/vietnameseName/nativeName metadata. No duplicate language dictionary. Learning/native/primary-target selection never controls UI locale.

## Error mapping freeze

Auth allowlist: AUTH_INVALID_CREDENTIALS, AUTH_EMAIL_VERIFICATION_REQUIRED, AUTH_ACCOUNT_DISABLED, AUTH_RATE_LIMITED, AUTH_CSRF_INVALID, AUTH_SESSION_EXPIRED, AUTH_PROVIDER_DISABLED, AUTH_PROVIDER_UNAVAILABLE, AUTH_OAUTH_FAILED, AUTH_ACCOUNT_COLLISION, AUTH_VERIFICATION_INVALID, AUTH_RESET_INVALID. Preserve known security/neutral recovery semantics. Unknown 4xx/non-API uses generic localized fallback; 5xx busy fallback. Never raw API message, SQL/provider/stack/config details.

Onboarding/profile load/save and exchange load/action failures use stable categories/keys with safe localized fallback. State stores keys/categories so switching locale updates current error. Validation keeps canonical constraints and rendered language coherent. Existing reset hints inconsistent with validation/lifetime are reconciled with authoritative source, without changing auth behavior.

## Copy review / legal boundary

VI_COPY_REVIEW=AGENT_SOURCE_REVIEW
EN_COPY_REVIEW=AGENT_SOURCE_REVIEW
EN_COPY_HUMAN_REVIEW=NO
HUMAN_LINGUISTIC_CERTIFICATION=NO

No human review is inferred. Registration community-guidelines/privacy consent retains exact intent and current non-navigable legal spans. Profile/exchange privacy and safety assurances translate conservatively; no new ownership, consent, age or deletion policy. Authoritative human/legal translation review NOT_PERFORMED; technical acceptance cannot certify legal equivalence.

## Localization architecture contract

Reuse features/ui-locale UiLocaleProvider, typed catalogs, vi fallback, browser storage congdongngonngu.ui-locale.v1, native Intl and shell switch. Add feature catalogs to existing registry only. No new provider/state/storage/server locale/schema/locale URL. Preserve form values, identity, route/query/history and filters on switch; no extra submit/profile mutation. User-generated text is preserved verbatim; only known canonical UI labels may translate. Payment disabled; no production mutation; Phase23B unstarted; no Phase25.

## Implementation verification checkpoint

Auth208, onboarding/profile230 and exchange155 paired vi/en keys extend existing catalogs. Semantic keys validated without relaxing existing key rules. Source literal classification in SOURCE-COVERAGE.md; independent review in SOURCE-REVIEW.md. Generated exchange reasons are deterministic Backend app chrome (seven allowlisted template classes), translated locally; unknown reason uses safe localized fallback. Member names/interests/custom goal/skill strings remain exact. Canonical report categories/relationship/language/profile/filter codes preserved through explicit maps. Agent vi/en review only; EN_COPY_HUMAN_REVIEW=NO and HUMAN_LINGUISTIC_CERTIFICATION=NO. No provider/legal-policy certification implied.
