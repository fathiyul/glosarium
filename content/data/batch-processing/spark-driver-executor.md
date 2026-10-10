---
title: "Driver and Executors"
summary: "The process that plans a job and the workers that run its tasks."
levels: { data-engineer: mid-level }
aliases: ["Spark driver", "Spark executor", "driver and executor", "driver vs executor"]
prereqs: ["apache-spark", "cluster"]
related: ["data-partitions-compute", "shuffle", "transformations-vs-actions", "cluster-resource-manager", "data-skew", "dataframe"]
---

In [Apache Spark](/t/apache-spark), a job runs as one **driver** process and many **executor** processes. The driver runs your program, builds the execution plan and schedules the work. Executors sit on the cluster's worker machines and actually run tasks on partitions of the data.

```
driver (your program, SparkSession)
   │  builds the plan, schedules tasks
   ├── executor (node A): task, task, ...   + cached data
   ├── executor (node B): task, task, ...
   └── executor (node C): task, task, ...
```

## What the driver does

- Runs your `main` program and creates the `SparkSession`.
- Turns the plan into stages and tasks, and schedules them onto executors ([transformations vs actions](/t/transformations-vs-actions)).
- Collects results back from the executors.
- If the driver dies, the application ends (unless the platform restarts it).

## What executors do

- Run the tasks: each task processes one partition of the data ([partitions](/t/data-partitions-compute)).
- Hold cached or persisted data and shuffle output, so other tasks can read it.
- Report status and results back to the driver.
- If an executor fails, its tasks are retried, usually on another executor.

## The classic mistake

Treating the driver as just another worker. It isn't: its memory and CPU are for the program and the plan, not for holding your dataset. Calling `collect()` or `toPandas()` on a large DataFrame pulls every row to the driver and can crash it, even when the cluster has plenty of memory. The same goes for broadcasting a large object or building an enormous plan.

The other side of the mistake is blaming the cluster for a slow job when the bottleneck is a [shuffle](/t/shuffle) or [skewed data](/t/data-skew), not the number of executors.

## Practical notes

- Driver and executor memory are separate settings. Too little executor memory causes spills and out-of-memory errors; too little driver memory fails on large collects or very large plans.
- Executors are allocated by the cluster manager ([cluster resource manager](/t/cluster-resource-manager)), which decides how many to start and how much memory and CPU each gets.
- The number of tasks per stage depends on the number of partitions, not directly on the number of executors.
- In Spark's `local` mode, all roles run inside one JVM for testing. On a cluster they are separate processes, and the details differ between deployment modes (standalone, YARN, Kubernetes) and managed platforms.
