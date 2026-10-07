# Phase 24 Acceptance

Prospective acceptance contract.

- Bounded copy inventory for auth, onboarding/profile-language and exchange browse/detail has no unexplained user-visible hardcoded gaps in scope.
- vi/en switching and reload persistence use the existing locale foundation.
- Missing English entries fall back safely according to established policy rather than breaking the journey.
- UI locale remains independent from learning/target language, authentication session and route identity.
- Errors do not expose unsafe raw backend text and preserve safe mapped semantics.
- Consent/legal labels are translated only under approved ownership; no altered legal meaning is invented.
- Keyboard/a11y behavior and long-copy layout remain usable.
- Responsive runtime passes at 320, 375, 390, 412, 768, 1024 and 1440 where applicable.
- Relevant auth/navigation/exchange and full Frontend gates/CI pass with observed evidence.
- `EN_COPY_HUMAN_REVIEW` is recorded truthfully; technical completion never implies human linguistic certification.
