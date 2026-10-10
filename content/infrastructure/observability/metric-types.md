---
title: "Counter, Gauge, Histogram"
summary: "The basic metric types."
levels: { backend: senior, data-engineer: senior }
aliases: ["metric types", "counter gauge histogram", "prometheus metric types"]
prereqs: ["metrics"]
related: ["cardinality", "percentile", "prometheus-grafana", "red-method", "monitoring"]
---

Most metrics systems offer a few **metric types**, each suited to a different shape of data. Picking the wrong one produces graphs that mislead.

- Counter — a value that only goes up (or resets to zero on restart): total requests served, total errors, bytes sent. You don't graph a counter directly; you take its *rate* over time, e.g. requests per second. Counters are ideal for "how much, how fast".
- Gauge — a value that can go up and down: current temperature, queue depth, connections in use, memory used. You graph a gauge as-is, because its current value is meaningful.
- Histogram — observations bucketed by value: request durations, response sizes. It records how many observations fell into each bucket, which lets you compute percentiles and averages across the distribution. A **summary** is a related type that pre-computes quantiles instead of exposing buckets; the trade-off is which quantiles you can get and how they combine.

```text
counter:   http_requests_total                → rate() → requests/sec
gauge:     queue_depth                        → plot directly
histogram: http_request_duration_seconds      → p50, p95, p99 latency
```

The classic mistakes:

- Using a gauge for something cumulative. A running total in a gauge loses the fact that it only increases, so you can't compute a clean rate. Use a counter.
- Averaging latencies. A plain average hides the slow tail. From a histogram, read percentiles (p95, p99); the mean is often near the median and reassures while your slowest users suffer (see [percentile](/t/percentile)).
- Counter resets confusing the graph. When a process restarts, its counter resets to zero; a naive diff shows a negative spike. Rate calculations handle this — use them.
- Histogram buckets that don't fit. Bucket boundaries must cover the range you care about; a histogram bucketed in whole seconds can't tell you about 50-millisecond changes.

Choosing the right type is the first step to a metric meaning anything. It works alongside good [cardinality](/t/cardinality) hygiene: bounded labels, and types matched to the question, feed the [RED method](/t/red-method) and [golden signals](/t/golden-signals) dashboards.
