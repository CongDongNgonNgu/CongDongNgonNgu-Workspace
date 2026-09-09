# Stitch MCP — Phase 02 Auth & Identity

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
