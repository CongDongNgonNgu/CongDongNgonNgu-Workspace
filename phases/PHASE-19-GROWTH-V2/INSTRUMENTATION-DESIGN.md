# Phase 19A conceptual measurement gaps — inactive design

No implementation, tracking script, migration, persisted event, SDK, provider,
credential, deployment or collection is added. These are optional future
designs for gaps found in the [source map](EVIDENCE-SOURCE-MAP.md), not selected
Growth V2 features. Existing server facts are preferred. DUPLICATE_TELEMETRY_MINIMIZED=YES.

| Proposed signal | Decision supported / trigger | Minimal internal properties | Prohibited properties | Retention and aggregation | Privacy / abuse / authorization concerns |
| --- | --- | --- | --- | --- | --- |
| evidence_cohort_context | Separate real/fixture/internal/unknown actors before estimates; approved operator classification, not user guesswork | classification enum, provenance version, effective window; controlled internal registry reference only if needed | email/name, inferred demographics, fingerprint, raw user exports | OWNER_POLICY_REQUIRED; join internally, publish only suppressed coverage; registry may be operator-supplied without new production persistence | Registry link is personal data; require ownership/review, access controls and auditable corrections; unknown never defaults real; no account mutation authorized |
| exchange_outcome_confirmed | Measure explicit exchange completion; future reviewed authenticated domain action with defined participant confirmation semantics | deduplicated connection/outcome reference, occurrence time, outcome enum, rule version; participant checks internal | message/audio body, contact details, IP/token/device identifiers | OWNER_POLICY_REQUIRED; bounded cohort aggregates, cancellation retained; aggregate then minimize under approved lifecycle | Current CONNECTED state and mutable/deleted rows do not prove completion; two-party consent/authorization, idempotency, abuse and dispute semantics need separate review before implementation |
| library_open_aggregate | Only if an evidenced decision later needs content-use counts; authenticated explicit Library open under approved definition | resource category/language, coarse approved time bucket, eligible-cohort classification; internal dedup key only if justified | text/query strings, private content, identities, precise location/full IP, auth/device fingerprint | OWNER_POLICY_REQUIRED; minimize to suppressed bucket counts, no long-lived clickstream | Open is not reading/learning; client spoof/replay/background fetch excluded; auth/provenance and sample privacy review required; no browser event collector deployed |

No additional learning-improvement signal is designed: an event cannot validate
an assessment. No duplicate tracking for community contributions, Library review,
challenge completion, event attendance or notification reads where vetted server
facts already suffice. New learning claims require validated methods, not counters.

EXTERNAL_ANALYTICS_PROVIDER_DECISION=NOT_REQUIRED for this design. Do not choose
GA/PostHog/Mixpanel/Amplitude or create accounts/SDKs/credentials. If a later
approved problem proves such need, record DEFERRED_REQUIRES_OWNER_APPROVAL.

## Conditional production hard stop

HUMAN_AUTHORIZATION_REQUIRED=IMPLEMENT_AND_ACTIVATE_SPECIFIED_PRODUCTION_MEASUREMENT
only if the owner later chooses a necessary new-data path. Target would be
Backend domain boundaries (exchange/source classification and approved aggregate
reader) and possibly Frontend Library interaction; exact files/design and data
policy must be reviewed before requesting deployment authorization. No exact
production patch exists yet, so this is a dependency description, not a deploy
approval request. Production deployment/restart could introduce new persistent
personal facts and runtime load. Require approved consent/access/retention,
suppression, capacity/abuse controls and backup/recovery plan first.

Rollback would disable the approved collection path under separate authorization;
already collected records require approved minimization/deletion handling and
cannot be assumed erased by a source rollback. The recreatable-demo backup waiver
does not cover non-recreatable telemetry. Existing payment/auth/privacy/monitor
controls must remain. No production action is performed by this document.
