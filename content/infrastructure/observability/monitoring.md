---
title: "Monitoring"
summary: "Watching known metrics and alerting when they go wrong."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["system monitoring", "application monitoring", "infrastructure monitoring"]
prereqs: ["metrics"]
related: ["observability", "alerting", "metrics", "dashboard", "uptime-monitoring", "logs-metrics-traces", "actionable-alerts"]
---

Monitoring means collecting information about your system (CPU, error rates, response times, queue sizes) and alerting a person when something goes wrong. It answers: **is it working, and if not, what is broken?** You decide in advance which things to watch.

A basic setup has three parts:

1. **Collect** numbers over time. See [metrics](/t/metrics).
2. **Display** them in [dashboards](/t/dashboard).
3. **Alert** when a number crosses a threshold or behaves oddly. See [alerting](/t/alerting).

```
error rate > 5% for 5 minutes  →  page the on-call engineer
disk usage > 85%               →  open a ticket
```

## What to watch

- What users feel: errors and latency of your endpoints. These matter most.
- What the service depends on: databases, queues, third-party APIs.
- Resources: CPU, memory, disk, connections.
- Business signals: orders per minute dropping to zero can reveal a failure no technical metric shows.

## Monitoring vs observability

Monitoring catches problems you anticipated. [Observability](/t/observability) is the ability to investigate problems you didn't, using rich logs, metrics and traces. They complement each other.

## Common mistakes

- Alerting on everything. People learn to ignore noisy alerts. Page only on things that need action now. See [alert fatigue](/t/alert-fatigue).
- Monitoring causes, not symptoms. High CPU may be fine; failing requests are not.
- No monitoring until the first outage. Add it with the service.
- Never testing the alerts. An alert that doesn't reach anyone is worse than none, because it creates false confidence.
- Watching only from the inside. A healthy server behind a broken network looks fine from inside. See [uptime monitoring](/t/uptime-monitoring).
