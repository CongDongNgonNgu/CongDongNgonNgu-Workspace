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

Template: `DEC-NNN — Title | Date | Status | Context | Decision | Consequences | Supersedes`.
