# Phase 22 persisted implementation contract — v1

Owner START_PHASE_22=YES on 2026-10-07 (Asia/Saigon) authorizes the complete Phase22 lifecycle in TEST only. Phase20 [matrix](../PHASE-20-STUDY-GROUP-AUTH-EXPERIMENT/POLICY-MATRIX.md), [GO](../PHASE-20-STUDY-GROUP-AUTH-EXPERIMENT/VERDICT.md), [inheritance](../PHASE-20-STUDY-GROUP-AUTH-EXPERIMENT/HANDOFF.md) and accepted evidence remain authoritative. Phase23/24 remain unauthorized/unstarted. This freezes requirements before persisted implementation; evidence gates remain unpassed.

## Reuse and security boundaries

KEEP current session/CSRF/account ACTIVE checks, validation/error envelopes, author-private Community posts and vi/en locale. BUILD_NEW separate study-group tables, module and feature. ADAPT established PostgreSQL transactions and native UI primitives. DEFER provider invitations, notifications, attachments, realtime, discovery/search, external safety services and production release. No existing PRIVATE post relation, visibility or query changes. Platform roles never confer group authority. No new telemetry or real-user collection.

Exactly OWNER/MODERATOR/MEMBER. Owner-only moderator assignment and archive are explicitly requested Phase22 additions, not behavior claimed proven by the Phase20 experiment. Owner alone issues/revokes invitations, assigns/demotes moderators, removes ordinary members/moderators, transfers ownership and archives. Moderator can remove another ordinary MEMBER only, hide text and read/resolve scoped reports. Member may read/write visible text, report visible text and leave. Owner cannot leave or be removed; transfer first. Moderator cannot remove self/peer/owner, invite, transfer or elevate. Transfer requires another ACTIVE existing MEMBER/MODERATOR; former owner becomes MEMBER. Removed actors cannot rejoin; LEFT actors may redeem a new invitation as MEMBER. Hidden text is readable only by current scoped OWNER/MODERATOR; reporter receives acknowledgement only.

## Persisted model and DB constraints

Add migration 0027_phase22_study_groups.sql and development-only down counterpart through the existing checksum/advisory-lock migration mechanism.

- study_groups: UUID id, name (trimmed 1–120), description (0–500), owner_user_id, status ACTIVE/ARCHIVED, created_at, updated_at. No learning-language or global locale field.
- study_group_memberships: group_id/user_id composite primary key, role OWNER/MODERATOR/MEMBER, status ACTIVE/LEFT/REMOVED, joined_at/updated_at. Retain tombstones; no public revoked-member listing.
- Exactly one persisted current owner: non-null group owner reference plus DEFERRABLE INITIALLY DEFERRED composite FK to the same group's ACTIVE OWNER membership, and partial unique index for ACTIVE OWNER per group. Database CHECKs disallow privileged inactive memberships. Use an additional FULL non-partial UNIQUE(group_id,user_id,status,role) as the FK target, checked owner_status=ACTIVE/owner_role=OWNER group constants, and the separate partial owner index. Creation inserts group and owner membership in one transaction. Transfer demotes old owner, promotes target, updates reference in one transaction; deferred FK and unique index prevent invalid commits.
- study_group_invitations: UUID id, group_id, issuer_user_id, unique lowercase SHA256 token_digest, expires_at, accepted_at/accepted_by_user_id, revoked_at, created_at. CHECK digest format, expiry after creation, coherent acceptance and mutually exclusive accepted/revoked state. No raw token or recipient email. Group-qualified identifiers on all invite operations.
- study_group_texts: UUID id, group_id, author_user_id, plain body 1–2000, hidden_at/hidden_by_user_id, created_at. Composite unique group/id for scoped report FK.
- study_group_reports: UUID id, group_id, text_id, reporter_user_id, reason 1–500, status OPEN/RESOLVED, resolved_by/resolved_at, created_at. Composite FK group/text; unique report per reporter/text (duplicate acknowledgement does not reveal report contents).
- Issuer, accepted-by, text author, reporter, hidden-by and resolver use group-qualified historical membership FKs (nullable lifecycle references MATCH SIMPLE). The same retained membership must exist in that group; not merely any user row. User/group FKs use restrictive account deletion and explicit group-child cascade for guarded TEST cleanup. No application hard-delete endpoint. Index membership user/status/group, group-created text/report order, group invitation state/expiry. CHECK roles/status/field bounds in DB as well as DTO validation.

