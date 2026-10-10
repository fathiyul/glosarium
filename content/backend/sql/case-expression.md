---
title: "CASE Expression"
summary: "Conditional logic inside a SQL query."
levels: { backend: junior, data-engineer: junior , data-analyst: junior }
aliases: ["CASE WHEN", "SQL CASE", "conditional expression", "CASE statement", "searched case"]
prereqs: ["select-query"]
related: ["coalesce-nullif", "group-by", "pivot", "null-in-sql", "sql-functions"]
core: [data-engineer]
---

`CASE` is SQL's **if / else**: it returns different values depending on conditions, inside a query.

```sql
SELECT order_id,
       total_cents,
       CASE
         WHEN total_cents >= 100000 THEN 'large'
         WHEN total_cents >= 10000  THEN 'medium'
         ELSE 'small'
       END AS size_bucket
FROM orders;
```

Conditions are checked **in order**, and the first one that's true wins. If none match and there's no `ELSE`, the result is
`NULL`. So write an `ELSE`.

A shorter form compares one expression to values:

```sql
CASE status WHEN 'P' THEN 'paid' WHEN 'R' THEN 'refunded' ELSE 'other' END
```

## Where it's used

**Bucketing and labeling**, as above, and **cleaning**: mapping messy codes to consistent values.

**Conditional aggregation**: count or sum only the rows that meet a condition, in one pass:

```sql
SELECT customer_id,
       COUNT(*)                                          AS orders,
       SUM(CASE WHEN status = 'refunded' THEN 1 ELSE 0 END) AS refunded_orders,
       SUM(CASE WHEN status = 'paid' THEN total_cents END)  AS paid_revenue
FROM orders
GROUP BY customer_id;
```

(`SUM` ignores `NULL`, so the missing `ELSE` in the last line is fine.) This is also how you build
[pivot](/t/pivot)-style reports, with one column per category.

**Custom sorting**: `ORDER BY CASE priority WHEN 'high' THEN 1 WHEN 'medium' THEN 2 ELSE 3 END`.

**Avoiding errors**: `CASE WHEN divisor = 0 THEN NULL ELSE total / divisor END` prevents division by zero.

## Things to watch

- **All branches should return compatible types.** Mixing numbers and text is an error or causes
  surprising conversions.
- `NULL` never equals anything: `WHEN col = NULL` never matches. Use `WHEN col IS NULL`
  ([NULL in SQL](/t/null-in-sql)).
- For a simple "use a default when null", [`COALESCE`](/t/coalesce-nullif) is shorter.
- `CASE` is an expression, so it can appear in `SELECT`, `WHERE`, `ORDER BY` and `GROUP BY`.
