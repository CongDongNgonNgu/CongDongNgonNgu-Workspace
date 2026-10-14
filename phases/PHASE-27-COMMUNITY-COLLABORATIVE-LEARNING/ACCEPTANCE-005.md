# Phase27 private visibility acceptance (005)

2026-10-14 Asia/Saigon. **Status: VERIFIED_PENDING_WORKSPACE_LIFECYCLE.** The fixed-private source/runtime target passed the bounded observations below. Exact-owned cleanup passed; Workspace integration/branch-cleanup gates remain pending; this is not005 DONE or the final Phase27 verdict. The common Workspace lifecycle records004/005 closure together after their shared gates.

## Product and integration

[Contract](CONTRACT-005.md) exposes the literal `visibility: PRIVATE_INVITE_ONLY` on existing authorized group projections; ACTIVE/ARCHIVED remains lifecycle. No database migration or new visibility state. TEST ledger remains38. No public browse/search, join-request or public-join control/API was introduced. Existing invitations, membership and roles remain authoritative.

Backend PR54 reviewed candidate `700ce69849affece8267b70deaba366b11d1f311`, merged as `b3be9e28c6c4596ded3ed35726c57846ec8870da`; exact reviewed-tree verification and main CI38500556591 passed. Render `dep-db7eg6o473hc73d3ep60` Live in1m05s. Remote/local temporary branches deleted, main clean/synchronized.

Frontend PR44 reviewed candidate `71e7175acbfb7ebe818fd08a695d2fd6130c5118`, merged as `ff261bf5f8cb686b15e2e0767740aff405fd5cab`; exact reviewed-tree verification and main CI38500819127 passed, Vercel Ready. Remote/local temporary branches deleted, main clean/synchronized. The same change repairs observed group-detail ARIA/contrast defects without changing join or role behavior.

Backend focused24 tests and isolated Phase22 HTTP7tests passed (103.232s); typecheck/lint/build passed. Frontend136files/733tests, typecheck/lint/build/performance budget and audit zero passed. Privacy/projection and accessibility regressions failed before their respective fixes and passed afterward. Independent source reviews approved the bounded changes.

## API and native observations

[005 API evidence](evidence005-runtime-api.json) records32 passed checks on exact backend main: authentication/current membership, unrelated-C scoped listing, safe real/absent UUID denial, strict unsupported inputs and role boundaries. No global private count/discovery capability was added. Original and pre005 groups use the same fixed projection; no public backfill was needed.

Root native verification used ordinary synthetic A/B/C deployed contexts. A created group `3f6d013a-d610-49e6-ac58-1862247e46f4`; B manually and explicitly accepted A's invitation. A/B saw the private/invitation-only target in VI and EN, with owner-issued/explicit-acceptance explanation and unchanged long Unicode/URL-like user content. B's unread1 was observed. C received generic denied/unavailable behavior without private group metadata. Native C own-group listing was empty and contained no A group name. The separate005 native create/join form matrix passed28 combinations: each flow at all seven widths in both locales, with no overflow and labeled fields/visible controls. Create-dialog initial Close focus, Escape close and focus return to Create passed in both locales; see [form evidence](evidence-005-forms-native.json). The accepted group-view seven-width VI/EN matrix320,375,390,412,768,1024,1440 had no horizontal overflow.

Native Lighthouse on the final B group view reported accessibility100,40 passed audits and zero failures after fixing inactive panel references and Leave-button color override. Measured Leave contrast4.56:1. This supports the changed target only; screen reader NOT_RUN and complete accessibility certification is not claimed.

| Contract observation | Bounded outcome |
|---|---|
| Existing/new group policy | PRIVATE_INVITE_ONLY; unchanged current membership authority |
| Public group discovery implemented | NO |
| Request-to-join implemented | NO |
| Public-joinable implemented | NO |
| Private enumeration leaks |0 in accepted tested cases |
| Owner/moderator/member privilege boundaries | Passed selected source/HTTP/API cases |
| Production mutation or public backfill | NO |

## Remaining closure gates

Exact-owned runtime cleanup PASS:7 texts,2 invitations,11 group-rate rows,2 direct-rate rows,4 memberships,2 groups,1 owned Community post,3 profiles,110 sessions,3 role rows and3 synthetic users deleted. ResidualRows=0; manifest CLEANED and temporary runtime controller stop accepted. Existing prior Library fixture and unrelated TEST rows were not mutated. See [cleanup evidence](evidence-004-005-cleanup.json). Workspace independent review/PR/merge/main-CI/branch cleanup/sync **PENDING**. The common004/005 Workspace closeout and eventual006 full independent review/runtime closeout remain separate gates. Do not turn bounded product observations into005 DONE before those required Workspace lifecycle gates.

Inherited same-cookie multi-tab refresh and Library-revocation/native-test distinctions remain documented in [004 limitations](KNOWN-LIMITATIONS-004.md). No real-user usability, production scale or exhaustive security claim. Continue006 automatically once005 closes; no Phase28/29, production/provider/payment/AI/voice/video scope.

## Current closure projection

004/005 share the pending Workspace closeout PR because004 final native accessibility acceptance required the bounded005 frontend follow-up.005 source clarification proceeded alongside004 final verification; it did not create a second group domain or broaden discovery. Both remain VERIFIED_PENDING_WORKSPACE_LIFECYCLE,006 PLANNED, Phase27 verdict NOT_REACHED. Workspace syntax check,12 monitor tests and diff check PASS; required Workspace PR/main CI, merge verification, temporary branch cleanup and sync are still pending.
