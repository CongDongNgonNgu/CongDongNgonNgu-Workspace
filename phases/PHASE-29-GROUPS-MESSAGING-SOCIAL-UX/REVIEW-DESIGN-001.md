
## Independent create-dialog visual review - LNG-29-001

Recorded 2026-10-19 Asia/Saigon. Reviewer inspected phase29-create-desktop.png, phase29-create-refined-desktop.png and phase29-create-refined-mobile.png using view_image, against CONTRACT-001.md, current styles/tokens.css and shared Overlays styles. Review scope is the create modal only. The inherited generated index/background is excluded and is not approved by this selection.

### Initial candidate

Verdict: REQUEST_REFINEMENT. The initial dialog contained developer simulation controls, mixed VI/EN labels, a forced academic honor-code statement, duplicated privacy/security prose and excessive guidance cards. The footer was clipped in the supplied view. Required changes were to remove unsupported obligations and controls, use one locale consistently, retain only supported name/description fields, and prioritize a compact readable form with visible actions.

### Refined selected candidates

Desktop Stitch ID: 8b204d21a55d4c5788de52f63c6d0066.
Mobile Stitch ID: ebc7781c49a14eab8fc1869359527701.

Verdict: SELECTED_WITH_IMPLEMENTATION_NOTES for modal composition. Both variants now use consistent Vietnamese, a concise private-invitation note, the supported name/optional-description fields, bounded counters, restrained learning-purpose guidance and clear Cancel/Create actions. The unsupported honor code, state toggles and long technical security explanation are absent. The mobile sheet offers a useful full-width primary action and clear stacked form hierarchy. This selection approves visual direction, not runtime accessibility or measured CSS compliance.

Bounded implementation requirements:

- Use existing Be Vietnam Pro and semantic navy/orange/surface/focus tokens; retain the native shared Dialog/FormControls/Button architecture. Do not copy generated markup wholesale.
- The close glyph is visually small in both images. Its interactive button must be at least44px by44px with a localized accessible label, visible focus and enough separation from the title. The screenshot does not prove target size.
- Keep mobile inputs, counters and helper text comfortably readable. Use existing input/body sizing; avoid shrinking help text merely to reproduce the screenshot. Test at320/375/390/412px in VI and EN with real browser measurements.
- Preserve 44px minimum action/input targets and body text hierarchy. The mobile Cancel button should receive the same minimum height as the primary action.
- Keep the dialog within the usable viewport, account for safe-area insets and the on-screen keyboard, and allow internal scrolling when needed. The background shell/footer must not cover dialog controls.
- Preserve focus trapping, initial focus, Escape/backdrop behavior where appropriate, focus return, labelled errors, busy/disabled feedback and server-failure recovery. Verify these in runtime; images cannot establish them.
- Freeform description guidance is sufficient for language/goals/proficiency/topics. Do not add structured learning tags, an Organizer role, fabricated counts/activity or new persistence fields.
- The old generated background still includes mixed-language labels and unsupported Honor Code content. It is explicitly excluded pending separate index refinement; none of it is approved for product implementation.

Independent browser/runtime checks and contrast measurements for these candidates: NOT_RUN. No product files were changed by this review.

## Independent group index/home visual review - LNG-29-001

Recorded 2026-10-19 Asia/Saigon. Inspected phase29-refined-0.png through phase29-refined-3.png using view_image. These refined candidates replace earlier rejected artifacts as composition references only.

| Surface | Stitch ID | Selection verdict |
|---|---|---|
| Desktop authorized group index | 70109673a52041ab97c334089c514a5b | SELECTED_WITH_EXCLUSIONS |
| Mobile authorized group index | d1cea53a00474452968b170bf4ab204e | SELECTED_WITH_EXCLUSIONS |
| Desktop private group home | 809306c3c0b848cdaffb2b2e855901be | SELECTED_WITH_EXCLUSIONS |
| Mobile private group home | b560ed844b1346d880de95ef1a6dfad1 | SELECTED_WITH_EXCLUSIONS |

The index improves entry hierarchy: explicit My Groups heading, Create and Accept actions, private-invitation labels, role cues, wrapping descriptions and clear group destinations. Mobile uses spacious stacked rows and labeled quick navigation. Group home offers a restrained learning-purpose header, distinct discussion/member/invitation navigation, readable authored text and a visible composer. Navy/orange direction is compatible with the product.

