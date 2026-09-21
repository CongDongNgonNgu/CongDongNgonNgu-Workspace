# Phase 07D — Safety and matching reconciliation evidence

Status: VERIFYING

Scope is limited to `LNG-07-006 Block, Report & Contact Permission` and `LNG-07-007 Matching / Safety Reconciliation`. No chat, messaging, notifications, rooms, contact-data delivery, later-phase work, deployment, or production action was performed.

## Branches and baselines

- Backend: `phase-07d-safety-reconciliation`, baseline `a71cf48ea34e4aac6a9d751c2034b3fbc6254248`
- Frontend: `phase-07d-safety-reconciliation`, baseline `b44e6e875cca5b0597363cfe3283c67067fab899`
- Workspace: `phase-07d-safety-reconciliation`, baseline `4bd3bfdd8be29e64bf06cd9a42ed50222ccdd9a9`
- Backend implementation commit: `742bf658290583fba3d9d2b5989d8ae491ddb32e`
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

## Migration boundary

`MIGRATION_REQUIRED=YES`

- File: `CongDongNgonNgu-Back-End/database/migrations/0008_language_exchange_safety.sql`
- Down file: `CongDongNgonNgu-Back-End/database/migrations/0008_language_exchange_safety.down.sql`
- Static migration contract checks pass.
- `TEST_DB_MUTATED=NO`; migration 0008 was not applied.

## Stitch references

- Project: `projects/3718538619973058970`
- Design system: `assets/16442026920550574436`
- Desktop safety/profile: `3ee2e0e074dd4063a98b713307c069f9`
- Desktop report dialog: `c5063b23a22f4487a8a2b3f9829c3cd4`
- Mobile safety/report: `62b786973da84b96a057b77c604058cc`
- Mobile blocked/unavailable: `ef622a5d2f1949da925c563f64382daf`

## Verification

- Backend typecheck: PASS
- Backend unit suite: PASS — 28 suites, 124 tests
- Backend e2e suite: PASS — 10 suites, 45 tests
- Backend production build: PASS
- Frontend typecheck: PASS
- Frontend test suite: PASS — 37 files, 172 tests
- Frontend production build: PASS
- Backend/frontend high-severity audit: PASS — 0 vulnerabilities reported
- `git diff --check`: PASS in all three repositories; only expected LF/CRLF warnings were emitted.
- Local browser smoke: PASS for frontend route protection and new backend route registration. Authenticated safety states were verified through the focused page tests and remain subject to owner visual review at the Stitch 1440px/390px references.

## Gate state

- `LNG_07_006=VERIFYING`
- `LNG_07_007=VERIFYING`
- `PHASE_07=IN_PROGRESS`
- `OWNER_VISUAL_ACCEPTANCE=PENDING`
- `DEPLOYED=NO`
- `MAIN_PUBLISHED=NO`

Required next action: owner review of the desktop/mobile safety profile, report dialog, and blocked/unavailable state. Do not publish to main, apply migration 0008, or deploy until that review is explicitly accepted.
