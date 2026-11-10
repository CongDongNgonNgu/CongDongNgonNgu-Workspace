# Actual attachment allocation catalogue - 2026-11-10

STATUS=READ_ONLY_SOURCE_DESIGN_NOT_IMPLEMENTED. This catalogues existing allocation branches for the approved finite TEST exception. It does not implement injection, validate a full allocation graph, authorize fixture/provider mutations or close runtime gates. Ordinary crypto behavior, frozen policy and0039 remain unchanged.002 remains blocked/remediate; no003-006/Phase31 entry.

Paths below are relative to Backend src/attachments. N is the actual number of non-DELETED object rows selected by terminal cleanup. D is the validated derivative count: TEXT1, IMAGE/VIDEO2. Counts describe reached branches, not unconditional HTTP budgets.

| File:symbol | Slot roles and actual allocation branch |
| --- | --- |
| initiation/attachment-initiation-repository.ts:initiate | ATTACHMENT1 only for new draft insertion; returning an existing/replayed result allocates0. |
| upload/attachment-upload-ledger.ts:beginUpload | UPLOAD_OWNER1 after eligible TEMPORARY/no-live-object checks. |
| upload/attachment-upload-ledger.ts:beginReplay | REPLAY_OWNER1 for eligible PENDING/READY completed-source replay intake; no source PUT allocation. |
| upload/attachment-upload-ledger.ts:prepareSource | SOURCE_OBJECT1, SOURCE_ATTEMPT1, PUT_CLAIM1 after bounded body receipt and fence validation. |
| finalization/attachment-finalization-ledger.ts:claimProcessing | PROCESSING_OWNER1 only for admitted PENDING/no-owner/no-derivative state and free singleton. |
| finalization/attachment-finalization-ledger.ts:prepareArtifacts | DERIVATIVE_ATTEMPT1; NORMALIZED_OBJECT1; THUMBNAIL_OBJECT1 only for IMAGE/VIDEO; PUT_CLAIM per derivative. |
| storage/put-supervision-proof.ts:createPutSupervisionAuthority | PUT_SUPERVISION1 per original claim binding: source1, derivativesD; may be allocated before product commit succeeds. |
| finalization/attachment-finalization-ledger.ts:publishReady | CLEANUP_JOB1 candidate for source ORPHAN cleanup, after verified source/derivative HEADs. |
| lifecycle/attachment-lifecycle-ledger.ts:scheduleTerminalCleanup | CLEANUP_JOB candidate per non-DELETED selected object (N); called by tombstone/rejection paths. |
| attachment-object-ledger.ts:recordPutResult | CLEANUP_JOB1 candidate only on a first settled result that is no longer eligible (LATE_WRITE); already-settled replay0. |
| attachment-object-ledger.ts:abandonUnsent | CLEANUP_JOB1 candidate after valid original-entry/local-closure proofs, unless already abandoned. |
| cleanup/postgres-attachment-cleanup.repository.ts:claim | CLEANUP_OWNER1 per invocation; generated argument exists even if downstream claim rejects. |
| reconciliation/attachment-orphan-detector.ts:inspect | eventId values are alert correlation only, not DB/provider ownership slots. Listing/classification creates no object/claim or cleanup authority. |

Cleanup INSERTs use ON CONFLICT DO NOTHING, but randomUUID/gen_random_uuid allocation occurs before conflict resolution. A new candidate identity is needed per reached invocation/object even when no new job row persists. Burned candidates cannot silently be reused as an existing job's identity. Later allocator integration must preserve durable ownership across rollback, cancellation and uncertain commit without claiming a candidate row was inserted.

Successful new UPLOAD reaches five identities: owner, source object, source attempt, PUT claim and supervision. Replay UPLOAD allocates one replay owner. First successful FINALIZE reaches processing owner1 + derivative attempt1 + objects/claims/supervisions3D + source cleanup candidate1, totaling6 for TEXT or9 for IMAGE/VIDEO. Existing READY/REJECTED or existing-owner status responses allocate0; another HTTP finalize does not necessarily start processing.

DELETE schedules N cleanup candidates unless already DELETED, which returns before scheduling. Processing rejection schedules against objects actually present; derivatives may not yet exist. Upload interruption before source reservation can have N0. Unused-handle retirement and late acknowledgement may independently need later cleanup candidates for the same attachment. Recovery preserves original object/attempt/claim/supervision identities and may allocate only the specific reached cleanup candidate. Each cleanup retry needs a new CLEANUP_OWNER under existing attempt bounds. Physical-completion/terminal-retention paths have no UUID allocation in the inspected catalogue.

The graph therefore needs finite internal entries beyond HTTP attempts: exact-object late-result handling, certified-unsent retirement, terminal cleanup scheduling, each cleanup claim/retry and exact-owned recovery/retention observation. Their slots must be reserved before the corresponding mutation. HTTP operation slots alone do not close asynchronous failure/recovery paths.

An intentional UNKNOWN_PRESENT orphan fixture must prelist its synthetic attachment/object/attempt/variant locator and content ownership even where a product row is deliberately absent. Existing detection is not fixture setup or deletion authority. Never adopt an unknown object discovered during namespace listing; provider-only fixture creation and exact cleanup require their own reviewed fixed entries. Scratch directory names and alert IDs are not persisted/provider ownership identities. ClientUploadId and actor/scope/parent IDs remain manifest inputs; their provisioning is outside the eight attachment allocation areas.

The two-file pure operation-declaration increment is independently reviewed in Backend PR84, with required CI pending at this checkpoint. The request matcher, durable attempt phases and runtime admission remain unimplemented. No operational authority follows from this catalogue. See TEST-ACTIVATION-CONTROL-DESIGN-002-20261110.md and evidence-002/test-admission-continuation-20261110.json; source/SQL/provider integration and independent tests remain required.
