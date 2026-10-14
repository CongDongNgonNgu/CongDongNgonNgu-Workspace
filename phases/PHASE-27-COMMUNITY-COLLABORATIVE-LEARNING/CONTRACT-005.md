# Phase27 private group visibility contract (005)

Recorded 2026-10-14 Asia/Saigon. LNG-27-005 implements the selected private-only contract after004 integration. This document records behavior and required gates; it does not declare005 DONE or runtime acceptance PASS. The owner's continuation request supersedes the historical001-only execution boundary in [CONTRACT.md](CONTRACT.md).

## Fixed visibility and API projection

Exactly one group visibility is supported: `PRIVATE_INVITE_ONLY`. Lifecycle `ACTIVE|ARCHIVED` remains a separate field. Existing and newly created groups follow the same policy; there is no public backfill or conversion.

The existing `GroupResponse` adds the literal `visibility: 'PRIVATE_INVITE_ONLY'`. The shared `groupResponse()` projector supplies it on authorized group creation, current-membership listing, detail and successful invitation acceptance. This is an additive response field, not a client-editable setting. It exposes no owner account internals, invitation secret, membership count or protected metadata to an unauthorized actor.

No migration is needed. All persisted groups already use the sole membership/invitation policy; a redundant column would add state without an alternative approved behavior. No public/request enum values, visibility toggle, public group browse/search, suggestions, request-to-join or public-join API are introduced. A future policy change requires a separately reviewed contract and explicit authorization.

Creation still accepts only name and optional description. Existing boundary validation rejects unknown visibility, public/join-policy and ownership fields. No visibility mutation endpoint exists. A `PRIVATE_INVITE_ONLY` response value never substitutes for current authorization checks.

## Discovery and authorization

The group list is the current actor's ACTIVE memberships in ACTIVE groups. Its pagination total is scoped to those memberships, never a global group count. Member and owner navigation remains authorized membership navigation, not discovery.

Protected group detail, members, invitations, texts, synchronization, unread/read state, canonical context and streams retain current account/group/membership checks from22/004. An unrelated actor receives the same unavailable response for a real private UUID and an absent UUID. Group ID knowledge alone grants no metadata, history, send, stream, read-state or join capability. Unsupported search/language/topic/visibility query parameters do not activate discovery. Anonymous requests remain authenticated-route denials.

Native invitation semantics remain: OWNER-issued256-bit random bearer, SHA256-only persistence,24-hour expiry, one use, explicit POST acceptance, atomic consume/membership grant and current capacity checks. ACTIVE members cannot consume another invitation; LEFT requires a fresh valid invitation and starts a new membership generation; REMOVED cannot rejoin. Archived groups deny acceptance and protected collaboration. Invitation token display is ephemeral; no token is added to group text, canonical sharing, notification or public URL.

OWNER alone issues/revokes invitations, manages roles, transfers ownership and archives. MODERATOR retains scoped text/report duties and ordinary-member removal; MEMBER retains scoped reading/writing/reporting/leaving. No moderator self-elevation, owner/peer removal, public exposure or implicit platform-role override is added. Exactly one OWNER and transfer-before-owner-leave constraints remain intact. Exchange connection/block state does not create discovery or membership authority; native group membership is independently controlled.

## Explicit paired UI

The existing group list, detail and create/join flows use paired Vietnamese/English catalog text to display the fixed private/invitation-only policy. Create/join explanation states owner-only invitation issuance, explicit acceptance, and that a group ID alone grants nothing. Invitation guidance retains one-use/24-hour and manual acceptance semantics. There is no visibility selector or unsupported join control.

User-authored group names/descriptions/text remain verbatim. Unavailable-group screens reveal no stale private metadata.004 session/membership-loss purge, canonical live context checks, combined stream cap and bounded synchronization are preserved.

## Boundaries and evidence

[TEST-PLAN-005.md](TEST-PLAN-005.md) defines005 verification.004 realtime/unread/share evidence may be referenced as regression evidence but cannot automatically stand in for005 projection/discovery/escalation acceptance. Record exact product revisions, independent review, local/PR/main checks, TEST deployment verification, bounded native A/B/C checks and exact-owned fixture cleanup before closing005. Then continue006 automatically.

Required eventual report fields are `EXISTING_GROUPS_DEFAULT_PRIVATE=PASS`, `PRIVATE_INVITE_ONLY=PASS`, public discovery/request-to-join/public-joinable implemented `NO`, and private enumeration leaks `0_IN_ACCEPTED_CASES`, only when observed evidence supports them. Synthetic acceptance does not prove real-user usability, production scale, or all possible authorization cases. No production/provider/payment/AI/voice/video scope and no Phase28/29.
