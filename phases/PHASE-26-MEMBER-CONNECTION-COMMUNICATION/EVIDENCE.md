# Phase26 execution evidence

## Current004 live-card UI savepoint

Frontend `8da3362398cb409f40a73f87b2d1af14f33dec23` wires the reviewed refresh queue
into the native conversation timeline. Actor/room ownership, StrictMode disposal,
focus/visibility/30-second expiry and REST reconciliation invalidate cached cards.
Only intersecting cards refresh in the background; an explicit open waits for a
fresh authorized projection and validates the fixed canonical path. Revoked,
failed or stale cards show generic unavailable text without old preview or ID.
Same-ID unsubscribe/remount responses are rejected by subscription identity.
Keyboard focus stays on the card wrapper when its button disappears. Timeline
resizing follows latest messages or preserves the connected reading anchor;
programmatic scroll events do not replace that anchor with newly inserted rows.

Independent review approved the final correction. Full frontend119 suites/584 tests,
typecheck (also the configured lint), production build, performance budget and
diff checks passed. npm advisory audit returned zero vulnerabilities. Meaningful
RED/GREEN regressions cover focus masking, subscription replacement
and prepend plus asynchronous height changes. Local Chromium synthetic component
QA at actual320/375/390/412/768/1024/1440 viewports in vi/en verified no horizontal
overflow,44px open buttons, escaped HTML-like long text and latest-gap zero.
Desktop and390px mobile screenshots were visually inspected. Native browser
prepend recheck retained the old message at76px before/after/settled; revocation
removed all open buttons and preview, rendered no raw reference or navigation path
and did not navigate.
The disposable harness used a delayed fake canonical API, not authenticated Backend
or deployed multi-account acceptance; it and the local browser/server were removed
after QA. One fixture resource404 was observed; no zero-console-error claim.

The commit is pushed on the unmerged working branch. Share dialog and six source
actions, canonical-domain regressions, complete004 CI/integration/TEST deployment,
runtime proof and terminal relay remain pending. Public ledger34/deployed003 stay
unchanged.004 remains IN_PROGRESS; genuine006 browser acceptance remains NOT_RUN.
This section supersedes the historical UI-wiring-pending statements below.

## Earlier004 frontend refresh queue savepoint

Frontend pure queue `14dee100284300b15f95bd37bdca077dc47b9b1f` passed independent
review,5 focused queue cases plus30 transport/state/composer cases, typecheck and
diff checks. It masks all registered cards on invalidation, queues displayed cards
for background refresh and explicit open rechecks, with at most50 waiting and one
in-flight request, preserves queued order,
ignores superseded generations and aborts on actor/conversation lifetime disposal.
Open rechecks wait for their own fresh response. Review found an offscreen queued
click could hang; the deferred regression observed RED and the correction settles
cancelled click waiters with null. Another meaningful RED covered clicks racing
an older in-flight refresh. Initial missing-module RED and corrected assertion/
mock type errors are recorded separately from behavior failures.
This pure queue is not wired into React or production UI yet; actual older-card
revocation/click/navigation/focus/expiry/actor lifecycle browser proof is pending.
004 remains IN_PROGRESS; no complete frontend/current-main CI/runtime claim.

## Current004 send/history integration savepoint

Backend `020fabeb19d2c0343b6b2ffb6ac84b9ff9f079a0` was independently reviewed,
committed, pushed and its exact remote working-branch SHA verified. Single send
accepts typed context-only/optional-note payloads through the existing current-pair
transaction. Complete normalized note/type/id controls retry identity. Identical
committed retries after source revocation return the original message with a
fresh generic unavailable card, without budget/sequence/version/intent mutation.
New unavailable shares fail before budgets; history resolves current actor cards
with request-local deduplication and no raw references on unavailable cards.
Canonical service imports introduce no messaging dependency cycle. Independent
domain pools give bounded current checks, not cross-domain atomicity.

Actual generated-schema PostgreSQL integration5 tests passed24.311s; existing
messaging SQL regression27 passed106.442s. Public identity/ledger34/all baseline
digests/payment-disabled guards passed, and generated-schema cleanup was verified.
Missing resolver fails closed for new shares/retries/history. HTTP/SSE8 tests,
messaging unit59 tests, typecheck/build/diff checks passed. HTTP uses a clearly
identified domain boundary fake; SQL integration uses a canonical Library port
fake and does not establish the Library domain's eligibility implementation.
The initial integration test observed compile RED before implementation; additional
fail-closed and transport cases were added afterwards with no new RED claim.

Message-scoped live-card endpoint savepoint
`0270d81f8ccd133107888a0d10c46775fe67f082` was reviewed/pushed/exact remote verified.
It checks current pair before conversation+message lookup and returns only
messageId/context. Text-only null, revoked generic, missing/foreign message404,
and unrelated actor denial before resolver lookup are covered. No counters or
conversation sequence/version change. Missing-route HTTP RED was observed before
implementation; HTTP/SSE9 tests passed6.181s, actual context SQL6 passed34.466s,
typecheck/build/diff passed. Public ledger remained34. Frontend typed transport,
mutable projection replacement and encoded/cancellable refresh contract passed
independent review,30 focused tests, typecheck/build/diff. Initial transport/
identity failures and missing API method RED were observed before each change.
An optional-text typecheck failure in the existing composer test fixture was
corrected to mirror canonical empty-string response text; no production test
expectations were weakened. Stitch desktop/mobile references were generated,
downloaded and inspected; see UI-STITCH.md. No native004 UI is implemented yet.

