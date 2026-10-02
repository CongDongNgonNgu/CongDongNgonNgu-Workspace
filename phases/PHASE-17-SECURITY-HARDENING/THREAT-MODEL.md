# Phase 17 Threat Model and Attack-Surface Inventory

**Task:** LNG-17-001

**Review date:** 2026-10-02

**Source heads:** Backend `6859ec5e57e8792ea188fe03bcea9c9f94d3ad54`,
Frontend `620f17c5f8b742fe4062e91fa33b9455d2b8a036`, Workspace
`bf119373036ef86173fafc69721df627b550c3f6`.

**Method:** source-first review of the real Nest controllers/services,
repository boundaries, migrations/contracts, React auth/API client and the
Phase 09–16 handoffs. Route claims below are limited to routes found in the
current source tree; this is not an assumption that a future provider or
surface is enabled.

## 1. Security objectives

1. The Backend is authoritative for identity, session validity, roles,
   ownership, privacy projection, entitlement, moderation and ledger facts.
2. Browser cookies are treated as a CSRF boundary; bearer access tokens are
   short-lived, held in frontend memory and checked against a live server
   session.
3. Public projections never expose credentials, refresh tokens, provider
   secrets, private room/event data, exact private schedule/location data or
   internal moderation/audit detail.
4. User text, markdown, uploads, community corrections, retrieved library
   content, AI output and payment/provider responses are untrusted until
   validated at their consuming boundary.
5. Security evidence must be reproducible from source, deterministic tests,
   scans and remote commit/CI state; no production data is required.

## 2. Assets and trust boundaries

| Boundary | Assets at risk | Trusted authority and controls |
| --- | --- | --- |
| Browser ↔ API | access token, refresh/CSRF cookies, OAuth state, user actions | TLS in production, explicit CORS origins, SameSite/HttpOnly/Secure cookies, double-submit CSRF for cookie requests, global DTO validation, sanitized exception filter. |
| API ↔ identity/session store | user identity, password/reset/verification tokens, sessions, OAuth transactions, roles | server-side password hashing, opaque token digests, one-time/expiring transactions, refresh rotation and family revocation, live user/session lookup, parameterized repository queries. |
| API ↔ community/library/rooms/events | private profiles, blocks/reports, corrections, resource provenance, invitations, room presence/chat, attendance | controller guards plus service ownership/access checks, bounded DTOs, plain-text rendering, privacy-safe projections, idempotency/replay keys where applicable. |
| API ↔ AI/retrieval | private learner context, prompts, retrieved text, model output, usage/quota facts | provider-neutral adapter, explicit role separation, private-content exclusion, bounded schema parsing, quota/cost ports and fail-closed provider state. |
| API ↔ commerce/provider | orders, payment attempts, webhook secrets, entitlements, credit/ledger facts | provider-neutral payment port, signature/replay/idempotency checks, server-derived amounts and entitlement transitions, no client-authoritative balance. |
| API ↔ admin/audit/config | roles, moderation actions, audit metadata, secrets and provider configuration | server capability checks, last-admin protection, sanitized audit projections, startup env validation, secrets never returned to browser/logs. |
| API ↔ outbound providers | OAuth/email/AI/storage/realtime/payment credentials and availability | validated HTTPS production configuration, disabled-provider fail-closed behavior, bounded payloads and explicit error normalization. |

## 3. Attack-surface inventory

### Identity and session

- `auth.controller.ts`: register/login, email verification/recovery, refresh,
  logout/logout-all, OAuth start/callback/link and `me`.
- `auth.service.ts`, `auth/session/session.service.ts`,
  `auth/oauth/*`, `identity/*`: credential/token lifecycle, OAuth account
  collision, refresh rotation, role/session projection.
- Existing controls confirmed: generic recovery responses, password hashing,
  access-token live session lookup, refresh replay-family revocation, CSRF
  origin/double-submit checks for refresh-cookie requests, opaque one-time
  OAuth transaction state and verified provider email.

### Authorization and privacy

- `admin/*`: capability/role checks, last-admin protection and audit writes.
- `profile/*`, `exchange/*`, `notifications/*`, `rooms/*`, `events/*`,
  `challenges/*`, `community/*`, `corrections/*`, `library/*`: user-owned
  reads/writes, private/public projections, invitations, blocks/reports,
  room and event access, review/moderation state.
