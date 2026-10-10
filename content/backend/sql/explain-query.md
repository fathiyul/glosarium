---
title: "EXPLAIN"
summary: "Showing how the database plans to run a query."
levels: { backend: mid-level, data-engineer: mid-level , data-analyst: senior }
aliases: ["EXPLAIN", "EXPLAIN ANALYZE", "query plan analysis", "reading query plans", "execution plan"]
prereqs: ["select-query", "db-index"]
related: ["query-plan", "seq-scan-vs-index-scan", "db-index", "table-statistics", "slow-query-log", "query-optimization"]
core: [backend]
---

`EXPLAIN` shows **how the database plans to run a query**: which indexes it will use, how it will join tables, and in what order. It's the main tool for finding out why a query is slow.

```sql
EXPLAIN SELECT * FROM orders WHERE customer_id = 42;
```

```
Index Scan using idx_orders_customer_id on orders  (cost=0.43..8.45 rows=1 width=64)
  Index Cond: (customer_id = 42)
```

versus

```
Seq Scan on orders  (cost=0.00..18334.00 rows=5 width=64)
  Filter: (customer_id = 42)
```

The second reads the entire table to find 5 rows. That's usually the signal that an index is missing ([sequential scan vs index scan](/t/seq-scan-vs-index-scan)).

## EXPLAIN vs EXPLAIN ANALYZE

- **`EXPLAIN`** shows the **estimated** plan, without running the query.
- **`EXPLAIN ANALYZE`** **runs the query** and shows **actual** timings and row counts next to the estimates (in PostgreSQL, and MySQL 8.0.18 and newer, with differences in format).

Warning: `EXPLAIN ANALYZE` on an `INSERT`, `UPDATE` or `DELETE` **really performs it**. Wrap it in a transaction you roll back, or use a copy.

## How to read a plan

Plans are trees, read from the innermost, most-indented node outward. Things to look at:

| Look for | Meaning |
|---|---|
| **Seq Scan** on a big table with a selective filter | A missing or unusable index |
| **Index Scan / Index Only Scan** | Using an index (good), though not always faster for large fractions of a table |
| **Estimated vs actual rows** far apart | Stale statistics, so the planner chose a bad plan ([table statistics](/t/table-statistics)) |
| **Join type**: nested loop, hash join, merge join | A nested loop over big inputs is a classic cause of slowness |
| **Sort** that spills to disk | Not enough memory, or a missing index to provide ordering |
| **Rows removed by filter** (large) | Reading far more than it returns |
| **Highest-cost or slowest node** | Where to focus |

## A workflow

1. Find the slow query ([slow query log](/t/slow-query-log)).
2. Run `EXPLAIN (ANALYZE)` on it, with realistic data volumes. Plans on a small dev database can differ completely.
3. Find the expensive step. Add or adjust an index ([composite index](/t/composite-index), [database indexes](/t/db-index)), rewrite the query, or update statistics.
4. Run `EXPLAIN` again and compare. Measure the time, not only the plan.

Details of plan nodes are in [query plans](/t/query-plan), and tuning ideas are in [query optimization](/t/query-optimization). Different databases print different formats, but the ideas are the same.
