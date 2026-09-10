# Stitch MCP — Phase 02 Auth & Identity

## AUTH_VISUAL_SOURCE_OF_TRUTH — LNG-02-009

This section is the canonical routing and evidence record for future Auth UI
work. Stitch is the visual specification. The raster files named below were
retrieved from project `3718538619973058970` with the Stitch MCP and inspected
as images; generated HTML or metadata is not used as a visual substitute.

### Canonical screen inventory

| Auth surface | Purpose | Viewport | Canonical Stitch screen ID | Route | Runtime implementation |
| --- | --- | --- | --- | --- | --- |
| Login Desktop 1440 | Email/password entry and provider entry | 1440 | `3ba4a552e8c94aa587ad55d7c94edf06` | `/login` | `src/features/auth/pages/LoginPage.tsx`, `src/features/auth/AuthBody.tsx` |
| Login Mobile 390 | Form-first login composition | 390 | `e82de60631f3447aa15803cca6efd012` | `/login` | `src/features/auth/pages/LoginPage.tsx`, `src/features/auth/AuthBody.tsx` |
| Register Desktop 1440 | Account creation, mailbox notice, consent | 1440 | `f058177abb644b56b0e6fc1269eeadd8` | `/register` | `src/features/auth/pages/RegisterPage.tsx`, `src/features/auth/AuthBody.tsx` |
| Register Mobile 390 | Dedicated mobile registration composition | 390 | `dc4936bcd60d44b888537c21f19cd08d` | `/register` | `src/features/auth/pages/RegisterPage.tsx`, `src/features/auth/AuthBody.tsx` |
| Forgot Password | Recovery request and sent state | 1440 / 390 | Desktop `835f6f843709461b9d92b088f6887ed9`; Mobile `533c2b525f1d474da5b492d29e3085fe` | `/forgot-password` | `src/features/auth/pages/ForgotPasswordPage.tsx`, `src/features/auth/RecoveryStatusRail.tsx` |
| Reset Password | Token reset, expired link, and completion | 1440 / 390 | Desktop `835f6f843709461b9d92b088f6887ed9`; Mobile `533c2b525f1d474da5b492d29e3085fe` | `/reset-password` | `src/features/auth/pages/ResetPasswordPage.tsx`, `src/features/auth/RecoveryStatusRail.tsx` |
| Email Verification | Verification result and masked destination | 1440 / 390 | Desktop `a9e2dc0d95d8498ba7bcbd20e53752a9`; Mobile `39383d8bab854b0a8672940cc5c38888` | `/verify-email` | `src/features/auth/pages/VerifyEmailPage.tsx` |
| Verification Resend | Safe resend action and mailbox guidance | 1440 / 390 | Desktop `a9e2dc0d95d8498ba7bcbd20e53752a9`; Mobile `39383d8bab854b0a8672940cc5c38888` | `/verify-email` | `src/features/auth/pages/VerifyEmailPage.tsx` |
| Provider Disabled/Error | Fail-closed provider recovery | 390 | `39383d8bab854b0a8672940cc5c38888` | `/auth/callback?status=provider-disabled` | `src/features/auth/pages/AuthCallbackPage.tsx` |
| Session Expired | Re-authentication after session timeout | 390 | `39383d8bab854b0a8672940cc5c38888` | `/auth/callback?status=session-expired` | `src/features/auth/pages/AuthCallbackPage.tsx` |
| OAuth Collision / Account Linking Recovery | Safe explicit linking recovery | 390 | `39383d8bab854b0a8672940cc5c38888` | `/auth/callback?status=collision` | `src/features/auth/pages/AuthCallbackPage.tsx` |

The `dc4936bcd60d44b888537c21f19cd08d` Stitch record is visually the
canonical 390px Register screen even though its Stitch metadata labels the
device type as DESKTOP. This metadata inconsistency is documented, not
silently corrected in the source design.

### Measured parity targets

