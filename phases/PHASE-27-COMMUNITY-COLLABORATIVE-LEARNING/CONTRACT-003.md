# Community search003 implementation contract

Extend GET/community/posts with optional q (trim,NFKC,120 code points), languageCode, postType (eight persisted values), normalized topic80, responseState UNANSWERED/ANSWERED/ACCEPTED (implies QUESTION; incompatible explicit type rejects400), savedByMe boolean, sort NEWEST/USEFUL, limit20 default/50 max and opaque cursor2048 max. Same {items,nextCursor}; no totals/facets/tags/ACTIVITY. savedByMe=true requires current active verified actor and reuses existing saves, while combined search is PUBLIC-only.

All current public/active post, active/verified author and active language predicates execute in SQL before LIMIT. QUESTION state counts only current eligible QA_ANSWER and active eligible acceptance. Escaped parameterized literal ILIKE content search; scoped1000ms statement timeout maps to safe COMMUNITY_SEARCH_RETRY503.

Authenticated encrypted domain-separated AES-GCM cursor binds normalized filters, sort, limit and saved actor. Reject unsigned legacy feed cursors; preserve unrelated shared pagination consumers. Keysets use exact PostgreSQL microseconds and UUID; USEFUL also includes post HELPFUL count. Public JSON dates remain compatible. No snapshot guarantee for mutable helpful ranking; client deduplicates and refreshes. Bounded refill advances last scanned cursor after projection omissions.

Frontend uses URL filter state and authoritative server requests. Filter/auth generation changes clear rows/cursor/loading-more and discard stale responses; creation refreshes instead of unconditional prepending. Paired VI/EN form labels, loading/error/empty/retry/reset states, responsive control containment and keyboard accessibility. Desktop/mobile Stitch review precedes visual implementation.

Migration0037 requires independent index review, representative synthetic isolated TEST EXPLAIN/ANALYZE before/after including short/common/no-match q, useful ranking, saved/question filters, caps and sort ties. No performance claim from unit tests or LIMIT alone. Implementation, SQL cost gate, deployment/native acceptance and integration remain pending.
