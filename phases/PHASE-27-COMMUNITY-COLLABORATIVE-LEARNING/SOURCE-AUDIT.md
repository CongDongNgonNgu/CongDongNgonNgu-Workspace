# LNG-27-001 source audit

2026-10-13 Asia/Saigon. Static audit of actual clean Backend/Frontend main, with focused existing tests recorded in [EVIDENCE.md](EVIDENCE.md). No live database/user data accessed, no deployment performed. This audit cannot establish corpus cardinality or runtime query latency. File references below are relative to the named repository and fixed by its baseline SHA.

## Baselines and preflight

Remote git ls-remote main and local HEAD matched Backend0f426b5345a38ab445b2a557fa848466187ffbe3, Frontendcc163d7f26648337c8d35c7416f0268776f4cf7b, Workspacef286f3a842a77b669667fc454564969b3408521d. All local trees initially clean/main. Backend AGENTS.md absent; Frontend AGENTS.md read; Workspace canonical AGENTS/working rules/state/schema/dependency/decisions/V3 roadmap/index/current dossier read. No AI-DOS manifest or project skill roots. Installed using-agent-skills, documentation-and-adrs, api-and-interface-design, security-and-hardening, git-workflow-and-versioning and code-review-and-quality applied. No product code changed.

Inherited authoritative references: Phase22 POLICY-CONTRACT.md/EVIDENCE.md/HANDOFF.md; Phase23 RELATION-CONTRACT.md and canonical eligibility; Phase24 HANDOFF.md localization evidence; Phase25 READINESS-CONTRACT.md/category acceptance limitations; Phase26 CONTRACT.md/HANDOFF.md/VERDICT.md and accepted current-main communication. Historical roadmap letters conflict with dossier numbering; explicit owner request and dossier001-006 order govern. This continuation explicitly disables historical automatic chaining/relay into002. No message to another person is required.

## Backend findings

| Area | Observed current source | Consequence |
|---|---|---|
| Type inventory | src/community/community.types.ts:1-10 and database/migrations/0003_community.sql enum | DISCUSSION,QUESTION,RESOURCE,LEARNING_JOURNAL,CULTURE,PRONUNCIATION_REQUEST,CORRECTION_REQUEST,CHALLENGE; enum normalization rejects unknown |
| Post state | community.types.ts:45; community.normalization.ts:56; migration0003 | PUBLIC/PRIVATE, ACTIVE/HIDDEN/DELETED, language FK, nullable CEFR/topic; content20000, topic80 normalized slug; no tags/title/group relation |
| Reads/list | community.service.ts:182,209,514,713; postgres-community.repository.ts:188 | Public SQL ACTIVE post/language/author; verified-author check is later service projection; private detail author-only; current list20/max50, created_at/id DESC |
| Existing search | community.dto.ts ListPostsQueryDto; community.repository.ts; postgres-community.repository.ts:188 | Only languageCode,limit,cursor. No q/postType/topic/response-state/useful/activity query. No Community full-text/trigram index |
| Save | postgres-community.repository.ts:216,449; community.service.ts:439,455; migration0003 community_saved_posts | Existing current-user saves, separate endpoint; saved author-private post possible. No need for new save domain |
| Votes | community.service.ts:401; postgres-community.repository.ts:249,428 | Post helpful permits self-vote; count existing HELPFUL rows regardless current voter state; distinct response votes |
| Comments | community.service.ts:279-365; postgres-community.repository.ts:365; migration0003 | Exact parent same post, ACTIVE root only, depth0/1.20 roots/page,20 replies/root preview, hasMoreReplies. No reply continuation API. Tombstone versus hidden behavior differs |
| Cursors | community.pagination.ts:8-49; corrections.service.ts decode cursor | Base64 JSON v1 timestamp/UUID,<=512, validates shape but unsigned and not bound to post/filters. No authenticated hidden-position protection today |
| Structured domain | corrections.types.ts; migration0004 | Independent response IDs/table, QA_ANSWER vs CORRECTION_PROPOSAL; correction original immutable and context persisted; composite acceptance FK + partial active uniqueness |
| Structured writes | corrections.service.ts:284-380; corrections.controller.ts | Active verified non-requester, kind/parent/unchanged-correction validation. Answer/corrected20000 code points, explanation5000. No reply/edit/delete/report route |
| Helpful/accept | corrections.service.ts:439-593; postgres-corrections.repository.ts:310-469 | Own response vote denied; requester-only accept/unaccept. Parent/response locks serialize replacement, same-response retry idempotent; no expected-version CAS |
| Acceptance limitation | postgres-corrections.repository.ts:313-328 versus service.ts:491-533 | Locked query checks existence/scope, does not repeat full current parent/response/author eligibility. Sequential unit tests do not prove moderation/account-disable races |
| Response lifecycle | corrections.service.ts:678-740; postgres-corrections.repository.ts:474 | HIDDEN omitted; deleted/inactive author produces contentless tombstone. Moderation invalidates Library candidates but does not revoke acceptance row; eligible JOIN needed for search |
| Reports/moderation | community.types.ts report enum; community.moderation.service.ts; src/admin/admin-moderation-action.service.ts:82-131 | POST/COMMENT report domain; trusted capability actions for Community post/comment and Library. Structured storage setter is not a public response moderation/report UI/API |
| Existing PostgreSQL text search pattern | migration0010_library_search.sql; src/library/postgres-library.repository.ts:683 | Escaped ILIKE and pg_trgm already used first-party; Community needs its own reviewed indexes/query evidence later |
| Group model | study-group.types.ts; migration0027; study-group.service.ts; study-group.store.ts | Six existing tables incl rates; no visibility/language/topic field, no discovery; ACTIVE/ARCHIVED lifecycle and ACTIVE/LEFT/REMOVED membership |
| Group text | study-group.service.ts listTexts/createText/hideText | Plain REST body2000, retained20 texts/group, createdAt/id ASC. Fetches scoped rows then paginate; bounded finite pilot, no realtime/unread/reply/reaction/reference/notifications |
| Group authority | study-group.store.ts:43-55,84-124; service scoped/remove/changeRole/transfer/accept | Account ACTIVE then group locks/current membership, exactly one owner SQL. No platform admin override. Current group account lock does not itself require email verification |
| Invites | service insertInvitation/acceptInvitation/issueConnectedPartnerInvitation | Random32-byte256-bit bearer, SHA256 digest,24h, one-use explicit redemption, capacity and removed denial. Partner convenience uses Phase26 pair eligibility but native private join does not consult Exchange blocks |
| Notifications | community.service.ts:572; corrections.service.ts:743; notifications/notification-event-integration.ts:146-159 | General comment/reply and accepted response events; no new-answer/group event. Self comment notice skipped |
| Notification privacy gap | notifications/connection-notification-access.ts projectCurrentNotification | Current reprojection protects BUDDY_REQUEST/BUDDY_CONNECTED/DIRECT_MESSAGE; legacy Community notices bypass it and retain snapshots. No universal current-ACL notification claim |
| Sharing/safety | Phase26 src/messaging canonical context resolver; src/exchange directed blocks | Only PUBLIC DISCUSSION/QUESTION and eligible canonical Library refs for Phase26 sharing. Exchange blocking not global Community/group membership policy |

