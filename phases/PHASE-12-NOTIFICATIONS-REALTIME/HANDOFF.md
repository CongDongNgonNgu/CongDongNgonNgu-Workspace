# Phase 12 Handoff

**Current phase status:** `12B INTEGRATED_REMOTE_MAIN`

The historical `BLOCKED_BY_PHASE_05` label is retained only as prior planning
context. Phase 11 is now closed and Phase 12 is locally executing from the
synchronized baseline. The current 12B evidence is authoritative for the
local implementation and remote integration boundary; the prior 12A evidence
remains authoritative for its own remote integration boundary:

- `evidence/PHASE-12B-IMPLEMENTATION.md`
- `evidence/PHASE-12A-IMPLEMENTATION.md`
- `DECOMPOSITION.md`

12A completed the Backend-only notification domain/event contract foundation.
12B now adds canonical notification persistence, owner-scoped reads, unread
count, and idempotent read-state mutations. It does not start realtime
transport, preferences, provider activation, producer rewiring, or Frontend
UI. Backend PR #15 is merged to remote `main` at `7890ada`, with post-merge
CI run #54 passing. Workspace PR #33 is merged to remote `main` at
`2214a80`; Workspace has no required CI workflow for this documentation-only
integration.

Phase-wide status remains `IN_PROGRESS`; 12C must not start until a subsequent
ChatGPT orchestration prompt explicitly begins that subphase. No deployment,
production migration, production database mutation, or provider activation
occurred. Phase 13 is not ready.
