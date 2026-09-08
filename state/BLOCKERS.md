# Blockers

No project blocker was recorded at Workspace initialization.

- BLOCKER-00-001 / LNG-00-003, LNG-00-004 / `BLOCKED_EXTERNAL` / RESOLVED
  - Evidence/date: both independent implementation commits were locally verified on 2026-09-07; the initial push was rejected by the environment safety review.
  - Impact: remote SHA verification, CI checks, and DONE state were temporarily unavailable.
  - Resolution owner/dependency: resolved after explicit user authorization for the exact two destinations.
  - Resolution evidence/date: backend `origin/main` matches `59fddfd8bbdf81f42ce32974b8447d7b6d585773`; frontend `origin/main` matches `1d2f8a53001509da6e9ef2570aa10579ddf52602`; GitHub Actions returned no run for either SHA, 2026-09-07.
  - Safe work that may continue: dependent Phase 00 tasks are now eligible; no EduAI repository was modified or pushed.

## Recording rule
For each real blocker append:
- Blocker ID and affected task/phase.
- `BLOCKED_INTERNAL` or `BLOCKED_EXTERNAL`.
- Observed evidence/error and date.
- Why safe implementation/verification cannot continue.
- Owner/dependency needed to resolve it.
- Independent work that may continue safely.
- Resolution evidence/date when cleared.

Do not classify normal coding work as a blocker. Do not work around missing provider/production credentials by inventing, exposing or reusing EduAI secrets. External-provider live verification may remain blocked while adapter/unit/sandbox work continues if the phase acceptance allows that distinction.
- BLOCKER-01-001 / LNG-01-001 through LNG-01-007 / `BLOCKED_EXTERNAL` / RESOLVED
  - Evidence/date: the configured Stitch MCP server is `https://stitch.googleapis.com/mcp`; `mcp__stitch__create_project` and `mcp__stitch__list_projects` both returned `Auth required`, 2026-09-08. No Stitch project or authenticated project listing was available in the session.
  - Impact: Phase 01 cannot safely begin user-facing design implementation because Workspace policy requires Stitch design and review before each substantial surface. Required Stitch references and accepted design evidence cannot be recorded.
  - Resolution owner/dependency: authenticate the configured Stitch MCP connection in the Codex session, then rerun the project/list check and create the Phase 01 design workspace.
  - Safe work that may continue: none of the Phase 01 frontend design tasks; Phase 00 remains `DONE`, EduAI remains untouched, and no frontend files were modified.
  - Resolution evidence/date: Stitch authentication restored on 2026-09-08; dedicated private project `projects/3718538619973058970` created, design system asset `assets/16442026920550574436` configured/applied, and Header, Mobile Header, Bottom Navigation, Footer, and Core Shell surfaces generated and refined before implementation.

- BLOCKER-01-002 / LNG-01-007 / BLOCKED_EXTERNAL / OPEN
  - Evidence/date: verified frontend follow-up commits 5b4ce9e and a94a338 are on local branch phase-01-shell; origin/main remains ea0fc67. The environment safety reviewer rejected the outbound push as an untrusted remote despite the authorization in the user-provided Phase 01 objective, 2026-09-08.
  - Impact: final frontend remote SHA, Workspace reconciliation push, and any post-follow-up CI verification cannot be completed safely in this session. Phase 01 remains VERIFYING; Phase 02 remains blocked and was not started.
  - Resolution owner/dependency: trusted outbound authorization for the two exact CongDongNgonNgu remotes, then push the local verified branch/commits and verify remote SHAs/CI.
  - Safe work that may continue: Workspace evidence and state can be committed locally; no Backend/EduAI repository or production deployment should be touched.
