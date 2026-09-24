# Phase 08B2B implementation evidence — community contribution frontend

Date: 2026-09-24
Slice: `LNG-08-004`
Status: `PUBLISHED`

## Boundary and accepted dependencies

```text
BACKEND_SHA=80df2dd0652c3fba024caf1224917e73b609a1d7
BACKEND_CHANGED=NO
FRONTEND_BASE_SHA=4137f51e392f8aa947768e7dc7a28a29bf64f206
FRONTEND_REVIEW_SHA=a46194853b4da7cfa8d41d6e155f92ab908c4ff4
WORKSPACE_BASE_SHA=fabb010f8d772c60cd1c2d4ae91bd9f651f761a5
MIGRATION_0011_TEST=APPLIED
MIGRATION_0011_FROZEN=YES
TEST_DB_MUTATED=NO
PRODUCTION_DB_MUTATED=NO
DEPLOYED=NO
```

No Backend source, migration, database, production environment, or deployment
was changed in 08B2B. The accepted Backend contract was treated as frozen.

## Stitch references

Existing Phase 08 Stitch project and its established design system were reused
with canonical Prompt B, focused on the community contribution portion:

```text
STITCH_PROJECT=projects/14639103242845084916
STITCH_DESIGN_SYSTEM=assets/14598ca45330472eba73ac1364754513
STITCH_DESKTOP=1df94141ffbc4fafb1af089cd18ee90b
STITCH_MOBILE=976107c844e24cd1a6683aa953aeba81
STITCH_CONSENT=9c47ac409df0464c8cbea91e277a565a
STITCH_SUCCESS=4ad7aaa290e94ef39e92d2b0a214c37e
STITCH_NO_LICENSE=952edc5815df4c25a2f17f7de8a47781
```

The screens were inspected before implementation. The final captures below
are implementation captures, not Stitch rasters.

## Route and policy behavior

- Added authenticated `/library/contribute`; loading remains non-jarring,
  unauthenticated access redirects to `/login` with
  `location.state.from=/library/contribute`.
- Added a quiet `Đóng góp tài nguyên` entry to `/library`; search, filtering,
  pagination, and public detail behavior remain unchanged.
- The policy request uses the existing authenticated transport adapter:
  `GET /library/contribution-policy` through `requestPublic()`.
- The UI exposes only the explicit initial allowlist returned by policy and
  intersected with `VOCABULARY`, `SENTENCE`, and `TRANSLATION`.
- Licenses are rendered only from the safe policy projection. An empty license
  list blocks the form and submission fail-closed; no license is silently
  selected.
- The exact policy `termsVersion` is carried into the submit payload. A stale
  terms response refreshes policy, clears both consents, moves the user back
  to the review step, and permits only fresh consent before retrying submit
  against the same resource. A changed-license response fails closed, refreshes
  policy, and never attaches replacement provenance automatically.

## External review remediation

- Step 0 now validates resource type, language metadata, CEFR, and topics. Step
  1 validates only type-specific content. Invalid topic syntax and more than 20
  topics keep the user on step 0, show the error beside the topics control, and
  restore focus to the visible topics input.
- The success region forwards its ref to the actual `section` with
  `tabIndex=-1`, so successful submission moves focus into the named success
  landmark without adding a positive tab stop.
- The first eligible license radio has a deterministic ID and license errors
  focus that interactive control instead of the non-focusable error paragraph.
- Disabled, unknown, or redistribution-unsafe license responses refresh policy
  and fail closed after provenance succeeds. The frozen draft is not silently
  rewritten, replacement provenance is not attached, no generic retry is
  offered, and an explicit “Bắt đầu đóng góp mới” action is the only way to
  begin another attempt; no second draft is created automatically.
- Stale terms behavior remains distinct: policy refresh, both consents cleared,
  fresh re-consent, and submit retry against the same resource.

## Form and privacy contract

The flow has four logical steps: resource type, content, source/license, and
review/submit. Fields are type-specific and use the active language catalog:

- Vocabulary: primary language, optional CEFR/topics, term, definition,
  optional part of speech and example sentence.
- Sentence: primary language, optional CEFR/topics, sentence and optional
  context.
- Translation: source/target language, optional CEFR/topics, source and
  translated text; source and target must differ.

Validation normalizes bounded text, validates active languages, enforces the
Backend-aligned topic and content limits, rejects unsupported fields, and
focuses the first invalid labelled control. Public attribution is a required,
user-entered string. Email, account ID, display name, and private profile
fields are neither inferred nor submitted.

The license step requires an explicit radio selection and shows only safe
display name, canonical URL, attribution requirement, and derivative
constraints. External links use a new tab with `noopener noreferrer`.

The final step uses two real unchecked checkboxes. Submission requires exact
boolean `true` values for rights confirmation and reuse consent. Copy states
that the contribution enters review and is not immediately verified or public.

## API sequence and retry state machine

```text
CREATE_RESOURCE
  POST /library/resources
  visibility=PUBLIC
        ↓
ATTACH_PROVENANCE
  POST /library/resources/:resourceId/provenance
  sourceType=ORIGINAL_AUTHOR
  sourceId=community-contribution:<resourceId>
  licenseKey + explicit attribution
        ↓
SUBMIT
  POST /library/resources/:resourceId/submit-contribution
  policy termsVersion + rightsConfirmed=true + reuseConsent=true
        ↓
SUCCESS: COMMUNITY_REVIEW only
```

