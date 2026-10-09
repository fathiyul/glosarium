---
title: "SQL Transformation Models (dbt)"
summary: "Transformations written as versioned SELECT statements that build tables."
levels: { data-engineer: junior }
aliases: ["dbt models", "dbt", "SQL models", "analytics engineering models", "transformations as SELECT statements"]
prereqs: ["select-query", "cte", "data-transformation"]
related: ["dbt", "incremental-models", "staging-intermediate-marts", "data-quality", "etl-vs-elt", "medallion-architecture"]
core: [data-engineer]
---

In a SQL transformation workflow (popularized by **dbt**, "data build tool"), each transformation is a **model**: one `SELECT` statement
saved in its own file. The tool turns it into a table or view in your warehouse and runs the models **in dependency order**.

```sql
-- models/marts/customer_revenue.sql
SELECT
    c.customer_id,
    c.country,
    SUM(o.amount) AS lifetime_revenue,
    COUNT(*)      AS orders
FROM {{ ref('stg_customers') }} AS c
JOIN {{ ref('stg_orders') }}    AS o ON o.customer_id = c.customer_id
GROUP BY c.customer_id, c.country
```

You write only the `SELECT`. The tool handles `CREATE TABLE AS`, dropping and replacing, and ordering.

`{{ ref('stg_orders') }}` references another model, and it does two jobs: it resolves to the real table name in the current
environment (dev schema vs production), and it tells the tool that this model **depends on** `stg_orders`, so that it's built first. The
set of references forms a graph (a DAG) of your whole pipeline.

## How a model is built (materialization)

| Materialization | Result | Use when |
|---|---|---|
| **view** | A saved query, computed on read | Light transformations, always current |
| **table** | Rebuilt fully on each run | Moderate size, queried often |
| **incremental** | Adds or updates only new data | Big tables ([incremental models](/t/incremental-models)) |

## What you get besides running SQL

- **Version control and code review** for transformation logic, like any other code.
- **Tests** declared next to the model: a column is unique, not null, only has allowed values, or references a valid row elsewhere
  ([data quality](/t/data-quality)).
- **Documentation and lineage**: descriptions of tables and columns, and a graph showing where each table comes from.
- **Environments**: develop in your own schema, then promote to production.
- **Reusable macros** (templated SQL) to avoid copy-paste.

## Structuring a project

The usual layers:

- **Staging**: one model per source table, with renaming, type casting and light cleaning.
- **Intermediate**: joins and business logic.
- **Marts**: final tables for each use (finance, marketing).

See [staging, intermediate and marts](/t/staging-intermediate-marts). Follow naming conventions and give each model a defined
[grain](/t/grain).

## Cautions

- SQL models can sprawl. Keep each one focused, and delete unused models.
- Rebuilding huge tables every run gets expensive, so plan for incremental builds early.
- Business logic scattered across the BI tool *and* models causes disagreements. Keep it in the models.

The tool names will change over time. The pattern of versioned, tested, dependency-aware SQL is what to remember. See [dbt](/t/dbt).
