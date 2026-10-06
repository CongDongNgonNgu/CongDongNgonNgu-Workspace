# LNG-19-009 - Pre-launch Growth V2 portfolio

Date: 2026-10-06. Profile: PRE_LAUNCH_FEATURE_EXPANSION.
Inputs: [accepted owner scope](SCOPE-AMENDMENT.md), all seven integrated
[discoveries and normalized matrix](DISCOVERY-INDEX.md), and current repository
facts at Backend bec4ea4 / Frontend 940e278. No known real post-launch users;
seed/demo/TEST/UAT supports technical behavior only.

## Decision method

Prefer useful expansion of the global language community with bounded delivery,
clear reuse, explicit security/privacy controls, no required payment/provider
activation and deterministic technical acceptance. Product value is a reasoned
hypothesis based on owner direction, not observed adoption or demand. Compare
opportunity cost and scope alongside readiness; no invented numeric weighting,
cost, person-days or impact forecast. Readiness uses the index's common rubric
and distinguishes a narrow candidate from the full theme.

BUILD_NEXT means best next initiative according to owner product direction plus
technical evidence. It does not mean demand, retention or conversion proven,
implementation authorized or release approved. Exactly one disposition per
candidate below; narrower rejected approaches do not change that disposition.

## Comparison and classification

| Candidate | Product value hypothesis | Technical readiness | Reuse potential | Implementation effort | Security/privacy risk | External dependency | Legal/payment dependency | Operational burden | Testability | Future validation requirement | Disposition and rationale |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 002 Pronunciation/speech | Potentially richer speaking feedback | LOW scoring | Consent/provider/error/budget patterns, not existing audio | LARGE | HIGH voice retention, unsupported scores, accent fairness | Speech/model/benchmark unresolved | Consent/rights/processing/cost; no payment prerequisite | Benchmark reviewers, deletion, cost/latency | HIGH fake contracts; scientific validity unresolved | Consented usefulness/completion, independent learning/fairness, latency/cost | DEFER: needed consent/rights/provider/validity decisions; no evidence that value is absent |
| 003 Expert/teacher economy | Accountable expert guidance/workshops | LOW marketplace | EXPERT/events/moderation, not payout settlement | VERY_LARGE paid scope | HIGH fraud, credentials, minors, privilege/financial leakage | Verification/video/payment/payout unresolved | Legal parties/tax/payout/refund/payment not approved | Disputes, support, seller obligations | HIGH tabletop; financial sandbox later | Participation/usefulness, dispute/refund/no-show/earnings after approved paid launch | DEFER: unresolved legal/payment/operations preclude responsible near-term marketplace |
| 004 Groups/private/org spaces | Deeper recurring peer study context | MEDIUM text groups; LOW organizations | Identity/community/events/notification/reporting | LARGE text MVP; VERY_LARGE organizations | HIGH membership/revocation/private search/ownership | None required text MVP; email optional | Payment independent; minor/school/organization rules later | Moderation/quotas/ownership recovery/backup | HIGH two-group authorization TEST | Invite-to-first-action, fully observed repeat use, safety and owner workload | EXPERIMENT: test scoped membership/content policy before a full group build; organization tenancy excluded |
| 005 Native/wrapper | Mobile access if a reproducible gap exists | HIGH comparison; LOW new client | Existing PWA and Backend contracts | SMALL comparison; VERY_LARGE native | Cache/logout/bridge/deep-link/session | None decision; store/signing/push/audio later | Store/paid-feature rules require future review | Multi-client release/device/support/signing | HIGH web; physical devices not newly measured | Consented task/auth-return failure and support by safe device cohorts | DEFER native/wrapper: retain PWA per DEC-034; duplicate client lacks a demonstrated required capability gap |
| 006 Multilingual UI | Comprehensible global navigation and a complete Library journey | HIGH bounded foundation; MEDIUM all-product rollout | Existing UI primitives/formatting/content direction/typed API | MEDIUM foundation + journey; LARGE full rollout | Allowlist/plain interpolation/fallback; legal copy needs review | None required; copy reviewer prerequisite | Payment independent; accountable legal/consent copy review | Catalog maintenance, translations/support coverage | HIGH catalogs/formatters/browser/a11y; human copy review | Future comprehension/task completion and missing-copy/error reports | BUILD_NEXT: highest bounded preparedness with useful global positioning, low external/data dependence and no new private-content ownership |
| 007 Recommendation ML | Suitable reciprocal exchange suggestions | LOW deployed ML | Deterministic eligibility/scorer already exists | SMALL evaluator; LARGE ML | HIGH profiling/fairness/manipulation/private features | None baseline; model service unselected | Training/data-purpose/rights approval | Collection/labels/drift/model rollback | HIGH synthetic privacy/eligibility; real lift unavailable | Approved start-cohort acceptance/completion with censoring and safety | DEFER ML: preserve deterministic baseline; no trustworthy training/outcome source or need to replace it |
| 008 Knowledge Graph/RAG | Related-resource navigation/source-grounded answers | MEDIUM relational; LOW generated RAG | Licensed Library/lexical/single-source AI boundaries | MEDIUM relation experiment; LARGE generated RAG | HIGH stale ACL/license/citation/prompt leaks | None lexical; AI/index services later | Source-specific rights/corpus processing | Ontology/review/invalidation and token budgets later | HIGH fixtures; language/retrieval quality review later | Licensed reviewed benchmark recall/citation/abstention, later consenting user usefulness | EXPERIMENT: compare bounded relational/lexical retrieval with existing baseline before graph/vector/AI investment |

