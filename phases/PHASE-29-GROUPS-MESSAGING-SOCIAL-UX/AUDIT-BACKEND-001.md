# LNG-29-001 backend capability audit

Recorded: 2026-10-19 (Asia/Saigon). Scope: independent source/contract inspection for Phase29 design freeze. This document does not change an API, authorize a new domain, or certify deployed TEST behavior.

SOURCE_INSPECTION=COMPLETE; AUTOMATED_TEST_EXECUTION=NOT_RUN; DEPLOYED_TEST=NOT_RUN; RUNTIME_LEAK_COUNT=NOT_MEASURED; FIXTURE_MUTATION=NONE.

Paths below are relative to the sibling `CongDongNgonNgu-Back-End` repository unless prefixed Workspace. Source capability means implementation exists; it is not a fresh runtime PASS.

## Inherited contracts

- Workspace `phases/PHASE-22-BOUNDED-TEXT-STUDY-GROUPS/POLICY-CONTRACT.md`: private membership, exact roles, manual invitations, transactional quotas and safe projections.
- Workspace `phases/PHASE-26-MEMBER-CONNECTION-COMMUNICATION/CONTRACT.md`: connected-pair direct messaging, actual read/unread, current authorization and canonical context references.
- Workspace `phases/PHASE-27-COMMUNITY-COLLABORATIVE-LEARNING/{CONTRACT.md,CONTRACT-004.md}`: extend existing Study Group text collaboration; no second Study Group or conversation store; private-invite-only discovery contract.

## Capability inventory

| Capability | Classification | Source evidence / Phase29 implication |
|---|---|---|
| Authorized My Groups, create, group home and member list | SUPPORTED | `src/study-groups/study-group.controller.ts`; `src/study-groups/study-group.service.ts` createGroup/listGroups/getGroup/listMembers. Only current memberships are listed. |
| Owner manual invite, explicit acceptance, metadata listing and revocation | SUPPORTED | Same service issueInvitation/listInvitations/revokeInvitation/acceptInvitation; migration `database/migrations/0027_phase22_study_groups.sql`. No invite preview entitlement. |
| Connected-partner invitation convenience | SUPPORTED | Same service issueConnectedPartnerInvitation; `src/study-groups/README.md`. Rechecks eligible connection and current ownership; issues existing unbound bearer for manual external delivery. |
| Owner/moderator/member roles, transfer, leave, removal, archive | SUPPORTED | Same service setRole/transferOwnership/leaveGroup/removeMember/archiveGroup; original migration owner FK and uniqueness constraints. |
| Study Group text send, history, moderation and report duty | SUPPORTED | Same service listTexts/createText/hideText/reportText/listReports/resolveReport. This remains the Study Group domain. |
| Study Group text incremental sync, read/unread, canonical learning context and SSE | SUPPORTED | Same service syncTexts/markRead/getTextContext; `src/study-groups/postgres-group-stream.repository.ts`; migration `database/migrations/0038_phase27_group_collaboration.sql`; Workspace CONTRACT-004. |
| Direct inbox/open/selection/history/send/read/SSE | SUPPORTED | `src/messaging/messaging.controller.ts`; `src/messaging/postgres-direct-conversation.repository.ts`; `src/messaging/postgres-direct-message.repository.ts`; migration `database/migrations/0032_phase26_direct_messaging.sql`. Exactly two participants. |
| Independent multi-participant group conversation create/add/remove/leave/info | UNSUPPORTED | Direct schema has participant_a_id/participant_b_id, ordered-pair uniqueness and sender-pair constraint. No independent group-conversation controller/entity was found. Do not treat Study Group membership management as these operations. |
| Public group discovery, public join and nonmember metadata/member preview | CONTRACT_BLOCKED | Workspace Phase22/27 contracts; `src/study-groups/study-group.store.ts` authorize/groupResponse. GroupResponse declares PRIVATE_INVITE_ONLY; no discovery grant. |
| Structured group language, goals, proficiency and topics | UNSUPPORTED | `src/study-groups/study-group.dto.ts` CreateStudyGroupDto and `src/study-groups/study-group.types.ts` GroupResponse contain name/description, not these fields. Guided description copy is possible; persisted fields need reviewed contract/schema work. |
| Presence, typing, per-message read receipts | UNSUPPORTED | Workspace Phase26 contract; `src/messaging/direct-conversation.types.ts` exposes current actor read position/unread count, not partner read receipts or presence. |
| Rich media/uploads | CONTRACT_BLOCKED | Phase29 owner scope reserves uploads for Phase30. No attachment controls may imply support. |
| Disabled owner recovery/removal of disabled member | PARTIAL | `src/study-groups/README.md`: affected accounts must be ACTIVE. Disabled membership retains capacity; disabled owner cannot transfer until recovery or separately reviewed policy. |

