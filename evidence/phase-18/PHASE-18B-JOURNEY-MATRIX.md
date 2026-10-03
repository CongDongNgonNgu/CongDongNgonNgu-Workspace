# Phase 18B Journey Matrix - CongDongNgonNgu

**Task:** LNG-18-002
**Dependency:** Phase 18A / LNG-18-001
**Matrix authored against:** Workspace `8f4c05f`, Backend `cdcbc6d`, Frontend
`01331d6`
**Execution status:** Historical 18D and intermediate remediation snapshots are preserved in the evidence record. The current reconciliation records 20 PASS, 0 FAIL, 0 BLOCKED_EXTERNAL and 2 NOT_APPLICABLE rows. See `PHASE-18D-UAT-EVIDENCE-2026-10-03.md`.

## Classification contract

This document is the traceability plan, not evidence that every journey has
already run. Each row has a stable ID, persona, dependency, expected result,
environment, execution method and evidence slot. During 18D, the result field
must be replaced with exactly one of:

- `PASS` - observed on the approved environment with the referenced evidence.
- `FAIL` - observed defect; never hidden by a retry.
- `BLOCKED_EXTERNAL` - a required environment, service or credential is not
  available; the blocker and owner remain visible.
- `UNSAFE_PRODUCTION_TEST` - the requested step would mutate production,
  charge real money, message real users or weaken a safety boundary.
- `NOT_APPLICABLE` - the capability is intentionally disabled or outside the
  launch configuration, with the reason recorded.

The result column below is the current reconciled classification. The
historical 18D failure and pre-fix evidence remain preserved in the UAT
record. Automated unit or E2E coverage is supporting evidence, not a
substitute for a required runtime/provider journey.

## Journey matrix

