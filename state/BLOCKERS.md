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

- BLOCKER-02-002 / LNG-02-008 / BLOCKED_EXTERNAL / RESOLVED
  - Evidence/date: direct user authorization was received; Phase 02 commits were created and pushed to the exact CongDongNgonNgu Backend, Frontend-Web, and Workspace origin/main destinations on 2026-09-09.
  - Impact: commit and remote-SHA gates were open until publication; CI was not independently verified in this session.
  - Resolution evidence/date: Backend `25ad79cfa5740271fd925dfc4140a3d828ee98cc`, Frontend `b333707c2ca8a55a80dea945450dd0b3a6b69e9d`, and Workspace `5e35273ede61981fbeafeb3b29c94513d89cdf8f` each match origin/main, 2026-09-09.
  - Safe work that may continue: Google live-provider verification remains covered by BLOCKER-02-001; no EduAI repository or production database was touched.

- BLOCKER-05D-001 / LNG-05-007 / BLOCKED_INTERNAL / OPEN
  - Evidence/date: Community rate limiting is implemented as a process-local in-memory map; no approved shared limiter or Redis foundation is configured, 2026-09-15.
  - Impact: the current single-process TEST runtime has deterministic per-actor/per-operation limits, but the control is not distributed across horizontally scaled Backend instances.
  - Resolution owner/dependency: future production deployment work must confirm a single-instance model or provide an approved shared limiter before horizontal scaling.
  - Safe work that may continue: Phase 05 is closed for the verified current scope; do not represent the current limiter as distributed protection.

- BLOCKER-06C-001 / LNG-06-003, LNG-06-004, LNG-06-007 / BLOCKED_EXTERNAL / RESOLVED
  - Historical opening evidence/date: the exact local Backend and Frontend branches started successfully on 2026-09-16. Browser registration initially reached the supported email-verification screen before the same-process memory-provider harness was used.
  - Historical impact: authenticated browser creation, Helpful, acceptance, responsive populated captures, and visual review were unverified at blocker opening. Existing public TEST parent/detail and structured-response list reads remained verified.
  - Historical resolution owner/dependency: use an existing verified disposable TEST session or a supported verification link/inbox without bypassing email verification, intercepting tokens, reusing production credentials, or disabling auth.
  - Historical safe work that may continue: local 06C implementation, unit/e2e/type/build/audit gates, public read-route checks, and evidence preparation. Phase 06 remains IN_PROGRESS and 06C/06D must not be marked DONE/started.
  - Resolution evidence/date: the real non-production MemoryEmailProvider was resolved from the same Nest application process as the local HTTP server; USER_A/B/C completed real register, verify-email, login, and /auth/me flows on Neon TEST, 2026-09-16.
  - Authenticated runtime evidence: correction/question creation, structured responses, Helpful, expected self-vote/non-requester rejection, acceptance change/revoke, responsive checks, accessibility checks, and populated screenshot comparisons are recorded in phases/PHASE-06-CORRECTIONS-QA/evidence/PHASE-06C-IMPLEMENTATION.md.
  - Scope note: OWNER_VISUAL_ACCEPTANCE_06C=YES; LNG-06-003 and LNG-06-004 are DONE; Phase 06D remains not started.
