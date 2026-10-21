# Phase 30 — Rich Media & Attachments Platform

**Status:** IN_PROGRESS - LNG-30-001 account access recovered; processor/limit/contract freeze pending

## Objective
Build one shared secure attachment architecture for Community, Study Groups and Messages rather than three incompatible upload systems.

## Scope
Images, bounded short video and approved document/file types; preview, upload progress/retry, metadata, captions/alt text where appropriate, remove/reorder where appropriate, storage abstraction, authorization, signed/private access, MIME + magic-byte validation, count/size limits, rate limits, thumbnails/previews, cleanup/deletion lifecycle and moderation/safety hooks.

## Principles
- Backend authorization and storage access are authoritative.
- Private message/group attachments remain private.
- File extension alone is never trusted.
- Unsupported media must fail safely.
- Reuse components and contracts across surfaces.

## Exit verdict
`GO_RICH_MEDIA` / `REMEDIATE_AND_RETEST` / `REJECT`

## Current authorized execution - 2026-10-21

Owner authorizes001->006 then STOP after Phase30 closeout; Phase31+ excluded. Historical stop-before30 statements remain historical. See [audit/blocker](EVIDENCE-001.md), [unfrozen architecture](ARCHITECTURE-001.md), [proposed capabilities](CAPABILITY-MATRIX-001.md) and [threat/test plan](THREAT-MODEL-001.md). Original TASKS.md remains authoritative.001 IN_PROGRESS;002-006 PLANNED. No feature/format/limit or runtime PASS claimed.

New decision-relevant [recovery evidence](EVIDENCE-001-RECOVERY.md) supersedes the original account-access blocker: current private settings and scoped token verified read-only; guarded exact-owned TEST object probe/cleanup passed. Constrained processor experiment/independent full freeze gates remain; no approved formats/limits or002 implementation.
