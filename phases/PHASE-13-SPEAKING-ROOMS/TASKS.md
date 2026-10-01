# Phase 13 Tasks

## LNG-13-001 — Room Domain & Permission Model
**Status:** DONE — 13A integrated on Backend main

**Depends on:** Phase 12 and Identity/Profile

Model room visibility, language/level/topic, host/moderators, lifecycle, capacity, participants and role states. Define who can create/join/speak/moderate; private invite/access tokens must not be guessable/public.

13A evidence: bounded public/private room facts, host/moderator relation, lifecycle/capacity constraints, owner-scoped private access token hash, and server-derived role boundary are implemented in Backend migration 0018 and `src/rooms`.

## LNG-13-002 — Realtime Media Provider Abstraction
**Status:** DONE — 13A integrated on Backend main

**Depends on:** LNG-13-001

Define room-token/session adapter for selected media provider; server authorizes issuance and scopes participant role/room/time. Provider secrets remain backend-only. Include provider-disabled/outage state. Do not claim live audio completion from UI mocks.

13A evidence: provider-neutral session interface, five-minute server expiry, room/user/role-derived idempotency identity, disabled production adapter, and bounded media response. No real media provider is activated.

## LNG-13-003 — Join/Leave & Participant Presence
**Status:** DONE - 13B integrated on Backend main
**Depends on:** LNG-13-001, LNG-13-002

Implement idempotent join/leave, reconnect, capacity, duplicate-tab/device policy and presence reconciliation. Clean up stale participants without ejecting legitimate reconnects. Display speaker/listener counts from real state.

13B evidence: server-authoritative join, leave and heartbeat endpoints with
exact/concurrent replay protection, reconnect leases, stale reconciliation,
row-locked capacity enforcement, duplicate-device policy, bounded participant
projections and direct authorization/privacy coverage are implemented in
Backend migration 0019 and `src/rooms`. Backend PR #20 merged at
`6d5c2f6b115bc65036b900f1a572f2e30a84301e`; exact-head CI
`36857615046` and post-merge CI `36857869530` passed.

## LNG-13-004 — Raise Hand & Speaker Queue
**Status:** DONE — 13C integrated on Backend main

**Depends on:** LNG-13-003

Implement deterministic queue, host accept/decline, promote/demote, self-cancel and reconnect handling. Authorization prevents listeners promoting themselves via API manipulation.

13C evidence: server-authoritative deterministic waiting queue with unique active entry per participant, host/moderator accept/decline, role promotion/demotion, self-cancel, reconnect-lease retention and stale cancellation. Direct API authorization rejects listener moderation or self-promotion.

## LNG-13-005 — Moderation & Room Chat
**Status:** DONE — 13C integrated on Backend main

**Depends on:** LNG-13-003

Host/moderator mute/remove/report with audit; participant block/report integration; bounded room text chat with rate limit and safe rendering. Clarify whether mute is server/provider-enforced or client cooperation and test accordingly.

13C evidence: room-scoped moderation action audit, server mute state with provider-adapter-specific enforcement, participant removal, block/report integration, bounded plain-text chat, persistent replay identity, concurrent write serialization, rate limiting and privacy-safe projections are implemented in Backend migration 0020 and `src/rooms`.

## LNG-13-006 — Speaking Room UI
**Status:** DONE — 13D integrated on Frontend main

**Depends on:** LNG-13-003..005

Use Stitch. Design mobile-first audio room—not video-conference clone—with topic/language context, speakers, listener list, raise hand, queue, chat and moderation access. Handle permission prompts, reconnect, microphone denied, provider outage and safe-area mobile controls.

13D evidence: Frontend PR #14 merged at `fe9e5254d888e58fd39232729453d183c143564f`; exact-head quality CI `110375650554` and post-merge quality CI `110376649033` passed. The responsive route, server-authoritative room transport, queue/moderation/chat states, private-token boundary, accessibility and safe media UX are recorded in `evidence/PHASE-13D-IMPLEMENTATION.md`.

## LNG-13-007 — Consent-Aware Post-Room AI Contract
**Depends on:** Phase 09, LNG-13-002

Design optional transcription/AI feedback flow only when explicit consent and provider capability exist. Specify what is transmitted/stored, retention and deletion. If not ready, keep feature disabled with no hidden recording.

## LNG-13-008 — Room Reliability & Safety Reconciliation
**Depends on:** LNG-13-001..007 as applicable

Test role escalation, private-room access, queue races, reconnect, capacity, provider failure, moderator removal, block/report and microphone permissions. Verify no recording occurs by default. Complete responsive/a11y/CI evidence.
