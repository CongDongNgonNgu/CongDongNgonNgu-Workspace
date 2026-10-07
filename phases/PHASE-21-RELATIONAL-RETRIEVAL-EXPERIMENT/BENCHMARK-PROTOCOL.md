# Phase 21 Benchmark Protocol — Planning

Execution addendum 2026-10-07: this original protocol is satisfied by the reviewed
[frozen contract](FROZEN-CONTRACT.md), [freeze review](FREEZE-REVIEW.md) and original
[fixture-v1.json](fixture-v1.json), integrated before candidate execution in PR #124.
Observed full comparison is in [raw results](benchmark-results-v1.json) and
[evidence](EVIDENCE.md); no post-observation label/config/threshold change occurred.

## Freeze before execution
1. Reviewed eligible resource fixture set with provenance/license status.
2. Bounded relation vocabulary and ownership/update semantics.
3. Query set and reviewer-approved relevance labels.
4. Lexical baseline configuration.
5. Candidate relational configuration.
6. Prospective thresholds for quality, abstention/support and zero eligibility/provenance leaks.

## Reporting
Report per-query and aggregate denominators, failures, abstentions and invalidation cases. Keep lexical/source-card fallback visible. A candidate that improves one metric while violating eligibility/provenance cannot receive `GO`.

## Integrity
No external AI/provider is required. No production corpus/index is created. Any fixture or query change after the comparison starts must be versioned and explained rather than silently replacing inconvenient evidence.
