# Data Lifecycle, Retention and Offboarding Policy

**Status:** Phase 17F accepted on 2026-10-02

**Scope:** This document is the canonical repository-backed record of the
current data lifecycle boundary. It describes implemented behavior and
explicit release gates; it does not advertise an unimplemented retention,
export, erase or purge capability.

## Rules

- A data class is not described as automatically erased or expired unless
  the current source and operational evidence prove that behavior.
- Account disablement, session revocation and moderation removal are
  available controls, but they are not a promise of complete account
  erasure.
- Integrity evidence for moderation, provenance, payment, fulfillment,
  ledger or security review may need to outlive the account that created it.
  Any future minimization must preserve the required integrity chain.
- Voice recording, transcript storage, live AI execution and live payment
  provider execution remain disabled in the reviewed production wiring.
- A future offboarding or purge workflow requires an approved policy,
  operator or user authorization, TEST-mode verification, audit evidence,
  rollback or recovery handling and an explicit release gate.

## Current data-class matrix

| Data class | Current purpose and surface | Current lifecycle behavior | Release boundary |
| --- | --- | --- | --- |
| Account and authentication | User identity, provider links, sessions, refresh/auth material and OAuth transactions | Expiry and revocation controls are enforced where defined; account disablement exists. No self-service account erase or scheduled purge executor is shipped. | Before production erasure, define the workflow for credentials, provider links, sessions, tokens and OAuth transactions, then verify it in TEST and audit the result. |
| Profile and language exchange | Owner-controlled profile, preference and exchange data; safe public projections | Owner-scoped updates and privacy projections are implemented. There is no complete account-delete orchestration. | Verify identifier detachment, public projections, search results, exchange visibility and dependent references before enabling deletion. |
| Community and corrections | Posts, comments, corrections, reports, moderation and safety evidence | User or admin removal is represented as moderation or soft-delete state; public projections neutralize removed or inactive authors and bodies. No purge job is proven. | Preserve moderation and safety integrity evidence while defining any future content purge and its public-cache/search effects. |
| Library, reputation and provenance | Contributions, reviews, provenance, reputation events and immutable ledger facts | Integrity and audit facts are retained by design; identifiers must be minimized under an approved policy rather than removed ad hoc. | Any deletion must preserve provenance, review and credit reconciliation invariants and include an audited migration or executor. |
| Notifications | User notification items and read state | Item-level policies include DAYS, UNTIL_READ and INDEFINITE; current mappings include bounded 180- and 365-day values. No scheduled purge executor is proven. | Implement and verify the scheduler, policy configuration, failure handling and audit evidence before advertising automatic expiry. |
| AI conversations | AI request and conversation boundary | The current conversation repository is in-memory; providers fail closed and no durable transcript store is enabled. | A durable transcript or AI provider requires a separate approved data policy, consent boundary, redaction strategy and release review. |
| Audio and post-room data | Speaking-room media, recording and transcript boundary | Production wiring uses a disabled media provider; no recording or transcript table is enabled and the post-room contract does not advertise storage. | Recording or transcription requires explicit informed consent, storage/deletion policy, access controls and a separate release gate. |
| Payment and entitlement | Orders, provider attempts, fulfillment, subscriptions, credits and reconciliation facts | Provider and live transactions are disabled in the reviewed environment. Financial and fulfillment evidence must remain coherent for any future deletion. | A future offboarding workflow must preserve reconciliation, settlement, fulfillment and credit invariants and must not delete live financial evidence ad hoc. |
| Admin and security audit | Sanitized security facts, moderation audit and operational review evidence | Sensitive payloads, signatures and secrets are not persisted in the reviewed paths. No general purge schedule is proven. | Define retention by audit class, minimize identifiers safely and verify access, export and purge behavior before production use. |

## Current offboarding boundary

The current system supports account disablement and session/authentication
revocation controls. It does not ship a self-service account deletion,
complete export or account-wide purge orchestration, so no such capability
is advertised.

Any future approved offboarding runbook must, at minimum:

1. verify the request and authorization;
2. disable the account and revoke sessions, refresh material and other
   revocable authentication state;
3. detach or minimize identifiers where lawful and compatible with
   provenance, moderation, payment, fulfillment and audit integrity;
4. apply the approved data-class retention policy;
5. verify public projections, search results, notifications and dependent
   references; and
6. record auditable evidence, failures and recovery actions.

Ad hoc deletion of users or broad cascades is not an acceptable substitute:
the current foreign-key and integrity relationships require a deliberate,
tested workflow.

## Phase 17F M-002 disposition

**Definition:** Rate-limit, block/report, privacy or retention gaps enable
harassment, enumeration or stale-data leakage.

**Severity:** Medium

**Owner:** Community/privacy owners, with platform ownership for any
distributed production limiter and domain owners for future lifecycle
executors.

**Disposition:** RECONCILED_WITH_RELEASE_GATES

The 17F reconciliation rechecked the following:

- block/report/mute controls, privacy projections, moderation state,
  provider fail-closed behavior and hostile browser coverage are present;
- the community limiter is deterministic and bounded per process, but remains
  process-local and is therefore an explicit pre-production gate before
  horizontal scaling; and
- account-wide deletion, scheduled purge and durable AI/audio transcript
  retention are not shipped or advertised, so future implementation must
  pass the data-class, authorization, TEST, audit and release gates above.

Evidence: evidence/phase-17/PHASE-17F-EVIDENCE-2026-10-02.md.
