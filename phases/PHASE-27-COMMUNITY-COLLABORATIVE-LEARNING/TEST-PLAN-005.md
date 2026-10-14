# Phase27 private group verification plan (005)

Recorded 2026-10-14 Asia/Saigon. Planned acceptance gates for [CONTRACT-005.md](CONTRACT-005.md); this plan contains no runtime PASS or005 DONE assertion. Begin005 lifecycle after004 dependency gates complete. Use synthetic ordinary approved TEST actors and exactly owned fixtures only.

## Source and focused automated checks

1. Confirm `GroupResponse` and Frontend `StudyGroup` expose only `visibility: PRIVATE_INVITE_ONLY`; shared projector emits the literal for old and new rows. Preserve ACTIVE/ARCHIVED lifecycle separately. Update exact response-key assertions for the additive field.
2. Confirm no migration, public/request visibility value, discovery endpoint or editable visibility field was added. Creation boundary remains name/description and rejects unknown ownership/visibility/join-policy fields through normal validation.
3. Exercise existing Phase22 role/invitation/current-membership HTTP/SQL coverage plus focused005 tests. Existing004 outsider, stream, cursor-generation, read and canonical-context cases remain regressions; do not replace transaction/race proof with static schema checks.
4. Verify paired VI/EN list/detail/create/join copy, fixed privacy labels, owner-only issuance and explicit acceptance explanation. Keep names/descriptions/text unchanged; no unsupported settings. Run relevant Frontend tests/typecheck/lint/build and catalog parity checks, Backend targeted tests/build, and final diff inspection.

## API negative matrix

| Case | Required observation |
|---|---|
| Anonymous list/detail/member/text/sync/stream | Authentication denial with no group metadata |
| Unrelated C lists groups while A owns a private group | Only C's current memberships; no A group or global count |
| C guesses actual private UUID and absent UUID | Same safe404 unavailable body; no names, members or protected totals |
| C uses actual group ID for send, sync, read, context or stream | Current authorization denial, no protected payload or durable mutation |
| Group list includes search/q/languageCode/topic/visibility fields | Unsupported fields rejected; no discovery activated |
| Create with PUBLIC/REQUEST_TO_JOIN/public-join policy or forged owner/role | Rejected input; no new group with escalated policy |
| Unsupported visibility update/join-request/public-join operation | No supported operation and no policy/membership change |
| MEMBER/MODERATOR issues/revokes invitation, transfers, archives or escalates role | Existing privilege boundary enforced |
| LEFT/REMOVED/ARCHIVED actors repeat protected reads/list navigation | Current scoped state honored; no stale access |
| Exchange-connected or blocked unrelated actor probes group | Connection/block neither grants group authority nor silently changes current membership |

For valid-shaped guessed IDs compare status and safe response body; no timing-equivalence guarantee is claimed. An unsupported route may be rejected by the existing UUID route rather than a new handler. Record the actual status without treating route rejection as a public feature. Verify count scoping through current-membership list responses, not invented public counters.

## Positive invitation and projection journey

- A creates a group and sees fixed private/invitation-only copy plus literal API visibility. Read a retained pre005 group through an authorized actor and verify the same projection without mutating its policy.
- A explicitly issues an invitation. B cannot read the group merely from its ID or before explicit acceptance. B accepts the valid owner-issued bearer and receives authorized detail with the same private projection.
- Verify one-use/expiry semantics using existing isolated SQL/HTTP coverage or exact-owned runtime fixtures, preserving LEFT fresh-invite and REMOVED denial. No expiry wait or mutation of unrelated invitation rows is required.
- Compare OWNER/MODERATOR/MEMBER controls with server enforcement. Retain one-owner/transfer-before-leave and no platform-admin override expectations.

## Genuine deployed browser proof

Use deployed first-party Frontend/Backend on verified TEST revisions, independent A/B/C browser contexts, and genuine APIs. Capture VI and EN authorized list/detail/create/join privacy text; native manual invitation acceptance where applicable. C's own list and guessed-ID unavailable view must expose no A/B group metadata. Confirm no public browse, request or visibility controls exist in affected flows. Check keyboard labels/focus and narrow320/390 plus desktop1440 layouts for changed copy;006 retains the full seven-width acceptance obligation.

004 established collaboration journeys remain separately scoped evidence. Do not claim005 realtime, sharing, full accessibility or screen-reader acceptance solely from these labels. Screen reader remains NOT_RUN unless actually executed. Record exact route/revision/result and material limitations; no fake API substitute.

## Evidence, cleanup and lifecycle

Track exact synthetic actor/group/invitation ownership. Clean only005-owned fixtures after dependent journeys, or explicitly transfer their exact ownership ledger to006 when needed. Record residual checks, including collaboration/rate/lease rows if exercised. Never wildcard-delete unrelated TEST data or earlier Phase18/22 fixtures.

Independent review must cover the additive API shape, old-row fixed default, absence of discovery/escalation, current role/member ACL, VI/EN consistency and truthful bounded claims. Complete applicable PR checks, merge, exact remote-main checks, verified TEST deployment/runtime evidence and temporary branch cleanup/sync. Record005 outcome in a separate acceptance artifact; this plan is not that outcome. Continue006 automatically after005 closure. No Phase28/29 or production mutation.