## Authorization and domain distinctions

A Study Group owns memberships, invitations, retained texts, reports and per-membership read state. A direct conversation owns a stable canonical pair and direct messages. A separate group conversation is not currently implemented. Sharing a reference or selecting a connected partner never creates access in any other domain.

`src/study-groups/study-group.store.ts` acquires ACTIVE account locks in deterministic UUID order before group locks, checks ACTIVE group and membership, and projects responses inside the transaction. `study-group.service.ts` scoped operations reuse these checks. Missing, foreign, nonmember and insufficient-authority group access uses generic unavailable behavior. Platform ADMIN does not supply group authority.

| Actor | Permitted Study Group authority |
|---|---|
| OWNER | Issue/revoke invites, assign/demote roles, remove members/moderators, transfer to active existing member/moderator, archive; ordinary collaboration and moderation. Must transfer before leaving. |
| MODERATOR | Ordinary collaboration plus hide/read-resolve scoped reports and remove ordinary MEMBER. Cannot invite, self-elevate, remove peer/owner, transfer or archive. |
| MEMBER | Read/write visible text, report visible text and leave. No privileged hidden-text/report listing. |
| Invited/nonmember | Explicit manual acceptance only; no group home/member/text metadata before acceptance. |
| LEFT | May redeem a new valid invitation as MEMBER; fresh read generation starts at current head. |
| REMOVED | No protected access and cannot rejoin by redeeming another invitation. |

Invitation issuance returns a random 256-bit, 24-hour, one-use token once; only its SHA256 digest is persisted. Acceptance and membership commit atomically. Existing active members and REMOVED actors do not consume tokens. Connected-partner selection does not bind the bearer recipient. Raw tokens must not enter URLs, persisted chat/notifications, browser persistence or evidence. Exchange block changes do not revoke an issued native bearer or existing group membership.

`src/messaging/messaging-pair-authorization.ts` requires both users ACTIVE and email verified, eligible Exchange preferences, permitted contact, current CONNECTED pair and no block in either direction. `postgres-direct-conversation.repository.ts` rechecks these through withConversation for protected operations. Group membership alone does not satisfy this boundary. Relationship removal/block revokes direct access while retained direct history remains stored.

Read/unread is actual server state: direct history uses bounded scoped before/after cursors, idempotent client message IDs and monotonic observed sequence positions. Study Group sync uses actor/group/membership-generation scoped cursors, bounded pages and visible non-own unread texts. A count/read position is not a per-message recipient receipt.

`src/study-groups/postgres-group-stream.repository.ts` rechecks membership/session on poll. Shared communication leases cap combined direct/group streams at ten per actor. SSE transports version hints; authoritative REST catch-up supplies current protected data. In-flight previously authorized content cannot be recalled.

`src/communication/learning-context-resolver.ts` resolves canonical LIBRARY_RESOURCE or PUBLIC DISCUSSION/QUESTION references live. Existing Library eligibility/provenance/license checks remain authoritative. Unavailable context returns generic unavailable without stale title/path. Context sharing never grants target authorization.

## Safe design freeze and later verification

1. Promote My Groups and Messages with authenticated entry points; never imply a public group directory.
2. Design existing Study Group collaboration and direct messaging as distinct surfaces. Independent group-conversation controls require a bounded reviewed backend contract in 005 or an explicit capability hold.
3. Communicate learning purpose through current description/context capabilities. Do not fabricate persisted language, goal, proficiency or topic metadata.
4. Preserve finite pilot bounds: two retained owned groups; twenty active memberships per account/group; twenty retained invitations/texts/reports per group. These are not production chat scalability claims.
5. Preserve token handling, role confirmations, permission-loss purging and unsupported-action fail-closed behavior during redesign.
6. Re-run current API denial, direct/group isolation, revocation, role, reconnect, read/unread and exact-owned fixture cleanup checks during later runtime acceptance. Record measured leak counts then; zero is not inferred here.

Existing regression evidence sources inspected: `test/phase22/study-group.sql-spec.ts`, `test/phase22/study-group-http.sql-spec.ts`, `test/phase26/context-messaging.sql-spec.ts`, `test/phase26-messaging.e2e-spec.ts`, `test/phase27/group-collaboration.sql-spec.ts` and `src/study-groups/group-collaboration.spec.ts`. The Phase22 HTTP suite includes discovery escalation denial, foreign protected paths/platform override denial, cross-group IDs, immediate leave/removal denial and cookie CSRF. These tests were not executed as part of this audit.

Runtime and accessibility acceptance, deployed actor journeys, CI, exact-main verification and branch lifecycle are owned by the coordinated subphase lifecycle and remain NOT_RUN in this document. No production readiness or real-user usability claim is made.
