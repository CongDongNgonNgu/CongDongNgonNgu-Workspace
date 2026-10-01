# Dependency Graph

```text
00 Foundation
  ↓
01 Brand & Design System
  ↓
01 remediation LNG-01-008..013
  ↓
02 Auth & Identity
  ↓
03 Language Profile
  ↓
04 Language Hub
  ↓
05 Community Core
  ├──→ 06 Corrections & Q&A ──┐
  ├──→ 07 Language Exchange   │
  ├──→ 08 Open Language Library ─→ 09 AI Language Lab
  └──→ 12 Notifications/Realtime ─→ 13 Speaking Rooms ─→ 14 Challenges/Events

05 + 06 + 08 ─→ 10 Reputation/Gamification ─→ 11 Membership/Payments
05 + 08 + 10 + 11 ─→ 15 Admin/Moderation
Mature implemented features ─→ 16 PWA/SEO/Performance ─→ 17 Security Hardening ─→ 18 UAT/Production ─→ 19 Growth V2
```

Rules:
- Begin a phase only when prerequisite completion gates pass.
- 06/07/08/12 may proceed in parallel after 05 if independent resources permit.
- 09 requires the provenance-aware Library contract.
- 10 waits for real community/correction/library contribution events before final points rules.
- 15 waits for real domain objects; do not build an empty generic admin first.
- 16 is a cross-cutting optimization pass, but responsiveness/accessibility are required earlier too.
- 17 is final hardening, not permission to postpone baseline security.

## Historical phase state during Phase 08B2A contribution foundation work

    CURRENT_PHASE=08
    PHASE_06=DONE
    PHASE_07=DONE
    PHASE_08=IN_PROGRESS
    LNG_08_001=DONE
    LNG_08_002=DONE
    LNG_08_003=DONE
    LNG_08_004=VERIFYING
    LNG_08_005=PLANNED
    LNG_08_006=PLANNED
    LNG_08_007=PLANNED
    LNG_08_008=PLANNED
    PHASE_09=BLOCKED_BY_PHASE_08
    PHASE_10=BLOCKED_BY_PHASE_08
    PHASE_11=BLOCKED_BY_PHASE_10
    PHASE_12=READY

Phase 07 remains DONE after publication and verification of LNG-07-006 and
LNG-07-007. Phase 08A is complete. Phase 08B1 is now published as DONE after
owner visual acceptance of the public library search/filter contract and
read-only explorer/detail surfaces.
Contribution UX, reviewer queue, imports, candidate consumption, AI,
reputation, moderation UI, and deployment remain out of scope. Phase 09 and
Phase 10 remain blocked by Phase 08.

## Active phase state during Phase 08C1A reviewer backend work

    CURRENT_PHASE=08
    PHASE_08=IN_PROGRESS
    LNG_08_001=DONE
    LNG_08_002=DONE
    LNG_08_003=DONE
    LNG_08_004=DONE
    LNG_08_005=VERIFYING
    LNG_08_006=PLANNED
    LNG_08_007=PLANNED
    LNG_08_008=PLANNED
    PHASE_09=BLOCKED_BY_PHASE_08
    PHASE_10=BLOCKED_BY_PHASE_08

08C1A is limited to the reviewer queue/read model and atomic verify/reject
actions. Reviewer UI, source invalidation, imports, Phase 06 candidate
consumption, Phase 10 points, and deployment remain out of scope.

## Active phase state during Phase 08C1B source invalidation work

    CURRENT_PHASE=08
    PHASE_08=IN_PROGRESS
    LNG_08_001=DONE
    LNG_08_002=DONE
    LNG_08_003=DONE
    LNG_08_004=DONE
    LNG_08_005=VERIFYING
    LNG_08_006=PLANNED
    LNG_08_007=PLANNED
    LNG_08_008=PLANNED
    SOURCE_INVALIDATION_08C1B=IMPLEMENTED_PENDING_EXTERNAL_REVIEW
    OWNER_VISUAL_ACCEPTANCE_08C=PENDING_NOT_STARTED
    PHASE_09=BLOCKED_BY_PHASE_08
    PHASE_10=BLOCKED_BY_PHASE_08

08C1B observes current Phase 06 source health, fails public reads closed for
invalid Phase 06 provenance, adds reviewer invalid-source discovery, and
provides atomic VERIFIED to COMMUNITY_REVIEW reconciliation. Phase 06
candidate consumption, reviewer UI, Phase 10 points, Neon TEST mutation, and
deployment remain out of scope.

