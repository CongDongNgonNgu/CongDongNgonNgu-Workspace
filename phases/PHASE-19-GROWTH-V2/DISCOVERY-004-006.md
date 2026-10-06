# Phase 19 pre-launch discovery: groups, mobile and UI localization

Date: 2026-10-06, Asia/Saigon. Profile: PRE_LAUNCH_FEATURE_EXPANSION.
These are architectural/product hypotheses under the owner's pre-launch
amendment, not observed demand. There are no current real users; seed/demo/UAT
can establish technical behavior only. No candidate receives BUILD_NEXT here.
Portfolio comparison owns selection and any subsequent implementation scope.

Source inspection is read-only against Backend `bec4ea4ac58abcbae0eb01c0c58bf7c0fd55bae5`
and Frontend `940e278555b2d33054fb2780d7348ded59ba2c3e`. No .env, database,
personal records, production dashboard or provider account was accessed.
Readiness means bounded engineering preparedness, not demand validation,
authorization to implement, or production release readiness.

## LNG-19-004: Groups, Private Communities & Organization Spaces

PROBLEM_OR_PRODUCT_OPPORTUNITY: Offer a persistent, bounded study context for
people who want to organize practice together without publishing every exchange
to the global community. Schools/organizations are a separate, more complex
extension, not a synonym for a study group. Need is a pre-launch hypothesis.

EXPECTED_PRODUCT_VALUE: A group could connect member-only discussion to existing
language practice and scheduling; membership continuity could reduce the need
to distribute separate room/event invitations. Neither reduced coordination
effort nor improved engagement is measured today.

EXISTING_CAPABILITY_REUSE:

| Area | Verified source | Reuse and boundary |
| --- | --- | --- |
| Identity/global roles | Backend `src/identity/identity.types.ts`, `src/identity/role-policy.ts`, `database/migrations/0024_phase15_role_policy.sql` | KEEP authentication/role enforcement; group owner/moderator are resource-scoped grants, not global ADMIN/EXPERT |
| Community privacy | Backend `src/community/community.service.ts` private-post author checks; `database/migrations/0003_community.sql` | ADAPT discussion domain; PRIVATE currently author-only, not member-shared. Never reinterpret old private posts as group content |
| Rooms | Backend `src/rooms/room.service.ts` `assertRoomAccess`; `database/migrations/0018_phase13_speaking_rooms.sql` | ADAPT explicit group-to-room access policy. Existing private access is host/moderator/token, not a persistent group-membership model |
| Events | Backend `src/events/event.service.ts` `assertEventViewerAccess`; `database/migrations/0023_phase14_event_participation.sql` | ADAPT invitation/attendance concepts; private viewer needs host or active invitation, not arbitrary group membership |
| Reports/audit | Backend `src/admin/admin-audit.repository.ts`, `database/migrations/0025_phase15_moderation_reports.sql` | ADAPT scoped moderation and auditable disposition, preserving platform intervention policy and private-content access controls |
| Frontend composition | Frontend `src/features/community/pages/CommunityPostDetailPage.tsx`, `src/features/events/pages/EventDiscoveryPage.tsx`; Workspace `docs/engineering/FRONTEND-ARCHITECTURE.md` | KEEP focused routes/components/API boundaries; new group pages require Stitch design and scoped CSS |

No group/organization tenant tables or module were identified in the inspected
Backend migrations/domain source. Occurrences of grouping in reputation code
are ledger projections, not community groups. BUILD_NEW membership/invitation
and resource-scope policy is therefore necessary if selected.

TECHNICAL_COMPLEXITY: HIGH for full organizations; MEDIUM-to-HIGH for an isolated
study-group slice. Membership transitions, concurrent invitations, revoked
access and content ownership cross existing read/write/search/notification
boundaries. Adding only a group ID without enforcing every boundary is unsafe.

SECURITY_PRIVACY_RISK: HIGH. Threats include IDOR on group/content/attachment
IDs, invitation leakage/replay, stale access after removal, notification and
search snippets exposing private content, member enumeration, privilege
escalation and abusive invitation spam. Existing PUBLIC/PRIVATE semantics
must remain unchanged for existing resources. Public Library contribution
must require explicit authorization/consent; private group content must not
silently become public corpus, AI context or recommendation input.

