# Phase 07 Test Plan

- Unit tests for match score components/weights/ties and reciprocal language scenarios.
- Eligibility tests for self, block, private, opt-out, inactive user and unsupported language.
- Timezone/availability overlap including DST-safe representation.
- API tests for request/accept/decline/cancel/disconnect, duplicate retries and crossed requests.
- Privacy projection/IDOR tests; ensure contact fields absent.
- E2E discovery→preview→request→accept/block/report flows.
- Responsive/visual matrix and keyboard/screen-reader filter/card/action behavior.

## Phase 07C focused coverage

- Backend repository/service tests for request creation, self-request rejection, duplicate retries, reciprocal convergence, accept/decline/cancel/disconnect authorization, inactive/ineligible targets, state retrieval, privacy projection and the Phase 12 event seam.
- Backend API tests for authenticated actor derivation, no spoofable actor body, IDOR/state isolation, safe preview fields, CSRF behavior and deterministic relationship responses.
- Frontend component/API tests for the four relationship states, every action's loading/success/error behavior, duplicate-click prevention, safe-field absence and Partner Discovery navigation.
- Browser evidence at 320, 375, 390, 412, 768, 1024 and 1440px with keyboard/focus and no-overflow checks. Block/report is intentionally not part of the 07C runtime surface.
