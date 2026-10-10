---
title: "MPP Data Warehouse"
summary: "Warehouses that split one query across many nodes in parallel."
levels: { data-engineer: mid-level }
aliases: ["MPP warehouse", "massively parallel warehouse", "MPP database"]
prereqs: ["data-warehouse", "distributed-computing"]
related: ["distributed-query-engine", "shuffle", "hot-partition", "broadcast-join", "columnar-storage"]
---

An MPP (massively parallel processing) data warehouse spreads a table across many nodes and runs one query as many parallel pieces of work. Each node scans and aggregates its local slice, then the results are combined. Redshift, Snowflake, BigQuery, Teradata and Greenplum are examples; the details differ by vendor.

This is how warehouses scan billions of rows in seconds. But it only works if the data is laid out well. The classic mistake is expecting MPP to rescue a bad query or a bad distribution.

A concrete failure: you join two large tables on a key that is not their distribution key. Every node must send rows to other nodes to line up the matching keys — a [shuffle](/t/shuffle). If one key value is huge, one node does most of the work while the rest wait (a skewed [hot partition](/t/hot-partition)). A cross join is worse: every row meets every row.

## What helps

- Distribute large tables on a key you join on, so matching rows are **co-located** and no shuffle is needed.
- Replicate small tables to every node (a [broadcast join](/t/broadcast-join)).
- Filter early. Columnar storage and [partition pruning](/t/partition-pruning) let the engine skip data it does not need.
- Watch **skew**: a single dominant value can unbalance the whole cluster.

## Trade-offs

MPP shines for large scans, joins and aggregations. It is less suited to many tiny single-row lookups, where per-query overhead and concurrency limits dominate — an OLTP database or a key-value store fits those better. Always-on clusters also cost money when idle, which is why some warehouses separate compute from storage and scale on demand. For the broader category, see [data warehouse](/t/data-warehouse).