## Frontend findings

| Surface | Source | Observed behavior |
|---|---|---|
| Feed/navigation/filter | features/community/pages/CommunityPage.tsx:45-68,122-150; hooks/useCommunityFeed.ts:38-99; api/community-api.ts | URL languageCode -> Backend bounded feed/load-more with request guards; groups/question/correction links. No text/type/topic/state/useful search UI |
| Creation/edit | components/CommunityComposer.tsx; pages/CommunityQuestionRequestPage.tsx; CommunityCorrectionRequestPage.tsx; CommunityPostDetailPage.tsx edit handlers | Generic type/content/language/topic/visibility composer, specialized structured request creation; author post-content edit. Correction metadata remains separate immutable original |
| Structured mount/competition | CommunityPostDetailPage.tsx:912-980 | Normal body then StructuredResponseExperience then always-visible general discussion/composer; question/correction still have two response paths |
| Duplicate original | components/StructuredResponseExperience.tsx:75-78,223-227 | originalText falls back to parent.content for QUESTION and rendered again under originalBlock; corrections fetch immutable source/context |
| Editor | StructuredResponseEditor.tsx:16-17,89,98 | Proposal5 rows, answer6, explanation4 always visible; Unicode counters versus native UTF-16 maxLength mismatch; optional explanation not collapsed |
| Response cards | StructuredResponseCard.tsx | Correction diff or answer, separate helpful and requester acceptance/candidate nomination; no answer-specific discussion/reply |
| General comment UI | CommunityPostDetailPage.tsx:587-730 | One-level reply, own edit/delete and report, bounded reply preview; no response-ID reuse |
| Saved/helpful | CommunityPostCard.tsx; CommunityPostDetailPage.tsx | Existing post actions and viewer state; entity-level controls must remain distinct from response helpful |
| Locale | CommunityPage.tsx; CommunityPostDetailPage.tsx; structured/request components/constants | Predominantly hardcoded Vietnamese; groups link localized, not whole destination. EN target remains NOT_ACCEPTED_FROM_PHASE25 |
| Group UI | features/study-groups/pages/StudyGroupPage.tsx; components/GroupTextPanel.tsx; hooks/useGroupResource.ts | Existing localized vi/en group member/text/report/invite controls; REST refresh, generation/scope guards clear access loss; no realtime/unread/share/ref/reaction/reply |

## Disposition

The freeze intentionally chooses no structured-response replies, preserves general discussion as secondary, and keeps all groups private/invite-only. These are deliberate allowed bounded decisions, not missing implementation to invent in001. Later002 must resolve the affected UX/Unicode and acceptance-race gates;003 adds server query support/index/cursor/privacy proof;004 extends existing text/read/stream references;005 verifies private visibility and documents discovery deferral;006 exercises the selected model. Existing-source gaps are carried into the threat/acceptance plan, not concealed by contract PASS. Screen-reader/browser/query-cost/SQL-runtime acceptance for Phase27 has not run in001.
