# EduAI Frontend Reuse Audit

**Task:** LNG-00-002
**Audit date:** 2026-09-07
**Reference repository:** `D:/Work/Edu-AI/EduAI-Front-End-Web`
**Reference commit:** `1990128` (`fix(auth): require social role onboarding`)
**Audited repository:** `D:/Work/CongDongNgonNgu/CongDongNgonNgu-Workspace`
**Runtime changes to EduAI:** none
**Reference working tree:** pre-existing modifications in `src/features/commerce/CartPage.test.tsx` and `src/services/payment.service.ts`; preserved

## Audit boundary

This is a source-level audit of the real EduAI React/Vite repository. It
covers the entrypoint, route graph, auth/API/session plumbing, service and
feature inventory, shell/UI primitives, notification/realtime and PWA
infrastructure, environment/configuration, tests, Playwright/visual setup,
CI, and deployment coupling. The EduAI `.env` file was not opened. No
credentials, Firebase project values, screenshots, generated bundles, or
production assets were copied.

`KEEP` means a tooling or technical idea can be independently reimplemented
after review. It does not approve EduAI route names, tokens, branding, assets,
API contracts, browser storage keys, Firebase project configuration, demo
accounts, or production deployment settings.

## Reference inventory and verification

- `package.json` identifies React 18, React Router 6, Vite 6, Tailwind,
  Firebase client SDK, Vitest, Testing Library, and Playwright.
- The source inventory contains 412 files under `src`, 90 unit-test files,
  and 22 feature directories.
- Unit baseline: `npm.cmd test -- --run` passed **90 test files / 329 tests**.
- Build baseline: `npm.cmd run build` was run in the pre-existing dirty
  working tree and failed during `tsc --noEmit` on two errors in
  `src/features/commerce/CartPage.test.tsx`: `paymentService.pending` does
  not exist on the current payment service type at lines 63 and 103. The
  preserved dirty diff adds a pending-payment test/service path; this audit
  records the mismatch and does not modify EduAI.
- `.github/workflows/ci.yml` runs `npm ci`, unit tests, build, production
  dependency audit, PWA browser checks, and embedded payment browser checks.
- `playwright.config.ts` starts the sibling EduAI backend by default, uses
  demo accounts and `DEMO_ACCOUNT_PASSWORD`, and has local/production auth
  state scopes. This is useful test architecture but not a CongDong fixture
  or backend dependency.

## Candidate technical reuse matrix

