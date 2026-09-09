BEGIN PHASE 02 â€” AUTH & IDENTITY

Project:
CongDongNgonNgu.vn â€” Global Language Community

Authoritative repositories:

Workspace:
https://github.com/CongDongNgonNgu/CongDongNgonNgu-Workspace

Frontend:
https://github.com/CongDongNgonNgu/CongDongNgonNgu-Front-End-Web

Backend:
https://github.com/CongDongNgonNgu/CongDongNgonNgu-Back-End

Reference repositories ONLY:
https://github.com/EduAI-Flatform/EduAI-Back-End
https://github.com/EduAI-Flatform/EduAI-Front-End-Web

Stitch project:
https://stitch.withgoogle.com/projects/3718538619973058970

Current accepted state:

CURRENT_PHASE=01
PHASE_00=DONE
PHASE_01=DONE
PHASE_02=READY

Accepted Frontend baseline:
47862c119e3af122c063332c1f4ee73beebea998

Accepted Workspace reconciliation baseline:
6598f2c40ba73fb7457a51a798475a19b9c87cb6

Phase 01 design, Homepage, Header, Footer, typography, icon system,
responsive shell and CSS/component architecture are accepted.

Do not redesign Phase 01 surfaces unless an Auth requirement creates a
genuine integration issue.

==================================================
GOAL
==================================================

Execute Phase 02 completely:

PHASE-02-AUTH-IDENTITY

Tasks:

LNG-02-001 â€” Identity Model & Authorization Contract
LNG-02-002 â€” Email/Password Registration & Login
LNG-02-003 â€” Verification & Password Recovery
LNG-02-004 â€” Access/Refresh Session Lifecycle
LNG-02-005 â€” Google OAuth
LNG-02-006 â€” Provider Abstraction for Facebook/Zalo/Apple
LNG-02-007 â€” Explicit Account Linking & Collision Handling
LNG-02-008 â€” Auth UX Reconciliation

Do not start Phase 03.

The objective is a secure, maintainable identity foundation for all future
CongDongNgonNgu features.

Authentication must belong to CongDongNgonNgu and must not remain coupled to
EduAI, Firebase, or any unrelated product domain.

==================================================
MANDATORY STARTUP AUDIT
==================================================

Before writing code:

1. Read:

- Workspace/AGENTS.md
- state/PROJECT-STATE.md
- state/DEPENDENCY-GRAPH.md
- state/DECISIONS.md
- state/BLOCKERS.md
- docs/02-ARCHITECTURE.md
- docs/03-DESIGN-SYSTEM.md
- docs/05-SECURITY.md
- docs/06-TESTING-STRATEGY.md

Then read all Phase 02 files:

- README.md
- TASKS.md
- ACCEPTANCE.md
- TEST-PLAN.md
- HANDOFF.md
- UI-STITCH.md

2. Inspect actual current Frontend source.

3. Inspect actual current Backend source.

4. Inspect current dependencies, CI workflows, env validation, test setup,
   configuration system and runtime architecture.

5. Inspect the relevant EduAI Auth implementation at source level only.

Classify reusable EduAI concepts as:

KEEP_CONCEPT
ADAPT
REJECT
NOT_APPLICABLE

Do NOT copy code blindly.

Do NOT modify EduAI.

6. Verify all three CongDongNgonNgu worktrees are clean before implementation.

7. Reconcile Phase start:

CURRENT_PHASE=02
PHASE_02=IN_PROGRESS

Only do this when work actually begins.

==================================================
IMPORTANT BACKEND BASELINE
==================================================

The current CongDongNgonNgu Backend is intentionally minimal.

Do not assume an ORM, database implementation, auth library or email provider
already exists.

The current environment direction includes PostgreSQL DATABASE_URL and
JWT/session configuration, but Phase 02 must explicitly establish the actual
persistence design.

Before implementing LNG-02-001:

- inspect current Backend dependencies;
- inspect Phase 00 decisions;
- inspect EduAI persistence/auth only as a technical reference;
- select a maintainable PostgreSQL persistence approach;
- document the choice.

If Prisma is selected, use it because the audit proves it fits this project's
architecture, not merely because EduAI used it.

Only create schema needed for Phase 02.

Do NOT prematurely create tables for:

