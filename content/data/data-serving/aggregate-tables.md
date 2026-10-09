---
title: "Aggregate / Summary Tables"
summary: "Precomputed rollups that make dashboards fast."
levels: { data-engineer: mid-level }
aliases: ["summary tables", "rollup tables", "aggregates", "pre-aggregated tables", "data marts aggregates"]
prereqs: ["group-by", "fact-table"]
related: ["materialized-view", "dimensional-modeling", "olap-cube", "bi-dashboard", "query-cost", "semantic-layer"]
core: [data-engineer]
---

An **aggregate (summary) table** stores **precomputed rollups** of detailed data, such as daily revenue per region instead of millions of individual orders. Dashboards read the small summary instead of scanning and grouping the huge table every time.

```sql
CREATE TABLE agg_daily_revenue AS
SELECT order_date, region, product_category,
       COUNT(*)         AS orders,
       SUM(total_cents) AS revenue_cents
FROM fct_orders o
JOIN dim_customer c USING (customer_key)
JOIN dim_product  p USING (product_key)
GROUP BY order_date, region, product_category;
```

A dashboard query on this table touches thousands of rows instead of billions, so it's fast and cheap ([query cost](/t/query-cost)).

## When it helps

- **Frequently run, expensive queries**: a dashboard that hundreds of people open every morning.
- **High-volume event data** where analysis is mostly at a coarser level (daily, per account).
- **Interactive BI** where response time matters ([BI dashboards](/t/bi-dashboard)).

## Design decisions

- **Choose the grain** of the aggregate (per day per region per category), and document it ([grain](/t/grain)). It must be coarse enough to be small, and fine enough to answer the questions.
- **Pick the dimensions** that people filter and group by. If someone needs a different cut, the aggregate can't help, so they need the detail table.
- **Additive measures only** (counts, sums). Averages and distinct counts can't simply be re-aggregated. Store the sum and the count, and divide at read time. Approximate distinct counts need special structures.

```sql
SELECT region, SUM(revenue_cents) / SUM(orders) AS avg_order_value     -- not AVG(avg_order_value)
FROM agg_daily_revenue GROUP BY region;
```

## Keeping it correct

- **Refresh strategy**: rebuild it fully, or update incrementally by partition ([incremental models](/t/incremental-models)), or use a [materialized view](/t/materialized-view).
- **Handle late data**: reaggregate recent days.
- **Test it against the detail table** (totals must match), as a reconciliation check ([data reconciliation](/t/data-reconciliation)).
- **Document staleness**, since the aggregate is only as fresh as its last build.

## Cautions

- **Many aggregates multiply**: dozens of near-duplicates mean more to maintain and keep consistent. Prefer a few well-chosen ones, or a [semantic layer](/t/semantic-layer) that defines metrics once.
- **Premature aggregation** loses detail. Keep the fine-grained data, and build aggregates on top.
- **Engines are fast now**: measure whether you need one. A well-partitioned columnar table may answer the query quickly without it.
- OLAP cubes are an older, more elaborate form of the same idea ([OLAP cubes](/t/olap-cube)).
