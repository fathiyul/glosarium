---
title: "Role-Playing Dimension"
summary: "One dimension used several ways, like a date as order date and ship date."
levels: { data-engineer: senior }
aliases: ["role-playing dimensions", "role playing dimension", "aliased dimension", "multi-role dimension"]
prereqs: ["dimension-table", "date-dimension"]
related: ["conformed-dimension", "star-schema", "dimensional-modeling", "fact-table", "surrogate-key-dw", "grain"]
---

A **role-playing dimension** is one [dimension table](/t/dimension-table) used several times in the same fact table, each use a different **role**. The classic case is a date dimension: an order has an order date, a ship date and a delivery date, all described by the same calendar.

```
fact_orders
order_id | order_date_key | ship_date_key | delivery_date_key | amount
             │                 │                  │
             └────────── all point at dim_date ───┘
```

In a query you join the same table once per role and give each join an alias:

```sql
SELECT o.order_id,
       od.year AS order_year,
       sd.year AS ship_year
FROM fact_orders o
JOIN dim_date od ON od.date_key = o.order_date_key
JOIN dim_date sd ON sd.date_key = o.ship_date_key;
```

## Why it matters

The alternative is a separate `dim_order_date`, `dim_ship_date` and `dim_delivery_date`. That duplicates the calendar three times, and the copies drift: a holiday gets added to one and not the others, so comparisons across roles become unreliable. Reusing one table is a form of [conformed dimension](/t/conformed-dimension) reuse and keeps the calendar logic in one place.

The classic mistake is storing raw dates on the fact table and re-deriving "quarter" or "is it a weekend" in every query, which is exactly what a [date dimension](/t/date-dimension) exists to prevent.

## Trade-offs and practical notes

- Each role adds a join. Joining the same table several times is cheap for small dimensions like dates, but select only the columns you need or the query gets hard to read.
- Alias carefully. With four aliases of `dim_date` in one query, it's easy to filter on the wrong role and get a plausible but wrong answer.
- Not every tool handles roles equally. Some BI tools have first-class support for role-playing dimensions (often called aliases or roles); others just see repeated joins. Check what yours does.
- The idea isn't limited to dates. Two keys pointing at the same `dim_location` — a pickup and a drop-off — are also role-playing, as are `dim_employee` used as salesperson and as manager.
