# Phase 07D — Safety and matching reconciliation plan

Status: VERIFYING on `phase-07d-safety-reconciliation`

Scope: `LNG-07-006 Block, Report & Contact Permission` and `LNG-07-007 Matching / Safety Reconciliation` only.

## Outcome

Deliver server-enforced language-exchange safety controls with a persisted Postgres implementation and deterministic in-memory coverage:

- pairwise blocking hides both directions from discovery and profile preview, prevents new or future relationship/contact actions, and removes pending/connected relationships;
- only the actor who created a block can remove that block, and unblocking never restores a relationship or request;
- authenticated users can submit bounded, typed reports without exposing reporter identity or moderation internals;
- contact permission is a contract-only decision (`ALLOWED`, `DENIED_NOT_CONNECTED`, `DENIED_BLOCKED`, `DENIED_PERMISSION`, `DENIED_INELIGIBLE`), with no chat or contact-data delivery;
- the same safety decision is reused by discovery, preview, request, and contact-permission evaluation.

## Implementation slices

1. **Contracts and persistence boundary**
   - Add typed safety/block/report/contact contracts and controller DTOs.
   - Add `0008_language_exchange_safety.sql` plus a down script, statically validate only.
   - Preserve migrations `0001`–`0007`; do not run `db:migrate` or mutate Neon TEST/production in this phase.

2. **Backend safety store and lifecycle**
   - Add deterministic in-memory and Postgres safety repositories.
   - Replace the module’s `NoopExchangeSafetyGate` with the real persistence-selected gate.
   - Enforce UUID/session-derived actor identity, self-action rejection, idempotent block/unblock, bounded report normalization, duplicate report policy `(reporter, target, category)`, and private moderation storage.

3. **Connection and matching reconciliation**
   - Add pairwise safety checks to relationship reads and mutations.
   - Make Postgres block + relationship removal atomic under a canonical pair advisory transaction lock; connection mutations acquire the same lock and fail closed when blocked.
   - Keep the in-memory path deterministic and serialized; make safety removal prevent later relationship mutations.
   - Reuse the gate in discovery, profile preview, request, and contact permission. Do not change matching weights, signals, pagination, or safe public projections.

4. **Frontend safety UI**
   - Extend the exchange API/types with block status, block/unblock, report, and contact-permission contracts.
   - Add accessible safety actions to Buddy Profile Preview using existing `DropdownMenu`, `Dialog`, form controls, button tokens, and colocated CSS Modules.
   - Include confirmation for block/unblock, private report copy, bounded category/context validation, loading/success/error states, and a generic blocked/unavailable state without revealing block direction.
   - Keep the UI contract-only: no chat, notification, room, phone, email, or admin controls.

5. **Evidence and gates**
   - Add focused backend/frontend regression tests, race/IDOR/privacy tests, migration static tests, and responsive/a11y coverage at the required widths.
   - Run backend and frontend typecheck, lint, unit, build, audit, focused browser checks, and `git diff --check`.
   - Record Stitch refs: canonical project `projects/3718538619973058970`, design system `assets/16442026920550574436`, desktop safety `3ee2e0e074dd4063a98b713307c069f9`, desktop report `c5063b23a22f4487a8a2b3f9829c3cd4`, mobile safety/report `62b786973da84b96a057b77c604058cc`, mobile blocked `ef622a5d2f1949da925c563f64382daf`.
   - Update phase evidence and status to `VERIFYING` for LNG-07-006/007 while keeping PHASE_07 `IN_PROGRESS`; stop at the owner visual acceptance gate before any publication.

## Safety and privacy decisions

- Block storage is directional, but every eligibility/relationship decision treats either active direction as a pairwise block.
- A blocked relationship is removed server-side. Requests, accepts, declines, cancels, disconnects, profile preview, and contact permission all fail closed or return a generic unavailable/denied result without exposing the direction or timestamp.
- An actor-owned block status is readable only by that actor so a blocker can unblock; the other party never receives the actor’s block metadata.
- Reports contain only reporter, target, bounded category/context, state, and timestamps. There is no target-facing read endpoint. Repeated identical reports are idempotent; different categories remain distinct moderation signals.
- Existing matching behavior is unchanged except for the shared safety gate exclusion. Contact permission does not deliver contact identifiers and does not imply messaging.

## Verification exit criteria

- Backend safety, relationship lifecycle, matching exclusion, contact decision, report privacy, duplicate policy, Postgres SQL, and race-policy tests pass.
- Frontend API/page tests pass, including duplicate-click prevention, confirmation, report validation, success/error states, blocked state, focus behavior, and responsive layout/a11y checks.
- No migration has been applied; `MIGRATION_REQUIRED=YES` and `TEST_DB_MUTATED=NO` are reported if the schema is needed.
- Owner visual acceptance is explicitly `PENDING` until reviewed at 1440px and 390px; no main merge, deployment, or production action is allowed before `YES`.
