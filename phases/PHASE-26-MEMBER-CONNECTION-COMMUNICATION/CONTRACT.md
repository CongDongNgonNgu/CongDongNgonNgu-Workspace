# Phase26 communication contract

Status: ACCEPTED — independent security/architecture review approved the final contract on 2026-10-09; implementation/runtime gates remain unproven.
Recorded: 2026-10-09 (Asia/Saigon).
Owner authorizes LNG-26-001 through006 and their normal PR/CI/merge/TEST lifecycle. Stop after26. No production writes, payment, paid realtime, voice/video, AI translation/coaching or Phase27–29.

## Source baseline and reuse

Remote main verified exactly: Backend a2640cd7d734f088987fb32b89efc5cbf40e954e; Frontend58ea2686fb0e805eb483d9f53e10e94d139b9420; Workspace af124acb2177ea6bc08282cb9b03aee83c58ee96. Clean local main before temporary contract branch. No AI-DOS manifest or repository-local skill roots.

KEEP existing Exchange connection/safety domain, migrations0007/0008, canonical pair/advisory lock, authenticated profile projection, guards/session rotation/CSRF, notification categories and vi/en infrastructure. ADAPT connection lists, durable abuse limits and notification authorization. BUILD_NEW persisted direct-conversation/message/read state and focused frontend components. DEFER attachments/edit/delete/typing/presence and excluded capabilities. Phase25 Language Hub category/readiness/provenance contracts remain unchanged.

Existing sources: Backend src/exchange/{exchange.service.ts,postgres-exchange-connection.repository.ts,postgres-exchange-safety.repository.ts,exchange-safety.repository.ts}; src/notifications/{notification.controller.ts,notification-realtime.service.ts}; src/auth/{guards/access-token.guard.ts,session/session.service.ts}; database/migrations/0007_language_exchange_connections.sql. Frontend src/features/exchange/pages/BuddyProfilePreviewPage.tsx and features/notifications/notification-stream.client.ts. Existing connection/request/profile UI must be extended, not duplicated.

## Relationship state machine

Persist existing PENDING/CONNECTED relationship row keyed by ordered participant UUIDs. Absence is NONE. PENDING requester derives OUTGOING_PENDING/INCOMING_PENDING. Directed blocks remain their existing independent rows. BLOCKED is visible only to the blocker through own block-status contract; the blocked party receives the same unavailable response as an absent/ineligible member.

| Current state | Actor/action | Result |
|---|---|---|
| NONE | eligible A requests B | PENDING, requester A |
| outgoing pending | A repeats request | same row, no duplicate event |
| incoming pending | B requests A | CONNECTED (existing mutual consent behavior) |
| incoming pending | recipient accepts | CONNECTED |
| incoming pending | recipient declines | delete relationship, NONE |
| outgoing pending | requester cancels | delete relationship, NONE |
| CONNECTED | either removes | delete relationship, NONE |
| any | either blocks | directed block plus atomic relationship deletion |
| blocked by self | blocker unblocks | remove own block only; no relationship restored |

No self-request. Request/accept require both currently eligible users. Cancel/decline/remove require an active verified actor and current relationship ownership; target eligibility is not required for cleanup and no target profile is revealed. This deliberately amends current target-active cleanup restrictions. Block may target an existing disabled account; unblock only removes an actor-owned block. Only recipient accepts/declines; only requester cancels; participants alone remove. Invalid transition409. Duplicate creation/accept/open returns existing result. Crossed requests retain current auto-connect semantics: two explicit requests constitute mutual consent. Reject/cancel/remove have no redundant permanent state. Resend is allowed subject to durable actor/pair limits. A report does not block/remove/convict.

Protected operations use explicit READ COMMITTED and acquire affected user-row locks in ascending UUID order, then the shared canonical pair advisory lock, then the conversation row lock when required. Current account verification/ACTIVE state, profile/preferences, connection and block checks occur inside that transaction. Eligibility-changing profile/preferences operations must share the account-lock boundary or protected operations explicitly lock their rows; outside prechecks never substitute for current authorization. Pair mutations use the same ordering. SQL ordered-pair UNIQUE/CHECK constraints remain independent enforcement. No authorization based on client state or conversation ID. Tests must prove duplicate/crossed/accept/cancel-accept/block-request races against PostgreSQL.

