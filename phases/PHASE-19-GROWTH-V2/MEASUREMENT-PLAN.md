# Phase 19A privacy-safe measurement plan

> Historical post-launch profile artifact. Owner PRE_LAUNCH_FEATURE_EXPANSION
> amendment (2026-10-06) supersedes its current evidence/observation dependency.
> Original findings/results retained; no metrics, collection access, window or
> suppression policy approved.


Status: planning artifact, not collected evidence or production activation.
Authority: LNG-19-001; validated same-Phase-19 recovery prompt received through
the terminal relay on 2026-10-06. [Source map](EVIDENCE-SOURCE-MAP.md),
[package template](../../evidence/phase-19/templates/POST-LAUNCH-EVIDENCE-PACKAGE-TEMPLATE.md)
and [conceptual gap design](INSTRUMENTATION-DESIGN.md) support this plan.
LNG-19-001 remains BLOCKED_EXTERNAL. No candidate rankings or decisions follow.

## Collection contract and boundaries

All metric values are UNAVAILABLE unless separately supplied approved real
observations establish them. Source/schema capability is not proof that rows
exist, migrations ran in production, or an aggregate endpoint is approved.
No production SQL, snapshots, raw record export, provider account, SDK,
instrumentation, credentials or production deployment is authorized here.
Availability and request counts are technical context, never product demand.

Use half-open windows [start,end), explicit Asia/Saigon or another approved
IANA timezone, UTC stored instants and a stated calendar-day conversion.
Deduplicate server facts by stable domain identity internally; export only
approved aggregates. A zero denominator yields N/A_NO_ELIGIBLE_DENOMINATOR,
never a rate of zero. UNAVAILABLE means missing/unsupported observations;
DISABLED means capability disabled; N/A means metric inapplicable with reason.
Suppressed cells show SUPPRESSED without revealing their underlying counts.
Do not infer absence, demand or feature success from those classifications.

## Proposed real-user cohort

An eligible participant is a real person using the approved production product
within the observation window whose account is not in an operator-reviewed
seed/TEST/UAT/automated/internal-validation exclusion registry. Exclude developer
smoke actors and admin/internal test actions when reliably identified. An admin
role alone is not proof of synthetic activity; explicitly distinguish real
operator work from product-user activity. Unknown-origin accounts/actions are
excluded from real-user estimates and reported as unclassified coverage, not
silently counted as real or synthetic. Do not identify test users by email
patterns, names or guesswork. Registry references never go into Workspace.

Synthetic monitors/incident traffic and anonymous page/health requests do not
qualify. ACTIVE requires a successful meaningful server-side domain action:
an eligible post/comment/correction, real-user Library contribution, accepted
exchange connection, or validated participation fact where available. Login
and account creation are separate counts. Profile declarations, notifications
and raw traffic alone are not learning activity. Deduplicate across domains
using operator-internal account identity only; publish no person-level joins.

COHORT_EXCLUSION_RELIABILITY=INSUFFICIENT until an approved classification
registry and timestamp/action semantics cover the sources. Existing schema
must not be assumed to carry a reliable universal seed/test marker. Before
collection, approve an exclusion provenance/version and quantify unclassified
coverage. No production registry or account mutation is part of this plan.

## Metric dictionary

Every row inherits these explicit fields unless overridden: time grain = daily
counts with window totals; cohort = eligible real users above; exclusion = the
versioned reviewed registry plus monitoring/internal/import exclusions; privacy
= AGGREGATE_NON_IDENTIFYING after approved suppression; current availability =
UNAVAILABLE (source potential only); minimum fields = internal opaque entity/
actor identity, event timestamp, qualifying state and exclusion/origin label.
None of these fields is exported individually. Source IDs resolve in the map.
Counts have denominator N/A_COUNT; rates below specify their eligible population.
Percentages are 100*numerator/denominator. These shared fields plus each row's
ID, name, purpose, definition/formula, source/extra fields, limits and new-event
need constitute the required metric contract.

