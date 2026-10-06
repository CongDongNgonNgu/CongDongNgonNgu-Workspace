# Phase 19 post-launch evidence package — blank template

> Historical post-launch profile artifact. Owner PRE_LAUNCH_FEATURE_EXPANSION
> amendment (2026-10-06) supersedes its current evidence/observation dependency.
> Original findings/results retained; no metrics, collection access, window or
> suppression policy approved.


This is not evidence. Replace REQUIRED fields only with approved observations;
keep missing/disabled/N/A explicitly classified with reasons. No example users,
counts or rates are supplied. Refer to the
[measurement plan](../../../phases/PHASE-19-GROWTH-V2/MEASUREMENT-PLAN.md).

## Package provenance

```text
PACKAGE_ID=REQUIRED
OBSERVATION_START=REQUIRED
OBSERVATION_END=REQUIRED
TIMEZONE=REQUIRED_IANA
ENVIRONMENT=REQUIRED
COLLECTED_AT=REQUIRED
SOURCE_APPROVAL_REFERENCE=REQUIRED_NON_SECRET_REFERENCE
COHORT_DEFINITION_VERSION=REQUIRED
SEED_TEST_EXCLUSIONS_VERSION=REQUIRED
COHORT_EXCLUSION_RELIABILITY=REQUIRED
SUPPRESSION_POLICY_APPROVAL=REQUIRED
PRIVACY_REVIEW_REFERENCE=REQUIRED
KNOWN_LIMITATIONS=REQUIRED
```

Observation instants include offsets; windows are half-open. APPROVAL references
must not be private credential URLs. Provenance identifies report/dashboard or
approved aggregate query ID/version, operator role, filter/cutoff semantics and
reproduction method without raw records, query results or credentials.

## Repeat this metric record for every required category

```text
OBSERVATION_START=REQUIRED
OBSERVATION_END=REQUIRED
TIMEZONE=REQUIRED_IANA
ENVIRONMENT=REQUIRED
METRIC_ID=REQUIRED
METRIC_NAME=REQUIRED
METRIC_VALUE=UNAVAILABLE
STATUS=UNAVAILABLE
STATUS_REASON=NO_APPROVED_OBSERVATION_SUPPLIED
NUMERATOR=UNAVAILABLE
DENOMINATOR=UNAVAILABLE
DEFINITION_VERSION=REQUIRED
TIME_GRAIN=REQUIRED
COHORT_DEFINITION=REQUIRED
SEED_TEST_EXCLUSIONS=REQUIRED
SOURCE=REQUIRED
PROVENANCE=REQUIRED_NON_SECRET_REFERENCE
PRIVACY_CLASS=AGGREGATE_NON_IDENTIFYING
SUPPRESSION_APPLIED=REQUIRED
KNOWN_LIMITATIONS=REQUIRED
COLLECTED_AT=REQUIRED
```

Allowed classifications: OBSERVED, UNAVAILABLE, DISABLED, N/A, SUPPRESSED.
OBSERVED requires actual approved data, definition and cohort/source coverage.
Counts use denominator N/A_COUNT; zero denominators use N/A with reason.
SUPPRESSED hides value and unsafe numerator/denominator; complementary cells
must not reveal it. DISABLED/N/A do not imply zero demand. Current paid conversion/
churn and AI live usage/cost are N/A_DISABLED with no invented values.

Required category checklist: product usage/new/returning/retention; supported
learning outcomes; language hubs; exchange; rooms/challenges/events where
applicable; organic Library growth/verification/provenance; moderation/safety;
feedback/support; membership/payment and AI applicability. Explicitly record
unsupported assessments, missing observations and excluded TEST/UAT/imported
corpus. Do not publish user-level records or use technical traffic as demand.

## Repeat this redacted feedback/theme record

```text
DATE_RANGE=REQUIRED
SOURCE_TYPE=REQUIRED
SAMPLE_SIZE=UNAVAILABLE
ELIGIBLE_SAMPLE_DEFINITION=REQUIRED
SEED_TEST_EXCLUSIONS=REQUIRED
THEME=REQUIRED_REDACTED_CATEGORY
THEME_COUNT=UNAVAILABLE
REPRESENTATIVE_PARAPHRASE=REQUIRED_NON_IDENTIFYING_OR_OMITTED
SEVERITY=REQUIRED_DEFINED_RUBRIC
AFFECTED_FLOW=REQUIRED
PROVENANCE=REQUIRED_NON_SECRET_REFERENCE
KNOWN_BIAS=REQUIRED
SUPPRESSION_APPLIED=REQUIRED
PRIVACY_REVIEW_REFERENCE=REQUIRED
```

No raw emails, names, account identifiers, private messages, voice, screenshots
of private cases, IP addresses or verbatim private quotations. Aggregate voluntary
feedback is not a representative population estimate. Count each eligible sample
once per theme; do not correlate themes/windows to identify respondents.

## Acceptance checklist

- Source access, observation/cohort and suppression policies are explicitly approved.
- Required metric fields, counts/denominators, unavailable reasons and provenance exist.
- Imports, seed/test/internal actors and synthetic monitoring are separated reliably.
- Privacy review covers small cells, complementary disclosure and linkage risks.
- Product outcomes are distinct from uptime, traffic, signup, XP and attendance proxies.
- No template/default value is treated as a collected observation or candidate decision.
- LNG-19-001 remains blocked until the actual package is reviewed against acceptance.
