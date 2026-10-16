# LNG-28-002 implementation evidence

Status VERIFYING; product source, review, CI, merged main, TEST discovery and branch cleanup verified; final Workspace lifecycle pending.

Frontend branch feat/phase28-community-discovery; commits85cf53e and bbe7e537ae1de44f5dd5b35c7e41f17812b0a86a; PR46. Backend unchanged b3be9e28c6c4596ded3ed35726c57846ec8870da.

## Change and preservation

Aligned44px search/selector controls with top-aligned field shells, native progressive-filter disclosure with canonical icons/expanded state, compact Community intro, distinct bilingual language-discovery card, concise separate safety section, no-result clear action. Explore Community/Language/contribution links now real product routes; Exchange future-availability copy corrected and real /exchange CTA added. Affected CTA labels/introduced copy use existing VI/EN catalogs. Other historical Home prose remains outside this bounded localization change.

Search parser, serializer, API, hook/auth generation guards, cursor/pagination and backend untouched. No client-side corpus filtering or new capability/API. Feed/detail action implementation remains003; structured cleanup004. Existing domain/security/private-group/provenance boundaries preserved.

## Verification

RED tests first proved old anchor routing and absent summary aria-expanded; GREEN8 focused tests. New bilingual discovery card RED missing component then GREEN with existing page/query tests. Full final bounded-worker suite138files/738tests PASS; final targeted Home/Hash/Search13tests PASS. Typecheck/lint/build PASS; audit0 vulnerabilities; performance budget PASS (initialJS148071gzip, CSS11039gzip at measured build). Final CSS-only advanced-row alignment remediation built successfully. Initial fullparallel run failed obsolete Community-anchor expectation plus an unrelated Challenge async timeout; corrected anchor regression and isolated Challenge11tests passed, then entire bounded-worker full suite passed. No timeout increase/skipped test.

Independent source review /root/phase28_contract_review APPROVE; stale Exchange copy and weak partner-link test addressed. Reviewer independently verified Unicode via Node; read-only cache denial prevented independent test rerun and is not claimed as extra test proof.

Pre-merge native built preview: all6 expanded search controls44px; primary/advanced row tops aligned after remediation; no horizontal overflow1920; native details open and aria-expanded true agree. Preview API unavailable because local proxy Backend absent; no runtime acceptance from this preview. Actual deployed TEST acceptance follows exact merged source.

## Deployed native discovery checks

PR46 merged main904f842938e2c079c2a74fc20ba44bf0e77c8f5d; PR CI38847962232 and push CI38848130349 PASS. Reviewed tree d51d646f4ee6f8d953107a0e7d30df313cf79f2f equals merged tree. Vercel deployment3aMoJjKUaWCvRTphKFbjm1MfZTN1 Ready with exact source904f on TEST sigma domain. Discovery branch removed locally/remotely and refs pruned.

Native Chrome VI/EN discovery collapsed/expanded at320/375/390/412/768/1024/1440:28 observations; no overflow, six44px controls contained, native open agrees aria-expanded, localized discovery CTA. Explore14 observations no overflow and all5 significant CTAs contained.20 click/refresh/back/forward navigation cases pass at390/1440 across VI/EN; direct URLs for all four destinations pass. Community language card click/back/forward passes. Search draft leaves URL unchanged; Apply produces?q=coffee; refresh retains coffee; no-result Clear restores/community and empty draft. Native summary Space/Enter toggles correctly with3px focus.

Native findings: low-contrast input focus ring and21px membership link. Follow-up PR47 adds solid3px focus-visible outline and44px centered membership hit area; independent review APPROVE,9 focused tests/build PASS. Full CI and exact deployment remediation verification pending. No runtime fixture created or unrelated historical data changed. Full Phase28 responsive/interaction acceptance remains005; bounded discovery summary in NATIVE-002.json.

## Remediation and integration verified

PR47 head5a9cefdedef64b84951a6155afbb340387adab20 full CI38848954423 PASS; squash main5389c66a7854defc433f10241228e4c89e92c737 push CI38849109975 PASS. Reviewed and merged trees both1ac86f043e2db23cce9efe45dafb5ee7d5d4e693. Vercel GABGDEzn4zuz3V3AoUhZ8DiCLXFB Ready, exact source5389c66 and sigma TEST alias verified. Transient provider error resolved using its Retry button; no infrastructure change. Native filter focus now solid rgb(217,110,40)3px in VI/EN. Membership CTA44px at every required width in both locales; no overflow. Merged follow-up branch deleted local/remote, refs pruned, frontend clean synchronized main. Independent evidence review APPROVE with zero blocking findings; native events reviewed as coordinator-supplied evidence, not independently replayed. Workspace syntax,12tests and diff checks PASS.
