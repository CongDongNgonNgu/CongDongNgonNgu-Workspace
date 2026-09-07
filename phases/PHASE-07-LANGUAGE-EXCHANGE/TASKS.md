# Phase 07 Tasks

## LNG-07-001 — Buddy Preference & Privacy Model
**Status:** PLANNED  
**Depends on:** Phase 05 and Phase 03 profile

Represent exchange opt-in, languages offered/wanted, preferred partner level/goals, timezone/availability visibility, interests and contact/discovery preferences. Default to conservative visibility. Do not require phone/email/social handles.

## LNG-07-002 — Matching Engine V1
**Depends on:** LNG-07-001

Implement explainable scoring using reciprocal language compatibility first, then level, timezone/availability, interests/goals. Normalize scores, define tie/order behavior and exclude self, blocked users, non-opted-in/private/ineligible users. Keep weights configurable/testable rather than hidden magic numbers.

## LNG-07-003 — Partner Discovery
**Depends on:** LNG-07-002

Use Stitch. Show meaningful match reasons (e.g. “Bạn học English · họ học Vietnamese”, timezone overlap) without exposing private schedule details. Support language/filter controls, pagination and honest empty/no-match states. Do not gamify people as swipe-only objects.

## LNG-07-004 — Connection Requests & Relationship Lifecycle
**Depends on:** LNG-07-001, LNG-07-003

Implement request, accept, decline, cancel and disconnect states with idempotency and authorization. Prevent duplicate/crossing requests from creating inconsistent relationships. Notifications integrate later through Phase 12 contract/events.

## LNG-07-005 — Buddy Profile Preview
**Depends on:** LNG-07-003

Use Stitch and Language Passport public projection. Show only permitted language/goals/interests/reputation placeholders when real. Never expose email/phone/exact availability by default. Support report/block controls.

## LNG-07-006 — Block, Report & Contact Permission
**Depends on:** LNG-07-004

Blocking immediately removes discovery/active contact eligibility according to policy and prevents new requests. Reports create moderation-ready evidence without alerting the reported user to reporter identity. Define future messaging permission contract even if full chat is deferred.

## LNG-07-007 — Matching/Safety Reconciliation
**Depends on:** LNG-07-001..006

Test matching deterministically, edge cases with multilingual users/timezones/no availability, request races, blocks, privacy and IDOR. Run responsive/a11y/visual gates, commit/push and document match weights/decisions.
