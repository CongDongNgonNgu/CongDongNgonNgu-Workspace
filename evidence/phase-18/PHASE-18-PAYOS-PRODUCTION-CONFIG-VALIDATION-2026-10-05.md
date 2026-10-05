# Phase 18 PayOS production configuration validation

**Historical access snapshot:** signed-out/UNKNOWN production observations below
are superseded by [authenticated Render validation](PHASE-18-RENDER-PRODUCTION-CONFIG-VALIDATION-2026-10-05.md).
Source contracts remain valid; current configuration blockers are in that record.

**Date:** 2026-10-05. **Result:** PARTIAL; production config gate remains
`BLOCKED_UNVERIFIED_CONFIG`. This is a read-only observation record, not
activation, a live PayOS validation or production deployment evidence.

## Baseline and scope

All three repositories were fetched, safely synchronized and initially clean:

```text
BACKEND_MAIN_SHA=9e15f8c6ff0ae24e05a928079cc3a643d58bfa08
FRONTEND_MAIN_SHA=a013c45cc22d5f6b82bfd5be2f07a19d28a9f9a6
WORKSPACE_BEFORE_SHA=a56107e246a7b091850c1e02ee304d82f7e71c15
INTENDED_BACKEND_RELEASE_SHA=9e15f8c6ff0ae24e05a928079cc3a643d58bfa08
MAIN_SYNC=PASS
WORKTREE_CLEAN=YES
BACKEND_CHANGED=NO
FRONTEND_CHANGED=NO
```

No local `.env` was read. No PayOS secret value was inspected, copied, printed,
recorded, sent externally or committed. Only variable names, source semantics
and allowlisted public status fields were used. No PayOS API request occurred.

## Source-derived contract

Reviewed Backend `src/config/env.validation.ts`, `src/config/configuration.ts`,
`src/membership/membership.module.ts`, `payos-payment-provider.ts`,
`membership.payment-provider.ts`, `membership.webhook.ts`,
`membership.payment.service.ts` and `membership.controller.ts`.

```text
PAYMENT_PROVIDER_SCHEMA=disabled|payos
PAYMENT_QR_ENABLED_SCHEMA=false|true
PAYOS_REQUIRED_CONFIG_KEYS=PAYOS_API_URL,PAYOS_CLIENT_ID,PAYOS_API_KEY,PAYOS_CHECKSUM_KEY
```

Provider defaults to `disabled`; QR defaults to false. Boolean environment
strings are case-insensitive true/false; other non-empty strings reject.
The four PayOS fields are optional in environment validation even when provider
is `payos`. Supplied API URL is validated for the PayOS merchant host and HTTPS
in production; credentials are trimmed optional strings. The configuration
projection forwards only supplied values. Environment validation acceptance
alone does not prove adapter availability, credential validity or live readiness.

| Operation | Effective current-main requirements |
| --- | --- |
| A. Adapter factory selection/construction | `PAYMENT_PROVIDER=payos` selects the PayOS adapter; QR flag is passed. Constructor does not require credential presence or call PayOS. Missing API URL/credentials do not prevent adapter construction itself. Other application factories still have their own startup requirements. |
| B. QR capability/checkout availability | PayOS adapter selected; `PAYMENT_QR_ENABLED=true`; `PAYOS_API_URL` is HTTPS on exact merchant host with no credentials/query/fragment; all three credential fields are non-empty and at most 512 characters in source checks. |
| C. Webhook verifier factory | `PAYMENT_PROVIDER=payos` and supplied `PAYOS_CHECKSUM_KEY`; verifier requires non-empty checksum key at most 512 characters. Client ID/API key/API URL and QR enablement are not dependencies for signature verification. Otherwise unavailable verifier is selected. |
| D. Future live checkout configuration | B plus the application `PUBLIC_APP_URL` origin for return/cancel construction and valid request/order data. Production policy requires intended production runtime/config, registered webhook, monitoring, authorization and separately bounded live verification; source construction/capability is not proof these gates passed. |

