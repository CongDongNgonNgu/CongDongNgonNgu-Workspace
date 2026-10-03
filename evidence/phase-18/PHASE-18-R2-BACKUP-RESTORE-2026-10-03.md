# Phase 18 Cloudflare R2 Backup and Restore Drill

**Date:** 2026-10-03
**Scope:** approved TEST/UAT PostgreSQL only; Cloudflare R2 private backup
namespace; isolated disposable restore target
**Classification:** sanitized evidence; no credential, raw `DATABASE_URL`,
presigned URL, provider token, production data or production endpoint is
recorded

This record is the current authoritative result for the R2 backup/restore
sub-gate. Earlier evidence that recorded R2 backup/restore as unavailable is
historical and is intentionally preserved.

## Safety and target classification

```text
DATABASE_CLASSIFICATION=APPROVED_TEST_UAT
PRODUCTION_DATABASE=NO
NODE_ENV=development
PRODUCTION_DEPLOYED=NO
PRODUCTION_RESTARTED=NO
PRODUCTION_DB_MUTATED=NO
PRODUCTION_MIGRATION_EXECUTED=NO
PRODUCTION_PROVIDER_ACTIVATED=NO
PRODUCTION_SECRET_MUTATION=NO
REAL_MONEY_ACTIONS=0
PHASE_19_STARTED=NO
```

The approved UAT target fingerprint matched before `pg_dump`. The active UAT
database was read for the dump only; restore validation used a separate local
disposable PostgreSQL target and never overwrote the active UAT database.

## Storage configuration boundary

```text
STORAGE_PROVIDER=r2
STORAGE_CONFIG=VALID
STORAGE_API_URL=PRESENT_HTTPS_R2_ENDPOINT
STORAGE_ACCESS_KEY_ID=PRESENT
STORAGE_SECRET_ACCESS_KEY=PRESENT
STORAGE_BUCKET=congdongngonngu
STORAGE_TOKEN_VALUE_USED_BY_SOURCE=NO
STORAGE_TOKEN_VALUE_PURPOSE=UNUSED_BY_CURRENT_BACKEND
R2_CONFIGURATION_BOUNDARY=PASS
BACKUP_SECRET_BOUNDARY=PASS
BACKUP_PRIVACY_BOUNDARY=PASS
SECRET_LEAK_CHECK=PASS
```

The Backend source uses the endpoint, access key, secret key and bucket
configuration for the S3-compatible client. `STORAGE_TOKEN_VALUE` is not used
by the current Backend source and was not deleted or rotated. The utility
fails closed for production, non-R2 providers, missing required fields,
non-HTTPS endpoints, and endpoints containing embedded credentials or query
secrets.

## R2 connectivity drill

A unique non-sensitive object under `phase18-verification/<random-id>/` was
used and then removed. The authenticated operations and checksum comparison
all passed. The anonymous endpoint probe returned HTTP 400; because that is
not an authoritative public/private response, public access is recorded
conservatively rather than overstated.

```text
R2_CONNECTIVITY=PASS
R2_PUT=PASS
R2_HEAD=PASS
R2_GET=PASS
R2_CHECKSUM=PASS
R2_DELETE=PASS
BACKUP_PUBLIC_ACCESS=UNKNOWN
BACKUP_PUBLIC_ACCESS_DETAIL=NOT_PROVEN_PUBLIC_AND_APPLICATION_EXPOSES_NO_PUBLIC_PATH
```

No public bucket, public custom domain, presigned URL or unauthenticated
application download path was enabled or created.

## UAT database backup and R2 artifact

The backup used PostgreSQL custom format and the portable PostgreSQL 18.6
client tools. The connection used encrypted TLS with `sslmode=require`; the
exact approved UAT target fingerprint and host allowlist remained enforced.

