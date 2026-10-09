---
title: "Staging, Intermediate and Mart Layers"
summary: "A conventional way to organize transformation code."
levels: { data-engineer: junior }
aliases: ["staging layer", "marts", "dbt project layers", "staging models"]
prereqs: ["sql-transformation-models"]
related: ["dbt", "sql-transformation-models", "data-mart", "medallion-architecture", "incremental-models", "dimensional-modeling"]
---

A widely used way to organize transformation code (popularized by [dbt](/t/dbt) projects) is to split models into three layers, each with a clear job. Raw source tables go in at one end, and business-ready tables come out at the other.

```
raw tables ─▶ staging ─▶ intermediate ─▶ marts
```

| Layer | Job | Typical content |
|---|---|---|
| **Staging** | Clean up one source table, one-to-one | Rename columns, cast types, fix units, no joins |
| **Intermediate** | Combine and reshape | Joins, deduplication, calculations reused by several marts |
| **Marts** | Serve a business area | `fct_orders`, `dim_customers`, ready for BI tools and analysts |

```sql
-- staging: stg_shop__orders.sql
select
    id                          as order_id,
    customer_id,
    cast(total_cents as numeric) / 100  as total_amount,
    created_at
from {{ source('shop', 'orders') }}
```

(This uses dbt's `{{ source() }}` syntax; other tools differ.)

## Why bother

- **One place for source quirks.** If a column is renamed upstream, you fix it in one staging model, not in twenty queries.
- Reuse. Everything downstream builds on the cleaned staging data.
- Readable lineage. You can trace a number back through clear steps.
- Safer changes. Small models are easier to test.

## Classic mistakes

- Putting joins and business logic in staging. Keep it boring: one source in, one clean table out.
- Marts reading raw tables directly, which skips the cleanup and duplicates it.
- Too many intermediate layers for a small project. Add structure as it earns its keep.

Related ideas: the [medallion architecture](/t/medallion-architecture) (bronze, silver, gold) is a similar layering with different names. Names and rules vary by team, so follow your project's conventions.
