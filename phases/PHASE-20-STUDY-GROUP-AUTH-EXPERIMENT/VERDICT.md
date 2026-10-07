# Phase 20 final verdict

Date: 2026-10-07. Exactly one final verdict: **GO**.

GO accepts the frozen study-group policy as technically viable enough for later
separately authorized persisted implementation. It does not authorize Phase 22.
Phase closeout integration remains VERIFYING until its PR/CI/main/cleanup gates pass.

```text
PHASE_20_VERDICT=GO
POLICY_MODEL=PASS
KNOWN_AUTHORIZATION_LEAKS=0
KNOWN_REVOCATION_LEAKS=0
KNOWN_CROSS_GROUP_LEAKS=0
LEAK_CLAIM_SCOPE=ACCEPTED_SYNTHETIC_EXPERIMENT_CASES_ONLY
PRIVATE_CONTENT_SEMANTICS_PRESERVED=YES
FIXTURE_CLEANUP=PASS
TEST_ONLY_BOUNDARY=PASS
REAL_USER_DEMAND_EVIDENCE=NO
SYNTHETIC_EXPERIMENT_IS_DEMAND_EVIDENCE=NO
DISTRIBUTED_SQL_PROOF=DEFERRED_TO_PHASE_22
PHASE_22_ELIGIBLE=YES
PHASE_22_STARTED=NO
PHASE_22_EXECUTION_AUTHORIZED=NO
```

## Evidence and decision

[Observed evidence](EVIDENCE.md), [36 case results](TEST-RESULTS.json), and
[read-only TEST runtime](TEST-RUNTIME.json) reconcile the accepted matrix:
owner-only hashed/expiring/one-use invitations, moderator ordinary-member-only
removal, platform override DENY, exactly-one-owner transfer, fresh membership
ACL and immediate leave/remove revocation. Both groups deny foreign identifiers
and unauthorized list/search/count/error/projection disclosure. Replay, expiry,
revocation and queued single-process invitation races pass. Moderation/report
authority stays scoped; previous owner/moderator powers revoke immediately.
The actual unchanged CommunityService PRIVATE checks remain author-only.

Fixtures are synthetic, disposable, bounded and cleared after every case,
including failure/finally; adapter closes after disposal. Backend build graph
excludes the test adapter. No schema, DB, route, runtime provider, frontend or
existing private-content mutation was introduced. Required Backend gates,
PR/main CI and independent review pass. Runtime smoke covers the audit patch
deployment, not an HTTP group implementation.

The reviewer GO recommendation supports this decision; it does not substitute
for evidence review. No remaining Phase-20-scope defect invalidates promotion.
Initial cache-quota/coverage defects and critical proxy-addr audit finding were
remediated before final gates. Audit retains 20 moderate development-tree
findings; zero high/critical, not zero vulnerabilities. Review remains due
2026-10-14 or before next dependency work. These do not invalidate the isolated
authorization result. The failed TEST build was corrected and exact merged
revision is Live with read-only smoke PASS.

## Boundaries of GO

Only policy semantics and modeled projections in one process are proved.
SQL transactions/row locks/durable uniqueness, multi-worker races, persisted
invitation/transfer atomicity, actual notification/storage/offline cache ACL,
account-disable/global-block integration and HTTP/UI behavior are unproven.
No adoption, retention, moderation workload/effectiveness, community safety,
willingness, real-user demand, production readiness or long-term outcome is
inferred. Already delivered content cannot be recalled.

These risks are bounded for Phase 22 planning by the mandatory
[inheritance contract](HANDOFF.md). No next major phase may begin automatically.
