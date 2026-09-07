# Dependency Graph

```text
00 Foundation
  ↓
01 Brand & Design System
  ↓
02 Auth & Identity
  ↓
03 Language Profile
  ↓
04 Language Hub
  ↓
05 Community Core
  ├──→ 06 Corrections & Q&A ──┐
  ├──→ 07 Language Exchange   │
  ├──→ 08 Open Language Library ─→ 09 AI Language Lab
  └──→ 12 Notifications/Realtime ─→ 13 Speaking Rooms ─→ 14 Challenges/Events

05 + 06 + 08 ─→ 10 Reputation/Gamification ─→ 11 Membership/Payments
05 + 08 + 10 + 11 ─→ 15 Admin/Moderation
Mature implemented features ─→ 16 PWA/SEO/Performance ─→ 17 Security Hardening ─→ 18 UAT/Production ─→ 19 Growth V2
```

Rules:
- Begin a phase only when prerequisite completion gates pass.
- 06/07/08/12 may proceed in parallel after 05 if independent resources permit.
- 09 requires the provenance-aware Library contract.
- 10 waits for real community/correction/library contribution events before final points rules.
- 15 waits for real domain objects; do not build an empty generic admin first.
- 16 is a cross-cutting optimization pass, but responsiveness/accessibility are required earlier too.
- 17 is final hardening, not permission to postpone baseline security.
