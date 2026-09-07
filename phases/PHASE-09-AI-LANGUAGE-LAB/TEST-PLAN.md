# Phase 09 Test Plan

- Provider adapter contract tests with mock timeout/error/stream/invalid structured output.
- Usage accounting and quota boundary tests; concurrent/retry behavior.
- Prompt contract snapshot/schema tests across A1–C2/Native context where applicable.
- Conversation context limits and session reset.
- Writing/grammar output validation and malicious model output rendering safety.
- Roleplay config tests for all initial scenarios without page duplication.
- Retrieval authorization/provenance tests: public verified, draft/rejected/private/blocked-source exclusions.
- Prompt-injection fixture in retrieved community content.
- E2E each mode plus outage/quota recovery.
- Responsive/a11y: conversation scrolling, mobile keyboard, streaming announcements, focus and readable correction/quiz surfaces.
