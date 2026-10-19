# Independent frontend audit - LNG-29-001

Recorded 2026-10-19 Asia/Saigon. Scope: read-only frontend source audit, proposed information architecture review, and review of CONTRACT-001.md and EXECUTION-PLAN.md. Skills applied: using-agent-skills, code-review-and-quality, documentation-and-adrs. No product changes, credentials, database operations or Git mutations were performed by this reviewer.

## Verdict

APPROVE_WITH_NOTES for the proposed IA and ordered execution plan. The three domains remain separate: private Study Group membership/discussion, authorized direct conversation, and unsupported independent multi-participant conversation. The canonical routes remain unchanged. No frontend contract supports a separate group-conversation entity or participant management.

Runtime by this reviewer: NOT_RUN. Central guest desktop/mobile observations are separate evidence and must not be attributed to this audit. Source inspection does not prove deployed authorization or real-user usability.

## Capability inventory

| Capability | Status | Source |
|---|---|---|
| Actor-authorized group list, create, manual invitation acceptance | SUPPORTED | Frontend src/features/study-groups/pages/StudyGroupsPage.tsx |
| Private group discussion, members, owner/moderator controls, invitations, reports | SUPPORTED | src/features/study-groups/pages/StudyGroupPage.tsx and components/ |
| Revocation/role-downgrade projection clearing | SUPPORTED in source; deployed tests pending | hooks/useGroupCollaboration.ts, hooks/useGroupResource.ts, StudyGroupPage.test.tsx |
| Structured language/goals/proficiency/topics fields | UNSUPPORTED | study-groups.types.ts has name/description, no structured learning fields |
| Direct inbox/history/send/retry/server unread/visibility-based read/context cards | SUPPORTED | features/exchange/pages/MessagesPage.tsx, components/ and hooks/ |
| SSE reconnect and REST polling reconciliation | SUPPORTED | features/communication/hooks/use-message-stream.ts |
| Global Groups/Messages discovery | PARTIAL | No shell entries; bare Groups link in Community; inbox linked from Connections |
| Separate group-conversation entity/create/manage participants | UNSUPPORTED in frontend contract | exchange/messaging.types.ts is direct-pair shaped |
| Presence/typing/partner read receipts | UNSUPPORTED | No authoritative state in current contract |
| Public Study Group directory or unrestricted join | CONTRACT_BLOCKED | Existing private invitation-only domain |

## Current gaps and smallest changes

1. src/components/navigation/navigation.ts contains only Home and Study partners as primary entries; additionalNavigation has Community but neither Groups nor Messages. Promote authenticated My Groups and Messages while retaining canonical paths.
2. Prefix-based isNavigationItemActive currently marks Exchange active on conversation routes and Community active on group routes. Apply the approved exclusive-parent exclusions when social entries become first-class.
3. Header/DesktopHeader.tsx account popup is hand-built. Header.tsx closes it on location changes, but the popup lacks outside-click, Escape and focus-return handling. Reuse/adapt established overlay behavior rather than extend ad-hoc handlers.
4. HeaderDrawer.tsx has no social shortcuts. MobileActionBar.tsx has only Home/Search/Menu. The frozen authenticated Home/My Groups/Messages/Menu hierarchy is reasonable; preserve top-header search and guest presentation.
5. features/community/pages/CommunityPage.tsx exposes Groups as a bare paragraph link and has no matching Messages shortcut. Add a focused authenticated social-entry region without disturbing accepted Phase28 feed hierarchy.
6. StudyGroupsPage.tsx has existing list/create/accept and privacy/error states, but minimal learning-purpose guidance and empty-state hierarchy. Improve presentation using existing contracts.
7. GroupEntryForm.tsx persists only name and description. Use description help to suggest language, goals, proficiency and topics; never create fake structured tags or imply those fields were saved separately.
8. StudyGroupPage.tsx already composes focused components and conservative role reconciliation. Preserve secret disposal, denied-access clearing, role-dependent panels, transfer-before-owner-leave and one-use manual invite semantics.
9. MessagesPage.tsx inbox uses authorized partner identity and actual unread counts. It can additionally display the supported updatedAt field. Do not invent previews, last-message content, global unread totals or activity.
10. ConversationPanel.tsx currently renders the real offline stream state using reconnecting copy. Distinguish truthful offline/retry feedback in004.
11. MessagesPage.module.css already uses responsive master/detail at768px, hides the sidebar on selected mobile conversations, and supplies an explicit inbox back link. Preserve route-driven behavior and verify refresh/back-forward.
12. Shared Drawer.tsx has Escape/backdrop/focus-return support but no focus trap. Shared Dialog.tsx traps focus and handles Escape/backdrop/focus return. Do not assume all overlay primitives already satisfy every frozen accessibility requirement.

## Reuse map

KEEP auth/API policy, study-group resource/collaboration/context epochs and direct-pair messaging hooks.
ADAPT Header, NavigationLink, DropdownMenu, Drawer, localized navigation copy, group list/create/home components, inbox and thread presentation.
KEEP existing Button, TextInput, Textarea, Dialog, Avatar and semantic design tokens.
KEEP GroupMembers, GroupInvitations, ConnectedPartnerInvitation, GroupTextPanel, GroupPagination, GroupActionDialog and IssuedInvitationDialog.
KEEP MessageTimeline history anchoring, MessageComposer retry semantics, MessageContextCard authorization refresh and visibility-based read behavior.
DEFER public group discovery/join, attachments, separate group-conversation controls, presence, typing and read receipts.

Follow Workspace docs/engineering/FRONTEND-ARCHITECTURE.md: component-owned CSS Modules, focused page composition/hooks/domain transport, existing primitives and no duplicate design system.

## Contract and execution-plan review

CONTRACT-001.md correctly preserves canonical paths, exclusive active states, private member-only groups, direct-pair checks, role boundaries and safe unsupported group-conversation disposition. EXECUTION-PLAN.md correctly follows001 through006 and stops after Phase29; it records runtime/security measurements as pending rather than PASS. The source-only baseline in that document is centrally owned evidence.

Non-blocking precision note: CONTRACT-001 says shared dropdown/dialog/drawer primitives own outside/Escape/route closure and focus return/trap. This is a requirement for the final experience, not a description of all current primitives. Drawer lacks trapping; Dialog and Drawer have no intrinsic route-change subscription. Header owns drawer route closure. Verify or implement the applicable behavior explicitly during002/004.

Stitch outputs are visual proposals, not capability authorization. Reject made-up structured tags, an Organizer role, forced academic honor-code acceptance, developer state toggles, fabricated sample activity/counts and unsupported group-chat management. Only OWNER/MODERATOR/MEMBER roles exist. Learning-context references never grant membership or message access. No new obligation or unsupported data should enter the product merely because generated markup contains it.

## Verification required downstream

Existing source tests cover late invitation secret disposal, denial clearing, messaging late private-row prevention, retries, timeline anchoring and role changes. Add focused tests for authenticated/guest social navigation, exclusive active states, account outside/Escape/route closure and focus return. Verify drawer trapping, dialogs, direct URL/refresh/back-forward, VI/EN, all seven widths, offline/reconnect and keyboard operation in deployed TEST.

Independent role/API isolation, revoked access, exact-owned fixture cleanup, leak counts and residual counts remain NOT_RUN by this reviewer. Required frontend gates and post-merge exact TEST verification remain the coordinator's lifecycle responsibility.
