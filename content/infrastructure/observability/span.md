---
title: "Span"
summary: "One timed operation within a trace."
levels: { backend: senior, data-engineer: senior }
aliases: ["span", "trace span", "distributed tracing span"]
prereqs: ["distributed-tracing"]
related: ["opentelemetry", "correlation-id", "logs-metrics-traces", "apm", "observability"]
---

A **span** is one timed operation in a [distributed trace](/t/distributed-tracing): it has a name, a start and end time, and a parent — except the root span, which begins the trace. Put the spans together and you have the shape of a request: an outer span for the HTTP handler, child spans for the database query, the cache lookup, the call to another service.

```text
trace: GET /checkout                 [span: root]
 ├─ span: auth.verify                (30 ms)
 ├─ span: db.query orders            (260 ms)   ← the slow child
 └─ span: http call payment.charge   (120 ms)
```

Spans are how you see *where time went* across service boundaries, which neither logs nor metrics show directly: logs tell you what happened, metrics tell you the aggregate, spans tell you the path and the timing of one request.

The classic mistakes:

- Not propagating context. A span in service B only joins the trace if the caller passes the trace context (a trace ID and parent span ID) along the request. Forget that and you get disconnected fragments instead of one trace. Cross-service context propagation is the whole point.
- Too many spans. Instrumenting every tiny function floods the trace and makes it unreadable and expensive. Add spans where they carry meaning — network calls, database queries, significant work.
- Too few attributes. A span named `db.query` with no statement or table is hard to act on. Add the few attributes that make it identifiable.
- Ignoring clock skew. Spans from different machines use their own clocks; small differences can make a child appear to start before its parent. Treat timing as approximate across hosts.
- Skipping [sampling](/t/telemetry-sampling) decisions. At volume, not every trace is kept; make sure the sampling decision applies to the whole trace so spans don't go missing inconsistently.

**How to use them:** open a slow trace and read the waterfall to find the span that dominates — usually a query, a downstream call, or an accidental N+1. Then fix the specific thing, not the whole service. Spans are the unit that makes a trace useful, often emitted through [OpenTelemetry](/t/opentelemetry) and linked to logs by a shared [correlation ID](/t/correlation-id).
