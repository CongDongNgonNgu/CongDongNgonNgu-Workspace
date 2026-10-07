# Phase22 observed evidence

## Mandatory preflight and contract review — 2026-10-07

All three working trees initially clean on main. Remote Backend main77f8824d11cc843ee93f681af7b649889edd680d; Frontend main7cf66654da6419ca5447673e5d3782560856b4bc (handoff literal corrected by actual remote/Phase20/21 evidence); Workspace main48079b327527feba20bd7ab25c3edb6847a13e64 legitimately advanced through planning-only PR129. No Phase23 implementation started.

PR129 merged=true at48079b3, main quality check112627202177 success, head6e9031c22de91e39a0f1b25ecf67c9180f1e645c tree identical to main. Stale docs/v2-roadmap-language-hub-completion remote branch deleted and tracking pruned; local branch absent; no unique work lost. Backend/Frontend only main branches.

Workspace rules/state/schema/roadmap/dossier/Phase20 GO/matrix/threat/evidence and Phase21 closeout reviewed. No project skill roots or AI-DOS manifest found. Backend has no AGENTS; Frontend AGENTS/architecture source audited. Engineering skills: using-agent-skills, planning-and-task-breakdown, api-and-interface-design, security-and-hardening, git-workflow-and-versioning, incremental-implementation, test-driven-development, code-review-and-quality, caveman-commit; UI design/front-end skills loaded by UI agent.

Independent Backend source audit and contract review found six actionable issues (full FK key, quotas, affected-user/list locking, rate attempts, persistent revoke UI and historical actor FKs), all addressed before implementation. Final reviewer approves design only; SQL/runtime/security gates remain unproven.

Configured DB host safely matched existing Phase18 exact approved TEST/UAT host without printing connection/credentials. Read-only query confirms neondb/public and PostgreSQL18.6(c021049), classification APPROVED_EXISTING_TEST_UAT, writes0. Initial probe syntax error happened before DB access and was corrected; not reported PASS. Do not use generic migrate command without target guard.

Default shell initialization failed; elevated authorized CLI works. GitHub CLI absent; configured Git Credential Manager + narrowly scoped REST helper is authorized fallback. Credentials remain memory-only and excluded from logs/evidence.

Stitch work is in progress; no implementation, SQL migration, test success, CI integration or runtime completion claimed by this preflight record. Real global-block/deletion/backup rollout gates remain open; payment activation unauthorized.

## Contract integration / LNG-22-001

Workspace PR130 merged reviewed head df50fa30d7d88e6540475d018e312f8cd2ab017b to main905df198c82edd1ccdfe699cc1f346b159b56b0e. PR quality112631510640 and main quality112631623389 SUCCESS. Squash merge tree identical to reviewed head (ancestry check correctly does not apply to squash). Remote main matches; remote/local phase/22-contract deleted, stale tracking pruned; local main clean. Existing12 monitor tests and monitor syntax pass; changed documentation whitespace corrected before clean git diff --check. LNG-22-001 DONE design/contract only; Backend002 READY, SQL gates unpassed.

##22A evidence integration and same-phase relay

PR131 merged checked head ecec3c20125f783869435b561079a6538888175c to6b527c076165e839f3d159fd6979cb2475708124; PR quality112632053269 and main quality112632263582 SUCCESS. Reviewed head/main trees identical; remote/local evidence branch deleted and tracking pruned. A inherited status-line whitespace defect was corrected with a separate commit before PR/merge; no history rewrite. Four contract links verified. Public TEST membership catalog returned available=false,qrAvailable=false,provider=null.

Sanitized22A terminal report actually submitted to confirmed project conversation6ac5ad89-990c-83ec-aede-3cfafb2ad400 (Tiếp tục roadmap V2). Generation complete; latest complete code block extracted36032 characters and fully read/validated for same project, Phase22 Backend002, frozen policy/SQL/TEST gates and production/next-phase hard stops. Relay-suggested human stop after22B conflicts with the owner complete-Phase22 lifecycle/no-subphase-permission instruction and does not revoke it; coordinator will relay/continue same phase automatically. No source/DB/UI success is inferred from relay. Backend002 IN_PROGRESS.

