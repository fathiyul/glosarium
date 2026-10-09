---
title: "Data Lake"
summary: "Cheap storage for raw data in any format."
levels: { backend: senior, data-engineer: junior }
aliases: ["data lakes", "lake", "object storage lake", "raw data lake"]
prereqs: ["data-warehouse"]
related: ["data-warehouse", "lakehouse", "landing-zone", "data-catalog-metastore", "open-table-format", "medallion-architecture"]
core: [data-engineer]
also: [data-storage]
---

A **data lake** is cheap, large-scale storage (usually cloud object storage) where you keep data in its **raw, original form**, whether
structured tables, JSON, logs, images or anything else, without deciding up front how it will be used.

```
s3://company-lake/
  raw/orders/date=2024-06-01/part-0001.json
  raw/clickstream/date=2024-06-01/part-0001.parquet
  raw/support-tickets/2024-06-01.csv
  images/products/...
```

## What it's for

- A **landing place** for everything, kept untouched ([landing zone](/t/landing-zone)).
- **Cheap long-term storage** of big volumes.
- **Flexible use**: data science, machine learning, ad-hoc exploration and building curated tables later.
- **Schema on read**: you apply structure when you query, not when you store.

## Lake vs warehouse

| | Data lake | [Data warehouse](/t/data-warehouse) |
|---|---|---|
| Data | Raw, any format | Cleaned, modeled tables |
| Schema | Applied when reading | Enforced when writing |
| Users | Engineers, data scientists | Analysts, BI tools |
| Cost of storage | Very low | Higher |
| Governance and speed | You must add them | Built in |

## The famous failure: the data swamp

Without organization, a lake fills with undocumented, duplicated files nobody trusts or can find. To keep it useful:

- **Organize** folders and layers sensibly ([medallion architecture](/t/medallion-architecture)).
- **Catalog it**: record what exists, its schema and its owner ([data catalog](/t/data-catalog-metastore)).
- **Use good formats and partitioning** ([Parquet](/t/parquet)) instead of leaving everything as CSV.
- **Apply access control and retention.**

Modern setups add table features on top of lake files, such as transactions, updates and time travel, giving a
[lakehouse](/t/lakehouse) with warehouse-like behavior ([open table formats](/t/open-table-format)).
