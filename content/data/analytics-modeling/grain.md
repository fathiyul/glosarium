---
title: "Grain"
summary: "What one row of a table represents; the first decision in any model."
levels: { data-engineer: junior , data-analyst: mid-level , data-scientist: junior }
aliases: ["grain of a fact table", "table grain", "declaring the grain", "granularity", "level of detail"]
prereqs: ["fact-table"]
related: ["fact-table", "dimensional-modeling", "dimension-table", "bus-matrix", "star-schema", "fact-table-types"]
core: [data-engineer, data-scientist]
---

The **grain** of a table is **exactly what one row represents**. "One row per order." "One row per order line item." "One row per
customer per day." It's the first decision in building any analytical table, and everything else follows from it.

Say it as a sentence, and write it down:

> Each row in `fact_page_views` is **one page view by one visitor in one session**.

## Why it matters so much

The grain tells you which columns belong in the table, which questions it can answer, and what you can safely sum.

```
fact_orders         grain: one row per order            → columns: order_id, customer_key, order_total
fact_order_items    grain: one row per order line item  → columns: order_id, product_key, quantity, line_total
```

If you put `order_total` into `fact_order_items`, it repeats on every line of the order, and `SUM(order_total)` counts each order
once **per item**. The numbers look plausible and are wrong. That's the classic **mixed grain** bug.

## Choosing it

- **Prefer the finest grain you can reasonably store** (the individual event or line). You can always roll up (aggregate) from detail,
  but you can never recover detail you didn't keep.
- **Match the business process.** Decide what the business event actually is: a sale, a shipment, a click.
- **Keep one grain per table.** If you need a different level (daily summaries), build another table
  ([types of fact tables](/t/fact-table-types)).

## Checking it

A table has a declared grain, so test it: the combination of columns that should be unique **is unique**.

```sql
SELECT order_id, product_key, COUNT(*)
FROM fact_order_items
GROUP BY order_id, product_key
HAVING COUNT(*) > 1;           -- should return no rows
```

## Common traps

- **Join fan-out**: joining a fact to something at a finer grain multiplies rows and inflates sums. After any join, check that the
  row count is what you expect.
- **Unclear grain** in a spreadsheet-like table. If nobody can say what a row is, no one can say what a total means.
- Applies beyond warehouses: any table, view or API result has a grain ([primary keys](/t/primary-key) express it in databases).

Declaring the grain is where a [dimensional model](/t/dimensional-modeling) starts, before choosing the
[dimensions](/t/dimension-table) and [facts](/t/fact-table).