- community
- language library
- payments
- AI
- notifications
- rewards
- speaking rooms
- future phases

==================================================
LNG-02-001 â€” IDENTITY MODEL & AUTHORIZATION CONTRACT
==================================================

Build the identity foundation first.

Required concepts should include an equivalent of:

User
Identity / ProviderAccount
Session / RefreshSession
EmailVerificationToken or secure equivalent
PasswordResetToken or secure equivalent

Potential linking/security records may be added if genuinely required.

Do not force these exact names if a better bounded-context design is found.

---

## EMAIL

Normalize email safely and consistently.

Document:

- canonical storage behavior
- uniqueness behavior
- case handling
- verification status
- changed-email behavior

Do not silently merge two identities because their email strings match.

---

## PASSWORD

Use a modern password hashing algorithm/library appropriate for Node/NestJS.

Prefer Argon2id if the audited dependency/runtime supports it cleanly.

If bcrypt or another algorithm is selected, document why.

Never:

- store plaintext passwords
- log passwords
- return password hashes
- use reversible encryption for passwords

Apply sensible password policy without arbitrary complexity traps.

Allow password managers and pasted passwords.

---

## USER LIFECYCLE

Define required states, for example:

ACTIVE
VERIFICATION_PENDING
DISABLED

Do not add unnecessary lifecycle states.

Document behavior of:

- unverified user
- disabled user
- verified active user

---

## ROLE BASELINE

Create only the authorization baseline Phase 02 needs.

Do not prematurely implement full Moderator/Admin UI.

Future privileged roles must not be inferred from:

- email domain
- reputation
- contribution points

Authorization must ultimately be server-enforced.

---

## DATABASE CONSTRAINTS

Use database-level constraints where appropriate.

Explicitly consider:

- normalized email uniqueness
- provider + providerSubject uniqueness
- refresh/session token uniqueness/fingerprint
- single-use token behavior
- cascade/restrict behavior
- audit-safe timestamps

Avoid race-condition-only application validation.

---

## API CONTRACT

Use versioned API routes consistent with project architecture.

Define safe stable response/error contracts.

Frontend must not depend on database entities directly.

Do not leak:

- provider secrets
- hashes
- raw token records
- internal security metadata

Record the identity model and security decisions in Workspace.

==================================================
LNG-02-002 â€” EMAIL/PASSWORD REGISTRATION & LOGIN
==================================================

Implement Backend and Frontend.

---

## REGISTER

Required behaviors:

- validated email
- validated password
- normalized fields
- duplicate handling
- verification state
- safe response
- rate limiting

Do not expose unnecessary information about existing accounts.

If policy intentionally says an existing email may receive a recovery hint,
do it through a safe generic flow.

---

## LOGIN

Required:

- generic invalid credential response
- no email enumeration
- safe disabled/unverified behavior
- rate limiting
- structured audit-safe events
- timing-sensitive implementation review

Do not log credentials.

---

## FRONTEND LOGIN / REGISTER

STITCH MCP IS MANDATORY BEFORE IMPLEMENTATION.

Use the accepted Phase 01 shell/tokens.

Design the page BODY only unless an actual Header integration change is
required.

Create Stitch references for at least:

Desktop:

- Login
- Register

Mobile:

- Login
- Register

States:

- initial
- validation error
- loading
- authentication error
- success transition
- password visible/hidden

Mobile:
320
375
390
412

Design goals:

- welcoming
- human
- global
- trustworthy
- language-community focused

Not:

- LMS
- fintech
- admin portal
- generic AI SaaS
- huge auth card floating in empty space
- excessive gradients
- excessive rounded cards

Forms must use real labels.

Support:

- browser password managers
- autocomplete
- mobile keyboards
- keyboard-only operation
- visible focus
- accessible error announcements

==================================================
LNG-02-003 â€” EMAIL VERIFICATION & PASSWORD RECOVERY
==================================================

Implement:

- email verification
- resend verification
- forgot password
- reset password

Tokens must be:

- cryptographically secure
- expiring
- single-use
- correctly scoped to purpose
- invalidated/revoked after use

Do not store raw verification/reset tokens where avoidable.

Prefer storing a secure digest/fingerprint.

Test:

- valid token
- expired token
- reused token
- malformed token
- wrong purpose
- wrong account association
- resend throttle
- reset invalidation

