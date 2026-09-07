# EduAI Backend Reuse Audit

**Task:** LNG-00-001
**Audit date:** 2026-09-07
**Reference repository:** `D:/Work/Edu-AI/EduAI-Back-End`
**Reference commit:** `1c1ab2f` (`fix(payments): accept PayOS pending shape`)
**Audited repository:** `D:/Work/CongDongNgonNgu/CongDongNgonNgu-Workspace`
**Runtime changes to EduAI:** none

## Audit boundary

This is a source-level reuse audit, not a clone approval. The reference
repository was inspected at its real commit, including application modules,
configuration, Prisma schema fragments and migrations, provider adapters,
seeds, scripts, and tests. No secret values were opened. The EduAI working
tree had a pre-existing `.env.example` change; it was preserved and is not
part of this task.

`KEEP` below means “the technical idea is a candidate for reuse after an
independent implementation review.” It never means copying source, data,
secrets, production URLs, migrations, or product language unchanged.

| Classification | Meaning for CongDongNgonNgu |
| --- | --- |
| `KEEP` | Small, product-neutral technical primitive may be retained with provenance and tests. |
| `ADAPT` | Useful pattern, but contracts, names, policies, dependencies, or threat model must be rewritten. |
| `REMOVE` | EduAI/LMS/career/product surface must not exist in the new baseline. |
| `BUILD_NEW` | CongDongNgonNgu needs a domain model or contract that EduAI does not provide. |
| `DEFER` | Potentially useful later, but excluded from Phase 00 runtime and schema. |

## Reference inventory

The real repository contains a NestJS 10 application with Prisma 7,
PostgreSQL, Redis, Firebase Admin, OAuth providers, OpenAI/Gemini, R2/S3,
PayOS, email delivery, and QR-code support. `package.json` exposes build,
unit, e2e, Prisma, endpoint-security, seed, production-migration, and
production-configuration verification scripts.

Observed TypeScript/spec inventory:

- `src/modules`: 443 TypeScript files, 141 `*.spec.ts` files across 27
  modules.
- `src/common`: 21 TypeScript files and 6 specs.
- `src/config`: 11 TypeScript files and 5 specs.
- `prisma`: 39 TypeScript files and 22 specs, plus merged schema fragments and
  47 migration directories.
- `test`: 6 TypeScript files for e2e support.

The application root in `src/app.module.ts` imports the following domains:
AppConfig, logging/monitoring, Prisma, access, audit, Redis, health, auth,
admin, profile, courses, certificates, dashboards, lessons, library,
moderation, media, notifications, quizzes, assignments, classrooms,
community, AI, commerce, memberships, payments, vouchers, scholarships, TMI,
jobs, and mentors. `src/main.ts` and `src/app.setup.ts` expose Swagger,
global validation, CORS, security headers, correlation IDs, request logging,
and global auth/rate-limit guards.

## Candidate reuse matrix

The matrix records the source path, dependency boundary, security assumptions,
environment inputs, observed tests, and the reason the candidate is or is not
appropriate for the independent product.

