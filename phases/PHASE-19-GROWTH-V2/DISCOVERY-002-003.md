# Phase 19 discovery — Speech and expert/teacher economy

Date: 2026-10-06 (Asia/Saigon). Profile: PRE_LAUNCH_FEATURE_EXPANSION.
This is a product/architecture assessment under the current owner amendment,
not implementation or launch authorization. Real users: NONE_KNOWN. Available
data is seed/demo/TEST/UAT; demand, effectiveness and commercial viability are
unvalidated hypotheses. No post-launch wait, telemetry installation, provider
account, ingestion, recording, production mutation or payment action is required
to accept this discovery document. READINESS rates ability to implement/release
the full candidate safely, not measured demand or completion of this assessment.

## LNG-19-002 — Pronunciation & Speech Discovery

| Owner assessment field | Assessment |
| --- | --- |
| PROBLEM_OR_PRODUCT_OPPORTUNITY | Offer optional speaking-practice feedback where present text AI/room capabilities cannot assess pronunciation. This is a pre-launch opportunity, not an observed learner complaint. |
| EXPECTED_PRODUCT_VALUE | Potentially shorten the feedback loop for learners practicing English/Vietnamese; make uncertainty and accent limitations visible. Learning improvement and willingness to use remain UNKNOWN. |
| EXISTING_CAPABILITY_REUSE | Reuse provider isolation/fail-closed pattern, authenticated ownership and purpose-specific consent concepts. Room media is disabled; post-room AI contracts accept a consented text artifact only. Neither is a recorder, transcription source or pronunciation model. |
| TECHNICAL_COMPLEXITY | HIGH: microphone permission/accessibility, audio validation/duration limits, latency/timeouts/cancellation, locale capability negotiation, provider cost bounds, calibration and accent fairness. Separate ASR correctness from pedagogical scoring validity. |
| SECURITY_PRIVACY_RISK | HIGH: identifiable voice and incidental third-party audio, consent withdrawal, replay/abuse, unsafe uploads, cross-user results, transcripts/log leakage and provider retention. No recording/retention by default; no speaker identification or voice cloning. |
| EXTERNAL_PROVIDER_DEPENDENCY | Unselected. Compare Azure pronunciation assessment with Google ASR as a transcription baseline and a no-provider/manual-feedback baseline. Documentary language support does not prove our latency, fairness or scoring quality. Common Voice is an optional research input, not a required production provider. |
| LEGAL_PAYMENT_DEPENDENCY | Dataset-specific terms/provenance, processing purpose, consent/retention, provider data-processing/region terms and cost approval remain prerequisites before use. No payment provider is needed for a fake isolated contract experiment. Paid/provider account creation remains a separate owner stop. |
| ESTIMATED_IMPLEMENTATION_SCOPE | Small design/fake-port experiment; LARGE full feature: speech-specific DTO/adapter, permission and accessible alternative UI, bounded audio processing, provenance/evaluation harness, abuse budget and approved retention/deletion controls. No calendar estimate until provider, languages and policy are approved. |
| TESTABILITY | HIGH for disabled/capability/ownership/consent/timeout/cost contracts with synthetic fixtures; model quality requires a separately authorized, legally usable accent-balanced benchmark and human reference ratings. Fake output cannot validate pronunciation effectiveness. |
| PRODUCTION_HARD_STOPS | Deployment/restart/config changes, provider credentials/activation, paid account creation, persistent production voice/transcript data or new instrumentation, production migrations and meaningful-data backup/restore requirements. No production execution is included here. |
| FUTURE_REAL_USER_VALIDATION_METRICS | Voluntary completion/abandonment, usefulness ratings, disagreement/appeal rate, independently assessed learning change, p50/p95 latency, cost per completed feedback, failure rate, consent withdrawals/deletion completion. Accent/locale analysis only with consent, safe cohort sizes and defined denominators. All are future metrics, not observed outcomes. |
| READINESS | LOW for production speech/scoring: no provider choice, validated scoring benchmark, consent/retention policy or measured operational budget. Design and deterministic fake experiments are testable without real users. |

### Repository evidence

- [Phase tasks](TASKS.md), [acceptance](ACCEPTANCE.md) and [experiment plan](TEST-PLAN.md): provider/language/fairness research, isolated prototypes, validated claims and consent policy.
- [Architecture](../../docs/02-ARCHITECTURE.md): speech/AI/provider adapters and fail-closed availability; no premature schema creation.
- [Licensing](../../docs/04-DATA-LICENSING.md), [data lifecycle](../../docs/08-DATA-LIFECYCLE.md), [post-room AI decision](../../docs/DEC-030-PHASE-13E-CONSENT-AWARE-POST-ROOM-AI.md).
- Backend `src/rooms/media-provider.ts`: `DisabledMediaProvider`; `InMemoryMediaProvider` explicitly test-only.
- Backend `src/ai/ai.post-room.contracts.ts`: `CONSENTED_TEXT_ARTIFACT`, purpose/versioned consent, authenticated owner; explicitly no recorder/transcript store.
- Backend `src/ai/ai.provider.ts`: `AiProviderRegistry` and `FailClosedAiProviderAdapter`. Reuse architectural conventions, not text completion contracts as an audio API.

