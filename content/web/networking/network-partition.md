---
title: "Network Partition"
summary: "Part of a network becoming unreachable from the rest."
levels: { backend: senior, data-engineer: senior }
aliases: ["network partition", "split brain", "netsplit"]
prereqs: ["cap-theorem", "failover"]
related: ["cap-theorem", "failover", "leaderless-replication"]
---

A **network partition** splits connectivity so groups of nodes can't reach each other — while each side keeps running. Both sides may elect leaders, accept writes, and serve reads, diverging until the partition heals. Every distributed decision (failover, consensus, replication) is really a partition-handling decision.

```text
[A B C] ✂ [D E F]   → each side: am I the majority? do I serve? do I write?
heals → divergent histories must reconcile (or conflict)
```

The CAP theorem frames the choice: during a partition, serve possibly-stale data (availability) or refuse (consistency). Quorums implement it: only the side with a majority acts, so at most one side proceeds. Everything else — fencing, epoch numbers, CRDTs, last-write-wins — manages the cases quorums don't cover.

The classic mistakes:

- Assuming partitions are rare. Clouds, AZs and flaky links partition routinely. "The network is reliable" is the first fallacy for a reason — design for partitions, not against their possibility.
- Split-brain writes. Two primaries accepting writes without fencing corrupts data on heal. Fence (STONITH, epochs) before promoting, always.
- Failover without quorum. Automatic failover that can't distinguish "primary dead" from "I'm isolated" promotes a second primary. Majority agreement is what makes failover safe.
- No heal strategy. Partitions end; divergent state then needs merge, last-writer rules, or manual repair. A system with no reconciliation plan just moves the outage to heal time.
- Testing only clean failures. Killing a process isn't a partition — both sides alive, mutually unreachable, is the case that breaks consensus and replication. Test with actual splits.
- Timeouts as truth. Slow isn't dead and dead looks like slow. Confusing the two promotes unnecessarily or waits forever. Quorum + fencing, not timeouts alone.

**The posture:** expect partitions, decide consistency-vs-availability per workload in advance, enforce single-writer with quorum and fencing, and plan the heal. Partition tolerance isn't a feature — it's the premise everything else stands on.
