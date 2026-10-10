---
title: "Write-Through Cache"
summary: "Writing to the cache and the database together."
levels: { backend: senior, data-engineer: senior }
aliases: ["write-through cache", "write through cache", "writethrough cache"]
prereqs: ["cache-hit-miss", "cache-consistency"]
related: ["write-behind-cache", "read-through-cache", "cache-consistency"]
---

A **write-through cache** updates the cache and the database together on every write: the application writes, the cache updates its entry, and the write is persisted to the source — all before the write is considered done. The cache stays **consistent** with the database on the write path, at the cost of doing the database write synchronously.

```text
app writes → cache updated + database written → return (both done)
```

This avoids the classic "cache updated but database stale" or vice versa problems: after a write-through, both hold the new value, so subsequent reads (from cache or database) agree. It's the safer of the write strategies when correctness matters more than write throughput.

The classic mistakes:

- Assuming it's free. Every write pays the database write plus the cache write — slower than write-behind. If throughput is the goal, write-through is the wrong choice (see [write-behind cache](/t/write-behind-cache)).
- Partial failure. If the cache update succeeds but the database write fails (or vice versa), the two disagree. The write must be atomic enough that on failure neither is left updated, or it must be repaired. This is the subtle hard part.
- Forgetting the read path. Write-through keeps the cache fresh on write, but reads still fill on miss; pair it with read-through or cache-aside for the read side (see [read-through cache](/t/read-through-cache)).
- Not handling keys that aren't cached. A write to a value not currently in the cache either populates it or should be skipped; decide, and avoid caching things that aren't read.
- Ignoring expiry. Write-through and TTL coexist; the entry still expires and is reloaded on the next miss. That's fine, but know the freshness window.
- Assuming it solves distributed consistency. With an in-process cache per instance or a CDN in front, write-through to one cache doesn't update the others; you still need the broader invalidation story (see [cache consistency](/t/cache-consistency)).

**When to use it:** when cached data must stay fresh and read-heavy workloads benefit from the cache, but writes aren't so hot that the synchronous database write is a bottleneck — configuration, reference data, moderately-updated records. It's the middle ground: more consistent than write-behind, safer than invalidate-on-write alone. Choose it when correctness beats write throughput.
