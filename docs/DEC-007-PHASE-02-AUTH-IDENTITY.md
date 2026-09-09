# DEC-007 - Phase 02 identity and session architecture

Date: 2026-09-09

Status: Accepted for local implementation. Real-provider and remote-publication
verification remain external gates recorded in the phase handoff.

## Context

CongDongNgonNgu is an independent product. EduAI was inspected as a
read-only technical reference; its Firebase coupling, shared credentials,
provider assumptions, and product-specific persistence are not part of this
design.

## Decision

1. Identity is backend-owned. The users table has an opaque UUID, canonical
   normalized email, lifecycle status, password hash, verification timestamp,
   and a baseline MEMBER role. Provider accounts have their own opaque local
   row and a unique provider-plus-subject key. Provider subject IDs and
   provider emails never become the local user ID. Local email changes are
   deferred; provider-email changes update provider metadata only and never
   mutate the local email credential without a future re-verification flow.

2. Registration creates VERIFICATION_PENDING users with an expiring,
   single-use hashed email-verification token. Login requires ACTIVE status
   and verified email. DISABLED users are denied. Passwords use Node's
   built-in scrypt with fixed, documented parameters to avoid a native auth
   dependency in this minimal Nest runtime; recovery is enumeration-safe,
   rate-limited, single-use, and revokes every session after a successful
   reset.

3. Access credentials are short-lived HMAC-signed tokens with minimal
   sub/sid/roles/iat/exp claims. Refresh credentials are opaque, hashed server
   records in a family, stored in an HttpOnly cookie named cdn_refresh and
   scoped to /api/v1/auth. Production sets Secure and SameSite=Lax. A
   readable cdn_csrf cookie is required in a matching X-CSRF-Token header for
   cookie-backed mutations; allowed CORS origins are explicit.

4. Refresh rotates the credential and invalidates the old record. Reuse of a
   rotated credential revokes only its session family and returns a stable
   recovery error. Current logout revokes the session and clears cookies;
   logout-all revokes all user sessions.

5. Email delivery is an adapter. The memory provider is test/local-only, a
   configured provider is explicit, and production fails closed when no
   provider is configured. Raw passwords, hashes, access/refresh tokens,
   verification/reset tokens, OAuth codes/tokens, and provider secrets are not
   logged.

6. OAuth is backend-owned authorization-code flow. State is opaque, hashed,
   short-lived, and one-time; Google uses the state as nonce and validates the
   provider subject, email, and verified-email claim before issuing a local
   session. Redirects are configuration-controlled and callback completion
   redirects only to the configured public application URL. Disabled or
   incomplete providers fail closed. Facebook, Zalo, and Apple have adapter
   and configuration contracts but no fake completion.

7. Email collisions never merge accounts. A matching provider subject is
   resolved only to its existing provider account. A matching local email
   without that provider account fails with an account-collision error and
   directs the user to sign in and explicitly link. Link start requires an
   authenticated user, CSRF-protected explicit action, and records the
   initiating user and session; callback rechecks that exact session is
   active, unexpired, and owned by that user. Replayed callbacks are consumed
   once. Unlinking is deferred.

8. AccessTokenGuard determines the authenticated user from verified access
   claims plus the server session and user records. Roles and CurrentUser
   metadata are reusable server-side primitives; frontend route state is not
   authorization.

## Consequences

The identity schema is reproducible through
database/migrations/0001_identity.sql, with a guarded development/recovery
down migration. Postgres is the default outside tests; in-memory persistence
is rejected in production. No production database or deployment is touched in
Phase 02.

Google remains disabled until CongDongNgonNgu-owned credentials are supplied
and a real callback is verified. The current implementation is therefore
complete for local/sandbox behavior but not marked as live-provider verified.
