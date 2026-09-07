# Phase 12 Tasks

## LNG-12-001 — Notification Domain & Event Contracts
**Status:** PLANNED  
**Depends on:** Phase 05

Define notification type, recipient, actor safe projection, target entity/link, created/read state, dedup key, priority/category and retention policy. Consume domain events rather than hard-coding UI strings across modules. System/provider actors must render safely when no human user exists.

## LNG-12-002 — Notification API & Read State
**Depends on:** LNG-12-001

Implement paginated list, unread count, mark one/many read and safe delete/archive policy if desired. Authorization prevents reading another user's notifications by ID. Mark-read is idempotent; count reconciles under concurrent writes.

## LNG-12-003 — Realtime Delivery
**Depends on:** LNG-12-001, LNG-12-002

Adapt proven SSE/realtime patterns from EduAI only after audit. Authenticate connection, reconnect with backoff, resume/poll fallback where feasible, deduplicate by notification/event ID and handle multi-tab behavior. Do not keep secrets in query strings if avoidable.

## LNG-12-004 — Notification Preferences
**Depends on:** LNG-12-001

Allow category/channel preferences for nonessential events while preserving mandatory security/payment/account notices where legally/product necessary. Default settings should not maximize interruptions. Store preferences server-side and make future email/push channels extensible.

## LNG-12-005 — Desktop Notification UI
**Depends on:** LNG-12-002..004

Use Stitch. Implement header unread badge/dropdown or panel, close/outside/Escape behavior, grouped/read states, safe actor/target rendering and link navigation. Do not let the dropdown trap/overflow viewport; provide link to full center when needed.

## LNG-12-006 — Mobile Notification Center
**Depends on:** LNG-12-002..004

Use Stitch for dedicated mobile-first notification screen rather than forcing a tiny desktop dropdown. Support filters/read state/preferences access and bottom/header navigation integration.

## LNG-12-007 — Event Integration
**Depends on:** relevant implemented domain modules

Wire community replies, corrections/acceptance, buddy requests, reputation and membership events as available. Each event must have dedup semantics and privacy-safe actor projection.

## LNG-12-008 — Reliability Reconciliation
**Depends on:** LNG-12-001..007

Test reconnect, duplicate delivery, missed-event recovery, multi-tab, unread count races, deleted target/actor, system actor and preference suppression. Run responsive/a11y/visual, push commits and evidence.
