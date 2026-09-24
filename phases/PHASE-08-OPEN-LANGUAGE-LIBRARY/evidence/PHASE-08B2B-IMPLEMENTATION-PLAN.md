# Phase 08B2B implementation plan — community contribution frontend

Date: 2026-09-24
Slice: `LNG-08-004`
Status: `VERIFYING`

## Frozen boundaries

- Backend review branch remains `phase-08b2a-community-contribution` at
  `80df2dd0652c3fba024caf1224917e73b609a1d7`.
- Frontend starts from `4137f51e392f8aa947768e7dc7a28a29bf64f206` on
  `phase-08b2b-community-contribution-ui`.
- Workspace starts from the accepted 08B2A runtime head
  `fabb010f8d772c60cd1c2d4ae91bd9f651f761a5` on
  `phase-08b2b-community-contribution-ui`.
- Migration 0011 is applied and frozen on Neon TEST. No migration, database,
  Backend source, production environment, or deployment is changed in this
  slice.

## Stitch direction

The existing Phase 08 Stitch project remains available:

- Project: `projects/14639103242845084916`
- Design system: `assets/14598ca45330472eba73ac1364754513`
- Canonical Prompt B was used for the contribution-focused screens.
- Desktop form: `1df94141ffbc4fafb1af089cd18ee90b`
- Mobile form: `976107c844e24cd1a6683aa953aeba81`
- Consent/review: `9c47ac409df0464c8cbea91e277a565a`
- Success: `4ad7aaa290e94ef39e92d2b0a214c37e`
- No eligible license: `952edc5815df4c25a2f17f7de8a47781`

The implementation will reuse the existing Be Vietnam Pro, navy, orange,
card, field, and focus language. Stitch-only fields that are not present in
the frozen Backend DTO are intentionally excluded.

## Vertical implementation slices

1. Define the contribution policy, license, form snapshot, stage, validation,
   payload, and safe error contracts in focused feature modules.
2. Add the policy/language loading hooks and authenticated API adapter using
   the existing `AuthApi.requestPublic()` and `requestProtected()` transport.
3. Add the authenticated `/library/contribute` route and safe login return
   path, then add a quiet `/library` explorer entry.
4. Implement the four-step responsive form: type, content, source/license,
   and confirmation. Keep attribution explicit and privacy-safe; keep both
   consent controls initially unchecked.
5. Implement the staged remote orchestration: create PUBLIC draft, attach
   ORIGINAL_AUTHOR provenance with a deterministic source ID, then submit
   contribution. Preserve the resource ID across provenance/submit retries and
   freeze the snapshot after remote creation starts.
6. Add fail-closed policy, stale-terms refresh, partial-failure, success, and
   no-license states without creating a local draft manager.
7. Add unit/component tests, run the frontend quality gates, capture final UI
   screenshots at controlled viewports, and perform responsive/accessibility
   browser verification.

## Frozen Backend contract used by the UI

- `GET /library/contribution-policy` is the authority for terms version,
  approved resource types, and safe eligible licenses.
- The initial type allowlist is exactly `VOCABULARY`, `SENTENCE`, and
  `TRANSLATION`.
- `POST /library/resources` creates a `PUBLIC` draft.
- `POST /library/resources/:resourceId/provenance` receives only
  `ORIGINAL_AUTHOR`, a deterministic source ID, selected license key, and
  explicit public attribution. The client never sends
  `originalContributorUserId`.
- `POST /library/resources/:resourceId/submit-contribution` receives the
  policy-provided terms version and exact boolean consent values.
- A successful submission enters `COMMUNITY_REVIEW`; it is not verified and
  is not linked to a public detail page.

## Main risks and controls

- No eligible license: block submission and explain the policy state.
- Terms changed: refresh policy, clear both consents, and require a fresh
  review; never auto-resubmit.
- Network failure after create: retry the same stage and resource ID; never
  create a second draft for provenance/submit retries.
- License becomes ineligible: fail closed, refresh policy, and do not attach
  replacement provenance automatically.
- Public identity leakage: collect only an explicit attribution label and do
  not render or submit email, account ID, or private profile data.
- Reload after a partial remote operation is outside this slice; there is no
  localStorage/sessionStorage draft or consent persistence.

## Evidence to complete

- `PHASE-08B2B-IMPLEMENTATION.md`
- `PHASE-08B2B-IMPLEMENTATION-DESKTOP.png`
- `PHASE-08B2B-IMPLEMENTATION-MOBILE.png`
- `PHASE-08B2B-IMPLEMENTATION-LICENSE-CONSENT.png`
- `PHASE-08B2B-IMPLEMENTATION-SUCCESS.png`
- `PHASE-08B2B-IMPLEMENTATION-NO-LICENSE.png`

Owner visual acceptance remains external and must remain `PENDING` after
implementation, even if automated tests and browser checks pass.
