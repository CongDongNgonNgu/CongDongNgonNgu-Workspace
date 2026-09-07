# Phase 17 Tasks

## LNG-17-001 — Threat Model & Attack Surface Inventory
**Status:** PLANNED  
**Depends on:** Phase 16

Inventory trust boundaries, assets, actors and external providers. Cover browser/API/database, OAuth, AI, payment, email/storage/realtime/media, community content and admin. Map sensitive data and privileged actions. Rank abuse cases by impact/likelihood and link to concrete endpoints/modules.

## LNG-17-002 — Auth/OAuth/Authorization Adversarial Audit
**Depends on:** LNG-17-001

Test session fixation/replay/logout, reset/verify abuse, OAuth state/redirect/collision/linking, role escalation, IDOR across profiles/posts/corrections/exchange/library/notifications/payments/admin and blocked/suspended user behavior. Centralize fixes rather than endpoint-by-endpoint patches where possible.

## LNG-17-003 — Web/Input/Upload Security Audit
**Depends on:** LNG-17-001

Review validation, output encoding, CSP/security headers, CSRF strategy, XSS/HTML/markdown, SQL/ORM raw queries, SSRF-like remote fetch, file type/size/content validation, path traversal and unsafe redirects. Add malicious fixtures and upload quarantine/scanning strategy if uploads exist.

## LNG-17-004 — Abuse, Privacy & Community Safety Audit
**Depends on:** LNG-17-001

Review spam/rate limits, block/report/mute enforcement, exchange contact exposure, scraping risks, notification harassment, reputation farming, speaking-room moderation, event abuse and privacy projection. Ensure private fields/messages/rooms are inaccessible through search/cache/SEO APIs.

## LNG-17-005 — AI Security & Data Boundary Audit
**Depends on:** LNG-17-001, Phase 09

Test prompt injection via user/retrieved content, cross-user context leakage, unsafe tool/provider calls if any, quota bypass, model-output XSS and sensitive logging/retention. Confirm Library retrieval authorization and provenance are enforced before prompt construction.

## LNG-17-006 — Commerce/Payment Adversarial Audit
**Depends on:** LNG-17-001, Phase 11

Re-test signature verification, idempotency, event/order/payment/user identity chain, race/replay, amount/product tampering, entitlement escalation, contribution-credit double spend, reconciliation and audit sanitization. Use sandbox unless explicit owner authorization for real transactions.

## LNG-17-007 — Secrets, Dependencies & Configuration Audit
**Depends on:** LNG-17-001

Scan repo/history as tooling permits for credentials, verify production env validation, dependency vulnerabilities, unsafe defaults, CORS, trusted proxies, cookies, database privileges, provider permissions and debug endpoints. Upgrades requiring breaking changes get risk-assessed, not blindly applied.

## LNG-17-008 — Privacy/Retention & Security Reconciliation
**Depends on:** LNG-17-002..007

Document retention/deletion for account/profile/community/AI/audio/payment/audit data, verify user-facing controls/operational procedure as required, close findings and record residual risk. Run full security regression, commits/CI and update handoff.
