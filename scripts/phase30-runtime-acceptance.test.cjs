"use strict";
const { test } = require("node:test");
const assert = require("node:assert/strict");
const h = require("./phase30-runtime-acceptance.cjs");
const ledger = Array.from({ length: 39 }, (_, i) => ({
  filename: String(i + 1).padStart(4, "0") + "_synthetic.sql",
  checksum: "a".repeat(64),
}));
const receipt = {
  origin: h.ORIGIN,
  branch: "dev",
  expectedDevSha: "b".repeat(40),
  deployedSha: "b".repeat(40),
  deploymentId: "dep-synthetic123",
  observedAt: "2026-11-02T01:00:00.000Z",
  health: {
    status: "ok",
    service: "congdongngonngu-backend",
    environment: "test",
  },
  migrationLedger: ledger,
};
const id = "ea9eb16c-1d46-4bdc-a8a8-c2d4dbd232ba";
test("rejects production origins, traversal, URLs and foreign resource identifiers", () => {
  const m = h.newManifest();
  m.resources.push({ kind: "attachment", id });
  assert.doesNotThrow(() => h.assertRequest(m, "GET", "attachments/" + id));
  for (const route of [
    "https://example.invalid",
    "../health",
    "attachments/" + id + "?token=x",
    "attachments/" + id + "/../content",
    "attachments/00000000-0000-4000-8000-000000000000",
  ])
    assert.throws(() => h.assertRequest(m, "GET", route));
  assert.throws(() => h.validateOrigin("https://api.congdongngonngu.vn"));
});
test("manifest rejects tokens, duplicate IDs and ownership substitution", () => {
  const m = h.newManifest();
  assert.doesNotThrow(() => h.validateManifest(m));
  assert.throws(() => h.validateManifest({ ...m, token: "secret" }));
  assert.throws(() => h.validateManifest({ ...m, phase: 31 }));
  assert.throws(() =>
    h.validateManifest({
      ...m,
      resources: [
        { kind: "attachment", id },
        { kind: "post", id },
      ],
    }),
  );
});
test("retention records actual UTC timestamps and the latest seven-day boundary", () => {
  const result = h.retentionNotBefore([
    "2026-11-02T01:00:00.000Z",
    "2026-11-03T01:00:00.000Z",
  ]);
  assert.equal(result, "2026-11-10T01:00:00.000Z");
  assert.throws(() => h.retentionNotBefore(["2026-11-02"]));
});
test("unknown CLI modes reject without operational I/O", () => {
  assert.throws(() => h.validateMode("seed"));
  assert.equal(h.validateMode("selftest"), "selftest");
});
test("bounded reader cancels oversized bodies", async () => {
  let cancelled = false;
  const body = new ReadableStream({
    pull(c) {
      c.enqueue(new Uint8Array(9));
    },
    cancel() {
      cancelled = true;
    },
  });
  await assert.rejects(h.readBounded({ body }, 8, AbortSignal.timeout(1000)));
  assert.equal(cancelled, true);
});
test("HTTP client rejects redirects and keeps bearer private", async () => {
  const m = h.newManifest();
  m.resources.push({ kind: "actor", id });
  let headers;
  const client = h.createHttpClient(
    m,
    receipt,
    ledger,
    async (url, options) => {
      headers = options.headers;
      assert.equal(url, h.ORIGIN + "/api/v1/health");
      return new Response(
        JSON.stringify({ success: true, data: { status: "ok" } }),
        { status: 200, headers: { "content-type": "application/json" } },
      );
    },
  );
  client.setBearer(id, "synthetic-private-token");
  const r = await client.request(id, "GET", "health");
  assert.equal(r.status, 200);
  assert.equal(headers.Authorization, "Bearer synthetic-private-token");
  assert.equal(
    JSON.stringify(client).includes("synthetic-private-token"),
    false,
  );
  client.close();
  await assert.rejects(client.request(null, "GET", "health"));
});
test("operator receipt pins dev SHA, TEST health and all39 migration checksums", () => {
  const ledger = Array.from({ length: 39 }, (_, i) => ({
    filename: String(i + 1).padStart(4, "0") + "_synthetic.sql",
    checksum: "a".repeat(64),
  }));
  const r = {
    origin: h.ORIGIN,
    branch: "dev",
    expectedDevSha: "b".repeat(40),
    deployedSha: "b".repeat(40),
    deploymentId: "dep-synthetic123",
    observedAt: "2026-11-02T01:00:00.000Z",
    health: {
      status: "ok",
      service: "congdongngonngu-backend",
      environment: "test",
    },
    migrationLedger: ledger,
  };
  assert.equal(h.validateOperatorReceipt(r, ledger), true);
  for (const bad of [
    { ...r, branch: "main" },
    { ...r, deployedSha: "c".repeat(40) },
    { ...r, health: { ...r.health, environment: "production" } },
    { ...r, migrationLedger: ledger.slice(1) },
  ])
    assert.throws(() => h.validateOperatorReceipt(bad, ledger));
  const changed = structuredClone(ledger);
  changed[38].checksum = "d".repeat(64);
  assert.throws(() => h.validateOperatorReceipt(r, changed));
});
test("exact TEST database guard rejects host override, duplicated TLS and production targets without connections", () => {
  const good =
    "postgresql://synthetic:synthetic@ep-crimson-grass-azmsfir8-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=verify-full";
  assert.deepEqual(h.validateDatabaseTarget(good), {
    target: "OWNER_APPROVED_TEST",
  });
  for (const raw of [
    good + "&host=example.invalid",
    good + "&sslmode=disable",
    good.replace("/neondb", "/production"),
    good.replace("ep-crimson-grass-azmsfir8-pooler", "foreign"),
  ])
    assert.throws(() => h.validateDatabaseTarget(raw));
});
test("bounded reader aborts a stalled body and cancels it", async () => {
  let cancelled = false;
  const controller = new AbortController();
  const body = new ReadableStream({
    pull() {
      return new Promise(() => {});
    },
    cancel() {
      cancelled = true;
    },
  });
  const reading = h.readBounded({ body }, 100, controller.signal);
  controller.abort();
  await assert.rejects(reading);
  assert.equal(cancelled, true);
});
test("HTTP redirect and error body cannot escape into error output", async () => {
  let cancelled = false;
  const m = h.newManifest();
  const client = h.createHttpClient(m, receipt, ledger, async () => ({
    status: 302,
    redirected: true,
    body: {
      cancel: async () => {
        cancelled = true;
      },
    },
  }));
  await assert.rejects(
    client.request(null, "GET", "health"),
    (e) => e.message === "PHASE30_HTTP_REQUEST_FAILED",
  );
  assert.equal(cancelled, true);
  client.close();
});
test("manifest path cannot substitute another run and resource kinds stay closed", () => {
  const m = h.newManifest();
  assert.throws(() => h.assertManifestPath(h.manifestFile(h.newManifest()), m));
  assert.throws(() =>
    h.validateManifest({ ...m, resources: [{ kind: "bucket", id }] }),
  );
  assert.equal(h.manifestFile(m).includes(m.runId), true);
});
test("manifest advancement preserves all recorded retention observations", () => {
  const first = h.newManifest();
  first.resources.push({ kind: "attachment", id });
  first.retentionObservations.push({
    attachmentId: id,
    observedAt: "2026-11-02T01:00:00.000Z",
    notBefore: "2026-11-09T01:00:00.000Z",
  });
  const next = structuredClone(first);
  next.resources.push({
    kind: "post",
    id: "0068e56a-f0ae-45bb-bb98-7f9d8bbd1c50",
  });
  assert.doesNotThrow(() => h.assertManifestAdvance(first, next));
  const dropped = structuredClone(next);
  dropped.retentionObservations = [];
  assert.throws(() => h.assertManifestAdvance(first, dropped));
  const altered = structuredClone(next);
  altered.retentionObservations[0].notBefore = "2026-11-10T01:00:00.000Z";
  assert.throws(() => h.assertManifestAdvance(first, altered));
});
test("HTTP manifest refresh authorizes only append-only newly recorded owned IDs", async () => {
  const first = h.newManifest();
  first.resources.push({ kind: "actor", id });
  const added = "0068e56a-f0ae-45bb-bb98-7f9d8bbd1c50";
  let calls = 0;
  const client = h.createHttpClient(first, receipt, ledger, async () => {
    calls++;
    return new Response("{}", {
      headers: { "content-type": "application/json" },
    });
  });
  client.setBearer(id, "private-token");
  await assert.rejects(client.request(id, "GET", "attachments/" + added));
  assert.equal(calls, 0);
  const next = structuredClone(first);
  next.resources.push({ kind: "attachment", id: added });
  client.refreshManifest(next);
  await client.request(id, "GET", "attachments/" + added);
  assert.equal(calls, 1);
  assert.throws(() =>
    client.refreshManifest({ ...next, resources: next.resources.slice(1) }),
  );
  assert.throws(() =>
    client.refreshManifest({
      ...next,
      runId: "b2a607c9-8299-4311-a5c1-bf9f338f093f",
    }),
  );
  client.close();
});
test("HTTP observation deadline is bounded and cancels a stalled response", async () => {
  const m = h.newManifest();
  let calls = 0,
    cancelled = false;
  const client = h.createHttpClient(m, receipt, ledger, async () => {
    calls++;
    return new Response(
      new ReadableStream({
        pull() {
          return new Promise(() => {});
        },
        cancel() {
          cancelled = true;
        },
      }),
    );
  });
  for (const timeoutMs of [0, 120001, NaN, 1.5])
    await assert.rejects(
      client.request(null, "GET", "health", undefined, { timeoutMs }),
    );
  assert.equal(calls, 0);
  await assert.rejects(
    client.request(null, "GET", "health", undefined, { timeoutMs: 5 }),
  );
  assert.equal(cancelled, true);
  client.close();
});

