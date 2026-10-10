---
title: "ORC"
summary: "A columnar format common in the Hadoop ecosystem."
levels: { data-engineer: senior }
aliases: ["Optimized Row Columnar", "ORC file format", "ORC format"]
prereqs: ["columnar-storage"]
related: ["parquet", "row-vs-columnar-formats", "predicate-pushdown", "compression-codecs", "hive-partitioning", "apache-spark"]
---

ORC (Optimized Row Columnar) is a [columnar](/t/columnar-storage) file format used mostly in the Hadoop ecosystem. It stores each column separately, so a query that reads two of twenty columns only reads those two, and it keeps lightweight indexes (such as min/max per group of rows) so an engine can skip data that cannot match a filter.

ORC came out of Hive and is well supported by Hive, [Spark](/t/apache-spark), and other JVM-based engines. [Parquet](/t/parquet) is the other common columnar format, and the two are often compared.

The classic mistake is picking a format by habit and then hitting an **ecosystem wall**. If your processing tools only read Parquet, an ORC dataset forces an extra conversion step; if your cluster is Hive-centric and already writes ORC, switching for no reason adds work. Both formats give the main columnar benefits — [predicate pushdown](/t/predicate-pushdown), compression, and reading only the needed columns — so the choice is usually about ecosystem fit, not raw speed.

## ORC and Parquet

- ORC originated in Hive; Parquet came from the wider Hadoop/analytics community. Parquet has broader language support outside the JVM.
- Both support schema evolution, nested types and column-level compression; the specifics and quality of support vary by reader.
- ORC has tighter integration with Hive's transactional tables in some versions. That is an engine-specific feature, not a general property of the format.
- Do not assume one is always faster. Benchmarks flip depending on data, engine and version.

## Trade-offs

Columnar formats are built for scans and analytics, not for row-level updates or tiny files. A folder of thousands of small ORC files hurts query planning and metadata; use [compaction](/t/file-compaction) and [partitioning](/t/hive-partitioning). For durable analytics storage in a [data lake](/t/data-lake), ORC or Parquet is a good default; for interchange between arbitrary tools, Parquet is the safer bet.