Public TEST remains at ledger34 and deployed003 revisions;0035 has not been applied
publicly.004 native share UI, current-card frontend refresh queue,
canonical-domain regressions, complete integration/runtime/CI/cleanup remain pending.
004 remains IN_PROGRESS and genuine006 deployed multi-account browser proof NOT_RUN.
This savepoint supersedes the wiring-pending statement in the historical foundation
section below without claiming complete004 acceptance.

## Current004 foundation and accepted003 terminal — 2026-10-10

003 completed evidence PR153/main `520388112e32ec04dc20d1cae84a1af65c333bac`;
PR quality38022885836/114127465643 and main quality38022944951/114127646511
passed. Reviewed branch tree matched remote main; local main fast-forwarded;
temporary evidence branch deleted remotely/locally and stale references pruned.
Full sanitized003 terminal was sent through the existing native browser relay.
The complete returned CODE_BLOCK_V1 through final Execute LNG-26-004 was read
and validated for project26/subphase004/dependencies/current three main SHAs and
exclusions. This reconciles the earlier003 IN_PROGRESS snapshot to DONE without
rewriting its historical work.004 IN_PROGRESS;005/006 pending.

Backend004 payload foundation `1128b418b95827d700a919910a8a13c6a82729cc` passed
independent review,36 combined boundary tests, typecheck/build/diff checks and
exact remote branch verification. Only LIBRARY_RESOURCE/COMMUNITY_POST canonical
UUIDs are accepted; optional/empty note syntax is permitted only with a valid
reference. Syntax grants no content authorization. Existing text-only send API
remains unchanged at this savepoint. Initial missing-module RED was observed;
PowerShell npx policy and an omitted Jest VM flag were runner failures, corrected
by using the existing native Node/experimental-vm-modules package command.

Resolver savepoint `13fcc7b39609a80d5154ab6b21fc5ff56603c6ac` was independently
reviewed and pushed, exact remote SHA verified. It delegates current eligibility
to canonical Library/Community services, additionally requires PUBLIC and
DISCUSSION/QUESTION for Community (including author-owned private denial), checks
exact returned identity, and constructs fixed application-relative paths. Current
Library preview is bounded160 code points; Community derived plain-text preview
120, independently approved without implying a separate post title. Unavailable
cards contain only availability; no author/body/stale preview. Only genuine
Community target-unavailable404 maps to unavailable; infrastructure/other errors
propagate. Request-local deduplication resolves at most50 unique references
serially, with no cross-request cache. Resolver13 tests/typecheck/build/diff PASS;
initial missing-module RED observed. No cross-domain atomicity is claimed.

Reviewed0035 schema proof ran against a generated isolated TEST schema after
exact approved host/public PostgreSQL18/ledger34/all LF digests/payment-disabled
preflight. Schema savepoint `ef7c339627a1f38d5cec45381bd1bdd73135f42a` was
reviewed, pushed and its exact remote branch SHA verified. Nine actual PostgreSQL
tests passed9.572s, covering paired allowlisted
references, empty-context-only and text-only/4000 bounds, no snapshot columns or
target-lifetime coupling, retained-reference downgrade refusal, and successful
downgrade/re-up preserving text-only messages. Harness cleanup verified schema
absence. Public ledger remains34;0035 is not publicly applied. Schema tests were
written before migration implementation; no pre-implementation SQL RED is claimed.
004 API/send/history wiring, UI/Stitch, integration and runtime remain pending.
Genuine006 deployed multi-account browser acceptance remains NOT_RUN.

## Current003 merged TEST runtime acceptance — 2026-10-10

Backend PR48 merged as `dad7674eb60f2dc723e46859adafa4dae90e1d1a`, frontend PR35
as `1d3e88b7bde3071c145b55ff169d3eced78a7f0e`, evidence PR152 as
`a2095c2ee42026e448fea54aa80fcbb0483bd46f`. Post-merge quality runs
38021882662/114124446653,38021902629/114124507174 and
38021909470/114124528177 respectively passed. Exact remote main SHAs and reviewed
tree equality were verified; all three merged temporary branches were deleted
remotely and locally and stale references pruned. Backend's first pre-merge CI
failure was an existing admin audit test's equal-timestamp/random-UUID ordering;
a test-only clock correction passed targeted tests and the subsequent full CI.

The reviewed guard applied only0032/0033/0034 to the approved owner TEST database:
ledger31→34, all LF-normalized migration digests verified, payment disabled.
Render exact backend main deployment `dep-db4rduh42hec73enhk7g` was observed Live
in its native dashboard and health returned200. Vercel primary sigma domain was
Ready on exact frontend main, deployment dashboard key
`7gfQhW7fFeSKfGMiWNXy4rJx1HoA`. These are existing owner TEST targets.

