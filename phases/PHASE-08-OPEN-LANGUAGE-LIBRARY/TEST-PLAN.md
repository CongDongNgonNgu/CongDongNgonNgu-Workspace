# Phase 08 Test Plan

- Schema/service tests for each implemented resource family and shared provenance.
- Review transition/authorization tests including submitter self-verification denial, reject/reopen/invalidate behavior.
- Search/filter/pagination tests with Vietnamese diacritics and CJK text.
- Community contribution consent/validation and duplicate candidate behavior.
- Import adapter fixture tests: idempotent rerun, invalid row, unknown language, encoding, duplicate source ID, duplicate semantic content and attribution preservation.
- Public API must exclude draft/rejected/private review notes.
- E2E contribute→review→verify→search→detail and correction-candidate→review.
- Responsive/accessibility checks for dense filters, attribution, tables/lists and mobile detail.