The following exclusions are mandatory; approval is not permission to reproduce every generated element:

1. Desktop index right-hand Community activity/news panel is excluded. No recent activity, previews, random author posts, invented feeds, fabricated notifications or sample counts are available in the authorized group-list contract. Do not imply a public group directory.
2. Desktop index right-hand single-field invitation entry is excluded. Current acceptance requires manual group ID plus one-use secret on the existing acceptance route. Keep the explicit Accept invitation action and supported form; never put secrets in URLs, screenshots, public previews, persisted UI or message samples.
3. Desktop group home shows an owner role and a Leave action. An owner must transfer ownership before leaving; preserve existing owner archive/transfer behavior and confirmations. Do not enable owner leave just because the reference draws that button. Non-owner leave remains role-appropriate.
4. Group unread values12/14 in the screenshots are illustrative and must never become defaults or static metrics. Use authoritative read/unread state only. No partner receipts, online status, typing, last-active timestamps or derived engagement metrics.
5. Desktop announcement/pinned-note and mobile weekly-resource block are excluded as new capabilities. No pin/announcement/week-scheduling domain is approved. Existing authorized context cards may appear inline with their real resolver output; do not transform them into invented scheduled or pinned content.
6. The depicted names, message text, member lists, timestamps and group descriptions are design samples, not observed TEST data. Render only current authorized server state; no sample content in empty/error/revoked views.
7. Side member summaries cannot bypass current pagination or expose nonmembers. Owner/moderator/member permissions and revoked-access disposal govern every list and action. Do not add a public member preview.
8. Invite creation remains owner-only with existing one-use/manual rules. Do not introduce unrestricted member invites, public invite discovery, bulk invitation or a separate group conversation.
9. Preserve scoped reporting/moderation/report management where supported. The simplified mobile three-tab view cannot remove moderator/owner report access; provide a role-appropriate native route/panel/action using existing behavior.
10. No reply threading, message editing, deletion, reactions, participant presence, fabricated group activity or group-conversation add/remove controls are approved by these designs. Use only existing text moderation/reporting capabilities.
11. The mobile bottom navigation composer separation requires runtime proof. Keep the composer/send target clear of fixed navigation, safe area and the software keyboard. Avoid independent scroll areas that trap touch/keyboard navigation.

Implementation notes: use existing component-owned CSS Modules, native Buttons/Links/Dialog/FormControls, shared GroupPagination, policy helpers, context queues and resource/collaboration hooks. Replace visually small action/overflow/close icons with at least44px hit targets and localized accessible labels. Group detail information and mobile overflow actions must remain keyboard accessible. Keep source-backed stream/reconnect/error/revoked feedback even when absent from the attractive reference. Use existing type scale, current semantic tokens and44px controls rather than copying screenshot pixel dimensions.

Selection approves responsive composition, privacy/role emphasis and visual hierarchy subject to these exclusions. No requirement for new backend fields follows from a screenshot. Full VI/EN seven-width, contrast, keyboard, focus, mobile keyboard and multi-role runtime acceptance by this reviewer: NOT_RUN.

## Independent initial messaging design review - LNG-29-001

Recorded 2026-10-19 Asia/Saigon. Retrieved five screens with Stitch get_screen from project16818442275268553095, downloaded their screenshots to the workspace root and inspected each through view_image. Files phase29-message-candidate-0.png through phase29-message-candidate-4.png are visual-review inputs only.

| Surface | Stitch ID | Verdict |
|---|---|---|
| Desktop inbox | 171daa4d276a4e7c8867f315e844a24a | REQUEST_REFINEMENT |
| Mobile inbox | 0bb48b0c7a474bc1b44bdf277060067c | REQUEST_REFINEMENT |
| Desktop direct conversation | 91a204beb0af45f692717b97e0857acc | REQUEST_REFINEMENT |
| Mobile direct conversation | 1a700eddfcea49b2a28484e7d6944c0a | REQUEST_REFINEMENT |
| Desktop direct information | 89bd3905b9b042d5a7bad9aa403ca47b | REQUEST_REFINEMENT |

