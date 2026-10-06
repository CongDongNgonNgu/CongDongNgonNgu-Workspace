# Phase 18 demo scope and read-only release acceptance - 2026-10-06

The [subsequent controlled Frontend acceptance](PHASE-18-FRONTEND-PRODUCTION-ACCEPTANCE-2026-10-06.md) supersedes
the defect, unpushed branch and pending Frontend/smoke findings recorded below.
Those observations are historical; the owner-approved payment deferral remains
current. Frontend acceptance/smoke now PASS; monitoring and final reconciliation
remain BLOCKED. NEXT_ACTION=HUMAN_AUTHORIZE_MONITORING_ACTIVATION.

## Owner-approved scope amendment

This is the current release disposition. Earlier dated evidence remains historical.
The owner has not selected a payment provider. The demo release excludes payment
activation; PayOS implementation evidence does not select PayOS for the launch.
No credentials, webhook, transaction or live verification were performed here.
The existing backup waiver applies only to recreatable seed/demo data; it is not
a verified backup and must be reassessed before retaining real user/payment data.

```text
DEMO_RELEASE_PROFILE=NO_PAYMENT
PHASE_18_DEMO_RELEASE_SCOPE=NO_PAYMENT
OWNER_PAYMENT_DECISION=PROVIDER_NOT_SELECTED
PAYMENT_PROVIDER_SELECTED=NO
PAYMENT_PROVIDER_SELECTION=DEFERRED_BY_OWNER_FOR_DEMO
PAYMENT_FEATURE_ACTIVATION=DEFERRED_BY_OWNER_FOR_DEMO
PAYMENT_PROVIDER_CREDENTIAL_STAGING=NOT_PERFORMED
PAYMENT_PROVIDER_CREDENTIALS_STAGED=NO
PAYMENT_WEBHOOK_REGISTRATION=NOT_PERFORMED
PAYMENT_WEBHOOK_REGISTERED=NO
LIVE_PAYMENT_VERIFICATION=NOT_PERFORMED
REAL_MONEY_VERIFICATION=NOT_PERFORMED
PAYMENT_RUNTIME_STATE=DISABLED
PAYMENT_REMAINS_DISABLED=YES
PAYMENT_QR_ENABLED=false
PAYMENT_PROVIDER_ACTIVATED=NO
PAYOS_CONFIG_STAGED=NO
PAYOS_WEBHOOK_REGISTERED=NO
LIVE_PAYMENT_PROVIDER_CALLS=0
REAL_MONEY_ACTIONS=0
BACKUP_GATE_DISPOSITION=WAIVED_FOR_RECREATABLE_DEMO_DATA_ONLY
BACKUP_VERIFICATION=NOT_PERFORMED
```

Future generic gates PAYMENT_PROVIDER_SELECTION, PAYMENT_PROVIDER_PRODUCTION_CONFIG,
PAYMENT_WEBHOOK_ACTIVATION and LIVE_PAYMENT_VERIFICATION remain DEFERRED for this
demo. Provider selection, staging, activation and real-money verification require
separate decisions and authorizations. Never relabel deferred payment gates PASS.
Stopping new checkouts does not discard legitimate previously verified settlements.

## Exact source and deployment provenance

All three repositories were fetched and clean on main before this documentation
branch. Workspace before SHA: `62c4d3bbcb700d35702d2bb85a99692e6bff7d66`.

| Target | Accepted main and live SHA | Authoritative read-only evidence |
| --- | --- | --- |
| Backend | `bec4ea4ac58abcbae0eb01c0c58bf7c0fd55bae5` | Authenticated Render service CongDongNgonNgu-Back-End, exact repository/main and hostname, last successfully deployed commit; Live deployment `dep-db1m4ahsrm7s73cb42f0` |
| Frontend | `a013c45cc22d5f6b82bfd5be2f07a19d28a9f9a6` | Authenticated Vercel production Ready, project cong-dong-ngon-ngu, exact Front-End-Web repository/main, full commit link, production domain; deployment `7sCPudYtBgWbd8gQyuvWtb7D5cpT` |

