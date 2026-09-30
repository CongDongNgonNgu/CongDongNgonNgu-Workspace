# Phase 09F implementation evidence

Date: 2026-09-30
Subphase: `PHASE_09F`
Task: `LNG-09-008`
Status: local implementation, validation and acceptance complete; grouped
feature-branch publication is blocked pending explicit authorization.

## Scope reconciled

Close the cross-cutting Phase 09 safety, cost and reconciliation gates around
the existing provider-neutral runtime: prompt-injection boundaries, malformed
structured output, provider outage/timeout, rate and quota rejection,
retry-charge integrity, privacy-safe usage accounting, deterministic cost
handling, bounded reconciliation, error/secret sanitization, responsive/a11y
evidence, regression validation and final Phase 09 evidence. No provider,
billing/payment system, schema change, migration, production write or Phase 10
work is authorized.

## Implementation

- Backend keeps 09A-09E as the only AI execution path and normalizes provider,
  policy, quota, rate-limit, cost and structured-output failures to stable safe
  runtime codes/messages.
- Runtime validates safe capability/request bounds, message count and total
  content size, finite temperature, safe token counts, supported finish reasons
  and bounded provider text before usage settlement.
- Cost accounting is deterministic six-decimal USD per-million-token pricing.
  Missing pricing remains explicit unknown (`null`); invalid pricing, token
  values or non-finite/overflowing costs fail closed with
  `AI_COST_UNAVAILABLE`.
- `ai.usage.reconciliation.v1` is a bounded pure audit contract. It detects
  duplicate request identities, invalid attempts/tokens/totals/costs,
  non-success charges, missing error codes and invalid timestamps without
  returning record payloads, mutating records, auto-repairing facts or adding
  persistence.
- Existing prompt contracts continue to keep learner, roleplay and retrieved
  Library content in untrusted user data envelopes. Existing structured-output
  parsers remain the success boundary; no free-form or provider-specific path
  was added.
- Frontend is unchanged because 09F has no authoritative new user-facing
  surface. The accepted 09E responsive/a11y/browser evidence remains in force.

## Validation observed

- Backend focused 09F suites: 3 suites / 24 tests PASS.
- Backend full unit suite: 76 suites / 535 tests PASS.
- Backend E2E suite: 13 suites / 59 tests PASS.
- Frontend full suite: 53 files / 236 tests PASS; no Frontend source changed.
- Backend and Frontend typecheck, lint and build: PASS.
- Online `npm audit --omit=dev --audit-level=low`: 0 vulnerabilities in both
  repositories.
- Deterministic provider/runtime tests cover success, timeout/provider failure,
  invalid structured output, invalid finish reason, quota/rate rejection,
  retry identity/no duplicate success charge, invalid cost, bounded input,
  privacy-safe errors and reconciliation mismatch/no-repair behavior.
- Controlled runtime verification used local/test adapters only;
  `LIVE_AI_PROVIDER_CALLS=0`.
- Existing 09B-09E contract tests cover learner-context minimization,
  prompt-role separation, writing/grammar/source untrusted-content boundaries,
  provenance/privacy and structured output validation. Existing 09E browser
  smoke and responsive/a11y evidence remains valid because Frontend is
  unchanged.

## Integrity review

Provider bypass, raw profile or Library-row leakage, privileged prompt-role
injection, unbounded runtime input, free-form structured-output acceptance,
original-content mutation, invalid output treated as success, quota/retry
double-counting, provider-specific coupling, secret/error leakage, unsafe
reconciliation repair, speculative schema work and Phase 10 scope creep were
reviewed. No normal finding remained.

## Repository state

- Backend local feature head:
  `8f2eebaf912d664893afbec885eddb7c49b88a06`.
- Backend branch: `phase-09f-safety-cost-reconciliation`.
- Frontend local feature head unchanged:
  `ae7ae39fbecc17014c74d0d788b2acd004b0e6e4`.
- Workspace 09E accepted baseline:
  `056686a8092887fbc5e108a3d7262a5d15481e79`; the current local Workspace
  branch also contains the 09E publication-evidence head before this 09F
  evidence update. The final local Workspace commit is recorded in the
  sanitized Phase 09F handoff after commit.
- Database schema change: NO; migration: NO; test DB mutation: NO; production
  DB mutation: NO; deployment: NO; merge to main: NO.
- Feature-branch CI is not triggered by direct feature pushes under the
  repository workflow; local validation is complete. Publication is waiting
  for grouped explicit authorization for Backend, Frontend and Workspace.
