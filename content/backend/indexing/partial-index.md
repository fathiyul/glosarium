---
title: "Partial Index"
summary: "An index over only the rows matching a condition."
levels: { backend: senior, data-engineer: senior }
aliases: ["partial index", "filtered index", "partial indexes"]
prereqs: ["db-index", "index-selectivity"]
related: ["unique-index", "query-plan", "index-selectivity"]
---

A **partial index** (filtered index) indexes only the rows matching a condition, e.g. only unprocessed jobs or only non-deleted records. Because it covers a **subset** of the table, it's smaller, cheaper to maintain, and often faster than a full index — while serving exactly the queries that filter on that condition.

```sql
-- queries almost always filter WHERE status = 'pending'
CREATE INDEX ON jobs (created_at) WHERE status = 'pending';
```

The payoff: if 99% of jobs are `done` and only pending ones are ever queried, indexing only pending rows keeps the index tiny and the writes cheap. The database uses it when the query's `WHERE` implies the index's condition.

Partial unique indexes are a common special case: `UNIQUE (email) WHERE deleted_at IS NULL` lets a soft-deleted user's email be reused (see [soft delete](/t/soft-delete) and [unique index](/t/unique-index)).

The classic mistakes:

- The planner won't use it if the condition doesn't match. A partial index helps only when the query's predicate *implies* the index's filter. A query without `WHERE status = 'pending'` can't use the partial index above.
- Getting the predicate wrong. The condition must be expressible and stable (e.g. `IS NOT NULL`, an enum value). Overly clever conditions may not be recognised.
- Assuming it's just a smaller full index. It is, for matching queries — but a query that needs all rows falls back to a scan or a different index. Design it alongside the actual query patterns.
- Forgetting to update it when the data distribution shifts. If pending jobs become the majority, the "partial" index isn't small anymore; revisit.
- Using it where a full index is fine. If the table is small or the filter isn't commonly applied, the complexity isn't worth it.
- Confusing it with a covering index. Partial reduces *which rows* are indexed; [covering](/t/covering-index) reduces *whether the table is fetched*. They combine well.

**When to use it:** when queries consistently filter to a subset and that subset is much smaller than the table — statuses, soft-delete flags, `IS NOT NULL`, a specific tenant in a shared table. It's one of the best value-for-effort index optimisations, because it shrinks both size and write cost. Verify with the [query plan](/t/query-plan) that it's used.