## Final Phase 08C publication state

    CURRENT_PHASE=08
    PHASE_08=IN_PROGRESS
    LNG_08_001=DONE
    LNG_08_002=DONE
    LNG_08_003=DONE
    LNG_08_004=DONE
    LNG_08_005=DONE
    LNG_08_006=PLANNED
    LNG_08_007=PLANNED
    LNG_08_008=PLANNED
    OWNER_VISUAL_ACCEPTANCE_08C=YES
    SOURCE_INVALIDATION_08C1B=RUNTIME_PASS
    PHASE_09=BLOCKED_BY_PHASE_08
    PHASE_10=BLOCKED_BY_PHASE_08

LNG-08-005 is closed after publication of the accepted Backend and Frontend
heads. Tatoeba licensing validation is the next bounded task; no LNG-08-006
implementation has started.

## Current phase state after Phase 08 final-gate acceptance

    CURRENT_PHASE=08
    PHASE_08=DONE
    LNG_08_001=DONE
    LNG_08_002=DONE
    LNG_08_003=DONE
    LNG_08_004=DONE
    LNG_08_005=DONE
    LNG_08_006=PASS
    LNG_08_007=PASS
    LNG_08_008=PASS
    PHASE_09=READY
    PHASE_10=READY
    PHASE_11=BLOCKED_BY_PHASE_10
    PHASE_12=READY
    PHASE_15=BLOCKED_BY_PHASE_10_11
    NEXT_PHASE=09
    NEXT_TASK_ID=LNG-09-001
    NEXT_TASK_NAME=AI Provider & Usage Architecture
    NEXT_TASK_STATUS=PLANNED

Phase 08 is DONE after exact-SHA Backend CI verification and final-gate
acceptance. Phase 09 is the next selected phase and remains unstarted; its
first task remains PLANNED. Phase 10 is independently READY from its Phase
05/06/08 dependencies but was not selected or started.

## Current Phase 09D publication gate

    CURRENT_PHASE=09
    PHASE_09=IN_PROGRESS
    PHASE_09A=DONE
    PHASE_09B=DONE
    PHASE_09C=DONE
    PHASE_09D=DONE
    LNG_09_004=DONE
    LNG_09_005=DONE
    NEXT_TASK_ID=LNG-09-007
    NEXT_TASK_NAME=Learn from Community/Library
    NEXT_TASK_STATUS=PLANNED

The 09D implementation, validation gates, and grouped feature-branch
publication are complete. Remote heads were verified for Backend, Frontend,
and Workspace. The next dependency-eligible task is 09E / LNG-09-007; Phase
09 remains IN_PROGRESS and is not marked DONE.

## Current Phase 09E publication gate

    CURRENT_PHASE=09
    PHASE_09=IN_PROGRESS
    PHASE_09E=DONE
    LNG_09_007=DONE
    PHASE_09F=DONE
    LNG_09_008=DONE
    NEXT_TASK_ID=PHASE-09-FINAL-GATE
    NEXT_TASK_NAME=Phase 09 final gate
    NEXT_TASK_STATUS=READY

LNG-09-007 is complete locally after the public Library projection, provenance
and license gates, structured learning output, focused/full validation and
security review passed. The local Backend/Frontend feature heads are
`1e5c15635a628d864c7c74847cff25ded779ccdf` and
`ae7ae39fbecc17014c74d0d788b2acd004b0e6e4`. The Workspace branch carries the
09E acceptance evidence at local commit
`056686a8092887fbc5e108a3d7262a5d15481e79`; the Backend, Frontend and
Workspace feature branches were published and their remote heads verified
after grouped authorization. Phase 09F implementation, safety/cost/
reconciliation review, deterministic runtime validation, Phase 09 regression
and grouped feature-branch publication are complete. Backend remote branch
`phase-09f-safety-cost-reconciliation` is verified at
`8f2eebaf912d664893afbec885eddb7c49b88a06`; Workspace publication was
verified at `fdf6c3c5c0053022325e950a500c9a877658cdeb` before this final state
sync. Phase 09 is ready for its final gate; no merge or deployment is implied.

