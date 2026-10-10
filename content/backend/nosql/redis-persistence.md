---
title: "Redis Persistence (RDB, AOF)"
summary: "Snapshots vs an append-only log for surviving restarts."
levels: { backend: senior, data-engineer: senior }
aliases: ["redis persistence", "RDB", "AOF"]
prereqs: ["redis"]
related: ["redis-high-availability", "cache-hit-miss", "wal"]
---

Redis is memory-first, so by default a restart would lose everything. **Persistence** options let it save to disk, trading performance and complexity for durability. They matter when Redis holds data you can't afford to lose — not when it's purely a cache.

Two mechanisms:

- RDB (point-in-time snapshots) — periodically fork and write a compact snapshot of the whole dataset to a file. Fast to load, small files, but you can lose everything written since the last snapshot.
- AOF (append-only file) — log every write operation; on restart, replay it. More durable (you can `fsync` every second or every write) but the log is larger and replay is slower; it's periodically rewritten/compacted.

```text
RDB:  snapshot every N minutes  → fast load, lose recent writes
AOF:  log every write           → durable, bigger/slower; fsync policy matters
```

You can use both; many deployments do. The `fsync` policy for AOF is the durability knob: `everysec` (up to ~1s of writes lost) is the common balance; `always` is safest and slowest.

The classic mistakes:

- Assuming Redis persists by default. Depending on configuration, it may not — a restart can wipe the data. Check, especially if you're using it as more than a cache.
- Treating it as durable as a database. Even with AOF, losing the last second of writes is normal at `everysec`; for strict durability you need `always` and accept the cost, and even then failover can lose recent writes (see [Redis HA](/t/redis-high-availability)).
- Choosing RDB for a store. RDB's snapshot gaps are fine for a rebuildable cache, unacceptable for authoritative data. Match the mechanism to the role.
- Forgetting fork cost. RDB and AOF rewrite fork the process; on a large dataset, forking causes a memory/copy-on-write spike and possible pauses. Size and schedule accordingly.
- Ignoring disk capacity. The AOF grows until rewritten; a full disk stops persistence. Monitor it.
- Confusing persistence with replication. Persistence protects against restart; replication protects against node failure. They're complementary, not the same.

**How to decide:** if Redis is a cache, you may run with no persistence (rebuild on miss). If it holds data you'd miss, enable AOF (and usually RDB), understand the fsync loss window, and pair it with [replication/HA](/t/redis-high-availability). Its persistence is simpler than a real database's [WAL](/t/wal); treat it as such.
