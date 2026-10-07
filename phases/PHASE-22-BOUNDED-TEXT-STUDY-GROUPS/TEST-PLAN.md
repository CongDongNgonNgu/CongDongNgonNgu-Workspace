# Phase 22 Test Plan

**State:** prospective.

## Backend
Lifecycle integration tests for group creation, one-use invitation, join, member text, leave/removal, ownership transfer and moderation/report flows. Re-run Phase 20 authorization matrix as regression. Add cross-group IDOR, replay/race, duplicate request, stale authorization, pagination/quota and deletion/removal cases.

## Frontend
Route/state tests for list/detail/invite/join/discussion/moderation surfaces. Verify locale switching, keyboard navigation, accessible names/focus/error states and responsive behavior at the project baseline widths 320, 375, 390, 412, 768, 1024 and 1440 when applicable.

## Integration
Exercise contract mismatches and revoked/removed-member behavior end to end in approved TEST/UAT only. Verify no author-private post is surfaced as group content.

## Gates
Run focused tests plus all applicable lint/typecheck/test/build/audit/CI gates in each changed repository. Record only actual evidence.
