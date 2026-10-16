# Phase 28 Acceptance

Phase28 is DONE only when all applicable gates below are evidenced.

## Discovery/search
- Search/filter controls have coherent dimensions and visual hierarchy at all target widths.
- Search remains server-backed and authorization-safe.
- Apply/reset/query persistence behavior is deterministic.
- Empty/no-result/error/loading states are understandable.

## Interaction semantics
- A documented capability matrix exists for every supported post type and relevant authorization state.
- `Chia sẻ với bạn học` and other actions appear or disappear for explicit reasons.
- Phase27 one-primary-response semantics are preserved.

## Feed/detail
- Generic `Bài viết cộng đồng` no longer overwhelms user content.
- Post type is compact; content, author and learning context have sensible hierarchy.
- Helpful/comment/save/share/report states are visually clear and accessible.

## Correction/Q&A/discussion
- Correction requests clearly separate original text, proposal, explanation and contextual replies.
- No confusing duplicate primary response surface is visible.
- No accepted native proof contains accidental machine-like UAT copy such as generic reviewer placeholder text.

## Navigation/design
- Explore CTAs route to their intended destinations.
- Community→Language discovery is visually obvious and semantically relevant.
- Canonical chevrons replace literal arrow characters.
- Sidebar/footer/mobile whitespace does not create unjustified dead zones.

## Technical/runtime
- VI/EN pass.
- 320/375/390/412/768/1024/1440 pass with no unexpected overflow.
- Keyboard/focus/accessible-name basics pass in affected surfaces.
- Direct URL/back-forward pass.
- Frontend tests/typecheck/lint/build pass; affected backend gates pass if backend changes occur.
- Exact-owned fixtures cleaned; residual = 0.
- Independent review completed and ordinary findings remediated.
- PR/CI/main verification/branch cleanup/Workspace evidence complete.

No real-user usability, value or launch-readiness claim is implied.
