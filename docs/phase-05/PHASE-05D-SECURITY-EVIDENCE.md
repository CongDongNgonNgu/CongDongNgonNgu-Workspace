# Phase 05D — Abuse, Authorization & Final Reconciliation

Date: 2026-09-15

All runtime records and identities in this evidence are NEON_TEST_ONLY. No
production database, migration, or deployment was touched.

## Closure

~~~text
PHASE_05=DONE
LNG_05_001=DONE
LNG_05_002=DONE
LNG_05_003=DONE
LNG_05_004=DONE
LNG_05_005=DONE
LNG_05_006=DONE
LNG_05_007=DONE
PHASE_06=READY
PHASE_06_STARTED=NO
~~~

Phase 06 is eligible but was not started. No Phase 06 code, migration, or
product work was added.

## Runtime and identity strategy

The live journey used the authorized Neon TEST database through normal
registration, verification-token, login, bearer-session, and cookie-session
flows. No auth guard was bypassed and no production credential was used.
Identities used the example.test domain and were disposable.

~~~text
TEST_RUN=mu22yd8f
OWNER_USER_ID=dc45955c-fe49-4840-b10c-5acbacd5c1ea
VIEWER_USER_ID=e64f4740-838b-4172-988f-9158f3c8ac5f
REVIEW_POST_ID=4aa29dab-9b6f-4ac1-a2e0-1dde99fedc1b
PRIVATE_POST_ID=5282c420-fa88-4750-ac97-642194103911
HIDDEN_POST_ID=69f8057b-9a42-478d-af28-760bd733d64d
DELETED_POST_ID=52b1d509-2004-4034-b446-dd1a6a8a209d
RATE_LIMIT_POST_ID=2b2c73d4-e6ba-4a83-a69e-d5269b6313ff
~~~

The populated browser review reused the authorized Phase 05C TEST post
df20c0bb-0ac4-4231-9deb-e4d19613b218 because it contains real multiline
Vietnamese, CJK, a deleted-parent continuation, and the accepted detail
structure. It remains TEST data.

## Health and API smoke evidence

~~~text
GET /api/v1/health = 200
GET /health = 404 (expected; not an exposed contract)
GET /api/v1/languages = 200
GET /api/v1/community/posts = 200
LANGUAGE_CATALOG=vi,en,zh,ja,ko,fr,de,es
MIGRATIONS=0001_APPLIED,0002_APPLIED,0003_APPLIED; none run
~~~

## Security evidence matrix

| Check | Result | Evidence |
| --- | --- | --- |
| POST_IDOR | PASS | Other-user PATCH/DELETE rejected; ownership fields rejected. |
| COMMENT_IDOR | PASS | Other-user edit/delete and parent/identity tampering rejected. |
| PRIVATE_POST_ACCESS | PASS | Owner read allowed; other/unauthenticated paths unavailable. |
| HIDDEN_POST_ACCESS | PASS | Hidden detail/interactions/share unavailable uniformly. |
| DELETED_POST_ACCESS | PASS | Deleted detail/interactions/share unavailable uniformly. |
| PRIVATE_SHARE | PASS | Private share unavailable. |
| HIDDEN_SHARE | PASS | Hidden share unavailable. |
| DELETED_SHARE | PASS | Deleted share unavailable. |
| SAVE_PRIVACY | PASS | Save state is viewer-private; cross-user tampering rejected. |
| REPORT_PRIVACY | PASS | POST and COMMENT reports return only submitted=true. |
| REPORT_DUPLICATE_PRIVACY | PASS | Duplicate/nonexistent/hidden/private targets remain generic. |
| REACTION_IDEMPOTENCY | PASS | Helpful add/remove is idempotent and count-stable. |
| REACTION_CONCURRENCY | PASS | Existing deterministic race coverage remains green; one stored Helpful. |
| POST_COUNT_RECONCILIATION | PASS | Post interaction count follows mutation state. |
| COMMENT_COUNT_RECONCILIATION | PASS | Top-level/reply delete sequence reconciles 2 to 1 to 0. |
| DELETED_PARENT_PRIVACY | PASS | Deleted body/author absent; placeholder and visible reply remain. |
| RATE_LIMIT_POST | PASS | Source-wired 10/15m rule; deterministic boundary/key tests pass. |
| RATE_LIMIT_COMMENT | PASS | Source-wired 60/15m rule; live TEST accepted 60 and rejected 61st. |
| RATE_LIMIT_REACTION | PASS | Source-wired 120/5m rule; operation/actor buckets isolated. |
| RATE_LIMIT_SAVE | PASS | Source-wired 120/15m rule; save bucket is distinct. |
| RATE_LIMIT_REPORT | PASS | Source-wired 10/hour rule; stable 429 behavior covered. |
| CSRF_COOKIE_MUTATIONS | PASS | Cookie mutation without CSRF rejected; valid token accepted. |
| INPUT_IDENTITY_SPOOFING | PASS | userId/authorUserId/reporterUserId cannot override session identity. |
| XSS_RENDERING | PASS | Script, image-handler, JavaScript, template, and SQL-looking text is literal. |
| OVERSIZED_POST | PASS | 20,000 code points accepted; 20,001 rejected. |
| OVERSIZED_COMMENT | PASS | 5,000 code points accepted; 5,001 rejected. |
| OVERSIZED_REPORT | PASS | 1,001-code-point details rejected. |
| INVALID_LANGUAGE | PASS | Unknown/inactive language rejected. |
| INVALID_CEFR | PASS | Invalid CEFR rejected. |
| INVALID_POST_TYPE | PASS | Invalid post type rejected. |
| INVALID_VISIBILITY | PASS | Unsupported visibility rejected. |
| INVALID_REACTION | PASS | Unsupported reaction rejected. |
| INVALID_REPORT_CATEGORY | PASS | Invalid report category rejected. |
| FEED_PAGINATION_DEDUP | PASS | Two pages complete and non-duplicating; invalid cursor rejected. |
| COMMENT_PAGINATION_DEDUP | PASS | Two comment pages non-duplicating. |
| MODERATION_VISIBILITY | PASS | Hidden/deleted records absent from public reads/interactions. |
| NON_ACTIVE_USER_WRITES | PASS | ACTIVE, VERIFICATION_PENDING, and DISABLED covered. |

