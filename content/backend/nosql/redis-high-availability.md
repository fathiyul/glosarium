---
title: "Redis Sentinel and Cluster"
summary: "Failover and sharding for Redis."
levels: { backend: senior, data-engineer: senior }
aliases: ["redis sentinel", "redis cluster", "redis high availability"]
prereqs: ["redis", "failover"]
related: ["redis-persistence", "sharding", "failover"]
---

Redis can be run as a single node, but for production you usually need **availability** (survive a node dying) and sometimes **scale** (more data than one node's memory). Two mechanisms cover these:

- Replication + Sentinel — you run one primary and one or more replicas, and **Sentinel** processes monitor them and perform **failover**: if the primary dies, Sentinel promotes a replica and updates the clients. The dataset still fits on one node; this is about not going down.
- Redis Cluster — data is sharded across multiple primary nodes (each with replicas), so the dataset can exceed one machine's memory and writes spread across nodes. Clients must be cluster-aware.

```text
Sentinel: primary + replicas → automatic failover (same dataset, no down time)
Cluster:  many shards, each replicated → scale out + failover
```

The classic mistakes:

- Assuming failover loses nothing. Replication is typically asynchronous, so a failover can lose recent writes that hadn't reached the replica. If losing writes is unacceptable, understand the (limited) durability guarantees and design around them.
- Confusing Sentinel with Cluster. Sentinel is for HA of a single dataset; Cluster is for sharding. They solve different problems; you don't need Cluster just to have failover.
- Forgetting cluster key locality. In Cluster, all keys in a multi-key operation (or a Lua script) must be in the same hash slot; cross-slot operations fail. Use hash tags to co-locate related keys.
- Ignoring split-brain risk. A partitioned cluster can briefly have two primaries; configuration and quorum settings matter. Understand the failure behaviour of your setup.
- Skipping Sentinels/cluster-aware clients. Clients must know how to discover the current primary or route to the right shard; a naive client connecting to one address breaks after failover.
- Treating Redis HA as free. More nodes, more operational surface, and configuration subtleties. For a pure cache, a simpler setup may be fine — losing a cache is often tolerable.

How to choose: if Redis is a cache you can rebuild, a single node with maybe a replica is fine. If you need it to stay up, add replication + Sentinel. If your data outgrows one node's memory or needs write scale, use Cluster — accepting its constraints. Either way, pair it with a [persistence](/t/redis-persistence) choice appropriate to the data's importance.
