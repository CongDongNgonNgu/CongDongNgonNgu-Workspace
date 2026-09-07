# Phase 05 Test Plan

API/domain: create each post type; invalid language/level; edit/delete by owner vs other user; comments/replies/deleted parents; reaction idempotency; save privacy; report validation/privacy; pagination ordering/dedup; moderation-state visibility.

Security: XSS payload rendering, oversized content, rate-limit behavior, IDOR attempts and hidden/private share behavior.

E2E: compose→publish→feed→detail→comment→react→save→report, empty/loading/error states and mobile composer.

Responsive/a11y: 320/375/390/412/768/1024/1440, keyboard post actions/menus, focus restoration after composer/dialog, semantic headings/article relationships and screen-reader labels for reaction counts.
