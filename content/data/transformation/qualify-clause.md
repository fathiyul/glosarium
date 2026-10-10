---
title: "QUALIFY"
summary: "Filtering on window function results without a subquery."
levels: { data-engineer: mid-level , data-analyst: mid-level }
aliases: ["QUALIFY clause", "filter window function", "QUALIFY ROW_NUMBER"]
prereqs: ["window-function", "select-query"]
related: ["window-function", "dedup-with-row-number", "cte", "subquery", "group-by"]
---

`QUALIFY` filters rows on the result of a window function in the same query. It's to window functions what `HAVING` is to `GROUP BY`, and it removes the subquery you'd otherwise need to name the window result before filtering it.

**The classic mistake is wrapping every window filter in a subquery or CTE.** A window function can't appear in `WHERE`, because windows are computed after `WHERE` runs. So the usual pattern ranks rows in an inner query, then filters `rn = 1` outside. `QUALIFY` lets you write that in one step.

```sql
SELECT *
FROM products
QUALIFY ROW_NUMBER() OVER (PARTITION BY category ORDER BY sales DESC) <= 3;
```

The same query without `QUALIFY`:

```sql
SELECT *
FROM (
  SELECT *, ROW_NUMBER() OVER (PARTITION BY category ORDER BY sales DESC) AS rn
  FROM products
) t
WHERE rn <= 3;
```

Both return the three best sellers per category; `QUALIFY` just skips the wrapper. This is the same pattern used in [deduplicating with `ROW_NUMBER`](/t/dedup-with-row-number).

## What to know

- It's evaluated after window functions, so it can't filter rows before the window is computed. To reduce the input first, use `WHERE` in the same query.
- The plan is the same as the subquery version. `QUALIFY` is readability, not speed — don't expect it to fix a slow query.
- Support varies. Several analytics databases (Snowflake, BigQuery, DuckDB and others) implement `QUALIFY`; PostgreSQL and MySQL do not, so there you keep the subquery or [CTE](/t/cte). Check your engine's docs before porting SQL between systems.
- Aliases defined in the `SELECT` list may or may not be referenceable inside `QUALIFY`, depending on the database.

Use it for ranking, "latest row per key", and any per-group top-N where you'd otherwise write a nested query. See [window functions](/t/window-function) and [subqueries](/t/subquery).
