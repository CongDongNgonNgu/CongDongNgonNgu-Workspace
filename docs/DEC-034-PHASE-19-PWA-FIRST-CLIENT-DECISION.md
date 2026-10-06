# DEC-034 - Retain PWA before a new native client

**Status:** Accepted for Phase 19 discovery/portfolio baseline only.
**Date:** 2026-10-06

## Context

Owner pre-launch expansion permits technical discovery without current real
users. Phase 16 accepted install/offline/update technical evidence and current
web manifest/worker exist. No current physical-device benchmark establishes a
required PWA limitation. Media is disabled on either client; adding a wrapper
cannot resolve provider activation or consent. Native/store demand is unknown.

## Decision and alternatives

Retain PWA and shared Backend business/auth contracts. A future separately
approved device experiment should name OS/browser/journey, reproduce a required
capability failure and compare PWA improvement, thin wrapper and a new native UI
before choosing another client. No experiment is executed or gap result invented.

PWA improvement minimizes duplicate release/support logic. A wrapper reuses web
UI but adds bridge/auth-return/signing/store risks; React Native adds a new view/
navigation/device layer and regression burden. None changes Backend authority.

## Consequences and migration/recovery boundary

No client fork now. Future proposal preserves existing direct URLs/history,
session/CSRF/private-cache/logout rules; explicit user/device permissions and
recovery tests precede any bridge. If a new client is later approved, keep web
usable during staged rollout, version compatible Backend contracts and allow
rollback to PWA without losing canonical user data. Signing/store accounts,
production deployment/push/audio/provider/data activation remain human stops.
No paid store terms or OS capability guarantee is asserted from memory.

Source and capability matrix: [LNG-19-005 discovery](../phases/PHASE-19-GROWTH-V2/DISCOVERY-004-006.md).
This ADR is not next-phase implementation authorization or proven user demand.
