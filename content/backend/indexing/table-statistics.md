---
title: "Table Statistics"
summary: "Data distributions the planner uses to choose query plans."
levels: { backend: senior, data-engineer: senior }
aliases: ["table statistics", "planner statistics", "analyze"]
prereqs: ["query-plan", "cardinality"]
related: ["index-selectivity", "query-statistics", "query-plan"]
---

**Table statistics** are the database's summary of a table's data — how many rows, how many distinct values per column, and how values are distributed. The query planner uses these **estimates** to decide how to run a query: scan or index, which join order, which algorithm. If the statistics are wrong, the plan is wrong, and the query is slow for no obvious reason.

```text
SELECT * FROM orders WHERE status = 'open';
planner asks: how many rows match 'open'?   (~5% → index; ~90% → scan)
```

Databases gather statistics by sampling the table, usually automatically (autovacuum/autoanalyze) and via a manual `ANALYZE`. Because they're *estimates* based on a sample, they can be off — especially for skewed data or after bulk changes.

The classic mistakes:

- Letting statistics go stale after bulk changes. After a large import or delete, the planner still thinks the table looks like before and picks a bad plan. Run `ANALYZE` after big data changes, or ensure auto-analyze is on.
- Assuming the planner is always right. It optimises on estimates; a bad estimate (a *row count misestimate* in the plan) is a common root cause of slow queries. Compare estimated vs actual rows in [`EXPLAIN ANALYZE`](/t/query-plan).
- Ignoring skew. If a column has a very common value and rare ones, summary stats can hide the skew; extended statistics or histograms help. Queries for the rare value may get a plan tuned for the common one.
- Over-analyzing. `ANALYZE` costs a scan/sample; running it constantly on a huge table is wasteful. Let the autovacuum do it and force it only after bulk changes.
- Confusing table statistics with query statistics. Table stats describe the data for planning; [query statistics](/t/query-statistics) describe how often and how slowly queries run. Different uses.
- Forgetting the correlation factor. Physical ordering vs value ordering affects whether BRIN and read-ahead help; the planner tracks this but it degrades after many updates.

**How to use it:** when a plan looks wrong or a query is unexpectedly slow, check whether the estimates match reality and refresh statistics if not. Good statistics are the invisible foundation of good plans — cheap to maintain and expensive to neglect. See [query plan](/t/query-plan) and [index selectivity](/t/index-selectivity).