| Candidate/source | Dependencies and security assumptions | Environment inputs | Observed tests | Decision and reason |
| --- | --- | --- | --- | --- |
| `src/app.setup.ts`, `src/common/filters/*`, `src/common/interceptors/*`, `src/common/logging/*` | Nest/Express; global validation uses whitelist/transform; request paths and structured logs redact sensitive keys; CSP currently contains `unsafe-inline` and HSTS is not explicit. | `NODE_ENV`, `CORS_ORIGINS`, port/proxy settings, logging/monitoring values. | `src/common/**/*.spec.ts`; app setup is exercised through application tests/e2e support. | `ADAPT`: retain the boundary-validation, correlation, redaction, and header ideas; rewrite CSP, product metadata, origins, and monitoring policy. |
| `src/config/configuration.ts`, `src/config/env.validation.ts`, `src/config/app-config.service.ts` | `@nestjs/config`; strict cross-field validation for JWT, Firebase, OAuth, AI, email, PayOS, and commerce idempotency. The reference permits an EduAI database example and does not prohibit every EduAI URL. | `DATABASE_URL`, Redis, JWT access/refresh, Firebase/OAuth, AI, email, R2, PayOS, monitoring, CORS. | `src/config/**/*.spec.ts` (5 observed). | `ADAPT`: preserve fail-closed provider validation and independent config sections; rename and add explicit EduAI URL/database rejection for the new repos. |
| `src/prisma/prisma.service.ts`, `src/prisma/prisma.module.ts`, `scripts/merge-prisma-schema.js` | Prisma/PostgreSQL adapter; generated client and merged schema; database URL is fully trusted input and the schema is product-wide. | `DATABASE_URL`, Prisma runtime settings. | `prisma/**/*.spec.ts` (22 observed), Prisma scripts in `package.json`. | `ADAPT`: use the connection lifecycle and migration tooling only after an approved CongDong schema; do not copy the merged client or migration history. |
| `src/common/audit/audit.service.ts`, `src/common/audit/*` | Prisma `AuditLog`; actor/target/action metadata; recursive sanitization for password/token/secret/cookie/authorization/credential/session/API-key fields. | `DATABASE_URL`; no external provider required. | Audit specs under `src/common` and consumers in module specs. | `ADAPT`: keep append-only provenance and sanitization concepts, but define CongDong actions, actor kinds, retention, and target registry. |
| `src/common/security/abuse-rate-limit.guard.ts`, `rate-limit.decorator.ts`, `src/config/redis-config.service.ts` | Redis counters with expiry; non-production memory fallback; production fails closed if Redis is absent; identity keys are hashed. | `REDIS_URL`, `NODE_ENV`, endpoint policy values. | Security/common specs and auth/payment consumer specs. | `ADAPT`: keep fail-closed production behavior and bounded counters; rewrite namespace, policy names, abuse model, and multi-instance operations. |
| `src/modules/auth/*`, `src/modules/firebase/*`, `src/common/guards/*` | JWT access/refresh; bcrypt cost 12; refresh-token hash/rotation/revocation in transactions; user status/deletion checks; role guard; Firebase ID-token verification; no silent external-account merge. | JWT secrets/TTLs, Firebase service-account settings, `DATABASE_URL`, Redis for OAuth state. | `src/modules/auth/**/*.spec.ts` (10), Firebase spec (1), e2e auth support. | `ADAPT`: strong lifecycle and collision patterns are valuable; Firebase, EduAI role names, response contracts, and registration/recovery semantics cannot be copied. `DEFER` provider integration until the approved Phase 02 identity design. |
| `src/modules/auth/oauth/*` | Redis one-time state/ticket store with Lua consume, HMAC state secret, provider allow-list, PKCE for Zalo, safe internal redirects, explicit account-link outcome; hard-coded prefix is `eduai:auth:oauth:`. | Facebook/Zalo client credentials, callback URLs, OAuth state secret, Redis. | OAuth/auth specs under `src/modules/auth`. | `ADAPT/DEFER`: preserve state freshness, one-time consumption, PKCE, collision, and redirect-safety ideas; replace providers, key namespace, callbacks, and product routes after Phase 02. |
| `src/modules/notifications/*` | Prisma notification/read/preference/delivery records; unique `(userId,eventKey)` idempotency; SSE replay from DB; email provider can be disabled/preview/resend; in-memory subscribers are not multi-instance. | Email provider, resend key/from, Redis or future pub/sub, `DATABASE_URL`. | `src/modules/notifications/**/*.spec.ts` (4). | `ADAPT/DEFER`: retain canonical event/read/idempotency and server-only provider boundary; rename categories, remove EduAI email copy, and choose distributed realtime strategy in Phase 12. |
| `src/modules/ai/*`, `src/modules/ai/ai-provider.ts`, `src/config/ai-config.service.ts` | Provider port for complete/embed; OpenAI/Gemini/mock factory; JWT/user ownership; quotas; strict JSON/schema validation; retrieval uses parameterized pgvector SQL; current retrieval and prompts are course/lesson/library-specific and contain EduAI branding. | AI provider selection/keys/models, Redis quota, `DATABASE_URL`, provider timeouts. | `src/modules/ai/**/*.spec.ts` (15). | `ADAPT/BUILD_NEW/DEFER`: keep provider interface, timeout/error, quota, validation, and parameterized-query patterns; build provenance/language/community context; defer AI runtime to Phase 09 and never copy prompts or data. |
| `src/modules/library/*`, `library-r2-storage.service.ts`, `src/modules/media/*`, `src/modules/profile/avatar-storage.service.ts` | S3/R2 server-side upload; MIME/size checks; production fails when storage config is missing; public URL and ownership/moderation checks. | R2/S3 account, access key, secret, bucket, public URL; `DATABASE_URL`. | Library specs (3), media (1), profile storage specs. | `ADAPT/BUILD_NEW/DEFER`: storage and upload validation are useful; build a provenance/license/review-aware language library and keep public/private media policy explicit. |
| `src/modules/community/*` | Prisma post/comment/reaction; visibility/moderation checks; ownership/admin authorization; soft delete; unique reaction conflict; audit on administrative moderation. | `DATABASE_URL`, auth/audit dependencies. | `src/modules/community/**/*.spec.ts` (3). | `ADAPT/BUILD_NEW`: structural community patterns are useful, but the CongDong post types, language targets, reports, saves, privacy, and reputation signals are new. |
| `src/modules/moderation/*`, `src/modules/admin/*` | Role-protected administration; explicit status transitions; audit history; last-active-admin protection; status/role changes revoke refresh tokens; current target registry is Course/Library/Community. | JWT/RBAC, `DATABASE_URL`, storage/audit. | Moderation (2), admin (5). | `ADAPT/BUILD_NEW`: retain authorization, transition, audit, and admin-safety patterns; define CongDong targets and permissions later. Do not expose an empty or course-oriented admin surface in Phase 00. |
| `src/modules/profile/*` | User-owned profile/skills/portfolio/storage; career response includes enrollments/courses/certificates and profile module imports course relations. | `DATABASE_URL`, R2 settings, auth. | `src/modules/profile/**/*.spec.ts` (3). | `ADAPT/BUILD_NEW`: ownership/storage primitives may help; course/career projections are not valid. Build the language profile in Phase 03. |
| `src/modules/payments/*`, `payment-provider.ts`, `disabled-payment.provider.ts` | Provider port, disabled provider, amount/currency validation, idempotency HMAC, serializable locks, webhook identity/amount checks, reconciliation, refund controls, server-only PayOS SDK. | PayOS mode/credentials/URLs, commerce idempotency secret, `DATABASE_URL`. | `src/modules/payments/**/*.spec.ts` (10). | `ADAPT/DEFER`: the hardened state machine and disabled default are worth designing from; PayOS, order tables, membership/course fulfillment, and payment routes are Phase 11 concerns and must not enter the foundation runtime. |
| `src/modules/commerce/*`, `src/modules/memberships/*` | Prisma orders/lines/events/outbox; serializable transactions; immutable order snapshots; membership versions include courses/service entitlements; fulfillment depends on course access. | `DATABASE_URL`, commerce idempotency secret, PayOS only when enabled, notification config. | Commerce (6), memberships (9), payment consumers. | `ADAPT/DEFER`: retain economic-state/idempotency principles only; remove course-access assumptions and defer membership/payment product decisions to Phase 11. |
| `src/modules/vouchers/*`, `src/modules/scholarships/*` | Voucher/scholarship scopes and redemptions are course IDs; scholarship awards call `CourseAccessService`; atomic counters and idempotency are tested. | `DATABASE_URL`, auth/audit, course-access service. | Vouchers (2), scholarships (2). | `REMOVE/DEFER`: current routes and schema are EduAI course commerce. A future community support/grant model must be designed separately if approved. |
| `src/modules/tmi/*` | Reward catalog/redemption, quota/idempotency, audit, and revocation; course-access reward metadata is mandatory for a reward kind. | `DATABASE_URL`, auth/audit, course-access service. | TMI (5). | `DEFER/BUILD_NEW`: reward/reputation economics must follow the separate XP vs Community Reputation decision; do not import “course access” rewards. |
| `src/modules/health/*`, `src/monitoring/*`, `src/jobs/*` | Health checks cover database/Redis/provider state; jobs include EduAI background work and schedulers. | Database, Redis, provider/monitoring endpoints. | Health (1); jobs (6). | `ADAPT/REMOVE`: keep provider-neutral health and safe readiness checks; remove course/career job handlers and design CongDong workers later. |