| ID | Persona(s) | Preconditions and dependencies | Traceable steps | Expected result / invariant | Environment | Method | 18D result | Evidence slot |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| J-001 | Anonymous | Frontend public build; active `en`/`vi` catalog | Open home, language hub, public Library, public community and canonical links | Public pages load; no auth/private fields or dead links; unavailable sections are explicit | Local preview + approved UAT | Automated browser + manual link check | PASS | `PHASE-18D-UAT-EVIDENCE-2026-10-03.md` |
| J-002 | New User | 18A `new-user`; email provider/test inbox or deterministic test token | Register, verify, login, refresh, logout, logout-all, inspect `/auth/me` | Account/session state is server-authoritative; raw credentials/tokens are not exposed or logged | TEST/UAT | HTTP/E2E + bounded Resend UAT plus in-memory token capture | PASS | `PHASE-18-EMAIL-CHALLENGE-AI-REMEDIATION-2026-10-03.md` - Resend and auth lifecycle verified |
| J-003 | New User | Authenticated account; active language catalog | Complete onboarding; set timezone, native/known/learning language, goal, skill, interest; reload profile | Own profile round-trips atomically; primary target is unique; public projection omits private fields | TEST/UAT | HTTP/E2E + browser | PASS | `PHASE-18D-UAT-EVIDENCE-2026-10-03.md` |
| J-004 | Vietnamese Learner, Foreign Vietnamese Learner | 18A learner personas; active `vi` hub | Open Vietnamese hub; apply CEFR/topic filters; inspect overview and unavailable sections | Filters normalize deterministically; backed metrics are truthful; unavailable capabilities are not implied as shipped | Local preview + TEST/UAT | Automated HTTP/UI | PASS | `PHASE-18D-UAT-EVIDENCE-2026-10-03.md` |
| J-005 | Vietnamese Learner | Authenticated learner; active language; community limiter within budget | Create post, list feed, open detail, add/edit/delete comment, reaction, save, report, share public post | Ownership, visibility, depth and idempotency rules hold; private/suppressed data is not leaked | TEST/UAT | HTTP/E2E + browser | PASS | `PHASE-18D-UAT-EVIDENCE-2026-10-03.md` |
| J-006 | Vietnamese Learner, Reviewer | Learner post; reviewer role; correction/question contract | Request correction or question; reviewer submits structured response; requester accepts/revokes | Only authorized actor can progress state; accepted correction preserves provenance and audit facts | TEST/UAT | HTTP/E2E | PASS | `PHASE-18D-UAT-EVIDENCE-2026-10-03.md` |
| J-007 | Contributor, Reviewer | Contributor fixture; review policy; license/provenance facts | Create Library resource/candidate; attach provenance; submit contribution; reviewer searches/reviews/reconciles/integrates | Contributions require provenance and policy; reviewer action is authorized/audited; search exposes only valid resources | TEST/UAT | HTTP/E2E + manual review | PASS | `PHASE-18D-UAT-EVIDENCE-2026-10-03.md` |
| J-008 | English Native Buddy, Vietnamese Native Buddy | Exchange-enabled pair; language relations; visibility policy | Read discovery; filter by language/level/interest; open safe profile preview and contact permission | Discovery is opt-in and privacy-safe; preview never reveals email/security metadata | TEST/UAT | HTTP/E2E + browser | PASS | `PHASE-18D-UAT-EVIDENCE-2026-10-03.md` |
| J-009 | English Native Buddy, Vietnamese Native Buddy | Pair discovered; relationship policy | Send request; accept/decline/cancel/disconnect; block/report; repeat idempotent request | State transitions are server-authoritative, relationship-gated and safe under duplicate/concurrent requests | TEST/UAT | HTTP/E2E | PASS | `PHASE-18D-UAT-EVIDENCE-2026-10-03.md` |
| J-010 | Vietnamese Learner | AI provider disabled or approved non-production provider configured | Submit writing/grammar coaching request; inspect provenance/status/error; retry bounded request | Disabled/incomplete provider fails closed with truthful UI; no private retrieval, secret or unsupported score is exposed | TEST/UAT | HTTP/E2E + provider contract | NOT_APPLICABLE | `PHASE-18-EMAIL-CHALLENGE-AI-REMEDIATION-2026-10-03.md` - authoritative V1 AI-disabled classification |
| J-011 | Vietnamese Learner | AI conversation store and disabled-provider policy | Create conversation; add turn; request explain; stop; reload conversation | Conversation ownership and bounded in-memory lifecycle hold; provider failure does not fabricate output or persist disallowed data | TEST/UAT | HTTP/E2E | NOT_APPLICABLE | `PHASE-18-EMAIL-CHALLENGE-AI-REMEDIATION-2026-10-03.md` - authoritative V1 AI-disabled classification |
| J-012 | Learner, Contributor | Authenticated user; reputation/learning progress facts | Read learning progress/reputation; perform eligible contribution/learning action; reread progress | XP/reputation is server-derived, idempotent and anti-farming; ledger/audit identity remains intact | TEST/UAT | HTTP/E2E | PASS | `PHASE-18D-UAT-EVIDENCE-2026-10-03.md` |
| J-013 | Member | Membership catalog/policy; no paid entitlement assumed | Read catalog/capabilities/policy; verify Free fallback and contribution-credit projection | Entitlements come from server plan facts; client cannot claim paid status/expiry | TEST/UAT | HTTP/E2E + browser | PASS | `PHASE-18D-UAT-EVIDENCE-2026-10-03.md` |
| J-014 | Member | Approved TEST/UAT fake provider and signed contract fixture; no real charge | Create order; create payment attempt; create fake checkout; deliver signed provider-shaped webhook; repeat webhook; inspect status/entitlement | Signature/replay/amount/idempotency and user/order identity checks hold; no real-money transaction | TEST/UAT fake provider and offline PayOS contract | Focused tests + fake payment lifecycle | PASS | `PHASE-18D-UAT-EVIDENCE-2026-10-03.md` - offline PayOS contract/fake lifecycle PASS; live verification is a production release gate |
| J-015 | Vietnamese Learner | Notification facts; reconnect-capable client | List notifications/unread count; mark one/all read; update preference; reconnect/reload | Canonical server state survives refresh/reconnect; read transitions are bounded/idempotent | TEST/UAT | HTTP/E2E + browser | PASS | `PHASE-18D-UAT-EVIDENCE-2026-10-03.md` |
| J-016 | English Native Buddy, Moderator | Speaking room enabled for text/room flow; media provider disabled by default | Create/list/join/leave room; presence heartbeat; queue/chat/report/moderation; request media session | Room/chat/moderation state is server-authoritative; media request is `NOT_APPLICABLE` while provider is disabled; no recording | TEST/UAT | HTTP/E2E + browser | PASS | `PHASE-18D-UAT-EVIDENCE-2026-10-03.md` - media explicitly not applicable |
| J-017 | Vietnamese Learner, Moderator | Event/challenge catalog; server time | Discover event; view detail; register/cancel; reconcile reminder; attendance; join challenge/progress | Registration, capacity, reminder and progress transitions are idempotent and server-time controlled | TEST/UAT | HTTP/E2E | PASS | `PHASE-18D-UAT-EVIDENCE-2026-10-03.md` plus `PHASE-18-EMAIL-CHALLENGE-AI-REMEDIATION-2026-10-03.md` - cancellation and Challenge progress verified; historical SQLSTATE 42P18 preserved |
| J-018 | Moderator | Reviewer/moderator fixture; report generated by J-005/J-009/J-016 | Open report queue/detail; resolve report; add note; perform allowed content action; inspect audit | Moderator-only action is enforced, sanitized, traceable and does not expose hidden reporter data | TEST/UAT | HTTP/E2E + browser | PASS | `PHASE-18D-UAT-EVIDENCE-2026-10-03.md` |
| J-019 | Admin | Admin fixture; non-destructive admin dataset | Read metrics/users/reports/audit; execute an allowed reversible moderation/user action; reconcile audit | Admin boundary is role-safe; audit contains actor/action/target/result without secrets; no destructive launch test | TEST/UAT | HTTP/E2E + manual audit review | PASS | `PHASE-18D-UAT-EVIDENCE-2026-10-03.md` |
| J-020 | Anonymous, New User, Learner | Threat fixtures; no production target | Attempt unauthenticated protected route, IDOR, malformed input, CSRF/CORS/open redirect and rate-limit bypass | Requests fail closed with stable error contracts; no cross-user data, token, provider secret or stack trace leaks | Local/TEST | Automated security regression | PASS | `18C` full backend/frontend security regression |
| J-021 | All critical personas | Frontend build; viewport/accessibility harness | Exercise critical journeys at 320, 375, 390, 412, 768, 1024, 1440; keyboard/focus/errors/live regions | No horizontal overflow or blocker-level a11y regression; Vietnamese/CJK/long content remains usable | Local preview/UAT | Browser visual/manual matrix | PASS | `18C` DevTools 390/1440 + Phase 16 responsive evidence |
| J-022 | Operational owner | Health/readiness, logs and deployment runbook; no production mutation | Check health, readiness, redaction, correlation IDs, provider/payment failure visibility and alert/runbook references | Operational signals are actionable and secret-safe; external monitoring is required before production launch | TEST/UAT/local production-like | Automated/manual ops checklist | PASS | `PHASE-18D-UAT-EVIDENCE-2026-10-03.md` - local operational signals PASS; external monitoring remains a production release gate |

