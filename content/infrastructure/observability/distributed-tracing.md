---
title: "Distributed Tracing"
summary: "Following a single request across many services."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["tracing", "request tracing", "OpenTelemetry tracing", "trace", "distributed traces"]
prereqs: ["correlation-id", "observability"]
related: ["correlation-id", "opentelemetry", "span", "telemetry-sampling", "apm", "observability", "context-propagation"]
core: [backend, frontend]
---

**Distributed tracing** records the **path of a single request across all the services it touches**, with timing for each step, so you can see where time went and where errors happened. In a system of many services, logs and metrics tell you *that* something is slow. A trace shows **which call** is the culprit.

## The model

- A **trace** is the whole journey of one request, identified by a **trace ID**.
- A **span** is one unit of work within it (an HTTP handler, a database query, an outgoing call), with a start time, duration, status and attributes. Spans have **parent–child relationships**, forming a tree ([spans](/t/span)).

```
trace 4bf92f35...                                    total: 480 ms
 └─ GET /checkout           (api-gateway)             ████████████████████████████████ 480 ms
     ├─ auth.verify         (auth-service)            ██ 20 ms
     └─ POST /orders        (orders-service)          ██████████████████████████████ 450 ms
         ├─ SELECT cart     (postgres)                █ 8 ms
         ├─ charge-card     (payments-service)        ███████████████████████ 380 ms   ← the slow part
         └─ publish         (broker)                  █ 5 ms
```

You immediately see that most of the time is in the payment call, instead of guessing from separate logs.

## How it works

1. The first service **creates a trace ID** (and a root span) when a request arrives.
2. When it calls another service, it **propagates the trace context** in headers. The standard is the W3C `traceparent` header ([context propagation](/t/context-propagation)). Message queues carry it in message headers.
3. Each service creates **child spans** and reports them to a **backend** (a tracing system) that assembles them into a trace you can search and view.

**OpenTelemetry** is the widely adopted open standard and set of libraries for generating and exporting traces (and metrics and logs), so you aren't locked into one vendor ([OpenTelemetry](/t/opentelemetry)). Many frameworks and libraries have **automatic instrumentation**, which creates spans for HTTP, database and messaging calls with little code. Add custom spans for important business operations.

## What it's used for

- **Finding latency bottlenecks** and slow dependencies ([tail latency](/t/tail-latency)).
- **Locating the source of errors** in a call chain.
- **Understanding dependencies**: which services call which, and how often.
- **Debugging specific requests**: "what happened to order 917?" (attach IDs as span attributes).
- Linking to logs: put the trace ID in every log line ([correlation IDs](/t/correlation-id)).

## Practical points

- **Propagation must be everywhere.** One service that doesn't forward the headers breaks the trace into pieces. Check async paths: queues, background jobs, thread pools.
- **Sampling.** Tracing every request is expensive at scale, so systems sample: keep a percentage, or decide **after** the fact to keep slow and error traces (tail-based sampling) ([sampling](/t/telemetry-sampling)).
- **Don't put sensitive data** in span attributes.
- **Control cardinality and volume**, and cost.
- **Name spans consistently** (route patterns like `GET /orders/{id}`, not full URLs with IDs).
- Traces complement **metrics** (what's happening overall) and **logs** (detailed events) ([observability](/t/observability), [logs, metrics and traces](/t/logs-metrics-traces)).
