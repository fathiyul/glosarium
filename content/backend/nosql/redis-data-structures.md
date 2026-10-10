---
title: "Redis Data Structures"
summary: "Strings, hashes, lists, sets, sorted sets and streams, and what each is for."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["redis data structures", "redis types", "redis structures"]
prereqs: ["redis", "key-value-store"]
related: ["sorted-set-leaderboard", "redis-persistence", "redis-high-availability", "cache-hit-miss"]
---

The reason [Redis](/t/redis) is more than a cache is that it offers several **built-in data structures**, each with operations that would otherwise be hand-coded. Choosing the right one makes operations that are awkward in a plain key-value store simple and fast.

- String — the basic value: a number, text, or serialized blob. `INCR` for counters, `SET`/`GET` for simple cache values.
- Hash — a map of fields, like a row: `HSET user:1 name alice age 30`. Good for objects you update field by field.
- List — an ordered sequence with push/pop at both ends: queues, recent-items lists, simple stacks.
- Set — unordered unique members: tags, unique visitors; supports union/intersection/difference.
- Sorted set — members ordered by score: leaderboards, priority, rate windows (see [sorted set leaderboard](/t/sorted-set-leaderboard)).
- Stream — an append-only log with consumer groups: a lightweight event stream.

```text
counter  → string (INCR)
object   → hash
queue    → list
tags     → set
ranking  → sorted set
events   → stream
```

The classic mistakes:

- Using a string for everything. Serializing a whole object into one string means read-modify-write to change a field (a race), and no server-side partial operations. A hash lets you update one field.
- Modeling relational data in a cache. If you find yourself joining sets and hashes, you may want a database, not Redis as a primary store, unless you've designed specifically for it (see [access-pattern design](/t/access-pattern-design)).
- Ignoring big keys and big collections. One enormous list or set is expensive to operate on and can block the single-threaded server. Keep collections bounded.
- Forgetting expiry. Unbounded growth is the classic Redis memory problem; set TTLs where data is temporary (see [eviction policy](/t/eviction-policy)).
- Assuming durability by default. Redis is often used as a cache; if you rely on it as a store, configure persistence and understand its guarantees (see [Redis persistence](/t/redis-persistence)).
- Treating it as multi-threaded for CPU work. Much of Redis executes commands on a single thread; a heavy command (a huge sort) blocks everyone.

**How to use it:** pick the structure that matches the operation (counter, object, queue, set, ranking, stream) and lean on the server-side commands rather than reading-modifying-writing client-side. That's what makes Redis fast and convenient — but remember its memory-is-finite, often-single-threaded, cache-oriented nature.
