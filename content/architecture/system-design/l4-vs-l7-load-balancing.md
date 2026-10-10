---
title: "L4 vs L7 Load Balancing"
summary: "Balancing by connection vs by HTTP content."
levels: { backend: senior }
aliases: ["l4 vs l7 load balancing", "layer 4 vs layer 7", "transport vs application balancing"]
prereqs: ["load-balancer", "tcp"]
related: ["load-balancer", "load-balancing-algorithms", "reverse-proxy"]
---
**L4 vs L7 load balancing** is the choice between routing by connection metadata (IP, port — layer 4) and by application content (URL, headers, cookies — layer 7). L4 is fast and dumb: hash the connection, forward packets, never inspect. L7 is smart and costly: terminate (often TLS), parse requests, route on meaning — enabling path-based routing, header affinity and per-route policy.

```text
L4:  TCP 1.2.3.4:443 → server B (never looks inside)
L7:  GET /api + cookie → server C (routes on content)
```

The trade is intelligence versus overhead: L7 sees enough to route well (canary by header, APIs to one pool, assets to another) but pays termination and parsing per request; L4 scales packets cheaply but can't distinguish anything about the traffic.

The classic mistakes:

- L7 for everything by default. Parsing and terminating traffic that needs no intelligence wastes CPU and adds latency — and concentrates TLS private keys. L4 where content doesn't matter.
- L4 where routing needs meaning. gRPC multiplexing, WebSocket upgrades and canary-by-header all need L7 visibility; L4 pins or misroutes them.
- TLS confusion. L7 typically terminates TLS (needing certs and re-encryption decisions); L4 passes bytes through. Choose with the security model, not just performance.
- Sticky sessions at the wrong layer. IP-hash (L4) breaks under NAT and mobile roaming; cookie affinity (L7) survives. Affinity belongs where identity lives.
- Health checks mismatched. L4 checks (port open) miss application-dead servers; L7 checks (endpoint response) catch them. Check at the layer whose failure matters.
- Chaining without reason. L4 → L7 → L7 stacks add hops and failure modes; each layer must earn its place (edge L4, service L7 is the common sane split).

**How to choose:** route on meaning → L7; move packets fast → L4; commonly both (L4 at edge, L7 per service). Match the layer to what routing must know.
