---
title: "Tail Latency"
summary: "The slowest requests (p99), which users notice most."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["p99 latency", "latency tail", "high-percentile latency", "long tail latency", "tail at scale"]
prereqs: ["percentile", "latency"]
related: ["percentile", "hedged-requests", "latency", "slo", "load-shedding", "distributed-system"]
core: [backend]
also: [observability]
---

**Tail latency** is the latency of the **slowest requests**, usually seen as the 99th or 99.9th percentile (p99, p99.9), as opposed to the typical (median) one. The median can look excellent while a small share of requests are painfully slow. Those slow requests matter more than their share suggests.

```
p50 = 40 ms,   p95 = 120 ms,   p99 = 900 ms,   p99.9 = 4 s
```

## Why the tail matters

- **Users notice slow experiences**, and heavy users, who make many requests, are most likely to hit the tail. If a page needs 20 requests, the chance a user hits a slow one is high ([percentiles](/t/percentile)).
- **Fan-out amplifies it.** If one user request calls many backend services in parallel and waits for **all** of them, the slowest dominates. If each backend is slow 1% of the time, then calling 100 of them means the chance that at least one is slow is 1 − 0.99¹⁰⁰ ≈ **63%**. A rare problem per component becomes the common case for the whole request. This is why large systems obsess over tails.
- **Slow requests hold resources** (threads, connections) longer, and can trigger [cascading failures](/t/cascading-failure).
- **SLOs are usually written on percentiles**, such as 99% of requests under 300 ms ([SLOs](/t/slo)).

## Typical causes

- **Queueing**: bursts of traffic wait in line, and queue delays grow sharply as utilization approaches 100%.
- **Garbage collection pauses** and other runtime stalls.
- **Noisy neighbors**: shared hardware or contended resources.
- **Lock contention** and slow database queries on unusual data.
- **Cold caches, cold starts and connection setup.**
- **Background activity**: compactions, backups, log rotation, cron jobs.
- **Network issues**: retransmissions, slow replicas, cross-zone calls.
- **Retries and timeouts** that add their own delays.
- **Data skew**: one heavy tenant or hot key.

## Reducing it

- **Reduce variability**, not only the average: find and fix the outliers.
- **Hedged requests**: send a duplicate request to a second replica if the first hasn't answered within, say, the p95 time, and use whichever returns first ([hedged requests](/t/hedged-requests)). It cuts the tail at the cost of a little extra load, and requires idempotent reads.
- **Timeouts and fast failure**, so a slow dependency doesn't stall the whole request. Return partial results where possible.
- **Avoid unnecessary fan-out and sequential chains**, and cache aggressively.
- **Keep utilization headroom**, since saturation makes queues explode ([capacity planning](/t/capacity-planning)).
- **Shed load** instead of queuing without bound ([load shedding](/t/load-shedding)).
- **Isolate workloads** so batch jobs and noisy tenants don't affect interactive traffic ([bulkheads](/t/bulkhead)).
- **Use better load balancing** (least-loaded rather than round-robin, where requests vary).
- **Tune runtimes** (GC settings) and warm caches and connections.

## Measuring

Use **histograms and percentiles**, not averages ([metrics](/t/metrics)). **Don't average percentiles** across servers. Keep per-endpoint and per-dependency breakdowns, and use tracing to find where slow requests spend time ([distributed tracing](/t/distributed-tracing)). Look at the tail first when users say "it feels slow sometimes".
