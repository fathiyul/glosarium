---
title: "Observability"
summary: "Understanding a system's internal state from its outputs."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["observability", "o11y", "observability vs monitoring"]
prereqs: ["monitoring"]
related: ["logs-metrics-traces", "metrics", "structured-logging", "distributed-tracing", "correlation-id", "cardinality"]
---

**Observability** is the ability to understand what a system is doing from the outside — from the data it emits — without having to ship new code or guess where to look. You instrument the system with [logs, metrics and traces](/t/logs-metrics-traces), and those outputs let you ask questions you didn't plan for.

The distinction from [monitoring](/t/monitoring) is the kind of question. Monitoring asks the questions you already knew to ask: "is CPU high?", "is the error rate over 5%?" It watches known failure modes against dashboards and alerts. Observability is aimed at the unknown: a novel bug, a weird latency pattern, "why are *these* users affected?" — answered by exploring the data rather than by a pre-built chart.

```text
monitoring:   known-unknowns  → dashboards & alerts answer them
observability: unknown-unknowns → explore logs, metrics, traces to find out
```

The classic mistake is equating observability with "we have dashboards." Dashboards answer yesterday's questions. If every investigation needs a new metric or a deploy just to see what's happening, the system isn't very observable regardless of how many graphs you have.

Two more traps:

- **Collecting everything, unstructured.** Raw volume isn't observability. Data needs names, context and a way to correlate — structured events, consistent labels, and a [correlation ID](/t/correlation-id) that ties a request's logs, metrics and spans together.
- **Ignoring cost and cardinality.** Storing every unique combination of labels (see [cardinality](/t/cardinality)) gets expensive fast. Sample and aggregate deliberately.

Frontend, backend and data teams all need this — a slow page, a slow endpoint and a slow pipeline each require seeing inside a running system. Good observability shortens [incident](/t/incident-response) response and makes production debuggable. It's a property of the system, not a product you buy.
