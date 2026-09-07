# Security & Privacy Baseline

Identity: strong password hashing; verified reset flows; short-lived access tokens; protected refresh lifecycle; secure client storage/cookie strategy; explicit authorization; account-link collision protection.

Community: rate-limit abuse-prone writes; implement block/report/mute/privacy; preserve moderation evidence; do not expose private profile/contact fields for Language Exchange.

Web: boundary validation, safe output rendering, CSP/security headers where compatible, XSS/CSRF/injection defenses, constrained uploads and SSRF-aware remote fetch behavior.

Payments: provider signature verification, idempotency, identity/order correlation, audit-safe logs and fail-closed reconciliation. Never fulfill solely from client state.

AI: rate/cost limits, provider secret isolation, safe logging and moderation/safety controls as required. Avoid retaining unnecessary sensitive conversation data.

Secrets/logs: no secrets in repository, browser bundle, telemetry, screenshots or audit logs. Redact tokens, signatures and sensitive identifiers.

Privacy: document purpose/retention/deletion behavior for profiles, messages, corrections, audio and AI sessions. Speaking rooms do not record/store voice by default without explicit informed consent.

Phase 17 performs final threat-model and hardening review; earlier phases must still implement baseline security immediately.
