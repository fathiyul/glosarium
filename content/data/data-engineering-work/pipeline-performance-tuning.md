---
title: "Tuning a Slow Pipeline"
summary: "Finding the slow step and fixing it: partitions, joins, skew, file sizes."
levels: { data-engineer: mid-level , data-scientist: mid-level }
aliases: ["pipeline tuning", "slow pipeline", "pipeline optimization", "speeding up pipelines"]
prereqs: ["data-transformation", "partitioning"]
related: ["query-optimization", "data-skew", "broadcast-join", "small-files-problem", "file-compaction", "spill-to-disk"]
---

Tuning a slow pipeline means finding which step is slow and fixing that step, instead of guessing or throwing more machines at it. A pipeline is a chain; its runtime is set by the slowest stage, the **bottleneck**, so work on that.

The classic mistake is optimizing before measuring. People rewrite a transformation that is fast while the real cost is a [shuffle](/t/shuffle) in a join, or [data skew](/t/data-skew) where one task processes most of the rows. Read the execution plan first: for SQL, look at the [query plan](/t/query-plan) ([EXPLAIN](/t/explain-query)); for Spark, the stage and task view shows where time and data go. Then fix the actual bottleneck.

## Common causes and fixes

- Reading too much data. Filter and select columns early so the engine reads less. Partitioned tables let it skip whole partitions ([partition pruning](/t/partition-pruning)); columnar formats read only needed columns ([row vs columnar](/t/row-vs-columnar-formats)).
- Expensive joins. A large-large join shuffles both sides. If one side is small, a [broadcast join](/t/broadcast-join) avoids the shuffle. [Bucketing](/t/bucketing) both sides on the join key can help too.
- Data skew. If a few keys hold most of the rows, one task runs far longer than the rest. Salting hot keys or handling them separately spreads the load ([data skew](/t/data-skew)).
- Too many small files. Thousands of tiny files add metadata and open overhead; [compaction](/t/file-compaction) merges them ([small files problem](/t/small-files-problem)).
- Spilling to disk. When a stage needs more memory than it has, it writes to disk and slows down ([spill to disk](/t/spill-to-disk)). Reduce data per task, or adjust partitioning, rather than only adding memory.
- Recomputing everything. If a job rebuilds a full table daily, an [incremental model](/t/incremental-models) that processes only new or changed partitions is usually much cheaper.

## Keep it in proportion

Tuning has a cost: more complex code, harder maintenance, and sometimes less readable SQL. Optimize the pipelines that actually hurt, usually the ones on the critical path or those that dominate [cost](/t/warehouse-cost-management). Do not micro-optimize a job that runs in two minutes once a day. And **measure again** after each change, since moving the bottleneck just reveals the next one.
