---
title: "Data Warehouse"
summary: "A database optimized for analytics, like BigQuery or Snowflake."
levels: { backend: mid-level, data-engineer: junior }
aliases: ["warehouse", "DWH", "cloud data warehouse", "BigQuery", "Snowflake", "Redshift", "analytical database"]
prereqs: ["oltp-vs-olap"]
related: ["data-lake", "lakehouse", "columnar-storage", "star-schema", "mpp-warehouse", "query-cost"]
core: [data-engineer]
also: [data-storage]
---

A **data warehouse** is a database built for **analysis**, not for running an application. It holds cleaned, organized data from many
sources (orders, payments, support, marketing), and is designed to answer large questions quickly: revenue by region over three years, conversion by
channel.

Examples include BigQuery, Snowflake, Amazon Redshift and ClickHouse, along with long-standing traditional warehouse products.

```
app DB ─┐
billing ┼─► pipelines (ETL/ELT) ─► WAREHOUSE ─► dashboards, reports, analysts, ML
CRM     ─┘
```

## Why not just query the application database?

Application databases serve many small, fast transactions, and heavy reports would slow them down for real users
([OLTP vs OLAP](/t/oltp-vs-olap)). A warehouse is separate, so analysis doesn't affect the product, and it combines data from **many** systems in one place.

## What makes it different

- **[Columnar storage](/t/columnar-storage)** and compression, so large scans and aggregations are fast.
- **Massively parallel processing** across many machines ([MPP](/t/mpp-warehouse)).
- **Modeled data**: facts and dimensions in a [star schema](/t/star-schema), or other analysis-friendly shapes.
- **History**: it keeps past states, not only the current one.
- Cloud warehouses often **separate storage from compute**, so you can scale each independently
  ([compute-storage separation](/t/compute-storage-separation)).
- **Standard SQL**, so BI tools and analysts can use it.

## Things to know

- Data arrives by **loading**, not by users editing it. Pipelines are the lifeline.
- **Costs** are driven by how much you scan and compute ([query cost](/t/query-cost)).
- Not great for frequent single-row updates or serving an application's requests.
- A [data lake](/t/data-lake) stores raw files cheaply, and a [lakehouse](/t/lakehouse) tries to combine both approaches.
