# Architecture & Product Decisions

Append durable decisions; do not silently rewrite history.

## DEC-001 — Product identity
**Status:** Accepted. CongDongNgonNgu is an independent Global Language Community, not a language-themed EduAI clone.

## DEC-002 — Repository model
**Status:** Accepted. Frontend, Backend and Workspace remain separate repositories; EduAI repos are technical references only.

## DEC-003 — UI design workflow
**Status:** Accepted. Substantial UI work must use Stitch through MCP before implementation and be reviewed for originality, mobile behavior and accessibility.

## DEC-004 — Initial languages
**Status:** Accepted. Launch planning targets Vietnamese, English, Chinese, Japanese, Korean, French, German and Spanish; architecture stays data-driven/extensible.

## DEC-005 — Free/community principle
**Status:** Accepted. Free remains genuinely useful; membership enhances capability rather than walling off basic community value.

## DEC-006 — Contribution economy
**Status:** Accepted. Learning XP and Community Reputation are separate; contribution may earn membership credit through auditable ledger/entitlements.

## DEC-007 — Phase 02 identity and session architecture
**Status:** Accepted for local implementation on 2026-09-09. CongDongNgonNgu-owned
identity, PostgreSQL schema, verification/recovery tokens, server-tracked
refresh rotation, CSRF protection, provider abstraction, and explicit
account-linking rules are recorded in
`docs/DEC-007-PHASE-02-AUTH-IDENTITY.md`. Live Google verification and remote
publication remain external gates.

## DEC-008 - Phase 03 dependency exception
**Status:** Accepted for local Phase 03 backend implementation on 2026-09-10.
Phase 02 remains BLOCKED_EXTERNAL because live Google OAuth verification is
not available. Phase 03 is allowed to proceed because its backend foundation
depends on the committed internal User, session, and authorization contract,
not on a live external identity provider.

**Consequence:** Phase 02 must not be marked DONE, and Phase 03 cannot claim
final integrated acceptance until its own backend, frontend, and verification
gates are complete.

## DEC-009 - Profile privacy and availability representation
**Status:** Accepted for Phase 03A backend implementation on 2026-09-10.
Public profiles expose only explicitly public language relations and
non-sensitive profile content. Email, provider identifiers, roles, timezone,
security metadata, and exact availability remain private by default.

Availability is stored as local wall-clock half-open intervals
[start, end), with adjacent intervals allowed and overlapping intervals
rejected. The end-of-day boundary is represented by 24:00; cross-midnight
windows must be split across days. Changing the IANA timezone does not
silently convert saved local windows. Declared proficiency and future
assessed proficiency are separate fields, and profile edits preserve a future
assessed value rather than fabricating or clearing it.

## DEC-010 — Repository-enforced Codex and frontend architecture conventions
**Status:** Accepted on 2026-09-10.

**Context:** Phase work may run in fresh Codex sessions. Session memory is not a reliable architecture control, and recent frontend refactors established clearer responsibility boundaries for Auth, Onboarding, and Header.

**Decision:** Workspace is the canonical cross-repository source for Codex execution and frontend architecture rules. Every phase task inherits a mandatory preflight from root `AGENTS.md` and `docs/engineering/CODEX-WORKING-RULES.md`. Frontend work additionally inherits `docs/engineering/FRONTEND-ARCHITECTURE.md`, while the Frontend repository keeps a self-contained root `AGENTS.md` with executable local rules. New phase tasks use `templates/PHASE-TASK-TEMPLATE.md`.

**Consequences:** Architecture conformance becomes an acceptance gate alongside tests and CI. Component-specific CSS stays with its owning component; pages remain composition/orchestration boundaries; independent complex behavior moves to focused hooks/services/domain modules; files are split by responsibility rather than arbitrary line count. Target-repository rules may be stricter but cannot silently weaken the Workspace baseline. Future Codex sessions must reconstruct these rules from the repositories instead of relying on remembered instructions.

Template: `DEC-NNN — Title | Date | Status | Context | Decision | Consequences | Supersedes`.

## DEC-011 - Phase 04A language hub contracts
**Status:** Accepted for local Phase 04A backend implementation on 2026-09-11.

**Context:** Phase 04 needs one reusable language hub contract without
pretending that later resource, community or learner data already exists.
Filters must be shareable and deterministic before frontend URL integration.

**Decision:** Reuse the Phase 03 active language catalog and add one
parameterized overview route for every active language. Represent metrics with
explicit discriminated states so unavailable data is distinct from a real
zero. Mark future sections NOT_IMPLEMENTED and non-navigable until their
backing feature exists. Normalize optional CEFR levels to deduplicated
A1-to-C2 order and normalize opaque topics to stable hyphenated query values;
valid topics without backing data remain NOT_AVAILABLE_YET.

**Consequences:** Phase 04A adds no Phase 05/08 tables or fake educational
content. Backend contracts can be consumed by future frontend URL/filter
work, while LNG-04-001 and LNG-04-006 remain VERIFYING until that integration
is complete.

## DEC-012 - Phase 05A community backend foundation
Status: Accepted for local Phase 05A implementation on 2026-09-11.

Phase 05A uses one normalized moderation-ready post schema for the eight
launch post types, active language metadata, optional CEFR/topic data, plain
text content, bounded depth-0/1 comments, explicit idempotent reactions,
viewer-private saves, public-only canonical share links and generic reports.
The first feed primitive is deterministic (created_at DESC, id DESC) cursor
pagination with optional active-language filtering; it is not opaque
personalized ranking. Rate controls are process-local until shared
infrastructure is approved for horizontally scaled production. Full context
and the local verification boundary are recorded in
docs/DEC-012-PHASE-05-COMMUNITY-BACKEND.md.
