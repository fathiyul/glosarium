---
title: "Primary Key"
summary: "A column that uniquely identifies each row."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["PK", "primary keys", "row identifier", "table key"]
prereqs: ["table-row-column"]
related: ["foreign-key", "natural-vs-surrogate-key", "uuid-vs-autoincrement", "constraint", "sequence", "relational-model"]
core: [backend, data-engineer]
---

A **primary key** is the column (or columns) that **uniquely identifies each row** in a table. It can't be `NULL`, and no two rows can
share the same value.

```sql
CREATE TABLE customers (
    id    BIGINT PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    name  TEXT NOT NULL
);
```

Everything else refers to a row through it: other tables point to it with [foreign keys](/t/foreign-key), and your
application asks for `customer 42`.

The database enforces it. A second row with `id = 42` is rejected, and it automatically builds an index on it,
so lookups by primary key are fast.

## Choosing one

| Option | Notes |
|---|---|
| **Auto-increment integer** (`1, 2, 3...`) | Small, fast, easy to read. Reveals count and ordering, and is awkward to merge across systems ([sequences](/t/sequence)) |
| **UUID** | Globally unique, can be generated anywhere, harder to guess. Larger, and random UUIDs scatter inserts in the index ([UUID vs auto-increment](/t/uuid-vs-autoincrement)) |
| **Natural key** (an existing real-world value, like an email or a country code) | Meaningful, but real-world values change and can turn out not to be unique |
| **Composite key** (two or more columns) | Common in [junction tables](/t/junction-table): `PRIMARY KEY (user_id, role_id)` |

Many designs use a **surrogate key** (a made-up ID with no business meaning) for the primary key, and a separate unique constraint on
the natural value ([natural vs surrogate keys](/t/natural-vs-surrogate-key)).

## Rules of thumb

- **Every table should have one.** Without it, you can't reliably refer to, update or deduplicate a row.
- **Keep it immutable.** Changing a primary key means changing every foreign key that points at it.
- **Don't give it business meaning** that might change (phone numbers, names).
- **Pick a type with room to grow.** A 32-bit integer overflows at about 2.1 billion rows.
- Don't expose sequential IDs where guessing them is a risk. Authorization checks matter more than obscurity, but it
  helps.

Data loaded into analytics systems may not enforce primary keys, so check uniqueness explicitly with a query or
data test.