| Surface | Main width / gutters | Auth surface and columns | Controls and rhythm | Surface treatment |
| --- | --- | --- | --- | --- |
| Login 1440 | Main content about 1176px; 32px desktop outer padding | About 5:6 editorial/form split with a divider | 44px inputs/buttons; 16px field rhythm; editorial title about 48px | `#F8FAF6` body, `#002B4D` navy, `#9C4500` accent, navy footer |
| Login 390 | 16px mobile gutters; form fills available width | Single column; editorial context is replaced by compact reassurance | 48px controls; provider and CTA remain full width | `#F8FAF6` body, `#F2F4F0` footer, bright `#FD8A42` CTA |
| Register 1440 | Main content about 1176px; 32px desktop outer padding | About 5:7 editorial/form split with a divider | 44px controls; grouped password guidance and consent | `#F8FAF6` body, `#002B4D` navy, `#9C4500` accent, navy footer |
| Register 390 | 16px mobile gutters; form fills available width | Dedicated single-column composition | 48px controls; password requirements card and consent remain visible | `#F4F6F2` body, owner-requested `#F2F4F0` compact footer, `#D96E28` accent |
| Recovery and state flows | 16px mobile gutters; desktop auth body remains focused | Editorial/form split on desktop; mobile status rail above the form | 48px mobile controls; state rail scrolls horizontally without overflow | Recovery palette follows `#F8FAF6/#002B4D/#9C4500` |

### Required visual comparison evidence

The four strict-gate surfaces preserve Stitch raster, runtime raster,
side-by-side, overlay, and pixel-difference artifacts. Other state surfaces
preserve Stitch/runtime side-by-side evidence.

| Surface | Stitch raster | Runtime raster | Side-by-side | Overlay / diff |
| --- | --- | --- | --- | --- |
| Login 1440 | `evidence/phase-02/fidelity-stitch-login-desktop-original.png` | `evidence/phase-02/fidelity-runtime-login-1440.png` | `evidence/phase-02/fidelity-comparison-login-1440-side-by-side.png` | `fidelity-comparison-login-1440-overlay.png`, `fidelity-comparison-login-1440-diff.png` |
| Login 390 | `evidence/phase-02/fidelity-stitch-login-mobile-original.png` | `evidence/phase-02/fidelity-runtime-login-390.png` | `evidence/phase-02/fidelity-comparison-login-390-side-by-side.png` | `fidelity-comparison-login-390-overlay.png`, `fidelity-comparison-login-390-diff.png` |
| Register 1440 | `evidence/phase-02/fidelity-stitch-register-desktop-original.png` | `evidence/phase-02/fidelity-runtime-register-1440.png` | `evidence/phase-02/fidelity-comparison-register-1440-side-by-side.png` | `fidelity-comparison-register-1440-overlay.png`, `fidelity-comparison-register-1440-diff.png` |
| Register 390 | `evidence/phase-02/fidelity-stitch-register-mobile-original.png` | `evidence/phase-02/fidelity-runtime-register-390.png` | `evidence/phase-02/fidelity-comparison-register-390-side-by-side.png` | `fidelity-comparison-register-390-overlay.png`, `fidelity-comparison-register-390-diff.png` |
| Recovery 390 | `evidence/phase-02/fidelity-stitch-recovery-mobile-original.png` | `evidence/phase-02/fidelity-runtime-recovery-390.png` | `fidelity-comparison-recovery-390-side-by-side.png` | Side-by-side required; the desktop pair is also preserved as `fidelity-stitch-recovery-desktop-original.png` and `fidelity-runtime-recovery-1440.png`. |
| Verification 390 | `evidence/phase-02/fidelity-stitch-states-mobile-original.png` | `evidence/phase-02/fidelity-runtime-verify-390.png` | `fidelity-comparison-verification-390-side-by-side.png` | Side-by-side required |
| Provider Disabled 390 | `evidence/phase-02/fidelity-stitch-states-mobile-original.png` | `evidence/phase-02/fidelity-runtime-provider-disabled-390.png` | `fidelity-comparison-provider-disabled-390-side-by-side.png` | Side-by-side required |
| Session Expired 390 | `evidence/phase-02/fidelity-stitch-states-mobile-original.png` | `evidence/phase-02/fidelity-runtime-session-expired-390.png` | `fidelity-comparison-session-expired-390-side-by-side.png` | Side-by-side required |
| Collision / Linking 390 | `evidence/phase-02/fidelity-stitch-states-mobile-original.png` | `evidence/phase-02/fidelity-runtime-collision-390.png` | `fidelity-comparison-collision-390-side-by-side.png` | Side-by-side required |

The historical `STITCH-*.png` exports and the initial
`fidelity-before-runtime-*.png` captures are preserved as `SUPERSEDED /
REFERENCE ONLY`. Do not delete them or select them as canonical references
for future Auth work.

### Intentional deviations

- Phase 01 provides one canonical Header API and one canonical Footer API;
  Auth uses those APIs with scoped integration spacing and tone variables.
- Error and session messages use generic, security-safe wording and may
  differ from static Stitch copy where disclosure would be unsafe.
- Google remains disabled when capability data or credentials are unavailable;
  the UI never fabricates provider completion.
