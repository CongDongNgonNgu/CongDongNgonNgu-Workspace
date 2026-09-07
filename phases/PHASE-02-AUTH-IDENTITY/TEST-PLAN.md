# Phase 02 Test Plan

Backend/API: duplicate registration, invalid credentials, unverified account policy, reset/verify token expiry/reuse, brute-force/rate limits, refresh rotation/replay, logout/revocation, protected route authorization, provider state mismatch, missing config, provider collision and explicit linking.

Frontend/E2E: register→verify→login; login error/recovery; forgot/reset; session expiry recovery; Google success/failure where environment supports it; embedded/mobile browser recovery where relevant; long error text and loading states.

Security: confirm passwords/tokens/secrets absent from logs; cookies/storage flags match architecture; open redirect and OAuth callback validation tested.

Responsive/a11y: 320/375/390/412/768/1024/1440, keyboard-only auth flow, labels/error announcements/focus after validation.
