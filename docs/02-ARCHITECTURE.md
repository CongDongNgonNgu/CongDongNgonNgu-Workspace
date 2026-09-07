# Architecture Direction

Frontend, Backend and Workspace remain separate repositories. Workspace is the source of delivery state and decisions, not runtime code.

Phase 00 may reuse selected EduAI baseline only after a source-level `KEEP / ADAPT / REMOVE / BUILD_NEW / DEFER` audit. CongDongNgonNgu must have independent runtime configuration and environments.

Expected backend bounded contexts: Identity/Auth; Language Catalog/Profile; Community/Corrections; Exchange; Open Language Library; AI Practice; Reputation; Membership/Commerce; Notification/Realtime; Speaking/Event; Moderation/Admin/Audit.

Directional core entities include `User`, `Language`, `UserLanguage`, `LearningGoal`, `Post`, `Comment`, `Correction`, `BuddyPreference`, `ExchangeConnection`, `Vocabulary`, `Sentence`, `Translation`, `GrammarItem`, `Dialogue`, `Idiom`, `CulturalNote`, `Pronunciation`, `Contribution`, `PointsLedgerEntry`, `AIPracticeSession`, `Membership`, `Entitlement`, `Payment`, `Notification`, `Report`, `AuditLog`. Final schema is approved phase-by-phase; do not create every table prematurely.

API principles: versioned API; boundary validation; explicit authorization; suitable cursor pagination; idempotency for retry-sensitive/payment writes; stable safe error contracts; risk/cost-based rate limits.

Frontend principles: feature/domain organization, reusable primitives, typed API boundaries, backend-enforced authorization, session-safe state caching, intentional split between public SEO content and authenticated app surfaces.

OAuth, payments, AI, email, storage, realtime and speech providers sit behind adapters. Disabled/misconfigured providers fail closed and are observable.
