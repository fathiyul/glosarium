---
title: "Query Statistics (pg_stat_statements)"
summary: "Finding which queries use the most time in aggregate."
levels: { backend: senior, data-engineer: senior }
aliases: ["query statistics", "pg_stat_statements", "statement statistics"]
prereqs: ["slow-query-log", "query-plan"]
related: ["slow-query-log", "query-plan", "monitoring", "table-statistics"]
---

**Query statistics** aggregate performance data *per query shape*: how many times each query ran, its total time, mean time, and rows touched. PostgreSQL's `pg_stat_statements` is the canonical example; other databases have equivalents. Where the [slow query log](/t/slow-query-log) shows individual slow executions, statistics show the *cumulative* cost — which is usually what shapes a database's overall load.

```text
query                          calls     total_time   mean
SELECT ... WHERE user_id = $1  4,000,000    900 s       0.2 ms
SELECT ... report join         50          400 s       8 s
```

The insight is that the slowest single query and the biggest *total* cost are often different. A 0.2 ms query called four million times can consume more total database time than a rare 8-second report. Tuning by total time targets the real bottleneck.

The classic mistakes:

- Optimising only the slowest per-execution query. A fast-but-ubiquitous query can dominate load. Sort by total time, not just mean or max.
- Forgetting to reset or version the stats. Aggregates accumulate; after an optimisation, look at the trend or reset to see the new picture. Stats also get truncated/rotated by the extension's limits.
- Comparing against a changed workload. Stats accumulate across every execution; a query's average hides bursts. Combine with time-series monitoring.
- Ignoring the query shape normalisation. `pg_stat_statements` groups by normalised text (values replaced), which is what makes it useful — but it can also merge queries that behave differently with different parameters.
- Not correlating with the plan. Stats say *which* query; the [query plan](/t/query-plan) says *why* it's expensive. Use both.
- Overlooking application-level patterns. A query called millions of times may indicate an N+1 in the app (see [eager vs lazy loading](/t/eager-vs-lazy-loading)), not a badly written statement.
- Treating it as free. Statement stats add some overhead; usually modest, but be aware on extreme-throughput systems.

**How to use it:** periodically sort queries by total time and call count, pick the top offenders, and profile them with `EXPLAIN ANALYZE`. Fix indexes or rewrites for the statements; fix N+1 patterns in the app for the call counts. It's the best starting point for database performance work — find where the time actually goes, in aggregate. See [slow query log](/t/slow-query-log) and [monitoring](/t/monitoring).
