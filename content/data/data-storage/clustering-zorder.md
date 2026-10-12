---
title: "Clustering and Z-Ordering"
summary: "Sorting data inside files so related rows sit together for faster scans."
levels: { data-engineer: senior , data-scientist: senior }
aliases: ["Z-order", "Z-ordering", "data clustering", "clustering keys", "sort order", "liquid clustering", "Hilbert curve"]
prereqs: ["predicate-pushdown", "parquet"]
related: ["predicate-pushdown", "partition-pruning", "file-compaction", "open-table-format", "hive-partitioning", "query-cost"]
core: [data-engineer]
---

**Clustering** means **physically ordering the data inside files by chosen columns**, so that rows with similar values sit together. This makes each file's (and each row group's) **min/max ranges tight**, so queries filtering on those columns can **skip most files and blocks** ([predicate pushdown](/t/predicate-pushdown), [partition pruning](/t/partition-pruning)).

Imagine rows scattered randomly: every file holds a bit of every date, so a filter on one customer must read nearly everything. Sort or cluster by `customer_id`, and one customer's rows end up in a few files. The statistics let the engine skip the rest.

```
Unclustered:  file1 [customer 5, 91, 2, 77...]  file2 [customer 3, 88, 5, 12...]  → ranges overlap, can't skip
Clustered:    file1 [customers 1-20]            file2 [customers 21-40] ...        → filter on 33 reads only file2
```

## Single-column vs multi-column

Sorting by one column works well for that column. With **several filter columns**, a plain sort by `(a, b)` only helps `a`, because `b` is ordered only within each `a`.

**Z-ordering** is a technique that interleaves the bits of several columns' values to map multi-dimensional data onto one dimension while **keeping nearby points in all dimensions close together**. This gives decent skipping for filters on any of the chosen columns, though weaker than a dedicated sort for any single one. Related space-filling curves (such as Hilbert curves) do the same job, and some systems offer them.

```sql
-- Delta Lake style
OPTIMIZE events ZORDER BY (customer_id, event_type);
```

Other platforms expose the idea under different names: **clustering keys** (Snowflake), **clustered tables** (BigQuery), **sort orders** and compaction strategies in open table formats (Iceberg), and automatic or "liquid" clustering features. The details change quickly, so check your platform.

## How it relates to partitioning

- **[Partitioning](/t/hive-partitioning)** (by date, for example) splits data into folders, giving coarse, hard boundaries, and works best for **low-cardinality** columns.
- **Clustering** orders data **within** partitions and files, and suits **higher-cardinality** columns (customer or product IDs), where partitioning would create millions of tiny pieces ([small files problem](/t/small-files-problem)).

They combine well: partition by date, cluster by customer.

## When it pays off

- **Large tables** with frequent selective filters on a few columns.
- **Point lookups or narrow ranges** on high-cardinality columns.
- **Costs based on data scanned**: skipping data directly reduces cost ([query cost](/t/query-cost)).

## Costs and cautions

- **Maintenance**: data must be re-clustered as new data arrives, which rewrites files and uses compute. Many platforms offer automatic or scheduled clustering ([compaction](/t/file-compaction)).
- **Choose columns by actual query patterns**, usually those most often in filters and joins. Too many columns dilute the benefit.
- **Diminishing returns**: for small tables or queries that scan most data anyway, it adds cost without speedup.
- **Measure**: compare bytes scanned and run time before and after.
- Clustering helps **filters**. Different layouts might help joins or aggregations ([shuffle](/t/shuffle)).
