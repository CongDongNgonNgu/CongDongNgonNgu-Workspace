# Phase 11 — Membership & Payments

## Goal
Create sustainable community membership without degrading Free value. Membership grants explicit entitlements; users may later earn membership credit through contribution as an alternative to payment.

## Baseline plans
- `FREE`: meaningful community, public Library, basic exchange and limited AI/practice.
- `COMMUNITY_MEMBER`: larger AI quota, advanced practice/analytics, enhanced matching, private rooms and selected premium events/resources as implemented.

## Architecture rule
Use centralized entitlement checks. Do not scatter `if premium` conditionals across controllers/components.

## Payment direction
PayOS is the initial Vietnam payment provider. Provider integration must be idempotent, auditable, fail closed and reuse security lessons from EduAI only after source audit.

## Completion gate
Plans/entitlements, subscription lifecycle, contribution-credit contract, PayOS checkout/webhook/reconciliation and pricing/account UX are verified in approved environment; security/negative tests and CI complete.