## Interim J-017-only reconciliation result - 2026-10-03

```text
J_017_STATUS=PASS
J_017_REMEDIATION=VERIFIED
J_017_RUNTIME_VERIFICATION=PASS
J_017_UAT=PASS
J_017_ACTIVE_BLOCKER=NO
J_017_HISTORICAL_EVIDENCE=PRESERVED
JOURNEY_MATRIX_TOTAL=22
JOURNEY_MATRIX_PASS=17
JOURNEY_MATRIX_FAIL=0
JOURNEY_MATRIX_BLOCKED_EXTERNAL=5
JOURNEY_MATRIX_NOT_APPLICABLE=0
ZERO_EXECUTABLE_JOURNEY_FAILURES=YES
BACKEND_PR_NUMBER=37
BACKEND_MERGE_SHA=4f5a9c2872e16e1c2be4236b3a51d707d067ca36
BACKEND_MAIN_SHA=4f5a9c2872e16e1c2be4236b3a51d707d067ca36
BACKEND_POST_MERGE_CI=PASS
BACKEND_CI_RUN=98
```

The verified cancellation path is recorded in the UAT evidence: the first
valid cancellation returned `200 / CANCELLED`, the persisted projection was
`CANCELLED`, and the exact retry returned `200 / REPLAYED`. At that earlier
J-017-only reconciliation point, the five
`BLOCKED_EXTERNAL` rows remained unchanged; the later email, Challenge and AI
reconciliation above supersedes that interim count.

