# Phase 06B — Ask for Correction / Ask a Language Question

Date: 2026-09-15
Scope: Frontend request creation flows only

## Scope boundary

Phase 06B adds the two authenticated Community request forms and their
integration points. It does not implement correction proposals, answer
creation, inline diff, acceptance, voting, reputation, Library promotion,
audio, AI, or Backend changes.

The parent Phase 06 remains IN_PROGRESS. LNG-06-002 remains VERIFYING pending
owner visual/runtime acceptance at the time of the historical implementation
record.

## Canonical routes

~~~text
CORRECTION_ROUTE=/community/ask/correction
QUESTION_ROUTE=/community/ask/question
SUCCESS_ROUTE=/community/posts/:postId
~~~

Both routes are registered directly in src/App.tsx, so direct navigation and
browser refresh use the normal router. Unauthenticated visitors enter the
existing /login flow with an internal from return intent; successful login
returns to that route. The existing Community page exposes the two explicit
actions beside the accepted composer entry point.

## Stitch references

The existing canonical Stitch project 3718538619973058970 and its existing
Be Vietnam Pro/light Community design system were used.

~~~text
CORRECTION_STITCH_DESKTOP=a56a1cedd4114100a782e4c7301513eb
CORRECTION_STITCH_MOBILE=9393cd111a034479a2c09788dd51928b
QUESTION_STITCH_DESKTOP=eca2af388e8d46708f1ec2b265770c4d
QUESTION_STITCH_MOBILE=0b46e5a864f84e8582aa5737fe221563
~~~

The four screens preserve the existing Community visual language: light
editorial surface, navy/orange/green tokens, spacious two-column desktop
layout, single-column 390px layout, original text as the primary learning
object, and no gradients or AI/admin controls.

## API and payload contract

The Frontend adapter calls the published Backend endpoints through
authApi.requestProtected:

~~~text
POST /api/v1/community/correction-requests
POST /api/v1/community/questions
GET  /api/v1/community/correction-requests/:postId
GET  /api/v1/community/questions/:postId
~~~

Correction submits only languageCode, originalText, correctionIntent, optional
context, optional cefrLevel, optional topic, and visibility. Question submits
only languageCode, content, optional cefrLevel, optional topic, and visibility.
The correction redirect uses response.post.id; the question redirect uses the
returned Community post id.

The target-language select is populated from the existing catalog and filters
to active languages only. Canonical intent values remain:

~~~text
GRAMMAR, STYLE, NATURALNESS, PRONUNCIATION
~~~

Client validation uses Array.from(value).length through the existing
Unicode-safe utility. It rejects whitespace-only required text, enforces
20,000 code points for original/question text, 5,000 for correction context,
and 80 for topic. Original text and question content are sent exactly as held
in React state; validation never replaces, trims, lowercases, normalizes,
collapses, autocorrects, or reformats the submitted value.

The forms prevent duplicate submit while the request is pending, retain input
after API failure, expose live character counts/status, and map 400/401/403/
404/409/429/5xx responses to friendly Vietnamese messages without automatic
resubmission.

## Automated verification

~~~text
TESTS=139 PASS / 29 suites
TYPECHECK=PASS
LINT=PASS (npm run lint delegates to tsc --noEmit)
BUILD=PASS
NPM_AUDIT=PASS (0 vulnerabilities)
~~~

Focused Phase 06B coverage includes:

- exact whitespace/newline/Unicode preservation;
- Unicode code-point boundaries and whitespace-only rejection;
- exact correction/question endpoint payloads;
- active language filtering;
- all four correction intents;
- supported-field-only question payload;
- one-submit locking;
- retained input after 429/500 failures;
- real post-id success redirects.

## Browser evidence

Browser verification used Chrome DevTools MCP against the local Vite runtime.
Auth and catalog responses were isolated test-only browser stubs; no
production code contains those stubs and no Neon TEST creation was claimed.

~~~text
RESPONSIVE_320=PASS (no horizontal overflow)
RESPONSIVE_375=PASS (no horizontal overflow)
RESPONSIVE_390=PASS (no horizontal overflow)
RESPONSIVE_412=PASS (no horizontal overflow)
RESPONSIVE_768=PASS (no horizontal overflow)
RESPONSIVE_1024=PASS (no horizontal overflow)
RESPONSIVE_1440=PASS (no horizontal overflow)
APPLICATION_CONSOLE_ERRORS=0
UNEXPECTED_NETWORK_ERRORS=0
LIGHTHOUSE_MOBILE=100 accessibility / 100 best-practices / 100 SEO / 100 agentic browsing
LIGHTHOUSE_DESKTOP=100 accessibility / 100 best-practices / 100 SEO / 100 agentic browsing
~~~

