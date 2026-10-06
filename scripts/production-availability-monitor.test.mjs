import test from 'node:test';
import assert from 'node:assert/strict';
import { classifyBody, reconcileIncident, markers, targets, main } from './production-availability-monitor.mjs';

const results = [{ component: 'SYNTHETIC_TEST', result: 'FAIL', http: 0, reason: 'TEST_ONLY' }];
function fixture(issues = []) {
  const calls = [];
  return { calls, api: async (method, path, body) => {
    calls.push({ method, path, body });
    if (method === 'GET') return issues;
    return { number: 123 };
  } };
}
const args = { healthy: false, test: false, results, runUrl: 'https://github.com/example/run', at: '2026-10-06T00:00:00Z' };
test('health requires 200 and production JSON; rejects development, invalid JSON and HTML', () => {
  const health = { success: true, data: { status: 'ok', service: 'congdongngonngu-backend', environment: 'production' } };
  assert.equal(classifyBody(200, JSON.stringify(health), 'health'), true);
  for (const data of [{ ...health.data, status: 'error' }, { ...health.data, service: 'unrelated' },
    { environment: 'production' }]) assert.equal(classifyBody(200, JSON.stringify({ success: true, data }), 'health'), false);
  assert.equal(classifyBody(200, JSON.stringify({ ...health, success: false }), 'health'), false);
  for (const body of ['{"environment":"development"}', '{}', '<html>', 'invalid'])
    assert.equal(classifyBody(200, body, 'health'), false);
  assert.equal(classifyBody(503, '{"environment":"production"}', 'health'), false);
});
test('frontend requires successful HTML', () => {
  assert.equal(classifyBody(200, '<!doctype html><html>', 'html'), true);
  assert.equal(classifyBody(500, '<html>', 'html'), false);
  assert.equal(classifyBody(200, '{}', 'html'), false);
});
test('targets are exact public HTTPS availability routes', () => {
  assert.equal(targets.length, 3);
  assert(targets.every(([, url]) => url.startsWith('https://') && !/payment|localhost/.test(url)));
});
test('new failure creates one marked incident', async () => {
  const f = fixture(); await reconcileIncident({ ...args, api: f.api });
  assert.equal(f.calls.filter(c => c.method === 'POST').length, 1);
  assert(f.calls[1].body.body.startsWith(markers.live));
});
test('repeated failure creates no duplicate or noisy comment', async () => {
  const f = fixture([{ number: 123, body: markers.live, user: { login: 'github-actions[bot]' } }]);
  const result = await reconcileIncident({ ...args, api: f.api });
  assert.equal(result.action, 'EXISTING_INCIDENT'); assert.equal(f.calls.length, 1);
});
test('recovery comments before closing matching incident', async () => {
  const f = fixture([{ number: 123, body: markers.live, user: { login: 'github-actions[bot]' } }]);
  await reconcileIncident({ ...args, healthy: true, api: f.api });
  assert.equal(f.calls[1].path, '/issues/123/comments');
  assert.equal(f.calls[2].body.state, 'closed');
});
test('healthy with no incident makes no writes', async () => {
  const f = fixture(); await reconcileIncident({ ...args, healthy: true, api: f.api });
  assert.equal(f.calls.length, 1);
});
test('synthetic marker is distinct and prominently TEST ONLY', async () => {
  const f = fixture([{ number: 77, body: markers.live, user: { login: 'github-actions[bot]' } }]);
  await reconcileIncident({ ...args, test: true, api: f.api });
  assert(f.calls[1].body.body.startsWith(markers.test));
  assert(f.calls[1].body.body.includes('TEST ONLY — NO PRODUCTION OUTAGE'));
});
test('synthetic recovery cannot close real production incidents', async () => {
  const f = fixture([{ number: 77, body: markers.live, user: { login: 'github-actions[bot]' } }]);
  await reconcileIncident({ ...args, test: true, healthy: true, api: f.api });
  assert.equal(f.calls.length, 1);
});
test('ignore pull requests and non-bot marker impersonation', async () => {
  const f = fixture([{ number: 1, body: markers.live, user: { login: 'human' } },
    { number: 2, body: markers.live, user: { login: 'github-actions[bot]' }, pull_request: {} }]);
  await reconcileIncident({ ...args, healthy: true, api: f.api }); assert.equal(f.calls.length, 1);
});
test('issue write failure propagates instead of green alert success', async () => {
  await assert.rejects(reconcileIncident({ ...args, api: async method => {
    if (method === 'GET') return []; throw new Error('ISSUE_API_HTTP_403');
  } }), /ISSUE_API_HTTP_403/);
});
test('invalid dispatch mode fails before any network', async () => {
  await assert.rejects(main({ MONITOR_MODE: 'untrusted' }), /INVALID_MODE/);
});
