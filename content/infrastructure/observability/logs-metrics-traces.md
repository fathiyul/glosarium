---
title: "Logs, Metrics and Traces"
summary: "The three main kinds of telemetry."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["logs metrics traces", "three pillars of observability", "telemetry types"]
prereqs: ["observability"]
related: ["metrics", "structured-logging", "distributed-tracing", "cardinality", "correlation-id"]
---

Modern systems produce three main kinds of telemetry, and they answer different questions.

**logs** are discrete events with detail: a request failed, a user logged in, a job started. Each entry is rich but isolated, and high volume makes them expensive to store and search. They're best at the "what exactly happened" question — see [structured logging](/t/structured-logging) and [log aggregation](/t/log-aggregation).

**metrics** are numbers sampled over time and aggregated: request count, error rate, latency percentiles, queue depth. They're cheap to store and great for dashboards and alerts, but they lose per-request detail and can't answer arbitrary questions. Watch out for [cardinality](/t/cardinality) when labels get too varied.

**traces** follow one request through every service it touches, as a tree of spans with timing. They show *where* time went across service boundaries — the thing logs and metrics can't show directly. See [distributed tracing](/t/distributed-tracing) and [spans](/t/span).

```text
metrics: error rate = 3.2%        (is something wrong?)
logs:    "payment declined, id=..." (what happened?)
traces:  /checkout → auth → db → payment, 420 ms (where did it go?)
```

The classic mistake is expecting one to cover everything. Piling every event into logs and alerting on them is expensive and slow; trying to put high-cardinality detail into metrics explodes their cost; collecting traces with no way to relate them to the rest leaves three disconnected silos. The three work best when correlated by time and a shared [correlation ID](/t/correlation-id), so you can jump from a metric spike to the traces and logs behind it.

This trio is the practical content of [observability](/t/observability): collect all three, keep them connected, and you can debug problems you didn't anticipate.
