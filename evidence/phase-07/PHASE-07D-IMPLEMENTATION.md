# Phase 07D — Safety and matching reconciliation evidence

Status: DONE

Scope is limited to `LNG-07-006 Block, Report & Contact Permission` and `LNG-07-007 Matching / Safety Reconciliation`. No chat, messaging, notifications, rooms, contact-data delivery, later-phase work, deployment, or production action was performed.

## Branches and baselines

- Backend: `phase-07d-safety-reconciliation`, baseline `a71cf48ea34e4aac6a9d751c2034b3fbc6254248`
- Frontend: `phase-07d-safety-reconciliation`, baseline `b44e6e875cca5b0597363cfe3283c67067fab899`
- Workspace: `phase-07d-safety-reconciliation`, baseline `4bd3bfdd8be29e64bf06cd9a42ed50222ccdd9a9`
- Backend implementation commit: `742bf658290583fba3d9d2b5989d8ae491ddb32e`; remediation commit: `7e6633e3d520cd0d89740bf34bdfda766086dfe7`; final schema/query fix commit: `9dd97c96c99cb124bc1eab183652af6a1bd90bb5`
- Frontend implementation commit: `3b8d5adecae6735d7b41c055a99e0040d8f36d35`

## Implemented contracts

- Directional blocks are stored server-side, but discovery, profile preview, relationship reads/mutations, and contact permission treat either direction as a pairwise block.
- Block is idempotent, removes pending/connected relationship state, prevents future requests, and only the actor who created the block can unblock.
- Unblock never restores a previous request or connection.
- Reports accept only the bounded typed categories `SPAM`, `HARASSMENT`, `INAPPROPRIATE_CONTENT`, `IMPERSONATION`, `SAFETY_CONCERN`, and `OTHER`, with normalized context capped at 1,000 Unicode code points.
- Reports are moderation-ready and target-private. Duplicate `(reporter, target, category)` submissions are idempotent; different categories remain distinct.
- Contact permission is contract-only: `ALLOWED`, `DENIED_NOT_CONNECTED`, `DENIED_BLOCKED`, `DENIED_PERMISSION`, or `DENIED_INELIGIBLE`. No contact identifier or messaging surface is returned.
- Actor identity is derived from the authenticated session; CSRF is required for block, unblock, and report writes.
- Postgres block/removal and relationship mutations use the same canonical pair advisory transaction lock. The in-memory implementation serializes operations deterministically.

The final external review fix aligns Postgres safety-removal `DELETE ... RETURNING` and metadata mapping with migration 0007's canonical `requester_id` column. The focused regression asserts the physical SQL does not use `requester_user_id`, and a static migration contract test guards the published 0007 schema. Migration 0007 and migration 0008 were not changed.

## External review remediation

- Postgres block now uses `DELETE ... RETURNING` in the existing block transaction and returns removed connection metadata. The service emits exactly one `exchange.connection.safety_removed` event from atomic metadata and does not issue a second Postgres relationship delete.
- Memory mode keeps deferred relationship removal and emits the same safety-removal event when a relationship existed; duplicate blocks with no new removal emit no event.
- Report dedupe is now active-state bounded by a partial unique index for `OPEN`/`IN_REVIEW`. The Postgres conflict target uses the same predicate, allowing a new report after `RESOLVED` or `DISMISSED` while keeping different categories independent.
- Contact permission uses a dedicated active/verified, opted-in, valid-exchange participation check and no longer requires `discoverable=true`. Discovery and profile-preview eligibility still require discoverability.
- Blocking requires an active actor and an existing target, but the target may be disabled; stale relationships are still removed and later contact permission is denied.
- `database/migrations/0001`–`0007` were not changed. Migration 0008 was applied only to the authorized Neon TEST database; production remains untouched.

## Migration boundary

`MIGRATION_REQUIRED=YES`

`MIGRATION_0008_APPLIED=YES`

`MIGRATION_SECOND_RUN=PASS`

`MIGRATIONS_0001_0007=UNCHANGED`

- File: `CongDongNgonNgu-Back-End/database/migrations/0008_language_exchange_safety.sql`
- Down file: `CongDongNgonNgu-Back-End/database/migrations/0008_language_exchange_safety.down.sql`
- Static migration contract checks pass.
- `TEST_DB_MUTATED=YES`; only the authorized Neon TEST migration runner applied migration 0008. Production was not accessed or mutated.

## Neon TEST migration and runtime verification

