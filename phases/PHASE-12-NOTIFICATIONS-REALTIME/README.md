# Phase 12 — Notifications & Realtime

## Goal
Provide reliable, low-noise notifications for learning/community events and a resilient realtime delivery layer without making users dependent on constant interruption.

## Notification families
Reply/comment, correction, accepted answer/correction, match/buddy request, room invite, badge/reputation milestone, membership/payment state and moderation/system notices.

## Principles
Persist canonical notification state server-side; realtime is delivery acceleration, not the source of truth. Reconnect/dedup/fallback must recover missed events. Preferences must allow users to reduce nonessential noise.

## Completion gate
Notification model/API, unread/read state, SSE/realtime with reconnect/dedup/fallback, preferences and Stitch-designed desktop/mobile surfaces pass tests, responsive/a11y, commits and CI.
