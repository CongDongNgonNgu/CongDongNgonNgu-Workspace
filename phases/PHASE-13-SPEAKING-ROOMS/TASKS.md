# Phase 13 Tasks

## LNG-13-001 — Room Domain & Permission Model
**Status:** PLANNED  
**Depends on:** Phase 12 and Identity/Profile

Model room visibility, language/level/topic, host/moderators, lifecycle, capacity, participants and role states. Define who can create/join/speak/moderate; private invite/access tokens must not be guessable/public.

## LNG-13-002 — Realtime Media Provider Abstraction
**Depends on:** LNG-13-001

Define room-token/session adapter for selected media provider; server authorizes issuance and scopes participant role/room/time. Provider secrets remain backend-only. Include provider-disabled/outage state. Do not claim live audio completion from UI mocks.

## LNG-13-003 — Join/Leave & Participant Presence
**Depends on:** LNG-13-001, LNG-13-002

Implement idempotent join/leave, reconnect, capacity, duplicate-tab/device policy and presence reconciliation. Clean up stale participants without ejecting legitimate reconnects. Display speaker/listener counts from real state.

## LNG-13-004 — Raise Hand & Speaker Queue
**Depends on:** LNG-13-003

Implement deterministic queue, host accept/decline, promote/demote, self-cancel and reconnect handling. Authorization prevents listeners promoting themselves via API manipulation.

## LNG-13-005 — Moderation & Room Chat
**Depends on:** LNG-13-003

Host/moderator mute/remove/report with audit; participant block/report integration; bounded room text chat with rate limit and safe rendering. Clarify whether mute is server/provider-enforced or client cooperation and test accordingly.

## LNG-13-006 — Speaking Room UI
**Depends on:** LNG-13-003..005

Use Stitch. Design mobile-first audio room—not video-conference clone—with topic/language context, speakers, listener list, raise hand, queue, chat and moderation access. Handle permission prompts, reconnect, microphone denied, provider outage and safe-area mobile controls.

## LNG-13-007 — Consent-Aware Post-Room AI Contract
**Depends on:** Phase 09, LNG-13-002

Design optional transcription/AI feedback flow only when explicit consent and provider capability exist. Specify what is transmitted/stored, retention and deletion. If not ready, keep feature disabled with no hidden recording.

## LNG-13-008 — Room Reliability & Safety Reconciliation
**Depends on:** LNG-13-001..007 as applicable

Test role escalation, private-room access, queue races, reconnect, capacity, provider failure, moderator removal, block/report and microphone permissions. Verify no recording occurs by default. Complete responsive/a11y/CI evidence.
