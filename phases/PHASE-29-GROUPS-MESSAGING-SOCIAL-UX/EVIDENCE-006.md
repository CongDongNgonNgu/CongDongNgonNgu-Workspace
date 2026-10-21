# LNG-29-006 integrated TEST acceptance

Recorded 2026-10-21 Asia/Saigon. Status: VERIFIED_PENDING_WORKSPACE_LIFECYCLE. LNG-29-001 through 005 are DONE; 006/Phase29 final technical acceptance is approved with selected verdict GO_SOCIAL_COMMUNICATION_UX. DONE becomes effective only after final Workspace merge/main CI/exact tree/temporary branch cleanup/terminal relay. No future publication result is claimed; stop after Phase29/no Phase30+.

## Exact source and deployed TEST

Frontend main 5b7b41b85604801055b463111f808a504bf579b5; Backend main b3be9e28c6c4596ded3ed35726c57846ec8870da; Workspace starting main c57ce95cf06521d9e947f3243b634b41b26d7fb9. Root fetched/pruned all three remotes again and found no newer revision; Frontend/Backend main are clean and the Workspace feature branch contains only authorized evidence changes.

Root freshly browser-verified Vercel EVNk2ibqLYfQBj4NRcutCQmXkvk5 Ready/Latest/Current at exact Frontend main with sigma alias, and Render dep-db7eg6o473hc73d3ep60 Live/last successful at exact Backend main. Normal existing GitHub sign-in was used; no new authorization grant or credential extraction. A stale CUA-tab timeout was not counted as provider PASS; the successful fresh dashboard supplied the proof.

## Gates and independent source review

Current exact-main Frontend full suite: 146 files/827 tests PASS in 165.31 seconds. Build/typecheck, lint, performance and audit passed; zero vulnerabilities. Initial JS 537697 raw/150314 gzip bytes; CSS 67485 raw/11093 gzip bytes. The existing 500kB chunk notice is advisory. No 006 product or Backend/schema change was introduced. Root Workspace monitor syntax check, 12 monitor tests and diff check passed on 2026-10-21.

[Final source/security review](REVIEW-FINAL-SOURCE-006.md) records independent phase-wide source inspection and preserved authorization/component/localization boundaries. [API review](API-REVIEW-006.md), [history review](HISTORY-REVIEW-006.md) and the tooling registry distinguish independent offline/source/artifact checks from root live execution. No independent native browser execution is claimed.

## Authorization and isolation evidence

The final [REST audit](API-AUDIT-006.json) passed 194/194 cases, including 104 strict denials and 84 protected reads across all seven synthetic roles, two distinct private groups and two distinct direct rooms. Unexpected allows, contract mismatches, unauthorized protected responses, cross-group leaks, cross-conversation leaks, unauthenticated leaks and unverified denial messages are zero for executed assertions. Revoked/left coverage contains 17 protected denials with zero recorded leaks.

The [stream-denial audit](STREAM-AUDIT-006.json) passed 20 setup/login/terminal actions and 19 unique denied stream probes: nine group and ten direct, including four truly anonymous requests. Protected-stream, cross-group, cross-conversation, unauthenticated and unverified-denial leaks are zero. Strict canonical 401/404 envelopes contain no response data; unexpected 2xx would fail. These results prove denied endpoint isolation, not authorized SSE payload or Last-Event-ID behavior.

The first API attempt was interrupted during setup for an unknown cause. [Attempt audit](API-AUDIT-006-ATTEMPT-1.json) and [its cleanup](FIXTURE-CLEANUP-006-ATTEMPT-1.json) remain preserved alongside the successful run; no successful case is invented for the interrupted attempt.

## Native flows and responsive evidence

[NATIVE-006.json](NATIVE-006.json) contains 161 persisted flat frames, 23 observations and four contrast measurements. All frames have zero recorded horizontal overflow. Widths are 320/375/390/412/768/1024/1440. Actual retained surface/locale coverage is:

| Surface | VI frames | EN frames | Qualification |
|---|---:|---:|---|
| Authorized group index; create dialog | 7 each | 7 each | All seven widths |
| New empty group discussion | 0 | 7 | EN only; do not relabel VI coverage |
| Members; invitation metadata; empty reports | 7 each | 7 each | Actual selected-panel assertions |
| Long Unicode group discussion | 14 | 0 | Two VI batches; not EN or 14 distinct width cells |
| Left-group unavailable | 7 | 7 | Generic private-access boundary |
| Messaging inbox; loaded long Unicode direct history; information dialog | 7 each | 7 each | All seven widths |
| Guest direct sign-in boundary | 7 | 7 | No history or participant identity |

