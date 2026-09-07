# Phase 02 Acceptance

- Email/password registration/login, verification and recovery pass positive and negative tests.
- Session expiry/refresh/logout/revocation behavior is defined and tested; sensitive tokens are not logged.
- Google OAuth is verified in an environment with valid credentials or explicitly remains `BLOCKED_EXTERNAL` rather than falsely marked DONE.
- Facebook/Zalo/Apple abstractions may remain disabled, but start/callback paths fail closed and config requirements are documented.
- Account collisions never silently merge based on email; linking requires explicit authenticated ownership.
- Authorization is enforced server-side on protected operations.
- Auth UI followed Stitch workflow, is responsive/accessibility-checked and provides safe recovery messaging.
- Build/tests/CI pass; commits pushed and evidence recorded.
