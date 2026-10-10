---
title: "TCP"
summary: "Reliable, ordered, connection-based transport."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["tcp", "transmission control protocol", "tcp/ip"]
prereqs: ["packet", "osi-model"]
related: ["tcp-handshake", "udp", "round-trip-time"]
---

**TCP** takes IP's best-effort packets and gives your application a reliable, ordered byte stream. It numbers every byte, acknowledges receipt, retransmits what's lost, reorders what arrives out of order, and paces sending to what the network and receiver can handle (congestion and flow control). Nearly everything you depend on — HTTP, databases, SSH — rides on it.

```text
app writes bytes → TCP segments, numbers, sends → acks, retransmits, reorders
→ app reads the same bytes, in order, complete (or the connection fails loudly)
```

The price of those guarantees: setup (the handshake), head-of-line blocking within a connection (one lost packet stalls everything behind it), and caution after loss (congestion control slows down). That cost profile is why latency-sensitive or loss-tolerant traffic sometimes chooses [UDP](/t/udp) instead.

The classic mistakes:

- Treating it as messages. TCP delivers a *stream* — no boundaries. One write can arrive as many reads and vice versa. Frame messages at your layer.
- Ignoring the handshake cost. Every fresh connection pays round trips before data flows. Reuse connections; don't open one per tiny request.
- Holding connections open forever "for speed." Idle connections consume state on both ends and on every middlebox; they also go stale. Reuse with timeouts, not forever.
- Blaming TCP for app slowness. Retransmissions from a lossy path look like a slow server. Check loss and RTT before rewriting the app.
- Disabling congestion control workarounds blindly. Tuning buffers and windows helps in specific cases (long fat pipes) and hurts generally. Measure first.
- Forgetting it amplifies loss. One percent packet loss doesn't mean one percent slower — retransmission plus congestion backoff can collapse throughput. Fix loss; don't out-bandwidth it.

**The bargain:** TCP trades some latency and setup for "bytes arrive complete and in order." Understand what it guarantees (reliability, order) and what it doesn't (message framing, timing), and most socket mysteries dissolve.
