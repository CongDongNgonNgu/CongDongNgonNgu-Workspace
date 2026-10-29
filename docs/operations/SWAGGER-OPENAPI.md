# Swagger / OpenAPI operations

Scope: Backend dev -> Render TEST only. No main merge, VPS deployment, Production .env change, Production database change, or Production CD activation is authorized by this task. Workspace documentation stays on docs/swagger-openapi with a review PR; main is not merged.

## Endpoints and enablement

| Environment | Swagger UI | OpenAPI JSON | Root when enabled |
| --- | --- | --- | --- |
| TEST | https://congdongngonngu-back-end.onrender.com/docs | https://congdongngonngu-back-end.onrender.com/docs-json | HTTP 302 -> /docs |
| Future Production | https://api.congdongngonngu.vn/docs | https://api.congdongngonngu.vn/docs-json | HTTP 302 -> /docs |

Global API prefix remains /api/v1. Health remains GET /api/v1/health. /api/v1/docs and /api/v1/docs-json are not aliases. Disabling Swagger removes root redirect, UI, JSON and static docs resources; API routes continue normally.
Swagger is OFF unless SWAGGER_ENABLED=true is explicitly configured. The document title is CongDongNgonNgu API, description is API documentation for the CongDongNgonNgu platform., and version comes from Backend package.json (currently 0.1.0).
Current generated coverage: 171 existing paths, 201 operations, 73 schemas, with 294 request DTO property annotations. Tags cover actual auth/profile/language/community/library/exchange/study-group/notification/messaging/attachment/admin endpoints and other existing modules. No endpoint was invented.
Input metadata follows actual validation constraints. General success responses use the existing success/data/message envelope; interface-based data payloads remain unrestricted unless a concrete health/SSE/binary contract is available, rather than inventing response models. Error metadata follows the existing error envelope.

## Configuration contract

| Variable | Requirement |
| --- | --- |
| SWAGGER_ENABLED | Exactly true or false; defaults false |
| SWAGGER_USERNAME | Required with enabled Production docs; optional only as a complete pair on TEST; 1-128 ASCII letters/digits or -_.@ |
| SWAGGER_PASSWORD | Required with username; 24-256 printable characters, independent secret; no default |
| SWAGGER_TRUST_PROXY | Exactly false or loopback; defaults false. Trusts HTTPS forwarding only from loopback peers, only for docs |

Production prerequisites before the future approved deployment:

- NODE_ENV remains production.
- Set SWAGGER_ENABLED=true in the existing Backend .env through the authorized operator only.
- Add independent SWAGGER_USERNAME and SWAGGER_PASSWORD in Backend .env only. Generate/store the real values out of band; never put them in chat, GitHub, logs or example files. Never reuse JWT, session or database secrets; startup rejects equal values.
- If Nginx terminates TLS and forwards from loopback, set SWAGGER_TRUST_PROXY=loopback only after verifying that topology and that Nginx overwrites X-Forwarded-Proto with its actual TLS scheme. Do not expose a trusted local proxy path to arbitrary clients. Direct TLS can keep this false.
- Preserve ownership/mode 600 and all existing Production .env contents. Do not copy .env to a staged release or TEST. No Production environment mutation occurred in this task.

Enabled Production docs without the required credential pair fail startup. Malformed flag values and partial/weak credential pairs also fail; errors name the requirement and never include secret values. An absent enable flag does not accidentally publish docs.
TEST setting: SWAGGER_ENABLED=true with no documentation credentials gives public TEST docs; existing API guards remain enforced. Keep NODE_ENV=test and existing TEST database/provider/feature settings unchanged. Optional docs credentials must be a complete independent pair and need a verified HTTPS transport; do not enable broad proxy trust for Render to work around failures.

## Access protection and browser security