test("raw uploads never enumerate binary properties before bounds checks", () => {
  const m = h.newManifest();
  m.resources.push({kind: "attachment", id});
  const bytes = Buffer.from("fixture");
  Object.defineProperty(bytes, "trap", {enumerable: true, get() {throw Error("BINARY_ENUMERATED");}});
  assert.doesNotThrow(() => h.assertRequest(m, "PUT", "attachments/" + id + "/content", bytes));
  assert.throws(() => h.assertRequest(m, "PUT", "attachments/" + id + "/content", Buffer.alloc(4 * 1048576 + 1)));
});

test("initiation checks canonical scope IDs against the exact owned resource kind", () => {
  const m = h.newManifest();
  const foreign = "0068e56a-f0ae-45bb-bb98-7f9d8bbd1c50";
  const input = {clientUploadId: id, filename: "fixture.txt", mime: "text/plain", bytes: 7, scope: {kind: "STUDY_GROUP", groupId: foreign}};
  for (const value of [foreign, foreign.toUpperCase(), foreign.replace("ae", "aE")]) {
    assert.throws(() => h.assertRequest(m, "POST", "attachments", {...input, scope: {kind: "STUDY_GROUP", groupId: value}}));
    assert.throws(() => h.assertRequest(m, "POST", "attachments", {...input, scope: {kind: "DIRECT_MESSAGE", conversationId: value}}));
  }
  m.resources.push({kind: "actor", id: foreign});
  assert.throws(() => h.assertRequest(m, "POST", "attachments", input));
  m.resources = [{kind: "group", id: foreign}];
  assert.doesNotThrow(() => h.assertRequest(m, "POST", "attachments", input));
  assert.throws(() => h.assertRequest(m, "POST", "attachments", {...input, scope: {kind: "DIRECT_MESSAGE", conversationId: foreign}}));
});