| Candidate/source | Dependencies and security assumptions | Environment inputs | Observed tests | Decision and reason |
| --- | --- | --- | --- | --- |
| `src/main.tsx`, `src/App.tsx`, `src/routes/index.tsx` | React DOM, React Router, lazy route loading, Suspense fallback, skip link, semantic `main`, header/footer chrome. Client guards are UX only; backend authorization remains authoritative. | Browser origin and Vite build mode; API base is consumed by services. | `src/App.test.tsx`; route and feature tests. | `ADAPT`: retain a small lazy shell, focus management, and loading-state shape; rebuild the route graph and neutral temporary shell. Do not carry EduAI routes or navigation labels. |
| `src/components/ui/*`, `src/components/layout/*` | React/Radix/Lucide/Tailwind; controls include disabled/loading, labels, focus-visible, and keyboard affordances. Header directly links courses/jobs/community/AI/library/certificates/cart. | No provider credentials; visual values are in CSS/Tailwind. | UI/header/footer tests; feature consumers. | `ADAPT/BUILD_NEW`: technical accessibility conventions may help; visual identity, navigation, copy, icons, and component composition must be designed independently. |
| `src/styles/global.css`, `tailwind.config.ts` | Global CSS variables, responsive breakpoints, 320px minimum, focus ring, skip link, reduced-motion rule, Inter/Plus Jakarta Sans, blue/purple EduAI palette, shadow/radius tokens. | None. | `src/styles/mobile-tokens.test.ts`. | `ADAPT/REMOVE`: retain measurable accessibility/responsive/reduced-motion constraints; discard EduAI palette, typography, token names, and visual system. Phase 01/Stitch owns the new design. |
| `src/services/api-client.ts` | Fetch wrapper; `{ success, data, message }` envelope; bearer token injection; JSON/FormData handling; correlation ID error; clears local session after a 401. It also accepts arbitrary absolute URLs, so callers must be trusted. | `VITE_API_BASE_URL`, default `/api/v1`. | `api-client.multipart.test.ts`, auth/service consumers. | `ADAPT`: preserve typed error/envelope, body handling, request IDs, and 401 behavior only if the CongDong API contract agrees; narrow URL policy and rename storage/monitoring boundaries. |
| `src/services/auth.service.ts`, `auth-session.storage.ts`, `src/features/auth/auth-store.ts` | Firebase email/password/Google, backend session exchange, OAuth ticket exchange, refresh token in a JSON session persisted in `localStorage`, pending registration in `sessionStorage`; keys begin `eduai.`. | `VITE_FIREBASE_*`, `VITE_API_BASE_URL`, browser origin. | `auth.service.test.ts`, email/password and Google auth specs, auth feature tests. | `ADAPT/DEFER`: lifecycle, explicit exchange, error taxonomy, and cross-tab store are useful; do not copy Firebase project/provider flow, EduAI keys, role vocabulary, or token storage without a fresh security decision in Phase 02. |
| `ProtectedRoute.tsx`, `RoleProtectedRoute.tsx` | React redirects based on cached session and roles; no client-only authorization claim. Roles are `student`, `instructor`, `platform_admin`, `admin`. | Auth session in local storage. | Route guard tests. | `ADAPT`: retain redirect/loading behavior as presentation support; rebuild roles and ensure every backend route enforces authorization independently. |
| `src/lib/firebase.ts`, `src/services/social-oauth-popup.ts` | Firebase public client config; Google popup; Facebook/Zalo backend OAuth; origin/source/provider checks for `postMessage`; safe ticket pattern and allowlisted error codes; popup fallback for embedded/mobile browsers. | Firebase public config, API origin, browser origin. | `firebase.test.ts`, `google-auth.service.test.ts`, `social-oauth-popup.test.ts`, Playwright social OAuth. | `DEFER/ADAPT`: provider-boundary and popup message validation are useful; no Firebase project, provider config, `eduai.*` message names, or provider contracts survive. |
| `src/features/notifications/*`, `notification.service.ts`, `notification-stream.client.ts` | Authenticated fetch to SSE, `Last-Event-ID`, event parser validates notification shape, reconnect backoff, 30-second polling fallback, read/preferences APIs. | `VITE_API_BASE_URL`, access token. | Notification service, stream, hook, and center tests. | `ADAPT/DEFER`: retain bounded SSE parsing/reconnect/fallback ideas for Phase 12; rebuild categories, links, event contract, and cross-tab/distributed assumptions. |
| `src/features/pwa/*`, `src/pwa.test.ts`, `public/sw.js`, `public/manifest*.json` | Hand-written service worker; network-first navigation, public static caching, offline page, install/update UX, no caching for API/auth/private/payment/mutation paths. Cache prefix is `eduai-pwa-`; worker and manifest are EduAI branded. | `import.meta.env.PROD`; same-origin service worker scope. | PWA utility/runtime/install tests and Playwright PWA tests. | `ADAPT/DEFER`: the fail-closed cache policy and update lifecycle are strong candidates for Phase 16; rebuild cache namespace, manifest, icon/art direction, offline copy, and route denylist. |
| `src/services/client-monitoring.ts` | Optional `navigator.sendBeacon` JSON diagnostics with bounded fields supplied by callers; endpoint is client-configured, so privacy/allow-list policy is required. | `VITE_MONITORING_ENABLED`, `VITE_MONITORING_ENDPOINT`. | `client-monitoring.test.ts`. | `ADAPT/DEFER`: preserve opt-in and no-token event shape only after an independent privacy/security review; no EduAI endpoint or event taxonomy. |
| `src/test/setup.ts`, Vitest config | jsdom, Testing Library cleanup, `src/**/*.test.{ts,tsx}`, Vite alias. | None. | 90 files / 329 tests observed and passed at reference commit. | `KEEP/ADAPT`: tooling shape is reusable; test data, text, API contracts, and fixture assumptions are not. |
| `playwright/*.ts`, `playwright.config.ts`, visual config, sanitized reporter | Browser projects, auth setup, responsive screenshots, runtime console/network guards, sanitized diagnostics, PWA/WebKit coverage. Default config couples to `../EduAI-Back-End`, EduAI demo emails, and local/production auth state. | `DEMO_ACCOUNT_PASSWORD`, `VITE_API_BASE_URL`, `PLAYWRIGHT_*`, backend paths, CI. | Dozens of smoke/responsive/PWA/payment/production specs and screenshots. | `ADAPT`: retain deterministic browser/test architecture and redacted reporting; remove EduAI accounts/backend path, payment/course scenarios, and visual snapshots. |
| `vite.config.ts`, `vercel.json`, `.github/workflows/*` | Vite dev proxy to localhost:3000; custom plugin named `eduai-pwa-precache`; Vercel SPA rewrite; CI quality/PWA/payment jobs; deploy workflow resets a VPS, uses secrets, and contains EduAI production URLs. | `VITE_API_BASE_URL`, Firebase placeholders, CI/VPS/Telegram secrets. | CI itself defines the reference gates. | `ADAPT/REMOVE`: keep install/test/build/audit gates and SPA rewrite concept; rewrite plugin names, API defaults, deploy assumptions, and never copy production SSH/Telegram/EduAI URL logic. |

