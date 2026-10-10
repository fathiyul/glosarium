---
title: "Modern Data Stack"
summary: "Cloud warehouse, managed ingestion, SQL transformations and BI tools wired together."
levels: { data-engineer: mid-level }
aliases: ["MDS", "modern data platform", "cloud data stack"]
prereqs: ["data-engineering", "data-warehouse"]
related: ["data-engineering-lifecycle", "etl-vs-elt", "ingestion-connectors", "dbt", "build-vs-buy-data-tools", "lakehouse"]
---

The modern data stack is a common way to assemble analytics infrastructure from cloud tools: a cloud data warehouse at the centre, managed connectors to load sources, SQL-based transformations, a BI tool for the output, and supporting tools for orchestration and cataloguing.

A typical arrangement:

```
sources ─▶ connectors ─▶ cloud warehouse ─▶ SQL transformations ─▶ BI / ML
                        (BigQuery, Snowflake, Redshift)   (dbt)      (Looker, ...)
```

The pattern is usually [ELT](/t/etl-vs-elt): load raw data into the warehouse first, then transform it there with SQL. Managed connectors such as Fivetran or Airbyte handle pulling from SaaS tools and databases, and dbt is a common choice for versioned SQL transformations. Tool names change quickly; the shape is what matters.

## Why it matters

The classic mistake is believing the tools are the hard part. Buying the whole stack does not give you correct metrics, consistent definitions, or reliable pipelines. Those come from [data modelling](/t/data-modeling), [data contracts](/t/data-contract), tests and ownership. A second mistake is adopting every new tool without asking whether the team can operate it.

## When it may not fit

- A small team may do fine with one warehouse and hand-written SQL; a full stack adds cost and moving parts.
- Heavy real-time or streaming needs may not fit a batch-oriented stack.
- Managed tools trade money for less operational work, and often bring [vendor lock-in](/t/vendor-lock-in) and per-usage pricing.

Treat the stack as an implementation of the [data engineering lifecycle](/t/data-engineering-lifecycle), not a substitute for it. See [data ingestion](/t/data-ingestion), [data warehouse](/t/data-warehouse) and [build vs buy](/t/build-vs-buy-data-tools).
