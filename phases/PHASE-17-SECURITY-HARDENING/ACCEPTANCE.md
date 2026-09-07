# Phase 17 Acceptance

- Threat model maps real modules/endpoints/providers and sensitive data.
- No unresolved critical/high finding is silently accepted; any external blocker has explicit owner/evidence/mitigation.
- Auth/OAuth/account-link and role/IDOR negative matrix passes.
- XSS/CSRF/injection/upload/redirect/SSRF-like risks are tested according to actual attack surface.
- Block/privacy/contact/realtime/room/community controls cannot be bypassed through alternate endpoints.
- AI retrieval/prompt/output paths do not cross user/private boundaries in tests.
- Payment/entitlement/contribution-credit adversarial suite passes.
- Secret/config/dependency audit has documented results and no exposed credential.
- Retention/deletion policy is explicit, especially voice/AI/community data.
- Fixes are committed/pushed and CI/security evidence complete.
