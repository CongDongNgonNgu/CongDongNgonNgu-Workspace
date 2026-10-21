'use strict';
// Local synthetic processor feasibility only. No storage, credentials or application changes.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { performance } = require('node:perf_hooks');
const sharp = require('sharp');
sharp.cache(false);
sharp.concurrency(1);
const MAX_BYTES = Number(process.env.IMAGE_MAX_BYTES || 4 * 1024 * 1024);
const MAX_PIXELS = Number(process.env.IMAGE_MAX_PIXELS || 4000000);
const TIMEOUT_MS = Number(process.env.IMAGE_CASE_TIMEOUT_MS || 30000);
for (const n of [MAX_BYTES, MAX_PIXELS, TIMEOUT_MS]) assert(Number.isSafeInteger(n) && n > 0);
const output = process.env.IMAGE_RESULT_PATH || path.join(__dirname, 'image-benchmark-results.json');
function fail(code) { const e = new Error(code); e.code = code; throw e; }
function validateMetadata(m) {
  if ((m.pages || 1) !== 1) fail('MULTIFRAME');
  if (!['jpeg', 'png', 'webp'].includes(m.format)) fail('FORMAT');
  if (!Number.isSafeInteger(m.width) || !Number.isSafeInteger(m.height) || m.width < 1 || m.height < 1 || m.width * m.height > MAX_PIXELS) fail('PIXELS');
}
function guards() {
  for (const format of ['jpeg', 'png', 'webp']) validateMetadata({ format, width: 1000, height: 1000 });
  assert.throws(() => validateMetadata({ format: 'png', width: 2001, height: 2000 }), /PIXELS/);
  assert.throws(() => validateMetadata({ format: 'gif', width: 1, height: 1, pages: 2 }), /MULTIFRAME/);
  assert.throws(() => validateMetadata({ format: 'svg', width: 1, height: 1 }), /FORMAT/);
  assert.throws(() => validateMetadata({ format: 'png', width: NaN, height: 1 }), /PIXELS/);
}
async function worker() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  const input = Buffer.concat(chunks);
  const rssBefore = process.memoryUsage().rss;
  const cpuBefore = process.cpuUsage();
  const started = performance.now();
  let peakSampledRss = rssBefore;
  const timer = setInterval(() => { peakSampledRss = Math.max(peakSampledRss, process.memoryUsage().rss); }, 2);
  let details = {};
  try {
    if (input.length > MAX_BYTES) fail('BYTES');
    const options = { failOn: 'warning', limitInputPixels: MAX_PIXELS, sequentialRead: true, animated: false };
    const metadata = await sharp(input, options).metadata();
    details = { format: metadata.format, width: metadata.width, height: metadata.height, pixels: metadata.width * metadata.height, pages: metadata.pages || 1 };
    validateMetadata(metadata);
    // Auto-orient then reencode strips input metadata; no withMetadata/keepMetadata.
    const normalized = await sharp(input, options).rotate().toColourspace('srgb').webp({ quality: 80 }).timeout({ seconds: 10 }).toBuffer();
    const thumb = await sharp(normalized, options).resize({ width: 320, height: 320, fit: 'inside', withoutEnlargement: true }).webp({ quality: 70 }).timeout({ seconds: 10 }).toBuffer();
    const resultMetadata = await sharp(normalized, options).metadata();
    details = { ...details, normalizedBytes: normalized.length, thumbnailBytes: thumb.length,
      normalizedMetadataStripped: !resultMetadata.exif && !resultMetadata.icc && !resultMetadata.xmp };
    details.accepted = true;
  } catch (e) {
    details = { ...details, accepted: false, rejection: e.code || 'DECODER_REJECTED', reason: String(e.message).slice(0, 240) };
  } finally {
    clearInterval(timer);
  }
  const cpu = process.cpuUsage(cpuBefore);
  const memory = process.memoryUsage();
  process.stdout.write(JSON.stringify({ ...details, inputBytes: input.length, wallMs: performance.now() - started,
    cpuUserMs: cpu.user / 1000, cpuSystemMs: cpu.system / 1000, rssBeforeBytes: rssBefore, rssAfterBytes: memory.rss,
    peakSampledRssBytes: Math.max(peakSampledRss, memory.rss), processMaxRssKiB: process.resourceUsage().maxRSS }));
}
async function fixture(size, format) {
  const raw = Buffer.alloc(size * size * 3);
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const i = (y * size + x) * 3;
    raw[i] = (x + y) % 256; raw[i + 1] = (x >> 3) % 256; raw[i + 2] = (y >> 3) % 256;
  }
  return sharp(raw, { raw: { width: size, height: size, channels: 3 } }).toFormat(format).toBuffer();
}
async function main() {
  guards();
  assert.equal(sharp.versions.sharp, '0.35.5', 'Pinned sharp version required');
  const cases = [];
  for (const size of [1000, 2000]) for (const format of ['jpeg', 'png', 'webp']) {
    const input = await fixture(size, format);
    cases.push({ name: `${format}-${size * size}-pixels`, input, expected: true });
    if (size === 2000) cases.push({ name: `${format}-truncated-half`, input: input.subarray(0, Math.floor(input.length / 2)), expected: false });
  }
  cases.push({ name: 'corrupt-random-bytes', input: Buffer.from('deterministic synthetic corrupt image input'), expected: false });
  const oversized = await sharp({ create: { width: 2001, height: 2000, channels: 3, background: '#123456' } }).png().toBuffer();
  cases.push({ name: 'oversized-pixels', input: oversized, expected: false });
  cases.push({ name: 'oversized-bytes', input: Buffer.alloc(MAX_BYTES + 1, 0x41), expected: false });
  // Two deterministic 1x1 GIF frames: header/global palette, GCE + image repeated, trailer.
  const gifHeader = '47494638396101000100800000000000ffffff';
  const frame = '21f90400000000002c0000000001000100000202440100';
  cases.push({ name: 'two-frame-gif', input: Buffer.from(gifHeader + frame + frame + '3b', 'hex'), expected: false });
  const results = [];
  for (const c of cases) {
    const run = spawnSync(process.execPath, [__filename, '--worker'], { input: c.input, encoding: 'utf8', timeout: TIMEOUT_MS, maxBuffer: 1024 * 1024, windowsHide: true });
    assert.ifError(run.error);
    assert.equal(run.status, 0, `${c.name}: ${run.stderr}`);
    const result = JSON.parse(run.stdout);
    assert.equal(result.accepted, c.expected, `Unexpected outcome: ${c.name}`);
    if (c.expected) { assert.equal(result.normalizedMetadataStripped, true); assert(result.thumbnailBytes > 0); }
    results.push({ name: c.name, expectedAccepted: c.expected, ...result });
  }
  const report = { scope: 'LOCAL_SYNTHETIC_PROCESSOR_FEASIBILITY_ONLY', recordedAt: new Date().toISOString(),
    platform: process.platform, arch: process.arch, node: process.version, versions: sharp.versions,
    candidateLimits: { maxInputBytes: MAX_BYTES, maxInputPixels: MAX_PIXELS, thumbnailMaxEdge: 320, processingTimeoutSeconds: 10, outerCaseTimeoutMs: TIMEOUT_MS },
    configuration: { cache: false, concurrency: 1, failOn: 'warning', singleFrame: true, isolatedChildPerCase: true },
    limitations: ['Candidate limits are not approved product limits.', 'Synthetic gradients and solid-color fixtures are not a comprehensive adversarial corpus.', 'No deployed Linux/Render, parallel load or storage acceptance is demonstrated.', 'maxRSS covers process startup/input ingestion; 2ms RSS sampling can miss peaks.', 'Decoder/library safety and complete polyglot rejection are not certified by these probes.', 'Worker timeout stops a child process; application isolation/resource policy is not implemented.'],
    assertionsPassed: true, results };
  fs.writeFileSync(output, JSON.stringify(report, null, 2) + '\n');
  process.stdout.write(JSON.stringify({ output, cases: results.length, results: results.map(({ name, accepted, wallMs, cpuUserMs, cpuSystemMs, processMaxRssKiB, rejection }) => ({ name, accepted, wallMs, cpuUserMs, cpuSystemMs, processMaxRssKiB, rejection })) }, null, 2) + '\n');
}
(process.argv.includes('--worker') ? worker() : main()).catch(e => { process.stderr.write(String(e.stack) + '\n'); process.exitCode = 1; });
