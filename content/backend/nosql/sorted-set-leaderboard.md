---
title: "Leaderboards with Sorted Sets"
summary: "Ranking scores in real time with Redis sorted sets."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["sorted set leaderboard", "leaderboard", "redis leaderboard"]
prereqs: ["redis", "redis-data-structures"]
related: ["redis-data-structures", "cache-hit-miss"]
---

A **sorted set** is the data structure that makes leaderboards easy: it stores members with a numeric score and keeps them ordered by that score, so ranking, range queries and score updates are all fast (logarithmic). In [Redis](/t/redis), `ZADD` inserts or updates, `ZINCRBY` bumps a score, and `ZREVRANGE` returns the top N — a leaderboard in a few commands.

```text
ZINCRBY leaderboard 10 alice     # alice += 10 points
ZREVRANGE leaderboard 0 9        # top 10
ZREVRANK leaderboard bob         # bob's rank
```

Why it fits so well: a leaderboard is "members ordered by score", which is exactly what a sorted set is. There's no need to sort a big table on every request; the order is maintained as scores change. This scales to millions of members while keeping reads fast.

The classic mistakes:

- Sorting in the application on every read. Pulling all scores and sorting in code is O(n log n) per request and doesn't scale. Let the sorted set maintain the order.
- Fighting ties. Equal scores need a deterministic tiebreak (often the member string, which Redis uses) or the ranking looks unstable. Define the tiebreak rule and be aware of it.
- Ranking the wrong scope. Global, per-region, weekly-reset and per-friend leaderboards are different keys. Decide the scope (and the reset) deliberately.
- Forgetting persistence. A leaderboard in an in-memory cache can be lost on restart unless the store persists. If it's authoritative, arrange durability (see [Redis persistence](/t/redis-persistence)).
- Reading one rank at a time for large pages. Deep pagination via repeated rank lookups is inefficient; use range commands. Very deep ranks are inherently more expensive — consider approximate/segmented views.
- Assuming a cache is a database. If the leaderboard is derived, a cache is fine; if it's the source of truth for scores, treat it with database-grade care.

**When to use it:** whenever you need fast, live ordering by a score — leaderboards, trending, priority queues, rate-limit windows. It's a specific tool that turns a notoriously awkward operation (ranking) into a few fast commands; a relational table can do it, but usually with more work per query. See [Redis data structures](/t/redis-data-structures).