---

## EMAIL PROVIDER

Place email delivery behind an adapter.

Examples of responsibilities:

EmailProvider
sendVerification(...)
sendPasswordReset(...)

Do NOT tightly couple auth domain code to one provider.

If no real external email credentials are available:

- implement a safe test/dev adapter;
- make production/external delivery fail closed;
- document required configuration;
- do not claim real external email delivery is verified.

Never commit:

- API keys
- SMTP passwords
- real tokens

Do not output secrets into CI logs.

---

## FRONTEND STATES

Use Stitch to design/refine:

- verification required
- verification sent
- resend
- forgot password
- reset password
- reset success
- expired token
- invalid token

Messages must be understandable Vietnamese and not leak account existence.

==================================================
LNG-02-004 â€” ACCESS / REFRESH SESSION LIFECYCLE
==================================================

Design the session architecture deliberately.

Preferred security direction unless the actual deployment topology proves a
different design is more appropriate:

ACCESS TOKEN:

- short-lived
- minimal claims
- not treated as long-term state

REFRESH SESSION:

- long-lived relative to access token
- server-tracked
- rotated
- revocable
- replay-resistant
- raw refresh secrets never logged

Prefer secure HttpOnly cookie storage for refresh credentials where compatible
with the actual frontend/API topology.

Avoid storing refresh tokens in localStorage.

If cookies are used, explicitly handle:

- HttpOnly
- Secure in production
- SameSite appropriate to topology
- cookie Path
- Domain only when needed
- CORS credentials
- CSRF implications

Do not blindly choose SameSite=None.

Document why the selected cookie/session topology is correct for expected
deployment.

---

## REFRESH ROTATION

Implement and test:

login
â†’ session created
â†’ refresh
â†’ old refresh invalid
â†’ new refresh issued

Replay of an already-rotated credential must fail safely.

Consider whether replay should revoke:

- just the affected session family
  or
- a broader set

Document the decision.

---

## LOGOUT

Implement:

- current session logout
- cookie/token cleanup
- server-side revocation

If "logout all devices" is useful and low-risk to include at domain level,
support it or explicitly defer it.

---

## FRONTEND AUTH STATE

Create a maintainable auth/session layer.

Do not spread:

if (loggedIn)

across random components.

Provide a central typed auth boundary/state system.

Required behaviors:

- initial session bootstrap
- authenticated state
- unauthenticated state
- refresh recovery
- refresh failure
- session expiry
- logout
- multi-tab coordination where practical

Avoid infinite refresh loops.

Avoid API retry storms.

One failed refresh must not cause dozens of simultaneous refresh requests.

Implement single-flight/deduplication where needed.

==================================================
CSRF / CORS / WEB SECURITY
==================================================

Review actual selected session architecture.

If authentication relies on cookies for requests with authority, implement an
appropriate CSRF defense rather than assuming SameSite alone solves every
deployment scenario.

Validate:

- allowed origins
- credentials mode
- preflight
- mutation requests
- open redirect risks

Never use wildcard CORS with credentials.

==================================================
LNG-02-005 â€” GOOGLE OAUTH
==================================================

Audit the proven EduAI implementation, but do not copy Firebase-specific or
EduAI-specific architecture blindly.

Target architecture:

Backend-owned OAuth authorization-code flow with provider abstraction.

Required controls:

- secure state
- nonce when applicable
- callback validation
- approved redirect URI
- provider response validation
- verified provider subject identity
- short-lived one-time internal completion mechanism if needed
- safe session issuance only after backend verification

Do not trust arbitrary frontend-supplied:

- provider email
- provider user ID
- profile data
- ID token without proper validation

---

## MOBILE / BROWSER BEHAVIOR

Account for:

- Chrome
- Edge
- Safari
- mobile browsers
- popup blockers
- embedded/in-app browsers where relevant

Do not promise automatic escape from Facebook/Zalo embedded browsers if the
platform does not allow it.

Provide explicit recovery UX.

---

## MISSING GOOGLE CONFIG

If valid CongDongNgonNgu Google OAuth credentials are unavailable:

Google start/callback must fail CLOSED.

Example outcome:
provider unavailable / disabled

Not:
500
fake success
placeholder login
EduAI credentials reuse

