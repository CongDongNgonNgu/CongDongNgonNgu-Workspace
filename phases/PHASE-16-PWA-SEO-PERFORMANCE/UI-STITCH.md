# Stitch MCP — Phase 16 PWA / Cross-Cutting UX

Phase 16 should not redesign the application merely for novelty. Use Stitch only for user-facing PWA/offline/update/accessibility surfaces that need meaningful design changes; preserve established phase designs otherwise.

## Prompt A — Install Experience
```text
Design the PWA install experience for CongDongNgonNgu.vn using the existing global shell and brand. Desktop/Android may have a browser-triggered install action when supported; iOS needs clear manual Share → Add to Home Screen guidance. Detect already-installed state and avoid repeatedly nagging users.

The install prompt/guide should be compact, optional and educational—never a blocking modal. Explain benefit truthfully (faster access/offline shell only as implemented) and avoid claiming offline AI/community features that still need network. Mobile instructions should use concise steps and readable browser-specific hints without fake browser screenshots.
```

## Prompt B — Offline / Update / Network Failure States
```text
Design honest offline, reconnecting and application-update states for CongDongNgonNgu.vn. Public cached shell may be available, while authenticated/community/AI/payment actions can require network. Clearly distinguish “offline cached content” from “action unavailable”. Provide retry and return-to-home paths. Update notification should allow safe refresh when a new app version is ready without interrupting payment/composer work unexpectedly.
```

## Prompt C — Accessibility/Responsive Review Brief
```text
Review established CongDongNgonNgu critical surfaces for WCAG 2.2 AA intent and responsive behavior at 320/375/390/412/768/1024/1440. Do not restyle for aesthetics. Identify concrete issues in focus order, keyboard traps, contrast, touch targets, live regions, dialog/drawer behavior, correction diffs, AI streaming, payment QR, speaking controls, tables and long multilingual text. Suggest minimal design corrections consistent with existing tokens.
```