## Eligibility and privacy

Both accounts must currently be ACTIVE and email verified. Messaging additionally requires current Exchange opt-in, valid offered/wanted public-language preferences, both participants current contactPermission not NO_CONTACT, CONNECTED and no block in either direction. Disabling discovery alone does not invalidate an existing connection; opt-out/NO_CONTACT/invalid preferences does. Account disable/delete, removal or block denies all subsequent protected conversation operations, including history, unread and realtime. Reconnection may reuse the stable conversation/history only after fresh mutual connection and eligibility.

Public profile retains current approved minimum: opaque member UUID needed for canonical routing, display name, approved public offered/wanted language declarations, matching goals/interests and summary-only timezone/availability. Opaque routing UUID is not an auth/provider identifier. Never expose email, credentials, session identifiers, roles/moderation flags, exact private availability/timezone or private profile languages. Connection does not reveal new private fields. Blocked profiles/discovery/list rows unavailable; only blocker can inspect own blocked status. Generic404 for unknown/nonparticipant/ineligible/blocked conversation/profile targets. Actor's own state may reveal a request addressed to them, never another person's requests.

Authorization must be performed with current persisted data on every list/history/send/read/share/subscribe/delivery. Lists omit unauthorized rows rather than disclosing their hidden state. Notifications must not preserve blocked actor identities or private message previews.

## Authorization matrix

| Operation | Anonymous | unrelated C | eligible connected A/B | removed/blocked/ineligible |
|---|---|---|---|---|
| discover/profile |401 | approved public projection | same public projection | unavailable |
| request mutation |401 | only own pair/state | own valid transition | unavailable |
| connection/request lists |401 | own rows only | own rows only | hidden unavailable rows |
| open direct conversation |401 |404 | idempotent one pair |404 |
| list/history/paginate/read |401 |404 | participant, current authorization |404 |
| send/share |401 |404 | current pair + limits + context eligibility |404 |
| realtime subscribe/hints |401 |404 | session + current participant/pair | terminate, no payload |
| private Study Group read/join |401 | existing Phase22 denial | connection grants nothing | unchanged Phase22 ACL |

## Realtime architecture decision

Select existing first-party authenticated fetch-SSE shape extended for direct communication. Database state is authoritative. SSE carries only bounded invalidation/read-version hints, never text or learning metadata; frontend refetches authorized persisted messages. Each active SSE performs serialized bounded database catch-up once per second, independent of process-local publish, so cross-instance delivery works without a paid provider or sticky sessions. REST history remains usable during transport failure.

Every subscribe and tick reauthenticates the bearer through existing SessionService.authenticate and rechecks current pair eligibility/blocks. Credentials stay in Authorization headers, never query URLs, persisted browser storage or logs. No arbitrary room/channel subscription. Preserve existing origin allowlist; explicitly accept Last-Event-ID for cross-origin reconnect, no wildcard expansion. Reject unapproved browser Origin on communication streams; missing Origin remains allowed for authenticated non-browser clients under existing API policy.

Bound to maximum10 current streams per actor across replicas using database lease/expiry accounting (renew every tick, expiry60seconds); local cancellation releases lease. Poll in-flight work cannot overlap; errors close stream. Heartbeat25seconds; reconnect1/2/4/8seconds capped15seconds with abort on logout/unmount, refresh through existing auth mechanism. DB/hint failure uses bounded authorized REST catch-up; healthy streams still reconcile DB. Stream hints reveal no inaccessible message data. Hint cursor is a checked conversation-scoped monotonic change version, incremented transactionally for message insertion or participant read advancement. It contains no message data and is never authorization. Initial subscribe emits current version and the client catches up authoritatively. Last-Event-ID is the validated change version. Global lease acquisition serializes per actor, prunes expired leases and tests capacity atomically. Revocation cannot emit new protected data after the revocation transaction wins the shared pair lock; an already-authorized response in flight cannot be recalled.

