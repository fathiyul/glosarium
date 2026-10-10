---
title: "Wide Events"
summary: "Rich, high-cardinality events instead of pre-aggregated metrics."
levels: { backend: staff, data-engineer: staff }
aliases: ["wide events", "wide structured events", "high-cardinality events"]
prereqs: ["structured-logging"]
related: ["cardinality", "logs-metrics-traces", "metrics", "log-aggregation", "observability"]
---

**Wide events** are logs taken to their logical extreme: instead of a short message, each event is a rich record with many structured fields — request ID, user, endpoint, latency, status, region, feature flags, build version — all in one place. You collect them cheaply and **high-cardinality**, then slice them any way you need *later*, rather than deciding in advance which aggregates to keep.

The contrast is with pre-aggregated metrics. Metrics are cheap and fast but force you to choose the dimensions up front; a handler that "counts requests by status" can't tell you about the one user whose requests are slow, because that detail was aggregated away. A wide event keeps the detail.

```text
metric:    {"metric": "requests", "count": 14200}      ← no "who" or "why"
wide event: {user: 42, route: "/orders/:id", ms: 830,
             status: 200, region: "eu", build: "a1b2"}
```

You can then ask new questions without shipping new telemetry: "which region is slowest for this route for users on the new build?" — a query over the events, not a redesign.

The classic mistakes:

- Aggregating too early. If you only store counters, you can't answer unanticipated questions. Keep the raw, wide record where you can afford to.
- Too little context. A wide event with three fields is just a log. The value comes from including the dimensions you'll want to filter on — but see the next point.
- Ignoring cost and cardinality. Wide, high-cardinality data is expensive to store and query. Sample, tier, and set retention deliberately (see [sampling](/t/telemetry-sampling) and [cardinality](/t/cardinality)).
- Not agreeing on field names. If one service logs `duration_ms` and another `latency`, queries break. A shared schema makes the events usable together (see [structured logging](/t/structured-logging)).

**When to use them:** when you need to answer questions you didn't anticipate — debugging rare issues, understanding a specific cohort, or replacing a sprawl of one-off metrics. Metrics remain best for dashboards and alerts where the dimensions are known and stable; wide events fill the "why" once a metric points you at the "what". Both sit in [logs, metrics and traces](/t/logs-metrics-traces).
