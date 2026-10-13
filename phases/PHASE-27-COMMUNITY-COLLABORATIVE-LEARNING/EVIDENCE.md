# LNG-27-001 evidence and handoff

2026-10-13 Asia/Saigon. Audit/contract only; Backend/Frontend source unchanged. Current remote/local baseline matches all supplied heads; no reset/delta inheritance needed. Actual findings and decisions are [source audit](SOURCE-AUDIT.md) / [contract](CONTRACT.md); later risks/gates [threat model](THREAT-MODEL.md) / [acceptance plan](TEST-PLAN.md).

## Focused observed verification

- Backend: `npm.cmd test -- --runInBand --no-cache --runTestsByPath src/community/community.service.spec.ts src/community/community.contract.spec.ts src/corrections/corrections.service.spec.ts src/corrections/postgres-corrections.repository.spec.ts src/study-groups/study-group.validation.spec.ts src/study-groups/study-group.transaction.spec.ts src/study-groups/study-group.migration.spec.ts` —7 suites/57 tests PASS,24.168s, baseline0f426b5. Repository/transaction tests use mocks/static migration checks; this is not new PostgreSQL runtime/race proof.
- Frontend: `npm.cmd test -- src/features/community/components/StructuredResponseExperience.test.tsx src/features/community/pages/CommunityPostDetailPage.test.tsx src/features/community/pages/CommunityPage.test.tsx src/features/study-groups/pages/StudyGroupPage.test.tsx src/features/study-groups/study-groups.policy.test.ts` —5 files/38 tests PASS,16.09s, baselinecc163d7. Component/unit evidence only, not native browser/localization/accessibility acceptance.
- Workspace: `node --check scripts/production-availability-monitor.mjs`; `node --test scripts/production-availability-monitor.test.mjs` —12/12 PASS. `git diff --check` required again on final staged diff and by CI.
- Initial npm.ps1 launch was blocked by host execution policy; npm.cmd used without changing policy. Read-only sandbox blocked Jest/Vite temporary cache/config writes; authorized escalation ran the same focused tests successfully. These launcher failures are not product failures and were not hidden as initial PASS.
- No new product source/tests/index/schema, dependency, DB access/migration, runtime fixtures, deploy/provider configuration, production/payment/AI/voice/video action. Full unchanged product suites/builds not rerun ceremonially. Phase27 browser/query-cost/SQL acceptance NOT_RUN; screen reader NOT_RUN; real-user value/usability/production traffic unproven.

## Independent review

Fresh reviewer `/root/phase27_independent_review`, read-only independent current-source/product/security/architecture audit, verdict APPROVE after factual documentation remediation. Four documents reviewed: CONTRACT, SOURCE-AUDIT, THREAT-MODEL, TEST-PLAN.24/24 axes covered:

| Axes | Result |
|---|---|
| 1 inventory;2 one primary;3 QUESTION;4 CORRECTION;5 DISCUSSION | PASS: eight types, exact structured variants, collapsed secondary comments |
| 6 bounded nesting;7 structured reply decision;8 votes/acceptance | PASS: depth0/1, option A, distinct entities/self-vote and requester constraints |
| 9 filter data;10 server source;11 pagination/sort;12 enumeration | PASS: real topic/save, no tags, DB queries, keyset ties, no counts/encrypted new-query cursors |
| 13 group reuse;14 no second domain;15 old groups private;16 visibility/join | PASS: private-only selected, request/public candidates deferred, no automatic exposure |
| 17 roles;18 sharing;19 notices;20 block/report/moderation | PASS: exact22 authority, live26 canonical refs; legacy notice/acceptance/source gaps honestly tracked |
| 21 vi/en;22 responsive/accessibility;23 no28;24 exclusions | PASS: EN hold retained, seven widths/future a11y not falsely run, no later phase/provider/production scope |

