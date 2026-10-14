# Phase27 final selected-contract acceptance

Technical verdict GO_BOUNDED_COLLABORATION; independent review APPROVE; all fixture cleanup residual0. Completion is conditional on the final Workspace lifecycle documented in [FINAL-CLOSEOUT.md](FINAL-CLOSEOUT.md). [006 acceptance](ACCEPTANCE-006.md) records exact source/deployment/evidence/limits.001–005 DONE;006 DONE after final Workspace merge/mainCI/branch cleanup/sync. No Phase28/29.

## Historical001 audit and planning snapshot — superseded for current completion state

# Phase 27 — Community & Collaborative Learning Completion

**Status:** IN_PROGRESS / verdict NOT_REACHED. Owner authorized001-006 on2026-10-13; this continuation executes001 only.001 DONE/002 READY effective after final Workspace PR/mainCI/cleanup/sync recorded in PR/terminal report; before then001 VERIFYING.

## Current freeze

[Contract](CONTRACT.md), [source audit](SOURCE-AUDIT.md), [threat model](THREAT-MODEL.md), [test plan](TEST-PLAN.md), [evidence/review](EVIDENCE.md), [task states](TASKS.md). Eight source-defined types; option A: no structured-response replies, collapsed general discussion secondary. Group domain remains private/invite-only; public/request discovery and group replies/reactions deferred. Existing Community/Q&A target English remains unaccepted. Prior planning candidates below are narrowed by this freeze. No product code/schema change in001.

## Objective

Make Community and Study Groups coherent learning spaces instead of overlapping discussion surfaces. Complete search/filtering, structured-answer interaction, compact response UX and multi-person collaboration without weakening existing privacy contracts.

## Planned subphases

### LNG-27-001 — Community interaction model freeze
Audit current post types and define one clear interaction model for:
- DISCUSSION: comments/replies are primary;
- QUESTION: structured answers are primary;
- CORRECTION_REQUEST: correction proposals are primary;
- other existing post types only as supported by source.

Remove or demote duplicate interaction surfaces. For QUESTION/CORRECTION_REQUEST, avoid showing a large generic comment composer above the primary answer/correction flow unless explicitly justified. Preserve existing one-level comment reply model where useful.

### LNG-27-002 — Structured answer UX completion
For QUESTION/CORRECTION_REQUEST:
- remove duplicated rendering of the original question when already visible in the post header/body unless comparison context requires it;
- rename/organize sections so `Thảo luận`, `Câu trả lời`, `Phản hồi` have distinct meanings;
- compact answer editor: initial 2–3 rows, auto-grow to bounded max height, then internal scroll;
- optional explanation may be collapsed behind `Thêm giải thích`;
- preserve useful/accepted-answer semantics;
- preserve existing general discussion collapsed as secondary; no structured-response reply API (option A);
- no infinite Reddit-style nesting.

### LNG-27-003 — Community search & filters
Implement Backend-backed search/filter/pagination for accepted fields such as:
- text/query;
- language;
- post type;
- topic/tag where actual data exists;
- unanswered / answered / accepted-answer where supported;
- saved by current user where supported;
- sort: newest / useful / activity where query/index evidence supports it.

Do not load the full feed and filter only in the browser. Add query/index/performance evidence and safe enumeration boundaries.

### LNG-27-004 — Study Group collaboration upgrade
Reuse Phase22 groups; do not create a second group system.

Add bounded collaboration as approved:
- group realtime text conversation or approved message stream;
- unread/navigation;
- flat group text; reply/reaction deferred by001;
- share authorized Language Hub/Library/Community content into a group;
- invite connected partners through the existing owner-only invitation policy;
- preserve owner/moderator/member and revocation invariants.

### LNG-27-005 — Group visibility/discovery contract
Before public discovery exists, freeze explicit visibility states such as:
- PRIVATE / invite-only;
- JOIN_BY_INVITE or request-to-join if approved;
- PUBLIC_JOINABLE only if separately proven safe.

Existing private Phase22 groups must never become publicly searchable by default. Implement search/discovery only for visibility classes explicitly authorized by the contract.

### LNG-27-006 — Collaborative runtime/browser acceptance
Synthetic multi-user scenarios:
- question -> answer -> collapsed secondary general discussion;
- discussion -> comment -> one-level reply;
- correction request -> proposal -> collapsed secondary general discussion;
- search/filter/pagination combinations;
- create/join/invite group;
- group message/share learning content;
- remove/block/revocation;
- cross-group isolation;
- vi/en and seven widths.

## Acceptance

- no ambiguous duplicate primary response workflow on QUESTION/CORRECTION pages;
- compact auto-growing editors behave accessibly and responsively;
- structured-answer reply model is bounded and authorization-safe;
- Community search/filter executes server-side with bounded pagination and reviewed indexes/query costs;
- Phase22 privacy/ownership/revocation invariants preserved;
- no private group discovery leak;
- zero known accepted-case cross-post/cross-group IDOR leaks;
- all synthetic fixtures cleaned.

## Out of scope

- Voice/video rooms;
- unlimited nested threads;
- AI-generated answers/moderation;
- automatic public exposure of private groups;
- full-system simulation (Phase28);
- payment/production activation.

## Current continuation boundary

STOP after LNG-27-001. Standing later Phase27 authorization persists, but002-006 are not started here.005 retains private-only group visibility and verifies discovery/join deferral; it does not authorize public exposure. Phase28/29 unauthorized/unstarted.

## Exit verdict

`GO_BOUNDED_COLLABORATION` / `DEFER` / `REJECT`
