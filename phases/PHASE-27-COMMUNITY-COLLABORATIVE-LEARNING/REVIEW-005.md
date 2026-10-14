# Phase27 private visibility review (005)

2026-10-14 Asia/Saigon. Bounded source reviews: **APPROVE**. Lifecycle status: **VERIFIED_PENDING_WORKSPACE_LIFECYCLE**, cleanup residualRows0 verified; Workspace integration/checks/branch cleanup pending. This review does not mark005 DONE or issue a final Phase27 verdict.

The implementation preserves the existing group domain and ACL, adds one literal private visibility field through the shared authorized projector, and adds paired VI/EN fixed-policy explanation. It introduces no migration, public discovery, unused visibility values, editable setting, join request or public-join endpoint. Strict boundary validation retains unsupported-input rejection. Current membership list totals remain actor-scoped; invitation redemption and owner/moderator/member duties retain existing authority.

Backend reviewed candidate 700ce69849affece8267b70deaba366b11d1f311 merged as b3be9e28c6c4596ded3ed35726c57846ec8870da, main CI 38500556591 passed and Render dep-db7eg6o473hc73d3ep60 Live. focused 24 tests and isolated HTTP 7tests passed (103.232s), with typecheck/lint/build. Frontend reviewed candidate 71e7175acbfb7ebe818fd08a695d2fd6130c5118 merged as ff261bf5f8cb686b15e2e0767740aff405fd5cab, main CI 38500819127 passed and Vercel Ready. Exact reviewed-tree verification, product remote/local branch deletion and clean main synchronization passed.

The frontend also repairs native-observed inactive aria-controls references and a Leave-button contrast override. The active navigation control alone references its mounted panel; scoped heading styles preserve Button colors. Regression checks failed before fixes. Full 136files/733tests/typecheck/lint/build/performance budget/audit-zero passed. Final native B Lighthouse accessibility100,40 passing audits/zero failures and measured Leave contrast4.56:1 support those corrections without claiming complete WCAG or screen-reader acceptance.

Root-supplied deployed native A/B manual invitation journey, VI/EN private labels, unchanged long Unicode content, unread1, seven widths without overflow and C generic denial agree with the selected contract. The32-check API artifact [evidence005-runtime-api.json](evidence005-runtime-api.json) covers authentication, scoped C discovery denial, strict inputs and role cases. No enumeration leakage observed in accepted cases; no exhaustive proof inferred.

[ACCEPTANCE-005.md](ACCEPTANCE-005.md) records revisions, bounded outcomes and pending closure gates. Inherited004 shared-cookie-tab and native/SQL Library distinctions remain; screen reader NOT_RUN. Final006 independent review is separate. No production/provider/payment/AI/voice/video or Phase28/29 expansion.

## 2026-10-14 verified target, Workspace lifecycle pending

Exact-owned runtime cleanup PASS:7 texts,2 invitations,11 group-rate rows,2 direct-rate rows,4 memberships,2 groups,1 owned Community post,3 profiles,110 sessions,3 role rows and3 synthetic users deleted. ResidualRows=0; manifest CLEANED and temporary runtime controller stop accepted. Existing prior Library fixture and unrelated TEST rows were not mutated. See [cleanup evidence](evidence-004-005-cleanup.json).

Native005 create/join forms passed28 VI/EN/seven-width combinations with no overflow, labeled fields and visible controls. Create-dialog initial Close focus, Escape close and return focus passed in both locales. Form metrics are [evidence-005-forms-native.json](evidence-005-forms-native.json).

004/005 share the pending Workspace closeout PR because004 final native accessibility acceptance required the bounded005 frontend follow-up.005 source clarification proceeded alongside004 final verification; it did not create a second group domain or broaden discovery. Both remain VERIFIED_PENDING_WORKSPACE_LIFECYCLE,006 PLANNED, Phase27 verdict NOT_REACHED. Workspace syntax check,12 monitor tests and diff check PASS; required Workspace PR/main CI, merge verification, temporary branch cleanup and sync are still pending.
