---
title: "UDP"
summary: "Fast, connectionless transport with no delivery guarantees."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["udp", "user datagram protocol", "datagrams"]
prereqs: ["packet", "tcp"]
related: ["tcp", "quic", "webrtc"]
---

**UDP** sends independent datagrams: no handshake, no ordering, no retransmission, no congestion control. Each send is one packet (or a few), fire-and-forget. What you lose in guarantees you gain in control and overhead — no setup round trips, no head-of-line blocking between messages, no backoff imposed by the transport.

```text
TCP: handshake → stream → acks → ordered bytes (or failure)
UDP: datagram → maybe arrives → maybe in order (your logic decides)
```

That makes UDP the base for traffic that is loss-tolerant, latency-sensitive, or wants its own reliability: DNS queries, live media, gaming, and modern transports like [QUIC](/t/quic) that rebuild TCP-like guarantees in userspace without TCP's one-size-fits-all behaviour.

The classic mistakes:

- Assuming delivery. UDP datagrams vanish silently under congestion. Anything that must arrive needs application-level acks and retries — you're rebuilding transport features, so budget for it.
- Oversized datagrams. Past the path MTU they fragment, and one lost fragment kills the whole datagram. Keep well under ~1400 bytes or implement fragmentation yourself.
- No congestion control. UDP won't slow down for anyone; an aggressive sender congests the shared network and starves TCP flows. Well-behaved UDP protocols pace themselves.
- Blocking and throttling. Many networks deprioritise or block UDP outright. Test on real paths; have a TCP fallback where it matters.
- Using it for "speed" without measuring. For request/response workloads, the handshake savings are one RTT — often dwarfed by everything else. UDP wins where head-of-line blocking and per-message independence matter, not everywhere.
- Forgetting ordering. Datagrams arrive in any order, duplicated, or not at all. Sequence numbers and dedup are your job.

**When to choose it:** live media, gaming, DNS-style queries, and as a substrate for custom transports. Default to TCP's guarantees; graduate to UDP when you specifically need its properties and can implement the reliability you still require.
