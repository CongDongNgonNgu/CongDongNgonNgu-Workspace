# Phase 18 controlled Frontend production acceptance - 2026-10-06

[Final monitoring/demo closeout](PHASE-18-MONITORING-AND-DEMO-CLOSEOUT-2026-10-06.md)
supersedes the pending monitoring/closeout and next-action snapshots below.
Original observed acceptance and payment-deferral facts remain valid; older
remaining-gate/status text is historical.


## Authorization and exact integration

Owner explicitly authorized pushing candidate
`9246f0cfe691d1acac8f7f09afad8ae59df3938c`, its directly caused Vercel previews,
normal PR merge and the directly caused production deployment. No project/env
setting, Backend deployment, database mutation, payment or monitoring activation
was authorized or performed.

Before push, all three mains matched and worktrees were clean: Backend
`bec4ea4ac58abcbae0eb01c0c58bf7c0fd55bae5`, Frontend
`a013c45cc22d5f6b82bfd5be2f07a19d28a9f9a6`, Workspace
`569feb272609e7dbe2a031c65af21eb9668be9cb`. Candidate head was exact and clean.
The four-file reviewed diff contains only hash scrolling, related tests and the
source-map-js 1.2.1 to 1.2.2 lockfile patch. Auth/payment/API origins, environment,
monitoring and UI design were unchanged. No rebase, amend or force push occurred.

Exact-head pre-push gates were rerun: focused 3 files/18 tests; full 83 files/346
tests; typecheck, lint, build, performance budget, diff check and credential-pattern
scan PASS. npm audit reported zero vulnerabilities. Performance budget measured
initial JS 297956 raw/94099 gzip bytes and CSS 66321 raw/10889 gzip bytes locally;
these are candidate build checks, not claimed production Core Web Vitals.

