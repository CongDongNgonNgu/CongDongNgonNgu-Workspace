# Phase 13 — Speaking Rooms

## Goal
Enable moderated public/private live language practice rooms where users can listen, speak, raise hand and participate safely. Voice is ephemeral by default; recording/storage requires separate explicit consent and policy.

## Room model
Public/private, language, optional level, topic, host/moderators, speakers, listeners, capacity and lifecycle state.

## Core interactions
Join/leave, listener/speaker roles, raise hand, speaker queue, mute, remove, report, text room chat and moderation. Provider choice (WebRTC/Agora/etc.) must be adapter-based and verified before production enablement.

## AI add-on
Post-room summaries may include speaking duration, vocabulary, common grammar issues, summary and suggested practice only when transcript/processing is consented and technically valid; avoid fake precision.

## Completion gate
Core room lifecycle/media adapter/moderation and safe UX work in approved environment; privacy/consent tested; Stitch responsive room layout complete; commits/CI/evidence pass.