## Transactions, quotas and isolation

PostgreSQL READ COMMITTED. Account row locks precede group locks; deterministic user-ID ordering whenever actor and target are involved. Writes lock relevant ACTIVE account rows FOR UPDATE, then group FOR UPDATE; reads lock actor FOR SHARE then group FOR SHARE. Recheck membership/status/role after acquiring the group lock. Every protected read/write, hidden-text check and serialization happens inside that transaction. List locks candidate groups in deterministic ID order, rechecks current membership and emits bounded results. No ACL cache or group JWT claims. Rollback all multi-record failures.

Actor/target account locks serialize group creation/ownership caps. Creation also checks creator active memberships<20; transfer checks target retained owned groups<2. Membership-changing operations lock every affected user account (including removed target) before group lock, so the user list/count cannot race joins/removals. Group list takes actor FOR SHARE before selecting/counting candidates; all selection/count/serialization remain under that lock. Group lock serializes durable quotas, invitation consumption, membership upsert, removal/leave/role transition/transfer/hide/archive. Use conditional unused/unrevoked/unexpired invitation update with clock_timestamp() after waiting; membership and consume commit together. Exactly one success for competing valid redemptions; existing members and REMOVED actors never consume. Expiry is 24 hours; 256-bit opaque random token returned once from issuance. Revoke unused token only, uniform unavailable for all unusable states. No logging tokens/digests/request bodies.

Persist bounded rate counters in study_group_rate_limits keyed user/action, with hits and reset_at (no request/group/token metadata). Atomic UPSERT with DB clock resets expired window or increments capped hits; commit independently before main operation so failed invitation attempts count. Fixed60-second windows: CREATE2, ACCEPT10, INVITE10, TEXT20, REPORT10, MEMBERSHIP20, MODERATION20 per active actor. Include revoke in INVITE; role/transfer/leave/remove/archive in MEMBERSHIP; hide/resolve in MODERATION. Safe GROUP_RATE_LIMITED429 response. Counters are one row per actor/action, not append-only events; account FK cleanup. Reuse existing authentication rate protection unchanged. Prove concurrent rate limits and failed accept counting; this does not solve distributed abuse.

Bounded pilot: maximum2 retained owned groups per actor, maximum20 ACTIVE memberships per actor and per group; maximum20 retained invitations/texts/reports per group. Text bound2000, name120, description500, reason500. Limits are documented finite pilot capacity, not a proof of abuse prevention. Lists use page1+, limit1–20 (default20), deterministic created_at/id ordering and scoped total/page metadata. All quotas are transaction checked under locks, not frontend counters.

The existing exchange block table is explicitly exchange-scoped; no global block policy/store exists. Phase22 neither reinterprets exchange blocks as group membership revocation nor invents platform override. Account DISABLED is denied freshly by session and transaction checks; group removal is durable group ban. Global block integration remains an unpassed Phase20 real-rollout inheritance gate; current bounded synthetic TEST acceptance does not certify real private-data release.

## HTTP contract

Base /api/v1/study-groups. Every route requires AccessTokenGuard; mutations assertCsrfForCookie. Responses use existing success/data envelope; safe error code GROUP_UNAVAILABLE with404 for missing/foreign/nonmember/insufficient authority and invalid/expired/revoked/replayed invitation. Anonymous uses existing401. Input validation uses existing400 envelope; authenticated quota denial GROUP_LIMIT_REACHED409. Protected responses Cache-Control private,no-store; no public discovery, search, counts, share/export or notification projection.

| Method/path | Input | data |
|---|---|---|
| GET / | page,limit | Page<Group> |
| POST / | name,description? | Group |
| GET /:groupId | UUID | Group |
| GET /:groupId/members | page,limit | Page<Member> |
| POST /:groupId/invitations | empty | {id,token,expiresAt} (owner only, once) |
| GET /:groupId/invitations | page,limit | Page<Invite> (owner only; id,createdAt,expiresAt,state) |
| DELETE /:groupId/invitations/:inviteId | UUIDs | {revoked:true} |
| POST /invitations/accept | {groupId,token} | Group |
| POST /:groupId/leave | empty | {left:true} |
| DELETE /:groupId/members/:userId | UUIDs | {removed:true} |
| PATCH /:groupId/members/:userId/role | {role:MODERATOR or MEMBER} | Member |
| POST /:groupId/ownership | {userId} | Group |
| POST /:groupId/archive | empty | {archived:true} |
| GET /:groupId/texts | page,limit | Page<Text> |
| POST /:groupId/texts | {body} | Text |
| POST /:groupId/texts/:textId/hide | empty | {hidden:true} |
| POST /:groupId/texts/:textId/reports | {reason} | {acknowledged:true} |
| GET /:groupId/reports | page,limit | Page<Report> (moderation only) |
| POST /:groupId/reports/:reportId/resolve | empty | {resolved:true} |

