# Phase26 deployed acceptance — 2026-10-12

Genuine synthetic TEST browser acceptance on Backend `0f426b5345a38ab445b2a557fa848466187ffbe3` and Frontend `cc163d7f26648337c8d35c7416f0268776f4cf7b`. No product code changed in006. [Evidence index](EVIDENCE-INDEX.md) distinguishes native UI, supportive deployed API and unchanged-source SQL evidence. Final independent review and Workspace lifecycle govern completion.

## Native journeys

| Area | Actual evidence |
|---|---|
| Authentication/connection | Runs1/7/8: three distinct isolated contexts, ordinary verified MEMBER A/B/C, native email/password login and correct account labels; A requests, B accepts incoming request; both connected. No session injection or mocked browser API. |
| Realtime/order/history | Run1: native A→B and B→A without reload; near-concurrent native sends render identical canonical order, no duplicates; both reloads preserve history. |
| Reconnect | Run1: A offline through DevTools, B sends, A online recovers missed message automatically without reload/duplicates. |
| Unread/notifications | Runs1/8: A outside chat, B sends, generic notice; marking notice READ leaves chat unread1; opening history advances chat read. No private message/context preview. Existing open list is not claimed to poll live. |
| Context | Run1: native Vocabulary, Sentence and PUBLIC Discussion source Share→B picker→optional note→Send; B realtime cards open canonical Library/Community routes. Runs7/8: current private Community/disabled owned Library license refetch gives generic unavailable card, removes stale title and Open action, retains sender note. |
| Block/remove | Run7: native block clears B active history/composer and denies history/send/context/SSE; group membership retained. Unblock alone restores neither connection nor chat; deliberate native request/accept after real cooldown restores same history. Separate disconnect/reconnect preserves same stable conversation. Run8 additionally proves valid read sequence4 returns404 while blocked. |
| Eligibility | Run7: exact synthetic B NO_CONTACT and opt-out supportive API exceptions deny current protected operations, then restore canonical settings. |
| Report | Run7: native OTHER report accepted; relationship remains CONNECTED. No auto-block/remove/conviction inferred. |
| Group | Runs7/8: owner A selects connected B, issues token once per intended journey, explicitly copies; B manually enters group UUID and Ctrl+V in general acceptance UI, joins only on explicit submission. Run7 C used-token replay denied; B MEMBER and native-promoted MODERATOR plus C cannot issue owner-only invite. |
| Logout | Run7: native logout during active chat removes composer/history, both observed streams end; protected unauthenticated API401; normal native relogin restores eligible history. |
| Mobile | Run7 C sends and run8 B keyboard-sends at actual390×844; run8 B manually joins group at390. Native scroll makes composer/send reachable; center hit tests true. Desktop critical journey also actual. |

Group metadata read-only transaction in run8 observed two invitations, digest-only storage,24-hour TTL and exactly one B acceptance. No token/hash was selected. Raw token and clipboard were never read/exported; dismissal removed the secret input and restored trigger focus. Friendship itself granted no private group ACL/membership before acceptance. Source review and inherited Phase22 tests supplement these bounded observations; no browser storage or telemetry dump was taken.

## Bounded deployed negative matrix

Run7 unrelated C: detail/history/pagination/send/read/SSE/context/private group404. Connected B: current block/remove/eligibility denies protected operations. Nonowner MEMBER/MODERATOR/C invite issue404 with valid DTO, generic GROUP_UNAVAILABLE. Run8:

| Probe | Actual response |
|---|---|
| Extra forged senderUserId |400 HTTP_400 |
| Future read sequence |400 MESSAGE_INVALID_READ |
| Unsupported PRIVATE_GROUP context |400 HTTP_400 |
| Guessed Library resource |404 MESSAGE_CONTEXT_UNAVAILABLE |
| Foreign request acceptance |409 EXCHANGE_CONNECTION_ACTION_INVALID |
| Malformed Last-Event-ID |400 MESSAGE_INVALID_STREAM_CURSOR |
| Guessed conversation UUID/history |404 CONVERSATION_UNAVAILABLE |
| Private Community context send |404 MESSAGE_CONTEXT_UNAVAILABLE |
| C marking B notification read |404 NOTIFICATION_NOT_FOUND |
| A valid own after cursor control |200 |
| B replaying A before/after cursor |400 MESSAGE_INVALID_CURSOR both |
| B valid read while native A block active |404 CONVERSATION_UNAVAILABLE |

