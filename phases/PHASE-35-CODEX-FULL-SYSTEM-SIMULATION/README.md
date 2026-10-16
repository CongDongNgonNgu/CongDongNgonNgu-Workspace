# Phase 35 — Codex Full-System User Simulation

**Status:** PLANNED — NOT STARTED

## Objective

Use Codex as a synthetic multi-user test harness only after the major user-facing loops and the post-Phase27 UX refinement program are complete. Validate the product end to end across roles, locales, devices, realtime communication and failure conditions.

Synthetic simulation is technical evidence, not proof of real-user value.

## Planned subphases

### LNG-35-001 — Persona & journey freeze
Freeze deterministic TEST personas, cleanup ownership and a no-real-private-data rule.

### LNG-35-002 — Core account/learning journeys
Simulate register/login where safely supported, onboarding/profile, locale switching, Language Hub/resource journeys, direct URL/back-forward/session recovery.

### LNG-35-003 — Communication journeys
Exercise partner discovery, connection lifecycle, direct realtime messaging, unread/reconnect/history, learning-context sharing and invalid/cross-user attempts.

### LNG-35-004 — Community/group journeys
Exercise Community search/filter, discussion/question/correction workflows, rich-media cases accepted by Phase30, private Study Groups, group messaging/content sharing and revocation/isolation.

### LNG-35-005 — Failure/network/browser matrix
Exercise latency, reconnect, duplicate requests/retries, stale sessions, safe 4xx/5xx states, refresh mid-flow, relevant multi-tab cases, widths 320/375/390/412/768/1024/1440 and bounded accessibility checks.

### LNG-35-006 — Defect remediation cycles & final simulation
Fix and retest ordinary defects under the phase authorization, freeze exact-main evidence and classify unresolved issues.

## Acceptance

- critical synthetic journeys complete without accepted blocker;
- no known accepted-case authorization/privacy leak;
- realtime reconnect/idempotency remains valid;
- navigation/session/locale state remains coherent;
- no residual synthetic fixture contamination;
- exact-main CI/deployment/browser evidence reconciled;
- severity-1/critical product-flow defects = 0 at closeout.

## Required limitation

Always record `SYNTHETIC_USER_SIMULATION=YES`, `REAL_USER_VALUE_PROVEN=NO`, `REAL_USER_USABILITY_PROVEN=NO`, `PRODUCTION_TRAFFIC_PROVEN=NO`.

## Out of scope

Public launch, real-user pilot unless separately authorized, payment activation, production telemetry expansion, and new product features beyond minimal defect remediation.

## Exit verdict

`GO_PRELAUNCH_HARDENING` / `REMEDIATE_AND_RETEST` / `REJECT`
