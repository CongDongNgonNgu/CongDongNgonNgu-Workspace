# Phase 03 Tasks

## LNG-03-001 — Extensible Language Catalog
**Status:** DONE
**Depends on:** Phase 02

Create a stable language model using standard language identifiers where practical, native/English/Vietnamese display names as localization permits, script/direction metadata if needed later, active/launch flags and safe slug strategy. Seed the eight initial languages idempotently. Do not create one table/enum branch per language.

## LNG-03-002 — User Language & Proficiency Model
**Status:** DONE
**Depends on:** LNG-03-001

Represent native/known/learning relationships, proficiency, primary learning target and visibility. Enforce valid combinations without blocking multilingual/native users. Track user-declared vs assessed level separately if assessment is added later.

## LNG-03-003 — Goals, Skills, Interests, Timezone & Availability
**Status:** DONE
**Depends on:** LNG-03-002

Capture learning goals and preferred skills (speaking/listening/reading/writing/grammar/vocabulary), optional interests for matching, timezone and opt-in availability windows. Use normalized/configurable values where matching/filtering requires structure. Privacy defaults must not expose schedule details more broadly than needed.

## LNG-03-004 — Onboarding UX
**Status:** DONE
**Depends on:** LNG-03-001..003

Use Stitch before implementation. Ask only information needed for immediate personalization: what the user speaks, what they want to learn, current level, goals/skills and optional interests/timezone/availability. Support skip/defer for nonessential questions. Persist progress safely so refresh/back does not corrupt profile. Avoid a long bureaucratic wizard.

## LNG-03-005 — Language Passport Profile
**Status:** DONE
**Depends on:** LNG-03-002..004

Use Stitch. Show native/learning languages and levels, goals, later-ready slots for Learning XP/Reputation/Achievements without fake values. Provide own-profile editing and privacy controls; public view exposes only permitted fields. Design supports multilingual users and long language names.

## LNG-03-006 — Profile API & Authorization
**Status:** DONE
**Depends on:** LNG-03-002..005

Create read/update endpoints with ownership checks, input validation, safe public/private projections and stable error responses. Prevent editing another user's language data by ID manipulation.

## LNG-03-007 — Reconciliation & Analytics Events
**Status:** DONE
**Depends on:** LNG-03-001..006

Test onboarding completion, edit flows, catalog extension and privacy. Add minimal privacy-safe product analytics events if an approved analytics foundation exists; do not block the phase on analytics provider setup. Update handoff with seeded catalog and journey evidence.
