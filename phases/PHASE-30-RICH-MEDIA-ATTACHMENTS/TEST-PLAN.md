# Phase 30 Test Plan

Test valid/invalid image, short video and approved document types; renamed/spoofed extensions; oversize/count limits; interrupted/retried uploads; duplicate finalize; delete/revoke; cross-user/group/message authorization; expired/signed URL behavior where used; orphan cleanup; preview fallback; mobile composer; keyboard/focus; long filenames/Unicode; network errors.

Never use real private user media for synthetic acceptance.

## Reviewed-contract execution mapping (candidate until001freeze)

Keep the original plan above authoritative. CONTRACT-001.md defines exact candidate format/rate/quota/lifecycle limits; each requires below/at/above tests and explicit negative cases.001 equivalent-resource measurements justify only policy design;002 must prove pinned processors and fail-closed termination on the exact Render TEST runtime before enabling formats. Include normalized source/thumbnail supplied-metadata removal, unsupported profile/brand/chunk/NAL rejection, external MP4 data-reference and sample-offset attacks, UTF8/BOM/control/document-disposition cases. Timed-out valid complex media is a rejection, not successful normalization.

Use real PostgreSQL transactions for actor/domain/attachment/quota/lease ordering, concurrent finalize/bind/delete/revoke, retry fingerprints after removal, leave-rejoin/disconnect-reconnect generation changes and atomic parent edit rollback. Keep existing nonempty group/DM body-or-context constraints. Prove Community RESOURCE remains ordinary Community content and files never acquire Library eligibility.

Deployed enablement must measure baseline and concurrent API latency/RSS plus bounded raw-stream upload, watchdog/termination, temp/output caps, private R2 derivative round-trip and awake-only cleanup/restart recovery. Cgroup experiments are not Render acceptance. Source-namespace/backup-exclusion guards and exact-owned manifests precede any TEST object writes; postcleanup checks separately cover SQL and storage, no bucket-wide purge.

Per-domain metadata/full/HEAD/single-range/preview/download/delete probes include foreign uploader, same-group non-DM user, connected user outside group, hidden text MEMBER versus OWNER/MODERATOR, revoked drafts, changed post visibility/language/moderation, block/disconnect and missing objects. Verify opaque errors, no provider GET redirects or private-signed URLs, no-store/nosniff/disposition policy, objectURL purge and late-response rejection. Runtime leak counters remain NOT_RUN until executed.
