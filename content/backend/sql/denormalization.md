---
title: "Denormalization"
summary: "Deliberately duplicating data for read performance."
levels: { backend: senior, data-engineer: mid-level , data-analyst: mid-level , data-scientist: mid-level }
aliases: ["denormalize", "denormalized data", "duplicating data for performance", "redundant data"]
prereqs: ["normalization", "join"]
related: ["normalization", "materialized-view", "star-schema", "one-big-table", "data-modeling", "db-index"]
core: [data-engineer, data-scientist]
also: [analytics-modeling]
---

**Denormalization** is **deliberately storing the same information in more than one place** (or pre-combining data) to make reads faster or simpler. It's the opposite of [normalization](/t/normalization), which removes duplication. You trade write complexity and consistency risk for read speed.

```sql
-- Normalized: the customer name lives only in customers
SELECT o.id, c.name FROM orders o JOIN customers c ON c.id = o.customer_id;

-- Denormalized: the name is copied into each order row
SELECT id, customer_name FROM orders;                  -- no join needed
```

## Common forms

- **Copied columns**: `customer_name` or `product_title` in the orders table.
- **Precomputed aggregates**: `order_count` on a customer, `total_cents` on an order, a likes counter.
- **Summary or aggregate tables** and [materialized views](/t/materialized-view): daily revenue computed ahead of time.
- **Embedded or nested data** in document stores and JSON columns.
- **Wide, flat tables** for analytics ([star schemas](/t/star-schema) denormalize their dimensions, and a [one big table](/t/one-big-table) goes further).

## The cost: keeping copies in sync

If a customer renames, the old name remains in all their orders unless you update them. Inconsistencies, called **update anomalies**, creep in. You must decide how copies are maintained:

- In **application code** (update both places in one transaction).
- With **triggers** or database features.
- By **background jobs** that recompute periodically (accepting some staleness).
- By treating the copy as a **snapshot** on purpose: an order's `unit_price_cents` *should* keep the price at purchase time. That's not a duplicate to fix, but a recorded fact.

## When it's the right call

- **Read-heavy workloads** where joins or aggregations over big tables are too slow, and you've measured it.
- **Analytics and reporting**, where reading speed and simplicity matter more than update convenience.
- **Systems where reading from one place is a hard requirement** (very low latency lookups, document databases).

## Habits

- **Normalize first, then denormalize with evidence.** Use indexes, query tuning and caching before duplicating data ([indexes](/t/db-index), [query plans](/t/explain-query)).
- **Denormalize narrowly**, for the specific reads that need it.
- **Write down** which data is a copy, where the source of truth is, and how it's refreshed.
- **Make it rebuildable**: you should be able to regenerate the derived data from the source.
- Prefer built-in mechanisms such as materialized views where available.
- Accept that **stale copies** are possible, and decide whether that's OK for the use case.
