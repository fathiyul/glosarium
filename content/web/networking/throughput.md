---
title: "Throughput"
summary: "How much work or data gets through per unit of time."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["throughput", "bandwidth", "bandwidth vs throughput"]
prereqs: ["packet", "round-trip-time"]
related: ["round-trip-time", "compression", "cdn"]
---

**Throughput** is the rate data actually moves — bits per second achieved — while bandwidth is the capacity of the link. People conflate them constantly, and worse, conflate both with *speed* (how fast any one interaction feels). A gigabit link doesn't make a chatty protocol fast; it just moves big transfers quickly once they start.

```text
bandwidth:   the pipe's width (capacity)
throughput:  what you actually get (limited by loss, RTT, protocol chatter)
latency:     how long one interaction takes (round trips × RTT)
```

Throughput is capped by the slowest of: link capacity, packet loss (TCP backoff punishes loss brutally), round-trip count for the transfer (handshakes, request/response turns), and either endpoint's processing. Small files over long links are latency-bound; only large sustained transfers are bandwidth-bound.

The classic mistakes:

- Upgrading bandwidth to fix latency. Interactive slowness from round trips doesn't budge with a fatter pipe. Count round trips first.
- Measuring with one big file. A speed test shows capacity, not what your API's hundred tiny requests experience. Measure with representative traffic.
- Ignoring loss. Even 1% loss can halve TCP throughput via congestion control. Throughput problems are often loss problems.
- Uncompressed or unbatched transfers. Sending verbose JSON per record wastes the throughput you have; [compression](/t/compression) and batching multiply effective throughput for free.
- Single-connection limits. One TCP connection ramps slowly (slow start) and stalls on loss; parallel connections or modern transports raise sustained throughput.
- Forgetting the endpoints. Disk, TLS, serialisation and application logic all cap throughput before the network does. Profile end to end.
- Quoting bits vs bytes. Link speeds are bits; file sizes are bytes. An 8× "discrepancy" is just units.

**The discipline:** latency is round trips × RTT; throughput is the minimum of capacity, loss-limited rate, and endpoint speed. Optimise the binding constraint — usually round trips for interactive use, and transfer efficiency for bulk.