Existing exact-main CI succeeded: Backend run 37264890349 and Frontend run
37114701259.

Render Auto-Deploy displayed Off in its persisted settings. No Backend code, provider configuration, environment variable or deployment
was changed in this task. A scoped Frontend navigation fix is prepared for review;
its candidate remains unmerged because a Git-linked merge may trigger an unauthorized
production deployment. Deployment/merge safety must be established or explicitly
authorized before integrating that application change.
The existing serving Backend is production mode with the expected HTTPS CORS origin.

## Bounded non-destructive acceptance

- Backend GET health, languages, auth/providers and membership/catalog returned
  HTTP 200. Health environment was production; languages were structurally readable.
  Catalog projected available=false, qrAvailable=false, provider=null.
- Health with the Vercel frontend Origin returned exactly that origin in ACAO;
  localhost:5173 received no ACAO. This is a browser CORS boundary, not authentication.
- Isolated anonymous browser rendered home, login, language index (8 languages)
  and membership. Home getting-started/community anchors were inspected: clicking the React
  Router hash link changes the URL but does not scroll (scrollY=0, target section
  remains below viewport). This is a reproducible navigation defect; source
  remediation is prepared locally but not deployed under this authorization. API rewrite served catalog/languages successfully from Vercel.
- Desktop 1440, tablet 768 and emulated mobile 390 CSS-pixel viewports rendered
  without horizontal overflow. Mobile login/membership had readable controls.
- Membership showed 'Thanh toan QR chua mo' and no purchasable plans; no checkout
  affordance created a request. Source additionally gates checkout on qrAvailable.
  Focused MembershipPage tests passed: 1 file / 7 tests, mocked transports only.
- Anonymous automatic auth/refresh returned 403 and stayed logged out. This is a
  bounded observed console/network warning, not a fatal render error. No form,
  OAuth, account creation or checkout was submitted; browser session contained no
  privileged credentials. No payment order/provider call or application data write
  was initiated. These checks do not claim authenticated full functional UAT.
- Render's bounded Last hour log view showed Nest startup success, no visible
  fatal/provider/database failure or recognizable credential leakage. Public
  response/render inspection found no obvious secret disclosure. This is bounded
  evidence, not an exhaustive audit or proof of absent unobserved errors.

## Monitoring hard stop and active gate table

Render logs/metrics/deployment visibility and Vercel native observability exist.
Vercel showed 13 edge requests, zero function invocations and 0% error rate in its
6-hour overview. These native diagnostics do not prove independent availability
checks, alert delivery, acknowledgement or escalation. No approved external
monitor or tested alert evidence was established. The monitoring plan is READY;
activation is not waived by the payment deferral.

| Gate | Current disposition |
| --- | --- |
| PAYOS_CONFIG | DEFERRED_PROVIDER_NOT_SELECTED_FOR_DEMO |
| WEBHOOK_REGISTRATION | DEFERRED_PROVIDER_NOT_SELECTED_FOR_DEMO |
| LIVE_PAYOS_VERIFICATION | DEFERRED_PROVIDER_NOT_SELECTED_FOR_DEMO |
| FRONTEND_DEPLOYMENT_ACCEPTANCE | BLOCKED_DEPLOYMENT_REQUIRED - navigation fix not live |
| PRODUCTION_SMOKE | FAIL - frontend hash-navigation defect |
| MONITORING_ACTIVATION | BLOCKED_EXTERNAL_ACTIVATION_REQUIRED |
| FINAL_PHASE18_RECONCILIATION | BLOCKED |

