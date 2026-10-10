---
title: "Round-Trip Time (RTT)"
summary: "The time for a message to go out and a reply to come back."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["round-trip time", "rtt", "latency"]
prereqs: ["packet", "tcp"]
related: ["throughput", "connection-pooling", "cdn"]
---

**Round-trip time** is how long a packet takes to reach its destination and come back. It's the atomic unit of network latency: every handshake, every request, every acknowledgement costs round trips, and no amount of bandwidth reduces them. Light in fibre sets the floor (~1ms per 200km round trip); geography sets the rest.

```text
same datacenter:  <1 ms      same continent:  20–60 ms
cross-ocean:      100–200 ms  (physics, not pessimism)
```

Why it dominates performance: a TLS handshake costs 1–2 RTTs, an HTTP request another, a chatty API with five sequential calls costs five — so a page making 20 sequential round trips over a 150ms link spends 3 seconds *in transit alone*. Latency budgets are spent in round trips, which is why protocols multiplex (HTTP/2, QUIC), connections persist (keep-alive), and content moves closer ([CDN](/t/cdn)).

The classic mistakes:

- Buying bandwidth to fix latency. A fatter pipe doesn't shorten the distance. Sequential round trips are the usual culprit — parallelise, pipeline, or eliminate them.
- Chatty protocols over long links. Anything requiring many back-and-forths (NDB-style `SELECT` in a loop, unbatched RPCs) collapses across oceans. Batch and coarsen.
- Measuring from next door. Testing from the office datacenter hides the RTT your actual users pay. Measure from where users are (see [real user monitoring](/t/real-user-monitoring)).
- Ignoring handshake multiplication. Fresh connection + TLS + request = ~4 RTTs before data. Reuse connections and sessions to stop repaying it.
- Confusing ping with application latency. ICMP RTT is the floor; the app adds TLS, server time and transfer. Budget all of it.
- Treating all users' RTT as equal. A global audience spans an order of magnitude in RTT. Design (edge caching, fewer sequential calls) for the far users, not the near ones.

**The rule:** count the round trips your flow needs, multiply by your users' RTT, and that — before any server work — is your latency floor. Reduce the count first; shorten the distance second.