## EduAI product domains and non-survival rules

The following source domains were inspected and explicitly classified. The
file/spec counts are from the reference commit and are evidence of the real
source inventory, not an instruction to copy it.

| Module/source directory | Observed inventory | Classification | CongDongNgonNgu disposition |
| --- | ---: | --- | --- |
| `src/modules/access` | 5 TS / 2 specs | `REMOVE` domain, `ADAPT` authorization idea | No course-access graph. Rebuild resource/community permissions around the product model. |
| `src/modules/admin` | 15 / 5 | `ADAPT` | Preserve admin safety and audit patterns only; no EduAI overview metrics/routes. |
| `src/modules/ai` | 37 / 15 | `ADAPT/BUILD_NEW/DEFER` | Provider port and validation patterns only; Phase 09 language/community context. |
| `src/modules/assignments` | 16 / 6 | `REMOVE` | LMS submission/versioning routes and tables do not survive. |
| `src/modules/auth` | 34 / 10 | `ADAPT/DEFER` | Identity lifecycle is a reference; provider and account model are independently designed in Phase 02. |
| `src/modules/certificates` | 11 / 4 | `REMOVE` | Course-completion certificate routes/tables do not survive. |
| `src/modules/classrooms` | 12 / 4 | `REMOVE` | Cohort/session/attendance/recording LMS domain does not survive. |
| `src/modules/commerce` | 18 / 6 | `DEFER/ADAPT` | No foundation commerce routes; later product decision only. |
| `src/modules/community` | 10 / 3 | `ADAPT/BUILD_NEW` | Rebuild for language community content, moderation, reports, saves, and reputation. |
| `src/modules/courses` | 21 / 7 | `REMOVE/BUILD_NEW` | Do not rename Course into Language Hub. Build a separate language/resource model in later phases. |
| `src/modules/dashboards` | 6 / 2 | `REMOVE` | EduAI learner/instructor dashboards are not a foundation surface. |
| `src/modules/firebase` | 4 / 1 | `DEFER/ADAPT` | No shared Firebase project or credentials; only a provider adapter may be considered after identity design. |
| `src/modules/health` | 5 / 1 | `ADAPT` | Keep safe liveness/readiness shape with CongDong checks. |
| `src/modules/jobs` | 17 / 6 | `REMOVE/DEFER` | Career/job workflows are outside the product foundation. |
| `src/modules/lessons` | 15 / 4 | `REMOVE` | Lesson progression and course enrollment assumptions do not survive. |
| `src/modules/library` | 13 / 3 | `ADAPT/BUILD_NEW` | Keep upload/visibility/favorite mechanics only; build provenance and licensing. |
| `src/modules/media` | 5 / 1 | `ADAPT` | Keep bounded media/provider boundary if needed. |
| `src/modules/memberships` | 20 / 9 | `DEFER/ADAPT` | No membership runtime/schema in Phase 00; later model cannot include EduAI courses. |
| `src/modules/mentors` | 20 / 8 | `REMOVE/DEFER` | Career/mentor booking domain is not the foundation. |
| `src/modules/moderation` | 8 / 2 | `ADAPT/BUILD_NEW` | Keep transition/audit discipline; rebuild target types and policies. |
| `src/modules/notifications` | 13 / 4 | `ADAPT/DEFER` | Later shared notification contract; remove EduAI copy and category assumptions. |
| `src/modules/payments` | 30 / 10 | `DEFER/ADAPT` | Disabled provider pattern may inform the boundary; no payment route or PayOS credential in foundation. |
| `src/modules/profile` | 20 / 3 | `ADAPT/BUILD_NEW` | User ownership is useful; career/course projections are removed; language profile is Phase 03. |
| `src/modules/quizzes` | 12 / 4 | `REMOVE/DEFER` | LMS quiz/completion/certificate paths do not survive. AI-assisted practice is a later separate design. |
| `src/modules/scholarships` | 9 / 2 | `REMOVE/DEFER` | Course-scoped scholarship workflow does not survive unchanged. |
| `src/modules/tmi` | 19 / 5 | `DEFER/BUILD_NEW` | Do not import EduAI reward catalog or course-access benefits. |
| `src/modules/vouchers` | 10 / 2 | `REMOVE/DEFER` | Course-scoped discounts are not a foundation feature. |

