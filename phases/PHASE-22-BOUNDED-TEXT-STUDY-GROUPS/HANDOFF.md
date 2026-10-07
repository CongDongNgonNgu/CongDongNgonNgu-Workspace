# Phase 22 handoff

Persisted bounded text groups use Backend `src/study-groups/` and additive migration `0027_phase22_study_groups.sql`. Existing author-private community records remain separate and author-only. Frontend `src/features/study-groups/` reuses protected auth transport, existing components, typed vi/en catalog and Community navigation. Routes: `/community/groups`, `/community/groups/invitations`, `/community/groups/:groupId`. API contract and exact role/error/retention rules are in [POLICY-CONTRACT.md](POLICY-CONTRACT.md).

## Invariants and verification

Explicit READ COMMITTED transactions lock affected account rows in sorted order before the group. A deferred composite ACTIVE OWNER foreign key plus partial unique owner index enforce exactly one owner at commit. Membership uniqueness and inactive-role checks are database constraints. Independently committed durable rate counters count authenticated failed attempts. Invite256-bit raw secrets are shown once and manually exchanged; only SHA-256 hashes persist, with24-hour expiry and atomic single consumption. Fresh persisted ACL governs reads/serialization, revocation and transfer; platform roles confer no group override.

Actual PostgreSQL18 independent-worker/HTTP proof:25 tests PASS, with observed lock waits, invitation contention/replay/expiry, immediate revocation, quotas, transfer rollback, direct invalid constraint writes and migration down/up in an isolated synthetic schema. Cleanup of that schema verified residual0. Phase20/private regression47 PASS. Frontend408 tests and local native browser116 checks PASS, vi/en seven widths320/375/390/412/768/1024/1440, keyboard dialog focus/Escape/return, labels/headings, long content and full synthetic lifecycle. See [EVIDENCE.md](EVIDENCE.md) for failures, corrections, exact commits and CI.

## TEST deployment and rollback

BackendPR44 main `e30d0a41a760a8e0c9e36f0b841fa85ba270db37`, Render TEST deployment `dep-db2t4rc9v7es73a69mog` LIVE at exact revision. Approved TEST identity was checked before the established checksum runner applied sole migration0027;27 migrations recorded. FrontendPR28 main `fc9e408ed04fc56e53562848c208e2f29b4bf5b2`, Vercel Ready deployment `8Pqj3wwN22r4mLMJUWWjaA3KieZs` exact source, canonical TEST URL `https://cong-dong-ngon-ngu-sigma.vercel.app`. Provider Production labels do not change the owner-approved TEST classification.

Rollback to previous Backend deployed `d56fc2c518a617018d6926bf63b482572268a1ef` and Frontend baseline `7cf66654da6419ca5447673e5d3782560856b4bc` disables the new journey. Leave additive tables intact; no destructive downgrade of retained data. Rollback was documented, not executed. No secret/provider/payment configuration was changed.

## Bounded limitations and release hold

Retained owner groups2; active memberships20 per account/group; retained invitations/texts/reports20 per group; page size1–20. Archive denies protected access while retaining records and owner quota; LEFT/REMOVED tombstones remain. Disabled affected accounts cannot be removed/promoted/transferred under the frozen ACTIVE-account rule; disabled owners need account recovery or separately reviewed policy. Fixed60-second rate counters bound this pilot, not comprehensive abuse prevention. List ACL rechecks cause at most20 additional queries; no scale/latency benchmark claimed.

No group search, notification projection, cache, realtime subscription, provider invitation email, upload/audio, AI/export or erasure workflow was introduced. Existing notification shell behavior remains unchanged. Global block policy, backup/retention/deletion guarantees for real private persistent data and real-user rollout remain UNPROVEN_HELD. Real-user usefulness, retention and moderation effectiveness are not proven. Production database/mutations and financial operations were not authorized; payment remains disabled.

Phase20/21 DONE/GO history is preserved. Phase23/24 execution remains unauthorized and unstarted. Stop at the Phase22 major boundary after technical TEST closeout.

## Final TEST result

Deployed native browser117 checks PASS, all seven widths in vi/en, zero page errors. Exact guarded cleanup of four synthetic actors/four groups PASS with all eight scoped table counts0; credentials redacted. Local browser116 PASS. Numeric colour contrast and screen-reader testing remain unperformed; do not infer full assistive-technology certification. Final Workspace PR/main CI and branch cleanup must be verified by the coordinator before terminal completion.
