---
title: "Correlated Subquery"
summary: "A subquery that runs once per row of the outer query."
levels: { backend: mid-level, data-engineer: mid-level , data-analyst: senior , data-scientist: mid-level }
aliases: ["correlated subquery", "correlated subqueries", "outer reference"]
prereqs: ["subquery", "join"]
related: ["query-plan", "slow-query-log", "self-join"]
---

A **correlated subquery** is a subquery that refers to a column from the outer query, so it's evaluated *per outer row* rather than once. The reference to the outer value (the "correlation") links the two, and the database runs the inner query once for each candidate row.

```sql
SELECT name
FROM customers c
WHERE EXISTS (
  SELECT 1 FROM orders o
  WHERE o.customer_id = c.id AND o.total > 1000
);
```

Here the inner query depends on `c.id`, so conceptually it runs for every customer. `EXISTS` is the common shape: "customers who have at least one such order".

The classic mistakes:

- Assuming it runs once. The correlation means per-row evaluation, which can be slow if the inner query isn't indexed. Often the optimiser rewrites it into a join, but not always — check the [query plan](/t/query-plan).
- Reaching for a correlated subquery when a join is clearer. Many correlated subqueries are equivalent to a `JOIN` or `LEFT JOIN ... GROUP BY`, which the optimiser can often execute more efficiently. Prefer the join unless the correlated form is genuinely clearer.
- Correlating on an unindexed column. `WHERE o.customer_id = c.id` with no index on `orders.customer_id` forces a scan per customer — a hidden N+1 at the database level. Index the correlation key.
- Getting `EXISTS` vs `IN` wrong. `EXISTS` is usually the right tool when you only care whether a match exists and when the subquery can return many rows; `IN` builds a list and behaves differently with `NULL`s.
- Nesting deeply. Multiple correlated levels are hard to read and can be slow. Decompose with CTEs where it helps.

**When to use it:** when the logic is genuinely "for each row, check something about related rows", especially `EXISTS` existence checks, and when the correlated form is more readable than the join. Otherwise, a join or a window function is often simpler and faster — watch the [slow query log](/t/slow-query-log) to see which your database prefers.
