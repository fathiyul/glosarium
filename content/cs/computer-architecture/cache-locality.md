---
title: "Cache Locality"
summary: "Accessing memory that's close together is much faster."
levels: { backend: senior, frontend: senior }
aliases: ["cache locality", "locality of reference", "cache friendly"]
prereqs: ["cpu-cache", "latency-numbers"]
related: ["ram", "array", "simd", "pipelining"]
---

**Cache locality** is the tendency of a program to access memory that's "near" recently accessed memory, which lets the CPU's caches do their job. Caches work because programs are usually predictable: they reuse the same data soon after (**temporal locality**), and they touch data that's stored adjacent to what they just used (**spatial locality**). A cache-friendly program exploits both; a cache-hostile one defeats the cache and pays RAM latency constantly.

Why layout matters: memory is fetched in whole **cache lines** (typically 64 bytes), not single bytes. Reading one `int` drags in its neighbours. So iterating an array in order uses every byte of each fetched line; jumping around uses a sliver of each line and wastes the rest.

```text
array (contiguous):   [a b c d e f g h]  → one cache line, all used
linked list (scattered): a → ... → b → ...   → a line per node, mostly wasted
```

This is why a contiguous [array](/t/array) often beats a [linked list](/t/linked-list) even when both have the same big-O cost: the array's constant factor is far smaller because it stays in cache.

The classic mistakes:

- Choosing a data structure on asymptotic complexity alone. O(n) over a cache-friendly array can beat O(log n) over a pointer-chasing tree for realistic sizes. Constants matter.
- Scattered access in a hot loop. Pointer-heavy structures, random indexing, and column access on row-major data cause cache misses. Keep the hot loop sequential where you can.
- False sharing. Two threads writing different variables that happen to share a cache line fight over it, slowing both down despite touching "different" data. Pad or separate hot per-thread data.
- Ignoring locality in database and query design. The same principle applies at larger scales: sequential reads and laying data out to match access patterns beat random access.

The [latency ladder](/t/latency-numbers) is why this matters: cache is roughly a hundred times faster than [RAM](/t/ram). Writing code that stays in cache is often a bigger win than any micro-optimisation. It also enables [SIMD](/t/simd) and helps the [pipeline](/t/pipelining) run full.
