# Phase 02 — Authentication & Identity

## Goal
Deliver secure, reusable identity foundations for CongDongNgonNgu without inheriting unsafe account-merging or provider assumptions from EduAI.

## Scope
Email/password authentication; verification and password recovery; access/refresh session lifecycle; Google OAuth; provider abstraction for Facebook/Zalo/Apple; explicit account linking; authorization boundaries; auth UI and recovery states.

## Principles
- Backend authorization is authoritative; route guards are only UX.
- Never silently merge accounts merely because provider emails match.
- Provider-disabled/misconfigured paths fail closed and explain recovery safely.
- No production provider credentials are required to complete provider abstraction; activation is separate evidence.

## Completion gate
Core email auth/session and Google flow implemented/tested in approved environment, collision/linking policy enforced, responsive auth UI complete through Stitch, negative security tests green, commits pushed and CI verified.
