---
title: "APM"
summary: "Application performance monitoring tools."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["application performance monitoring", "apm tool", "apm"]
prereqs: ["observability", "metrics"]
related: ["distributed-tracing", "monitoring", "logs-metrics-traces", "error-tracking", "opentelemetry"]
---

**APM** (application performance monitoring) is a class of tools that instrument an application to show how it behaves for users: how long requests take, how often they fail, which database queries or downstream calls are slow, and where time is spent. Where infrastructure [monitoring](/t/monitoring) answers "is the machine healthy?", APM answers "is the *application* healthy, and why is this request slow?"

You install an agent or SDK in the app. It records each request as a trace, broken into spans for the work inside — the handler, the database call, the call to another service (see [distributed tracing](/t/distributed-tracing)).

```text
GET /checkout            420 ms
 ├─ auth.verify            30 ms
 ├─ db.query orders       260 ms   ← the slow part
 └─ payment.charge        120 ms
```

The breakdown is the point. A dashboard says "p95 latency is up"; a trace shows the one slow query responsible, so you can fix the actual cause instead of guessing.

The classic mistakes:

- **Confusing APM with host monitoring.** The CPU can look fine while a single endpoint is slow because of a downstream dependency. Both views are needed.
- **Turning it on and ignoring the volume.** Request-level data is huge and can be expensive; use sampling to keep costs and overhead reasonable (see [telemetry sampling](/t/telemetry-sampling)).
- Assuming zero overhead. Instrumentation costs something. Usually worth it, but measure rather than assume.
- **Treating the tool as the goal.** APM is one of the [logs, metrics and traces](/t/logs-metrics-traces) pillars — it helps most when correlated with the others by time and [correlation ID](/t/correlation-id).

Frontend engineers use APM for page and API timing; backend engineers for request and dependency latency; data engineers for pipeline and job runtime. Modern setups often export through a common standard like [OpenTelemetry](/t/opentelemetry) so you aren't locked into one vendor.