- `ai/*`, `reputation/*`, `membership/*`: private learner projections,
  quota/usage, entitlements and ledger-facing actions.

### Input, content and transport

- Global `ValidationPipe` uses transform, whitelist and
  `forbidNonWhitelisted`; controllers use UUID/length/range/enum/date DTOs.
- `app.setup.ts` provides restrictive CSP, `frame-ancestors 'none'`,
  `object-src 'none'`, `form-action 'self'`, `nosniff`, clickjacking and
  referrer controls; production HSTS is enabled.
- Community, correction, room chat and AI inputs remain high-value XSS,
  prompt-injection, abuse and data-exfiltration surfaces even when the UI
  renders them as plain text.
- Upload/import boundaries include library contribution/review and the
  Tatoeba test-only import CLI; path, type, size, archive and environment
  checks require explicit 17C verification.

### External callbacks and provider boundaries

- OAuth provider redirect/callback and server-side code exchange.
- Membership/payment attempt and webhook routes.
- AI, email, storage and realtime adapters, all configured server-side and
  provider-neutral.
- Health/config startup checks expose only bounded operational status; no
  provider credential is a client contract.

## 4. Prioritized abuse cases and status

| ID | Severity | Abuse case | Current evidence | Owner/status |
| --- | --- | --- | --- | --- |
| H-001 | High | An attacker starts OAuth for the attacker account and sends the resulting callback URL to a victim. Because public login/register state is not bound to the initiating browser, the victim can receive a session for the attacker account (login CSRF/account confusion). | Remediated in Backend PR #33, merge `403dc9a5c93d7b19784f5c0140a121a471208e37`: public login/register/link starts set a short-lived `cdn_oauth_state` cookie, and callbacks reject a missing, duplicate or mismatched state before invoking the OAuth service. The cookie is cleared before redirect; focused tests cover the negative boundary. | Backend auth / closed in 17B; regression evidence in `PHASE-17B-EVIDENCE-2026-10-02.md`. |
| H-002 | High | A caller changes a path/body owner identifier to read or mutate another user’s resource. | Service-owned ID/ownership checks exist across the Phase 09–16 contracts; every resource family still requires adversarial matrix coverage in 17B–17E. | Backend domain owners / audit in 17B–17E; no silent acceptance. |
| H-003 | High | A user-controlled content or upload payload becomes executable, path-traversing, oversized, or an SSRF pivot. | Global DTO hardening and plain-text UI patterns exist; upload and outbound URL coverage is not yet reconciled for every surface. | Backend content/config owners / audit in 17C–17D. |
| H-004 | High | Prompt injection or private retrieval content causes the AI boundary to disclose another user’s data or provider details. | Phase 09 contracts separate roles, exclude private content and parse bounded outputs; 17D must prove the live route adapters preserve those invariants. | AI owner / audit in 17D. |
| H-005 | High | Forged/replayed payment webhook or client-tampered amount/credit changes entitlement or balance. | Phase 11 defines provider-neutral signature, replay, idempotency and ledger contracts; 17E must verify all current routes and tests. | Commerce owner / audit in 17E. |
| M-001 | Medium | OAuth token/profile calls hang and consume request resources under provider or network degradation. | Closed in Backend PR #34: OAuth token/profile requests now use a 10-second abort deadline and bounded JSON-read deadline; the configured email provider uses the same abort-boundary pattern. Timeout regressions are executable. | Backend auth/config / closed in 17C. |
| M-002 | Medium | Rate-limit, block/report, privacy or retention gaps enable harassment, enumeration or stale-data leakage. | Reconciled in 17F: bounded abuse/privacy projections and lifecycle boundaries are documented; the process-local limiter and any future deletion/purge executor remain explicit pre-production release gates. | Community/privacy owners; platform/domain owners for release-gated follow-up. |
| M-003 | Medium | Misconfiguration exposes a non-HTTPS provider, placeholder secret, memory persistence or unsafe public origin in production. | `env.validation.ts` rejects the reviewed production misconfiguration classes; tracked-file/history checks found no credential material; Backend and Frontend high-severity dependency audits report zero vulnerabilities. | Platform/config owner / closed in 17C. |

## 5. Existing controls that must not regress

- Access-token roles are not used as the sole source of truth; role guards
  refresh user roles from the identity repository.
- Private event/room access is checked server-side and unknown private
  resources use bounded not-found behavior.
