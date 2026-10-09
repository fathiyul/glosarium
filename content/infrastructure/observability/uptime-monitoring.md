---
title: "Uptime Monitoring"
summary: "Checking from the outside that a site responds."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["synthetic monitoring", "ping monitoring", "health check monitoring"]
prereqs: ["http-request"]
related: ["monitoring", "alerting", "status-page", "health-check", "sla", "dashboard"]
---

Uptime monitoring checks, from outside your own infrastructure, that your site or API actually responds. A service somewhere else sends a request every minute or so, and alerts you if it fails or is too slow.

```
every 60 s, from several locations:
  GET https://api.example.com/health
  expect: 200 within 2 s
if it fails 2-3 times in a row → alert
```

## Why from the outside

Internal monitoring only sees what your own system reports. If DNS breaks, a certificate expires, the load balancer is down or the whole data centre loses connectivity, your servers can be healthy and unreachable, while internal dashboards look fine. Only an outside check experiences what users do.

## What to check

- The homepage or a `/health` endpoint. See [health check](/t/health-check).
- Critical flows, not just "does the page load". More advanced synthetic checks log in or run a purchase.
- TLS certificate expiry, since an expired certificate takes a site down. See [certificate expiry](/t/certificate-expiry).
- Several locations, so a problem near one checker doesn't cause a false alarm.

## Mistakes to avoid

- **A health endpoint that always says OK**, even when the database is down. It should reflect real ability to serve.
- **Alerting on a single failed check.** Networks blip. Require a couple of consecutive failures.
- **Monitoring from the same provider** that hosts the service, so one outage hides both.
- **Not telling anyone.** Connect the check to [alerting](/t/alerting) and, for customers, a [status page](/t/status-page).

Uptime numbers also feed targets and agreements. See [SLA](/t/sla).
