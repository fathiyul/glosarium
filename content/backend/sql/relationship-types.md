---
title: "One-to-Many and Many-to-Many"
summary: "The basic kinds of relationship and how to model them."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["one-to-many", "many-to-many", "one-to-one"]
prereqs: ["schema"]
related: ["junction-table", "schema", "constraint", "relational-database"]
---

Relationships describe how rows in one table connect to rows in another. There are three basic kinds:

- **One-to-one:** each row in A matches at most one row in B. Often used to split out rarely needed columns.
- **One-to-many:** one row in A matches many rows in B. A customer has many orders, and each order belongs to one customer.
- **Many-to-many:** rows on both sides can match many rows on the other. Students and courses are the classic example.

Modelling them with keys:

```sql
-- One-to-many: the "many" side holds the foreign key
CREATE TABLE orders (
  id           INTEGER PRIMARY KEY,
  customer_id  INTEGER NOT NULL REFERENCES customers(id)
);

-- Many-to-many: use a junction table, as in the next concept
```

The classic mistake is modelling a one-to-many relationship with a list column, or a many-to-many one with a foreign key on one side. Both break as soon as the data changes shape. Work out which side can hold many matches, put the foreign key on that side, and use a [junction table](/t/junction-table) when both sides can have many.
