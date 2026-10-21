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
const MAX_PIXELS = Number(process.env.IMAGE_MAX_PIXELS || 3000000);
const MAX_EDGE = 2000;
const TIMEOUT_MS = Number(process.env.IMAGE_CASE_TIMEOUT_MS || 30000);
for (const n of [MAX_BYTES, MAX_PIXELS, TIMEOUT_MS]) assert(Number.isSafeInteger(n) && n > 0);
const output = process.env.IMAGE_RESULT_PATH || path.join(require('node:os').tmpdir(), 'phase30-image-results.json');
function fail(code) { const e = new Error(code); e.code = code; throw e; }
function validateMetadata(m) {
  if ((m.pages || 1) !== 1) fail('MULTIFRAME');
  if (!['jpeg', 'png', 'webp'].includes(m.format)) fail('FORMAT');
  if (m.width > MAX_EDGE || m.height > MAX_EDGE) fail('DIMENSIONS');
  if (!Number.isSafeInteger(m.width) || !Number.isSafeInteger(m.height) || m.width < 1 || m.height < 1 || m.width * m.height > MAX_PIXELS) fail('PIXELS');
}
function guards() {
  for (const format of ['jpeg', 'png', 'webp']) validateMetadata({ format, width: 1000, height: 1000 });
  validateMetadata({ format: 'png', width: 2000, height: 1500 });
  assert.throws(() => validateMetadata({ format: 'png', width: 2000, height: 1501 }), /PIXELS/);
  assert.throws(() => validateMetadata({ format: 'png', width: 3000, height: 1000 }), /DIMENSIONS/);
  assert.throws(() => validateMetadata({ format: 'gif', width: 1, height: 1, pages: 2 }), /MULTIFRAME/);
  assert.throws(() => validateMetadata({ format: 'svg', width: 1, height: 1 }), /FORMAT/);
  assert.throws(() => validateMetadata({ format: 'png', width: NaN, height: 1 }), /PIXELS/);
}
function parseVmHwm(status) {
  const fields = status.split(/\r?\n/).filter(line => line.startsWith('VmHWM:'));
  assert.equal(fields.length, 1, 'ONE_VMHWM_REQUIRED');
  const match = /^VmHWM:\s+([0-9]+)\s+kB\s*$/.exec(fields[0]);
  assert(match, 'VMHWM_KIB_FORMAT_REQUIRED');
  const value = Number(match[1]);
  assert(Number.isSafeInteger(value) && value > 0, 'POSITIVE_FINITE_VMHWM_REQUIRED');
  return value;
}
function assertStageDuration(elapsedMs) { if (elapsedMs > 10000) fail('PROCESSING_TIMEOUT'); }
async function selfTest() {
  guards();
  assert.equal(parseVmHwm('Name:\tnode\nVmHWM:\t 12345 kB\nVmRSS:\t 123 kB\n'), 12345);
  for (const value of ['', 'VmHWM: 0 kB\n', 'VmHWM: -1 kB\n', 'VmHWM: 1 MB\n', 'VmHWM: 1.5 kB\n', 'VmHWM: Infinity kB\n', 'VmHWM: 9007199254740992 kB\n', 'VmHWM: 1 kB\nVmHWM: 2 kB\n']) {
    assert.throws(() => parseVmHwm(value));
  }
  assertStageDuration(10000); assert.throws(() => assertStageDuration(10000.001), /PROCESSING_TIMEOUT/);
  process.stdout.write('Image measurement guard assertions passed\n');
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
  const stages = [];
  async function measuredStage(name, operation) {
    const start = performance.now();
    try { return await operation(); }
    finally {
      const elapsedMs = performance.now() - start;
      stages.push({ name, elapsedMs });
      assertStageDuration(elapsedMs);
    }
  }
  try {
    if (input.length > MAX_BYTES) fail('BYTES');
    const options = { failOn: 'warning', limitInputPixels: MAX_PIXELS, sequentialRead: true, animated: false };
    const metadata = await sharp(input, options).metadata();
    details = { format: metadata.format, width: metadata.width, height: metadata.height, pixels: metadata.width * metadata.height, pages: metadata.pages || 1, inputHasExif: !!metadata.exif, inputHasXmp: !!metadata.xmp, inputHasGps: hasGps(metadata.exif) };
    validateMetadata(metadata);
    // Auto-orient then reencode strips input metadata; no withMetadata/keepMetadata.
    const normalized = await measuredStage('normalization', () => sharp(input, options).rotate().toColourspace('srgb').webp({ quality: 80 }).timeout({ seconds: 10 }).toBuffer());
    const thumb = await measuredStage('thumbnail', () => sharp(normalized, options).resize({ width: 320, height: 320, fit: 'inside', withoutEnlargement: true }).webp({ quality: 70 }).timeout({ seconds: 10 }).toBuffer());
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
  const linuxVmHwmKiB = process.platform === 'linux' ? parseVmHwm(fs.readFileSync('/proc/self/status', 'utf8')) : null;
  process.stdout.write(JSON.stringify({ ...details, stages, linuxVmHwmKiB, inputBytes: input.length, wallMs: performance.now() - started,
    cpuUserMs: cpu.user / 1000, cpuSystemMs: cpu.system / 1000, rssBeforeBytes: rssBefore, rssAfterBytes: memory.rss,
    peakSampledRssBytes: Math.max(peakSampledRss, memory.rss), processMaxRssKiB: process.resourceUsage().maxRSS }));
}
async function fixture(width, height, format) {
  const raw = Buffer.alloc(width * height * 3);
  for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
    const i = (y * width + x) * 3;
    raw[i] = (x + y) % 256; raw[i + 1] = (x >> 3) % 256; raw[i + 2] = (y >> 3) % 256;
  }
  return sharp(raw, { raw: { width, height, channels: 3 } }).toFormat(format).toBuffer();
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
async function noiseFixture(format, width, height) {
  const raw = Buffer.alloc(width * height * 3);
  let state = 0x12345678;
  for (let i = 0; i < raw.length; i++) {
    state ^= state << 13; state ^= state >>> 17; state ^= state << 5; raw[i] = state & 255;
  }
  let best = null;
  // Bounded quality search; never pad encoded bytes to claim near-limit decoding.
  for (const quality of [100, 98, 96, 94, 92, 90, 88, 86]) {
    const input = await sharp(raw, { raw: { width, height, channels: 3 } }).toFormat(format, { quality }).toBuffer();
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

const os = require('node:os');
const CORPUS_MAX_BYTES = 32 * 1024 * 1024;
const TEMP_MAX_BYTES = 64 * 1024 * 1024;
function ownedDirectory(dir, root) {
  const resolved = fs.realpathSync(dir);
  assert.equal(path.dirname(resolved), fs.realpathSync(root), 'TEMP_MUST_BE_DIRECT_CHILD');
  assert(path.basename(resolved).startsWith('phase30-image-'), 'TEMP_PREFIX_REQUIRED');
  assert.equal(path.resolve(dir), resolved, 'TEMP_MUST_NOT_BE_REDIRECTED');
  assert(!fs.lstatSync(dir).isSymbolicLink(), 'TEMP_SYMLINK_REJECTED');
  return resolved;
}
async function generateCorpus(ownedDir) {
  guards();
  assert.equal(sharp.versions.sharp, '0.35.5', 'Pinned sharp version required');
  const cases = [];
  for (const [width, height] of [[1000, 1000], [2000, 1500], [2000, 2000]]) for (const format of ['jpeg', 'png', 'webp']) {
    const input = await fixture(width, height, format);
    const oversizeRejection = width * height > MAX_PIXELS;
    cases.push({ name: `${format}-${width * height}-pixels${oversizeRejection ? '-oversize-rejection' : ''}`, input, expected: !oversizeRejection });
    if (width === 2000 && height === 1500) cases.push({ name: `${format}-truncated-half`, input: input.subarray(0, Math.floor(input.length / 2)), expected: false });
  }
  cases.push({ name: 'corrupt-random-bytes', input: Buffer.from('deterministic synthetic corrupt image input'), expected: false });
  const oversized = await sharp({ create: { width: 2000, height: 1501, channels: 3, background: '#123456' } }).png().toBuffer();
  cases.push({ name: 'oversized-pixels-2000x1501', input: oversized, expected: false });
  const oversizedDimension = await sharp({ create: { width: 3000, height: 1000, channels: 3, background: '#123456' } }).png().toBuffer();
  cases.push({ name: 'oversized-dimension-3000x1000', input: oversizedDimension, expected: false });
  cases.push({ name: 'oversized-bytes', input: Buffer.alloc(MAX_BYTES + 1, 0x41), expected: false });
  // Two deterministic 1x1 GIF frames: header/global palette, GCE + image repeated, trailer.
  const gifHeader = '47494638396101000100800000000000ffffff';
  const frame = '21f90400000000002c0000000001000100000202440100';
  cases.push({ name: 'two-frame-gif', input: Buffer.from(gifHeader + frame + frame + '3b', 'hex'), expected: false });
  for (const format of ['jpeg', 'webp']) {
    const candidate = await noiseFixture(format, 2000, 1500);
    cases.push({ name: format + '-3000000-noise-near-byte-limit', ...candidate, expected: true, complexityProbe: true });
    const formerCandidate = await noiseFixture(format, 2000, 2000);
    cases.push({ name: format + '-4000000-noise-oversize-rejection', ...formerCandidate, expected: false });
  }
  cases.push({ name: 'jpeg-exif-gps-xmp', input: await metadataFixture(), expected: true, suppliedMetadata: true });

  ownedDirectory(ownedDir, os.tmpdir());
  assert.equal(cases.length, 22, 'EXACT_CORPUS_CASES_REQUIRED');
  let corpusBytes = 0;
  const manifest = cases.map((item, index) => {
    const { input, ...metadata } = item;
    corpusBytes += input.length;
    assert(corpusBytes <= CORPUS_MAX_BYTES, 'CORPUS_BYTE_CAP');
    const filename = 'case-' + String(index).padStart(2, '0') + '.bin';
    fs.writeFileSync(path.join(ownedDir, filename), input, { flag: 'wx', mode: 0o600 });
    return { ...metadata, filename, inputBytes: input.length };
  });
  const encoded = JSON.stringify(manifest);
  assert(Buffer.byteLength(encoded) <= 64 * 1024, 'MANIFEST_BYTE_CAP');
  assert(corpusBytes + Buffer.byteLength(encoded) <= TEMP_MAX_BYTES, 'TEMP_BYTE_CAP');
  fs.writeFileSync(path.join(ownedDir, 'manifest.json'), encoded, { flag: 'wx', mode: 0o600 });
  process.stdout.write(JSON.stringify({ corpusBytes, manifestBytes: Buffer.byteLength(encoded),
    generatorProcessMaxRssKiB: process.resourceUsage().maxRSS }));
}
async function main() {
  guards();
  assert.equal(sharp.versions.sharp, '0.35.5', 'Pinned sharp version required');
  const tempRoot = fs.realpathSync(os.tmpdir());
  const ownedDir = fs.mkdtempSync(path.join(tempRoot, 'phase30-image-'));
  if (process.platform !== 'win32') fs.chmodSync(ownedDir, 0o700);
  let report;
  try {
    ownedDirectory(ownedDir, tempRoot);
    // Generation exits before decoder workers start. Its native high-water RSS
    // must not become the orchestrator's inherited pre-exec worker high-water.
    const generated = spawnSync(process.execPath, [__filename, '--generate', ownedDir], {
      encoding: 'utf8', timeout: 240000, maxBuffer: 64 * 1024, windowsHide: true });
    assert.ifError(generated.error);
    assert.equal(generated.status, 0, generated.stderr);
    const generation = JSON.parse(generated.stdout);
    const manifestPath = path.join(ownedDir, 'manifest.json');
    assert(fs.statSync(manifestPath).size <= 64 * 1024, 'MANIFEST_BYTE_CAP');
    const cases = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    assert.equal(cases.length, 22, 'EXACT_CORPUS_CASES_REQUIRED');
    let measuredCorpusBytes = 0;
    for (const [index, item] of cases.entries()) {
      assert.equal(item.filename, 'case-' + String(index).padStart(2, '0') + '.bin');
      const stat = fs.lstatSync(path.join(ownedDir, item.filename));
      assert(stat.isFile() && !stat.isSymbolicLink());
      assert.equal(stat.size, item.inputBytes);
      measuredCorpusBytes += stat.size;
    }
    assert(measuredCorpusBytes <= CORPUS_MAX_BYTES, 'CORPUS_BYTE_CAP');
    assert.equal(measuredCorpusBytes, generation.corpusBytes);
    assert(measuredCorpusBytes + fs.statSync(manifestPath).size <= TEMP_MAX_BYTES, 'TEMP_BYTE_CAP');
    const parentMaxRssBeforeWorkersKiB = process.resourceUsage().maxRSS;
    const results = [];
    for (const c of cases) {
      // Open only this case as stdin: no fixture buffers or native generation in parent.
      const fd = fs.openSync(path.join(ownedDir, c.filename), 'r');
      let run;
      try {
        run = spawnSync(process.execPath, [__filename, '--worker'], { stdio: [fd, 'pipe', 'pipe'],
          encoding: 'utf8', timeout: TIMEOUT_MS, maxBuffer: 1024 * 1024, windowsHide: true });
      } finally { fs.closeSync(fd); }
      assert.ifError(run.error);
      assert.equal(run.status, 0, `${c.name}: ${run.stderr}`);
      const result = JSON.parse(run.stdout);
      // A valid complex image may fail closed under the processing deadline; this is never successful normalization.
      const timedOut = !result.accepted && /timeout|timed out|time limit/i.test((result.rejection || '') + ' ' + (result.reason || ''));
      if (!(c.complexityProbe && timedOut)) assert.equal(result.accepted, c.expected, 'Unexpected outcome: ' + c.name);
      if (process.platform === 'linux') assert(Number.isSafeInteger(result.linuxVmHwmKiB) && result.linuxVmHwmKiB > 0, 'LINUX_WORKER_VMHWM_REQUIRED');
      if (result.accepted) {
        assert.equal(result.stages.length, 2);
        for (const stage of result.stages) assertStageDuration(stage.elapsedMs);
        assert.equal(result.normalizedMetadataStripped, true); assert.equal(result.thumbnailMetadataStripped, true);
        assert(result.thumbnailBytes > 0 && result.thumbnailWidth <= 320 && result.thumbnailHeight <= 320);
      }
      if (c.suppliedMetadata) assert(result.inputHasExif && result.inputHasXmp && result.inputHasGps);
      results.push({ name: c.name, expectedAccepted: c.expected, complexityProbe: !!c.complexityProbe, fixtureQuality: c.quality ?? null, safeComplexityTimeout: !!(c.complexityProbe && timedOut), ...result });
    }
    report = { scope: 'LOCAL_SYNTHETIC_PROCESSOR_FEASIBILITY_ONLY', recordedAt: new Date().toISOString(),
      platform: process.platform, arch: process.arch, node: process.version, versions: sharp.versions,
      measurementIsolation: { parentMaxRssBeforeWorkersKiB, ...generation, corpusMaxBytes: CORPUS_MAX_BYTES, tempMaxBytes: TEMP_MAX_BYTES, generatorExitedBeforeWorkers: true },
      candidateLimits: { maxInputBytes: MAX_BYTES, maxInputPixels: MAX_PIXELS, maxInputEdge: MAX_EDGE, thumbnailMaxEdge: 320, processingTimeoutSeconds: 10, outerCaseTimeoutMs: TIMEOUT_MS },
      configuration: { cache: false, concurrency: 1, failOn: 'warning', singleFrame: true, isolatedChildPerCase: true },
      limitations: ['Candidate limits are not approved product limits.', 'Deterministic noise, gradients, supplied metadata and solid-color fixtures are not a comprehensive adversarial corpus.', 'No deployed Linux/Render, parallel load or storage acceptance is demonstrated.', 'Raw maxRSS is retained and may inherit pre-exec high-water on Linux; linuxVmHwmKiB reads current-address-space VmHWM only on Linux. Both cover startup/input ingestion; 2ms RSS sampling can miss peaks.', 'Decoder/library safety and complete polyglot rejection are not certified by these probes.', 'Worker timeout stops a child process; application isolation/resource policy is not implemented.'],
      assertionsPassed: true, results };

  } finally {
    // Recheck the exact resolved mkdtemp child before recursive cleanup.
    const checked = ownedDirectory(ownedDir, tempRoot);
    assert.equal(checked, ownedDir, 'EXACT_OWNED_TEMP_REQUIRED');
    fs.rmSync(checked, { recursive: true, force: false });
    assert(!fs.existsSync(checked), 'TEMP_CLEANUP_REQUIRED');
  }
  report.measurementIsolation.exactOwnedTempCleanupVerified = true;
  fs.writeFileSync(output, JSON.stringify(report, null, 2) + '\n');
  process.stdout.write(JSON.stringify({ output, cases: report.results.length, measurementIsolation: report.measurementIsolation,
    results: report.results.map(({ name, accepted, wallMs, cpuUserMs, cpuSystemMs, processMaxRssKiB, rejection }) =>
      ({ name, accepted, wallMs, cpuUserMs, cpuSystemMs, processMaxRssKiB, rejection })) }, null, 2) + '\n');
}
const task = process.argv.includes('--self-test') ? selfTest() : process.argv.includes('--worker') ? worker()
  : process.argv.includes('--generate') ? generateCorpus(process.argv[process.argv.indexOf('--generate') + 1]) : main();
task.catch(e => { process.stderr.write(String(e.stack) + '\n'); process.exitCode = 1; });