The broad desktop master/detail and mobile list/thread composition are useful. Current candidates remain too full of unsupported social/profile/course metadata and controls for direct selection. Refine with a strict direct-pair contract and one locale per screen.

### Required corrections

Desktop inbox: remove online dots, last-active descriptions, fabricated active-partner totals, language/proficiency chips, language filters, unimplemented conversation search and suggested-partner recommendation panel. The actual list exposes partner displayName, userId, unreadCount and updatedAt; it does not expose partner profile languages, presence or last-message preview. A New conversation action may navigate to existing eligible Connections; do not invent free-recipient compose or a group-chat modal. Keep My Groups as a simple separate-domain navigation link without active-group counts.

Mobile inbox: remove the invented Course29/day14-of30 progress strip, claim of3 active groups and profile-language chips. Do not impose a course/academic-message rules card. A short learning-purpose introduction is ordinary copy, but no new messaging obligation is approved. Use actual unread and update timestamps only. Keep usable primary Connections action and canonical conversation links.

Desktop conversation: remove message previews from the inbox sidebar because the current list contract does not supply them. Remove language/proficiency identity tags and unimplemented search/unread filters. A connected/verified relationship subtitle should not be invented from limited conversation summary data. Preserve real partner identity, profile link, actual timestamps, history pagination and supported learning-context cards. Context cards must use authoritative resolver title/type/availability, not generated grammar/resource claims.

Mobile conversation: remove presence-colored identity dots and language chips. An offline banner is appropriate only from actual stream/error state; do not claim one pending send unless composer state proves it. An empty-thread prompt may use brief localized learning-focused copy, but the populated thread should not be crowded by generated starter-message cards. Keep history access, send feedback and ordinary source-backed context cards.

Desktop conversation information: redesign substantially. Current image invents call/search/new-compose actions, presence, language/proficiency metadata, group membership links and a group Leave/Manage action alongside the direct pair. It also draws media/microphone/emoji composer controls and profile-like ratings/tags. Remove all of these. Show exactly the current authorized pair identities, existing partner Profile and actor Connections destinations, and concise direct-message context. No add/remove participants, group management, membership grants or group previews. A context reference never grants access. Any information dialog must clear with denied/revoked access and use native focus/close behavior.

Across all candidates: no typing, partner read receipt, last seen, fake activity, arbitrary group participants, upload/attachment infrastructure, audio/video controls, message edit/delete/reactions or generic unsupported overflow menus. Synthetic sample text/names are visual placeholders only and must not ship as data. Use one locale consistently instead of bilingual English parentheticals or developer-domain wording.

### Source-backed limits and implementation notes

Direct-message text limit is4000 Unicode code points in src/features/exchange/messaging-state.ts; this value is supported and is not a rejection finding. Generated Enter/Shift+Enter instructions are unsupported by the existing form unless actual interaction changes are intentionally implemented and tested. Preserve existing textarea newline behavior and explicit Send submission by default.

Use existing navy/orange tokens, Be Vietnam Pro, Avatar fallback and focused messaging hooks/native components. Keep readable names/timestamps,44px hit targets, visible focus, selected-route styling and overflow wrapping. Do not allow fixed bottom navigation or a mobile keyboard to cover the composer. Initial mockups cannot establish real contrast, responsive measurements, status announcements or authorization.

No Stitch edit/generation or product change was performed by this reviewer. Native runtime, role isolation, contrast and accessibility acceptance for these candidates: NOT_RUN.

## Independent members, information, held capability and state review - LNG-29-001

Recorded 2026-10-19 Asia/Saigon. Retrieved nine Stitch screens from project16818442275268553095, downloaded screenshots as phase29-more-0.png through phase29-more-8.png and inspected with view_image. This is visual/source-contract review only.

