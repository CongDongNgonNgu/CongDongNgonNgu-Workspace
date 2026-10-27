# Secure CI/CD: TEST and Tino VPS Production

Status: PREPARATION / TEST CHECKPOINT. Production automatic deployment is NOT ACTIVATED.
Owner instruction dated 2026-10-27 supersedes standing authorization to merge application code to main.
No dev-to-main merge, VPS deployment/restart, database mutation, .env mutation, or Render/Vercel settings change is authorized in this preparation.
This document supersedes historical Render/Vercel-as-Production topology in docs/07-DEPLOYMENT.md for this task. Historical evidence remains unchanged.

## Topology and branch policy

| Component | Branch | Hosting | Database / API |
| --- | --- | --- | --- |
| Backend TEST | dev | Render | Separate Neon TEST |
| Frontend TEST | dev | Vercel | Render TEST /api/v1 |
| Backend Production | main | Tino VPS | Separate Neon Production; https://api.congdongngonngu.vn/api/v1 |
| Frontend Production | main | Tino VPS | https://congdongngonngu.vn; www redirects to apex |
| Workspace | main | GitHub documentation/evidence only | NEVER deployed to VPS |

Feature -> PR into dev -> CI -> TEST deployment -> functional verification -> owner approval -> reviewed activation PR -> future dev/main release PR -> main CI -> application deployment.
Never merge an application feature directly to main as a substitute for the TEST/approval gate.

## GitHub configuration and gates

Both repositories use GitHub Environment `production`, with deployment branch policy `main` only. Frontend API reports its existing display name as `Production`; environment names are case-insensitive. No environment was recreated.
Environment secret names ONLY:

- CDNN_SSH_PRIVATE_KEY
- CDNN_KNOWN_HOSTS
- CDNN_SSH_HOST
- CDNN_SSH_USER

All four are referenced through secrets.*, including HOST and USER. Never store Production DATABASE_URL in GitHub. Never send credentials in chat or evidence.
CI runs on PRs targeting dev/main and pushes to dev/main: npm ci, lint, typecheck, applicable existing tests, build, full audit and runtime-only moderate audit. Existing Backend native/SQL proof gates and Frontend performance budget remain.
Backend CI uses ephemeral localhost PostgreSQL, never Neon Production. New release tests use isolated temporary directories and stubs, not VPS paths or databases.
Production reusable workflows use contents:read, checkout/action pins, Environment secrets, per-app concurrency, strict pinned SSH identity, user cdnn-deploy, and exact checked source SHA. Environment secrets are resolved only by the deployment job.
Both the caller and callee contain a literal false activation gate. No manual dispatch or variable can unlock it. Main CI must succeed before the caller can run. A reviewed code change is required to remove BOTH false gates; this task does not remove either.
Current main SHA is checked through GitHub API before sending source. A git archive of that exact SHA is SHA256-verified on VPS. Git credentials are not copied to VPS. Runtime environment files are refused in the source archive (only .env.example is allowed).
Use required `quality` checks with strict/up-to-date branches on dev/main; disallow force pushes and branch deletion. Check live protection status in evidence; do not treat documentation as applied protection.

## Release design (prepared, not executed)

Stable app roots are /var/www/congdongngonngu/backend and /var/www/congdongngonngu/frontend. Nginx document root remains frontend/dist. No Nginx or Certbot replacement is required.
Each deployment stages source and builds under its own app's .releases/<SHA>-<RUN>-<ATTEMPT>. npm ci --include=dev installs locked build dependencies; Node major must be 24. A per-app flock supplements GitHub concurrency.
The existing dist must ALREADY be a symlink to a retained .releases/.../dist. Scripts fail before build/activation if a real dist directory is still present. Bootstrap is a separately reviewed, owner-authorized Production infrastructure operation, not performed here.
After a complete validated build, a new symlink is renamed over dist atomically. The prior target is preserved; no release deletion/retention cleanup runs automatically. Review disk space before activation; plan bounded retention separately.
Frontend release ancestors have traversal permission and public dist files have read permission for Nginx. Source, node_modules, logs and runtime configuration stay private. Previous hashed assets are retained to serve already-open clients; this currently accumulates assets, so disk growth must be monitored.

Backend specifics:

- Production .env stays at backend/.env, owned by cdnn-deploy with mode 600. It is never printed, uploaded, copied, replaced or deleted. No .env is added to staged releases.
- PM2_HOME is fixed to /home/cdnn-deploy/.pm2. Only cdnn-backend can restart. No root PM2, other app, service, Nginx or database is restarted.
- Actual PM2 runtime MUST be inspected first. runtime-contract.json intentionally has reviewed:false and null metadata; it blocks deployment. Do not guess an npm start command.
- The prepared dist-only strategy requires actual PM2 cwd to be backend and its resolved executable path to be within backend/dist. If actual configuration differs, adapt/review the release strategy before activation. Preserve interpreter, arguments, process mode, environment and current runtime flags; do not change them to fit this design silently.
- After contract review, confirm staged entry exists, read-only migration check passes, restart existing named process, then require HTTP 200, success:true, status:ok, service:congdongngonngu-backend and environment:production from the public /api/v1/health endpoint.
- Nest dependencies resolve from the staged real dist path into that release's node_modules. Verify this with the actual PM2 interpreter/symlink behavior before first Production activation.

Frontend specifics:

- Build with VITE_API_BASE_URL=https://api.congdongngonngu.vn/api/v1, validate HTML/JS and reject TEST provider URLs.
- Each build publishes cdnn-release.json with exact SHA. Public verification checks website 200, release marker SHA, entry assets, Production API URL, and www canonical 301/308 redirect.
- Confirm existing Nginx permits symlink traversal and serves cdnn-release.json uncached/revalidated. The script makes no Nginx changes.

## Rollback runbook

Automatic failure handling restores the prior dist symlink with a separate atomic rename. Backend restarts only cdnn-backend, then retries the same health checks; Frontend retries public checks against the prior release marker. Both record verified, rolled_back or rollback_failed with attempted SHA, prior target and UTC timestamp in the app-local .deployment-ledger.jsonl. The workflow fails even when rollback succeeds.
No schema rollback is attempted. Failed release/source directories are retained for diagnosis. Do not delete runtime files or use git reset --hard/git clean.
For manual application rollback after separate owner authorization:

1. Connect only as cdnn-deploy with pinned host identity. Acquire the app's .deploy.lock and stop new deployments.
2. Read the ledger and validate the chosen prior target is an existing .releases/.../dist in the SAME app root. Validate prior SHA and artifact; never accept an arbitrary user path.
3. Create a unique sibling symlink to that target, then mv -Tf it over dist. Never overwrite a real directory.
4. For Backend, set PM2_HOME=/home/cdnn-deploy/.pm2 and restart only cdnn-backend using its preserved runtime. For Frontend, no service restart is needed.
5. Retry public verification for up to 12 attempts with 5-second intervals; record the rollback SHA, UTC timestamp and result. Escalate rollback_failed to the operator; do not keep cycling releases.
6. For any schema incompatibility, STOP and use the separately validated database recovery plan. Never infer that swapping application files restores database state.

## Migration safety

The user reports 39 applied Production migrations; this preparation does not query Production DB to verify that count.
check-migrations.cjs reads schema_migrations in a READ ONLY transaction with a statement timeout. It compares normalized SHA256 checksums with committed forward migration files and blocks pending, changed, unknown or inaccessible histories. DATABASE_URL is cleared from inherited SSH environment before loading the existing VPS .env. It never invokes database/migrate.cjs.
Any pending migration requires a separate reviewed plan: exact SQL/checksums, destructive/non-destructive classification, expected locks/downtime, compatibility with current/prior app releases, verified backup and restore evidence, recovery owner/procedure and explicit owner approval. No schema down migration runs automatically.
TEST migration work must target Neon TEST only; never use TEST for Production or copy Production environment files to TEST.

## Manual TEST configuration (user action pending)

Render Backend:

1. Open the existing TEST web service -> Settings -> Build & Deploy -> Branch -> select dev -> Save. Do not change a different service.
2. Confirm repository is CongDongNgonNgu-Back-End. Preserve reviewed build/start commands and native processor build steps; do not substitute a historical command.
3. Confirm DATABASE_URL identifies Neon TEST in Render's secret UI, without copying it into evidence. Set NODE_ENV=test and AUTH_PERSISTENCE=postgres explicitly (test defaults to memory otherwise); PUBLIC_APP_URL and CORS_ALLOWED_ORIGINS must allow only the intended TEST frontend origins. Preserve existing TEST-specific provider credentials and disabled feature flags.
4. Verify Neon TEST schema compatibility with the exact dev revision; any TEST migration must use the reviewed TEST-only procedure after confirming database identity. If enabling TEST auto-deploy, choose After CI Checks Pass where available; otherwise deploy the exact successful dev SHA manually after CI. Do not bypass red CI.
5. Verify the deployed Render revision equals BACKEND_DEV_SHA and /api/v1/health reports the expected service and environment:test. Record URL, revision, timestamp and sanitized result.