## Durable model and ordering

One stable direct_conversations row per canonical unordered user pair with UUID id, CHECK distinct/ordered users, UNIQUE pair and monotonic next message sequence. No FK to removable connection row. Exactly two participants are the pair; no arbitrary membership list. Retain history on relationship removal/block but deny access until current authorization returns. Account cascade deletion removes affected communication data under existing deletion policy.

Messages: UUID id, conversation id, sender participant UUID, per-conversation sequence, bounded plain text, created time, client message UUID, optional canonical context type/id. Sent text immutable; no edit/delete/attachments endpoints. Sender set from authenticated principal; client sender fields rejected. SQL constraint enforces participant sender plus UNIQUE(conversation,sequence) and UNIQUE(conversation,sender,clientMessageId). Shared pair/conversation lock assigns sequence and commits insert atomically. Idempotent retry returns original message; reuse of key with different text/context409. Idempotency lasts with persisted message.

Unicode text limit4000 code points, normalized/trimmed; prohibit empty text unless a valid context reference exists. JSON request size bounded by existing server cap. Context IDs are opaque validated canonical identifiers, never arbitrary URLs/HTML. Escape text through React; no executable embeds. Sequence is serialized as a safe string/checked safe integer, never rounded bigint. CreatedAt is display only; ordering uses sequence even for equal timestamps/concurrent sends.

Messages/history page default30 maximum50. Opaque validated conversation-scoped sequence cursor; older pages before exclusive sequence, newest page returned chronologically; after exclusive sequence for catch-up. Reject conflicting before/after and foreign cursors. Cursor authenticity is not authorization. Merge by stable message ID/sequence, no duplicate display. Catch-up drains bounded pages until current head; no unbounded single response. Lists default20 maximum50, deterministic updatedAt/id tie-breaker and validated opaque cursor. Unread count excludes own messages after participant's last-read sequence; mark-read monotonic, limited to observed existing message/sequence in that conversation, cannot mark future messages or another participant. Conversation lists expose partner public projection + unread count only, no message preview. No per-message read receipt, typing or presence.

## Abuse and notifications

Persist fixed-window counters transactionally, keyed actor/action/window and pair for request resend. Reject429 using existing error envelope. Request10/hour and60/day per actor, one new request per pair/minute; transition/block/unblock60/hour; report10/hour; send60/minute and1000/hour; stream subscribe30/minute plus global10 leases. Successful idempotent message retry does not consume send budget/create notification. Counter expiry/cleanup bounded; tests verify exact boundaries and cross-instance counters. Read/list requests retain existing global bounds; no new broad policy weakening.

Commit authorized domain mutation and durable idempotent notification intent in one transaction. Notification materialization/delivery retries after commit and is separate from mutation success; delivery failure never reports the committed mutation as failed or duplicates domain effects. Read-time projections reauthorize pair safety; block suppresses queued intents and redacts actor/target metadata from applicable existing notices. Reuse notification infrastructure for request/accepted events when current pair permits; no message text/context title in notification payload. Request/accept events idempotent. Direct unread navigation uses authorized conversation list/unread state and coalesced actor/conversation notification, avoiding per-message fanout. Notification render/navigation must resolve current target authorization and unavailable actor metadata safely; block removes/suppresses applicable pending delivery. Report reuses existing Exchange moderation path and privacy semantics, with no implicit block. Audit retains transition metadata only, not message bodies/tokens.

## Learning-context references

Wire references support exactly LIBRARY_RESOURCE and COMMUNITY_POST, with canonical UUID. Vocabulary and Sentence are existing Library subtypes, not new namespaces. Related Resource sharing references its current canonical Library target without copied relation metadata. All current publicly eligible Library resource subtypes resolve through LibraryService.getPublicResource and current provenance/license/source-health/publication checks. Community supports only current PUBLIC ACTIVE DISCUSSION or QUESTION, with active author/language; correction/private/group content excluded. No synthetic persisted Language Hub namespace.

