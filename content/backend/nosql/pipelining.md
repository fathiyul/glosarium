---
title: "Pipelining"
summary: "Sending many commands without waiting for each reply."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["pipelining", "command pipelining", "batch commands"]
prereqs: ["redis", "latency"]
related: ["connection-pooling", "redis-data-structures", "database-cursor"]
---

**Pipelining** sends a batch of commands to a server without waiting for each reply before sending the next. The replies come back together, so the **round trips** collapse from one per command to one per batch. It's a large win whenever the network latency dwarfs the server's processing time.

```text
no pipeline: send → wait → send → wait → send → wait   (3 round trips)
pipelined:   send send send → (all replies at once)      (1 round trip)
```

The classic case is [Redis](/t/redis): 1,000 `GET`s without pipelining means 1,000 network waits; pipelined, they're one round trip and the client just reads back 1,000 replies. The same idea applies to most client/server protocols.

The classic mistakes:

- Confusing pipelining with a transaction. Pipelining batches *sending*; it doesn't make the commands atomic or ordered as a unit. Other clients' commands can interleave unless the server groups them (e.g. Redis `MULTI`/`EXEC` or a Lua script). Pipelining is about latency, not atomicity.
- Batching too much. A huge pipeline holds all the replies in memory and can delay other clients; a giant `KEYS *`-style batch can also block the server. Chunk large batches.
- Expecting it to help on a fast local connection. If round-trip time is already tiny, pipelining's gain is small; it pays off when latency is the bottleneck.
- Ignoring errors mid-batch. Each command's reply still needs checking; pipelines don't fail as a whole. Read every reply, not just the last.
- Using it to hide an N+1. Pipelining 1,000 individual lookups is better than 1,000 round trips but still more work than one batched query. Sometimes a bulk operation is the real fix.

**When to use it:** for many small commands over a network where latency dominates — cache warmups, bulk reads, populating a set. It's a straightforward, high-value optimisation for client/server databases and caches. Pair it with [connection pooling](/t/connection-pooling) for efficient connection reuse, and remember it trades latency, not atomicity.
