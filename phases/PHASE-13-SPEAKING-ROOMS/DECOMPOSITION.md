# Phase 13 Decomposition — Speaking Rooms

## Authoritative objective

Enable moderated public/private live language practice rooms where users can
listen, speak, raise hand and participate safely. Voice is ephemeral by
default; recording/storage requires separate explicit consent and policy.

## Ordered task graph

```text
Phase 12 + Identity/Profile
        │
        └── 13A: LNG-13-001 → LNG-13-002
                         │
                         └── 13B: LNG-13-003
                                      │
                                      ├── 13C: LNG-13-004 + LNG-13-005
                                      │             │
                                      │             └── 13D: LNG-13-006
                                      │
                                      └── 13E: LNG-13-007 (also depends on Phase 09)

13A + 13B + 13C + 13D + 13E
        └── 13F: LNG-13-008 and Phase 13 final gate
```

## Subphases

### 13A — Room authority and media session foundation

- **Task IDs:** `LNG-13-001`, `LNG-13-002`
- **Dependencies:** Phase 12 final closeout; Identity/Profile contracts
- **Scope:** Define the server-authoritative room/participant/role/lifecycle
  model, visibility and private-access boundary; implement bounded room
  create/list/read contracts and the provider-neutral media token/session
  adapter boundary. Provider-disabled/outage is an explicit state. Add only
  task-authorized additive schema work; do not execute production migrations
  or activate a live provider.
- **Done criteria:** Ownership and role authorization tests pass; private
  access cannot be guessed; room inputs/outputs are bounded DTOs; token/session
  output contains no provider secret and is scoped to room, participant role
  and expiry; replay/concurrency identity is explicit; migration static tests
  pass and migrations `0012`–`0017` are unchanged; focused and affected
  Backend gates pass.

### 13B — Join, leave and reconciled presence

- **Task IDs:** `LNG-13-003`
- **Dependencies:** 13A
- **Scope:** Implement idempotent join/leave, reconnect leases, capacity,
  duplicate-tab/device policy, stale-presence reconciliation and real
  speaker/listener counts. Keep the authenticated actor authoritative and
  prevent arbitrary cross-user participant mutation.
- **Done criteria:** Exact and concurrent replay tests pass; legitimate
  reconnects survive stale cleanup; capacity and duplicate-device behavior
  are deterministic; ownership/privacy/error tests pass; no provider call is
  required for the safe local adapter path.

### 13C — Queue, moderation and room chat

- **Task IDs:** `LNG-13-004`, `LNG-13-005`
- **Dependencies:** 13B
- **Scope:** Add deterministic raise-hand queue and host decision flow,
  promote/demote/self-cancel/reconnect behavior, server-side moderation
  actions and audit facts, participant block/report integration, and bounded
  plain-text room chat with rate limiting and safe rendering. Mute semantics
  are explicit: server role state is authoritative, while provider-level
  enforcement is adapter-specific and never implied by client state.
- **Done criteria:** Queue races and unauthorized self-promotion are covered;
  host/moderator permissions and participant isolation pass; moderation and
  chat replay/rate/XSS tests pass; audit projections exclude private
  internals; no raw provider payloads or stack traces are exposed.

### 13D — Speaking-room UI and safe interaction states

- **Task IDs:** `LNG-13-006`
- **Dependencies:** 13B and 13C
- **Scope:** Use the required Stitch workflow for room discovery/detail and
  live audio-room surfaces. Implement project-native, mobile-first UI for
  topic/language/level, speakers/listeners, queue, chat, moderation and
  leave. Include microphone denied/device unavailable, reconnecting, provider
  outage, full/private-room and removed states; preserve keyboard, focus,
  live-region, responsive and safe-area behavior.
- **Done criteria:** Stitch references are recorded; no video-conference
  clone or default recording affordance exists; UI renders server facts only;
  responsive checks cover 320–1440px and browser smoke has clean console,
  network and accessibility evidence.

### 13E — Consent-aware post-room AI contract

- **Task IDs:** `LNG-13-007`
- **Dependencies:** Phase 09; 13A
- **Scope:** Define an optional, disabled-by-default transcription/AI feedback
  contract. Consent must be explicit, unselected by default and separable
  from ordinary room use. Specify transmitted data, provider capability,
  retention, deletion and failure behavior. If a safe provider path is not
  available, keep the feature unavailable without hidden recording.
- **Done criteria:** Consent, refusal, retention/deletion, capability and
  provider-disabled tests pass; default room flow produces no recording or
  storage request; contract uses the existing provider-neutral AI boundary
  and does not expose raw audio/transcripts by default.

### 13F — Reliability, safety reconciliation and final gate

- **Task IDs:** `LNG-13-008` plus complete Phase 13 reconciliation
- **Dependencies:** 13A–13E
- **Scope:** Run cross-subphase regression and reconcile role escalation,
  private access, queue races, reconnect, capacity, provider failure,
  moderation removal, block/report, microphone permissions, privacy,
  migration integrity, frontend/backend gates, online audits, browser
  evidence, exact-head/post-merge CI, Workspace state and branch cleanup.
- **Done criteria:** Every `LNG-13-*` task is accepted with evidence;
  `AUTHORIZATION`, `OWNERSHIP`, `IDEMPOTENCY`, `CONCURRENCY`,
  `PRIVACY_BOUNDARY`, `ERROR_SANITIZATION` and `SECRET_HANDLING` pass;
  required tests/build/lint/typecheck/audits/CI pass; no production mutation,
  live provider activation or deployment occurred; all Phase 13 branches are
  cleaned and all three mains are synchronized and clean.

## Cross-cutting invariants

- Backend remains authoritative for room ownership, access, participant role,
  presence, queue, moderation, read/write state and consent facts.
- Private-room access uses server-validated invitation/access material with
  bounded lifetime and non-guessable identity; room IDs alone are not access
  credentials.
- Every retryable write has a logical identity and deterministic replay
  behavior backed by repository constraints/transactions where persisted.
- Voice is not recorded or stored in the default flow. Production provider
  configuration, paid service activation and production migration execution
  remain hard human stops.