| METRIC_ID / name | Decision purpose and definition / numerator | Denominator | Candidate source / extra minimum fields | Known limitations / new instrumentation required |
| --- | --- | --- | --- | --- |
| U01 ACTIVE_REAL_USERS | Distinct eligible actors with at least one qualifying successful domain action in window | N/A_COUNT | D,I,H1,H2,G / action kind | F acceptance excluded until reliable history exists; union coverage incomplete; potential existing facts after cohort approval; no new browser tracking required for supported actions |
| U02 NEW_REAL_USERS | Distinct eligible accounts whose creation instant is in window | N/A_COUNT | A1 / created_at | Signup is not activity or learning; existing facts potentially sufficient |
| U03 RETURNING_REAL_USERS | Actors active in window with qualifying activity strictly before window | N/A_COUNT | U01 sources / earlier activity | Requires complete prior history; account age/login alone insufficient; unavailable if prior history missing |
| U04 NEW_COHORT_RETURN_7D | Distinct accounts first qualifying-active in cohort day D that are qualifying-active on local day D+7 | First-active accounts on D with fully observed D+7 | U01 / first action, return day; grain cohort-day | Exact-day return, not rolling return; censor recent cohorts; missing history invalidates rate |
| U05 SESSION_CREATED_USERS | Distinct eligible actors creating a session, including refresh replacements, in window | N/A_COUNT | A2 / session creation | Security context only; NOT a login/active-use count; initial issuance vs refresh not separated; sensitive operator aggregation requires separate approval |
| L01 VALIDATED_LEARNING_COMPLETIONS | Unique trusted positive, unreversed completion source facts in window | N/A_COUNT | B / source type, created_at (completedAt for verified learning producers), reversal relation | XP awarded is not proficiency gain; live completion producers NOT_ESTABLISHED; persistence/wiring must be proven; no new event if trusted facts exist |
| L02 LIBRARY_CONSUMPTION | Distinct eligible actors with an approved explicit Library-consumption signal | N/A_COUNT | I / consumption event | Contribution/search content does not prove reading or improvement; needs new instrumentation if selected later |
| L03 LEARNING_IMPROVEMENT | Change in comparable validated pre/post assessment under an approved assessment method | Matched eligible assessments | Missing validated longitudinal assessment | UNAVAILABLE; no invented score or event can substitute for assessment validation |
| C01 COMMUNITY_AUTHORS | Distinct eligible authors of posts/comments/corrections created in window | N/A_COUNT | D / domain kind, created_at | Exclude seed/import/internal; current state alone loses removed-content history; use documented censoring; existing facts potentially sufficient |
| H01 ACTIVE_LANGUAGE_HUBS | Distinct active-catalog languages with at least one eligible qualifying language-scoped domain action | N/A_COUNT | E+D+I / language ID | Profile target selection/overview request is not hub participation; F excluded until reliable transition history; existing scoped actions only |
| H02 ACTIVE_HUB_PARTICIPANTS | Distinct eligible actors per active language with qualifying scoped action | N/A_COUNT | H01 sources | Multi-language totals do not sum to unique global users; suppress small groups |
| X01 EXCHANGE_STARTED | Distinct eligible exchange connections first transitioning to CONNECTED in window | N/A_COUNT | F / validated acceptance transition time and participant eligibility | UNAVAILABLE: dedicated acceptance history not established and terminal rows deleted; updated_at is not assumed acceptance time; CONNECTED is not completion; both actors must qualify |
| X02 EXCHANGE_COMPLETED | Connections with explicit validated completion occurrence in window | N/A_COUNT | F / completion fact | No completion fact => UNAVAILABLE; needs approved domain outcome instrumentation, never inferred from acceptance/message counts |
| X03 EXCHANGE_COMPLETION_RATE | Started connections in a stated start cohort that complete within approved horizon H | All started connections in cohort with H fully observed | F / acceptance/completion/cancellation times | Horizon H OWNER_DECISION_REQUIRED; cancellation/abandonment retained in denominator; pending censored starts excluded and counted separately; cannot derive without completion facts |
| R01 ROOM_PARTICIPANTS | Distinct eligible actors with a durable join fact in window | N/A_COUNT | G / joined_at,left_at,state | Join is not audio participation; disabled media gives no speech outcome; existing join records potentially sufficient |
| V01 EVENT_REGISTRATIONS | Unique eligible event registrations created in window | N/A_COUNT | H2 / registration state/time | Registration is not attendance; replay is not another registration; cancellations separately counted |
| V02 EVENT_ATTENDANCE | Distinct eligible registrations with validated attendance in window | N/A_COUNT | H2 / HOST_MARKED or ROOM_PRESENCE evidence/time | Only if durable supported attendance semantics exist; otherwise UNAVAILABLE; no inference from signup |
| V03 CHALLENGE_COMPLETIONS | Distinct eligible challenge participations reaching trusted COMPLETED state in window | N/A_COUNT | H1 / completion state/time | Trusted live progress producers NOT_ESTABLISHED; catalog availability or test participation is not completion; unsupported facts remain UNAVAILABLE |
| I01 ORGANIC_CONTRIBUTIONS | Unique eligible real-user contributions created in window | N/A_COUNT | I / origin, created_at | Separate imported corpus, seed content and real-user origin; provenance unknown => excluded/unclassified |
| I02 VERIFIED_CONTRIBUTIONS | Organic contributions receiving qualifying verification in window | N/A_COUNT | I / review action/time | Reviewer/test/import exclusions; not total corpus size; current status alone may not preserve transitions |
| I03 REVIEW_BACKLOG | Organic contributions awaiting review at end instant | N/A_COUNT | I / pending status and historical cutoff | Snapshot metric at end; past snapshots need reconstructable history; no retrospective inference from present status |
| I04 PROVENANCE_COMPLETENESS | Eligible resources satisfying their type-specific required source/license/attribution checks at end | All eligible resources evaluated at end | I / source validity, license, attribution flags | Completeness is not correctness or corpus maturity; requirements/version explicit; imported/organic cohorts separate |
| I05 ACTIVE_CONTRIBUTORS | Distinct eligible authors counted in I01 | N/A_COUNT | I | Not contribution volume; imports do not create real-user authors |
| S01 REPORTS_CREATED | Eligible production reports opened in window | N/A_COUNT | J / created_at | Sensitive domain; only authorized suppressed aggregate, no report text or target/reporter identifiers |
| S02 REPORTS_RESOLVED | Reports from S01 cohort with qualifying DISMISSED or ACTIONED disposition by end | N/A_COUNT | J / disposition history/time | OPEN excluded; validate transitions; reopening/cutoff explicitly documented |
| S03 RESOLUTION_RATE | S02 count | S01 count | J | Window-cohort resolution, not all-time closure ratio; report cohort may reflect operator/internal cases; sensitive approval required |
| S04 MEDIAN_RESOLUTION_TIME | Median elapsed duration from creation to first qualifying terminal disposition for resolved cohort | N/A_DURATION; publish eligible resolved sample size only if safe | J / created/resolved instants | Unresolved cases censored, not zero duration; current updated_at may not be reliable resolution time |
| S05 OPEN_REPORT_BACKLOG | Eligible nonterminal reports at end | N/A_COUNT | J / status history | End snapshot; not privacy-safe if cells expose cases; sensitive approval required |
| F01 FEEDBACK_THEME_FREQUENCY | Eligible redacted feedback samples mentioning a coded theme, max one count per sample/theme | Total eligible samples under same sampling method | O2 / manual theme coding | Selected/voluntary sample, not population demand; overlapping themes do not sum to 100%; manual approved input required |
| F02 SUPPORT_THEME_COUNT | Eligible support items in window by redacted theme | N/A_COUNT | O2 / source category, dates | GitHub engineering incidents ≠ user support; no external support channel assumed; manual input required |

