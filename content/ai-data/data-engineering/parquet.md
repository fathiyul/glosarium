---
title: "Parquet"
summary: "A columnar file format for analytics."
levels: { backend: senior, data-engineer: junior , data-scientist: junior }
aliases: ["Apache Parquet", ".parquet", "parquet files", "parquet format"]
prereqs: ["columnar-storage"]
related: ["row-vs-columnar-formats", "orc", "compression-codecs", "predicate-pushdown", "hive-partitioning", "small-files-problem"]
core: [data-engineer]
also: [data-storage]
---

**Parquet** is the most common **columnar file format** for analytics. It stores a table in a compact, typed, compressed binary file that query engines
(Spark, DuckDB, warehouses and many others) can read very efficiently.

```python
import pandas as pd
df = pd.read_csv("orders.csv")
df.to_parquet("orders.parquet")                       # write
pd.read_parquet("orders.parquet", columns=["country", "amount"])   # read only two columns
```

## What's inside

- **Columns stored together**, in chunks called row groups, so engines read only the needed columns
  ([columnar storage](/t/columnar-storage)).
- **A schema with types** (integers, decimals, timestamps, nested structures), embedded in the file. No guessing as with CSV.
- **Compression and encoding** per column ([compression codecs](/t/compression-codecs)), often producing files much smaller than the
  CSV equivalent.
- **Statistics** (min/max, null counts) per chunk, so a query with a filter can skip chunks that can't match
  ([predicate pushdown](/t/predicate-pushdown)).

## Why it's the default for data lakes

Smaller storage, faster scans and reliable types. It's supported everywhere, and it's the usual format for the files behind lakehouse tables
([open table formats](/t/open-table-format)).

## Things to know

- **Files are immutable.** You don't edit a Parquet file in place. To change data you write new files. Table formats add the ability to update
  on top.
- **File size matters.** Millions of tiny files are slow. Aim for fewer, larger files, and compact periodically
  ([small files problem](/t/small-files-problem)).
- **Partition thoughtfully** with `key=value` folders ([Hive partitioning](/t/hive-partitioning)).
- **Not human-readable.** Use a tool to inspect it, or query it with SQL.
- **Types need care**: timestamps and time zones, decimals vs floats, and what happens when a column's type changes between files.
- Good for analytics, wrong for per-record serving, or for streaming one event at a time (row formats such as Avro fit better)
  ([row vs columnar formats](/t/row-vs-columnar-formats)).