## Stitch design preflight

Stitch project16129593133068835350 reviewed before Frontend source edits. Accepted compositions: list/create c0d91583bc474df8b5ce0613b363a4f1; refined owner detail45986acc7614482aa7178f6f1cbfe2ba; English member mobile1e375593fca54c939683204d1a5e6c00; refined actions af51513926e04a53bbf7e03d684633b6. Actual screenshots visually inspected. Two refinement rounds removed persistent raw-token rail, discussion report queue, invented80-character name/required description, permanent-ban wording and developer copy. Implement frozen contract over generated deviations: archive denies all protected access, reporting returns acknowledgement only, native localized role labels and existing shell/components. Generated screenshot dimensions are not runtime breakpoint proof. Accessibility, vi/en and requested320–1440 widths remain NOT_RUN. No Frontend implementation yet.

## Backend implementation checkpoint

Independent SQL harness first execution failed TS2307 for missing StudyGroupService, establishing actual RED before implementation. Backend source slices now include migration0027, validation/serializers, account/group locks, durable rate counters and invite/leave/remove paths. Agent-reported build PASS for that slice is provisional until coordinator final verification. No SQL migration or fixture writes have occurred.

Read-only guarded migration preflight confirms approved fingerprint afbbdfd482dea1c4fab2ea27b35f2c2223c86c769fda15164d0401fceeeace5d,26 existing migration checksums match source and sole pending0027_phase22_study_groups.sql. No migration executed. Coordinator source review identified separate clock_timestamp evaluations at invitation consume expiry edge; remediation requested to use one post-lock database instant. Backend persisted methods/API frozen contract now stable enough for LNG-22-003 implementation to start in parallel with remaining Backend verification; integration004 still dependent on both completed implementations.

## Actual SQL and full Backend verification checkpoint

First correct ESM SQL launch failed because pooled Neon rejects search_path startup options. Official Neon connection-errors guidance confirms unsupported PgBouncer startup parameters require unpooled connection; harness accepts exact approved pooled input and derives only same-instance direct host, rechecks database/public/PostgreSQL18 before random schema creation. No schema-isolation weakening. Corrected actual service/HTTP run:2 suites20 tests PASS,145.417 seconds, independent processes and real lock waits. Post-run read-only namespace probe residual0. Additional cases were added during that run and were not counted as covered; final expanded rerun is in progress. Public0027 migration remains NOT_RUN.

Backend reported full unit153 suites890 tests PASS; e2e20 suites143 tests PASS; lint/typecheck/build PASS; audit high gate PASS,0high/critical,20moderate transitive development findings; omit=dev audit0 vulnerabilities. Final independent source/harness review pending; no Backend integration/CI/deploy success claimed. Frontend source first increment4 transport/capability tests PASS; complete pages/browser acceptance remain pending.

Independent source/harness review: exact generated-schema cleanup and credential handling sound; actual PostgreSQL constraints, separate worker processes, observed lock waits, rollback and HTTP identity/session proof credible. Remaining targeted proof requests: revoke/accept both lock orderings, typed GROUP_UNAVAILABLE denial assertions and expired rate-window reset. Frozen ACTIVE affected-account rule preserved: disabled member stays retained and consumes capacity, cannot be removed/promoted while disabled; disabled owner cannot transfer until recovery/separately reviewed policy. Phase20 memory model had no account-disable capability to preserve. No protected access granted to disabled accounts or platform-role bypass. Real rollout remains held.

Expanded actual SQL/HTTP rerun2suites22tests PASS168.407seconds,exit0; remote transaction-age probe showed ongoing progression, no forced termination. Final targeted revoke/accept-order and denial/reset assertions still pending. Branch-protection read API returned404; protection details unverified, no policy mutation or bypass.