Independently reviewed bounded native HTTP/SSE acceptance passed with three
synthetic ACTIVE, verified ordinary MEMBER actors using native login. It proved
pre-connection denial; canonical concurrent open; server-owned fields; NFC/plain
text persistence; stable UUID retry and changed-text409; simultaneous sequence
ordering; exclusive forward/older cursors; participant-owned monotonic read and
unread; unrelated C denial on all private routes; actor-bound cursor, Origin,
query-credential and future Last-Event-ID rejection; header reconnect plus REST
reload without duplicates; discovery-off preservation; NO_CONTACT and disabled
partner revocation closing active streams; native logout invalidating bearer and
stream; report preserving access; block/unblock retaining history without
reconnecting. Exact synthetic identities and wholly synthetic conversation pairs
were locked/verified before cleanup. All ten recorded residual counts are zero.
Sanitized machine result: [runtime proof](evidence/003-http-sse-test.json).
Passwords and bearer tokens remained in memory and are absent from the artifact.

Actual deployed guest browser smoke at390px passed VI/EN copy, no horizontal
overflow, private-content absence and login navigation retaining the conversation
returnTo path. This supplements local component QA; it does not establish
multi-account browser acceptance. Mandatory006 genuine browser proof remains.

003 remains IN_PROGRESS until this evidence integration and terminal relay.
004–006 remain pending. Earlier pending-deployment statements below are historical.

## Current003 native messaging UI — 2026-10-10

Frontend savepoint e5b33d50fd06de4d4b745b0d815ebc3299f9ddb9 implements the native
conversation list/thread routes, connected-profile entry, plain-text timeline,
three-line growing composer and VI/EN copy under the existing exchange namespace.
It composes the previously reviewed history, stable retry, authenticated SSE and
history-confirmed visible-read hooks (frontend8a69d17 and predecessors).

Independent review found two revocation propagation defects. The first left the
partner row visible after a thread denial; the second dropped the required list
refresh behind an in-flight request. Both were reproduced RED before correction.
The final implementation refreshes on unavailability and coalesces queued refreshes,
discarding superseded list responses. Hook4 and page6 tests cover ownership,
ordinary/late denial, empty-page continuation, escaping and stable send retry.
CTA2 tests verify server-owned navigation and safe failure feedback.

Full frontend116 suites/565 tests PASS39.03s; lint, typecheck, build, performance
budget and diff checks PASS. Sandboxed npm audit could not reach its endpoint;
the approved read-only network audit completed with zero vulnerabilities. Source
review APPROVE; temporary local QA fixture files removed before commit.

Actual Chrome component QA used a synthetic local fixture, not deployed accounts.
Both locales passed the actual emulated320/375/390/412/768/1024/1440px width matrix:
no horizontal overflow, textarea inside viewport, mobile single-thread and desktop
split view. Long-name mobile header was refined after visual inspection. Native
keyboard typing/Tab/Enter confirmed visible focus, one rendered send, draft clearing,
scroll preservation while reading older messages, jump-to-latest and bottom-follow.
Composer grew from96px to192px cap with inner scrolling. Plain HTML-like text
created no image elements. Console showed only a local favicon404. DevTools fill
did not update React state; native keyboard typing did and was used for acceptance.
Screenshots were visually inspected inline; attempted filesystem screenshot export
was denied by the tool's configured roots, so no saved screenshot is claimed.

003 remains IN_PROGRESS: PR/CI/merge/cleanup, public TEST migrations/deployment,
ordinary-auth runtime acceptance and terminal relay are still pending. This local
component QA does not replace mandatory006 genuine multi-account browser proof.
Earlier entries below are historical savepoints where their pending items differ.

## Current003 frontend foundation — 2026-10-10

Frontenddf073e2df7cb8216a43adcc826ea0a6349ba1005 pushed and exact remote SHA
verified. Predecessord1ffca502e7fdca0162f6ccacfdca4ee88e4e6da supplies protected
REST contracts, decimal-string bigint reconciliation, NFC/4000-code-point draft
validation and bounded authenticated fetch SSE parsing/cancellation. Review found
numeric JSON sequence coercion; regression reproduced it before the string-only
runtime guard fixed it. Focused foundation20 PASS after missing-module RED.

The history hook adds lifetime ownership, current protected summary/history,
serialized/coalesced forward catch-up and separate older paging. Send responses
cannot advance the catch-up cursor and skip gaps. An A/B/A stale-callback test
first failed, then passed with exact lifetime scope ownership. Hook8 PASS;
combined28 PASS. Full frontend110 suites/527 PASS31.77s, lint/typecheck/build,
audit (zero vulnerabilities), diff and independent source review PASS.

Clean desktop/mobile Stitch references were generated/downloaded/visually inspected;
details and rejected initial output are in UI-STITCH.md. Messaging UI, sending/
reconnect/visible-read orchestration, browser/runtime and full003 integration are
still pending. No003 public schema/deployment acceptance is implied.003 IN_PROGRESS.

## Current003 HTTP, lease and SSE savepoints — 2026-10-10

Backend6ce573e7dc819440c34f5f68480ab0b62e4960f3 pushed and exact remote SHA
verified. Native bearer/session/CSRF guards, strict DTOs, private caching and the
existing Origin allowlist protect HTTP routes and fetch SSE. HTTP7 PASS after
missing-route RED; full unit169 suites/1042 PASS41.533s and e2e23 suites/166
PASS28.232s; typecheck/build/diff and independent review PASS. Real localhost
fetch SSE closes after native session revocation. Transport tests override SQL
repositories and do not establish deployed TEST authorization or browser proof.