## Current Phase 09 final gate

    CURRENT_PHASE=09
    PHASE_09=READY_FOR_FINAL_GATE
    PHASE_09A=DONE
    PHASE_09B=DONE
    PHASE_09C=DONE
    PHASE_09D=DONE
    PHASE_09E=DONE
    PHASE_09F=DONE
    LNG_09_001=DONE
    LNG_09_002=DONE
    LNG_09_003=DONE
    LNG_09_004=DONE
    LNG_09_005=DONE
    LNG_09_006=DONE
    LNG_09_007=DONE
    LNG_09_008=DONE
    PHASE_09_TASK_SET_COMPLETE=YES
    PHASE_09_FINAL_GATE=PASS
    PHASE_09_FINAL_GATE_READY=YES
    PHASE_09_MERGE_READINESS=READY
    NEXT_PHASE=10
    NEXT_TASK_ID=PHASE-10
    NEXT_TASK_NAME=Phase 10
    NEXT_TASK_STATUS=READY

The final gate reconciled the complete task set, stacked feature-branch
histories, exact-SHA validation evidence, cross-phase safety/privacy/usage and
canonical-integrity checks, database isolation, and feature-branch CI policy.
Backend `phase-09f-safety-cost-reconciliation` is verified remotely at
`8f2eebaf912d664893afbec885eddb7c49b88a06`. Frontend has no 09F source
changes; its accepted 09E head is verified remotely at
`ae7ae39fbecc17014c74d0d788b2acd004b0e6e4`. Workspace final-gate state is
recorded on the 09F branch. No merge, deployment, Phase 10 implementation, or
live provider call was performed.

## Current Phase 09 merge closeout

    CURRENT_PHASE=09
    PHASE_09=IN_PROGRESS
    PHASE_09_FINAL_GATE=PASS
    PHASE_09_MERGE_CLOSEOUT=IN_PROGRESS
    PHASE_09_BACKEND_MERGED=YES
    PHASE_09_BACKEND_MAIN_SHA=42463097e3884fa9529741c196c33351a958820d
    PHASE_09_BACKEND_POST_MERGE_CI=PASS
    PHASE_09_FRONTEND_MERGED=YES
    PHASE_09_FRONTEND_MAIN_SHA=5a258796ae96e6efb77d44dd72e168edcaa6213b
    PHASE_09_FRONTEND_POST_MERGE_CI=PASS
    PHASE_09_WORKSPACE_MERGED=NO
    NEXT_TASK_ID=PHASE-09-MERGE-CLOSEOUT
    NEXT_TASK_STATUS=IN_PROGRESS

Backend PR #3 and Frontend PR #8 were merged into their respective `main`
branches using the accepted Phase 09 heads. Their post-merge CI runs passed.
Workspace still requires its ordered merge and a truthful post-merge state
sync before Phase 09 can be recorded as fully merged and closed.

## Final Phase 09 merge closeout

    CURRENT_PHASE=09
    PHASE_09=DONE
    PHASE_09_FINAL_GATE=PASS
    PHASE_09_MERGE_CLOSEOUT=PASS
    PHASE_09_BACKEND_MERGED=YES
    PHASE_09_BACKEND_MAIN_SHA=42463097e3884fa9529741c196c33351a958820d
    PHASE_09_BACKEND_POST_MERGE_CI=PASS
    PHASE_09_FRONTEND_MERGED=YES
    PHASE_09_FRONTEND_MAIN_SHA=5a258796ae96e6efb77d44dd72e168edcaa6213b
    PHASE_09_FRONTEND_POST_MERGE_CI=PASS
    PHASE_09_WORKSPACE_MERGED=YES
    PHASE_09_WORKSPACE_MAIN_SHA=06184bf8e9174032aeb47d5ee35d0a7261d38e25
    PHASE_09_WORKSPACE_POST_MERGE_CI=NOT_REQUIRED
    PHASE_09_MERGED=YES
    PHASE_09_DEPLOYED=NO
    NEXT_PHASE=10
    NEXT_TASK_ID=PHASE-10
    NEXT_TASK_NAME=Phase 10
    NEXT_TASK_STATUS=READY

Backend PR #3, Frontend PR #8 and Workspace PR #4 are merged, and Workspace
PR #5 records the final state-only verification on remote `main` at
`06184bf8e9174032aeb47d5ee35d0a7261d38e25`. Backend and Frontend current-main
CI passed; Workspace has no CI workflow. Phase 09 is closed. Phase 10 is READY
but has not started.

