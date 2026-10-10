---
title: "Distributed File System (HDFS)"
summary: "Storing huge files across many machines with replication."
levels: { data-engineer: mid-level }
aliases: ["HDFS", "Hadoop Distributed File System", "DFS"]
prereqs: ["distributed-computing", "file-system"]
related: ["mapreduce", "apache-spark", "data-lake", "object-storage", "file-compaction"]
---

A distributed file system stores files across many machines as if they were one file system. Files are split into blocks, each block is placed on several nodes, and a metadata service tracks where the blocks live. HDFS (the Hadoop Distributed File System) is the classic example.

The design assumes large files and streaming reads. A client reading a big file pulls blocks from whichever node holds them, in parallel, and data is usually replicated (commonly **three copies**) so a lost machine does not lose data.

The classic mistake is treating it like a normal POSIX file system:

- Random writes and in-place updates are not its strength. It favors **write-once, append and sequential reads**.
- Millions of tiny files overwhelm the metadata service, which keeps file and block locations in memory. Prefer fewer, larger files — see [compaction](/t/file-compaction).
- It is not a low-latency database. Small random lookups are the wrong workload.

Distributed file systems were the storage layer under [MapReduce](/t/mapreduce) and early [Spark](/t/apache-spark) clusters, moving compute to the data. In cloud deployments, cheap [object storage](/t/object-storage) such as [S3](/t/s3) often plays that role now, with the compute layer reading objects directly. The two differ: object stores are not file systems and typically lack rename and append semantics.

## Trade-offs

Replication buys durability at the cost of storage and the metadata service can be a bottleneck. When not to use one: for small datasets, or workloads needing frequent updates or low-latency random access, a regular database or a local file system is a better fit.
