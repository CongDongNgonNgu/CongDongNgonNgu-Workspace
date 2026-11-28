# Source PUT quiescence and PENDING custody contract

2026-11-27. Status: ACCEPTED_SOURCE_ONLY after independent transition/interface review. Phase30-002 remains IN_PROGRESS/REMEDIATE_AND_RETEST. This is the next reversible source increment after PR110, supporting the required controlled FINALIZE path. It does not implement FINALIZE, change declarations/DDL, activate runtime/provider/workers or complete acceptance.

## Objective and assumptions

Preserve original source-producer quiescence after its upload supervisor is released, and recover a committed PENDING upload whose COMMIT acknowledgement was lost. Keep exactly one original recovery owner. Successful recovery must disarm the obsolete upload-failure callback without inventing a supervisor, returning an uncertain success DTO, burning a cleanup job or authorizing forward work after expiry.

The original controlled run/claim and native binding remain mandatory. The sealed run has at most four source entries. Current product source receipts use status WRITTEN, not an invented PERSISTED enum. Ordinary upload semantics and application schema remain unchanged.

## Closed state and interface

A private opaque SourcePutQuiescence fact is minted only from the manager's original registered claim and actual original SETTLED supervision, authentic positive receipt and completed local closure. The trusted service captures it only after withAttachmentUpload fully returns: bounded input pipeline, temporary file, provider body and callback are closed. Capture precedes markPending and supervisor release. Copy/freeze the exact locator/claim/supervision/owner/version/hash/bytes/ETag facts. A specialized recordSourceReceipt(work) wraps the existing receipt-recording transaction, verifies the settled source snapshot on the same client and makes it private only after a known COMMIT acknowledgement. Preserve the immutable original claim version separately from this actual settled source version; recordPutResult legitimately increments object_version, so the pre-record claim version must not be naively compared to the settled row. A copied object, negative settlement, elapsed time or SQL row cannot mint it. Releasing the old handle does not erase historical quiescence or create another handle.

The original custody record has states UPLOAD_ACTIVE, QUIESCED_UNPUBLISHED, PENDING_MAYBE and PENDING_CUSTODY. Capture advances only the first transition. A specialized publishPending(work) uses the existing fresh-gated SQL stage and verifies the exact PENDING/source-custody predicates on that same client after the callback and before COMMIT; callback return or COMMIT alone cannot imply a PENDING transition. Immediately before the actual COMMIT command it marks PENDING_MAYBE. A known acknowledgement marks PENDING_CUSTODY before the common postcommit cancellation/expiry check. Failure before a COMMIT attempt keeps QUIESCED_UNPUBLISHED. An uncertain request still returns no success DTO.

The same record serializes reconciliation with a private IDLE/RECONCILING ownership marker. Manual retries skip or bounded-deny busy ownership; no second recovery callback or serialized context can own it. Finally releases only the current owner. Existing request-local retry entries capture this record rather than reconstructing authority.

## Cleanup-only reconciliation

Lock original ledger run, request attempt and operation, then existing domain/attachment/source ownership in consistent order with bounded SQL waits. Inspection may run after CLOSED or expiry only to establish historical custody or perform existing proof-backed retirement. It cannot reopen a run, renew a deadline, refund diagnostic burns, produce another PUT or allow expired FINALIZE.

Adopt PENDING only with the original positive quiescence fact and exact committed SQL facts: attachment ID/initiation fingerprint, source pointer, object/attempt/claim/supervision and immutable receipt/hash/bytes/ETag; source status WRITTEN, put_settled_at present, put_uncertain false; pending_slot_held true, upload_slot_held false and lease_owner NULL. Mark PENDING_CUSTODY and remove the obsolete upload-failure retry only after the inspection COMMIT acknowledgement is known. If that read-only COMMIT acknowledgement is lost, retain PENDING_MAYBE and the last original observer until reinspection.

Exact UPLOADING ownership with publication unestablished follows existing upload-failure retirement. Existing terminal states follow existing exact proof-backed retirement. Missing/mismatching facts, unknown inspection or READY state do not grant adoption or tombstone committed PENDING/READY. Keep the last owner/debt when recovery cannot be established.

PENDING_CUSTODY records live in a private WeakMap keyed by the original active-run ownership, with a source map bounded by that sealed run's entries. They do not occupy unresolved-failure capacity and are not an unbounded global locator map. Each original source has one entry. Restart has no private fact and cannot rehydrate it from SQL. Future explicit FINALIZE custody transfer and terminal reconciliation must consume or retire these facts; this slice does not add those APIs.

## Implementation boundaries and style

Use put-supervision-proof.ts for opaque fact capture/verification, controlled-source-upload.ts for custody and specialized publication/reconciliation, and attachment-upload-service.ts for the real closure boundary and retry disarm. Keep descriptor-closed inputs, frozen detached facts, original WeakMap ownership, opaque failures and existing domain logic. Example internal style: `await access.publishPending(client => uploads.markPending(client, actorId, fence, objectId));` The helper does not return a transferable freshness token.

Always preserve native session/current ACL, fresh original forward fences, one planned cleanup job and original uncertain-send retention. No dependencies, CI changes, product migrations, global workers or provider actions belong to this increment. The separately reviewed future raw retirement link and discriminated normalized-cleanup schema are explicitly outside this slice.

## Commands and verification

From the Backend worktree:

- `npm test -- --runInBand --runTestsByPath src/attachments/storage/put-supervision-proof.spec.ts src/attachments/service/attachment-put-session.spec.ts src/attachments/test-admission/controlled-source-upload.spec.ts`
- `npm run typecheck`, `npm run lint`, `npm run build`, `git diff --check`.
- `node --env-file=../CongDongNgonNgu-Back-End/.env scripts/phase30-sql-proof.cjs test/phase30/attachment-controlled-source-upload.sql-spec.ts test/phase30/attachment-controlled-source-upload-http.sql-spec.ts`. Reuse the existing SQL fixture helpers and exact allowlisted proof paths; never print/copy credentials. SQL execution is limited to disposable owned random schemas.

TDD must demonstrate the current lost-PENDING-ACK failure before repair. Required coverage: forged/foreign/copied facts; failed or incomplete closure/negative receipt denial; known PENDING acknowledgement; actual PENDING COMMIT acknowledgement loss followed by exact adoption without success DTO/job; inspection acknowledgement loss retaining the observer; precommit rollback using original failure cleanup; wrong source/fingerprint/receipt/flags refusing adoption; expired/closed cleanup inspection without renewed forward permission; concurrent manual retries establishing one owner; repeated recovery without additional job/burn; all four acknowledged source entries releasing unresolved-failure capacity while a fifth source outside the plan remains denied. Future handoff races are required when that future API is implemented, not claimed by this slice.

Independent review must approve concrete transitions before implementation. Final diff/source review, targeted ordinary regressions, actual PostgreSQL/native HTTP checks and normal PR/dev CI/tree/temporary-branch cleanup remain required. These proofs do not establish provider, resource, process boot, restart recovery or natural seven-day retention acceptance. Phase31 remains stopped.
