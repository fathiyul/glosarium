---
title: "Stale-While-Revalidate"
summary: "Showing cached data immediately while fetching fresh data in the background."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["stale-while-revalidate", "swr", "swr pattern"]
prereqs: ["cache-control", "client-cache-invalidation"]
related: ["cache-control", "client-cache-invalidation", "incremental-static-regeneration"]
---

**Stale-while-revalidate (SWR)** serves cached data *immediately* (even if stale) while revalidating in the background, then swaps in fresh data. Users never wait on the network for repeat views; freshness converges without blocking. HTTP's `stale-while-revalidate` directive and client libraries (SWR, React Query) implement the same idea at different layers.

```text
request → serve cached (instant) → revalidate in background → update
first visit: fetch (nothing cached) → cache → subsequent visits instant
```

It inverts the loading-state economy: instead of spinners on every navigation, the UI shows last-known-good instantly and freshens silently — with deduping (one in-flight request per key), focus revalidation, and retry built into good implementations.

The classic mistakes:

- SWR for must-be-fresh data. Balances, permissions, and prices shown stale mislead. Classify data by freshness tolerance; SWR suits tolerant content, not authoritative figures.
- No revalidation triggers. Cache without refetch-on-mount/focus/reconnect goes stale permanently. Configure triggers (mount, focus, interval, mutation invalidation).
- Flash-of-stale confusion. Silently swapping values under the user's eyes confuses (prices changing mid-read). Indicate freshness or update discreetly.
- First-visit experience ignored. SWR only helps repeat views; first paint still fetches. Pair with SSR/prefetch so first visits aren't empty.
- Unbounded cache growth. Per-key caches without eviction accumulate. Scope keys, expire sensibly, garbage-collect unused.
- Error states swallowed. Background revalidation failing silently leaves stale data presented as fresh. Surface staleness and errors honestly.
- Mutations bypassing it. Writes that don't invalidate SWR keys leave the cache permanently behind. Wire mutations to invalidation (see [client cache invalidation](/t/client-cache-invalidation)).

**When to use it:** repeat-view-heavy UIs with freshness-tolerant data — feeds, dashboards, catalogues. Instant repeat visits with background convergence is the best latency trick that isn't cheating.
