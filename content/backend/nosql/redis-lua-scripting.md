---
title: "Atomic Scripts (Lua in Redis)"
summary: "Running several operations atomically on the server."
levels: { backend: senior, data-engineer: senior }
aliases: ["redis lua", "lua scripting", "atomic script"]
prereqs: ["redis", "atomic-operation"]
related: ["transaction", "idempotence", "redis-data-structures"]
---

Redis lets you send a small **Lua script** that runs *inside* the server, atomically. The script's commands execute as one unit with no other command interleaving, so you can do a read-check-write (maintain an invariant) without a race — something raw `GET`/`SET` pairs from the client can't guarantee.

```lua
-- decrement stock only if available, atomically
if tonumber(redis.call('GET', KEYS[1])) > 0 then
  redis.call('DECR', KEYS[1])
  return 1
end
return 0
```

Without the script, a client would `GET` the stock, decide, then `DECR` — with a race window in between exactly like a [database read-modify-write](/t/read-modify-write). The script removes it.

The classic mistakes:

- Long or blocking scripts. Redis largely runs commands on one thread; a slow Lua script blocks *every* other client. Keep scripts tiny — no big loops, no heavy computation.
- Non-deterministic scripts. Historically scripts had to be deterministic (for replication); calling time/randomness could break replication in older setups. Modern Redis relaxed parts of this, but prefer deterministic scripts.
- Expecting it to replace a database transaction. It gives atomicity within one Redis instance for the commands it runs — not multi-key ACID across a cluster, and not durability unless persistence is configured.
- Ignoring error handling. The script's commands can fail (wrong type, out of range); handle it explicitly rather than assuming success.
- Using it where a built-in command exists. Redis has atomic primitives (`INCR`, `SET NX`, `ZADD`) for many cases; don't script what a single command does.
- Forgetting the Cluster limitation. In a cluster, all keys a script touches must be in the same hash slot; scripts don't span multiple shards.

**When to use it:** for a small, atomic check-and-set on cached data — inventory decrement, token bucket, conditional update — where a client-side sequence would race. It's the server-side equivalent of an [atomic update](/t/atomic-update), the tool that makes waiting Redis operations safe under concurrency. It's related to [transactions](/t/transaction) and [idempotence](/t/idempotence).
