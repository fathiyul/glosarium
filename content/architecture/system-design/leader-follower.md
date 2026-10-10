---
title: "Leader-Follower Replication"
summary: "One node takes writes; followers copy them and serve reads."
levels: { backend: senior }
aliases: ["leader-follower replication", "primary replica replication", "master slave"]
prereqs: ["database-high-availability", "sync-vs-async-replication"]
related: ["multi-leader", "sync-vs-async-replication", "failover"]
---
**Leader-follower replication** (primary-replica) sends all writes to one leader, which streams them to read-only followers: simple, ordered, and the default shape of relational high availability. Reads scale out across followers; writes funnel through one node that defines the order.

```text
writes → leader → stream → follower 1, follower 2 (reads scale here)
leader dies → promote a follower (failover)
```

Its virtues are simplicity and a single Gordian ordering — no write conflicts by construction. Its limits are write throughput (one node), failover mechanics (promotion, split-brain avoidance), and replica lag (async followers serve stale reads).

The classic mistakes:

- Reading critical data from lagging replicas. "Read your write" fails when the write hasn't replicated; route freshness-sensitive reads to the leader or wait for position.
- Unplanned failover. Promotion without fencing, client redirection and lag accounting produces split-brain or lost writes. Failover is a designed procedure, not an event.
- Writes to followers. Accidentally-writable replicas diverge silently; enforce read-only at the database, not by convention.
- Ignoring lag monitoring. Growing lag is the early warning for overload, network trouble or a stuck replica. Alert on lag, not just liveness.
- Sync assumed. Async (fast, losable) vs sync (durable, slower) is per-link configuration with failover consequences — know which links promise what (see [sync vs async](/t/sync-vs-async-replication)).
- Leader as single point of write. Accept the write ceiling honestly; when one node's writes saturate, the answer is partitioning or multi-leader, not a bigger box forever.

**When to use it:** the default for read-scaled relational workloads — simple, ordered, well-understood. Graduate to multi-leader or partitioning when write scale or geography outgrows one leader.
