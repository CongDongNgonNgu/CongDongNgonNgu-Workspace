# Phase 17D Security Evidence - 2026-10-02

## Scope and heads

LNG-17-004 (abuse, privacy and community safety) and LNG-17-005 (AI
security and data boundaries) are accepted for this subphase after a
source-first review, focused negative regression suites, frontend hostile
content fixtures, and post-merge verification.

Reviewed heads:

- Backend main: `76fb2732a62da5437ed4390f74ebe0fb507fca46`
- Frontend main: `01331d6e4f768c9a5d0079658c60b7fcedddcaa8` (PR #24 merge)
- Workspace evidence base: `6cf5f0294d18900622759f16e28570332cf5871e`

No production deployment/restart, production database write or migration,
provider activation, secret mutation, force push, CI bypass, live payment or
live AI call occurred.

## Security matrix

| Boundary | Result | Evidence |
| --- | --- | --- |
| Community posts/comments/reactions/saves/reports | PASS | Controller guards and CSRF are retained; service ownership, visibility and moderation-state checks are server-authoritative; reports return a generic result; content is normalized and rendered as text. `community.service.spec.ts`, `community.contract.spec.ts`, `community.moderation.spec.ts`, `community.rate-limiter.spec.ts`. |
| Community abuse and reputation farming | PASS with residual | Per-user mutation limits, idempotency, block/report/mute paths and anti-farming ledger rules are covered by existing suites. The community limiter remains process-local by explicit Phase 05 decision; shared distributed limiting is a pre-horizontal-production gate. |
| Exchange contact/privacy projection | PASS | Discovery and buddy projections expose display name, public language relations, bounded goals/interests and summary flags only; email, phone, provider identity, exact timezone/availability, contact handles and reputation are absent. Contact permission is relationship-gated and block-aware. `exchange.service.spec.ts`, `exchange-safety.service.spec.ts`, profile projection tests. |
| Speaking rooms and realtime | PASS | Private-room access is server-checked; participant ownership, block/mute/report and room chat rate limits are enforced at service/repository boundaries; blocked messages are filtered in both directions; private tokens are hashed and compared safely. `room.service.spec.ts`, `room.participant.repository.spec.ts`, `room.interaction.repository.spec.ts`. |
| Events and private access | PASS | Private event reads require host or active invitation and unauthorized access uses bounded not-found behavior; attendance, registration and reminder actions remain owner/participant checked. `event.service.spec.ts`, `event.participation.spec.ts`. |
| Notifications and harassment surface | PASS | Reads and read-state mutations are recipient-scoped; cursors bind to the authenticated recipient; actor projection collapses inactive/unverified users to Deleted; semantic variables reject sensitive keys, control characters, oversized values and non-scalars; preferences can suppress in-app delivery. `notification.contracts.spec.ts`, `notification-event-integration.spec.ts`, `notification.read-state.spec.ts`. |
| Search/cache/SEO leakage | PASS | Public profile, exchange, community, event and Library projections omit private fields; Library search/detail require active, public, verified resources with valid provenance; the Phase 16 service worker keeps private/mutation/API routes network-only. |
| AI prompt injection and private retrieval | PASS | Conversation ownership is checked before reads/mutations; bounded history and input/output sizes are enforced; learner context excludes account/profile internals; Library retrieval uses `getPublicResource`, VERIFIED state, target-language match, bounded content and redistributable provenance before prompt construction; source/retrieved content is explicitly untrusted user data. `ai.learning.contracts.spec.ts`, `ai.learning.service.spec.ts`, `ai.conversation.contracts.spec.ts`, `ai.conversation.service.spec.ts`, `ai.post-room.contracts.spec.ts`. |
| AI provider/quota/output boundary | PASS | Provider adapters fail closed by default; runtime quota/rate/usage data contains IDs/counters/error codes rather than prompt/response content; strict exact-key structured-output parsers reject extra/provider-secret fields; post-room AI requires participant-bound explicit consent and one-party source artifacts. `ai.runtime.spec.ts`, `ai.provider.spec.ts`, `ai.usage.spec.ts`, `ai.post-room.service.spec.ts`. |
| Browser rendering of hostile content | PASS | Added PR #24 fixtures containing `<img ... onerror>` and `<script>` payloads for community author/content and AI model output. React text-node assertions prove no script or image element is created. |

## Commands and results

Backend focused security matrix:

```text
npm test -- --runInBand exchange/exchange.service.spec.ts exchange/exchange-safety.service.spec.ts community/community.service.spec.ts community/community.contract.spec.ts community/community.rate-limiter.spec.ts community/community.moderation.spec.ts rooms/room.service.spec.ts rooms/room.interaction.repository.spec.ts rooms/room.participant.repository.spec.ts events/event.service.spec.ts events/event.participation.spec.ts notifications/notification.contracts.spec.ts notifications/notification-event-integration.spec.ts notifications/notification.read-state.spec.ts ai/ai.learning.contracts.spec.ts ai/ai.learning.service.spec.ts ai/ai.conversation.contracts.spec.ts ai/ai.conversation.service.spec.ts ai/ai.post-room.contracts.spec.ts ai/ai.post-room.service.spec.ts ai/ai.runtime.spec.ts ai/ai.provider.spec.ts ai/ai.usage.spec.ts
23 suites / 122 tests PASS
```

Frontend hostile-content regression:

```text
npm test -- --run src/features/community/components/CommunityPostCard.test.tsx src/features/ai/conversation/components/ConversationWorkspace.test.tsx
2 suites / 8 tests PASS
```

Post-merge frontend gates on `main`:

- CI run `37006645276`: 3/3 checks passed; 82 test files / 341 tests passed.
- `npm test -- --run`: 82 files / 341 tests passed.
- `npm run typecheck`: PASS.
- `npm run build`: PASS.
- `npm run performance:check`: PASS.
- `npm audit --audit-level=high`: 0 vulnerabilities.
- `git diff --check`: PASS.

## Finding disposition

- H-002 IDOR/owner-identifier risk: CLOSED for the reviewed Phase 17
  resource matrix. Actor identity remains session-derived, ownership and
  relationship checks are service-owned, and the focused domain suites passed.
- H-003 content/upload/markdown/output execution risk: CLOSED for the actual
  attack surface. No runtime multipart route exists; outbound URLs are
  bounded; community and AI output are text/projection contracts; new browser
  hostile-content fixtures passed.
- H-004 AI prompt/private-retrieval leakage: CLOSED. Authenticated ownership,
  public VERIFIED Library retrieval, provenance/license checks, explicit
  untrusted-data envelopes, fail-closed providers and strict output parsing
  are executable and passed.
- H-005 commerce/payment: remains assigned to 17E and is not silently
  accepted here.
- M-002 abuse/privacy/retention: domain controls and privacy projections PASS,
  but two explicit residuals continue to 17F: the process-local community
  limiter must be replaced with shared infrastructure before horizontal
  production traffic, and retention/deletion reconciliation is still pending.
  Owner: community/platform/privacy owners; mitigation is fail-closed
  provider posture, bounded local limits, server-side authorization and the
  17F retention/release gate.

Phase 18 remains unstarted. The next eligible subphase is 17E.
