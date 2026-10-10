---
title: "Four Golden Signals"
summary: "Latency, traffic, errors and saturation."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["golden signals", "four golden signals", "sre golden signals"]
prereqs: ["monitoring", "metrics"]
related: ["slo", "latency", "throughput", "metric-types", "red-method", "use-method"]
---

The four golden signals are a short list of metrics worth watching for any service: latency, traffic, errors and saturation. The idea, from Google's site-reliability practice, is that these four cover the most important ways a service can look unhealthy, so you don't have to instrument everything to have a good starting dashboard.

- **Latency** — how long requests take. Track the distribution, not just the average: a mean hides the slow tail. Watch p95 and p99 alongside p50.
- **Traffic** — how much demand the service is under, such as requests per second. It explains the other signals.
- **Errors** — the rate of failed requests: explicit failures (5xx, exceptions) and implicit ones (a "successful" response that's wrong or slow).
- **Saturation** — how full the most constrained resource is: CPU, memory, a connection pool, a queue. It's the leading indicator that something is about to fall over.

The classic mistake is watching only one — usually CPU — and missing the others. A service can be fast, low-error and low-CPU while its [latency](/t/latency) tail grows because of a downstream dependency, or while a queue is backing up. Looking at all four catches more.

Two more traps:

- Averaging latency. The average often sits near the median and hides the slowest few percent, which are exactly the users who complain. Use percentiles.
- Saturation without identity. "Saturation is high" means nothing until you know *which* resource; identify the bottleneck.

The golden signals overlap with the [RED method](/t/red-method) (rate, errors, duration) and the [USE method](/t/use-method) (utilization, saturation, errors), which frame the same concerns from different angles. Use them to set [SLOs](/t/slo) and to choose what to alert on, rather than trusting counts of raw metrics.
