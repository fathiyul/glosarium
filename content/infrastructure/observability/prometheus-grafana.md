---
title: "Prometheus and Grafana"
summary: "A common open-source stack for metrics and dashboards."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["prometheus", "grafana", "promql"]
prereqs: ["metrics", "monitoring"]
related: ["dashboard", "alerting", "cardinality", "metric-types", "observability"]
---

**Prometheus** and **Grafana** are two open-source tools that are often used together. Prometheus collects and stores time-series [metrics](/t/metrics): it periodically *scrapes* a numbered endpoint that your application or its environment exposes, and keeps the samples with their labels. Grafana connects to Prometheus and turns those series into dashboards and graphs. Neither is the only option — hosted services and other stacks do the same job — but the pair is a common default.

```text
app / exporter ──scrape──▶ Prometheus ──query──▶ Grafana dashboards
                                │
                                └──▶ alerting rules
```

The workflow is: instrument the app to expose counters, gauges and histograms (see [metric types](/t/metric-types)); let Prometheus scrape them; write queries to graph rates and percentiles; and define alert rules for conditions worth paging on (see [alerting](/t/alerting)).

The classic mistake is **cardinality blow-up**. Every distinct combination of label values is its own time series. Putting a user ID, request ID or raw URL path in a label creates millions of series, which slows queries and consumes memory. Keep labels to bounded sets like service, route template and status class (see [cardinality](/t/cardinality)).

Two more traps:

- Using metrics for detail they don't hold. Metrics are aggregated; to see a specific failed request you need logs or traces (see [logs, metrics and traces](/t/logs-metrics-traces)).
- Forgetting retention and ownership. Decide how long to keep data before you need it, and give each dashboard an owner so it doesn't rot.

Prometheus stores metrics locally with a pull model and its own query language (PromQL); Grafana is dashboard-only and can also front many other data sources. The stack is one concrete way to build the metrics half of [observability](/t/observability); OpenTelemetry offers a vendor-neutral path to the same data ([OpenTelemetry](/t/opentelemetry)).