The hook tracks `IDLE`, create/provenance/submit busy states, each failed
stage, and `SUCCESS`. Once remote creation begins, the form snapshot is frozen.
Create failure retries creation; provenance failure retries provenance against
the same resource ID; submit failure retries only submission against the same
resource ID. No stage-2 or stage-3 retry creates another draft. Reload/resume
of a partially-created remote draft is intentionally outside this slice and no
consent or draft data is persisted in browser storage.

The success state links only back to the explorer or a fresh contribution; it
does not link to `/library/:resourceId` because the resource is not public
before verification and public gates pass.

## Tests and browser verification

Focused contribution and Library suites: **25 tests passed** across four test
files, including policy loading, exact types, zero-license fail-closed state,
unchecked consent, payload sequencing, attribution/privacy, retry reuse of the
same resource ID, stale terms refresh/reset, topic-step validation and focus,
license focus, permanent license-policy failure handling, and the explorer CTA.

Full frontend suite: **42 files / 199 tests passed**. Typecheck, lint, and
production build passed. `npm audit --audit-level=high` reported **0
vulnerabilities**. `git diff --check` passed.

For controlled visual verification, a transient local fixture rendered the
actual contribution page/components with policy and language fixtures; it was
removed before the frontend commit. Final implementation captures are:

| Capture | Viewport |
| --- | --- |
| `PHASE-08B2B-IMPLEMENTATION-DESKTOP.png` | 1440×900 |
| `PHASE-08B2B-IMPLEMENTATION-MOBILE.png` | 390×900 |
| `PHASE-08B2B-IMPLEMENTATION-LICENSE-CONSENT.png` | 1440×900 |
| `PHASE-08B2B-IMPLEMENTATION-SUCCESS.png` | 1440×900 |
| `PHASE-08B2B-IMPLEMENTATION-NO-LICENSE.png` | 1440×900 |

Exact emulated widths 320, 375, 390, 412, 768, 1024, and 1440 reported no
horizontal overflow or out-of-viewport elements. Lighthouse accessibility
scored **100** on both desktop and mobile contribution-form checks after the
remediation; the final browser pass had no console errors or warnings. The
focus and error-state remediations do not alter the captured form, consent,
success, or no-license pixels, so the existing implementation captures remain
valid.

## Pre-publication stop state (historical)

```text
CURRENT_PHASE=08
PHASE_08=IN_PROGRESS
LNG_08_001=DONE
LNG_08_002=DONE
LNG_08_003=DONE
LNG_08_004=VERIFYING
LNG_08_005=PLANNED
LNG_08_006=PLANNED
LNG_08_007=PLANNED
LNG_08_008=PLANNED
OWNER_VISUAL_ACCEPTANCE_08B2=PENDING
NEXT_SLICE=08B2B
NEXT_ACTION=STOP_FOR_EXTERNAL_AND_OWNER_VISUAL_REVIEW
```

This was the implementation-stage stop state before external owner acceptance
and final publication. The current published state is recorded below.

## Final publication closure

Owner visual acceptance was granted before publication. Backend and Frontend
were fast-forwarded to their accepted review heads only after clean preflight
and exact-SHA CI success. No merge commit, force push, deployment, production
database access, or Neon connection occurred during publication.

```text
OWNER_VISUAL_ACCEPTANCE_08B2=YES
BACKEND_MAIN_SHA=80df2dd0652c3fba024caf1224917e73b609a1d7
BACKEND_CI_RUN=35976930338
BACKEND_CI=SUCCESS
FRONTEND_MAIN_SHA=a46194853b4da7cfa8d41d6e155f92ab908c4ff4
FRONTEND_CI_RUN=35977132211
FRONTEND_CI=SUCCESS

MIGRATION_0011_TEST=APPLIED
MIGRATION_0011_FROZEN=YES
MIGRATION_0011_CHECKSUM_MATCH=YES
MIGRATION_RERUN=NO
MIGRATION_0012_CREATED=NO
PRODUCTION_DB_MUTATED=NO
DEPLOYED=NO
```

Backend contribution evidence carried into publication: policy API PASS;
approved types VOCABULARY/SENTENCE/TRANSLATION; explicit contribution terms;
PUBLIC DRAFT to COMMUNITY_REVIEW only; generic review bypass denied;
owner-bound actor and ORIGINAL_AUTHOR provenance; fail-closed licenses;
ACTIVE moderation; explicit rights and reuse consent; durable
LIBRARY_CONTRIBUTION_SUBMITTED v1; atomic audit/event/state transition;
event idempotency; no Phase 10 points; Neon TEST runtime PASS; license lock
PASS; provenance race PASS; HTTP DB-backed PASS; and DB constraints PASS.

Frontend publication evidence: `/library/contribute`; safe auth return path;
Explorer CTA; policy-driven types/licenses; Vocabulary, Sentence, and
Translation forms; explicit attribution and license selection; unchecked
consents; create -> provenance -> submit; no duplicate draft on partial retry;
stale-terms re-consent; permanent license-policy fail-closed behavior;
COMMUNITY_REVIEW-only success; no public detail link; topic, license, and
success focus remediation; responsive 320/375/390/412/768/1024/1440; and
Lighthouse Accessibility 100 on desktop/mobile.

The canonical project state is now `LNG_08_004=DONE` with Phase 08 remaining
in progress. The next planned slice is `08C` / `LNG_08_005`, Review &
Verification Workflow; it was not started here.
