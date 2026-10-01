# DEC-029 — Phase 12B notification API and read state

## Status

Accepted for local Phase 12B implementation on 2026-10-01.

## Scope

This decision closes `LNG-12-002`. It extends the Phase 12A
provider/channel-neutral notification contracts with canonical persistence,
owner-scoped reads, unread counts, and idempotent read-state mutations. It
does not implement realtime transport, preferences, provider activation,
producer rewiring, or Frontend UI.

## Persistence and read-state boundary

Notifications are canonical facts. Recipient-specific read state is stored in
a separate `notification_read_states` table keyed by the notification and
recipient owner. A composite owner foreign key prevents a read-state row from
being attached to a notification owned by another user. Migration
`0016_phase12_notifications_read_state` is scoped and reversible; it was
validated locally but not executed against a TEST or production database.

The repository contract supports replay-safe notification intent
deduplication. A matching replay returns the existing notification; a
conflicting payload for the same intent key is rejected. Read mutations are
idempotent and do not recreate or delete history.

## Authorization and API boundary

The API exposes only authenticated owner-scoped reads:

```text
GET  /notifications
GET  /notifications/unread-count
POST /notifications/read
POST /notifications/:notificationId/read
```

Mutation routes validate CSRF for cookie-authenticated sessions. Pagination
cursors are versioned, owner-bound, status-bound, bounded, and rejected when
malformed or replayed under a different query. DTOs bound page size and UUID
lists. The public projection omits recipient/source identity, raw target
identifiers, and internal deduplication data.

There is no public notification-creation endpoint in this subphase. The
service publish seam remains internal so later event integration can enforce
producer authority without widening the read API.

## Policy and safety

Notification history is preserved because archive/delete was not selected.
Unknown owners, cross-owner identifiers, malformed cursors, invalid UUID
lists, and unsupported state transitions fail with sanitized errors. No live
provider call, secret activation, deployment, production migration,
production database mutation, or real-money operation is part of this
decision.

## Verification

Local acceptance passed focused notification tests (4 suites / 19 tests), the
full Backend unit suite (106 suites / 685 tests), E2E tests (16 suites / 66
tests), typecheck, lint, build, and online high-severity npm audit with zero
vulnerabilities. The Backend PR and Workspace evidence relay remain separate
integration gates from this local design decision.
