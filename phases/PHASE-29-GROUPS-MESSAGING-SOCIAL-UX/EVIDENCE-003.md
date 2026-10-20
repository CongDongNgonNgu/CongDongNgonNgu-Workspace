# LNG-29-003 Study Group execution checkpoint

Current checkpoint: 003 VERIFYING: product gates, Frontend publication, bounded API/native acceptance and exact-owned cleanup complete; Workspace publication/CI/merge/branch cleanup/terminal relay pending.004-006 PLANNED; Phase29 verdict NOT_REACHED; stop after29/no30. Earlier checkpoint paragraphs below are historical and superseded by final bounded acceptance recorded at the end.

001/002DONE;003IN_PROGRESS. Fullscope and order remain TASKS.md.002publication and completeacceptedterminalcontinuation recorded in LIFECYCLE-002.md. Reuse approvedStitch/frozenCONTRACT001; privateStudyGroups only, existingname/description/manualoneuseinvite androles; noAPI/schema/domainexpansionplanned. Implementation/tests/review/native/API/cleanup/PR/mainCI/publication003pending. Phase29verdictNOT_REACHED; stopafter29/no30.

API attempt1 interrupted before login/setup (no groups/conversations/sessions created), run0e4b76f2-6006-45cc-9355-2ddd53d57f5e. No API case PASS claimed. Guarded finally cleanup deleted7users+7roles, residual0; original interruption and cleanup retained in ATTEMPT-1 artifacts. Diagnose sanitized connection/stage failure before rerun.

## Incremental implementation and audit remediation

Frontend slice1 commit3b64d19 adds private group cards and freeform learning-purpose/create/cancel guidance with unchanged name/description/manual-accept contracts; targeted TDD3 failures/7 passes became12 passes, typecheck passed. Slice2 commite4d3733 adds focused group identity/header and discussion hierarchy using actual authors/timestamps; targeted TDD2 failures/24 passes became28 passes, typecheck and final staged diff passed. Both are local candidate commits, not published or accepted native results. Member/invitation slice and full gates remain pending.

API attempt2 reached35 passing cases with0 unexpected allows, then failed the Unicode send assertion;29 later cases were NOT_RUN. Source diagnosis established that test input had one trailing space while backend bounded()/normalizeGroupText intentionally trims, matching the native composer. The reviewed harness correction compares exact expectedBody=body.trim() and preserves author identity/persistence checks. No backend or authorization behavior was changed. The failed audit and successful residual0 cleanup remain in ATTEMPT-2 artifacts. Independent normalization-delta review and7 offline tests/syntax passed. A fresh final attempt is running; no final API PASS is claimed yet.

## Final bounded API acceptance

Fresh run ef4dabd9-5c0f-4571-845e-3f43616775ff:65/65 cases PASS,0 failures,0 NOT_RUN,0 unexpected allows and0 contract mismatches. Unauthorized protected-response leaks0. This exercised six Study Group role states, valid/denied read and mutation paths, exact normalized Unicode send/persistence, one-use/revoked/removed-member token behavior, role changes, remove/leave/rejoin and ownership transfer before leave. Cross-group and cross-conversation isolation remain explicitly NOT_RUN for006; these cannot be inferred from one group.

Strict TLS/PostgreSQL180006/exact38 migration ledger checked against unchanged BE mainb3be9e28c6c4596ded3ed35726c57846ec8870da. Guarded cleanup selected75 exact-owned rows across18 tables, residual0. Root runtime wrapper exited successfully, all three API attempts are CLEANED, no current003 live fixture remains. API result/cleanup/tooling fingerprints and retained prior attempts are independently reviewable. This does not replace final FE gates or native exact-main acceptance, which remain pending.

Frontend final candidate501b8fd50cb4009d47f9f6e23920b6556efcece4, reviewed tree6072e1f0383997ac29848876623861df82a737e6, three local commits. Independent full source review APPROVE; independent42tests/4files PASS. Author14affectedfiles80tests/typecheck/build passed; root lint/performance/audit passed (0 vulnerabilities; initial JS536235raw/149943gzip andCSS67485raw/11093gzip within budgets). Full Frontend suite running; push/PR/CI/merge/exact-main native still pending. No backend/API/schema/hook/global-header change.

Full Frontend suite completed146files819tests PASS (227.46s); no hang or failure. All affected local gates passed. FE PR55 OPEN, head501b8fd50cb4009d47f9f6e23920b6556efcece4/tree6072e1f0383997ac29848876623861df82a737e6. CI/merge/mainCI/exact-main native acceptance pending.

## Frontend publication and pending native acceptance

PR55 merged at367e8c473013fa322b5f53b6514a5a0327dc287b, matching reviewed tree6072e1f0383997ac29848876623861df82a737e6. Coordinator records PR CI39259520223/mainCI39259857731 SUCCESS; VercelqqwiKAaFj759MsyGFpQwPxRVndfR Ready/current exact main and sigma alias verified. Frontend branch deleted remote/local and refs pruned. Independent local clean main/tree/branch inventory agrees. Full native acceptance and native-fixture cleanup remain pending; no003DONE inferred.

## Bounded native acceptance and current publication gate

Root native run848b6ccc-0365-4345-a90b-cf61421b229b completed bounded PASS;19-table99-row exact-owned cleanup matches CLEANED manifest, residual0. NATIVE-003.json contains28 measured frames with0recorded horizontal/child overflow; VI768 loading checkpoint is not loaded-home PASS and EN preserved member-tab frames are not relabeled home. Complete006 matrix and independent child browser run remain NOT_RUN. 003 VERIFYING: product gates, Frontend publication, bounded API/native acceptance and exact-owned cleanup complete; Workspace publication/CI/merge/branch cleanup/terminal relay pending.004-006 PLANNED; Phase29 verdict NOT_REACHED; stop after29/no30. See [independent artifact review](REVIEW-EVIDENCE-003.md). Reviewer checked artifacts/manifest locally; native execution was performed by root. No003DONE or future Workspace success claimed.
