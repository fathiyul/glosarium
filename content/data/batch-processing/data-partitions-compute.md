---
title: "Partitions in Distributed Processing"
summary: "The chunks of data that tasks process in parallel."
levels: { data-engineer: mid-level , data-scientist: mid-level }
aliases: ["compute partitions", "input partitions", "partition count", "repartition"]
prereqs: ["distributed-batch-processing", "partitioning"]
related: ["shuffle", "data-skew", "spark-driver-executor", "table-partitioning", "hive-partitioning", "broadcast-join"]
---

A partition in distributed processing is a chunk of the input that one task processes on its own. Engines split a job's data into partitions and run the tasks in parallel, so the number and size of partitions decide how much of the cluster you actually use.

**One huge partition wastes the cluster.** If a 500 GB dataset is read as two partitions, only two tasks run and the rest of the machines sit idle. The opposite also hurts: thousands of tiny partitions spend more time on scheduling and per-task overhead than on real work.

## Two meanings of "partition"

Don't confuse the compute partition with a [table partition](/t/table-partitioning) such as `date=2024-06-01` (Hive-style [partitioned tables](/t/hive-partitioning)). A table partition is a folder of files on storage, and [predicate pushdown](/t/predicate-pushdown) lets the engine skip folders a filter excludes. A compute partition is the unit of parallelism at run time, and the engine chooses it separately — often one per file, a target size, or a split after a [shuffle](/t/shuffle).

## Sizing them

- Aim for partitions that fit comfortably in memory. A common starting point is a few hundred MB per task, but the right size depends on the engine and the operation.
- More partitions mean more parallelism, up to the number of available cores. Beyond that you only add overhead.
- Spark's `spark.sql.shuffle.partitions` has a fixed default that is often wrong for a given dataset; adaptive query execution can resize partitions automatically. Other engines set this differently.

## Skew

Partitions are only balanced if the data is. A few hot keys can make one partition far larger than the rest, so one task runs long after the others finish ([data skew](/t/data-skew)). Salting keys or using the engine's skew handling helps. A [broadcast join](/t/broadcast-join) avoids shuffling the big side when one table is small.

Partition count is one of the first knobs to check when a distributed job is slow. See [distributed batch processing](/t/distributed-batch-processing) and [driver and executors](/t/spark-driver-executor).
