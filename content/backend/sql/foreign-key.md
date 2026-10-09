---
title: "Foreign Key"
summary: "A column referencing another table's primary key."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["FK", "foreign keys", "referential integrity", "REFERENCES"]
prereqs: ["primary-key", "table-row-column"]
related: ["primary-key", "join", "constraint", "junction-table", "relationship-types", "normalization"]
core: [backend, data-engineer]
---

A **foreign key** is a column whose values must match a **primary key** in another table. It's how tables point at each other,
and the database enforces that the pointer is valid.

```sql
CREATE TABLE customers (
    id   BIGINT PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE orders (
    id          BIGINT PRIMARY KEY,
    customer_id BIGINT NOT NULL REFERENCES customers (id),
    total_cents INTEGER NOT NULL
);
```

Now `orders.customer_id` must be an existing `customers.id`. Inserting an order for customer 999 that doesn't exist
**fails**. This is **referential integrity**: no orphan rows pointing at nothing.

You then combine the tables with a [join](/t/join):

```sql
SELECT o.id, c.name FROM orders o JOIN customers c ON c.id = o.customer_id;
```

## What happens on delete or update

You choose the behavior when the referenced row is removed:

| Option | Effect |
|---|---|
| `RESTRICT` / `NO ACTION` (default in many databases) | Refuse to delete the customer while orders reference them |
| `CASCADE` | Delete the orders too |
| `SET NULL` | Set `customer_id` to NULL (the column must allow it) |

```sql
customer_id BIGINT REFERENCES customers (id) ON DELETE CASCADE
```

Choose deliberately. `CASCADE` is convenient, and can delete far more than you expected.

## Practical points

- **Index the foreign key column.** Some databases (such as PostgreSQL) don't create that index automatically, and
  joins and deletes on the parent get slow without it.
- **Keep the constraints in the database**, not only in application code. The application has bugs; other
  programs and manual fixes also write to your tables.
- A NULL foreign key means "no relationship", which is allowed if the column is nullable.
- **Many-to-many relationships** use a [junction table](/t/junction-table) with two foreign keys
  ([relationship types](/t/relationship-types)).
- Large analytical systems sometimes drop foreign-key enforcement for loading speed, and rely on data quality checks
  instead. That's a deliberate trade-off, not the default.
