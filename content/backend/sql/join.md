---
title: "JOIN"
summary: "Combining rows from several tables."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-analyst: junior }
aliases: ["SQL JOIN", "joining tables", "INNER JOIN", "join clause"]
prereqs: ["foreign-key", "select-query"]
related: ["join-types", "foreign-key", "group-by", "self-join", "cross-join", "junction-table"]
core: [backend, data-engineer]
---

A **join** combines rows from two tables into one result by matching a column in each. It's how relational databases bring
back together the data that [normalization](/t/normalization) deliberately split apart.

```sql
SELECT o.id, o.total_cents, c.name
FROM orders AS o
JOIN customers AS c ON c.id = o.customer_id;
```

For each order, the database finds the customer whose `id` equals the order's `customer_id`, and puts the columns side by side.

```
orders: (917, customer_id=1, 5000)   customers: (1, 'Ana')
                      ↓ matched on  c.id = o.customer_id
result: (917, 5000, 'Ana')
```

Pieces to know:

- **`ON`** states the matching condition. It's usually a [foreign key](/t/foreign-key) equal to a primary key.
- **Aliases** (`orders AS o`) keep the query short and disambiguate column names.
- You can chain several joins: orders → customers → countries.
- There are different [join types](/t/join-types) for rows with no match.

## Three bugs to know

**1. Forgetting the condition** gives a **cartesian product**: every row paired with every row. Two tables of 1,000 rows
produce a million rows, and a very slow query ([cross join](/t/cross-join)).

**2. Row multiplication.** A join can return more rows than you expect if the relationship is one-to-many. If a customer has 3 orders, the customer
appears 3 times. Summing a customer-level number after such a join **counts it three times**.

```sql
-- If customers has a 'credit' column, this over-counts it for customers with many orders:
SELECT SUM(c.credit) FROM customers c JOIN orders o ON o.customer_id = c.id;
```

**3. Ambiguous or wrong columns.** Two tables both have `id` and `name`; qualify them (`c.name`) or select them explicitly.

## Performance

Joins are fast when the joined columns are indexed. Index the foreign key side ([indexing](/t/db-index)), and check slow
queries with `EXPLAIN` ([query plan](/t/query-plan)).

If you find yourself writing the same join everywhere, a [view](/t/view) can package it.
