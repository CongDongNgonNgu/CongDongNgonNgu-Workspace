# Phase 18 pre-deploy backup exception — 2026-10-05

The owner questioned whether a backup was necessary and then confirmed that the
database contains only seed/demo data that can be recreated. This records a
release-specific exception to the pre-deploy backup gate. It is based on the
owner's data classification, not an independent audit of database contents.
The normal backup policy remains required when persistent user/payment data is
introduced. This exception does not authorize destructive SQL, reset, migration,
deployment, restart or configuration changes.

The backup was stopped before any production connection or `pg_dump` invocation.
No dump, R2 upload, downloaded backup or disposable restore database was created.
The private staging configuration and downloaded tooling were deleted. The UAT
R2 runner was not executed or modified; its production hard stop passed all five
focused tests.

```text
DATABASE_DATA_CLASSIFICATION=RECREATABLE_SEED_DEMO_OWNER_CONFIRMED
PRODUCTION_BACKUP_GATE=WAIVED_FOR_CURRENT_DEMO_RELEASE
PRE_DEPLOY_PRODUCTION_BACKUP_REQUIRED=WAIVED_FOR_CURRENT_DEMO_RELEASE
PRODUCTION_BACKUP_CREATED=NO
PRODUCTION_DB_READ_FOR_BACKUP=NO
PRODUCTION_DB_MUTATED=NO
PRODUCTION_MIGRATION_EXECUTED=NO
LOCAL_BACKUP_TEMP_CLEANUP=PASS
UAT_R2_BACKUP_PRODUCTION_HARD_STOP=PASS
BACKEND_MAIN_SHA=bec4ea4ac58abcbae0eb01c0c58bf7c0fd55bae5
FRONTEND_MAIN_SHA=a013c45cc22d5f6b82bfd5be2f07a19d28a9f9a6
WORKSPACE_BEFORE_SHA=b3b0b89417387cfe897a2015f5e26c2e91a8265b
RENDER_AUTO_DEPLOY=OFF
PRODUCTION_BACKEND_DEPLOYED_SHA=9e15f8c6ff0ae24e05a928079cc3a643d58bfa08
PRODUCTION_BACKEND_DEPLOYED_SHA_CHANGED=NO
NODE_ENV_CURRENT_ON_RENDER=development
PRODUCTION_ENVIRONMENT_BLOCKER=YES
PRODUCTION_RUNTIME_REMEDIATED=NO
RENDER_ENV_MUTATED=NO
PRODUCTION_DEPLOYED=NO
PRODUCTION_RESTARTED=NO
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
NEXT_ACTION=HUMAN_AUTHORIZE_CONTROLLED_BACKEND_DEPLOY_BEC4EA4_WITH_NODE_ENV_STILL_DEVELOPMENT
```

Render deployment history was inspected read-only during preparation: 30 deploys,
with the same live deployment `dep-db1hs7dg1s2s73a8nab0` and old Backend revision.
Auto-deploy OFF and development mode are the accepted unchanged configuration;
no configuration mutation was performed in this task.

The next separately authorized step must deploy Backend `bec4ea4...` while keeping
`NODE_ENV=development`, verify the revision, then obtain separate authorization
for production mode and its restart consequences. Changing production mode while
the old revision is still running would encounter its Resend/R2 rejection.

Remaining gates: deploy authorization; controlled Backend/Frontend deployment;
production environment remediation; PayOS configuration; webhook registration;
monitoring activation; safe smoke; live PayOS verification; final Phase 18
reconciliation. The backup gate is waived, not passed through backup verification.

The [operational checklist](PHASE-18-OPERATIONAL-READINESS.md) remains authoritative.
