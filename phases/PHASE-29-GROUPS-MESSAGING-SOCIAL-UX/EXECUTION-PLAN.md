# Phase29 execution plan

Owner authorization: 2026-10-19 Asia/Saigon. Execute existing TASKS.md 001 -> 002 -> 003 -> 004 -> 005 -> 006; stop after Phase29 closeout. Historical planning-only stop statements are superseded for Phase29 only. No Phase30+, attachments, production mutation or security weakening.

## Historical001 starting baseline

Fetched/pruned all three remotes. Clean local main equals remote main:
- Frontend b15971778dbf4bd0c836e8f3e25de8d8758682e1
- Backend b3be9e28c6c4596ded3ed35726c57846ec8870da
- Workspace aa84ee714d6516fa8f855a35585baf6dd2f869c3

No AI-DOS manifest or project-local skill roots found in Workspace/Frontend. Existing dossier, Phase28 accepted handoff, Phase22 policy and Phase26/27 contracts govern scope. No roadmap renumbering.

## Ordered gates

| Task | Scope / acceptance | Verification | Dependency / state |
|---|---|---|---|
|001|Source + TEST audit, capability/permission/route freeze, verifiable benchmarks, separate desktop/mobile Stitch designs + refinement and independent review|Source citations; native audit; Workspace syntax/tests/diff; independent evidence/design review; PR/CI/merge/main/cleanup/relay|Phase28 DONE; DONE via PR170/mainCI/cleanup/accepted relay|
|002|Promote Groups/Messages in authenticated shell, account, Community; stable routes and exclusive active states; safe guest entries|Focused navigation/dropdown/route tests; full FE gates/performance/audit; VI/EN widths; independent review; exact TEST + complete lifecycle|001 DONE; DONE via PR171/mainCI/cleanup/accepted relay|
|003|Private group list/create/home/member/invite/role UX; learning-purpose description guidance|Owner/moderator/member/invited/nonmember/revoked source/API/native tests; full affected gates; exact TEST; lifecycle|002 DONE; DONE via PR172/main CI/exact tree/cleanup/accepted relay|
|004|Direct inbox/thread/composer/history/read/realtime/offline/context UX; normal connected synthetic partner send|Meaningful targeted tests + full gates; exact TEST cross-user send/persist/reload/reconnect; lifecycle|003 DONE; VERIFYING; product/API/native/cleanup complete; Workspace publication/relay pending|
|005|Audit separate group-conversation contract; implement only safely supported capability or record evidenced hold; preserve Study Group discussion|Cross-conversation/group authorization, truthful unsupported-action behavior, independent review/full lifecycle|004 DONE; PLANNED|
|006|Integrated exact-main synthetic acceptance, VI/EN seven widths/accessibility/security/cleanup, evidence/state/handoff closeout|Explicit leak counts and residual rows from actual checks; full affected gates + independent final review; complete PR/main/cleanup/relay|005 DONE; PLANNED|

Each implementation remains small and reviewable. Within 002, first navigation/active state, then shell/account/Community wiring. Within003, list/create then home/members/invites. Within004, inbox then thread/status/info. Reuse project primitives and CSS Modules; no new framework/design system. Backend changes require a reviewed bounded contract and independent security tests.

## Capability decisions

Three distinct concepts: private Study Group membership, direct pair conversation, independent multi-participant conversation. Only the first two exist. Study Group discussion already has its own text/sync/read/SSE APIs; it is not a separate conversation entity. Separate group-conversation create/add/remove is HELD pending005 contract disposition. Do not add frontend-only controls.

Group persistence has name and description only. Suggest language, goals, proficiency and topics in freeform description help; never fabricate structured metadata. Never persist or share raw invitation tokens in messages/URLs. Learning-reference sharing never grants access.

Required runtime roles and widths remain those in owner prompt and TEST-PLAN.md. Source review is not runtime PASS. The001 baseline audit created and cleaned exact-owned synthetic fixtures:28 protected API cases,0 unexpected allows/contract mismatches,21-table cleanup residual0. See NATIVE-AUDIT-001.md, API-AUDIT-001.json and FIXTURE-CLEANUP-001.json. Cross-group and cross-conversation isolation remain NOT_RUN in this one-group/one-conversation audit; final integration acceptance remains006. Phase verdict NOT_REACHED.