## Current Phase 10 final closeout

    CURRENT_PHASE=10
    PHASE_10=DONE
    PHASE_10A=DONE
    PHASE_10B=DONE
    PHASE_10C=DONE
    PHASE_10D=DONE
    PHASE_10E=DONE
    LNG_10_001=DONE
    LNG_10_002=DONE
    LNG_10_003=DONE
    LNG_10_004=DONE
    LNG_10_005=DONE
    LNG_10_006=DONE
    LNG_10_007=DONE
    LNG_10_008=DONE
    PHASE_10_TASK_SET_COMPLETE=YES
    PHASE_10_FINAL_GATE=PASS
    PHASE_10_FINAL_CLOSEOUT=PASS
    PHASE_11=READY
    NEXT_PHASE=11
    NEXT_TASK_ID=LNG-11-001
    NEXT_TASK_NAME=Membership Product & Entitlement Model
    NEXT_TASK_STATUS=READY

Phase 10 is closed after reconciliation, exact-head CI, cross-subphase
integrity, security/privacy, migration closure, Workspace evidence and branch
cleanup. Phase 11 is now the next eligible phase; no Phase 11 implementation,
payment-provider activation, production deployment or production data change
has started.

## Phase 12 authoritative execution record

Phase 11 is closed at its accepted final gate. Phase 12 is closed at its
accepted final gate with the following dependency-ordered decomposition:

```text
12A LNG-12-001 Notification Domain & Event Contracts
  ├── 12B LNG-12-002 Notification API & Read State
  ├── 12C LNG-12-003 Realtime Delivery
  ├── 12D LNG-12-004 Notification Preferences
  └── 12E LNG-12-005..006 Notification UI Surfaces
       └── 12F LNG-12-007..008 Event Integration, Reliability & Final Gate
```

The synchronized Phase 12 start heads are Backend
`c8d22b2dfe4086d1da7faad6a9bdeb7637cb5d46`, Frontend
`e3ff9dd9bc8731e37f5601c4ceeadda9da9e32c8`, and Workspace
`1e23561703b2f6bdf3a1ea75b899a79007f0222d`. 12A is Backend-only and
provider/database/UI-free; its exact scope and exit criteria are recorded in
`phases/PHASE-12-NOTIFICATIONS-REALTIME/DECOMPOSITION.md`.

## Historical Phase 12D integration state

```text
CURRENT_PHASE=12
CURRENT_SUBPHASE=12D
PHASE_12A=DONE
PHASE_12B=DONE
PHASE_12C=DONE
PHASE_12D=DONE
LNG_12_003=PASS_INTEGRATED_REMOTE
LNG_12_004=PASS_INTEGRATED_REMOTE
PHASE_12C_DEPENDENCIES=12A,12B
PHASE_12D_DEPENDENCIES=12A
PHASE_12C_BACKEND_MAIN_SHA=4dece5023325499cbd7dcfa42994a3ed358c6ff5
PHASE_12C_FRONTEND_MAIN_SHA=1902b63542a3dd896822070a62e0f8ad42cd9859
PHASE_12C_BACKEND_POST_MERGE_CI=PASS_RUN_56
PHASE_12C_FRONTEND_POST_MERGE_CI=PASS_RUN_59
PHASE_12D_BACKEND_MAIN_SHA=eaf121d095f9dda7785bdf27411ea30233ad2a7a
PHASE_12D_FRONTEND_MAIN_SHA=1902b63542a3dd896822070a62e0f8ad42cd9859
PHASE_12D_BACKEND_POST_MERGE_CI=PASS_RUN_58
PHASE_12D_FRONTEND_CHANGED=NO
PHASE_12D_WORKSPACE_PR=41
PHASE_12D_WORKSPACE_MAIN_SHA=55cb08b328640c76469095808752ceec95881559
PHASE_12D_WORKSPACE_POST_MERGE_CI=NOT_REQUIRED
PHASE_12D_MIGRATION=0017_phase12_notification_preferences
NEXT_TASK_ID=LNG-12-005..006
NEXT_TASK_NAME=Notification UI Surfaces
NEXT_TASK_STATUS=READY
```

12D is integrated on the Backend remote `main`; Frontend remains unchanged.
Its owner-scoped category/channel preference matrix preserves the accepted
notification, realtime and read-state contracts, suppresses optional noise,
and protects mandatory in-app security/account/payment notices. Visible UI,
event-producer integration and the Phase 12 final reliability gate remain
owned by 12E and 12F respectively.

## Current Phase 12 final closeout state

