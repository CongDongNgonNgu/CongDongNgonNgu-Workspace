# Phase27 group collaboration acceptance (004)

2026-10-14 Asia/Saigon. **Status: DONE.** Bounded product/runtime observations and exact-owned fixture cleanup passed; Workspace review/PR/main-CI/branch-cleanup gates remain pending. This is not004 DONE or a final Phase27 verdict. Root coordinator supplied the latest native observations and updated the saved JSON cleanup fields.

## Integrated source and TEST deployment

Backend PR53 merged as `bcca2f0e1cbc2d08198c0ca01e2021db7311d438`; exact-main CI38390944273 passed. Canonical migration0038 applied transactionally to approved TEST, ledger38 and recorded digest in [migration evidence](evidence-004-migration.json). Render `dep-db71fd59fdbs73enarq0` became Live in1m11s; health returned200/statusok. Backend branch cleanup/sync passed.

Frontend PR42 merged as `d97eb14ca41c360b70e64a9ebcf28507337aac86`; main CI38391627954 passed. Canonical-card opening remediation PR43 reviewed `b9a23cfb03538069ef4a7c3c5679285a39aa6df6`, merged as `428bba6cb60c3e9040b7b7be8de370f09feb4638`; exact-main CI38498121890 passed, Vercel Ready and temporary branch cleanup/sync passed.

Native accessibility findings were repaired by the bounded005 follow-up: Frontend PR44 reviewed `71e7175acbfb7ebe818fd08a695d2fd6130c5118`, merged as `ff261bf5f8cb686b15e2e0767740aff405fd5cab`; exact-main CI38500819127 passed and Vercel Ready. Backend005 adds only the fixed privacy projection, merged as `b3be9e28c6c4596ded3ed35726c57846ec8870da`, main CI38500556591 passed and Render `dep-db7eg6o473hc73d3ep60` Live in1m05s. Ledger remains38, with no005 migration. These follow-up revisions support the final observations below; do not attribute their accessibility fixes to the earlier004 revision.

## Bounded verification

Earlier local/source/isolated SQL gates are recorded in [review journal](REVIEW-004.md). Backend004 full unit1120/e2e168 tests, typecheck/lint/build and relevant Phase22/26/27 isolated SQL/HTTP gates passed. Frontend final follow-up136files/733tests, typecheck/lint/build/performance budget and full audit zero passed. Backend high audit gate passed with inherited moderate development findings retained in the review record.

[004 API evidence](evidence-004-runtime-api.json) contains21 bounded checks, including idempotent same-payload acknowledgement, changed-payload conflict and current actor/group scope. Native acceptance used ordinary synthetic A/B/C contexts and genuine deployed APIs, tracked under fixture run `6c138be8-f797-4f0a-85f2-f2e3173aa105`.

| Journey | Observed result |
|---|---|
| A creates group; B explicitly accepts manual owner invitation; C outsider probes | Authorized A/B flow; C denied |
| Multiline Unicode exchange, unread and offline draft/reconnect/send | Current catch-up and unread displayed; draft retained through transient failure |
| Same client UUID/payload retry; changed payload | One displayed text/same acknowledgement; changed payload409 |
| Library canonical card same-tab opening | Native open passed after PR43 |
| Owned Community canonical share, B catch-up and same-tab opening | Passed; no target snapshots persisted |
| Exact-owned Community soft delete | B card became generic unavailable; stale preview/path absent |
| Hide previously rendered text | B body purged, unsent draft retained |
| Promote B to MODERATOR, then demote | Hidden history restored on promotion; hidden body and pending hide dialog purged on demotion; draft retained |
| Revoke B's exactly owned active sessions | Five active sessions revoked from bounded12-row fixture-owned selection; native protected view and draft purged |
| A removes B | B protected view and draft purged |
| A archives group | A own-membership list empty; C retains generic denied view |

Paired VI/EN native checks at320,375,390,412,768,1024,1440 found no horizontal overflow in accepted group views, including multiline/long Unicode/URL-like text. Labels and polite status regions were observed. Earlier Lighthouse snapshot92 exposed inactive `aria-controls` pointing at unmounted panels and Leave-button contrast2.22:1. PR44 corrected both. Final deployed B group snapshot: Lighthouse accessibility100,40 passed audits/zero failures; measured text RGB(104,44,0) on RGB(253,138,66) contrast4.56:1. These are bounded automated/native observations, not complete WCAG or screen-reader certification.

## Limitations and historical pre-integration checkpoint

[Known limitations](KNOWN-LIMITATIONS-004.md) retain the inherited same-cookie multi-tab refresh limitation, separate from accepted one-tab-per-actor and same-tab canonical opening journeys. Library revocation has isolated SQL proof only; native Library opening used an existing public prior fixture without mutating it. Native canonical revocation used an exactly owned Community post. Screen reader NOT_RUN. No real-user value, production scalability or universal authorization proof is claimed.

Current product findings are remediated and bounded source reviews approved. Final Phase27 independent review belongs to006. Exact-owned runtime cleanup PASS:7 texts,2 invitations,11 group-rate rows,2 direct-rate rows,4 memberships,2 groups,1 owned Community post,3 profiles,110 sessions,3 role rows and3 synthetic users deleted. ResidualRows=0; manifest CLEANED and temporary runtime controller stop accepted. Existing prior Library fixture and unrelated TEST rows were not mutated. See [cleanup evidence](evidence-004-005-cleanup.json). Workspace final review, PR checks, merge/exact-main CI, branch deletion and sync remain **PENDING**. Earlier checkpoints are historical; current cleanup evidence and JSON fields record the verified zero-residual closure. Workspace lifecycle completion remains pending.

No production mutation, provider/payment/AI/voice/video expansion or Phase28/29. After all pending004 gates pass, record004 DONE and proceed automatically through005/006 under existing authorization.

## Historical pre-integration projection

004/005 share the pending Workspace closeout PR because004 final native accessibility acceptance required the bounded005 frontend follow-up.005 source clarification proceeded alongside004 final verification; it did not create a second group domain or broaden discovery. Both remain VERIFIED_PENDING_WORKSPACE_LIFECYCLE,006 PLANNED, Phase27 verdict NOT_REACHED. Workspace syntax check,12 monitor tests and diff check PASS; required Workspace PR/main CI, merge verification, temporary branch cleanup and sync are still pending.

## Verified lifecycle closure

2026-10-14 Workspace PR162 reviewed candidate8612208, merged as55783af5bf2e11c1fd34a349ce88c4d5ef88bd64 with exact reviewed-tree verification. Main CI38506681884 / job115665683824 PASS. Remote/local temporary branch deleted, stale refs pruned and Workspace main clean/synchronized before creating docs/phase27-final-acceptance. Combined004/005 closure is complete; no pending product/runtime/cleanup gate remains for those subphases.006 is now IN_PROGRESS and Phase27 verdict remains NOT_REACHED.
