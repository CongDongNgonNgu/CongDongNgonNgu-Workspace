# Phase 20 Threat Model — Planning

## Protected assets
Membership graph, invitation capability, member-only text, moderation/report records, ownership state and any projections that could reveal private group existence/content.

## Primary threats
- Cross-group IDOR and identifier enumeration.
- Stale authorization after leave/removal.
- One-use invitation replay or concurrent double-accept.
- Privilege escalation member→moderator→owner.
- Owner-transfer race creating zero/multiple unintended owners.
- Indirect disclosure through search, notification, cache, count or error behavior.
- Platform-role overreach beyond an explicit moderation contract.
- Reinterpreting existing author-private content as group-visible content.

## Required controls to validate
Authorization at every affected read/write boundary; group-scoped server-side checks; atomic invitation/member transitions where needed; fail-closed revocation; explicit moderator/platform capabilities; deterministic cleanup and no production fixture use.

## Residual-risk rule
Any known authorization or revocation leak prevents a Phase 20 `GO`. Abuse-policy or retention uncertainties that cannot be responsibly bounded must be carried as `DEFER`/`REJECT` rationale rather than hidden by test success.
