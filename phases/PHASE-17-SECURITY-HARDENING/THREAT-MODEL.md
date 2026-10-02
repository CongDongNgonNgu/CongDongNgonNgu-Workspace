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
| H-001 | High | An attacker starts OAuth for the attacker account and sends the resulting callback URL to a victim. Because public login/register state is not bound to the initiating browser, the victim can receive a session for the attacker account (login CSRF/account confusion). | `auth/oauth/oauth.service.ts` stores one-time state but `auth.controller.ts` does not set/verify a browser state cookie for public start/callback. Frontend uses a top-level redirect and server refresh cookie. | Backend auth / open; remediate and regression-test in 17B. |
| H-002 | High | A caller changes a path/body owner identifier to read or mutate another user’s resource. | Service-owned ID/ownership checks exist across the Phase 09–16 contracts; every resource family still requires adversarial matrix coverage in 17B–17E. | Backend domain owners / audit in 17B–17E; no silent acceptance. |
| H-003 | High | A user-controlled content or upload payload becomes executable, path-traversing, oversized, or an SSRF pivot. | Global DTO hardening and plain-text UI patterns exist; upload and outbound URL coverage is not yet reconciled for every surface. | Backend content/config owners / audit in 17C–17D. |
| H-004 | High | Prompt injection or private retrieval content causes the AI boundary to disclose another user’s data or provider details. | Phase 09 contracts separate roles, exclude private content and parse bounded outputs; 17D must prove the live route adapters preserve those invariants. | AI owner / audit in 17D. |
| H-005 | High | Forged/replayed payment webhook or client-tampered amount/credit changes entitlement or balance. | Phase 11 defines provider-neutral signature, replay, idempotency and ledger contracts; 17E must verify all current routes and tests. | Commerce owner / audit in 17E. |
| M-001 | Medium | OAuth token/profile calls hang and consume request resources under provider or network degradation. | `GoogleOAuthAdapter` catches fetch failure but has no explicit abort timeout in the reviewed source. | Backend auth/config / verify and fix-or-document in 17B/17C. |
| M-002 | Medium | Rate-limit, block/report, privacy or retention gaps enable harassment, enumeration or stale-data leakage. | Phase 10–15 contain bounded policies and projections; cross-domain reconciliation is deliberately deferred to 17D/17F. | Community/privacy owners / audit in 17D/17F. |
| M-003 | Medium | Misconfiguration exposes a non-HTTPS provider, placeholder secret, memory persistence or unsafe public origin in production. | `env.validation.ts` rejects the reviewed production misconfiguration classes; 17C must run dependency/config scans and verify no secret material is committed. | Platform/config owner / audit in 17C. |

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