- `DATABASE_SAFE_METADATA=neondb / public / ep-crimson-grass-azmsfir8-pooler.c-3.ap-southeast-1.aws.neon.tech / sslmode=verify-full`; configuration source `.env`; credentials omitted.
- Preflight read-only status showed migrations 0001-0007 recorded with matching checksums. The existing runner applied only `0008_language_exchange_safety.sql`; the immediate rerun skipped 0001-0008 and reported the database up to date.
- Read-only catalog verification passed for the block table, block columns, primary/FK/self-block/directional-unique constraints, blocked-user lookup index, report table and columns, both enums, active-only report unique index, target/state index, and reporter index.
- Real Postgres Neon TEST verification passed for request-vs-block, accept-vs-block, reciprocal requests-vs-block, connected-then-block, duplicate block, inactive-target block, and unblock-vs-request. No raw unique/FK error escaped; final blocked-pair connection rows were `0`.
- Real report verification passed for OPEN and IN_REVIEW dedupe, new reports after RESOLVED and DISMISSED, independent categories, and privacy-safe responses.
- Real privacy/contact verification passed for discovery/profile/relationship block privacy, actor-owned block status, target-private reports, connected contact permission with viewer and target `discoverable=false`, and denial for `NO_CONTACT`/blocked pairs.
- Disposable TEST users and their scoped reports, blocks, and relationships were cleaned up successfully.

## Stitch references

- Project: `projects/3718538619973058970`
- Design system: `assets/16442026920550574436`
- Desktop safety/profile: `3ee2e0e074dd4063a98b713307c069f9`
- Desktop report dialog: `c5063b23a22f4487a8a2b3f9829c3cd4`
- Mobile safety/report: `62b786973da84b96a057b77c604058cc`
- Mobile blocked/unavailable: `ef622a5d2f1949da925c563f64382daf`

## Verification

- Backend typecheck: PASS
- Backend focused safety suite (post-migration): PASS — 3 suites, 13 tests
- Backend focused connection/matching suite (post-migration): PASS — 3 suites, 8 tests
- Backend lint: PASS
- Backend focused remediation suite: PASS — 5 suites, 19 tests
- Backend unit suite: PASS — 28 suites, 130 tests
- Backend e2e suite: PASS — 10 suites, 45 tests
- Backend production build: PASS
- Frontend typecheck: PASS
- Frontend test suite: PASS — 37 files, 172 tests
- Frontend production build: PASS
- Backend/frontend high-severity audit: PASS — 0 vulnerabilities reported
- `git diff --check`: PASS in all three repositories; only expected LF/CRLF warnings were emitted.
- Local browser smoke: PASS for frontend route protection and new backend route registration. Authenticated safety states were verified through the focused page tests and remain subject to owner visual review at the Stitch 1440px/390px references.
- Frontend was not rerun because no frontend code changed in this remediation.
- Real PostgreSQL race, report lifecycle, privacy, and contact verification: PASS against the authorized Neon TEST database; disposable data cleanup passed.

## Final Phase 07D / Phase 07 closure publication

- Owner visual acceptance was explicitly granted: `OWNER_VISUAL_ACCEPTANCE_07D=YES`.
- Backend `main` was fast-forwarded to `9dd97c96c99cb124bc1eab183652af6a1bd90bb5`; GitHub Actions CI run `35558039931` completed `SUCCESS` for that exact SHA.
- Frontend `main` was fast-forwarded to `3b8d5adecae6735d7b41c055a99e0040d8f36d35`; GitHub Actions CI run `35558038683` completed `SUCCESS` for that exact SHA.
- Workspace closure evidence is published through the accepted Phase 07D review history; the final Workspace `main` SHA is reported with the publication result.
- Migration 0008 Neon TEST application and the immediate second-run up-to-date check both passed; migrations 0001-0007 remained unchanged.
- Request-vs-block, accept-vs-block, reciprocal-request-vs-block, connected-then-block, duplicate block, inactive-target block, and unblock-vs-request all passed against real Neon TEST Postgres.
- Active-only report dedupe, post-RESOLVED/DISMISSED report creation, privacy/contact reconciliation, disposable TEST cleanup, and production-untouched verification all passed.
- Stitch references, responsive coverage, accessibility evidence, and owner visual acceptance remain recorded above.

## Gate state

- `LNG_07_006=DONE`
- `LNG_07_007=DONE`
- `PHASE_07=DONE`
- `PHASE_07D=DONE`
- `OWNER_VISUAL_ACCEPTANCE_07D=YES`
- `MIGRATION_0008_APPLIED=YES`
- `TEST_DB_MUTATED=YES`
- `PRODUCTION_DB_MUTATED=NO`
- `DEPLOYED=NO`
- `MAIN_PUBLISHED=YES`
- `CURRENT_PHASE=07`
- `NEXT_PHASE=08`