Vercel Frontend:

1. Open the existing TEST project -> Settings -> Environments -> Production (or Git -> Production Branch in the current UI) -> branch tracking -> dev. Here Vercel's label Production is the TEST project's deployment tier; it is not the VPS Production environment.
2. Confirm repository is CongDongNgonNgu-Front-End-Web and build/output remain npm run build / dist.
3. Set VITE_API_BASE_URL to the Render TEST origin plus /api/v1 for the TEST project's Production and applicable Preview environment scopes. Environment changes require a new deployment.
4. Review vercel.json: its relative /api/v1 rewrite currently targets congdongngonngu-back-end.onrender.com. If this is not the actual TEST service, review/update that TEST rewrite before validation. An explicit absolute VITE_API_BASE_URL is required so the frontend bundle uses the selected Render TEST backend.
5. Deploy the exact successful FRONTEND_DEV_SHA. Verify browser requests, authentication/cookies/CORS, community/navigation and current critical journeys against Neon TEST. Record API URL and exact Render/Vercel revisions. Do not use live Production user/payment data.

These dashboard actions are instructions only; no branch setting was changed here. Existing phase-specific TEST credential-rotation/media gates remain in force for their own acceptance.

## Production activation checklist: all required

- [ ] Exact Backend/Frontend dev push CI passed, including new Linux rollback tests and all existing native/SQL gates.
- [ ] Render and Vercel track dev; exact deployed revisions and health/browser functional TEST evidence are reviewed. Separate Neon TEST, expected environment and API URL are confirmed.
- [ ] User explicitly approves Production activation AFTER that evidence; no standing or historical main-merge authorization substitutes for approval.
- [ ] SSH inspection as cdnn-deploy succeeds with trusted pinned known_hosts. Actual PM2 cwd/script/interpreter/mode/args/runtime flags are reviewed; commit only sanitized contract metadata and reviewed:true.
- [ ] Inspect app directory ownership, Nginx symlink behavior/cache, PM2 dependency resolution, available disk/RAM and permissions without touching unrelated apps.
- [ ] Review and separately authorize one-time bootstrap from real dist directory to symlink. Prefer atomic Linux renameat2 exchange of staged symlink and existing directory, with a validated recovery procedure; otherwise require an explicit maintenance window. Do not implement an unreviewed directory replacement during deployment.
- [ ] Bootstrap retains a valid prior backend artifact/dependencies and prior frontend artifact with truthful cdnn-release.json marker, plus each baseline release root .source-sha containing its verified 40-character source SHA; verify baseline before/after. Production .env inode/content/permissions stay preserved.
- [ ] Migration read-only gate is clear; otherwise reviewed backup/recovery/migration plan and explicit separate authorization are required. Never assume the reported count alone proves compatibility.
- [ ] GitHub main-only Environment policies, all four secret names, required CI branch protections and owner approval controls are reverified.
- [ ] Review activation PR removing both literal false gates, with needs:quality and main/push checks retained; merge application dev/main release PR only after authorization. No alternative workflow_dispatch bypass.
- [ ] First VPS deployment, failed-health rollback drill, deployed-SHA verification and application ledger checks happen ONLY in the separately approved activation task. Until executed, VPS deployment/rollback are UNTESTED.
- [ ] Workspace remains GitHub-only; unrelated PM2/Nginx/database services remain untouched.

## Evidence and blockers

See CI-CD-PREPARATION-EVIDENCE-2026-10-27.md for observed source SHAs, PRs, checks and endpoint results.
Current external blocker: read-only SSH login as cdnn-deploy returned Permission denied (publickey,password). Production .env and PM2 were not inspected. Enable the existing authorized deploy identity in the local SSH agent/config and ensure its public key is authorized for cdnn-deploy, using trusted local known_hosts; never paste a private key or DATABASE_URL into chat. GitHub Environment secrets cannot be read back and are not a substitute for local SSH access.
For sanitized PM2 inspection after access is available, use the repository's scripts/deploy/check-runtime.cjs --inspect with PM2_HOME fixed as above; it consumes jlist in memory and emits only cwd/script/interpreter/mode. Do not print raw pm2 jlist/describe/env output because it can contain credentials.

Design references: [GitHub secure use](https://docs.github.com/en/actions/reference/security/secure-use), [reusable workflows and Environment secrets](https://docs.github.com/en/actions/how-tos/reuse-automations/reuse-workflows).
