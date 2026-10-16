# Phase28 deployed audit

2026-10-16 Asia/Saigon. Existing owner-classified Vercel TEST https://cong-dong-ngon-ngu-sigma.vercel.app inspected through established Chrome session. Source baselines in ACTION-CAPABILITIES.md. No fixture creation, data mutation, or acceptance claim in this audit.

## Observations

- Explore root: Community CTA points to /#community; language CTA to /#languages; contribution CTA also home anchor. These do not reach the existing product destinations. Membership points to /membership; primary partner navigation /exchange is correct. Exchange section still describes future availability. Fix affected routing/copy without expanding Phase29.
- Community feed: giant introductory heading and margins delay discovery; keyword input and language select differ in desktop height because the field shell stretches its grid tracks. Both measured44px when stacked mobile390. Advanced filters already use native details, URL/server-backed semantics; preserve them.
- Loaded feed includes eight-type source contract; actual displayed examples include DISCUSSION, QUESTION, CORRECTION_REQUEST. Post actions pale; partner-share visible only public discussion/question and authenticated state, matching backend resolver. This difference is intentional, not a missing correction button.
- Correction 5f3920cd-fe82-4305-849a-427e7f70623d: generic Community post h1 dominates; post content is fixture context, canonical original differs; the context is repeated in structured area. Proposal comparison always repeats original; explanation contains historical UAT reviewer placeholder. Retain unrelated history unchanged; Phase28 fixtures must use natural learning copy and ownership metadata.
- Discussion 612f23c1-012a-4239-972b-17551078f740: comment composer primary; partner-share available. Generic title and repetitive sidebar remain.
- Question 1c628792-8cfc-42f8-9955-1dc58acac3b1: original once, structured answer first, accepted badge, additional general discussion collapsed. Preserve this valid semantic ordering while improving hierarchy.
- Detail sidebar repeats learning context, metadata, guidelines, thread hint. Literal chevron glyph observed in guideline summary. Replace with canonical Icon and reuse disclosure treatment.
- VI and EN correction inspected; EN question/discussion inspected. Mobile390 Community and question inspected. Mobile feed intro consumes most first screen; footer measured952px tall with expanded sections. Responsive acceptance at all seven widths is still NOT_RUN.
- Existing synthetic historical data read only. Owner account session used only for read-only audit; no reactions/comments/reports/shares submitted.

## Implementation disposition

KEEP backend search/auth/structured model; ADAPT existing search form/feed/detail and existing icons/tokens; BUILD_NEW focused capability helper, social action presentation, language-discovery card and disclosure only where established primitives do not already fit; REMOVE redundant visible context/hints, never historical records. DEFER unsupported structured replies, new share types, media, group/message expansion and all Phase29+ work.

## Gate status

001 VERIFYING: desktop/mobile/detail Stitch generated, refined and visually reviewed; independent contract review APPROVE with precision clarifications incorporated. PR/CI/merge/main/branch cleanup pending.002-005 not started. No automated/runtime acceptance, merge, exact-deployment or fixture cleanup pass claimed.
