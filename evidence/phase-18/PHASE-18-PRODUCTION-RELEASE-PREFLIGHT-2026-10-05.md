# Phase 18 Production Release Preflight — 2026-10-05

**Task:** Final pre-production readiness audit

**Historical snapshot:** operational documentation/ownership states and the
checklist below describe the pre-remediation audit at PR #93. The active
deployment, rollback, restore, monitoring and go/no-go procedure is now
[Phase 18 operational readiness](PHASE-18-OPERATIONAL-READINESS.md).
Its READY documentation states supersede the historical BLOCKED/NO/UNASSIGNED
values below. Production execution gates, unknown PayOS values and the
PARTIAL preflight / blocked Phase 18 status remain unchanged.

**Record status:** `PARTIAL` — read-only preflight completed; production
release gates remain unopened.

## Scope and safety boundary

This record is a repository-backed planning and readiness audit. No
production deployment, restart, database connection/write, migration,
provider activation, webhook registration, monitoring activation, DNS change,
real-money action or secret/environment mutation was performed.

```text
CURRENT_PHASE=18
PHASE_18_TASK_SET_COMPLETE=NO
PHASE_18_FINAL_GATE=BLOCKED_BY_PRODUCTION_RELEASE_GATES_AND_HUMAN_AUTHORIZATION
PHASE_18_STATUS=BLOCKED_EXTERNAL
PHASE_18_DONE=NO
PHASE_18_LAUNCH_READY=NO
PHASE_19_DEPENDENCY_SATISFIED=NO
PHASE_19_STARTED=NO
MAIN_SYNC=PASS
WORKTREE_CLEAN=YES
```

Accepted synchronized revisions:

```text
BACKEND_MAIN_SHA=9e15f8c6ff0ae24e05a928079cc3a643d58bfa08
FRONTEND_MAIN_SHA=a013c45cc22d5f6b82bfd5be2f07a19d28a9f9a6
WORKSPACE_MAIN_SHA=f4c8b6fc2161da4d29c307142c470bace70c6e11
```

The current journey record remains `TOTAL=22`, `PASS=20`, `FAIL=0`,
`BLOCKED_EXTERNAL=0`, `NOT_APPLICABLE=2`. The remaining release gates are not
journey failures.

## PayOS configuration schema

The Backend validator and provider factory support the following production
semantics:

```text
NODE_ENV=production
PAYMENT_PROVIDER=payos
PAYMENT_QR_ENABLED=true
PAYOS_API_URL=https://api-merchant.payos.vn
PAYOS_CLIENT_ID=<secret-store value>
PAYOS_API_KEY=<secret-store value>
PAYOS_CHECKSUM_KEY=<secret-store value>
PUBLIC_APP_URL=https://cong-dong-ngon-ngu-sigma.vercel.app
CORS_ALLOWED_ORIGINS=https://cong-dong-ngon-ngu-sigma.vercel.app
```

The production secret store was not accessed in this read-only preflight, so
secret presence is intentionally reported as `UNKNOWN`, not inferred from a
local or TEST/UAT environment:

```text
PAYOS_PRODUCTION_CONFIG_SCHEMA=PASS
PAYOS_CLIENT_ID=UNKNOWN
PAYOS_API_KEY=UNKNOWN
PAYOS_CHECKSUM_KEY=UNKNOWN
```

The validator requires HTTPS for production URLs and requires the exact PayOS
merchant host for `PAYOS_API_URL`. No secret value is recorded here.

## Webhook and return/cancel URL contract

`src/main.ts` applies the global `api/v1` prefix and
`MembershipController` exposes the PayOS webhook as:

```text
PAYOS_WEBHOOK_ROUTE=/api/v1/membership/webhooks/payos
PAYOS_WEBHOOK_ROUTE_IMPLEMENTED=YES
PAYOS_WEBHOOK_PUBLIC_URL_EXPECTED=https://congdongngonngu-back-end.onrender.com/api/v1/membership/webhooks/payos
```

The expected public API hostname is derived from the committed frontend
`vercel.json` rewrite and the historical production deployment record. The
human release owner must re-check the live hostname/TLS mapping before
registration; no webhook was registered by this task.

The adapter builds checkout URLs from the validated `PUBLIC_APP_URL`; there is
no separate secret-bearing return/cancel variable:

```text
PAYOS_RETURN_URL=DERIVED:https://cong-dong-ngon-ngu-sigma.vercel.app/membership/checkout/<orderId>?status=success
PAYOS_CANCEL_URL=DERIVED:https://cong-dong-ngon-ngu-sigma.vercel.app/membership/checkout/<orderId>?status=cancelled
```

