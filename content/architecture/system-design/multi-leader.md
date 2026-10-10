---
title: "Multi-Leader Replication"
summary: "Several nodes accept writes and sync with each other."
levels: { backend: senior }
aliases: ["multi-leader replication", "multi-master", "active-active database"]
prereqs: ["leader-follower", "cap-theorem"]
related: ["leader-follower", "eventual-consistency", "last-write-wins"]
---
**Multi-leader replication** accepts writes on several nodes, replicating asynchronously between them: every region writes locally (low latency, surviving partitions), at the cost of write conflicts — the same key changed on two leaders needs resolution (last-write-wins, merge, or application repair).

```text
write in EU → EU leader ─replicate⇄ US leader ← write in US
same key both sides → conflict → resolve by rule
```

It suits geographically distributed writes and partition-tolerant availability where conflicts are rare or resolvable. Where conflicts are frequent or correctness-critical (inventory, money), single-leader or partitioned writes fit better — multi-leader trades conflict-freedom for write availability.

The classic mistakes:

- Assuming conflicts are rare. "Rare" at scale means constant; design resolution (types, rules, repair paths) before the first collision, not after.
- Last-write-wins for everything. Silent data loss on concurrent edits is the default, not the answer — use it only where losing writes is harmless.
- Ignoring clock dependence. Timestamp-based resolution needs synchronised clocks; skew decides winners wrongly. Logical clocks or explicit merge beat wall-clock arbitration.
- Reading across leaders naively. A read seeing EU's write but not yet US's confuses users ("my edit vanished"). Session consistency or leader-pinned reads contain the weirdness.
- Topology complexity. Every added leader multiplies replication paths and failure modes. Few leaders, well-placed, beat many.
- Conflict repair as an afterthought. Unresolvable-by-rule conflicts need human or application repair queues — designed, monitored, worked.
- Choosing it for single-region scale. Multi-leader's payoff is geography and partition tolerance; single-region write scale usually wants partitioning instead.

**When to use it:** multi-region writes with tolerable conflicts — local latency and partition survival outweighing merge complexity. Otherwise single-leader keeps its conflict-free simplicity.
