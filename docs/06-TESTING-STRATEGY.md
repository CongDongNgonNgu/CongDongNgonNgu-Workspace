# Testing Strategy

Testing layers: unit tests for domain rules/utilities; service/integration tests for persistence, authorization and provider adapters; HTTP/API tests for validation/permission/error contracts; frontend component tests; Playwright critical-journey E2E; visual regression for major UI surfaces; production-safe smoke checks after deployment.

Negative coverage is mandatory for auth/account linking, authorization, moderation, uploads, AI quotas, membership entitlements, payments/webhooks, privacy/block boundaries and contribution-point farming.

Responsive matrix for major surfaces: 320, 375, 390, 412, 768, 1024, 1440. Verify interaction, overflow, touch targets, drawers/modals and content hierarchy, not screenshots alone.

Accessibility includes automated checks plus keyboard/focus/manual semantic review on critical flows. New accessibility regressions block task DONE.

Evidence must include reproducible commands, suite/test counts, failures fixed, screenshots/artifact references when relevant, commit SHA and CI result. Do not claim integration/UAT PASS from mocks where real provider/runtime behavior is required.
