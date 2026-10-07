# LNG-19-006 implementation — bounded multilingual UI

## Authority and boundary

The human owner explicitly authorizes IMPLEMENT_LNG_19_006=YES on 2026-10-06,
including initial UI locales Vietnamese (`vi`) and English (`en`). This is a
separately approved implementation initiative for the [portfolio recommendation](../../phases/PHASE-19-GROWTH-V2/PORTFOLIO.md),
not reopened Phase 19 discovery and not Phase 20. Discovery remains DONE under
PRE_LAUNCH_GROWTH_V2_DISCOVERY. This record supersedes the earlier absence of
implementation authorization only for this bounded initiative. No user demand is proven.

```text
LNG_19_006_IMPLEMENTATION_AUTHORIZED=YES
LNG_19_006_IMPLEMENTATION_STATUS=READY_FOR_PRODUCTION_AUTHORIZATION
IMPLEMENTATION_COMPLETE_PRE_PRODUCTION=YES
SUPPORTED_UI_LOCALES_INITIAL=vi,en
DEFAULT_UI_LOCALE=vi
FALLBACK_UI_LOCALE=vi
PHASE_19_DONE=YES
PHASE_20_STARTED=NO
EN_COPY_HUMAN_REVIEW=NOT_PERFORMED
```

## Ordered implementation tasks

| Task | Capability | Canonical state |
| --- | --- | --- |
| 006A | Allowlisted typed catalogs, browser preference, fallback, Intl and document semantics | VERIFYING; technical PASS |
| 006B | Existing application shell and explicit accessible UI language control | VERIFYING; technical PASS |
| 006C | Complete public Library browse/search/filter/detail/error/accessibility journey | VERIFYING; technical PASS |
| 006D | Relevant regression, isolated browser acceptance, review and evidence | VERIFYING; pre-production PASS |

006A -> 006B -> 006C -> 006D auto-continue within this explicit initiative.
Integration states remain VERIFYING until applicable merge gates are met.
Terminal relays apply to the initiative/subphase and must not generate Phase 20.
Use incremental capability commits on one scoped Frontend PR: production coupling
prevents independent main integration before authorization, but does not prevent
finishing all safe local/TEST implementation and preparing the reviewable PR.

## Architecture and scope

Audit baseline React 18, React Router, TypeScript, Vitest/testing-library, CSS
Modules; no localization dependency exists. Use a small typed internal React
context, static feature-owned Vietnamese/English catalogs and native Intl; no new
dependency. Default vi; unknown preference -> vi. Browser storage key
`congdongngonngu.ui-locale.v1` stores only the validated locale, never a token or
profile. Storage failures retain a working tab. UI direction is ltr for both;
content direction/language remains independently represented.

UI locale never controls learning language, Library language filters, backend
language identifiers, profile state, auth/session or API payloads. Preserve
existing URLs, hashes, direct routes and history; no locale-prefixed routes.
React text interpolation only; approved error/status mappings with generic safe
fallback. Missing English entries fall back to vi; required catalogs are checked
automatically. Scope: shell plus public Library journey; contribution/reviewer,
other product page bodies and translation of resource content are excluded.

Preserve existing layout/primitives and activate the existing footer UI language
control, with a small accessible header/drawer control. Owner says not to invoke
Stitch merely to translate copy; no substantial UI redesign is planned.

## Acceptance

Meaningful foundation/shell/Library tests, catalog keys/placeholders/completeness,
fallback, locale independence, routing/history, safe errors, auth and disabled
payment regression. Full Frontend tests/typecheck/lint/build/dependency audit,
secret/diff checks, architecture and security/privacy review. Local isolated
browser fixtures only, with vi/en browse/search/detail/loading/empty/error,
switch/reload/direct URL/back/forward, keyboard/focus/accessibility, long-copy
stress, and widths 320/375/390/412/768/1024/1440. Do not claim browser or production
PASS from source inspection. English technical completeness is distinct from
human linguistic review; absence of a human review does not block TEST acceptance.

## Production integration gate

Read-only authenticated Vercel project `cong-dong-ngon-ngu`, exact Frontend
repository, production environment settings inspected 2026-10-06: Branch
Tracking says every commit pushed to `main` creates a Production Deployment;
automatic production domain assignment is enabled. Current production/main SHA
`940e278555b2d33054fb2780d7348ded59ba2c3e` is Ready. No settings were changed.

```text
FRONTEND_MAIN_MERGE_CAUSES_PRODUCTION_DEPLOYMENT=YES
HUMAN_AUTHORIZATION_REQUIRED=MERGE_FRONTEND_PR_CAUSING_VERCEL_PRODUCTION_DEPLOYMENT
```

Prepare all implementation, tests, runtime acceptance, reviews, commit/push/PR/CI
and Workspace evidence before requesting the final specific merge authorization.
Do not merge Frontend main. Candidate SHA/PR/gates and rollback revision will be
recorded in [evidence](EVIDENCE.md). Source branch is deliberately retained while
unmerged, not a stale merged branch. Workspace-only integration is permitted.
No Backend/env/DB/migration/telemetry/provider/payment or production mutation,
production DB query or Phase 20. Rollback is the exact current production SHA;
any production rollback itself requires authorization.

## Current handoff — 2026-10-07

Frontend [PR #27](https://github.com/CongDongNgonNgu/CongDongNgonNgu-Front-End-Web/pull/27)
is open at `ed681f034a925c62e91dfed60ca36571f083adc3`; CI and Vercel preview
metadata pass. All local technical acceptance passes. Integration stays VERIFYING
and the unmerged Frontend branch is retained pending the exact production merge
authorization. No production release is claimed. See [evidence](EVIDENCE.md) for
test counts, reproducible isolated runtime tooling, privacy/security review and
terminal relay records. English human translation review remains NOT_PERFORMED.
