# Phase 14 Handoff

**Phase status:** IN_PROGRESS — 14D ready

The Phase 13 final gate and closeout are PASS. The synchronized Phase 14
decomposition is recorded in `DECOMPOSITION.md`:

`14A` challenge model/progress (`LNG-14-001`), `14B` challenge discovery and
participation (`LNG-14-002`), `14C` event model/scheduling (`LNG-14-003`),
`14D` registration/capacity plus reminders/attendance (`LNG-14-004`,
`LNG-14-005`), `14E` event UI (`LNG-14-006`) and `14F` recurrence/timezone,
safety reconciliation and final gate (`LNG-14-007`).

## 14A closeout

LNG-14-001 is complete. Backend PR #23 merged to `main` at
`f9ef9396ae33f0ef373fdb64dcbad0a383519057` from feature commit
`c4e40fad8937ee502692064f8c924e2cf66692a9`. The post-merge quality run
`36895801416` passed. Local verification was 121 suites / 746 tests, focused
challenge tests passed, and TypeScript typecheck passed.

The additive migration `0021_phase14_challenges.sql` and scoped rollback add
challenge definitions, participation, trusted progress evidence, replay
identity and completion constraints. Migrations `0012`–`0020` were not
changed, no migration was executed, and no production/test database or
provider was activated.

Evidence: `evidence/PHASE-14A-IMPLEMENTATION.md`.

## 14B closeout

LNG-14-002 is complete. Backend PR #24 merged to `main` at
`65f670873d92c133a6b689b332595348b582d9ed`; frontend PR #15 merged to `main`
at `b9787ccae2e2b3ce25f756491a27f3b8add1f6a8`. Post-merge quality runs
`36949241768` and `36949423776` passed. Local test, typecheck, build, audit,
responsive browser and accessibility verification passed; the local browser
also confirmed a truthful API-unavailable state without touching production.

Evidence: `evidence/PHASE-14B-IMPLEMENTATION.md`.

## 14C closeout

LNG-14-003 is complete. Backend PR #25 merged to `main` at
`d2f05f59c7da6284b9c9f83d44fe3cf69b3541a3` from feature commit
`62cb83294313bf22574c8f147c12cf562a3ee01c`. The post-merge CI run
`36951816691` passed on that exact merge SHA. Local verification was 127 unit
test suites / 763 tests, 17 E2E suites / 73 tests, with typecheck, lint,
build and high-severity audit passing.

The additive migration `0022_phase14_events.sql` and scoped rollback were
created and statically validated. Migrations `0012`-`0021` were unchanged,
the migration was not executed, and no production database, provider or
deployment was touched. Host ownership, private-event fail-closed access and
the Speaking Room authorization boundary remain server-enforced.

Evidence: `evidence/PHASE-14C-IMPLEMENTATION.md`.

## Next authorized subphase

`14D` / `LNG-14-004` and `LNG-14-005` are ready. They own registration,
capacity, reminders and attendance while preserving the event and room
authorization boundaries. Phase 15 remains outside this authorization
boundary.

The current authorized subphase is `14D`. Phase 15 remains outside this
authorization boundary.