| Surface | Stitch ID | Verdict |
|---|---|---|
| Refined desktop members/invitations | 67a1e29ef6bb4f27bcf857402a6225c9 | SELECTED_WITH_EXCLUSIONS |
| Refined mobile members/invitations | 7415bb9d9cf6446583f6c01d33e53ebf | SELECTED_WITH_EXCLUSIONS |
| Initial mobile direct information | 0977171d8f484fd388886815d71fd09c | REQUEST_REFINEMENT |
| Mobile held group-conversation reference | 3deea3f6b61147c8840f728608d0d89a | REVIEW_BOARD_ONLY |
| Desktop state review board | ed720699c3a24746ab261b2b889604c5 | SELECTED_STATE_COMPOSITIONS_WITH_EXCLUSIONS |
| Mobile group empty state | 11830ef24ee744cf8019cd330829e944 | SELECTED_WITH_EXCLUSIONS |
| Mobile inbox loading | 3c1822d926c7416691df6b6eeef578ab | REQUEST_REFINEMENT |
| Mobile offline/retry | 211228a2d16246a6a17ad5a00579a38f | REQUEST_REFINEMENT |
| Mobile revoked access | 73bcea233a7e42319a1bdd8194c21bed | SELECTED_WITH_EXCLUSIONS |

### Member and invitation composition

Desktop separated member rows/invitation panel and mobile stacked role/action rows provide useful hierarchy. Keep real names, roles and joinedAt dates from authorized server projections. Counts must come from the authorized paginated total, not sample4. Mobile self-owner row correctly communicates transfer-before-leave.

Exclude persistent active-secret recovery. A masked token plus Copy control in the desktop invitation panel implies the secret can be retrieved later; the existing list exposes invitation ID/state/createdAt/expiresAt, not the original secret. Only the fresh issued-invitation dialog may display/copy its one-use token, and it must clear with closure/access loss. History must never expose raw secrets. Use actual expiresAt formatting rather than fabricated fixed countdowns. The owner-management screen must not duplicate the manual group-ID-plus-secret acceptance form; preserve its existing canonical acceptance route.

Owner alone may issue/revoke, promote/demote and transfer ownership. Moderator may remove ordinary members and moderate scoped content, never invite/elevate/remove peer or owner. A screenshot containing owner controls is no authorization for those controls in moderator/member views. Preserve existing role-specific report access, pagination, confirmations and generic denial clearing. Use localized labels rather than mixed English role terminology; measure44px action targets.

### Direct information and held group conversation

The initial mobile information screen needs substantial refinement: remove proficiency/language chips, compatibility/security claims unsupported by summary, partner management/report controls, group invitation, linked-material management and extra profile metadata. Use only current authorized pair identities, existing Profile/Connections links and concise safe copy. Do not imply direct-pair membership can be managed like Study Group membership.

The held group-conversation image is accepted only as review-board evidence of an unsupported capability. Its top annotation must remain outside the product. Neither the hypothetical course/group label, proposed future roles nor the future permission model is approved. Do not create a product route or placeholder disabled group-chat screen from it; use existing direct inbox/My Groups destinations. A supported Study Group discussion remains a distinct domain.

### Empty/loading/network/revoked states

Desktop state-board panels are useful visual references for a calm empty list, skeleton loading, retry feedback and generic access-unavailable treatment. The board title, numbered state labels, developer notes and simulation annotations are documentation only and must never become product controls/copy. Preserve real loading/error/access state ownership, not a state selector. The desktop revoked panel must remove the stale name, identity and thread header rather than retaining prior private context.

Mobile empty Groups composition is selected, but reduce repeated Create/Accept CTAs across the header and empty panel. Use one clear primary and one secondary action. Do not claim all groups are currently operating or any absolute privacy property beyond the actual private-invitation contract. The empty state means no actor-authorized results; no sample groups or invented counts.

Mobile loading requires refinement: remove the2024 course label/identifier, sample4 active groups,12 partners and unsupported search. Skeleton rows must not contain fabricated identities or counts. Announce loading with status/aria-busy and keep canonical navigation available without pretending results exist.

Mobile offline/retry requires refinement: remove claims of persisted drafts/clipboard storage,4-hour offline countdown, network scanning/synchronization, project/session IDs, microphone controls and device/network diagnostic labels. Existing composer keeps a route/actor-scoped in-memory draft and retries supported send failures; it does not promise durable storage or background sync. Show actual offline/reconnect/send-failure state, preserve a draft only where the existing hook does so, and offer source-backed retry. Do not claim the server received a failed message. Actual pending/sending states and timestamps must never come from the screenshot.