Mark LNG-02-005:

BLOCKED_EXTERNAL

only for the external credential/real-provider verification portion.

Continue all independent Phase 02 work.

Do not stop the entire goal if other tasks can continue.

Do NOT reuse EduAI OAuth credentials.

==================================================
LNG-02-006 â€” PROVIDER ABSTRACTION
FACEBOOK / ZALO / APPLE
==================================================

Create provider contracts/configuration only.

Do not pretend these providers are implemented if credentials/integration are
not actually complete.

Architecture should support something conceptually like:

OAuthProviderAdapter

- getAuthorizationUrl()
- exchangeCode()
- normalizeIdentity()
- validateCallback()

Exact interfaces are up to the implementation.

Provider configuration should include only required concepts such as:

enabled
clientId
clientSecret
redirectUri
scopes
authorization endpoint/version
token endpoint/version

Never expose client secrets to Frontend.

Disabled providers:

- are absent or clearly unavailable in UI;
- start route fails closed;
- callback fails closed;
- no fake completion.

Frontend provider buttons must be driven by backend/provider capability or a
safe configuration contract, not hardcoded assumptions.

==================================================
LNG-02-007 â€” EXPLICIT ACCOUNT LINKING & COLLISIONS
==================================================

CRITICAL SECURITY RULE:

NEVER silently merge accounts because email addresses match.

Examples:

Existing local account:
user@example.com

Google returns:
user@example.com

This does NOT automatically prove both identities should be merged.

Use explicit ownership verification.

---

## LINKING REQUIREMENTS

Linking another provider requires:

- already authenticated user
- recent authentication / ownership proof as appropriate
- explicit user action
- provider callback bound to the initiating user/session
- anti-CSRF/state protection

Do not allow account linking through an arbitrary callback alone.

---

## COLLISION BEHAVIOR

If a provider identity/email conflicts with an existing account:

fail safely and guide user to:

1. sign in using the existing account;
2. explicitly link the new provider.

Do not create duplicate identity ambiguity.

Test:

- same provider subject repeats
- same provider subject mapped to another user
- same email from different provider
- provider email changes
- provider email missing
- provider email unverified
- local account + Google collision
- concurrent linking
- stale linking session
- replayed linking callback

---

## UNLINKING

If unlinking is implemented, never allow a user to remove the last usable
authentication method without an explicit recovery alternative.

If unlinking is not needed for Phase 02, document it as deferred.

==================================================
AUTHORIZATION
==================================================

Implement server-side authorization primitives for protected routes.

Frontend route guards are UX only.

They are NOT security enforcement.

Backend must determine authenticated user from verified session credentials.

Do not accept a user ID from the client as proof of ownership.

Prepare reusable guards/decorators/services without prematurely implementing
Phase 15 Admin.

Test:

anonymous â†’ protected endpoint = denied
valid user â†’ own protected resource = allowed as appropriate
invalid/expired access = denied
revoked session = denied/recovery according to contract

==================================================
LOGGING & AUDIT SAFETY
==================================================

Audit logs and app logs MUST NOT contain:

- passwords
- password hashes
- access tokens
- refresh tokens
- verification tokens
- reset tokens
- OAuth authorization codes
- OAuth access tokens
- provider client secrets
- session secrets

Sanitize:

Authorization
Cookie
Set-Cookie
token query parameters
OAuth callback sensitive parameters

Correlation IDs are acceptable.

Record security event categories without recording secrets.

==================================================
ERROR CONTRACT
==================================================

Create stable safe error handling.

Frontend should not parse English exception strings.

Use typed/stable error identifiers where appropriate.

Examples conceptually:

AUTH_INVALID_CREDENTIALS
AUTH_EMAIL_VERIFICATION_REQUIRED
AUTH_SESSION_EXPIRED
AUTH_PROVIDER_DISABLED
AUTH_OAUTH_FAILED
AUTH_ACCOUNT_COLLISION
AUTH_RESET_INVALID

Do not expose stack traces in production responses.

Do not reveal unnecessary account existence information.

==================================================
ENVIRONMENT CONFIGURATION
==================================================

Update .env.example with safe placeholders as architecture requires.

Never commit real values.

Separate provider configuration.

Do not overload one generic:

OAUTH_CLIENT_ID

