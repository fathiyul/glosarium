---
title: "Fact Table"
summary: "A table of measurable events, like orders or page views, at a fixed grain."
levels: { data-engineer: junior }
aliases: ["fact tables", "fact", "fact_orders", "measures table"]
prereqs: ["dimensional-modeling"]
related: ["dimension-table", "grain", "fact-table-types", "degenerate-dimension", "factless-fact-table", "date-dimension"]
core: [data-engineer]
---

A **fact table** records **things that happened**, measured: orders, page views, payments, shipments, support tickets. Each row
is one event or measurement, with numeric **measures** and keys that point to [dimension tables](/t/dimension-table).

```
fact_order_items
order_id | date_key | customer_key | product_key | quantity | unit_price | line_total
```

Two kinds of columns:

- **Foreign keys** to dimensions: who, what, when, where.
- **Measures**: the numbers you add up and average: `quantity`, `line_total`, `duration_seconds`.

Often a transaction identifier like `order_id` sits there too ([degenerate dimension](/t/degenerate-dimension)).

## The most important decision: the grain

The **[grain](/t/grain)** states exactly what one row represents: "one row per **order line item**", "one row per **page view**", "one row
per **customer per day**". Decide and write it down **before** choosing columns. Mixing grains in one table (some rows per order, others per
line item) produces wrong totals that are hard to detect.

Finer grain is more flexible: you can always roll up lines into orders, but you can't split an order into lines you never stored.

## Types of measures

| Type | Meaning | Example |
|---|---|---|
| **Additive** | Can be summed across all dimensions | Sales amount, quantity |
| **Semi-additive** | Summed across some dimensions, but not time | Account balance, inventory level (use the latest or the average over time) |
| **Non-additive** | Can't be summed | Ratios, percentages, unit prices (compute them from additive parts instead) |

Store the additive pieces (revenue and quantity), not the ratio (average price). You can compute the ratio but you can't re-sum it.

## Kinds of fact tables

Transaction (one row per event), periodic snapshot (a row per period, such as daily balances), accumulating snapshot (one row per
process, updated as it moves through stages), and tables with no measures that just record that something occurred
([types of fact tables](/t/fact-table-types), [factless fact tables](/t/factless-fact-table)).

## Practical points

- Fact tables are **large and narrow**, mostly numbers and keys, while dimensions are small and wide.
- **Don't store descriptive text** in them; keep that in dimensions.
- **Handle missing keys** with a special "unknown" dimension row instead of NULL, so inner joins don't drop rows.
- Partition them by date ([Hive partitioning](/t/hive-partitioning)) and load them idempotently.
