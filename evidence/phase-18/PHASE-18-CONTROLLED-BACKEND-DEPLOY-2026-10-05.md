# Phase 18 controlled Backend deployment — 2026-10-05

The owner authorized one manual Render deployment of Backend
`bec4ea4ac58abcbae0eb01c0c58bf7c0fd55bae5`, keeping development mode and all
environment/settings unchanged. Render's **Deploy a specific commit** selector
was used; its GitHub link proved the full intended SHA before **Deploy Commit**
was clicked once. Deployment `dep-db1j8k6gekts73e3odlg` succeeded and became Live.

This loads the production-compatible Resend/R2 source before production mode is
enabled. It does not complete production-mode remediation or authorize any
subsequent restart/configuration change.

## Verification

- Backend/Frontend/Workspace mains matched the accepted SHAs before deployment;
  all worktrees were clean. Backend GitHub CI run `37264890349` completed success
  for the exact target revision; no newer Backend main revision appeared.
- Diff from the old deployed revision changes only `.env.example`, email provider
  implementation/tests and environment validation/tests. No migration was added.
  Build/start scripts do not run migrations or seeding; Render pre-deploy command
  was empty. No migration/seed/DB maintenance command was executed.
- Matched Render service `CongDongNgonNgu-Back-End`, repository
  `CongDongNgonNgu/CongDongNgonNgu-Back-End`, branch `main`, hostname
  `congdongngonngu-back-end.onrender.com`. Auto-Deploy displayed **Off**.
- Build `npm install; npm run build` and start `npm run start` stayed unchanged.
  Build remains functionally valid but less deterministic; start is equivalent
  to `start:prod` (`node dist/main.js`).
- Before and after deployment, read-only environment inspection showed
  `NODE_ENV=development`, `EMAIL_PROVIDER=resend`, `STORAGE_PROVIDER=r2`,
  `PAYMENT_QR_ENABLED=false`, and no `PAYMENT_PROVIDER` key. Source defaults the
  missing payment provider to `disabled`. Only these non-secret values were
  displayed temporarily; all were re-masked. No credential was revealed.
- Pre-deploy and post-deploy health returned HTTP 200 and environment
  `development`. Public `GET /api/v1/membership/catalog` returned HTTP 200 with
  payment projection `available=false`, `qrAvailable=false`, `provider=null`.
  This public catalog is the safe payment capability check; the separate
  `/membership/capabilities` route requires authentication and was not used.
- Bounded deployment/startup log observation showed Nest startup success and no
  fatal boot, database/provider crash, repeated unexpected 5xx or recognizable
  credential leak. This is bounded smoke evidence, not continuous monitoring or
  proof of all future provider operations. No email, R2 or PayOS call was made.
- Render deployment metadata confirmed the full target SHA **Live**, manual
  trigger, duration 59.7 seconds. Start timestamp was 2026-10-05 12:23:28 GMT+7
  (05:23:28 UTC); live verification completed by 05:26:26 UTC.

The [demo-only backup waiver](PHASE-18-DEMO-BACKUP-WAIVER-2026-10-05.md) applies.
No backup was created or verified; normal backup policy resumes when persistent
user/payment data exists. Rollback to the previous known deployed revision
requires separate authorization; no automatic rollback was performed.

```text
PHASE_18_CONTROLLED_BACKEND_DEPLOY_RESULT=PASS
RENDER_DEPLOY_ID=dep-db1j8k6gekts73e3odlg
RENDER_DEPLOY_STATUS=SUCCESS
BACKEND_MAIN_SHA=bec4ea4ac58abcbae0eb01c0c58bf7c0fd55bae5
FRONTEND_MAIN_SHA=a013c45cc22d5f6b82bfd5be2f07a19d28a9f9a6
WORKSPACE_BEFORE_SHA=7d5e61c9343ff124475cde4e2b73fcaf8e6c0061
PRE_DEPLOY_BACKEND_SHA=9e15f8c6ff0ae24e05a928079cc3a643d58bfa08
PRODUCTION_BACKEND_DEPLOYED_SHA=bec4ea4ac58abcbae0eb01c0c58bf7c0fd55bae5
TARGET_REVISION_LIVE=YES
ROLLBACK_BACKEND_SHA=9e15f8c6ff0ae24e05a928079cc3a643d58bfa08
RENDER_AUTO_DEPLOY=OFF
PRE_DEPLOY_BACKUP=WAIVED
BACKUP_CREATED=NO
BACKUP_WAIVER_APPLIED=YES
PRODUCTION_MIGRATION_REQUIRED=NO
PRODUCTION_MIGRATION_EXECUTED=NO
HEALTH_HTTP=200
HEALTH_ENVIRONMENT=development
NODE_ENV_CURRENT_ON_RENDER=development
NODE_ENV_UNCHANGED=YES
RESEND_CONFIG_STARTUP_COMPATIBILITY=PASS
R2_CONFIG_STARTUP_COMPATIBILITY=PASS
PRODUCTION_PAYMENT_CAPABILITY=DISABLED
PAYMENT_REMAINS_DISABLED=YES
POST_DEPLOY_LOG_SANITY=PASS
PRODUCTION_RUNTIME_SOURCE_COMPATIBILITY_REMEDIATED=YES
PRODUCTION_ENVIRONMENT_MODE_REMEDIATED=NO
PRODUCTION_ENVIRONMENT_BLOCKER=YES
PRODUCTION_DEPLOYED=YES
PRODUCTION_RESTARTED_AS_PART_OF_DEPLOYMENT=YES
PRODUCTION_DB_MUTATED=NO
RENDER_ENV_MUTATED=NO
NODE_ENV_MUTATED=NO
PRODUCTION_PROVIDER_ACTIVATED=NO
PRODUCTION_SECRET_MUTATION=NO
PAYOS_WEBHOOK_REGISTERED=NO
LIVE_PAYOS_CALLS=0
REAL_MONEY_ACTIONS=0
BACKEND_CHANGED=NO
FRONTEND_CHANGED=NO
PHASE_18_DONE=NO
PHASE_18_LAUNCH_READY=NO
PHASE_19_STARTED=NO
NEXT_ACTION=HUMAN_AUTHORIZE_RENDER_NODE_ENV_PRODUCTION_MUTATION_AND_CONTROLLED_RESTART
```

Remaining release gates: production environment mode remediation; PayOS config;
webhook registration; monitoring activation; Frontend deployment authorization
and deployment; final production-mode smoke; separately authorized live PayOS
verification; final Phase 18 reconciliation. This scoped Backend deployment and
its development-mode smoke passed; overall production release remains NO_GO.
