# Phase 12 Acceptance

- Notifications are canonical server records; losing realtime connection does not permanently lose state.
- Read/unread counts are authorized and idempotent.
- Realtime reconnect/backoff/dedup and fallback behavior is tested.
- System/deleted actors and targets render safely without leaking raw IDs or breaking UI.
- Preferences suppress optional noise but cannot disable required security/account/payment notices if policy requires them.
- Desktop dropdown/panel closes correctly by action/outside/Escape and mobile uses an intentional full-screen/route design.
- Event links respect target visibility/authorization.
- Stitch/responsive/a11y, reliability tests, commits and CI evidence complete.