Store canonical reference only, no title/body snapshot. Sender authorization required at send. Recipient preview/open resolves live with exact domain authorization; deleted/private/moderated/inactive/unlicensed source becomes localized unavailable card with no stale title/body. Sharing grants no access. Sender note is immutable user-authored message text. Unsupported kind400; unavailable/private/wrong subtype404. No arbitrary URL fetching. Unconnected/blocked recipients denied.

Community target English UI remains Phase25 deferred; share dialog/card VI/EN acceptance never claims target-page EN readiness or broadens into27. Supported surface matrix: Hub Vocabulary/Sentences -> LIBRARY_RESOURCE; Library/Related -> LIBRARY_RESOURCE; Community public Discussion/Question -> COMMUNITY_POST. Tests cover each surface and live revocation.

## Study Group inheritance

Connection only supplies partner-selection convenience to existing owner-only invitation journey. Preserve exactly one owner, owner-only invitation, hashed-at-rest expiring one-use token, explicit join, unique membership, capacity/current ACL, moderator limits and immediate group revocation. No friend-to-group membership/read grant. Do not make Exchange blocks revoke existing group membership or reinterpret Phase22 safety boundaries. Reauthorize connection at partner selection and owner ACL at invitation issue.

From a currently connected partner, an owner selects an existing group they currently own. Server rechecks connection eligibility and owner permission before issuing the existing expiring one-use invitation. Existing IssuedInvitationDialog displays raw token once in owner memory and supports deliberate clipboard copy; close/navigation/logout/authorization loss clears it. No token in URL, notification, message, telemetry or persisted browser storage. Owner communicates group UUID and token separately through a user-chosen channel outside persisted Phase26 chat. Recipient opens /community/groups/invitations, manually enters group UUID/token and explicitly submits unchanged Phase22 acceptance. Optional generic partner notice contains no group/invitation UUID/title/description/token, targets only the fixed acceptance route, and grants nothing. Selection does not bind or modify the existing bearer invitation. Automatic in-chat secret delivery is excluded to preserve hashed-at-rest invariants.

## Threat model and acceptance

Attackers: unauthenticated visitor, unrelated C, malicious participant, revoked/blocked actor, retrying/concurrent clients, forged context/cursor/sender, stale sessions, multi-instance delivery. Trust boundaries: browser/API, current session/pair/DB, context domain, group ACL. Mitigations: generic unavailable, explicit safe projections, shared pair locks/SQL constraints, bounded durable limits, token-free SSE hints, live context resolution, no implicit grants.

SQL proof uses positively identified approved TEST server, isolated generated schema, baseline migration digests and disabled payment before writes; no production migration. Historical approved Neon fingerprint must match current configured target, not be assumed. Stop before ambiguous writes with exact sanitized identity authorization request. Synthetic A/B/C only; approved TEST provisioning preserves ordinary auth. Verify actual exact-main Render Backend + Vercel Frontend; local/mocks alone cannot yield GO.

Acceptance: existing Exchange regressions; all request transitions/privacy/IDOR and PostgreSQL races; stable conversation uniqueness; persistence/order/pagination/idempotency/Unicode; session/block/remove/eligibility revocation including live SSE; cross-instance/reconnect/disconnect catch-up; monotonic read/unread; live context revocation; notification privacy/rate boundaries; inherited group SQL/HTTP regression. UI VI/EN at320,375,390,412,768,1024,1440; keyboard/focus/labels/live status/dialogs/chronological history. Manual screen reader NOT_RUN unless actually performed. Full applicable test/typecheck/lint/build/audit/performance/CI gates, independent final review, fixture cleanup exact residual, branch cleanup and synced remote main mandatory.

## Lifecycle plan

### Connection API transport concretization (002)

