---
title: "Query Plan"
summary: "The database's chosen strategy of scans, joins and sorts."
levels: { backend: senior, data-engineer: senior }
aliases: ["query plan", "execution plan", "explain plan"]
prereqs: ["sql", "db-index"]
related: ["seq-scan-vs-index-scan", "index-selectivity", "cardinality", "slow-query-log"]
---

A **query plan** (execution plan) is the database's chosen strategy for running a query: which tables it scans, in what order it joins them, which indexes it uses, and how it sorts or aggregates. The SQL says *what* you want; the plan says *how* the database will get it. Reading it is the core skill of query tuning.

You see it with `EXPLAIN` (and `EXPLAIN ANALYZE` to also run and time it):

```text
EXPLAIN ANALYZE SELECT ... ;
→ Seq Scan on orders  (cost=0..1234 rows=5000 width=64) (actual time=...)
  Filter: (status = 'open')
```

A plan shows operations as a tree (scans at the leaves, joins and sorts above), each with estimated **cost** and row counts. Comparing estimated vs actual rows is how you spot bad estimates.

The classic mistakes:

- Not looking at the plan at all. Guessing why a query is slow wastes time; the plan tells you. Start here.
- Misreading estimates as truth. Costs and row counts are *estimates* based on [statistics](/t/table-statistics). Stale stats produce bad plans — hence periodic `ANALYZE`.
- Ignoring actual vs estimated rows. A large gap (planner thought 10 rows, actually 1,000,000) points at stale stats or a correlated condition, and usually a poor join choice.
- Forcing an index by eye. The planner may correctly choose a sequential scan over an index for a low-selectivity condition. "It's not using my index" isn't automatically wrong — see [sequential vs index scan](/t/seq-scan-vs-index-scan).
- Only tuning the query. Sometimes the fix is an index, a rewritten join, better statistics, or a schema change. The plan guides which.
- Testing on a tiny dataset. Plans differ by data size; a plan that's fine on 100 rows may be awful on 10 million. Test with realistic volumes.

**How to use it:** run `EXPLAIN ANALYZE`, read the tree from the leaves up, find the most expensive node, and check the row estimates. Then act: add or fix an index ([selectivity](/t/index-selectivity) matters), rewrite the query, or update [statistics](/t/table-statistics). The [slow query log](/t/slow-query-log) tells you *which* queries to profile; the plan tells you why they're slow.
