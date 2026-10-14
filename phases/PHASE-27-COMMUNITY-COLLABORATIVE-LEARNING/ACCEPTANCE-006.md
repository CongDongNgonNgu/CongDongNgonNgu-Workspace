# LNG-27-006 bounded final acceptance

2026-10-14 Asia/Saigon. Status: VERIFIED_PENDING_WORKSPACE_LIFECYCLE.001–005 lifecycle completed;006 final verdict remains NOT_REACHED until the remaining gates below pass. Evidence is synthetic TEST acceptance, not production readiness or real-user value.

## Exact source and deployment

Backend main `b3be9e28c6c4596ded3ed35726c57846ec8870da`, main quality CI38500556591/job115646233395 PASS, Render `dep-db7eg6o473hc73d3ep60` Live in1m05s. Approved TEST ledger38 digest `7c9dd1152a6f45e4d9109df45da44f3c510635ab4594e2ed98f00fedc19c1428`. Health200/statusok.

Frontend final main `fde1131a717d94569bb6a6c89f1a1021673215a3`, PR45 candidate `ffa8da1cc6bcb790a93641bea199ed87f656579f`, identical reviewed tree `d7acdfabc6fe3e9f7425a04ab8d5bbf87c05244b`. Main quality CI38508253460/job115670609796 PASS. Native logged-in Vercel confirmed `CCa6eCELhbxEc6eWadWh8rWcNwbo` Ready/current domain/full SHA. Temporary product branches deleted, main clean and synced. Final FE137files/734tests, typecheck/build/performance budget PASS. Initial006 interactions used `ff261bf5f8cb686b15e2e0767740aff405fd5cab`; final accessibility/responsive checks used fde1131. PR45 changes only structured response colors/heading semantics and regression coverage.

Workspace baseline55783af5bf2e11c1fd34a349ce88c4d5ef88bd64 completed PR162/main CI38506681884/job115665683824 and branch cleanup for004–005. Final006 Workspace lifecycle remains pending.

## Fresh006 observed behavior

Run `64a866f0-a2b1-4f1a-a7f2-efd796edf621` created21 public posts through a reviewed API fixture helper, then A created one additional DISCUSSION through the native product modal. Ordinary synthetic A/B/C logged in through separate native browser contexts.

| Surface | Actual proof |
|---|---|
| DISCUSSION | Native create/view; B comment and A one-level reply; no reply control at depth1; API depth2 denied400 |
| QUESTION | B human answer and optional explanation; A response helpful1/requester accept; original question appears once; general discussion remains separate; A comment/B reply persisted |
| CORRECTION_REQUEST | B changed proposal and explanation; immutable original/diff visible; A accepts; secondary general comment remains separate |
| Comment-primary routing | DISCUSSION plus five other types natively show comment editors, with no structured-answer editor |
| Search | q/language/topic20 results, Load more21 unique before owned target privatization; accepted QUESTION1; current unanswered0/answered1/accepted1/saved2/useful20 |
| Group | A create/manual owner invite/B explicit acceptance; two-way multiline Unicode, current unread/read; committed text absent while B offline, caught up after restoration |
| Canonical sharing | Current Library card from prior public fixture read-only; owned Community card preview then generic unavailable/no old title after target made PRIVATE |
| Outsider/removal/archive | C generic denial/no metadata; removing B purged its group view; archiving cleared A's own group list |
| Exchange block | After explicit owner approval, scoped B profile/preferences prepared via existing APIs; native A block hides profile while B retains membership and sends group text; native unblock; independent group removal revokes access |
| Report | Ordinary C submits synthetic OTHER report; dialog closes and post remains visible; no privileged moderation/elevation performed |

[Native evidence](evidence-006-native.json) records70 final geometry combinations across feed/filter, discussion, question, correction and group: VI/EN ×320/375/390/412/768/1024/1440. No horizontal overflow/clipped actions; current labels observed; question original occurs once. The3-row answer editor grows to240px with internal scroll for2430 Unicode code points. Draft was cleared without submission. Prior005 [28 create/join form combinations](evidence-005-forms-native.json) remain applicable to unchanged forms.

## API, SQL reuse and accessibility

[evidence006-runtime-api.json](evidence006-runtime-api.json) contains30 passed checks plus1 documented NOT_RUN for pre-answer/pre-acceptance states already advanced natively. It covers depth2, self-helpful, nonrequester acceptance, all eight post filters, q/language/topic boundaries, current question states,20+1 newest/useful keysets, two owned saves, real saved-cursor actor/tamper/filter mismatches and anonymous saved denial. [Group denials](evidence006-group-denial.json):25 passed checks, B REMOVED/C absent, Exchange block cleared, scoped empty lists and11 protected group routes per actor denied uniformly.

Unchanged contract proof is explicitly reused: [002 acceptance](ACCEPTANCE-002.md) at backend41781d9869cbb378c746ee0f3c63559b03284358/frontend80e138a3f8f8564fbb1fa7ffd21296daebe509c7 supplies native QUESTION/CORRECTION creation, locale/disclosure/offline/draft/error/focus, cross-post/notification denials and competing-transaction acceptance races. [003 acceptance](ACCEPTANCE-003.md) at backendc9c9d136cf28bca9edb1210768a3274615f4d2c5/frontend2ee837896b6e21f85446ac72ee3ce22017d81d77 supplies isolated18-case filtering/privacy/state proof,10k corpus/9 EXPLAIN cases, encrypted-cursor and query-cost checks. [004 acceptance](ACCEPTANCE-004.md) supplies sequence/idempotency/capacity/current session/member/role/lease/reference revocation races and native same-tab canonical opening/session purge. Reuse is not claimed as a fresh006 rerun.

Initial006 Lighthouse95 revealed low-contrast eyebrow/accepted badge and h4 heading order. Reviewed PR45 repaired those with existing readable tokens and h3 comparison headings. Final Correction VI desktop and EN mobile each accessibility100/39 passed/zero failed; final feed EN desktop100/41 passed/zero failed. Lighthouse's automated accessibility checks are bounded; standalone axe and screen reader NOT_RUN. No full WCAG certification.

## Cleanup, review and final lifecycle

Cleanup PASS: the independently reviewed new Controller deleted the exact25-table/141-row fixture closure, verified residualRows0, and wrote evidence-006-cleanup.json. Manifest CLEANED; browser fixture tabs and Controller pool closed. The following failed attempt is retained as remediation history. Initial attempt failed closed on one unallowlisted `exchange_action_rate_limits` row and rolled back. Read-only exact closure diagnosis found141 rows/25 tables; only that literal table was excluded. The exact-name addition preserves fixture-ownership, foreign participant/notification, primary-key,2000-row and residual guards; independent review precedes a new Controller cleanup. No deletion committed in the failed attempt.

Fresh independent full-scope source/evidence review APPROVE. Technical disposition GO_BOUNDED_COLLABORATION; residual0 verified.006/Phase27 DONE is effective only after final Workspace PR/main CI/merge/tree/temporary branch cleanup/sync. The final terminal report records those actual results.

## Retained limits

[004 known limitations](KNOWN-LIMITATIONS-004.md): inherited same-cookie multi-tab refresh deferred separately from accepted one-tab-per-actor/same-tab navigation; Library native revocation not performed on unrelated prior fixture, isolated SQL revocation proof reused. Screen reader NOT_RUN. Privileged moderation native testing is not claimed. No production DB mutation, payments, paid providers, generated answers/moderation/translation/coach, voice/video or Phase28/29. Synthetic acceptance does not prove real-user usability/value or production traffic.
