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

Template: `DEC-NNN — Title | Date | Status | Context | Decision | Consequences | Supersedes`.
