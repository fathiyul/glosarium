---
title: "Normalization"
summary: "Organizing tables to reduce duplication: 1NF, 2NF, 3NF."
levels: { backend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["database normalization", "1NF 2NF 3NF", "normal forms", "third normal form", "normalize"]
prereqs: ["primary-key", "foreign-key"]
related: ["denormalization", "data-modeling", "relationship-types", "junction-table", "relational-model", "constraint"]
core: [backend]
also: [analytics-modeling]
---

**Normalization** is organizing tables so that **each fact is stored once**, which avoids duplication and the inconsistencies that duplication causes. It's done through a series of "normal forms".

Take a badly designed table:

```
orders
order_id | customer_name | customer_email | product1 | product2 | product3 | product_price
```

Problems: the customer's name and email repeat on every order (change an email, and you must find them all), products are stuffed into numbered columns (what about a fourth?), and the price depends on the product, not the order. This is how **update anomalies** happen: inconsistent copies,
or being unable to record a customer without an order.

## The first three normal forms

| Form | Rule | Fixes |
|---|---|---|
| **1NF** | Each column holds a single, **atomic** value. No repeating groups or lists in a column | `product1, product2, product3` and `"1,5,9"` become rows in a separate table |
| **2NF** | In 1NF, and every non-key column depends on the **whole** primary key, not just part of it | Matters with composite keys: a column that depends on only one part belongs elsewhere |
| **3NF** | In 2NF, and non-key columns depend **only on the key**, not on other non-key columns (no transitive dependencies) | `customer_name` depends on `customer_id`, not on `order_id`, so it moves to a customers table |

A memorable summary: *every non-key column depends on **the key**, **the whole key**, and **nothing but the key**.*

The normalized design:

```
customers (id, name, email)
products  (id, name, price_cents)
orders    (id, customer_id → customers, created_at)
order_items (order_id → orders, product_id → products, quantity)     -- composite key (order_id, product_id)
```

Each fact lives in one place. An email change is a single `UPDATE`.

## Benefits

- **No contradictory duplicates**, and **smaller storage**.
- **Simpler updates**, with integrity enforced by keys and constraints ([foreign keys](/t/foreign-key)).
- A clear model of the business ([data modeling](/t/data-modeling)).

## Costs and when to stop

- **More tables and more joins**, which can slow reads on large data.
- Beyond 3NF there are stricter forms (BCNF, 4NF, 5NF). In practice, **3NF is the usual target** for transactional databases.
- Analytical systems often **denormalize on purpose** ([denormalization](/t/denormalization), [star schema](/t/star-schema)).

Normalize by default, and deviate with a reason: measured performance needs, or recording a fact as it was at the time (a price at purchase) which isn't a duplicate at all.