## Prisma schema and migration audit

### Entity families that must not be copied

The schema fragments under `prisma/schema/` include the following EduAI
families: `30-course.prisma`, `31-lesson.prisma`, `40-enrollment.prisma`,
`41-learning-progress.prisma`, `50-quiz.prisma`, `51-assignment.prisma`,
`60-classroom.prisma`, `81-certificate.prisma`, `82-job-opportunity.prisma`,
`83-mentor.prisma`, `84-mentor-booking.prisma`, `85-mentor-session.prisma`,
`86-mentor-outcome.prisma`, `96-voucher.prisma`, `97-scholarship.prisma`,
`98-tmi-reward.prisma`, `99-tmi-redemption.prisma`, and the course-coupled
`102-course-access.prisma`. These are `REMOVE` or `DEFER`; no CongDong
database may be bootstrapped from them.

The following are also product-coupled even though they contain reusable
technical ideas:

- `100-commerce.prisma` and `101-membership.prisma`: order/payment
  idempotency and immutable snapshots are useful, but product lines,
  included courses, and access grants are EduAI-specific.
- `90-ai.prisma`: conversation, message, embedding, generated quiz, and
  flashcard records are tied to course/lesson/library source types and need a
  new provenance/retention policy.
- `70-library.prisma` and `80-community.prisma`: visibility and uniqueness
  patterns are useful, but the new product needs licensing, language targets,
  reports, saves, and richer moderation states.

