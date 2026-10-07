# Phase 20 frozen synthetic TEST contract — 2026-10-07

Owner START_PHASE_20=YES; LNG-20-001 contract version 1, frozen before evaluation.
Every permission is scoped to current server membership. Client role claims and
platform ADMIN/MODERATOR labels confer no group authority.

| Capability | Anonymous | Nonmember/platform-only | Member | Moderator | Owner |
|---|---|---|---|---|---|
| Create disposable group | DENY | authenticated synthetic ALLOW | ALLOW | ALLOW | ALLOW |
| Read/list/search/count text and group metadata | DENY | DENY | ALLOW scoped | ALLOW scoped | ALLOW scoped |
| Write text/report visible text | DENY | DENY | ALLOW scoped | ALLOW scoped | ALLOW scoped |
| Issue/revoke invitation | DENY | DENY | DENY | DENY | ALLOW |
| Join using valid unused invitation | DENY | authenticated synthetic ALLOW | only if not already member | same | same |
| Leave | DENY | DENY | ALLOW | ALLOW | DENY: transfer first |
| Remove member | DENY | DENY | DENY | ordinary member only | member/moderator only |
| Hide text/read and resolve reports | DENY | DENY | DENY | ALLOW scoped | ALLOW scoped |
| Transfer ownership | DENY | DENY | DENY | DENY | active existing member/moderator only |
| Read existing author-private post | DENY | author only | author only | author only | author only |

## Lifecycle and invariants

- Exactly one owner per group. Atomic transfer demotes old owner to member and
  promotes target; self/nonmember/removed target denies. Competing transfers by
  former owner yield one success. Owners cannot leave or be removed. Moderator
  cannot remove self, peer moderator or owner; use leave for self.
- Random 256-bit invitation capability, hash stored, 24-hour expiry (expiry instant
  denies), explicit owner revocation, one successful redemption, uniform unavailable
  response. Join creates MEMBER only. Existing members cannot consume invitation.
  Removed actors cannot rejoin during this experiment; voluntary leavers may use
  a new invitation. Tokens stay in the harness; no real delivery.
- Unauthorized/missing/cross-group IDs return identical unavailable errors.
  List/search/count denies before examining data. Hidden text denies ordinary
  members but allows current scoped moderation. Reports retain synthetic reason,
  target and resolution within scoped duty; reporter gets acknowledgement only.
- Fresh ACL on every operation and queued execution, including cache/notification/
  storage projections. Already delivered text cannot be recalled from memory;
  revocation prevents new server access. No group membership claims in sessions.
- Synchronous check+mutation is the single-process linearization point, no await
  inside. Queued competing requests and both revocation orderings are evaluated.
  This adapter is not proof of distributed SQL isolation.

## Fixtures, retention, cleanup and abuse boundary

Only local Jest TEST memory, exactly two independent groups per fixture,
synthetic identities and text, deterministic clock. No DB/config secrets,
network, provider or application bootstrap. Constructor rejects non-TEST
profiles and non-synthetic identities. Include every role in both groups,
nonmember, removed actor, platform-only actor and anonymous actor.

Cap groups at two, text at 2,000 characters, members/invites/text/reports at 20
per group, projections at 20. No durable storage or delivery. Raw cached text
is never exposed without fresh ACL. Notification is a scoped pointer, projection
rechecks text/group ACL. Storage paths never grant access. Dispose clears groups,
membership, bans, text, reports, invitations and cache, closes the adapter;
tests verify zero counts and denied reuse even after failure. Only sanitized test
names, totals, SHAs and policy/evidence persist, never tokens or fixture bodies.

No platform override or real-data erasure promise. Phase 22 must separately
authorize collection and prove durable retention, abuse ownership, global
block/account-disable integration, quotas, transaction isolation, multi-worker
races and distributed invalidation before release. Future metrics: helpful
eligible contributions / eligible contributions; resolved eligible reports /
eligible reports, with later approved cohort/window/test exclusions. No collection
or real-user demand claim is made now.

## Existing source reconciliation

KEEP Backend author PRIVATE checks and public-only share/export; KEEP Frontend
PUBLIC/PRIVATE journal semantics. BUILD_NEW Backend test-only adapter under
`test/phase20`, excluded from production build. DEFER routes/schema/UI/SQL and
delivery to separately authorized Phase 22. Never copy private posts into groups.
