---
title: "HTTP/2"
summary: "Binary framing and many requests multiplexed over one connection."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["http/2", "http2", "http 2"]
prereqs: ["http-1-1", "tls"]
related: ["http-3", "head-of-line-blocking", "server-sent-events"]
---

**HTTP/2** keeps HTTP/1.1's semantics (methods, headers, statuses) and replaces the transport: one TCP connection carries many concurrent *streams*, multiplexed as binary frames, with header compression (HPACK) and server push (now largely abandoned). The payoff is killing 1.1's workarounds — no more six-connections-per-origin hacks, no head-of-line blocking *between* requests at the HTTP layer.

```text
HTTP/1.1:  conn1: req→resp→req→resp   conn2: …
HTTP/2:    conn:  [stream1][stream2][stream3] interleaved
```

In practice it runs over TLS almost everywhere (browsers require it), negotiated via ALPN. Performance wins are real but conditional: multiplexing shines with many small resources over long links; a single huge download gains little.

The classic mistakes:

- Assuming it fixes all head-of-line blocking. Streams multiplex above TCP, but a lost TCP packet still stalls *every* stream on that connection. True per-stream independence needed QUIC ([HTTP/3](/t/http-3)).
- Keeping 1.1 optimisations. Domain sharding, sprite sheets and inlining were workarounds for connection limits; under h2 they add overhead (worse caching, bigger files). Unpick them when multiplexing arrives.
- Ignoring prioritisation limits. Stream priorities exist but proxies and servers implement them unevenly; critical CSS still deserves explicit ordering via markup, not hope.
- Expecting miracles on fast LANs. Where RTT is tiny, multiplexing gains shrink. h2's wins scale with round-trip count and distance.
- Breaking with naive intermediaries. Middleboxes that assume 1.1 plaintext mangle or downgrade h2. Ensure the chain (CDN, WAF, LB) speaks it end to end.
- Forgetting it's still TCP underneath. Congestion control, handshake costs and loss behaviour are TCP's. h2 improves framing, not physics.

**When it matters:** many-resource pages over real-world networks — the common case. Enable it (usually a toggle on the CDN/LB/server), drop the 1.1 hacks, and look to HTTP/3 where lossy links make TCP-level blocking the next bottleneck.