## Route and feature classification

The real `src/App.tsx` route graph is active, not merely dead reference code.
The following routes and feature directories must not define the CongDong
foundation shell.

| Feature/source | Classification | Disposition |
| --- | --- | --- |
| `features/auth`, `/login`, `/register`, `/check-email`, `/auth/callback` | `ADAPT/DEFER` | Rebuild identity screens after Phase 02; preserve only tested loading/error/accessibility patterns. |
| `features/home`, `/` | `BUILD_NEW` | New community/language entry narrative; no EduAI hero/course carousel. |
| `features/courses`, `/courses`, `/courses/:courseId` | `REMOVE/BUILD_NEW` | Course catalog/detail UI is LMS-specific. Do not rename it into Language Hub; build that later from the CongDong contract. |
| `features/learning`, `/learning/:courseId` | `REMOVE` | Course lesson player, progress, and AI lesson context do not survive. |
| `features/assignments`, `/assignments/:assignmentId/submit` | `REMOVE` | LMS submission route and UI. |
| `features/quizzes`, `/quizzes/:quizId/take` | `REMOVE/DEFER` | LMS quiz flow; future practice is a separate design. |
| `features/classroom`, `/classroom-sessions/:sessionId` | `REMOVE/DEFER` | Live classroom/attendance/session UI is outside foundation. |
| `features/dashboard`, `/dashboard/*`, `/instructor/dashboard/*`, `/admin/dashboard/*` | `REMOVE/BUILD_NEW` | EduAI learner/instructor/admin dashboards and metrics cannot be copied. Later admin/community work owns its own surfaces. |
| `features/certificates`, `/verify*`, `/certificates` | `REMOVE` | Course certificate verification and redirects do not survive. |
| `features/jobs`, `features/career`, `/jobs*`, `/career/:publicSlug` | `REMOVE/DEFER` | EduAI career/job/portfolio presentation is not a foundation product surface. |
| `features/commerce`, `features/memberships`, `features/payments`, `/cart`, `/membership`, `/payments/*` | `DEFER/REMOVE` | Payment, PayOS, cart, and course membership UI is Phase 11 at the earliest. No dead routes in the baseline. |
| `features/mentors`, `/mentor*` where present in feature services | `REMOVE/DEFER` | Career mentorship workflow is not a foundation dependency. |
| `features/community`, `/community` | `ADAPT/BUILD_NEW` | A community surface is relevant, but post fields, moderation, language targets, reputation, reports, and privacy must be new. |
| `features/library`, `/library` | `ADAPT/BUILD_NEW` | Reuse list/upload/error/loading mechanics only; provenance, licensing, visibility, and review are new. |
| `features/ai`, `/ai*` | `DEFER/BUILD_NEW` | No AI surface in Phase 00; future AI must be grounded in CongDong sources and consent policy. |
| `features/notifications` | `ADAPT/DEFER` | Later shared notification surface; no EduAI categories or links. |
| `features/legal` | `BUILD_NEW` | Re-author policies for CongDong, data licensing, moderation, privacy, and user rights. |
| `features/pwa` | `DEFER/ADAPT` | PWA is Phase 16; technical lifecycle may inform later work. |

