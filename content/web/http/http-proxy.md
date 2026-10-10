---
title: "HTTP Proxy"
summary: "An intermediary that forwards HTTP requests."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["http proxy", "proxy server", "forward proxy"]
prereqs: ["http", "tls"]
related: ["reverse-proxy", "load-balancer", "api-gateway"]
---

An **HTTP proxy** sits between clients and servers, forwarding requests on the clients' behalf. Forward proxies serve the *client's* interests: corporate egress filtering, caching, logging, anonymisation. (The mirror image — serving the *server's* interests, terminating TLS and routing — is the [reverse proxy](/t/reverse-proxy).)

```text
client → proxy (filter? cache? log?) → origin server
```

Proxies can inspect, cache, transform, or block — which is exactly why TLS complicates them: end-to-end encryption blinds a proxy unless it terminates TLS itself (corporate MITM with a custom CA) or tunnels opaquely via CONNECT. That tension — visibility versus privacy — defines most proxy debates.

The classic mistakes:

- Confusing forward and reverse proxies. "Set up a proxy" means opposite things to each side. Name which side it serves before designing.
- Assuming privacy through a proxy. A proxy that can inspect sees everything — credentials, cookies, bodies. Trust it accordingly; prefer end-to-end TLS past proxies you don't control.
- Proxy env vars in the wrong place. `HTTP_PROXY`/`NO_PROXY` misconfiguration routes internal traffic out (or external traffic nowhere). Exempt internal ranges explicitly.
- Caching authenticated responses. A shared forward cache storing one user's response for another is the classic proxy data leak. Cache only safe, public content.
- Transparent proxies breaking TLS. Intercepting without a trusted CA produces certificate errors users are trained to click through — training them to accept real attacks too.
- Chaining without accounting. Each proxy hop adds latency and a failure point; long chains of corporate proxy → CDN → WAF → LB need end-to-end tracing to stay debuggable.

**How to think about it:** a forward proxy is delegated trust — filtering, caching and logging in exchange for visibility. Use it where the organisation owns both endpoints' interests; everywhere else, end-to-end encryption should pass through blind.
