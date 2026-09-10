# Phase 02 Tasks

## LNG-02-001 — Identity Model & Authorization Contract
**Status:** VERIFYING
**Depends on:** Phase 01  
**Repositories:** Backend, Frontend, Workspace

Define user identity/provider account/session models and authorization primitives. Separate internal user ID from provider IDs/emails. Document uniqueness constraints and lifecycle states (active, verification pending, disabled as required). Establish role baseline without prematurely adding moderator/admin UX.

## LNG-02-002 — Email/Password Registration & Login
**Status:** VERIFYING
**Depends on:** LNG-02-001

Backend: validated registration/login, strong password hash, safe duplicate handling, rate limits, generic credential errors, audit-safe logging. Frontend: use Stitch for login/register body design; accessible forms, password visibility rules, loading/error/success states, redirect-after-auth behavior and mobile keyboard considerations.

## LNG-02-003 — Verification & Password Recovery
**Status:** VERIFYING
**Depends on:** LNG-02-002

Implement expiring single-use verification/reset tokens or approved equivalent; invalidate/revoke correctly; avoid account enumeration. Provide resend throttling and clear UI recovery states. Tests cover expired/reused/wrong-user tokens and rate limits.

## LNG-02-004 — Access/Refresh Session Lifecycle
**Status:** VERIFYING
**Depends on:** LNG-02-001, LNG-02-002

Implement short-lived access plus protected refresh lifecycle consistent with chosen architecture. Include logout/revocation, rotation/replay protection where supported, expiry behavior, multi-tab/client recovery and secure transport/storage. Never persist raw refresh tokens in logs.

## LNG-02-005 — Google OAuth
**Status:** BLOCKED_EXTERNAL
**Depends on:** LNG-02-001, LNG-02-004

Adapt proven EduAI concepts only after audit. Validate OAuth state/nonce/redirect constraints; normalize provider identity; issue CongDongNgonNgu sessions only after backend verification. Handle popup/redirect/mobile/browser limitations with explicit recovery UX. Missing provider config fails closed.

## LNG-02-006 — Provider Abstraction for Facebook/Zalo/Apple
**Status:** VERIFYING
**Depends on:** LNG-02-001

Define adapter/config contracts, start/callback normalization, scopes and disabled state. Do not fake provider completion without credentials. No implicit cross-provider email merge.

## LNG-02-007 — Explicit Account Linking & Collision Handling
**Status:** VERIFYING
**Depends on:** LNG-02-003..006

Require an authenticated, recent/verified ownership flow before linking another provider. If an email collides with an existing user, fail safe and direct user to sign into the existing account/link explicitly. Tests cover provider identity collision, changed email and missing/unverified email.

## LNG-02-008 — Auth UX Reconciliation
**Status:** BLOCKED_EXTERNAL
**Depends on:** LNG-02-002..007

Use UI-STITCH.md; verify login/register/verify/reset/provider-recovery states across required viewports, keyboard and screen readers. Run auth security regression, commit/push and update handoff.

Implementation and visual UX reconciliation are complete. The only remaining
external dependency is live Google provider/callback verification tracked by
`BLOCKER-02-001`; publication, remote SHA, and CI evidence are no longer open
gates for this task.

## LNG-02-009 — Auth UI Stitch Fidelity Remediation
**Status:** DONE
**Depends on:** LNG-02-008

Owner-requested visual remediation of the Auth UI against the canonical
Stitch rasters. Covers only Frontend-Web and Workspace evidence: Login,
Register, recovery, verification, provider/session error, and collision /
linking recovery surfaces. The implementation and raster evidence are
complete locally. Owner visual acceptance was granted on 2026-09-10 for the
accepted Frontend-Web `main` commit
`c5fba7b18fe1865c460e8b4d8aac72249558f0bd`. The Google credential blocker is
unchanged, so this task does not change the broader Phase 02 state.

The owner-rejection history, remediation workflow, and pre-acceptance
`VERIFYING` record remain preserved in the existing evidence and prior
Workspace commits.

## Execution reconciliation

Local implementation, tests, browser checks, visual comparison evidence, and
security review are complete for the tasks marked VERIFYING. LNG-02-009 is
DONE after the owner granted visual acceptance for the canonical Stitch
comparisons. LNG-02-008 remains BLOCKED_EXTERNAL only for the live Google
provider/callback verification tracked by `BLOCKER-02-001`; LNG-02-005 and the
broader Phase 02 gate remain BLOCKED_EXTERNAL for the same unresolved external
verification. Phase 03 remains untouched.
