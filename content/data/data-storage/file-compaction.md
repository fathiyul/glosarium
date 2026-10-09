---
title: "Compaction"
summary: "Merging small files into fewer, larger ones."
levels: { data-engineer: mid-level }
aliases: ["compaction", "small file compaction", "compacting files", "file compaction", "OPTIMIZE", "bin-packing"]
prereqs: ["small-files-problem", "parquet"]
related: ["small-files-problem", "open-table-format", "hive-partitioning", "row-vs-columnar-formats", "partition-pruning", "data-retention-tiers"]
core: [data-engineer]
---

**Compaction** merges **many small files into fewer, larger ones**. Streaming and frequent micro-batch writes tend to produce thousands of tiny files, and analytical engines read large files far more efficiently.

```
Before:  date=2024-06-01/ part-0001.parquet (2 MB), part-0002 (3 MB), ... part-4812 (1 MB)
After:   date=2024-06-01/ compacted-0001.parquet (480 MB), compacted-0002 (410 MB)
```

## Why small files hurt

Every file has overhead: listing it in storage, opening it, reading its metadata and scheduling a task to process it ([small files problem](/t/small-files-problem)). Reading 5,000 tiny files can be much slower than reading 10 big ones, even though the total data is the same. Metadata and storage listing become bottlenecks.

## How it's done

- **Table formats have built-in operations.** Open table formats provide commands to rewrite small data files into larger ones (called things like `OPTIMIZE` or `rewrite_data_files`, depending on the format and engine) ([open table formats](/t/open-table-format)).
- **A scheduled job** reads a partition's small files and rewrites them (for example, a Spark or DuckDB job).
- **Write bigger in the first place**: buffer longer before writing, repartition before the write, or tune the writer's file size settings.

## Practical guidance

- **Aim for files in the hundreds of megabytes** (many systems suggest somewhere around 128 MB to 1 GB for columnar files). The best size depends on the engine and workload.
- **Compact finished partitions.** Don't rewrite a partition that's still being written to (yesterday's data, not today's), or you conflict with writers.
- **Do it off-peak**, as it uses compute and I/O.
- **Make it safe for readers**: table formats make the swap atomic, so queries see either the old files or the new ones. With plain folders, readers might see duplicates or gaps during the rewrite, so write new files first, then switch.
- **Clean up old files afterward** (and mind retention for time travel, see [time travel](/t/time-travel)).
- **Don't over-compact**: rewriting the same data repeatedly costs money for little gain.
- **Sort or cluster while you're at it**, if your engine supports it, so queries can skip more data ([partition pruning](/t/partition-pruning), [Hive partitioning](/t/hive-partitioning)).

Monitor the **number and size of files** per table, since a growing count of tiny files is an early warning sign.
