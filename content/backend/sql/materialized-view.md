---
title: "Materialized View"
summary: "A view whose results are stored and refreshed."
levels: { backend: senior, data-engineer: mid-level , data-analyst: senior , data-scientist: mid-level }
aliases: ["materialised view", "matview", "materialized views", "precomputed view", "REFRESH MATERIALIZED VIEW"]
prereqs: ["view", "group-by"]
related: ["view", "denormalization", "aggregate-tables", "cte", "db-index", "query-cost"]
core: [data-engineer, data-scientist]
also: [data-serving]
---

A regular [view](/t/view) is a **saved query** that's re-run every time you read it. A **materialized view** **stores the query's result** like a table, so reading it is fast. The price: the stored data can be **stale** until it's refreshed.

```sql
-- PostgreSQL
CREATE MATERIALIZED VIEW daily_revenue AS
SELECT date_trunc('day', created_at) AS day, SUM(total_cents) AS revenue
FROM orders
WHERE status = 'paid'
GROUP BY 1;

CREATE UNIQUE INDEX ON daily_revenue (day);             -- you can index it like a table

SELECT * FROM daily_revenue WHERE day >= '2024-06-01';  -- fast: reads the stored result

REFRESH MATERIALIZED VIEW CONCURRENTLY daily_revenue;   -- recompute; CONCURRENTLY needs a unique index
```

## When it's useful

- **Expensive aggregations** that many people or dashboards read often, but whose underlying data changes less often.
- **Joins across large tables** that you'd otherwise repeat.
- **Reporting and analytics**, where being slightly out of date is acceptable.

It's a form of [denormalization](/t/denormalization) managed by the database: precomputed data with a defined source.

## The staleness trade-off

- In **PostgreSQL**, a materialized view is **not updated automatically**. You schedule a refresh (a cron job or orchestrator), and between refreshes it shows old data. A plain `REFRESH` locks reads while it runs, whereas `CONCURRENTLY` avoids blocking readers but needs a unique index and is slower.
- Some databases and warehouses (Snowflake, BigQuery, Oracle, SQL Server's indexed views and others) can **maintain materialized views automatically or incrementally**, with their own limits on which queries qualify. Check what yours supports.
- Most refresh the whole thing, which is wasteful on huge tables. For those, incremental tables you maintain yourself may work better ([incremental models](/t/incremental-models), [aggregate tables](/t/aggregate-tables)).

## Habits

- **Decide how stale is acceptable**, and schedule the refresh accordingly. Show "as of" timestamps in reports.
- **Index them** for how they're queried.
- **Watch refresh time and cost**, since a view that takes an hour to refresh every ten minutes is a problem ([query cost](/t/query-cost)).
- **Don't stack too many** materialized views on each other, which makes refresh order and debugging harder.
- Use a plain view when freshness matters more than speed, and a cache or table when you need full control.
