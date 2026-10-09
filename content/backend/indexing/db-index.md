---
title: "Database Index"
summary: "A lookup structure that speeds up queries at the cost of slower writes."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["index", "database indexes", "B-tree index", "indexing", "DB index"]
prereqs: ["primary-key", "select-query"]
related: ["composite-index", "covering-index", "index-selectivity", "explain-query", "query-plan", "seq-scan-vs-index-scan"]
core: [backend]
---

A **database index** is an extra structure that lets the database find rows without reading the whole table, like the index
at the back of a book. Most indexes are **B-trees**, which keep the values sorted so the database can jump straight to a
match.

```sql
CREATE INDEX idx_orders_customer_id ON orders (customer_id);

SELECT * FROM orders WHERE customer_id = 42;   -- now uses the index instead of scanning every row
```

On a table of 50 million rows, that's the difference between milliseconds and seconds. Primary keys and unique
constraints get an index automatically.

## The trade-off

Indexes aren't free:

- **Writes get slower.** Every `INSERT`, `UPDATE` and `DELETE` must also update each index.
- **They take disk space and memory.**

So index the columns you actually search by, not everything.

## What to index

Columns used in:

- `WHERE` filters,
- `JOIN` conditions (including [foreign keys](/t/foreign-key)),
- `ORDER BY` and `GROUP BY` on large results.

A [composite index](/t/composite-index) on several columns (`(customer_id, created_at)`) works for queries that use its leading
columns, in that order. Columns with few distinct values (like a true/false flag) are poor candidates on their own
([selectivity](/t/index-selectivity)).

## Reasons an index isn't used

```sql
WHERE LOWER(email) = 'a@x.com'     -- function on the column: a plain index on email can't help
WHERE name LIKE '%son'             -- leading wildcard
WHERE customer_id = '42'           -- type mismatch (in some databases)
WHERE total_cents + 1 > 100        -- computation on the column
```

Also, if a query returns a large share of the table, scanning it can be cheaper than using an index, and the planner
knows that.

## Check, don't guess

```sql
EXPLAIN SELECT * FROM orders WHERE customer_id = 42;
```

shows whether the plan uses an index ([EXPLAIN](/t/explain-query), [query plans](/t/query-plan)). When a query is
slow, look at the plan first, then add an index, then verify it helped. Unused indexes should be removed.
