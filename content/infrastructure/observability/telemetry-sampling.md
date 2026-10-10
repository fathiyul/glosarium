---
title: "Sampling"
summary: "Recording only a fraction of traces or logs to control cost."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["sampling", "trace sampling", "head sampling", "tail sampling"]
prereqs: ["distributed-tracing", "observability"]
related: ["span", "logs-metrics-traces", "cardinality", "wide-events", "opentelemetry"]
---

**Sampling** records only a fraction of your telemetry instead of everything. At high volume, keeping every trace and log line is expensive and mostly redundant; sampling keeps a representative subset so you can still see how the system behaves and, ideally, still find the rare problems. It's a cost-control measure, and done badly it's a visibility-control measure too.

Two broad approaches:

- Head sampling decides at the *start*: e.g. keep 10% of requests, chosen as they arrive. It's simple and cheap, and the decision can be made consistently across a whole [trace](/t/span) so traces stay complete. The trade-off: you may drop a rare slow or failing request before you know it matters.
- Tail sampling decides at the *end*, after the trace is complete: keep all slow traces, all error traces, and a sample of the rest. It's more useful — you keep the interesting ones — but it requires buffering traces until they finish, which costs memory and complexity.

```text
head: keep 10% up front          → simple, may miss rare failures
tail: keep errors + slow + 1%    → smarter, needs buffering
```

The classic mistakes:

- Sampling away the interesting events. A flat 1% sample drops most of the very errors you'd investigate. Prefer strategies that keep errors and outliers (tail sampling, or separate retention).
- Inconsistent sampling. If one service samples 10% and another 1%, the same request gets recorded in one and not the other, and its trace breaks across services. Propagate the sampling decision so a trace is kept or dropped as a whole.
- No sampling at all at scale. Keeping everything can be prohibitively expensive and slow; the bill, not the dashboard, becomes the problem.
- Sampling logs and metrics the same as traces. They have different volume and value; a counter is cheap to keep in full, while raw logs may need aggressive sampling or filtering.

**When to sample:** whenever the volume of traces or logs exceeds what you need or can afford. Start with a modest head sample for the routine traffic, and add rules to always keep errors and slow requests. Keep an eye on [cardinality](/t/cardinality) too — sampling interacts with how much unique data you store. Configure it centrally, often in an [OpenTelemetry](/t/opentelemetry) collector.
