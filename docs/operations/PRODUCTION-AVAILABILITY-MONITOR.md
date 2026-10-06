# Production availability monitoring

Provider: GITHUB_ACTIONS_WORKSPACE in CongDongNgonNgu/CongDongNgonNgu-Workspace.
Workflow: [production-availability-monitor.yml](../../.github/workflows/production-availability-monitor.yml).
Implementation: [Node monitor](../../scripts/production-availability-monitor.mjs).

Every 15 minutes (`*/15 * * * *`) and manual `live` runs check Backend direct
health, Frontend home HTML, and Frontend `/api/v1/health` routing. Both health
responses must be HTTP 200 with success=true, data.status=ok,
data.service=congdongngonngu-backend and data.environment=production. Each probe uses a 10-second
connect timeout, 30-second maximum, up to two retries, bounded response size and
sanitized results. No authenticated application action or payment endpoint is used.

GitHub scheduling can be delayed or dropped during high load; this is periodic
demo availability monitoring, not a real-time SLA. Public-repository schedules
may be disabled after prolonged repository inactivity; PROJECT_RELEASE_OWNER
checks workflow activity/settings during release reviews. A GitHub outage can
affect both checking and alert visibility. No SMS, email or phone delivery is claimed.

## Alerts and ownership

ALERT_CHANNEL=GITHUB_ISSUE. INCIDENT_OWNER=PROJECT_RELEASE_OWNER, with
APPLICATION_OWNER as secondary. Primary reviews open monitor issues/run failures,
acknowledges an incident in a concise issue comment and coordinates investigation;
secondary investigates application failure if primary is unavailable. Human
notification subscriptions/acknowledgement response time are not guaranteed by
this implementation. Incident evidence is visible in Issues and Actions run history.

The monitor creates one bot-owned open issue with a deterministic marker; repeated
outages do not create duplicate issues or comments. Successful live checks add
recovery evidence and close matching live incidents. A failure run stays red after
alert recording. Issue API failure also fails the run; never add a PAT workaround.
Concurrency serializes incident mutation without cancelling the executing run.

## Safe activation validation

After the workflow is merged to main, dispatch `simulate_failure`. This makes no
production requests and opens a separate **TEST ONLY — NO PRODUCTION OUTAGE**
issue. The run is intentionally failed after recording the synthetic incident.
Repeat failure to verify idempotency if needed. Dispatch `simulate_recovery` to
comment and close only TEST incidents, then dispatch `live` and require all three
checks PASS. Scheduled runs always use live mode. Record run and TEST issue IDs in
Workspace evidence before claiming monitoring active.

Only contents:read and issues:write are granted; only built-in github.token is used.
Checkout is pinned and does not retain Git credentials. No provider account,
repository secret, deploy/restart, environment change or database mutation is involved.

Official references: [GitHub workflow syntax](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax)
and [GITHUB_TOKEN permissions](https://docs.github.com/en/actions/tutorials/authenticate-with-github_token).
