# Phase 18 production provider compatibility

Date: 2026-10-05. Source remediation and offline verification only.

## Source and scope

Baseline Backend main: `9e15f8c6ff0ae24e05a928079cc3a643d58bfa08`.
Frontend main: `a013c45cc22d5f6b82bfd5be2f07a19d28a9f9a6`.
Workspace baseline: `ba7737471c8e90d41926b5490dfba3e4fdc9719e`.
[Backend PR #41](https://github.com/CongDongNgonNgu/CongDongNgonNgu-Back-End/pull/41)
head: `0326ec9be09ccf194231db8c7a75d193695a24e6`.

Baseline main explicitly rejects Resend and R2 literals when NODE_ENV is production
in src/config/env.validation.ts. The candidate removes only those two rejection
clauses. Transport identity is independent of environment purpose. Required
credentials, HTTPS, vendor-host restrictions, sender header safety, production
HTTPS app/CORS origins and auth-secret placeholder rejection remain intact.

Normal verification/reset email retains the existing Resend from/to/subject/text/html
payload through createEmailProvider. Requests reject redirects to prevent forwarding
credential-bearing messages. Timeout, response-size checks, HTML escaping and
sanitized errors remain. UAT sendUatTestEmail rejects production even if its option
is manually enabled. The separate phase18-r2-backup validator still rejects production
and retains all UAT source/target guards. R2 production configuration support does
not implement a production backup adapter or authorize backup/restore execution.

## Verification

Regression first reproduced the production rejection (13 failing cases). After
remediation: focused 3 suites / 56 tests PASS; full unit 151 suites / 872 tests PASS;
E2E 17 suites / 73 tests PASS; typecheck, lint, build PASS; npm audit --audit-level=high
reports zero vulnerabilities. Lint is the repository's TypeScript check.
Local runtime Node 24.18.0. A temporary npm-cached Node 24.14.1 binary also passed
full unit/E2E, TypeScript and build checks without changing repository dependencies
or runtime pins. GitHub CI uses Node 24. All provider tests use mocks/fakes.
PRODUCTION_START_WITH_PAYMENT_DISABLED denotes validation of the production startup
configuration contract without PayOS credentials, not a production-mode server
bootstrap or connection to a production database.
[Exact-head Backend CI](https://github.com/CongDongNgonNgu/CongDongNgonNgu-Back-End/actions/runs/37263099158) completed successfully on the candidate SHA.
Markdown fences/local paths and git diff --check PASS; high-confidence secret scan PASS.
Independent source/security review approved the five-file candidate; payment and
R2 operational source were unchanged, with existing payment regression passing.

## Render and operational boundaries

[Authenticated inspection](PHASE-18-RENDER-PRODUCTION-CONFIG-VALIDATION-2026-10-05.md)
remains the last observed runtime metadata: development mode, QR false, payment
provider absent/default disabled, and PayOS credentials/URL missing. No environment
values were changed or production deployment initiated. Changing NODE_ENV before
the candidate is safely merged and an approved revision is deployed is unsafe.
Even after merge, production validity requires private operator validation of
remaining configuration; masked presence does not prove values valid. Verified
sender/domain and intended delivery policy are future operational prerequisites.

Render start and start:prod both execute node dist/main.js. The current start script
name is not a blocker. npm install; npm run build is functionally valid on successful
install/build, but less deterministic than npm ci and uses no fail-fast conjunction.
Command alignment is an operational improvement requiring separate authorization.
The [operational runbook](PHASE-18-OPERATIONAL-READINESS.md) is reconciled accordingly.
Production backup execution remains a future hard stop using approved operator tooling;
never repurpose the guarded UAT backup runner against production.

## Authorized Auto-Deploy disable and PR #41 reconciliation

The owner explicitly authorized only Render Auto-Deploy ON -> OFF and the safe
Backend merge. Service identity matched CongDongNgonNgu-Back-End, repository
CongDongNgonNgu/CongDongNgonNgu-Back-End, branch main and the expected public hostname.
The visible setting initially read On Commit. Only its editor was opened; Off was
selected and saved. A full reload showed persisted Off. No environment, secret,
build/start/branch or other provider setting was changed.

Before merge, deployment history remained at 30 entries with the same manual live
deployment dep-db1hs7dg1s2s73a8nab0. PR #41 was re-read: open, non-draft, main base,
one commit, five files, mergeable clean, exact expected head and green CI. No branch
protection/rules were bypassed. The permitted merge-commit strategy produced
`bec4ea4ac58abcbae0eb01c0c58bf7c0fd55bae5`. Remote main's tree matches the reviewed feature exactly.

Post-merge Render deployment history and service events show no new deploy/restart;
the latest live/start events remain the previous manual deployment at 10:48/10:49
Asia/Saigon. Production remains on `9e15f8c6ff0ae24e05a928079cc3a643d58bfa08`.
This is bounded dashboard evidence during the task, not an ongoing monitoring guarantee.
[Post-merge Backend CI](https://github.com/CongDongNgonNgu/CongDongNgonNgu-Back-End/actions/runs/37264890349)
is checked on the exact merge SHA before acceptance and branch cleanup.

Source main supports valid production Resend/R2 configuration, while production's
last confirmed NODE_ENV remains development. New source behavior is not live.
Prior unknown/on auto-deploy and unmerged candidate states are historical.

```text
SOURCE_PRODUCTION_CONFIG_COMPATIBILITY=PASS
EMAIL_PROVIDER_RESEND_PRODUCTION_SUPPORTED=YES
STORAGE_PROVIDER_R2_PRODUCTION_SUPPORTED=YES
RESEND_PRODUCTION_TRANSPORT=PASS
RESEND_UAT_TEST_PATH_IN_PRODUCTION=BLOCKED
PRODUCTION_VERIFICATION_EMAIL_CONTRACT=PASS
PRODUCTION_PASSWORD_RESET_EMAIL_CONTRACT=PASS
EMAIL_PRODUCTION_SECURITY=PASS
R2_PRODUCTION_CONFIG_VALIDATION=PASS
UAT_R2_BACKUP_PRODUCTION_HARD_STOP=PASS
PRODUCTION_ENV_CONTRACT=PASS
PRODUCTION_ENV_FAIL_CLOSED=PASS
PRODUCTION_START_WITH_PAYMENT_DISABLED=PASS
PAYMENT_SECURITY_REGRESSION=PASS
NODE_24_14_1_COMPATIBILITY=PASS
RENDER_START_COMMAND_RUNTIME_EQUIVALENT=YES
RENDER_BUILD_COMMAND_CLASSIFICATION=FUNCTIONALLY_VALID_BUT_LESS_DETERMINISTIC
BACKEND_PR_NUMBER=41
BACKEND_PR_MERGED=YES
CURRENT_MAIN_PRODUCTION_CONFIG_COMPATIBLE_WITH_RESEND_R2=YES
RENDER_AUTO_DEPLOY=OFF
RENDER_AUTO_DEPLOY_BEFORE=ON
RENDER_AUTO_DEPLOY_AFTER=OFF
RENDER_AUTO_DEPLOY_DISABLE=PASS
RENDER_AUTO_DEPLOY_MUTATED=YES
RENDER_DEPLOY_TRIGGERED_BY_SETTING_CHANGE=NO
PRODUCTION_RESTART_TRIGGERED_BY_SETTING_CHANGE=NO
RENDER_DEPLOY_TRIGGERED_BY_PR41_MERGE=NO
PRODUCTION_BACKEND_DEPLOYED_SHA_CHANGED=NO
PRODUCTION_BACKEND_DEPLOYED_SHA=9e15f8c6ff0ae24e05a928079cc3a643d58bfa08
BACKEND_MAIN_SHA=bec4ea4ac58abcbae0eb01c0c58bf7c0fd55bae5
BACKEND_POST_MERGE_CI=PASS
SOURCE_MAIN_READY_FOR_PRODUCTION_ENV_REMEDIATION=YES
PRODUCTION_RUNTIME_REMEDIATED=NO
BACKEND_MERGE_SAFETY_GATE=PASS
NODE_ENV_CURRENT_ON_RENDER=development
PRODUCTION_RUNTIME_ENVIRONMENT=FAIL_DEVELOPMENT
PRODUCTION_ENVIRONMENT_BLOCKER=YES
PRODUCTION_DEPLOY_CONFIGURATION_GATE=BLOCKED
PAYMENT_QR_ENABLED_CURRENT=false
PAYOS_CLIENT_ID=MISSING
PAYOS_API_KEY=MISSING
PAYOS_CHECKSUM_KEY=MISSING
PRODUCTION_BACKUP_EXECUTION=HARD_STOP_FUTURE_ACTION
RENDER_ENV_MUTATED=NO
PRODUCTION_DEPLOYED=NO
PRODUCTION_RESTARTED=NO
PRODUCTION_DB_MUTATED=NO
PRODUCTION_MIGRATION_EXECUTED=NO
PRODUCTION_PROVIDER_ACTIVATED=NO
PRODUCTION_SECRET_MUTATION=NO
PAYOS_WEBHOOK_REGISTERED=NO
LIVE_RESEND_CALLS=0
LIVE_R2_CALLS=0
LIVE_PAYOS_CALLS=0
REAL_MONEY_ACTIONS=0
FRONTEND_CHANGED=NO
PHASE_18_DONE=NO
PHASE_18_LAUNCH_READY=NO
PHASE_19_DEPENDENCY_SATISFIED=NO
PHASE_19_STARTED=NO
NEXT_ACTION=HUMAN_AUTHORIZE_RENDER_PRODUCTION_ENV_MUTATION_NODE_ENV_ONLY
AFTER_SAFE_BACKEND_MERGE_NEXT_ACTION=HUMAN_AUTHORIZE_RENDER_PRODUCTION_ENV_MUTATION_NODE_ENV_ONLY
```

The next mutation authorization must control restart/redeploy consequences and
which tested revision is loaded. A Git merge alone does not put new code into
the running service when auto-deploy is Off. Do not change NODE_ENV while the
old rejection-bearing revision is still the service's startup artifact.
