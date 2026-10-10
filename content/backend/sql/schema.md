---
title: "Database Schema"
summary: "The structure of tables, columns and relationships."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-analyst: junior }
aliases: ["database schema", "DB schema"]
prereqs: ["relational-database"]
related: ["constraint", "relationship-types", "relational-database", "schema-migration"]
---

A schema is the structure of a database: which tables exist, which columns each table has, what type each column holds, and how tables relate to each other. It's the blueprint, and the data is what fills it in.

```sql
CREATE TABLE customers (
  id    INTEGER PRIMARY KEY,
  name  TEXT NOT NULL
);

CREATE TABLE orders (
  id           INTEGER PRIMARY KEY,
  customer_id  INTEGER NOT NULL REFERENCES customers(id),
  placed_at    TIMESTAMP NOT NULL
);
```

Here `orders` refers to `customers` through `customer_id`, which is a [foreign key](/t/constraint). The schema also records rules such as `NOT NULL` and `UNIQUE`, so they apply to every row.

A good schema is easy to query and hard to write incorrectly. Choose a type for each column that matches the data, and name columns for what they hold.

The classic mistake is changing the schema by hand in production, with no record of what changed. Make each change a [migration](/t/schema-migration) that lives in version control, so every environment gets the same structure and you can see how it evolved.
