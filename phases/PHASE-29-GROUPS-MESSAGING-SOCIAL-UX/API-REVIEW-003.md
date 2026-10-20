# Independent LNG-29-003 API review

Recorded2026-10-19 Asia/Saigon. Verdict: APPROVE for bounded API evidence. Full003 frontend/native/lifecycle acceptance remains pending; this is not a003 DONE or final phase verdict.

## Source and offline review

Independently reviewed local phase29-003-api-audit.cjs, its tests, phase29-003-api-acceptance.cjs and inherited reviewed fixture/cleanup guard against backend Study Group controller/service/types/validation. Exact404 GROUP_UNAVAILABLE matching rejects validation/rate/session/server errors as authorization evidence. First failure halts later requests and marks them NOT_RUN. Twenty-seven terminal membership/token transitions run last or remain explicitly NOT_RUN. All request references use exact fixture actors/group and remembered invitations/text; errors and case summaries exclude returned private content and tokens.

Ownership transfer stays within the same synthetic actor set; cleanup recovers owned groups after transfer and validates retained left/removed memberships and dependent closure before deletion. Wrapper closes in-memory runtime sessions, attempts guarded cleanup in finally, and only recovers a single newly persisted helper-validated manifest after create failure. Diagnostic additions expose fixed stages/constrained error identifiers without messages/stacks/secrets. Expected Unicode body normalization now exactly matches backend trim; author and persistence assertions remain enforced. Source and both diagnostic/normalization deltas APPROVE.

Independently executed runner syntax and7 offline tests PASS, including exact-denial matching, unexpected protected responses, assertion/error redaction, skipped transition truthfulness, foreign setup rejection and failure halting. Inherited fixture15 offline tests were independently verified during001 security review. This reviewer performed no live API/DB actions for this003 evidence review.

## Runtime artifact consistency

Root-produced API-AUDIT-003.json contains65 unique cases:65 PASS,0 FAIL/NOT_RUN,32 exact expected denials including15 protected-read denials. Every expected denial has RUNTIME_API_404_GROUP_UNAVAILABLE; unexpectedAllows0, contractMismatches0 and unauthorizedProtectedResponses0 agree with individual records. Cross-group/cross-conversation isolation remains NOT_RUN. These are bounded recorded runtime results inspected independently, not a separate execution by this reviewer.

Run ef4dabd9-5c0f-4571-845e-3f43616775ff is CLEANED in its exact local manifest. FIXTURE-CLEANUP-003-API.json exactly matches manifest cleanup:18 tables/75 selected rows, residual0. Guard proof records verified TEST TLS/PostgreSQL180006/exact38 migration ledger and unchanged backend mainb3be9e28c6c4596ded3ed35726c57846ec8870da. No production mutation claimed.

Both earlier attempts remain preserved with their failures and exact matching CLEANED manifests/residual0. Attempt1 was interrupted before case acceptance; attempt2 records35 PASS/1 FAIL/29 NOT_RUN from the untrimmed Unicode expectation. Neither is relabeled PASS. Final current tooling fingerprints match all5 files in FIXTURE-TOOLING-003.json; before-normalization fingerprint evidence remains separate. JSON parsing and targeted secret-pattern scan found no exposed credentials/bearers/raw invitation tokens.

No actionable artifact mismatch found. Maintain original-role native checks on a fresh exact-owned fixture because the full API run intentionally transfers ownership and changes memberships. API success does not establish final frontend styling, VI/EN widths, accessibility, real-user usability, cross-resource isolation or003 publication/terminal continuation.