Group={id,name,description,status,role,createdAt,updatedAt}; role is current actor's membership, not platform role. Member={userId,displayName,role,joinedAt}. Text={id,body,author:{userId,displayName},hidden,createdAt}. Report={id,textId,reason,status,createdAt}; no reporter email/profile/security metadata. Page<T>={items:T[],page,limit,total}. Include only presentation data; no token_digest, issuer internals, passwords, session or deleted-member state. Scoped pagination counts exclude hidden content from ordinary members.

## UI contract

Use current shell and Community local navigation; routes /community/groups, /community/groups/invitations, /community/groups/:groupId. Native feature components/hooks/API/CSS Modules with existing vi/en catalog. Create/list, signed-in manual acceptance (groupId+token pasted, POST only), detail/member/text composer, report/moderation, owner member/invite/transfer/archive controls; explicit confirmations for irreversible role/lifecycle actions. Owner invitation metadata list supports revocation after reload without token retention. Raw issued token is ephemeral one-time display, copy/share manually, never local/session storage or query strings. Owner can revoke known issued invitation id in the current UI. Any unavailable/401 response clears protected state; late requests must not restore revoked state. Frontend guards are UX only. No membership-triggered global locale change.

Use actual Stitch MCP references before UI implementation; inspect/refine separate desktop/mobile/action designs while preserving project tokens. Keyboard labels/focus/dialog semantics/errors/status and long-content wrapping must pass at320,375,390,412,768,1024,1440 in both locales. English human linguistic certification is distinct from technical rendering.

## Retention, deletion and abuse responsibility

Archive is owner-only, denies further protected operations to all actors, retains owner/membership/invite/text/report records and counts toward owned-group quota. No restore/delete/export/automatic erasure or legal retention guarantee. Leave/removal preserves authored group text and duty reports; author-private posts untouched. Invitations expire logically using DB time and retain digest/lifecycle evidence. Reports retain bounded reason, scoped duty and resolution; no platform admin integration. Existing groups' removal bans survive. Rate counters retain only the current action window and capped count; no timer or unbounded audit log is added. Before real private-data launch, backup/restore and durable deletion/retention policy must be approved; historical seed-only backup waiver is insufficient.

Group owner and assigned moderators have the bounded technical duty; no staffed service, SLA, appeal workflow, harassment/spam solution or moderation-effectiveness claim. Notifications/realtime/storage projections do not exist for this feature: NOT_APPLICABLE, not fabricated PASS. Already delivered content cannot be recalled. ABUSE_PREVENTION_SOLVED=NO; MODERATION_EFFECTIVENESS_PROVEN=NO; REAL_USER_VALUE_PROVEN=NO.

## Required evidence

Re-run frozen Phase20 policy regression and actual PostgreSQL service/HTTP cases. Prove multi-client and independent-process invitation races, competing transfers, member uniqueness, last-owner constraints, role/remove/leave interleavings, durable post-commit denial and rollback. Independently attempt invalid direct SQL commits for constraints. Check safe serializers, no-store/CSRF/input/rate/quota boundaries, cross-group IDs on every route, hidden-text totals/reports and unchanged PRIVATE regression. Use isolated disposable schema for destructive up/down tests; guard exact existing TEST server identity before migrations/fixtures. No production DB writes.

Full Backend/Frontend gates, PostgreSQL CI service proof, protected HTTP tests, Stitch/vi/en/responsive/a11y/browser, merged-main CI/provider exact SHA and safe synthetic TEST runtime+cleanup are mandatory before DONE. Test failures/blockers stay truthful. No next-phase automatic start.

## PostgreSQL reference basis

[Explicit row locks](https://www.postgresql.org/docs/18/explicit-locking.html), [READ COMMITTED](https://www.postgresql.org/docs/16/transaction-iso.html) and [constraints](https://www.postgresql.org/docs/current/ddl-constraints.html) support this design; passing source review is not actual SQL proof.