- Payment, AI, realtime and storage providers remain disabled/configured
  fail-closed unless explicitly enabled outside this phase.
- Phase 16 cache/service-worker rules do not cache private API, payment,
  mutation or credential responses.
- Production deployment, database mutation/migration execution, secret
  mutation and provider activation remain outside Phase 17.

## 6. Verification plan for the remaining subphases

1. 17B: OAuth callback binding, token replay/expiry, link collision, role
   escalation and IDOR matrix for identity-owned resources.
2. 17C: malicious DTO/content/upload/path/size/type/open-redirect/CSRF/CORS
   inputs, provider-call timeout, secret/dependency/config scans.
3. 17D: block/report/privacy/search/cache leakage, room/event abuse, plain
   text/markdown/AI-output safety, prompt injection and private retrieval
   exclusion.
4. 17E: signature/replay/collision/amount tamper, entitlement transitions,
   credit concurrency and webhook audit sanitization.
5. 17F: retention/deletion mapping, unresolved-finding register, full unit,
   integration, HTTP/E2E, typecheck/build/audit gates and synchronized-main
   evidence.

## 7. 17A acceptance

The inventory is complete for the current source heads, H-001 is explicitly
tracked with an owner and remediation subphase, all other high-risk domains
have a named verification gate, and no critical/high item is marked accepted
without evidence. 17A is eligible to close; Phase 17 remains in progress.

## 8. 17B auth/OAuth acceptance

LNG-17-002 is accepted for 17B. The adversarial review covered the
AccessTokenGuard live session/user checks, refresh rotation and replay-family
revocation, cookie-origin and double-submit CSRF checks, OAuth transaction
expiry/one-time consumption, link-session ownership, provider/email collision
handling, role capability boundaries and last-administrator protection. The
existing negative regression suites passed together with the new H-001 browser
binding tests.

H-001 is closed by Backend main merge
`403dc9a5c93d7b19784f5c0140a121a471208e37`. M-001 is intentionally not marked
fixed here and is the 17C timeout/configuration audit item. H-002 through H-005
remain future verification gates owned by 17C–17E. Phase 17 remains in
progress; 17C is the next eligible subphase.

## 9. 17C web/input/upload/secrets/config acceptance

LNG-17-003 and LNG-17-007 are accepted for 17C. The source-first audit
covered the actual Backend and Frontend surfaces, then closed M-001 and M-003
with executable evidence.

- Backend PR #34 merged with CI 1/1 passed; implementation commit
  `ba207fa000a390aba2baa41c60ae066ab982cc13`; Backend main is
  `76fb2732a62da5437ed4390f74ebe0fb507fca46`.
- OAuth token/profile requests and configured email delivery requests are
  bounded by 10-second `AbortController` deadlines. OAuth JSON-body reads are
  bounded by the same deadline and provider failures remain normalized.
- `configureApp` and `env.validation.ts` enforce explicit CORS origins,
  credentials-aware CSRF boundaries, DTO whitelist/unknown-field rejection,
  CSP/clickjacking/referrer/nosniff headers, production HSTS, HTTPS production
  origins/provider URLs, non-placeholder/minimum-length secrets, non-memory
  production persistence, disabled-provider fail-closed behavior and blocked
  external-product hosts.
- No runtime multipart upload controller exists in the reviewed source, so
  upload quarantine/scanning is not claimed as an enabled route. The
  test-only Tatoeba import boundary is protected by canonical host/path
  validation, redirect rejection, request timeout, bounded response bytes and
  preflight/zero-write safeguards.
- Frontend review found no raw HTML/markdown injection sink. API bases reject
  protocol-relative URLs, credentials, query/fragment components and blocked
  hosts; external library links accept only HTTP(S), payment checkout links
  require HTTPS without credentials, and the service worker keeps API/auth/
  mutation/private routes network-only.
- Parameterized repository queries and fixed server-side SQL clause selection
  were reviewed; no user-controlled identifier interpolation was found.
- `.env` files are ignored and only `.env.example` is tracked. Suppressed-value
  credential-marker scans over both repositories and tracked `.env` history
  returned no exposed credential marker. Backend and Frontend
  `npm audit --audit-level=high` both report zero vulnerabilities.

