# Phase 20 Tasks

Owner START_PHASE_20=YES authorizes execution. No DONE claim before integration gates.

## LNG-20-001 — Freeze group policy and synthetic experiment contract
**Status:** DONE
**Depends on:** explicit `START_PHASE_20`; accepted disposable fixture plan  
**Target repo(s):** Workspace, then Backend only if the authorized experiment requires code  

Freeze role/capability semantics, membership lifecycle, invitation rules, ownership transfer, moderation/report expectations, retention/cleanup and negative authorization cases. Reconcile [POLICY-MATRIX.md](POLICY-MATRIX.md) and [THREAT-MODEL.md](THREAT-MODEL.md) before implementation.

**Acceptance:** no ambiguous capability remains for owner/moderator/member/platform role; existing author-private semantics remain unchanged; fail-closed behavior is explicit.

## LNG-20-002 — Run isolated authorization experiment
**Status:** DONE
**Depends on:** LNG-20-001 accepted  
**Target repo(s):** Backend / Workspace as actually required  

Implement only the smallest isolated TEST slice needed to exercise two synthetic groups, invitations, membership transitions, member-only text and moderation boundaries. No production migration or persistent real-user data.

**Acceptance:** positive/negative matrix, cross-group IDOR, invite replay/race, immediate revocation and relevant list/search/notification/storage-path cases pass with observed evidence.

## LNG-20-003 — Review experiment and record verdict
**Status:** DONE
**Depends on:** LNG-20-002 observed results  
**Target repo(s):** Workspace  

Reconcile actual evidence, unresolved risks and abuse/retention policy. Record exactly one `GO`, `DEFER`, or `REJECT` verdict. Do not infer demand from synthetic usage.

**Acceptance:** verdict is evidence-backed; `GO` has zero known accepted-case authorization/revocation leaks; any unresolved issue is preserved truthfully.

## Completion rule
Phase 20 is not `DONE` merely because planning files exist. Completion requires started execution, actual experiment evidence, applicable repository/CI gates, and accepted verdict under the project task-state schema.

Final evidence review accepted [GO](VERDICT.md). LNG-20-003 is DONE
after verdict PR #122, PR/main CI, merge, main verification and cleanup passed.
