---
title: "Small Files Problem"
summary: "Too many tiny files slowing queries and overloading metadata."
levels: { data-engineer: mid-level }
aliases: ["small file problem", "tiny files", "too many small files", "many small files"]
prereqs: ["hive-partitioning", "parquet"]
related: ["file-compaction", "hive-partitioning", "open-table-format", "partition-pruning", "data-lake", "batch-processing"]
core: [data-engineer]
---

The **small files problem** is when a table or dataset consists of **huge numbers of tiny files** (kilobytes to a few megabytes each), which makes queries slow and puts heavy load on storage metadata. It's one of the most common performance issues in data lakes.

## Why it happens

- **Streaming or micro-batch writes** that create a new file every few seconds or minutes.
- **Over-partitioning**: partitioning by a high-cardinality column (such as user ID) or by hour or minute on small data, so each partition holds only a bit of data.
- **Many parallel tasks**, each writing its own small output file (for example, 2,000 Spark tasks writing 2,000 files for a few megabytes of data).
- **Frequent small incremental loads** appending a file each time.
- Data sources that deliver lots of small files (logs, IoT).

## Why it hurts

- **Per-file overhead dominates**: listing, opening, reading metadata and scheduling a task for each file. Reading 100,000 tiny files can take far longer than reading 100 large ones holding the same data.
- **Metadata pressure**: object storage listings are slow, and catalogs and the engine's planner struggle with huge file lists.
- **Poor compression and column statistics**: small files compress less well, and statistics span too little data to skip effectively ([predicate pushdown](/t/predicate-pushdown)).
- **Slow planning** before any real work begins.
- **Higher cost**: more requests to storage, and more tasks.

## How to fix and prevent it

- **Compact**: periodically rewrite small files into larger ones ([compaction](/t/file-compaction)), and many [open table formats](/t/open-table-format) have commands for it.
- **Write larger files**: buffer more before flushing, repartition or coalesce output so each write task produces a reasonably sized file, and tune writer settings.
- **Partition less aggressively.** Choose a column and granularity that give sizable partitions ([Hive partitioning](/t/hive-partitioning)). Aim for files of hundreds of megabytes where the engine prefers it.
- **Batch ingestion** into fewer, larger writes instead of per-event files.
- **Use a table format** that handles file sizing and maintenance.

## Detecting it

Look at the **number of files and their average size** per table or partition, and at query planning time. A table with thousands of files per partition averaging a few MB is a warning sign. Check this regularly, especially for streaming outputs.

Rule of thumb: **fewer, larger files** (but not enormous ones, which limit parallelism).
