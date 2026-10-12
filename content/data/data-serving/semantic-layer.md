---
title: "Semantic Layer / Metrics Layer"
summary: "One place that defines metrics like revenue, so every tool computes them the same way."
levels: { data-engineer: mid-level , data-analyst: mid-level , data-scientist: mid-level }
aliases: ["metrics layer", "metric store", "headless BI", "semantic model", "business logic layer"]
prereqs: ["metric-definitions", "bi-dashboard"]
related: ["metric-definitions", "metric-discrepancy", "self-service-analytics", "aggregate-tables", "data-dictionary", "dbt"]
core: [data-engineer]
---

A **semantic layer** (or metrics layer) is a **single place where business concepts are defined once**: what "revenue", "active customer" and "churn" mean, how they're calculated, how tables relate and what dimensions can slice them. Every tool that reports on the data (dashboards, notebooks, apps, spreadsheets) then **asks the layer for the metric** instead of writing its own SQL.

```yaml
# illustrative metric definition
metric: revenue
description: "Paid order value, net of refunds, in USD"
calculation: SUM(order_total_usd) - SUM(refund_usd)
filters: [ "status = 'paid'", "NOT is_test_account" ]
time_dimension: order_date
dimensions: [ region, product_category, channel ]
```

```
Dashboard A ─┐
Notebook    ─┼─► semantic layer ─► generates correct SQL ─► warehouse
Spreadsheet ─┤   ("revenue by region, last month")
API / app   ─┘
```

## The problem it solves

Without it, "revenue" gets re-implemented in every dashboard and query, with slightly different filters, joins and time boundaries. Two reports show different numbers, and people stop trusting either ([metric definitions](/t/metric-definitions), [metric discrepancy](/t/metric-discrepancy)).

## What it provides

- **One definition per metric**, versioned and reviewed like code.
- **Consistent joins and grain**, so metrics aren't inflated by accidental fan-out.
- **Governed access**: the layer can enforce who sees which metrics and rows.
- **Self-service**: analysts and business users pick metrics and dimensions without writing SQL, with confidence that results are right ([self-service analytics](/t/self-service-analytics)).
- **Reuse** across tools, and sometimes **caching or pre-aggregation** behind the scenes ([aggregate tables](/t/aggregate-tables)).

## Forms it takes

- A feature of **BI tools** (but then the definitions are locked to that tool).
- A **headless / independent metrics layer** that sits between the warehouse and any consumer, defined in code, and often integrated with SQL transformation projects ([dbt](/t/dbt)).
- A modeled set of **well-defined tables** in the warehouse that everyone queries, which is a lightweight version.

## Cautions

- **It's governance work as much as technology.** The hard part is agreeing on definitions and ownership.
- **Another layer to maintain**, and it can become a bottleneck if only a few people can change it.
- **Tool coverage and lock-in**: check which tools can query it.
- **Don't expect it to fix bad data.** Garbage in, consistently-defined garbage out.
- **Start with a handful of critical metrics**, rather than modeling everything.
