---
title: "Common Table Expression (WITH)"
summary: "Named subqueries that make complex SQL readable."
levels: { backend: mid-level, data-engineer: junior , data-analyst: junior }
aliases: ["CTE", "WITH clause", "common table expressions", "WITH query"]
prereqs: ["select-query", "subquery"]
related: ["subquery", "recursive-cte", "view", "window-function", "join"]
core: [data-engineer, data-analyst]
also: [transformation]
---

A **common table expression** (CTE) is a named, temporary result you define with `WITH`, then use like a table in the
rest of the query. It's mostly a way to make complex SQL **readable**: build the answer in named steps instead of one huge
nested statement.

```sql
WITH paid_orders AS (
    SELECT customer_id, total_cents
    FROM orders
    WHERE status = 'paid'
),
customer_totals AS (
    SELECT customer_id, SUM(total_cents) AS spent
    FROM paid_orders
    GROUP BY customer_id
)
SELECT c.name, t.spent
FROM customer_totals t
JOIN customers c ON c.id = t.customer_id
WHERE t.spent > 100000
ORDER BY t.spent DESC;
```

Read it top to bottom: first the paid orders, then totals per customer, then the final report. The same thing with
nested [subqueries](/t/subquery) would be inside-out and harder to follow.

## Why use them

- **Readability**: each step has a name and a single job.
- **Reuse**: reference the same CTE more than once in the query.
- **Debuggability**: run each step on its own, `SELECT * FROM paid_orders`, to check intermediate results.
- **Recursion**: `WITH RECURSIVE` can walk hierarchies such as org charts ([recursive CTEs](/t/recursive-cte)).

## Things to know

- **A CTE exists only for that one statement.** It isn't stored. For a reusable definition, make a
  [view](/t/view).
- **It's not automatically faster.** How a CTE is executed varies by database and version: some inline it like a
  subquery, others compute it separately (and may or may not reuse it). Check the plan ([query plan](/t/query-plan)) when
  performance matters.
- Chain several with commas, as above, and only the first gets the `WITH` keyword.
- Name them for what they contain (`paid_orders`), not `temp1`.

For data pipelines and analytics, CTE-structured queries are the norm. They keep large transformations maintainable
and reviewable.
