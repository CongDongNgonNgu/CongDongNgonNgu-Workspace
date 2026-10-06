import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, appendFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

export const targets = [
  ['BACKEND_DIRECT_HEALTH', 'https://congdongngonngu-back-end.onrender.com/api/v1/health', 'health'],
  ['FRONTEND_HOME', 'https://cong-dong-ngon-ngu-sigma.vercel.app/', 'html'],
  ['FRONTEND_BACKEND_HEALTH', 'https://cong-dong-ngon-ngu-sigma.vercel.app/api/v1/health', 'health'],
];
export const markers = {
  live: '<!-- congdongngonngu-production-availability-monitor -->',
  test: '<!-- congdongngonngu-monitor-synthetic-test -->',
};

export function classifyBody(status, body, kind) {
  if (kind === 'html') return status >= 200 && status < 300 && /<html\b/i.test(body);
  if (status !== 200) return false;
  try {
    const value = JSON.parse(body);
    return value.success === true && value.data?.status === 'ok'
      && value.data?.service === 'congdongngonngu-backend' && value.data?.environment === 'production';
  } catch { return false; }
}

export function checkTarget([component, url, kind]) {
  const dir = mkdtempSync(join(tmpdir(), 'availability-'));
  try {
    // Never print response contents, curl diagnostics, headers or cookies.
    for (let attempt = 0; attempt < 3; attempt++) {
      const result = spawnSync('curl', ['--silent', '--proto', '=https',
        '--connect-timeout', '10', '--max-time', '30', '--max-filesize', '1048576',
        '--output', join(dir, 'body'), '--write-out', '%{http_code}', url],
      { encoding: 'utf8', timeout: 35000, maxBuffer: 4096 });
      const http = /^\d{3}$/.test(result.stdout ?? '') ? Number(result.stdout) : 0;
      let pass = false;
      try { pass = result.status === 0 && classifyBody(http, readFileSync(join(dir, 'body'), 'utf8'), kind); }
      catch { /* Missing or unreadable response is a failed probe, still alert. */ }
      if (pass || attempt === 2) return { component, result: pass ? 'PASS' : 'FAIL', http,
        reason: pass ? 'EXPECTED_RESPONSE' : 'UNEXPECTED_STATUS_OR_RESPONSE', at: new Date().toISOString() };
      // Small bounded delay; no response-derived command execution.
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 2000);
    }
  } finally { rmSync(dir, { recursive: true, force: true }); }
}

export async function reconcileIncident({ api, healthy, test, results, runUrl, at }) {
  const marker = test ? markers.test : markers.live;
  const open = [];
  // Paginate all open issues. Fail closed rather than guess after the safety cap.
  for (let page = 1; ; page++) {
    if (page > 50) throw new Error('ISSUE_PAGINATION_LIMIT');
    const issues = await api('GET', `/issues?state=open&per_page=100&page=${page}`);
    open.push(...issues.filter(issue => !issue.pull_request && issue.body?.startsWith(marker)
      && issue.user?.login === 'github-actions[bot]'));
    if (issues.length < 100) break;
  }
  if (healthy) {
    for (const issue of open) {
      await api('POST', `/issues/${issue.number}/comments`, { body:
        `${test ? 'TEST RECOVERY — NO PRODUCTION OUTAGE' : 'Availability recovered'} at ${at}. All required checks PASS.\n${runUrl}` });
      await api('PATCH', `/issues/${issue.number}`, { state: 'closed', state_reason: 'completed' });
    }
    return { action: open.length ? 'RECOVERED' : 'NO_OPEN_INCIDENT', issues: open.map(i => i.number) };
  }
  if (open.length) return { action: 'EXISTING_INCIDENT', issues: open.map(i => i.number) };
  const issue = await api('POST', '/issues', {
    title: test ? '[MONITOR TEST] CongDongNgonNgu alert lifecycle' : '[Production Monitor] CongDongNgonNgu availability incident',
    body: `${marker}\n${test ? '**TEST ONLY — NO PRODUCTION OUTAGE**\n' : ''}\nDetected ${at}.\nProvider: GITHUB_ACTIONS_WORKSPACE\nOwner: PROJECT_RELEASE_OWNER\n\n${results.map(r => `${r.component}: ${r.result}; HTTP=${r.http}; ${r.reason}`).join('\n')}\n\nRun: ${runUrl}\nRecovery: all required checks PASS; automatically close with recovery evidence.`,
  });
  return { action: 'CREATED', issues: [issue.number] };
}

export async function main(env = process.env) {
  const mode = env.GITHUB_EVENT_NAME === 'schedule' ? 'live' : (env.MONITOR_MODE || 'live');
  if (!['live', 'simulate_failure', 'simulate_recovery'].includes(mode)) throw new Error('INVALID_MODE');
  if (env.GITHUB_REPOSITORY !== 'CongDongNgonNgu/CongDongNgonNgu-Workspace' || !env.GH_TOKEN)
    throw new Error('MONITOR_REPOSITORY_OR_TOKEN_UNAVAILABLE');
  const test = mode !== 'live';
  const results = test ? [{ component: 'SYNTHETIC_TEST', result: mode === 'simulate_failure' ? 'FAIL' : 'PASS',
    http: 0, reason: 'TEST_ONLY_NO_PRODUCTION_REQUEST', at: new Date().toISOString() }]
    : targets.map(checkTarget);
  const healthy = results.every(r => r.result === 'PASS');
  const runUrl = `https://github.com/${env.GITHUB_REPOSITORY}/actions/runs/${env.GITHUB_RUN_ID}`;
  const api = async (method, path, body) => {
    const response = await fetch(`https://api.github.com/repos/${env.GITHUB_REPOSITORY}${path}`, {
      method, headers: { Authorization: `Bearer ${env.GH_TOKEN}`, Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json', 'X-GitHub-Api-Version': '2022-11-28' },
      body: body ? JSON.stringify(body) : undefined, signal: AbortSignal.timeout(30000),
    });
    if (!response.ok) throw new Error(`ISSUE_API_HTTP_${response.status}`);
    return response.json();
  };
  console.log(JSON.stringify({ mode, results, monitorState: healthy ? 'PASS' : 'FAIL' }));
  const incident = await reconcileIncident({ api, healthy, test, results, runUrl, at: new Date().toISOString() });
  console.log(JSON.stringify(incident));
  if (env.GITHUB_STEP_SUMMARY) appendFileSync(env.GITHUB_STEP_SUMMARY,
    `Mode: ${mode}\n\n${results.map(r => `${r.component}=${r.result}; HTTP=${r.http}`).join('\n\n')}\n\nIncident: ${incident.action}; ${incident.issues.join(',')}\n`);
  // Synthetic failure is intentionally red after its TEST issue has been recorded.
  if (!healthy) process.exitCode = 1;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch(error => {
    const reason = /^(ISSUE_API_HTTP_\d{3}|ISSUE_PAGINATION_LIMIT|INVALID_MODE|MONITOR_REPOSITORY_OR_TOKEN_UNAVAILABLE)$/.test(error.message)
      ? error.message : 'MONITOR_OR_ALERT_CHANNEL_FAILED';
    console.error(reason); process.exitCode = 1;
  });
}
