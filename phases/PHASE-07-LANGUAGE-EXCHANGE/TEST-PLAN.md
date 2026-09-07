# Phase 07 Test Plan

- Unit tests for match score components/weights/ties and reciprocal language scenarios.
- Eligibility tests for self, block, private, opt-out, inactive user and unsupported language.
- Timezone/availability overlap including DST-safe representation.
- API tests for request/accept/decline/cancel/disconnect, duplicate retries and crossed requests.
- Privacy projection/IDOR tests; ensure contact fields absent.
- E2E discovery→preview→request→accept/block/report flows.
- Responsive/visual matrix and keyboard/screen-reader filter/card/action behavior.
