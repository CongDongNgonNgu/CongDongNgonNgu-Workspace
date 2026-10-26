# Bounded shared TEST migration0039 operator plan

2026-10-26. PREPARED_NOT_EXECUTED. This document opens no connection and applies no migration. It is a review candidate for the existing owner-authorized TEST rollout only, after the Backend PR57 merge/main-CI gate succeeds. PR56/PR57 PR CI alone is insufficient. Keep all attachment flags false and the existing deployment unchanged during this operation.

## Fixed scope and preconditions

- Use the explicit absolute Backend repository root `D:\Work\CongDongNgonNgu\CongDongNgonNgu-Back-End`. Verify clean tracked/untracked worktree, branch main, HEAD equals freshly fetched origin/main, and exact reviewed merge revision/tree. Record the successful main-CI run and revision before execution; the operator must verify it through GitHub, never infer it from a local argument or PR status. If the merge revision changes, stop and revalidate this plan.
- Load credentials only from the already approved Backend environment into memory. Never print environment contents, URLs, passwords, access tokens or raw provider/database errors. Use its reviewed pure `scripts/phase30-sql-target.cjs` guard, then explicitly require remote TEST (`local === false`). Accept only the existing approved pooler host and its guard-produced direct Neon host, database neondb with approved TLS. No alternate endpoint, production target or loopback fallback.
- Read migration files from the verified committed revision and normalize CRLF/CR to LF exactly as `database/migrate.cjs`. Require exactly39 forward `.sql` migrations, excluding `.down.sql`, and the sole proposed file `0039_phase30_attachments.sql` with SHA256 `6c8540daa6255089d3706e8c6893795efe1d8f7dce2273eca432c71ea6c19b9c`. Compare committed content with the clean checkout; never execute a caller-supplied SQL file.
- The fresh previously executed read-only preflight found PostgreSQL180006, public/neondb,38 recorded migrations through0038, every recorded checksum equal to source, no public attachment tables. These observations must be repeated under the migration lock; they are not an authorization to skip checks.
- Do not run the generic `database/migrate.cjs`: it applies every pending migration and prints raw errors. Do not execute0039.down.sql, DROP/reset, fixture creation, object storage operations or unrelated data mutations. This rollout adds the reviewed attachment schema and three domain uniqueness constraints only.

## One bounded transaction

Create one dedicated `pg` client using the validated direct TEST URL, max1 connection, connection timeout10s and client query timeout45s. Before any DDL, execute the following ordered control statements and checks. Constant SQL is shown for review; this document is not an executable shell command.

```sql
BEGIN;
SET LOCAL search_path = public;
SET LOCAL lock_timeout = '5s';
SET LOCAL statement_timeout = '30s';
SET LOCAL idle_in_transaction_session_timeout = '15s';
SELECT pg_advisory_xact_lock(20260910);
LOCK TABLE public.schema_migrations IN SHARE ROW EXCLUSIVE MODE;
SELECT current_database() AS db, current_schema() AS schema,
       current_setting('server_version_num')::int AS version;
SELECT filename, checksum FROM public.schema_migrations ORDER BY filename;
```

The transaction advisory lock uses the same key/lock namespace as the existing migration runner's session lock and releases on commit/rollback. The5s lock timeout means abort on contention, not wait indefinitely or automatically retry. Require db=neondb, schema=public and version=180006; any observed version change requires fresh review. Require the source/history set comparison to be exact:38 recorded files, every checksum matching its committed source, no unknown history row, exactly one pending file0039. Require all eight planned relation names absent before execution. Never create or repair schema_migrations as a side effect.

Execute only the fixed, checksum-verified0039 SQL as one query, then parameterized `INSERT INTO public.schema_migrations(filename,checksum) VALUES($1,$2)` for that exact filename/checksum. Before COMMIT, verify39 exact history records and execute the startup checks below. Require the eight new tables to be empty except the single initialized processing singleton. COMMIT only after every check passes. On any failure, attempt ROLLBACK, close the client/pool and output only a fixed scrubbed failure code/stage. Do not retry automatically, suppress an error or claim success from an uncertain COMMIT response.

## Independent read-only verification

Close the migration connection, then open a separate validated TEST connection and `BEGIN READ ONLY`. Recheck identity/version and all39 committed migration checksums, not just the inserted row. Require the exact eight new public tables:

`attachments`, `attachment_upload_replay_leases`, `attachment_bindings`, `attachment_objects`, `attachment_cleanup_jobs`, `attachment_quota_counters`, `attachment_processing_lease`, `attachment_initiation_admissions`.

Check each exact table row count: all0 except attachment_processing_lease=1, whose singleton is true and owner/attachment_id/expires_at are null. These are migration-initialization observations, not later application fixture cleanup. Also require the three selected-object FKs to be validated, deferrable and initially immediate; confirm the reviewed triggers/functions and three domain uniqueness constraints exist with their expected definitions.

Run the application's actual startup gate queries without enabling the module:

```sql
SELECT source_object_id,normalized_object_id,thumbnail_object_id,
       upload_slot_held,pending_slot_held FROM public.attachments LIMIT 0;
SELECT singleton FROM public.attachment_processing_lease WHERE singleton;
SELECT attachment_id,owner FROM public.attachment_upload_replay_leases LIMIT 0;
SELECT put_supervision_id,put_abandoned_at FROM public.attachment_objects LIMIT 0;
ROLLBACK;
```

Record only sanitized revision/tree/CI identifiers, normalized migration checksum, identity classification, history count, exact initialization counts and startup-gate outcome. If COMMIT was uncertain, classify the independent observation as APPLIED, NOT_APPLIED or UNKNOWN; never reapply until the observed state is reviewed. If a check fails after a confirmed commit, hold deployment and remediate forward through review; do not use the disposable-schema down migration on shared TEST.

Migration success alone permits neither format activation nor LNG_30_002 DONE. Exact deployment, native packaging/GNU time, resource/transport/provider lifecycle, cross-domain authorization, independent final review and exact-owned fixture cleanup remain separate gates. No production DB/storage/payment/provider activation or Phase31 work is covered.
