# Design System Direction

Brand character: **open, social, multicultural, friendly, modern, human and learning-focused**. It must not resemble EduAI, Talkpal or a generic AI dashboard.

Palette direction from the supplied brand: navy for trust/navigation, orange for learning energy, green for contribution/success, cyan for conversation/exchange. Final implementation uses semantic tokens rather than scattered raw values: surface, text, muted, primary, accent, success, warning, danger, border and focus.

Typography must be Vietnamese-safe, readable and not excessively bold/all-caps. Define display/title/body/meta scales with comfortable mobile body text.

Layout: mobile-first responsive grid; functional pages avoid oversized marketing heroes; do not put every section into rounded cards; use lists/dividers/open surfaces where appropriate. Desktop/tablet/mobile navigation adapt intentionally.

Component baseline: buttons/links, form controls, comboboxes, tabs, dialog/drawer/dropdown/tooltip/toast, avatar/badge/tag/language indicator, cards/list rows, tables when appropriate, skeleton/empty/error states, pagination/search/uploader and an accessible correction-diff component.

All controls expose hover/focus/pressed/disabled/loading/error/success states. Respect `prefers-reduced-motion`.

Accessibility target: WCAG 2.2 AA baseline for new surfaces.

Every UI-heavy phase contains `UI-STITCH.md`. Stitch is a design/reference step; implementation must use project-native components and be reviewed for originality, responsiveness and accessibility.
