# Phase 18 operational readiness

**Date:** 2026-10-05. **Scope:** documentation and role assignment only.
This is the authoritative production deployment, rollback, restore, smoke,
monitoring and go/no-go runbook. It supersedes operational documentation gaps
in the [preflight snapshot](PHASE-18-PRODUCTION-RELEASE-PREFLIGHT-2026-10-05.md),
not its unresolved production execution gates. READY means an operator has a
defined procedure; it does not mean the procedure has run or all prerequisites
are satisfied. No commands or dashboard mutation steps below were executed.

## Verified baseline and evidence boundaries

```text
BACKEND_MAIN_SHA=9e15f8c6ff0ae24e05a928079cc3a643d58bfa08
FRONTEND_MAIN_SHA=a013c45cc22d5f6b82bfd5be2f07a19d28a9f9a6
WORKSPACE_BEFORE_SHA=9e2aa8679882c709d68343f620e63d7f61f69205
MAIN_SYNC=PASS
WORKTREE_CLEAN=YES
BACKEND_CHANGED=NO
FRONTEND_CHANGED=NO
PRODUCTION_MIGRATION_REQUIRED=NO
```

Both application repositories were fetched and safely synchronized. Exact-head
push CI is complete/success: [Backend run 104](https://github.com/CongDongNgonNgu/CongDongNgonNgu-Back-End/actions/runs/37114659955)
and [Frontend run 85](https://github.com/CongDongNgonNgu/CongDongNgonNgu-Front-End-Web/actions/runs/37114701259).
Both workflows use Node 24 and run install, lint, typecheck, tests, build and
security audit; Backend includes E2E and Frontend includes performance budget.
They contain no production deployment job. Workspace has no workflow.

Repository inspection included tracked configuration, documentation and source
throughout all three repositories, excluding secret environment files and
generated dependencies. Sources: Backend `package.json`, `.github/workflows/ci.yml`,
`src/app.setup.ts`, `src/health/health.controller.ts`,
`src/membership/membership.controller.ts`, payment provider/service code,
`src/cli/phase18-r2-backup-restore.ts`, `src/operations/phase18-r2-backup.ts`;
Frontend `package.json`, `.github/workflows/ci.yml`, `vite.config.ts`, `vercel.json`.
No tracked Dockerfile, Render blueprint, runtime Node pin or provider account
deployment settings were found. Frontend is React/Vite with default `dist`
output and a `/api/v1/:path*` rewrite to the Backend hostname.

Public inspection only: Frontend HEAD returned HTTP 200 at
2026-10-05T02:07:34Z (09:07:34 Asia/Saigon). Backend GET health produced a
network error at 02:07:34Z; availability/body/environment/deployed SHA are
**unverified**, not FAIL or an inferred outage. No route/user/payment smoke
suite was run. Public URLs do not establish the deployed source revision.
No authenticated provider dashboard was inspected; account-specific settings
are `OPERATOR_VERIFY_AT_RELEASE`.

## Deployment models

| Field | Backend | Frontend |
| --- | --- | --- |
| Hosting provider | Render, from accepted hostname evidence | Vercel, from accepted hostname/config evidence |
| Actual deploy source | `UNKNOWN`; Git integration/Docker/manual account wiring unproven | `UNKNOWN`; Git integration/CLI/manual account wiring unproven |
| Actual provider deployment branch | `OPERATOR_VERIFY_AT_RELEASE` | `OPERATOR_VERIFY_AT_RELEASE` |
| Intended release branch | `main` | `main` |
| Repository-supported install/build | `npm ci && npm run build` | `npm ci && npm run build` |
| Start | `npm run start:prod` = `node dist/main.js` | Provider serves static `dist`; no application server command |
| Actual provider build/start settings | `OPERATOR_VERIFY_AT_RELEASE` | `OPERATOR_VERIFY_AT_RELEASE` |
| Runtime Node version | `UNKNOWN`; CI major 24 is not proof of Render runtime | Build version `OPERATOR_VERIFY_AT_RELEASE`; package requires `>=20.19.0`, CI major 24 |
| Production URL | `https://congdongngonngu-back-end.onrender.com` | `https://cong-dong-ngon-ngu-sigma.vercel.app` |
| Health URL | `https://congdongngonngu-back-end.onrender.com/api/v1/health` | Home URL HTTP availability |

Health is an application liveness/config response, not a database/provider
readiness check. Expected envelope: `success=true`, `data.status=ok`,
`data.service=congdongngonngu-backend`, `data.environment=production`.
No separate readiness route is implemented.

| Operational detail | Classification | Safe identification / release requirement |
| --- | --- | --- |
| Render internal service ID/name | `OPTIONAL_IDENTIFIER` | Match BOTH linked Backend repository and exact public hostname; if ambiguous, STOP |
| Vercel internal project ID/name | `OPTIONAL_IDENTIFIER` | Match BOTH linked Frontend repository and exact production domain; if ambiguous, STOP |
| Account access and correct environment | `REQUIRED_TO_EXECUTE` | Authorized operator confirms account/project/service and production context without opening secret values |
| Deploy source, branch, commands, Node version | `REQUIRED_TO_EXECUTE` | Record sanitized provider metadata; confirm main and repository-supported settings or obtain reviewed disposition before deployment |
| Exact revision and rollback availability | `REQUIRED_TO_EXECUTE` | Match full SHA, deployment record and artifact eligibility; never infer from branch name |
| Config, backup target/retention, alert destination | `REQUIRED_TO_EXECUTE` | Operator confirms readiness and permissions; do not copy values or credentials into evidence |

Unknown identifiers do not block documentation readiness. A mismatched linked
repository, Docker-only service, missing Git integration or unavailable revision
blocks execution of the selected Git workflow until an approved compatible
deployment path is recorded. Do not create/reconfigure a service automatically.

## Ownership and authorization

| Role | Responsibility |
| --- | --- |
| `PROJECT_RELEASE_OWNER` | Release go/no-go, rollback decision, provider activation decision, recovery coordination, primary alert acknowledgement |
| `RECOVERY_OPERATOR` | Target verification, backup and restore execution after explicit authorization; sanitized integrity evidence |
| `APPLICATION_OWNER` | Backend/Frontend compatibility, schema/application validation, safe smoke after deployment/recovery, secondary alert escalation |
| `PAYMENT_RECONCILIATION_OWNER` | Order/attempt/settlement/entitlement integrity, replay and in-flight reconciliation after rollback/restore |

Role assignments are accepted by this documentation authorization. Before an
execution window the release owner identifies available operators and confirms
their access/coverage privately; no invented personal name or credential is
required in repository evidence. One person may hold multiple roles.

```text
RECOVERY_OWNER=PROJECT_RELEASE_OWNER
RECOVERY_OPERATOR=RECOVERY_OPERATOR
APPLICATION_OWNER=APPLICATION_OWNER
PAYMENT_RECONCILIATION_OWNER=PAYMENT_RECONCILIATION_OWNER
MONITORING_OWNER=PROJECT_RELEASE_OWNER
MONITORING_OWNER_ASSIGNED=YES
ALERT_PRIMARY=PROJECT_RELEASE_OWNER
ALERT_SECONDARY=APPLICATION_OWNER
RPO=NOT_YET_CONTRACTED
RTO=NOT_YET_CONTRACTED
```

No contracted RPO/RTO was found in authoritative operations/data lifecycle
documents. Before release/incident recovery, record acceptable restore point,
data-loss window and recovery urgency as an owner decision, not a guaranteed SLA.

| Action | Required authorization |
| --- | --- |
| Routine approved TEST/UAT backup/drill | Within existing approved UAT scope, no additional production hard stop; retain exact target guards |
| Production backup/snapshot | `HUMAN_AUTHORIZATION_REQUIRED` |
| Production restore, target provisioning, reconnect or write limitation | `HUMAN_AUTHORIZATION_REQUIRED`; exact target and action scope |
| Production deploy/restart or application rollback/promotion | `HUMAN_AUTHORIZATION_REQUIRED` |
| Production environment/secret change, including payment kill switch | `HUMAN_AUTHORIZATION_REQUIRED` |
| Provider activation, webhook registration, external monitoring activation | Separate `HUMAN_AUTHORIZATION_REQUIRED` |
| Live real-money verification | Separate bounded `HUMAN_AUTHORIZATION_REQUIRED` |
| Final Phase 18 closeout / Phase 19 | Separate owner decision; this task grants neither |

## Release and rollback revision ledger

Create one sanitized record per release/incident in this phase's evidence
directory. Fill from provider revision metadata, not repository parent guesses.
Before first deployment, a prior version may be `NONE_INITIAL_RELEASE` only
with an explicit stop/recovery strategy approved by the release owner.

```text
RELEASE_ID=<unique release or incident identifier>
BACKEND_SHA=<full intended then verified deployed SHA>
FRONTEND_SHA=<full intended then verified deployed SHA>
WORKSPACE_EVIDENCE_SHA=<full merged runbook revision>
DEPLOYED_AT=<UTC timestamp or NOT_EXECUTED>
DEPLOYED_BY_ROLE=<authorized role>
PREVIOUS_BACKEND_SHA=<verified previous production SHA or NONE_INITIAL_RELEASE>
PREVIOUS_FRONTEND_SHA=<verified previous production SHA or NONE_INITIAL_RELEASE>
BACKEND_DEPLOYMENT_REFERENCE=<sanitized provider deployment reference>
FRONTEND_DEPLOYMENT_REFERENCE=<sanitized provider deployment reference>
PAYMENT_MODE=<provider and QR state, no values>
BACKUP_REFERENCE=<sanitized approved backup evidence reference>
SMOKE_RESULT=<PASS|FAIL|NOT_EXECUTED>
ROLLBACK_RESULT_IF_USED=<PASS|FAIL|NOT_USED>
AUTHORIZATION_REFERENCE=<owner approval reference, scope and time>
```

The preflight parent SHAs `af5e6b989f2410cbdbc8b42ef5b899903fa4444b` and
`01331d6e4f768c9a5d0079658c60b7fcedddcaa8` are repository baselines only.
They are NOT proven last-known-good production targets. Require provider
history plus prior smoke evidence and schema/API compatibility for rollback.

## Backend deployment procedure — execute only after approval

1. PRECHECK: pin the Backend SHA above (or separately approved replacement),
   exact-head CI PASS and reviewed release evidence; check no engineering
   blocker. Match Render service by hostname AND repository. Inspect read-only
   Settings/Deploys metadata: source, branch `main`, root repository directory,
   Node/runtime, build and start commands, health path, existing pre-deploy
   hooks, auto-deploy behavior and currently live revision. Unexpected
   migration/hook or mismatch means STOP, not automatic editing.
2. Confirm `PRODUCTION_MIGRATION_REQUIRED=NO` for this release; this is not
   proof the live database schema is current. APPLICATION_OWNER verifies live
   migration checksums/compatibility using authorized read-only access.
   No migration is bundled into start/build. Verify pre-deploy backup evidence,
   isolated restore compatibility, rollback target and incident contacts.
3. Confirm production config schema, secret presence through authorized
   operator validation without disclosure, exact CORS/public URL, provider
   readiness, active external monitoring and explicit deploy authorization.
   `PAYMENT_QR_ENABLED=false` is the safe release/stop-new-checkouts state.
   Configuring that state is a separately authorized production mutation.
   PayOS values remain UNKNOWN in this task.
4. DEPLOY: for the verified Git-linked Render web service, open Deploys >
   Manual Deploy > Deploy a specific commit; paste the full approved Backend
   SHA and confirm Deploy Commit only within the authorized window. This
   supported path disables auto-deploys; record that side effect. Never use
   latest-commit selection when it differs from the approved SHA, a secret
   deploy-hook URL, a source edit, force push or branch reset.
   [Render deployment procedure](https://render.com/docs/deploys).
5. Expect `npm ci && npm run build`, then `npm run start:prod` serving the
   configured platform port. Compare sanitized build logs and provider commit
   metadata to full SHA; successful build alone is not successful release.
6. POST-DEPLOY: execute the safe smoke section, inspect Render runtime logs and
   telemetry for startup errors, sustained 5xx and correlation/redaction
   failures. Record deployed SHA/time, smoke result and monitoring observation
   window. Keep release NO-GO on failure; use authorized rollback below.

## Frontend deployment procedure — execute only after approval

1. PRECHECK: pin the Frontend SHA above and exact-head CI PASS. Identify Vercel
   project by production hostname AND linked repository. Confirm actual Git
   source, production branch `main`, root, Vite framework, `npm ci` install,
   `npm run build`, `dist` output and build Node version. Provider overrides
   are unknown until operator verification. Missing Git wiring is an execution
   stop, not permission to connect an account or edit settings.
2. Verify Backend deployed revision/API compatibility, `vercel.json` API
   rewrite target, public environment readiness (no server secrets in Vite
   variables), intended payment capability/QR-disabled UI, prior deployment
   eligibility and explicit production deployment authorization.
3. DEPLOY: use verified Git-linked project > Deployments > Create Deployment;
   supply full approved Git SHA. If asked for branch configuration choose the
   verified `main` production configuration. Confirm the production environment
   and domains before authorizing execution. If this creates only a preview,
   verify its SHA/config first and use the separately authorized Promote to
   Production action; do not treat a preview as a production deployment.
   Do not push a dummy commit or alter main to trigger deployment.
   [Vercel Git deployment procedure](https://vercel.com/docs/git).
4. POST-DEPLOY: verify full SHA in deployment metadata, build success, production
   domain assignment and safe smoke below, including API rewrite and payment
   capability agreement. Record console/network findings without cookies,
   tokens or raw account data. Failure keeps go/no-go closed.

## Payment-aware application rollback

Trigger review for failed health/smoke, sustained new 5xx, security exposure,
payment capability mismatch or settlement integrity risk. Release owner
declares incident and authorizes exact rollback target/action. Obtain the
last-known-good deployed SHA from ledger AND provider history; confirm target
is compatible with current DB and counterpart application. No history rewrite,
migration deletion, automatic DB downgrade or blind financial data change.

For payment risk, obtain authorization to enforce `PAYMENT_QR_ENABLED=false`
before accepting new checkout traffic. This does not disable legitimate
authenticated webhooks. Preserve provider credentials/verification and
order/attempt references required for in-flight settlement. Do not change
`PAYMENT_PROVIDER` to `disabled` as a substitute for the QR kill switch.

Backend: use Deploys > Manual Deploy > Deploy a specific commit with the
verified known-good Git SHA (same build/start expectations). Prefer this
rebuild path when current QR-disabled configuration must be retained. A retained
successful artifact may instead use Deploys > Rollback > Rollback to this deploy
only after reviewing restored environment/start/health settings. Render artifact
rollback can restore old environment values, including an unsafe QR-on state;
if safe effective configuration cannot be established, STOP and use the
approved specific-commit redeploy. Record auto-deploy suppression and never
reenable it automatically. [Render rollback semantics](https://render.com/docs/rollbacks).
Verify health, public API, schema compatibility, logs and payment reconciliation
before resolving the incident.

Frontend: project overview > Production Deployment > Instant Rollback;
select the verified known-good eligible deployment, verify domains/API config,
then confirm only after authorization. Hobby supports the immediately previous
deployment; other plans have broader eligibility. If the needed artifact is
ineligible, use the approved exact-SHA Git deployment procedure instead. Previous
build-time environment/rewrite configuration can be stale; inspect it before
switching traffic. [Vercel rollback semantics](https://vercel.com/docs/instant-rollback).
Verify actual deployed SHA, home/auth/membership and Backend compatibility;
checkout UI must reflect current capability, including QR disabled. Record the
incident, outcome, unresolved financial reconciliation and rollback reference.

PAYMENT_RECONCILIATION_OWNER verifies authenticated webhook/signature validation,
replay/idempotency, provider/local attempt/order identity, settlement amount and
currency, entitlement and credit consistency through approved read-only evidence
and existing reconciliation controls. No entitlement without verified settlement;
no discarded valid financial facts. Any corrective write requires separate
authorization. Do not perform a live payment as a rollback smoke test.

## Database rollback and recovery policy

Application rollback does not imply DB rollback. Current release adds no
migration. For future releases, review backward compatibility and prefer an
approved forward-fix where possible. Destructive down migrations, restore,
credential changes and reconnect are separate authorized actions. Never delete
migration files/checksum rows or mutate live data just to match old code.

### A. TEST restore verification

The [R2 drill](PHASE-18-R2-BACKUP-RESTORE-2026-10-03.md) verified custom-format
PostgreSQL backup, private S3-compatible upload/download, SHA256 and isolated
UTF-8 restore using PostgreSQL 18.6 tools; 26 migrations/checksums and representative
UAT records passed. Its CLI `npm run uat:r2:backup-restore` is restricted to the
exact approved UAT fingerprint and rejects production. Run only within approved
UAT scope, with its target guards intact. It creates retained UAT objects and
disposable restore state; it is not a read-only command. Never set development
mode, substitute production credentials or alter guards to use it on production.
This task did not rerun the drill.

### Pre-deploy production backup — future authorized operator procedure

1. Obtain explicit backup authorization and verify source DB identity, host,
   database/schema, TLS, read-only dump privilege and approved restore target.
   Use operator-controlled libpq service/pass files and a least-privilege private
   R2 profile; no connection strings, passwords or access keys in commands/logs.
   Confirm tooling supports the source PostgreSQL major and destination major;
   18.6 is the UAT tool version, not a production server-version claim.
2. Select access-restricted work directory, unique production object namespace,
   retention deadline and custodian. Confirm private bucket policy/public-access
   settings; the UAT anonymous probe did not prove privacy conclusively. Do not
   publish dump content or presigned URLs. Capture source migration checksum
   state and database revision before taking a consistent custom-format dump.
3. Operator shell templates below use NONSECRET variables populated from approved
   release metadata. `PGSERVICEFILE`/`PGPASSFILE` and AWS profile credentials are
   provisioned privately by the operator. Stop on each nonzero exit; these are
   procedures, not a newly approved production utility.

```sh
pg_dump --dbname="service=approved_production_backup" --format=custom --no-owner --no-privileges --file="$DUMP_PATH"
sha256sum "$DUMP_PATH"
aws --profile approved-production-r2 --endpoint-url "$R2_ENDPOINT" s3 cp "$DUMP_PATH" "s3://$BACKUP_BUCKET/$BACKUP_OBJECT_KEY" --no-progress
aws --profile approved-production-r2 --endpoint-url "$R2_ENDPOINT" s3 cp "s3://$BACKUP_BUCKET/$BACKUP_OBJECT_KEY" "$DOWNLOADED_DUMP_PATH" --no-progress
sha256sum "$DOWNLOADED_DUMP_PATH"
pg_restore --list "$DOWNLOADED_DUMP_PATH"
```

4. Verify original/downloaded SHA256 and byte counts match trusted protected
   metadata, not only an R2 ETag. Store companion integrity metadata privately
   with format, created timestamp, tool version, size, digest, source identity
   fingerprint and migration revision/checksums. Metadata and dump need trusted
   provenance; checksum alone does not authenticate an untrusted backup.
5. Verify restore compatibility on an approved isolated EMPTY target using the
   restore steps below; do not overwrite source. Capture schema/migration and
   representative-data validation without raw rows. Stop deploy if any step fails.
   Retain protected artifacts under owner-approved retention and access controls;
   cleanup/expiry is a separate authorized action, not automatic deletion.

Required sanitized evidence:

```text
BACKUP_CREATED_AT=<UTC>
BACKUP_OBJECT_KEY_SANITIZED=<production namespace reference, no URL/token>
SHA256=<verified digest>
BACKUP_BYTES=<size>
RESTORE_COMPATIBILITY_VERIFIED=<PASS|FAIL>
DATABASE_REVISION=<migration revision and checksum evidence reference>
BACKUP_RETENTION=<owner-approved deadline/policy>
BACKUP_AUTHORIZATION_REFERENCE=<approval>
```

### B. Production disaster recovery — future authorized operator procedure

1. PROJECT_RELEASE_OWNER declares incident; preserve timeline and select restore
   point using trusted backup ledger, acceptable data loss and financial exposure.
   Obtain explicit restore authorization naming source, selected backup, NEW
   restore target and any provisioning/cutover actions. Healthy production must
   never be silently overwritten; authorization to deploy is not restore approval.
2. Coordinate authorized traffic/write limitation with APPLICATION_OWNER; this
   release has no proven universal maintenance-mode toggle. Keep QR disabled
   through approved configuration. Preserve authenticated settlement ingestion
   where safely possible; if writes must stop, record provider events/pending
   settlements for later authenticated reconciliation. Do not acknowledge an
   unpersisted settlement as fulfilled.
3. Preserve current production DB evidence/snapshot where possible under separate
   backup authorization; preserve financial facts since the restore point in
   protected incident storage. If impossible, record the limitation and obtain
   owner decision before proceeding. Never replace newer valid settlement facts
   with an old snapshot without a reconciliation plan.
4. RECOVERY_OPERATOR downloads selected private R2 dump and protected integrity
   metadata; verifies SHA256/size/provenance and `pg_restore --list`. Prepare an
   approved isolated empty UTF-8 target with correct PostgreSQL version,
   extensions/roles and least privilege. Confirm source/target fingerprints
   differ and target is neither healthy production nor active UAT.
5. Use approved target service mapping; credentials stay in protected pass/service
   files. The service points to the prepared EMPTY target database:

```sh
pg_restore --dbname="service=approved_isolated_restore" --no-owner --no-privileges --exit-on-error --single-transaction "$DOWNLOADED_DUMP_PATH"
```

6. Stop on error; do not reconnect a partial restore. APPLICATION_OWNER compares
   expected schema/tables, `schema_migrations` checksums with release migration
   files (26 on current candidate), reviewed row-count/constraint checks, core
   identities and representative membership/order/attempt/settlement/entitlement
   relationships. Apply separately reviewed production grants/role mapping because
   dump excludes owners/privileges. Never reuse UAT fixture counts as production
   data expectations. All validation is read-only and sanitized.
7. PAYMENT_RECONCILIATION_OWNER inventories settlements since backup time, detects
   replay/duplicate and missing order/attempt/entitlement facts, and produces a
   reconciliation plan. Verified provider events and financial facts must be
   preserved. Missing identity/amount evidence remains unresolved; no fabricated
   entitlement or automatic replay/write repair.
8. Obtain explicit owner cutover/reconnect approval ONLY after validation and
   reconciliation disposition. Authorized operator changes app connection safely;
   preserve original DB for investigation and do not destroy it. Run authorized
   safe smoke, review logs/alerts, reconcile financial state with approved controls.
   New checkout stays disabled until separately authorized to resume.
9. Record incident ID, approval references, restore point, digest, sanitized
   source/target fingerprints, schema/data checks, actual deployed SHAs, unresolved
   reconciliation, smoke outcome and owner closure. Keep restricted artifacts and
   approved retention; never paste data or credentials into Workspace.

Procedural sources: [pg_dump](https://www.postgresql.org/docs/current/app-pgdump.html),
[pg_restore](https://www.postgresql.org/docs/current/app-pgrestore.html),
[R2 AWS CLI](https://developers.cloudflare.com/r2/examples/aws/aws-cli/).
Production tooling access and database mapping remain release-time operator
requirements; the TEST/UAT CLI is not repurposed or advertised as production-ready.

## Provider-neutral monitoring plan

```text
MONITORING_PLAN=READY
MONITORING_PROVIDER=OWNER_CHOICE
EXTERNAL_MONITORING_CURRENTLY_ACTIVE=NO
EXTERNAL_MONITORING_REQUIRED_BEFORE_PRODUCTION_LAUNCH=YES
```

PROJECT_RELEASE_OWNER chooses provider and privately confirms an alert
destination with APPLICATION_OWNER as backup acknowledgement role. Selection
and activation are separately authorized; no vendor account is required to
complete this plan. At release, record target list, polling window, failure
threshold, observation window, acknowledgement deadline, escalation timeout
and coverage roster; these are execution inputs, not an invented SLA.

| Signal | Requirement / response |
| --- | --- |
| Backend availability | HTTPS GET exact health URL; HTTP 200 plus expected envelope/service/production marker; transport/body failure alerts primary owner |
| Frontend availability | HTTPS production home URL status/response; alert on sustained unreachable/HTTP failure |
| API health | Sustained unexpected 5xx and latency versus pre-release baseline where platform telemetry supports it; APPLICATION_OWNER investigates |
| Payment | Existing telemetry for provider/checkout errors, webhook processing/signature/reconciliation failures, no raw payload/signature; PAYMENT_RECONCILIATION_OWNER investigates |
| Operational | Delivery failure and unacknowledged alerts escalate to secondary; record ownership and incident reference |

Before launch: activate approved monitor, verify target identity and redaction,
test alert delivery/acknowledgement/escalation without financial or DB mutation,
and attach sanitized evidence. Lack of required telemetry must be resolved or
explicitly reviewed before execution; do not invent a configured log sink.

## Safe smoke — future authorized post-deploy/recovery check

No production smoke was performed in this task. Operator checks only after
release authorization, using a bounded observation window recorded in ledger.

1. HTTPS GET Backend `/api/v1/health`: HTTP 200 and envelope above; no inference
   of DB/provider readiness from this route alone.
2. GET `/api/v1/languages`: safe public API response, no unexpected 5xx.
3. GET `/api/v1/auth/providers`: inspect actual capability state, no OAuth start
   or login/register/reset mutation. If approved existing operator session is
   available, optional GET `/api/v1/auth/me` and `/api/v1/membership/capabilities`
   verify safe reads; never persist session/token/identity payloads as evidence.
4. GET `/api/v1/membership/catalog`: payment capability projection agrees with
   desired provider and QR-disabled state. No POST order/payment attempt/webhook,
   no checkout completion and no synthetic production settlement.
5. Open Frontend `/`, `/login`, `/languages`, `/membership`; verify route/assets,
   API rewrite, appropriate anonymous/auth behavior, accurate unavailable checkout
   state when QR off. For a separately authorized QR-on release, verify available
   affordance agrees with API without creating an order or payment.
6. Inspect console/network for fatal errors, failed assets/CORS/rewrite, new 5xx;
   inspect bounded runtime logs for startup issues, correlation IDs and secret
   redaction. Record status/counts/sanitized request reference only; never raw
   cookies, auth headers, signatures, financial payloads or customer data.
7. Any failed critical check means NO-GO and owner rollback/recovery decision.
   Record observed window, result and exact provider revisions; public HTTP
   success alone does not prove source SHA or all release gates.

## Authoritative production go/no-go checklist

This checklist is READY as an operator procedure. All unchecked execution gates
remain OPEN; `PRODUCTION_RELEASE_GO_NO_GO=NO_GO`. The preflight checklist is a
historical snapshot and must not be used as a competing active checklist.

- [ ] CODE: Backend intended full SHA verified against provider source.
- [ ] CODE: Frontend intended full SHA verified against provider source.
- [ ] CODE: exact-head CI PASS and no unresolved engineering blocker.
- [ ] DATABASE: migration disposition/current schema compatibility confirmed.
- [ ] DATABASE: explicitly authorized pre-deploy production backup PASS with
      integrity, privacy, retention and isolated restore-compatibility evidence.
- [ ] RECOVERY: verified deployed rollback targets/artifacts recorded in ledger.
- [x] RECOVERY: deployment/rollback/restore runbooks ready; roles assigned.
- [ ] RECOVERY: operator access/availability and acceptable recovery window confirmed.
- [ ] MONITORING: authorized external monitor active and alert delivery tested.
- [x] MONITORING: primary/secondary alert ownership assigned.
- [ ] PAYMENT: PayOS credential presence/configuration verified without disclosure.
- [ ] PAYMENT: public HTTPS webhook registered and signed processing verified
      within separately authorized scope (no fabricated callback).
- [ ] PAYMENT: desired QR state explicit; keep false until activation authorized.
- [ ] PAYMENT: bounded live verification separately authorized (execution after
      deployment; not a deployment/smoke side effect).
- [ ] AUTHORIZATION: exact production deploy/restart action authorized.
- [ ] POST DEPLOY: verified deployed SHAs and safe smoke PASS.
- [ ] POST DEPLOY: logs/error rate/redaction/correlation/alerts sane.
- [ ] FINAL: live verification evidence reconciled and Phase 18 final release
      evidence/owner closeout accepted; Phase 19 requires separate authorization.

Runbook documentation readiness is complete. Release-time access/config checks,
backup/monitor activation and production execution are not documentation defects.

## Current disposition

Documentation validation: balanced Markdown fences, 10 local links resolved,
source paths checked, current operational values matched across PROJECT-STATE,
DEPENDENCY-GRAPH, BLOCKERS and HANDOFF. Stale BLOCKED/NO/UNASSIGNED operational
values remain only in the explicitly historical preflight snapshot. No existing
Workspace Markdown validation script/workflow was found; focused local checks
were used. Changed documents were reviewed for secret/production-data exposure
and high-confidence credential/private-key/database-URL patterns; none found.
Application CI was inspected rather than rerun for this Workspace-only change.

```text
WORKSPACE_STATE_CONSISTENCY=PASS
SECRET_LEAK_CHECK=PASS
GIT_DIFF_CHECK=PASS
```

```text
PHASE_18_OPERATIONAL_READINESS_RESULT=PASS
BACKEND_DEPLOYMENT_PLAN=READY
FRONTEND_DEPLOYMENT_PLAN=READY
BACKEND_ROLLBACK_PLAN=READY
FRONTEND_ROLLBACK_PLAN=READY
RESTORE_RUNBOOK_READY=YES
PRE_DEPLOY_PRODUCTION_BACKUP_REQUIRED=YES
PAYMENT_KILL_SWITCH=READY
PAYOS_CLIENT_ID=UNKNOWN
PAYOS_API_KEY=UNKNOWN
PAYOS_CHECKSUM_KEY=UNKNOWN
PRODUCTION_RELEASE_CHECKLIST=READY
PRODUCTION_RELEASE_GO_NO_GO=NO_GO
REMAINING_ENGINEERING_BLOCKERS=NONE_WITHIN_ACCEPTED_PHASE_18_SCOPE
REMAINING_OPERATIONAL_DOCUMENTATION_BLOCKERS=NONE
PRODUCTION_RELEASE_GATES_REMAIN=YES
PHASE_18_PRODUCTION_PREFLIGHT=PARTIAL
PHASE_18_TASK_SET_COMPLETE=NO
PHASE_18_FINAL_GATE=BLOCKED_BY_PRODUCTION_RELEASE_GATES_AND_HUMAN_AUTHORIZATION
PHASE_18_STATUS=BLOCKED_EXTERNAL
PHASE_18_DONE=NO
PHASE_18_LAUNCH_READY=NO
PHASE_19_DEPENDENCY_SATISFIED=NO
PHASE_19_STARTED=NO
PRODUCTION_DEPLOYED=NO
PRODUCTION_RESTARTED=NO
PRODUCTION_DB_MUTATED=NO
PRODUCTION_MIGRATION_EXECUTED=NO
PRODUCTION_PROVIDER_ACTIVATED=NO
PRODUCTION_SECRET_MUTATION=NO
PAYOS_WEBHOOK_REGISTERED=NO
EXTERNAL_MONITORING_ACTIVATED=NO
REAL_MONEY_ACTIONS=0
NEXT_ACTION=RESTORE_AUTHENTICATED_RENDER_READ_ONLY_CONFIG_ACCESS
```

Remaining release gates: authorized PayOS production configuration validation,
public webhook registration/signed processing, monitoring activation/alert test,
production backup execution, explicit deployment authorization, actual Backend
and Frontend deploy, safe smoke, separately authorized live PayOS verification,
and final Phase 18 reconciliation. No Phase 19 work is authorized or started.

## Read-only PayOS configuration gate observation — 2026-10-05

Read-only validation is authorized and attempted; earlier requests to obtain
that authorization are historical. [Sanitized configuration evidence](PHASE-18-PAYOS-PRODUCTION-CONFIG-VALIDATION-2026-10-05.md)
records source contracts and two safe public GETs. Health returned 200 with
`environment=development`; public payment capability is disabled. Render is
signed out, so production secret presence, flags, service identity and deployed
SHA remain UNKNOWN. No missing secret or production-mode readiness is inferred.
Operational runbooks remain READY; the config execution gate remains unverified.

```text
PHASE_18_PAYOS_PRODUCTION_CONFIG_VALIDATION=PARTIAL
PAYOS_PRODUCTION_CONFIG_STATE=CONFIG_UNVERIFIED
PAYOS_PRODUCTION_CONFIG_READINESS=BLOCKED_UNVERIFIED_CONFIG
PAYOS_CLIENT_ID=UNKNOWN
PAYOS_API_KEY=UNKNOWN
PAYOS_CHECKSUM_KEY=UNKNOWN
PRODUCTION_PAYMENT_CAPABILITY=DISABLED
PRODUCTION_BACKEND_DEPLOYED_SHA=UNKNOWN
PRODUCTION_BACKEND_REVISION_CURRENT=UNKNOWN
PAYOS_LIVE_API_CALLS=0
REAL_MONEY_ACTIONS=0
PHASE_18_DONE=NO
PHASE_18_LAUNCH_READY=NO
PHASE_19_DEPENDENCY_SATISFIED=NO
PHASE_19_STARTED=NO
NEXT_ACTION=HUMAN_AUTHORIZE_PRODUCTION_ENV_CONFIGURATION_REMEDIATION
```

## Authenticated Render validation — current authoritative observation (2026-10-05)

Earlier signed-out/UNKNOWN Render snapshots and next actions are historical.
[Authenticated read-only evidence](PHASE-18-RENDER-PRODUCTION-CONFIG-VALIDATION-2026-10-05.md) matches service repository and
hostname and confirms current main is live. An already running dashboard-triggered
manual deployment was observed; the agent did not initiate or alter it.
Runbooks remain READY. Production-mode configuration is blocked: development
NODE_ENV and TEST/UAT-only email/storage literals require coordinated remediation,
not a NODE_ENV-only change. All three PayOS secret rows and PAYOS_API_URL are absent
from inspected service metadata. Production authorization/acceptance gates remain.

```text
PHASE_18_RENDER_READ_ONLY_VALIDATION=PASS
RENDER_AUTHENTICATED_ACCESS=YES
RENDER_SERVICE_IDENTIFIED=YES
BACKEND_DEPLOY_SOURCE=GITHUB_INTEGRATION
BACKEND_DEPLOY_BRANCH=main
NODE_ENV_CURRENT=development
PRODUCTION_ENVIRONMENT_BLOCKER=YES
PAYMENT_PROVIDER_CURRENT=MISSING
PAYMENT_QR_ENABLED_CURRENT=false
PAYOS_API_URL_CURRENT=MISSING
PAYOS_CLIENT_ID=MISSING
PAYOS_API_KEY=MISSING
PAYOS_CHECKSUM_KEY=MISSING
PAYOS_PRODUCTION_CONFIG_STATE=CONFIG_NOT_STAGED
PAYOS_PRODUCTION_CONFIG_READINESS=BLOCKED_MISSING_CONFIG
EMAIL_PROVIDER_CURRENT=resend
STORAGE_PROVIDER_CURRENT=r2
EMAIL_PRODUCTION_CONFIG_COMPATIBLE=NO
STORAGE_PRODUCTION_CONFIG_COMPATIBLE=NO
CURRENT_PRODUCTION_CONFIG_VALID_FOR_CURRENT_MAIN=NO
PRODUCTION_DEPLOY_CONFIGURATION_GATE=BLOCKED
PRODUCTION_BACKEND_DEPLOYED_SHA=9e15f8c6ff0ae24e05a928079cc3a643d58bfa08
PRODUCTION_BACKEND_REVISION_CURRENT=YES
PAYOS_LIVE_API_CALLS=0
REAL_MONEY_ACTIONS=0
PHASE_18_DONE=NO
PHASE_18_LAUNCH_READY=NO
PHASE_19_DEPENDENCY_SATISFIED=NO
PHASE_19_STARTED=NO
NEXT_ACTION=HUMAN_AUTHORIZE_PRODUCTION_ENV_CONFIGURATION_REMEDIATION
```
