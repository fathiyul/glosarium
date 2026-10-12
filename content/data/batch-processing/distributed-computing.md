---
title: "Distributed Computing"
summary: "Splitting work across many machines that coordinate over a network."
levels: { data-engineer: mid-level , data-scientist: mid-level }
aliases: ["cluster computing", "scale-out computing", "distributed data processing", "parallel computing across machines"]
prereqs: ["batch-processing", "cluster"]
related: ["apache-spark", "data-partitions-compute", "shuffle", "mapreduce", "fault-tolerance", "single-node-engines"]
---

**Distributed computing** runs one computation across many machines that coordinate over a network. You split the data and the work into pieces, send the pieces to different machines, run them in parallel, and combine the results.

```
one big job
   ├── machine 1: process partition 1 ─┐
   ├── machine 2: process partition 2 ─┼─► combine results
   └── machine 3: process partition 3 ─┘
```

It's how data too large for one machine, or a job too slow on one machine, gets processed ([batch processing](/t/batch-processing)).

## The core ideas

- Partitioning. Data is cut into chunks, and each task processes one chunk ([partitions](/t/data-partitions-compute)).
- Parallelism. Many tasks run at the same time across the machines.
- Shuffle. Operations that need rows regrouped by key — joins, group-bys, sorts — move data across the network. This is usually the slowest part of a job ([shuffle](/t/shuffle)).
- Coordination. One process plans the work and schedules tasks onto the machines ([driver and executors](/t/spark-driver-executor), [cluster resource manager](/t/cluster-resource-manager)).
- Fault tolerance. Machines fail, so systems retry tasks or recompute lost partitions rather than starting over ([fault tolerance](/t/fault-tolerance)).
- Skew. If one key holds far more data than the others, one machine does most of the work while the rest idle ([data skew](/t/data-skew)).

## The classic mistake

Reaching for a cluster when the job fits comfortably on one machine. Distribution has real costs: network transfer, serialization, scheduling and coordination overhead, plus the work of tuning and debugging a distributed system. A modern single machine with a columnar engine can often handle what people assume needs a cluster ([single-node engines](/t/single-node-engines)). Measure first.

## Trade-offs

Distribution buys **scale** — more data, more parallelism, more memory than one machine — and resilience to a single machine failing. It costs complexity and money, and it makes performance depend on data layout and key distribution, not just on the code. When the data grows past one machine, the overhead is worth paying. Below that, it usually isn't.

## Engines

The classic model is [MapReduce](/t/mapreduce): map work across machines, then reduce the results. Today most work runs on [Apache Spark](/t/apache-spark), Flink, or distributed SQL engines. They share the same ideas — partitions, shuffles, a driver and workers — under different names.