Required regression gates passed: Backend unit 144 suites / 811 tests, Backend
E2E 17 suites / 73 tests, Frontend 82 files / 339 tests, focused Backend
provider/config/import suites 9 suites / 58 tests across the final runs,
focused Frontend security suites 5 files / 26 tests, typecheck, build, lint,
dependency audits and `git diff --check`. H-003's remaining content/markdown
and AI-output portion is closed by the 17D hostile-content fixtures and AI
contract review; no critical/high finding is silently accepted. Phase 18
remains unstarted; 17D is accepted and 17E is next.

## 10. 17D abuse/privacy/community and AI acceptance

LNG-17-004 and LNG-17-005 are accepted for 17D. The cross-domain review
covered community abuse controls, exchange contact/privacy projections,
notification recipient scoping, reputation anti-farming, speaking-room
moderation, private event access, public Library retrieval and every current
AI prompt/source/output route.

- H-002 is closed for the reviewed resource matrix: actor identity is derived
  from the authenticated session, service-owned ownership checks remain in
  force, and the focused community, exchange, room, event, notification and
  AI suites passed.
- H-003 is closed for the actual attack surface: no runtime multipart upload
  route exists, outbound URL checks are bounded, and community/AI content is
  projected/rendered as text. Frontend PR #24 adds executable hostile
  `<img>`/`<script>` fixtures for community and AI output.
- H-004 is closed: AI conversation ownership, VERIFIED public Library
  retrieval, target-language/provenance/license checks, explicit untrusted
  prompt envelopes, fail-closed providers and strict exact-key output parsing
  all passed.
- H-005 is closed in 17E. M-002 is reconciled with explicit release gates:
  block/report/mute/privacy/projection controls passed; the process-local
  community limiter and retention/deletion boundary are documented with
  owners, evidence and pre-production follow-up.

Evidence: `evidence/phase-17/PHASE-17D-EVIDENCE-2026-10-02.md`. Phase 18
remains unstarted; 17E is the next eligible subphase.

## 11. 17E commerce/payment acceptance

LNG-17-006 is accepted for 17E. The audit re-exercised the current Phase 11
payment contracts across signature verification, event collision and replay,
idempotency, provider/attempt/order/owner identity, amount and currency
tampering, settlement/fulfillment separation, entitlement activation and
contribution-credit double-spend protection.

- H-005 is closed for the reviewed attack surface. PayOS webhook input is
  bounded and HMAC-verified; invalid, unknown, mismatched, replayed and
  out-of-order events fail closed without entitlement mutation.
- Server catalog snapshots, owner-scoped idempotency, database uniqueness,
  row locks and per-user transaction locks prevent client amount/product
  tampering, duplicate settlement, duplicate fulfillment and concurrent credit
  redemption.
- Payment responses expose only bounded presentation facts. Sanitized webhook
  evidence is separated from settlement, fulfillment and subscription facts;
  raw payloads, signatures and secrets are not persisted or returned.
- The payment provider remains disabled by default. No live provider call,
  real-money transaction, production database mutation or migration execution
  occurred.

Evidence: `evidence/phase-17/PHASE-17E-EVIDENCE-2026-10-02.md`. The final
17F reconciliation is in evidence/phase-17/PHASE-17F-EVIDENCE-2026-10-02.md.
Phase 17 is accepted with explicit pre-production release gates; Phase 18
remains unstarted.

## 12. 17F privacy, retention and final-gate reconciliation

LNG-17-008 is accepted. The canonical data-class matrix and current
offboarding boundary are in docs/08-DATA-LIFECYCLE.md.

- Account disablement and session/authentication revocation are supported;
  self-service account-wide deletion, complete export and scheduled purge are
  not shipped or advertised.
- Community removal, privacy projections, moderation evidence, provenance,
  payment/fulfillment integrity and sanitized security audit facts were
  reconciled without weakening existing authority or integrity boundaries.
- Notification retention values are bounded policy data, not proof of a
  running purge executor. AI conversations remain in-memory in the reviewed
  implementation; audio recording, transcript storage, live AI and live
  payment provider execution remain disabled.
- The community limiter is deterministic and bounded per process, but not
  distributed. A single-instance production model or approved shared limiter
  is a pre-production gate before horizontal scale.
- No confirmed critical or high finding remains open. M-002 is
  RECONCILED_WITH_RELEASE_GATES, and all future lifecycle executors require
  approved policy, authorization, TEST verification, audit evidence and a
  release decision.

Evidence: evidence/phase-17/PHASE-17F-EVIDENCE-2026-10-02.md. Phase 17 is
complete; Phase 18 remains unstarted.
