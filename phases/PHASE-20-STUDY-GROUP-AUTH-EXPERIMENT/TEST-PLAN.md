# Phase 20 Test Plan

**State:** prospective; no test result is claimed by this file.

## Fixture model
Use disposable synthetic users and exactly two independent synthetic groups so cross-group isolation can be tested deterministically. Include owner, moderator, member, removed member, nonmember and platform-role actors.

## Core matrix
Test create/invite/join/read/write/list/search/moderate/report/leave/remove/transfer paths against every relevant actor. Include invalid/expired/used invitation tokens, duplicate requests, concurrent acceptance, removal during active access and stale client/session attempts.

## Security negatives
- Horizontal and vertical IDOR.
- Enumeration through list/search/count/error differences.
- Invitation replay and race behavior.
- Revocation propagation.
- Moderator privilege escalation.
- Owner-transfer/last-owner edge cases.
- Accidental access through notifications, caches or existing storage projections touched by the experiment.

## Regression
Run focused experiment tests plus all applicable Backend gates. Verify existing private-content tests remain unchanged/passing. Record commands, counts, commit SHA and CI only after they actually run.

## Cleanup
Prove fixtures are disposable and removed. Do not execute against production or retain synthetic results as product-demand evidence.
