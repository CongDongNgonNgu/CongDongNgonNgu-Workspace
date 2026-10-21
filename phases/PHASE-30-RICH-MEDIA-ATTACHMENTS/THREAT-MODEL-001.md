# LNG-30-001 threat model and adversarial plan

2026-10-21. FROZEN_DESIGN_ACCEPTANCE_PLAN under CONTRACT-001.md; none of these cases was executed as Phase30 runtime acceptance. Trust boundaries: untrusted browser/file -> authenticated API -> transactional domain ACL -> quarantined storage -> bounded parser/derivatives -> authorized response. Provider bytes/metadata are untrusted input too.

| Threat | Required control and negative proof |
|---|---|
| Extension/MIME spoofing, polyglots | Extension + declared MIME + detected signature + full vetted parsing/normalization; renamed files, trailing payloads, inconsistent containers must reject |
| Corrupt/unsupported image/video/PDF | Full bounded inspection; corrupt/truncated/unsupported codec/encrypted or active PDF never READY; processor unavailable fails closed |
| Executable/active inline content | Deny SVG/HTML/scripts/archive/macros; nosniff; document download only; active PDF reject; no raw embedding or original-as-thumbnail |
| Oversize/chunked uploads, bombs | Reservation quotas plus actual stream byte cap, pixels/dimensions/duration/frame limits, parser timeout/memory/concurrency; probes one below/at/above every frozen limit |
| Filenames/Unicode/header/path injection | Opaque generated keys; safe bounded filename serialization; test traversal, CRLF, bidi, combining/long Unicode, NUL and normalization |
| ID enumeration/cross-user read | Same opaque unavailable response; current parent ACL for metadata/bytes/HEAD/range/preview and deletion; no uploader-only shortcut |
| Cross-group/cross-pair leakage | Exact FK/parent binding and domain-scoped ACL; foreign content IDs, third participant and mismatched intended scope deny |
| Leaked/replayed URLs | No provider private GET URLs; app tickets, if introduced, actor-bound and freshly authorized; tampered/expired/replayed probes cannot substitute for ACL |
| Revocation/TOCTOU | Preserve existing lock order; parent ACL + binding/state linearization at response admission; future requests after committed revoke deny; downloaded/in-flight bytes cannot be recalled |
| Shared/browser caches, metadata | private,no-store; clear browser object URLs and stale previews on identity/access changes; no filenames/tokens/private URL/body in logs, notifications or public search |
| Duplicate/interrupted/concurrent finalize | Atomic state/version and processing lease; repeated same idempotency returns same object; conflicts409; no duplicate bindings/jobs |
| Orphans/crashes/storage failures | Durable bounded cleanup/reconciliation with exact keys/version; retry after object/DB failure; missing object safe unavailable; verify DB and storage residual independently |
| Quarantine/moderation failure | Error/timeout never publishes bytes; hidden/deleted parent dominates; safe fallback without original thumbnail |
| Privacy metadata/unsafe processing | Strip EXIF/GPS in derivatives; no shell interpolation/user paths/external URL fetch; bounded isolated processing and no processor network access |

## Required acceptance inventory after freeze

Use deterministic synthetic owned users A/B/C/D/E, two private groups and two separate authorized direct pairs, public/author-private posts and foreign objects. Keep an exact-owned manifest of DB rows/object keys/checksums, identities, runtime SHAs and probe results. Include ordinary MEMBER vs scoped OWNER/MODERATOR, LEFT/REMOVED/archive, block/disconnect/account-disable/session expiry, hidden/deleted/private parent and cross-surface binding attempts. Execute independent clients/processes for rate/quota/finalize/revocation races. No real private media.

Valid fixtures must cover each approved format and codec; adversarial fixtures include spoofed extension, MIME/signature mismatch, malformed structure/polyglot, corrupt/truncated media, oversize bytes and decompression/pixel bombs, filename/metadata attacks. Verify no unvalidated original inline path and document Content-Disposition policy. Test retries/cancel/duplicate and conflicting finalize, upload interruption, expiration, lease crash recovery, delete during processing, missing object, provider outage, cleanup retries and both residual stores. Signed-ticket tests apply only if that feature is selected; private provider-URL issuance must remain absent.

Expand the original TEST-PLAN.md without replacing it: API/unit/real PostgreSQL/HTTP security and lifecycle proof, full affected suites/typecheck/lint/build/performance/dependency audit, actual deployed upload->finalize->read/preview->delete/revoke at exact Backend/Frontend main SHAs, VI/EN at320/375/390/412/768/1024/1440 across affected surfaces, keyboard/focus/status/44px controls and late-response clearing. No false progress or persistence claim. Obtain independent source/security/runtime/evidence review after remediation. Before closeout, inspect exact-owned DB and storage separately; neither missing probes nor empty local adapters establish zero residuals.

## Current executed counters

CROSS_USER_ATTACHMENT_LEAKS=NOT_RUN
CROSS_GROUP_ATTACHMENT_LEAKS=NOT_RUN
CROSS_CONVERSATION_ATTACHMENT_LEAKS=NOT_RUN
REVOKED_ATTACHMENT_LEAKS=NOT_RUN
UNEXPECTED_AUTHORIZATION_ALLOWS=NOT_RUN
STORAGE_FIXTURE_RESIDUAL=0_OBSERVED_EXACT_OWNED_PROBE_AT_2026_10_21T02_00_08_599Z_ONLY
DB_FIXTURE_RESIDUAL=NOT_RUN_NO_PHASE30_DB_MUTATION

Historical Phase29 zeros do not count as Phase30 attachment results. Security PASS requires zero leaks from executed probes, never a default counter. Formal WCAG, malware-free files, real-user usability and production readiness are not implied by synthetic tests.
Processor feasibility is separately executed in EVIDENCE-001-EXPANDED.md; it does not populate runtime leak counts. Guarded object-probe residual applies only to its exact64byte owned fixture, not later product fixtures or a database check. TXT knownforeignheader/type-spoofing negatives remain mandatory002;14processor structural cases are not full signature validation.
