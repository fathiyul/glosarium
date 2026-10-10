---
title: "Keep-Alive Connections"
summary: "Reusing one connection for many requests."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["keep-alive", "persistent connections", "http keep-alive"]
prereqs: ["tcp", "http-1-1"]
related: ["connection-pooling", "round-trip-time", "load-balancer"]
---

HTTP/1.0 opened a new TCP connection per request. **Keep-alive** (persistent connections, the default in HTTP/1.1) reuses one connection for many sequential requests, skipping repeated TCP and TLS handshakes. Since a fresh HTTPS connection costs several round trips before any application data moves, reuse is one of the cheapest latency wins available.

```text
without:  handshake → req/resp → close, handshake → req/resp → close…
with:     handshake → req/resp → req/resp → req/resp… (idle timeout closes it)
```

Both sides must cooperate: the `Connection: keep-alive` behaviour, plus server-side idle timeouts and per-connection request limits that eventually recycle connections. HTTP/2 and HTTP/3 multiplex concurrently over a single connection, making keep-alive's sequential reuse largely obsolete there — but the principle (don't re-handshake per request) is the same.

The classic mistakes:

- Disabling keep-alive on hot paths. Without it, every request pays the handshake; under load that's enormous overhead and ephemeral-port churn.
- Idle timeout mismatches. If the server closes idle connections after 5 seconds but the client pool holds them for 60, the client sends on a dead connection and eats a sporadic failure. Align the timeouts (client shorter than server).
- Unbounded per-connection requests. Reusing one connection forever risks uneven load across backends. Servers cap requests per connection so load rebalances; don't defeat it.
- Assuming keep-alive means concurrent. On HTTP/1.1, reuse is sequential per connection — parallelism needs multiple connections (which is what pools and browsers manage).
- Forgetting proxies. Every hop (client→CDN→LB→app) has its own keep-alive settings; a break at any hop reintroduces handshakes. Configure the whole chain.
- Leaking connections server-side. Idle keep-alive connections still consume a slot; under slowloris-style conditions, too-generous timeouts become a resource-exhaustion vector. Bound them.

**How to use it:** leave keep-alive on everywhere, align client and server idle timeouts, and let pools manage the reuse. It's the quiet default that makes HTTP/1.1 performant — and its absence is a classic hidden latency tax.
