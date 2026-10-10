---
title: "Metrics"
summary: "Numeric measurements over time."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-analyst: junior }
aliases: ["application metrics", "system metrics", "monitoring metrics", "time series metrics", "Prometheus metrics"]
prereqs: ["logging"]
related: ["metric-types", "cardinality", "prometheus-grafana", "red-method", "use-method", "golden-signals", "dashboard"]
core: [backend, data-analyst]
---

**Metrics** are **numeric measurements recorded over time**: requests per second, error rate, response time, queue depth, CPU usage, active users. They're compact and cheap to store and query, which makes them ideal for dashboards, trends and alerts.

Compare with logs (detailed text events) and traces (one request's path): metrics answer **"how is the system behaving overall, and is it changing?"**, and logs and traces help find out **why** ([observability](/t/observability), [logs, metrics and traces](/t/logs-metrics-traces)).

## The basic types

| Type | Meaning | Example |
|---|---|---|
| **Counter** | Only goes up (resets on restart) | `http_requests_total`, `errors_total` |
| **Gauge** | A value that goes up and down | `queue_depth`, `memory_bytes`, `active_connections` |
| **Histogram** | Distribution of values in buckets, to compute percentiles | `request_duration_seconds` |

You usually care about a counter's **rate** (requests per second), not its raw total ([metric types](/t/metric-types)).

```python
from prometheus_client import Counter, Histogram

REQUESTS = Counter("http_requests_total", "Requests", ["method", "status"])
LATENCY = Histogram("http_request_duration_seconds", "Request latency")

@LATENCY.time()
def handle(request):
    ...
    REQUESTS.labels(method="GET", status="200").inc()
```

(Prometheus is a widely used metrics system, often paired with Grafana for dashboards: [Prometheus and Grafana](/t/prometheus-grafana).)

## What to measure

Start with proven checklists:

- **Golden signals**: latency, traffic, errors, saturation ([golden signals](/t/golden-signals)).
- **RED** for services: Rate, Errors, Duration ([RED method](/t/red-method)).
- **USE** for resources: Utilization, Saturation, Errors ([USE method](/t/use-method)).
- **Business metrics** too: orders per minute, sign-ups, payments failed. Often the first sign of trouble.

## Pitfalls

- **High cardinality labels**: each distinct combination of label values creates a separate time series. Putting `user_id` or a full URL with IDs in a label can create millions of series and crash or bankrupt your monitoring ([cardinality](/t/cardinality)). Use labels with small, bounded sets of values.
- **Averages hide the tail**: use histograms and look at percentiles ([percentiles](/t/percentile)).
- **Measuring everything**: lots of unused metrics add cost and clutter. Measure what you'd act on.
- **Naming and units**: consistent names, with the unit in the name (`_seconds`, `_bytes`).
- **A metric nobody looks at or alerts on** is wasted. Connect them to dashboards and [alerts](/t/alerting).
