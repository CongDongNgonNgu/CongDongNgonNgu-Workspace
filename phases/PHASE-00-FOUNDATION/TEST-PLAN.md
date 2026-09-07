# Phase 00 Test Plan

1. Install dependencies from clean checkout for both implementation repos.
2. Run backend type/build, schema validation and current automated tests.
3. Run frontend build, unit/component tests and a minimal route smoke test.
4. Search repository text for old product names/domains/API origins/secrets; review every hit.
5. Start apps with safe local/test config and verify no network calls target EduAI production.
6. Verify provider-disabled states fail safely rather than using old credentials/defaults.
7. Confirm `.env.example` contains placeholders only.
8. Confirm CI runs against the pushed SHAs and does not depend on uncommitted local files.

Evidence in `HANDOFF.md`: commands, test counts, relevant search results, commit SHAs and CI run/status.
