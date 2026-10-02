# Phase 15G — Privilege and Moderation Reconciliation

**Status:** PASS / Phase 15 closed

## Acceptance matrix

| Invariant | Evidence | Result |
| --- | --- | --- |
| Role/capability separation | Backend role policy and service/controller capability checks; expertise roles do not grant platform privilege | PASS |
| Self-escalation and role IDOR | Identity admin tests and strict admin controller/service guards | PASS |
| Last active administrator protection | `identity.admin.spec.ts`; repository/service conflict path | PASS |
| Disabled privileged account behavior | Role policy and identity status checks | PASS |
| Moderator vs ADMIN boundary | ADMIN-only users, roles, audit and reputation routes; frontend visibility tests | PASS |
| Report privacy | Community moderation safe projection and admin page redaction test | PASS |
| Report assignment/state/reason flow | Report workflow service/controller and migration tests | PASS |
| Hide/remove/restore reconciliation | Admin moderation action tests covering reversible content state | PASS |
| User warn/suspend/restore | Admin moderation action service tests and role guard coverage | PASS |
| Reputation reversal | Explicit idempotency and no automatic ledger rewrite tests | PASS |
| Audit sanitization | Repository sanitization tests exclude secret/token/signature/raw payload keys | PASS |
| Additive migration safety | Static migration tests; no production migration execution | PASS |
| UI loading/empty/error/mobile/a11y | Frontend tests, browser DevTools smoke, Lighthouse accessibility 100 | PASS |

## Final repository and CI gate

| Repository | Verified revision | Local result | Remote/CI result |
| --- | --- | --- | --- |
| Backend | `6859ec5e57e8792ea188fe03bcea9c9f94d3ad54` | Focused 22 tests, E2E 73 tests, typecheck/build passed | Phase 15D pre-merge CI runs `#85` and `#87` passed; `main` verified |
| Frontend | `9304cdfe75a6bd7471a00fe593ebbf43a1e142f2` | Full 317 tests, lint/typecheck/build/audit passed | PR `#19` and post-merge quality passed |
| Workspace | `86154e054b5e50a87f1d76eee83418220cb38dba` | Evidence commit `9ac4facccde5f10c11e6b2cf021b6ed869c7d58d` merged; clean `main` verified | PR `#77` merged; repository reports no check-runs |

## Safety and phase boundary

- `PHASE_15_PRODUCTION_DEPLOYED=NO`
- `PHASE_15_PRODUCTION_DB_MUTATED=NO`
- `PHASE_15_PROVIDER_ACTIVATED=NO`
- `PHASE_15_SECRET_MUTATION=NO`
- No production restart, real-money transaction, DNS change, force-push or CI
  bypass occurred.
- Phase 16 is not started. The next phase remains pending until explicitly
  opened by the project workflow.
