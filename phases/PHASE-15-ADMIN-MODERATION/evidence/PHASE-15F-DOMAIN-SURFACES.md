# Phase 15F — Domain Management Surfaces

**Status:** PASS / implemented surfaces and unsupported limits documented

The phase does not invent domain data. A surface is marked operational only
when a real backend projection and authorization contract exist.

| Domain | Real contract/surface | Visibility | Result |
| --- | --- | --- | --- |
| Users and roles | `GET /admin/users`, `PATCH /admin/users/:userId/roles`, user action routes | ADMIN only | Implemented and audited; safe user projection omits password material |
| Community reports | `GET /admin/metrics`, `/admin/reports`, report detail/notes | MODERATOR, ADMIN | Implemented; reporter identity is not returned |
| Community content/user moderation | `POST /admin/content/:targetType/:targetId/action`, `POST /admin/users/:userId/action` | MODERATOR/ADMIN or ADMIN as defined by capability | Implemented in backend; reasoned, reversible state actions |
| Reputation reversal | `POST /admin/reputation/:entryId/reverse` | ADMIN only | Implemented as explicit idempotent reversal; no automatic ledger rewrite |
| Audit | `GET /admin/audit` backed by append-only audit repository | ADMIN only | Implemented; sensitive keys/raw payloads are sanitized |
| Library review/import | Existing `/library/review` and `/library/review/:resourceId` reviewer routes | Existing reviewer capability | Available and surfaced in readiness map; no fake import-batch data added |
| Language catalog | No Phase 15 admin projection or management endpoint | Not available | Explicitly unavailable in the UI |
| AI usage/provider status | No Phase 15 admin projection; provider configuration is not exposed | Not available | Explicitly unavailable; no provider secrets/config values surfaced |
| Membership/payments/reconciliation | No Phase 15 admin projection | Not available | Explicitly unavailable; no payment signature or transaction UI added |
| Rooms/events | No Phase 15 admin projection/control contract | Not available | Explicitly unavailable |
| Correction/exchange/room/event report targets | Current report contract supports community `POST` and `COMMENT` targets | Backend-supported targets only | Unsupported target domains remain documented; no fabricated queue rows |

## Evidence

- Backend focused Phase 15 reconciliation: 9 suites, 22 tests passed.
- Backend E2E suite: 17 suites, 73 tests passed.
- Backend typecheck and build: passed.
- Frontend admin workspace and API tests: 6 tests passed.
- Frontend full suite and browser/a11y evidence: recorded in
  `PHASE-15E-ADMIN-UI.md`.

The UI may expose a read-only readiness statement for an unavailable domain,
but it does not claim operational control or display invented counts.
