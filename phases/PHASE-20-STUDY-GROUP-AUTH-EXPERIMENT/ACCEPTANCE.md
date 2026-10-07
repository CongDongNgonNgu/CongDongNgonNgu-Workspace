# Phase 20 Acceptance

This preserves the original acceptance contract. Observed disposition is
[PASS within the frozen scope](EVIDENCE.md); final reviewed verdict is
[GO](VERDICT.md). Integration remains VERIFYING until closeout gates pass.

## Required experiment outcomes
- Deterministic positive and negative authorization matrix is frozen before evaluation.
- Anonymous and nonmember access to member-only group resources fails closed.
- Member/moderator/owner permissions match the approved capability table exactly.
- Cross-group identifiers cannot be used to read, mutate, list, search or indirectly expose another group's protected resources.
- One-use invitations resist replay and relevant concurrent acceptance races.
- Leave/removal/revocation takes effect across all experiment read/write projections without relying on stale authorization.
- Last-owner and ownership-transfer cases cannot orphan or silently seize a group.
- Existing author-private content remains author-only.
- Moderation/report actions preserve actor scope and do not create platform-role privilege confusion.
- Disposable fixtures are cleaned up and no production data is mutated.

## Verdict
Phase closeout must record `GO`, `DEFER`, or `REJECT` with observed evidence and unresolved risks. `GO` is a technical/privacy feasibility verdict only; it is not proof of real-user demand or safe long-term community outcomes.

## Hard stops
No production migration, persistent real-user/group collection, real invitation delivery, billing/provider activation, private corpus export, or security-policy weakening is authorized by this phase plan.