The browser screenshot export endpoint rejected paths under the shared
workspace sandbox, so runtime PNG and side-by-side artifact files were not
captured in this turn. The live a11y snapshots, layout metrics, console
check, network check, and Lighthouse reports were completed. Owner visual
acceptance remains pending.

~~~text
HISTORICAL_CORRECTION_RUNTIME_DESKTOP=UNAVAILABLE_SCREENSHOT_EXPORT
HISTORICAL_CORRECTION_RUNTIME_MOBILE=UNAVAILABLE_SCREENSHOT_EXPORT
HISTORICAL_QUESTION_RUNTIME_DESKTOP=UNAVAILABLE_SCREENSHOT_EXPORT
HISTORICAL_QUESTION_RUNTIME_MOBILE=UNAVAILABLE_SCREENSHOT_EXPORT
HISTORICAL_CORRECTION_SIDE_BY_SIDE_DESKTOP=UNAVAILABLE_SCREENSHOT_EXPORT
HISTORICAL_CORRECTION_SIDE_BY_SIDE_MOBILE=UNAVAILABLE_SCREENSHOT_EXPORT
HISTORICAL_QUESTION_SIDE_BY_SIDE_DESKTOP=UNAVAILABLE_SCREENSHOT_EXPORT
HISTORICAL_QUESTION_SIDE_BY_SIDE_MOBILE=UNAVAILABLE_SCREENSHOT_EXPORT
HISTORICAL_VISUAL_CORRECTION_1440=REVIEW
HISTORICAL_VISUAL_CORRECTION_390=REVIEW
HISTORICAL_VISUAL_QUESTION_1440=REVIEW
HISTORICAL_VISUAL_QUESTION_390=REVIEW
~~~

## Neon TEST and release boundary

~~~text
HISTORICAL_CORRECTION_CREATE_RUNTIME=UNVERIFIED
HISTORICAL_QUESTION_CREATE_RUNTIME=UNVERIFIED
SUCCESS_REDIRECT=PASS (isolated browser/component verification with real returned IDs)
HISTORICAL_NEON_TEST_UI_CREATION=NOT_RUN
BACKEND_CHANGED=NO
BACKEND_SHA=81fa51780ef43193eaf50cd41b517d1b917c71b5
PUSHED=NO
DEPLOYED=NO
PHASE_06C_STARTED=NO
PHASE_06D_STARTED=NO
~~~

No Backend migration, Neon reset, deploy, push, remote branch, or next Phase
slice was started.

## Current runtime verification and screenshot remediation

The historical blocker above is superseded by
[PHASE-06B-RUNTIME-VERIFICATION.md](./PHASE-06B-RUNTIME-VERIFICATION.md).
The exact Backend SHA ran against Neon TEST, real authenticated Correction and
Question creations returned HTTP 201, each real post was retrieved with HTTP
200, and Playwright exported the four populated runtime screenshots into the
existing phase-06b evidence directory.

The final visual review is documented in four comparison files:

~~~text
CORRECTION_SIDE_BY_SIDE_DESKTOP=phase-06b/comparison_correction_desktop.md
CORRECTION_SIDE_BY_SIDE_MOBILE=phase-06b/comparison_correction_mobile.md
QUESTION_SIDE_BY_SIDE_DESKTOP=phase-06b/comparison_question_desktop.md
QUESTION_SIDE_BY_SIDE_MOBILE=phase-06b/comparison_question_mobile.md
VISUAL_CORRECTION_1440=PASS
VISUAL_CORRECTION_390=PASS
VISUAL_QUESTION_1440=PASS
VISUAL_QUESTION_390=PASS
MATERIAL_DIFFERENCES=NONE
~~~

The focused local Frontend remediation commit is
c85c9415c359a42919db0e29534177aa1ccc576b. It also makes the existing async
redirect assertions deterministic. Backend and database state were not
changed. Owner acceptance is now recorded in the reconciliation commit below;
LNG-06-002 is DONE.

## Local commits

~~~text
FRONTEND_BRANCH=phase-06b-request-ui
HISTORICAL_FRONTEND_SHA=04b452b62b3a0dbeec8df9f4b60403d4d3e7932e
FRONTEND_WORKTREE=CLEAN at evidence capture
~~~
