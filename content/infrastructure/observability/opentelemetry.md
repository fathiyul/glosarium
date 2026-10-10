---
title: "OpenTelemetry"
summary: "The vendor-neutral standard for collecting telemetry."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["OpenTelemetry", "OTel", "OTLP"]
prereqs: ["logs-metrics-traces"]
related: ["distributed-tracing", "metrics", "structured-logging", "span", "observability", "telemetry-sampling"]
---

**OpenTelemetry** is an open, **vendor-neutral** standard for generating and shipping telemetry — traces, metrics and logs. It defines APIs and SDKs you instrument your code with, and a wire protocol (OTLP) for sending the data to a backend. The point is to decouple *producing* telemetry from *where you send it*: instrument once, and export to whichever observability vendor or self-hosted store you choose.

```text
your app + OpenTelemetry SDK ──OTLP──▶ collector ──▶ any backend
     (traces, metrics, logs)             (optional pipeline)
```

A common pattern inserts a *collector* between apps and backends: apps send to the collector, and it batches, samples, filters and forwards to one or more destinations. That keeps the app from knowing about vendors and gives you one place to change sampling or routing.

Why it matters: without a standard, every tool has its own agent and format, and changing vendors means re-instrumenting everything. With OpenTelemetry, the instrumentation is portable and you avoid that lock-in — the same reasoning as open [container standards](/t/oci).

The classic mistakes:

- Assuming auto-instrumentation covers everything. Automatic instrumentation captures common libraries — HTTP calls, database clients — but not your business logic. Add manual spans where the meaning lives (see [span](/t/span)).
- Instrumenting for one backend. The value is neutrality; export through OTLP and let the backend be a configuration choice.
- Ignoring sampling and cost. More telemetry isn't free. Configure [sampling](/t/telemetry-sampling) and routing deliberately, often in the collector.
- Naming versions or specific products. The standard evolves quickly; describe the capability, not a particular release.

**When to adopt it:** when you want your traces, metrics and logs to be portable and consistently correlated ([logs, metrics and traces](/t/logs-metrics-traces)), especially if you expect to change or add backends. It also standardises the [context](/t/correlation-id) that links telemetry across services.
