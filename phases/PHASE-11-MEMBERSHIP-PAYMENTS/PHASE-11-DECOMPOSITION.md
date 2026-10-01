# Phase 11 decomposition

Status: `11A=DONE; 11B=DONE; 11C=DONE; 11D=DONE; 11E=DONE; 11F=DONE`; the grouping follows the authoritative task
dependencies in `TASKS.md`. Each subphase owns one coherent functional
boundary and must complete its implementation, focused tests, regression,
self-review/remediation, acceptance, publication, CI, merge/integration,
Workspace evidence and branch cleanup gates before the next subphase begins.

## PHASE_11A — Membership product and entitlement foundation

- **Task IDs:** `LNG-11-001`
- **Dependencies:** Phase 10 final gate
- **Scope:** Separate product/plan-version/status facts from membership and
  entitlement definitions; establish explicit feature keys, limits and
  parameters; provide a server-authoritative authorization service and a
  safe frontend capability projection; make the Free default work without a
  paid membership row.
- **Excludes:** contribution-credit policy, payment attempts, PayOS/provider
  calls, fulfillment, lifecycle automation, pricing UI and production data.
- **Done criteria:** The model is migration-safe and historical plan
  versions remain immutable by reference; backend authorization and
  capability responses fail closed for unknown features; memory/Postgres
  paths and negative authorization cases pass; frontend types/client code
  only renders server facts; migration `0012` is unchanged; no test or
  production database is mutated.

## PHASE_11B — Free/member policy and contribution credit

- **Task IDs:** `LNG-11-002`, `LNG-11-003`
- **Dependencies:** `11A`
- **Scope:** Executable Free/member entitlement matrix for implemented
  capabilities and an auditable, versioned, idempotent contribution-to-
  membership credit/redemption contract that does not alter Reputation
  semantics.
- **Done criteria:** Free remains useful, premium unknowns fail closed,
  credit redemption is concurrency-safe and reversible according to policy,
  and the matrix/credit contract is documented and tested.

## PHASE_11C — Checkout and payment-attempt foundation

- **Task IDs:** `LNG-11-004`
- **Dependencies:** `11A`
- **Scope:** Server-derived product/amount order creation, payment attempts,
  provider reference mapping, idempotency and safe provider-disabled
  behavior behind the provider adapter boundary.
- **Done criteria:** Client amount/status tampering cannot affect trusted
  facts; payment facts remain separate from entitlement facts; PayOS is not
  activated without explicit provider authorization. Migration `0014` is
  additive, `0012` and `0013` remain unchanged, replay/concurrency and
  ownership boundaries pass, and no entitlement or contribution credit is
  granted by checkout or payment-attempt creation.

## PHASE_11D — Webhook fulfillment and membership lifecycle

- **Task IDs:** `LNG-11-005`, `LNG-11-006`
- **Dependencies:** `11C`
- **Scope:** Signature-verified PayOS webhook parsing, event/attempt/order/
  membership identity locking, exactly-once fulfillment, reconciliation
  evidence and explicit activation/expiry/renewal/cancellation semantics.
- **Done criteria:** Replays, collisions, mismatches, out-of-order delivery
  and concurrent fulfillment cannot grant the wrong user or duplicate an
  entitlement period; unsupported recurring billing is not promised.

## PHASE_11E — Pricing, checkout and membership account UX

- **Task IDs:** `LNG-11-007`
- **Dependencies:** `11A` through `11D`
- **Scope:** Stitch-backed responsive Free/member pricing, checkout state,
  pending/paid/failure/cancel recovery and safe membership account/history
  views using the accepted server contracts.
- **Done criteria:** Mobile/desktop/responsive/a11y flows pass at the
  required widths with transparent prices, benefits and cancellation or
  renewal semantics, without provider secret/internal detail leakage.

## PHASE_11F — Payment security reconciliation and final gate

- **Task IDs:** `LNG-11-008`
- **Dependencies:** `11A` through `11E`
- **Scope:** Cross-subphase replay/collision/signature/mismatch,
  entitlement-time-boundary, expiry/renewal, authorization/privacy,
  responsive/a11y, full regression, audit, CI and merge closeout.
- **Done criteria:** The complete Phase 11 task set and cross-subphase
  contracts reconcile cleanly; required CI is green on accepted heads;
  Workspace evidence is truthful; merged branches are removed; all three
  repositories are synchronized and clean; production remains untouched.

## Authoritative dependency graph

```text
Phase 10
  ↓
11A: LNG-11-001
  ├──→ 11B: LNG-11-002, LNG-11-003
  └──→ 11C: LNG-11-004
          ↓
       11D: LNG-11-005, LNG-11-006
          ↓
       11E: LNG-11-007
          ↓
       11F: LNG-11-008 + Phase 11 final gate
```
