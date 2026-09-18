# Phase 07 Acceptance

- Users explicitly opt into exchange and control discoverability.
- Matching prioritizes reciprocal language usefulness and is explainable/testable.
- Blocked/private/non-opted-in/self users never appear in discovery.
- Partner cards/profile previews reveal only public/allowed fields.
- Request lifecycle handles duplicate/crossed retries without inconsistent connections.
- Block/report actions are server-enforced and privacy-safe.
- UI avoids dehumanizing swipe mechanics as the only interaction and works on mobile/desktop.
- Stitch, tests, security/privacy, responsive/a11y, commits and CI evidence complete.

## Phase 07C verification gate

```text
PHASE_07C=DONE
LNG_07_004=DONE
LNG_07_005=DONE
OWNER_VISUAL_ACCEPTANCE_07C=YES
DEPLOYED=NO
```

- Relationship lifecycle is server-authenticated and idempotent across request, accept, decline, cancel and disconnect.
- Canonical pair uniqueness and reciprocal-request convergence prevent duplicate or crossed relationships.
- Buddy Profile Preview is reachable from Partner Discovery and uses only the safe exchange projection.
- Block/report mutation behavior remains out of scope for 07C and is reserved for LNG-07-006.

Final publication gates passed on 2026-09-18: Backend and Frontend main contain the accepted Phase 07C heads, exact-SHA CI succeeded, migration 0007 was applied and rerun successfully on Neon TEST, real PostgreSQL crossing concurrency converged to one canonical CONNECTED row with idempotent retries, and owner visual acceptance is YES. Production remains untouched and no deployment occurred.
