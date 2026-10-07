# Phase 22 Acceptance

Prospective acceptance contract.

- Phase 20 `GO` policy is implemented without silent privilege expansion.
- Create/invite/join/leave/remove/transfer/moderate/report lifecycle passes expected positive and negative cases.
- Cross-group access is denied across direct, list, search and projection paths.
- Invitation replay/races and idempotency-sensitive transitions are deterministic.
- Removal/revocation is effective immediately across protected reads/writes.
- Existing author-private content semantics remain unchanged.
- Quotas and pagination prevent unbounded list/discussion operations.
- New vi/en UI uses existing locale foundation and does not change learning-language/session/route semantics.
- Keyboard/a11y and responsive runtime at project-required widths pass.
- Applicable Backend/Frontend full gates and CI pass with observed evidence.

Technical completion does not claim real-user demand, retention or moderation success. Production release/private persistent data use requires the approvals and backup/retention safeguards active at that time.