## Proven defects and minimal remediation

Two genuine defects were proven:

1. requireReadablePost() did not verify active target language and active,
   verified author. It now returns the same unavailable contract for those
   cases.
2. listComments() dropped inactive-author comments instead of preserving a
   non-content placeholder. It now omits only a genuinely deleted parent with
   no visible replies, preserving privacy and count consistency.

The focused regression suite is test/community-security.e2e-spec.ts. The
rate limiter gained deterministic boundary and key-isolation unit coverage.
No API shape or migration changed.

## Rate-limit architecture

~~~text
RATE_LIMIT_IMPLEMENTATION=PROCESS_LOCAL
DEPLOYMENT_MODEL=UNKNOWN
HORIZONTAL_SCALE_RATE_LIMIT_BLOCKER=YES
PHASE_05_ACCEPTANCE_RATE_CONTROL=PASS
~~~

The limiter is an in-memory per-process map. No Redis or other infrastructure
was introduced. This is adequate for the verified local/single-process Phase
05 runtime, but is not distributed protection. A shared limiter remains a
future production-readiness requirement if deployment becomes horizontal.

## Browser/runtime regression

The browser used the local Frontend with the real local Backend proxy and
populated Neon TEST data; no fixture or fallback Community content was used.

~~~text
CANONICAL_DETAIL_DESKTOP=51fd56d9452c48d198f814f89c6baa36
CANONICAL_DETAIL_MOBILE=5c3d5fbc3ac646a183425122e9ae57f5
DETAIL_RUNTIME_DESKTOP=docs/phase-05/PHASE-05D-RUNTIME-DESKTOP.jpg
DETAIL_RUNTIME_MOBILE=docs/phase-05/PHASE-05D-RUNTIME-MOBILE.jpg
~~~

The captures show real author/metadata, multiline Vietnamese/CJK content,
Helpful/Save/Share actions, comments/replies, deleted-parent placeholder,
composer, and learning rail. Existing accepted Feed/Composer/Detail/Comments
evidence was preserved; no Stitch screen was regenerated and no Frontend
source changed.

| Viewport | Result |
| ---: | --- |
| 320 | PASS — no horizontal overflow; article, discussion, composer and placeholder present |
| 375 | PASS — no horizontal overflow; article, discussion, composer and placeholder present |
| 390 | PASS — no horizontal overflow; mobile shell and actions usable |
| 412 | PASS — no horizontal overflow; article and comments readable |
| 768 | PASS — no horizontal overflow; detail structure intact |
| 1024 | PASS — no horizontal overflow; detail structure intact |
| 1440 | PASS — no horizontal overflow; detail and learning rail intact |

~~~text
ACCESSIBILITY=PASS
LIGHTHOUSE_ACCESSIBILITY=100
LIGHTHOUSE_BEST_PRACTICES=100
LIGHTHOUSE_SEO=100
APPLICATION_CONSOLE_ERRORS=0
UNEXPECTED_NETWORK_ERRORS=0
~~~

Runtime semantics included main/article, discussion, comment/reply labels,
plain-text deleted placeholders, labelled composer controls, visible action
names, and modal semantics. The owner keyboard pass verified focus enters
Edit/Delete dialogs, Tab and Shift+Tab remain contained, cancel/Escape closes,
and focus returns to the initiating menu control.

## Verification and publication

~~~text
BACKEND_TESTS=61 tests / 13 suites PASS
BACKEND_E2E=35 tests / 7 suites PASS
BACKEND_TYPECHECK=PASS
BACKEND_LINT=PASS
BACKEND_BUILD=PASS
BACKEND_AUDIT=0 vulnerabilities
FRONTEND_TESTS=26 files / 126 tests PASS
FRONTEND_TYPECHECK=PASS
FRONTEND_LINT=PASS
FRONTEND_BUILD=PASS
FRONTEND_AUDIT=0 vulnerabilities
FRONTEND_CHANGED=NO
FRONTEND_SHA=d674578ae2c3f139b625200fe95d0f6c46bf0f14
FRONTEND_CI=PASS (run 34919568353)
BACKEND_CHANGED=YES
BACKEND_SHA=833a4228a0e750aebfcd042a992afa26121f5be7
BACKEND_CI=PASS (run 34926059622)
WORKSPACE_BASELINE_SHA=76ed2278a71cdbc7ea561039fc82d9fdff76452d
BACKEND_PUBLISHED_SHA=833a4228a0e750aebfcd042a992afa26121f5be7
NEON_TEST_ONLY=YES
PRODUCTION_DATABASE_TOUCHED=NO
DEPLOYED=NO
~~~

The final Workspace SHA is recorded in the publication report after this
documentation commit is pushed to main. No force push, rebase, deploy, or
migration was used.
