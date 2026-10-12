# Phase 26 — Member Connection & Communication

**Status:** IN_PROGRESS — owner authorized complete Phase26 lifecycle;001–004 DONE,005 IN_PROGRESS,006 pending. Backend PR50 and Frontend PR37 are merged with main CI and branch cleanup passed;170 isolated SQL cases and639 Frontend tests passed. Local seven-width VI/EN UI proof is recorded. Reviewed TEST0036 migration is applied with ledger36 and all checksums verified; exact-main Backend deploy is underway. Workspace PR156 remains open. TEST runtime acceptance and final evidence remain pending. Current [contract](CONTRACT.md) and [evidence](EVIDENCE.md) govern execution. Genuine exact-main multi-account browser acceptance remains required in006. Stop after26;27–29 remain unauthorized and unstarted.

## Objective

Close the current dead-end after `Tìm bạn học` by delivering a secure human-to-human loop:

`Find partner -> profile -> friend request -> accepted connection -> 1:1 realtime conversation -> share learning context -> ask for help -> invite to bounded study collaboration`.

## Planned subphases

### LNG-26-001 — Connection/privacy contract
Freeze persisted states and authorization for:
- NONE / OUTGOING_PENDING / INCOMING_PENDING / CONNECTED / REJECTED or terminal equivalent / BLOCKED;
- duplicate request, crossed requests, cancel, reject, remove connection;
- block/report precedence;
- profile visibility and enumeration boundaries;
- notification contract;
- rate limits and abuse constraints.

### LNG-26-002 — Friend request & connection product
Implement Backend + Frontend:
- send/cancel/accept/reject friend request;
- connection state on member profile;
- incoming/outgoing requests;
- connected-partner list;
- remove connection;
- block/report;
- vi/en, responsive and accessibility.

### LNG-26-003 — 1:1 realtime messaging
Implement persisted direct conversations with:
- only authorized connected users;
- message history and bounded pagination;
- realtime delivery;
- reconnect/resume without duplicate messages;
- unread/read state where contract approves;
- deterministic ordering/idempotency;
- block/revocation takes effect on subsequent operations;
- no cross-conversation IDOR.

Choose the smallest provider-independent realtime architecture compatible with current Backend. External paid realtime providers are not implicitly authorized.

### LNG-26-004 — Learning-context sharing
Add `Gửi cho bạn học` from approved contexts such as:
- Language Hub content;
- Library/Related Resources;
- Community post/question;
- other explicitly public/authorized learning objects.

Shared messages must carry a stable content reference/card plus optional sender note/question. The recipient must be re-authorized when opening the target; sharing a card never grants access to otherwise private content.

Support practical learning loop: `send content -> ask "mình chưa hiểu chỗ này" -> reply in conversation`.

### LNG-26-005 — Connection safety, notifications & integration
- unread notification/navigation;
- request/message notifications;
- spam/rate limits;
- block/report tests;
- account/session/locale preservation;
- invite connected partner to existing Phase22 Study Group without weakening group owner/invite policy.

### LNG-26-006 — Multi-account realtime acceptance
With synthetic TEST actors prove:
- A requests B, B accepts;
- A/B can exchange realtime messages;
- refresh/reconnect preserves history;
- simultaneous send ordering is deterministic;
- unrelated C cannot read/send;
- block/revoke prevents subsequent send/read per frozen contract;
- learning-context card routes correctly;
- mobile/desktop + vi/en acceptance.

## Acceptance

- persisted friendship/connection uniqueness and race safety;
- zero known accepted-case cross-user/conversation authorization leaks;
- message privacy and pagination proven;
- reconnect/idempotency proven;
- block/report/rate-limit boundaries proven;
- content sharing does not bypass target authorization;
- Phase22 group authorization remains intact;
- no real-user-value claim.

## Out of scope

- Voice/video calling implementation; only architecture discovery may be recorded for a later separately authorized phase.
- Public group discovery redesign (Phase27).
- AI translation/AI conversation coach.
- Payment or production activation.

## Exit verdict

`GO_BOUNDED_COMMUNICATION` / `DEFER` / `REJECT`
