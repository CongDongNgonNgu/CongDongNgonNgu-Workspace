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
const output = process.env.IMAGE_RESULT_PATH || path.join(require('node:os').tmpdir(), 'phase30-image-results.json');
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
    details = { format: metadata.format, width: metadata.width, height: metadata.height, pixels: metadata.width * metadata.height, pages: metadata.pages || 1, inputHasExif: !!metadata.exif, inputHasXmp: !!metadata.xmp, inputHasGps: hasGps(metadata.exif) };
    validateMetadata(metadata);
    // Auto-orient then reencode strips input metadata; no withMetadata/keepMetadata.
    const normalized = await sharp(input, options).rotate().toColourspace('srgb').webp({ quality: 80 }).timeout({ seconds: 10 }).toBuffer();
    const thumb = await sharp(normalized, options).resize({ width: 320, height: 320, fit: 'inside', withoutEnlargement: true }).webp({ quality: 70 }).timeout({ seconds: 10 }).toBuffer();
    const resultMetadata = await sharp(normalized, options).metadata();
    const thumbMetadata = await sharp(thumb, options).metadata();
    details = { ...details, normalizedBytes: normalized.length, thumbnailBytes: thumb.length,
      normalizedMetadataStripped: !resultMetadata.exif && !resultMetadata.icc && !resultMetadata.xmp, thumbnailMetadataStripped: !thumbMetadata.exif && !thumbMetadata.icc && !thumbMetadata.xmp, thumbnailWidth: thumbMetadata.width, thumbnailHeight: thumbMetadata.height };
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
// Detect an actual TIFF GPSInfo IFD pointer, not just any EXIF payload.
function hasGps(exif) {
  if (!exif || exif.length < 14 || exif.subarray(0, 6).toString('binary') !== 'Exif\0\0') return false;
  const tiff = exif.subarray(6), little = tiff.subarray(0, 2).toString() === 'II';
  const u16 = offset => little ? tiff.readUInt16LE(offset) : tiff.readUInt16BE(offset);
  const u32 = offset => little ? tiff.readUInt32LE(offset) : tiff.readUInt32BE(offset);
  const offset = u32(4); if (offset + 2 > tiff.length) return false;
  const count = u16(offset);
  for (let i = 0; i < count; i++) {
    const entry = offset + 2 + i * 12;
    if (entry + 12 > tiff.length) return false;
    if (u16(entry) === 0x8825 && u32(entry + 8) > 0) return true;
  }
  return false;
}
async function noiseFixture(format) {
  const raw = Buffer.alloc(2000 * 2000 * 3);
  let state = 0x12345678;
  for (let i = 0; i < raw.length; i++) {
    state ^= state << 13; state ^= state >>> 17; state ^= state << 5; raw[i] = state & 255;
  }
  let best = null;
  // Bounded quality search; never pad encoded bytes to claim near-limit decoding.
  for (const quality of [100, 98, 96, 94, 92, 90, 88, 86]) {
    const input = await sharp(raw, { raw: { width: 2000, height: 2000, channels: 3 } }).toFormat(format, { quality }).toBuffer();
    if (input.length <= MAX_BYTES && (!best || input.length > best.input.length)) best = { input, quality };
    if (best && best.input.length >= MAX_BYTES * 0.85) break;
  }
  assert(best && best.input.length >= MAX_BYTES * 0.75, format + ': bounded near-limit fixture unavailable');
  return best;
}
async function metadataFixture() {
  const input = await sharp({ create: { width: 1000, height: 1000, channels: 3, background: '#456789' } })
    .withExif({ IFD0: { Artist: 'SYNTHETIC PHASE30', Copyright: 'SYNTHETIC ONLY' },
      IFD3: { GPSLatitudeRef: 'N', GPSLatitude: '10/1 0/1 0/1', GPSLongitudeRef: 'E', GPSLongitude: '106/1 0/1 0/1' } })
    .withXmp('<x:xmpmeta xmlns:x="adobe:ns:meta/"><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><rdf:Description xmlns:dc="http://purl.org/dc/elements/1.1/" dc:description="SYNTHETIC PHASE30 METADATA PROBE"/></rdf:RDF></x:xmpmeta>')
    .jpeg().toBuffer();
  const metadata = await sharp(input).metadata();
  assert(metadata.exif && metadata.xmp && hasGps(metadata.exif), 'Fixture must carry EXIF, GPS pointer and XMP');
  return input;
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
  for (const format of ['jpeg', 'webp']) {
    const candidate = await noiseFixture(format);
    cases.push({ name: format + '-4000000-noise-near-byte-limit', ...candidate, expected: true, complexityProbe: true });
  }
  cases.push({ name: 'jpeg-exif-gps-xmp', input: await metadataFixture(), expected: true, suppliedMetadata: true });
  const results = [];
  for (const c of cases) {
    const run = spawnSync(process.execPath, [__filename, '--worker'], { input: c.input, encoding: 'utf8', timeout: TIMEOUT_MS, maxBuffer: 1024 * 1024, windowsHide: true });
    assert.ifError(run.error);
    assert.equal(run.status, 0, `${c.name}: ${run.stderr}`);
    const result = JSON.parse(run.stdout);
    // A valid complex image may fail closed under the processing deadline; this is never successful normalization.
    const timedOut = !result.accepted && /timeout|timed out|time limit/i.test(result.reason || '');
    if (!(c.complexityProbe && timedOut)) assert.equal(result.accepted, c.expected, 'Unexpected outcome: ' + c.name);
    if (result.accepted) {
      assert.equal(result.normalizedMetadataStripped, true); assert.equal(result.thumbnailMetadataStripped, true);
      assert(result.thumbnailBytes > 0 && result.thumbnailWidth <= 320 && result.thumbnailHeight <= 320);
    }
    if (c.suppliedMetadata) assert(result.inputHasExif && result.inputHasXmp && result.inputHasGps);
    results.push({ name: c.name, expectedAccepted: c.expected, complexityProbe: !!c.complexityProbe, fixtureQuality: c.quality ?? null, safeComplexityTimeout: !!(c.complexityProbe && timedOut), ...result });
  }
  const report = { scope: 'LOCAL_SYNTHETIC_PROCESSOR_FEASIBILITY_ONLY', recordedAt: new Date().toISOString(),
    platform: process.platform, arch: process.arch, node: process.version, versions: sharp.versions,
    candidateLimits: { maxInputBytes: MAX_BYTES, maxInputPixels: MAX_PIXELS, thumbnailMaxEdge: 320, processingTimeoutSeconds: 10, outerCaseTimeoutMs: TIMEOUT_MS },
    configuration: { cache: false, concurrency: 1, failOn: 'warning', singleFrame: true, isolatedChildPerCase: true },
    limitations: ['Candidate limits are not approved product limits.', 'Deterministic noise, gradients, supplied metadata and solid-color fixtures are not a comprehensive adversarial corpus.', 'No deployed Linux/Render, parallel load or storage acceptance is demonstrated.', 'maxRSS covers process startup/input ingestion; 2ms RSS sampling can miss peaks.', 'Decoder/library safety and complete polyglot rejection are not certified by these probes.', 'Worker timeout stops a child process; application isolation/resource policy is not implemented.'],
    assertionsPassed: true, results };
  fs.writeFileSync(output, JSON.stringify(report, null, 2) + '\n');
  process.stdout.write(JSON.stringify({ output, cases: results.length, results: results.map(({ name, accepted, wallMs, cpuUserMs, cpuSystemMs, processMaxRssKiB, rejection }) => ({ name, accepted, wallMs, cpuUserMs, cpuSystemMs, processMaxRssKiB, rejection })) }, null, 2) + '\n');
}
(process.argv.includes('--worker') ? worker() : main()).catch(e => { process.stderr.write(String(e.stack) + '\n'); process.exitCode = 1; });
