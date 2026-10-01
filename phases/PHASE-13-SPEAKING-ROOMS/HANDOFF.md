# Phase 13 Handoff

**Phase status:** IN_PROGRESS — 13A PASS; next 13B

13A and 13B are accepted on Backend main. The production media adapter remains
disabled; no provider credentials, raw tokens, recordings, transcripts, or
production calls were introduced. 13B adds server-authoritative join/leave/
heartbeat presence, reconnect leases, stale cleanup, deterministic capacity,
duplicate-device policy and bounded participant projections. Backend PR #20
merged at `6d5c2f6b115bc65036b900f1a572f2e30a84301e`; exact-head CI
`36857615046` and post-merge CI `36857869530` passed. Detailed 13B evidence is
recorded in `evidence/PHASE-13B-IMPLEMENTATION.md`.

**Next same-phase subphase:** 13B — Join/Leave & Participant Presence
(`LNG-13-003`), after the accepted 13A Backend main SHA.

Phase 14 remains blocked until the complete Phase 13 final gate passes.

## 13B closeout

`LNG-13-003` is DONE on Backend main. The accepted implementation and safety
facts are recorded in `evidence/PHASE-13B-IMPLEMENTATION.md`. Backend PR #20
and its exact-head/post-merge CI are PASS. The next same-phase subphase is 13C
(`LNG-13-004` and `LNG-13-005`); Phase 14 has not started.
