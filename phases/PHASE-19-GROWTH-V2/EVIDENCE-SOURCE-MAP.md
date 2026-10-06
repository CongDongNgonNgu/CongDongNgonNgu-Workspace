# Phase 19A evidence source map

Read-only source inspection on 2026-10-06; not production data acquisition.
Backend source baseline `bec4ea4ac58abcbae0eb01c0c58bf7c0fd55bae5`, Frontend
`940e278555b2d33054fb2780d7348ded59ba2c3e`, Workspace recovery baseline
`c7e4c6c53a5037c7fe27d0d0eed33f47252e922d`; all clean/synchronized.
Backend paths below are relative to its repository. Source structural capability
does not prove production persistence, applied migrations, populated records,
approved aggregate access or eligible real-user history. No .env, production
SQL, raw users/feedback, snapshots, dashboard exports or live providers accessed.

EXISTING_AGGREGATABLE means domain facts could support a future approved
operator-side aggregate after cohort/privacy review; it does not authorize a
query or designate an approved existing aggregate feed. Each listed source has
exactly one source classification. Source IDs resolve measurement dictionary.

| ID / source | Classification | Exact inspected source reference | Meaning and evidence limits |
| --- | --- | --- | --- |
| A1 Accounts | EXISTING_AGGREGATABLE | `database/migrations/0001_identity.sql` | created_at and verification/status support signup aggregates after exclusions; signup is not activity. No universal seed/test/environment/cohort flag |
| A2 Sessions | SENSITIVE_REQUIRES_SEPARATE_APPROVAL | `database/migrations/0001_identity.sql`; `src/identity/postgres-identity.repository.ts` | session creation/expiry/rotation/revocation; last_used_at updated at refresh rotation, not general activity; no credentials/token digests exported |
| B Learning/reputation | EXISTING_AGGREGATABLE | `database/migrations/0012_phase10_reputation_ledger.sql`; `src/reputation/learning-xp.service.ts` | trusted source identities, rule version, awards/reversals and occurrence-derived ledger time; live completion producers NOT_ESTABLISHED (trusted entry point found without production caller); XP is not proficiency gain |
| C Profile/language | EXISTING_AGGREGATABLE | `database/migrations/0002_language_profile.sql`; `src/profile/postgres-profile.repository.ts` | language roles, visibility, current goals/proficiency; current profile is declaration/snapshot, not reading/session outcome; private attributes excluded |
| D Community/corrections | EXISTING_AGGREGATABLE | `database/migrations/0003_community.sql`; `database/migrations/0004_corrections_qa.sql`; `database/migrations/0005_phase06_contribution_candidates.sql`; `src/community/postgres-community.repository.ts`; `src/corrections/postgres-corrections.repository.ts` | timestamped authored contributions, reactions/saves; mutation/deletion affects history; no content/body exports |
| E Hub participation | EXISTING_AGGREGATABLE | `src/profile/language-hub.contract.ts`; D/C/I language-scoped facts | catalog/profile plus scoped authored facts can support defined participation; overview traffic is not demand; no page-view history established |
| F Exchange outcomes/history | REQUIRES_NEW_INSTRUMENTATION | `database/migrations/0007_language_exchange_connections.sql`; `src/exchange/exchange-connection.types.ts`; `src/exchange/postgres-exchange-connection.repository.ts` | PENDING/CONNECTED pairs only; declines/cancels/disconnects remove rows. CONNECTED is acceptance, not completion; no durable completion/funnel history or dedicated acceptance timestamp proven |
| G Room presence | EXISTING_AGGREGATABLE | `database/migrations/0018_phase13_speaking_rooms.sql`; `database/migrations/0019_phase13_room_participants.sql`; `database/migrations/0020_phase13_room_queue_moderation_chat.sql`; `src/rooms/room.module.ts` | PRESENT/DISCONNECTED/LEFT/REMOVED and join/last-seen/left facts; deduplicate rejoins/devices; DisabledMediaProvider means no actual speech/audio outcome inferred |
| H1 Challenges | EXISTING_AGGREGATABLE | `database/migrations/0021_phase14_challenges.sql`; `src/challenges/challenge.service.ts` | JOINED/LEFT/COMPLETED with progress/trusted idempotent source events; configured threshold completion only; trusted live progress producers NOT_ESTABLISHED; source existence not proof live population |
| H2 Events | EXISTING_AGGREGATABLE | `database/migrations/0022_phase14_events.sql`; `database/migrations/0023_phase14_event_participation.sql`; `src/events/event.module.ts` | REGISTERED/WAITLISTED/CANCELLED distinct from HOST_MARKED/ROOM_PRESENCE attendance; reminder intent is not delivery; NoopEventAttendanceLearningHook gives no automatic learning outcome |
| I Library supply/review | EXISTING_AGGREGATABLE | `database/migrations/0009_open_language_library.sql`; `database/migrations/0011_library_contribution_events.sql`; `src/library/postgres-library.repository.ts`; `src/library/importers/tatoeba/postgres-tatoeba-sentence-import.repository.ts`; `src/library/importers/tatoeba/postgres-tatoeba-translation-import.repository.ts` | DRAFT/COMMUNITY_REVIEW/VERIFIED/REJECTED, review audit and provenance; OPEN_DATASET imports separated from community-origin resources; no durable reads/downloads/learning-use analytics shown |
| J Moderation/reports | SENSITIVE_REQUIRES_SEPARATE_APPROVAL | `database/migrations/0003_community.sql`; `database/migrations/0025_phase15_moderation_reports.sql`; `database/migrations/0026_phase15_admin_audit.sql`; `src/admin/admin-audit.repository.ts` | reports OPEN/DISMISSED/ACTIONED with notes/audit; updated_at not dedicated resolution instant; only validated audit transitions can establish timing; never expose reporter/target/body |
| K Notifications | EXISTING_AGGREGATABLE | `database/migrations/0016_phase12_notifications_read_state.sql`; `database/migrations/0017_phase12_notification_preferences.sql`; `src/notifications/postgres-notification.repository.ts` | in-app UNREAD/READ timestamps; neither relevance nor external delivery/open/click evidence; variables/actor/target data excluded |
| L Membership entitlement | EXISTING_AGGREGATABLE | `database/migrations/0013_phase11_membership_model.sql`; `src/membership/membership.module.ts` | DEFAULT_FREE/ADMIN_GRANT/CONTRIBUTION_CREDIT/PURCHASE origin; grants/credits not paid conversions |
| M Live payments | DISABLED | `database/migrations/0014_phase11_checkout_payment.sql`; `database/migrations/0015_phase11_webhook_fulfillment_lifecycle.sql`; `src/membership/membership.module.ts` plus Phase 18 closeout | provider unselected/disabled; no real conversion/churn; test PAID rows/schema do not prove sales |
| N Live AI | DISABLED | `src/ai/ai.module.ts`; `src/ai/ai.conversation.module.ts`; `docs/08-DATA-LIFECYCLE.md` in Workspace | fail-closed adapters, disabled post-room execution, in-memory conversation/usage/quota/rate repositories; no durable live cost/usefulness evidence |
| O1 GitHub engineering/support issues | TECHNICAL_ONLY | Workspace GitHub issue metadata and `docs/operations/PRODUCTION-AVAILABILITY-MONITOR.md` | operational/engineering issues only; previous zero-open inventory does not prove zero user support demand |
| O2 Post-launch user feedback/support | MISSING | No approved dated package identified in `evidence/phase-19/PHASE-19A-EVIDENCE-INVENTORY-2026-10-06.md` | prior owner UI reviews do not supply real-user sample or post-launch themes; manual redacted input needed |
| P Render/Vercel/GitHub diagnostics | TECHNICAL_ONLY | Workspace `.github/workflows/production-availability-monitor.yml`, Phase 18 deployment/monitor evidence | availability/revision/requests are supporting context; authenticated dashboard access is not permission to export user logs; no traffic counts inferred |
| Q Historical acceptance fixtures | TEST_UAT_ONLY | Workspace `evidence/phase-18/PHASE-18B-JOURNEY-MATRIX.md`; Backend `src/cli/uat-seed.ts`, `src/cli/uat-seed.runner.ts` | fixture/test acceptance, not real-user growth; seeder rejects production; known fixtures do not identify every manual/demo actor |