Mobile revoked composition is selected only after copy simplification. Use generic unavailable/access-lost copy and safe inbox/My Groups links; avoid confirming the old membership or exact denial reason. Remove assertions that all device data was deleted,0 bytes remain or the whole device cache was cleared. Verify relevant private component state disposal without claiming device-wide erasure. Do not retain old group/conversation names, member identities, message text, context cards or usable composer controls. A disabled neutral placeholder is optional; removing the composer entirely is clearer.

Static sample unread values and dates in any board must never become defaults. Real server unread/read state, resource epochs, abort ownership and denied-access clearing remain authoritative. Visual selection does not establish absence of leaks.

Independent runtime, multi-role/API isolation, measured44px targets, contrast, status announcements and residual checks for these artifacts: NOT_RUN. No product edits or Stitch edits were performed.

## Independent refined messaging review - LNG-29-001

Recorded 2026-10-19 Asia/Saigon. Retrieved six refined screens with get_screen, downloaded phase29-message-refined-0.png through phase29-message-refined-5.png and inspected through view_image.

| Surface | Stitch ID | Verdict |
|---|---|---|
| Refined desktop inbox | 38951fe288dc4369b98e6dfc74e6208d | SELECTED |
| Refined mobile inbox | ef0d05ee598d4b9c9152754ba7b5f038 | SELECTED |
| Refined desktop direct thread | 04c1b4b708bf40c19e214c48e678fc86 | SELECTED_WITH_EXCLUSIONS |
| Refined mobile direct thread | e77c75ec1e104fa687c0a1db6b082dd6 | SELECTED_WITH_EXCLUSIONS |
| Refined desktop information | 6300584caaed40788cfe21dac287e35a | REQUEST_REFINEMENT |
| Refined mobile information | 175229dc209f4bd6b876dfff4051e821 | SELECTED_WITH_EXCLUSIONS |

Inbox refinements remove the earlier invented profile/course/presence metadata and use a clear identity/timestamp/unread hierarchy. Desktop no-selection prompt and Connections destination are appropriate. Both variants preserve My Groups as separate navigation rather than group-chat membership. Selection requires actual authorized server values; sample names/dates/unread counts are never defaults. Use native initials unless an actual supported avatar asset is available.

Desktop direct thread composition is selected: clear current participant, readable chronology, useful separation between actual context cards and text, and explicit composer/send. Exclude the generated unread-only filter because current source does not implement it, connection diagnostic action and unsupported diagnostic claims. Header Create Group/Invitation/proficiency leftovers are outside the selected conversation composition and must use the approved shell instead. Resource titles/availability come only from the context resolver. No fabricated post/grammar card content is approved.

Mobile direct thread composition is selected with exclusions. The orange offline banner is shown only for actual offline/send-failure state; a claim of exactly1 pending message needs composer state evidence. Remove the redundant starter prompt from a populated conversation. Show a brief prompt only for a real empty thread. Context cards require supported resolver data and their existing authorized destination. Preserve4000 Unicode-code-point direct-message validation, ordinary textarea newlines and explicit Send button; no invented Enter/Shift+Enter behavior.

Desktop information remains a true visual blocker: top-right columns/titles visibly collide and overlap, so it is not a readable side dialog. The resource statistics24/16 are unsupported. Background retains language/proficiency metadata, message previews, call/search and media composer icons from rejected candidates. Replace the whole screenshot with a clean authoritative pair-only information layout over the approved direct-thread composition. Do not normalize overflow by merely excluding the metrics.

Mobile information has a useful pair-only hierarchy and existing Profile/Connections destinations. Exclude dictionary/grammar search and Report actions because current conversation summary/API contract does not establish them. Do not invent a direct-message report flow from Study Group reporting. Avoid a colored connection dot that looks like online presence; any relationship copy must be grounded in actual authorized connection state or omitted. Keep only current actor and partner identity; no added participants or group management.

Across all six candidates, remove any unsupported media/search/typing/presence/read-receipt/last-seen controls. Drawn dates/counts are samples only. Use existing localized copy, semantic tokens, native components,44px controls and route-aware focus/scroll behavior. Information dialogs must clear promptly on access loss and support keyboard focus trapping/Escape/return. The selected mobile/desktop compositions do not establish responsive contrast or runtime authorization.

