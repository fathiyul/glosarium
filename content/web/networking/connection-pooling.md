---
title: "Connection Pooling"
summary: "Reusing a set of open connections instead of opening new ones."
levels: { backend: mid-level, data-engineer: mid-level }
also: [backend-basics]
aliases: ["connection pool", "connection pooling", "connection reuse"]
prereqs: ["tcp", "tls-handshake"]
related: ["round-trip-time", "load-balancer", "thread-pool"]
---

**Connection pooling** keeps established connections open and reuses them for subsequent requests instead of paying the setup cost every time. Opening a connection costs at least a TCP handshake (one round trip) plus, for TLS, the TLS handshake (one to two more) — so a fresh HTTPS connection costs several [round trips](/t/round-trip-time) before a single byte of your request is sent. A pool amortises that **handshake cost** across many requests.

```text
without pool:  handshake, handshake, handshake… (every request pays)
with pool:     handshake once → request, request, request…
```

It applies at every layer: HTTP clients pooling keep-alive connections to backends, application servers pooling database connections, and browsers reusing connections per origin.

Two knobs matter: pool *size* (too small and requests queue for a connection; too large and you overwhelm the server) and *lifetime* (connections go stale — the server may close idle ones — so pools validate or recycle).

The classic mistakes:

- No pooling on hot paths. A service making thousands of requests per second without reuse spends most of its time handshaking and burns ephemeral ports. Pool on anything called repeatedly.
- Pool too small. Requests queue waiting for a free connection and latency spikes under load. Size the pool to the concurrency you actually run.
- Pool too large. Ten app instances × 100 pooled connections = 1,000 connections hammering a database configured for 200. Size against what the server can take, and remember pools multiply by instance count.
- Stale connections. A pooled connection the server already closed produces a sporadic failure on first use. Validate before use or retry once on a fresh connection.
- Leaking checkouts. Code that takes a connection from the pool and never returns it drains the pool until requests stall. Always release in a `finally`.
- One pool for wildly different workloads. A bulk import sharing a small pool with latency-sensitive queries starves the latter. Separate pools by workload where it matters.

**When to use it:** anywhere you make repeated connections to the same destination — essentially always for backend-to-backend and backend-to-database traffic. Combined with [keep-alive](/t/keep-alive), it's the standard way to stop paying setup costs per request.
