# Phase 15A Evidence — Role and Permission Matrix

Status: `PASS_INTEGRATED_REMOTE`

## Delivered

- Backend PR #28 merged to `main` at `8d012fbfefa88317ec7485c2314d7b6ed3251349`.
- `RoleKey` now names `USER`, `CONTRIBUTOR`, `EXPERT`, `MEMBER` (legacy),
  `MODERATOR` and `ADMIN`.
- `src/identity/role-policy.ts` keeps expertise roles separate from platform
  capabilities. Only `ADMIN` receives role-management, audit, billing, AI
  operations and reputation-management capabilities; `MODERATOR` receives
  moderation queue/assignment/content capabilities.
- Role-assignment decisions reject non-admin actors, privileged assignment to
  disabled users, empty role sets and removal of the last active administrator.
- Migration `0024_phase15_role_policy.sql` is additive only. Its down script is
  intentionally a no-op because PostgreSQL enum value removal would require a
  separately reviewed data migration.

## Verification

- Focused tests: 3 suites, 9 tests passed (role policy, migration contract and
  existing role guard).
- Backend typecheck passed.
- `git diff --check` passed.
- GitHub Actions reported no workflow runs/status checks for this repository;
  local verification is the available gate.

## Safety notes

- No production deployment, migration execution, database mutation, provider
  activation or secret action occurred.
- Existing `MEMBER/MODERATOR/ADMIN` persistence remains compatible.
- The additive migration must be reviewed and executed separately before a
  PostgreSQL deployment can store the new enum values.

## Next package

`15B / LNG-15-002 — Moderation Case and Report Workflow`.