The implemented POST path has the following controls:

- PayOS-specific HMAC-SHA256 checksum verification with timing-safe compare.
- Exact bounded payload/data keys, bounded references, VND currency and
  positive bounded amount validation.
- Provider reference, local attempt reference, order identity and settlement
  correlation before fulfillment.
- Repository-backed event uniqueness, row locking/transaction boundaries,
  replay recognition and idempotent fulfillment. A repeated verified event is
  classified as replay rather than creating another entitlement.
- Sanitized client errors; raw signatures, checksum keys and provider payloads
  are not returned or recorded as evidence.

This is implementation evidence only. Public HTTPS registration and a live
PayOS callback remain unopened release actions.

## Database and migration preflight

```text
DATABASE_SCHEMA_CHANGE=NO
MIGRATION_CREATED=NO
PRODUCTION_MIGRATION_REQUIRED=NO
```

The current Backend has 26 migration files. The payment release merge from
`af5e6b989f2410cbdbc8b42ef5b899903fa4444b` to
`9e15f8c6ff0ae24e05a928079cc3a643d58bfa08` changed application/configuration
and tests only; it added no migration. No migration was executed by this
preflight.

## Deployment plan

### Backend

The production API target is the Render hostname used by the frontend rewrite:
`https://congdongngonngu-back-end.onrender.com`. Repository-supported build and
start commands are:

```text
working directory: Backend repository root (external service setting unverified)
build: npm ci && npm run build
start: npm run start:prod
health: GET /api/v1/health
readiness: no separate readiness route; /api/v1/health is the public readiness endpoint
restart: Render normal deploy/restart procedure (service ID/owner not recorded in repo)
logs: Render service logs or approved external log sink (not configured/recorded in repo)
```

Because the exact Render service name/ID, restart procedure, log sink and
recovery owner are not present in the repository, the executable deployment
plan is not complete:

```text
BACKEND_DEPLOYMENT_PLAN=BLOCKED
```

### Frontend

The committed `vercel.json` establishes the Vercel SPA rewrite and the
Backend target. The recorded production URL is
`https://cong-dong-ngon-ngu-sigma.vercel.app`.

```text
hosting: Vercel (project/team configuration is external and unverified here)
build: npm ci && npm run build
deployment: normal Vercel project deployment for the exact approved commit
rollback: prior Vercel deployment or approved commit deployment
public URL: https://cong-dong-ngon-ngu-sigma.vercel.app
```

The repository has no deployment workflow and does not record the Vercel
project identifier, deployment owner or exact rollback command. The
executable external deployment plan therefore remains blocked:

```text
FRONTEND_DEPLOYMENT_PLAN=BLOCKED
```

## Safe smoke plan

The test plan is ready but was not executed against production:

1. Confirm DNS/TLS and HTTP success for `https://cong-dong-ngon-ngu-sigma.vercel.app/`.
2. Confirm `GET https://congdongngonngu-back-end.onrender.com/api/v1/health`
   returns the structured `status=ok` response and the expected production
   environment marker.
3. Confirm the public API path
   `/api/v1/membership/catalog` returns only the public catalog and accurate
   payment capability projection; do not create an order or payment attempt.
4. Open frontend `/`, `/login`, `/languages` and `/membership`; verify the
   SPA loads, API requests use the rewrite, there are no console blockers and
   no public route returns a 5xx.
5. If a human-approved non-real smoke identity is prepared, read the protected
   membership capability projection only; do not run checkout, webhook,
   migration or real-money actions.
6. Observe the approved monitoring/error-log window for sustained 5xx, health
   failure, timeout, provider/webhook errors and secret-redaction failures.

```text
SAFE_SMOKE_PLAN=READY
```

## Monitoring and alerting gate

```text
EXTERNAL_MONITORING_REQUIRED=YES
MONITORING_PROVIDER=OWNER_CHOICE
```

Minimum sanitized target set:

- Backend health: `GET https://congdongngonngu-back-end.onrender.com/api/v1/health`.
- Frontend availability: `GET https://cong-dong-ngon-ngu-sigma.vercel.app/`.
- Public API availability: `GET /api/v1/membership/catalog` through the
  production frontend/API path.
- Sustained HTTP 5xx, timeout and latency threshold alerts for Backend and
  frontend/API rewrite traffic.
- PayOS webhook rejection, retryable fulfillment, settlement mismatch and
  payment capability failure signals after live activation.