A requested member batch initially preserved Discussion; its actual classification is retained and a fresh selected-member batch was run. The initial broad header selector included the nested group content header; four raw Archive-versus-fixed-navigation intersections at normal scroll are retained. Later site-header-only measurements are separate. Therefore horizontal overflow is zero, while a blanket zero-overlap claim would be false. Guest private-group sign-in boundaries were observed separately; they are not invented as another persisted seven-width surface.

Root used normal UI logins and native create/manual one-use invite acceptance, Unicode group text, real unread/mark-read, moderator assignment, ownership transfer and leave. Invited/nonmember views were generic before acceptance; departed/removed views cleared private content. A stale Leave target and stale context click were not counted as successful actions; fresh actual targets supplied the subsequent proof.

The authorized connected pair exchanged native Unicode text/reply and a Community learning-context card through the normal partner-share flow. Context Open content rechecked access and navigated to the owned canonical post; making it private removed preview/open access. Native reply appeared without navigation; the actual stream returned HTTP200, recorded separately from unexecuted protocol payload tracing. Reviewed normal API history preparation created 28 messages at sequences4-31; native pagination loaded 30 then31 and removed the exhausted control. Actual offline send failed, explicit thread recovery preserved the same-client-ID draft, and Retry send persisted one message: reviewed final history has 32 distinct sequences1-32 with one retry-text occurrence.

Normal block and member removal each exercised four API operations: three protected reads and one send, all strictly denied with zero recorded leaks. Native block closed information, removed history and emptied the inbox; native removal cleared group name/composer. Normal Hoa-to-An logout/login in the same context showed no observed stale private-state leakage. Backend API tests cover all seven roles; native UI sessions do not cover every role.

Keyboard/dialog checks include Shift+Tab wrapping, Escape dismissal, visible focus and focus return; mobile Send and close targets were44px, menu links48px, with hit testing clear of fixed navigation after focus scrolling. Representative measured contrast ratios are12.07 (heading),9.66 (link),12.75 (composer label) and10.20 (information button). This is bounded accessibility evidence, not formal WCAG certification or physical-device testing.

## Exact-owned cleanup

| Run | Selected rows | Tables | Residual |
|---|---:|---:|---:|
| Interrupted API attempt | 14 | 2 | 0 |
| Final REST audit | 124 | 22 | 0 |
| Supplemental stream-denial audit | 95 | 17 | 0 |
| Native acceptance | 199 | 22 | 0 |

Each run has its own cleanup artifact and CLEANED local manifest. Native run 1a33141b-3811-4b51-9427-a4b140294f05 includes86 owned auth sessions and32 direct messages in its selected closure. Owner and An logout were observed; browser pages closed before connected logout could be verified. No connected-logout PASS is claimed; guarded cleanup removed all owned sessions and dependents, with every residual zero. See [native cleanup](FIXTURE-CLEANUP-006-NATIVE.json), [REST cleanup](FIXTURE-CLEANUP-006-API.json) and [stream cleanup](FIXTURE-CLEANUP-006-STREAM.json). Strict TLS, PostgreSQL180006 and the exact38-file ledger remain recorded. Root additionally checked all 12 local Phase29 runtime manifests: every state CLEANED, every residual zero, OPEN count zero. No unrelated historical TEST or production data was modified.

## Limits and remaining lifecycle

Independent multi-party group conversation remains UNSUPPORTED/HELD under [005 disposition](EVIDENCE-005.md); existing private Study Group collaboration and canonical direct pairs remain distinct. No media/upload work, fabricated presence/read receipts or authorization through context links was added.

NOT_RUN: English long group discussion at all seven widths (English empty/member/invitation/report surfaces are separately measured), formal WCAG/axe/screen-reader certification, physical-device/software-keyboard tests, authorized SSE payload/Last-Event-ID protocol trace, native UI sessions for every one of seven roles, real-user usability and production readiness. Native updates/retry and denied stream probes do not promote those limits to PASS. The table states actual measured locale coverage rather than claiming every state in both languages.

Independent [final runtime review](REVIEW-FINAL-RUNTIME-006.md) and [source/security review](REVIEW-FINAL-SOURCE-006.md) APPROVE the bounded evidence with no critical finding. Final documentary review and Workspace publication gates remain pending: PR CI/merge/exact reviewed-main tree/main CI, remote/local temporary branch cleanup/pruning and terminal relay. Selected verdict GO_SOCIAL_COMMUNICATION_UX is conditional on that lifecycle; 006/Phase29 DONE is effective only afterward. The terminal report records the actual resulting Workspace SHA. Phase30 remains unstarted.
