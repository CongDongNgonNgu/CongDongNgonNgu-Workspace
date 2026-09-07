# Stitch MCP — Phase 15 Admin & Moderation

## Prompt A — Admin Shell
```text
Design the admin/moderation shell for CongDongNgonNgu.vn using approved brand tokens but optimized for operational clarity. This is the one area that may be denser than public community UI, yet it must not look like a generic template dashboard. Navigation domains: Users/Roles, Reports/Moderation, Languages, Community, Corrections, Open Library/Imports, AI usage/status, Reputation, Membership/Payments, Rooms/Events and Audit where implemented.

Use real operational metrics only; no decorative fake charts. Desktop supports efficient filters/tables/detail. Mobile must intentionally transform dense tables into list/detail workflows rather than horizontal squashing. Preserve strong role-based visibility.
```

## Prompt B — Moderation Case Detail
```text
Design a moderation case body centered on evidence: report category/reason, target content/user, reporter privacy, relevant source snapshot/context, assignment/status, internal notes, prior actions and allowed actions such as hide/remove/restore/warn/suspend. Sensitive actions require reason and confirmation appropriate to risk. Avoid exposing reporter identity to the reported user.
```

## Prompt C — Library/Payment/Audit Operational Detail
```text
Design reusable dense detail patterns for Library review/import batch, payment reconciliation and audit log. Keep sensitive provider secrets/signatures absent. Provide filters, correlation IDs safe for operators, status chronology and explicit action boundaries. Do not hide complex state behind only colored badges.
```