Payment/membership paid conversion/churn = N/A_DISABLED. AI live usage/cost =
N/A_DISABLED. Their denominator/value is N/A, not zero; willingness-to-pay or
AI usefulness needs separate research evidence. Entitlements/credits are not
paid conversions. Future AI review would require redacted usefulness rubric,
latency distribution, priced token/cost aggregates and safety outcomes under
separate activation/consent approval, never stored prompts/transcripts here.

## Privacy and small-cohort proposal

PUBLIC_TECHNICAL: public monitor run/state. AGGREGATE_NON_IDENTIFYING: suppressed
windowed counts/ratios. PSEUDONYMOUS: internal join keys (still personal data,
not exportable here). PERSONAL_DATA: identities, timestamps linked to people,
session/network details. SENSITIVE_CONTENT: private messages, audio, feedback
or moderation bodies. Only the first two may appear in this package after review.

SMALL_COHORT_SUPPRESSION_POLICY=PROPOSED_NOT_APPROVED. Option K10: suppress
eligible cohort/sample counts below 10; more utility, higher identification
risk. Option K20: below 20; less utility, more conservative. Recommend K20 as
a discussion starting point, not proof of anonymity. Require numerator as well
as denominator protection, complementary-cell suppression and no differencing
across windows/drilldowns; sensitive themes may require coarser windows or no
publication regardless of K. Neither option is accepted production policy.
Until owner/privacy approval, do not publish product subgroup counts or rates.

