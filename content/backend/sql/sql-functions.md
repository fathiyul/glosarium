---
title: "SQL String, Date and Math Functions"
summary: "Built-in functions for transforming values in queries."
levels: { backend: junior, data-engineer: junior , data-analyst: junior , data-scientist: mid-level }
prereqs: ["sql-data-types"]
related: ["coalesce-nullif", "sql-data-types", "null", "self-join"]
---

SQL comes with built-in functions that transform values inside a query. They fall into a few groups:

- **String:** `UPPER`, `LOWER`, `TRIM`, `SUBSTRING`, `CONCAT`.
- **Date and time:** `CURRENT_DATE`, `EXTRACT`, date arithmetic.
- **Math:** `ROUND`, `ABS`, `FLOOR`, `CEILING`.

```sql
SELECT
  UPPER(name)                    AS name_upper,
  ROUND(price, 2)                AS price_rounded,
  EXTRACT(YEAR FROM released_on) AS release_year
FROM products;
```

`EXTRACT(YEAR FROM ...)` and `CURRENT_DATE` are standard SQL. Other functions differ by database. For example, string concatenation with `||` is standard, but MySQL treats `||` as logical OR unless a special mode is enabled, so there you use `CONCAT`. Check your database's documentation before you copy a function name from another project.

The classic mistake is wrapping a column in a function inside a `WHERE` clause, such as `WHERE UPPER(email) = 'ADA@EXAMPLE.COM'`. The database then may not be able to use an index on `email`, which can make the query slower on large tables. If you often search that way, store the normalized value or index the expression, if your database supports it. Also, functions that receive `NULL` usually return `NULL`, so pair them with [COALESCE](/t/coalesce-nullif) when you need a fallback.
