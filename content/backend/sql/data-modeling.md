---
title: "Data Modeling"
summary: "Designing how your data is structured and related."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["database design", "schema design", "data model", "designing a data model", "entity modeling"]
prereqs: ["relational-database", "primary-key", "foreign-key"]
related: ["er-diagram", "normalization", "relationship-types", "denormalization", "junction-table", "natural-vs-surrogate-key"]
core: [backend]
also: [analytics-modeling]
---

**Data modeling** is deciding **what data you store and how it's structured and related**: the tables (or collections), their columns, keys and relationships. It's one of the most consequential design decisions, since everything is built on top of it and migrating a data model with
millions of rows is painful.

## A practical process

1. **Start from the business, not the database.** What are the *things* (entities) this system is about, and what do users do with them? Customers, orders, products, payments.
2. **List the entities and their attributes.** What do you need to know about each?
3. **Define the relationships**: one-to-one, one-to-many, many-to-many ([relationship types](/t/relationship-types)).
4. **Choose keys**: a [primary key](/t/primary-key) for each entity, [foreign keys](/t/foreign-key) for relationships, and unique constraints for natural identifiers ([natural vs surrogate keys](/t/natural-vs-surrogate-key)).
5. **Normalize**, to avoid duplicated facts ([normalization](/t/normalization)).
6. **Consider the access patterns.** How will the data be read most? Adjust for performance, deliberately ([denormalization](/t/denormalization), indexes).
7. **Draw it** ([ER diagram](/t/er-diagram)) and review it with others.

```
customers (id, name, email)
   │ 1
   │ has many
   ▼ N
orders (id, customer_id → customers.id, status, created_at)
   │ 1
   ▼ N
order_items (order_id → orders.id, product_id → products.id, quantity, unit_price_cents)
                                       ▲ N
                                       │ 1
                              products (id, name, price_cents)
```

Note `order_items.unit_price_cents`: the price at the time of purchase is copied, because the product's price changes later. Capturing facts as they were is a frequent modeling need.

## Common mistakes

- **Storing lists in one column** (`"1,5,9"`). Use a related table ([junction table](/t/junction-table)).
- **Too many nullable columns** for "sometimes applicable" data. Maybe it's a separate table.
- **Ignoring time**: do you need history? "What was the address when the order was placed?" ([record history](/t/record-history)).
- **Using free-form text for things with a fixed set of values** without constraints or lookup tables.
- **Using the wrong types**: money as floats, dates as strings, times without zones ([money precision](/t/money-precision)).
- **No constraints**: relying only on application code for uniqueness and integrity.
- **Over-generic designs** (everything in a key-value table), which are hard to query and enforce.
- **Designing for every future requirement**, or none. Model what you know, keep it clean, and be ready to evolve it with migrations ([schema migrations](/t/schema-migration)).

Good data models are boring and obvious in hindsight. Spend time on them early, since code is easier to change than data.