Required review findings corrected: removed an unsupported damaged-source-string assertion caused by terminal encoding; raw UTF8 labels verified; corrected six comment-primary types wording. No remaining blocking contract defect. Review does not assert inherited acceptance races, unsigned cursors or snapshot notifications fixed. These remain later affected-path acceptance gates. No product implementation demanded/performed in001.

## Integration and continuation

Temporary Workspace branch `docs/phase27-interaction-contract`. Final PR/head/main SHA, PR/main qualityCI, reviewed-tree equality, remote/local deletion and all-repository main sync are recorded in the PR and terminal report after they actually pass, avoiding self-referential hashes.001 must remain VERIFYING until these gates pass. State's DONE projection becomes effective only after that lifecycle; if any gate fails it is not permission to claim DONE.

Full same-phase authorization persists, but current explicit boundary requires STOP after001. Next eligible task002 READY after001 lifecycle;003-006 PLANNED, not started. No terminal browser relay or returned continuation may override this explicit stop. Phase27 overall IN_PROGRESS/verdict NOT_REACHED; Phase28/29 unauthorized/unstarted. No permission request needed for later same-phase work when user resumes. Preserve all closed-phase evidence and known real-private-data/retention/global-block/locale limitations.


## Active continuation002 preflight ? 2026-10-13

The owner continuation supersedes historical001-only stop wording and authorizes automatic002?006 lifecycle. Remote main fetch confirmed Backend0f426b5345a38ab445b2a557fa848466187ffbe3, Frontendcc163d7f26648337c8d35c7416f0268776f4cf7b and Workspace7d09d7baf2245111bb48b4186109b0054f7f8cb2 equal local baseline.

Memory-only configuration identity guard matched the previously approved Neon TEST endpoint and neondb, no startup options, sslmode=verify-full. Read-only live preflight returned public schema, PostgreSQL180006 and ledger36. Actual client transport encrypted=true, authorized=true, rejectUnauthorized=true. The pooler upstream pg_stat_ssl=false is not client TLS evidence and is not used as a TLS acceptance claim. No database mutation in this preflight.

Historical Phase26 provider proof identifies the existing Render/Vercel targets as owner TEST. Current browser sessions on both dashboards redirect to sign-in; current provider exact-main proof is pending authenticated session, not claimed PASS. This does not prevent independent implementation/test work.


Current browser-session correction: the separate DevTools session was signed out; the user Chrome extension session is authenticated. Read-only native provider UI confirmed Render service srv-dahnerh594qs73fp3420, matching repository/main, Live commit0f426b5345a38ab445b2a557fa848466187ffbe3; Vercel project cong-dong-ngon-ngu, sigma domain, Ready deployment2UzCngbrBSTLXBpyvA9FwBAys2hL, main commitcc163d7f26648337c8d35c7416f0268776f4cf7b. No login or provider mutation needed. Current baseline exact-main proof replaces the pending-session note above, not later002 deployment proof.


##002 backend candidate verification

Candidate8d7eb41c3617a08331e5612be4f6349aa9e96607:177 unit suites/1104 tests, typecheck/build/audit0 vulnerabilities, diffcheck passed. New approved TEST isolated PostgreSQL proof14 cases passed, including response-hide/author-disable/parent-hide/language-disable competing transactions and current notice/read/count revocation. Legacy connection+message-notification SQL suites rerun by coordinator:2 suites/75 tests PASS331.884s; schema-isolated owned cleanup completed. The earlier agent session whose final result was unavailable is not counted.

Initial full HTTP suite22/23 suites passed (167/168 tests); one old memory notification fixture expected a snapshot/read count without an authoritative Community reader. Corrected it to assert deleted actor/null target/empty variables/unread0 and retained owner read/idempotence; focused notification HTTP5/5 passed. Exact-head CI subsequently passed its complete required pipeline. This is intentional fail-closed memory proof; affirmative live source eligibility comes from SQL tests.


##002 product integration savepoint