### Schema families eligible for later independent implementation

`10-user.prisma`, `11-role.prisma`, `12-user-role.prisma`,
`13-refresh-token.prisma`, `14-external-identity.prisma`, `20-user-profile.prisma`,
`85-notification.prisma`, and `95-audit.prisma` are `ADAPT`, not copy targets.
Their fields, role values, retention policies, indexes, and relations require
the Phase 02/03/12/15 contracts. No Phase 00 schema should silently include
future language, community, reputation, AI, or payment tables.

### Migration history

The reference migration history begins with auth/profile and then adds course,
lesson, enrollment, quizzes, assignments, classrooms, library, community, AI,
certificates, audit, notifications, learning profiles, career, jobs, mentors,
commerce, memberships, course access, and PayOS/payment hardening. Later
migrations include Firebase auth and external OAuth identities. The history is
not portable: it encodes EduAI table names, enums, foreign keys, course-access
backfills, membership continuity, payment reconciliation, and demo contracts.
CongDong must start its own migration history after the approved minimal
bootstrap schema is designed.

## Provider, route, seed, and configuration exclusions

The following are explicit non-survival checks for the implementation tasks:

- `src/main.ts` Swagger title/description and root redirect are EduAI
  branded; they must be independently authored.
- Active route families such as `/courses`, `/lessons`, `/assignments`,
  `/quizzes`, `/classrooms`, `/certificates`, `/jobs`, `/mentors`,
  `/scholarships`, `/vouchers`, `/commerce`, `/memberships`, and course access
  must not remain reachable in the foundation baseline.
