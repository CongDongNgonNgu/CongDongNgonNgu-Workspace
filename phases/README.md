# Delivery Phases

| Phase | Name | Primary dependency |
|---|---|---|
| 00 | Foundation & EduAI Domain Separation | Workspace initialized |
| 01 | Brand, Design System & Global Shell | 00 |
| 02 | Authentication & Identity | 01 |
| 03 | Language Profile & Onboarding | 02 |
| 04 | Language Hub | 03 |
| 05 | Community Core | 04 |
| 06 | Corrections & Q&A | 05 |
| 07 | Language Exchange | 05 |
| 08 | Open Language Library | 05 |
| 09 | AI Language Lab | 08 |
| 10 | Reputation & Gamification | 05 + 06 + 08 |
| 11 | Membership & Payments | 10 |
| 12 | Notifications & Realtime | 05 |
| 13 | Speaking Rooms | 12 |
| 14 | Challenges & Events | 13 |
| 15 | Admin & Moderation | 05 + 08 + 10 + 11 |
| 16 | PWA, SEO, Accessibility & Performance | mature core features |
| 17 | Security & Privacy Hardening | 16 |
| 18 | UAT & Production | 17 |
| 19 | Growth V2 | 18 |
| 20 | Scoped Study Group Policy & Authorization Experiment | 19 |
| 21 | Provenance-Safe Relational Retrieval Experiment | 20 |
| 22 | Bounded Text Study Groups | 20 |
| 23 | Verified Related-Resource Library Journey | 21 |
| 24 | Member Onboarding & Language Exchange Localization | 23 |
| 25 | Language Hub Functional Completion | 24 |
| 26 | Member Connection & Communication | 25 |
| 27 | Community & Collaborative Learning Completion | 26 |
| 28 | Community Experience & Content Hierarchy | 27 |
| 29 | Groups & Messaging Social UX | 28 |
| 30 | Rich Media & Attachments Platform | 29 |
| 31 | Learning Journey, Reputation & Shareable Progress | 30 |
| 32 | Profile & Language Passport Polish | 31 |
| 33 | Language Hub 2.0 & Proficiency Frameworks | 32 |
| 34 | Cross-Surface UX Consistency & Accessibility Sweep | 33 |
| 35 | Codex Full-System User Simulation | 34 |
| 36 | Pre-Launch Hardening | 35 |

Each implementation phase should maintain `README.md`, `TASKS.md`, `ACCEPTANCE.md`, `TEST-PLAN.md`, `HANDOFF.md`. UI-heavy phases also maintain `UI-STITCH.md` and use Stitch MCP before substantial UI implementation.

Codex selects only eligible tasks and updates `state/PROJECT-STATE.md` plus phase handoff after verified work. Task IDs use `LNG-<phase>-<sequence>`.
