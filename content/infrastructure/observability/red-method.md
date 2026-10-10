---
title: "RED Method"
summary: "Rate, errors and duration for request-driven services."
levels: { backend: senior, data-engineer: senior }
aliases: ["RED method", "rate errors duration", "RED metrics"]
prereqs: ["metrics", "monitoring"]
related: ["use-method", "golden-signals", "slo", "latency", "span"]
---

The **RED method** is a compact recipe for monitoring a request-driven service. It says: for each service, track three things.

- Rate — requests per second. How much demand is arriving.
- Errors — the number or share of those requests that failed (5xx, exceptions, timeouts).
- Duration — how long requests take, as a distribution, so you can see the slow tail (p95, p99), not just the average.

```text
rate:     requests/sec
errors:   failed requests/sec (or error rate %)
duration: p50 / p95 / p99 latency
```

It's a service-oriented counterpart to the [USE method](/t/use-method), which looks at resources. Use RED for things that serve requests — an HTTP API, a queue consumer, a gRPC service — and graph the three signals per endpoint, because a single slow or erroring route gets lost in a service-wide average.

RED overlaps heavily with the [four golden signals](/t/golden-signals) (latency, traffic, errors, saturation): rate is traffic, duration is latency, errors are errors. The difference is RED drops saturation and organises everything around a request, which makes it a natural starting dashboard for any service.

The classic mistakes:

- Only the average duration. A mean latency hides the requests that take 10× longer. Watch percentiles; that's where users feel pain (see [latency](/t/latency)).
- Aggregating across endpoints. One endpoint erroring while others are fine disappears in a service-level average. Break it down by route.
- Using RED for resources. For a disk, a queue or a CPU pool, ask utilization/saturation/errors instead — that's USE. RED assumes requests.
- No baseline. Without knowing normal rate and error levels, a graph tells you little. Establish what "healthy" looks like so a change stands out.

**How to use it:** build a per-service RED dashboard for the first look during an [incident](/t/incident-response), and base [SLOs](/t/slo) on duration and errors. For the deeper "where did the time go", follow a slow request through a [trace](/t/distributed-tracing) and its [spans](/t/span).
