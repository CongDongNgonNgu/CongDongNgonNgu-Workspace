# LNG-28-003 cards and shared detail evidence

Status VERIFYING; product gates passed, Workspace lifecycle pending. Baseline latest remote clean main: Frontend5389c66a7854defc433f10241228e4c89e92c737; Backendb3be9e28c6c4596ded3ed35726c57846ec8870da; Workspace090e3d8ddc0e670f9c8ae11b5ee07961087e328d.001/002 DONE. Existing Stitch selected targets reused; no new direction. Structured internals, accordion cleanup and dedicated fixtures remain004; full acceptance005.

## Implementation map

All8 persisted post types use CommunityPostCard, not separate variants. Shared author/avatar/time, LanguageIndicator/proficiency, optional topic, plain directional content, and public-detail link retained. New compact CommunityPostTypeBadge and reusable CommunityActionButton own colocated styles. Counts stay server-confirmed; no fabricated engagement. Primary entry is COMMENT for6types, QA_ANSWER forQUESTION and CORRECTION_PROPOSAL forCORRECTION_REQUEST; no structured-response reply added. Shared capability projection covers public-link eligibility, authenticated public DISCUSSION/QUESTION partner eligibility and secondary general discussion; server remains authoritative. Unknown runtime types fail closed.

Detail uses compact type badge and accessible author-specific h1, with actual text strongest visually; original/edit/structured semantics unchanged. Repeated sidebar context/thread prose removed while metadata and safety guidance retained. Primary column no longer display:contents, keeping structured/comment content in its main column before sidebar on mobile. New action styles excluded from legacy blanket detail-button rules. Save selection exposes aria-pressed on existing mobile/desktop buttons; Helpful selected check and underline plus aria-pressed; accessible count description. Own-post report now visibly available with existing backend route and generic result.

## Historical implementation/review checkpoint

RED matrix/entry/title tests before implementation. Independent review initially found actual U+FFFD punctuation and unknown-type fallback; both fixed, public-link PUBLIC guard added. Corrected source review APPROVE. Rendered8typepartner/guest no-mutation/selected state/English/unknownconsumer tests added. Current full suite and final source/CI/native gates pending. Backend unchanged; no new API, DB or runtime fixture. Historical TEST UAT copy read only, not cleaned or changed.

## Historical candidate-gate checkpoint

Frontend4ada3313fbe0882c39075303b5754f730ce20337 PR48. Full139files/775tests PASS after source remediation; then2 test-only unknown-consumer/English cases added and26cardtests PASS. Exact candidate CI will rerun entire777-test suite. Typecheck/lint/build PASS; performance initialJS148162gzip/CSS11041gzip PASS; audit0 vulnerabilities. An initially mistyped performance script failed before running any check; corrected repository performance:check passed. No gate bypass. Earlier full run stopped after obsolete separate-count presentation assertion failed; assertion now verifies confirmed accessible action count, and corrected full run passes.

PR48 exact candidate CI38876293927 quality job116892052131 PASS:139files/777tests, lint/typecheck/build/performance/audit all pass. Independent final candidate review APPROVE4ada331 zero blockers. Squash main df0c01f1e3a23900c7b1fe296e9b8864e37048bf; candidate/main trees3b55eff26255f7f9a2c26eb405853c745263e8ad equal. Merged-main CI38876503416 and deployed smoke/cleanup pending.

## Exact-main deployed smoke and cleanup

Merged-main CI38876503416 PASS. Vercel H53Y8mMzecmcjFyMXXxN8JfovRrq Ready/Current, exact df0c01f source and sigma alias verified. Native Chrome18detail observations: DISCUSSION/QUESTION/CORRECTION_REQUEST x VI/EN x390/768/1440; actual viewport explicitly verified. No horizontal overflow;2 shared detail actions44px; content18px mobile/tablet22px desktop; author-specific h1 clipped accessibly; sidebar below entire primary column on390/768. Eligible authenticated VI discussion/question partner button observed; correction absent; EN unauthenticated presentation absent. No send/mutation of unrelated content.6 feed observations VI/EN x3widths:20 cards render, actions contained,44px shared buttons,no overflow. All8type semantics covered by source tests; remaining5types native coverage deferred to exact-owned fixtures004/final005.

An old claimed tab ignored viewport updates and reported1440 for every requested size. Those18 attempted records were discarded as responsive proof; fresh TEST tab accepted overrides and each subsequent row asserted innerWidth equals requested width. Existing002 evidence had recorded actual innerWidth per row.

Native mobile keyboard Tab into Helpful produced visible solid3px orange outline. Observed navy rgb(30,65,101) on surface rgb(244,246,242) contrast9.66:1; focus orange contrast3.11:1 against that surface. Selected state uses check icon/underline and aria-pressed, with count description tested. Bounded component checks only; no axe/screenreader certification. Historical UAT copy was read-only for smoke and remains unchanged; natural exact-owned acceptance content belongs004/005. Literal sidebar chevron deliberately deferred004.

Frontend merged branch removed local/remote, refs pruned, clean synchronized main df0c01f confirmed. Workspace final lifecycle pending.

Independent Workspace evidence review APPROVE, zero blocking findings. Native/provider/CI observations reviewed as coordinator evidence, not independently replayed. Earlier pending-gate paragraphs are historical checkpoints; latest exact-main section governs product outcome.