```text
PAYOS_ADAPTER_REQUIRED_CONFIG=PAYMENT_PROVIDER=payos_FOR_FACTORY_SELECTION;NO_CREDENTIAL_PRESENCE_REQUIREMENT_AT_CONSTRUCTION
PAYOS_QR_REQUIRED_CONFIG=PAYMENT_PROVIDER=payos,PAYMENT_QR_ENABLED=true,PAYOS_API_URL,PAYOS_CLIENT_ID,PAYOS_API_KEY,PAYOS_CHECKSUM_KEY
PAYOS_WEBHOOK_REQUIRED_CONFIG=PAYMENT_PROVIDER=payos,PAYOS_CHECKSUM_KEY
PAYOS_LIVE_REQUIRED_CONFIG=PAYMENT_PROVIDER=payos,PAYMENT_QR_ENABLED=true,PAYOS_API_URL,PAYOS_CLIENT_ID,PAYOS_API_KEY,PAYOS_CHECKSUM_KEY,PUBLIC_APP_URL
```

Lengths above are source semantics, not measurements of real secrets. No secret
characters were read to establish presence. The source's API URL predicate does
not enforce an empty path; this release expects the exact canonical base URL
`https://api-merchant.payos.vn`, not merely any accepted same-host URL.

For this staging gate, QR false is safe and preferred. A disabled provider with
all three credentials PRESENT and canonical API URL would be
`CONFIG_STAGED_PROVIDER_DISABLED`; payos with QR false and staged credentials
would be `PROVIDER_CONFIGURED_NEW_CHECKOUTS_DISABLED`. Neither can be inferred
from a disabled public capability response.

## Public read-only runtime observations

Only two unauthenticated GETs were made to the expected Backend hostname:

| UTC / Asia-Saigon time | Path | Sanitized observation |
| --- | --- | --- |
| 2026-10-05 03:01:51 / 10:01:51 | `/api/v1/health` | HTTP 200; `data.status=ok`; service matches `congdongngonngu-backend`; `data.environment=development` |
| 2026-10-05 03:01:54 / 10:01:54 | `/api/v1/membership/catalog` | HTTP 200; `data.payment.available=false`; `qrAvailable=false`; provider projection null |

```text
PRODUCTION_BACKEND_REACHABLE=YES
PRODUCTION_HEALTH=HTTP_200_OK_ENVIRONMENT_DEVELOPMENT
PRODUCTION_PAYMENT_CAPABILITY=DISABLED
PRODUCTION_BACKEND_DEPLOYED_SHA=UNKNOWN
PRODUCTION_BACKEND_REVISION_CURRENT=UNKNOWN
```

The expected public target is reachable, but the runtime reports development,
so it is not verified production-mode release readiness. No environment change
or redeploy was attempted. Health/catalog do not attest Git SHA. Disabled
capability can result from disabled provider, QR false, missing/invalid adapter
configuration, or an older deployed version. It does not expose the effective
environment flags or prove credential presence/absence.

## Provider metadata access and sanitized configuration

The existing Render browser tab showed **Sign In to Render**, not an
authenticated service view. A service ID in a login redirect is not identity
evidence. Repository plus hostname plus service identity could not be matched,
and no environment page, secret reveal, edit, deploy or restart control was used.
The user was offered direct sign-in without sending credentials in chat.

No authenticated PayOS tab was available in browser inventory. No merchant
dashboard was opened or account created. Merchant/channel and webhook settings
remain unverified. A route in source is not evidence of provider registration.

```text
RENDER_READ_ONLY_CONFIG_ACCESS=UNAVAILABLE_SIGNED_OUT
PRODUCTION_SERVICE_IDENTITY=UNVERIFIED
PAYMENT_PROVIDER_CURRENT=UNKNOWN
PAYMENT_QR_ENABLED_CURRENT=UNKNOWN
PAYOS_API_URL_CURRENT=UNKNOWN
PAYOS_CLIENT_ID=UNKNOWN
PAYOS_API_KEY=UNKNOWN
PAYOS_CHECKSUM_KEY=UNKNOWN
PAYOS_MERCHANT_CHANNEL=UNKNOWN
PAYOS_WEBHOOK_CURRENT=UNKNOWN
PAYOS_PRODUCTION_CONFIG_STATE=CONFIG_UNVERIFIED
PAYOS_PRODUCTION_CONFIG_READINESS=BLOCKED_UNVERIFIED_CONFIG
UNEXPECTED_PRODUCTION_PAYMENT_ACTIVATION=NO
```

