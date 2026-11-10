# Actual SIMD boundary processors - 2026-11-10

Actual Render TEST service srv-dahnerh594qs73fp3420/deployment dep-dbp84hgn74is73d5mqc0 on exact86c332e053b1e3a17312f13425df9c45076ffabe produced10 captured events and PASS_BOUNDARY_FIXTURES_ONLY. These are synthetic near-limit processor observations, not R2 round-trips, full HTTP acceptance or format enablement.

| Fixture | Elapsed ms | Normalized bytes | Thumbnail bytes | Worker RSS bytes |
| --- | ---: | ---: | ---: | ---: |
| JPEG | 9090.397 | 3681342 | 16714 | 128557056 |
| PNG | 6993.240 | 1454924 | 9920 | 122388480 |
| WebP | 12194.269 | 1986842 | 17794 | 143593472 |
| Video | 14601.031 | 2917853 | 6198 | 109453312 |

Baseline app RSS120524800bytes/cgroup201166848bytes; sampled health latencies101.369612/3.068354/1.649659ms. Sampled run cgroup peak312750080bytes/app peak147251200bytes against visible536870912byte limit; checked visible OOM/kill counter deltas0/0 and processor scratch residual0. These sampled app/cgroup peaks are not kernel lifetime maxima. Hidden ancestor headroom remains UNVERIFIED. Health samples are eight early sequential loopback probes per stage, not ongoing representative public API traffic. Concurrent video health latency reached1297.758928ms, a material spike; API performance acceptance is not granted. Elapsed14.601seconds includes fixture-read/probe overhead and establishes neither exact399ms pipeline headroom nor repeatability. Maximum reported worker RSS143593472bytes is below192MiB; source shutdown and exact-owned scratch absence were observed before the scoped PASS.

Independent trace review approved this raw boundary evidence only with the stated scope/measurement limits; no blanket license/security approval was given.

The earlier timeout is remediated for this one accepted video fixture only. Video remains HELD_RUNTIME_VALIDATION_FAILED pending full applicable gates; video enablement=false and all four public flags stay false. Complete enablement=NOT_RUN; no SQL/R2 cleanup PASS or attachment leak count0 is inferred from scratch0. Public HTTP/provider/security/deep-decoder and remaining lifecycle/resource checks stay open.

Normal start command was restored, saved and freshly read back with no PHASE30 probe variables and all four flags false. Restoration deployment dep-dbp86oon74is73d5t0c0 succeeded and is Live on exact86c332e053b1e3a17312f13425df9c45076ffabe. Fresh settings independently matched that deployment/full source and the normal four-false npm run start command without PHASE30 probe variables. Packaging VERIFIED/glibc2.36/GNU time peak44482560bytes. The exact raw [probe receipt](evidence-002/render-simd-boundary-20261110.json) intentionally preserves its historical normalCommandRestoration=PENDING field; current restoration progress is in [continuation receipt](evidence-002/build-diagnostics-continuation-20261110.json). Current restoration is independently verified; Workspace evidence publication remains pending. Separate owner HTTP-policy question remains pending; no exception implemented.

Final restoration evidence: [render-simd-restoration-20261110.json](evidence-002/render-simd-restoration-20261110.json). Health GET /api/v1/health200/231ms/111bytes is health-only evidence, not source identity. The raw6803byte boundary JSON retains its historical restoration=PENDING unchanged.

Build packaging/glibc and GNU time measurements identify packaging behavior only; they do not establish deployment memory headroom.