Predecessor144205650f69f70b092bde4c9d7204332788eced adds serialized SSE lifecycle,
minimal version hints and bounded heartbeat; unit6 PASS, combined validation/
cursor/SSE32 PASS. Lease savepointe412e7e3ec264651d68c1819d4e5d3d3323dd774 adds
0034 and durable actor-wide capacity/subscribe budgets. Observed lease-row lock
wait reproduced expired-lease resurrection (RED4 PASS/1 FAIL34.812s); explicit
row lock before expiry clock fixed it (GREEN5 PASS33.922s). Send budget helper
regression3 PASS20.879s. Both increments passed independent review, typecheck,
build and diff checks. SQL ran only in guarded generated isolated schemas;
public ledger remains31, with0032/0033/0034 unapplied there.

003 remains IN_PROGRESS. Stitch/chat UI, integration, exact-main TEST deployment
and actual runtime acceptance are pending;004–006 pending. These savepoints do
not replace mandatory006 genuine multi-account browser acceptance.

## Current003 backend savepoints — 2026-10-10

Conversation-list savepoint5ea02249b65b0556496c84ac91ae8c6df3a7802a pushed and
remote SHA matched. Default20/max50, bounded100 candidate scans, private actor-bound
cursor preserves PostgreSQL microseconds. Current locked authorization omits
revoked or reordered candidates. SQL run26 PASS/1 fixture enum type FAIL100.727s;
explicit enum fixture cast followed by focused1 PASS/26 filtered20.027s. All27 cases
proved across those runs, including empty-page continuation past100 inaccessible
rows and observed account-lock wait followed by one-microsecond reorder. Unit26,
typecheck/build/diff and independent final review PASS. No public schema mutation.

Send savepoint0df7e6a0bd1f4e95de64d377c13ecf2aeef313f0 passed21 isolated SQL
cases, typecheck/build/diff checks and independent review. Retry with the same
actor/conversation/clientMessageId and NFC-normalized text returns the original;
changed text returns409. Sequence, version, message and coalesced identifiers-only
notification intent commit atomically. Both durable minute/hour budgets commit
on429 without allocating a sequence. Intent failure rolls everything back. The
block race was tightened to retain CONNECTED, isolating the block predicate;
focused race2 PASS after correction. Exact pushed SHA matched remote.

History/read savepoint544bf45ec4ac364c69c28383020c3046dbf4e822 passed24/24
isolated PostgreSQL tests in73.479s, cursor/validation25 unit tests, typecheck,
build and diff checks; independent source review approved. Scoped authenticated
encrypted cursors bound chronological history and catch-up; read positions are
participant-owned, monotonic and cannot advance beyond an existing message.
Exact pushed SHA matched remote. Reviewed TEST guard reverified31 public migration
digests and disabled payment/QR before isolated execution. Public schema unchanged;
0032/0033 remain unapplied there. HTTP/SSE/UI/runtime/integration gates remain pending.
003 IN_PROGRESS; none of these increments constitutes terminal completion.

## Current003 start and002 terminal reconciliation — 2026-10-10

002 DONE after Workspace PR151 merged to31bcd0310f8cbcec5b6e92560378cff2dcf5f47f,
main CI37926688951/job113807207319 PASS and remote/local temporary branch cleanup.
The sanitized002 terminal was sent to the existing authorized project conversation.
Completed next CODE_BLOCK_V1 was read in full and validated for CongDongNgonNgu/26/
LNG-26-003, including final Execute003 and all hard stops. Earlier VERIFYING or
IN_PROGRESS projections below describe pre-terminal snapshots and are historical.

Three clean local/remote main revisions reverified unchanged: Backend79c7f20cbe908b8f5d6e0c2a48c78b1c3a6ae8b7,
Frontend3033f1d52ceb4301572b88729f3e113e3b8e34cc, Workspace31bcd0310f8cbcec5b6e92560378cff2dcf5f47f.
Backend003 working branch feat/phase26-direct-messaging begins with9a746a62f0d12d6de89ed751fae39c69f4971fb5,
pushed and exact remote SHA verified. Text normalization/Unicode/sequence boundary
tests22 PASS after missing-module RED; typecheck/build/diff checks PASS. Independent
source review approved this validation increment and bounded persistence direction.
This is not implemented chat,003 completion, migration acceptance or runtime proof.

Reviewed fresh read-only TEST preflight verified approved Neon/neondb/public,
PostgreSQL180006, exact31 baseline/source ledger digests and payment/QR disabled.
Initial SQL RED used only the generated isolated harness schema and failed on
missing0032; afterAll cleanup returned without failure. New0032 schema/test work
was pending review and GREEN proof at that initial historical checkpoint;
subsequent completed savepoints are recorded above. No003 public migration occurred.

Subsequent schema savepoint83d09bdc00d0171b178dda897c7432691e362052 passed7
isolated PostgreSQL tests, typecheck/diff and independent review. Rollback race
test first reproduced lost history (6 PASS/1 FAIL); ACCESS EXCLUSIVE table locks
before the emptiness check fixed it. Nonempty history refuses downgrade.
Open/get savepoint1db874c85a9ae478747a72b8794eab160aaa21f2 passed16 SQL cases,
typecheck/build/diff and independent source review; exact pushed SHA verified.
Opposite-participant concurrent opens reuse one stable ID; unrelated C denied;
remove/block/NO_CONTACT/opt-out/disable/private-language/unverified revocations
deny subsequent get/open while retaining identity. Discovery-off alone permits
access; fresh eligible connection reuses identity. Fixture initially inherited
NO_CONTACT and correctly failed; corrected explicit RELATIONSHIP_GATED fixture,
without weakening authorization. These are SQL repository tests, not HTTP/SSE or
deployed messaging proof.0032 remains unapplied in public; scoped cleanup passed.

