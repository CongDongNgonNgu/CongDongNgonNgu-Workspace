# Blockers

No project blocker was recorded at Workspace initialization.

- BLOCKER-00-001 / LNG-00-003, LNG-00-004 / `BLOCKED_EXTERNAL` / OPEN
  - Evidence/date: both independent implementation commits are locally verified on 2026-09-07, but `git push` to the two designated GitHub remotes was rejected by the environment safety review because destination ownership/trust was not independently verified.
  - Impact: remote SHA verification, CI checks, and DONE state cannot be honestly recorded for either bootstrap task.
  - Resolution owner/dependency: explicit authorization for the exact two destinations, followed by push and remote SHA verification.
  - Safe work that may continue: Workspace evidence maintenance; dependent Phase 00 tasks remain not eligible until both bootstrap tasks are DONE.

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
