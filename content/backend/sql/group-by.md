---
title: "GROUP BY and Aggregates"
summary: "Summarizing rows with COUNT, SUM and AVG."
levels: { backend: junior, frontend: mid-level, data-engineer: junior }
aliases: ["GROUP BY", "aggregate functions", "COUNT SUM AVG", "aggregates", "aggregation"]
prereqs: ["select-query"]
related: ["having", "window-function", "case-expression", "join", "null-in-sql"]
core: [data-engineer]
---

`GROUP BY` collapses rows into **groups** and lets you compute one summary per group with **aggregate functions**:
`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`.

```sql
SELECT customer_id,
       COUNT(*)         AS orders,
       SUM(total_cents) AS revenue,
       AVG(total_cents) AS avg_order
FROM orders
GROUP BY customer_id;
```

| customer_id | orders | revenue | avg_order |
|---|---|---|---|
| 1 | 3 | 12000 | 4000 |
| 2 | 1 | 2500 | 2500 |

Each customer becomes **one row**. Without `GROUP BY`, aggregates summarize the entire table into a single row.

## The main rule

Every column in `SELECT` must either be in the `GROUP BY` or inside an aggregate. This is invalid:

```sql
SELECT customer_id, status, COUNT(*) FROM orders GROUP BY customer_id;   -- which status?
```

Standard SQL and most databases reject it, because a group of orders has many statuses, so "the status" is
undefined. Either add it to the `GROUP BY` (groups by both) or aggregate it (`MAX(status)`). Some databases'
lenient modes silently pick an arbitrary row. Don't depend on that.

## WHERE vs HAVING

`WHERE` filters rows **before** grouping. [`HAVING`](/t/having) filters groups **after** aggregation:

```sql
SELECT customer_id, SUM(total_cents) AS revenue
FROM orders
WHERE status = 'paid'            -- only paid orders count
GROUP BY customer_id
HAVING SUM(total_cents) > 10000; -- only customers above the threshold
```

## Details

- **`COUNT(*)`** counts rows; **`COUNT(column)`** counts rows where the column isn't `NULL`;
  `COUNT(DISTINCT column)` counts unique values. The other aggregates also **ignore NULLs**
  ([NULL in SQL](/t/null-in-sql)).
- Group by several columns: `GROUP BY year, region`.
- Conditional totals use [`CASE`](/t/case-expression) inside the aggregate.
- Joining before grouping can multiply rows (one-to-many) and inflate your sums. Check the counts.
- When you want per-row detail **and** a group figure, use [window functions](/t/window-function).
