---
title: "Leaderless Replication"
summary: "Any node accepts writes, with quorums to reconcile, as in Cassandra."
levels: { backend: senior, data-engineer: senior }
aliases: ["leaderless replication", "leaderless", "dynamo-style replication"]
prereqs: ["eventual-consistency", "cap-theorem"]
related: ["wide-column-store", "eventual-consistency", "last-write-wins", "sync-vs-async-replication"]
---

In **leaderless replication** (Dynamo-style, used by Cassandra, DynamoDB, Riak), there's no single primary that owns writes. A client sends a write to several replicas directly; reads query several replicas and reconcile. Consistency is governed by **quorums**: with N replicas, if a write waits for W acknowledgements and a read consults R replicas, then ensuring `W + R > N` guarantees a read sees the latest write (because the sets overlap).

```text
N=3 replicas, W=2, R=2  → W+R > N  → read-your-writes strongly (barring failure)
W=1, R=1               → fast, but reads may miss recent writes (eventually consistent)
```

The benefit is availability and write scalability: any replica (or coordinator) can take a write, so there's no primary to fail over, and throughput spreads across nodes. You **tune** consistency per operation — strong-ish when you need it, fast and eventual when you don't.

The classic mistakes:

- Expecting strong consistency by default. These systems often default to faster, weaker settings; you opt into stronger reads/writes with quorums. Know your W/R settings.
- Ignoring conflicts. With concurrent writes to different replicas, conflicts happen. The store resolves them somehow (often [last-write-wins](/t/last-write-wins)), which can lose data. Design for mergeable data or avoid conflicts.
- Forgetting read repair and anti-entropy. Replicas diverge temporarily; background processes (read repair, hinted handoff, anti-entropy) reconcile. Under partition, stale reads are expected.
- Assuming no failures. Quorum guarantees hold only while enough replicas respond; under failure or partition, consistency weakens. Understand the failure behaviour.
- Confusing it with leader-based replication. A primary/standby set (see [streaming replication](/t/streaming-vs-logical-replication)) has one writer; leaderless has none, with different trade-offs.
- Using it without a reason. Its complexity (quorums, conflicts, eventual consistency) only pays off at the scale and availability needs it targets. For a normal app, a primary with replicas is simpler.

**When to use it:** when you need extremely high write availability and multi-region writes with tunable consistency — large-scale, catalogue/session/event workloads where conflicts are tolerable or handled. It's the architecture behind many [wide-column stores](/t/wide-column-store); choose it for scale and availability, and design the data so conflicts are safe.
