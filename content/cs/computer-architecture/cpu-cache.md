---
title: "CPU Cache"
summary: "Small, very fast memory close to the CPU (L1, L2, L3)."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["cache memory", "L1 cache", "L2 cache", "L3 cache"]
prereqs: ["stack-vs-heap"]
related: ["stack-vs-heap", "pointer", "memory-leak", "garbage-collection"]
---

A CPU cache is a small, very fast memory close to the processor, organized in levels usually called L1, L2 and L3. The processor checks the nearest cache first, and only goes further out to slower memory when the data isn't there. Each step outward is larger and slower, which is why the hierarchy exists.

The practical effect is that access patterns matter. Reading memory in order, so that each access lands near the previous one, keeps data in cache, while jumping around the heap often misses it.

```
registers  <  L1 cache  <  L2 cache  <  L3 cache  <  main memory
(fastest and smallest)                           (slowest and largest)
```

The gap between the fastest and slowest levels is large, measured in orders of magnitude rather than small factors, so a cache miss can cost far more than the work that surrounded it.

The trade-off is that caches are managed by hardware, so programs can't address them directly. The main lever is data layout: storing values in contiguous arrays usually beats storing them as scattered objects linked by pointers, because the arrays fill the cache with useful neighbours.

The classic mistake is writing code that looks fast on paper, such as a linked list traversal, and is slow in practice because each node is a cache miss. The arrangement of the data in memory often matters more than the algorithm's operation count for large inputs. Measure with a [profiler](/t/profiler) before optimizing for cache effects. The heap and stack layout behind this is covered in [stack vs heap](/t/stack-vs-heap).
