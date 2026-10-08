# Phase 23 Frontend and integrated source review

Review observed 2026-10-08 (Asia/Saigon). Frontend PR29 candidate `019b28cb20c2fe18c82bef7d564334e1bda53050`; Backend accepted main `a2640cd7d734f088987fb32b89efc5cbf40e954e`.

Independent code/security/architecture review: **APPROVE**, no outstanding source or test findings. Root also inspected the final diff and meaningful regression coverage. Actual browser, exact-main CI/deployment and retained TEST fixture cleanup are independently observed in [Frontend evidence](FRONTEND-EVIDENCE.md); their acceptance is not inferred from source review.

## Findings resolved

- The introduced canonical-ID equality check hid valid uppercase UUID detail routes. Case normalization and an uppercase-route regression preserve existing UUID routing.
- As an authorized integration improvement, parent detail now clears canonical text/citations before manual or focus/visibility revalidation. The keyed related component exposes no DOM or related request while anchor eligibility is pending/failed, retains same-anchor filters, resets on a new anchor and rejects late responses. This extends current-read behavior; the prior parent behavior was not presented as a frozen-contract violation.
- Corrected the final late-response regression's Next-button accessible label, then reran its complete 20-test page file. No runtime code changed in that follow-up commit.

## Reviewed boundaries

Related pages replace previous cards and clear before refresh/filter/anchor/page reads. Request generation, owner and enabled guards discard obsolete/unmounted responses. Opaque cursors are transported unchanged; consumed-cursor protection prevents non-progress loops. An empty page with continuation remains navigable. No persistent related-resource cache or accumulated earlier pages.

Four labeled native filters, fixed five vi/en relation labels and the existing h1 → h2 section → h3 item → h4 source hierarchy preserve the current Library design. Canonical public-resource content/provenance/licenses are reused; React renders text and external source/license links accept HTTP(S). No assertion evidence, reviewer identity or other internal relation metadata appears.

Independent integrated review traced Backend service, authenticated encrypted cursor, bounded repository selection, canonical projection/capacity and current-read/security tests. A relation grants no resource eligibility: anchors and targets independently require PUBLIC/ACTIVE/VERIFIED, canonical provenance, all active redistribution licenses and applicable coherent Phase06 health. Current authority, assertion revision and endpoint snapshots are rechecked at final projection. One hop, stable deduplication, at most64 materialized candidate identities, boolean continuation, default3/max12 results and the related-only32-source whole-resource omission bound remain intact. Deletion cascades and generic404 prevent protected detail fallback.

Local full regression:97 files/429 tests PASS; focused Library coverage and final20-test correction PASS. Typecheck/lint/build/performance budget PASS; audit0 vulnerabilities; diff check PASS. An initial new regression fixture omitted required nullable fields; those test fields were fixed and affected gates rerun successfully. A stale-dist performance invocation is excluded from acceptance; the final fresh build measured JS331090 raw/103667 gzip and CSS67251 raw/11039 gzip bytes.

## Claim limits

Separate authoritative reads do not establish atomic revocation, distributed concurrency or post-response browser freshness. No corpus generalization, independent rights certification, human linguistic certification, real-user value, free-text superiority, universal byte bound or latency guarantee is established. Browser, provider and fixture cleanup observations must be recorded independently before DONE.
