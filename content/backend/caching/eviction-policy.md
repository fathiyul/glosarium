---
title: "Eviction Policy"
summary: "LRU, LFU or FIFO: which item to drop when the cache is full."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["eviction policy", "cache eviction", "LRU LFU"]
prereqs: ["cache-hit-miss", "ttl"]
related: ["local-vs-distributed-cache", "ttl", "redis"]
---

A cache is finite, so when it fills, something must be **evicted**. The **eviction policy** is the rule for choosing what to remove, and it determines your hit rate and whether the cache behaves sensibly under pressure.

Common policies:

- LRU (least recently used) — evict what hasn't been accessed for the longest. The default for many caches; good when recent access predicts future access.
- LFU (least frequently used) — evict the least-accessed overall. Favours stable hot items, but can keep stale "formerly popular" entries.
- TTL-based — entries expire after a fixed time regardless of access. Good when freshness matters.
- Random — evict a random entry; surprisingly competitive and cheap under some workloads.
- FIFO — evict the oldest inserted.

```text
full cache, new item arrives → policy picks a victim → evict → insert
```

The classic mistakes:

- Assuming eviction is harmless. Evicted entries are cache misses later, so a poor policy can drop exactly the items you need — e.g. LRU can evict a large reference dataset that's accessed steadily but less frequently than hot keys, causing constant misses.
- No policy at all (unbounded cache). A cache that never evicts grows until it exhausts memory. Always bound the cache and define eviction (see [steady state](/t/steady-state)).
- TTL as the only mechanism. Without eviction, filling the cache with fresh-but-unbounded items still exhausts memory; TTL and capacity limits are complementary.
- Wrong policy for the access pattern. LFU for shifting hotness, LRU for recency, TTL for freshness — match the policy to how access actually behaves, and measure the hit rate.
- Ignoring eviction in distributed caches. A shared cache's memory is finite and shared across callers; one tenant's cold flood can evict everyone's hot data. Monitor and size.
- Forgetting the cost of eviction under write load. Evicting frequently on a write-heavy cache adds overhead; the policy has a cost, not just a benefit.
- Treating it as set-and-forget. Access patterns change; a policy that fit launch may not fit a year later. Revisit the hit rate periodically.

**How to choose it:** LRU is a good general default; TTL when freshness dominates; LFU for stable popularity; often a combination (LRU with TTL). The real test is the **hit rate** under realistic traffic — measure it and adjust. Eviction is what makes a cache a *bounded* accelerator rather than a memory leak; see [cache hit/miss](/t/cache-hit-miss) and [steady state](/t/steady-state).
