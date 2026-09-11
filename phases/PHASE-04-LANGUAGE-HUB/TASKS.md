# Phase 04 Tasks

## LNG-04-001 — Language Explorer & Hub Routing
**Status:** DONE
**Depends on:** Phase 03

Implement discovery/list/search for active languages and stable `/languages/:slug` routing. Resolve unknown/inactive slugs safely. Do not encode eight language routes manually. Provide canonical language metadata to the frontend.

## LNG-04-002 — Hub Overview Data Contract
**Status:** DONE
**Depends on:** LNG-04-001

Define an overview contract for language identity, learner/contributor counts when real data exists, featured resources/community summaries and available sections. Never display invented “live” counts. Empty statistics should have honest states.

## LNG-04-003 — Hub Navigation & Section Shell
**Status:** DONE
**Depends on:** LNG-04-001, LNG-04-002

Use Stitch before implementation. Create language header/identity, level filters, section navigation and reusable body shell. Desktop and mobile may use different navigation patterns; preserve current language context when moving between sections.

## LNG-04-004 — Learning Resource Preview Surfaces
**Status:** PLANNED
**Depends on:** LNG-04-003

Create generic preview/list components for vocabulary, grammar, sentence, pronunciation and resource content that can consume real Phase 08 data later. Until then, use controlled seed/dev fixtures only in non-production or truthful empty states. Do not hardcode fake educational content into production UI.

## LNG-04-005 — Community/Question/Practice/Exchange Entrypoints
**Status:** PLANNED
**Depends on:** LNG-04-003

Define gated entry surfaces for later phases. Only enable links when implemented; otherwise expose an intentional disabled/coming-soon state if product decides it adds value. Avoid dead routes.

## LNG-04-006 — Level & Topic Filtering Contract
**Status:** DONE
**Depends on:** LNG-04-002..004

Support CEFR/filter metadata without making CEFR mandatory for every item. Define URL/query behavior so filters are shareable where useful and accessible on mobile.

## LNG-04-007 — Hub Reconciliation
**Status:** PLANNED
**Depends on:** LNG-04-001..006

Test all launch languages through the same component/routes, unknown slugs, long labels, empty states, filters and section transitions. Verify SEO metadata basics, accessibility, responsive visuals, commits/CI and handoff evidence.
