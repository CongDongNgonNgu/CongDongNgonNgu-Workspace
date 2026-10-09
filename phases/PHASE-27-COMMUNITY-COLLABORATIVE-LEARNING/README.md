# Phase 27 — Community & Collaborative Learning Completion

**Status:** PLANNED — NOT EXECUTION AUTHORIZATION

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
- add one-level discussion/reply under structured answers if contract/security review approves;
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
- reply/reaction if bounded;
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
- question -> answer -> reply under answer;
- discussion -> comment -> one-level reply;
- correction request -> proposal -> discussion;
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

## Exit verdict

`GO_BOUNDED_COLLABORATION` / `DEFER` / `REJECT`
