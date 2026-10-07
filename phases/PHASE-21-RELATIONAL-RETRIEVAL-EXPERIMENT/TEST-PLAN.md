# Phase 21 Test Plan

**State:** prospective; no benchmark result is recorded here.

Execution addendum 2026-10-07: [observed evidence](EVIDENCE.md) records 34 focused,
872 Backend unit and 143 e2e tests PASS, plus lint/typecheck/build/audit and
independent review. Original prospective requirements remain unchanged. No
runtime related endpoint or persistent cache/projection exists in this experiment.

## Benchmark preparation
Freeze labeled queries, expected relevant resource set, relation vocabulary, language/type/level filters and the exact eligibility snapshot used for comparison. Exclude private/ineligible material.

## Comparison
Run lexical baseline and bounded relational retrieval over the same fixture set. Capture per-query ranked outputs and accepted quality metrics with denominators.

## Safety/provenance cases
Test PUBLIC/ACTIVE/VERIFIED transitions, source/license invalidation, deletion, stale projection/cache behavior, filter enforcement, unsupported relation, no-result abstention and citation/source-card correctness.

## Regression
Run applicable Backend tests/build/lint/typecheck/audit gates plus current Library eligibility/provenance regression suites. Record only actually observed commands/results/SHAs/CI.

## Prohibited shortcuts
Do not use generated labels after seeing candidate outputs, do not change thresholds post hoc to force `GO`, and do not treat synthetic benchmark quality as user-outcome evidence.
