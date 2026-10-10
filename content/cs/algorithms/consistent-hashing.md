---
title: "Consistent Hashing"
summary: "Hashing that moves only a few keys when servers are added or removed."
levels: { backend: senior, data-engineer: senior }
also: [system-design, caching]
aliases: ["consistent hashing", "hash ring", "consistent hash"]
prereqs: ["hash-function", "sharding"]
related: ["hash-collision", "redis"]
---

**Consistent hashing** distributes keys across a changing set of servers so that adding or removing a server moves only a small fraction of keys — instead of nearly all of them. It's the fix for a nasty property of naive hashing: with `server = hash(key) % N`, changing N (adding or losing a server) remaps almost every key, which for a cache means a mass eviction and a thundering herd on the database.

The idea is a **hash ring**: hash both servers and keys onto a circle. Each key belongs to the first server clockwise from it. Adding or removing a server only reassigns the keys in that server's arc — roughly 1/N of them, not everything.

```text
ring:  ... server A ... server B ... server C ... (back to A)
key K → first server clockwise from hash(K)
add server D → only keys between C and D move to D
```

To keep the load even, each server is typically placed at many points on the ring (**virtual nodes**), so no single server owns an unfairly large arc.

It's used in distributed caches, sharded databases, and load balancers where membership changes: Cassandra, Dynamo-style stores, and many caching layers rely on it. The same principle (minimise reshuffling when the set of owners changes) drives rendezvous hashing and related schemes.

The classic mistakes:

- Using simple modulo hashing for a dynamic server set. It works only while the server count is fixed; the moment it changes, everything remaps. That's the problem consistent hashing exists to solve.
- Ignoring virtual nodes. With one point per server, the arcs can be very uneven and one node gets overloaded. Virtual nodes smooth the distribution.
- Assuming perfect balance. Even with virtual nodes, distribution is statistical, not exact; hot keys still concentrate load. Watch for skew.
- Confusing it with general load balancing. It's about *stable key-to-owner mapping*, not per-request balancing. A load balancer spreads requests; consistent hashing decides which node owns a key.
- Forgetting replica placement. Real systems place each key on several adjacent servers on the ring for redundancy, which needs thought about failure handling.

Consistent hashing is a small, powerful idea for distributed systems: map keys and servers onto a ring so membership changes are cheap. It's a staple of [caching](/t/redis) and [sharding](/t/sharding) designs, and a common question in system design because it solves the "everything breaks when a node leaves" problem directly.
