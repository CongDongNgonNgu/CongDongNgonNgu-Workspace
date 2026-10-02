# Phase 17 Handoff

**Phase status:** IN_PROGRESS — 17A accepted; 17B next

17A (LNG-17-001) established the threat model and attack-surface inventory in
`THREAT-MODEL.md`. The first open high finding is H-001: public OAuth
login/register state is one-time and server-stored but not browser-bound,
leaving a login-CSRF/account-confusion path. It is assigned to Backend auth
and must be fixed and regression-tested in 17B.

The ordered decomposition is in `DECOMPOSITION.md`:
17A → 17B → 17C → 17D → 17E → 17F. Phase 18 is not started.

17A evidence: `evidence/phase-17/PHASE-17A-EVIDENCE-2026-10-02.md`.

Do not paste secrets, exploit tokens or sensitive production data into this
file. Production deployment/restart, production database writes/migrations,
provider activation, secret mutation, force push, CI bypass and live payment/
AI actions remain outside authorization.
