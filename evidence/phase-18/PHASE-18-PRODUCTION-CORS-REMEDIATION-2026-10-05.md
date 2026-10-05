# Phase 18 production CORS remediation — 2026-10-05

The owner authorized one existing environment-variable change on the matched
Render Backend service and its integrated save/deploy lifecycle. Repository mains
were synchronized and clean; Backend remained exactly
`bec4ea4ac58abcbae0eb01c0c58bf7c0fd55bae5`, Frontend
`a013c45cc22d5f6b82bfd5be2f07a19d28a9f9a6`, Workspace before this evidence
`8180a744965725e466712c4a4a437b6792e65e6b`.

Service `CongDongNgonNgu-Back-End`, linked repository
`CongDongNgonNgu/CongDongNgonNgu-Back-End`, branch `main`, public hostname
`congdongngonngu-back-end.onrender.com`, exact live revision and Auto-Deploy Off
were verified before editing. Current CORS exactly matched the authorized old
value. Only `CORS_ALLOWED_ORIGINS` was changed; environment key count/order stayed
unchanged. Safe pre-save review confirmed NODE_ENV and PUBLIC_APP_URL unchanged.
The integrated environment **Save and deploy** action was used once; no separate
Manual Deploy, Restart, rollback or guessed configuration fix was performed.

Deployment `dep-db1m4ahsrm7s73cb42f0` reported **Deploy succeeded | Live** at the
exact same full Backend SHA. Start time was 2026-10-05 15:39:06 GMT+7. Bounded
startup logs showed Nest application startup success, no visible validation,
database/provider fatal error, repeated unexpected 5xx or recognizable credential
leak. The [earlier failed NODE_ENV transition](PHASE-18-PRODUCTION-NODE-ENV-TRANSITION-2026-10-05.md)
is historical: its CORS failure is now resolved. Saved production mode is now
reflected by the serving runtime.

## Safe verification

- After navigation/reload, only authorized non-secret values were temporarily
  displayed and re-masked: CORS now contains only the frontend HTTPS origin;
  NODE_ENV remains production; PUBLIC_APP_URL remains that same frontend origin.
- `GET /api/v1/health` returned HTTP 200, `environment=production`.
- Health GET with `Origin: https://cong-dong-ngon-ngu-sigma.vercel.app` returned
  `Access-Control-Allow-Origin` equal to that exact frontend origin.
- Health GET with `Origin: http://localhost:5173` returned no
  `Access-Control-Allow-Origin`. This verifies the browser CORS boundary; it does
  not imply CORS authenticates or blocks direct non-browser HTTP clients.
- Public `GET /api/v1/membership/catalog` returned HTTP 200 and payment projection
  `available=false`, `qrAvailable=false`, `provider=null`. No checkout was created.
- No live email, R2 write, PayOS call, database migration, seeding or manual SQL
  write was performed. Startup and GET smoke validate configuration compatibility,
  not email delivery/storage operation or live payment correctness.

```text
PHASE_18_CORS_PRODUCTION_REMEDIATION=PASS
PRE_MUTATION_DEPLOYED_SHA=bec4ea4ac58abcbae0eb01c0c58bf7c0fd55bae5
POST_MUTATION_DEPLOYED_SHA=bec4ea4ac58abcbae0eb01c0c58bf7c0fd55bae5
SOURCE_REVISION_PRESERVED=YES
UNEXPECTED_SOURCE_REVISION_CHANGE=NO
CORS_ALLOWED_ORIGINS_BEFORE=http://localhost:5173,https://cong-dong-ngon-ngu-sigma.vercel.app
CORS_ALLOWED_ORIGINS_AFTER=https://cong-dong-ngon-ngu-sigma.vercel.app
CHANGED_VARIABLE_COUNT=1
CHANGED_VARIABLE_NAME=CORS_ALLOWED_ORIGINS
CORS_MUTATED=YES
RENDER_ENV_MUTATED=YES
RENDER_ENV_MUTATED_VARIABLES=CORS_ALLOWED_ORIGINS_ONLY
NODE_ENV_BEFORE=production
NODE_ENV_AFTER=production
NODE_ENV_UNCHANGED=YES
RENDER_AUTO_DEPLOY=OFF
CORS_SAVE_TRIGGERED_RESTART=YES
CORS_SAVE_TRIGGERED_REDEPLOY=YES
RENDER_CORS_REMEDIATION_DEPLOY_STATUS=SUCCESS
PRODUCTION_MODE_STARTUP=PASS
NEXT_STARTUP_BLOCKER=NONE
POST_MUTATION_HEALTH_HTTP=200
POST_MUTATION_HEALTH_ENVIRONMENT=production
RENDER_NODE_ENV_CURRENT=production
HEALTH_ENDPOINT_ENVIRONMENT=production
ENVIRONMENT_SIGNAL_CONSISTENT=YES
EXPECTED_FRONTEND_ORIGIN_ALLOWED=YES
LOCALHOST_PRODUCTION_CORS_REMOVED=YES
PRODUCTION_PAYMENT_CAPABILITY=DISABLED
PAYMENT_REMAINS_DISABLED=YES
SAFE_BACKEND_SMOKE=PASS
POST_CORS_REMEDIATION_LOG_SANITY=PASS
PRODUCTION_RUNTIME_SOURCE_COMPATIBILITY_REMEDIATED=YES
PRODUCTION_ENVIRONMENT_MODE_REMEDIATED=YES
PRODUCTION_ENVIRONMENT_BLOCKER=NO
PRODUCTION_DB_MUTATED=NO
PRODUCTION_MIGRATION_EXECUTED=NO
PRODUCTION_PROVIDER_ACTIVATED=NO
PRODUCTION_SECRET_MUTATION=NO
PAYOS_WEBHOOK_REGISTERED=NO
LIVE_PAYOS_CALLS=0
REAL_MONEY_ACTIONS=0
BACKEND_CHANGED=NO
FRONTEND_CHANGED=NO
PHASE_18_DONE=NO
PHASE_18_LAUNCH_READY=NO
PHASE_19_DEPENDENCY_SATISFIED=NO
PHASE_19_STARTED=NO
NEXT_ACTION=HUMAN_AUTHORIZE_STAGE_PAYOS_PRODUCTION_CONFIG_WITH_PAYMENT_DISABLED
```

Production environment configuration remediation is satisfied. Remaining gates:
PAYOS_CONFIG; WEBHOOK_REGISTRATION; MONITORING_ACTIVATION;
FRONTEND_DEPLOYMENT_ACCEPTANCE; PRODUCTION_SMOKE; LIVE_PAYOS_VERIFICATION;
FINAL_PHASE18_RECONCILIATION. This bounded Backend smoke does not complete the
overall release smoke gate. The demo-only backup waiver remains approved; no
backup verification was performed. Overall release remains NO_GO and Phase 19
has not started. PayOS staging requires separate authorization and must retain
disabled provider/QR state until later explicitly authorized activation.