Run7 also proves valid source before cursor200 and foreign-conversation before/after400. Accepted cases show zero authorization leaks; this is bounded evidence, not a universal security guarantee. Successful core request/accept/chat/send/join actions used native UI. Supportive helper only performs bounded observations/negative probes and documented fixture exceptions.

## VI/EN, responsive and accessibility

Run8 has196 valid measurements:14 critical surfaces × VI/EN ×320/375/390/412/768/1024/1440 actual CSS pixels. Surfaces: profile NONE, incoming requests, share picker, chat/history/composer/card, connected group picker, issued invitation, manual group acceptance, unavailable card, connected profile, block dialog, report dialog, connected partners, notifications and unread conversation list. All have no document/main/dialog horizontal overflow. Measured visible buttons are at least44px tall; this does not claim every link/input has44px dimensions. Seven mistaken English incoming-list measurements are explicitly invalidated and excluded, then repeated with actual incoming Accept controls present.

Native keyboard verifies composer Send, modal focus trapping, Escape, secret dismissal and trigger focus restoration. Rendered history is chronological OL in polite role=log; associated composer label, textual state/unread and unavailable card present. Targeted DOM audit found no duplicate IDs/unlabelled visible controls in inspected chat, one h1 and correct locale. Report controls have visible labels. Desktop/mobile screenshots inspected inline; no saved PNG claim because connector rejected the file destination. AXE=NOT_RUN_TOOL_NOT_INSTALLED; SCREEN_READER=NOT_RUN. This is bounded accessibility proof, not WCAG certification. Same-actor multi-tab/back-forward supportive checks NOT_RUN: isolated actor contexts, route/reload/reconnect flows covered; no extra duplicate actor tab provisioned.

## Error and rate audit

Safe network URL/status metadata only, preserved last three navigations. A final audit: no console errors/failed fetch/XHR, streams200. B had three resource401 errors, native refresh201 then immediate same-route retries200 (req467–474). C had initial guest refresh403 and three idle token-expiry401, each native refresh201 and recovered notifications304/stream200. `src/features/auth/auth-api.ts` requestWithAuth implements the one-time401 refresh retry. These observed recovered/guest errors are disclosed, not a raw-console-zero claim. Unexpected unresolved failures0; no unexpected5xx observed. Deliberate negative probes/offline transitions remain separately classified.

Bounded native request/accept, four run8 native messages and active A/B stream200 smoke passed. Run7 native pair cooldown was respected by waiting real expiry. Exact high-count429/send/stream ceilings reuse unchanged003/005 SQL/API tests; no spam, counters/time mutation or weakened limits.

## Cleanup, provenance and gates

Runs1/7/8 strict owned cleanup each verifies27 residual tables allzero. Run8 manifest absent and private runner52168 CLEAN/EOF cleanup PASS/exit0. Interrupted runs2–6 also cleaned; no live synthetic fixture runner remains. Fixture-only Library publication is not moderation proof. Exact-run license helper initially rejected because id omitted; ownership reviewed, exact-id operation approved and scoped only to owned fixture. No denied action bypassed.

Final read-only preflight: approved Neon TEST direct instance/neondb/public/PostgreSQL180006, strict TLS,36 source/ledger digests match, no pending migration, payment disabled; NOT_APPLIED_PREFLIGHT_ONLY. Provider UI reconfirms Render Live dep-db6533flot8c738t4khg at exact Backend main and Vercel Ready2UzCngbrBSTLXBpyvA9FwBAys2hL/current domain at exact Frontend main. Provider Production labels do not enlarge owner TEST authorization; no provider configuration/deploy/restart changed in006.

Unchanged005 gates reused: Backend176 suites1099 unit,23 suites168 E2E,170 isolated SQL; Frontend125 suites639 tests; typecheck/lint/build/performance PASS; audit Backend20 inherited moderate, high/critical0, Frontend0. Exact-main CI rechecked: BE38195061092, FE38198975508 and Vercel success.005 WorkspacePR157 merged mainad3075f/quality38200504648 PASS; stale005 VERIFYING projection reconciled to DONE.006 Workspace monitor tests/PR/main CI/cleanup and final relay are recorded in the closeout PR/terminal report, avoiding a self-referential final SHA.

Synthetic TEST mechanics only: REAL_USER_VALUE_PROVEN=NO, REAL_USER_USABILITY_PROVEN=NO, PRODUCTION_TRAFFIC_PROVEN=NO. Community/Q&A destination EN remains Phase25 limitation. No006 schema migration, production/payment/provider activation, AI/translation/coach, voice/video or Phase27–29 work.
