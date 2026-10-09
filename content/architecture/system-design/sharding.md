---
title: "Sharding"
summary: "Splitting data across databases by key."
levels: { backend: senior, data-engineer: mid-level }
aliases: ["database sharding", "horizontal partitioning", "shards", "shard", "data sharding"]
prereqs: ["partitioning", "database-replication"]
related: ["shard-key", "hot-partition", "rebalancing", "partitioning", "consistent-hashing", "horizontal-scaling", "distributed-sql"]
core: [backend]
also: [database-operations]
---

**Sharding** splits a dataset across **multiple independent databases (shards)**, each holding a **subset of the data**, so that no single machine has to store everything or handle all the traffic. It's the main way to scale **writes and data size** beyond one server. (Replicas scale reads, sharding scales writes and storage.)

```
user_id → shard function
 shard 0: users A (ids hash to 0)      shard 1: users B      shard 2: users C
 each shard: its own server(s), its own storage, its own slice of the data
```

## Choosing a shard key and strategy

The **[shard key](/t/shard-key)** (such as `user_id` or `tenant_id`) decides where each row lives. Common strategies:

| Strategy | How | Pros | Cons |
|---|---|---|---|
| **Range** | Key ranges per shard (ids 1-1M, 1M-2M) | Range queries are efficient | Hot spots (newest range gets all writes) |
| **Hash** | `hash(key) % N` or consistent hashing | Even distribution | Range queries scatter, and resharding is harder ([consistent hashing](/t/consistent-hashing)) |
| **Directory / lookup** | A mapping table says which shard holds each key | Flexible, easy to move data | The directory is a critical component |
| **Geographic / tenant-based** | Whole tenants or regions per shard | Data locality, isolation | Uneven sizes |

A good shard key spreads **data and traffic evenly**, and keeps **most queries on a single shard**.

## What gets harder

- **Cross-shard queries and joins** are slow, complex or unsupported. You design so common queries include the shard key.
- **Transactions across shards** need distributed coordination, or you avoid them ([distributed transactions](/t/distributed-transaction), [sagas](/t/saga-pattern)).
- **Unique constraints and auto-increment IDs** can't rely on a single database ([distributed ID generation](/t/distributed-id-generation)).
- **Hot shards**: one celebrity user or tenant overloads a shard ([hot partitions](/t/hot-partition)).
- **Rebalancing and resharding**: adding shards means moving data while serving traffic, which is operationally difficult ([rebalancing](/t/rebalancing)).
- **Operational complexity**: backups, schema migrations, monitoring and failure handling for many databases.
- **Application complexity**: routing logic, shard-aware code (or a proxy or middleware that hides it).

## Alternatives to try first

Sharding is costly and mostly irreversible. Before it, exhaust:

- Better indexes and query tuning ([query optimization](/t/query-optimization)).
- Caching ([caching](/t/caching)) and read replicas ([read replicas](/t/read-replica)).
- Vertical scaling (a bigger machine goes a long way).
- Archiving old data, and table [partitioning](/t/partitioning) within one database.
- A managed or [distributed SQL](/t/distributed-sql) database that shards for you.

When you do shard, pick the key very carefully, since changing it later means migrating all the data.
