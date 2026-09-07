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