No activation was observed in the public response; NO above is not a guarantee
of unseen provider flags. No secret is classified MISSING merely because access
is unavailable. If provider=payos and QR=true are later observed unexpectedly,
stop payment-related inspection and report activation without creating a
transaction. READY requires safe non-empty/presence metadata for all three
secret fields and the expected API URL; presence does not validate their content.

## Return/cancel contract

`MembershipPaymentService.paymentReturnUrl` derives from configured
`app.publicAppUrl`, URL-encodes the order ID and appends success/cancelled status.
With the accepted Frontend origin it produces:

```text
PAYOS_RETURN_URL_EXPECTED=https://cong-dong-ngon-ngu-sigma.vercel.app/membership/checkout/<orderId>?status=success
PAYOS_CANCEL_URL_EXPECTED=https://cong-dong-ngon-ngu-sigma.vercel.app/membership/checkout/<orderId>?status=cancelled
PAYOS_RETURN_URL_CONTRACT=PASS
PAYOS_CANCEL_URL_CONTRACT=PASS
```

These are source contracts, not proof of current production PUBLIC_APP_URL or
an executed PayOS request. No separate return/cancel secret setting is required.

## Release disposition and safety

The [operations runbook](PHASE-18-OPERATIONAL-READINESS.md) remains READY and
its go/no-go stays NO_GO. PAYOS_CONFIG is unresolved because metadata is
unverified. Do not request secret values in chat or install/rotate them under
this read-only authorization. Next action: establish authenticated Render
read-only service access, confirm repository/hostname identity, then inspect
masked configured/non-empty metadata. No new production mutation authorization
is implied.

```text
PHASE_18_PAYOS_PRODUCTION_CONFIG_VALIDATION=PARTIAL
PAYOS_LIVE_API_VERIFIED=NO
PAYOS_LIVE_PAYMENT_VERIFIED=NO
PAYOS_LIVE_API_CALLS=0
REAL_MONEY_ACTIONS=0
PRODUCTION_DEPLOYED=NO
PRODUCTION_RESTARTED=NO
PRODUCTION_DB_MUTATED=NO
PRODUCTION_MIGRATION_EXECUTED=NO
PRODUCTION_PROVIDER_ACTIVATED=NO
PRODUCTION_SECRET_MUTATION=NO
PAYOS_WEBHOOK_REGISTERED=NO
PHASE_18_TASK_SET_COMPLETE=NO
PHASE_18_FINAL_GATE=BLOCKED_BY_PRODUCTION_RELEASE_GATES_AND_HUMAN_AUTHORIZATION
PHASE_18_STATUS=BLOCKED_EXTERNAL
PHASE_18_DONE=NO
PHASE_18_LAUNCH_READY=NO
PHASE_19_DEPENDENCY_SATISFIED=NO
PHASE_19_STARTED=NO
NEXT_ACTION=RESTORE_AUTHENTICATED_RENDER_READ_ONLY_CONFIG_ACCESS
```

Safety flags record actions performed by this task; they are not assertions
that no previous deployment or external provider configuration ever existed.
Webhook registration is unobserved and was not performed, not proven absent.

Remaining gates: PAYOS_CONFIG, WEBHOOK_REGISTRATION, MONITORING_ACTIVATION,
PRODUCTION_BACKUP, DEPLOY_AUTHORIZATION, BACKEND_FRONTEND_DEPLOY, SAFE_SMOKE,
LIVE_PAYOS_VERIFICATION, FINAL_PHASE18_RECONCILIATION.

## Documentation validation

Balanced Markdown fences and 12 local references passed. Current gate result,
UNKNOWN presence states, next action and phase boundaries match across the
runbook, PROJECT-STATE, DEPENDENCY-GRAPH, BLOCKERS and HANDOFF. Application
worktrees remained unchanged. Diff whitespace and high-confidence secret
pattern checks passed; no raw provider values or production data are recorded.

```text
WORKSPACE_STATE_CONSISTENCY=PASS
SECRET_LEAK_CHECK=PASS
GIT_DIFF_CHECK=PASS
```