## Observation-window options — owner decision required

Production/demo acceptance is dated 2026-10-05/06 in Phase 18; it does not prove
real-user observation began then. Start only at an approved eligibility/source
readiness instant, never silently backdate into seed/demo history.

| Option | Duration / termination | Advantages / expected categories | Limits and premature-conclusion risk |
| --- | --- | --- | --- |
| A SHORT | 7 complete approved local calendar days | Early qualitative support/themes and operational context | Likely sparse product cells; no fully observed 7-day return for newly arriving cohorts; not a feature decision window |
| B STANDARD (recommended proposal) | 28 complete approved local days; weekly aggregates | More repeated-use opportunities, organic/community/review flows, feedback and fully observed early return cohorts | Traffic may still be insufficient; no guaranteed sample, representative feedback or mature corpus |
| C TRAFFIC_OR_SAMPLE_TRIGGERED | Up to 56 approved days; stop only after owner-approved eligible/safe sample target N and coverage criteria, else classify insufficient at cap | Adapts to sparse demo traffic, prioritizes coverage/privacy | N/criteria OWNER_DECISION_REQUIRED; stopping on favorable results biases conclusions; pre-register once |

OBSERVATION_WINDOW=OWNER_DECISION_REQUIRED. Recommend B for predictable review
cadence with explicit insufficient-evidence outcomes, not an inferred traffic
forecast. No dates/window have been activated or accepted.

## Smallest remaining owner decision package

1. Choose A/B/C (or another explicit window/start) and approve eligible cohort/
   exclusion evidence provenance. Identify existing approved non-identifying
   aggregate reports and authorize their exact read-only access; source code
   potential does not authorize production SQL or user-level export.
2. Choose/review K10/K20 or a stricter suppression rule with privacy ownership;
   provide existing manually redacted feedback/support themes using the template.
3. If existing aggregates cannot close a necessary gap, separately authorize a
   concrete measurement implementation/production activation proposal only after
   privacy, retention, backup/recovery and release review. No such action is
   required to accept these planning artifacts, and none is authorized here.

EXISTING_APPROVED_SOURCES_AVAILABLE: repository technical/UAT documents and
public GitHub operational summaries only; no approved product aggregate feed
identified. Manual input: feedback/support, real-user exclusion provenance and
observation policy. New-instrumentation gaps: reliable cohort context, Library
consumption, exchange completion and unsupported validated learning outcomes;
not all gaps must be instrumented if the agreed review marks them unavailable.
PRODUCTION_INSTRUMENTATION_ACTIVATION_REQUIRED=NO for this recovery or a future
manual/existing-aggregate path; YES only conditionally if approved necessary
gaps require new production facts. No analytics provider is selected;
EXTERNAL_ANALYTICS_PROVIDER_DECISION=NOT_REQUIRED for this plan.

PHASE18_BACKUP_WAIVER_NOT_EXTENDED_TO_NEW_TELEMETRY=YES.
BACKUP_RECOVERY_REASSESSMENT_REQUIRED=YES before storing/relying on meaningful
new production evidence. Retention for new telemetry = OWNER_POLICY_REQUIRED.
Refer to [data lifecycle](../../docs/08-DATA-LIFECYCLE.md); no automatic purge
or unlimited retention is assumed. Planning completion is not evidence review
completion; downstream LNG-19-002–009 stay PLANNED.
