---
title: "Predicate Pushdown"
summary: "Filtering inside the storage layer before data is read."
levels: { data-engineer: mid-level , data-scientist: mid-level }
aliases: ["filter pushdown", "pushdown", "predicate push-down", "pushing filters to storage"]
prereqs: ["row-vs-columnar-formats", "parquet"]
related: ["partition-pruning", "parquet", "clustering-zorder", "orc", "row-vs-columnar-formats", "query-cost"]
core: [data-engineer]
---

**Predicate pushdown** means evaluating a query's **filter conditions as early and as close to the data as possible**, inside the storage or file-reading layer, so rows that can't match are never read, decoded or sent over the network.

A **predicate** is a condition in a `WHERE` clause (`country = 'ID'`, `amount > 1000`). Without pushdown, the engine reads everything, then filters. With it, the file reader uses the filter to **skip data**.

## How it works with Parquet

A Parquet file is split into **row groups**, and each stores **statistics per column**: minimum and maximum values and null counts (and some files have bloom filters). Before reading a row group, the reader compares the filter to its statistics:

```
Query: WHERE amount > 1000

Row group 1: amount min=5,    max=480     →  skip (no value can be > 1000)
Row group 2: amount min=300,  max=9,200   →  read it
Row group 3: amount min=10,   max=900     →  skip
```

Skipped row groups are never read from disk or storage. Combined with reading only the needed columns, this is why analytical queries on columnar data are fast ([row vs columnar](/t/row-vs-columnar-formats), [Parquet](/t/parquet)).

The same idea appears at several layers: [partition pruning](/t/partition-pruning) skips whole partitions or files, file statistics skip row groups, and some databases push filters down into external sources or remote systems.

## Making it effective

- **Sorting or clustering data by commonly filtered columns** makes each row group's min/max range narrow, so more of them can be skipped. If values are randomly scattered, every row group's range covers everything, and nothing gets skipped ([clustering and Z-order](/t/clustering-zorder)).
- **Write reasonably sized row groups and files.**
- **Use simple, direct predicates** on columns. Filters that wrap columns in functions or casts, or use complex expressions, often can't be pushed down.
- **Match types**: comparing a string column to a number may force a full read.
- **Select only the columns you need**, since pushdown (filtering) and projection (column choice) work together.

## Checking

Query plans (`EXPLAIN`) and engine metrics show "pushed filters", "row groups skipped" or "bytes scanned". Compare bytes read against the table size to see whether it's working ([query cost](/t/query-cost)).

Pushdown is an automatic optimization, but your **data layout and query shape decide whether it can help**.
