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

## Observed outcome

All prospective technical TEST criteria above PASS within the bounded contract. Real PostgreSQL25 tests prove concurrency/constraints; Phase20/private47 regression tests pass. Native local116 and exact deployed Vercel117 checks pass, vi/en at320/375/390/412/768/1024/1440; keyboard/focus/labels/headings and dialog regression pass. Numeric colour contrast and screen-reader checks were not performed. No group search/notification/cache/projection integration was introduced: those absent surfaces are NOT_APPLICABLE, not tested PASS. List/count/cross-group leakage checks PASS. Guarded synthetic cleanup residual0. See [EVIDENCE.md](EVIDENCE.md) for exact commits, CI and failure recovery. Real private persistent user data and broad release remain held under [HANDOFF.md](HANDOFF.md).
