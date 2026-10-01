# Phase 14A Implementation Evidence

**Task:** LNG-14-001 — Challenge Model & Progress Rules  
**Status:** PASS — integrated remote  
**Observed:** 2026-10-01 / 2026-10-02 Asia/Saigon

## Delivery

- Backend feature commit: `c4e40fad8937ee502692064f8c924e2cf66692a9`
- Backend PR: #23
- Backend remote `main` after merge: `f9ef9396ae33f0ef373fdb64dcbad0a383519057`
- Backend branch cleanup: local and remote `phase-14a-challenge-foundation` deleted
- Post-merge GitHub Actions run: `36895801416` — `quality` PASS

## Implemented contract

- Versioned, configurable challenge definitions with bounded title,
  description, language, CEFR level, topic, finite goal, IANA timezone,
  start/end window, eligible activity types and optional reward event.
- Server-side rule evaluation rejects malformed, future, expired, outside-window,
  and ineligible activity evidence.
- Progress is derived from trusted activity inputs; clients cannot submit a
  progress total or completion claim.
- Stable idempotency and fingerprinting make exact retries replay-safe and
  altered replays conflicts.
- Participation is ownership-scoped and completion is persisted once at the
  configured finite goal. Reward output is a bounded projection, not an
  automatic provider or reputation mutation.
- In-memory and parameterized Postgres repository paths are wired through the
  existing module/persistence pattern.

## Verification

- `npm.cmd test -- --runInBand` — 121 suites, 746 tests PASS
- `npm.cmd test -- --runInBand src/challenges` — 3 suites, 9 tests PASS
- `npm.cmd run typecheck -- --pretty false` — PASS
- Migration static contract and rollback checks — PASS
- `git diff --cached --check` — PASS
- Existing migrations `0012`–`0020` unchanged.

## Safety boundary

- Migration `0021` was created and reviewed but not executed.
- No production database write, test database mutation, provider call,
  payment activation, deployment, secret mutation or credential creation.
- No raw provider payload, credential, stack trace or private moderation data
  is exposed by the challenge response contract.

## Handoff

The next dependency-eligible task is 14B / LNG-14-002. It must add the
authenticated/public-safe challenge discovery and participation surface on
top of the merged 14A service, use the required Stitch direction for the new
user-facing UI, and verify loading/empty/error/expired states, accessibility
and responsive behavior before its own merge gate.
