# Phase 20 — Scoped Study Group Policy & Authorization Experiment

**Status:** PLANNED  
**Source candidate:** `LNG-19-004`  
**Authoritative roadmap:** `../../docs/V2-ROADMAP.md`  
**Planning index:** `../V2-PLANNING-INDEX.md`

```text
PHASE_NUMBER=20
PHASE_STARTED=NO
EXECUTION_AUTHORIZED=NO
PLANNING_DOSSIER_ONLY=YES
```

## Objective
Determine whether a small text study group can enforce explicit membership, ownership, moderation, invitation and revocation boundaries without weakening existing author-private content semantics.

## Why this phase exists
Phase 19 identified group/private-community capability as an experiment rather than an implementation-ready product. Phase 20 resolves the highest-risk privacy and authorization questions before any full group feature is allowed to exist.

## Scope after explicit start authorization
- Policy tabletop and isolated TEST experiment using disposable synthetic groups/users only.
- Owner, moderator and member roles with explicit capabilities.
- One-use invitation lifecycle, join/leave/remove and last-owner/ownership-transfer rules.
- Member-only text content and moderation/report lifecycle.
- Negative matrix for anonymous, nonmember, member, moderator, owner and platform roles.
- Cross-group IDOR, invite replay/race, stale-session/revocation, list/search/notification/storage-path checks.
- Confirm existing `PRIVATE` content remains author-only and is never silently reinterpreted as group content.

## Out of scope
Full groups rollout, production schema/data, real invitations, organization tenancy/SSO, billing, uploads, audio, speaking rooms, private-corpus export, production telemetry and any real-user collection.

## Entry gate
Execution requires explicit `START_PHASE_20`, accepted synthetic policy cases, disposable fixture plan, cleanup criteria, and fail-closed expectations. Creating this dossier is not that authorization.

## Exit gate
Record actual experiment evidence and a `GO`, `DEFER`, or `REJECT` verdict. `GO` requires zero known authorization/revocation leakage in accepted cases. Phase 22 remains ineligible unless Phase 20 exits `GO` and receives its own later authorization.

See [TASKS.md](TASKS.md), [ACCEPTANCE.md](ACCEPTANCE.md), [TEST-PLAN.md](TEST-PLAN.md), [POLICY-MATRIX.md](POLICY-MATRIX.md), and [THREAT-MODEL.md](THREAT-MODEL.md).