No candidate is REJECTED solely because real-user metrics do not exist. DEFER
means a future prerequisite/opportunity-cost decision, not zero demand.

## Why 006 first, and what could change that decision

Vietnamese-only UI is a verified technical fact and global-community positioning
is current product direction. A bounded locale journey can expand comprehension
without inventing a new private-content membership boundary, acquiring a provider
or collecting a training corpus. Readiness alone is not the reason: an actual
complete learner journey and reviewed copy must accompany the foundation.

004 could add deeper social functionality, but introduces new private membership,
revocation, ownership/moderation and retention obligations across search/content/
notifications. It follows a policy/authorization experiment rather than being
built wholesale. Owner priority for peer-community depth over global comprehension,
or lack of a qualified translation reviewer, could revise this recommendation
in a separately authorized initiative. Neither condition is fabricated here.
Native/scoring/marketplace/ML have larger external/data/validity dependencies;
008 non-generative experiment preserves source trust without AI activation.

## Proposed bounded future scope - 006 BUILD_NEXT

**PROPOSED_BOUNDED_FUTURE_SCOPE:** Keep Vietnamese; propose English as the first
additional UI locale for owner/copy-review approval, not assumed foreign demand.
Add one shared allowlisted locale resolver, feature-owned catalogs/fallback,
Intl-based formatting and explicit locale control. Complete shell plus Library
browse/search/detail/error/accessibility copy as one useful end-to-end journey.
Keep learning-language filters and user content language/direction independent.
Inventory auth/consent/legal/help/email/install/offline/SEO copy; publish truthful
coverage and fallback rather than implying all-product translation. Additional
journeys require separate scoped follow-up, not a monolithic rollout.

**EXPECTED_OUTCOME:** Reviewable Vietnamese/English comprehension path with
stable Backend identifiers, current design system and predictable fallback;
learning or conversion improvement remains unproven.

**MAJOR_ACCEPTANCE_CRITERIA:** Approved locale/glossary/fluent reviewer and
coverage boundary; key completeness/missing-key behavior; plural/date/number/
timezone correctness; safe interpolation and unknown-locale fallback; document
lang/dir separate from mixed content; unchanged direct URLs/hash/back/forward,
session/CSRF and disabled payment UX. Run existing tests plus component/E2E,
keyboard/focus/a11y, long-copy/pseudolocale and 320/375/390/412/768/1024/1440
checks; lint/typecheck/build/dependency/secret gates. No translation-quality
PASS from fixtures alone. New substantial control design uses project Stitch
policy where configured; scoped styles and existing primitives retained.

**DEPENDENCIES:** Owner selects first locale and reviewed support/fallback scope;
translation owner; safe catalog/library license/source review if added; approved
preference policy. Prefer browser-only preference, no new server profile field,
route-prefix migration or telemetry. Backend error codes stay stable; localize
approved mappings, not internal exceptions. Emails/legal meaning need accountable
review before any translated release claim. Scope estimate MEDIUM bounded,
no person-day or monetary promise.

**PRODUCTION_HARD_STOPS:** Future initiative authorization before implementation;
production deployment/restart/env or any later profile/schema/data write needs
separate explicit authorization. No provider/payment/AI activation, account,
credentials or telemetry justified by localization. Reassess backup if future
scope adds meaningful server data; current demo waiver is not expanded.

