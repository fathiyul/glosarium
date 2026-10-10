---
title: "Time-Series Database"
summary: "Databases optimized for timestamped measurements."
levels: { backend: senior, data-engineer: senior }
aliases: ["time-series database", "tsdb", "time series database"]
prereqs: ["database", "metrics"]
related: ["metrics", "monitoring", "compression"]
---

A **time-series database (TSDB)** is specialised for data that is a stream of timestamped values — metrics, sensor readings, application telemetry. Its workload is unusual: mostly **appends** (new points constantly), queries over **time ranges**, and rarely updates or deletes. General databases handle this poorly at scale; TSDBs are built for it.

What makes them different:

- Time is the primary axis — data is stored and indexed by time, so range queries ("the last hour") are the fast path.
- High write throughput — designed to ingest millions of points per second, appending.
- Compression — time-ordered, repetitive numeric data compresses extremely well, so they store far more per byte than a general table.
- Retention and downsampling — automatically expire old data and aggregate it to coarser resolution (raw for a week, hourly averages for a year) — see **downsampling**.

```text
point: (metric_name, labels, timestamp, value)
query: average over the last 6h grouped by host
retention: raw 7d → hourly 1y → delete
```

The classic mistakes:

- Storing metrics in a normal relational table. Row-per-point in a general database grows enormous and queries slow as the table balloons; it's a common early mistake that a TSDB or a metrics system solves.
- Keeping raw data forever. Metrics are voluminous and mostly interesting when recent; retention and downsampling keep cost sane. Without them, storage explodes.
- High-cardinality labels. Labelling each point with user IDs or request IDs (see [cardinality](/t/cardinality)) multiplies series and destroys performance/storage — the TSDB version of the same trap.
- Using one for transactional data. A TSDB is optimised for append-heavy time series, not updates, deletes or relational queries. Use the right store (see [polyglot persistence](/t/polyglot-persistence)).
- Ignoring query patterns. Aggregation over ranges is the design centre; ad-hoc joins or full-text search aren't its job.
- Assuming downsampling is lossless. Aggregates lose detail; keep raw data long enough for the questions you actually need to answer.

When to use it: for monitoring metrics, IoT/sensor data, and application telemetry — anything append-heavy and time-ranged. It's tightly connected to [monitoring](/t/monitoring) and [metrics](/t/metrics): a metrics system usually *is* a TSDB underneath, tuned with retention and downsampling for the cost/clarity balance.