Most domain modules choose PostgreSQL versus memory via persistence wiring;
deployment configuration/migration application was not inspected. Inventory
classes describe source potential, not measured production availability.
Frontend source/package search found no GA/PostHog/Mixpanel/Amplitude tracking
integration in the searched `src`/package boundaries. This is a scoped search,
not proof that every external dashboard or injected script is absent.

## Evidence-category gap matrix

| Category | Exact gap classification | Safe future path; current evidence remains unavailable |
| --- | --- | --- |
| Account creation / authored activity / hub activity | CAN_DERIVE_FROM_EXISTING_DATA | Potential A1/D/E/B facts, subject to source access and cohort completeness; no approved aggregate feed identified |
| Real-user versus fixture separation | NEEDS_MANUAL_FEEDBACK_INPUT | Operator-reviewed exclusion/cohort registry provenance; if unavailable, reliable cohort context NEEDS_NEW_INSTRUMENTATION under future approval |
| Retention/returning users | UNKNOWN | Complete eligible prior-history coverage and stable meaningful-action semantics not established |
| Learning completion | CAN_DERIVE_FROM_EXISTING_DATA | Potential trusted B/H facts only after checking actual producers; not general learning improvement |
| Learning improvement | UNKNOWN | No validated comparable pre/post assessment evidence established; LEARNING_OUTCOME_EVIDENCE=UNAVAILABLE for improvement |
| Library supply/provenance/review | CAN_DERIVE_FROM_EXISTING_DATA | Potential I with imported/seed/community separation and validated source state |
| Library consumption | NEEDS_NEW_INSTRUMENTATION | No durable read/use signal established; may remain UNAVAILABLE rather than instrument without evidenced need |
| Exchange completion/start-cohort funnel | NEEDS_NEW_INSTRUMENTATION | F loses terminal/history facts; current connections cannot substitute |
| Room presence / challenge thresholds / event attendance | CAN_DERIVE_FROM_EXISTING_DATA | Potential G/H only with durable qualifying facts; disabled media means speech outcome NOT_APPLICABLE_CURRENT_PRODUCT |
| Moderation/safety | CAN_DERIVE_FROM_EXISTING_DATA | J operator-approved suppressed aggregates; validated transitions for durations; sensitive review separate |
| Notification reads | CAN_DERIVE_FROM_EXISTING_DATA | K in-app read state only; external delivery unsupported |
| User feedback / support / willingness to pay | NEEDS_MANUAL_FEEDBACK_INPUT | Approved paraphrased existing research/support themes with sample/provenance/bias |
| Paid conversion/churn and AI live usage/cost | NOT_APPLICABLE_CURRENT_PRODUCT | N/A_DISABLED, never negative evidence or zero demand |
| Provider traffic/monitor health | CAN_DERIVE_FROM_EXISTING_DATA | Technical context only, not evidence fulfilling usage/retention/demand |

No production SQL or new collection is needed for this planning artifact.
No existing approved product aggregate feed was found. Do not automatically
query any structurally plausible source: identify its approved access/aggregate
report and relay the exact requested action first. Backup/privacy/retention
approval precedes meaningful new persistent data, regardless of demo waiver.
