---
title: "Back-of-the-Envelope Estimation"
summary: "Rough math for traffic, storage and bandwidth."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["back of the envelope", "BOTE", "capacity estimation", "napkin math", "back-of-the-envelope calculation"]
prereqs: ["latency-numbers", "scalability"]
related: ["latency-numbers", "scalability", "system-design", "horizontal-scaling", "design-url-shortener", "read-heavy-vs-write-heavy"]
core: [backend, data-engineer]
---

**Back-of-the-envelope estimation** is rough math to **size a system before building it**: how many requests per second, how much storage, how much bandwidth, how many servers. It's not about precision. It's about getting the **order of magnitude** right, to choose sensible designs and spot impossible ones. It's a core skill for system design and for interviews.

## Numbers worth memorizing

- **Seconds per day**: about 86,400, round to **~10⁵**.
- **1 million requests per day ≈ 12 requests per second** (1,000,000 / 86,400). 100 M/day ≈ 1,200/s.
- **Peak traffic** is often 2 to 10 times the average. Plan for peak.
- **Powers of two**: 2¹⁰ ≈ 1 thousand (KB), 2²⁰ ≈ 1 million (MB), 2³⁰ ≈ 1 billion (GB), 2⁴⁰ ≈ 1 trillion (TB).
- **Latency orders of magnitude**: memory access is ~100 ns, SSD read ~100 µs, a round trip inside a data center ~0.5 ms, a cross-continent round trip ~100+ ms ([latency numbers](/t/latency-numbers)). Disk and network are orders of magnitude slower than memory.

## A worked example: a photo-sharing app

Assumptions (state them out loud, and write them down):

- 10 million daily active users, each views ~50 photos and uploads 0.2 photos a day.
- Average photo: 2 MB.

```
Uploads/day      = 10M × 0.2            = 2M photos/day
Upload rate      = 2M / 86,400          ≈ 23 per second  (peak ×5 → ~120/s)
Storage/day      = 2M × 2 MB            = 4 TB/day  → ~1.5 PB/year (before replication/compression)
Reads/day        = 10M × 50             = 500M/day → ~5,800/s (peak ×3 → ~17,000/s)
Read bandwidth   = 5,800 × 2 MB         ≈ 11.6 GB/s → clearly needs a CDN, plus resized thumbnails
```

Conclusions follow quickly: reads dominate writes by ~250×, so **cache and CDN aggressively** ([read-heavy vs write-heavy](/t/read-heavy-vs-write-heavy)). Storage grows by petabytes, so use **object storage**, not a database. The write rate (~120/s at peak) is modest for one database, so the metadata store isn't the bottleneck.

## Method

1. **Clarify the requirements and the scale**: users, actions, data sizes ([clarifying requirements](/t/clarifying-requirements)).
2. **State assumptions** explicitly. They're often more important than the arithmetic, and the interviewer or your team can correct them.
3. **Round aggressively** (use 10⁵ for seconds per day, 1 KB for 1,000 bytes). Keep units visible.
4. **Compute**: requests per second, storage over time, bandwidth, memory for a cache (cache the hot 20% of data?), number of servers (requests per second ÷ per-server capacity).
5. **Sanity-check** against known limits: can one database do this write rate? Does the bandwidth fit a network card? Does it fit in memory?
6. **Use the result to decide**: do you need sharding, a cache, a queue, a CDN?

## Habits

- **Don't pretend to precision.** "About 5 thousand a second" is the right answer, not 5,787.04.
- **Watch for factors of 1,000** and unit mix-ups (bits vs bytes, MB vs MiB).
- **Include replication** (storage × 3, say), indexes and overhead.
- **Think about peaks, growth and failure** (what if one region is down?).
- In real work, **replace estimates with measurements** as soon as you have them.

It's cheap, takes five minutes and prevents designing a system for a thousand times too much, or too little, load.
