# Phase 17 Handoff

**Phase status:** IN_PROGRESS — 17A and 17B accepted; 17C next

17A (LNG-17-001) established the threat model and attack-surface inventory in
`THREAT-MODEL.md`. 17B (LNG-17-002) completed the auth/OAuth/session/
authorization adversarial audit and closed H-001 on Backend main at
`403dc9a5c93d7b19784f5c0140a121a471208e37` with browser-bound OAuth state and
negative regression coverage. M-001 (provider-call timeout) is explicitly
deferred to 17C and is not accepted as fixed.

The ordered decomposition is in `DECOMPOSITION.md`:
17A → 17B → 17C → 17D → 17E → 17F. Phase 18 is not started.

17A evidence: `evidence/phase-17/PHASE-17A-EVIDENCE-2026-10-02.md`.
17B evidence: `evidence/phase-17/PHASE-17B-EVIDENCE-2026-10-02.md`.

Next eligible work is 17C: web/input/upload plus secrets, dependency and
configuration audit. Phase 18 is not started.

Do not paste secrets, exploit tokens or sensitive production data into this
file. Production deployment/restart, production database writes/migrations,
provider activation, secret mutation, force push, CI bypass and live payment/
AI actions remain outside authorization.