EXTERNAL_PROVIDER_DEPENDENCY: None for a text-first authenticated group MVP
using current identity/database foundations. Existing email compatibility can
be reused for approved invitations; do not create provider accounts or assume
external delivery. Audio remains separate from membership; disabled media
provider is not made operational by creating a group.

LEGAL_PAYMENT_DEPENDENCY: Payment-independent groups can be scoped without
billing. Organization billing, paid seats, school/minor policies, enterprise
contracts and institution ownership require separate owner/legal decisions.
No fee, subscription entitlement or payment-provider choice is proposed.

PRODUCT_DEPENDENCIES: Approve member eligibility, group visibility, whether
join requests exist, quotas, inviter powers, owner transfer, last-owner exit,
member removal, retention/export, platform-moderator access and escalation.
Define whether departed members retain authorship and whether members can
delete/export their own content without invalidating other members' records.

ESTIMATED_IMPLEMENTATION_SCOPE: Conditional text-first slice: group metadata,
owner/member/scoped-moderator grants, expiring one-use invitations, acceptance/
leave/remove/owner-transfer transitions, member-only post reads/writes and
reporting, audit, focused group routes and migration tests. Estimate 3–5 coherent
implementation capabilities rather than a promised calendar schedule: membership
and policy; content authorization; invitation/management UI; moderation/lifecycle;
optional event/room integration only after the first slice passes. Organization
tenancy, SSO, paid seats and bulk imports are separate epics, not MVP scope.

COST_AND_OPERATIONS: No new paid provider is intrinsically required. Costs are
database queries/indexes, invitation delivery where approved, moderation work
and ownership/support recovery. Set quotas and pagination before exposure;
private-content backup/recovery must be reassessed beyond the demo-data waiver.

ARCHITECTURE_DECISION (PROPOSED): Resource-scoped group membership with explicit
deny-by-default authorization, preserving global roles and old visibility.
Compare a thin membership layer with reusing separate event invitations: the
latter has less new persistent scope but cannot establish durable study-group
content ownership. Defer organizational tenancy until its contract is defined.
This proposal is not an accepted schema ADR or a portfolio decision.

TESTABILITY: HIGH in isolated TEST using synthetic users across two groups.
Test anonymous/nonmember/member/moderator/owner/platform-role matrices for
list/detail/write/search/notifications; revoked invitations, removal/leave,
owner transfer, replay, race conditions, last-owner rules and private-to-public
content leakage. Meaningful integration tests must hit real repositories and
additive migration constraints; no production test writes.

IMPLEMENTATION_RELEASE_PLAN: If selected, first approve policy/ownership and
additive schema design; implement in isolated TEST with policy tests before UI;
design new pages through Stitch; verify keyboard/focus and 320/375/390/412/768/
1024/1440 widths, routes/back/forward, loading/error/empty states, existing
community/rooms/events regressions and secret/dependency checks. Release needs
reviewed access/retention, backup/recovery and operator moderation playbook.

PRODUCTION_HARD_STOPS: Deployment/restart/env change, production migrations/
writes, persistent real-user content collection and new credentials/provider
accounts require explicit authorization. Creation of an approved additive
migration file does not authorize its production execution.

FUTURE_REAL_USER_VALIDATION_METRICS: Approved real-user invitation acceptance
per delivered/eligible invitation; time to first qualifying group contribution;
7-day group return per fully observed first-active cohort; report rate per
eligible participation and resolution delay; owner/support workload. Define
denominators, exclusion registry, retention and small-cell suppression first.
Private group names/member identities/content are never Workspace evidence.

READINESS=MEDIUM for a bounded payment-independent study-group design;
organization expansion LOW. Final portfolio selection remains undecided.

## LNG-19-005: Native Mobile / Wrapper Decision

PROBLEM_OR_PRODUCT_OPPORTUNITY: Determine whether installable web already meets
pre-launch mobile needs, and identify concrete capability gaps before paying
for another client. Native demand and device-specific friction are unobserved.

EXPECTED_PRODUCT_VALUE: Preserve one consistent product while improving mobile
access only where reproducible tests demonstrate a gap. Store presence alone
does not establish acquisition or retention value.