```text
CURRENT_PHASE=12
CURRENT_SUBPHASE=12F
PHASE_12A=DONE
PHASE_12B=DONE
PHASE_12C=DONE
PHASE_12D=DONE
PHASE_12E=DONE
PHASE_12F=DONE
LNG_12_007=PASS_INTEGRATED_REMOTE
LNG_12_008=PASS_INTEGRATED_REMOTE
PHASE_12F_DEPENDENCIES=12A,12B,12C,12D,12E
PHASE_12F_BACKEND_MAIN_SHA=5fdf3230bb28999ecdc362c4e8fff177abc94e6d
PHASE_12F_BACKEND_PR=18
PHASE_12F_BACKEND_POST_MERGE_CI=PASS_RUN_36841032606
PHASE_12F_FRONTEND_MAIN_SHA=95337855b6a5d49d339ad581e955a074593f907a
PHASE_12F_FRONTEND_CHANGED=NO
PHASE_12F_WORKSPACE_FEATURE_HEAD_SHA=b3f75e738b4f5427639db09f16dfd48339b2c33c
PHASE_12F_WORKSPACE_PR=45
PHASE_12F_WORKSPACE_MERGE_SHA=79baa38644706b227216a5cf99bf1d2653999b95
PHASE_12F_WORKSPACE_MAIN_SHA=79baa38644706b227216a5cf99bf1d2653999b95
PHASE_12F_WORKSPACE_POST_MERGE_CI=NOT_REQUIRED
PHASE_12F_WORKSPACE_CLOSEOUT_PR=46
PHASE_12F_WORKSPACE_CLOSEOUT_MERGE_SHA=166626dc35d2898eae30aeeaddb44de4b2816784
PHASE_12F_WORKSPACE_CLOSEOUT_MAIN_VERIFIED=PASS
PHASE_12F_FINAL_GATE=PASS
PHASE_12_FINAL_CLOSEOUT=PASS
PHASE_12_TASK_SET_COMPLETE=YES
PHASE_13_STARTED=NO
PHASE_13_STATUS=AWAITING_EXPLICIT_AUTHORIZATION
PHASE_12_AUTO_CHAINING=AUTHORIZED
PHASE_12_NEXT_PROMPT_TARGET=NONE_MAJOR_PHASE_BOUNDARY
PHASE_12_NEXT_PROMPT_VALIDATION=REQUIRED
```

Phase 12F depends on and completes 12A through 12E. The full Phase 12 task
set and final gate are PASS on synchronized remote mains. Phase 13 remains
outside the authorization boundary and is not started.

## Current Phase 13 execution record

Phase 13 is authorized by the human owner and has been decomposed into the
following dependency-ordered subphases. The complete authoritative scope is
`phases/PHASE-13-SPEAKING-ROOMS/DECOMPOSITION.md`.

```text
13A LNG-13-001..002 Room authority and media session foundation
  └── 13B LNG-13-003 Join, leave and reconciled presence
          └── 13C LNG-13-004..005 Queue, moderation and room chat
                  └── 13D LNG-13-006 Speaking-room UI
13A + Phase 09
  └── 13E LNG-13-007 Consent-aware post-room AI contract
13A..13E
  └── 13F LNG-13-008 Reliability, safety reconciliation and final gate
```

Synchronized Phase 13 start heads are Backend
`5fdf3230bb28999ecdc362c4e8fff177abc94e6d`, Frontend
`95337855b6a5d49d339ad581e955a074593f907a`, and Workspace
`1273f247eddd70c7c865e378875760336839011c`. The next eligible work is 13A;
Phase 14 remains blocked until Phase 13 final closeout passes.

13A is now accepted on Backend main at `60dff2de20b59893daaff7e185bc35083a60e5fb`.
`LNG-13-001` and `LNG-13-002` are DONE; `LNG-13-003` is the next eligible
task. The 13A Workspace evidence branch records the exact PR/CI/safety facts
and must merge before same-phase relay to 13B.

13B is now accepted on Backend main at
`6d5c2f6b115bc65036b900f1a572f2e30a84301e`. `LNG-13-003` is DONE after
exact/concurrent replay, reconnect lease, stale reconciliation, capacity,
duplicate-device, authorization and bounded privacy projection coverage. The
next eligible work is 13C (`LNG-13-004` and `LNG-13-005`); 13D remains gated on
13C, 13E remains independently gated on Phase 09 plus 13A, and 13F remains
gated on 13A-13E. Phase 14 remains blocked until the Phase 13 final gate.
