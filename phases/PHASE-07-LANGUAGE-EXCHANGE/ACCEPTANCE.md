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
PHASE_07C=VERIFYING
LNG_07_004=VERIFYING
LNG_07_005=VERIFYING
OWNER_VISUAL_ACCEPTANCE_07C=PENDING
DEPLOYED=NO
```

- Relationship lifecycle is server-authenticated and idempotent across request, accept, decline, cancel and disconnect.
- Canonical pair uniqueness and reciprocal-request convergence prevent duplicate or crossed relationships.
- Buddy Profile Preview is reachable from Partner Discovery and uses only the safe exchange projection.
- Block/report mutation behavior remains out of scope for 07C and is reserved for LNG-07-006.
