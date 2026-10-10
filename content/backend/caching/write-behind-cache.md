---
title: "Write-Behind Cache"
summary: "Writing to the cache now and to the database later."
levels: { backend: senior, data-engineer: senior }
aliases: ["write-behind cache", "write back cache", "writeback cache"]
prereqs: ["cache-hit-miss", "write-through-cache"]
related: ["cache-consistency", "eventual-consistency", "redis", "write-through-cache"]
---

A **write-behind cache** (write-back) accepts writes into the cache immediately and flushes them to the database **asynchronously** in the background. The application write is fast (in-memory), and the database is updated later, often in batches.

```text
app writes → cache (fast) → ... later, batch flush → database
```

It's used for high write throughput and to absorb bursts: counters, view counts, metrics, session updates — data where a brief delay before persistence is acceptable and where batching many small writes into fewer database writes is a big win.

The costs are significant:

- Potential data loss. Between the cache write and the database flush, the data exists only in the cache. If the cache fails, that data is gone. You're trading durability for throughput.
- Eventual consistency and staleness. Other readers of the database (or other services) don't see the write until the flush. Anything reading the source directly sees old values.
- Complexity. You must handle flush failures, ordering, batching, and recovery — reimplementing pieces of a database's write path.

The classic mistakes:

- Using it for data you can't lose. Orders, payments, anything financial — if the cache dies before flush, it's lost. Keep durable writes synchronous to the database; use write-behind only for loss-tolerant data.
- Ignoring flush failure. If the background flush fails, the update must be retried or the data reconciled; a silent failure loses writes. Track failures and alert.
- Forgetting that readers see stale data. A read that hits the database (cache miss, another service) won't see the pending write. This can produce confusing inconsistencies.
- No ordering/batching discipline. Concurrent updates to the same key need correct ordering; large batches must be flushed before they grow unbounded (see [steady state](/t/steady-state)).
- Confusing it with write-through. Write-through writes to cache and database together (durable, slower); write-behind defers the database write (fast, riskier). Don't pick the wrong one (see [write-through cache](/t/write-through-cache)).
- Assuming the cache is durable. A write-behind cache needs its own persistence/HA to reduce loss risk, which adds back some of the cost you were avoiding (see [Redis persistence](/t/redis-persistence)).

**When to use it:** for high-volume, loss-tolerant writes where batching and speed matter — counters, analytics events, ephemeral state. Combine with periodic flush and reconciliation so the source catches up. For anything that must not be lost, write through to the database synchronously instead; the throughput gain isn't worth the risk. See [cache consistency](/t/cache-consistency).