- Notification destination, escalation owner and on-call response window.

No monitoring provider, notification destination, interval/SLO or escalation
owner is configured in the repository. Monitoring activation remains a
production release gate and was not performed.

## Backup, recovery and rollback

The R2 backup/restore drill is verified for approved TEST/UAT only. It is not
proof of a production backup, production restore target or production
recovery owner.

```text
PRE_DEPLOY_PRODUCTION_BACKUP_REQUIRED=YES
RESTORE_RUNBOOK_READY=NO
RECOVERY_OWNER=UNASSIGNED
```

Before any authorized production deployment, the owner must name the recovery
role, confirm the pre-deploy production backup target and retention, verify
the backup artifact, and rehearse the production restore/runbook boundary
without overwriting the source database. The current data-lifecycle policy
does not assign a production RTO/RPO or recovery owner.

Rollback baselines for this release candidate are repository-backed parent
commits, not a claim about what is currently deployed:

```text
BACKEND_PREVIOUS_KNOWN_GOOD_SHA=af5e6b989f2410cbdbc8b42ef5b899903fa4444b
FRONTEND_PREVIOUS_KNOWN_GOOD_SHA=01331d6e4f768c9a5d0079658c60b7fcedddcaa8
```

The intended rollback is to redeploy the previous approved revision through
the platform's normal rollback/redeploy action, restart only through the
approved platform procedure, then repeat health/TLS/smoke verification. The
platform-specific commands, service/project identifiers and recovery owner
are missing, so the executable rollback plans are not yet ready:

```text
BACKEND_ROLLBACK_PLAN=BLOCKED
FRONTEND_ROLLBACK_PLAN=BLOCKED
```

The application-level payment stop is implemented and preserves in-flight
settlement processing:

```text
PAYMENT_KILL_SWITCH=READY
PAYMENT_KILL_SWITCH_ACTION=PAYMENT_QR_ENABLED=false
```

This switch stops new checkout creation. It must not be used to discard or
disable legitimate already-created settlement/webhook reconciliation.

## Secret safety

The tracked-file scan found only `.env.example` placeholders and the
documentation variable names. No high-confidence credential, private key,
provider token, raw database URL or presigned URL was found in tracked
release evidence. Production secrets were not printed, read or mutated.

```text
SECRET_LEAK_CHECK=PASS
```

## Production release checklist

| Gate | Current state | Owner | Exact action | Evidence required | Human authorization | Rollback / stop |
| --- | --- | --- | --- | --- | --- | --- |
| `PAYOS_CONFIG` | `UNKNOWN` | Payment/platform owner | Install and validate PayOS production values in the production secret store; keep QR off until verified | Sanitized startup/config validation; no secret values | YES | Set `PAYMENT_QR_ENABLED=false`; do not enable provider |
| `WEBHOOK_REGISTRATION` | `OPEN` | Payment/platform owner | Register exact public HTTPS webhook and reconcile a signed callback | Registration record, TLS check, signature/replay/identity evidence | YES | Remove/disable registration and keep QR off |
| `EXTERNAL_MONITORING` | `OPEN` | Platform/on-call owner | Choose provider, configure health/API/frontend/payment alerts and notification escalation | Alert test, target list, owner and response window | YES | Disable release; retain alert coverage for any active service |
| `PRODUCTION_BACKUP` | `OPEN` | Recovery/platform owner | Take and verify a pre-deploy production backup; confirm restore runbook/target | Sanitized timestamp, checksum, retention and owner | YES | Stop before deployment if backup/restore proof fails |
| `BACKEND_DEPLOY` | `BLOCKED` | Platform owner | Fill Render service/restart/log ownership and deploy exact Backend SHA | Deployment record, SHA, logs and health | YES | Redeploy `af5e6b989f2410cbdbc8b42ef5b899903fa4444b` |
| `FRONTEND_DEPLOY` | `BLOCKED` | Frontend/platform owner | Fill Vercel project/rollback ownership and deploy exact Frontend SHA | Deployment record, URL/TLS, SHA and assets | YES | Restore prior Vercel deployment / `01331d6e4f768c9a5d0079658c60b7fcedddcaa8` |
| `SAFE_SMOKE` | `READY_NOT_RUN` | Release owner | Run the non-destructive route, capability, console, 5xx and redaction checks | Sanitized smoke transcript and monitoring window | YES | Stop traffic/revert if health or smoke fails |
| `LIVE_PAYMENT_VERIFICATION` | `OPEN` | Payment owner + human approver | Execute exactly one bounded explicitly authorized real payment and verify webhook/settlement/entitlement/replay | Sanitized order/payment/webhook/entitlement evidence | YES | QR off; preserve in-flight settlement reconciliation |
| `ROLLBACK_READINESS` | `BLOCKED` | Platform/release owner | Confirm exact platform rollback/redeploy steps and prior SHA | Tested rollback evidence and recovery timing | YES | Do not deploy without rollback path |
| `RECOVERY_OWNERSHIP` | `UNASSIGNED` | Project owner | Assign recovery owner and RTO/RPO/restore decision authority | Named role, runbook and escalation path | YES | Keep release gate closed |
| `FINAL_PHASE18_CLOSEOUT` | `BLOCKED` | Project owner/release approver | Reconcile all gates, deployed SHAs, smoke, monitoring, payment and residual risks | Final 18G evidence and explicit closeout decision | YES | Keep Phase 18 blocked; do not start Phase 19 |

