# V3 Roadmap — Communication, Community Completion & Full-System Validation

**Status:** Phase25 DONE / GO_BOUNDED_LANGUAGE_HUB; Phases26–29 PLANNED / NOT EXECUTION AUTHORIZED
**Recorded:** 2026-10-09 (Asia/Ho_Chi_Minh)  
**Predecessor:** Phase 24 DONE / GO_BOUNDED_LOCALIZATION  

This roadmap records the owner-approved forward product direction after reviewing the current Community, member-exchange, Language Hub and bounded Study Group journeys. It does **not** authorize implementation, deployment, production database mutation, provider activation, telemetry expansion, payment activation, secret changes, destructive infrastructure work or any new major phase. Each major phase still requires explicit owner execution authorization.

## Current execution record — 2026-10-09

Explicit owner full Phase25 authorization completed LNG25-001–004. See [Phase25 verdict](../phases/PHASE-25-LANGUAGE-HUB-FUNCTIONAL-COMPLETION/VERDICT.md). Bounded functional-path acceptance retains explicit source/audio/exercise and Community/Q&A target-English deferrals. No populated content inventory asserted. Historical23B intent superseded by forward Phase25 execution; historical records intact, no separate23B run.

STOP at25. Phases26–29 PLANNED, unauthorized/unstarted. Next action WAIT_FOR_OWNER_TO_AUTHORIZE_PHASE26. Earlier planning-only flags below are historical; the roadmap/index alone never grants execution permission.

## Product objective

Close the current product loop so a learner can move from content discovery to human help and collaborative learning without dead ends:

```text
Learn / discover content
→ ask or share
→ find a study partner
→ connect
→ communicate 1:1
→ send learning context directly
→ ask for help
→ learn together
→ create/join bounded study groups
→ communicate in group context
→ discover/filter relevant Community content
→ verify the complete system with multi-user simulation
```

The V3 sequence intentionally places **Communication before full-system Codex user simulation**. Full-system testing must validate a reasonably complete user journey rather than certify disconnected features.

## Recommended order

| Order | Phase | Capability | Primary exit gate |
|---|---|---|---|
| 1 | 25 | Language Hub Functional Completion | Visible learning categories have real end-to-end paths or explicit evidence-backed blockers |
| 2 | 26 | Member Connection & Communication | Find → connect → 1:1 communicate → share learning context works securely |
| 3 | 27 | Community & Collaborative Learning Completion | Community interaction model, filtering and Study Group collaboration are coherent and complete |
| 4 | 28 | Codex Full-System User Simulation | Multi-account end-to-end journeys pass with no accepted critical flow break |
| 5 | 29 | Pre-Launch Hardening | Security, reliability, performance, accessibility and operations gates pass or are explicitly held |

The order is a product sequence, not permission to run later phases automatically. Phase 28 depends on completion/acceptance of the user-facing capabilities it is intended to simulate.

---

# Phase 25 — Language Hub Functional Completion

## Objective

Finish the visible Language Hub experience before broad system testing. Any category shown as available to users must have a real functional path; categories that cannot be completed truthfully must expose a clear blocker/re-entry condition instead of misleading placeholder readiness.

## Scope

- Re-audit current Language Hub category state after Phase 23/24 work.
- Complete remaining `Sắp có`, `Chưa khả dụng`, dead-end or placeholder learning journeys where real eligible data and contracts exist.
- Preserve source/provenance/license/eligibility/publication rules already established by Phase 21/23.
- Preserve completed multilingual UI infrastructure; do not recreate `LNG-19-006`.
- Ensure list/detail/search/filter/navigation states are coherent for supported categories.
- Verify loading, empty, error, no-result and unavailable states.
- Verify vi/en UI copy, responsive behavior and accessibility for completed surfaces.

## Out of scope

- Fabricated learning content.
- Generated authoritative learning answers without separately reviewed policy.
- External AI/provider activation unless separately authorized.
- Payment activation.
- Unrelated redesign.

## Exit criteria

Every visible Language Hub category is either:

1. end-to-end functional with real accepted data/contracts and tests, or
2. explicitly deferred with an evidence-backed blocker and measurable re-entry gate.

---

# Phase 26 — Member Connection & Communication

## Objective

Turn member discovery into a complete human learning loop. A learner who finds another member must be able to establish a bounded relationship, communicate safely, and send the exact learning context they need help with.

## Core journey

```text
Find study partner
→ view profile
→ send connection request
→ accept / decline
→ connected study partners
→ 1:1 conversation
→ send learning context
→ ask a question
→ receive reply
→ optionally invite to a Study Group
```

## Required capability areas

### 26A — Relationship model

- Connection/friend request lifecycle: pending, accepted, declined/cancelled where appropriate.
- Duplicate/replay/idempotency handling.
- Block relationship and its precedence over connection state.
- Safe member visibility and anti-enumeration behavior.
- Relationship authorization enforced by Backend; frontend controls are UX only.
- Removal/unfriend semantics and immediate access effects.

### 26B — 1:1 messaging

