# Architecture & Product Decisions

Append durable decisions; do not silently rewrite history.

## DEC-024 - Phase 10E bounded reputation reconciliation

Accepted for Phase 10E / LNG-10-008 on 2026-09-30. Reconciliation is a pure,
bounded, deterministic report over supplied ledger, derived-projection and
rule facts. It verifies idempotency and duplicate source identities,
append-only reversal links, derived XP/reputation balances, expected rewards,
timezone-aware streaks, badge and contributor-level projections, anti-farming
decisions and the owner Passport projection.

The report exposes only bounded issue codes and sanitized entry/source
references. It never repairs, persists, rewrites or deletes data; repair
status is explicitly `NOT_APPLIED` and `mutationApplied` is always false.
Rule versions remain explicit: `learning-xp-v1`, `community-reputation-v1`,
`community-gamification-v1` and `community-antifarming-v1`. The Phase 10A
`0012_phase10_reputation_ledger` migration remains unchanged; no additional
migration, database write, provider call or deployment is authorized by
10E. Full evidence is recorded in the Phase 10 handoff.

## DEC-023 — Phase 10D Passport and profile progress projection

Accepted for Phase 10D on 2026-09-30. The owner Passport may compose the
existing language profile with server projections for Learning XP and
Community Reputation, while public profiles remain identity/language views
without private progress. The backend is the sole authority for XP,
reputation, streaks, levels, thresholds, badge status and reversals.

The owner-only `GET /api/v1/reputation/progress` contract intentionally
projects only presentation-safe reputation data. It excludes ledger rows,
evidence source identifiers, rule versions, source types and internal ledger
summaries. The frontend does not calculate gamification values; it renders
server facts and handles loading, refresh, error, unauthorized, empty/new
learner, reversed badge and offline-adjacent states. Finite badge criteria
remain inspectable without exposing moderation or private audit data.

No schema change, migration, test database mutation, production database
mutation, provider call or deployment is part of Phase 10D. Stitch references
and browser evidence are recorded in
`docs/DEC-023-PHASE-10D-PASSPORT-PROGRESS-UI.md`.

## DEC-022 — Phase 10C badges, contributor levels and anti-farming

Accepted for Phase 10C on 2026-09-30. See
`docs/DEC-022-PHASE-10-BADGES-LEVELS-ANTI-FARMING.md` for the finite badge
criteria, versioned contributor-level thresholds, reversal behavior and the
server-fact-only V1 anti-farming boundary. No Phase 10C migration or mutable
badge/level projection is authorized.

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

## DEC-013 - Phase 02 Google OAuth production rollout
**Status:** Accepted and verified on 2026-09-17. This supersedes the temporary
live-provider dependency state recorded by DEC-008.

Production Google credentials were already configured in the CongDongNgonNgu
Render service and were not changed or exposed. Verified Backend and Frontend
main preserve subject-first identity, verified-email enforcement, one-time
OAuth state, session/CSRF protections, explicit linking, and collision
protection. The deployed Vercel `/api/v1` rewrite precedes the SPA fallback;
the provider capability endpoint, Google redirect, and real browser callback
were verified in production. No direct/manual production database mutation
was performed.

## DEC-014 - Phase 09A provider-neutral AI usage architecture
**Status:** Accepted for Phase 09A implementation on 2026-09-30.

Phase 09A establishes provider/model adapter contracts, optional streaming
capability metadata, bounded timeout/retry orchestration, fail-closed
disabled/misconfigured behavior, privacy-safe token/cost accounting, and
quota/rate-limit ports. It deliberately selects no provider, stores no
provider credential, creates no user-facing AI route, and creates no usage
schema migration. The detailed rationale and alternatives are recorded in
`docs/DEC-014-PHASE-09A-AI-PROVIDER-USAGE-ARCHITECTURE.md`.

## DEC-015 - Phase 09B learner context and prompt contracts
**Status:** Accepted for Phase 09B implementation on 2026-09-30.