Active EduAI route families that must be removed or replaced before the new
frontend baseline is considered independent include `/courses`, `/learning`,
`/assignments`, `/quizzes`, `/classroom-sessions`, `/dashboard`,
`/instructor`, `/admin`, `/certificates`, `/verify`, `/jobs`, `/career`,
`/cart`, `/membership`, `/payments`, `/checkout`, and course-scoped AI links.

## Branding, design, and asset coupling

The following inspected paths contain active EduAI identity or course/LMS
assumptions and cannot define the new design:

- `index.html` title and Apple metadata use EduAI.
- `public/manifest.json` and `manifest-v3.json` use EduAI education metadata,
  EduAI colors, course shortcuts, and EduAI icon assets.
- `public/sw.js`, `vite.config.ts`, PWA tests, and handoff docs use the
  `eduai-pwa-` cache namespace and EduAI offline/update copy.
- `src/components/layout/header.tsx` and `footer.tsx` expose course/job/AI/
  certificate/cart navigation and EduAI copy.
- `src/styles/global.css` and `tailwind.config.ts` encode the existing blue/
  purple EduAI token system and typography.
- `public/demo-assets/*`, course placeholders, certificate previews, and
  `public/cns-logo.png` are reference assets, not approved CongDong assets.
- `docs/handoffs/LEARNING_STITCH_UI_SPEC.md` is an EduAI learning-screen
  specification. It is useful evidence that visual decisions were scoped to
  EduAI course APIs, not a CongDong design source.

CongDong Phase 00 should use a neutral temporary shell only. Phase 01 must
produce the independent design system and Stitch evidence before any major
user-facing redesign.

## API, storage, and security findings

1. `ApiClient` correctly distinguishes JSON/FormData and reports correlation
   IDs, but its absolute-URL escape hatch needs an allow-list or removal in a
   new client so untrusted path values cannot become exfiltration targets.
2. The cached `AuthSession` includes access and refresh tokens in
   `localStorage` under an EduAI key. This is a material XSS/storage tradeoff,
   not a pattern to copy automatically; Phase 02 must decide on the session
   architecture with the backend.
3. Firebase browser configuration is read from `VITE_FIREBASE_*`. These are
   client-visible configuration values, but the project identity and
   authorized origins are still product-specific and must not be reused.
4. OAuth popup messages validate source, origin, provider, ticket shape, and
   bounded error codes. This is worth adapting with a CongDong message
   namespace and callback contract.
5. Playwright auth setup reads a demo password and writes auth state files;
   those values and files must stay local/CI-secret-only and must not enter the
   new repository.
6. The service worker explicitly excludes API/auth/private/mutation/payment
   paths from caches. This fail-closed behavior is a security requirement to
   preserve when PWA is implemented later.
7. Client monitoring is opt-in but can send a caller-supplied endpoint and
   must never receive access tokens, provider errors, or user content.

## Phase 00 implementation consequences

1. Bootstrap the CongDong frontend from the existing repository only after
   inspecting the real CongDong source and the backend audit. Keep build,
   TypeScript, unit-test, API-client, and accessibility plumbing where it is
   compatible; remove the EduAI route tree and production defaults.
2. Do not copy EduAI screenshots, demo assets, Firebase values, auth state,
   `.env`, deployment workflow, or course/payment service contracts.
3. Keep the temporary shell visually neutral. The new brand, global tokens,
   typography, and substantial UI belong to Phase 01 and require Stitch.
4. Do not add language/community/AI/payment UX during the foundation
   bootstrap. A buildable shell and safe API/config boundary are sufficient.
5. Re-run a full search for `EduAI`, `eduai`, old domains, course identifiers,
   Firebase project IDs, PayOS, and unsafe endpoints in LNG-00-007. Any
   historical audit reference must be outside active runtime code and
   documented.

## Audit verification and limitation

- Reference source commit and pre-existing working-tree diff were checked
  before audit documentation; unrelated user changes were preserved.
- Entry points, active route graph, services, providers, storage keys,
  notification/PWA runtime, tests, visual config, CI, and deployment source
  were inspected.
- Unit tests passed 90/90 files and 329/329 tests.
- The reference build failure is recorded above; it is a pre-existing stale
  test mock contract and was not changed.
- No EduAI runtime file was modified and no secret value was read or copied.
- Playwright browser scenarios and dependency audit were not run as part of
  this source-only audit; their configured commands and CI gates were audited.
