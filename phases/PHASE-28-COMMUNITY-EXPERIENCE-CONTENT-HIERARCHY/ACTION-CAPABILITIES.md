# Phase28 action capability contract

Recorded 2026-10-16 Asia/Saigon. LNG-28-001 source/deployed audit; frozen before UI implementation. This is a presentation contract over existing backend authorization, not a new permission grant.

## Source baseline

- Workspace a25b8401da1b89d01bf24641d0e46b2cb05d292f.
- Frontend fde1131a717d94569bb6a6c89f1a1021673215a3.
- Backend b3be9e28c6c4596ded3ed35726c57846ec8870da.
- All fetched remote main heads equal clean local main at preflight. No AI-DOS manifest or repository-local skill roots observed. Backend AGENTS.md absent; Workspace baseline applies.

## Supported types and primary response

| Persisted type | Primary response | One-level general comment reply | Structured helpful / acceptance | Partner share eligible type |
|---|---|---|---|---|
| DISCUSSION | Comment | Yes | No | Yes |
| QUESTION | QA_ANSWER | Secondary, initially collapsed | Yes | Yes |
| CORRECTION_REQUEST | CORRECTION_PROPOSAL | Secondary, initially collapsed | Yes | No |
| RESOURCE | Comment | Yes | No | No |
| LEARNING_JOURNAL | Comment | Yes | No | No |
| CULTURE | Comment | Yes | No | No |
| PRONUNCIATION_REQUEST | Text comment; no audio implied | Yes | No | No |
| CHALLENGE | Comment; no event enrollment implied | Yes | No | No |

Post HELPFUL, saving, public canonical-link sharing and reporting are type-independent. Sharing with a study partner is deliberately narrower than copying a public link. Backend `communication/learning-context-resolver.ts` permits only currently eligible PUBLIC DISCUSSION/QUESTION, and rechecks canonical access on send/read/open. Current connection/message authorization and recipient selection still apply. Sharing never grants access.

## Actor and visibility matrix (all eight types)

| State | Post helpful | Comment/root/reply | Save | Public link share | Study-partner share | Report | Structured submit | Accept/revoke |
|---|---|---|---|---|---|---|---|---|
| Anonymous public reader | Sign-in intent | Sign-in intent; depth1 only | Sign-in intent | Yes, server recheck | Hidden (requires authenticated exchange context) | Sign-in intent | Sign-in intent for QUESTION/CORRECTION | Hidden |
| Active verified non-owner, public | Yes | Yes; depth1 only | Yes | Yes, server recheck | Only DISCUSSION/QUESTION + live communication checks | Yes | Exact kind; not own request | Hidden |
| Active verified requester/owner, public | Yes, own-post vote preserved | Yes | Yes | Yes, server recheck | Only DISCUSSION/QUESTION + live communication checks | Backend permits; use owner edit/delete menu in detail | No own structured response | Only eligible own-parent response, backend canAccept |
| Active verified owner, private | Yes | Yes | Yes | Hidden / denied | Hidden / denied | Backend permits; owner management in detail | No own response; private ACL excludes contributors | Only if backend canAccept; no implied eligible contributor |
| Non-owner private / hidden / deleted / inactive parent-author-language | Unavailable | Unavailable | Unavailable | Denied | Denied/unavailable | Generic non-enumerating result | Denied | Denied |
| Expired/inactive/unverified session | Server rejects protected operations | Server rejects | Server rejects | Only independently public eligible read | Server rejects | Server rejects protected mutation | Server rejects | Server rejects |

Authentication boolean in UI is not proof of active/verified authorization. All mutations remain server-authoritative. Structured canVote/canAccept/canNominateCandidate fields remain authoritative affordances: own-response helpful forbidden; requester acceptance only; current response/author/parent eligibility required. Accepted content is not verified Library content. Moderators do not inherit requester acceptance rights.

## Frozen interaction decisions

- Preserve Phase27 option A: NO_REPLY_UNDER_STRUCTURED_RESPONSE. No response UUID passed as parentCommentId; normal comments/replies remain separate depth0/1 entities.
- Retain historical general discussion in a compact initially collapsed Additional discussion disclosure; no data deletion/conversion and no competing primary composer.
- Correction canonical immutable `correction.originalText` is the primary text; `correction.context` is canonical request metadata while `post.content` remains independently editable; distinguish optional context and avoid repeating it when equal to post content. Before/after comparison may be disclosed per proposal; corrected text and explanation stay clear.
- Shared UI capability helper must match this matrix, but cannot replace backend access checks. Unknown types must fail closed.
- Preserve server search URL state, backend filter semantics, encrypted scoped pagination, deduplication/stale response guards, and no corpus-total claims.
- Preserve Phase22 private groups, Phase23 provenance/license/public eligibility, Phase24 localization and Phase26 messaging boundaries.

## Source references

Backend: community.types.ts; community.controller.ts; community.service.ts (getPost/getShareLink/report/current projection); communication/learning-context-resolver.ts; corrections authorization/service. Frontend: community.types.ts; CommunityPostCard; CommunityPostDetailPage; ShareContextButton; StructuredResponseExperience/Card; GeneralDiscussion; community-search/useCommunityFeed.

Report edge: isReportTargetVisible checks moderation/visibility but does not recheck parent-author/language eligibility. A currently ACTIVE accessible target may still receive a persisted report after its author/language becomes inactive; generic success is non-enumerating. The matrix does not claim report storage is denied in that edge.
