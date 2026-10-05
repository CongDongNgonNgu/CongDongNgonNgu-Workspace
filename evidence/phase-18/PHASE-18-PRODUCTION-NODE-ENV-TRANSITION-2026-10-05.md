# Phase 18 production-mode transition failure — 2026-10-05

The owner explicitly authorized changing only Render `NODE_ENV` from development
to production and its integrated environment-save deployment. The existing
service/repository/branch/hostname, Auto-Deploy Off and full Live Backend SHA
`bec4ea4ac58abcbae0eb01c0c58bf7c0fd55bae5` were verified first. All three repository
mains matched the accepted SHAs and worktrees were clean. Focused source-contract
tests passed: 3 suites, 56 tests (environment validation, Resend email and UAT R2
production hard stop). No application code changed.

Only the existing `NODE_ENV` value was edited. Key count/order remained unchanged,
and no other input was edited. Render's environment **Save and deploy** menu was
used once; it immediately saved the form and started deployment
`dep-db1k6r2d0e5s7384vp0g` with trigger **Environment updated**. There was no separate
Manual Deploy/Restart action. Saved metadata was verified as `NODE_ENV=production`.

## Failure and surviving runtime

The environment-triggered deployment **FAILED**, duration 23.5 seconds, start
2026-10-05 13:27:56 GMT+7. Bounded logs reported exactly this sanitized validation
reason: `CORS_ALLOWED_ORIGINS must use HTTPS in production`; process exit code 1.
Nest startup did not succeed. The production contract rejects an HTTP origin in
the CORS list; no actual CORS values or credentials are recorded here. Presence
of a configured value does not prove its production compatibility.

The earlier deployment `dep-db1j8k6gekts73e3odlg` remains **Live** at the same
Backend SHA. Post-failure `GET /api/v1/health` returned HTTP 200 with environment
`development`, matching that surviving runtime rather than the saved production
setting. No automatic revert, extra deploy, CORS edit or other remediation was
performed. Saved configuration and running environment currently disagree.

Pre-change masked indicators existed for DATABASE_URL, JWT_ACCESS_SECRET,
JWT_REFRESH_SECRET, PUBLIC_APP_URL and CORS_ALLOWED_ORIGINS. Safe flags were
development/resend/r2/QR=false; PAYMENT_PROVIDER was missing and source defaults
it to disabled. The prior Live runtime's payment-disabled evidence remains the
accepted baseline. Payment/provider smoke was not repeated after failure: further
release checks stopped, with only failure health and revision verification run.
No live email, R2, PayOS, checkout or database maintenance operation was performed.

Resend/R2 production support remains proven by source tests, but their production
runtime startup was **not reached or verified** because CORS validation stopped
the process first. No recognizable secret leak appeared in the bounded observed
logs. This observation does not certify all historical logs or all remaining
production settings. Later validation may expose another independent blocker.

```text
PHASE_18_PRODUCTION_MODE_TRANSITION=FAILED
PRE_MUTATION_DEPLOYED_SHA=bec4ea4ac58abcbae0eb01c0c58bf7c0fd55bae5
PRE_MUTATION_HEALTH_HTTP=200
PRE_MUTATION_HEALTH_ENVIRONMENT=development
PRODUCTION_MODE_SOURCE_COMPATIBILITY=PASS
CHANGED_VARIABLE_COUNT=1
CHANGED_VARIABLE_NAME=NODE_ENV
NODE_ENV_BEFORE=development
NODE_ENV_AFTER=production
NODE_ENV_MUTATED=YES
RENDER_ENV_MUTATED=YES
RENDER_ENV_MUTATED_VARIABLES=NODE_ENV_ONLY
RENDER_AUTO_DEPLOY=OFF
NODE_ENV_SAVE_TRIGGERED_REDEPLOY=YES
NODE_ENV_SAVE_TRIGGERED_RESTART=YES
RENDER_ENV_TRANSITION_DEPLOY_STATUS=FAILED
TRANSITION_DEPLOY_ID=dep-db1k6r2d0e5s7384vp0g
DEPLOYMENT_FAILURE_CLASS=CORS_ALLOWED_ORIGINS_HTTPS_REQUIRED
PRODUCTION_MODE_STARTUP=FAIL
RESEND_PRODUCTION_STARTUP=NOT_VERIFIED_STARTUP_BLOCKED
R2_PRODUCTION_STARTUP=NOT_VERIFIED_STARTUP_BLOCKED
POST_MUTATION_DEPLOYED_SHA=bec4ea4ac58abcbae0eb01c0c58bf7c0fd55bae5
SOURCE_REVISION_PRESERVED=YES
UNEXPECTED_SOURCE_REVISION_CHANGE=NO
POST_MUTATION_HEALTH_HTTP=200
POST_MUTATION_HEALTH_ENVIRONMENT=development
RENDER_NODE_ENV_CURRENT=production
HEALTH_ENDPOINT_ENVIRONMENT=development
ENVIRONMENT_SIGNAL_CONSISTENT=NO
POST_PRODUCTION_MODE_LOG_SANITY=FAIL
SAFE_BACKEND_SMOKE=FAIL_TRANSITION_GATE_NOT_SATISFIED
PAYMENT_CAPABILITY_POST_FAILURE=NOT_RECHECKED
PAYMENT_REMAINS_DISABLED=YES_ACCEPTED_SURVIVING_RUNTIME_BASELINE
UNEXPECTED_PAYMENT_ACTIVATION=NO_OBSERVED_EVIDENCE
PRODUCTION_RUNTIME_SOURCE_COMPATIBILITY_REMEDIATED=YES
PRODUCTION_ENVIRONMENT_MODE_REMEDIATED=NO
PRODUCTION_ENVIRONMENT_BLOCKER=YES
PRODUCTION_DB_MUTATED=NO
PRODUCTION_MIGRATION_EXECUTED=NO
PRODUCTION_PROVIDER_ACTIVATED=NO
PRODUCTION_SECRET_MUTATION=NO
PAYOS_WEBHOOK_REGISTERED=NO
LIVE_PAYOS_CALLS=0
REAL_MONEY_ACTIONS=0
BACKUP_CREATED=NO
BACKUP_WAIVER_FOR_THIS_DEMO_RELEASE=APPROVED
BACKEND_CHANGED=NO
FRONTEND_CHANGED=NO
PHASE_18_DONE=NO
PHASE_18_LAUNCH_READY=NO
PHASE_19_DEPENDENCY_SATISFIED=NO
PHASE_19_STARTED=NO
NEXT_ACTION=HUMAN_REVIEW_PRODUCTION_MODE_FAILURE_AND_AUTHORIZE_EXACT_REMEDIATION
```

Restart above describes the failed candidate's startup attempt, not a successful
restart of the serving development-mode deployment. No migration/seed command
was run; existing build/start settings were unchanged.

Production environment configuration remediation remains an unsatisfied gate.
PayOS configuration, webhook registration, monitoring activation, Frontend
deployment acceptance, final production smoke, separately authorized live PayOS
verification and final Phase 18 reconciliation also remain. PayOS staging is not
the next action while production mode is blocked. Any CORS correction, reattempt
or NODE_ENV revert requires separate exact human authorization.
