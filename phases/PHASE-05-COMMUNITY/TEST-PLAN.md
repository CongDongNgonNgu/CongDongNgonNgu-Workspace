# Phase 05 Test Plan

API/domain: create each post type; invalid language/level; edit/delete by owner vs other user; comments/replies/deleted parents; reaction idempotency; save privacy; report validation/privacy; pagination ordering/dedup; moderation-state visibility.

Security: XSS payload rendering, oversized content, rate-limit behavior, IDOR attempts and hidden/private share behavior.

E2E: compose→publish→feed→detail→comment→react→save→report, empty/loading/error states and mobile composer.

Responsive/a11y: 320/375/390/412/768/1024/1440, keyboard post actions/menus, focus restoration after composer/dialog, semantic headings/article relationships and screen-reader labels for reaction counts.

## Phase 05D execution record

- Security matrix: docs/phase-05/PHASE-05D-SECURITY-EVIDENCE.md.
- Backend: 61 unit tests across 13 suites and 35 E2E tests across 7 suites
  passed, with typecheck, lint, build, and high-severity audit passing.
- Frontend regression: 26 files / 126 tests, typecheck, lint, build, and
  high-severity audit passed on the unchanged accepted SHA.
- Real Neon TEST journey covered create -> feed -> detail -> comment -> reply
  -> Helpful -> Save -> Share -> report, ownership, privacy, rate limit, and
  deletion paths.
- Browser matrix passed at 320, 375, 390, 412, 768, 1024, and 1440 with no
  horizontal overflow. Lighthouse accessibility, best practices, and SEO were
  100 on populated desktop and mobile detail.
