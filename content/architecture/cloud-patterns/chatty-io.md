---
title: "Chatty I/O"
summary: "Many small network or database calls where one bigger one would do."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["chatty I/O", "chatty io", "chatty communication"]
prereqs: ["latency-numbers", "microservices"]
related: ["extraneous-fetching", "batching", "gateway-aggregation"]
---
**Chatty I/O** is death by a thousand round trips: interfaces requiring dozens of sequential calls to accomplish one task — N+1 service calls, per-field fetches, unbatched looped requests. Each call pays full latency (network, serialisation, handling), so chattiness multiplies user-visible delay by the call count, exactly where networks are slowest.

```text
chatty:  50 sequential calls × 20ms = 1000ms (plus failures × 50 chances)
chunky:  1 bulk call = 25ms (one failure domain, one latency)
```

The fix is chunkier interfaces: bulk/batched endpoints, expanded embeds (`?expand=`), GraphQL-style selection, and caching that collapses repeats. Chattiness often hides behind clean-looking abstractions (ORM lazy loading, per-item SDK calls) — measure call counts, not just call elegance.

The classic mistakes:

- N+1 service calls. Loops calling services per item (the distributed N+1) turn linear features into latency disasters. Batch, embed, or join server-side.
- Per-field getters. Fine-grained accessors over the network treat remote objects as local — the original distributed-objects fallacy. Coarse interfaces for remote boundaries.
- Unbatched SDK defaults. Client libraries fetching one-by-one unless configured otherwise make every consumer chatty by default. Batch-friendly APIs with obvious bulk paths.
- Retry multiplication. Chatty paths multiply failure handling too — 50 calls need 50 timeout/retry policies. Fewer calls, fewer failure modes.
- Measuring latency, not count. Optimising single-call speed while counts grow misses the dominant term. Count calls per user action first.
- Caching as the only fix. Caches hide chattiness until invalidation, cold starts or personalised data expose it fully. Fix the shape; cache the remainder.
- Cross-region chatter. Chatty interfaces that feel fine intra-region collapse cross-region (20ms → 200ms per call). Design interfaces for the worst realistic latency, not the datacenter's.

**The rule:** count round trips per user action; minimise the number before optimising the speed. Chunky beats chatty across every network that matters.
