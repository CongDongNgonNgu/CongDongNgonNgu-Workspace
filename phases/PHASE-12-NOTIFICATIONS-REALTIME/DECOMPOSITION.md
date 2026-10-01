# Phase 12 Decomposition

## Authoritative baseline

Phase 11 is closed and Phase 12 is the next eligible phase. The synchronized
Phase 12 start heads are:

- Backend: `c8d22b2dfe4086d1da7faad6a9bdeb7637cb5d46`
- Frontend: `e3ff9dd9bc8731e37f5601c4ceeadda9da9e32c8`
- Workspace: `1e23561703b2f6bdf3a1ea75b899a79007f0222d`

The existing Phase 12 task definitions remain authoritative. The phase is
split by domain boundary and dependency order; testing, review, runtime,
acceptance and CI gates stay inside each subphase rather than becoming their
own handoff.

## Ordered subphases

### 12A — Notification Domain & Event Contracts

- **Task IDs:** `LNG-12-001`
- **Dependencies:** Phase 05; accepted Phase 10/11 source facts where a
  contract needs to reference them
- **Scope:** Provider/channel-neutral domain-event envelope and validation;
  notification intent, canonical record, delivery-attempt/channel and
  read-state boundaries; bounded event payloads; safe actor/target
  projections; server-authoritative recipient binding; versioning,
  idempotency and collision semantics; retention/priority/category metadata.
- **Out of scope:** persistence/API/read-state endpoints, SSE/WebSocket,
  email/push providers, notification preferences, Frontend UI, domain-event
  producer rewiring and migrations.
- **Done criteria:** executable contract tests pass for valid/invalid and
  unsupported-version events, bounded/minimized payloads, recipient/privacy
  rules, exact/concurrent/altered duplicate handling, distinct-event
  preservation, safe error output and channel-neutral boundaries; no provider
  call or database mutation; local commit and Workspace evidence recorded.

### 12B — Notification API & Read State

- **Task IDs:** `LNG-12-002`
- **Dependencies:** 12A
- **Scope:** Canonical notification persistence, paginated owner-scoped
  reads, unread count, idempotent mark-one/mark-many read and safe archive or
  delete policy if selected by the authoritative implementation.
- **Done criteria:** API, persistence/migration, authorization, race and
  reconciliation tests pass without destroying notification history.

### 12C — Realtime Delivery

- **Task IDs:** `LNG-12-003`
- **Dependencies:** 12A, 12B
- **Scope:** Authenticated provider-neutral realtime adapter, reconnect/backoff,
  resume or polling fallback, event/notification deduplication and multi-tab
  behavior.
- **Done criteria:** disconnect/reconnect, missed-event, duplicate, auth,
  fallback and multi-tab tests pass; canonical state remains recoverable.

### 12D — Notification Preferences

- **Task IDs:** `LNG-12-004`
- **Dependencies:** 12A
- **Scope:** Server-side category/channel preferences with conservative
  defaults, optional-noise suppression and mandatory security/account/payment
  notice protection.
- **Done criteria:** preference matrix, authorization, privacy and mandatory
  notice tests pass; future email/push channels remain extensible.

### 12E — Notification UI Surfaces

- **Task IDs:** `LNG-12-005`, `LNG-12-006`
- **Dependencies:** 12B, 12C, 12D
- **Scope:** Stitch-designed desktop dropdown/panel and dedicated mobile
  notification center with safe rendering, filters, read states, navigation,
  empty/offline/reconnecting states and accessibility behavior.
- **Done criteria:** Stitch references, responsive matrix, keyboard/focus,
  screen-reader and visual checks pass at the required viewports.

### 12F — Event Integration, Reliability & Final Gate

- **Task IDs:** `LNG-12-007`, `LNG-12-008`
- **Dependencies:** 12A, 12B, 12C, 12D, 12E
- **Scope:** Wire only authoritative implemented community, exchange,
  reputation and membership triggers; reconcile target/actor deletion,
  preferences, duplicate delivery, reconnect, unread races and privacy;
  perform the final security, responsive/a11y, regression, CI and evidence
  gate.
- **Done criteria:** all implemented triggers have explicit dedup/privacy
  semantics, reliability tests and final-gate evidence pass, accepted heads
  are integrated and temporary branches are cleaned up.

## 12A execution boundary

12A is Backend-only plus Workspace evidence. Frontend is intentionally
unchanged. No event producer is rewired and no delivery provider is
activated; the contract seam is prepared for later adapters.
