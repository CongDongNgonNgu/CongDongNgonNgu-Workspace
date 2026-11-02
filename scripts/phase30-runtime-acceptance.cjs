"use strict";
// Inert acceptance-tool foundation. No seeding, DB/provider connection, binding,
// deletion or operational CLI exists. Receipts describe operator observations.
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const ORIGIN = "https://congdongngonngu-back-end.onrender.com";
const RESEARCH_ROOT = path.resolve(__dirname, "../../phase30-runtime-research");
const UUID =
  /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/;
const HEX = /^[a-f0-9]{64}$/;
const KINDS = new Set([
  "actor",
  "attachment",
  "post",
  "group",
  "text",
  "conversation",
  "message",
  "invitation",
  "connection",
]);
const fail = () => {
  throw Error("PHASE30_RUNTIME_GUARD");
};
function exact(value, keys) {
  if (
    !value ||
    typeof value !== "object" ||
    Array.isArray(value) ||
    Object.keys(value).some((k) => !keys.includes(k)) ||
    keys.some((k) => !Object.hasOwn(value, k))
  )
    fail();
}
function utc(value) {
  if (
    typeof value !== "string" ||
    !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value) ||
    !Number.isFinite(Date.parse(value)) ||
    new Date(value).toISOString() !== value
  )
    fail();
  return Date.parse(value);
}
function validateOrigin(value) {
  if (value !== ORIGIN) fail();
  return value;
}
function newManifest() {
  return {
    project: "CongDongNgonNgu",
    phase: 30,
    subphase: "002",
    target: "OWNER_APPROVED_TEST",
    runId: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    resources: [],
    retentionObservations: [],
  };
}
function validateManifest(m) {
  exact(m, [
    "project",
    "phase",
    "subphase",
    "target",
    "runId",
    "createdAt",
    "resources",
    "retentionObservations",
  ]);
  if (
    m.project !== "CongDongNgonNgu" ||
    m.phase !== 30 ||
    m.subphase !== "002" ||
    m.target !== "OWNER_APPROVED_TEST" ||
    !UUID.test(m.runId) ||
    !Array.isArray(m.resources) ||
    m.resources.length > 200 ||
    !Array.isArray(m.retentionObservations) ||
    m.retentionObservations.length > 200
  )
    fail();
  utc(m.createdAt);
  const ids = new Set();
  for (const r of m.resources) {
    exact(r, ["kind", "id"]);
    if (!KINDS.has(r.kind) || !UUID.test(r.id) || ids.has(r.id)) fail();
    ids.add(r.id);
  }
  for (const r of m.retentionObservations) {
    exact(r, ["attachmentId", "observedAt", "notBefore"]);
    if (
      !m.resources.some(
        (x) => x.kind === "attachment" && x.id === r.attachmentId,
      ) ||
      utc(r.notBefore) < utc(r.observedAt) + 7 * 86400000
    )
      fail();
  }
  return m;
}
function manifestFile(m) {
  validateManifest(m);
  return path.join(RESEARCH_ROOT, m.runId, "ownership.json");
}
function assertManifestPath(file, m) {
  if (path.resolve(file) !== manifestFile(m)) fail();
}
function assertManifestAdvance(previous, next) {
  validateManifest(previous);
  validateManifest(next);
  if (
    previous.runId !== next.runId ||
    previous.createdAt !== next.createdAt ||
    previous.resources.some(
      (r) => !next.resources.some((x) => x.id === r.id && x.kind === r.kind),
    ) ||
    previous.retentionObservations.length > next.retentionObservations.length ||
    previous.retentionObservations.some((r, i) => {
      const n = next.retentionObservations[i];
      return (
        !n ||
        n.attachmentId !== r.attachmentId ||
        n.observedAt !== r.observedAt ||
        n.notBefore !== r.notBefore
      );
    })
  )
    fail();
  return true;
}
function persistManifest(m, { initial = false } = {}) {
  const file = manifestFile(m),
    dir = path.dirname(file);
  if (initial) {
    fs.mkdirSync(RESEARCH_ROOT, { recursive: true, mode: 0o700 });
    if (fs.lstatSync(RESEARCH_ROOT).isSymbolicLink()) fail();
    fs.mkdirSync(dir, { mode: 0o700 });
    fs.writeFileSync(file, JSON.stringify(m, null, 2), {
      flag: "wx",
      mode: 0o600,
    });
  } else {
    if (
      fs.lstatSync(RESEARCH_ROOT).isSymbolicLink() ||
      fs.lstatSync(dir).isSymbolicLink() ||
      fs.lstatSync(file).isSymbolicLink()
    )
      fail();
    const previous = validateManifest(
      JSON.parse(fs.readFileSync(file, "utf8")),
    );
    assertManifestAdvance(previous, m);
    const temporary = path.join(
      dir,
      "ownership-" + crypto.randomUUID() + ".tmp",
    );
    fs.writeFileSync(temporary, JSON.stringify(m, null, 2), {
      flag: "wx",
      mode: 0o600,
    });
    fs.renameSync(temporary, file);
  }
  return file;
}
function retentionNotBefore(timestamps) {
  if (
    !Array.isArray(timestamps) ||
    !timestamps.length ||
    timestamps.length > 200
  )
    fail();
  return new Date(
    Math.max(...timestamps.map(utc)) + 7 * 86400000,
  ).toISOString();
}
function validateMode(mode) {
  if (mode !== "selftest") fail();
  return mode;
}
function validateOperatorReceipt(receipt, localLedger) {
  exact(receipt, [
    "origin",
    "branch",
    "expectedDevSha",
    "deployedSha",
    "deploymentId",
    "observedAt",
    "health",
    "migrationLedger",
  ]);
  validateOrigin(receipt.origin);
  if (
    receipt.branch !== "dev" ||
    !/^[a-f0-9]{40}$/.test(receipt.expectedDevSha) ||
    receipt.expectedDevSha !== receipt.deployedSha ||
    !/^dep-[a-z0-9]+$/.test(receipt.deploymentId)
  )
    fail();
  utc(receipt.observedAt);
  exact(receipt.health, ["status", "service", "environment"]);
  if (
    receipt.health.status !== "ok" ||
    receipt.health.service !== "congdongngonngu-backend" ||
    receipt.health.environment !== "test"
  )
    fail();
  const validateLedger = (ledger) => {
    if (!Array.isArray(ledger) || ledger.length !== 39) fail();
    for (let i = 0; i < 39; i++) {
      const r = ledger[i];
      exact(r, ["filename", "checksum"]);
      if (
        !new RegExp(
          "^" + String(i + 1).padStart(4, "0") + "_[a-z0-9_-]+\\.sql$",
        ).test(r.filename) ||
        !HEX.test(r.checksum)
      )
        fail();
    }
  };
  validateLedger(localLedger);
  validateLedger(receipt.migrationLedger);
  if (JSON.stringify(receipt.migrationLedger) !== JSON.stringify(localLedger))
    fail();
  return true;
}
function loadLocalMigrationLedger() {
  const dir = path.resolve(
    __dirname,
    "../../CongDongNgonNgu-Back-End/database/migrations",
  );
  return fs
    .readdirSync(dir)
    .filter((f) => /^\d{4}_[a-z0-9_-]+\.sql$/.test(f))
    .sort()
    .map((filename) => ({
      filename,
      checksum: crypto
        .createHash("sha256")
        .update(
          fs
            .readFileSync(path.join(dir, filename), "utf8")
            .replace(/\r\n?/g, "\n"),
        )
        .digest("hex"),
    }));
}
function validateDatabaseTarget(raw) {
  const { validatedTestTarget } = require(
    path.resolve(
      __dirname,
      "../../CongDongNgonNgu-Back-End/scripts/phase30-sql-target.cjs",
    ),
  );
  validatedTestTarget(raw);
  return { target: "OWNER_APPROVED_TEST" };
}
function assertRequest(m, method, route, body) {
  validateManifest(m);
  if (
    typeof route !== "string" ||
    route.length > 250 ||
    !["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE"].includes(method) ||
    !/^[a-z0-9/-]+$/.test(route) ||
    route.includes("//")
  )
    fail();
  const own = (kind, id) =>
      m.resources.some((x) => x.kind === kind && x.id === id),
    segments = route.split("/");
  if (route === "health") {
    if (method !== "GET") fail();
  } else if (route === "auth/login") {
    if (method !== "POST") fail();
  } else if (route === "attachments") {
    if (method !== "POST") fail();
  } else if (
    segments[0] === "attachments" &&
    UUID.test(segments[1] ?? "") &&
    own("attachment", segments[1])
  ) {
    const tail = segments.slice(2).join("/");
    if (!(
      (!tail && ["GET", "DELETE"].includes(method)) ||
      (tail === "metadata" && method === "PATCH") ||
      (tail === "finalize" && method === "POST") ||
      (tail === "content" && ["GET", "HEAD", "PUT"].includes(method)) ||
      (tail === "preview" && ["GET", "HEAD"].includes(method))
    ))
      fail();
  } else fail();
  // Raw bytes are bounded without enumerating or inspecting Buffer properties.
  if (method === "PUT") {
    if (!Buffer.isBuffer(body) || body.length < 1 || body.length > 4 * 1048576)
      fail();
    return true;
  }
  // Only initiation carries resource references. Check its typed scope directly;
  // arbitrary filename/caption text is not an ownership identifier.
  if (route === "attachments") {
    if (!body || typeof body !== "object" || Array.isArray(body) ||
        !UUID.test(body.clientUploadId) ||
        Object.keys(body).some(k => !["clientUploadId", "scope", "filename", "mime", "bytes", "caption", "alt"].includes(k)))
      fail();
    const scope = body.scope;
    if (scope?.kind === "STUDY_GROUP") {
      exact(scope, ["kind", "groupId"]);
      if (!UUID.test(scope.groupId) || !own("group", scope.groupId)) fail();
    } else if (scope?.kind === "DIRECT_MESSAGE") {
      exact(scope, ["kind", "conversationId"]);
      if (!UUID.test(scope.conversationId) || !own("conversation", scope.conversationId)) fail();
    } else if (scope?.kind === "COMMUNITY") {
      exact(scope, ["kind", "postType", "languageId", "visibility"]);
      // The language catalog is read-only and separately verified by setup.
      if (!UUID.test(scope.languageId)) fail();
    } else fail();
  }
  return true;
}
async function readBounded(response, maximum, signal) {
  if (
    !Number.isSafeInteger(maximum) ||
    maximum < 1 ||
    maximum > 4 * 1048576 ||
    !signal
  )
    fail();
  const reader = response.body?.getReader();
  if (!reader) return Buffer.alloc(0);
  if (signal.aborted) {
    void reader.cancel().catch(() => {});
    reader.releaseLock();
    fail();
  }
  const chunks = [];
  let total = 0,
    complete = false;
  let rejectAbort;
  const interrupted = new Promise((_, reject) => {
    rejectAbort = reject;
  });
  const aborted = () => {
    void reader.cancel().catch(() => {});
    rejectAbort(Error("PHASE30_HTTP_ABORTED"));
  };
  signal.addEventListener("abort", aborted, { once: true });
  if (signal.aborted) aborted();
  try {
    while (true) {
      signal.throwIfAborted();
      const result = await Promise.race([reader.read(), interrupted]);
      signal.throwIfAborted();
      if (result.done) {
        complete = true;
        return Buffer.concat(chunks, total);
      }
      if (
        !(result.value instanceof Uint8Array) ||
        total + result.value.byteLength > maximum
      )
        fail();
      total += result.value.byteLength;
      chunks.push(Buffer.from(result.value));
    }
  } finally {
    signal.removeEventListener("abort", aborted);
    if (!complete) void reader.cancel().catch(() => {});
    reader.releaseLock();
  }
}
function createHttpClient(m, receipt, localLedger, fetchImpl = fetch) {
  validateOperatorReceipt(receipt, localLedger);
  validateManifest(m);
  let manifest = JSON.parse(JSON.stringify(m));
  const tokens = new Map(),
    active = new Set();
  let closed = false;
  return {
    // The operator must persist newly returned IDs before refreshing this private
    // projection. This is not proof that persistence happened and performs no I/O.
    refreshManifest(next) {
      if (closed) fail();
      assertManifestAdvance(manifest, next);
      manifest = JSON.parse(JSON.stringify(next));
      for (const actor of tokens.keys())
        if (
          !manifest.resources.some((r) => r.kind === "actor" && r.id === actor)
        )
          tokens.delete(actor);
    },
    setBearer(actor, token) {
      if (
        closed ||
        !UUID.test(actor) ||
        !manifest.resources.some((r) => r.kind === "actor" && r.id === actor) ||
        typeof token !== "string" ||
        !token ||
        token.length > 8192 ||
        /[\r\n]/.test(token)
      )
        fail();
      tokens.set(actor, token);
    },
    close() {
      closed = true;
      tokens.clear();
      for (const c of active) c.abort();
    },
    async request(actor, method, route, body, options = {}) {
      if (closed) fail();
      if (
        actor !== null &&
        !manifest.resources.some((r) => r.kind === "actor" && r.id === actor)
      )
        fail();
      assertRequest(manifest, method, route, body);
      const timeoutMs = options.timeoutMs ?? 10000;
      if (
        !Number.isSafeInteger(timeoutMs) ||
        timeoutMs < 1 ||
        timeoutMs > 120000
      )
        fail();
      const controller = new AbortController(),
        // Observation budget only; server upload/processor limits are unchanged.
        timer = setTimeout(() => controller.abort(), timeoutMs);
      active.add(controller);
      try {
        const headers = { Accept: "application/json" },
          token = tokens.get(actor);
        if (token) headers.Authorization = "Bearer " + token;
        let data;
        if (body !== undefined) {
          if (method === "PUT") {
            if (
              !Buffer.isBuffer(body) ||
              body.length > 4 * 1048576 ||
              ![
                "image/jpeg",
                "image/png",
                "image/webp",
                "video/mp4",
                "text/plain",
              ].includes(options.mime)
            )
              fail();
            data = body;
            headers["Content-Type"] = options.mime;
            headers["Content-Length"] = String(body.length);
          } else {
            data = JSON.stringify(body);
            if (Buffer.byteLength(data) > 16384) fail();
            headers["Content-Type"] = "application/json";
          }
        }
        const response = await fetchImpl(ORIGIN + "/api/v1/" + route, {
          method,
          headers,
          body: data,
          redirect: "error",
          signal: controller.signal,
        });
        if (
          response.redirected ||
          response.status < 100 ||
          (response.status >= 300 && response.status < 400)
        ) {
          void response.body?.cancel().catch(() => {});
          fail();
        }
        const bytes = await readBounded(
          response,
          method === "GET" && /\/(content|preview)$/.test(route)
            ? 4 * 1048576
            : 65536,
          controller.signal,
        );
        return {
          status: response.status,
          contentType: response.headers.get("content-type"),
          cacheControl: response.headers.get("cache-control"),
          nosniff: response.headers.get("x-content-type-options"),
          bytes,
        };
      } catch {
        throw Error("PHASE30_HTTP_REQUEST_FAILED");
      } finally {
        clearTimeout(timer);
        active.delete(controller);
      }
    },
  };
}
module.exports = {
  ORIGIN,
  RESEARCH_ROOT,
  validateOrigin,
  newManifest,
  validateManifest,
  manifestFile,
  assertManifestPath,
  persistManifest,
  assertManifestAdvance,
  retentionNotBefore,
  validateMode,
  validateOperatorReceipt,
  loadLocalMigrationLedger,
  validateDatabaseTarget,
  assertRequest,
  readBounded,
  createHttpClient,
};
if (require.main === module) {
  try {
    validateMode(process.argv[2]);
    console.log("PHASE30_RUNTIME_FOUNDATION_ONLY; OPERATIONAL_PROBES=NOT_RUN");
  } catch {
    console.error("PHASE30_RUNTIME_MODE_REJECTED");
    process.exitCode = 1;
  }
}