- Durable direct-conversation model.
- Text messages first; attachments/voice/video are not implied.
- Server-side participant authorization on every conversation/message operation.
- Pagination/order/idempotency and duplicate-send handling.
- Read/unread state and notification integration where existing notification contracts allow it.
- Safe edit/delete policy if included by frozen contract.
- Blocked users cannot initiate or continue disallowed communication.
- Abuse/report controls appropriate to direct communication.

### 26C — Realtime communication

- Realtime delivery using a reviewed transport compatible with the existing architecture.
- Reconnect/resume behavior.
- No reliance on client-side authorization state.
- Multi-instance/deployment behavior proven where the chosen transport requires it.
- Graceful fallback to persisted message history.

### 26D — Share learning context to a person

Add a first-class **Send to study partner** flow from supported content such as:

- Community post/question;
- Library/related resource;
- Language Hub learning item;
- other public/authorized learning surfaces explicitly approved by contract.

The message should carry a safe reference/card plus optional sender text, for example:

```text
[CARD: Japanese question/resource]
"I do not understand this part — can you explain it?"
```

Opening a shared item must re-check the receiver's current authorization/eligibility. Sharing a reference must never grant private access by itself.

### 26E — Communication UX

- Conversation list.
- Direct conversation detail.
- Unread indicators.
- Message composer with compact auto-grow text input.
- Safe long-message wrapping and mobile layout.
- Empty/loading/error/offline/reconnect states.
- Keyboard/focus/screen-reader semantics.
- Responsive checks at 320/375/390/412/768/1024/1440.

## Security/privacy gates

- Cross-conversation IDOR = zero known accepted-case leaks.
- Block enforcement on Backend.
- No unauthorized conversation/member enumeration.
- No raw security/session data in message payloads/logs.
- Rate limits and abuse controls are durable where necessary.
- No automatic exposure of private Study Group/private content.

## Exit criteria

A synthetic multi-user TEST journey proves:

```text
A finds B
→ A requests connection
→ B accepts
→ A and B exchange messages
→ A sends a learning item with a question
→ B opens only content they are authorized to view
→ B replies
→ unread/read and revocation/block behavior remain correct
```

---

# Phase 27 — Community & Collaborative Learning Completion

## Objective

Remove overlapping interaction models in Community, add meaningful discovery/filtering, and evolve existing bounded Study Groups into coherent collaborative learning spaces without creating a duplicate group system.

## 27A — Community search and filters

Implement Backend-backed search/filtering rather than loading everything and filtering only in the browser.

Candidate filters, subject to frozen API/data contracts:

- text search;
- language;
- post type;
- topic/tag;
- response state (`unanswered`, `answered`, `accepted` where applicable);
- saved items for the current user where supported;
- sort by newest / useful / active where data semantics are truthful.

Required gates:

- bounded pagination;
- stable sorting;
- indexes/query-cost review;
- no private/ineligible content leakage;
- safe empty/no-result states;
- URL/query-state persistence where appropriate.

## 27B — Normalize Community interaction semantics

Current UI must stop presenting overlapping primary response mechanisms.

### DISCUSSION / ordinary posts

Primary interaction:

```text
Post
→ comment
→ one-level reply to comment
```

### QUESTION posts

Primary interaction:

```text
Question
→ structured answers
→ helpful vote on an answer
→ asker accepts an answer
→ one-level discussion under that answer
```

Avoid showing a large generic comment composer above the primary answer workflow. If additional discussion is retained, label it clearly as secondary **Trao đổi thêm** or attach it to each answer.

### CORRECTION_REQUEST posts

Primary interaction:

```text
Original text
→ correction proposal
→ optional explanation
→ helpful / accepted state
→ one-level discussion under a proposal where useful
```

Do not duplicate the same question/original text unnecessarily inside the same viewport unless comparison is required by the correction flow.

## 27C — Structured answer UX cleanup

- Remove duplicated question block on QUESTION detail when the question is already clearly visible above.
- Make the answer composer compact initially.
- Use auto-grow textarea behavior up to a bounded max height; scroll only after the cap.
- Move optional explanation behind a compact progressive disclosure such as `+ Add explanation` where appropriate.
- Preserve Unicode limits and server validation.
- Keep `Helpful` semantics scoped to the specific entity: post helpfulness and answer helpfulness are separate but must be visually unambiguous.
- Add one-level reply/discussion under structured answers if the backend contract is implemented.
- Do not introduce unlimited Reddit-style nesting.

## 27D — Study Group collaborative communication

Reuse and extend the existing Phase 22 Study Group domain. **Do not create a second independent Community Group model.**

Potential bounded capabilities:

- group conversation/realtime text;
- one-level reply/reaction where justified;
- unread state;
- share Community/Library/Language Hub learning references into a group;
- invite an accepted study partner into a group;
- member list and existing owner/moderator boundaries;
- existing removal/revocation/ownership invariants remain authoritative.

Any public group discovery requires a separate visibility contract. Existing private groups remain private by default. If introduced, visibility must be explicit, for example:

