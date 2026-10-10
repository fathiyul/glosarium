---
title: "TCP Three-Way Handshake"
summary: "SYN, SYN-ACK, ACK: how a TCP connection starts."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["tcp handshake", "three-way handshake", "syn syn-ack ack"]
prereqs: ["tcp", "packet"]
related: ["tls-handshake", "round-trip-time", "connection-pooling"]
---

Before any data flows, TCP endpoints agree they're talking and synchronise numbering with three packets: **SYN** ("I'd like to connect, starting at sequence X"), **SYN-ACK** ("acknowledged; I start at Y"), **ACK** ("acknowledged"). Only then does the connection exist.

```text
client ──SYN──▶ server
client ◀──SYN-ACK── server
client ──ACK──▶ server     (connected; ~1 RTT elapsed)
```

That one round trip is the minimum connection tax — TLS adds more on top — and it explains half of latency engineering: keep-alive, pooling, session resumption and edge termination all exist to avoid repaying it. It also explains the failure modes: a SYN with no reply means filtered or down; a SYN-ACK with RST means nothing listening.

The classic mistakes:

- Paying it per request. Fresh connections for every tiny call multiply the handshake tax. Reuse connections on hot paths.
- Misreading the states. `SYN-SENT` stuck means your SYN goes unanswered (firewall, blackhole, wrong address). `SYN-RECEIVED` piling on the server means the final ACK never arrives (client-side or asymmetric-route trouble).
- Confusing it with TLS. The TCP handshake establishes the stream; the [TLS handshake](/t/tls-handshake) then secures it. "Connected but handshake failing" needs you to know which one.
- SYN floods. The handshake's asymmetry (cheap to start, stateful to receive) is exploitable — servers use SYN cookies and rate limiting. If you're tuning, that's the threat model.
- Forgetting teardown exists. Connections also close (FIN/ACK), and sloppy close leaves TIME-WAIT and CLOSE-WAIT piles. Open *and* close cleanly.
- Assuming one RTT always. Loss during the handshake multiplies it; distant or lossy paths make connection setup the dominant cost — another argument for reuse.

**Why it matters:** one RTT, three packets, and the foundation every connection stands on. Whenever "first request is slow" or "can't connect" appears, the handshake is where the story starts.