Authenticated GET /exchange/connections uses the ordinary success envelope with data {items,nextCursor}; kind is CONNECTED (default), INCOMING or OUTGOING, limit defaults20/max50 and cursor is optional. Each authorized item exposes only connectionId,targetUserId,displayName,state,updatedAt. State is CONNECTED/INCOMING_PENDING/OUTGOING_PENDING. No actor identifier is accepted as authority. Lists omit blocked/ineligible pairs using current locked authorization. Ordering is updatedAt millisecond DESC then connectionId DESC with an exclusive actor/kind-bound AES-GCM cursor; replicas share existing configured signing-secret-derived key material. Rotation/tampering/cross-actor/cross-kind/invalid cursor returns generic400. No plaintext hidden scan identifiers are exposed. Empty items with non-null nextCursor is valid; clients continue bounded pages and deduplicate connectionId.

Absent current request acceptance is invalid409; already-connected duplicate acceptance remains idempotent. New request rechecks current target discoverability; existing acceptance does not require discovery visibility. Request10/hour+60/day and shared transition/block/unblock60/hour/report10/hour apply to authenticated attempts, including failed eligibility/state attempts and idempotent actor retries. Both request windows commit even when one rejects; counters saturate at limit+1. New canonical pair creation1/minute is checked only during an absent-row insert, so existing duplicate/crossed requests do not consume that cooldown.429 uses EXCHANGE_RATE_LIMITED and bounded Retry-After seconds. Actor limits commit independently before pair work; pair cooldown is atomic with creation. Cleanup removes at most100 expired internal counters in a separate SKIP LOCKED statement.0029 adds internal rate infrastructure only, with an explicit code-first rollback requirement; existing friendship schema/domain is reused.

### Connection notification delivery concretization (002)

Request and accepted/crossed-connection transitions capture identifiers-only intent in the canonical connection transaction (0030). The worker leases at most20 available rows with30-second tokens and SKIP LOCKED; processing revalidates ordered accounts, canonical pair and lease under one transaction. Notification/read-state persistence uses that same client; queue completion commits before local realtime publication. Failed materialization rolls back notification and handled state, retains the already committed connection, and retries with bounded5–300-second delay. A superseded lease cannot process or complete another worker's row. Memory mode captures before domain mutation and shares versioned eligibility stores; an asynchronous eligibility change retries instead of delivering a stale actor.

REQUESTED maps to BUDDY_REQUEST for the recipient; CONNECTED maps to distinct BUDDY_CONNECTED for the original requester. Existing connection identity, state/requester, both blocks, ACTIVE verified users, valid PUBLIC language preferences and current recipient IN_APP settings are checked when materializing. Discovery visibility and NO_CONTACT do not revoke these connection notices. Saved actor/title/text snapshots are never projected: REST/count/replay/live resolve current authorization and actor, use fixed /exchange/connections navigation and empty variables, or redact to generic unavailable. SSE additionally checks current SSE preference. Native session authentication is repeated before ready, every projected replay/live payload and heartbeat; failure closes the stream. All subscriptions queue local events until ready completes. The frontend reconciles canonical REST at30-second intervals even on healthy SSE for cross-replica recovery, with one poll at a time and actor/request/revision ownership guards.

0031 adds BUDDY_CONNECTED while preserving the full existing notification type set. Rollback is code-first: stop incompatible workers/producers before reverting0031, which refuses stored connected notices; do not delete notifications to force downgrade. Drain or preserve pending0030 intents before any outbox-table rollback. No lossless downgrade or runtime rollback is claimed merely from isolated migration tests.

001 audit/freeze/review -> Workspace PR/CI/merge/main verification/cleanup.
002 extend existing requests/lists/safety with SQL proof + UI/Stitch/tests -> independent Backend/Frontend integration and Workspace evidence.
003 direct persistence/SSE/read/composer -> SQL/API/realtime/UI verification and normal integration.
004 audited context references/share UI -> authorization/stale-card tests and normal integration.
005 notifications/durable abuse/group owner convenience -> safety/Phase22 regressions and normal integration.
006 full exact-main TEST A/B/C browser/security/reconnect/VI/EN/responsive acceptance -> independent final review/verdict/evidence/integration/cleanup.
Each may be split into smaller reviewable slices. No new owner authorization between001–006. Required terminal relay remains bounded by current owner scope; returned text cannot start27 or bypass a hard stop. Mark DONE only with observed complete applicable gates; otherwise retain truthful blocked/verifying state.
