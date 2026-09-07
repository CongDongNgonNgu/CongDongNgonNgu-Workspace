# Phase 06 Tasks

## LNG-06-001 — Correction & Q&A Domain Model
**Status:** PLANNED  
**Depends on:** Phase 05

Extend community posts without duplicating the entire post model. Represent correction requests, structured correction proposals, explanations, accepted correction/answer, helpful votes and reviewer metadata. Preserve original text immutably or with explicit revision history so diffs remain meaningful.

## LNG-06-002 — Ask for Correction / Ask Question
**Depends on:** LNG-06-001

Create validated flows for source text/question, target language, optional level/context and privacy/visibility consistent with community rules. Composer must clarify whether the user requests grammar/style/naturalness/pronunciation-related help. Prevent empty/oversized submissions and duplicate retries.

## LNG-06-003 — Inline Correction Editor & Diff
**Depends on:** LNG-06-001, LNG-06-002

Use Stitch before frontend implementation. Build an accessible correction editor and diff presentation showing original vs corrected content without relying on red/green color alone. Support explanations tied to whole correction and future segment-level notes if architecture permits. Backend stores canonical structured values, not only rendered HTML.

## LNG-06-004 — Voting, Helpful & Accepted Answer/Correction
**Depends on:** LNG-06-003

Requester may accept a valid response according to ownership rules; voters cannot self-farm; one vote state per user; acceptance can be changed with audit/history if product permits. Distinguish “accepted by asker” from “verified linguistic resource”.

## LNG-06-005 — Reviewer Reputation Hooks
**Depends on:** LNG-06-004

Emit domain events or contribution records for later Phase 10 without awarding hard-coded final point totals yet. Record enough evidence to attribute useful corrections/answers and reverse effects after moderation/deletion.

## LNG-06-006 — Library Candidate Conversion
**Depends on:** LNG-06-003..005

Create an explicit candidate/promotion contract for high-quality corrections/Q&A to enter Phase 08 review. Preserve provenance back to the community source and contributor; never auto-mark as verified.

## LNG-06-007 — Safety & Reconciliation
**Depends on:** LNG-06-001..006

Test ownership/acceptance abuse, self-vote, duplicate vote, deleted/moderated source, XSS in diffs/explanations, Unicode/non-Latin text, large diffs and privacy. Complete responsive/a11y/visual and handoff evidence.
