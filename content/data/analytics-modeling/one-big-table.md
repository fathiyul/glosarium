---
title: "One Big Table (Wide Tables)"
summary: "Denormalizing everything into one wide table for simple, fast queries."
levels: { data-engineer: mid-level }
aliases: ["OBT", "one big table", "wide table", "denormalized table"]
prereqs: ["star-schema", "denormalization"]
related: ["dimensional-modeling", "star-vs-snowflake", "snowflake-schema", "columnar-storage", "query-cost", "data-mart"]
---

A **one big table** (OBT), or wide table, is a single denormalized table that already contains the fact columns and the dimension attributes they would otherwise be joined to. Analysts query one table, and there are no joins.

```
orders_wide
order_id | order_date | customer_name | customer_country | product_name | category | quantity | amount
```

It's the far end of the [denormalization](/t/denormalization) trade: instead of a [star schema](/t/star-schema) with a fact joined to dimensions, everything is pre-joined and repeated on every row.

## Why people build them

- Simple for analysts and BI tools. No joins means fewer things to get wrong and a shorter learning curve.
- Often fast on columnar engines, which compress repeated text well and read only the columns a query needs ([columnar storage](/t/columnar-storage)).
- Convenient per use case. A dashboard or an ML feature table can have exactly the columns it needs, in one place.

## The classic mistake

Teams reach for an OBT because joins are annoying, then discover the costs. Every query scans a wide table, so it reads more bytes than a narrow fact would ([query cost](/t/query-cost)). A change to one attribute means rebuilding the whole table. And each team's wide table defines "revenue" or "active customer" slightly differently, so the numbers no longer line up.

The reverse mistake is just as common: building a large, rigid star schema for a small dataset where one well-named wide table would have been simpler and faster.

## Trade-offs

| Wide table | Modeled (star) schema |
|---|---|
| No joins, easy to query | More joins, but flexible |
| Repeats data; scans more bytes | Stores data once |
| Must rebuild on change | Update one dimension |
| Each table drifts in definitions | Shared dimensions stay consistent |
| Great for a fixed set of questions | Handles new questions |

## When to use it

An OBT works well as a **consumption layer** for a specific, stable set of questions: a dashboard's backing table, a report, or a feature table for one model. Build it **on top of** a modeled core, so there's still one place where definitions and history live, and regenerate it from that core rather than editing it by hand.

Avoid it as the only model when you have many unpredictable questions, need consistent shared definitions across teams, or must update dimension values without rewriting everything. A [star schema](/t/star-schema) or a [snowflake schema](/t/snowflake-schema) keeps those options open. The two aren't exclusive: many warehouses keep a star underneath and materialize wide tables for the dashboards that need them.
