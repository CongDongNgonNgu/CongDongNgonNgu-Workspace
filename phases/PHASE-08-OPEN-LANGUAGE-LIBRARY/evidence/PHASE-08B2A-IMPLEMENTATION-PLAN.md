# Phase 08B2A — Community Contribution Backend Foundation Plan

## Scope

Implement the backend/workspace foundation for `LNG-08-004` only. This slice
defines the contribution policy contract, validates member submissions, moves
eligible public drafts into `COMMUNITY_REVIEW`, and records one durable
contribution event atomically with the review transition. It does not add the
contribution form, Stitch work, reviewer UI, approval workflow, points, a
deployment, or a Neon TEST migration application.

## Baselines and branches

- Backend baseline: `850b0b0a36869effdad4b89063b1cc2a74bfe1e0`
- Frontend baseline and unchanged main: `4137f51e392f8aa947768e7dc7a28a29bf64f206`
- Workspace baseline: `3f863780cdfc38bd53d65da85ba630127ccb7f08`
- Backend/workspace review branch: `phase-08b2a-community-contribution`
- Frontend remains on `main`.

## Contract decisions

1. `GET /api/v1/library/contribution-policy` is public and returns the stable
   terms version, the explicit initial allowlist (`VOCABULARY`, `SENTENCE`,
   `TRANSLATION`), and only active licenses with explicit
   `redistributionAllowed=true`. `sourceNote` and other administration fields
   are never projected.
2. The backend-owned terms version is the stable value
   `library-contribution-v1`. Submissions must provide this exact value and
   actual boolean `true` values for `rightsConfirmed` and `reuseConsent`.
3. `POST /api/v1/library/resources/:resourceId/submit-contribution` requires
   the authenticated owner, cookie-session CSRF protection, an eligible
   `PUBLIC` `DRAFT`, actor-bound `ORIGINAL_AUTHOR` provenance, current active
   redistribution-safe licenses, and the current terms/consents.
4. The endpoint uses the existing lifecycle transition `DRAFT` →
   `COMMUNITY_REVIEW` and the normal `SUBMIT` review audit. It never verifies
   the resource and does not award Phase 10 points.
5. There is no suitable reusable durable Library event/outbox infrastructure:
   Phase 06 events are a separate domain contract and exchange event sinks are
   non-durable. Add the bounded `library_contribution_events` table in
   migration `0011`, with a unique `review_audit_id` linkage/idempotency key,
   strict consent checks, and restrictive audit/resource/user foreign keys.
6. The transition, audit, and event insert run in one PostgreSQL transaction.
   A retry after the resource leaves `DRAFT` returns a deterministic conflict;
   no duplicate event is created.

## Ordered implementation slices

### Slice 1 — Policy and domain contract

- [x] Add contribution constants, policy/event types, license listing, and
      submit DTO/controller contract.
- [x] Add failing service/repository tests for policy filtering, terms,
      booleans, allowlist, ownership, public visibility, provenance authority,
      and current-license gates.

### Slice 2 — Atomic persistence

- [x] Add `0011_library_contribution_events.sql` and its down migration without
      applying it.
- [x] Extend the in-memory repository with atomic transition/audit/event state
      and the PostgreSQL repository with one transaction.
- [x] Add repository tests for event insert failure rollback, audit failure
      rollback, unique audit linkage, and retry behavior.

### Slice 3 — HTTP verification

- [x] Add real HTTP E2E coverage for public policy and contribution submit,
      including auth, CSRF, ownership, no self-verification, public gating,
      safe errors, and no public visibility before verification.
- [x] Add static migration contract checks and freeze normalized SHA-256 values
      for 0011 while confirming 0001–0010 remain unchanged.

### Checkpoint — Backend contract

- [x] Focused Library tests, transaction tests, migration tests, HTTP E2E,
      typecheck, lint, build, audit, and diff check pass.

### Slice 4 — Workspace evidence

- [x] Replace the stale Phase 08 handoff workspace placeholder with the
      published Workspace SHA.
- [x] Update canonical state to `LNG_08_004=VERIFYING`, keep later tasks
      planned, and record implementation/verification evidence.
- [x] Verify frontend source and SHA are unchanged; record `DEPLOYED=NO` and
      both database mutation flags as `NO`.

## Acceptance criteria

- Only the three approved resource types are returned and accepted.
- Policy licenses are filtered fail-closed and never expose `sourceNote`.
- Terms and both affirmative boolean consents are mandatory and exact.
- Only the owner can submit; moderators/admins cannot impersonate owners.
- Submission requires PUBLIC, DRAFT, non-empty actor-bound ORIGINAL_AUTHOR
  provenance and current active redistribution-safe licenses.
- The result is COMMUNITY_REVIEW with a SUBMIT audit, never VERIFIED.
- Exactly one durable event is written only after a successful transition;
  event and transition/audit rollback together on failure.
- Retry/conflict behavior leaves event count at one.
- No Phase 10 points or processing state is added.
- Migration 0011 is created but not applied; production is untouched.

## Risks and mitigations

| Risk | Mitigation |
| --- | --- |
| License state changes between policy read and submit | Re-read every referenced license at submit and enforce explicit active/redistribution checks in the domain and persistence boundary. |
| Event/audit split-brain | Keep resource update, review audit, and event insert on the same PostgreSQL client transaction; test both failure points. |
| Resource-type expansion accidentally exposes future types | Use a dedicated three-value contribution allowlist derived from the existing Library type domain. |
| Reviewer/system provenance enters member flow | Require owner equality and every provenance row to be actor-bound `ORIGINAL_AUTHOR` on the dedicated endpoint. |
| Migration drift or accidental TEST mutation | Add static checksum tests, do not run the migration runner, and record the application boundary explicitly. |

## External review remediation before migration authorization

- [x] Reject generic owner `DRAFT -> COMMUNITY_REVIEW` for the explicit
      contribution allowlist with `LIBRARY_CONTRIBUTION_SUBMIT_REQUIRED` and
      retain the generic contract for non-allowlisted types.
- [x] Add service and HTTP regression coverage for VOCABULARY, SENTENCE, and
      TRANSLATION bypass denial, dedicated submission success, and zero event
      or audit side effects on the rejected path.
- [x] Move provenance authority and current license eligibility into the
      PostgreSQL submission transaction and lock referenced license rows with
      `FOR SHARE` until commit.
- [x] Require ACTIVE moderation state in both service and persistence gates.
- [x] Hydrate the committed response before `COMMIT`; roll back if hydration,
      audit, event, or provenance validation fails; prove no required query is
      issued after commit.
- [x] Re-run the full unit/E2E, typecheck/lint/build, audit, diff, and frozen
      migration contract checks without applying 0011.

## External gates

Migration authorization, external contract review, Phase 08B2B Stitch/frontend
work, owner visual acceptance, merge, deployment, and Phase 10 points remain
outside this slice. The expected stop state is `LNG_08_004=VERIFYING` and
`NEXT_ACTION=STOP_FOR_EXTERNAL_REVIEW_BEFORE_MIGRATION_AUTHORIZATION`.
