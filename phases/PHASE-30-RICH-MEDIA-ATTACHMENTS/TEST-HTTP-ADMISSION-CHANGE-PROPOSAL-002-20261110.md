# TEST HTTP admission change proposal - 2026-11-10

STATUS=PROPOSED_OWNER_POLICY_APPROVAL_REQUIRED
IMPLEMENTATION=NOT_STARTED
RUNTIME_ACCEPTANCE=NOT_GRANTED

This proposes an explicit exception to the frozen rule that false attachment flags admit no attachment capability. Standing authorization for TEST verification does not approve this policy change. A separate owner decision is required; no existing exception, format activation, GO or002 DONE is inferred.

Chosen scope is a finite synthetic test capability on existing public attachment HTTP routes, with all four public rollout flags remaining false. Only reviewed immutable-manifest actors, parent scopes, resources, operations, source fixture hashes and budgets are admitted. Ordinary nonfixture traffic stays disabled. Activation lasts at most10minutes, cannot auto-extend, and cannot replay after restart; new activation requires fresh operator authorization/identity verification. Only individually eligible formats are selected; image success never admits video. Format, size, codec, quota, transaction, lock, resource and deadline policies stay frozen.

Normal authentication, CSRF, sessions, exact current-parent authorization and global quotas/lease locks remain mandatory for authenticated operations. Independent review identified a conflict with current anonymous PUBLIC Community reads: requiring a listed synthetic actor for every read would test different semantics. Chosen resolution permits ANY caller to GET/HEAD/single-range/preview only manifest-owned synthetic PUBLIC Community derivatives, after fresh actual visibility/moderation/provenance eligibility checks. UUID possession grants no private access. Unauthorized private reads and recipient access to unbound drafts remain denied. Manifest-listed synthetic owners retain normally authorized private/draft positives under the actual contract; original quarantined bytes are never served. invalid supplied credentials yield401 and never fall back to anonymous authorization. This is not an anonymous write, metadata or unrestricted file capability.

Actual controller patterns under the normal /api/v1 prefix are listed below; there is no separate /initiate or /status route. The optional-auth metadata route is deliberately excluded from anonymous diagnostic admission.

| Method and existing route | Proposed diagnostic scope |
| --- | --- |
| POST /api/v1/attachments | Authenticated initiate, exact manifest operation slot |
| PUT /api/v1/attachments/:id/content | Authenticated bounded raw upload |
| POST /api/v1/attachments/:id/finalize | Authenticated finalize |
| GET /api/v1/attachments/:id | Authenticated metadata/status only |
| PATCH /api/v1/attachments/:id/metadata | Authenticated contracted safe edits |
| DELETE /api/v1/attachments/:id | Authenticated contracted deletion |
| GET or HEAD /api/v1/attachments/:id/content | Authorized normalized content; single Range under normal rules |
| GET or HEAD /api/v1/attachments/:id/preview | Authorized thumbnail preview; single Range under normal rules |

Anonymous admission is ONLY the last two route patterns for fresh eligible bound PUBLIC Community derivatives. No anonymous metadata, write or draft access is proposed.

Conservative per-run TEST budgets are additional ceilings, not changes to frozen product limits:

| Budget | Hard proposed ceiling |
| --- | --- |
| Durable nonrenewing HTTP activation | 10 minutes, no restart reset/replay |
| Preowned attachments | 4 total, at most1 video |
| Declared source total | 16MiB; every frozen per-file limit still applies |
| Authenticated requests | 120 aggregate across all test actors, including negatives/retries |
| Anonymous requests | 20 aggregate across ANY caller, including HEAD/Range/retries |
| Authenticated derivative egress | 64MiB |
| Anonymous derivative egress | 16MiB |
| Raw ingress | 32MiB including interrupted/retried uploads |
| Processing | At most4 attempts, serial concurrency1; no deadline override |