Phase 09B projects only the selected active learning target, explicit
declared/assessed proficiency and normalized learning goals from the Phase 03
profile contract. Versioned prompts keep the system instruction static and
carry learner/profile text plus user input in an explicitly untrusted JSON
user message. Strict versioned validators cover writing corrections, grammar
coaching and quiz material with bounded fields and fail-closed parsing.
No provider, frontend surface, schema migration or live call is introduced.
The rationale and boundaries are recorded in
`docs/DEC-015-PHASE-09B-LEARNER-CONTEXT-PROMPT-CONTRACTS.md`.

## DEC-019 - Phase 09F safety, cost and non-destructive reconciliation
**Status:** Accepted for Phase 09F / LNG-09-008 on 2026-09-30.

Phase 09F keeps one provider-neutral AI path, normalizes runtime failures to
safe codes/messages, treats missing USD pricing as explicit unknown, fails
closed for invalid cost inputs, and audits bounded usage records without
mutating or persisting them. Duplicate request identities, invalid token/cost
facts, non-success charges, missing failure codes and invalid timestamps are
reported as deterministic issue codes. No provider credential, billing system,
database migration, production write or live AI call is introduced. The full
rationale and contract are recorded in
`docs/DEC-019-PHASE-09F-SAFETY-COST-RECONCILIATION.md`.

## DEC-021 - Phase 10B learning XP and timezone-aware streaks
**Status:** Accepted for Phase 10B / LNG-10-003 and LNG-10-004 on 2026-09-30.

Learning XP is awarded only by a trusted, bounded completion contract for
practice, focused sessions, vocabulary milestones and passing quiz
milestones. Events are versioned and idempotent by source identity; failed,
abandoned, future, empty and insufficiently evidenced events fail closed.
Streak days and milestone history are derived from positive, unreversed
Phase 10A `learning_xp` ledger entries, so no additional schema migration is
needed for 10B. The validated profile IANA timezone controls local calendar
projection, with explicit UTC default only when the profile has no timezone;
the pure calculator rejects timezone-less input. Timezone changes do not
create, rewrite or backfill ledger events and are never qualifying activity.
The full policy and alternatives are recorded in
`docs/DEC-021-PHASE-10-LEARNING-XP-STREAKS.md`.

## DEC-031 - Standing owner authorization for routine orchestration

**Status:** Accepted by the human project owner on 2026-10-01 and active
for all current and future project phases/subphases until explicitly revoked
or changed.

The owner directly authorizes Codex to perform routine source-control and
same-phase orchestration lifecycle actions without repeated permission
prompts: create and clean short-lived branches, commit, push, create or
update pull requests, observe and remediate ordinary CI failures, merge only
after required gates and branch protection pass, publish Workspace
evidence/state, verify remote `main`, synchronize local branches, and use
the established browser relay. Same-phase subphase chaining is authorized;
the next major phase remains a mandatory stop.

This standing authorization does not permit production deployment or
restart, production database writes/migrations, destructive schema/data or
infrastructure changes, real-money or live-provider activation, external
account/credential creation, secret rotation, production environment
mutation, security weakening, bypassing tests/CI/branch protection,
force-push/history rewrite, or mutation of authoritative financial facts.
Tool- or runtime-level safety requirements remain binding, including any
mandatory action-time confirmation for an external UI submission.

The canonical operational block is maintained in
`docs/engineering/CODEX-WORKING-RULES.md` under “Standing global
orchestration authorization”.

## DEC-032 - Phase 19 pre-launch scope and dependency amendment
Accepted by explicit owner Scope Correction on 2026-10-06. [Amendment](../phases/PHASE-19-GROWTH-V2/SCOPE-AMENDMENT.md) defines PRE_LAUNCH_FEATURE_EXPANSION / PRE_LAUNCH_DEMO. No known real users; seed/demo/UAT technical evidence not demand. 001 cancelled as inapplicable; all002 through 008 design eligible;009 compares. PRs#108-111 post-launch gates superseded for current profile; artifacts/results preserved. No artificial wait or production/activation/next-phase permission. Existing009 separate future-epic implementation boundary retained.
