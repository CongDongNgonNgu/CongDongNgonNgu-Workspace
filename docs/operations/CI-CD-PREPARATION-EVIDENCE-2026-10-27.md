# CI/CD preparation evidence — 2026-10-27

PROJECT=CongDongNgonNgu
TASK=PREPARE_CI_CD
STATUS=VERIFYING
PRODUCTION_AUTO_DEPLOY=NOT_ACTIVATED
PRODUCTION_DB_CHANGED=NO
PRODUCTION_ENV_PRESERVED=YES (no VPS mutation; owner-reported file state not independently inspected)
PRODUCTION_MAIN_MERGE=NOT_PERFORMED
RENDER_BRANCH_CHANGE=USER_ACTION_PENDING
VERCEL_BRANCH_CHANGE=USER_ACTION_PENDING

## Fresh source baseline

All three origins were fetched with prune; clean local main equalled fetched origin/main before feature work. No .ai-dos/manifest.json was present in these three checkouts.

| Repository | Verified main before preparation |
| --- | --- |
| Backend | 9f1d6b50dd5d33d312feba0fa23fa4d1e2d46682 |
| Frontend | 8777545f1d42ffe85e37e2ce5f1d7c8ff9030fea |
| Workspace | 8699d9a483a5f9eb4c639ab812f42920d968ab75 |

Remote dev branches were absent and created from these freshly verified application main SHAs. No branch history was rewritten.

## Implementation and validation

