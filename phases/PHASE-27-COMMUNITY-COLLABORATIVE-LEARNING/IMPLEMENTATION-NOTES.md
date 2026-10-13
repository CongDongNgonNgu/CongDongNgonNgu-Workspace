# Phase27 implementation notes

2026-10-13. Read-only independent source planning; implementation and verification remain pending. These clarify the frozen contract under the active002?006 continuation.

## Search003

Extend the existing posts list response. Normalize and bind q/language/type/topic/QUESTION response state/current-user saved/sort/limit in encrypted AES-GCM cursors derived from existing access-secret with separate domain. Current continuation requires final rejection of unsigned legacy list cursors; stale clients refresh. Shared comment/Corrections cursor consumers must be assessed separately. Combined search is PUBLIC-only; legacy author-private saved endpoint remains distinct. Complete author verified/active, language active, post active/public and response author/type/state/acceptance eligibility belongs in SQL before LIMIT. Literal escaped parameterized ILIKE; no tags/ACTIVITY/count totals.

Keyset timestamps preserve database microseconds independently of public ISO Date serialization. USEFUL ranks post helpful count, then exact created_at/id; mutable scores have no snapshot promise and client deduplicates with explicit refresh. Scoped statement timeout and representative isolated TEST EXPLAIN/ANALYZE must establish query cost rather than assuming LIMIT bounds ranking. Next migration number is0037 after existing0036; inspect existing indexes before adding owned indexes.

## Group004

Extend existing group/text/membership storage with group sequence/version, optional client UUID/reference pair, and durable last-read position. Existing memberships initialize at current head to avoid invented historical unread; fresh LEFT rejoin also starts at head. References remain type/id only; no snapshots. Preserve20 retained texts and current ownership/invite/report/rate constraints.

Sequence catch-up alone cannot remove previously rendered text after hide. Clarification: bounded sync accepts at most20 current rendered IDs and returns only IDs still eligible plus a bounded new-sequence page. It exposes no hidden body/reason/count. Validate same-group scope; client removes missing rendered entries. This supports version-only hints without repeated whole-history download. Exact DTO/response and race tests must be reviewed before implementation.

Existing direct stream lease table requires a conversation FK. Adapt it to exclusive conversation/group targets with XOR constraint and nullable conversation FK, retaining one actor-wide live lease count10 across both domains. Acquisition serializes actor row before group/pair; no independent extra group allowance. Reuse neutral stream transport/service/provider pieces without importing an entire direct domain or copying a second message store.

Group lock order stays sorted account rows, group, membership/text, then rate/lease. Canonical resolver performs current bounded reads without acquiring group/pair locks. Do not imply atomic cross-domain content recall. Current membership/session checks on subscribe/tick/REST and purge on loss remain mandatory.
