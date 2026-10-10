---
title: "Packet"
summary: "A unit of data sent over a network."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["packet", "packets", "network packet"]
prereqs: ["tcp", "osi-model"]
related: ["mtu", "packet-capture", "round-trip-time"]
---

A **packet** is the unit networks actually move: your data chopped into chunks, each wrapped with headers saying where it's from, where it's going, and how to reassemble the stream. TCP segments the byte stream into packets sized for the path; IP routes each independently; the receiver reorders and reassembles.

```text
[ IP header | TCP header | your bytes… ]   ← one packet, ~1500 bytes typical
```

Two consequences shape everything above: packets can be *lost* (dropped by a congested router — TCP retransmits), and their *size* is bounded by the path's MTU (too big means fragmentation or, worse, silent drops when fragmentation is forbidden). "The network" is really "best-effort delivery of individual packets," and every reliability guarantee your app enjoys was built on top.

The classic mistakes:

- Assuming messages arrive whole. TCP is a byte *stream*, not message packets — one send can arrive as several reads, or several sends in one read. Frame your own messages (length prefixes or delimiters).
- Ignoring loss. A 1% packet-loss rate devastates throughput because retransmission and congestion control multiply the cost. "Slow network" is often "lossy network" — measure loss, not just bandwidth.
- Oversized datagrams on UDP. UDP packets past the MTU fragment, and one lost fragment kills the whole datagram. Keep datagrams comfortably under the MTU.
- Forgetting headers cost. Small-payload protocols (tiny IoT messages, chatty RPCs) can spend more bytes on headers than data. Batch or use compact encodings.
- Blaming bandwidth for latency. Throughput and delay are different axes (see [throughput](/t/throughput) and [round-trip time](/t/round-trip-time)). More bandwidth never fixes round trips.
- Never looking at actual packets. When the bug is truly on the wire, `tcpdump`/Wireshark ends speculation in minutes (see [packet capture](/t/packet-capture)).

**The mental model:** everything is packets — lossy, size-limited, individually routed. TCP's stream, TLS's records, HTTP's messages are all constructions above. When abstractions leak, thinking in packets finds the cause.