All lower frozen IP/actor/deployment rate, concurrency and quota limits also apply. Atomically reserve a durable run-bound request slot before admission. Reserve each exact planned source-byte allocation before upload; interruptions do not refund it, and malformed/overlimit inputs remain bounded by the normal validator and reviewed negative-case ingress allocation. Reserve full selected derivative or single-range bytes before sending headers/output. HEAD conservatively charges the full selected object size. Retries, range cancellation and read aborts never refund reservations. Normal bounded error responses/headers remain unchanged and consume request slots; derivative egress ceilings refer to selected file bytes, not a claim about aggregate wire bytes. All counters survive restart without reset, and new requests after expiry deny. Budget exhaustion fails closed. Additional coverage requires a fresh reviewed manifest and operator-approved run, never automatic extension; a ten-minute HTTP run does not prove seven-day lifecycle expiry.

Complete uploaded content must match an approved corpus hash before processor admission; actor identity or claimed MIME/hash alone is insufficient. Interrupted and overlimit negative cases have finite expected-reject budgets and must not reach processing. No arbitrary-file capability is granted to synthetic actors.

Independent allocation review found that current random IDs, including SQL-generated cleanup-job IDs, conflict with strict preowned fixture inventories. Before mutations, reserve fixed role/operation slots for every required allocation. The following seven areas span eight current files; diagnostic allocation is feasible in principle but NOT IMPLEMENTED or reviewed as actual source:

| Area | Candidate file boundary under Backend src/attachments |
| --- | --- |
| Initiation | initiation/attachment-initiation-repository.ts |
| Upload | upload/attachment-upload-ledger.ts |
| Finalization | finalization/attachment-finalization-ledger.ts |
| Object ledger, including both SQL UUID cleanup-job sites | attachment-object-ledger.ts |
| Lifecycle and orphan reconciliation | lifecycle/attachment-lifecycle-ledger.ts; reconciliation/attachment-orphan-detector.ts |
| Cleanup claim | cleanup/postgres-attachment-cleanup.repository.ts |
| PUT supervision | storage/put-supervision-proof.ts |

Existing ordinary-runtime cryptographic allocation stays unchanged. Diagnostic exhaustion fails closed: no queue or random fallback. Reserve durable ownership before provider I/O; reconstruct durable rows after restart or uncertain PUT, retaining ownership until independent physical cleanup verification. Never release/reuse slots prematurely. No global scheduler is started; exact-owned manual reconciliation/cleanup and required natural seven-day observations remain separate bounded evidence obligations. No unreviewed timestamp/clock manipulation substitutes for TTL proof.

Before fixture mutation or provider I/O, require exact TEST service srv-dahnerh594qs73fp3420, dev/source/deployment identity, Linux TEST runtime, raw and effective four-false rollout flags, approved database/migration and private R2 target, fixture ownership and manifest identity. Bounded identity reads needed for these checks are permitted before admission. Expected FULL Git SHA and manifest SHA256 come only from controlled external operator activation, never request inputs. Validate them against actual RENDER_GIT_COMMIT, literal packaged manifest bytes and independently verified CI/deployment receipt. The full commit binds packaged source and manifest; the manifest embeds neither its own hash nor its own full commit. No separate code-content digest is proposed. This identity simplification requires independent proposal review before the owner policy question.

Preserve existing controller/auth/cache/Vary/response middleware, private Backend proxy reads and current content semantics. A002-only fixture port may prepare exact-owned parent/binding prerequisites; it adds no public bindNewParent endpoint and cannot claim004/005 transactional surface integration. No new provider, token, billing, Production mutation, private provider GET URL or secret publication is authorized.

Required sequence: independent review of this concrete proposal, explicit owner policy exception, actual-source/change-control review, adversarial tests/full affected CI, independently verified fixture ownership, then separately authorized execution. Tests must cover cold-default/no-I/O, normal sessions/CSRF, anonymous eligibility and invalid-credential precedence, allocation exhaustion/restart replay, concurrency/locks, revocation, corpus mismatch, cancellation/uncertain writes, private-read denial and failed cleanup. Public HTTP/provider/security/resource/cleanup gates require real executed evidence.002 remains BLOCKED_OR_REMEDIATE_AND_RETEST, video HELD_RUNTIME_VALIDATION_FAILED;003-006/Phase31 remain unstarted.