EXISTING_CAPABILITY_REUSE: KEEP Frontend `public/manifest.webmanifest`
(standalone display, scope/start URL, branded icons and shortcuts), `public/sw.js`
(public shell/static caching with private/API/network-only exclusions),
`src/features/pwa/usePwaExperience.ts` (production worker registration, install,
offline state and update flow), `src/features/pwa/pwa.utils.ts` (install surface/
private-path classification) and their colocated tests. Workspace
`evidence/phase-16/PHASE-16-EVIDENCE-2026-10-02.md` records bounded preview/browser
evidence; it is not a current physical-device native capability benchmark.

| Capability | Actual repository baseline | Bounded PWA experiment / native alternative |
| --- | --- | --- |
| Installation | Manifest plus browser prompt/iOS guide/installed detection | Test supported physical-device combinations and installation/update failure; wrapper store packaging is additional work, not proven need |
| Notifications | Backend in-app notification/read state; no push subscription pipeline demonstrated | PWA push needs consent/subscription/revocation/privacy/provider design; wrapper/native likewise needs platform push integration, not merely a web container |
| Audio/background | Backend `src/rooms/room.module.ts` wires DisabledMediaProvider | Neither web nor native has accepted live room audio. Define provider/audio ownership first; compare foreground, screen lock, interruptions and background requirements in isolated device tests |
| Offline | Worker caches public shell/assets and truthful fallback; private/API traffic is network-only | Preserve this protection. Offline authenticated content/mutations require separate encrypted storage/conflict/logout policy on either client |
| App/deep links | Web router/direct URLs are existing product boundary | Test installed launch/auth return/back behavior; native verified links require signing/domain/platform configuration review |
| OAuth/session | Backend `src/auth/session/session.service.ts`, `src/auth/oauth/oauth.service.ts`; Frontend auth routes | Compare browser and wrapper redirect/cookie/CSRF behavior; no token bridge or embedded credential capture assumed safe |
| Stores | No native/store project in inspected Frontend package/source | Store membership, signing, privacy declarations, review and release ownership are unresolved external dependencies |

Platform support/OS store terms are intentionally not claimed from memory.
Before an actual device experiment or platform selection, verify current
official browser/OS/framework documentation for the named target versions.
This source-based gap matrix requires no provider account or live activation.

TECHNICAL_COMPLEXITY: LOW-to-MEDIUM for focused PWA device validation; HIGH for
production wrapper/native auth, audio and distribution. React Native would
require a new view/navigation/device layer; it is not a mechanical export of
the present React DOM components.

SECURITY_PRIVACY_RISK: Preserve no-private-cache policy, CSRF/cookie boundaries,
logout/revocation and authorized URLs. Native storage, bridge methods, deep-link
tokens, push previews and audio permissions increase the review surface.
Do not bypass OAuth protections to accommodate a wrapper.

EXTERNAL_PROVIDER_DEPENDENCY: Existing PWA requires no new provider selection
for this decision. Native/wrapper distribution may need store/signing accounts;
push/audio need separately chosen operational integrations if later selected.
No accounts, credentials or signing material are created here.

LEGAL_PAYMENT_DEPENDENCY: Store distribution terms/privacy declarations and
future paid digital features need current official/legal review before launch.
No store payment-policy conclusion, price or fee is asserted. Current payment
provider remains unselected/disabled; app packaging does not authorize payment.

PRODUCT_DEPENDENCIES: Define supported device/browser versions, priority mobile
journeys, required foreground/background audio behavior, notification purpose,
offline boundaries, release owners and acceptable support burden. Phase 16 PWA
evidence is retained; technical fixtures cannot demonstrate mobile demand.

ESTIMATED_IMPLEMENTATION_SCOPE: PWA-first experiment: one capability harness,
physical-device matrix and gap ADR, using disposable sessions and fake providers.
No new client app in this discovery. A later wrapper slice requires packaging,
secure auth-return integration, links/permissions, device tests and release CI;
React Native adds separate route/view/a11y implementation across selected journeys.
Effort ordering is PWA validation < wrapper integration < new native client;
exact staffing/time remains unknown until target journeys are fixed.

COST_AND_OPERATIONS: PWA retains one client release and current monitoring.
Wrapper/native adds signing/key custody, platform releases, device regression,
store support and potentially delayed client updates. Shared Backend contracts
reduce duplicated business rules but do not eliminate UI/device support costs.

