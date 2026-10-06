# 19B pre-launch discovery index

Current profile: [owner amendment](SCOPE-AMENDMENT.md). All seven existing
candidates assessed; value is a hypothesis, not observed demand. No prototype,
provider activation, data ingestion, telemetry, application or production change.

| Task | Discovery artifact | Bounded readiness / wider release limitation |
| --- | --- | --- |
| LNG-19-002 Speech | [002-003](DISCOVERY-002-003.md) | LOW production scoring; consent/licensing/validated benchmark/provider decisions |
| LNG-19-003 Expert economy | [002-003](DISCOVERY-002-003.md) | LOW marketplace; unresolved legal/payout/refund/provider/operations |
| LNG-19-004 Groups | [004-006](DISCOVERY-004-006.md) | MEDIUM payment-independent study-group design; LOW organization tenancy |
| LNG-19-005 Native/wrapper | [004-006](DISCOVERY-004-006.md) | HIGH PWA comparison preparedness; LOW native implementation without reproduced gap |
| LNG-19-006 Multilingual UI | [004-006](DISCOVERY-004-006.md) | HIGH bounded locale foundation; MEDIUM full rollout pending copy/locale review |
| LNG-19-007 Recommendation ML | [007-008](DISCOVERY-007-008.md) | LOW ML; deterministic matching is current baseline |
| LNG-19-008 Graph/RAG | [007-008](DISCOVERY-007-008.md) | MEDIUM relational/lexical design; LOW generated RAG release |

Readiness columns distinguish the assessed bounded scope from the full theme.
They are engineering assessments, not authorization to implement or comparative
portfolio outcomes. LNG-19-009 owns classification after these discoveries.

## Current repository capability map

The preserved [source map](EVIDENCE-SOURCE-MAP.md) provides exact domain/migration
references; its former evidence-collection gate is historical. Structural
findings were rechecked in the candidate artifacts against unchanged Backend
bec4ea4ac58abcbae0eb01c0c58bf7c0fd55bae5 and Frontend
940e278555b2d33054fb2780d7348ded59ba2c3e.

| Current domain | Reusable contract and meaningful limitation |
| --- | --- |
| Identity/auth/roles | Session/CSRF and global role policy; EXPERT has no admin grants; scoped group roles need new policy |
| Language profiles/hubs | Language/level/goals/availability metadata and scoped hub views; learning language is not UI locale |
| Community/corrections | Public language-filtered recency and corrections; PRIVATE post is author-only, not shared group content |
| Reputation | Separate learning/reputation ledger/projections, not expert accreditation or organization billing |
| Exchange | Deterministic reciprocal matching and safety projection; no durable completion/acceptance history for future outcome metrics |
| Rooms | Host/moderator/token authorization, presence; media disabled; no production audio or pronunciation capability implied |
| Challenges/events | Schedules/capacity/invitation/attendance; no marketplace settlement or native background-audio support |
| Library | Public active verified licensed/provenance/source-health projections and lexical search; corpus maturity not proven |
| Admin/moderation | Reports/audit and global moderation; group-private intervention rules must be explicitly defined |
| Notifications | In-app/read-state flows; no demonstrated native/Web push subscription pipeline |
| PWA | Manifest/install/offline/update and no-private-cache policy; physical-device capability gaps not newly measured |
| Localization | Vietnamese shell/formatting, no locale catalog; content direction already independent |
| AI | Fail-closed provider boundary, consented text and single-source learning; not generalized RAG or audio scoring |
| Storage | Existing provider boundary and upload controls; voice/private-group lifecycle needs separately approved retention/access |
| Payments | Disabled provider-neutral membership checkout; not teacher payout/refund infrastructure |

Security/operations conclusions reuse existing Phase 17/18 controls without
turning TEST/UAT availability into product metrics. Detailed source links and
future tests reside with each candidate. No new runtime acceptance is claimed.

## Normalized portfolio inputs (no classification)

Rubric: HIGH = clear bounded architecture/reuse, few external/legal/data gaps,
deterministic tests; MEDIUM = meaningful architecture/operations gaps; LOW =
major provider/legal/payment/data/scientific-validity gaps. No readiness score
alone establishes priority. Values below concern the named bounded scope.