003 IN_PROGRESS;004–006 pending; Phase26 verdict NOT_REACHED. Full actual deployed
A/B/C browser acceptance remains NOT_RUN and mandatory006. Stop after26.

## Current verified checkpoint — 2026-10-09, main integration and TEST deployment

002 remains IN_PROGRESS;003–006 remain pending. [Backend PR46](https://github.com/CongDongNgonNgu/CongDongNgonNgu-Back-End/pull/46), [Frontend PR34](https://github.com/CongDongNgonNgu/CongDongNgonNgu-Front-End-Web/pull/34) and [Workspace PR150](https://github.com/CongDongNgonNgu/CongDongNgonNgu-Workspace/pull/150) merged. Their exact main revisions740d86d1f1bf0228a07be1c25f7fb5589bb45b26,3033f1d52ceb4301572b88729f3e113e3b8e34cc and97f3aedbf5896dce30de315c5d14b3f62cb38f3e passed required post-merge CI. All corresponding temporary branches were deleted remotely/locally and pruned after squash tree equality verification.

Backend final full166 suites/1007 unit tests passed before runtime remediation below. Required audit found a critical test-only Handlebars dependency; the lock-only4.7.10 patch preserved the gate. Audit high/critical0, inherited20 moderate remain; no zero-total-vulnerability claim. Main CI included the actual full57-case isolated PostgreSQL18 connection gate and passed.

Reviewed additive owner-TEST migration guard positively checked the approved Neon endpoint/effective native host and canonical5432 port, SSL-only query keys without duplicates, neondb/public/PostgreSQL18, payment/QR disabled, exact28 baseline filenames and all checksums. Native runner scope was matched exactly. Only0029/0030/0031 applied; post-run31 ledger entries and all digests matched. No production mutation or provider expansion. Database identity is the owner-designated TEST target; provider environment labels do not broaden authorization.

Vercel owner-TEST deploymentdpl_6Y1BY1RZY8aJ1AT1VH2jmc2FgZpB was Ready/Current with exact Frontend main3033f1d. Render owner-TEST servicesrv-dahnerh594qs73fp3420 deploymentdep-db4cf0dg1s2s7390b0g0 was Deploy succeeded|Live with exact Backend main740d86d, duration1m04s. Actual HTTP health returned200/ok. These observations prove this checkpoint's deployments, not acceptance of the subsequent remediation revision.

Actual TEST HTTP acceptance provisioned three disposable ordinary MEMBER actors through the native identity/password mechanism, then used normal login and public profile/Exchange APIs. Self-request denial, request/duplicate idempotency, private incoming/outgoing lists and worker-delivered request notice passed. It halted when unrelated C's absent cleanup returned200/NONE. This did not demonstrate an A/B mutation or privacy leak; independent review identified a frozen-contract mismatch requiring409. Exact fixture identities were checked and notifications/reports/users cleaned; no unrelated data deletion. Sanitized recovery manifests contain no passwords/tokens.

[Backend PR47](https://github.com/CongDongNgonNgu/CongDongNgonNgu-Back-End/pull/47) fixes all six absent decline/cancel/disconnect outcomes across memory/PostgreSQL while preserving internal safety cleanup. RED memory4/SQL1 observed; GREEN memory/service26, isolated SQL canonical-record/outbox preservation and HTTP409/no-intent integration passed. Full166 suites/1010 unit tests and typecheck/build passed. Full E2E158 passed/one legacy repeated-decline200 assertion failed; that assertion was corrected to409 and focused Exchange4 passed. Independent review approved; PR CI passed, merge main79c7f20cbe908b8f5d6e0c2a48c78b1c3a6ae8b7 was verified identical to the working tree, and its temporary branch was deleted remotely/locally and pruned. Post-merge CI and updated TEST deploy/runtime results are recorded next.

Remediation main79c7f20 post-merge quality CI37925750509/job113804143773 PASS, including full E2E and Phase26 SQL gates. Render deploymentdep-db4d9l67bikc73ec9bp0 was Deploy succeeded|Live with source79c7f20cbe908b8f5d6e0c2a48c78b1c3a6ae8b7, duration1m04s,2026-10-09 18:49:40 GMT+7. Repeated clean-main/approved TEST preflight verified31 unchanged migration digests and payment/QR disabled; migration scope was empty.

Actual ordinary-auth A/B/C HTTP rerun on that deployment PASS. Verified unauthenticated401 and self-request400; persisted request/duplicate private lists and worker notice; C accept/decline/cancel/disconnect409 plus wrong-role409, unchanged full A/B canonical record and unchanged outbox intent count; C empty lists/notices; accept/already-connected idempotency and distinct accepted notice; discovery-off/NO_CONTACT connection preservation; opt-out denial with current notice name/path/variables/unread redaction; DISABLED actor/target denial, list omission and hidden notice actor; report leaves connection intact; block removes the canonical pair atomically and unblock does not reconnect; new-pair cooldown429, crossed requests, either-party removal, requester cancellation, durable REQUEST_HOUR saturation and bounded Retry-After; normal logout invalidates original bearer sessions. Exact ID/email fixture guards and ordered user locks preceded bounded notification/report/user cleanup. Recovery manifests retained only sanitized IDs/emails; passwords/tokens stayed in memory. Cleanup PASS; no fixtures retained and no unrelated data deleted. This is genuine deployed Backend HTTP proof, not an authenticated Frontend browser journey.

Chrome local synthetic UI evidence below remains bounded local QA. Genuine synthetic browser acceptance and actual screen-reader testing remain NOT_RUN. The ordinary browser's existing owner session was observed read-only and preserved. The exact deployment's separate hostname was observed as guest, but runtime Origin preflight returned no allowlist match; the primary TEST origin matched. No Origin expansion or session substitution performed. Independent lifecycle review confirms full deployed A/B/C browser journey remains a006 gate;002 SQL/API/UI evidence does not waive it.002 implementation/runtime gates are satisfied at this checkpoint, pending this Workspace evidence integration/CI/cleanup and terminal relay. Continue003 only after those remaining lifecycle steps. Stop after26.

## Earlier checkpoint — 2026-10-09, private notification delivery

002 remains IN_PROGRESS. Reviewed Backend98814329ffd169ccb625e8b54ebee66362bc0921 follows atomic-intent commit597b549; CI increment10d36690a94715cafd0e09ef1ae6178ff7e530e5 adds the Phase26 PostgreSQL18 gate with validated ephemeral-localhost extension preparation. Frontend6ddfa0e2689d28767a4c87b8a9bff5aa7040cd17 follows connection UIea26eb1. Working branches are pushed; [Backend PR46](https://github.com/CongDongNgonNgu/CongDongNgonNgu-Back-End/pull/46), [Frontend PR34](https://github.com/CongDongNgonNgu/CongDongNgonNgu-Front-End-Web/pull/34) and [Workspace PR150](https://github.com/CongDongNgonNgu/CongDongNgonNgu-Workspace/pull/150) are open. Main integration, deployment, exact-main TEST runtime GO and002 terminal relay remain pending.

Persistence captures identifiers-only request/connected intents in the canonical connection transaction. The bounded worker uses expiring lease tokens, account→pair→outbox lock order, supplied-client notification persistence, retry backoff and post-commit local publication. Failed notification delivery leaves a committed request successful and retryable. Current eligibility, both directed blocks, connection identity/state/requester and current delivery preferences control materialization; strict legacy-request reconciliation accepts only the original compatible payload/fingerprint. Memory mode shares the actual domain stores and guards asynchronous access with mutation revisions. Neutral persistence module avoids notification/domain import cycles.

REST lists/counts/read-count responses and notification replay/live projection resolve the current connection actor; revoked pairs expose no name, path or saved variables and do not count unread. Native stream reauthentication checks the original bearer/session before ready, replay/live payloads and heartbeat; logout, session revocation and token expiry terminate delivery. Initial authentication queues live events until ready. Request and accepted-connection types are distinct.0031 preserves all existing types, including EVENT_REMINDER; down refuses incompatible new rows instead of deleting notifications.

Observed local gates: Backend166 suites/1002 unit tests and22 suites/159 E2E PASS before the final session remediation; final focused stream/projection16 tests PASS, native-session/event-ordering stream11 tests PASS and notification HTTP5 tests PASS after remediation. Final typecheck/build/diff check PASS. Final guarded disposable PostgreSQL full57 tests/2 suites PASS (179.869 seconds), including complete ordered0001–0028 baseline plus0031 up/down compatibility and post-commit worker proof. Test harness drops isolated schemas; no public migration/provisioning occurred. CI configuration YAML and npm script parsed successfully; independent review approved its fail-closed ephemeral target guard.

Frontend106 suites/499 tests PASS on the final notice/reconciliation change; typecheck/build/performance budget/diff check PASS.26 focused notification tests cover actor switch, deferred read mutation/older poll, out-of-order canonical refresh, old-stream callback during render before passive cleanup, and30-second authoritative reconciliation while SSE remains healthy. Polls are single-flight; bootstrap/refresh share scoped request/revision guards. Private request/accepted copy is VI/EN, ignores saved subject variables, and uses generic unavailable text for redacted notices. Independent Backend contract/source review and Frontend authority review approved the final fixes; these reviews are source review, not runtime acceptance.

Chrome local synthetic QA used the real ConnectionsPageView/shared shell and native Dialog: widths320/375/390/412/768/1024/1440 had no horizontal overflow; observed tab/action targets were at least44px high. Screenshots inspected at1440 desktop and320 mobile, including long names and VI/EN incoming actions. Dialog at320 measured288px wide; Shift+Tab/Tab trapped focus, Escape closed it, and focus returned to Remove connection. Current text contrast measured minimum4.56:1; console errors/warnings were empty. Loading, error/retry, empty, guest and empty-with-next-cursor states were observed; Load more recovered connected/outgoing rows from empty scan pages. Disposable local HTML/TSX fixtures were removed and never committed. This proves local UI behavior only. Actual assistive screen-reader testing and genuine exact-main authenticated TEST A/B/C browser acceptance remain NOT_RUN.

Next: verify all PR CI and integrate002, then positively re-identify the approved TEST targets before additive migration/deployment, prove exact-main runtime behavior and clean merged branches. Record002 terminal relay only after all applicable gates. Continue003–006 under standing owner authorization; stop after26.

## Earlier checkpoint — 2026-10-09, connection UI and durable limits

001 remains DONE at Workspace main596f5d768d2a1c0133123dd8d709459a02bdf120 (PR149), verified CI/main and merged-branch cleanup complete.002 remains IN_PROGRESS. No002 terminal relay, main integration, deployment or runtimeGO claimed;003–006 remain sequenced pending.

Backend branch feat/phase26-connections now includes reviewed commit f95d33f41f614d17309051d90b04fd23623c1fbf after1c98904/e12a084. Absent-row accept returns INVALID_ACTION/409. REQUEST rechecks current target discoverability under ordered account/pair locks; acceptance of an existing request deliberately ignores discovery visibility. Controlled SQL account waits prove account/opt-out/private-language/discovery revocation; controlled independent-client waits prove both cancel/accept and block/accept orderings. Last full17 SQL cases PASS before rate addition.

Additive0029_phase26_exchange_limits migration adds only internal counters, leaving canonical connections unchanged. Actor request10/hour+60/day, shared transition/block/unblock60/hour and report10/hour are persisted before pair work in an independent transaction. Both request windows count denied authenticated attempts and saturate at limit+1. Actor FOR UPDATE serializes before each counter statement clock sample. New-pair1/minute is canonical and atomic with creation; duplicate/crossed/idempotent existing rows do not consume pair cooldown. Memory mode uses the same boundary. Expired counter cleanup is a separate bounded100-row autocommit statement using SKIP LOCKED, without account locks. Retry-After emits only validated bounded positive seconds. Review found stale pre-wait rate clock; observed expiry-wait regression RED then GREEN after serialization. SQL19 PASS before that remediation; subsequent targeted4 PASS/17 filtered (21 total cases) verify expiry wait, replica request allowance/durable denied attempts, canonical cooldown and cleanup. The full21-case SQL suite has not yet been rerun after these last two additions. Disposable guarded schemas cleaned by the harness; no public migration or public fixture writes.

Backend local final gates at f95d33f:160 suites/951 unitPASS,21 suites/158 e2ePASS, typecheck/buildPASS, production-dependency audit0 vulnerabilities, staged diffcheckPASS. Focused Exchange53PASS and HTTP4PASS include429/Retry-After and explicit cooldown clock advancement. Independent contract/source review APPROVE this bounded increment for commit; outbox/current notification privacy still pending before002 completion.

Frontend branch feat/phase26-connection-ui commit ea26eb11e7a82974b04630cc54450063e9566b54 adds authenticated /exchange/connections, typed protected cursor API, connected/incoming/outgoing lists, explicit removal confirmation, VI/EN catalogs and discovery/profile navigation. Cursor pages remain manually bounded and empty scan pages navigable; rows deduplicate by connectionId. Generation and principal/API ownership guards discard stale reads and mutation refreshes. Protected load failure clears rows/cursor; logout/principal change discards private confirmation/focus. Independent review issues were reproduced RED and remediated, including deferred old-account refresh/new-account pending mutation overlap;8 page tests PASS. Full105 suites/489 testsPASS, typecheck/build/performance budgetPASS, audit0 vulnerabilities before the final navigation-only grid/breadcrumb correction; targeted discovery/profile22PASS on the exact committed correction. Staged diffcheckPASS; independent UI review APPROVE increment. Temporary synthetic browser fixture deleted and never committed.

Stitch body references generated before UI and visually inspected: desktop3f2c9d8b9caf4b88819a63ec770eff68 and mobilef9beed1b29fa4c9e820e689893da3d54 in existing native project3718538619973058970/designSystem16442026920550574436. Earlier desktop edit output did not persist and its stale screenshot was rejected; fresh clean desktop used. Local real-browser AX proved actual rendered connected-list labels/names/actions. Responsive widths320/375/390/412/768/1024/1440, keyboard/focus/contrast and genuine multi-account TEST runtime remain NOT_RUN: CUA session became User unavailable; Chrome DevTools separately reports its profile already running. These external limits do not imply task completion.

Goal remains active for owner-authorized001–006 and checkpointed for resumption. Next: finish request/accept transactional durable notification intent and current projection/privacy without post-commit HTTP failure; verify full SQL21 and remaining UI/runtime gates; integrate002 through PR/CI/main/TEST and evidence cleanup; relay002, then proceed003 under standing authorization. Stop after26; no27–29, production/payment/provider expansion.

## Earlier checkpoint — 2026-10-09

001 DONE: WorkspacePR149 MERGED; squash main596f5d768d2a1c0133123dd8d709459a02bdf120. PR CI37892747107 and main CI37892791926 PASS. Remote/local temporary contract branch deleted, refs pruned, clean synchronized main verified. Terminal001 relay sent to the existing project conversation; completed next CODE_BLOCK_V1 identifies CongDongNgonNgu/26/LNG-26-002 and preserves contract and safety boundaries. Complete prompt read including final `Execute LNG-26-002 now`; no partial prompt accepted.002 IN_PROGRESS,003–006 sequenced pending.

Backend working branch feat/phase26-connections. First service increment: disabled-target cancel/decline/remove allowed; accept checks current valid opt-in preferences. RED4failed/15passed; GREEN19passed. Independent review APPROVE. Transaction increment adds ordered account locks, current request/accept eligibility in explicit READ COMMITTED, profile/preferences account boundary, matching block/unblock lock order. Actual SQL test found old account/opt-out bypass, then a deadlock from block's old pair-first order; both remediated. Initial PostgreSQL4PASS and Exchange47PASS, typecheck/build/diffcheckPASS. Fresh independent review found protected relationship read gap; RED reproduced, remediation underway. Controlled lock-wait race proof remains pending; current Promise.all cases are bounded concurrent evidence only.

Fresh TEST prewrite: exact approved Neon endpoint/neondb/public, PostgreSQL18,28 applied source digests MATCH; configured payment provider disabled/QRfalse. SQL fixtures live only in generated phase22_test schemas through reused guarded harness; automatic schema cleanup verified by harness. No public migration or public data writes, no deployment yet. Frontend unchanged. No live authenticated connection/chat acceptance claim.

Protected-read remediation verified RED then GREEN. Current SQL8PASS includes observed independent account-lock waits before committed account/opt-out/private-language revocation. Exchange47PASS, full Backend unit945PASS, typecheck/build/diffcheckPASS. Independent increment review APPROVE for commit; full002 acceptance not claimed. Full e2e exposed a legacy unrelated/ineligible accept assertion200/NONE; tightened to current generic404, independently approved and rerun158PASS. Workspace monitor12PASS/syntax/diff checksPASS.

Second Backend increment: authenticated GET exchange/connections (INCOMING/OUTGOING/CONNECTED, default20/max50), actor-owned bounded SQL scans with current account/pair/eligibility/block reauthorization and displayName-only projection. Independent review found plaintext cursor metadata and changed-sort-key gaps; remediated before commit with authenticated AES256GCM scan cursor, domain-separated key from existing configured auth access secret, and omission of changed candidate keys. Node official [crypto documentation](https://nodejs.org/api/crypto.html) checked. Secret rotation invalidates cursors safely; replicas share runtime-configured key. Empty authorized-result pages can have a continuation cursor; frontend must continue bounded scans and deduplicate connection IDs. Stable ordering deliberately uses millisecond updatedAt plus UUID to match JS wire precision.

List RED evidence: missing memory/SQL/API methods and plaintext cursor assertion each failed before implementation/remediation. Current full unit947PASS/e2e158PASS/typecheck/build/diffcheckPASS; full Phase26SQL10PASS; focused replica/cursor tests2PASS prove same-key cross-instance continuation, empty-page recovery, ciphertext metadata omission and tamper400. Independent remediation review APPROVE for committing increment. No schema migration. Frontend code still unchanged; Stitch desktop reference generated in existing global-shell project3718538619973058970/screen1a91495559634ed3a11a0d4d3b19cd57, refinement requested to remove invented languages/notes/counts and QA showcase before implementation.

Next: remaining controlled cancel/accept/block race orderings, durable request/safety limits, notification privacy/intent; then frontend with existing vi/en/design, independent review, CI/merge/exact-main TEST/runtime/evidence cleanup.002 remains incomplete. No chat/context/group implementation yet. No Phase27–29, production, payment, paid provider, AI or voice/video work.

## Historical contract preflight

2026-10-09 Asia/Saigon. Owner attachment authorizes complete001–006 lifecycle; historical no-auth flags superseded for26 only. Independent full authority review and source/security audit completed by separate reviewers; final contract accepted after all six findings and symmetric NO_CONTACT clarification. CONTRACT.md is the implementation baseline; no implementation/runtime acceptance claimed.

Preflight: three clean local main revisions exactly matched remote main: Backend a2640cd7d734f088987fb32b89efc5cbf40e954e; Frontend58ea2686fb0e805eb483d9f53e10e94d139b9420; Workspace af124acb2177ea6bc08282cb9b03aee83c58ee96. Complete mandatory authority/evidence read; no AI-DOS/repository skill roots. Existing Exchange connections/block/report and notification SSE reused; new friendship domain prohibited.

Read-only TEST PostgreSQL check: approved ep-crimson-grass-azmsfir8-pooler.c-3.ap-southeast-1.aws.neon.tech, neondb/public, PostgreSQL180006. All28 migration source checksums match; latest0028_phase23_library_relations.sql. No writes. Disabled payment still requires fresh pre-write runtime verification.

Independent source review identified Last-Event-ID CORS omission, process-local notification delivery gap, stale-session/pair authorization at delivery, stale notification metadata, eligibility races, missing durable Exchange limits and post-commit notification failure semantics. Contract resolves required behavior; code fixes remain002–005.

Current001 VERIFYING pending Workspace tests/PR/CI/merge/main verification/cleanup and terminal relay.002–006 PLANNED. Backend/Frontend unchanged. Production/database/payment/provider mutations none.27–29 unstarted.

Resume checkpoint: finish contract integration; preserve current reviewed contract; update lifecycle with actual PR/CI evidence, terminal relay; then implement002 using existing Exchange domain. Do not redo baseline audit absent new changes. Runtime tool usage-limit interruption occurred before final contract status update; resumed successfully. No task falsely marked DONE.
