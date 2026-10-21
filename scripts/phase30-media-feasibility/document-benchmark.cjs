'use strict';
// Synthetic UTF-8 document feasibility only; not a product validator.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { performance } = require('node:perf_hooks');
const MAX_BYTES = 64 * 1024;
function validateText(bytes) {
  if (bytes.length > MAX_BYTES) throw new Error('BYTES');
  const text = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  if (text.includes('\ufeff')) throw new Error('BOM');
  if (!text.trim()) throw new Error('EMPTY');
  if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f]/u.test(text)) throw new Error('CONTROL');
  return text;
}
const cases = [
  ['valid-vi-en-unicode', Buffer.from('Xin chào Việt Nam. English learning. 日本語 😀\nDòng hai\tTabbed.'), true],
  ['valid-byte-boundary', Buffer.alloc(MAX_BYTES, 0x61), true],
  ['valid-leading-bom', Buffer.from('\ufeffSynthetic text'), true],
  ['repeated-leading-bom', Buffer.from('\ufeff\ufeffSynthetic text'), false],
  ['embedded-bom', Buffer.from('Synthetic\ufefftext'), false],
  ['empty', Buffer.alloc(0), false],
  ['whitespace-only', Buffer.from(' \r\n\t '), false],
  ['invalid-utf8', Buffer.from([0xff, 0xfe]), false],
  ['truncated-utf8', Buffer.from([0xe2, 0x82]), false],
  ['overlong-utf8', Buffer.from([0xc0, 0xaf]), false],
  ['nul-control', Buffer.from('a\0b'), false],
  ['escape-control', Buffer.from([0x61, 0x1b, 0x62]), false],
  ['c1-control', Buffer.from('a\u0085b'), false],
  ['oversize-bytes', Buffer.alloc(MAX_BYTES + 1, 0x61), false],
];
function test() {
  for (const [name, bytes, expected] of cases) {
    if (expected) assert.equal(typeof validateText(bytes), 'string', name);
    else assert.throws(() => validateText(bytes), undefined, name);
  }
}
function main() {
  test();
  if (process.argv.includes('--self-test')) { process.stdout.write('TXT assertions passed\n'); return; }
  const results = cases.map(([name, bytes, expectedAccepted]) => {
    const rssBeforeBytes = process.memoryUsage().rss;
    const cpu = process.cpuUsage(); const start = performance.now();
    let accepted = false, rejection = null;
    try { validateText(bytes); accepted = true; } catch (e) { rejection = e.message; }
    const wallMs = performance.now() - start; const used = process.cpuUsage(cpu);
    return { name, inputBytes: bytes.length, expectedAccepted, accepted, rejection, wallMs,
      cpuUserMs: used.user / 1000, cpuSystemMs: used.system / 1000, rssBeforeBytes,
      rssAfterBytes: process.memoryUsage().rss, processMaxRssKiB: process.resourceUsage().maxRSS };
  });
  const output = process.env.DOCUMENT_RESULT_PATH || path.join(require('node:os').tmpdir(), 'phase30-document-results.json');
  const report = { scope: 'LOCAL_SYNTHETIC_TEXT_FEASIBILITY_ONLY', recordedAt: new Date().toISOString(),
    platform: process.platform, arch: process.arch, node: process.version, candidateMaxBytes: MAX_BYTES,
    policy: 'Fatal UTF-8; nonempty trimmed text; C0/C1 controls rejected except TAB/LF/CR; no HTML rendering.',
    limitations: ['No product upload/storage/magic validation or safe-rendering integration exists here.',
      'One iteration per small case; submillisecond CPU measurements can round to zero.',
      'RSS/maxRSS are process-wide; synchronous validation cannot be sampled concurrently.',
      'TXT has no unique magic signature; UTF-8 validity is not proof a document is harmless.'], assertionsPassed: true, results };
  fs.writeFileSync(output, JSON.stringify(report, null, 2) + '\n');
  process.stdout.write(JSON.stringify({ output, cases: results.length, assertionsPassed: true }) + '\n');
}
main();
