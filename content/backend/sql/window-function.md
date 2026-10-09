---
title: "Window Functions"
summary: "Calculations across related rows, like running totals and rankings."
levels: { backend: mid-level, data-engineer: junior }
aliases: ["window functions", "OVER clause", "analytic functions", "ROW_NUMBER", "RANK", "PARTITION BY"]
prereqs: ["group-by", "select-query"]
related: ["group-by", "cte", "subquery", "case-expression", "upsert"]
core: [data-engineer]
also: [transformation]
---

A **window function** calculates something across a set of related rows **without collapsing them**. `GROUP BY` squashes
each group into one row; a window function keeps every row and adds a computed column next to it.

```sql
SELECT order_id, customer_id, total_cents,
       SUM(total_cents) OVER (PARTITION BY customer_id) AS customer_total,
       ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY created_at) AS nth_order
FROM orders;
```

The `OVER (...)` clause defines the "window":

- **`PARTITION BY`**: split rows into groups (like `GROUP BY`, but rows stay).
- **`ORDER BY`**: the order within each partition.
- An optional **frame** (`ROWS BETWEEN ...`) limits which neighboring rows are included.

## Common uses

**Ranking and "top N per group":**

```sql
SELECT * FROM (
  SELECT *, ROW_NUMBER() OVER (PARTITION BY category ORDER BY sales DESC) AS rn
  FROM products
) ranked
WHERE rn <= 3;                        -- the 3 best sellers in each category
```

| Function | Behavior with ties |
|---|---|
| `ROW_NUMBER()` | Unique numbers: 1, 2, 3, 4 |
| `RANK()` | Ties share a rank, then skip: 1, 2, 2, 4 |
| `DENSE_RANK()` | Ties share a rank, no gaps: 1, 2, 2, 3 |

**Running totals:** `SUM(amount) OVER (ORDER BY day)`.

**Compare with the previous or next row:** `LAG(amount) OVER (ORDER BY day)` gives yesterday's value, and
`LEAD` gives tomorrow's. For example, day-over-day change is `amount - LAG(amount) OVER (ORDER BY day)`.

**Deduplication:** keep the newest row per key:

```sql
SELECT * FROM (
  SELECT *, ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY updated_at DESC) AS rn
  FROM customers_raw
) t WHERE rn = 1;
```

## Things to know

- **You can't filter on a window function in the same query's `WHERE`**, because windows are computed after `WHERE`. Wrap it in a
  subquery or [CTE](/t/cte) and filter outside, as above.
- With an `ORDER BY` in the window and no explicit frame, aggregates become **cumulative** (a running total), and rows with
  equal ordering values are included together. Specify the frame if that matters.
- Window functions run after grouping, so you can use them on aggregated results.
- Supported by all major modern databases, with a few syntax differences.
