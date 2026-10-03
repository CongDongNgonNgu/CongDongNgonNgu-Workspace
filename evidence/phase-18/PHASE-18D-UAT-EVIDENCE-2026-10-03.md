# Phase 18D Approved TEST/UAT Execution Evidence

**Date:** 2026-10-03
**Evidence record:** `UAT-20261003-final-01`
**Task:** LNG-18-004
**Matrix:** `evidence/phase-18/PHASE-18B-JOURNEY-MATRIX.md`
**Execution revision:** Backend `6a5b558e3951962be6445d23111cb2cbaaad337a`

## Scope and target safety

- `CURRENT_DATABASE_CLASSIFICATION=APPROVED_TEST_UAT`
- `PRODUCTION_DATABASE=NO`
- Target: `ep-crimson-grass-azmsfir8-pooler.c-3.ap-southeast-1.aws.neon.tech`, database `neondb`, schema `public`.
- Sanitized deterministic target fingerprint: `afbbdfd482dea1c4fab2ea27b35f2c2223c86c769fda15164d0401fceeeace5d`.
- Read-only preflight matched the approved host/database/schema, reported a non-production runtime, and remained stable before and after execution.
- Runtime-only provider overrides disabled payment, inbox/email, AI, OAuth, storage, realtime and external provider calls. The repository `.env` file was not edited.

## Migrations and guarded seed

| Check | Result | Observed evidence |
| --- | --- | --- |
| Existing approved migrations | `PASS` | 26 migrations present after execution; 11 already applied; 15 applied; latest `0026_phase15_admin_audit.sql`; checksum mismatches: 0 |
| Guarded 9-persona seed | `PASS` | 9 personas seeded; runtime password was not recorded |
| Post-seed target/data checks | `PASS` | Target fingerprint matched; 9 personas, 22 role rows, 9 profiles, 18 language rows |
| Provider safety | `PASS` | Payment routes: 0; inbox routes: 0; external provider routes: 0 |

No production database was accessed, no production migration/write was
performed, and no secret, token, password, raw message or production data was
recorded in this evidence.

## Journey classification

| Classification | Count | Rows |
| --- | ---: | --- |
| `PASS` | 16 | J-001, J-003, J-004, J-005, J-006, J-007, J-008, J-009, J-012, J-013, J-015, J-016, J-018, J-019, J-020, J-021 |
| `FAIL` | 1 | J-017 |
| `BLOCKED_EXTERNAL` | 5 | J-002, J-010, J-011, J-014, J-022 |
| `UNSAFE_PRODUCTION_TEST` | 0 | No unsafe production action was attempted |
| `NOT_APPLICABLE` | 0 | Disabled sub-capabilities are recorded within their parent row; for example, J-016 media failed closed as `ROOM_MEDIA_UNAVAILABLE` and was explicitly not applicable |

### Observed blockers and defect

- **J-002:** Seeded login/refresh/logout/logout-all passed. Register/verify was
  not executed because the approved inbox is unavailable.
- **J-010:** Writing and grammar requests returned fail-closed
  `503 AI_PROVIDER_UNAVAILABLE`; the AI provider was disabled and no provider
  call was made.
- **J-011:** Conversation create/get/stop worked; the AI turn returned
  `503 AI_PROVIDER_UNAVAILABLE`, so explain could not produce a message.
- **J-014:** PayOS sandbox/credentials are unavailable; no payment route was
  invoked and no order or real-money action was attempted.
- **J-017:** Event cancellation returned HTTP 500
  `EVENT_REGISTRATION_CONFLICT`. A narrow repository diagnostic against the
  same UAT fixture isolated PostgreSQL SQLSTATE `42P18` (ambiguous parameter
  type) in the cancellation path. The challenge list returned HTTP 200 with
  no fixture because the challenge catalog is unavailable. This row remains
  `FAIL` because an observed backend defect must not be hidden by the external
  challenge blocker.
- **J-022:** Local health returned HTTP 200; external monitoring and the backup
  target remain unavailable.

The remaining PASS rows exercised the approved UAT dataset through the guarded
in-process HTTP journey runner. J-020 remains supported by the existing 18C
security evidence and J-021 remains supported by the existing 18C responsive
and accessibility evidence.

## Phase status and follow-up

This execution improves the evidence for 18D but does not close Phase 18:

```text
PHASE_18_STATUS=BLOCKED_EXTERNAL
PHASE_18_DONE=NO
PHASE_18_LAUNCH_READY=NO
PHASE_19_STARTED=NO
```

Current blockers are the unavailable approved inbox, PayOS sandbox, AI
provider, challenge catalog, backup target and external monitoring, plus the
J-017 cancellation defect. No production deploy/restart/migration/write,
provider activation, secret mutation, DNS change, real-money action or Phase
19 action was authorized or performed.
