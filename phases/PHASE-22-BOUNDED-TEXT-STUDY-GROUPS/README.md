# Phase 22 — Bounded Text Study Groups

**Status:** VERIFYING
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

## Verified technical closeout

All four tasks DONE: frozen Phase20 policy inheritance, persisted PostgreSQL Backend, accessible vi/en native Frontend and approved TEST integration. BackendPR44 and FrontendPR28 merged with PR/main CI and branch cleanup. Real SQL25 tests and private regression47 PASS; Frontend408 tests; local browser116 and deployed Vercel117 checks PASS at all seven widths. Render/Vercel exact merged source revisions verified. Four synthetic actors/four groups cleaned with all scoped residual counts0. See [EVIDENCE.md](EVIDENCE.md), [HANDOFF.md](HANDOFF.md) and [VERDICT.md](VERDICT.md).

Technical TEST completion is bounded; real private-data release/global block/backup/deletion safeguards remain held. Production untouched, payment disabled. Phase23/24 remain unauthorized/unstarted. Final closeout PR/main CI and branch cleanup are required before terminal lifecycle completion.
