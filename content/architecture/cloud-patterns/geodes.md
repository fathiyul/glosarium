---
title: "Geodes"
summary: "Serving any request from any region, with data replicated everywhere."
levels: { backend: staff }
aliases: ["geodes", "azure geodes", "geo-distributed nodes"]
prereqs: ["multi-region", "deployment-stamps"]
related: ["deployment-stamps", "active-active-vs-passive", "quorum"]
---
**Geodes** are dense multi-region units: identical full-stack deployments in many regions, each serving nearby users with local data ownership, replicating asynchronously — active everywhere, partitioned by geography, converging where global views need it. The pattern behind planetary-scale services that stay fast locally and available globally.

```text
geode EU: serves EU users + owns EU data ⇄ async replication ⇄ geode US: mirrors
global queries: fan out, merge (eventual); local: single-digit ms
```

Geodes accept the fundamental trade explicitly: local writes converge globally (conflict design required), global reads merge (freshness bounded), and partitions split cleanly along geode lines (each side fully functional). Quorum and coordination stay intra-geode (fast); inter-geode is asynchronous by design.

The classic mistakes:

- Synchronous inter-geode coordination. Cross-ocean consensus on hot paths adds hundreds of milliseconds per operation. Asynchronous between geodes; consensus within.
- Conflict naivety. Concurrent cross-geode writes to shared entities need resolution designed upfront (partitioned ownership preferred; CRDTs/LWW with eyes open otherwise).
- Residency violations. Replicating regulated data into geodes whose jurisdictions forbid it breaks law, not just latency. Data placement follows legal boundaries first.
- Geode-count excess. Dozens of geodes multiply the operational surface (every deploy, migration and incident × N) past reason. As few as latency and law allow.
- Global secondary indexes. Cross-geode queries needing global ordering/indexing reintroduce the coordination geodes avoid. Scope queries per geode; merge at read.
- Failover fantasy. "Traffic shifts to the next geode" requires its capacity, data (lagged!) and compliance posture to serve those users. Verify, don't assume.
- Unowned global state. Counters, sequences and singletons spanning geodes become coordination bottlenecks or correctness hazards. Partition or approximate globally-shared state.

**When to build them:** planetary scale with local latency needs and partitionable data. Intra-geode consensus, inter-geode async, conflicts designed, laws obeyed — geography as architecture.