if multiple providers need independent configuration.

Prefer explicit configuration concepts such as:

GOOGLE_OAUTH_ENABLED
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
GOOGLE_REDIRECT_URI

FACEBOOK_OAUTH_ENABLED
...

ZALO_OAUTH_ENABLED
...

APPLE_OAUTH_ENABLED
...

Exact names may follow project conventions.

Validate environment variables at startup.

A provider marked enabled with missing required configuration must fail closed,
preferably at startup or with a clearly observable disabled state.

Do not log secret values in config validation errors.

==================================================
STITCH MCP â€” AUTH UI
==================================================

The Phase 02 UI-STITCH.md workflow is mandatory.

Use the EXISTING Stitch project:

projects/3718538619973058970

Do not create a visually unrelated second design system.

Preserve accepted:

- Header
- Footer
- typography
- spacing
- icon family
- responsive behavior
- Home design language

Design AUTH BODY surfaces.

Required Stitch design coverage:

1. Login desktop
2. Login mobile
3. Register desktop
4. Register mobile
5. Forgot password
6. Reset password
7. Email verification
8. Verification resend state
9. Provider disabled/error
10. Session expired recovery
11. OAuth collision/account-link recovery

Generate/refine in small surfaces.

Do not ask Stitch:
"design all auth pages"

in one giant prompt.

Inspect raster output.

Do NOT repeat the Phase 01 mistake of relying only on generated HTML/metadata.

For major auth surfaces preserve:

Stitch raster
runtime screenshot
side-by-side comparison

At minimum:

390px
1440px

Record accepted screen IDs.

==================================================
FRONTEND ARCHITECTURE
==================================================

Respect the Phase 01 refactor.

Use feature organization.

Expected direction:

src/features/auth/
api/
components/
hooks/
pages/
state/
types/
utils/

Do not require these exact directories if the actual architecture suggests a
cleaner equivalent.

Avoid:

src/components/AuthEverything.tsx

Avoid:

one 1,500-line auth stylesheet

Use colocated CSS Modules.

Keep API types centralized within the auth feature.

Do not duplicate global Header/Footer.

Do not modify canonical Homepage unnecessarily.

---

## ROUTING

Add actual routes only for implemented functionality.

Possible routes:

/login
/register
/verify-email
/forgot-password
/reset-password

Use the project's routing conventions.

OAuth callback handling should follow the selected secure backend/frontend
architecture.

Do not create dead routes.

---

## HEADER INTEGRATION

Once Login/Register are truly implemented:

activate the appropriate existing Header auth actions.

Do not redesign Header.

Logged-in state may show the canonical account/avatar affordance.

Do not prematurely implement a full profile page.

If a profile destination belongs to Phase 03 and does not exist yet, do not
create a dead clickable link.

==================================================
BACKEND ARCHITECTURE
==================================================

Keep Auth/Identity as a bounded context.

Possible structure:

src/identity/
src/auth/

or a cohesive equivalent.

Do not dump everything into:

auth.service.ts

if responsibilities become excessive.

Separate concerns such as:

- credential validation
- password hashing
- token/session lifecycle
- OAuth provider adapters
- account linking
- persistence
- controllers/API contracts

Avoid needless micro-abstractions, but preserve security boundaries.

==================================================
DATABASE MIGRATIONS
==================================================

All schema changes must be reproducible.

Commit migrations.

Test migrations from clean database where possible.

Do not rely on manual database edits.

Do not connect to or mutate any production database.

No production deployment in this goal.

==================================================
TEST REQUIREMENTS
==================================================

BACKEND/API tests must cover at minimum:

Registration:

- valid
- duplicate
- malformed email
- invalid password

Login:

- valid
- wrong password
- nonexistent email generic behavior
- disabled state
- unverified policy
- brute-force/rate-limit behavior

Verification:

- valid
- expired
- reused
- invalid
- resend throttle

Password recovery:

- request generic behavior
- valid reset
- expired reset
- reused reset
- password changed invalidates expected credentials/sessions according to policy

Session:

- access expiry
- refresh success
- rotation
- old refresh replay
- logout
- revoked session
- malformed credentials
- concurrent refresh behavior if applicable

Authorization:

- anonymous denied
- authenticated allowed
- spoofed user ID does not grant access

