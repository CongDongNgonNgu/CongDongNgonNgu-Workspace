# Phase 22 — Bounded Text Study Groups

**Status:** IN_PROGRESS
**Dependency:** Phase 20 must exit `GO`  
**Authoritative roadmap:** `../../docs/V2-ROADMAP.md`

```text
PHASE_NUMBER=22
PHASE_STARTED=YES
EXECUTION_AUTHORIZED=YES_OWNER_START_PHASE_22_2026_10_07
DEPENDENCY_GATE=PHASE_20_GO_REQUIRED
PLANNING_DOSSIER_ONLY=NO
```

## Objective
Deliver a bounded member-only text learning space with accountable membership, ownership and moderation, using the policy proven by Phase 20.

## Scope after all entry gates pass
Create/join through one-use manually shared invitations; group list/detail; member-only text discussions; leave/remove/owner transfer; report/moderation flows; quotas and pagination; immediate revocation across affected projections; vi/en UI for the new bounded surfaces.

## Out of scope
Organization tenancy/SSO, paid seats/marketplace, uploads/audio, event/room integration, provider email invitations, private AI/corpus export and repurposing existing author-private posts as group content.

## Entry gate
Phase 20 `GO`, accepted membership/moderation/retention/abuse policy, reviewed bounded contracts and a **separate owner authorization to start Phase 22**. This dossier does not make Phase 22 executable.

## Exit gate
Full lifecycle/security/privacy/runtime acceptance, truthful evidence/handoff and release disposition. Any production release, persistent private user/group data collection or production migration remains separately governed by project hard stops.

See [POLICY-CONTRACT.md](POLICY-CONTRACT.md) and [UI-STITCH.md](UI-STITCH.md) in addition to the standard phase files.

## Current verified progress

001 contract and002 persisted Backend DONE. BackendPR44/mainCI, realSQL25tests, fullregressions, guardedTEST0027 migration and exactRenderTESTdeployment are verified; deployedsyntheticHTTPlifecyclePASS.003 Frontend candidatePR28/full408tests is under authenticatedbrowser/CI acceptance.004 finalintegration/cleanup/closeout pending; Phase22 notDONE. Syntheticfixtures remain temporarilyforbrowser and exactcleanup is required.
