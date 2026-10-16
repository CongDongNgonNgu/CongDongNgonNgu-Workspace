# V3 Planning Index — Post-Phase27 Product Refinement

**Recorded:** 2026-10-16 (Asia/Ho_Chi_Minh)

## Current state

- Phase27: **DONE / GO_BOUNDED_COLLABORATION**.
- Phase28: **READY / NOT STARTED** — next implementation target.
- Phases29–34: **PLANNED / NOT STARTED**.
- Phase35: **PLANNED / NOT STARTED** — renumbered from former Phase28 Full-System Simulation.
- Phase36: **PLANNED / NOT STARTED** — renumbered from former Phase29 Pre-Launch Hardening.

## Renumbering decision

The owner requested that product/UX work discovered during manual TEST review be completed before full-system simulation and launch hardening. Therefore:

- old `PHASE-28-CODEX-FULL-SYSTEM-SIMULATION` → `PHASE-35-CODEX-FULL-SYSTEM-SIMULATION`;
- old `PHASE-29-PRE-LAUNCH-HARDENING` → `PHASE-36-PRE-LAUNCH-HARDENING`.

No historical Phase27 evidence is rewritten by this decision.

## Dependency order

`27 → 28 → 29 → 30 → 31 → 32 → 33 → 34 → 35 → 36`

| Order | Phase | Dossier | Purpose |
|---|---:|---|---|
| 1 | 28 | [Community Experience & Content Hierarchy](PHASE-28-COMMUNITY-EXPERIENCE-CONTENT-HIERARCHY/README.md) | Social-learning Community UX refinement |
| 2 | 29 | [Groups & Messaging Social UX](PHASE-29-GROUPS-MESSAGING-SOCIAL-UX/README.md) | Discoverable groups/messages and coherent social communication UX |
| 3 | 30 | [Rich Media & Attachments Platform](PHASE-30-RICH-MEDIA-ATTACHMENTS/README.md) | Shared secure attachment/media infrastructure |
| 4 | 31 | [Learning Journey, Reputation & Shareable Progress](PHASE-31-LEARNING-JOURNEY-SHAREABLE-PROGRESS/README.md) | Motivating truthful progress and achievements |
| 5 | 32 | [Profile & Language Passport Polish](PHASE-32-PROFILE-LANGUAGE-PASSPORT-POLISH/README.md) | Identity/profile/avatar/account-nav refinement |
| 6 | 33 | [Language Hub 2.0 & Proficiency Frameworks](PHASE-33-LANGUAGE-HUB-2-PROFICIENCY/README.md) | Language-specific hubs/resources/proficiency models |
| 7 | 34 | [Cross-Surface UX Consistency & Accessibility Sweep](PHASE-34-UX-CONSISTENCY-ACCESSIBILITY/README.md) | Final cross-product UX/a11y integration |
| 8 | 35 | [Codex Full-System User Simulation](PHASE-35-CODEX-FULL-SYSTEM-SIMULATION/README.md) | Multi-account synthetic E2E validation |
| 9 | 36 | [Pre-Launch Hardening](PHASE-36-PRE-LAUNCH-HARDENING/README.md) | Release-readiness hardening |

## Common boundaries

Payment/provider activation, production DB mutation, production secret changes, destructive infrastructure work and public launch remain separately controlled. No phase may claim real-user value or production readiness from synthetic evidence alone.

## Next action

`NEXT_MAJOR_PHASE=28`
`NEXT_ACTION=EXECUTE_PHASE_28_ONLY`
