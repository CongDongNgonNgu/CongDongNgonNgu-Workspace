# LNG-02-009 — Auth UI Stitch Fidelity Remediation

Status: `VERIFYING`

Phase 02 status: `BLOCKED_EXTERNAL` (the Google credential blocker is
unchanged). Final owner visual acceptance was not delegated in the request,
so this task is not marked `DONE`.

Scope: `CongDongNgonNgu-Front-End-Web` and this Workspace repository only.
Backend auth/security, schema, sessions, OAuth credentials, migrations,
production, and Phase 03 were not modified.

## Canonical screen IDs and runtime paths

| Surface | Stitch ID(s) | Route | Runtime path |
| --- | --- | --- | --- |
| Login Desktop 1440 | `3ba4a552e8c94aa587ad55d7c94edf06` | `/login` | `src/features/auth/pages/LoginPage.tsx` + `src/features/auth/AuthBody.tsx` |
| Login Mobile 390 | `e82de60631f3447aa15803cca6efd012` | `/login` | `src/features/auth/pages/LoginPage.tsx` + `src/features/auth/AuthBody.tsx` |
| Register Desktop 1440 | `f058177abb644b56b0e6fc1269eeadd8` | `/register` | `src/features/auth/pages/RegisterPage.tsx` + `src/features/auth/AuthBody.tsx` |
| Register Mobile 390 | `dc4936bcd60d44b888537c21f19cd08d` | `/register` | `src/features/auth/pages/RegisterPage.tsx` + `src/features/auth/AuthBody.tsx` |
| Forgot / Reset | Desktop `835f6f843709461b9d92b088f6887ed9`; Mobile `533c2b525f1d474da5b492d29e3085fe` | `/forgot-password`, `/reset-password` | `ForgotPasswordPage.tsx`, `ResetPasswordPage.tsx`, `RecoveryStatusRail.tsx` |
| Email Verification / Resend | Desktop `a9e2dc0d95d8498ba7bcbd20e53752a9`; Mobile `39383d8bab854b0a8672940cc5c38888` | `/verify-email` | `VerifyEmailPage.tsx` |
| Provider Disabled / Session Expired / Collision-Linking | Mobile `39383d8bab854b0a8672940cc5c38888` | `/auth/callback?status=provider-disabled`, `session-expired`, `collision` | `AuthCallbackPage.tsx` |

The Register Mobile record is canonical by visual inspection despite Stitch
metadata incorrectly reporting `DESKTOP`. Historical exports remain in this
folder and are `SUPERSEDED / REFERENCE ONLY`.

## Required owner-facing raster evidence

Actual Stitch rasters were retrieved through Stitch MCP and inspected. Runtime
rasters were captured at the matching browser viewport. The strict four-screen
gate has side-by-side, overlay, and pixel-difference artifacts.

| Surface | Stitch raster | Runtime raster | Comparison |
| --- | --- | --- | --- |
| Login 1440 | [Stitch](fidelity-stitch-login-desktop-original.png) | [Runtime](fidelity-runtime-login-1440.png) | [Side-by-side](fidelity-comparison-login-1440-side-by-side.png), [overlay](fidelity-comparison-login-1440-overlay.png), [diff](fidelity-comparison-login-1440-diff.png) |
| Login 390 | [Stitch](fidelity-stitch-login-mobile-original.png) | [Runtime](fidelity-runtime-login-390.png) | [Side-by-side](fidelity-comparison-login-390-side-by-side.png), [overlay](fidelity-comparison-login-390-overlay.png), [diff](fidelity-comparison-login-390-diff.png) |
| Register 1440 | [Stitch](fidelity-stitch-register-desktop-original.png) | [Runtime](fidelity-runtime-register-1440.png) | [Side-by-side](fidelity-comparison-register-1440-side-by-side.png), [overlay](fidelity-comparison-register-1440-overlay.png), [diff](fidelity-comparison-register-1440-diff.png) |
| Register 390 | [Stitch](fidelity-stitch-register-mobile-original.png) | [Runtime](fidelity-runtime-register-390.png) | [Side-by-side](fidelity-comparison-register-390-side-by-side.png), [overlay](fidelity-comparison-register-390-overlay.png), [diff](fidelity-comparison-register-390-diff.png) |

Other state comparisons are preserved as required side-by-side evidence:

- [Recovery 390](fidelity-comparison-recovery-390-side-by-side.png), with
  [runtime](fidelity-runtime-recovery-390.png) and [desktop runtime](fidelity-runtime-recovery-1440.png).
- [Email verification 390](fidelity-comparison-verification-390-side-by-side.png).
- [Provider disabled 390](fidelity-comparison-provider-disabled-390-side-by-side.png).
- [Session expired 390](fidelity-comparison-session-expired-390-side-by-side.png).
- [OAuth collision/linking 390](fidelity-comparison-collision-390-side-by-side.png).

State comparisons use the canonical Auth Recovery States board as the Stitch
reference; the runtime side is the concrete route/state realization.

## Measurement and behavior record

- Desktop auth content is approximately 1176px wide with an editorial/form
  split near 5:6 for Login and 5:7 for Register.
- Desktop inputs and primary actions measure 44px high; mobile controls
  measure 48px high.
- Mobile horizontal gutters are 16px; the mobile recovery rail sits directly
  below the Header and scrolls horizontally without page overflow.
- Responsive matrix checked at 320, 375, 390, 412, 768, 1024, and 1440px.
  `scrollWidth <= viewport width` held for Login and Register at every width.
- Login and flow surfaces use the measured Stitch palette
  `#F8FAF6/#002B4D/#9C4500`; Login Mobile uses the accepted bright CTA
  `#FD8A42`; Register Mobile preserves the accepted mobile body/accent
  variant `#F4F6F2/#D96E28` while its compact Footer now uses the
  owner-requested shared `#F2F4F0` surface.
- Provider availability remains capability-driven and disabled providers do
  not fabricate OAuth completion.
- Verification destinations are masked; collision and session errors remain
  generic and do not expose account existence or provider details.

## Intentional deviations

The owner-requested mobile compact Footer surface is intentionally unified to
`#F2F4F0` across Auth routes. The Register Mobile Stitch raster remains
canonical and documents the original `#1E4165` footer, so this is a visible
color-only deviation approved by the owner request. One canonical Phase 01
Header API and Footer API are reused; dynamic security-safe error copy can
differ from static Stitch copy; Google remains disabled without real
credentials; and the Register Mobile Stitch metadata typo is documented.
No other intentional layout, section-order, control-sizing, or
mobile-composition deviation is accepted without owner approval.

## Verification performed

- `npm.cmd test -- --reporter=dot`: 8 files, 37 tests passed.
- `npm.cmd run typecheck`: passed.
- `npm.cmd run lint`: same TypeScript gate, passed.
- `npm.cmd run build`: passed.
- `npm.cmd audit --audit-level=high`: 0 vulnerabilities.
- Lighthouse snapshot at 390px and 1440px: Accessibility 100, Best
  Practices 100, SEO 100, Agentic Browsing 100; 0 failed audits.
- Follow-up browser check: Login and Register at 390px computed the compact
  Footer background as `rgb(242, 244, 240)` (`#F2F4F0`) with no horizontal
  overflow; Register at 1440px retained the navy Footer background.
- Focused Auth tests cover Login/Register hierarchy, provider-disabled
  capability, recovery request/sent, expired reset, masked verification, and
  collision-safe messaging.

Owner visual sign-off remains the final gate for this remediation. Until that
sign-off is provided, retain `LNG-02-009=VERIFYING` and
`PHASE_02=BLOCKED_EXTERNAL`.