### Current primary-source research

Checked 2026-10-06; documentary research only. No account/login/download/API call
to a speech provider or dataset ingestion occurred.

| Primary source | Verified fact and consequence |
| --- | --- |
| [Mozilla Common Voice platform/dataset](https://www.mozillafoundation.org/en/common-voice/platform-and-dataset/) | Multilingual crowdsourced speech resource; representation is an explicit concern. Does not establish pronunciation-scoring ground truth or suitability for our launch accents. |
| [Mozilla Common Voice ASR shared-task test dataset](https://mozilladatacollective.com/datasets/cminc35no007no707hql26lzk) | The official card lists CC0-1.0, intended ASR test predictions, no re-host/re-share and no attempt to identify speakers. Its listed language set is not the English/Vietnamese launch benchmark. This is one specific card, not a blanket finding for every release. |
| [Mozilla Data Collective terms](https://mozilladatacollective.com/terms) | Fetch timed out during research; platform-wide terms are NOT_VERIFIED. Inspect the selected release/card, current platform terms and intended use together before any acquisition; do not treat a CC0 label as permission to ignore access constraints. No release has been approved for use. |
| [Microsoft speech language support](https://learn.microsoft.com/en-us/azure/cognitive-services/speech-service/language-support?tabs=stt) | Search-indexed official pronunciation table includes English locales and vi-VN. Full-page fetch was unavailable; recheck exact endpoint/region/feature before procurement. Listed support is not our scoring-validity evidence. |
| [Microsoft pronunciation how-to](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/how-to-pronunciation-assessment?trk=article-ssr-frontend-pulse_little-text-block) | Official documentation describes baseline pronunciation assessment billed with speech-to-text and prosody limited to en-US. Feature-specific region/tier/add-on charges require a current quote; project cost/latency are UNMEASURED. No locally validated accuracy claim follows. |
| [Google Speech-to-Text supported languages](https://docs.cloud.google.com/speech-to-text/docs/speech-to-text-supported-languages) | ASR offers locale/model/region-specific support. A transcript or word-confidence value is not a validated pronunciation score. Use only as a future recognition baseline after region/model checks. |

### Architecture decision and bounded follow-up plan

**Decision: discovery accepted as a design recommendation; no provider selected.**
Keep a future speech adapter separate from chat/text AI, with explicit locale and
feature capabilities, disabled default, sanitized errors, authenticated result
ownership and server-enforced budgets. Prefer short single-person practice over
room-wide capture: existing room participation consent is not recording consent.
Do not route audio through text-artifact contracts or persist voice opportunistically.
Local/self-hosted ASR may reduce external transfer but adds operating/model-license
cost and still does not validate pronunciation scoring. Reject treating an ASR
confidence or model score as proof of learning correctness.

Bounded implementation/release criteria if promoted later:

1. Approve the narrow language/feature scope, threat model, consent purpose,
   withdrawal/deletion behavior, provider region/retention and cost ceiling.
2. An isolated fake contract spike may test capability refusal, bounded payloads,
   ownership, cancellations, timeout/disabled paths and redacted logs without
   storing or transmitting real voice. Any genuine audio experiment separately
   requires consent/rights and explicit dataset/provider clearance.
3. Before learner-facing scores, validate against authorized human-rated samples,
   inspect errors by accent/locale and predeclare usefulness/fairness tolerances.
   Test microphone denial/revocation, invalid audio, retries and accessible text
   alternatives. No benchmark, runtime or scoring-quality PASS is claimed here.
4. Production promotion needs its own implementation/release plan and hard-stop
   authorization. Keep disabled on any missing capability/policy; recovery is
   disablement/cancellation plus the approved deletion procedure, not silent
   reuse of stored audio. No voice data exists from this discovery.

## LNG-19-003 — Expert/Teacher Economy Discovery

| Owner assessment field | Assessment |
| --- | --- |
| PROBLEM_OR_PRODUCT_OPPORTUNITY | Add a trustworthy route to expert feedback and structured workshops beyond peer exchange. Teacher supply, demand and commercial viability are unvalidated pre-launch hypotheses. |
| EXPECTED_PRODUCT_VALUE | Potentially improve guidance and workshop quality while clarifying expert accountability. No claim of paid conversion, teacher earnings or certified learning outcomes. |
| EXISTING_CAPABILITY_REUSE | Existing EXPERT identity role, audit/moderation, events with scheduling/timezone/capacity/visibility, room host/participant boundaries and membership payment idempotency patterns. EXPERT grants no admin capability. Membership checkout is not teacher settlement/payout/refund infrastructure. |
| TECHNICAL_COMPLEXITY | HIGH: verification/revocation, service availability, bookings/timezones/conflicts, cancellation/no-show policy, disputes, commissions/payout ledger and reconciliation. Certification criteria must be independently defined. |
| SECURITY_PRIVACY_RISK | HIGH: forged credentials, expert/admin privilege confusion, private verification documents, harassment/contact leakage, booking IDOR, fraud and double payouts. Minimize verification evidence; separate public status from restricted reviewer artifacts and appeals. |
| EXTERNAL_PROVIDER_DEPENDENCY | Potential identity verification, calendar/video and marketplace-capable payment/payout providers; NONE selected. Existing disabled room media does not promise live tutoring delivery. No provider account creation is authorized. |
| LEGAL_PAYMENT_DEPENDENCY | UNRESOLVED: contracting parties/seller of record, tax/invoices, commission terms, payouts, refunds/chargebacks, consumer disputes, eligibility and minors/safeguarding. Payment provider unselected; paid workshop/marketplace build must not begin before operational/legal approval. This document is not legal advice or compliance clearance. |
| ESTIMATED_IMPLEMENTATION_SCOPE | Small design/operations tabletop; LARGE marketplace capability across identity, events, booking and commerce. A separately approved non-commercial verification design can precede commerce; no paid booking/payout implementation or speculative schema now. |
| TESTABILITY | HIGH for fake operations tabletop, role-negative cases, scheduling boundaries and state-transition design. Future financial integration needs sandbox concurrency/idempotency/reconciliation/refund tests; no live-money evidence can be inferred from mocks. |
| PRODUCTION_HARD_STOPS | Credential/provider installation or activation, live payout/webhook registration, real-money transaction, external paid accounts, deployment/config/database/migration operations and meaningful-data backup/recovery. Owner must approve operational/legal model before marketplace implementation. |
| FUTURE_REAL_USER_VALIDATION_METRICS | Verified supply/verification appeal and revocation rates, workshop sign-up/completion, learner usefulness, no-show/cancellation/dispute/refund rates, repeat participation and expert earnings after any separately authorized paid launch. Define denominators and safe cohort sizes; all are future validation. |
| READINESS | LOW for marketplace/payment implementation: provider, operational/legal model and verification policy unresolved. Non-commercial design/tabletop remains feasible without real users or payment activation. |

### Repository evidence

- [Tasks](TASKS.md), [acceptance](ACCEPTANCE.md), [experiment plan](TEST-PLAN.md): EXPERT/admin separation, payout/refund/legal/moderation approval and workflow tabletop.
- [Payment release boundary](../../docs/DEC-032-PHASE-18-PAYMENT-PROVIDER-RELEASE-GATE.md): provider-neutral membership port; implementing PayOS does not select it; demo payment remains disabled.
- [Architecture](../../docs/02-ARCHITECTURE.md), [security](../../docs/05-SECURITY.md), [data lifecycle](../../docs/08-DATA-LIFECYCLE.md): bounded contexts, authorization and unshipped retention/deletion controls.
- Backend `src/identity/role-policy.ts`: `EXPERT: []`; only ADMIN grants MANAGE_ROLES/MANAGE_USERS/VIEW_BILLING. An EXPERT role is not evidence of completed professional verification.
- Backend `src/events/event.types.ts`, `src/events/event.rules.ts`, `src/events/event.service.ts`: schedule/timezone/capacity/public-private/recurrence and host ownership patterns; these are not paid seat reservations.
- Backend `src/membership/membership.payment-provider.ts`: `DisabledMembershipPaymentProvider` returns unavailable/provider null; checkout interface has no teacher payout operation.

### Architecture decision and bounded follow-up plan

**Decision: separate professional verification from administrative privileges;
defer paid marketplace implementation pending operational/legal approval.**
Do not equate a manually assigned EXPERT role with a verified teaching credential,
and never grant admin/moderation powers merely because an expert hosts a workshop.
Use a future purpose-specific verification lifecycle with reviewer separation,
expiry/revocation/appeal and safe public claims. Reuse event scheduling concepts
without rewriting membership orders into bookings or paying teachers from a
membership entitlement ledger. A future booking/settlement boundary would own
its transitions and reconciliation; exact schemas/APIs await an approved scope.

Bounded implementation/release criteria if promoted later:

1. Conduct a fake tabletop with explicit parties, commission/payout timing,
   cancellations, refunds, no-shows, disputes, moderation escalation and tax/
   invoice responsibilities. Record unresolved policies; no compliance PASS.
2. If a non-commercial verification initiative is separately selected, first
   approve verification standards, public claims, evidence retention/access and
   appeals. Test forged/expired verification, revoked expert, self-approval,
   EXPERT-to-admin escalation and cross-user data access using test fixtures.
3. Marketplace implementation remains gated on owner-approved operational/legal
   model and suitable provider decision. Future tests cover conflicting seat
   reservations, DST/timezones, duplicate callbacks, lost/reordered callbacks,
   partial refunds, cancellation races and payout reconciliation. No such
   booking/payout implementation or executed test result is claimed here.
4. Production release needs its own deployment/payment/backup acceptance and
   explicit hard-stop authorization. Recovery must preserve already owed refund/
   payout obligations; disabling new bookings is not rollback of settled money.
   Payment-disabled UX and the current production monitor remain unchanged.
