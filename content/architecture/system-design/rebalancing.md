---
title: "Rebalancing"
summary: "Moving data around when shards are added or removed."
levels: { backend: senior }
aliases: ["rebalancing", "resharding", "partition rebalancing"]
prereqs: ["sharding", "consistent-hashing"]
related: ["sharding", "consistent-hashing", "hot-partition"]
---
**Rebalancing** redistributes partitions when membership changes (nodes added/removed) or heat shifts: move shards to new nodes, split hot ranges, drain the decommissioned — without downtime or data loss. Every partitioned system needs it; the only question is whether it's designed operation or emergency surgery.

```text
add node → plan moves (minimal data) → copy → dual-serve → cutover → cleanup
```

Good rebalancing moves minimal data (consistent hashing bounds the blast radius), throttles itself (migration traffic shouldn't starve live traffic), stays reversible (abort cleanly), and progresses observably (per-shard status, ETA). Bad rebalancing is a full reshuffle under load with no abort.

The classic mistakes:

- No rebalancing story. Static partition maps work until growth, failure or skew demands movement — then it's a rewrite under pressure. Design movement from day one.
- Unthrottled migration. Copying terabytes at line rate starves production traffic. Throttle, schedule off-peak, prioritise live traffic.
- Big-bang cutover. Flipping all shards at once maximises blast radius. Move incrementally (one shard, verify, next) with abort points.
- Forgetting client routing. Moved shards need routing updates (config push, discovery, versioned maps); stale clients write to old owners. Version the map; move with two-phase safety.
- Ignoring heat. Rebalancing by size while ignoring hotspots moves the imbalance along. Balance heat, not just bytes.
- No backfill verification. Moved data needs checksums/counts proving completeness; silent partial moves corrupt quietly. Verify every shard.
- Decommissioning dirty nodes. Removed nodes with lingering writes resurrect stale data on rejoin. Fence and wipe before reuse.

**How to run it:** incremental, throttled, verified moves with routing versioned alongside — rebalancing as routine operations, not heroics. Partitioned systems live or die by movement done safely.