Application files changed: .gitattributes; .github/workflows/ci.yml; new .github/workflows/production.yml; scripts/deploy/*.sh, *.cjs and Backend runtime-contract.json. Runtime contract intentionally remains reviewed:false. Neither literal false Production workflow gate was removed.

- Backend local npm ci, typecheck, lint, build: PASS.
- Backend local unit tests: 220 suites, 1558 passed / 7 pre-existing native skips, total 1565. Required Linux native tests remain enforced by existing CI.
- Backend local E2E: 25 suites / 186 tests PASS, explicit localhost-only test database environment.
- Frontend local npm ci, typecheck, lint, build: PASS; 146 suites / 827 tests PASS.
- Frontend explicit Production API artifact check and performance budget: PASS after building with VITE_API_BASE_URL=https://api.congdongngonngu.vn/api/v1.
- Full npm audit: Backend 0 vulnerabilities; Frontend 0 vulnerabilities. Runtime-only moderate audits: 0 vulnerabilities for both. Current Vite/Vitest lockfile versions did not require remediation; no dependency/lockfile changes were made.
- Local deployment pure checks: migration pending/modified/unknown rejection, production health identity, unreviewed/mismatched runtime rejection, Production API artifact validation: PASS.
- New isolated release integration tests run on Linux CI; they do not run on Windows. Fixtures cover successful activation, build failure without activation, failed-health rollback, interrupted symlink activation, and external rollback-target rejection. No fixture contacts VPS or Neon.
- Bash syntax checks: PASS. ShellCheck v0.11.0: PASS. actionlint v1.7.12: PASS. Official tool archives were verified against official release digests/checksums before local execution.
- Independent review identified and fixed Nginx traversal/read permissions, rollback short-circuit behavior, path containment, inherited DATABASE_URL, missing build dependencies, database client cleanup, rollback retry timing and caller concurrency cancellation.
- Initial PR CI found ShellCheck diagnostics; transport was redesigned to send fixed shell programs through stdin and transfer the archive via SCP, with all remote values restricted to fixed paths or validated hashes/digits. Diagnostics were fixed without disabling ShellCheck rules.
- Secret-pattern scan and staged/final diff review: PASS; only secret NAMES appear. No private key, runtime .env or Neon URL was committed.

PRs targeting dev:

- [Backend #59](https://github.com/CongDongNgonNgu/CongDongNgonNgu-Back-End/pull/59)
- [Frontend #58](https://github.com/CongDongNgonNgu/CongDongNgonNgu-Front-End-Web/pull/58)

Both PR runs completed SUCCESS, including ShellCheck, Linux failure-injection tests and all existing application gates. Both PRs are merged into dev; application main remains unchanged.

- [Backend](https://github.com/CongDongNgonNgu/CongDongNgonNgu-Back-End/actions/runs/40443770894)
- [Frontend](https://github.com/CongDongNgonNgu/CongDongNgonNgu-Front-End-Web/actions/runs/40443775391)

## Integration receipts

BACKEND_DEV_SHA=a4df898a5c60305da2a65919e6fd7e34ade56f4e
FRONTEND_DEV_SHA=e5f3b9cabe1246e7fd0e311d5e3c741949a8189b

Frontend dev [post-merge CI](https://github.com/CongDongNgonNgu/CongDongNgonNgu-Front-End-Web/actions/runs/40444036677) SUCCESS. Frontend temporary feature branch deleted remotely and locally after ancestry/integration verification; stale refs pruned.
Backend dev [post-merge CI](https://github.com/CongDongNgonNgu/CongDongNgonNgu-Back-End/actions/runs/40444316470) IN_PROGRESS at this receipt; final result/cleanup will be reconciled before closeout. Reviewed Backend feature tree equals merged dev tree ac6c975327820a32c1a6a203ea2463ee6ad24dea.
Workspace [documentation PR #184](https://github.com/CongDongNgonNgu/CongDongNgonNgu-Workspace/pull/184). Initial documentation CI passed; final revision requires revalidation. Workspace changes are docs/07-DEPLOYMENT.md and the two new docs/operations/SECURE-CI-CD.md and CI-CD-PREPARATION-EVIDENCE-2026-10-27.md files. Workspace is never packaged/deployed to VPS.

## Live configuration checks

Both GitHub Environments were read through API. Four required secret names are present; values were not accessed. Both environment branch policies contain only main. Frontend existing environment display name is Production; workflow uses the case-insensitive production name.
Both repositories' dev/main now require strict/up-to-date quality checks (GitHub Actions app), enforce administrators, require conversation resolution, and prohibit force push/deletion. No prior protected branch settings were weakened; the branches were previously unprotected. Human approving-review count is zero; code review/owner Production approval must still be observed as distinct workflow requirements.

Read-only endpoint snapshot before changes:

- https://api.congdongngonngu.vn/api/v1/health => HTTP 200, success:true, status:ok, service:congdongngonngu-backend, environment:production.
- https://congdongngonngu.vn => HTTP 200.
- https://www.congdongngonngu.vn => HTTP 301 Location:https://congdongngonngu.vn/.

Public health does not prove the deployed source SHA, database migration count or actual PM2 configuration. Those values are not invented.

## External blockers and operational limits

Read-only SSH with BatchMode=yes, StrictHostKeyChecking=yes, cdnn-deploy@103.173.226.189 failed with Permission denied (publickey,password). No successful VPS shell session occurred. Actual PM2 runtime, filesystem permissions, dist layout, Nginx settings, Production .env state and the reported 39 applied migrations remain independently unverified. No unrelated service, PM2 instance, Nginx configuration, database or runtime file was changed by this task.

Targeted action: make the existing authorized deploy SSH identity available locally (SSH agent/config and authorized public key for cdnn-deploy), using trusted pinned known_hosts. Do not paste credentials in chat. Then inspect only sanitized runtime metadata and review runtime-contract.json plus the dist bootstrap plan before future activation.

Remaining operational risks: actual VPS activation/rollback has NOT been tested; baseline dist symlink bootstrap and source-SHA markers are not established/verified; retained releases/assets require disk-capacity review. Existing historical Vercel SEO sitemap/default-origin references are outside this CI/CD change and should be reviewed before launch. TEST deployment/provider/feature-specific pending gates remain separate from source CI success.

See [Secure CI/CD runbook](SECURE-CI-CD.md) for manual Render/Vercel branch changes and the full Production activation checklist. STOP at TEST checkpoint; no first VPS deployment or application main merge is authorized here.
