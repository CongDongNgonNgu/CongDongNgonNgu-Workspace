# Blockers

No project blocker is recorded at Workspace initialization.

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
