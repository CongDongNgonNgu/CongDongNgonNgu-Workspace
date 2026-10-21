# LNG-30-001 capability matrix (proposed)

2026-10-21. All current attachment capabilities are UNSUPPORTED; rows below are proposals requiring freeze, not shipped grants. All types/limits remain UNAPPROVED. Unknown domain/post types fail closed. Same entity/storage/protocol/read ACL for every enabled row.

| Owning content | Proposed attachment eligibility | Read/access and lifecycle constraints |
|---|---|---|
| Community DISCUSSION | Candidate images/video/documents | Current parent visibility; author edit/remove/reorder only under existing post edit authority |
| Community QUESTION | Candidate images/documents; video held pending need/resource review | Post question context only; QA_ANSWER semantics unchanged |
| Community RESOURCE | Candidate images/documents | Public eligibility and Phase23 provenance/license; upload never becomes verified Library resource implicitly |
| Community LEARNING_JOURNAL | Candidate images/video/documents | Current parent visibility; no fabricated progress/metrics |
| Community CULTURE | Candidate images/video/documents | Current parent eligibility; no publicization of foreign private objects |
| Community PRONUNCIATION_REQUEST | Candidate bounded video only; image/document held | No new audio recording/provider feature; unsupported codecs fail closed |
| Community CORRECTION_REQUEST | Candidate supplementary images/documents only; video held | Never replace immutable canonical original/context; no attachment edit of frozen learning context |
| Community CHALLENGE | Candidate images/documents; video held | Preserve existing challenge post semantics; no implicit event/upload subsystem |
| Ordinary comments | Held/unsupported in this proposal | No inferred attachment grant |
| Structured responses | Held/unsupported | No attachment mutation of proposal/explanation/original; NO_REPLY_UNDER_STRUCTURED_RESPONSE |
| Private Study Group text | Candidate images/video/documents | Current ACTIVE member and exact group/text; hidden text OWNER/MODERATOR only; archived group denies all |
| Direct-pair message | Candidate images/video/documents | Exactly two current eligible connected participants; block/disconnect/account/session loss denies future reads |
| Learning-context reference | No file binding | Canonical reference eligibility is separate; never grants storage access |
| Independent multiparty group conversation | HELD_UNSUPPORTED_BY_FROZEN_CONTRACT | No route, table, permission or UI expansion |

Group text/DM send may associate an ordered list transactionally at creation. Bodies remain immutable. No after-send add/reorder/edit is proposed. Attachment-only author removal/tombstone is a new proposed capability requiring freeze; it requires current domain write authority and never deletes/edits the text. Group moderation hides the parent through existing role policy; no unreviewed platform-admin override. Community add/remove/reorder follows existing author post edit authority; correction canonical fields stay immutable. Resource license/provenance requirements cannot be satisfied merely by file ownership or an upload checkbox.

All metadata, thumbnail, preview, range and download routes inherit parent authorization. Private Community posts stay author-only; group membership and direct connections are independent. Sharing copies canonical references only, never private blobs or signed URLs. Final support can be narrower after review; no UI control may appear for held rows. Freeze selected types and exclusions before002 and select Stitch desktop/mobile targets before003.