---
title: "Subquery"
summary: "A query nested inside another query."
levels: { backend: mid-level, frontend: mid-level, data-engineer: junior , data-analyst: junior , data-scientist: mid-level }
aliases: ["nested query", "subselect", "inner query", "sub-select"]
prereqs: ["select-query"]
related: ["cte", "correlated-subquery", "join", "null-in-sql", "lateral-join", "window-function"]
core: [data-engineer, data-analyst, data-scientist]
---

A **subquery** is a `SELECT` inside another query. The inner query produces a value, a list of values or a whole table
that the outer query uses.

## Where they appear

**In `WHERE`**, to filter by the result of another query:

```sql
SELECT name FROM customers
WHERE id IN (SELECT customer_id FROM orders WHERE total_cents > 100000);

SELECT name FROM customers c
WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id);   -- has at least one order
```

**In `FROM`**, as a temporary table (a "derived table", which needs an alias):

```sql
SELECT region, AVG(spent)
FROM (SELECT region, customer_id, SUM(total_cents) AS spent
      FROM orders GROUP BY region, customer_id) AS per_customer
GROUP BY region;
```

**In `SELECT`**, as a single value (a *scalar* subquery):

```sql
SELECT name, (SELECT MAX(total_cents) FROM orders o WHERE o.customer_id = c.id) AS biggest_order
FROM customers c;
```

A scalar subquery must return **one row and one column**, or you get an error (or arbitrary results in lenient databases).

## Correlated vs uncorrelated

An **uncorrelated** subquery doesn't reference the outer query and runs independently. A
[**correlated** subquery](/t/correlated-subquery) refers to the outer row (like the `EXISTS` example), so it's
conceptually evaluated per row. Optimizers can often rewrite it into a join, but not always.

## Trap: `NOT IN` and NULL

If the subquery returns even one `NULL`, `x NOT IN (subquery)` is never true, so you get no rows. Prefer `NOT EXISTS`
([NULL in SQL](/t/null-in-sql)).

## Subquery, join or CTE?

- Many subqueries can be written as a [join](/t/join), which is often clearer when you need columns from both tables.
- When a query nests several levels deep, a [CTE](/t/cte) names the steps and reads top to bottom.
- Use `EXISTS` / `NOT EXISTS` for "has or doesn't have a matching row".

Performance varies by database and query. Check the plan ([query plan](/t/query-plan)) instead of assuming one form is faster.