- The Register mobile Stitch record has the documented device metadata typo.
- Owner-requested follow-up unifies the mobile compact Auth Footer surface to
  `#F2F4F0` across Login, Register, Recovery, and Auth recovery states. The
  Register Mobile Stitch raster remains the canonical source and still shows
  its original `#1E4165` footer; this explicit color change is documented
  rather than replacing the Stitch source.

No other visible layout, ordering, control sizing, or composition deviation is
accepted without owner approval.

## Prompt — Auth Body (Login/Register/Recovery)
```text
Design authentication screens for CongDongNgonNgu.vn — Global Language Community. Keep the already-approved global brand tokens/shell; design the page BODY only unless header changes are explicitly required. Audience includes Vietnamese learners and foreign learners of Vietnamese. The experience should feel welcoming, global and trustworthy rather than school/LMS or fintech.

Required states: Login, Register, Email Verification, Forgot Password, Reset Password, OAuth provider entry (Google active; Facebook/Zalo/Apple may show only when enabled), account-link/collision recovery, provider-disabled/error, session-expired recovery. Forms need labels, password visibility, validation, loading, success/error, keyboard focus and mobile autofill-friendly layout.

Desktop: focused auth surface with optional lightweight cultural/language illustration/benefit context, not a huge hero. Mobile 320–412: form first, minimal distraction, no two-column squeeze. Avoid excessive cards/gradients/social-login clutter. Make collision messages clear: matching email never means accounts were silently merged. Return variants and interaction states, not code.
```

## Refinement checks
- Provider buttons only for enabled/configurable providers.
- No dark-pattern consent or hidden Terms.
- Error state does not reveal whether a victim account exists more than product policy allows.
- Mobile keyboard does not hide primary actions; long Vietnamese errors wrap safely.

## Phase 02 execution evidence

- Existing Stitch project: projects/3718538619973058970.
- Applied design system: assets/16442026920550574436.
- Confirmed auth screen reference: projects/3718538619973058970/screens/dc4936bcd60d44b888537c21f19cd08d, titled Registration - CongDongNgonNgu.vn (Mobile 390px).
- Generated auth raster exports are preserved in evidence/phase-02:
  STITCH-login-desktop.png, STITCH-login-mobile.png,
  STITCH-register-desktop.png, STITCH-register-mobile.png,
  STITCH-recovery-desktop.png, STITCH-recovery-mobile.png,
  STITCH-states-desktop.png, and STITCH-states-mobile.png.
- The implementation keeps the accepted Be Vietnam Pro, navy/orange/green
  system and a low-motion, form-first mobile layout. Runtime comparison and
  required viewport evidence are recorded in the Phase 02 handoff.

## Runtime comparison record

Stitch rasters were inspected against the local implementation using the
existing project and design system above. The implementation preserves the
reference language through the same Be Vietnam Pro typography, navy/orange
accent system, open editorial body, quiet borders, and form-first mobile
composition; the runtime adds real labels, validation, loading, and safe
provider-disabled behavior.

| Surface | Reference evidence | Runtime evidence | Reconciliation |
| --- | --- | --- | --- |
| Login, 1440px | STITCH-login-desktop.png | Chrome DevTools viewport screenshot | Two-column body, focused form, navy language-community panel |
| Login, 390px | STITCH-login-mobile.png | Chrome DevTools mobile viewport screenshot | Single-column form-first flow with no horizontal overflow |
| Register and recovery states | STITCH-register-desktop.png, STITCH-recovery-desktop.png, STITCH-states-desktop.png | Route/state checks at 390px | Real Vietnamese labels, safe generic errors, disabled providers, and success/recovery states |

Runtime checks covered exact widths 320, 375, 390, 412, 768, 1024, and
1440px. Browser output was inspected inline through Chrome DevTools because
the browser file exporter could not write into this workspace path; the
preserved Stitch rasters remain in evidence/phase-02.

## Owner acceptance reconciliation — 2026-09-10

Owner visual acceptance for `LNG-02-009` is granted against the canonical
screen inventory and preserved raster/comparison evidence. The accepted
Frontend-Web `main` commit is
`c5fba7b18fe1865c460e8b4d8aac72249558f0bd`.

The owner-rejection history, remediation workflow, canonical IDs, measurements,
raster links, and `SUPERSEDED / REFERENCE ONLY` records above are preserved.
This sign-off does not resolve `PHASE_02=BLOCKED_EXTERNAL`; the remaining
external dependency is live Google provider/callback verification tracked by
`BLOCKER-02-001`.