| Candidate | Problem/opportunity | Expected value hypothesis | Reuse | Complexity | Security/privacy | External dependency | Legal/payment | Implementation scope | Testability | Production hard stops | Future validation | Readiness |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 002 Speech/scoring | Text cannot assess pronunciation | Speaking feedback | Provider/consent patterns | HIGH | HIGH voice/claims/retention | Unselected speech/model | Consent/rights/cost; no payment requirement | LARGE full feature | HIGH fake contracts; quality benchmark unresolved | Voice/provider/data/deploy | Helpful completions, fairness, latency/cost | LOW |
| 003 Marketplace | Expert guidance/workshops | Accountable tutoring | EXPERT/events/moderation, not settlement | HIGH | HIGH impersonation/fraud/verification | Payout/video/verification unresolved | Legal/refunds/tax/payment unresolved | VERY_LARGE paid marketplace | HIGH fake tabletop; commerce later sandbox | Legal/provider/payment/data/deploy | Participation, disputes, repeat use | LOW |
| 004 Study groups | Durable bounded practice space | Member continuity | Identity/community/events/reports | MEDIUM-HIGH | HIGH cross-member leaks/revocation | None for text MVP | No billing; school/org policies later | LARGE across membership/content/UI | HIGH two-group TEST matrix | Private-data/schema/deploy | Invitation/first action/return/safety | MEDIUM |
| 005 PWA/native decision | Determine reproducible mobile gap | One maintainable client | Current manifest/cache/install/auth | LOW-MEDIUM comparison, HIGH new client | Private cache/bridge/links | None for decision; store/audio later | Store/legal rules unresolved before use | SMALL comparison; VERY_LARGE native | HIGH web, device evaluation not run | Accounts/signing/push/audio/deploy | Mobile task failures/support | HIGH comparison; LOW native |
| 006 Locale foundation | Vietnamese-only UI | Global comprehension | Shared primitives/formatters/content direction | MEDIUM bounded, HIGH full rollout | Allowlist/interpolation/session | None required | Reviewed copy/legal translations; payment independent | MEDIUM foundation/journey, LARGE all UI | HIGH resolver/catalog/pseudolocale | Profile data/schema/deploy if added | Comprehension/onboarding/untranslated errors | HIGH bounded, MEDIUM rollout |
| 007 Recommendation ML | Suitable reciprocal partners | Understandable matching | Existing deterministic eligibility/scorer | MEDIUM evaluator, HIGH ML | HIGH profiling/leakage/manipulation | None baseline; ML host optional later | Data purpose/rights, no payment | SMALL evaluator, LARGE ML | HIGH fixtures; real lift unavailable | Training data/provider/deploy | Cohort-correct acceptance/completion/safety | LOW ML |
| 008 Graph/RAG | Related resources/source-grounded answers | Traceable discovery | Licensed Library/lexical/single-source AI | MEDIUM relational, HIGH RAG | HIGH ACL/stale citations/prompt injection | None lexical; AI later | Source-specific rights/processors | MEDIUM read-only relation, LARGE generated RAG | HIGH fixtures; quality review later | Corpus/index/provider/deploy | Retrieval/citation support/answer usefulness | MEDIUM relation; LOW RAG |

## Future work by repository (estimates, not implementation)

| Candidate | BACKEND_SCOPE | FRONTEND_SCOPE | WORKSPACE/OPS_SCOPE | SCHEMA_MIGRATION_EXPECTED | EXTERNAL_SERVICE_EXPECTED |
| --- | --- | --- | --- | --- | --- |
| 002 | Capability/consent/budget audio adapter | Permission/feedback/accessible alternative | Rights, accent benchmark, retention/cost policy | POSSIBLE | YES for hosted scoring; local option unselected |
| 003 | Verification/booking/settlement distinct from membership | Expert profile, scheduling/disputes | Legal/payout/refund/fraud/support model | YES for full marketplace | YES for paid capability |
| 004 | Scoped membership/invites/content auth/audit | Focused group management/discussion | Moderation/ownership/retention/backup | YES | OPTIONAL approved email, no required new provider |
| 005 | Preserve API/auth contracts | Device harness or separately approved client layer | Device/support/store/signing ADR | NO for decision | OPTIONAL for future push/audio/distribution |
| 006 | Stable error-code mappings; emails later separate | Locale resolver/catalog/format shell + one journey | Locale/copy owner and completeness/release review | NO for browser-only foundation; POSSIBLE future profile | NO required |
| 007 | Keep scorer; isolated evaluator only first | Explanation design if later selected | Dataset/labels/fairness/drift/fallback review | NO evaluator; POSSIBLE future events | NO evaluator; OPTIONAL model hosting |
| 008 | Relational/lexical evaluator, eligible-source projection | Source cards/citations if later selected | Ontology/rights/benchmarks/invalidation owner | POSSIBLE, not created | NO baseline; OPTIONAL AI later |

## Security negative cases by candidate

All future writes retain existing session authentication/CSRF; no discovery
changes runtime. Sensitive operations must enforce authorization server-side,
escape plain text and sanitized logs, and preserve bounded pagination/rate limits.
Candidate-specific additions to the detailed reports:

- 002: enforce audio size/type/duration limits, authenticated consent/result
  ownership, reject spoofed URLs and arbitrary provider fetch (SSRF), redact
  transcript/voice logs and provide non-recording alternatives. Provider training/
  retention/deletion terms are UNVERIFIED, requiring review before use.
- 003: reject expert-to-admin elevation/self-verification and booking IDOR;
  signed-URL/storage access protects verification artifacts. Review minors,
  conflicts of interest and retaliatory/fake ratings; do not equate reputation
  points with a credential. Refund/payout obligations survive disabled bookings.
- 004: reject invite replay/IDOR and role escalation; revoke list/detail/search/
  notification/storage access after departure. Plain-text group names/content
  preserve XSS/injection controls. School/minor use and moderation escalation
  need explicit policy; arbitrary invite redirects are not accepted.
- 005: allowlist auth/deep-link destinations, reject open redirects and unsafe
  bridge capabilities; preserve CSRF/cookies/no-private-cache. Camera/media are
  outside current PWA comparison needs; any added permissions require separate
  purpose review, never blanket access from installing a wrapper.
- 006: reject unknown locale/catalog paths/HTML interpolation, verify format
  and Unicode bounds, preserve error codes/log sanitization and existing auth
  redirects. Translation content is trusted-reviewed copy, never user-provided
  executable markup. Do not add locale telemetry or infer sensitive attributes.
- 007: eligibility/block/opt-out precedes rank; feature allowlist excludes
  private data. Preserve explanation privacy, test manipulated profiles and
  language exposure/coverage to limit filter bubbles. Any model drift/retrain
  plan needs provenance and deterministic fallback; no logging pipeline now.
- 008: recheck ACL/license/source health/version on retrieval and output; reject
  fabricated citations, unsafe source URLs/SSRF and retrieved instructions;
  revoke stale indexes/cache after deletion. Content provenance does not confer
  contributor-account access or permission to transmit private text externally.

All future acceptance combines deterministic technical tests with separately
approved real-user product validation; no present runtime/prototype result is
claimed. PROTOTYPE=N/A_NOT_REQUIRED for this design-only discovery.
