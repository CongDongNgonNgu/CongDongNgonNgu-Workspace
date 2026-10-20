# Phase29 information architecture and permission contract (001)

Recorded 2026-10-19 Asia/Saigon. Accepted frozen contract published with001 DONE;002 is VERIFYING after product/Frontend/native gates; Workspace publication/relay remains pending. Historical proposed/review status is superseded by verified LIFECYCLE-001.md.

## Routes and entry points

| Surface | Destination | Primary entry / audience | Access |
|---|---|---|---|
|My Study Groups|/community/groups|Authenticated desktop navigation, mobile quick navigation/drawer, account, Community|Current actor memberships only|
|Create Study Group|Existing index dialog|Authenticated index primary action|Existing server quotas + owner membership creation|
|Accept invitation|/community/groups/invitations|Index secondary action|Signed-in manual group ID + one-use secret; no preview|
|Study Group home|/community/groups/:groupId|Authorized group list|Current ACTIVE membership; generic unavailable otherwise|
|Discussion/members/invites/reports|Existing group home panels|Role-gated local navigation|Server role/current membership authoritative|
|Messages inbox|/exchange/conversations|Authenticated desktop/mobile/account/Community and Connections|Current eligible direct participants only|
|Direct conversation|/exchange/conversations/:conversationId|Inbox and eligible partner action|Current connection/contact/block/session checks|
|Conversation information|Existing authorized direct summary|Conversation header; native dialog if useful|Exactly two current authorized identities; no add/remove|
|Manage connection|/exchange/connections|Inbox/info|Current actor connection domain|
|Community|/community|Existing More/drawer and local links|Phase28 accepted public content boundaries unchanged|
|Separate group conversation|No existing route/API|No create/manage affordance|UNSUPPORTED; bounded contract review in005 or explicit hold|

Authenticated desktop priority: Home / Study partners / My Groups / Messages / More. Keep compact brand and avoid header overflow; if desktop shell needs a wider breakpoint, use existing mobile drawer below it. Guests retain public navigation and may receive labeled private-feature login entry links without group metadata or lists. Mobile quick navigation prioritizes Home / My Groups / Messages / Menu when authenticated; search remains in top header. Guest bar retains existing public discovery. Account shortcuts are intentional task-entry redundancy, not duplicate page CTAs.

Active states must be exclusive: Exchange parent is not active on /exchange/conversations descendants; Community parent is not active on /community/groups descendants. Query/hash/back/forward/refresh must preserve canonical paths. Do not introduce aliases/new duplicate routes.

## Permissions and states

OWNER issues/revokes one-use24h invitations, manages roles, transfers ownership, archives/removes. MODERATOR removes ordinary members and handles scoped reports/text moderation; cannot invite/elevate/remove peer/owner. MEMBER reads/writes/reports/leaves. Owner transfers before leaving. Removed actors cannot rejoin; LEFT may accept a fresh token. Invited actor receives no group metadata/member preview before acceptance. Platform roles and Exchange connections do not grant Study Group access. Exchange blocks do not silently revoke Study Group membership.

Direct messages require existing active/verified/eligible connected pair and absence of block. Group membership grants no DM rights. Server unread/read position is authoritative; no partner read receipts, typing/presence, invented previews/counts. A conversation information dialog uses only currently authorized summary data and clears with access loss.

Loading: labeled status/busy state. Empty: useful Create/Accept or connected-partner action, no fake sample content. Retryable network error: alert and explicit retry. Lost access: immediately purge private identities, names, messages, contexts and controls; generic unavailable/back action. Late responses must not resurrect stale data. Preserve existing resource epochs/abort and conservative role reconciliation.

## Responsive and accessibility freeze

Widths320/375/390/412/768/1024/1440 in VI/EN. Group controls wrap; member rows stack without hiding roles/actions. Direct inbox master/detail at wide widths, selected thread replaces list on mobile with explicit back-to-inbox. Avoid nested page scroll traps and composer/footer overlap. Long Unicode and unbroken text wrap. Use native links/buttons,44px touch targets, visible focus, labeled icon controls and proper status/alert semantics. Required overlay behavior: outside/Escape/route closure and focus return/trap. Reuse shared primitives, but verify their implementation: Drawer currently lacks focus trapping; route closure belongs to Header/callers. Remediate these gaps where affected rather than assuming primitives already satisfy this requirement. No hover-only actions.

## Reuse and exclusions

KEEP auth/API policies, private memberships, tokens, direct-pair model, context resolver, localization infrastructure, Phase28 hierarchy. ADAPT existing Header/NavigationLink/DropdownMenu/Drawer, group components/forms/hooks and messaging hooks/timeline/composer. BUILD_NEW only focused presentation components/paired copy where existing ownership warrants it. DEFER separate group-conversation domain pending005 disposition, public groups/discovery/join, structured learning fields, media, presence/typing/read receipts.

Use existing Be Vietnam Pro, navy/orange semantic tokens, Lucide, CSS Modules and shared Button/FormControls/Overlays/Surface. Stitch is visual reference only; reject unsupported generated controls, altered tokens, made-up activity/metrics/roles, structured fields and developer annotations in product UI.

Execution update:001/002 publication and complete terminal relays are DONE;003 now implements this frozen contract. Earlier current002VERIFYING statement is a historical publication checkpoint, resolved in LIFECYCLE-002.md. Capability/permission/route freeze unchanged.
