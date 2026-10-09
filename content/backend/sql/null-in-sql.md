---
title: "NULL in SQL"
summary: "Three-valued logic, and why NULL = NULL isn't true."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["NULL", "IS NULL", "three-valued logic", "NULL handling", "NULL comparison"]
prereqs: ["select-query"]
related: ["coalesce-nullif", "case-expression", "group-by", "join-types", "constraint"]
core: [data-engineer]
---

In SQL, **`NULL` means "unknown or missing"**, not zero and not an empty string. Because it's unknown, comparing anything to it gives
neither true nor false, but **unknown**. That's called three-valued logic, and it causes many surprises.

```sql
SELECT NULL = NULL;      -- NULL (unknown), not true
SELECT NULL = 5;         -- NULL
SELECT NULL <> 5;        -- NULL
SELECT 1 + NULL;         -- NULL
```

`WHERE` keeps only rows where the condition is **true**. Unknown is dropped.

## Testing for NULL

```sql
WHERE phone IS NULL
WHERE phone IS NOT NULL
-- WHERE phone = NULL       never matches anything
```

## Traps

**Rows with NULL vanish from comparisons.**

```sql
SELECT * FROM users WHERE status <> 'banned';
-- users whose status is NULL are NOT returned: NULL <> 'banned' is unknown
-- fix: WHERE status <> 'banned' OR status IS NULL
```

**`NOT IN` with a NULL in the list returns nothing.**

```sql
SELECT * FROM a WHERE id NOT IN (SELECT a_id FROM b);   -- if any b.a_id is NULL: zero rows!
-- safer: WHERE NOT EXISTS (SELECT 1 FROM b WHERE b.a_id = a.id)
```

**Aggregates skip NULLs.** `COUNT(col)`, `SUM`, `AVG`, `MIN` and `MAX` ignore NULL values. `COUNT(*)` counts rows.
`AVG` divides by the number of non-null values, not the number of rows ([GROUP BY](/t/group-by)).

**Joins**: a NULL never matches in `ON a.x = b.x`. Outer joins produce NULLs for the missing side
([join types](/t/join-types)).

**Uniqueness**: whether a unique constraint allows several NULLs depends on the database.

## Handling it

```sql
COALESCE(phone, 'unknown')             -- first non-null value
NULLIF(x, 0)                           -- NULL if x = 0 (avoids divide by zero)
CASE WHEN phone IS NULL THEN ... END   -- see CASE expressions
```

See [`COALESCE` and `NULLIF`](/t/coalesce-nullif).

Sort order of NULLs (first or last) differs between databases, so say `NULLS FIRST` or `NULLS LAST` where supported
if it matters. Mark columns **`NOT NULL`** when a value is always required. It removes a whole class of bugs
([constraints](/t/constraint)). The idea is related to [null in programming languages](/t/null), but the rules are
different.
