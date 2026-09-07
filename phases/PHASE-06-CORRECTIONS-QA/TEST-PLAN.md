# Phase 06 Test Plan

- Model/API tests for correction/question creation, edits allowed by policy, accepted answer/correction and immutable/revision-safe original.
- Vote/helpful idempotency, self-vote rejection and count reconciliation after deletion/moderation.
- Library-candidate provenance test.
- XSS/markup/unicode tests covering Vietnamese diacritics, CJK and right-to-left readiness where generic rendering is used.
- Diff behavior for one-word change, sentence rewrite, deletion-only/addition-only and long paragraphs.
- E2E request→correct→explain→vote→accept→candidate.
- Responsive/a11y checks at required viewports; keyboard diff/editor usage and screen-reader semantics.