```text
PG_DUMP_FORMAT=CUSTOM
PG_DUMP_VERSION=18.6
PG_DUMP_SSLMODE=require
UAT_BACKUP_CREATE=PASS
UAT_BACKUP_UPLOAD=PASS
UAT_BACKUP_DOWNLOAD=PASS
UAT_BACKUP_INTEGRITY=PASS
```

Retained private artifact:

```text
BACKUP_OBJECT=backups/uat/database/2026/10/03/congdongngonngu-uat-20261003T083329Z-c97c6910e259f584.dump
BACKUP_METADATA_OBJECT=backups/uat/database/2026/10/03/congdongngonngu-uat-20261003T083329Z-c97c6910e259f584.sha256.json
BACKUP_BYTES=467439
LOCAL_BACKUP_SHA256=317abab21730e3a112980016b267f12b67e63983e088d32188e4c9f34a965737
DOWNLOADED_BACKUP_SHA256=317abab21730e3a112980016b267f12b67e63983e088d32188e4c9f34a965737
```

The local dump, downloaded copy, integrity files and disposable restore
target were removed after validation. The verified backup and its small
integrity metadata remain in the private UAT backup namespace. The previous
duplicate verification artifact was removed without touching unrelated bucket
objects.

## Isolated restore drill

```text
RESTORE_TARGET_CLASSIFICATION=DISPOSABLE_TEST
RESTORE_TARGET=LOCAL_POSTGRESQL_18.6_UTF8
RESTORE_COMMAND=PASS
RESTORE_SCHEMA_VALIDATION=PASS
RESTORE_MIGRATION_VALIDATION=PASS
RESTORE_DATA_VALIDATION=PASS
UAT_BACKUP_RESTORE=PASS
DISPOSABLE_RESTORE_CLEANUP=PASS
LOCAL_BACKUP_TEMP_CLEANUP=PASS
```

Read-only post-restore checks confirmed:

- expected schema and `schema_migrations` exist;
- 26 migration rows and their expected checksum state are present;
- representative core tables restore successfully;
- all 9 guarded UAT persona records are present;
- the active Phase 18 Challenge fixture is present;
- representative row-count checks show no gross restore corruption.

The restored database used UTF-8 initialization to match the source database.
No restore command was pointed at the active UAT database.

## Automated verification

The guarded Backend utility has fake/mocked boundary coverage; live R2 calls
are not part of normal CI.

```text
R2_FOCUSED_TESTS=5/5_PASS
BACKEND_UNIT=149_suites_843_tests_PASS
BACKEND_E2E=17_suites_73_tests_PASS
TYPECHECK=PASS
LINT=PASS
BUILD=PASS
AUDIT_HIGH=0_VULNERABILITIES
GIT_DIFF_CHECK=PASS
```

The implementation is in Backend commit
`d93539c0a7fa67aa5018dcf2bffc5984679585ef` on the scoped
`phase-18-r2-backup-restore` branch. It exposes no public HTTP backup route.

## Retention and current Phase 18 disposition

The data-lifecycle policy does not advertise an automatic retention or purge
worker. This UAT artifact is a short-lived, manually generated release
verification backup; production retention/lifecycle automation remains a
separate operational control and was not created here.

```text
R2_STORAGE=VERIFIED
BACKUP_TARGET_BLOCKER=RESOLVED
LNG_18_006_BACKUP_RESTORE_SUBGATE=PASS
EXTERNAL_MONITORING=UNRESOLVED
PHASE_18_STATUS=BLOCKED_EXTERNAL
PHASE_18_DONE=NO
PHASE_18_LAUNCH_READY=NO
PHASE_19_STARTED=NO
```

The R2 backup/restore verification blocker is removed from the active list.
This drill does not claim the entire production migration/application
rollback/redeploy gate, external monitoring gate, payment strategy or
production hard-stop is complete.

Remaining active Phase 18 blockers are:

- PayOS/payment strategy and required provider release evidence;
- external monitoring and production release-gate disposition;
- production hard-stop human authorization.