## Human authorization boundaries

These are separate approvals; one does not imply the others:

```text
AUTH_1=PRODUCTION_ENV_SECRET_CONFIGURATION
AUTH_2=PRODUCTION_DEPLOY_RESTART
AUTH_3=PAYOS_WEBHOOK_REGISTRATION
AUTH_4=LIVE_REAL_MONEY_VERIFICATION
AUTH_5=PRODUCTION_MONITORING_ACTIVATION
AUTH_6=FINAL_PHASE18_CLOSEOUT
```

The current standing source-control authorization does not grant any of
`AUTH_1` through `AUTH_6` and does not override the production hard stops.

## Preflight result

```text
PHASE_18_PRODUCTION_PREFLIGHT=PARTIAL
PAYOS_PRODUCTION_CONFIG_SCHEMA=PASS
PAYOS_CLIENT_ID=UNKNOWN
PAYOS_API_KEY=UNKNOWN
PAYOS_CHECKSUM_KEY=UNKNOWN
PAYOS_WEBHOOK_ROUTE=/api/v1/membership/webhooks/payos
PAYOS_WEBHOOK_ROUTE_IMPLEMENTED=YES
PAYOS_WEBHOOK_PUBLIC_URL_EXPECTED=https://congdongngonngu-back-end.onrender.com/api/v1/membership/webhooks/payos
PAYOS_RETURN_URL=DERIVED
PAYOS_CANCEL_URL=DERIVED
LIVE_PAYOS_VERIFICATION_REQUIRES_HUMAN_AUTHORIZATION=YES
PRODUCTION_MIGRATION_REQUIRED=NO
BACKEND_DEPLOYMENT_PLAN=BLOCKED
FRONTEND_DEPLOYMENT_PLAN=BLOCKED
SAFE_SMOKE_PLAN=READY
EXTERNAL_MONITORING_REQUIRED=YES
MONITORING_PROVIDER=OWNER_CHOICE
PRE_DEPLOY_PRODUCTION_BACKUP_REQUIRED=YES
RESTORE_RUNBOOK_READY=NO
RECOVERY_OWNER=UNASSIGNED
BACKEND_ROLLBACK_PLAN=BLOCKED
FRONTEND_ROLLBACK_PLAN=BLOCKED
PAYMENT_KILL_SWITCH=READY
SECRET_LEAK_CHECK=PASS
PRODUCTION_RELEASE_CHECKLIST=BLOCKED
```

## Remaining production release gates

```text
1. Production PayOS secret configuration and validation.
2. Public HTTPS PayOS webhook registration and signed callback/reconciliation.
3. External monitoring, alerting, notification destination and escalation owner.
4. Verified pre-deploy production backup and assigned recovery ownership/runbook.
5. Human-authorized Backend/Frontend deployment and safe smoke on exact tested SHAs.
6. Platform-specific rollback/redeploy procedure and broader recovery ownership.
7. One separately human-authorized bounded live PayOS verification transaction.
8. Final Phase 18 closeout; Phase 19 remains unauthorized/not started.
```

```text
PRODUCTION_DEPLOYED=NO
PRODUCTION_RESTARTED=NO
PRODUCTION_DB_MUTATED=NO
PRODUCTION_MIGRATION_EXECUTED=NO
PRODUCTION_PROVIDER_ACTIVATED=NO
PRODUCTION_SECRET_MUTATION=NO
REAL_MONEY_ACTIONS=0
PHASE_19_STARTED=NO
NEXT_ACTION=AUTHORIZE_AND_COMPLETE_PRODUCTION_RELEASE_GATES_IN_ORDER
```