Independent runtime and measured accessibility for this refinement: NOT_RUN. No product or Stitch edit was performed by this reviewer.

## Final independent design selection - LNG-29-001

Recorded 2026-10-19 Asia/Saigon. Retrieved the final five candidates from Stitch project16818442275268553095, downloaded phase29-final-0.png through phase29-final-4.png and visually inspected each with view_image.

| Surface | Final Stitch ID | Verdict |
|---|---|---|
| Rebuilt desktop direct information | de963589d21849668a898fe47749b1a0 | SELECTED_WITH_RECORDED_EXCLUSIONS |
| Refined mobile loading | a28cc5725a8b4d6a9d9dcd62d564da3e | SELECTED |
| Refined mobile offline/retry | e2acdebea2544ccd8aba2e0a3509df14 | SELECTED_WITH_RECORDED_EXCLUSIONS |
| Refined mobile unavailable/revoked | 8a3cce7eddaa4c5c81fc071babe1c74d | SELECTED |
| Desktop held-capability fallback | 72775b91c337426bb87d757405dd3fdb | REVIEW_BOARD_ONLY; fallback composition reference |

Desktop information visible-overlap blocker is resolved. The rebuilt side panel is readable, contains a plain authorized pair, Profile/Connections destinations, a close action and concise authorization-neutral reference copy. No fabricated statistics or multi-participant controls remain. The pictured self identity differs from the shell sample identity; these are generated placeholders, never product defaults. Populate self/partner only from the current actor and authorized summary. The skeleton background is a documentation composition, not permission to keep old identities or summaries during actor changes, denied access or uncertain ownership. Use the native Dialog focus/close behavior.

Mobile loading removes the earlier course/group/partner totals and uses neutral skeletons plus a compact loading status. This is selected; render status/aria-busy from actual loading and avoid exposing prior private rows under skeletons.

Mobile offline composition removes durable-storage, timer, microphone and network diagnostic promises. It gives a clear retry banner and marks an example failed send. Selection excludes the leftover date-line suffix referring to a class/group identifier: direct conversation must not acquire course/group identity. Use actual timestamps only. The failed message and Chua gui label must represent real composer state rather than a default example. Keep the ordinary4000-code-point textarea and existing retry/idempotency semantics; do not infer background queueing, persistent drafts or a delivery receipt. Preserve supported composer behavior instead of copying a disabled button merely because the screenshot shows one.

Mobile unavailable state now uses generic unavailability copy and safe inbox/My Groups destinations, without identities, message text, context cards, device erasure claims or a live composer. This is selected. The alternative reasons must remain generic; never disclose whether an unauthorized resource exists or which exact role/membership change caused denial.

The desktop held-capability artifact is screenshot-only evidence and is accepted as a REVIEW BOARD, not a new product feature. Its technical HELD annotation is outside the browser frame and must never enter product UI. The calm direct inbox/no-selection composition can inform existing routes. No separate group-conversation route, participant creation/management or hypothetical future-domain contract is approved. The sample relative update times are drawn placeholders; actual implementation uses server updatedAt and does not imply presence/last active.

### Aggregate independent verdict

APPROVE_WITH_RECORDED_EXCLUSIONS for LNG-29-001 visual direction and frozen IA. The previously blocking desktop-information overlap has been remediated in the final candidate. Earlier rejected candidates are not selected merely because they remain in Stitch. The selections and mandatory exclusions recorded above govern implementation together with CONTRACT-001.md and EXECUTION-PLAN.md.

Approval covers reference composition only: private Study Group list/create/home/member/invitation journeys, direct inbox/thread/information, neutral empty/loading/offline/unavailable feedback and separate-domain navigation. It authorizes no new backend fields, public directory/join, messaging permissions, recoverable invite secrets, invented previews/metrics/presence/read receipts, media or independent group conversations. Generated names/text/timestamps/counts must never ship as default data.

Implementation must retain existing semantic tokens and native components, focus/keyboard/route ownership, private-state disposal, verified source limits, VI/EN and all required widths. Exact pixel dimensions,44px hit targets, contrast, keyboard/accessibility, responsive browser behavior, runtime authorization and leak/cleanup counts remain NOT_RUN by this design reviewer and require downstream acceptance. No product or Stitch edits were made by this reviewer.
