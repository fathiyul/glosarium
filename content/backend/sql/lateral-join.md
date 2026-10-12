---
title: "LATERAL Join"
summary: "A join where the right side can reference columns from the left."
levels: { backend: senior, data-engineer: senior , data-scientist: senior }
aliases: ["lateral join", "lateral subquery", "cross apply"]
prereqs: ["join", "subquery"]
related: ["correlated-subquery", "query-plan"]
---

A **LATERAL join** lets a subquery in the `FROM` clause reference columns from the tables to its left — something an ordinary join's subquery can't do. It's SQL's way to say "for each row on the left, run this subquery." (SQL Server calls the same idea `CROSS APPLY` / `OUTER APPLY`.)

```sql
SELECT o.id, recent.*
FROM orders o
JOIN LATERAL (
  SELECT * FROM order_events e
  WHERE e.order_id = o.id
  ORDER BY e.created_at DESC
  LIMIT 3
) recent ON true;
```

That query returns the three most recent events **per order** — a "top-N per group" problem that's awkward with plain joins and window functions, and natural with `LATERAL`.

The classic mistakes:

- Confusing it with a correlated subquery. They're related: both reference the outer row. A correlated subquery appears in `WHERE`/`SELECT` (often for `EXISTS`); a `LATERAL` subquery appears in `FROM` and can return multiple columns and rows as a joined relation (see [correlated subquery](/t/correlated-subquery)).
- Expecting it to be free. `LATERAL` runs the subquery per left row, so it's N+1 at the database level. It's fine when each subquery seeks an index; catastrophic if it scans. Index the correlated column.
- Using it when a window function is better. "Top-N per group" is often expressible with `ROW_NUMBER() OVER (PARTITION BY ...)`, which may plan better on some databases. Compare [query plans](/t/query-plan).
- Forgetting `ON true`. In many databases a `LATERAL` join still needs a join condition; `ON true` is the idiomatic "always" for a cross-style lateral.
- Assuming it's portable. `LATERAL` exists in PostgreSQL and some others, with different syntax elsewhere (`APPLY`). Check your database.

**When to use it:** for per-row subqueries that return a set or multiple columns — top-N per group, expanding a related collection, applying a function per row. It's a powerful, sometimes clearer alternative to window functions and correlated subqueries, at the cost of per-row execution — so verify the plan and index the correlation key.
