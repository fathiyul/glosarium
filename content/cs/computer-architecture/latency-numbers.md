---
title: "Latency Numbers Every Programmer Should Know"
summary: "Rough costs of cache, memory, disk and network access."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["latency numbers", "latency numbers every programmer should know", "cost of memory access"]
prereqs: ["cpu-cache", "ram"]
related: ["cache-locality", "latency", "throughput", "disk-usage"]
---

The famous "latency numbers" are a set of **orders of magnitude** for how long common operations take. The exact figures change with hardware, but the *relative* gaps are stable and they shape almost every performance decision:

- CPU register access — sub-nanosecond, essentially free.
- Cache access — a few nanoseconds; roughly 10–100× slower than a register.
- Main memory (RAM) access — tens of nanoseconds; again much slower than cache.
- SSD read — tens to hundreds of microseconds.
- Disk seek/read — milliseconds for spinning disks.
- Network round trip within a data centre — tens to hundreds of microseconds.
- Network round trip across regions — tens to hundreds of milliseconds.

```text
registers ≪ cache ≪ RAM ≪ SSD ≪ disk ≪ network
   ~0.3ns   ~1-10ns  ~100ns  ~100µs  ~ms    ~ms-100ms   (orders of magnitude)
```

The lesson isn't the exact numbers — treat them as approximate and hardware-dependent — it's the **ratios**. RAM is about a hundred times slower than cache; a network call can be thousands of times slower than a memory read. So a loop that misses cache on every access can be vastly slower than one that stays in cache, and a chatty network design pays for it in every request.

The classic mistakes:

- Quoting the numbers as exact. They date quickly and vary by machine. Use them to reason about ratios, not to predict precise timings.
- Optimising the wrong layer. Shaving nanoseconds off arithmetic while making a network call per item is pointless. Find the dominant cost first (see [latency](/t/latency)).
- Forgetting that remote beats local by orders of magnitude. The biggest wins usually come from avoiding I/O and network round trips — batching, caching, denormalising — not from micro-optimising CPU work.
- Ignoring [cache locality](/t/cache-locality). The cache-vs-RAM gap is why data layout matters so much: sequential access is dramatically faster than scattered access.

Keep the ladder in mind when designing: registers and cache are fast, [RAM](/t/ram) is slower, and disk and network are *orders of magnitude* slower again. Prefer designs that do less of the slow things.
