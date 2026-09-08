# Design System Direction

Brand character: **open, social, multicultural, friendly, modern, human and learning-focused**. It must not resemble EduAI, Talkpal or a generic AI dashboard.

Palette direction from the supplied brand: navy for trust/navigation, orange for learning energy, green for contribution/success, cyan for conversation/exchange. Final implementation uses semantic tokens rather than scattered raw values: surface, text, muted, primary, accent, success, warning, danger, border and focus.

Typography must be Vietnamese-safe, readable and not excessively bold/all-caps. Define display/title/body/meta scales with comfortable mobile body text.

Layout: mobile-first responsive grid; functional pages avoid oversized marketing heroes; do not put every section into rounded cards; use lists/dividers/open surfaces where appropriate. Desktop/tablet/mobile navigation adapt intentionally.

Component baseline: buttons/links, form controls, comboboxes, tabs, dialog/drawer/dropdown/tooltip/toast, avatar/badge/tag/language indicator, cards/list rows, tables when appropriate, skeleton/empty/error states, pagination/search/uploader and an accessible correction-diff component.

All controls expose hover/focus/pressed/disabled/loading/error/success states. Respect `prefers-reduced-motion`.

Accessibility target: WCAG 2.2 AA baseline for new surfaces.

Every UI-heavy phase contains `UI-STITCH.md`. Stitch is a design/reference step; implementation must use project-native components and be reviewed for originality, responsiveness and accessibility.

## Phase 01 implementation record

### Supplied logo audit

- `public/brand/congdongngonngu-mark.png`: supplied 512 x 512 transparent square mark; used as the compact/icon-only asset in the header, mobile header, and footer.
- `public/brand/congdongngonngu-logo.png`: supplied 1000 x 1000 transparent square asset with a non-transparent content region, not a horizontal lockup; retained as an available asset but not stretched into a desktop wordmark.
- Horizontal and monochrome variants: no owner-approved horizontal or monochrome files were supplied. The implementation pairs the supplied mark with a typed wordmark and keeps the footer on a light surface. No filter, redraw, or new trademark was fabricated for dark surfaces.
- Required follow-up: provide owner-approved horizontal, monochrome, and dark-surface variants before any dark footer or inverted brand treatment is introduced.

### Implemented semantic contract

The frontend token source is `CongDongNgonNgu-Front-End-Web/src/styles/tokens.css`, imported by `src/styles/global.css`. Feature CSS consumes semantic tokens rather than scattering brand values.

| Token group | Implementation rule |
| --- | --- |
| Brand | Navy `#1E4165` anchors navigation/trust; orange `#D96E28` marks focus and active learning; green `#1E8A66` marks contribution/success; cyan `#2A9DB0` marks conversation/info. |
| Surfaces | Warm neutral `#F4F6F2` is the page surface; `#FBFCF9` is the elevated surface; borders use `#D7DED8` and strong borders use `#AEBDB5`. |
| Text and state | Primary text uses `#18324C`; secondary text uses `#5F6E78`; semantic strong/surface/border tokens exist for info, success, warning, danger, and focus. |
| Typography | Be Vietnam Pro is the first font family with Vietnamese-safe system fallbacks; body uses 16px/1.55, labels 14px/1.4, headings use a restrained bold scale, and display type is capped for small laptop readability. |
| Layout | 4px base spacing, 1200px max container, 16px mobile gutters, 24px desktop gutters, 768px mobile breakpoint, 1024px desktop-collapse breakpoint. |
| Shape and depth | 8px controls, 12px surfaces, pill reserved for status/compact controls, low and medium shadows only; no decorative gradients. |
| Motion and layers | 180ms standard motion, reduced-motion override, shell header z-index 20, overlays 40, toasts 50. |

Light theme is implemented first. The token file includes a `[data-theme="dark"]` semantic override scaffold so later dark-mode work can change meaning at the token boundary without rewriting feature CSS.

### Accessibility and usage rules

- New controls expose hover, focus-visible, pressed/selected, disabled, loading, and error states where the interaction supports them.
- The shell provides a skip link, `header`, named `nav`, `main`, and `footer` landmarks, keyboard-closable menus/drawers, focus restoration after the mobile drawer closes, and 44px minimum interactive targets.
- Future Phase 02+ destinations are non-link disabled rows with visible `Sắp có` treatment. The only active application destination in Phase 01 is `/`.
- Mobile shell reserves `env(safe-area-inset-bottom)` in the fixed bottom navigation, drawer, footer, and main content padding.
- `prefers-reduced-motion` disables long transitions and pulsing animation. The implementation does not use decorative gradients or EduAI/Talkpal/admin visual patterns.