```text
PRIVATE
JOIN_BY_INVITE
PUBLIC_JOINABLE
```

No existing private group may become publicly discoverable implicitly.

## 27E — Collaborative learning session concept

A lightweight text-first learning session may be introduced if it can reuse existing communication/group contracts safely:

```text
select partner/group
→ choose learning context
→ discuss shared resource/question
→ retain bounded conversation history
```

Voice/video is not required for Phase 27 unless separately authorized.

## Exit criteria

- Community has one clear primary interaction model per post type.
- Structured QUESTION/CORRECTION flows no longer duplicate/compete with generic comments.
- Search/filtering is backend-backed and privacy-safe.
- Structured answer editor is compact/auto-growing and accessible.
- Reply behavior is bounded and understandable.
- Study Groups support coherent collaborative text communication using inherited Phase 22 authorization rules.

---

# Phase 28 — Codex Full-System User Simulation

## Objective

Only after Phases 25–27 are accepted, run a broad multi-account simulation of the product as real users would experience it.

## Simulation model

Use synthetic TEST/UAT accounts and disposable data only. At minimum model multiple distinct users so cross-user authorization and collaboration are exercised.

Example end-to-end route:

```text
register/login
→ onboarding
→ choose learning language
→ Language Hub discovery
→ open learning content
→ ask Community question
→ another user answers
→ accept/helpful/reply
→ filter/search Community
→ find study partner
→ send/accept connection
→ direct chat
→ share current learning content into chat
→ ask for help
→ create/join Study Group
→ invite connected member
→ group discussion
→ share Library/Community/Language Hub content to group
→ leave/remove/revoke cases
→ Library / Related Resources
→ locale switching / responsive / navigation regressions
```

## Required categories

- happy-path journeys;
- anonymous/authenticated boundaries;
- multi-user IDOR attempts;
- stale sessions and immediate revocation;
- duplicate/replay/race cases where applicable;
- reconnect/reload/navigation/back-forward;
- responsive widths 320/375/390/412/768/1024/1440;
- vi/en UI;
- accessibility checks;
- safe error and empty states;
- synthetic fixture cleanup.

Codex simulation evidence is technical acceptance only. It does not prove real-user value, retention, usability satisfaction or production-market fit.

## Exit criteria

No known accepted-case critical journey break, privilege escalation, cross-user/group/conversation authorization leak or unrecovered test-data contamination. All defects found are fixed or explicitly classified/held with owner-visible evidence.

---

# Phase 29 — Pre-Launch Hardening

## Objective

Prepare the technically complete product for a later owner-controlled real-user release decision.

## Scope

- security review and threat-model refresh;
- authentication/session/CSRF/CORS/privacy regression;
- authorization audit across Community, direct messages and Study Groups;
- rate limiting/abuse/reporting review;
- database constraints/migrations/rollback/backup-restore evidence;
- performance/query-cost/N+1/index review;
- realtime resilience and reconnect behavior;
- logging/monitoring/alerting with secret/PII safety;
- error handling and recovery paths;
- accessibility and keyboard/screen-reader review;
- responsive/browser regression;
- dependency/vulnerability audit;
- operational runbooks;
- TEST-to-production release checklist.

## Hard holds

This phase does not itself authorize:

- production deployment;
- production database migration/write;
- real-user private data collection;
- payment activation;
- paid provider purchase;
- production secret rotation;
- DNS/destructive infrastructure changes.

Those remain explicit owner-controlled actions under project policy.

## Exit criteria

A pre-launch dossier identifies every required release gate as PASS, explicitly DEFERRED, or OWNER ACTION REQUIRED with evidence and rollback/recovery instructions. No production launch is implied by technical completion.

---

# Cross-phase invariants

All V3 phases inherit existing project working/security rules and accepted Phase 20–24 boundaries unless explicitly re-reviewed. In particular:

- Backend authorization is authoritative; client UI never grants access.
- Existing private content semantics are not silently broadened.
- Existing private Study Groups remain private unless an explicit visibility contract is approved.
- Sharing a link/card never grants access by itself.
- Block/removal/revocation must take effect on fresh server authorization checks.
- No duplicate group domain should be created when Phase 22 Study Groups can be safely extended.
- `LNG-19-006` localization infrastructure is reused, not recreated.
- Payment remains disabled unless separately authorized.
- Synthetic TEST/UAT evidence must be distinguished from real-user evidence.
- Real-user value, product-market fit and human linguistic certification must not be inferred from automated tests.

# Historical planning authorization snapshot (superseded for Phase25 only)

```text
PHASE_25_EXECUTION_AUTHORIZED=NO
PHASE_26_EXECUTION_AUTHORIZED=NO
PHASE_27_EXECUTION_AUTHORIZED=NO
PHASE_28_EXECUTION_AUTHORIZED=NO
PHASE_29_EXECUTION_AUTHORIZED=NO

NEXT_MAJOR_PHASE=25
NEXT_ACTION=WAIT_FOR_OWNER_TO_AUTHORIZE_PHASE_25
```