**FUTURE_VALIDATION_METRICS:** After separately approved actual launch, consenting
comprehension/task success = successful eligible Library tasks / attempted
eligible tasks, with cohort/timezone/window/fallback coverage; missing-copy/error
reports and support resolution. No current values or causal lift claim; no
measurement activation now. Release rollback restores Vietnamese fallback and
previous client revision under separately approved deployment recovery.

## Proposed bounded future experiment - 004

**PROPOSED_BOUNDED_FUTURE_SCOPE:** Policy tabletop and isolated TEST authorization
slice for text-only payment-independent groups: two synthetic groups, resource-
scoped owner/moderator/member, one-use invitation, leave/removal and member-only
content. No organizations/SSO/billing/public-corpus export/audio. No production
schema or new user data; test-only scaffolding if separately approved.

**EXPECTED_OUTCOME:** Resolve ownership/moderation/retention and demonstrate
deny-by-default policy before deciding a full group implementation.
**MAJOR_ACCEPTANCE_CRITERIA:** Approved transition/last-owner/appeal rules; complete
anonymous/nonmember/member/mod/owner/platform-role negative matrix; revoke all
read/write/list/search/notification/storage paths after removal; invite replay/
race and cross-group IDOR tests; preserve old author-private visibility.
Technical pass never establishes group demand. Record explicit stop/continue
criteria and abandon the design if ownership/access safeguards cannot be met.
**DEPENDENCIES:** Product policy owner, private-content lifecycle/support/moderation
and future backup/recovery. Backend policy/repository test scaffolding; Frontend
flow prototype only if needed; Workspace threat/tabletop evidence. LARGE later
MVP remains a separate decision after experiment.
**PRODUCTION_HARD_STOPS:** Future experiment/epic authorization, then separate
deployment/migrations/writes/invitations/provider/private data approvals.
**FUTURE_VALIDATION_METRICS:** Delivered eligible invite acceptance, first qualifying
contribution, return among fully observed cohorts, report rates and support work;
future consent/privacy/exclusion/denominator policy before collection. Recovery
for local experiment is discard fixtures; production lifecycle not approved.

## Proposed bounded future experiment - 008

**PROPOSED_BOUNDED_FUTURE_SCOPE:** Isolated synthetic reviewed query/resource set;
compare existing lexical search against relational concept/resource links and
safe source-card/citation projection. No vector/graph infrastructure, embeddings,
generated answers, AI activation, new corpus ingestion or production index.
**EXPECTED_OUTCOME:** Evidence of whether explicit relationships improve the
defined retrieval benchmark without compromising source authorization.
**MAJOR_ACCEPTANCE_CRITERIA:** Reviewer-approved query labels/answerability and
rights/provenance; identical eligible pools for lexical/relational runs; ACL/
license/source-health/deletion invalidation, malicious text/URL and invented-
citation negative cases; benchmark recall@k/precision@k/abstention and claim
support with declared denominators. Quality thresholds approved prospectively,
not fabricated here. Any known access/provenance leak blocks promotion.
**DEPENDENCIES:** Reviewed ontology, language reviewer and rights-permitted test
fixtures. Backend pure evaluator/projection first; Frontend source-card usability
prototype only if useful; Workspace benchmark/threat/release decision. MEDIUM
bounded experiment; mature real corpus before future generated-RAG release.
**PRODUCTION_HARD_STOPS:** Future experiment authorization, separately approved
corpus access/ingestion/index/schema/deploy/provider/data activation if needed.
**FUTURE_VALIDATION_METRICS:** Benchmark relevance and supported claims now only
if experiment later run; consenting post-launch discovery task success/rated
usefulness later. Fallback/rollback remains existing lexical search/source cards.

## Disposition completion and next boundary

002/003/005/007 have explicit re-entry triggers in their discoveries: approved
speech validity/rights, legal/payment operations, reproducible PWA gap and
trustworthy recommendation data/evaluation, respectively. No speculative UI or
schema is created to keep deferred themes visible.

All original candidate discoveries are complete as assessments; their future
portfolio dispositions do not cancel the DONE discovery tasks. 001 remains
CANCELLED, not evidence PASS. Phase 19 closeout is discovery/portfolio only.
No future epic/phase directory/task/branch was created. Phase 20 planning/build
requires a new explicit human authorization; production remains protected.
