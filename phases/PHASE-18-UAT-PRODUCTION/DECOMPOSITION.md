# Phase 18 Decomposition — UAT, Seed Data & Production Launch

## Authoritative objective

Prove complete user journeys with realistic, safe UAT data and
production-like deployment evidence before declaring launch readiness. Phase
18 may use dedicated TEST/UAT environments and deterministic fixtures, but it
does not authorize production deployment, production database mutation,
production migrations, live provider activation, real-money transactions,
secret rotation or production environment changes.

## Synchronized Phase 18 start heads

- Backend: `76fb2732a62da5437ed4390f74ebe0fb507fca46`
- Frontend: `01331d6e4f768c9a5d0079658c60b7fcedddcaa8`
- Workspace: `503d7fa5780f02822557d860d8e675291eb87504`

Phase 17F is accepted at these application heads and Workspace evidence
`evidence/phase-17/PHASE-17F-EVIDENCE-2026-10-02.md`. The inherited M-002
release gates remain active: the community limiter is process-local until an
approved single-instance model or shared limiter exists, and no account-wide
offboarding, scheduled purge, export, erase, recording or durable transcript
capability may be advertised or enabled without its own release gate.

## Ordered dependency graph

```text
Phase 17 final closeout + Phase 18 authorization
        │
        └── 18A LNG-18-001 UAT dataset, personas and guarded seed fixtures
                │
                └── 18B LNG-18-002 traceable end-to-end journey matrix
                        │
                        └── 18C LNG-18-003 clean automated regression
                                │
                                └── 18D LNG-18-004 safe UAT functional execution
                                        │
                                        ├── 18E LNG-18-005 provider/payment,
                                        │       LNG-18-006 backup/rollback,
                                        │       LNG-18-007 observability readiness
                                        │
                                        └── 18F LNG-18-008 production deployment
                                                and safe smoke (hard-stop gated)
                                                │
                                                └── 18G LNG-18-009 launch
                                                        reconciliation + final gate
```

## Subphases

### 18A — UAT dataset, persona plan and guarded seed foundation

- **Task IDs:** `LNG-18-001`
- **Dependencies:** Phase 17 final closeout and active Phase 18 authorization
- **Scope:** Define the required anonymous/new-user/learner/contributor/
  reviewer/language-buddy/member/moderator/admin personas and deterministic
  language scenarios. Add a non-production-only, explicitly targeted,
  idempotent seed command for dedicated UAT identities and profile/language
  fixtures. Never reset or delete arbitrary data; reject production targets
  before opening a database connection.
- **Done criteria:** Persona manifest and credential-handling boundary are
  documented; seed guards, stable fixture keys, role/profile/language
  constraints and rerun behavior have executable tests; dry-run output is
  safe; no production database/provider/secret action occurs.

### 18B — Traceable end-to-end journey matrix

- **Task IDs:** `LNG-18-002`
- **Dependencies:** 18A
- **Scope:** Map anonymous discovery, auth/onboarding, hub/community,
  correction, Library, exchange, AI, XP/reputation, membership/payment
  sandbox, notifications/realtime, rooms/events, moderation and admin
  journeys to personas, preconditions, expected evidence and environment.
- **Done criteria:** Every required journey has a stable ID, dependency,
  automation/manual classification, expected result and evidence slot;
  unavailable/disabled surfaces are explicit rather than implied PASS.

### 18C — Full automated regression and release-candidate evidence

- **Task IDs:** `LNG-18-003`
- **Dependencies:** 18B
- **Scope:** Run clean Backend/Frontend install, typecheck, lint, unit/E2E,
  build, audit, security regression, browser/visual and responsive checks;
  fix ordinary defects and quarantine only with an owner/reason.
- **Done criteria:** Exact tested SHAs, suite/test counts, audit results and
  remaining failures are captured; no retry-only or fabricated green result.

### 18D — Safe UAT functional execution

- **Task IDs:** `LNG-18-004`
- **Dependencies:** 18A–18C
- **Scope:** Execute the journey matrix only against local/TEST/approved
  production-like environments using dedicated fixtures. Classify each
  journey `PASS`, `FAIL`, `BLOCKED_EXTERNAL`, `UNSAFE_PRODUCTION_TEST` or
  `NOT_APPLICABLE` with sanitized evidence.
- **Done criteria:** No launch-blocking unresolved FAIL is hidden; blocked or
  unsafe journeys remain visible and have an owner/decision path.

### 18E — Provider, recovery and operational readiness

- **Task IDs:** `LNG-18-005`, `LNG-18-006`, `LNG-18-007`
- **Dependencies:** 18D; Phase 11 provider contracts; deployment architecture
- **Scope:** Verify sandbox/disabled-provider behavior, payment identity and
  reconciliation boundaries, safe backup restore, migration permissions,
  rollback/redeploy ownership, health/readiness, redacted logs, metrics,
  correlation IDs, alerts and runbooks. Live provider activation and
  production data changes remain hard stops.
- **Done criteria:** Each applicable item has observed evidence or an
  explicit external-blocker/non-applicable decision; backup is not called
  verified without a test restore.

### 18F — Production deployment and safe smoke

- **Task IDs:** `LNG-18-008`
- **Dependencies:** 18C–18E PASS or formally approved constraints
- **Scope:** Deploy exact tested revisions through the normal CI/CD path and
  verify domain/TLS, public/authenticated safe smoke, health, assets,
  migration status and error rate. This subphase is not executable without
  explicit human authorization for production deployment/restart/migration or
  any required production/provider/secret mutation.
- **Done criteria:** Approved tested SHAs equal deployed SHAs, production
  smoke is safe and evidence is complete, or the task is honestly recorded
  as `HUMAN_AUTHORIZATION_REQUIRED`/`BLOCKED_EXTERNAL`.

### 18G — Launch reconciliation and final gate

- **Task IDs:** `LNG-18-009` plus complete Phase 18 reconciliation
- **Dependencies:** 18F
- **Scope:** Reconcile all journey/provider/backup/observability/deploy facts,
  inherited Phase 17 release gates, residual blockers, owner decisions,
  exact heads, CI, evidence and branch cleanup. Verify synchronized clean
  mains and prepare the final handoff.
- **Done criteria:** `ALL_LNG_18_TASKS=PASS` only when evidence supports it;
  otherwise preserve the exact blocker. Set
  `PHASE_18_TASK_SET_COMPLETE=YES`, `PHASE_18_FINAL_GATE=PASS` and
  `PHASE_18_FINAL_CLOSEOUT=PASS` only after all applicable acceptance gates
  genuinely pass. Stop before Phase 19.

## Cross-cutting gates

Backend remains authoritative for protected state, identity, roles,
authorization, ownership, payments, notifications, room/event facts,
consent, privacy and deletion boundaries. Every retryable write requires
stable idempotency and relevant concurrency coverage. Server time controls
protected temporal decisions. New data must comply with
`docs/08-DATA-LIFECYCLE.md`; M-002 gates, Phase 17 security remediations and
secret/log/error sanitization remain in force. Frontend journeys must retain
Vietnamese UI, PWA/SEO/performance, responsive and accessibility contracts.
