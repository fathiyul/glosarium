---
title: "fsync and Durability"
summary: "What \"written to disk\" actually means, and when data can still be lost."
levels: { backend: senior, data-engineer: senior }
aliases: ["fsync", "fsync durability", "flushing to disk"]
prereqs: ["wal", "storage-engine"]
related: ["wal", "transaction", "checkpoint", "storage-engine"]
---

**`fsync`** is the system call that forces a file's buffered writes out of the operating system's cache onto persistent storage. Its role in databases is durability: a transaction is only truly committed once its [write-ahead log](/t/wal) record has been `fsync`ed to disk. Without that flush, a "committed" transaction can still be lost if the machine loses power.

```text
commit → write WAL record → fsync (force to disk) → report committed
without fsync → the record sits in OS cache → power loss → commit lost
```

The problem it solves: the OS caches writes in memory for speed, and the disk has its own cache. A write that returns "success" may not be durable. `fsync` is what turns "written" into "will survive a crash". This is the mechanism behind ACID durability.

The cost is performance: `fsync` waits for physical storage, which is slow (especially spinning disks), and doing it on every commit caps write throughput. That trade-off drives a lot of database tuning.

The classic mistakes:

- Assuming a commit is durable without fsync. If the database (or the OS, via a mount option or config) doesn't flush on commit, recent transactions can be lost on a crash. "Durable" is a setting, not a guarantee.
- Disabling fsync for speed and forgetting the risk. Turning it off (or using `synchronous_commit=off`-style settings) speeds commits dramatically but can lose the last moments of transactions on failure. Fine for some workloads, dangerous for others — decide deliberately.
- Ignoring the storage layer's own caching. Even with `fsync`, lying storage controllers (that acknowledge before truly persisting) undermine durability. Real durability needs honest disks.
- Batch fsync as if it were free. Grouping commits and syncing once improves throughput (group commit) but the durability window widens; understand it.
- Confusing fsync with checkpoint. `fsync` makes the *WAL* durable at commit; a [checkpoint](/t/checkpoint) later syncs data pages. Durability at commit lives in the WAL, not the data files.
- Forgetting replicas. A synchronous replica's acknowledgement also depends on its own fsync; async replicas can lag and lose recent commits on failover.

**How to think about it:** `fsync` is the line between "the database said yes" and "the data is actually safe". Every durability guarantee eventually depends on it, and the performance cost is why databases offer tunable durability. Know what your configuration actually guarantees before trusting a commit — see [write-ahead log](/t/wal) and [transactions](/t/transaction).
