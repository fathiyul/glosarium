---
title: "Slow Query Log"
summary: "A record of queries that take too long."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["slow query log", "slow queries", "slow log"]
prereqs: ["database", "db-index"]
related: ["query-plan", "query-statistics", "logging"]
---

The **slow query log** records queries that take longer than a threshold, so you can find the ones actually causing pain instead of guessing. Databases can log queries over, say, 200 ms, and many also track aggregated statistics (total time, call count) per query shape.

```text
# postgresql.conf
log_min_duration_statement = 200ms   # log anything slower
```

The log answers "which queries are slow?"; a [query plan](/t/query-plan) then answers "why?". Together they're the standard performance workflow: find the offenders, then profile them.

The classic mistakes:

- Optimising without data. Tuning a query you *assume* is slow wastes effort. The log shows what's actually slow under real load.
- A threshold that's too low. Logging every 5 ms query floods the log and buries the real problems. Set it above normal expected latency.
- Only looking at individual slow queries. A query that's fast individually but called a million times can dominate total time. Aggregated [query statistics](/t/query-statistics) (total time *and* calls) catch these.
- Forgetting to tune bind parameters. The same query shape with different parameters can have wildly different performance ("slow" for one tenant, instant for another). Test with worst-case values.
- Ignoring the cause pipeline. A "slow query" is often fine SQL slowed by missing indexes, lock contention, stale statistics, or an overloaded database. The plan and the database's state tell you which.
- Never turning it off or rotating. Verbose logging on a busy database is itself a cost; enable it when hunting and keep retention sane (see [log rotation](/t/log-rotation)).

**How to use it:** enable a sensible threshold, collect the worst offenders (by total time, not just per-call), then run `EXPLAIN ANALYZE` on each and fix the real cause — an index, a rewrite, or a schema change. It's the first step of query tuning, and it's cheap. See [indexing](/t/indexing) and [query statistics](/t/query-statistics).