Production documentation uses HTTP Basic authentication over HTTPS. The browser prompt authenticates documentation only; it does not log into application accounts. Application endpoints still require the existing Bearer JWT and applicable refresh-cookie/CSRF authorization. Bearer tokens are not documentation credentials.
The middleware covers case-insensitive docs paths, index/init scripts, CSS/JS/favicon/OAuth helper assets, JSON, YAML aliases and HEAD requests before Swagger serves anything. It hashes both credential fields to equal-size buffers and performs both comparisons with timingSafeEqual. It does not log credentials.
YAML publication is disabled (raw JSON only). Unauthenticated protected requests, including YAML attempts, receive 401 without schema content; authenticated YAML gets 404. Untrusted plain HTTP is rejected with 403 before credential challenge/acceptance. Only explicitly trusted loopback HTTPS forwarding can satisfy the proxy case; arbitrary client X-Forwarded-Proto headers are not trusted.
Root redirect is public and reveals only /docs; the target still requires credentials in Production. Docs responses use private, no-store and noindex/nofollow. Existing HSTS, nosniff, frame denial, referrer policy, CORS restrictions, validation pipes, exception filter and API authentication/rate safeguards remain.
Swagger needs inline styles; style-src permits unsafe-inline ONLY for documentation routes. Scripts remain self-only without unsafe-inline/eval; API CSP is unchanged. Assets/spec use the same origin, remote schema validation is disabled, query configuration is disabled, and JWT authorization is not persisted.
Production UI disables request submission and is read-only. API routes themselves are unchanged and remain callable by correctly authorized API clients. TEST UI permits normal guarded API usage; automated TEST verification performs read-only GET requests only.

## TEST rollout runbook

1. Verify Backend PR targets dev, all required quality checks pass, review findings are closed, and current application main remains unchanged. Do not remove either existing Production CD false gate.
2. Merge into dev, verify exact dev SHA/tree and post-merge CI. Render service srv-dahnerh594qs73fp3420 must track dev and use the existing build/start commands. Native build/start feature flags stay disabled as already configured.
3. Add only SWAGGER_ENABLED=true to the Render TEST service environment; preserve every existing value. If saving triggers a rebuild, ensure the selected commit is the approved green dev revision. If needed, deploy that specific successful SHA manually. No Production service or database is selected.
4. Wait until Render reports Live with the exact approved revision and no deployment error. Check /api/v1/health reports service congdongngonngu-backend and environment test.
5. Verify GET / is 302 with Location /docs; GET /docs is 200; /docs-json is 200 and validates as OpenAPI with real paths/schemas. Check exact version/coverage and absence of environment credentials.
6. Load Swagger in a real browser; confirm title, populated operations, local UI assets 200, no console/CSP errors and no external validator/spec requests. Do not execute data-changing endpoints or seed remote data for this task.
7. Recheck existing health and unauthenticated protected API 401. Record deployment ID, full SHA, timestamps, results and browser evidence. Clean the merged Backend feature branch after exact dev CI/integration checks.

For TEST rollback, first disable SWAGGER_ENABLED or redeploy the last verified TEST dev artifact using the existing Render controls. No schema migration is required by this change. Production rollback/deployment remains a separate approved task.

## Production activation checklist (future task only)

- [ ] Render TEST exact-SHA deployment, docs, JSON, root redirect, assets/browser and API regression verification PASS.
- [ ] User explicitly approves future main integration/Production deployment; this task does neither.
- [ ] Operator securely configures independent docs credentials in Backend .env before enabling Production docs; confirm fail-closed startup without exposing values.
- [ ] Verify Production HTTPS/Nginx loopback forwarding and scoped proxy setting. Exercise authenticated/unauthenticated/invalid credential cases for docs, JSON and UI assets over HTTPS.
- [ ] Revalidate existing JWT/cookie/CSRF routes, health, global headers/CORS and docs-specific CSP. No global security relaxation.
- [ ] Keep migration and existing VPS release/rollback gates from SECURE-CI-CD.md. This Swagger change has no migrations and grants no permission to change Neon Production.
- [ ] Verify Production deployed SHA and endpoints only within the separately approved release task. Do not claim local simulated Production tests are live Production evidence.

Implementation references: [NestJS Swagger setup](https://docs.nestjs.com/openapi/introduction), [security metadata](https://docs.nestjs.com/openapi/security), [Swagger Parser](https://apitools.dev/swagger-parser/docs/swagger-parser.html).
