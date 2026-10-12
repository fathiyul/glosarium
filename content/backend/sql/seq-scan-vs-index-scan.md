---
title: "Sequential Scan vs Index Scan"
summary: "Reading the whole table vs jumping in through an index."
levels: { backend: senior, data-engineer: senior , data-scientist: senior }
aliases: ["sequential scan", "index scan", "seq scan vs index scan"]
prereqs: ["db-index", "query-plan"]
related: ["index-selectivity", "cardinality", "query-plan"]
---

The database can find rows in a table in two fundamentally different ways:

- Sequential scan — read the whole table from start to finish, checking each row. Cost grows with table size, but reading is fast and sequential (good cache behaviour).
- Index scan — use an index to jump to the matching rows. Cost grows with the number of matches, plus a lookup per row — but it avoids touching rows you don't need.

```text
return 5% of a 10M-row table  → index scan wins (skip 95%)
return 90% of a 1k-row table  → seq scan wins (just read it all)
```

Which is faster depends on **selectivity**. A condition matching a small fraction of a big table favours an index; one matching most of the table (or a small table) favours a full scan. The planner picks based on [statistics](/t/table-statistics) and cost estimates.

The classic mistakes:

- Assuming an index is always better. An index scan has overhead per row; for a low-selectivity filter it's *slower* than a sequential scan. Seeing "Seq Scan" in a plan isn't automatically a problem (see [query plan](/t/query-plan)).
- Ignoring selectivity when indexing. An index on a column whose values are mostly identical (low [selectivity](/t/index-selectivity), e.g. `is_active` on a table that's 99% active) rarely helps; the planner will scan anyway.
- Forgetting the second lookup. An index scan typically reads the index *and* then fetches each row from the table — two steps per match. A [covering index](/t/covering-index) that includes the needed columns removes the second step.
- Letting statistics go stale. The planner needs accurate stats to estimate selectivity; stale [statistics](/t/table-statistics) mean bad choices, sometimes picking a scan when an index would win.
- Optimising the wrong query. Check the [slow query log](/t/slow-query-log) to find queries actually hurting; don't tune a fast one.

**How to reason about it:** selectivity decides the winner. Index the columns you filter and join on *selectively*; let the planner choose the strategy; and read the plan to confirm which it picked and why. When a plan surprises you, the answer is usually selectivity or statistics — the two inputs to the choice. See [indexing](/t/indexing).
