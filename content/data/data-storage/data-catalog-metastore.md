---
title: "Table Catalog / Metastore"
summary: "The registry of table names, schemas and file locations, like Hive Metastore or Glue."
levels: { data-engineer: mid-level , data-scientist: mid-level }
aliases: ["metastore", "Hive Metastore", "Glue Data Catalog", "table catalog", "Unity Catalog", "catalog"]
prereqs: ["open-table-format", "parquet"]
related: ["data-catalog", "open-table-format", "lakehouse", "data-dictionary", "data-governance", "metadata-types"]
core: [data-engineer]
---

Files in storage don't know what they mean. A **table catalog (or metastore)** is the registry that records **which tables exist, their schemas and where their files live**. Query engines consult it to turn `SELECT * FROM sales.orders` into "read these files with these columns".

```
SELECT * FROM sales.orders
   │
   ▼  catalog lookup
 sales.orders → location s3://lake/sales/orders/, format Parquet, columns (id bigint, total decimal, order_date date),
                partitioned by order_date, partitions: [2024-06-01, 2024-06-02, ...]
   │
   ▼
 engine reads those files
```

Well-known implementations include the **Hive Metastore**, **AWS Glue Data Catalog**, and platform catalogs such as Databricks' Unity Catalog and the catalogs used with Iceberg (including REST-based catalogs). Different engines (Spark, Trino, Flink, warehouses) can share one catalog, so a table defined once can be queried from several tools.

## What it stores

- **Table definitions**: names, columns, types, comments.
- **Locations** and file formats.
- **Partition information.**
- With [open table formats](/t/open-table-format): a pointer to the table's current metadata.
- Often **permissions** and ownership, depending on the product.

## Metastore vs data catalog

The two terms are often mixed up:

- A **metastore / table catalog** is **technical infrastructure** for engines to find and read tables.
- A **[data catalog](/t/data-catalog)** is a **discovery and governance tool for people**: search, descriptions, owners, lineage, quality information and classifications ([data dictionary](/t/data-dictionary), [data governance](/t/data-governance)).

Some products combine both.

## Practical points

- **Register tables properly** and keep names consistent: `database.schema.table` conventions help.
- **Know where truth lives.** If files change outside the catalog's knowledge (someone drops files into a partition folder), the catalog can be out of date until repaired or refreshed.
- **Protect it**: it's critical infrastructure. If the catalog is down, engines can't find the data.
- **Manage access** at the catalog level where supported, instead of relying only on storage permissions ([governance](/t/data-governance)).
- With a lakehouse, the choice of catalog affects which engines can work with your tables, so check compatibility ([lakehouse](/t/lakehouse)).