- OAuth allowlisted redirects currently include EduAI paths; the new product
  needs a separate allowlist and state namespace.
- AI prompts and mock output include “EduAI Tutor”, “EduAI Summary”, and
  “Trợ giảng EduAI”; these are branding leaks and must never be carried into a
  CongDong runtime.
- Notification email copy includes EduAI branding and must be rewritten.
- `prisma/seed.ts`, `prisma/demo-seed.ts`, `prisma/final-demo-seed.ts`,
  `prisma/seed-minimal.ts`, and verification/reset scripts create EduAI users,
  courses, lessons, certificates, vouchers, scholarships, memberships, and
  payment scenarios. They are reference-only and must not be copied.
- `.env.example` demonstrates an EduAI database name and provider settings.
  New examples must use neutral local placeholders, independently named
  variables, disabled optional providers, and no credentials, project IDs, or
  production endpoints. The audit did not read `.env` or Firebase JSON
  values.
- PayOS is a live provider integration. Its disabled provider and typed
  contract are useful design references, but no PayOS route, key, webhook URL,
  receiving-account data, or payment migration enters Phase 00.

## Security-hardened behavior worth adapting

These behaviors are specifically worth carrying into independent designs,
subject to fresh tests and threat-model review:

1. Refresh tokens are stored as hashes, rotated on use, revoked on logout and
   account status changes, and checked against current user status.
2. External identity collisions produce an explicit account-link outcome;
   social providers are never silently merged into an existing account.
3. OAuth state/tickets are opaque, short-lived, single-use, provider-bound,
   and protected by Redis/Lua atomic consumption with production fail-closed
   behavior.
4. Boundary DTO validation uses whitelist/transform and bounded fields;
   payment amounts are derived from server-side state rather than trusted
   client totals.
5. Payment webhook handling locks attempts, compares provider event identity,
   amount, currency, order, and receiving-account identity, and makes
   settlement/fulfillment idempotent.
6. Audit and structured logs recursively redact sensitive keys; application
   errors do not expose provider secrets.
7. Production rate limiting requires Redis rather than silently falling back
   to a per-process map.
8. File uploads enforce MIME/size and ownership/visibility checks; production
   storage configuration fails closed.

These are patterns, not permission to reuse EduAI's secrets, database, users,
provider accounts, API URLs, role vocabulary, or production data.

## Phase 00 implementation consequences

1. Build the CongDong backend from a minimal independent NestJS baseline only
   after the new repository is inspected. Start with health, config validation,
   database boundary, logging/security primitives, and the approved identity
   foundation; do not carry any LMS route or schema.
2. Keep the Phase 00 database/migration surface minimal. Language and
   community tables belong to later phases and must not be invented here.
3. Use the audit as the source for the frontend audit terminology, but inspect
   the real frontend separately before deciding what its shell or API plumbing
   can contribute.
4. Re-run a repository search for EduAI names, old domains, course IDs, keys,
   and provider URLs at LNG-00-007. Any intentional historical reference must
   be documented; active runtime coupling is a failure.

## Audit verification

- Source commit and working-tree status were checked before writing this
  document.
- Module, source/spec, schema-fragment, migration, package-script, and
  provider inventories were gathered from the real EduAI repository.
- No EduAI runtime file was modified by this task.
- No secret value was read or copied.
