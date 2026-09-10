# Frontend Architecture Baseline

**Version:** 1
**Status:** Enforced
**Scope:** `CongDongNgonNgu/CongDongNgonNgu-Front-End-Web`

This document is the canonical frontend architecture baseline for future phases. It exists so Codex does not depend on session memory to reproduce established conventions.

## 1. Primary rule: organize by responsibility
Split code when responsibilities are independently understandable, testable, reusable, or likely to change for different reasons. Do not split files solely to satisfy a line-count target, and do not keep unrelated responsibilities together merely because they belong to one feature.

Large files are a review signal. When a page/component or stylesheet becomes difficult to navigate, review whether it is mixing composition, state, API work, browser behavior, domain transforms, and multiple independent UI regions. If it is, split by responsibility.

## 2. Feature shape
Prefer a feature-local structure such as:

```text
src/features/<feature>/
├─ pages/                 # route-level screens when useful
├─ components/            # feature UI
├─ hooks/                 # reusable/complex React behavior
├─ <feature>.types.ts
├─ <feature>.constants.ts
├─ <domain-module>.ts     # validation, mapping, persistence, state helpers, etc.
└─ tests colocated with the responsibility they verify
```

Not every feature needs every folder. Add structure only when the responsibility exists.

Established examples to preserve rather than collapse back into monoliths:
- `src/features/auth`: auth pages plus focused CSS modules/components.
- `src/features/onboarding`: step components, hooks, draft/language/profile/validation modules.
- `src/components/layout/Header`: shell, desktop/mobile composition, search, drawer, auth actions, and colocated styles.

## 3. Page responsibility
Route/page components should primarily handle:
- composition;
- routing/navigation boundaries;
- feature orchestration;
- top-level loading/error/empty-state decisions;
- wiring focused hooks/components together.

Move independent logic out when it starts obscuring the page's composition role. Typical destinations:
- `hooks/` for React state/effects and browser interaction that form a coherent behavior;
- services/API clients for transport and remote calls;
- domain modules for validation, mapping, sanitization, persistence, calculation, and pure state helpers;
- utilities only for truly generic small helpers.

Avoid page files that simultaneously own large JSX regions, API loading, local persistence, history manipulation, search keyboard logic, validation, and mapping to backend payloads.

## 4. Component ownership
A component should own UI behavior and styles that are specific to that component.

Prefer:

```text
Component.tsx
Component.module.css
```

When a component is extracted, move its component-specific styles with it unless those styles are genuinely shared by multiple consumers.

Do not create or grow a feature-wide stylesheet that becomes a dumping ground for unrelated child components. A shared stylesheet is acceptable only when the selectors represent one coherent shared responsibility.

## 5. CSS rules
- Use CSS Modules for component/feature-specific styles.
- Colocate styles with the component that owns them.
- Global CSS is reserved for resets, design tokens, typography foundations, deliberate global layout utilities, and truly application-wide behavior.
- Do not target unrelated component internals through broad selectors merely to avoid adding a local CSS module.
- Remove dead selectors when ownership moves.
- Preserve responsive behavior when refactoring; do not silently move or drop mobile/tablet rules.
- Keep accessibility-related visual states such as focus-visible behavior intact.

## 6. Shared components and primitives
Use `src/components/ui` and layout primitives when their semantics match the need. Do not create a feature-local duplicate of an established primitive without a concrete reason.

Conversely, do not move feature-specific UI into the global design system merely because it is reusable once. Promote a component only after its API and semantics are genuinely cross-feature.

## 7. Hooks and state
A hook should represent one coherent behavior, not become a new dumping file for everything removed from a page.

Good examples of separable responsibilities include:
- remote session/profile/catalog loading and persistence;
- search/combobox interaction;
- browser history/step navigation;
- viewport/media or platform behavior shared across consumers.

Keep pure transformations out of hooks when they can live in testable domain modules.

## 8. Domain modules
Use focused modules for logic that does not need React. Common responsibilities include:
- validation;
- input/output mapping;
- sanitization;
- local-storage serialization;
- catalog filtering/normalization;
- derived state calculations.

Prefer compatibility barrels when splitting an established public module would otherwise create noisy unrelated import churn. Remove a compatibility barrel later only through a deliberate cleanup task.

## 9. Refactor-only safety
When the task is explicitly a refactor:
- do not redesign the UI;
- do not change copy unless required to preserve behavior or fix a scoped defect;
- do not change routes, backend contracts, auth semantics, analytics semantics, or storage keys;
- preserve keyboard behavior, focus management, ARIA, and responsive layouts;
- keep tests behavior-oriented rather than rewriting expectations to make a regression pass.

A pure architecture refactor does not require a new Stitch design if no visible design change is intended.

## 10. New UI / redesign work
For a new user-facing page, global shell surface, or substantial redesign, follow the Workspace Stitch MCP policy before implementation. Implement the approved direction using project-native components and this architecture baseline rather than copying generated markup wholesale.

Verify major surfaces at 320, 375, 390, 412, 768, 1024, and 1440 px where applicable.

## 11. Accessibility
Accessibility is part of architecture and acceptance:
- semantic HTML first;
- labelled controls;
- keyboard-complete interaction;
- visible focus;
- correct dialog/drawer/menu semantics;
- sensible live regions for async feedback;
- no interaction that depends only on pointer hover;
- preserve focus return and Escape behavior for overlays.

## 12. Verification gate
Before a frontend task is complete, run all applicable gates:

```text
npm run lint
npm run typecheck
npm test -- --run
npm run build
npm audit --audit-level=high
```

Run focused tests plus phase-specific responsive/accessibility/visual verification when required. Required CI must be green before merge/completion.

## 13. Architecture completion check
Before reporting DONE, answer these questions from the actual diff:
1. Does each changed UI component own its component-specific CSS?
2. Did the change introduce or enlarge a mixed-responsibility page/module/stylesheet?
3. Is complex React behavior in a coherent hook rather than hidden inside rendering code?
4. Are pure domain transforms separate from React when appropriate?
5. Did we reuse existing primitives/patterns instead of inventing a competing architecture?
6. If this was a refactor, are behavior, accessibility, API contracts, and responsive output preserved?
7. Did all applicable verification and CI gates pass?

If an answer reveals an unresolved architecture regression, the task is not DONE.
