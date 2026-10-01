# Phase 14 Handoff

**Phase status:** IN_PROGRESS — 14B ready

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

## Next authorized subphase

`14B` / `LNG-14-002` is ready. It owns challenge discovery, detail,
join/leave, server-projected progress states, Stitch direction and browser
verification. Phase 15 remains outside this authorization boundary.

The current authorized subphase is `14B`. Phase 15 remains outside this
authorization boundary.
