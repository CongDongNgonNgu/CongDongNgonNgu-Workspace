# Phase22 execution plan

Owner authorized entire lifecycle; dependency order is001 ->002 ->003 ->004, no routine permission between tasks. [Frozen contract](POLICY-CONTRACT.md) is implementation source; Phase20 policy history untouched.

1. Contract gate: source/auth/persistence/UI audits, exact remote preflight, independent design review; Workspace reviewed contract/state PR with quality CI and cleanup.
2. Backend foundation: additive0027 up/down and typed service boundary; first failing migration/owner/creation tests, then PostgreSQL implementation; typecheck/build/focused checkpoints, atomic commit.
3. Backend invitations/membership: real SQL acceptance/replay/races, leave/remove/roles/transfer/archive and failed-transaction rollback; fresh ACL and quota/rate tests; focused checkpoint/commit.
4. Backend text/moderation/HTTP: separate texts/reports and no-store/CSRF/validation/cross-group serialization tests; full unit/e2e/type/lint/build/audit, PostgreSQL CI and independent security review; normal PR integration/cleanup.
5. Frontend contract/Stitch: approved native list/create/detail/invite/member/text/moderation components; typed vi/en catalog, protected API, stale-state clearing; focused tests then full gates and seven-width browser/a11y checks; review/PR/CI/cleanup.
6. TEST integration: guarded migration on exact approved TEST identity, synthetic fixtures only; verify Render/Vercel exact source revisions (existing Render autoDeploy OFF, never assume a merge deploys); HTTP/browser lifecycle and private-content/payment regression, cleanup proof.
7. Closeout: truthful acceptance/evidence/README/TASKS/PROJECT-STATE/DEPENDENCY-GRAPH/HANDOFF/VERDICT and post-merge CI; delete merged temporary branches and sync all mains. STOP at Phase22 boundary, never start23/24.

Risks: owner FK/transfer must be proved in actual SQL; every affected account lock precedes group lock; failures count towards rate quota independently; no group projections in existing notification/cache infrastructure; no global-block policy exists, real rollout remains gated. No production migrations/data/provider/payment actions.
