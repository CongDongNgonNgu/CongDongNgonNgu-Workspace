# Phase 15 Tasks

## LNG-15-001 — Role & Permission Matrix
**Status:** PLANNED  
**Depends on:** Phases 05, 08, 10 and 11

Define backend capabilities per USER/CONTRIBUTOR/EXPERT/MODERATOR/ADMIN. Separate content expertise from platform administration. Protect privileged role assignment, last required admin account, self-demotion/escalation edge cases and suspended users. Frontend visibility follows—but never replaces—backend checks.

## LNG-15-002 — Moderation Case/Report Workflow
**Depends on:** Phase 05 report, LNG-15-001

Create queue/status/assignment/notes/evidence/actions for user/post/comment/correction/exchange/room/event reports as available. Preserve reporter privacy, target/source snapshots or references sufficient for audit, duplicate report grouping as justified and clear action outcomes.

## LNG-15-003 — Content & User Moderation Actions
**Depends on:** LNG-15-002

Implement hide/remove/restore content, warn/suspend/restore user, block abusive resources and reverse related reputation when policy requires. Require reason for sensitive actions. Avoid irreversible hard-delete when audit/legal needs require history.

## LNG-15-004 — Admin Domain APIs & Audit Log
**Depends on:** LNG-15-001

Expose paginated/filterable admin APIs with strict role checks and safe projections. Audit privileged changes with actor, action, target, reason, before/after references where safe, correlation/time. Never store secrets/raw payment signatures in audit log.

## LNG-15-005 — Admin UI Shell & Dashboards
**Depends on:** LNG-15-004

Use Stitch. Design an efficient admin workspace for moderation/operations, not the public community aesthetic copied blindly. Dashboard uses real operational metrics only; no fabricated charts. Responsive support is required, but dense tables may use deliberate mobile cards/detail drill-down instead of horizontal squeeze.

## LNG-15-006 — Domain Management Surfaces
**Depends on:** LNG-15-004, relevant domain modules

Implement users/roles, language catalog, community moderation, Library review/import batches, AI usage/provider status (no secrets), reputation adjustments/reversals, memberships/payments/reconciliation and events/rooms as applicable. Split tasks/commits if scope is large; each sub-surface needs its own tests.

## LNG-15-007 — Privilege & Moderation Reconciliation
**Depends on:** LNG-15-001..006

Test role escalation/IDOR, last-admin protection, moderator vs admin boundaries, suspended-user behavior, report privacy, audit sanitization and content restore/reputation reversal. Complete Stitch/responsive/a11y, commits and CI evidence.