Backend main41781d9869cbb378c746ee0f3c63559b03284358 requiredmainCIpassed andmergedbranchremote/localcleanupcompleted. Native signed-in user Chrome Render UI verified exactmain deploymentdep-db6pc4nf3r2c73c07r60 as Deploy succeeded|Live; healthHTTP200/statusok. This is the existing approved owner TEST target fromPhase26; provider environment labels alone are not classification authority. No schema migration in002.

Frontend PR38 candidate d941280f3728fbb806225ee47cd68c9dd8f9281a exactheadqualityCI38336602232/job115097984421 andVercelchecksPASS; merged main d89b1cb5947bb500369d3c8386c9b5453ddbedef with reviewedtreeequality. MainCI38336787414/job115098564135 andVerceldeploymentEbxHYbyZLUNab79UEQrvHgT1A1Jn pendingatthissavepoint; branchnotyetcleanedpendingmaingates.

002 remainsIN_PROGRESS pendingnativebrowser/a11y/pairedtargetacceptance, Workspaceintegration andfrontendpostmergegates.003?006 notstarted; verdictNOT_REACHED.


##002 native TEST browser savepoint

Exact deployed Backend41781d9869cbb378c746ee0f3c63559b03284358 and Frontendd89b1cb5947bb500369d3c8386c9b5453ddbedef; frontendmainCI38336787414/job115098564135 PASS, VercelEbxHYbyZLUNab79UEQrvHgT1A1Jn Ready on sigma domain. Frontend mergedbranch remote/local deleted aftertreeequality/patch-equivalence; refspruned/main synced.

Independent runtime helper review initially blocked missing recovermanifest, phase06 event cleanup and non-FK notification residuals. All fixed; approved helper SHA2566204b92ede87fb20d411249153be81e5d39aa5ecd0e4c1e8a5fa08ec3d45e6b1. Actual preflight verified approvedTEST identity/clientTLS/local migration digests/ledger36. NDJSON terminal input echo disabled; credentials stay process memory. Sanitized fsynced manifest records run dac7b3fe-03da-481b-9fcd-e4a6ad74c514 before seedcommit. Fresh synthetic ordinaryMEMBER ABC; native login in separate browsercontexts4/5/6 succeeded. No real private-user data.

Native journeys: A created QUESTION94ad922a-97e4-4efe-8e9e-fffd65400f7d; B answered86a3f2f7-ec60-4228-9272-24c8e1db1651 with optional explanation; A marked answer helpful and accepted. Question original exactlyonce; response helpful self control absent forB; post helpful separately present; additionaldiscussion startsclosed, Acomment/Bonelevelreply persisted. A created CORRECTION_REQUESTbd7b8416-4d51-4177-9e31-17308f685f06; B proposal1efdbe30-28a4-4801-9f69-eb826e7644ba and explanation; Aaccepted. Native comparison shows immutable original and changed proposal. Both answer/proposal drafts survived nativeVI/EN switching; explanationcollapse/reopen retains text. Keyboardtyped long drafts grew from98px to240px and internallyscrolled; no nativeUTF16maxlength. Bothdetail/editor paths measured all7 widths in bothlocales with nohorizontaloverflow (artifact evidence-002-editor-matrix.json). Desktop/mobile screenshots visually inspected inline; no persisted screenshotclaimed. Visiblefocusedtextarea3pxorangeoutline; no unlabelledbuttons/noerrorwarnconsole in inspectedcorrectionpage. This is scopedlayout/flowproof, notcompleteaccessibilityacceptance.

Native radio click/fill tool targeted incorrectly; keyboardTab/Space selectedGRAMMAR correctly. DevToolsfill changed controlledtextareaDOM withoutReactstate; native type_text used for verifiededitorcounters/persistence. These are tool-method distinctions, not waived productgates.

