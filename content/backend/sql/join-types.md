---
title: "INNER, LEFT, RIGHT and FULL JOIN"
summary: "Which rows each kind of join keeps."
levels: { backend: junior, frontend: mid-level, data-engineer: junior }
aliases: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN", "outer join", "LEFT OUTER JOIN"]
prereqs: ["join"]
related: ["join", "cross-join", "self-join", "foreign-key", "null-in-sql"]
core: [data-engineer]
---

The join type decides **which rows survive** when the two tables don't match perfectly.

Take two small tables:

```
customers            orders
id | name            id | customer_id | total
1  | Ana             10 | 1           | 50
2  | Bo              11 | 1           | 20
3  | Cy              12 | 9           | 70     <- customer 9 doesn't exist
```

| Join | Keeps | Result |
|---|---|---|
| `INNER JOIN` | Only rows with a match in **both** | Ana (2 rows) |
| `LEFT JOIN` | **All left rows**, plus matches (NULLs where none) | Ana (2 rows), Bo (NULL), Cy (NULL) |
| `RIGHT JOIN` | **All right rows**, plus matches | Ana (2 rows), and order 12 with NULL name |
| `FULL JOIN` | **Everything** from both sides | All of the above |

```sql
SELECT c.name, o.total
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id;
```

`INNER` is the default for a bare `JOIN`. `LEFT JOIN` is the one you'll use most: "all customers, with their
orders if they have any."

## Finding what's missing

A left join plus a `NULL` check finds rows with **no match**:

```sql
SELECT c.name
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id
WHERE o.id IS NULL;           -- customers who never ordered
```

## The classic mistake

Filtering the right-hand table in `WHERE` turns a left join into an inner join:

```sql
-- Loses customers with no paid orders (their o.status is NULL, so the condition fails)
SELECT c.name, o.total
FROM customers c LEFT JOIN orders o ON o.customer_id = c.id
WHERE o.status = 'paid';

-- Keeps them: put the condition in the ON clause
SELECT c.name, o.total
FROM customers c LEFT JOIN orders o ON o.customer_id = c.id AND o.status = 'paid';
```

Other notes: a `RIGHT JOIN` is just a `LEFT JOIN` with the tables swapped, and most people write only left joins. `FULL JOIN`
is useful for comparing two datasets (what's in A but not B, and vice versa) and isn't supported by every database.
A [cross join](/t/cross-join) has no matching condition and pairs every row with every row.
