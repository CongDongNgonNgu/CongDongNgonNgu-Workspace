# Phase30 storage deletion amendment

2026-10-22. Reviewed constrained TEST design; implementation/runtime acceptance pending. This refines CONTRACT-001 storage mechanics using new executed provider evidence. Original001 lifecycle and frozen format/limits/domain contracts are preserved. No provider, credential, billing or production scope expansion.

## Executed evidence

- Exact64byte synthetic probe r2-conditional-8c95e8a4-7d5f-48c3-81f3-98bd19236b82.json: DELETE with incorrect IfMatch returned204 and removed the object. CONDITIONAL_DELETE=NOT_ENFORCED. Never claim provider-atomic compare-and-delete.
- Exact64byte synthetic probe r2-create-db16221e-8a35-4fed-b503-1c7e048efb3c.json: intentional conditional overwrite rejected412, persisted original ETag/metadata unchanged; incorrect IfMatch GET rejected412, correct GET full-byte checksum passed. Conditional creation/read are observed capabilities of this approved TEST target.
- Each probe persisted ownership before PUT, used a unique generated key, bounded calls/time, exact-owned deletion and independent HEAD404 plus bounded owned-prefix empty listing. Observed residual0 at2026-10-21T12:14:42.706Z and2026-10-22T01:27:24.477Z respectively. These are two bounded probes, not deployed adapter/authorization acceptance. Retained backups untouched.

## Required immutable-write and cleanup model

1. Allocate a distinct UUID attempt/object key for EVERY physical PUT. Persist immutable locator, SHA256, exact byte count and prospective ownership before I/O. Claim producer-start once under ordered domain/attachment/object locks and fenced DB version/token. Never retry/reassign/recreate a started, uncertain, failed or retired key. A retry allocates a new physical identity and reserves all old uncertain/deletion debt.
2. Conditional-create only. No overwrite/update/move API. Lease expiry allows recovery of a job, never permission to PUT an already consumed key. The process supervisor/storage transport must cancel and dispose late responses; cancellation alone is not proof of absent provider side effects.
3. Cleanup obtains durable eligibility/version/lease under ordinary lock ordering, checks producer state and resolves outstanding/uncertain writes conservatively. No DB locks during provider I/O. A stale producer completion cannot attach or mark READY; it records late-write cleanup without reviving the tombstoned attachment.
4. Before exact unconditional DELETE, compare fresh HEAD against the COMPLETE persisted locator metadata, SHA256, size and ETag. Missing/changed ownership fails closed. The adapter never accepts arbitrary keys or backup paths. This check is not atomic with DELETE: its safety depends on application-enforced no-overwrite/no-key-reuse and fenced producers.
5. Confirm deletion independently by exact HEAD and bounded owned-prefix reconciliation. Keep tombstones, attempt ownership, reservations and cleanup jobs through outstanding/uncertain writes; do not release quota or assert physical cleanup merely because an SDK request timed out or one HEAD was absent. Reconcile late arrivals. Retention/retry/sleep limitations remain CONTRACT-001.
6. Arbitrary writes by another holder of the shared bucket credential are outside application immutability guarantees. The existing backup/media shared-credential blast radius remains a disclosed TEST limitation. A dedicated bucket/credential still requires separate owner approval. Prefixes are not IAM authorization boundaries.

## Review and gates

Prior independent/domain_audit reviewed this alternative as acceptable bounded TEST design with the above guards. Current independent/security_review_002 confirms full-snapshot deletion and durable single-use producer claims are mandatory. Neither design review nor mocked tests prove lifecycle races or deployed enablement. Required negatives: simultaneous producers, expired/stale claims, duplicate workers, interrupted/uncertain PUT, delayed completion after tombstone, old cleanup versus new attempt, ownership/SHA/size/ETag changes, deletion failure, restart and repeated reconciliation. Exact Render/HTTP/domain ACL/resource/security/DB+storage residual gates remain open; every format stays disabled until applicable acceptance passes.
