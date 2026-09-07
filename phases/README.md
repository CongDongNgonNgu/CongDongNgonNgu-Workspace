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

Each phase has `README.md`, `TASKS.md`, `ACCEPTANCE.md`, `TEST-PLAN.md`, `HANDOFF.md`. UI-heavy phases also have `UI-STITCH.md` and must use Stitch MCP before substantial UI implementation.

Codex selects only eligible tasks and updates `state/PROJECT-STATE.md` plus phase handoff after verified work. Task IDs use `LNG-<phase>-<sequence>`.
