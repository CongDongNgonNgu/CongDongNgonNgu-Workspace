# Inert activation-control storage contract - 2026-11-25

STATUS=REVIEWED_CONTRACT_STORAGE_ONLY_NOT_IMPLEMENTED. Independent design review approved this narrow slice on2026-11-25 with the mandatory conditions below. Within CONTRACT-003 only. This is the setup/arm/receipt-storage increment of TEST-ACTIVATION-CONTROL-DESIGN-002-20261110.md, not activation, attestation or HTTP admission. No fixed schema installation or provider operation follows.

## Scope and APIs

A separate inert ActivationControlRepository uses a trusted injected Pool and explicit exported DDL only. It exposes arm(tuple):Promise<void>, storeReceipt(tuple,receipt):Promise<void>, and inspectExact(tuple):Promise<readonly snapshot|null>. It never connects on import, installs DDL, polls, starts workers, returns an ActiveRun, consumes a receipt or invokes RunLedger.activate.

ControlTuple has exactly runId, activationId, sourceSha, manifestSha256, service, branch, deploymentId, bootId, notBefore and expiresAt. Service is srv-dahnerh594qs73fp3420, branch dev; source/hash are lowercase full40/64 hex, IDs UUIDv4, deployment matches the existing bounded dep- grammar, dates canonical UTC milliseconds. Every input is a closed enumerable data record snapshotted before asynchronous work. Errors are opaque, transactions short with existing3s statement/2s lock limits, and uncertain writes never automatically retry/rearm.

OperatorReceipt has exactly service, branch, sha, manifestSha256, deploymentId, bootId, observedAt, liveObserved, originalDisabledCommandObserved and allFourFlagsFalseObserved. The three observation booleans must be true and identity must equal the complete tuple. They record the operator's procedure; shared database-role access is not a cryptographic or independent upstream attestation. Separate sanitized actual Live/source/command/flags/boot observations remain mandatory.

## Durable storage and fail-closed activation

The original runs INSERT explicitly stores activation_control_required:boolean (default false solely for legacy inert proof compatibility); the field is immutable. Never infer it from later row existence. Controlled runs are independently barred from PREPARED-to-ACTIVE by the SQL run guard and RunLedger.activate predicate, even after a receipt is stored. Future runtime compilation must select controlled preparation exclusively; the runtime must independently reject legacy-mode runs/handles and must never fall back to legacy activation. Compiler intent alone is insufficient.

activation_controls has primary/FK run_id, unique boot_id, the immutable complete tuple, DB-assigned armed_at, state ARMED|RECEIPT_STORED, immutable receipt JSON and DB-assigned receipt_stored_at. Receipt/time are null only in ARMED. No delete/truncate, tuple rewrite, second arm, receipt replacement, expiry shift, ACTIVE/CONSUMED state or consumption API exists in this increment.

arm locks the run first and requires controlled/sealed/PREPARED, exact run/activation/source/hash/service/original-window equality and unexpired database time before inserting one ARMED row. Identical replay rejects. Arm may precede notBefore; it cannot admit a request.

storeReceipt locks run then control. It requires the exact expected tuple, controlled/sealed/PREPARED run, ARMED state and original unexpired window. observedAt is no earlier than armed_at, no later than database clock_timestamp(), and no older than five minutes. Assign timestamps after lock acquisition. Store once without altering the tuple. SQL triggers enforce the same invariants and reject direct tampering.

inspectExact is read-only and returns only detached/frozen matching-tuple facts including current run/control states. It may observe the exact row after expiry to resolve commit uncertainty, but yields no admission authority. A well-formed unmatched tuple returns null, invalid input fails opaquely. It must not become a general run listing.

## Later atomic consumption gate

A later separately reviewed increment must consume the receipt and transition the same controlled run PREPARED-to-ACTIVE in ONE transaction, run/control lock order, current database time, exact tuple/boot and fresh receipt checks, deferred reciprocal consistency and confirmed commit before a process-local handle. A receipt check followed by existing activate is prohibited as a race. Until that increment exists, controlled activation remains unconditionally unavailable.

## Required proofs

Targeted units cover closed inputs, detached snapshots, no import-time I/O, transaction error opacity/uncertainty and no activation surface. Real PostgreSQL proof covers legacy compatibility, controlled legacy/direct-SQL activation rejection before/after receipt, one-winner concurrent arm/store, exact tuple/receipt rejection, future/stale observations, immutable fields/no delete/truncate, original deadline and natural expiry while waiting for a lock. Use generated owned schemas and independently verify namespace absence after DROP; no application SQL/R2 cleanup or runtime acceptance inference.

Full executable manifest ownership/attempt allocation, object/provider provenance, runtime cold/armed waiting, actual receipt procedure, atomic consumption and HTTP/provider/security/resource/cleanup gates remain open.001 stays DONE;002 IN_PROGRESS/REMEDIATE_AND_RETEST;003+ unstarted.