OAuth:

- disabled provider
- missing config
- state mismatch
- callback error
- invalid identity
- duplicate provider subject
- email collision
- missing email
- unverified email
- explicit linking
- linking replay

Security:

- no secrets in logs
- open redirect rejected
- unsafe callback rejected
- CORS behavior
- CSRF behavior according to chosen architecture

==================================================
FRONTEND / E2E TESTS
==================================================

Cover:

register
â†’ verification state
â†’ login

login failure
forgot password
reset password
session-expired recovery
logout
Google available/unavailable states
account collision recovery
provider-disabled state

Verify:

- loading
- double-submit protection
- network errors
- long Vietnamese messages
- browser autofill
- password manager semantics
- password show/hide
- focus after validation
- screen-reader announcements

==================================================
RESPONSIVE / ACCESSIBILITY
==================================================

Verify exact widths:

320
375
390
412
768
1024
1440

Check:

- no horizontal overflow
- mobile keyboard behavior
- touch targets
- labels
- error associations
- aria-live where appropriate
- focus order
- visible focus
- dialog/drawer behavior if used
- color contrast
- long email addresses
- long errors
- zoom/reflow

Keyboard-only complete auth flow must be possible.

==================================================
SECURITY REVIEW GATE
==================================================

Before LNG-02-008 can complete, perform an adversarial auth review.

Specifically attempt to find:

- account enumeration
- session fixation
- token replay
- refresh reuse
- provider account takeover
- email collision takeover
- OAuth CSRF
- open redirect
- callback tampering
- link-to-wrong-user
- brute force
- missing server authorization
- secrets in logs
- insecure browser token storage
- race conditions in account creation/linking

Any blocking finding must be fixed before DONE.

==================================================
DEPENDENCY / PACKAGE HYGIENE
==================================================

Add only necessary dependencies.

Audit new dependencies.

Do not add large auth frameworks simply to avoid understanding the flow.

After package changes:

- inspect lockfile
- run audit
- document any unresolved vulnerability
- do not falsely claim 0 vulnerabilities unless verified

==================================================
TASK EXECUTION ORDER
==================================================

Execute in dependency order:

LNG-02-001
â†“
LNG-02-002
â†“
LNG-02-003

LNG-02-004 after 001 + 002

LNG-02-005 after 001 + 004

LNG-02-006 after 001 and may proceed independently where possible

LNG-02-007 after 003..006 are sufficiently implemented

LNG-02-008 last

If an external provider credential blocks LNG-02-005:

- mark that exact subtask BLOCKED_EXTERNAL;
- record evidence;
- continue all independent tasks;
- do not mark Google verified;
- do not fabricate credentials.

==================================================
WORKSPACE TASK STATE DISCIPLINE
==================================================

Use:

PLANNED
READY
IN_PROGRESS
BLOCKED_INTERNAL
BLOCKED_EXTERNAL
VERIFYING
DONE

Do not mark DONE until definition of done is actually met.

After each task:

1. inspect diff/status
2. run task-specific tests
3. fix regressions
4. update Workspace evidence/state
5. commit
6. push authorized repo(s)
7. verify remote SHA
8. check CI where available
9. fix task-caused CI failures
10. only then transition task state

Preserve a concise evidence trail.

==================================================
GIT / PUSH AUTHORIZATION
==================================================

I explicitly authorize Phase 02 implementation commits and pushes to these
exact destinations:

1.  Repository:
    https://github.com/CongDongNgonNgu/CongDongNgonNgu-Back-End.git
    Branch:
    main

2.  Repository:
    https://github.com/CongDongNgonNgu/CongDongNgonNgu-Front-End-Web.git
    Branch:
    main

3.  Repository:
    https://github.com/CongDongNgonNgu/CongDongNgonNgu-Workspace.git
    Branch:
    main

This authorization covers:

- LNG-02-001 through LNG-02-008 implementation
- Phase 02 tests
- migrations
- dependency/config changes required by Phase 02
- safe .env.example updates
- Workspace task/state/evidence updates
- narrowly necessary fixes for CI failures caused by Phase 02
- remote SHA verification
- GitHub Actions verification

Use Conventional Commits.

Examples:

