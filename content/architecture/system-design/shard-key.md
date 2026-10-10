---
title: "Shard Key"
summary: "The field that decides which shard data lives on."
levels: { backend: senior }
aliases: ["shard key", "partition key", "sharding key"]
prereqs: ["sharding", "key-range-vs-hash-partitioning"]
related: ["sharding", "hot-partition", "key-range-vs-hash-partitioning"]
---
The **shard key** decides which shard owns each record — the single highest-leverage choice in a partitioned design. A good key spreads writes evenly, keeps related data together for queries, and supports the access patterns; a bad key concentrates heat, scatters queries, or blocks growth.

```text
good:  user_id (even spread, user's data co-located)
bad:   country (one giant shard), timestamp (all writes to the tail)
```

Choosing means weighing three axes: cardinality (enough distinct values to spread), query affinity (the key queries filter by — co-locate what joins), and growth (keys that stay balanced as data and traffic evolve). Compound keys (tenant + id) often beat single attributes.

The classic mistakes:

- Low-cardinality keys. Sharding by a handful of values (region, plan tier) makes few giant shards. Keys need orders more distinct values than shards.
- Monotonic keys. Timestamps and auto-increments pile all writes on the tail shard. Hash them, suffix them, or choose non-ordered keys for write spread.
- Query-hostile keys. Sharding by user when queries filter by device forces scatter-gather on every read. Key by the query's filter, or accept secondary-index costs knowingly.
- Unchangeable keys. Business meanings drift (users move regions, tenants merge); keys embedding mutable attributes need painful re-sharding. Prefer opaque, stable keys.
- Ignoring the giant. One tenant/outlier dwarfing others needs explicit handling (isolated shard, split keys) — averages lie about the max.
- Compound order wrong. (tenant, id) vs (id, tenant) route differently; leading with the queried dimension enables pruning.
- No re-sharding path. Keys chosen as permanent become permanent mistakes. Design key migration (dual-write, backfill, cutover) before needing it.

**How to choose:** high-cardinality, query-aligned, stable, growth-proof — then verify with real distributions, not averages. The shard key is the partition's destiny; pick it with data, not hope.
