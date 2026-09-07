# Phase 13 Acceptance

- Room access/speaker/moderation permissions are backend-enforced.
- Provider tokens are scoped and secrets never reach client bundles/logs.
- Join/leave/reconnect/queue behavior remains consistent under retries.
- Private rooms cannot be entered by guessing IDs alone.
- Mute/remove/report and chat abuse controls are tested.
- No voice is recorded/stored by default; AI transcription/feedback requires explicit consent and documented retention.
- UI clearly handles microphone denial, provider outage and reconnect on mobile/desktop.
- Stitch/responsive/a11y, provider environment evidence, tests, commits and CI complete.
