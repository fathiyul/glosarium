---
title: "Query Optimization"
summary: "Rewriting queries and adding indexes to make them fast."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["SQL optimization", "query tuning", "SQL tuning", "slow query fix", "database performance tuning"]
prereqs: ["explain-query", "db-index"]
related: ["explain-query", "db-index", "composite-index", "slow-query-log", "n-plus-one-query", "table-statistics", "covering-index"]
core: [backend]
---

**Query optimization** is making a database query faster by changing the query, the indexes or the data layout. It's a **measure, change, measure** process, not guesswork.

## A reliable workflow

1. **Find what's actually slow.** Use the [slow query log](/t/slow-query-log), APM or monitoring to find the queries that cost the most in total (time × frequency). A 50 ms query run 10,000 times a minute can matter more than one 5-second report.
2. **Look at the plan** with `EXPLAIN` / `EXPLAIN ANALYZE`, on realistic data volume ([EXPLAIN](/t/explain-query)).
3. **Find the expensive step** and decide on a fix.
4. **Change one thing, then measure** again.

## Common fixes, roughly in order

**Add or fix an index** for the `WHERE`, `JOIN` and `ORDER BY` columns, with the right column order ([indexes](/t/db-index), [composite indexes](/t/composite-index)).

**Make the filter usable by the index.** These defeat it:

```sql
WHERE LOWER(email) = 'a@x.com'            -- function on the column (use an expression index, or store it lowercased)
WHERE created_at::date = '2024-06-01'     -- cast on the column; use a range: >= '2024-06-01' AND < '2024-06-02'
WHERE name LIKE '%son'                    -- leading wildcard
WHERE customer_id = '42'                  -- type mismatch
```

**Fetch less.** Select only the needed columns instead of `SELECT *`, filter early, add `LIMIT`, and avoid pulling big result sets into the application ([cursors](/t/database-cursor), [pagination](/t/pagination)).

**Fix N+1 patterns**: replace per-row queries with a join or a batched query ([N+1](/t/n-plus-one-query)).

**Avoid unnecessary work**: remove needless `DISTINCT`, `ORDER BY` on huge sets, repeated subqueries, and joins to tables you don't use.

**Keep statistics fresh** so the planner makes good choices ([table statistics](/t/table-statistics)).

**Rewrite awkward forms**: `EXISTS` instead of `IN` with large lists, a join instead of a correlated subquery, `UNION ALL` instead of `UNION` when duplicates don't matter.

**Precompute** expensive aggregates ([materialized views](/t/materialized-view), summary tables), or cache results ([caching](/t/caching)).

**Reduce data**: archive or partition old data ([partitioning](/t/partitioning)).

## Cautions

- **Optimize with real data and real queries.** A plan on 100 rows says nothing about 100 million.
- **Indexes cost write speed and space.** Don't add one for every query. Drop unused ones.
- **Don't optimize without measuring.** The bottleneck might be the network, the application or lock contention, not the query.
- **Premature optimization** of queries that run rarely wastes time ([premature optimization](/t/premature-optimization)).
- **Test after changes**: a rewrite must return the same results.
- Database-specific features (hints, settings) are a last resort, and need revisiting as data grows.
