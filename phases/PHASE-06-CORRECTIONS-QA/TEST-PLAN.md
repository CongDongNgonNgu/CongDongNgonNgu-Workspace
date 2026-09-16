# Phase 06 Test Plan

- Model/API tests for correction/question creation, edits allowed by policy, accepted answer/correction and immutable/revision-safe original.
- Vote/helpful idempotency, self-vote rejection and count reconciliation after deletion/moderation.
- Library-candidate provenance test.
- XSS/markup/unicode tests covering Vietnamese diacritics, CJK and right-to-left readiness where generic rendering is used.
- Diff behavior for one-word change, sentence rewrite, deletion-only/addition-only and long paragraphs.
- E2E request→correct→explain→vote→accept→candidate.
- Responsive/a11y checks at required viewports; keyboard diff/editor usage and screen-reader semantics.

## Phase 06D runtime and evidence record

- Apply migration 0005 only to the authorized Neon TEST database; verify the
  durable candidate and contribution-event tables.
- Bootstrap the real Backend and resolve MemoryEmailProvider from the same
  Nest application process. Register, verify, login, and establish isolated
  USER_A/USER_B/USER_C sessions without recording credentials or tokens.
- Verify correction and question contribution events, requester-only candidate
  nomination, duplicate nomination idempotency, acceptance change/revoke
  reversal, and source/response provenance.
- Account for expected security rejections separately: self-helpful vote,
  non-requester acceptance, and non-requester candidate nomination.
- Capture populated correction/question desktop and mobile surfaces with
  Playwright page.screenshot, compare each with its locked 06C Stitch raster,
  and keep visual gates in REVIEW pending owner acceptance.
- Recheck responsive behavior at 320, 375, 390, 412, 768, 1024, and 1440;
  confirm semantic diff cues, labels, visible focus, touch targets, and zero
  unexpected console/network errors.
