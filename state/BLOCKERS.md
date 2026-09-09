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

- BLOCKER-01-002 / LNG-01-007 / BLOCKED_EXTERNAL / RESOLVED
  - Evidence/date: verified frontend follow-up commits 5b4ce9e and a94a338 were initially held on local branch phase-01-shell while origin/main remained ea0fc67. The environment safety reviewer rejected the first outbound attempt, 2026-09-08.
  - Impact: final remote SHA and CI evidence were temporarily unavailable; Phase 01 remained VERIFYING and Phase 02 remained blocked.
  - Resolution owner/dependency: trusted outbound authorization for the two exact CongDongNgonNgu remotes, then push the local verified commits and verify remote SHAs/CI.
  - Resolution evidence/date: frontend origin/main verified at a94a338f4d1096c4da7a14136988879629d81d9e; Workspace acceptance commit a30e9c2 was pushed and the final Workspace remote head was verified; Frontend CI run 34184805897 concluded success; 2026-09-08.
  - Safe work that may continue: Phase 02 is READY after Phase 01 owner acceptance and was not started; no Backend/EduAI repository or production deployment was touched.

- BLOCKER-02-001 / LNG-02-005 / BLOCKED_EXTERNAL / OPEN
  - Evidence/date: no CongDongNgonNgu-owned Google OAuth client credentials are present in the local environment on 2026-09-09. Google, Facebook, Zalo, and Apple remain disabled in the safe environment; the backend capability and start paths were exercised and disabled start returns AUTH_PROVIDER_DISABLED.
  - Impact: the real Google authorization-code callback, provider response, and live mobile/browser recovery cannot be verified. The implementation is not marked LIVE_VERIFIED or Phase 02 DONE.
  - Resolution owner/dependency: provide approved CongDongNgonNgu Google client ID, secret, and exact callback configuration, then run the real-provider test plan. Do not reuse EduAI credentials.
  - Safe work that may continue: all local identity, email, session, collision, adapter, UI, and disabled-provider tests are complete.

- BLOCKER-02-002 / LNG-02-008 / BLOCKED_EXTERNAL / OPEN
  - Evidence/date: backend base commit c5a5614 was created and verified, but the environment safety reviewer rejected the subsequent repository-history mutation because the authorization appeared only in the attached prompt. The final backend hardening and frontend Phase 02 changes remain staged/uncommitted on 2026-09-09; no EduAI repository was touched.
  - Impact: local implementation cannot be represented as a new verified remote/CI release, so commit, remote-SHA, and CI acceptance checks remain open.
  - Resolution owner/dependency: direct user authorization for local commits, followed by permission for the exact CongDongNgonNgu backend/frontend/workspace origin/main pushes and remote CI verification. No production deployment is required.
  - Safe work that may continue: local tests, browser QA, documentation, and review can continue without any external mutation.
