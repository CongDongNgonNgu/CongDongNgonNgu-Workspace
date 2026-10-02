# Phase 17B Evidence — Auth/OAuth/Authorization Adversarial Audit

**Date:** 2026-10-02

**Task:** LNG-17-002 — PASS

**Subphase:** 17B — PASS (Backend main and Workspace evidence; Phase 17 remains IN_PROGRESS)

## Verified heads and change lineage

| Item | Evidence |
| --- | --- |
| Backend baseline at 17B start | `6859ec5e57e8792ea188fe03bcea9c9f94d3ad54` |
| Backend implementation commit | `4b8bda72e7950959ad3cc6150bdd61a81a5d5cb5` |
| Backend PR | #33 — merged with `CI / quality` 1/1 passed |
| Backend merge/main SHA | `403dc9a5c93d7b19784f5c0140a121a471208e37` |
| Frontend reviewed baseline | `620f17c5f8b742fe4062e91fa33b9455d2b8a036` |
| Workspace evidence baseline | `64afdd3bf78617805d7c8e746148fd7901c38187` (17A accepted main) |

The Backend feature branch was verified as an ancestor of remote `main`, then
the remote and local temporary branches were deleted after merge. Workspace
acceptance is being recorded separately on the current evidence branch.

## H-001 remediation

The confirmed 17A high finding was public OAuth login-CSRF/account confusion:
one-time server-side OAuth state was not bound to the initiating browser.

Backend PR #33 adds `cdn_oauth_state` browser binding for public login,
register and link starts. The cookie is short-lived (600 seconds),
HttpOnly, `SameSite=Lax`, and Secure in production. The callback compares the
cookie state with the callback query using a length-checked timing-safe
comparison before calling `OAuthService.callback`. Missing, duplicate,
malformed or mismatched state is rejected; the cookie is cleared before the
success/error redirect.

Executable evidence:

- `src/auth/oauth/oauth-state-cookie.spec.ts`: cookie parsing, duplicate and
  malformed input, mismatch and valid binding cases.
- `src/auth/auth.controller.spec.ts`: public login/register/link start cookie
  issuance; callback rejection before the OAuth service is invoked; cookie
  clearing before redirect.
- Focused helper/controller run: 2 suites, 8 tests — PASS.

H-001 is closed on Backend main at
`403dc9a5c93d7b19784f5c0140a121a471208e37`.

## Adversarial authorization review

The review also checked the existing server boundaries and negative coverage:

- `AccessTokenGuard` verifies the access token, then reloads the live session
  and user and rejects revoked, expired, disabled or mismatched principals.
- Refresh credentials rotate one-time, replay revokes the refresh family,
  and cookie refresh requires allowed origin plus a double-submit CSRF token.
- OAuth transactions are expiring and one-time; link flows bind both user and
  live session, and provider/email collisions are rejected, including the
  concurrent provider-link race.
- `RolesGuard` reads roles from the server-authenticated principal. Admin
  capability checks, role-escalation rejection, disabled-target protection and
  last-active-admin protection remain enforced and tested.

Relevant targeted auth/OAuth/session run: 3 suites, 14 tests — PASS.

## Required gates

- Full Backend unit: 142 suites, 809 tests — PASS.
- Backend E2E: 17 suites, 73 tests — PASS.
- `npm run typecheck` — PASS.
- `npm run build` — PASS.
- `npm run lint` — PASS.
- `npm audit --audit-level=high` — 0 vulnerabilities — PASS.
- `git diff --check` — PASS.
- Remote PR CI: `CI / quality` 1/1 — PASS.

## Scope and residual gates

- M-001 (provider token/profile call timeout) is explicitly deferred to 17C;
  17B does not claim it fixed.
- H-002 ownership matrices, H-003 web/input/upload/config checks, H-004 AI
  boundary checks and H-005 commerce checks remain future 17C–17E gates.
- No production deployment/restart, production database write or migration,
  provider activation, secret mutation, force push, CI bypass or live
  payment/AI action was performed.

## Acceptance

17B satisfies LNG-17-002: H-001 is fixed with executable negative evidence,
auth/session/OAuth/authorization boundaries were adversarially reviewed, all
required Backend gates passed, and the merged main state is verified. Phase 17
remains in progress; 17C is the next eligible subphase. Phase 18 is not
started.