ActualAPInegativecases: ownresponsehelpful403/CORRECTIONS_SELF_VOTE; unrelatedCaccept403/CORRECTIONS_ACCEPT_FORBIDDEN; crosspostaccept404/CORRECTIONS_ACCEPT_INVALID; structuredresponseIDascommentparent404/COMMUNITY_COMMENT_UNAVAILABLE; depth2reply400/COMMUNITY_COMMENT_DEPTH_EXCEEDED. ExpiredAPIbearer401/AUTH_SESSION_EXPIRED then ordinarylogin renewed safely. All ownedentityinventory unchanged bydenials.

Currentnotificationprivacy: Bnativeacceptedquestion+correctionnoticeswithcanonicalpostlinks/unread2. Aprivatequestiontransition200 -> Bnativequestionlinkabsent/unread1; BprivatepostAPI404; ArestoredPUBLIC200. No snapshot target exposed afterrevocation.

Runtime fixtures currentlyACTIVE pending remaining002acceptance and exactcleanup; noresidual0claimyet. Additional independentstaticreviewfound structuredvalidation alerts not associatedfields. FocusedfixPR39 candidatebfa7dae08f4a0d221b6b9cd43f4de89732ca4fc3 hasindependentAPPROVE/39focused+16independentlyreruntests/type/build; exactCI/deploy/nativevalidationpending. ScreenreaderNOT_RUN; ENtargethold notyetclosed.002IN_PROGRESS/003-006PLANNED/verdictNOT_REACHED.


##002 bounded a11y/runtime remediation savepoint

FrontendPR39 merged asa742802a8e722f84cbb8871766bea777647af1fd. ExactmainCI38340299181/job115109543585 andVercel72BbCZRoB3oWnhGZP2xmn7h16GPP PASS/Ready; nativeproviderUIexactcommitverified. Reviewedtree/patch-equivalence verified; branchdeletedremote/local/refspruned/main synced. Actualnativeemptyanswervalidation aria-invalidtrue, describedbyerrorID withVIrequiredcopy; nativeEnglishswitch updatescopywithoutreload. Offline sendkeptdraftandglobalretryerror; restoringnetworkandsubmittingcreatedthirdownedresponse andcleareddraft.

Acceptance replacement opened nativewindow.confirm, which blockedtoolmouse/CDPfocus. After explicitDevToolshandle_dialog accept, nativeacceptedcardchanged tosecondanswer withoneunacceptcontrol; unacceptand reacceptverified. No repeatedmutationassumedfromtimeout. Native additionaldiscussionSpaceclosed/Enteropened andkeptSUMMARYfocuswith3pxorangeoutline. OpenthreadVIEN all7widths controlsbounded/nohorizontaloverflow; artifactevidence-002-discussion-feed.json. Native reportdialogdesktopinitialfocusclosebutton, labelsDanhmuc/Lydo; Escapeclosedandreturnedpostoptionsfocus.

IndependentnativescopefoundmobileCSShidentirepostoptions/report/editdelete row. CSS-onlyfixreviewAPPROVE, build/diffpassed; PR40candidate76208926ac0690e5df2070a05b76d47460a1249e pendingCI/deployedlongtopic320check. No productcompletion/ENholdclosureclaimyet. Nativecontrast samples12.07/12.75 forheadings/labels/editor and5.11for12pxhint; visiblefocus3px. window.axe unavailable; automatedaxeNOT_RUN, screenreaderNOT_RUN. These boundedmanualchecksarenotfullWCAGcertification.


## 002 final native and cleanup savepoint

2026-10-13: final frontend80e138a3f8f8564fbb1fa7ffd21296daebe509c7 main CI38351036676/job115143255035 PASS, Vercel3VxJBvWciT1jp9Qyo5We9pYT7q6M native Ready/full-source proof. Actual long-topic/menu measurements passed all7 widths VI/EN. Synthetic mobile report submitted without hiding the post. Exact fixture cleanup committed with residualRows0; see evidence-002-cleanup.json. Acceptance and review records retain bounded limitations. Workspace lifecycle remains pending; 003-006 unstarted.