```text
PAYMENT_DISABLED_USER_EXPERIENCE=PASS
FRONTEND_PRODUCTION_REACHABLE=YES
FRONTEND_CURRENT_MAIN_LIVE=YES
FRONTEND_RUNTIME_ACCEPTANCE=FAIL
FRONTEND_DEPLOYMENT_ACCEPTANCE=BLOCKED_DEPLOYMENT_REQUIRED
BACKEND_PRODUCTION_SMOKE=PASS
DEMO_PRODUCTION_SMOKE=FAIL
PRODUCTION_CORS_SMOKE=PASS
PRODUCTION_SECRET_EXPOSURE_CHECK=PASS
MONITORING_PROVIDER=NONE
MONITORING_ACTIVE=NO
MONITORING_PLAN=READY
MONITORING_OWNER=PROJECT_RELEASE_OWNER
MONITORING_ACTIVATION=BLOCKED_EXTERNAL_ACTIVATION_REQUIRED
FINAL_PHASE18_RECONCILIATION=BLOCKED
PHASE_18_DEMO_RELEASE_READY=NO
FULL_PAYMENT_LAUNCH_READY=NO
PHASE_18_TASK_SET_COMPLETE=NO
PHASE_18_FINAL_GATE=BLOCKED_BY_FRONTEND_ACCEPTANCE_SMOKE_MONITORING_AND_FINAL_RECONCILIATION
PHASE_18_STATUS=BLOCKED_EXTERNAL
PHASE_18_DONE=NO
PHASE_18_LAUNCH_READY=NO
PHASE_18_CLOSEOUT_PROFILE=NOT_CLOSED
PRODUCTION_ENVIRONMENT_MODE_REMEDIATED=YES
PRODUCTION_ENVIRONMENT_BLOCKER=NO
RENDER_ENV_MUTATED=NO
PRODUCTION_BACKEND_DEPLOYED=NO_NEW_DEPLOYMENT
PRODUCTION_DB_MUTATED=NO
PRODUCTION_MIGRATION_EXECUTED=NO
PHASE_19_DEPENDENCY_SATISFIED=NO
PHASE_19_STARTED=NO
REMAINING_DEMO_RELEASE_GATES=FRONTEND_DEPLOYMENT_ACCEPTANCE;PRODUCTION_SMOKE;MONITORING_ACTIVATION;FINAL_PHASE18_RECONCILIATION
NEXT_ACTION=HUMAN_AUTHORIZE_FRONTEND_PRODUCTION_DEPLOYMENT
```

This reconciles the current demo gate disposition but does not perform final Phase
18 closeout. Historical UAT/provider checks keep their recorded scope/results;
blocked or skipped checks are not retrospectively converted to PASS. After explicitly authorized frontend deployment/repeat smoke and approved
monitoring activation/alert evidence, final reconciliation must revisit all
applicable acceptance criteria, residual risks and owner closeout before DONE.
Phase 19 always requires a separate major-phase authorization.

## Local navigation remediation validation

The scoped frontend candidate restores router hash scrolling without submitting
forms or changing authentication/payment behavior. Regression was reproduced
before the fix. Final focused suites: 3 files / 18 tests PASS; full frontend regression:
83 suites / 346 tests PASS; typecheck/lint, build and performance budget PASS. Local browser desktop
1440 CTA reached its target (scrollY=1260, section top approximately zero); mobile
390 direct community hash reached its target without horizontal overflow. These
are local candidate checks, not production acceptance of the fix. No frontend
merge/deploy is performed until its production trigger boundary is authorized.

The dependency audit found [GHSA-68fv-2mgg-jv7q](https://github.com/advisories/GHSA-68fv-2mgg-jv7q)
in source-map-js 1.2.1. A separate lock-only commit updates it to patched 1.2.2;
final npm audit reports zero vulnerabilities. No broad dependency upgrade was used.

Frontend local branch: `phase-18-fix-home-hash-navigation`; reviewed candidate
head: `9246f0cfe691d1acac8f7f09afad8ae59df3938c` (hash fix
`ab9ed4be58f8689be98be8bc8cd52609d07b9993`, then dependency patch). Vercel
Git settings confirm the connected exact Frontend repository and state that
commits pushed create deployments. Because no Frontend deployment is authorized,
the candidate remains local, unpushed/unmerged; FRONTEND_PR_NUMBER=NONE. This
retained temporary branch contains required unmerged work and must not be deleted.
The owned local preview server was stopped after validation. Source main and
production remain a013c45 until a separately controlled integration/deployment.