test("HTTP raw upload preserves the at-limit buffer and rejects oversize before I/O", async () => {
  const m = h.newManifest();
  m.resources.push({kind: "attachment", id});
  let calls = 0;
  const bytes = Buffer.alloc(4 * 1048576, 0x61);
  const client = h.createHttpClient(m, receipt, ledger, async (_url, options) => {
    calls++;
    assert.equal(options.body, bytes);
    assert.equal(options.headers["Content-Length"], String(bytes.length));
    return new Response("{}");
  });
  await client.request(null, "PUT", "attachments/" + id + "/content", bytes, {mime: "image/png"});
  assert.equal(calls, 1);
  for (const invalid of [Buffer.alloc(0), Buffer.alloc(4 * 1048576 + 1), {bytes: "fixture"}])
    await assert.rejects(client.request(null, "PUT", "attachments/" + id + "/content", invalid, {mime: "image/png"}));
  assert.equal(calls, 1);
  client.close();
});

test("community catalog references and metadata text do not grant domain scope", () => {
  const m = h.newManifest();
  m.resources.push({kind: "attachment", id});
  const input = {clientUploadId: id, filename: "fixture.txt", mime: "text/plain", bytes: 7,
    scope: {kind: "COMMUNITY", postType: "DISCUSSION", languageId: id, visibility: "PRIVATE"}};
  assert.doesNotThrow(() => h.assertRequest(m, "POST", "attachments", input));
  assert.doesNotThrow(() => h.assertRequest(m, "PATCH", "attachments/" + id + "/metadata", {caption: "0068e56a-f0ae-45bb-bb98-7f9d8bbd1c50"}));
  for (const scope of [{kind: "GROUP_CONVERSATION", conversationId: id}, {...input.scope, groupId: id}, {kind: "STUDY_GROUP", groupId: id}])
    assert.throws(() => h.assertRequest(m, "POST", "attachments", {...input, scope}));
});
