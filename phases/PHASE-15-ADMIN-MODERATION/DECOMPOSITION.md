# Phase 15 — Admin & Moderation Decomposition

Status: `IN_PROGRESS`

Phase 15 is the first operational administration and moderation layer for
the real CongDongNgonNgu domains delivered by Phases 05, 08, 10, 11, 12,
13 and 14. It must remain backend-authoritative, privacy-preserving and
reversible where possible. The frontend is an operator surface, never the
authorization boundary.

## Entry state

| Repository | Phase 15 start revision | Branch | Notes |
| --- | --- | --- | --- |
| Backend | `3fc6861a44a40fb372852374b33116d31f499c98` | `main` | Expected Phase 14 final |
| Frontend | `a337ad394e293ec7f2f2105da273a42a6acb3eba` | `main` | Includes the later merged navigation audit |
| Workspace | `bbb61bcfb46f64af7a544ce657fd57d5bd41f5a0` | `main` | Includes the later merged navigation evidence |

All three repositories were fetched and pruned before execution. The
frontend and workspace revisions are legitimate descendants of the Phase 14
baseline; no reset or history rewrite is allowed.

## Sequential work packages

### 15A — `LNG-15-001` Role and Permission Matrix

Define the canonical role/capability policy for `USER`, `CONTRIBUTOR`,
`EXPERT`, `MODERATOR` and `ADMIN`, while preserving the legacy `MEMBER` role
as a compatibility alias until migration is complete. Separate domain
expertise from platform privilege. Protect role assignment, self-escalation,
self-demotion, the last active administrator and disabled accounts. Add
focused backend policy and negative authorization tests.

Exit evidence: policy table, repository/service enforcement, additive schema
change if required, tests for every privileged edge case.

### 15B — `LNG-15-002` Moderation Case and Report Workflow

Expose a paginated, filterable report/case queue over the existing community
report domain. Preserve reporter privacy for non-admin views. Support
assignment, notes/evidence references, duplicate grouping and explicit
`OPEN`, `DISMISSED` and `ACTIONED` outcomes without silently changing a
target's public state.

Exit evidence: report repository/service/controller coverage and privacy,
assignment and state-transition tests.

### 15C — `LNG-15-003` Content and User Moderation Actions

Add reasoned hide/remove/restore actions for available content and warn,
suspend/restore actions for users. Prefer soft state over hard deletion.
Reputation reversal remains explicit, idempotent and audited; moderation does
not automatically rewrite the ledger.

Exit evidence: action APIs, state reconciliation across public projections,
restore tests and user/reputation safety tests.

### 15D — `LNG-15-004` Admin APIs and Audit Log

Create the strict admin API boundary with safe projections, pagination and
filtering. Add immutable-enough audit evidence containing actor, action,
target, reason, correlation id, timestamp and sanitized before/after
references. Never return secrets, payment signatures, provider credentials or
raw AI configuration.

Exit evidence: contract DTOs, role/capability guards, audit persistence,
sanitization tests and API integration coverage.

### 15E — `LNG-15-005` Admin Shell and Dashboards

Use the approved Stitch direction for a distinct but coherent operator UI.
Provide a responsive admin shell, real metrics, dense tables that transform
on mobile, keyboard/focus states, loading/empty/error states and screen-reader
labels. Frontend role checks are visibility ergonomics only; the backend
remains authoritative.

Exit evidence: Stitch design reference, frontend route/API components,
component tests, lint/typecheck/build and browser/a11y/responsive evidence.

### 15F — `LNG-15-006` Domain Management Surfaces

Complete the available operational surfaces: users and roles, language
catalog, community cases, Library review/import status, AI usage/provider
status without secrets, membership/payment/reconciliation projections,
reputation adjustments and applicable event/room controls. Reuse existing
domain services and show only real data or an explicit unavailable state.

Exit evidence: each implemented subsurface has an API/UI test and an audit
trail; unsupported domains are documented rather than mocked.

### 15G — `LNG-15-007` Privilege and Moderation Reconciliation

Run the final negative matrix: IDOR, role escalation, last-admin protection,
moderator/admin separation, disabled users, report privacy, audit
sanitization, restore behavior and reputation reversal. Complete the Stitch,
responsive, accessibility, regression, CI and Workspace evidence gates.

Exit evidence: final acceptance matrix passes, all three main branches are
verified, temporary branches are cleaned up and Phase 16 remains unopened.

## Dependency order

```text
15A → 15B → 15C → 15D → 15E → 15F → 15G
```

15B may reuse the existing community report storage, but may not bypass the
15A capability policy. 15C and later packages must use the 15D audit
contract. 15E and 15F may be split into additional reviewable commits, but
must not be marked complete without their package-level tests.

## Hard boundaries

- No production deploy, restart, database mutation or migration execution.
- No provider activation, secret mutation, real-money transaction, DNS
  change, force-push or CI bypass.
- Additive migrations may be created and statically checked only.
- Do not start Phase 16 after 15G; record the next phase as pending.