Final source review corrected inherited database isolation: explicit BEGIN ISOLATION LEVEL READ COMMITTED. Meaningful transaction-helper regression observed RED then focused20tests PASS; typecheck/build PASS. Expanded final SQL run includes overriding connection defaultREPEATABLE READ and querying actualtransaction isolation, both observed revoke/accept orderings, precise policy-denial codes (including independentworker losers), and persisted expired rate-window reset. Run in progress, not yet PASS. Frontend review remediated token resurrection after denied refresh and incomplete ARIA tab semantics; roleloss secret clearing requested.

Final SQL proof observed2suites25tests PASS171.586seconds; exactisolationschema cleanup probe residual0. Actual count25 supersedes agentestimated26. Phase20/private focused2suites47tests PASS4.891seconds. Finalreviewed Backend committed b46689135d4f4e947f3db7ad08023f162df01265 and pushed phase/22-backend; PR/CI integration pending. Staged22files2164insertions1deletion inspected, diffcheckPASS. Publicschema0027 stillNOT_RUN.

Backend PR44 merged exact reviewedb46689135d4f4e947f3db7ad08023f162df01265 to maine30d0a41a760a8e0c9e36f0b841fa85ba270db37. PRquality112638330952 and mainquality112638929773 SUCCESS, including mandatoryPostgreSQL18 proof. Reviewedhead/main trees identical (initial unquoted PowerShell revision error corrected before verification). Localmainffsynced, remote/localphase/22-backend deleted and refspruned; no unique work lost.

Guarded approvedTEST migration ran through establishedchecksumrunner:26 unchangedSKIP,sole0027APPLY/DONE; identityfingerprintcheckedbeforewrites;GUARDED_TEST_MIGRATION=PASS. No productionmutation. Render currentlyLiveold d56fc2c518a617018d6926bf63b482572268a1ef, autoDeployOFF; newTESTdeployment pending. LNG-22-002 Backend integration gatePASS, deployedintegration004 stillpending.

Render exacte30d0a41a760a8e0c9e36f0b841fa85ba270db37 TESTdeploy dep-db2t4rc9v7es73a69mog succeededLive, initiated12:02:37Asia/Saigon, duration1m06s; buildlogscheckedexactSHA, correctednpmci command retained, startupsuccess. Noenv/provider/secretchanges. Rollbacktarget previousLived56fc2c518a617018d6926bf63b482572268a1ef; additiveemptygroupmigrationnotdowngraded onrollback. Runtimeacceptancepending.

Syntheticruntime setup initiallyreportedgenericfailure. Exactreadonlyprobe proved SETUP_PENDINGwith4registeredactors committed; initialbeforewrite assumption corrected. FailurewasrepeatedWindowsfreshDirectorySecurity save, notfixtureSQL. DACL-onlyicacls preservesowner/SACL and verifiescurrentuseronly; recoveredexact4ACTIVEmailverifiedactors withoutduplicateinserts,SETUP_READYPASS. Registryprivateoutsidegit, passwordsnotlogged; rawbearer/invitesneverpersisted. Exactcleanuprequired afterHTTP/browser. Frontendcandidate83f567704e472a2e48fcf39220b8791a7ced0636 committed/pushed; PR28open,408testsPASS,25focused,linter/type/buildPASS,audit0; browseracceptancepending.

Deployed Render actualHTTP acceptancePASS: four synthetic sessions bound by exactsid/sub to approvedTEST DB beforegroupwrites; create/detail/member/nonmember, owner-onlyinviteaccept/replay/revoke, moderatoroverreach/removal, immediate staleaccessdenial, leave/rejoin, oldownerdowngrade/transfer/archive, boundedoutsiderlist/count and no-store checked. Paymentavailablefalse,QRfalse,providernull. Fouractors/twogroups retainedonlyforbrowser; cleanupstillNOT_RUN. Browser320guestDOMobservedinnerWidth320,scrollWidth320 using deviceemulation (windowresize minimum500 was caught, notreported320PASS). Sevenwidthauthenticatedacceptancepending.