ARCHITECTURE_DECISION / ADR RECOMMENDATION (PROPOSED): Retain PWA as baseline;
defer native/wrapper selection until a repeatable required capability fails
PWA and a reviewed device prototype demonstrates improvement. Alternatives:
PWA improvement (lowest duplication); thin wrapper (reuse web UI but adds bridge/
auth/store concerns); React Native (new UI/device layer, higher maintenance).
Use existing Backend for authorization/business logic in every alternative;
share transport/contracts and pure domain rules where appropriate, never fork
membership/privacy/payment policy into device clients. Record a formal accepted
ADR only after portfolio and capability evidence, with a migration/rollback plan.

TESTABILITY: HIGH for web cache/install/update policy under preview; MEDIUM for
device capabilities until real devices/targets exist. Test offline private/API
exclusion, logout, update/version recovery, direct URL/hash/back/forward, OAuth
return and cancellation, permission denial, interrupt/resume, accessible controls.
Native comparisons need physical device evidence, not emulation-only PASS.

IMPLEMENTATION_RELEASE_PLAN: Run permitted preview/device experiment first;
record exact OS/browser/fixture/version and reproducible failure. If portfolio
selects a client change, fix one proven gap, run web/API/security regressions and
device matrix; approve signing/account/security and release/rollback ownership.
No private offline content or production audio/push is activated as a side effect.

PRODUCTION_HARD_STOPS: Production deployment/restart/config/domain changes,
new store/provider paid accounts, credentials/signing installation, persistent
push/device/user-data collection and production audio activation require approval.

FUTURE_REAL_USER_VALIDATION_METRICS: Consented aggregate mobile task completion
and failure by sufficiently coarse supported device cohorts; install-to-first-
meaningful-action with explicit denominator/observation window; crash/auth-return
failure; support workload; optional notification usefulness/opt-out and audio
continuity only after approved activation. Seed device tests are capability
evidence, never adoption or user preference.

READINESS=HIGH for retaining/comparing the existing PWA baseline; native/wrapper
implementation LOW pending demonstrated gap and platform/operations decisions.
No BUILD_NEXT or store-launch decision is made.

## LNG-19-006: Multilingual Product UI

PROBLEM_OR_PRODUCT_OPPORTUNITY: The global language-community positioning can
benefit from UI comprehension beyond Vietnamese. This is a pre-launch product
opportunity, not an assertion that foreign-user demand already exists.

EXPECTED_PRODUCT_VALUE: Clearer onboarding/navigation/error recovery for an
approved second UI locale, without changing learning language or translating
user-authored content. Value must later be tested with real consenting users.

EXISTING_CAPABILITY_REUSE: KEEP `src/components/layout/Header/` and focused
feature components, language catalog/content direction metadata, existing
formatters and semantic accessibility. ADAPT formatting/copy owners rather
than replacing the design system. BUILD_NEW locale resolver/catalog contract.
Exact Frontend evidence: `index.html` sets `lang="vi"`; `public/manifest.webmanifest`
sets Vietnamese language/LTR; `src/components/layout/Footer/Footer.tsx` offers
only vi with no change handler; `package.json` has no localization dependency;
`src/features/events/event.formatters.ts`, `src/features/challenges/challenge.formatters.ts`,
`src/features/membership/membership.utils.ts`, `src/features/notifications/notification.copy.ts`
hardcode vi-VN formatting. `src/features/community/components/CommunityPostCard.tsx`
and `src/features/passport/PassportPages.tsx` already use content-language direction.
`src/features/seo/SeoHead.tsx` manages route metadata, requiring deliberate locale
integration. These findings establish a localization gap, not completed i18n.

TECHNICAL_COMPLEXITY: MEDIUM for infrastructure and one bounded journey; HIGH
for complete all-feature localization. Copy, validation messages, relative time,
accessibility labels, SEO/install/offline surfaces and backend errors have
different owners and should be migrated incrementally.

SECURITY_PRIVACY_RISK: Locale is untrusted input: use approved locale allowlist,
plain-text interpolation and safe fallback. Do not render translation HTML or
accept path/URL input as catalog imports. Preserve escape/sanitization, Unicode
limits, API error codes and authorization. Locale preference storage needs
review; do not add a production account field or infer nationality from locale.

