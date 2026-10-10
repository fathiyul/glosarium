---
title: "Cardinality"
summary: "The number of unique label combinations, and why high cardinality gets expensive."
levels: { backend: senior, data-engineer: senior }
aliases: ["Cardinality", "high cardinality", "label cardinality"]
prereqs: ["metrics"]
related: ["metric-types", "prometheus-grafana", "monitoring", "wide-events", "telemetry-sampling"]
---

**Cardinality** is the number of unique combinations of label values in a set of metrics. A metric `http_requests_total` with labels `service` and `status` has one time series per service-and-status pair. With 10 services and 5 status codes, that's 50 series — fine. Add a `user_id` label with 100,000 users and you've created 100,000 series for each service and status. That explosion is **high cardinality**, and it's one of the most common ways to overwhelm a metrics system.

Why it's expensive: each series is tracked, stored and indexed separately, and the system's memory and query cost grow with the number of series, not the number of samples. Unbounded label values — user IDs, request IDs, raw URL paths, email addresses — turn a metric into a liability.

```text
bounded labels:   service, route template (/orders/:id), status class
unbounded labels: user_id, request_id, raw url with ids, session
```

The classic mistakes:

- Putting identifiers in labels. A high-cardinality value should be in a log or a [wide event](/t/wide-events), not a metric label. Metrics are for aggregation.
- Raw URLs as labels. `/orders/12345` and `/orders/67890` are different series for the same endpoint. Use a route template so they collapse.
- Not knowing which labels are high-card. You can't fix what you don't measure. Track series counts per metric and watch for outliers.
- Adding labels casually. Each new label multiplies the series. A "helpful" label can double or triple cost overnight.

**When high cardinality is acceptable:** in systems built for it — tracing backends and some event stores handle many unique values by design (see [wide events](/t/wide-events)). The trick is matching the store to the shape of the data: aggregate and use bounded labels for metrics; keep the detailed, high-cardinality dimensions in traces and events where they belong.
