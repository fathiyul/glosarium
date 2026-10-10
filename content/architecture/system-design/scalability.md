---
title: "Scalability"
summary: "Handling more load by adding resources."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["scalability", "scaling", "scale out"]
prereqs: ["load-balancer", "stateless-service"]
related: ["autoscaling", "sharding", "universal-scalability-law"]
---
**Scalability** is the ability to handle growing load by adding resources — ideally linearly: twice the machines, twice the throughput. The two directions differ fundamentally: scaling *up* (bigger box — simple, bounded, often cheapest first) versus scaling *out* (more boxes — unbounded in theory, demanding statelessness, partitionable data and shared-nothing coordination).

```text
up:   bigger machine (simple; hits a ceiling)
out:  more machines (needs stateless app + splittable data + coordination)
```

True scale-out rests on three legs: stateless application tiers (any request, any server), data that partitions (see [sharding](/t/sharding)), and coordination that doesn't centralise (discovery, config, locks that scale). Miss one and growth stalls at its ceiling — usually the database or a shared mutable dependency.

The classic mistakes:

- Stateful app tier. Sessions pinned to servers make new capacity useless for existing users and failover lossy. Externalise session state first.
- Unpartitionable data. A single writable database caps the whole system regardless of app replicas. Partition early enough that migration stays feasible.
- Shared choke points. A central lock service, single queue or synchronous fan-in that all requests traverse becomes the ceiling. Distribute coordination or remove it from hot paths.
- Linearity assumed. Contention and coordination costs make real scaling sublinear (see [Universal Scalability Law](/t/universal-scalability-law)); plan headroom, don't extrapolate hope.
- Scaling before measuring. Adding boxes to a slow-query problem wastes money; the bottleneck (CPU? I/O? locks?) decides what scaling helps.
- autoscaling as architecture. Reactive instance counts don't fix stateful design — they just vary the number of broken replicas. Design stateless first; autoscale second.

**How to build it:** stateless tiers, partitionable data, distributed coordination, measured bottlenecks — then scale out deliberately. Scalability is a property of boundaries, not of machine counts.
