# DEC-018 — Phase 09E provenance-aware learning

Status: accepted for Phase 09E / LNG-09-007, 2026-09-30.

## Decision

The `learn_from_content` path consumes only `LibraryService.getPublicResource`
projections. The public projection is the single retrieval gate for visibility,
moderation, `VERIFIED` review state, current provenance, source health and
redistributable license checks. AI learning never receives raw Library rows,
community post rows, moderation notes, contributor identifiers, audit fields,
or private profile data.

Direct community posts are not AI inputs unless they have already been
represented as an eligible Library resource with the required provenance and
license. This avoids inventing a license contract for the Community domain and
prevents an unreviewed or unlicensed post from becoming implicit learning
material.

## Contract and integrity boundaries

- `LEARN_FROM_CONTENT` is a versioned exact-key structured-output contract with
  bounded vocabulary, grammar notes, comprehension questions, mini quiz and
  speaking prompts.
- The source projection preserves the canonical resource ID, source IDs,
  attribution and license linkage inside the bounded provider input while the
  learner response exposes only safe source attribution and links.
- `DRAFT`, `COMMUNITY_REVIEW`, `REJECTED`, invalidated, quarantined, private,
  moderation-hidden, missing, duplicate or conflicting provenance fails closed.
- `AUTO_REGISTER_LICENSES=NO`; the learning path never mutates a canonical
  resource and introduces no persistence or database migration.
- Learner context, source content and the learning task remain separate
  untrusted data fields. Source content cannot become a system instruction or
  privileged role.
- Runtime execution remains provider-neutral and uses the Phase 09A usage,
  quota, rate-limit, timeout, retry and fail-closed boundaries.

## UI decision

The action and result remain on the existing Library resource detail page. The
UI visibly separates verified source content from `AI_GENERATED` study
material, renders all five typed sections, exposes safe source links, handles
anonymous/loading/error/quota/offline states, and does not contain provider
credentials. Stitch references: project `3718538619973058970`, design system
`16442026920550574436`, desktop `b2eba5cedc6c494d9e2d4c06fecd8e02`, mobile
`41ff35f0019648beac2408cfa8dfba9a`.
