# LNG-30-001 frozen capability matrix

2026-10-21. Rows are frozen design selections under CONTRACT-001.md, not shipped grants. Current application attachment capabilities remain unimplemented/defaultdisabled until002 enablement gates. Unknown domain/post types fail closed. Same entity/storage/protocol/read ACL for every enabled row.

| Owning content | Selected attachment eligibility | Read/access and lifecycle constraints |
|---|---|---|
| Community DISCUSSION | Images/video/TXT | Current parent visibility; author edit/remove/reorder only under existing post edit authority |
| Community QUESTION | Images/TXT; video unsupported | Post question context only; QA_ANSWER semantics unchanged |
| Community RESOURCE | Images/TXT | Existing Community visibility/author/language/moderation; not verified Library content; canonical Library references/promotion independently retain Phase23 eligibility |
| Community LEARNING_JOURNAL | Images/video/TXT | Current parent visibility; no fabricated progress/metrics |
| Community CULTURE | Images/video/TXT | Current parent eligibility; no publicization of foreign private objects |
| Community PRONUNCIATION_REQUEST | Bounded video only; image/TXT unsupported | No new audio recording/provider feature; unsupported codecs fail closed |
| Community CORRECTION_REQUEST | Supplementary images/TXT only; video unsupported | Never replace immutable canonical original/context; no attachment edit of frozen learning context |
| Community CHALLENGE | Images/TXT; video unsupported | Preserve existing challenge post semantics; no implicit event/upload subsystem |
| Ordinary comments | Unsupported | No inferred attachment grant |
| Structured responses | Held/unsupported | No attachment mutation of proposal/explanation/original; NO_REPLY_UNDER_STRUCTURED_RESPONSE |
| Private Study Group text | Images/video/TXT | Current ACTIVE member and exact group/text; hidden text OWNER/MODERATOR only; archived group denies all |
| Direct-pair message | Images/video/TXT | Exactly two current eligible connected participants; block/disconnect/account/session loss denies future reads |
| Learning-context reference | No file binding | Canonical reference eligibility is separate; never grants storage access |
| Independent multiparty group conversation | HELD_UNSUPPORTED_BY_FROZEN_CONTRACT | No route, table, permission or UI expansion |

Group text/DM send may associate an ordered list transactionally at creation. Bodies remain immutable. No after-send add/reorder/metadata edit is supported. Attachment-only author removal/tombstone is selected; it requires original uploader plus current exact-parent read and domain write authority and never deletes/edits the text. Group moderation hides the parent through existing role policy; no unreviewed platform-admin override. Community add/remove/reorder follows existing author post edit authority; correction canonical fields stay immutable. Canonical Library license/provenance/public eligibility cannot be satisfied merely by file ownership or an upload checkbox. Group/DM still require existing nonblank body/text or valid context; attachment-only send is unsupported.

All metadata, thumbnail, preview, range and download routes inherit parent authorization. Private Community posts stay author-only; group membership and direct connections are independent. Sharing copies canonical references only, never private blobs or signed URLs. Exact narrow format/byte/pixel/codec rules follow CONTRACT-001.md; no UI control may appear for held rows. Types/exclusions are frozen; select Stitch desktop/mobile targets before003.