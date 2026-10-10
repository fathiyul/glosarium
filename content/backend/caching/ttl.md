---
title: "TTL (Time to Live)"
summary: "How long a cached item stays valid."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["time to live", "expiry"]
prereqs: ["cache-hit-miss"]
related: ["cache-hit-miss", "redis", "caching", "http-caching"]
---

A TTL, or time to live, is how long a cached item stays valid before it expires. Once the TTL passes, the cache drops the item, and the next request is a [miss](/t/cache-hit-miss) that goes back to the source.

Redis, for example, takes an expiry in seconds when you set a key:

```
SET product:42 "{...}" EX 300   # expires after 300 seconds
```

The TTL is a trade-off. A longer TTL gives more hits and less load on the source, but the cache may serve old data for longer. A shorter TTL keeps data fresher, but more requests reach the source. Pick the value from how quickly the data changes and how much staleness users will tolerate, not from a default you copied.

The classic mistake is setting one TTL for everything. A product's price and a product's description change at very different rates. Also, a TTL alone doesn't handle changes: if the price is updated, the cache can keep showing the old price until the TTL expires. For those cases, delete or update the cached entry when the source changes.
