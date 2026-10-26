# Raw upload attempt and ingress accounting

2026-10-26 status: integrated disabled-source conditional review approved; source merged via PR55. See REVIEW-002-SOURCE.md and LIFECYCLE-002.md. Main CI146 failed and enabled TEST acceptance remains pending; the candidate status below is the historical design snapshot.

2026-10-24. Source review candidate; enabled runtime acceptance remains pending. Refines enforcement of existing Phase30 TEST abuse ceilings without increasing numeric limits or changing formats/provider/domain access.

Charge initiation idempotently as before. Separately charge each admitted raw-body attempt, including completed-upload replay and later failure, using the exact declared/reserved source byte count as conservative ingress debt. A duplicate body must not obtain free bandwidth merely because its initiation UUID or completed source hash already exists.

Two independent rate actions apply: upload_attempt (actor10/hour, deployment40/hour) and ingress (actor32MiB/day, deployment128MiB/day). They reuse frozen ceilings. They are separate from initiation/source admission counters and from physical retained-byte capacity. Do not refund an attempt or ingress charge after a failed/interrupted/replayed request; use the closed-window48h retention policy. Active upload slots, pending jobs and physical reservations remain independently enforced.

Protocol: fresh authenticated draft/type/length preflight in an ordinary domain transaction; release those locks; commit a separate sorted rate-only transaction; revalidate session and current domain; acquire upload/replay intake slot in a new domain transaction; only then consume the bounded body. Never carry rate locks into later account/domain locks. Invalid headers/types fail before raw-body admission; domain revocation after the charge may deny the operation without refund. No unauthenticated upload or ID/URL bearer authority is introduced.

Required acceptance: concurrent/replayed attempts hit both actor/deployment boundaries; oversized/mismatched declarations remain typed errors; later failure cannot erase the committed rate charge; physical capacity is not charged twice for a completed-body replay; replay slot closes only after actual input closure; retention never purges active windows or capacity debt. Current focused source/SQL results are recorded in EVIDENCE-002.md; final integrated independent review and deployed TEST probes remain open.
