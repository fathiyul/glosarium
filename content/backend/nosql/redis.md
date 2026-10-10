---
title: "Redis"
summary: "An in-memory data store used for caching, queues and more."
levels: { backend: junior, data-engineer: junior }
aliases: ["Redis server"]
prereqs: ["key-value-store"]
related: ["key-value-store", "ttl", "cache-hit-miss", "rate-limiting"]
---

Redis is an in-memory data store. It keeps its data in RAM, so reads and writes are very fast. Beyond plain key-value pairs, it supports data structures such as lists, sets, hashes and sorted sets. Teams commonly use it for caches, session storage, counters and simple queues.

```
SET user:42:name "Ada"
GET user:42:name
EXPIRE user:42:name 3600     # remove the key after an hour
INCR page:home:views         # atomic counter
```

These commands are Redis's own syntax. Whether Redis keeps data across a restart depends on its persistence settings (periodic snapshots, an append-only log, or none). Defaults differ between installs and managed services, so check yours rather than assume.

The classic mistake is treating Redis as the only copy of important data without configuring persistence, then losing it in a restart. The other is letting keys grow without limit. Everything lives in memory, so set expiry with [TTL](/t/ttl) where the data is temporary, and watch how much memory the instance uses. Redis is also a common place to keep [cache](/t/cache-hit-miss) entries, but a cache should always be able to rebuild its data from the source.