EXTERNAL_PROVIDER_DEPENDENCY: None required for local catalogs and platform Intl
formatting. A localization library choice needs official-doc/source and license
review before implementation. Professional translation/review is an owner
resource decision; no paid translation account or AI translation service here.

LEGAL_PAYMENT_DEPENDENCY: Payment-independent UI localization. Policy/legal
translations require accountable review; untranslated terms cannot silently
claim equivalent legal meaning. Disabled payment UX remains disabled in every
locale, without promising localized live purchases.

PRODUCT_DEPENDENCIES: Approve first additional locale and translation owner,
copy glossary, fallback and support policy. Proposed comparison candidate is
English for global navigation, not an automatic locale selection. UI locale
must be distinct from learning/native/known language. Explicit user choice wins;
browser preference can be a bounded initial suggestion, never learning-target
inference. Preserve stable resource/API language IDs.

ESTIMATED_IMPLEMENTATION_SCOPE: 2–4 coherent capabilities if selected: locale
catalog/resolver/fallback and formatting contracts; shell/auth/onboarding copy;
one end-to-end core journey with errors/a11y; install/offline/SEO compatibility.
Full community/Library/admin/AI/events/rooms/payment copy follows separately
after inventory, not one sweeping rewrite. No route-prefix migration is assumed;
compare local preference versus locale URLs before an accepted routing ADR.

COST_AND_OPERATIONS: Translation review and ongoing catalog completeness are
the main recurring costs; require keys/version checks and copy ownership. Lazy
locale loading should preserve performance budgets. Backend emails/error copy,
policy/help pages and support response locale require separate coverage decisions.

ARCHITECTURE_DECISION (PROPOSED): Feature-owned message catalogs with shared
locale/formatting primitives and an explicit fallback; retain learning-content
language/direction independently. Prefer one localization mechanism over a
second per-feature system. Compare lightweight typed catalogs with a reviewed
library for plural/message composition; choose after complexity/license review.
Plural rules, dates, timezones and number/currency display must not be raw string
replacement. Global UI `lang`/`dir` follows selected UI locale; content retains
its own language/direction. Do not claim RTL readiness from content `dir` alone.

TESTABILITY: HIGH for key completeness, resolver/fallback, plural/formatting
and pseudo-localization in TEST; translation correctness needs fluent human
review. Cover missing keys, unsupported locale, interpolated malicious text,
mixed-script content, RTL simulation, timezone/day boundaries, DST and long copy;
verify labels/live regions/focus and existing direct URLs/hash/history behavior.

IMPLEMENTATION_RELEASE_PLAN: If selected, inventory strings including errors,
accessible names, manifest/offline/SEO; approve locale/glossary and ADR; establish
catalog/formatting tests, then migrate a single complete journey. Use Stitch
for any substantially changed locale control/shell; preserve scoped CSS and
320/375/390/412/768/1024/1440 layouts. Gate release on reviewed translations,
fallback consistency, existing feature/security tests and build/performance.
Backend API codes remain stable; localize approved user-facing mapping rather
than translating identifiers or leaking internal exception messages.

PRODUCTION_HARD_STOPS: Deployment/restart/env change, production locale-profile
migration/write, new provider account/credentials and persistent new user-data
collection require explicit approval. Local/disposable preference tests do not
authorize writing production profiles.

FUTURE_REAL_USER_VALIDATION_METRICS: Approved comprehension/task-completion
study per UI locale with denominator and sampling method; language-switch/fallback
failure and untranslated-message reports; successful onboarding/error recovery;
support themes and time to resolution. Locale uptake is not nationality/demand
and must not be inferred from learning targets. Apply reviewed suppression and
real-user exclusions before reporting subgroup rates.

READINESS=HIGH for bounded localization infrastructure discovery; complete
multilingual production rollout MEDIUM pending locale/copy/routing decisions.
No implementation or portfolio BUILD_NEXT choice occurs in this report.

## Shared release boundary and evidence classification

No Backend/Frontend changes, migrations, provider selection, user data collection
or production mutation were made. PAYMENT_REMAINS_DISABLED=YES; monitoring and
Phase 18 controls remain unchanged. Future tests described here are plans,
not executed PASS claims. Future real-user metrics are validation targets,
not fabricated current counts. Phase 20 stays unstarted. The owner amendment
permits these pre-launch discoveries; downstream build/release remains subject
to authoritative portfolio selection and existing production hard stops.
