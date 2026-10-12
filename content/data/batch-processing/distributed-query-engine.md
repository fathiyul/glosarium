---
title: "Distributed SQL Query Engines (Trino, Presto)"
summary: "Querying data where it lives, across lakes and databases."
levels: { data-engineer: mid-level , data-analyst: mid-level , data-scientist: mid-level }
aliases: ["Trino", "Presto", "distributed SQL engine", "query engine", "Athena", "interactive SQL engine"]
prereqs: ["sql", "compute-storage-separation"]
related: ["query-federation", "single-node-engines", "apache-spark", "mpp-warehouse", "lakehouse", "partition-pruning"]
core: [data-engineer]
---

A **distributed SQL query engine** (**Trino** and **Presto** are the best-known examples) runs SQL **across a cluster of machines, directly over data that lives elsewhere**: files in a data lake, tables in databases and other systems. It doesn't own the storage. It just queries it, quickly.

```sql
-- one query joining a lake table with an operational database
SELECT c.country, SUM(o.total_cents) AS revenue
FROM lake.sales.orders o                     -- Parquet files in object storage
JOIN postgres.public.customers c ON c.id = o.customer_id     -- a live PostgreSQL table
WHERE o.order_date >= DATE '2024-06-01'
GROUP BY c.country;
```

## How it works

A **coordinator** parses and plans the query, and **workers** run parts of it in parallel, streaming data between stages in memory. **Connectors** teach the engine how to read each source (Hive-style tables, Iceberg and Delta tables, relational databases, and more). A [catalog](/t/data-catalog-metastore) says what tables exist.

It's an [MPP-style](/t/mpp-warehouse) engine, with **storage separate from compute** ([storage and compute separation](/t/compute-storage-separation)). Managed cloud services (Amazon Athena is built on this kind of technology) offer it without cluster management.

## What it's good at

- **Interactive, ad-hoc analytics** over lakes with SQL: seconds to minutes for questions on huge data.
- **Querying data in place**, with no loading step, and across sources ([query federation](/t/query-federation)).
- **A SQL layer over a lakehouse**, for BI tools and analysts ([lakehouse](/t/lakehouse)).
- Making use of pruning and pushdown on well-laid-out data ([partition pruning](/t/partition-pruning), [predicate pushdown](/t/predicate-pushdown)).

## Compared with Spark

| | Distributed SQL engine | [Apache Spark](/t/apache-spark) |
|---|---|---|
| Strength | Fast, interactive SQL | Large, long-running transformations, code-based pipelines, ML, streaming |
| Interface | Mainly SQL | SQL and DataFrame code in several languages |
| Typical use | Analysts, BI, exploration | Data engineers building pipelines |

They're often used together on the same lake.

## Practical notes

- **Performance depends on data layout**: file format, partitioning and file sizes matter a lot.
- **Federated queries** against operational databases can load them. Limit and schedule heavily.
- **Not a great fit for very long, fragile jobs** unless the engine supports fault-tolerant execution, since failures may mean a restart.
- **Memory limits** apply to big joins and aggregations. Plan accordingly.
- Watch **concurrency and cost**, and apply access control through the engine and the catalog ([data governance](/t/data-governance)).
