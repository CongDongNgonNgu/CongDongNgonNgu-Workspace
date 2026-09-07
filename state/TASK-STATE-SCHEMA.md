# Task State & Evidence Schema

Allowed task states only:
- `PLANNED`: specified but dependencies/not scheduling ready.
- `READY`: all dependencies satisfied; may be selected.
- `IN_PROGRESS`: active implementation.
- `BLOCKED_INTERNAL`: blocked by repository/design/test issue under project control.
- `BLOCKED_EXTERNAL`: blocked by credentials/provider/owner/external system.
- `VERIFYING`: implementation exists but completion evidence/gates remain.
- `DONE`: all applicable Definition of Done gates passed.
- `DEFERRED`: intentionally postponed with rationale.
- `CANCELLED`: no longer desired; preserve rationale.

For a DONE task, Handoff evidence should include where applicable: implementation repository/path summary, migration/API notes, tests/commands/counts, responsive/a11y/visual evidence, security negative cases, Stitch reference, commit SHA(s), pushed branch, CI run/status and production/provider verification classification.

Never overwrite historical evidence merely to make state look clean. Correct prior claims explicitly when new evidence disproves them.
