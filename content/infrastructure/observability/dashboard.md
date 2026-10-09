---
title: "Dashboard"
summary: "A visual display of key metrics."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["metrics dashboard", "Grafana dashboard", "status board"]
prereqs: ["metrics"]
related: ["metrics", "monitoring", "alerting", "prometheus-grafana", "golden-signals", "red-method", "actionable-alerts"]
---

A dashboard is a screen of charts and numbers showing the health and behaviour of a system at a glance: request rate, error rate, latency, CPU, queue length. Tools like Grafana are common for building them.

A good dashboard answers a question quickly. "Is the checkout service healthy right now?" should take seconds, not scrolling.

## What goes on a useful one

For a service, a well-known starting point is the [golden signals](/t/golden-signals) or the [RED method](/t/red-method):

- **Rate**: requests per second
- **Errors**: failed requests, as a rate or percentage
- **Duration**: latency, ideally as percentiles (p50, p95, p99) rather than only the average, since averages hide slow requests

Add the resources it depends on (CPU, memory, database connections), and mark deploys on the charts so you can see when a change coincided with a problem.

## Mistakes to avoid

- **Hundreds of charts nobody understands.** Make one overview per service, then links to detail dashboards.
- Using dashboards as alerts. Nobody stares at a screen all day. A problem should page someone through [alerting](/t/alerting); the dashboard is where you look next.
- No context. A line with no units, title or sense of "normal" is decoration. Label axes and show thresholds.
- Average-only latency. One slow request in a hundred can be invisible in the mean.
- Stale panels. Remove charts for metrics that no longer exist.

Dashboards help you notice and investigate; for explaining *why*, you often need logs and traces too. See [logs, metrics and traces](/t/logs-metrics-traces).
