# Phase 17 Security Hardening Decomposition

**Authorization:** `START_PHASE_17=YES` from the project owner on 2026-10-02

**Baseline heads:** Backend `6859ec5e57e8792ea188fe03bcea9c9f94d3ad54`,
Frontend `620f17c5f8b742fe4062e91fa33b9455d2b8a036`, Workspace
`bf119373036ef86173fafc69721df627b550c3f6`.

**Objective:** establish a repository-backed threat model, close verified
security/privacy gaps across the real Backend and Frontend boundaries, and
finish with a non-destructive reconciliation before any Phase 18 work.

## Ordered subphases

| Subphase | Tasks | Dependency | Deliverable and exit gate |
| --- | --- | --- | --- |
| 17A | LNG-17-001 | Phase 16 final closeout | Threat model, asset/trust-boundary inventory, route/module attack-surface map, severity register, test-gap register, and evidence commit. |
| 17B | LNG-17-002 | 17A | Auth/OAuth/session/authorization adversarial audit; fix verified boundary defects; negative regression coverage; Backend CI and remote-main evidence. |
| 17C | LNG-17-003, LNG-17-007 | 17A | Web/input/upload, secrets, dependency and configuration audit; fixes and scans; no secret or provider activation. |
| 17D | LNG-17-004, LNG-17-005 | 17A, Phase 09 | Abuse, privacy, community safety, AI prompt/retrieval/data-boundary audit; negative tests and safe projections. |
| 17E | LNG-17-006 | 17A, Phase 11 | Commerce/payment/webhook/entitlement/credit adversarial audit; replay, signature, amount and concurrency coverage. |
| 17F | LNG-17-008 | 17B–17E | Privacy/retention/security reconciliation, residual-risk disposition, final phase gate, closeout evidence and clean-main verification. |

Each subphase follows: inspect actual source and tests → write a failing or
regression test for behavioral changes → implement the smallest safe diff →
run focused and required gates → review the diff/security boundary → commit,
push, PR/CI/merge, verify remote `main`, update Workspace evidence/state, and
relay a sanitized handoff before chaining to the next eligible subphase.

## Cross-phase constraints

- No production deployment/restart, production database write or migration
  execution, provider activation, secret rotation/exposure, DNS/infrastructure
  mutation, force push, CI/branch-protection bypass, or live payment/AI call.
- Existing contracts, server authority, provider-neutral adapters, privacy
  projections and frontend architecture remain in force.
- A critical/high finding cannot be silently accepted. It must be fixed and
  tested, or be explicitly blocked with an owner, evidence and next action.
- Phase 18 is outside this authorization and must remain unstarted.

## Current execution pointer

17A, 17B and 17C are accepted. 17B closed H-001, the absence of browser
binding for public OAuth login/register state, on Backend main with executable
negative regression evidence. 17C closed M-001 provider-call timeout and M-003
production configuration/dependency exposure, with web/input/upload coverage
and no runtime multipart upload route confirmed. 17D is the next eligible
subphase; Phase 18 remains outside this authorization and unstarted.
