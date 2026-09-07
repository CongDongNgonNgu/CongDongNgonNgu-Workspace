# Phase 17 Test Plan

Create a security matrix by domain and record each command/fixture/result. Minimum cases: auth token replay/expiry/link collision; IDOR for every user-owned resource; privilege escalation; malicious community/markdown/diff/AI output; upload/path/size/type cases where uploads exist; CSRF/CORS/open redirect; rate-limit bypass attempts; block/privacy/search/cache leakage; prompt injection/private retrieval; payment signature/replay/collision/amount tamper; contribution redemption concurrency; admin audit sanitization; secrets/dependency/config scans.

Run full unit/integration/HTTP/E2E regression after fixes. Production-safe probes only; no destructive testing against real users/data without explicit authorization.
