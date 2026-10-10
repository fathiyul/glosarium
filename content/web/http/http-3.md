---
title: "HTTP/3"
summary: "HTTP running over QUIC."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["http/3", "http3", "http over quic"]
prereqs: ["http-2", "quic"]
related: ["quic", "head-of-line-blocking", "tls-handshake"]
---

**HTTP/3** keeps HTTP semantics and re-bases the transport on [QUIC](/t/quic) (UDP-based, encrypted, multiplexed) instead of TCP. Two wins follow: streams are truly independent (a lost packet stalls only its stream — TCP-level [head-of-line blocking](/t/head-of-line-blocking) is gone), and connection setup fuses with TLS 1.3 (often zero round trips on repeat visits, plus connection migration across network changes).

```text
HTTP/2 over TCP:  loss on the connection stalls ALL streams
HTTP/3 over QUIC: loss stalls only the affected stream; handshake ~0-1 RTT
```

Deployment is negotiated (Alt-Svc discovery from an h2/h1 endpoint, then UDP/443), and middleboxes that mishandle UDP are the practical friction — fallback keeps everything working while adoption climbs.

The classic mistakes:

- Assuming universal UDP. Networks that block or throttle UDP silently prevent h3; the Alt-Svc fallback path must be solid, not an afterthought.
- Expecting miracles on clean networks. Loss-free datacenter links gain mostly handshake savings. h3's wins scale with loss and distance — mobile and intercontinental traffic first.
- Ignoring UDP infrastructure. Load balancers, firewalls and observability must handle QUIC; TCP-tuned tooling (some packet inspection, naive rate limits) misbehaves.
- Tuning 0-RTT carelessly. Replayable early data is safe only for idempotent requests; enabling 0-RTT for mutations invites replay attacks.
- Forgetting it's still congestion-controlled. QUIC paces itself like TCP; "UDP-based" doesn't mean unthrottled. Capacity planning assumptions carry over.
- Measuring only the happy path. h3's value shows in tail latency under loss — benchmark with realistic loss, not just clean-room throughput.

**When it matters:** lossy and mobile networks, global audiences, latency-sensitive traffic. Enable where the edge supports it (usually a toggle), keep fallbacks healthy, and measure tails — that's where QUIC earns its keep.
