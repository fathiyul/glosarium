---
title: "SELECT, WHERE, ORDER BY"
summary: "Reading, filtering and sorting rows."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["SELECT", "SELECT statement", "WHERE", "ORDER BY", "LIMIT", "basic SQL query"]
prereqs: ["sql", "table-row-column"]
related: ["group-by", "join", "null-in-sql", "subquery", "crud", "sql-functions"]
core: [backend, data-engineer]
---

`SELECT` reads data. Almost everything you do with SQL starts here.

```sql
SELECT id, name, email           -- which columns
FROM customers                   -- from which table
WHERE country = 'ID'             -- which rows
ORDER BY name                    -- in what order
LIMIT 20;                        -- how many
```

## The clauses

| Clause | Job |
|---|---|
| `SELECT` | The columns (or expressions) to return |
| `FROM` | The table(s) |
| `WHERE` | Filter rows **before** grouping |
| `GROUP BY` / `HAVING` | Summarize, then filter the summaries ([GROUP BY](/t/group-by)) |
| `ORDER BY` | Sort (`ASC` default, `DESC`) |
| `LIMIT` / `OFFSET` (or `FETCH FIRST`, `TOP`) | Restrict the number of rows |

## Filtering with WHERE

```sql
WHERE total_cents >= 10000 AND status = 'paid'
WHERE country IN ('ID', 'SG', 'MY')
WHERE created_at BETWEEN '2024-01-01' AND '2024-01-31'
WHERE name LIKE 'A%'                  -- starts with A
WHERE deleted_at IS NULL              -- see NULL in SQL
WHERE (status = 'paid' OR status = 'shipped') AND total_cents > 0
```

Use parentheses when mixing `AND` and `OR`, because `AND` binds tighter, and mixing them without parentheses is
a classic bug.

## The order SQL is *evaluated* in

Not the order it's written: `FROM` → `WHERE` → `GROUP BY` → `HAVING` → `SELECT` → `ORDER BY` → `LIMIT`. That explains why you
can't use a column alias defined in `SELECT` inside `WHERE` (it doesn't exist yet), but you can in `ORDER BY`.

## Habits

- **Name your columns instead of `SELECT *`** in application code. It's clearer, faster and doesn't break when columns
  are added.
- **Without `ORDER BY`, row order isn't guaranteed**, even if it looks consistent today.
- **`LIMIT` while exploring** a big table, so you don't pull millions of rows.
- **Never build queries by pasting user input** into the string. Use [parameters](/t/parameterized-query)
  ([SQL injection](/t/sql-injection)).
- **Mind NULLs** ([NULL in SQL](/t/null-in-sql)) and time zones in date filters.

Text filters like `LIKE '%term%'` can't use a normal index and are slow on big tables.
