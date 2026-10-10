---
title: "Reverse Proxy"
summary: "A server in front of your app that handles TLS, routing and caching."
levels: { backend: mid-level, frontend: mid-level }
also: [http]
aliases: ["reverse proxy", "inbound proxy", "edge proxy"]
prereqs: ["http-proxy", "load-balancer"]
related: ["load-balancer", "api-gateway", "tls-termination"]
---
A **reverse proxy** stands in front of origin servers, facing clients on their behalf: terminating TLS, routing by host/path, caching, compressing, rate-limiting and shielding origins from direct exposure. Clients talk to the proxy as if it were the server; the proxy fulfils from cache or fetches upstream.

```text
clients → reverse proxy (TLS, cache, route, limit) → app servers (hidden)
```

It's the edge workhorse — nginx, envoy, CDNs and ingress controllers all play the role — absorbing cross-cutting HTTP concerns so applications handle business logic. Load balancing, WAF filtering and [TLS termination](/t/tls-termination) typically ride along.

The classic mistakes:

- Logic creep. Business rules in proxy config (rewrites encoding product decisions) become untested, unreviewed code in an awkward language. Proxy handles transport; apps handle meaning.
- Trusting upstream blindly. "Internal" upstreams still need timeouts, health checks and validation — a hung origin holds proxy workers hostage.
- Header spoofing. Backends must accept `X-Forwarded-*` only from the proxy; clients forging them spoof IPs and schemes. Strip at the edge, set authoritatively.
- Cache poisoning via misconfiguration. Caching keyed wrong (ignoring auth headers, varying wrong) serves one user's bytes to another. Key caches precisely; default private content to no-store.
- Single proxy, no redundancy. The front door is a single point of failure unless redundant and health-checked. Run pairs; fail over automatically.
- Buffering surprises. Request/response buffering changes streaming behaviour and memory profiles; tune for SSE/WebSocket/uploads explicitly rather than inheriting defaults.

**How to deploy it:** terminate and route at the edge, cache deliberately, distrust upstreams operationally, and keep product logic out of config. The reverse proxy is infrastructure doing HTTP's chores — excellent at them, wrong for anything else.