[Frontend PR #26](https://github.com/CongDongNgonNgu/CongDongNgonNgu-Front-End-Web/pull/26)
had exact head, two commits/four files, base main, non-draft/open/mergeable state,
quality and Vercel checks PASS. Immediately before normal merge, remote main was
still exactly a013c45. Merge SHA/main is
`940e278555b2d33054fb2780d7348ded59ba2c3e`. Post-merge quality and Vercel status
also completed successfully. Remote main was fetched/fast-forwarded and verified.

## Vercel provider provenance

Authenticated project `cong-dong-ngon-ngu` is Git-connected to the exact
`CongDongNgonNgu/CongDongNgonNgu-Front-End-Web` repository. No settings were edited.

| Deployment | Identifier | Source | Terminal state |
| --- | --- | --- | --- |
| Authorized preview | `DQwjQvNaYDw51tZ5Ei7F77y7RaRG` | `9246f0cfe691d1acac8f7f09afad8ae59df3938c`, feature branch | Ready |
| Authorized production | `GU2KD4ZxYxMRoarnc9vZcZTQrFp9` | `940e278555b2d33054fb2780d7348ded59ba2c3e`, main | Ready |

Production deployment metadata attached the expected domain
`https://cong-dong-ngon-ngu-sigma.vercel.app`. SHA is proven by the provider's full
Git commit link, not inferred from HTTP success. Previous deployed frontend SHA
is a013c45; rollback would restore the known hash-navigation defect and requires
separate review and authorization. No rollback was performed.

Preview protection was respected: existing authenticated Vercel browser access
was reused; no cookie/token copying or protection bypass occurred. Preview
home/auth/language/membership loaded; 8 language links and disabled QR state were
verified through API-backed UI. Both home hash CTAs reached their section at
1440/768/390 without overflow; bounded preview console contained no captured error.

## Production acceptance

Isolated anonymous production browser reproduced both originally failing CTA
clicks. All target sections reached the viewport (top approximately zero), with
correct hash and scrollY greater than zero. Back/forward and direct community hash
entry also passed on mobile. No horizontal overflow was observed.

| CSS width | Getting-started scrollY | Community scrollY | Overflow |
| --- | --- | --- | --- |
| 1440 | 1260 | 3318 | NO |
| 768 | 1081 | 3109 | NO |
| 390 | 1511 | 4520 | NO |

Home shell/header/CTA, login entry, language index and membership were inspected
at all three widths. Login forms rendered but were not submitted. Language index
displayed 8 server-backed entries. Membership completed loading, displayed Free,
no purchasable plans and 'Thanh toan QR chua mo'; no checkout was initiated.

Public production GET `/`, proxied `/api/v1/health`, `/api/v1/languages` and
`/api/v1/membership/catalog` all returned HTTP 200. Health environment=production.
Catalog projected available=false, qrAvailable=false, provider=null. This proves
normal frontend-to-Backend read connectivity without login or privileged credentials.

Bounded network/console inspection found no new fatal render errors or unexpected
5xx. Anonymous automatic auth/refresh returned the baseline 403 and remained
logged out; this is recorded as WARN, not concealed as a perfectly empty console.
No login/OAuth/form submission, account/content creation, email, storage write,
order, checkout or live provider call was performed. No application-data write
or migration was initiated. These checks are bounded anonymous demo smoke and do
not substitute for previously recorded full authenticated UAT.

Homepage, public health/catalog response and actual production main JS asset
`/assets/index-CeWkgL10.js` showed no recognizable credential exposure in the
bounded pattern/visual inspection. No raw responses, cookies, keys, tokens or
personal data were stored. This is not an exhaustive security audit.

```text
PHASE_18_FRONTEND_PRODUCTION_DEPLOYMENT=PASS
FRONTEND_DEFECT=HASH_NAVIGATION_NOT_SCROLLING
FRONTEND_DEFECT_REMEDIATED=YES
FRONTEND_CANDIDATE_HEAD=9246f0cfe691d1acac8f7f09afad8ae59df3938c
FRONTEND_PR_NUMBER=26
FRONTEND_PR_MERGED=YES
FRONTEND_PR_CI=PASS
FRONTEND_MERGE_SHA=940e278555b2d33054fb2780d7348ded59ba2c3e
FRONTEND_MAIN_SHA=940e278555b2d33054fb2780d7348ded59ba2c3e
FRONTEND_PRODUCTION_SHA=940e278555b2d33054fb2780d7348ded59ba2c3e
VERCEL_PREVIEW_DEPLOYMENT_CREATED=YES
VERCEL_PREVIEW_STATUS=READY
VERCEL_PREVIEW_ACCEPTANCE=PASS
VERCEL_PRODUCTION_DEPLOYMENT_ID=GU2KD4ZxYxMRoarnc9vZcZTQrFp9
VERCEL_PRODUCTION_DEPLOY_STATUS=READY
FRONTEND_CURRENT_MAIN_LIVE=YES
PRODUCTION_GETTING_STARTED_HASH_NAVIGATION=PASS
PRODUCTION_COMMUNITY_HASH_NAVIGATION=PASS
PRODUCTION_HASH_NAVIGATION=PASS
PRODUCTION_RESPONSIVE_SMOKE=PASS
FRONTEND_BACKEND_CONNECTIVITY=PASS
PAYMENT_DISABLED_USER_EXPERIENCE=PASS
PAYMENT_REMAINS_DISABLED=YES
DEMO_PRODUCTION_SMOKE=PASS
PRODUCTION_SECRET_EXPOSURE_CHECK=PASS
FRONTEND_PRODUCTION_LOG_SANITY=WARN
FRONTEND_PRODUCTION_LOG_WARNING=EXPECTED_ANONYMOUS_REFRESH_403
FRONTEND_RUNTIME_ACCEPTANCE=PASS
FRONTEND_DEPLOYMENT_ACCEPTANCE=PASS
PRODUCTION_SMOKE=PASS
FRONTEND_PRODUCTION_DEPLOYED=YES
BACKEND_DEPLOYED_THIS_TASK=NO
BACKEND_RESTARTED_THIS_TASK=NO
VERCEL_ENV_MUTATED=NO
RENDER_ENV_MUTATED=NO
PRODUCTION_DB_MUTATED=NO
PRODUCTION_MIGRATION_EXECUTED=NO
PAYMENT_PROVIDER_SELECTED=NO
PAYMENT_PROVIDER_ACTIVATED=NO
PAYMENT_PROVIDER_CREDENTIALS_STAGED=NO
PAYOS_WEBHOOK_REGISTERED=NO
LIVE_PAYMENT_PROVIDER_CALLS=0
REAL_MONEY_ACTIONS=0
DNS_MUTATED=NO
MONITORING_ACTIVATED=NO
```

After successful merge, post-merge checks and production acceptance, candidate
ancestry in origin/main was verified. The merged Frontend feature branch was
deleted remotely/locally and stale refs pruned. The local candidate retention
noted in the preceding demo evidence is now historical.

## Remaining demo gates

The [owner's no-payment scope decision](PHASE-18-DEMO-NO-PAYMENT-2026-10-06.md)
continues unchanged. PAYOS_CONFIG, WEBHOOK_REGISTRATION and LIVE_PAYOS_VERIFICATION
are DEFERRED_PROVIDER_NOT_SELECTED_FOR_DEMO, never PASS. Frontend acceptance and
bounded demo production smoke are now satisfied.

Monitoring activation remains BLOCKED_EXTERNAL_ACTIVATION_REQUIRED. Native
diagnostics do not satisfy the approved independent availability/alert delivery,
acknowledgement/escalation gate. Final Phase 18 reconciliation must revisit all
applicable criteria, residual risks and owner closeout after that evidence exists.

```text
REMAINING_DEMO_RELEASE_GATES=MONITORING_ACTIVATION;FINAL_PHASE18_RECONCILIATION
FINAL_PHASE18_RECONCILIATION=BLOCKED
PHASE_18_DEMO_RELEASE_READY=NO
FULL_PAYMENT_LAUNCH_READY=NO
PHASE_18_TASK_SET_COMPLETE=NO
PHASE_18_FINAL_GATE=BLOCKED_BY_MONITORING_ACTIVATION_AND_FINAL_RECONCILIATION
PHASE_18_STATUS=BLOCKED_EXTERNAL
PHASE_18_DONE=NO
PHASE_18_LAUNCH_READY=NO
PHASE_19_DEPENDENCY_SATISFIED=NO
PHASE_19_STARTED=NO
NEXT_ACTION=HUMAN_AUTHORIZE_MONITORING_ACTIVATION
```
