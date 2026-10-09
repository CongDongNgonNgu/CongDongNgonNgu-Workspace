# Phase 28 — Codex Full-System User Simulation

**Status:** PLANNED — NOT EXECUTION AUTHORIZATION

## Objective

Use Codex as a synthetic multi-user test harness only after the major user-facing loops are complete. Validate the product end to end across roles, locales, devices, realtime communication and failure conditions.

Synthetic simulation is technical evidence, not proof of real-user value.

## Planned subphases

### LNG-28-001 — Persona & journey freeze
Freeze synthetic personas such as:
- new Vietnamese learner;
- foreign learner studying Vietnamese;
- returning authenticated learner;
- mobile-small-screen user;
- connected study partners;
- group owner/moderator/member/removed user;
- adversarial/incorrect-operation user.

Define deterministic TEST identities, cleanup ownership and no-real-private-data rule.

### LNG-28-002 — Core account/learning journeys
Simulate:
- register/login/verification where safely supported;
- onboarding/profile;
- vi/en locale switching;
- Language Hub categories;
- Library/Related Resources;
- direct URL/back-forward/session recovery.

### LNG-28-003 — Communication journeys
With multiple concurrent synthetic accounts test:
- find partner;
- friend request accept/reject/cancel/block;
- direct realtime messaging;
- unread/reconnect/history;
- share learning context and ask for help;
- invalid/cross-user access attempts.

### LNG-28-004 — Community/group journeys
Test:
- Community search/filter;
- discussion/comment/reply;
- question/structured answer/reply;
- correction proposal;
- useful/accept flows;
- create/invite/join Study Group;
- group messaging/content sharing;
- remove/revoke/cross-group isolation.

### LNG-28-005 — Failure/network/browser matrix
Exercise:
- slow/high-latency network;
- dropped/reconnected realtime channel;
- duplicate requests/retries;
- stale session;
- 4xx/5xx-safe error rendering;
- page refresh mid-flow;
- multiple tabs where relevant;
- widths 320/375/390/412/768/1024/1440;
- keyboard/a11y bounded checks.

### LNG-28-006 — Defect remediation cycles & final simulation
Codex may discover, fix and retest ordinary defects under the phase authorization. Freeze final exact-main evidence and classify unresolved issues by severity.

## Acceptance

- all critical synthetic journeys complete without accepted blocker;
- no known accepted-case authorization/privacy leak;
- realtime reconnect/idempotency remains valid;
- navigation/session/locale state remains coherent;
- no residual synthetic fixture contamination;
- exact-main CI/deployment/browser evidence reconciled;
- severity-1/critical product-flow defects = 0 at closeout.

## Required limitation

Always record:
- `SYNTHETIC_USER_SIMULATION=YES`
- `REAL_USER_VALUE_PROVEN=NO`
- `REAL_USER_USABILITY_PROVEN=NO`
- `PRODUCTION_TRAFFIC_PROVEN=NO`

Codex success does not prove that normal users understand, enjoy or value the product.

## Out of scope

- public launch;
- real-user pilot unless separately authorized;
- payment activation;
- production telemetry expansion;
- inventing new features during test except minimal defect remediation.

## Exit verdict

`GO_PRELAUNCH_HARDENING` / `REMEDIATE_AND_RETEST` / `REJECT`