feat(auth): add identity and session foundation
feat(auth): implement email authentication
feat(auth): add verification and recovery flows
feat(auth): add refresh rotation and revocation
feat(auth): add google oauth adapter
feat(auth): add explicit account linking
feat(auth-ui): implement responsive authentication flows
docs(workspace): reconcile phase 02 acceptance

Do not combine unrelated work into a giant commit when independent task
commits are practical.

==================================================
STRICT REPOSITORY BOUNDARIES
==================================================

You are NOT authorized to modify or push:

- any EduAI repository
- any repository outside the three CongDongNgonNgu repositories above

EduAI is read-only reference.

Do NOT deploy production.

Do NOT access/mutate production database.

Do NOT enable real OAuth providers without valid CongDongNgonNgu credentials
and explicit configuration.

Do NOT reuse secrets from EduAI.

Do NOT commit secrets.

Do NOT start Phase 03.

==================================================
CI
==================================================

After meaningful Backend commits:

- verify Backend CI
- investigate any Phase 02-caused failure
- fix and push if necessary

After meaningful Frontend commits:

- verify Frontend CI
- investigate any Phase 02-caused failure
- fix and push if necessary

Workspace may not have CI; verify remote SHA and documentation consistency.

Do not call a task DONE while its task-caused CI is red.

==================================================
PHASE 02 FINAL ACCEPTANCE
==================================================

Phase 02 acceptance requires:

[ ] Identity/provider/session model documented and implemented

[ ] Internal User ID independent from provider identities/email

[ ] Email/password registration works

[ ] Email/password login works

[ ] Verification works

[ ] Password recovery/reset works

[ ] Tokens are expiring and single-use where required

[ ] Access/session lifecycle is defined and tested

[ ] Refresh rotation/replay protection works

[ ] Logout/revocation works

[ ] Sensitive tokens are absent from logs

[ ] Protected backend operations enforce authorization

[ ] Google OAuth works with valid CongDongNgonNgu credentials
OR the real-provider verification portion is explicitly BLOCKED_EXTERNAL

[ ] Disabled/misconfigured providers fail closed

[ ] Facebook/Zalo/Apple adapter architecture exists as required,
without fake provider completion

[ ] No implicit account merge by email exists

[ ] Explicit linking requires authenticated ownership

[ ] Collision tests pass

[ ] Stitch workflow completed for Auth UI

[ ] Actual Stitch rasters were inspected

[ ] Runtime/Stitch visual comparisons preserved

[ ] 320/375/390/412/768/1024/1440 verified

[ ] Keyboard-only flow passes

[ ] Accessibility checks pass

[ ] Security adversarial review passes

[ ] Backend tests/typecheck/lint/build/audit pass

[ ] Frontend tests/typecheck/lint/build/audit pass

[ ] CI green for completed work

[ ] Remote SHAs verified

[ ] Workspace HANDOFF/evidence reconciled

==================================================
FINAL STATE RULE
==================================================

If all requirements including externally verifiable provider requirements
pass:

PHASE_02=DONE
PHASE_03=READY

If all implementation is complete but a genuine required external credential
prevents final Google OAuth verification:

do NOT falsely mark Phase 02 DONE.

Use the most accurate state, for example:

PHASE_02=BLOCKED_EXTERNAL

or VERIFYING if verification rather than an external dependency remains.

Clearly identify exactly what is blocked.

Do not erase completed task evidence.

Do not let one external blocker hide the fact that all independent Phase 02
work was completed.

==================================================
FINAL HANDOFF
==================================================

At completion or genuine blocker, record concisely:

- task states LNG-02-001..008
- final Backend SHA
- final Frontend SHA
- final Workspace SHA
- Backend CI result
- Frontend CI result
- test counts
- migration/schema status
- accepted Stitch screen IDs
- auth architecture summary
- session architecture summary
- enabled/disabled provider state
- external blockers
- security review result
- known deferred items

Do not produce inflated marketing-style reporting.

Stop after Phase 02 reconciliation.

DO NOT START PHASE 03.
## USER IDENTITY

Internal user identity MUST be independent of:

- email address
- Google subject ID
- Facebook user ID
- Zalo user ID
- Apple subject ID

Use an opaque internal stable ID.

Email is an attribute/credential, not the primary identity of the person.

Provider IDs are external identities, not User IDs.

---