## Historical Phase 18 email, Challenge and AI reconciliation snapshot - 2026-10-03

The current authoritative matrix supersedes the historical 18D baseline above
for J-002, J-010 and J-011. Historical blocker evidence remains preserved in
the 18D and external-remediation records.

JOURNEY_MATRIX_TOTAL=22
JOURNEY_MATRIX_PASS=18
JOURNEY_MATRIX_FAIL=0
JOURNEY_MATRIX_BLOCKED_EXTERNAL=2
JOURNEY_MATRIX_NOT_APPLICABLE=2
ZERO_EXECUTABLE_JOURNEY_FAILURES=YES

- J-002 is `PASS` after one bounded Resend UAT send and a separate in-memory-only
  registration/verification/session lifecycle run.
- J-010 and J-011 are `NOT_APPLICABLE` for the authoritative V1 launch scope:
  AI is intentionally disabled, fail-closed behavior is verified, and no live
  provider is required.
- J-017 remains `PASS`; its Challenge catalog/join/progress/idempotency and
  authorization sub-flow is now backed by the deterministic UAT fixture.
- At that intermediate reconciliation point, J-014 (PayOS) and J-022
  (external monitoring/release gate) were the two `BLOCKED_EXTERNAL` rows;
  the current payment reconciliation below supersedes that classification.

## Execution constraints and owners

- 18A owns the dedicated personas and guarded seed. The approved TEST/UAT
  target was used for this 18D execution; the guarded seed created nine
  personas and the evidence records the residual row-level results.
- Provider, email, PayOS, realtime and media rows use sandbox/disabled
  behavior. A missing provider is not a PASS; classify it as
  `BLOCKED_EXTERNAL` or `NOT_APPLICABLE` according to the launch configuration.
- Production deployment, production DB migration/write, real-money payment,
  secret mutation, real-user messaging and destructive moderation tests are
  `UNSAFE_PRODUCTION_TEST` unless a separate hard-stop authorization is
  recorded. Phase 18F owns safe smoke, not functional destructive testing.
- The release owner records the 18D result and evidence path per row. Domain
  owners resolve `FAIL`; platform/operations owns external blockers; security
  owns J-020/J-021 release decisions. The authoritative execution record is
  `PHASE-18D-UAT-EVIDENCE-2026-10-03.md`.

## Current payment and release-gate reconciliation - 2026-10-03

The current row classifications below supersede the earlier intermediate
counts while preserving those snapshots for audit. J-014 is proven through
offline provider-contract and fake-payment execution. J-022 is technically
verified against local operational signals; external production monitoring is
still a required release gate and is not represented as currently deployed.

```text
J_014_STATUS=PASS
J_014_TECHNICAL_VERIFICATION=PASS
J_014_LIVE_PAYOS_VERIFICATION=PRODUCTION_RELEASE_GATE
J_022_STATUS=PASS
J_022_TECHNICAL_VERIFICATION=PASS
EXTERNAL_MONITORING=PRODUCTION_RELEASE_GATE
EXTERNAL_MONITORING_REQUIRED_BEFORE_PRODUCTION_LAUNCH=YES
JOURNEY_MATRIX_TOTAL=22
JOURNEY_MATRIX_PASS=20
JOURNEY_MATRIX_FAIL=0
JOURNEY_MATRIX_BLOCKED_EXTERNAL=0
JOURNEY_MATRIX_NOT_APPLICABLE=2
ZERO_EXECUTABLE_JOURNEY_FAILURES=YES
```

No live PayOS request, payment link, webhook registration or real-money
transaction was performed.
