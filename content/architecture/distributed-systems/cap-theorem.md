---
title: "CAP Theorem"
summary: "During a network partition, you must choose consistency or availability."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["CAP", "Brewer's theorem", "consistency availability partition tolerance", "CAP trade-off"]
prereqs: ["database-replication", "eventual-consistency"]
related: ["eventual-consistency", "linearizability", "pacelc", "consistency-models", "strong-consistency", "network-partition"]
core: [backend]
---

The **CAP theorem** says that when a distributed data store suffers a **network partition** (nodes can't talk to each other), it must choose between **Consistency** and **Availability**. It can't have both during the partition.

- **Consistency (C)**: every read sees the most recent write, as if there were a single copy (the technical term is [linearizability](/t/linearizability)).
- **Availability (A)**: every request to a working node gets a (non-error) response.
- **Partition tolerance (P)**: the system keeps working despite messages between nodes being lost or delayed.

## The right way to read it

You often hear "pick two of three". That's misleading. **Network partitions will happen** ([network partitions](/t/network-partition)), so P isn't optional in a distributed system. The real choice is what to do **when a partition occurs**:

| Choice | During a partition... | Example behavior |
|---|---|---|
| **CP** (consistency over availability) | Refuse some requests (errors or timeouts) rather than risk returning stale or conflicting data | A bank ledger or a coordination service: better unavailable than wrong |
| **AP** (availability over consistency) | Keep answering, possibly with stale data, and reconcile later | A shopping cart, a social feed, DNS: better stale than down ([eventual consistency](/t/eventual-consistency)) |

```
Two data centers lose connectivity:
 CP: the minority side stops accepting writes (unavailable there), data stays consistent.
 AP: both sides keep accepting writes (available), data diverges and must be merged later.
```

## Common misunderstandings

- **It doesn't say a system is "CP" or "AP" at all times.** The trade-off applies *during* a partition. When the network is healthy, you can have both.
- **"Consistency" in CAP isn't the "C" in ACID.** CAP's C means all nodes agree on the latest value. ACID's C means constraints hold.
- **It's about distributed systems.** A single-node database isn't subject to it.
- **Real systems are nuanced**: tunable consistency per operation, different guarantees in different modes. A product label like "CP database" is a simplification.
- **Latency matters even without partitions**: the **[PACELC](/t/pacelc)** extension adds that, even when there's no partition, there's a trade-off between latency and consistency.

## How to use it

When designing or choosing a data store, ask: **what should happen when parts of the system can't talk to each other**, and what does the business tolerate: errors, or stale or conflicting data? See [consistency models](/t/consistency-models) and [strong consistency](/t/strong-consistency).
