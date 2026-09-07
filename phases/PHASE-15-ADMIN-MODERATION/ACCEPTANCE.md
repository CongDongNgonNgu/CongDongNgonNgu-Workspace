# Phase 15 Acceptance

- Backend permission matrix explicitly distinguishes USER/CONTRIBUTOR/EXPERT/MODERATOR/ADMIN.
- Reputation never automatically grants privileged role.
- Sensitive role/account actions protect against unauthorized escalation and last-admin lockout where applicable.
- Moderation reports preserve reporter privacy and action reasons/audit evidence.
- Hide/remove/restore/suspend actions reconcile public visibility and reputation/contribution side effects.
- Admin APIs are paginated/filterable and never return secrets/provider credentials.
- Dashboard metrics are real; no placeholder production charts.
- Admin UI used Stitch and works intentionally on mobile, keyboard and screen readers.
- Negative authorization/audit tests, commits and CI complete.
